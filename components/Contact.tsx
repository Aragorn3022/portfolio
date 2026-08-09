import { Window } from "@/components/win98/Window";

export function Contact() {
  return (
    <section aria-label="Contact">
      <Window id="contact" title="Inbox - Outlook Express" eyebrow="Inbox">
        <div className="mail-layout">
          <nav className="mail-tree well" aria-label="Mail folders">
            <ul>
              <li>
                <strong>Inbox (1)</strong>
              </li>
              <li>Outbox</li>
              <li>Sent Items</li>
              <li>Deleted Items</li>
            </ul>
          </nav>
          <div className="mail-reading well">
            <div className="mail-header">
              <div>
                <b>From:</b> Aswad Yousaf
              </div>
              <div>
                <b>Subject:</b> Let&apos;s build something
              </div>
            </div>
            <p>
              Have a project, a role, or just a question about one of the builds above? I read
              every message.
            </p>
            <div className="contact-actions">
              <a className="btn98" href="mailto:aswadyousaf9@gmail.com">
                ✉ Email me
              </a>
              <a className="btn98" href="https://github.com/Aragorn3022" target="_blank" rel="noopener">
                GitHub ↗
              </a>
              <a className="btn98" href="/resume.pdf" download>
                📄 Download Resume
              </a>
            </div>
          </div>
        </div>
      </Window>
    </section>
  );
}
