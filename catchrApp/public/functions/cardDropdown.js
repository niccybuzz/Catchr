const cardDropdownButtons = document.querySelectorAll("#card-dropdown button");

cardDropdownButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const card_id = this.getAttribute("cardId");
    const cardDropdown = document.getElementById(card_id);
    cardDropdown.classList.toggle("hidden");
    cardDropdown.classList.toggle("flex");
  });
});
