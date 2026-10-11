document.querySelectorAll('a[href="#download-cv"]').forEach((button) => {
  button.addEventListener('click', async (event) => {
    event.preventDefault();
    if (button.dataset.downloading === 'true') return;
    button.dataset.downloading = 'true';

    try {
      const response = await fetch('./Radha-Kishan-Sharma-CV.base64.txt', { cache: 'no-cache' });
      if (!response.ok) throw new Error('CV file could not be loaded');

      const binary = atob((await response.text()).trim());
      const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
      const objectUrl = URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' }));
      const download = document.createElement('a');
      download.href = objectUrl;
      download.download = 'Radha-Kishan-Sharma-CV.pdf';
      document.body.appendChild(download);
      download.click();
      download.remove();
      setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
    } catch (error) {
      button.textContent = 'CV download unavailable';
      console.error(error);
    } finally {
      button.dataset.downloading = 'false';
    }
  });
});
