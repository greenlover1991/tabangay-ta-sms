const smsUtils = require('../sms_utils');

describe('SMS utils', () => {

  test('"0 Cebu" parsed as Charging station and address Cebu', () => {
    const { resourceType, address } = smsUtils.parseCommand("0 Cebu");
    expect(resourceType).toEqual("Charging Station");
    expect(address).toEqual("Cebu");
  });

  // FIXME use mock data
  // test("Formatted locations contains Robinson's", async () => {
  //   const result = await smsUtils.getFormattedLocationNames('Cebu', 'Charging Station');
  //   expect(result).toMatch(/Robinson's/);
  // });
});