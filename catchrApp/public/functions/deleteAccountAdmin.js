window.addEventListener("load", function () {
  const deleteAccountButtons = document.querySelectorAll(".deleteAccount");
  deleteAccountButtons.forEach((button) => {
    button.addEventListener("click", async function (event) {
      try {
        event.preventDefault();
        const selectedAccount = this.getAttribute("account");
        if (
          confirm(
            "Are you sure you want to delete this account? This will erase the entire collection and any comment or likes on it."
          )
        ) {
          {
            const response = await fetch(`/admin/users/delete/${selectedAccount}`, {
              method: "DELETE",
            });
            if (!response.ok) {
              throw new Error("Bad response");
            } else {
              window.location.href="http://localhost:3000/admin/users"
            }
          }
        }
      } catch (err) {
        console.error(err);
      }
    });
  });
});
