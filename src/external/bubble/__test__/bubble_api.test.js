const bubbleApi = require('../bubble_api');

describe('bubble API', () => {
  test('should retrieve at least 1 resource from Cebu', async () => {
    const results = await bubbleApi.fetchAvailableResourcesFromAddress('Cebu');
    expect(results.length).toBeGreaterThan(0);
  });

  test('should retrieve Charging Station only from Cebu', async () => {
    const resourceType = "Charging Station";
    const results = await bubbleApi.fetchAvailableResourcesFromAddress('Cebu', resourceType);

    expect(results.every(r => r.ResourceType === resourceType)).toBeTruthy();
  });
});
