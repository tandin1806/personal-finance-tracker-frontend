// Logout redirect
document.getElementById("logoutBtn").addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "index.html";
});

// Delete functionality
function attachDeleteButtons() {
  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.target.closest(".budget-card").remove();
    });
  });
}

// Edit functionality
function attachEditButtons() {
  document.querySelectorAll(".edit-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const card = e.target.closest(".budget-card");
      const title = card.querySelector(".budget-title");
      const newTitle = prompt("Edit budget title:", title.textContent);
      if (newTitle) title.textContent = newTitle;
    });
  });
}

attachDeleteButtons();
attachEditButtons();

// Add new budget card
document.getElementById("add-budget").addEventListener("click", () => {
  const type = prompt("Enter budget type (weekly/monthly):") || "weekly";
  const name = prompt("Enter budget name:") || "New Budget";
  const amount = prompt("Enter total amount:") || "0.00";

  const newCard = document.createElement("div");
  newCard.classList.add("budget-card");
  newCard.innerHTML = `
    <div class="budget-header">
      <div>
        <div class="budget-title">${name}</div>
        <div class="date-range">13/11/2025 - 20/11/2025</div>
      </div>
      <div class="actions">
        <button class="edit-btn">✏️</button>
        <button class="delete-btn">🗑️</button>
      </div>
    </div>
    <div class="progress-bar"><div style="width:0%"></div></div>
    <div class="amounts">
      <span>Nu.0.00</span>
      <span>Nu.0.00</span>
      <span>Nu.${amount}</span>
    </div>
    <p class="residual">Residual amount: Nu.${amount}</p>
  `;

  const section =
    type.toLowerCase() === "monthly"
      ? document.querySelectorAll(".budget-box")[1]
      : document.querySelectorAll(".budget-box")[0];

  section.appendChild(newCard);

  attachDeleteButtons();
  attachEditButtons();
});
