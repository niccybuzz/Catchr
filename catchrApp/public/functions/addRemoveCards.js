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
            document.getElementById("popupMessage").textContent =
              data;
            document.getElementById("popup").style.display = "block";
          } else {
            alert(data.message);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      });
    });

    document
      .getElementById("closePopup")
      .addEventListener("click", function () {
        document.getElementById("popup").style.display = "none";
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
            document.getElementById("popup").style.display = "block";
          } else {
            alert(data);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      });
    });

    document
      .getElementById("closePopup")
      .addEventListener("click", function () {
        document.getElementById("popup").style.display = "none";
      });
  });