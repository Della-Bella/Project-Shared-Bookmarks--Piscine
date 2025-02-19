/**
 * @jest-environment jsdom
 */
import { displayBookmarks} from './script.js';
import * as Storage from './storage.js'; 

describe("displayBookmarks", () => {
   beforeEach(() => {
      // Set up the DOM before each test
      document.body.innerHTML = `
         <div id="bookmark-list"></div>
      `;
   });

   it("should display bookmarks correctly", () => {
      const bookmarks = [
         {
            url: "https://www.example.com",
            title: "Example Website",
            description: "This is an example website.",
            createdAt: Date.now(),
         },
         {
            url: "https://www.google.com",
            title: "Google",
            description: "The world's most popular search engine.",
            createdAt: Date.now(),
         },
      ];

      displayBookmarks(bookmarks);

      const bookmarkListDiv = document.getElementById("bookmark-list");
      const bookmarkItems = bookmarkListDiv.querySelectorAll(".bookmark-item");

      expect(bookmarkItems.length).toBe(2); // Check that the correct number of bookmarks are displayed
      expect(bookmarkItems[0].querySelector("a").textContent).toBe("Example Website"); // Check title
      expect(bookmarkItems[0].querySelector("a").href).toBe("https://www.example.com/"); // Check URL
      expect(bookmarkItems[0].querySelector("p").textContent).toBe("This is an example website."); // Check description
   });

   it("should display a message when no bookmarks are provided", () => {
      displayBookmarks(null); // Or `displayBookmarks([])`

      const bookmarkListDiv = document.getElementById("bookmark-list");
      expect(bookmarkListDiv.textContent).toBe("No bookmarks found for this user.");
   });
});

