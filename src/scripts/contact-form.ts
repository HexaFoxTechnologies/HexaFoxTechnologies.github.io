/**
 * Submit the contact form in place with fetch so visitors stay on the page.
 * Without JavaScript the form still posts normally and Web3Forms redirects to /thanks/.
 */
type FormState = 'idle' | 'sending' | 'success' | 'error';

const form = document.querySelector<HTMLFormElement>('[data-contact-form]');

if (form) {
  const status = form.querySelector<HTMLElement>('[data-form-status]');
  const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]');

  const setState = (state: FormState, message = '') => {
    form.dataset.state = state;
    if (status) status.textContent = message;
    if (submit) submit.disabled = state === 'sending';
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const data = new FormData(form);
    if (data.get('botcheck')) return;
    data.delete('redirect');

    setState('sending', 'Sending…');
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      });
      const result: { success?: boolean } = await response.json();
      if (!response.ok || !result.success) throw new Error('Submission failed');

      form.reset();
      setState('success', 'Thanks, we’ve got your message and will reply soon.');
    } catch {
      setState('error', `Something went wrong. Please email us at ${form.dataset.email}.`);
    }
  });
}
