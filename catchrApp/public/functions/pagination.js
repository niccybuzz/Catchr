let currentPage = 1;

function fetchNextPage() {
    currentPage++; // Increment page number
    fetch(`https://your-api-url.com/users?page=${currentPage}&limit=10`)
        .then(response => response.json())
        .then(data => {
            // Append new data to existing data
            renderUsers(data.users);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function renderUsers(users) {
    // Render users on the webpage
}

export { fetchNextPage, renderUsers };
