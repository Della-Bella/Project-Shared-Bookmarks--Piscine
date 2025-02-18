// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

//create cont userSelect to storage ids of each select Ussr and populate Dropdown menu for each userIds
// DOMContentLoaded=  all HTML document has been completely loaded then javscript can aces it

import { getUserIds, getData, setData } from "./storage.js";

document.addEventListener("DOMContentLoaded", function () {
   const userSelect = document.getElementById("user-select");
   const userIds = getUserIds();

   userIds.forEach((userId) => {
      const option = document.createElement("option");
      option.value = userId;
      option.textContent = userId;
      userSelect.appendChild(option);
   });
});

//stop pages from reload wnhe add bookmark""

const bookmarkForm = document.getElementById("bookmarkForm");

//add an event listener to the bookmarkForm that listens for the submit event:

function displayBookmarks(bookmarks) {
   const bookmarkListDiv = document.getElementById("bookmark-list");
   bookmarkListDiv.innerHTML = ""; //clear if there is something before 

   if (!bookmarks || bookmarks.length === 0) {
      bookmarkListDiv.textContent = "No bookmarks found for this user.";
      return;
   }

   for (let i = bookmarks.length - 1; i >= 0; i--) {
      const bookmark = bookmarks[i];

      const bookmarkDiv = document.createElement("div"); //create "box"for the content book

      const titleLink = document.createElement("a"); //create the link for the title
      titleLink.href = bookmark.url;
      titleLink.textContent = bookmark.title;
      titleLink.target = "_blank";
      bookmarkDiv.appendChild(titleLink);

      const descriptionPara = document.createElement("p"); //creates description for the book
      descriptionPara.textContent = bookmark.description;
      bookmarkDiv.appendChild(descriptionPara);

      const timestampSpan = document.createElement("span"); // create date 
      const date = new Date(bookmark.createdAt);
      timestampSpan.textContent = `Created at: ${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
      bookmarkDiv.appendChild(bookmarkDiv);

      bookmarkListDiv.appendChild(bookmarkDiv); //fill the content div
   }
}
// if there date for the user it will show with this function: 
function loadBookmarks(userId) {
   console.log("Loading bookmarks for user:", userId);
   const bookmarks = getData(userId);
   console.log("Bookmarks:", bookmarks);
   displayBookmarks(bookmarks);
}
//dom loaded stop reload the page, get the users ids creates a text option for each user.
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


   // assign/ submit the book detail created for the select user:
   
   bookmarkForm.addEventListener("submit", function (event) {
      event.preventDefault(); // /stop browser to reload page ever time user clicks the submit button

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
         createdAt: Date.now(),
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