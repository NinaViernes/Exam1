let incomeTotal = 0
let expenseTotal = 0

document.getElementById('add-income-btn').innerHTML = addIncome;
document.getElementById('add-expense-btn').innerHTML = addExpense;
document.getElementById('clear-btn').innerHTML = clearAll;

function addIncome() {
    const incomeDescription = document.getElementById('income-description');
    const incomeAmount = document.getElementById('income-amount');
    
    const description = incomeDescription.value.trim();
    const amount = parseFloat(incomeAmount.value.trim());

    if (description === '' || isNaN(amount) || amount <= 0) {
        alert('Please enter a valid income description and amount.');
        return;
    }

    addTransaction(description, amount, 'Income');
    incomeTotal += amount;
    updateSummary();

    incomeDescription.value = '';
    incomeAmount.value = '';
}

function addExpense() {
    const expenseDescription = document.getElementById('expense-description');
    const expenseCategory = document.getElementById('expense-category');
    const expenseAmount = document.getElementById('expense-amount');
    
    const description = expenseDescription.value.trim();
    const category = expenseCategory.value;
    const amount = parseFloat(expenseAmount.value.trim());

    if (description === '' || isNaN(amount) || amount <= 0) {
        alert('Please enter a valid expense description and amount.');
        return;
    }

    addTransaction(description, amount, category);
    expenseTotal += amount;
    updateSummary();

    expenseDescription.value = '';
    expenseAmount.value = '';
}

function addTransaction(description, amount, type) {
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${description}</td>
        <td>${type === 'Income' ? '-' : type}</td>
        <td>${amount.toFixed(2)}</td>
        <td>${type}</td>
        <td><button class="delete-btn">Delete</button></td>
    `;

    document.getElementById('transaction-history').appendChild(row);

    row.querySelector('.delete-btn').addEventListener('click', function () {
        row.remove();

        if (type === 'Income') {
            incomeTotal -= amount;
        } else {
            expenseTotal -= amount;
        }

        updateSummary();
    });
}

function updateSummary() {
    const balanceElement = document.getElementById('balance');
    
    const balance = incomeTotal - expenseTotal;
    balanceElement.textContent = balance.toFixed(2);

    if (balance >= 0) {
        balanceElement.style.color = 'green';
    } else {
        balanceElement.style.color = 'red';
    }

    document.getElementById('total-income').textContent = incomeTotal.toFixed(2);
    document.getElementById('total-expenses').textContent = expenseTotal.toFixed(2);
}

function clearAll() {
    document.getElementById('transaction-history').innerHTML = '';
    incomeTotal = 0;
    expenseTotal = 0;
    updateSummary();
}

