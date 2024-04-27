const express = require("express");
const router = express.Router();
const axios = require("axios");

//Clears all filters and sort methods
router.get("/clearsearch", (req, res) => {
  req.session.sortBy = null;
  req.session.orderBy = null;
  filters = {};
  res.redirect("/cards");
});

// Get request for a specific card
router.get("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let sessionObj = req.session;
    let endp = `http://localhost:4000/api/cards/${id}`;
    const results = await axios.get(endp);
    console.log(results.data);
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
          console.log("yes");
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

      res.render("singleCard", {
        card: card,
        user: sessionObj,
        collection: "collection",
      });
    }
  } catch (err) {
    res.redirect("/cards");
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
    if (sortBy) {
      req.session.sortBy = sortBy;
    } else {
    }
    if (orderBy) {
      req.session.orderBy = orderBy;
    }

    //Getting all of the sets, rarities and types to populate dropdown menus
    const rarities = await axios.get(
      `http://localhost:4000/api/others/rarities`
    );
    const sets = await axios.get(`http://localhost:4000/api/others/sets`);
    const types = await axios.get(`http://localhost:4000/api/others/types`);

    let mycollection = "placeholder";
    if (user_id) {
      const collection = await axios.get(
        `http://localhost:4000/api/collections/user/${user_id}`
      );
      mycollection = collection.data.collection;
    }

    // Finding the specific type/rarity/set name that the user searched for
    let filteredSet;
    let filteredRarity;
    let filteredType;

    sets.data.forEach((set) => {
      if (set.set_id == set_id) {
        filteredSet = set;
      }
    });
    rarities.data.forEach((rarity) => {
      if (rarity.rarity_id == rarity_id) {
        filteredRarity = rarity;
      }
    });
    types.data.forEach((type) => {
      if (type.type_id == type_id) {
        filteredType = type;
      }
    });

    //Calling getcards with any query parameters. Returns pagination and filters selected
    const result = await getCards(
      page,
      limit,
      sortBy,
      orderBy,
      card_name,
      filteredSet,
      filteredRarity,
      filteredType
    );
    const cards = result.cards;
    const pagination = result.pagination;
    const filters = result.filters;

    //Getting this to create the 'applied filter' divs in allCards
    const numberOfFilters = Object.keys(filters).length;

    let message = "";
    if (cards.length > 0) {
      message = "All cards:";
    } else {
      message = "No cards found";
    }

    res.render("allcards", {
      cards: cards,
      user: sessionObj,
      pagination: pagination,
      message: message,
      filters: filters,
      numFilters: numberOfFilters,
      rarities: rarities.data,
      sets: sets.data,
      types: types.data,
      collection: mycollection,
    });
  } catch (err) {
    console.log(err.response);
    res.redirect("/");
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
  /**
   * For each query parameter passed into the method, it concatenates the base query with additional parameters
   * Then, it adds a new field in the "filters" object, which is used to create 'applied filter' divs in allCards
   */
  if (card_name) {
    endp += `&card_name=${card_name}`;
    filters.Name = card_name;
  }
  if (set) {
    endp += `&set_id=${set.set_id}`;
    filters.Set = set.set_name;
  }
  if (rarity) {
    endp += `&rarity_id=${rarity.rarity_id}`;
    filters.Rarity = rarity.rarity_description;
  }
  if (type) {
    endp += `&type_id=${type.type_id}`;
    filters.Type = type.type_description;
  }
  if (sortBy) {
    endp += `&sortBy=${sortBy}`;
    endp += `&sortOrder=${orderBy}`;

    /**
     * This part is basically clearning up the names so that they can be added to "filters" object 
     * and then displayed on the website as tags
     **/
    if (sortBy == "rarity") {
      sortBy = "Rarity";
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
  return { cards, pagination, filters };
}

module.exports = router;
