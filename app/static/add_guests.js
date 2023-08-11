document.addEventListener("DOMContentLoaded", function () {
  const downloadLink = document.querySelector(".download_link");
  const txtForm = document.getElementById("txtForm");
  const addGuestForm = document.querySelector(".manual");
  const infoIconManual = document.getElementById("info-icon-manual");
  const tooltipContainers = document.querySelectorAll(".tooltip-container");

  // Add a click event listener to the link
  downloadLink.addEventListener("click", function () {
    // Add the 'clicked' class to the link
    downloadLink.classList.add("clicked");
  });

  // Add event listener for form submission
  txtForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    // Get the selected txt file
    const txtFile = document.getElementById("txt_file").files[0];

    // Create FormData object to handle file upload
    const formData = new FormData();
    formData.append("txt_file", txtFile);

    // using 'formData' to send the file to the server via AJAX
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/upload-txt");

    xhr.onload = function () {
      if (xhr.status === 200) {
        // File uploaded successfully
        console.log("CSV file uploaded!");
        alert("File Uploaded!");
      } else {
        // Show error message
        console.log("Error uploading file");
      }
    };

    xhr.send(formData);
  });

  addGuestForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    const guestNameInput = document.getElementById("guest_name");
    const guestName = guestNameInput.value.trim();

    if (guestName !== "") {
      const formData = new FormData();
      formData.append("guest_name", guestName);

      // using 'formData' to send the form data to the server via AJAX
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "/add_guests");

      xhr.onload = function () {
        if (xhr.status === 200) {
          // Guest added successfully
          const response = JSON.parse(xhr.responseText);
          if (response.message === "Guest added successfully") {
            console.log("Guest added!");
            alert("Guest added!");
            guestNameInput.value = ""; // Clear the input field
          } else {
            console.log("Error adding guest");
          }
        } else {
          // Show error message
          console.log("Error communicating with the server");
        }
      };

      xhr.send(formData);
    }
  });

  tooltipContainers.forEach((container) => {
    const icon = container.querySelector(".info-icon");

    icon.addEventListener("click", function () {
      container.classList.toggle("active");
    });
  });
});
