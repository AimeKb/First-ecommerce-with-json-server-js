const container = document.getElementById ('shoes');


const renderPosts = async () => {
    let uri = 'http://localhost:3000/posts';

    const res = await fetch(uri);
    const posts = await res.json();

    let template = '';
    posts.forEach(post => {
        template += `
        <div class="post">
        <h1>${post.title}</h1>
        <p>${post.price}</p>
        <a href="/details.html?id=${post.id}">Purchase</a>
        </div>
        `
    })

    container.innerHTML = template;
}

window.addEventListener('DOMContentLoaded', () => renderPosts());

// Get references to HTML elements
const searchInput = document.getElementById('search');
const searchButton = document.getElementById('but1');
const searchResults = document.getElementById('searchResults');

// Function to fetch data from the JSON server
function fetchDataFromJSONServer() {
  const apiUrl = 'http://localhost:3000/posts'; // Replace with your JSON server URL

  return fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

// Function to perform the search
function performSearch() {
  const query = searchInput.value.toLowerCase();
  
  fetchDataFromJSONServer()
    .then(data => {
      const filteredData = data.filter(item => item.title.toLowerCase().includes(query));
      displaySearchResults(filteredData);
    });
}

// Function to display search results
function displaySearchResults(results) {
  searchResults.innerHTML = ''; // Clear previous results
  if (results.length === 0) {
    searchResults.innerHTML = 'No results found.';
  } else {
    results.forEach(result => {
      const resultElement = document.createElement('div');
      resultElement.textContent = result.title;
      searchResults.appendChild(resultElement);
    });
  }
}

// Event listener for the search button
searchButton.addEventListener('click', performSearch);