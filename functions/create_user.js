const admin = require('firebase-admin');

const createUser = (req, res) => {
  if (!req.body.phone) {
    return res.status(400).send({ error: 'Must provide a phone property' });
  }

  const phone = String(req.body.phone).replace(/[^\d]/g, '');
  if (phone.length !== 10) {
    return res.status(400).send({ error: 'Phone number must be 10 digits' });
  }

  admin.auth().createUser({ uid: phone })
    .then(user => res.send(user))
    .catch(err => res.status(400).send({ error: err }));
};

module.exports = createUser;
