window.addEventListener("load", () => {
  const deleteButtons = document.querySelectorAll(".deletebutton");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", async function () {
      try {
        const selectedComment = this.getAttribute("comment");
        const response = await fetch(
          `/collections/comment/delete/${selectedComment}`,
          {
            method: "delete",
            headers: {
              "Content-Type": "application/json",
            },
          }
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

  document.getElementById("closePopup").addEventListener("click", function () {
    document.getElementById("popup").style.display = "none";
    location.reload();
  });
});
