const axios = require('axios');

const BASE_URL = "https://rest.clicksend.com/v3/sms";
const API_KEY = process.env.CLICKSEND_API_KEY;

const sendSms = async (to, message) => {
  const data = {
    messages: [
      {
        body: message,
        to
      }
    ]
  };

  const options = {
    url: `${BASE_URL}/send`,
    method: 'POST',
    headers:
    {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${API_KEY}`
    },
    data,
  };

  const response = await axios(options);
  return response.data;
};

module.exports = {
  sendSms
};