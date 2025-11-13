document.addEventListener("DOMContentLoaded", () => {
  let incomes = [
    { source: "Wallet", amount: 2350 },
    { source: "Bank Account", amount: 18056 },
  ];

  const incomeList = document.getElementById("income-list");
  const totalDisplay = document.getElementById("total");
  const addButton = document.getElementById("add-income");
  const filter = document.getElementById("filter");
  const modal = document.getElementById("income-modal");
  const cancelBtn = document.getElementById("cancel-btn");
  const saveBtn = document.getElementById("save-btn");
  const sourceInput = document.getElementById("income-source");
  const countrySelect = document.getElementById("income-country");
  const currencySymbol = document.getElementById("currency-symbol");
  const amountInput = document.getElementById("income-amount");
  const notesInput = document.getElementById("income-notes");
  const menuToggle = document.getElementById("menuToggle");
  const sidebar = document.querySelector(".sidebar");

  // ---------- Render Incomes ----------
  function renderIncomes() {
    incomeList.innerHTML = "";
    const filtered = filter.value
      ? incomes.filter((i) =>
          i.source.toLowerCase().includes(filter.value.toLowerCase())
        )
      : incomes;

    filtered.forEach((income, index) => {
      const card = document.createElement("div");
      card.classList.add("income-card");
      card.innerHTML = `
        <span class="source">${income.source}</span>
        <span class="amount">Nu.${income.amount.toLocaleString()}</span>
        <div class="actions">
          <button class="edit" onclick="editIncome(${index})">✎</button>
          <button class="delete" onclick="deleteIncome(${index})">🗑</button>
        </div>
      `;
      incomeList.appendChild(card);
    });
    updateTotal();
  }

  // ---------- Update Total ----------
  function updateTotal() {
    const total = incomes.reduce((sum, i) => sum + i.amount, 0);
    totalDisplay.textContent = `Nu.${total.toLocaleString()}`;
  }

  // ---------- Edit ----------
  window.editIncome = function (index) {
    const newAmount = parseFloat(prompt("Enter new amount:"));
    if (!isNaN(newAmount)) {
      incomes[index].amount = newAmount;
      renderIncomes();
    }
  };

  // ---------- Delete ----------
  window.deleteIncome = function (index) {
    if (confirm("Are you sure you want to delete this income?")) {
      incomes.splice(index, 1);
      renderIncomes();
    }
  };

  // ---------- Modal Handling ----------
  addButton.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  cancelBtn.addEventListener("click", () => {
    modal.style.display = "none";
    clearModal();
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });

  // ---------- Country Change ----------
  countrySelect.addEventListener("change", () => {
    const selectedOption = countrySelect.options[countrySelect.selectedIndex];
    const symbol = selectedOption.getAttribute("data-symbol") || "";
    currencySymbol.textContent = symbol;
  });

  // ---------- Save New Income ----------
  saveBtn.addEventListener("click", () => {
    const source = sourceInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const symbol = currencySymbol.textContent || "Nu.";
    const notes = notesInput.value.trim();

    if (!source || isNaN(amount)) {
      alert("⚠️ Please enter valid income details.");
      return;
    }

    incomes.push({ source, amount });
    renderIncomes();
    modal.style.display = "none";
    clearModal();
  });

  // ---------- Clear Modal ----------
  function clearModal() {
    sourceInput.value = "";
    amountInput.value = "";
    notesInput.value = "";
    countrySelect.selectedIndex = 0;
    currencySymbol.textContent = "Nu.";
  }

  // ---------- Filter ----------
  filter.addEventListener("change", renderIncomes);

  // ---------- Logout (Instant Redirect to Landing Page) ----------
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      window.location.href = "index.html"; // 👈 Redirects directly to landing page
    });
  }

  // ---------- Responsive Sidebar Toggle ----------
  if (menuToggle && sidebar) {
    menuToggle.addEventListener("click", () => {
      sidebar.classList.toggle("show");
    });
  }

  // ---------- Initial Render ----------
  renderIncomes();
});
