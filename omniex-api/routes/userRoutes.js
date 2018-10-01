const mongoose = require('mongoose');
const User = require('../models/User');
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
  app.post('/favorite/:slug', requireLogin,  (req, res) => {
    const slug = req.params.slug;
    User.findById(req.user.id, (err, user) => {
      user.favorites.includes(slug)
      ? user.favorites.splice(user.favorites.indexOf(slug), 1)
      : user.favorites.push(slug)

      user.save((err) => {
        if (err) {
          res.json({ success: false })
        } else {
          res.json({ success: true })
        }
      });
    });

  });
};
