'use client';
import { useCallback, useRef, useState } from 'react';
import { Send } from 'lucide-react';
import Toast, { type ToastState } from '@/components/ui/Toast';

type Field = 'name' | 'email' | 'message';
type Errors = Partial<Record<Field, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: Record<Field, string>): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = 'Please tell me your name.';
  if (!values.email.trim()) errors.email = 'Please add an email so I can reply.';
  else if (!EMAIL_RE.test(values.email.trim())) errors.email = 'That email doesn’t look right.';
  if (!values.message.trim()) errors.message = 'Please write a message.';
  return errors;
}

const fieldClass =
  'w-full rounded-xl border bg-bg px-4 py-3 text-fg transition-colors duration-micro focus:border-accent focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2';

/** EmailJS contact form (POST /api/emailjs — contract unchanged). */
export default function ContactForm() {
  const [values, setValues] = useState<Record<Field, string>>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const closeToast = useCallback(() => setToast(null), []);

  const update = (field: Field) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    if (errors[field]) setErrors((err) => ({ ...err, [field]: undefined }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    const first = (Object.keys(found) as Field[])[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`#contact-${first}`)?.focus();
      return;
    }

    setSending(true);
    try {
      const res = await fetch('/api/emailjs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: values.name.trim(), email: values.email.trim(), message: values.message.trim() }),
      });
      if (!res.ok) throw new Error('send failed');
      setValues({ name: '', email: '', message: '' });
      setToast({ id: Date.now(), type: 'success', message: 'Thanks — your message is on its way.' });
    } catch {
      setToast({ id: Date.now(), type: 'error', message: 'Couldn’t send that. Please try again or email me directly.' });
    } finally {
      setSending(false);
    }
  };

  const describe = (field: Field) => (errors[field] ? `contact-${field}-error` : undefined);

  return (
    <>
      <form ref={formRef} onSubmit={onSubmit} noValidate className="flex flex-col gap-5" aria-label="Contact form">
        <div className="grid gap-5 sm:grid-cols-2">
          {(['name', 'email'] as const).map((field) => (
            <div key={field} className="flex flex-col gap-2">
              <label htmlFor={`contact-${field}`} className="font-mono text-label uppercase text-fg-muted">
                {field === 'name' ? 'Name' : 'Email'}
              </label>
              <input
                id={`contact-${field}`}
                name={field}
                type={field === 'email' ? 'email' : 'text'}
                autoComplete={field === 'email' ? 'email' : 'name'}
                value={values[field]}
                onChange={update(field)}
                aria-invalid={!!errors[field]}
                aria-describedby={describe(field)}
                className={`${fieldClass} ${errors[field] ? 'border-accent-gallery' : 'border-line'}`}
              />
              {errors[field] && (
                <p id={`contact-${field}-error`} className="text-sm text-[#FF8A8D]">
                  {errors[field]}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="contact-message" className="font-mono text-label uppercase text-fg-muted">
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            value={values.message}
            onChange={update('message')}
            aria-invalid={!!errors.message}
            aria-describedby={describe('message')}
            className={`${fieldClass} resize-none ${errors.message ? 'border-accent-gallery' : 'border-line'}`}
          />
          {errors.message && (
            <p id="contact-message-error" className="text-sm text-[#FF8A8D]">
              {errors.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={sending}
          className="inline-flex items-center justify-center gap-2 self-start rounded-full bg-fg px-6 py-3 text-sm font-semibold text-bg transition-opacity duration-micro hover:opacity-90 disabled:cursor-wait disabled:opacity-60"
        >
          {sending ? 'Sending…' : 'Send message'}
          <Send aria-hidden="true" size={16} />
        </button>
      </form>
      <Toast toast={toast} onClose={closeToast} />
    </>
  );
}
