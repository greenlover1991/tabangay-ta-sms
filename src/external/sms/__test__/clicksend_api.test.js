const clicksend = require('../clicksend_api');

describe('Clicksend API', () => {
  test('should be able to send SMS to (test account) number', async () => {
    const testNumber = "+61411111111";
    const message = "test";

    const result = await clicksend.sendSms(testNumber, message);
    expect(result.http_code).toBe(200);
  });
});