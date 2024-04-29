
document.getElementById("compareform").addEventListener("submit", function(event) {
    let checkboxCount = 0
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((box) => {
        if (box.checked) {
            checkboxCount++
        }
    })
    if (  checkboxCount !== 2) {
        event.preventDefault();
        alert("Please select 2 cards for comparison");
        location.reload();
    } else {
        return;
    }
})