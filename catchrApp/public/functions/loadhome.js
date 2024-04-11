//Functions for adding transitions upon home page load

//Adding background opacity - duration defined in home.ejs
document.addEventListener("DOMContentLoaded", function() {
  const overlay = document.getElementById("overlay");
  overlay.classList.add("bg-opacity-60"); 
});

// Reducing opacity from 0 to 100, then transitioning from large and centered to 75% size and slighly higher
document.addEventListener("DOMContentLoaded", function() {
  const title = document.getElementById("bigtitle");
  title.classList.add("opacity-100")
  setTimeout(()=> {
    title.classList.add("mb-32", "scale-75"); 
  }, 1000);
});

//Adding button opacity transition
document.addEventListener("DOMContentLoaded", function() {
  const buttons = document.getElementById("homebuttons");
  setTimeout(() => {
    buttons.classList.add("opacity-100"); 
  }, 1000);
});
  