const express = require('express')
const axios = require('axios')

const app = express()
const PORT = process.env.PORT || 3000

app.get('/redirect', (req, res) => {
  // After someone subscribed:
  // sample: /?access_token=E1enKbxfLBUH7b_1E500G_V16fM-Yxmm1VHAR15Re9I&subscriber_number=9179471234
  console.log('redirect: ', req.query)
  if (req.query && req.query.access_token && req.query.subscriber_number) {
    res.send('Hello World from REDIRECT!')
  } else {
    res.status(404).send('Sorry, nothing here!')
  }
})

app.use(express.json())
app.post('/notify', (req, res) => {
  // on receive of SMS
  // {
  //   "inboundSMSMessageList":{
  //       "inboundSMSMessage":[
  //          {
  //             "dateTime":"Fri Nov 22 2013 12:12:13 GMT+0000 (UTC)",
  //             "destinationAddress":"tel:21581234",
  //             "messageId":null,
  //             "message":"Hello",
  //             "resourceURL":null,
  //             "senderAddress":"tel:+639171234567"
  //          }
  //        ],
  //        "numberOfMessagesInThisBatch":1,
  //        "resourceURL":null,
  //        "totalNumberOfPendingMessages":null
  //    }
  // }
  console.log('notify: ', req.body)
  res.send('Hello World from NOTIFY!')
})

app.post('/redirect', (req, res) => {
  // if someone unsubscribes:
  // {
  //   "unsubscribed":{
  //         "subscriber_number":"9171234567",                                                                                                      "access_token":"abcdefghijklmnopqrstuvwxyz",
  //         "time_stamp": "2014-10-19T12:00:00"
  //   }
  // }
  console.log('redirect: ', req.body)
  res.send('Hello World from REDIRECT!')
})

app.listen(PORT, () => console.log(`Listening on ${PORT}`))

function send (shortcode, access_token, address, clientCorrelator, message) {
  // const shortcode = '2648';
  // const access_token = 'A-2szoYus7mB13l5axDrr_1234AApSz8eu236GRNsoBQ';
  // const address = '9771234567';
  // const clientCorrelator = '264801';
  // const message = 'NodeJS SMS Test';

  const options = {
    url: 'https://devapi.globelabs.com.ph/smsmessaging/v1/outbound/' + shortcode + '/requests',
    method: 'post',
    params: { access_token },
    headers:
     { 'Content-Type': 'application/json' },
    body:
     {
       outboundSMSMessageRequest:
        {
          clientCorrelator,
          senderAddress: shortcode,
          outboundSMSTextMessage: { message },
          address
        }
     }
  }

  axios(options)
    .then(function (response) {
      console.log('response:' + response)
    })
    .catch(function (error) {
      console.log('error:' + error)
    })
}
