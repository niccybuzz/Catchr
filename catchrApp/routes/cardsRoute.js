const express = require("express");
const router = express.Router();
const axios = require("axios");

/**
 * Route for comparing 2 or more cards
 */
router.post("/compare", async (req, res) => {
  try {
    const selectedCards = req.body.selectedCards;

    const card1 = await axios.get(
      `http://localhost:4000/api/cards/${selectedCards[0]}`
    );
    const card2 = await axios.get(
      `http://localhost:4000/api/cards/${selectedCards[1]}`
    );
    const cards = [card1.data, card2.data];
    res.render("comparison", { cards: cards, user: req.session });
  } catch (err) {
    console.log(err);
    res.redirect("/cards");
  }
});

// Get request for a specific card
router.get("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let sessionObj = req.session;
    let endp = `http://localhost:4000/api/cards/${id}`;
    const results = await axios.get(endp);
    if (results) {
      let card = results.data;
      /**
       * Getting all pokemon abilities. Pokemon may have up to 2 abilities, and each ability has an associated cost.
       * Each ability cost is associated with up to 2 'Types', each with its own cost number.
       * It may also have no cost.
       * Each ability is returned as an index in an array
       */
      if (card.Abilities.length > 0) {
        // Loading all card details into the card object for easier reading the html
        if (card.Abilities[0].primary_cost !== null) {
          //Primary ability cost
          card.ability1type1 = card.Abilities[0].primary_type.type_description;
          card.ability1cost1 = card.Abilities[0].primary_cost;
          card.ability1icon1 = card.Abilities[0].primary_type.type_icon;
          //Secondary ability cost
          if (card.Abilities[0].secondary_cost !== null) {
            card.ability1type2 =
              card.Abilities[0].secondary_type.type_description;
            card.ability1cost2 = card.Abilities[0].secondary_cost;
            card.ability1icon2 = card.Abilities[0].secondary_type.type_icon;
          }
        }
      }

      //Second ability
      if (card.Abilities.length > 1) {
        // Primary ability cost
        if (card.Abilities[1].primary_cost !== null) {
          card.ability2type1 = card.Abilities[1].primary_type.type_description;
          card.ability2cost1 = card.Abilities[1].primary_cost;
          card.ability2icon1 = card.Abilities[1].primary_type.type_icon;
          //Secondary ability cost
          if (card.Abilities[1].secondary_cost !== null) {
            card.ability2type2 =
              card.Abilities[1].secondary_type.type_description;
            card.ability2cost2 = card.Abilities[1].secondary_cost;
            card.ability2icon2 = card.Abilities[1].secondary_type.type_icon;
          }
        }
      }

      /**
       * Each card may have a weakness, resistance, or retreat cost, each associated with up to 1 Type.
       */
      if (card.weakness_amount !== null) {
        card.weakness_description = card.weakness_type.type_description;
        card.weakness_icon = card.weakness_type.type_icon;
      }
      if (card.resistance_type !== null) {
        card.resistance_description = card.resistance_type.type_description;
        card.resistance_icon = card.resistance_type.type_icon;
      }
      if (card.retreat_type !== null) {
        card.retreat_description = card.retreat_type.type_description;
        card.retreat_icon = card.retreat_type.type_icon;
      }

      let myCollection = null;
      if (sessionObj.authen) {
        const myCollectionData = await axios.get(`http://localhost:4000/api/collections/user/${sessionObj.authen}`)
        myCollection = myCollectionData.data.collection;
      } 
           

      console.log(myCollection)
      res.render("singleCard", {
        card: card,
        user: sessionObj,
        collection: myCollection,
      });
    }
  } catch (err) {
    console.log(err.response.data);
    console.log(err);
    res.render("error", {error: err, user: req.session})
  }
});

//route for all cards
router.get("/", async (req, res) => {
  try {
    //Getting a big list of all potential query parameters
    const sortBy = req.query.sortBy;
    const orderBy = req.query.orderBy;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const card_name = req.query.card_name;
    const set_id = req.query.set_id;
    const rarity_id = req.query.rarity_id;
    const type_id = req.query.type_id;
    const user_id = req.session.authen;

    //Holding on to the sortby and orderby
    const sessionObj = req.session;

    //Getting the user's collection, if at all, to enable adding card to my collection
    let mycollection = "placeholder";
    if (user_id) {
      const collection = await axios.get(
        `http://localhost:4000/api/collections/user/${user_id}`
      );
      mycollection = collection.data.collection;
    }

    //Getting all of the sets, rarities and types to populate dropdown menus
    const rarities = await axios.get(
      `http://localhost:4000/api/others/rarities`
    );
    const sets = await axios.get(`http://localhost:4000/api/others/sets`);
    const types = await axios.get(`http://localhost:4000/api/others/types`);

    // Finding the user's chosen set, rarity or type from the bulk data we retrieved
    //So that we can get the name and stats for that set
    let chosenSet;
    let chosenRarity;
    let chosenType;

    sets.data.forEach((set) => {
      if (set.set_id == set_id) {
        chosenSet = set;
      }
    });
    rarities.data.forEach((rarity) => {
      if (rarity.rarity_id == rarity_id) {
        chosenRarity = rarity;
      }
    });
    types.data.forEach((type) => {
      if (type.type_id == type_id) {
        chosenType = type;
      }
    });

    //Calling getCards with any query parameters. Returns pagination and filters selected
    const result = await getCards(
      page,
      limit,
      sortBy,
      orderBy,
      card_name,
      chosenSet,
      chosenRarity,
      chosenType
    );
    const cards = result.cards;
    const pagination = result.pagination;
    const filters = result.filters;
    const numFilters = result.numFilters

    res.render("allcards", {
      cards: cards,
      user: sessionObj,
      pagination: pagination,
      filters: filters,
      numFilters: numFilters,
      rarities: rarities.data,
      sets: sets.data,
      types: types.data,
      collection: mycollection,
    });
  } catch (err) {
    console.log(err.response.data);
    console.log(err);
    res.render("error", {error: err, user: req.session})
  }
});

// Function to fetch cards from the rest API
async function getCards(
  page,
  limit,
  sortBy,
  orderBy,
  card_name,
  set,
  rarity,
  type
) {
  let endp = `http://localhost:4000/api/cards?page=${page}&limit=${limit}`;

  let filters = {};
  let numFilters = 0;
  /**
   * For each query parameter passed into the method, it concatenates the base query with additional parameters
   * Then, it adds a new field in the "filters" object, which is used to create 'applied filter' divs in allCards
   */
  if (card_name) {
    endp += `&card_name=${card_name}`;
    filters.Name = card_name;
    numFilters++;
  }
  if (set) {
    endp += `&set_id=${set.set_id}`;
    filters.Set = set.set_name;
    numFilters++;
  }
  if (rarity) {
    endp += `&rarity_id=${rarity.rarity_id}`;
    filters.Rarity = rarity.rarity_description;
    numFilters++;
  }
  if (type) {
    endp += `&type_id=${type.type_id}`;
    filters.Type = type.type_description;
    numFilters++;
  }
  if (sortBy) {
    endp += `&sortBy=${sortBy}`;
    endp += `&sortOrder=${orderBy}`;
    numFilters++;
    /**
     * This part is basically cleaning up the names so that they can be added to "filters" object
     * and then displayed on the website as tags
     **/
    if (sortBy == "rarity") {
      sortBy = "Rarity";

      //For example, if we don't do this the tag will be displayed as "card_name" on the site which is ugly
    } else if (sortBy == "card_name") {
      sortBy = "Card Name";
    }
    if (orderBy == "asc") {
      sortBy += " (Asc)";
    } else if (orderBy == "desc") {
      sortBy += " (Desc)";
    }
    filters.Sort = sortBy;
  }

  const response = await axios.get(endp);

  //Retrieving cards and pagination details
  const cards = response.data.cards;
  const currentPage = response.data.paginations.page;
  const totalPages = response.data.paginations.totalPages;
  const pagination = { currentPage, totalPages };
  return { cards, pagination, filters, numFilters };
}

module.exports = router;
