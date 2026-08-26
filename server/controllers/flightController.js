import axios from 'axios';

// Flight API Clubbing (Fallback Strategy)

export const searchFlights = async (req, res) => {
  try {
    const { origin, destination, date } = req.query;

    console.log(`Searching flights from ${origin} to ${destination} on ${date}`);

    // Try API 1: Primary API (e.g., Kiwi.com Tequila)
    try {
      console.log('Attempting Primary API (Kiwi.com)...');
      // Simulated API Call
      // const response = await axios.get('https://api.tequila.kiwi.com/v2/search', { headers: { apikey: process.env.KIWI_TEQUILA_API_KEY }, params: { fly_from: origin, fly_to: destination, date_from: date, date_to: date } });
      
      // Simulate success for now
      return res.status(200).json({
        source: 'Primary API (Kiwi)',
        data: [
          { airline: 'Emirates', flightNumber: 'EK 501', price: 25000, departure: '10:00 AM', arrival: '12:30 PM' },
          { airline: 'Air India', flightNumber: 'AI 202', price: 21000, departure: '08:00 AM', arrival: '10:15 AM' }
        ]
      });

    } catch (error) {
      console.log('Primary API failed, falling back to Secondary API...');
      
      // Try API 2: Secondary API (e.g., SearchApi / RapidAPI)
      try {
        console.log('Attempting Secondary API...');
        // Simulated API Call
        
        return res.status(200).json({
          source: 'Secondary API (RapidAPI)',
          data: [
            { airline: 'IndiGo', flightNumber: '6E 111', price: 19500, departure: '06:00 AM', arrival: '08:00 AM' }
          ]
        });

      } catch (fallbackError) {
        console.log('Secondary API also failed. Falling back to Python Scraper...');
        
        // Final Fallback: Python Scraper (scrape.py)
        // Here we would use child_process.exec to run python scrape.py
        throw new Error('All APIs exhausted');
      }
    }

  } catch (error) {
    console.error('Flight search error:', error);
    res.status(500).json({ error: 'Failed to retrieve flights. All APIs exhausted.' });
  }
};
