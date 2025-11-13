// Open modal
function openModal(id) {
    document.getElementById(id).style.display = "block";
}

// Close modal
function closeModal(id) {
    document.getElementById(id).style.display = "none";
}

// Close when clicking outside modal
window.onclick = function(event) {
    const modals = document.querySelectorAll(".modal");
    modals.forEach(modal => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
}

// Scroll to features section
function scrollToFeatures() {
    document.querySelector("#features").scrollIntoView({ behavior: "smooth" });
}

// Assuming you already have openModal and closeModal functions.
// If not, here they are:

function openModal(id) {
  document.getElementById(id).style.display = "block";
}

function closeModal(id) {
  document.getElementById(id).style.display = "none";
}

// Redirect to dashboard after login form submission
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault(); // prevent page reload
    window.location.href = "dashboard.html"; // redirect to dashboard
  });
}

// Redirect to dashboard after signup form submission
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();
    window.location.href = "dashboard.html";
  });
}
