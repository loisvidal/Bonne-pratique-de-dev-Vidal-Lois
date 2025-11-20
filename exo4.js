class MailProvider {
  async sendEmail({ to, subject, text }) {
    throw new Error('sendEmail must be implemented');
  }
}

class SendGridMailProvider extends MailProvider {
  constructor(sendgridLib) {
    super();
    this.sendgridLib = sendgridLib;
  }

  async sendEmail({ to, subject, text }) {
    await this.sendgridLib.send({ to, subject, text });
  }
}

class FakeMailProvider extends MailProvider {
  constructor() {
    super();
    this.sentEmails = [];
  }

  async sendEmail(email) {
    this.sentEmails.push(email);
  }
}

class EmailService {
  constructor(mailProvider) {
    this.mailProvider = mailProvider;
  }

  async sendWelcomeEmail(user) {
    const subject = 'Bienvenue sur notre plateforme';
    const text = `Bonjour ${user.firstName},

Merci pour votre inscription.

À bientôt !`;

    await this.mailProvider.sendEmail({
      to: user.email,
      subject,
      text,
    });
  }
}

const sendgrid = {
  async send({ to, subject, text }) {
    console.log('[sendgrid] Email envoyé à', to, 'Sujet:', subject);
    console.log(text);
  },
};

const sendgridProvider = new SendGridMailProvider(sendgrid);
const emailServiceProd = new EmailService(sendgridProvider);

const userProd = { firstName: 'Kenan', email: 'kenan@example.com' };
emailServiceProd.sendWelcomeEmail(userProd);
