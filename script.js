// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

//create cont userSelect to storage ids of each select Ussr and populate Dropdown menu for each userIds
// DOMContentLoaded=  all HTML document has been completely loaded then javscript can aces it

import { getUserIds, getData, setData } from "./storage.js";


//add an event listener to the bookmarkForm that listens for the submit event:

function displayBookmarks(bookmarks) {
   const bookmarkListDiv = document.getElementById("bookmark-list");
   bookmarkListDiv.innerHTML = ""; // Clear existing content

   if (!bookmarks || bookmarks.length === 0) {
      bookmarkListDiv.textContent = "No bookmarks found for this user.";
      return;
   }

   bookmarks.forEach((bookmark) => {
      const bookmarkDiv = document.createElement("div");
      bookmarkDiv.className = "bookmark-item";

      // Title as clickable link
      const titleLink = document.createElement("a");
      titleLink.href = bookmark.url;
      titleLink.textContent = bookmark.title;
      titleLink.target = "_blank";
      titleLink.rel = "noopener noreferrer"; // Security improvement

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


function loadBookmarks(userId) {
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

   bookmarkForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent default form submission

      const urlInput = document.getElementById("url");
      const titleInput = document.getElementById("title");
      const descriptionInput = document.getElementById("description");

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
});