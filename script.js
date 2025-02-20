// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

//create cont userSelect to storage ids of each select Ussr and populate Dropdown menu for each userIds
// DOMContentLoaded=  all HTML document has been completely loaded then javscript can aces it

import { getUserIds, getData, setData } from "./storage.js";

export function displayBookmarks(bookmarks) {
   const bookmarkListDiv = document.getElementById("bookmark-list");
   bookmarkListDiv.innerHTML = ""; // Clear existing content

   if (!bookmarks || bookmarks.length === 0) {
      bookmarkListDiv.textContent = "No bookmarks found for this user.";
      return;
   }

   bookmarks.forEach((bookmark) => {
      const bookmarkDiv = document.createElement("div");
      bookmarkDiv.className = "bookmark-item";

   //Title/ URL Link
    const titleLink = document.createElement("a");
    titleLink.href = bookmark.url;         // Link to URL
    titleLink.textContent = bookmark.title; // Show title only
    titleLink.target = "_blank";          
    titleLink.rel = "noopener noreferrer";

    // Description
    const descriptionPara = document.createElement("p");
    descriptionPara.textContent = bookmark.description;

    // Timestamp
    const timestampSpan = document.createElement("span");
    const date = new Date(Number(bookmark.createdAt));
    timestampSpan.textContent = `Created at: ${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

    // Append all elements
    bookmarkDiv.appendChild(titleLink);
    bookmarkDiv.appendChild(descriptionPara);
    bookmarkDiv.appendChild(timestampSpan);

    bookmarkListDiv.appendChild(bookmarkDiv);
  });
}

export function loadBookmarks(userId) {
   console.log("Loading bookmarks for user:", userId);
   const bookmarks = getData(userId);
   console.log("Bookmarks:", bookmarks);
   displayBookmarks(bookmarks);
}
//dom loaded stop reload the page EVER TIME IS CREATE A USER TITLE
document.addEventListener("DOMContentLoaded", function () {
   const userSelect = document.getElementById("user-select");

   const userIds = getUserIds();
   userIds.forEach((userId) => {
      const option = document.createElement("option");
      option.value = userId;
      option.textContent = userId;
      userSelect.appendChild(option);
   });

   if (userIds.length > 0) {
      loadBookmarks(userIds[0]);
   }

   userSelect.addEventListener("change", function () {
      const selectedUserId = userSelect.value;
      loadBookmarks(selectedUserId);
   });

   const bookmarkForm = document.getElementById("bookmarkForm");

    // for acessibilit submition = get reference to input elements *outside* of the submit listener
    const urlInput = document.getElementById("url");
    const titleInput = document.getElementById("title");
    const descriptionInput = document.getElementById("description");


    bookmarkForm.addEventListener("submit", function (event) {
        event.preventDefault(); // prevents the form's default to reload

        const url = urlInput.value;
        const title = titleInput.value;
        const description = descriptionInput.value;

        const newBookmark = {
            url: url,
            title: title,
            description: description,
            createdAt: Number(Date.now()), //convert to number
        };

        const selectedUserId = userSelect.value;

        const existingBookmarks = getData(selectedUserId) || [];
        existingBookmarks.unshift(newBookmark); // Add to the beginning

        setData(selectedUserId, existingBookmarks);
        loadBookmarks(selectedUserId);

        urlInput.value = "";
        titleInput.value = "";
        descriptionInput.value = "";
    });

    // Implementing Accessibility for Enter key submission to Description input
    descriptionInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") { 
            event.preventDefault(); 
            bookmarkForm.dispatchEvent(new Event('submit')); 
        }
    });

      // Implementing Accessibility for Enter key submission to Title input
      titleInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") { 
            event.preventDefault(); 
            bookmarkForm.dispatchEvent(new Event('submit')); 
        }
    });

       // Implementing Accessibility for Enter key submission to URL input
       urlInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") { 
            event.preventDefault(); 
            bookmarkForm.dispatchEvent(new Event('submit')); 
        }
    });
});
