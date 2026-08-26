import axios from 'axios';

// Hotel API Clubbing (Fallback Strategy)

export const searchHotels = async (req, res) => {
  try {
    const { location, checkIn, checkOut, guests } = req.query;

    console.log(`Searching hotels in ${location} from ${checkIn} to ${checkOut} for ${guests} guests`);

    // Try API 1: Primary API (e.g., Amadeus)
    try {
      console.log('Attempting Primary API (Amadeus)...');
      // Simulated API Call
      
      // Simulate success for now
      return res.status(200).json({
        source: 'Primary API (Amadeus)',
        data: [
          { hotelName: 'Taj Mahal Palace', rating: 5, pricePerNight: 15000, amenities: ['Pool', 'Spa', 'Wifi'] },
          { hotelName: 'Trident Nariman Point', rating: 5, pricePerNight: 12000, amenities: ['Pool', 'Gym', 'Wifi'] }
        ]
      });

    } catch (error) {
      console.log('Primary API failed, falling back to Secondary API...');
      
      // Try API 2: Secondary API (e.g., RapidAPI Booking.com Scraper)
      try {
        console.log('Attempting Secondary API...');
        // Simulated API Call
        
        return res.status(200).json({
          source: 'Secondary API (RapidAPI)',
          data: [
            { hotelName: 'Novotel Juhu', rating: 4, pricePerNight: 8000, amenities: ['Beachfront', 'Pool', 'Wifi'] }
          ]
        });

      } catch (fallbackError) {
        console.log('Secondary API also failed.');
        throw new Error('All APIs exhausted');
      }
    }

  } catch (error) {
    console.error('Hotel search error:', error);
    res.status(500).json({ error: 'Failed to retrieve hotels. All APIs exhausted.' });
  }
};
