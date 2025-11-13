document.addEventListener('DOMContentLoaded', () => {
  const achievementModal = new bootstrap.Modal(document.getElementById('achievementModal'));
  const achievementBody = document.getElementById('achievementModalBody');
  const securityModal = new bootstrap.Modal(document.getElementById('securityModal'));

  const profileSection = document.getElementById('profile-section');
  const achievementSection = document.getElementById('achievement-section');

  // --- Achievement Popup Function ---
  function showAchievementPopup(title, message) {
    achievementBody.innerHTML = `<h5>${title}</h5><p>${message}</p>`;
    achievementModal.show();
  }

  // --- Confetti Animation ---
  function throwConfetti() {
    const container = document.getElementById('confetti-container');
    const confettiEmojis = ['🎀', '🌸', '🌺', '🎉', '✨', '🌷', '🎊'];
    const count = 30;

    for (let i = 0; i < count; i++) {
      const confetti = document.createElement('div');
      confetti.classList.add('confetti-piece');
      confetti.style.left = Math.random() * window.innerWidth + 'px';
      confetti.style.animationDelay = (Math.random() * 2) + 's';
      confetti.style.fontSize = (12 + Math.random() * 24) + 'px';
      confetti.textContent = confettiEmojis[Math.floor(Math.random() * confettiEmojis.length)];

      container.appendChild(confetti);

      confetti.addEventListener('animationend', () => confetti.remove());
    }
  }

  // --- Switch to Achievement Section ---
  document.getElementById('achievement-link').addEventListener('click', (e) => {
    e.preventDefault();
    profileSection.style.display = 'none';
    achievementSection.style.display = 'block';
  });

  // --- Back Button ---
  document.getElementById('back-btn').addEventListener('click', () => {
    achievementSection.style.display = 'none';
    profileSection.style.display = 'block';
  });

  // --- Achievement Cards ---
  document.querySelectorAll('.achievement-card').forEach(card => {
    card.addEventListener('click', () => {
      const title = card.querySelector('h5').innerText;
      const message = card.querySelector('p').innerText;
      showAchievementPopup(title, message);
      throwConfetti();
    });
  });

  // --- Security Modal ---
  document.getElementById('security-link').addEventListener('click', (e) => {
    e.preventDefault();
    securityModal.show();
  });

  // --- ✅ KEEP ONLY SCREEN POPUP LOGOUT CONFIRMATION ---
  const logoutBtn = document.getElementById('logout-btn');
  const confirmLogoutBtn = document.getElementById('confirm-logout-btn');
  const logoutModal = new bootstrap.Modal(document.getElementById('logoutConfirmModal'));

  logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    logoutModal.show(); // Show screen popup only
  });

  confirmLogoutBtn.addEventListener('click', () => {
    // Clear session/local storage if any
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = 'index.html'; // Redirect to landing page
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // --- Profile View & Edit Logic ---
  const profileViewSection = document.getElementById('profile-view-section');
  const profileEditSection = document.getElementById('profile-section');
  const editProfileLink = document.getElementById('edit-profile-link');
  const editProfileBtn = document.getElementById('edit-profile-btn');
  const cancelEditBtn = document.getElementById('cancel-edit-btn');
  const confirmEditBtn = document.getElementById('confirm-edit-btn');
  const editConfirmModal = new bootstrap.Modal(document.getElementById('editConfirmModal'));

  // Elements for view mode
  const viewName = document.getElementById('view-name');
  const viewPhone = document.getElementById('view-phone');
  const viewEmail = document.getElementById('view-email');
  const viewAddress = document.getElementById('view-address');
  const viewOccupation = document.getElementById('view-occupation');
  const viewBio = document.getElementById('view-bio');

  // Elements for edit form inputs
  const inputName = document.getElementById('name');
  const inputPhone = document.getElementById('phone');
  const inputEmail = document.getElementById('email');
  const inputPassword = document.getElementById('password');
  const inputAddress = document.getElementById('address');
  const inputOccupation = document.getElementById('occupation');
  const inputBio = document.getElementById('bio');

  // Load Profile Data
  function loadProfileData() {
    const name = inputName.value || 'John Doe';
    const phone = inputPhone.value || '+1234567890';
    const email = inputEmail.value || 'john@example.com';
    const address = inputAddress.value || '123 Main Street';
    const occupation = inputOccupation.value || 'Student';
    const bio = inputBio.value || 'This is a short bio about me.';

    viewName.textContent = name;
    viewPhone.textContent = phone;
    viewEmail.textContent = email;
    viewAddress.textContent = address;
    viewOccupation.textContent = occupation.charAt(0).toUpperCase() + occupation.slice(1);
    viewBio.textContent = bio;

    inputName.value = name;
    inputPhone.value = phone;
    inputEmail.value = email;
    inputAddress.value = address;
    inputOccupation.value = occupation.toLowerCase();
    inputBio.value = bio;
    inputPassword.value = '';
  }

  // Initial Load
  loadProfileData();

  // Edit Confirmation Modal
  function showEditConfirm() {
    editConfirmModal.show();
  }

  editProfileLink.addEventListener('click', (e) => {
    e.preventDefault();
    showEditConfirm();
  });

  editProfileBtn.addEventListener('click', () => {
    showEditConfirm();
  });

  // Confirm Edit
  confirmEditBtn.addEventListener('click', () => {
    editConfirmModal.hide();
    profileViewSection.style.display = 'none';
    profileEditSection.style.display = 'block';
  });

  // Cancel Edit
  cancelEditBtn.addEventListener('click', () => {
    profileEditSection.style.display = 'none';
    profileViewSection.style.display = 'block';
  });

  // Update Profile
  document.getElementById('update-btn').addEventListener('click', () => {
    loadProfileData();
    profileEditSection.style.display = 'none';
    profileViewSection.style.display = 'block';
    alert('Profile updated successfully!');
  });
});
