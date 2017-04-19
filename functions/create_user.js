const admin = require('firebase-admin');

const createUser = (req, res) => {
  // Verify the user provided a phone
  if (!req.body.phone) {
    return res.status(400).send({ error: 'Must provide a phone property' });
  }

  // Format the phone number to remove dashes/parens
  const phone = String(req.body.phone).replace(/[^\d]/g, '');
  if (phone.length !== 10) return res.status(400).send({ error: 'Phone number must be 10 digits' });

  // Create user account with that phone number
  admin.auth().createUser({ uid: phone })
    .then(user => res.send(user))
    .catch(err => res.status(400).send({ error: err.message }));

  // Respond saying account was made
};

module.exports = createUser;
