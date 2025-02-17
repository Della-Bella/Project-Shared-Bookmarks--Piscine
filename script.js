// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.



//create cont userSelect to storage ids of each select Ussr and populate Dropdown menu for each userIds
// DOMContentLoaded=  all HTML document has been completely loaded then javscript can aces it

import { getUserIds } from "./storage.js";

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