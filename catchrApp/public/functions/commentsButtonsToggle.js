const cardsButton = document.getElementById("cards-button");
const commentsButton = document.getElementById("comments-button");
const cardsDiv = document.getElementById("gridDiv");
const commentsDiv = document.getElementById("comments-div");

commentsButton.addEventListener("click", function () {
  commentsDiv.classList.toggle("hidden");
  commentsDiv.classList.toggle("lg:flex");
  cardsDiv.classList.toggle("hidden")
  cardsDiv.classList.toggle("xl:grid-cols-4")
});

cardsButton.addEventListener("click", function() {
  commentsDiv.classList.add("hidden");
  commentsDiv.classList.remove("lg:flex")
  cardsDiv.classList.remove("hidden")
  cardsDiv.classList.add("grid")
  cardsDiv.classList.add("xl:grid-cols-4")
 
})
