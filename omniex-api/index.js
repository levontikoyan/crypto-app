const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config()
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use( (req, res, next) => {
  const url  = req.header('Referer');
  if (!req.url.startsWith('/auth/google/callback?')){
      req.session.lastUrl = null
  }
  const splitedUrl = ( url || '' ).split('/')
  if (splitedUrl[3] === 'coin') {
    req.session.lastUrl = url
  }
  next()
});

require('./routes/authRoutes')(app);
require('./routes/userRoutes')(app);

app.get('/', (req, res) => {
  let adminContent = `
    <div>
      You don't appear to be logged in.
    </div>
  `;
  if (req.user) {
    adminContent = `
      <div>
        You appear to be logged in.
      </div>
    `;
  }
  res.send(`
    <div>
      <h4>Welcome to the Omniex API</h4>
      ${adminContent}
    </div>
  `);
});

app.get('/coins', (req, res) => {
  axios.get('https://api.coinmarketcap.com/v2/ticker/?structure=array')
    .then((response) => res.json({success: true, data: response.data.data }))
    .catch((err) => res.json({success: false, data: [] }))
})

app.get('/chart-data', (req, res) => {
  const slug = req.query.slug;
  axios.get(`https://graphs2.coinmarketcap.com/currencies/${slug}`)
    .then((response) => res.json({success: true, data: response.data.price_usd }))
    .catch((err) => res.json({success: false, data: [] }))
})



const PORT = process.env.PORT || 5000;
app.listen(PORT);
