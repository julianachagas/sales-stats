import { Stats } from './Stats';

function displayNumberOfSales(
  id: string,
  list: {
    [key: string]: number;
  },
) {
  const element = document.getElementById(id);
  if (element) {
    Object.keys(list).forEach(key => {
      element.innerHTML += `<p>${key}: ${list[key]}</p>`;
    });
  }
}

export function displayStats(data: PaymentData[]) {
  const stats = new Stats(data);

  // total sum of sales
  const total = document.querySelector('#total-sales span');
  if (total)
    total.textContent = stats.total.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    });

  // number of sales by payment method and status
  displayNumberOfSales('payment', stats.payment);
  displayNumberOfSales('status', stats.status);

  // day with the most sales
  const dayMostSalesEl = document.querySelector('#day-most-sales span');
  if (dayMostSalesEl) dayMostSalesEl.textContent = stats.dayMostSales;
}
