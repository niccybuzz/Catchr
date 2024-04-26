  // Get a reference to the dropdown menu
  const dropdownMenu = document.getElementById("dropdown-menu");

  // Get a reference to the menu button
  const menuButton = document.getElementById("menu-button");

  // Toggle the visibility of the dropdown menu when the menu button is clicked
  menuButton.addEventListener("click", function () {
    dropdownMenu.classList.toggle("hidden");
  });