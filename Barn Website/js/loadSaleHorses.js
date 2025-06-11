import { supabase } from './supabaseClient.js';

export async function loadSaleHorses(containerId, sold = false) {
  const query = supabase
    .from('sale')
    .select(`
      *,
      horse:horseid (name, pictureurl)
    `);

  const { data: sales, error } = sold
    ? await query.not('datesold', 'is', null)
    : await query.is('datesold', null);

  if (error) {
    console.error('Error loading sales:', error);
    return;
  }

  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = '';

  for (const sale of sales) {
    const horse = sale.horse;
    const card = document.createElement('div');
    card.className = 'horse-card';
    card.innerHTML = `
      <h3>${horse?.name ?? 'Unknown Horse'}</h3>
      ${horse?.pictureurl ? `<img src="images/${horse.pictureurl}" alt="${horse.name}" style="max-width:200px;">` : ''}
      <p><strong>Price:</strong> $${sale.price.toLocaleString()}</p>
      ${sold ? `<p><strong>Sold On:</strong> ${new Date(sale.datesold).toLocaleDateString()}</p>` : ''}
      <button onclick="window.location.href='horse-details.html?id=${sale.horseid}'">More Info</button>
    `;
    container.appendChild(card);
  }
}
