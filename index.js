const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({
  extended: true
}));

app.get('/', (req, res) => {
  console.log('root');
  res.send('hello world root');
});

app.post('/notify', (req, res) => {
  console.log('notify: ', req.body);
  console.log('message from', req.body.body, req.body.from);
  res.send('ok notify');
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
