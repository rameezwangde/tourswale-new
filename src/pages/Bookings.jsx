import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, Plane, Building, MapPin, Calendar, Users, MessageCircle, ArrowRightLeft, ChevronDown } from 'lucide-react';
import { SEO, Breadcrumbs, CTA, money, SectionHeading } from '../components';

const AIRPORTS = [
  { code: 'BOM', name: 'Mumbai', id: 'BOM' },
  { code: 'DXB', name: 'Dubai', id: 'DXB' },
  { code: 'DEL', name: 'New Delhi', id: 'DEL' },
  { code: 'GOI', name: 'Goa (Dabolim)', id: 'GOI' },
  { code: 'GOX', name: 'Goa (Mopa)', id: 'GOX' },
  { code: 'LHR', name: 'London Heathrow', id: 'LHR' },
  { code: 'JFK', name: 'New York', id: 'JFK' },
  { code: 'SIN', name: 'Singapore Changi', id: 'SIN' },
  { code: 'CDG', name: 'Paris', id: 'CDG' },
  { code: 'SYD', name: 'Sydney', id: 'SYD' },
  { code: 'BKK', name: 'Bangkok', id: 'BKK' },
  { code: 'MLE', name: 'Male (Maldives)', id: 'MLE' },
];

function AutocompleteInput({ label, value, onChange, placeholder }) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = AIRPORTS.filter(a => 
    a.name.toLowerCase().includes(value.toLowerCase()) || 
    a.code.toLowerCase().includes(value.toLowerCase())
  );

  return (
    <div className="search-field" ref={wrapperRef}>
      <label>{label}</label>
      <div className="field-inner" onClick={() => setIsOpen(true)}>
        <input 
          type="text" 
          placeholder={placeholder} 
          value={value} 
          onChange={(e) => {
            onChange(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
        />
      </div>
      {isOpen && (
        <div className="autocomplete-dropdown">
          {filtered.length > 0 ? filtered.map(a => (
            <div 
              key={a.id} 
              className="dropdown-item"
              onClick={() => {
                onChange(`${a.code} - ${a.name}`);
                setIsOpen(false);
              }}
            >
              <Plane size={14} className="icon"/>
              <div>
                <strong>{a.name}</strong>
                <span>{a.code}</span>
              </div>
            </div>
          )) : <div className="dropdown-item empty">No airports found</div>}
        </div>
      )}
    </div>
  );
}

function TravellersPopover() {
  const [isOpen, setIsOpen] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [travelClass, setTravelClass] = useState('Economy');
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const total = adults + children + infants;
  const val = `${total} Traveller${total > 1 ? 's' : ''}, ${travelClass}`;

  return (
    <div className="search-field" ref={wrapperRef}>
      <label>Travellers & Class</label>
      <div className="field-inner cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <span className="value-display truncate">{val}</span>
        <ChevronDown size={14} style={{marginLeft: 'auto', flexShrink: 0, color: 'var(--gold)'}}/>
      </div>
      
      {isOpen && (
        <div className="travellers-dropdown">
          <h3>Travellers</h3>
          <div className="traveller-row">
            <div>
              <strong>Adults</strong>
              <span>12 yrs or above</span>
            </div>
            <div className="number-picker">
              {[1,2,3,4,5,6,7,8,9].map(n => (
                <button key={n} type="button" className={adults === n ? 'active' : ''} onClick={() => setAdults(n)}>{n}</button>
              ))}
            </div>
          </div>
          <div className="traveller-row">
            <div>
              <strong>Children</strong>
              <span>2 - 12 yrs</span>
            </div>
            <div className="number-picker">
              {[0,1,2,3,4,5,6,7,8].map(n => (
                <button key={n} type="button" className={children === n ? 'active' : ''} onClick={() => setChildren(n)}>{n}</button>
              ))}
            </div>
          </div>
          <div className="traveller-row">
            <div>
              <strong>Infants</strong>
              <span>0 - 2 yrs</span>
            </div>
            <div className="number-picker">
              {[0,1,2,3,4].map(n => (
                <button key={n} type="button" className={infants === n ? 'active' : ''} onClick={() => setInfants(n)}>{n}</button>
              ))}
            </div>
          </div>
          
          <h3 style={{marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--sand)'}}>Class</h3>
          <div className="class-row">
            {['Economy', 'Premium Economy', 'Business', 'First Class'].map(c => (
              <label key={c} className="radio-label">
                <input type="radio" name="class" checked={travelClass === c} onChange={() => setTravelClass(c)}/> {c}
              </label>
            ))}
          </div>
          <button type="button" className="button gold apply-btn" onClick={() => setIsOpen(false)}>Apply</button>
        </div>
      )}
    </div>
  );
}

export default function Bookings() {
  const [activeTab, setActiveTab] = useState('flights');
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [tripType, setTripType] = useState('oneway');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [backendSource, setBackendSource] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsSearching(true);
    setHasSearched(false);
    setSearchResults([]);
    
    try {
      let url = '';
      if (activeTab === 'flights') {
        url = `http://localhost:5000/api/flights?from=${from}&to=${to}`;
      } else {
        url = `http://localhost:5000/api/hotels?destination=Mumbai`;
      }
      
      const res = await fetch(url);
      const json = await res.json();
      
      setSearchResults(json.data || []);
      setBackendSource(json.source || 'API');
    } catch (err) {
      console.error(err);
      // Fallback if backend is down
      setSearchResults([]);
    } finally {
      setIsSearching(false);
      setHasSearched(true);
    }
  };

  const handleBookWithTourswale = (details) => {
    const text = encodeURIComponent(`Hello Tourswale! I would like to enquire about this booking:\n\n${details}\n\nPlease confirm availability and final price!`);
    window.open(`https://wa.me/919987561143?text=${text}`, '_blank');
  };

  return (
    <>
      <SEO 
        title="Book Flights & Hotels" 
        description="Search for live flight and hotel prices with Tourswale. Book seamlessly and get the best deals for your next holiday." 
      />
      <section className="page-hero bookings-hero" style={{backgroundImage:`url(/images/bookings-hero.jpg)`, backgroundPosition: 'center center', backgroundSize: 'cover'}}>
        <div/>
        <div>
          <Breadcrumbs items={['Flights & Hotels']}/>
          <span className="eyebrow">Live Availability & Prices</span>
          <h1>Search Flights<br/>& Hotels.</h1>
          <p>Find the best deals globally. Browse live prices and let Tourswale handle your final booking securely.</p>
        </div>
      </section>
      
      <section className="search-widget-section">
        <div className="search-widget-container">
          <div className="search-tabs">
            <button className={activeTab === 'flights' ? 'active' : ''} onClick={() => setActiveTab('flights')}>
              <Plane size={18} /> Flights
            </button>
            <button className={activeTab === 'hotels' ? 'active' : ''} onClick={() => setActiveTab('hotels')}>
              <Building size={18} /> Hotels
            </button>
          </div>

          <div className="search-form-wrapper">
            {activeTab === 'flights' ? (
              <form className="search-form" onSubmit={handleSearch}>
                <div className="trip-type-toggle">
                  <button type="button" className={tripType === 'oneway' ? 'active' : ''} onClick={() => setTripType('oneway')}>One Way</button>
                  <button type="button" className={tripType === 'round' ? 'active' : ''} onClick={() => setTripType('round')}>Round Trip</button>
                </div>
                
                <div className="search-bar-row">
                  <AutocompleteInput label="From" value={from} onChange={setFrom} placeholder="Origin City or Airport" />
                  
                  <button type="button" className="swap-btn" onClick={() => {const temp=from; setFrom(to); setTo(temp);}}>
                    <ArrowRightLeft size={16}/>
                  </button>
                  
                  <AutocompleteInput label="To" value={to} onChange={setTo} placeholder="Destination City or Airport" />
                  
                  <div className="search-field">
                    <label>Departure</label>
                    <div className="field-inner">
                      <input type="date" required />
                    </div>
                  </div>
                  
                  <div className={`search-field ${tripType === 'oneway' ? 'disabled' : ''}`}>
                    <label>Return</label>
                    <div className="field-inner">
                      <input type="date" disabled={tripType === 'oneway'} />
                    </div>
                  </div>
                  
                  <TravellersPopover />
                </div>
                
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '1.5rem'}}>
                  <button type="submit" className="button gold search-btn" disabled={isSearching}>
                    {isSearching ? 'Searching...' : <><Search size={18} /> SEARCH FLIGHTS</>}
                  </button>
                </div>
              </form>
            ) : (
              <form className="search-form" onSubmit={handleSearch}>
                <div className="search-bar-row">
                  <div className="search-field" style={{flex: 2}}>
                    <label>Destination</label>
                    <div className="field-inner">
                      <MapPin size={16} color="var(--gold)" />
                      <input type="text" placeholder="City, Hotel, or Landmark" required style={{marginLeft: '0.5rem', width: '100%'}}/>
                    </div>
                  </div>
                  
                  <div className="search-field">
                    <label>Check-in</label>
                    <div className="field-inner">
                      <input type="date" required />
                    </div>
                  </div>
                  
                  <div className="search-field">
                    <label>Check-out</label>
                    <div className="field-inner">
                      <input type="date" required />
                    </div>
                  </div>
                  
                  <div className="search-field" style={{flex: 1.5}}>
                    <label>Guests & Rooms</label>
                    <div className="field-inner cursor-pointer">
                       <span className="value-display">2 Adults, 1 Room</span>
                       <ChevronDown size={14} style={{marginLeft: 'auto', color: 'var(--gold)'}}/>
                    </div>
                  </div>
                </div>
                
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '1.5rem'}}>
                  <button type="submit" className="button gold search-btn" disabled={isSearching}>
                    {isSearching ? 'Searching...' : <><Search size={18} /> SEARCH HOTELS</>}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {isSearching && (
        <section className="search-results skeleton-loader">
          <div className="skeleton-card"></div>
          <div className="skeleton-card"></div>
          <div className="skeleton-card"></div>
        </section>
      )}

      {hasSearched && !isSearching && (
        <section className="search-results">
          <SectionHeading eyebrow={`Data Source: ${backendSource}`} title={`Available ${activeTab === 'flights' ? 'Flights' : 'Hotels'}`} />
          
          <div className="results-list">
            {searchResults.length === 0 ? (
              <p style={{textAlign:'center', padding: '2rem'}}>No results found. Please check your backend connection.</p>
            ) : activeTab === 'flights' ? (
              searchResults.map((flight, idx) => (
                <div key={idx} className="result-card flight-card">
                  <div className="result-main">
                    {flight.logo && <img src={flight.logo} alt={flight.airline} className="airline-logo-result" onError={(e) => e.target.style.display='none'} />}
                    {!flight.logo && <div style={{width:'60px', fontWeight:'bold', color:'var(--gold)', textAlign:'center'}}>{flight.airline}</div>}
                    <div className="flight-times">
                      <div>
                        <strong>{flight.departureTime}</strong>
                        <span>{flight.originCode}</span>
                      </div>
                      <div className="flight-duration">
                        <span>{flight.duration}</span>
                        <div className="line"></div>
                        <span>{flight.stops}</span>
                      </div>
                      <div>
                        <strong>{flight.arrivalTime}</strong>
                        <span>{flight.destinationCode}</span>
                      </div>
                    </div>
                  </div>
                  <div className="result-action">
                    <div className="price-box">
                      <span>Estimated Price</span>
                      <strong>₹{flight.price}</strong>
                    </div>
                    <button className="button gold small" onClick={() => handleBookWithTourswale(`✈️ FLIGHT ENQUIRY\nAirline: ${flight.airline}\nRoute: ${flight.originCode} to ${flight.destinationCode}\nPrice: ₹${flight.price}`)}>
                      <MessageCircle size={14}/> Book with Tourswale
                    </button>
                  </div>
                </div>
              ))
            ) : (
              searchResults.map((hotel, idx) => (
                <div key={idx} className="result-card hotel-card">
                  <div className="result-main">
                    <div className="hotel-info">
                      <h3>{hotel.hotelName}</h3>
                      <div className="hotel-rating">{'★'.repeat(Math.min(5, hotel.rating || 4))}</div>
                      <p><MapPin size={14}/> {hotel.location}</p>
                      <div className="hotel-amenities">
                        {hotel.amenities && hotel.amenities.map(a => <span key={a}>{a}</span>)}
                      </div>
                    </div>
                  </div>
                  <div className="result-action">
                    <div className="price-box">
                      <span>Price per night</span>
                      <strong>₹{hotel.pricePerNight}</strong>
                    </div>
                    <button className="button gold small" onClick={() => handleBookWithTourswale(`🏨 HOTEL ENQUIRY\nHotel: ${hotel.hotelName}\nLocation: ${hotel.location}\nPrice: ₹${hotel.pricePerNight} / night`)}>
                      <MessageCircle size={14}/> Book with Tourswale
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      )}

      <CTA/>
    </>
  );
}
