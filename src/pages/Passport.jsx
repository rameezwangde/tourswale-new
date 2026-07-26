import { useState } from 'react';
import {Check,FileText,IdCard,RefreshCw,ShieldCheck,MessageCircle,Phone,Globe2,ArrowRight,ArrowLeft} from 'lucide-react';
import {SEO,Breadcrumbs,CTA} from '../components';
const documents=[['Aadhaar Card','Current identity and address document'],['PAN Card','Clear copy of the applicant’s PAN card'],['Bank Passbook','Passbook with photograph and bank stamp'],['Education Certificate','10th-standard certificate or higher qualification'],['Birth Certificate','Required for applicants below 18 years'],['Parents’ Address Proof','Applicable for minor applicants'],['Electricity Bill','Recent light or electricity bill as address support'],['Old Passport','Required when applying for passport renewal']];

function PassportAssistanceForm() {
    const [step, setStep] = useState(1);
    
    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => s - 1);
    
    return (
        <form className="passport-assistance-form" onSubmit={e => e.preventDefault()}>
           <div className="step-indicators">
               <span className={step >= 1 ? 'active' : ''}>1. Basic Details</span>
               <span className={step >= 2 ? 'active' : ''}>2. Documents</span>
               <span className={step >= 3 ? 'active' : ''}>3. Travel & Confirm</span>
           </div>
           
           {step === 1 && (
               <div className="form-step">
                  <h3>Step 1: Basic Details</h3>
                  <div className="field-grid">
                      <label>Full Name (as per Aadhaar/Birth Certificate) *<input required /></label>
                      <label>Gender *<select required><option>Male</option><option>Female</option><option>Other</option></select></label>
                      <label>Date of Birth *<input type="date" required /></label>
                      <label>Place of Birth *<input required /></label>
                      <label>Nationality *<input required defaultValue="Indian" /></label>
                      <label>Marital Status *<select required><option>Single</option><option>Married</option><option>Divorced</option><option>Widowed</option></select></label>
                      <label>Occupation *<input required /></label>
                      <label>Aadhaar Number (Optional)<input /></label>
                      <label>PAN Number (Optional)<input /></label>
                      <label>Mobile Number *<input type="tel" required /></label>
                      <label>Alternate Mobile Number<input type="tel" /></label>
                      <label>Email Address *<input type="email" required /></label>
                      <label>Current Residential Address *<textarea required rows="2" /></label>
                      <label>Permanent Address *<textarea required rows="2" /></label>
                      <label>City *<input required /></label>
                      <label>State *<input required /></label>
                      <label>PIN Code *<input required /></label>
                      <label>Passport Service Required *
                        <select required>
                          <option>New Passport</option>
                          <option>Passport Renewal</option>
                          <option>Lost Passport</option>
                          <option>Damaged Passport</option>
                          <option>Name Change</option>
                          <option>Address Change</option>
                          <option>Minor Passport</option>
                          <option>Tatkal Passport</option>
                          <option>Other</option>
                        </select>
                      </label>
                  </div>
                  <div className="button-row">
                      <button type="button" onClick={nextStep} className="button gold">Next <ArrowRight/></button>
                  </div>
               </div>
           )}

           {step === 2 && (
               <div className="form-step">
                   <h3>Step 2: Documents</h3>
                   <div className="field-grid">
                       <label>Existing Passport Number (If Applicable)<input /></label>
                       <label>Date of Issue<input type="date" /></label>
                       <label>Date of Expiry<input type="date" /></label>
                       <label>Place of Issue<input /></label>
                       
                       <label>Identity Proof (PDF/JPG/PNG)<input type="file" accept=".pdf,.jpg,.png" /></label>
                       <label>Address Proof<input type="file" accept=".pdf,.jpg,.png" /></label>
                       <label>Date of Birth Proof<input type="file" accept=".pdf,.jpg,.png" /></label>
                       <label>Passport Size Photograph (White Background)<input type="file" accept=".jpg,.png" /></label>
                       <label>Signature Upload<input type="file" accept=".jpg,.png" /></label>
                       <label>Existing Passport Copy (First Page)<input type="file" accept=".pdf,.jpg,.png" /></label>
                       <label>Existing Passport Copy (Last Page)<input type="file" accept=".pdf,.jpg,.png" /></label>
                       <label>Marriage Certificate (If Applicable)<input type="file" accept=".pdf,.jpg,.png" /></label>
                       <label>Annexure / Affidavit (If Applicable)<input type="file" accept=".pdf,.jpg,.png" /></label>
                   </div>
                   <div className="button-row">
                       <button type="button" onClick={prevStep} className="button light"><ArrowLeft/> Back</button>
                       <button type="button" onClick={nextStep} className="button gold">Next <ArrowRight/></button>
                   </div>
               </div>
           )}

           {step === 3 && (
               <div className="form-step">
                   <h3>Step 3: Travel Information & Confirmation</h3>
                   <div className="field-grid">
                       <label>Intended Travel Date<input type="date" /></label>
                       <label>Destination Country<input /></label>
                       <label>Purpose of Travel
                         <select>
                           <option>Tourism</option>
                           <option>Business</option>
                           <option>Education</option>
                           <option>Employment</option>
                           <option>Family Visit</option>
                           <option>Medical</option>
                           <option>Other</option>
                         </select>
                       </label>
                       <label>Emergency Contact Person Name<input /></label>
                       <label>Emergency Contact Relationship<input /></label>
                       <label>Emergency Contact Mobile Number<input type="tel" /></label>
                       <label className="full">Additional Information<textarea rows="3" placeholder="Any additional details or special requirements" /></label>
                   </div>
                   
                   <h4>Optional Add-ons (Highly Recommended)</h4>
                   <div className="addons-grid">
                       <label className="check"><input type="checkbox"/> Passport Appointment Booking</label>
                       <label className="check"><input type="checkbox"/> Document Verification</label>
                       <label className="check"><input type="checkbox"/> Tatkal Processing Assistance</label>
                       <label className="check"><input type="checkbox"/> Doorstep Document Collection</label>
                       <label className="check"><input type="checkbox"/> Travel Insurance</label>
                       <label className="check"><input type="checkbox"/> Visa Assistance</label>
                       <label className="check"><input type="checkbox"/> Air Ticket Booking</label>
                       <label className="check"><input type="checkbox"/> Hotel Booking</label>
                   </div>
                   
                   <div className="declaration">
                       <label className="check full"><input type="checkbox" required/> I hereby confirm that the information provided is true and correct.</label>
                       <label className="check full"><input type="checkbox" required/> I authorize Tourswale to contact me regarding my passport application.</label>
                   </div>

                   <div className="button-row">
                       <button type="button" onClick={prevStep} className="button light"><ArrowLeft/> Back</button>
                       <button type="submit" className="button gold">Submit Application <ArrowRight/></button>
                   </div>
               </div>
           )}
        </form>
    )
}

export default function Passport(){
 return <><SEO title="Fresh Passport & Passport Renewal Assistance" description="Tourswale provides document guidance for fresh passport applications and passport renewals in Navi Mumbai." schema={{'@context':'https://schema.org','@type':'Service',name:'Passport Application Assistance',provider:{'@type':'TravelAgency',name:'Tourswale'},areaServed:'Navi Mumbai, India'}}/>
 <section className="passport-hero"><div><Breadcrumbs items={['Passport Services']}/><span className="eyebrow">Fast · Reliable · Hassle-Free</span><h1>Passport<br/>Services</h1><p>Clear document guidance for fresh passport applications and passport renewals, supported by the Tourswale team.</p><div className="passport-options"><span><IdCard/>Fresh Passport</span><span><RefreshCw/>Passport Renewal</span></div><div className="button-row"><a className="button gold" href="https://wa.me/919987561143"><MessageCircle/> WhatsApp for Details</a><a className="button light" href="tel:+919987561143"><Phone/> Call Now</a></div></div><aside><ShieldCheck/><span>Your passport to</span><strong>Global Opportunities</strong><p>Documentation support from enquiry to appointment preparation.</p></aside></section>
 <section className="section passport-intro"><div><span className="eyebrow dark-eye">Application checklist</span><h2>Documents Required</h2></div><p>Requirements may vary based on applicant age, address, application category and current Passport Seva rules. Bring clear, valid originals and copies for verification guidance.</p></section>
 <section className="section ivory"><div className="passport-docs">{documents.map(([title,text],i)=><article key={title}><b>{String(i+1).padStart(2,'0')}</b><FileText/><h3>{title}</h3><p>{text}</p><Check/></article>)}</div></section>
 <section className="passport-form-container">
   <div>
     <h2>Passport Assistance Form</h2>
     <PassportAssistanceForm />
   </div>
 </section>
 <section className="passport-note"><ShieldCheck/><div><span>Important information</span><h2>Assistance You Can Rely On</h2><p>Tourswale provides documentation and application guidance. Passport issuance, police verification, appointment availability and processing timelines are controlled solely by the relevant Government of India authorities.</p></div></section>
 <section className="section visa-contact"><div><span className="eyebrow dark-eye">WhatsApp for more details</span><h2>Start Your Passport Application.</h2><p>Speak with our team before sharing documents. We’ll explain the applicable checklist and next steps.</p></div><div><a href="https://wa.me/919987561143"><MessageCircle/><span>Call / WhatsApp<b>+91 99875 61143</b></span></a><a href="https://www.tourswale.com"><Globe2/><span>Website<b>www.tourswale.com</b></span></a><div><ShieldCheck/><span>Office<b>Shop No. 1, Plot No. 67, Hari Om CHS,<br/>Sector 50, New Seawoods,<br/>Navi Mumbai – 400706</b></span></div></div></section><CTA/></>
}