const express = require('express');
const smsUtils = require('./src/utilities/sms_utils');

const app = express();
const PORT = process.env.PORT;

app.use(express.urlencoded({
  extended: true
}));

app.get('/', (req, res) => {
  res.send('Hello world!');
});


app.post('/notify', async (req, res) => {
  console.log('Notify callback triggered: ', req.body);

  const recipient = req.body.from;
  const incomingSmsMessage = req.body.body;
  try {
    await smsUtils.sendLocationNames(recipient, incomingSmsMessage);
  } catch (e) {
    console.log('notify error: ', e);
  }

  res.send('Responded');
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
