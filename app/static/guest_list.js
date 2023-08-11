document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const suggestionList = document.getElementById("suggestionList");
  const guestList = document.getElementById("guestList");
  let data = null; // Store guest data fetched from the server

  // Fetch and display the guest list on page load
  async function fetchGuestList() {
    try {
      const response = await fetch("/get_guest_list");
      data = await response.json();

      if (response.ok) {
        guestList.innerHTML = "";
        data.guests.forEach((guest) => {
          const listItem = document.createElement("li");
          listItem.textContent = guest.guest_name;

          // Create a checkbox element and add it to the list item
          const checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          // Retrieve checkbox state from localStorage and set it
          checkbox.checked = localStorage.getItem(guest.guest_name) === "true";
          listItem.appendChild(checkbox);

          guestList.appendChild(listItem);
        });
      }
    } catch (error) {
      console.error("An error occurred while fetching the guest list:", error);
    }
  }

  fetchGuestList();

  // Function to update suggestion dropdown based on search input
  function updateSuggestions(inputValue) {
    const matchingGuests = data.guests.filter((guest) =>
      guest.guest_name.toLowerCase().includes(inputValue.toLowerCase())
    );

    suggestionList.innerHTML = "";
    matchingGuests.forEach((guest) => {
      const suggestionItem = document.createElement("li");
      suggestionItem.textContent = guest.guest_name;
      suggestionItem.addEventListener("click", () => {
        searchInput.value = guest.guest_name;
        suggestionList.style.display = "none";
        scrollToGuest(guest.guest_name);
      });
      suggestionList.appendChild(suggestionItem);
    });
  }

  // Event listener for search input
  searchInput.addEventListener("input", function () {
    const inputValue = searchInput.value.trim();
    suggestionList.style.display = inputValue ? "block" : "none";
    updateSuggestions(inputValue);
  });

  // Event listener for checkbox change
  guestList.addEventListener("change", function (event) {
    if (event.target.type === "checkbox") {
      const guestName = event.target.parentNode.textContent;
      localStorage.setItem(guestName, event.target.checked); // Store checkbox state in localStorage
    }
  });

  const params = new URLSearchParams(window.location.search);
  const guestName = params.get("guest_name");

  // Populate the search input box with guest name
  if (guestName) {
    searchInput.value = guestName;
  }

  // Function to scroll to the position of a guest name in the guest list
  function scrollToGuest(guestName) {
    const targetElement = [...guestList.children].find((li) =>
      li.textContent.includes(guestName)
    );

    if (targetElement) {
      // SmoothScroll(targetElement, { duration: 1000, easing: "easeInOutCubic" });
      targetElement.scrollIntoView({ behavior: "auto", block: "start" });
      targetElement.classList.add("highlighted");

      setTimeout(() => {
        targetElement.classList.remove("highlighted");
      }, 3000);
    }
  }
});
