//Functions for adding transitions upon home page load

//Adding background opacity - duration defined in home.ejs
document.addEventListener("DOMContentLoaded", function() {
  const subtitle = document.getElementById("subtitle");
  subtitle.classList.add("opacity-100")
});

//Adding background opacity - duration defined in home.ejs
document.addEventListener("DOMContentLoaded", function() {
  const accountbutton = document.getElementById("accountbutton");
  accountbutton.classList.add("opacity-100")
});

//Adding background opacity - duration defined in home.ejs
document.addEventListener("DOMContentLoaded", function() {
  const buttonbox = document.getElementById("buttonbox");
  buttonbox.classList.add("opacity-100")
});

// Reducing opacity from 0 to 100, then transitioning from large and centered to 75% size and slighly higher
document.addEventListener("DOMContentLoaded", function() {
  const title = document.getElementById("bigtitle");
  title.classList.add("opacity-100")
  setTimeout(()=> {
    title.classList.add("mb-12", "mt-24"); 
  }, 1000);
});

//Adding button opacity transition
document.addEventListener("DOMContentLoaded", function() {
  const buttons = document.getElementById("homebuttons");
  setTimeout(() => {
    buttons.classList.add("opacity-100"); 
  }, 1000);
});
  