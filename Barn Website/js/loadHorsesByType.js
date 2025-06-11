import { supabase } from './supabaseClient.js';

export async function loadHorsesByType(type, containerId) {
  const { data: horses, error } = await supabase
    .from('horse')
    .select('*')
    .eq('type', type); // lowercase since all table/column names are lowercase

  if (error) {
    console.error('Error loading horses:', error);
    return;
  }

  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = ''; // Clear previous data

  for (const horse of horses) {
    // Get sire name
        let sireName = horse.sire_name || 'Unknown';
        if (horse.sireid) {
        const { data: sire } = await supabase
            .from('horse')
            .select('name')
            .eq('horseid', horse.sireid)
            .single();
        if (sire) sireName = sire.name;
        }

        let damName = horse.dam_name || 'Unknown';
        if (horse.damid) {
        const { data: dam } = await supabase
            .from('horse')
            .select('name')
            .eq('horseid', horse.damid)
            .single();
        if (dam) damName = dam.name;
        }

    // Create card
    const card = document.createElement('div');
    card.className = 'horse-card';
    card.innerHTML = `
      <h3>${horse.name}</h3>
      ${horse.pictureurl ? `<img src="images/${horse.pictureurl}" alt="${horse.name}" style="max-width:200px;">` : ''}
      <p><strong>Sire:</strong> ${sireName}</p>
      <p><strong>Dam:</strong> ${damName}</p>
      <button onclick="window.location.href='horse-details.html?id=${horse.horseid}'">More Info</button>
    `;
    container.appendChild(card);
  }
}
