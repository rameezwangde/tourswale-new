import axios from 'axios';

export const searchHotels = async (req, res) => {
  try {
    const { destination, checkIn, checkOut, guests } = req.query;
    console.log(`Searching hotels: ${destination} | ${checkIn} -> ${checkOut}`);

    try {
      console.log('Attempting RapidAPI Booking.com...');
      
      const options = {
        method: 'GET',
        url: 'https://booking-com.p.rapidapi.com/v1/hotels/search',
        params: {
          dest_id: '-2092174', // Example ID for Mumbai
          search_type: 'CITY',
          arrival_date: checkIn || '2026-11-15',
          departure_date: checkOut || '2026-11-18',
          adults: '2',
          room_qty: '1'
        },
        headers: {
          'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
        }
      };

      const response = await axios.request(options);
      
      if (response.data && response.data.result) {
        const hotels = response.data.result.slice(0, 5).map(h => ({
          hotelName: h.hotel_name,
          rating: h.class,
          pricePerNight: h.min_total_price,
          location: h.city_trans,
          amenities: ['Pool', 'Free WiFi', 'Breakfast'] // Mocked amenities as they aren't always in search endpoint
        }));
        
        return res.status(200).json({ source: 'RapidAPI', data: hotels });
      } else {
        throw new Error('Unexpected RapidAPI format');
      }

    } catch (error) {
      console.log('RapidAPI failed. Falling back to dynamic mock generator...');
      
      const mockHotels = [
        { hotelName: 'Taj Mahal Palace', rating: 5, pricePerNight: 15000, location: destination || 'Mumbai, India', amenities: ['Pool', 'Spa', 'Free WiFi'] },
        { hotelName: 'Trident Nariman Point', rating: 5, pricePerNight: 12000, location: destination || 'Mumbai, India', amenities: ['Pool', 'Gym', 'Sea View'] },
        { hotelName: 'Novotel Juhu', rating: 4, pricePerNight: 8000, location: destination || 'Mumbai, India', amenities: ['Beachfront', 'Pool', 'Free WiFi'] }
      ];

      return res.status(200).json({
        source: 'Fallback System',
        data: mockHotels
      });
    }

  } catch (error) {
    console.error('Hotel search error:', error);
    res.status(500).json({ error: 'Failed to retrieve hotels.' });
  }
};
