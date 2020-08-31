
const nodemailer = require('nodemailer');
const MailSender = require('../../1_application_business_rules/messages/MailSender')

module.exports = class extends MailSender {

  init() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.srcEmail,
        pass: this.password
      }
    });
  }

  async sendEmail(dstEmail, subject, content) {
    let info = await this.transporter.sendMail({
      from: this.srcEmail,
      to: dstEmail,
      subject: subject,
      html: content
    });

    let result = await this.transporter.sendMail(info);
    return result;
  }
}