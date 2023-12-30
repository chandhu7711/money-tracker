document.addEventListener('DOMContentLoaded', async () => {
  const transactionsContainer = document.getElementById('transactions-container');

  // Fetch transactions from the server
  const response = await axios.get('/transactions');
  const transactions = response.data;

  // Display transactions on the page
  transactions.forEach(transaction => {
    const transactionElement = document.createElement('div');
    transactionElement.classList.add('transaction');
    transactionElement.innerHTML = `
      <p>${transaction.description}</p>
      <p>${transaction.type === 'income' ? '+' : '-'} $${transaction.amount}</p>
    `;
    transactionsContainer.appendChild(transactionElement);
  });
});
