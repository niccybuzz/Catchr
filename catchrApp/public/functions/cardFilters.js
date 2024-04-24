// Get references to the dropdown menus
const sortMenu = document.getElementById("sort-menu");
const expansionsMenu = document.getElementById("expansions-dropdown");
const raritiesMenu = document.getElementById("rarities-dropdown");
const typesMenu = document.getElementById("types-dropdown");

// Get references to the menu buttons
const sortButton = document.getElementById("sort-button");
const expansionsButton = document.getElementById("expansions-button");
const raritiesButton = document.getElementById("rarities-button");
const typesButton = document.getElementById("types-button");

// Toggle the visibility of the dropdown menus when each menu button is clicked
sortButton.addEventListener("click", function () {
  sortMenu.classList.toggle("hidden");
  expansionsMenu.classList.add("hidden");
  raritiesMenu.classList.add("hidden");
  typesMenu.classList.add("hidden");
});
expansionsButton.addEventListener("click", function () {
  expansionsMenu.classList.toggle("hidden");
  raritiesMenu.classList.add("hidden");
  typesMenu.classList.add("hidden");
  sortMenu.classList.add("hidden");
});
raritiesButton.addEventListener("click", function () {
  raritiesMenu.classList.toggle("hidden");
  expansionsMenu.classList.add("hidden");
  typesMenu.classList.add("hidden");
  sortMenu.classList.add("hidden");
});
typesButton.addEventListener("click", function () {
  typesMenu.classList.toggle("hidden");
  raritiesMenu.classList.add("hidden");
  expansionsMenu.classList.add("hidden");
  sortMenu.classList.add("hidden");
});

// Getting all of the links in the rows of each dropdown menu
const expansionLinks = document.querySelectorAll("#expansions-dropdown a");
const typeLinks = document.querySelectorAll("#types-dropdown a");
const rarityLinks = document.querySelectorAll("#rarities-dropdown a");
const sortLinks = document.querySelectorAll("#sort-menu a");

//Adding event listeners for each link in the expansions menu
expansionLinks.forEach((link) => {
  link.addEventListener("click", function (event) {
    //Prevents default browser behaviour
    event.preventDefault(); 

    // Getting the expansion ID and URLs
    const selectedExpansion = this.getAttribute("data-set-id");
    const currentUrl = window.location.href;
    let newUrl;

    // Check if the current URL already contains a set_id parameter
    if (currentUrl.includes("set_id=")) {
      // Replace the existing set_id parameter with the new one
      newUrl = currentUrl.replace(/set_id=\d+/, `set_id=${selectedExpansion}`);
    } else {
      // Append the set_id parameter to the URL
      if (currentUrl.includes("?")) {
        newUrl = currentUrl + `&set_id=${selectedExpansion}`;
      } else {
        newUrl = currentUrl + `?set_id=${selectedExpansion}`;
      }
    }
    window.location.href = newUrl;
  });
});

//Same as for expansions for for rarity
rarityLinks.forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault(); // Properly call preventDefault() function
    const selectedRarity = this.getAttribute("data-set-id");

    const currentUrl = window.location.href;
    let newUrl;

    
    if (currentUrl.includes("rarity_id=")) {
      newUrl = currentUrl.replace(
        /rarity_id=\d+/,
        `rarity_id=${selectedRarity}`
      );
    } else {
      if (currentUrl.includes("?")) {
        newUrl = currentUrl + `&rarity_id=${selectedRarity}`;
      } else {
        newUrl = currentUrl + `?rarity_id=${selectedRarity}`;
      }
    }
    window.location.href = newUrl;
  });
});

// Same as above for types
typeLinks.forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault(); 
    const selectedType = this.getAttribute("data-set-id");

    const currentUrl = window.location.href;
    let newUrl;

    if (currentUrl.includes("type_id=")) {
      newUrl = currentUrl.replace(/type_id=\d+/, `type_id=${selectedType}`);
    } else {
      if (currentUrl.includes("?")) {
        newUrl = currentUrl + `&type_id=${selectedType}`;
      } else {
        newUrl = currentUrl + `?type_id=${selectedType}`;
      }
    }

    window.location.href = newUrl;
  });
});

//Finally for the sort options
sortLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault(); 
      const selectedSort = this.getAttribute("sort-id");
      const selectedOrder = this.getAttribute("order-id");
  
      const currentUrl = window.location.href;
      let newUrl;
  
      if (currentUrl.includes("sortBy=")) {
        newUrl = currentUrl.replace(/sortBy=\w+/, `sortBy=${selectedSort}`);
        newUrl = newUrl.replace(/orderBy=\w+/, `orderBy=${selectedOrder}`);
      } else {
        if (currentUrl.includes("?")) {
          newUrl = currentUrl + `&sortBy=${selectedSort}&orderBy=${selectedOrder}`;
        } else {
          newUrl = currentUrl + `?sortBy=${selectedSort}&orderBy=${selectedOrder}`;
        }
      }
      window.location.href = newUrl;
    });
  });
  
