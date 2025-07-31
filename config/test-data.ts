// config/test-data.ts
const testData = {
  urls: {
    property: 'https://www.limehome.com/suites?property=129&guests=1&rooms=1',
    api: 'https://www.limehome.com/api/properties/129'
  },
  
  search: {
    city: 'aachen',
    startDate: '13',
    endDate: '15'
  },
  
  guest: {
    firstName: 'Test',
    lastName: 'Test',
    email: 'test345@mailsac.com',
    phone: '7854102552',
    password: 'Test@123'
  },
  
  address: {
    street: 'Test',
    postalCode: '91052',
    city: 'Erlangen',
    country: 'Germany'
  },

  property: {
    id: 129,
    name: 'aachen vereinsstraße',
    city: 'aachen',
    countryCode: 'DE'
  }
};

export default testData;