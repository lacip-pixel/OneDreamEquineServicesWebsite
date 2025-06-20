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
      <div class="horse-text">
        <h2>${horse?.name ?? 'Unknown Horse'}</h2>
        <p><strong>${sold ? 'Sold at listed price' : 'Price:'}</strong> ${sold ? '' : `$${sale.price.toLocaleString()}`}</p>
        ${sold ? `<p><strong>Sold On:</strong> ${new Date(sale.datesold).toLocaleDateString()}</p>` : ''}
        <p><a href="horse-details.html?id=${sale.horseid}" class="info-link">[More Information]</a></p>
        ${!sold ? `<a href="make-offer.html?horseid=${sale.horseid}" class="breed-button">Make an Offer</a>` : ''}
      </div>
      <div class="horse-image">
        ${horse?.pictureurl ? `<img src="images/${horse.pictureurl}" alt="${horse.name}">` : ''}
      </div>
    `;

    container.appendChild(card);
  }
}
