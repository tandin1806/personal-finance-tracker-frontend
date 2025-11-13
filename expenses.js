let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let categories = JSON.parse(localStorage.getItem("categories")) || [
    "Transportation", "Shopping", "Entertainment", "Food/Drinks"
];

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let editIndex = null;
let deleteIndex = null;

window.onload = () => {
    loadCategories();
    displayExpenses();
};

function toggleSidebar() {
    document.querySelector(".sidebar").classList.toggle("show");
}

function addExpense() {
    let category = document.getElementById("category").value;
    let amount = document.getElementById("amount").value;
    let date = document.getElementById("date").value;
    let notes = document.getElementById("notes").value;

    if (!category || !amount || !date) {
        alert("Fill all fields");
        return;
    }

    expenses.push({category, amount: -Number(amount), date, notes});
    localStorage.setItem("expenses", JSON.stringify(expenses));
    clearForm();
    displayExpenses();
}

function editExpense(i) {
    let e = expenses[i];
    document.getElementById("category").value = e.category;
    document.getElementById("amount").value = Math.abs(e.amount);
    document.getElementById("date").value = e.date;
    document.getElementById("notes").value = e.notes;
    editIndex = i;
    document.getElementById("addBtn").style.display = "none";
    document.getElementById("updateBtn").style.display = "block";
}

function updateExpense() {
    let category = document.getElementById("category").value;
    let amount = document.getElementById("amount").value;
    let date = document.getElementById("date").value;
    let notes = document.getElementById("notes").value;

    expenses[editIndex] = {category, amount: -Number(amount), date, notes};
    localStorage.setItem("expenses", JSON.stringify(expenses));
    clearForm();
    displayExpenses();

    document.getElementById("addBtn").style.display = "block";
    document.getElementById("updateBtn").style.display = "none";
}

function deleteExpense(i) {
    deleteIndex = i;
    document.getElementById("confirmPopup").style.display = "flex";
}

function confirmDelete(yes) {
    document.getElementById("confirmPopup").style.display = "none";
    if (yes) {
        expenses.splice(deleteIndex, 1);
        localStorage.setItem("expenses", JSON.stringify(expenses));
        displayExpenses();
    }
}

function displayExpenses() {
    let table = document.getElementById("transaction-table");
    table.innerHTML = "";

    let filtered = expenses.filter(e => {
        let d = new Date(e.date);
        return d.getFullYear() === currentYear && d.getMonth() === currentMonth;
    });

    let total = 0;

    filtered.forEach((e, i) => {
        total += e.amount;
        let row = table.insertRow();
        row.innerHTML = `
            <td>${e.category}</td>
            <td>Nu.${e.amount}</td>
            <td>${e.date}</td>
            <td>
                <i class="fa fa-pen" onclick="editExpense(${i})"></i>
                <i class="fa fa-trash" onclick="deleteExpense(${i})"></i>
            </td>
        `;
    });

    document.getElementById("month-display").innerText =
        new Date(currentYear, currentMonth).toLocaleString("default", {month:"long", year:"numeric"});

    document.getElementById("count").innerText = "Transactions: " + filtered.length;
    document.getElementById("total").innerHTML = "Total: <span style='color:red'>Nu."+total+"</span>";
}

function openCategoryPopup() {
    document.getElementById("categoryPopup").style.display = "flex";
}

function closePopup() {
    document.getElementById("categoryPopup").style.display = "none";
}

function loadCategories() {
    let list = document.getElementById("categoryList");
    list.innerHTML = "";
    categories.forEach(c => {
        let li = document.createElement("li");
        li.innerText = c;
        li.onclick = () => {
            document.getElementById("category").value = c;
            closePopup();
        };
        list.appendChild(li);
    });
}

function filterCategory() {
    let q = document.getElementById("searchCategory").value.toLowerCase();
    document.querySelectorAll("#categoryList li").forEach(li => {
        li.style.display = li.innerText.toLowerCase().includes(q) ? "block" : "none";
    });
}

function addCustomCategory() {
    let c = document.getElementById("newCategory").value.trim();
    if (c && !categories.includes(c)) {
        categories.push(c);
        localStorage.setItem("categories", JSON.stringify(categories));
        loadCategories();
    }
    document.getElementById("newCategory").value = "";
}

function clearForm() {
    document.getElementById("category").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("date").value = "";
    document.getElementById("notes").value = "";
}
