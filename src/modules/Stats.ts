export class Stats {
  private data;
  total;
  salesByDay;
  dayMostSales;
  payment;
  status;
  constructor(data: PaymentData[]) {
    this.data = data;
    this.total = this.setTotal();
    this.salesByDay = this.setSalesByDay();
    this.dayMostSales = this.setDayMostSales();
    this.payment = this.setPayment();
    this.status = this.setStatus();
  }

  private setTotal() {
    return this.data.reduce((sum, item) => {
      return item.value !== null ? sum + item.value : sum;
    }, 0);
  }

  private setSalesByDay() {
    const daysOfTheWeek: { [key: string]: number } = {
      Domingo: 0,
      Segunda: 0,
      Terça: 0,
      Quarta: 0,
      Quinta: 0,
      Sexta: 0,
      Sábado: 0,
    };
    const entries = Object.entries(daysOfTheWeek);
    this.data.forEach(item => {
      const dayIndex = item.date.getDay();
      const [key] = entries[dayIndex];
      daysOfTheWeek[key]++;
    });
    return daysOfTheWeek;
  }

  private setDayMostSales() {
    const values = Object.values(this.salesByDay);
    const maxSales = Math.max(...values);
    const indexMax = values.findIndex(item => item === maxSales);
    return Object.keys(this.salesByDay)[indexMax];
  }

  private countBy(property: 'status' | 'payment') {
    return this.data.reduce((acc: { [key: string]: number }, item) => {
      const key = item[property];
      if (acc[key]) {
        acc[key]++;
      } else {
        acc[key] = 1;
      }
      return acc;
    }, {});
  }

  private setPayment() {
    return this.countBy('payment');
  }
  private setStatus() {
    return this.countBy('status');
  }
}
