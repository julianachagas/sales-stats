import './style.css';
import { normalizeData } from './modules/normalizeData';
import { displayData } from './modules/displayData';
import { displayStats } from './modules/displayStats';
import { fetchData } from './modules/fetchData';

async function handleData() {
  const data = await fetchData<PaymentDataAPI[]>(
    'https://api.origamid.dev/json/transacoes.json',
  );
  if (!data) return;
  const normalizedData = normalizeData(data);
  displayData(normalizedData);
  displayStats(normalizedData);
}

handleData();
