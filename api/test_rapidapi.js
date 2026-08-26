const axios = require('axios');
const fs = require('fs');

async function test() {
  try {
    const res = await axios.get('https://flights-sky.p.rapidapi.com/flights/auto-complete', {
      params: { query: 'BOM' },
      headers: {
        'x-rapidapi-key': 'bcb58dcab7mshdba63f3238b7362p19c244jsn16f70f727278',
        'x-rapidapi-host': 'flights-sky.p.rapidapi.com'
      }
    });
    console.log('AUTO-COMPLETE:');
    console.log(JSON.stringify(res.data, null, 2).slice(0, 500));
    
    // Now try search with what we guess is the schema
    const searchRes = await axios.get('https://flights-sky.p.rapidapi.com/flights/search-oneway', {
      params: { 
        fromEntityId: 'BOM', 
        toEntityId: 'DXB', 
        departDate: '2026-11-12' 
      },
      headers: {
        'x-rapidapi-key': 'bcb58dcab7mshdba63f3238b7362p19c244jsn16f70f727278',
        'x-rapidapi-host': 'flights-sky.p.rapidapi.com'
      }
    });
    console.log('\nSEARCH:');
    console.log(JSON.stringify(searchRes.data, null, 2).slice(0, 500));
    
  } catch (err) {
    console.error('ERROR:', err.response ? err.response.data : err.message);
  }
}

test();
