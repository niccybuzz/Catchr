const mycollectionButton = document.getElementById("my-collection-button");
const topCollecsButton = document.getElementById("top-collections-button");
const cardsButton = document.getElementById("cards-button");
const commentsButton = document.getElementById("comments-button");

const mycollectionDiv = document.getElementById("my-collection");
const topCollectionsDiv = document.getElementById("top-collections");
const cardsDiv = document.getElementById("gridDiv");
const commentsDiv = document.getElementById("comments-div");

mycollectionButton.addEventListener("click", function () {
  mycollectionButton.classList.add("bg-container", "text-canvas");
  mycollectionButton.classList.remove("bg-canvas", "text-container");
  topCollecsButton.classList.remove("bg-container", "text-canvas")
  topCollecsButton.classList.add("bg-canvas", "text-container")

  cardsDiv.classList.add("grid")
  cardsDiv.classList.remove("hidden")
  commentsDiv.classList.remove("flex")
  commentsDiv.classList.add("hidden")
  topCollectionsDiv.classList.add("hidden");
  topCollectionsDiv.classList.remove("flex");
  mycollectionDiv.classList.remove("hidden");
  mycollectionDiv.classList.add("flex");
});

topCollecsButton.addEventListener("click", function () {
  topCollecsButton.classList.remove("bg-canvas", "text-container")
  topCollecsButton.classList.add("bg-container", "text-canvas");
  
  mycollectionButton.classList.remove("bg-container", "text-canvas");
  mycollectionButton.classList.add("bg-canvas", "text-container");
  
  commentsDiv.classList.remove("flex");
  commentsDiv.classList.add("hidden");
  topCollectionsDiv.classList.remove("hidden");
  topCollectionsDiv.classList.add("flex");
  mycollectionDiv.classList.add("hidden");
  mycollectionDiv.classList.remove("flex");
});

cardsButton.addEventListener("click", function () {
  cardsButton.classList.add("bg-container", "text-canvas");
  cardsButton.classList.remove("text-container");
  commentsButton.classList.remove("bg-container", "text-canvas")
  commentsDiv.classList.add("hidden");
  commentsDiv.classList.remove("flex");
  cardsDiv.classList.remove("hidden");
  cardsDiv.classList.add("grid");
});

commentsButton.addEventListener("click", function () {
  commentsButton.classList.add("bg-container", "text-canvas");
  commentsButton.classList.remove("text-container");
  cardsButton.classList.remove("bg-container", "text-canvas")
  
  commentsDiv.classList.remove("hidden");
  commentsDiv.classList.add("flex");
  cardsDiv.classList.remove("grid");
  cardsDiv.classList.add("hidden");
});
