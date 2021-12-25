const axios = require('axios');

const BASE_URL = process.env.BUBBLE_BASE_URL;
const API_KEY = process.env.BUBBLE_API_KEY;

const chargingStation = "Charging Station";
const drinkingWater = "Drinking Water";
const signalWifi = "Signal / WiFi";
const clinicsPharmacies = "Clinics / Pharmacies";
const grocery = "Grocery";
const atmRemittance = "ATM/Remittance";
const fuelForVehicles = "Fuel for Vehicles";
const waterStation = "Water Station";
const cookingGas = "Cooking Gas";
const restaurants = "Restaurants & Ready-to-Eat Food";
const coWorkingSpace = "Co-working Space";
const shelter = "Shelter";

const resourceTypes = [
  chargingStation,
  drinkingWater,
  signalWifi,
  clinicsPharmacies,
  grocery,
  atmRemittance,
  fuelForVehicles,
  waterStation,
  cookingGas,
  restaurants,
  coWorkingSpace,
  shelter,
];

const MINIMUM_UPVOTES = 5;
const GEOLOCATION_RADIUS_KM = 10;

const fetchAvailableResourcesFromAddress = async (address, resourceType = chargingStation, limit = 5) => {
  if (!resourceTypes.includes(resourceType)) {
    throw Error('Invalid resource type!');
  }

  const constraints = [{
    "key": "resourceStatus",
    "constraint_type": "equals",
    "value": "Available"
  },
  {
    "key": "upvotes",
    "constraint_type": "greater than",
    "value": MINIMUM_UPVOTES - 1
  },
  {
    "key": "Resource Type",
    "constraint_type": "equals",
    "value": resourceType
  },
  {
    "key": "geolocation",
    "constraint_type": "geographic_search",
    "value": {
      range: GEOLOCATION_RADIUS_KM,
      unit: 'km',
      origin_address: address
    }
  },
  ];

  const additional_sort_fields = [
    {
      sort_field: "upvotes",
      descending: true,
    },
    {
      sort_field: "locationName",
    }
  ];

  const params = {
    constraints: JSON.stringify(constraints),
    limit,
    additional_sort_fields
  };

  const options = {
    url: `${BASE_URL}/obj/resourcepin`,
    method: 'get',
    headers:
    {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`
    },
    params,
  };

  const response = await axios(options);
  return response.data.response.results;
};

module.exports = {
  resourceTypes,
  fetchAvailableResourcesFromAddress
};