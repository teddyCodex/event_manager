document.addEventListener("DOMContentLoaded", function () {
  const verifyGuestButton = document.getElementById("verifyGuestButton");
  const manageGuestListButton = document.getElementById(
    "manageGuestListButton"
  );
  const viewGuestListButton = document.getElementById("viewGuestListButton");

  verifyGuestButton.addEventListener("click", function () {
    // Navigate to Verify Guest page
    window.location.href = "/verify_guest";
  });

  viewGuestListButton.addEventListener("click", function () {
    // Navigate to View Guest List
    window.location.href = "/guest_list";
  });

  manageGuestListButton.addEventListener("click", function () {
    // Navigate to Manage Guest List page
    window.location.href = "/add_guests";
  });
});
