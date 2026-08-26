import {Link} from 'react-router-dom';
import {ArrowRight, Search, Plane, Building} from 'lucide-react';
import {SEO, Breadcrumbs, CTA} from '../components';

export default function Bookings() {
  return (
    <>
      <SEO 
        title="Book Flights & Hotels" 
        description="Search for live flight and hotel prices with Tourswale. Book seamlessly and get the best deals for your next holiday." 
      />
      <section className="page-hero bookings-hero" style={{backgroundImage:`url(https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=2200&q=85)`}}>
        <div/>
        <div>
          <Breadcrumbs items={['Flights & Hotels']}/>
          <span className="eyebrow">Live Availability & Prices</span>
          <h1>Search Flights<br/>& Hotels.</h1>
          <p>Find the best deals globally. Browse live prices and let Tourswale handle your final booking securely.</p>
        </div>
      </section>
      
      <section className="section bookings-search-container" style={{background: 'var(--ivory)', padding: '6rem 8vw', minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
        <div style={{display: 'flex', gap: '1rem', marginBottom: '1.5rem'}}>
          <Plane size={32} color="var(--gold)" />
          <Building size={32} color="var(--gold)" />
        </div>
        <span className="eyebrow dark-eye">Coming Soon</span>
        <h2 style={{fontSize: '2.5rem', margin: '0.5rem 0 1rem', textAlign: 'center'}}>Live Search Engine</h2>
        <p style={{color: '#4a5568', textAlign: 'center', maxWidth: '600px', fontSize: '1.1rem', lineHeight: '1.6'}}>
          The live flight and hotel search functionality is currently being integrated. 
          Soon, you will be able to search for real-time availability and prices right here.
        </p>
      </section>

      <CTA/>
    </>
  );
}
