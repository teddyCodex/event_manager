// document.addEventListener("DOMContentLoaded", function () {
//   const manualVerificationForm = document.querySelector(".manual-verification");
//   const modal = document.getElementById("myModal");
//   const modalMessage = document.getElementById("modal-message");
//   const modalClose = document.querySelector(".close");

//   manualVerificationForm.addEventListener("submit", async function (event) {
//     event.preventDefault();
//     const guestNameInput = document.getElementById("guest_name");
//     const guestName = guestNameInput.value.trim();

//     try {
//       const response = await fetch("/verify_guest_manual", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//         body: `guest_name=${encodeURIComponent(guestName)}`,
//       });

//       if (response.ok) {
//         const result = await response.json();
//         modalMessage.textContent = result.message;
//         modal.style.display = "block";
//       } else {
//         console.error("Verification failed");
//       }
//     } catch (error) {
//       console.error("An error occurred:", error);
//     }
//   });

//   modalClose.addEventListener("click", function () {
//     modal.style.display = "none";
//   });
// });

document.addEventListener("DOMContentLoaded", function () {
  const manualVerificationForm = document.querySelector(".manual-verification");
  const modal = document.getElementById("myModal");
  const modalMessage = document.getElementById("modal-message");
  const modalClose = document.querySelector(".close");

  manualVerificationForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    const guestNameInput = document.getElementById("guest_name");
    const guestName = guestNameInput.value.trim();

    try {
      const response = await fetch("/verify_guest_manual", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `guest_name=${encodeURIComponent(guestName)}`,
      });

      if (response.ok) {
        const result = await response.json();
        modalMessage.textContent = result.message;
        modal.style.display = "block";
      } else {
        const errorResponse = await response.json();
        modalMessage.textContent = errorResponse.message;
        modal.style.display = "block"; // Display modal even for failed verification
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  });

  modalClose.addEventListener("click", function () {
    modal.style.display = "none";
  });
});
