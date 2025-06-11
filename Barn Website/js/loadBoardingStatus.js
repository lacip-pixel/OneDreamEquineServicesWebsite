import { supabase } from './supabaseClient.js';

export async function loadBoardingStatus(containerId) {
  const container = document.getElementById(containerId);
  const contractLink = document.getElementById('boarding-link');
  const waitlistButton = document.getElementById('waitlist-button');

  const { data, error } = await supabase
    .from('barn')
    .select('*')
    .single();

  if (error || !data) {
    container.innerText = "Unable to load boarding status.";
    return;
  }

  const openStalls = data.totalstalls - data.occupiedstalls;

  if (openStalls > 0) {
    container.innerHTML = `<p>We currently have open stalls available.</p>`;
    contractLink.style.display = 'inline-block';
    waitlistButton.style.display = 'none';
  } else {
    container.innerHTML = `<p><strong>Boarding is currently full.</strong></p>`;
    contractLink.style.display = 'none';
    waitlistButton.style.display = 'inline-block';
  }
}
