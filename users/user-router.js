  
const router = require('express').Router();

const Users = require('./user-model');
const restricted = require('../middleware/restricted-middleware.js');


router.get('/', restricted, (req, res) => {
  Users.find()
    .then((users) => {
        console.log(users);
        res.json(users);
    })
    .catch((err) => res.send(err));
});
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Users.remove(id)
    .then((deleted) => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res.status(404).json({ message: 'Could not find user with given id' });
      }
    })
    .catch(() => {
      res.status(500).json({ message: 'Failed to delete user' });
    });
});

module.exports = router;