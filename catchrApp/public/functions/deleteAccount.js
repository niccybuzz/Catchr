document
  .getElementById("deleteAccount")
  .addEventListener("click", deleteAccount);

async function deleteAccount(event) {
  event.preventDefault();
  try{
    if (confirm("Are you sure you want to delete your account?")){
        const response = await fetch("/myaccount/delete", {
            method: "DELETE"
        })
        if (!response.ok) {
            throw new Error("Bad response")
        } else {
            const result = await response.json();
            window.location.href = "http://localhost:3000/register"
        }
    }
  } catch (err) {
    console.log("Server error")
  }
}
