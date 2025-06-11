import { supabase } from './supabaseClient.js';

export async function loadHorsesByType(type, containerId) {
  const { data: horses, error } = await supabase
    .from('horse')
    .select('*')
    .eq('type', type);

  if (error) {
    console.error('Error loading horses:', error);
    return;
  }

  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = '';

  for (const horse of horses) {
    const card = document.createElement('div');
    card.className = 'horse-card';

    card.innerHTML = `
      <div class="horse-text">
        <h2>${horse.name}</h2>
        <p><strong>SIRE:</strong> ${horse.sire_name || 'Unknown'}</p>
        <p><strong>DAM:</strong> ${horse.dam_name || 'Unknown'}</p>
        <p>${new Date(horse.dateofbirth).getFullYear()} ${horse.breed}</p>
        <p><a href="horse-details.html?id=${horse.horseid}" class="info-link">[More Information]</a></p>
        ${horse.type === 'Stallion' ? `<a href="breeding-request.html?sirename=${encodeURIComponent(horse.name)}" class="breed-button">Request Breeding</a>` : ''}
      </div>
      <div class="horse-image">
        ${horse.pictureurl ? `<img src="images/${horse.pictureurl}" alt="${horse.name}">` : ''}
      </div>
    `;
    container.appendChild(card);
  }
}
