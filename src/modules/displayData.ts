export function displayData(data: PaymentData[]) {
  const tableBody = document.querySelector('#data-table tbody');
  if (tableBody) {
    const html = data
      .map(
        item =>
          `<tr><td>${item.name}</td><td>${item.email}</td><td>R$ ${item.total}</td><td>${item.payment}</td><td>${item.status}</td></tr>`,
      )
      .join('');

    tableBody.innerHTML = html;
  }
}
