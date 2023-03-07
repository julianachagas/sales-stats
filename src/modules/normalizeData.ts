declare global {
  type PaymentMethod = 'Boleto' | 'Cartão de Crédito';
  type PaymentStatus =
    | 'Paga'
    | 'Recusada pela operadora de cartão'
    | 'Aguardando pagamento'
    | 'Estornada';

  interface PaymentDataAPI {
    Status: PaymentStatus;
    ID: number;
    Data: string;
    Nome: string;
    Email: string;
    ['Forma de Pagamento']: PaymentMethod;
    ['Valor (R$)']: string;
    ['Cliente Novo']: number;
  }

  interface PaymentData {
    status: PaymentStatus;
    id: number;
    date: Date;
    name: string;
    payment: PaymentMethod;
    email: string;
    total: string;
    value: number | null;
    new_client: boolean;
  }
}

/**
 * Convert a "dd/MM/yyyy hh:mm" string into a Date object
 * @param string
 */
function convertStringToDate(date: string) {
  const [day, month, yearAndTime] = date.split('/');
  return new Date(`${month}/${day}/${yearAndTime}`);
}

/**
 * string 1.200,50 -> return number 1200.50
 */
function convertTotalToNumber(value: string) {
  const number = +value.replace(/\./g, '').replace(',', '.');
  return isNaN(number) ? null : number;
}

export function normalizeData(data: PaymentDataAPI[]): PaymentData[] {
  return data.map(item => ({
    status: item.Status,
    id: item['ID'],
    date: convertStringToDate(item.Data),
    name: item.Nome,
    payment: item['Forma de Pagamento'],
    email: item.Email,
    total: item['Valor (R$)'],
    value: convertTotalToNumber(item['Valor (R$)']),
    new_client: Boolean(item['Cliente Novo']),
  }));
}
