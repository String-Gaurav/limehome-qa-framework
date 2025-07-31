// config/test-data.ts
const testData = {
  urls: {
    property: 'https://www.limehome.com/suites?property=129&guests=1&rooms=1'
  },
  
  search: {
    city: 'aachen',
    startDate: '13',
    endDate: '15',
    cities: ['berlin', 'munich', 'hamburg'], // Multiple cities for testing
    alternativeDates: {
      startDate: '20',
      endDate: '22'
    },
    extendedStay: {
      startDate: '10',
      endDate: '17'
    }
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