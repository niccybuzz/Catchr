window.addEventListener("load", () => {
  const removeButtons = document.querySelectorAll(".removeFromCollection");

  removeButtons.forEach((button) => {
    button.addEventListener("click", async function () {
      try {
        const selectedCard = this.getAttribute("card");
        const selectedCollection = this.getAttribute("collection");
        const response = await fetch(
          `/mycollection/remove/?collection=${selectedCollection}&card=${selectedCard}`
        );
        const data = await response.json();
        if (response.ok) {
          document.getElementById("popupMessage").textContent = data;
          document.getElementById("popup").classList.add("flex");
          document.getElementById("popup").classList.remove("hidden");
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    });
  });

  document.getElementById("closePopup").addEventListener("click", function () {
    document.getElementById("popup").classList.add("hidden");
    document.getElementById("popup").classList.remove("flex");
    location.reload();
  });
});

window.addEventListener("load", () => {
  const addButtons = document.querySelectorAll(".addToCollection");

  addButtons.forEach((button) => {
    button.addEventListener("click", async function (event) {
      try {
        event.preventDefault();
        const selectedCard = this.getAttribute("card");
        const selectedCollection = this.getAttribute("collection");
        const response = await fetch(
          `/mycollection/add/?collection=${selectedCollection}&card=${selectedCard}`
        );
        const data = await response.json();
        if (response.ok) {
          document.getElementById("popupMessage").textContent = data;
          document.getElementById("popup").classList.add("flex");
          document.getElementById("popup").classList.remove("hidden");
        } else {
          alert(data);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    });
  });

  document.getElementById("closePopup").addEventListener("click", function () {
    document.getElementById("popup").classList.add("flex");
    document.getElementById("popup").classList.remove("hidden");
  });
});

window.addEventListener("load", function () {
  const addWishlistButtons = document.querySelectorAll(".addToWishlist");
  addWishlistButtons.forEach((button) => {
    button.addEventListener("click", async function (event) {
      try {
        event.preventDefault();
        const selectedCard = this.getAttribute("card");
        const selectedWishlist = this.getAttribute("wishlist");
        const response = await fetch(
          `/mywishlist/add/?card=${selectedCard}&wishlist=${selectedWishlist}`
        );
        const data = await response.json();

        document.getElementById("popupMessage").textContent = data;
        document.getElementById("popup").classList.add("flex");
        document.getElementById("popup").classList.remove("hidden");
      } catch (err) {
        document.getElementById("popupMessage").textContent = data;
        document.getElementById("popup").classList.add("flex");
        document.getElementById("popup").classList.remove("hidden");
      }
    });
  });
  document.getElementById("closePopup").addEventListener("click", function () {
    document.getElementById("popup").classList.add("flex");
    document.getElementById("popup").classList.remove("hidden");
  });
});

window.addEventListener("load", function() {
  const removeWishlistButtons = document.querySelectorAll(".removeFromWishlist");
  removeWishlistButtons.forEach((button) => {
    button.addEventListener("click", async function(event) {
      try{
        event.preventDefault();
        const selectedCard = this.getAttribute("card")
        const selectedWishlist = this.getAttribute("wishlist")
        const response = await fetch(
          `/mywishlist/remove/?card=${selectedCard}&wishlist=${selectedWishlist}`
        );
        const data = await response.json();
        document.getElementById("popupMessage").textContent = data;
        document.getElementById("popup").classList.add("flex");
        document.getElementById("popup").classList.remove("hidden");


      } catch (err) {
        console.error(err);
      }

    })
  })
  document.getElementById("closePopup").addEventListener("click", function(){
    document.getElementById("popup").classList.add("flex");
    document.getElementById("popup").classList.remove("hidden");
  })
})
