
$content = Get-Content -Path .\src\data.js -Raw
$newTour = @"{
  slug: `"singapore-ex-delhi-5n`",
  title: `"5N SINGAPORE with Flights (Ex DEL)`",
  location: `"Singapore`",
  days: 6,
  price: null,
  image: `"https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80`",
  desc: `"5N Stay at 4 Star Hotel with Daily Breakfast, SIC Transfers, and Round Trip Flights.`",
  tags: [`"Singapore`", `"Flights Included`", `"5 Nights`"],
  promoEyebrow: `"Your Journey, Our Responsibility`",
  promoTitle: `"Discover Singapore`",
  promoLine: `"Roundtrip packages with 4* Hotel & Flights`",
  specialHeading: `"City. Nature. Entertainment.`",
  stays: [`"5 Nights / 6 Days`", `"Departure: Delhi`", `"Flights Included`"],
  gallery: [
    {src: `"https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1400&q=80`", alt: `"Singapore Skyline`"},
    {src: `"https://images.unsplash.com/photo-1518103744022-a9c6dc8b0931?auto=format&fit=crop&w=1400&q=80`", alt: `"Gardens by the Bay`"},
    {src: `"https://images.unsplash.com/photo-1579737521743-98774e1ea054?auto=format&fit=crop&w=1400&q=80`", alt: `"Universal Studios Singapore`"}
  ],
  galleryCaptions: [`"Singapore Skyline`", `"Gardens by the Bay`", `"Universal Studios`"],
  groupTitles: [`"Inclusions`", `"Flight Details`", `"Available Dates`"],
  experienceGroups: [
    [`"Inclusions`", `"Round Trip Flights (Air India)`", `"5N Singapore - Holiday Inn Novena (4 Star)`", `"Daily Breakfast`", `"All transfers on SIC basis`", `"Visit to Gardens by the Bay - Cloud Forest & Flower Dome`", `"Guided Singapore City Tour`", `"Night Safari entry`", `"Universal Studios Singapore entry`", `"Sentosa Island - Cable Car ride & Wings of Time show`"],
    [`"Flight Details`", `"Onward: Air India AI-2118 | 00:40 AM - 09:15 AM`", `"Return: Air India AI-2383 | 23:00 PM - 02:40 AM`", `"4 Star hotel stay with breakfast`"],
    [`"Available Dates (2026-2027)`", `"26 Sept - 1 Oct 2026`", `"2 Oct - 7 Oct 2026`", `"24 Oct - 29 Oct 2026`", `"31 Oct - 5 Nov 2026`", `"7 Nov - 12 Nov 2026`", `"21 Nov - 26 Nov 2026`", `"28 Nov - 3 Dec 2026`", `"5 Dec - 10 Dec 2026`", `"9 Jan - 14 Jan 2027`", `"16 Jan - 21 Jan 2027`"]
  ],
  itinerary: [
    {title: `"Arrival in Singapore & Night Safari`", copy: `"Arrive in Singapore via Air India. Transfer to Holiday Inn Novena (4 Star) on SIC basis. In the evening, enjoy the world-famous Night Safari.`"},
    {title: `"Guided Singapore City Tour`", copy: `"After breakfast, embark on a comprehensive Guided Singapore City Tour to explore the best landmarks.`"},
    {title: `"Universal Studios Singapore`", copy: `"Enjoy a full day of thrilling rides and entertainment with included entry to Universal Studios Singapore.`"},
    {title: `"Gardens by the Bay`", copy: `"Visit Gardens by the Bay, including entry to the stunning Cloud Forest & Flower Dome.`"},
    {title: `"Sentosa Island`", copy: `"Experience Sentosa Island with a scenic Cable Car ride and the spectacular Wings of Time show.`"},
    {title: `"Departure`", copy: `"After breakfast, time at leisure before your SIC transfer to the airport for your return Air India flight to Delhi.`"}
  ],
  inclusions: [
    `"Round Trip Flights (Air India AI-2118 / AI-2383)`",
    `"5N Stay at Holiday Inn Novena (4 Star)`",
    `"Daily Breakfast`",
    `"All transfers on SIC (Seat-in-Coach) basis`",
    `"Gardens by the Bay - Cloud Forest & Flower Dome tickets`",
    `"Guided Singapore City Tour`",
    `"Night Safari entry tickets`",
    `"Universal Studios Singapore entry tickets`",
    `"Sentosa Island - Cable Car ride & Wings of Time show tickets`"
  ],
  exclusions: [
    `"Lunch and dinner`",
    `"Personal expenses`",
    `"Optional Add-On: Marina Bay Sands (available at extra cost)`",
    `"Travel insurance`",
    `"Anything not mentioned under inclusions`"
  ],
  benefits: [
    `"Flights Included from Delhi`",
    `"Limited Seats Available`",
    `"Every Week from Delhi to Singapore`",
    `"Upgrade with an Add-On: Marina Bay Sands`"
  ],
  tagline: `"Book Now with Tourswale`"
},
"@
$newContent = $content -replace "export const international=\[", ("export const international=[" + $newTour)
Set-Content -Path .\src\data.js -Value $newContent

