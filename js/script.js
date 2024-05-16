console.log("script loaded");

let allZines = []; // Array to store all zines
const displayLimit = 5; 
    
async function fetchAllZines() {
console.log("Fetching all zines...");

try {const url = `https://archive.org/advancedsearch.php?q=%28collection%3Asproutdistro+OR+collection%3Azines_inbox%29+AND+language%3A%28English+OR+eng%29+AND+date%3A%5B2010-01-01+TO+*%5D&fl%5B%5D=avg_rating&fl%5B%5D=btih&fl%5B%5D=collection&fl%5B%5D=contributor&fl%5B%5D=creator&fl%5B%5D=date&fl%5B%5D=description&fl%5B%5D=downloads&fl%5B%5D=format&fl%5B%5D=identifier&fl%5B%5D=imagecount&fl%5B%5D=language&fl%5B%5D=mediatype&fl%5B%5D=name&fl%5B%5D=num_reviews&fl%5B%5D=publisher&fl%5B%5D=source&fl%5B%5D=subject&fl%5B%5D=title&sort%5B%5D=&sort%5B%5D=&sort%5B%5D=&rows=1000&page=1&output=json`;
console.log("Fetching zines from URL:", url);

const response = await fetch(url);
console.log("Response:", response);

if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
}
    const result = await response.json();
    console.log("API Response:", result);
    if (result.response && result.response.docs) {

     allZines = result.response.docs;
    console.log("All zines", allZines);
    console.table("All zines", allZines);

    displayRandomZines();
} else { 
    console.error("Unexpected API response format:", result);
}
   }   catch (error)
    {
    console.error("error fetching zines:", error);
}
};

function getRandomZines(count) {
    const shuffled = allZines.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled.slice(0, count);
      }
      
function displayRandomZines() {
        const randomZines = getRandomZines(displayLimit);
        console.log("Random zines to display:", randomZines);
        displayItems(randomZines);
      }

function setupSearch() {
    const subjectButtons = document.querySelectorAll(".subjectButton");
    const searchForm = document.querySelector("form");
    const searchInput = document.querySelector("#searchInput");
    const searchButton = document.querySelector("#searchButton");

    subjectButtons.forEach((button) => {
        button.addEventListener("click", function(event) {
            const selectedSubject = button.getAttribute("data-subject");
            console.log("Selected subject:", selectedSubject);
            const filteredZines = searchItems(allZines, selectedSubject);
            console.log("Filtered zines:", filteredZines);
            displayItems(filteredZines);
        });
    });

    searchForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const searchTerm = searchInput.value.trim();
        console.log("Search term:", searchTerm);
        const filteredZines = searchItems(allZines, searchTerm);
        console.log("Filtered zines:", filteredZines);
        displayItems(filteredZines);
    });
}

function searchItems(zines, searchTerm) {
    const filtered = zines.filter((zine) => {
        if (Array.isArray(zine.subject)) {
            return zine.subject.some((subject) => subject && subject.toLowerCase().includes(searchTerm.toLowerCase()));
        } else if (typeof zine.subject === 'string') {
            return zine.subject.toLowerCase().includes(searchTerm.toLowerCase());
        }
        return false;
    });
    console.log("Filtered results:", filtered);
    return filtered;
}

function displayItems(zines) {
    const target = document.querySelector("#items");
    target.innerHTML = ""; // Clear previous results

    if (zines.length === 0) {
        target.innerHTML = "<p>No matching zines found.</p>";
        return;
    }

}

function displayItems(zines) {
    const target = document.querySelector("#items");
    target.innerHTML = ""; // Clear previous results
    
    zines.forEach((item, index) => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("item");
        const title = item.title || "N/A";
        const description = item.description || "N/A";
        const author = Array.isArray(item.creator) ? item.creator.join(", ") : item.creator || "N/A";
        const subject = Array.isArray(item.subject) ? item.subject.join(", ") : item.subject || "N/A";
        const pubDate = Array.isArray(item.year) ? item.year.join(", ") : item.year || "N/A";
        const collection = Array.isArray(item.collection) ? item.collection.join(", ") : item.collection || "N/A";
        const downloads = Array.isArray(item.downloads) ? item.downloads.join(", ") : item.downloads || "N/A";

    //could not have figured this out without Claude: https://claude.ai/chat/a65f0532-a362-49b1-9ea6-9ecf2f513cc1
    //this convo as well https://claude.ai/chat/6f9e508b-e20f-4d6e-b718-dd3c400930a8
   //and many MDN articles
    
    const link = `https://archive.org/details/${item.identifier}`;
    const itemHtml = `
      <div class="item-details">
        <a class="title" href="${link}" target="_blank">${title}</a>
        <p class="desc">Description: ${description}</p>
        <p>Author: ${author}</p>
        <p>Subjects: ${subject}</p>
        <p>Published: ${pubDate}</p>
        <p>Collection: ${collection}</p>
        <p>Downloads: ${downloads}</p>
        <a href="${link}" target="_blank">View on Internet Archive</a>
      </div>
    `;
    itemElement.innerHTML = itemHtml;
    target.appendChild(itemElement);
    })


};

document.addEventListener("DOMContentLoaded", async () => {
    await fetchAllZines();
    setupSearch();
    const randomButton = document.getElementById("randomButton");
    randomButton.addEventListener("click", displayRandomZines);
  });