// Get references to the dropdown menus
const sortMenu = document.getElementById("sort-menu");

// Get references to the menu buttons
const sortButton = document.getElementById("sort-button");

// Toggle the visibility of the dropdown menus when each menu button is clicked
sortButton.addEventListener("click", function () {
  sortMenu.classList.toggle("hidden");
  expansionsMenu.classList.add("hidden");
  raritiesMenu.classList.add("hidden");
  typesMenu.classList.add("hidden");
});


const sortLinks = document.querySelectorAll("#sort-menu a");
const pageLinks = document.querySelectorAll("#pageContainer a")

sortLinks.forEach((link) => {
  link.addEventListener("click", function (event) {
    let currentUrl = window.location.href;
    event.preventDefault();
    const sort = this.getAttribute("sort")
    const order = this.getAttribute("order")
    let newUrl;

    if (currentUrl.includes("sortBy=")){
      newUrl = currentUrl.replace(/sortBy=\w+/, `sortBy=${sort}`)
      newUrl = newUrl.replace(/sortOrder=\w+/, `sortOrder=${order}`)
    } else {
      if (currentUrl.includes("?")){
        newUrl = currentUrl + `&sortBy=${sort}&sortOrder=${order}`
      } else {
        newUrl = currentUrl + `?sortBy=${sort}&sortOrder=${order}`
      }
    }
    window.location.href = newUrl;
  })
})

pageLinks.forEach((page) => {
  page.addEventListener("click", function (event){
    event.preventDefault();
    const currentUrl = window.location.href;

    const selectedPage = this.getAttribute("pageNum");
    let newUrl;

    if (currentUrl.includes("page=")) {
      newUrl = currentUrl.replace(/page=\d+/, `page=${selectedPage}`)
    } else {
      if (currentUrl.includes("?")){
        newUrl = currentUrl + `&page=${selectedPage}`
      } else {
        newUrl = currentUrl + `?page=${selectedPage}`
      }
    }
    window.location.href = newUrl
  })
})
