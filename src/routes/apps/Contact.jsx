// ─── Kontaktformular ───
// simuliertes Kontaktformular im Apple-Style
// zeigt eine Sidebar mit Kontaktinfo und ein Formular zum Absenden
import { useState } from 'react';
import './Contact.css';
import { useTranslation } from '../../i18n/LanguageContext';

export default function Contact() {
  const t = useTranslation();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null); // 'sending' | 'sent' | null

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const canSend = form.name.trim() && form.email.trim() && form.message.trim();

  // Absenden simulieren
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSend || status === 'sending') return;
    setStatus('sending');
    setTimeout(() => {
      setStatus('sent');
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus(null), 3000);
    }, 1500);
  };

  return (
    <div className="contact">
      {/* Sidebar */}
      <div className="contact-sidebar">
        <div className="contact-icon-wrap">
          <img src="/icons/mail.webp" alt="Contact" />
        </div>
        <div className="contact-title">{t('contact_title')}</div>
        <div className="contact-badge">
          <span className="contact-badge-dot" />
          {t('contact_available')}
        </div>

        <div className="contact-divider" />

        <div className="contact-info-label">{t('contact_info')}</div>
        <div className="contact-info-rows">
          <div className="contact-info-row">
            <span className="contact-info-key">E-Mail</span>
            <span className="contact-info-val">info@plattnericus.dev</span>
          </div>
          <div className="contact-info-row">
            <span className="contact-info-key">{t('contact_response')}</span>
            <span className="contact-info-val contact-green">~ 24h</span>
          </div>
        </div>
      </div>

      {/* Formular */}
      <div className="contact-main">
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-group" style={{ animationDelay: '0s' }}>
            <div className="contact-group-label">{t('contact_your_info')}</div>
            <div className="contact-card">
              <div className="contact-field">
                <label>{t('contact_name')}</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={update('name')}
                  placeholder={t('contact_name_ph')}
                  autoComplete="off"
                  spellCheck={false}
                />
              </div>
              <div className="contact-field">
                <label>E-Mail</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={update('email')}
                  placeholder={t('contact_email_ph')}
                  autoComplete="off"
                  spellCheck={false}
                />
              </div>
            </div>
          </div>

          <div className="contact-group" style={{ animationDelay: '0.06s' }}>
            <div className="contact-group-label">{t('contact_message_label')}</div>
            <div className="contact-card">
              <div className="contact-field">
                <label>{t('contact_subject')}</label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={update('subject')}
                  placeholder={t('contact_subject_ph')}
                  autoComplete="off"
                  spellCheck={false}
                />
              </div>
              <div className="contact-field contact-field-textarea">
                <label>{t('contact_message')}</label>
                <textarea
                  value={form.message}
                  onChange={update('message')}
                  placeholder={t('contact_message_ph')}
                  rows={5}
                  spellCheck={false}
                />
              </div>
            </div>
          </div>

          <div className="contact-group" style={{ animationDelay: '0.12s' }}>
            <button
              type="submit"
              className={`contact-send${!canSend ? ' disabled' : ''}${status === 'sending' ? ' sending' : ''}${status === 'sent' ? ' sent' : ''}`}
              disabled={!canSend || status === 'sending'}
            >
              {status === 'sending' ? t('contact_sending') : status === 'sent' ? t('contact_sent') : t('contact_send')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
