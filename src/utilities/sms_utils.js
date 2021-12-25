const { resourceTypes, fetchAvailableResourcesFromAddress } = require('../external/bubble/bubble_api');
const { sendSms } = require('../external/sms/clicksend_api');

const parseCommand = (smsCommand) => {
  const parsed = smsCommand.match(/TABANG (\d+)(.*)/);
  if (!parsed) {
    throw new Error('Invalid SMS command. Format: "TABANG <option> <address>"');
  }

  const [, choice, address] = parsed;
  return {
    resourceType: resourceTypes[parseInt(choice)],
    address: address.trim(),
  };
};

const getFormattedLocationNames = async (address, resourceType, limit = 5) => {
  const resourcePins = await fetchAvailableResourcesFromAddress(address, resourceType, limit);
  return resourcePins.map((r, i) => `${i + 1} ${r.locationName}`).join('\n');
};

// main entry point
const sendLocationNames = async (recipient, incomingSmsMessage) => {
  const { address, resourceType } = parseCommand(incomingSmsMessage);
  const message = await getFormattedLocationNames(address, resourceType);
  await sendSms(recipient, message);
};

module.exports = {
  parseCommand,
  getFormattedLocationNames,
  sendLocationNames
};