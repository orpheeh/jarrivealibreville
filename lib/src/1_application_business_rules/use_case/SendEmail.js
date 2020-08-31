const MailSender = require('../messages/MailSender');

/**
 * 
 * @param {String} dst 
 * @param {String} subject 
 * @param {String} content 
 * @param {MailSender} mailSender 
 */
module.exports = async (dst, subject, content, mailSender) => {
     const result = await mailSender.sendEmail(dst, subject, content);
     return result;
}