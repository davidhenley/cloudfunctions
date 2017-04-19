const admin = require('firebase-admin');
const twilio = require('./twilio');

const requestOneTimePassword = (req, res) => {
  if (!req.body.phone) {
    return res.status(400).send({ error: 'Must provide a phone property' });
  }

  const phone = String(req.body.phone).replace(/[^\d]/g, '');
  if (phone.length !== 10) {
    return res.status(400).send({ error: 'Phone number must be 10 digits' });
  }

  admin.auth().getUser(phone)
    .then(user => {
      const code = Math.floor(Math.random() * 9000 + 1000);

      twilio.messages.create({
        to: phone,
        body: `Your code is ${code}`,
        from: '+16157249392'
      });
      // TO DO: ADD ON CALLBACK
    })
    .catch(err => res.status(400).send({ error: err }));
};

module.exports = requestOneTimePassword;
