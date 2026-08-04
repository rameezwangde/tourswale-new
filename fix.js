const fs = require('fs');

let data = fs.readFileSync('src/data.js', 'utf8');

// Fix 1
data = data.replace(
  "      'Any meals & services other than those as mentioned in cost includes',\n        title: 'Kerala Package – Munnar & Kumarakom',",
  `      'Any meals & services other than those as mentioned in cost includes',
      'Entrance Fee & Guide Fee',
      'Alcoholic & non-alcoholic beverages during meals or otherwise',
      'Tips at restaurants, concierge and driver',
      '5% GST'
    ],
    benefits: [
      'Dedicated Spiritual Tour',
      'Comfortable AC transport',
      'Daily breakfast included',
      'Assistance with Darshans'
    ],
    tagline: 'Book Now with Tourswale'
  },
  {
    slug: 'kerala-munnar-kumarakom-tour',
    title: 'Kerala Package – Munnar & Kumarakom',`
);

let original = fs.readFileSync('src/data_original.js', 'utf16le'); // PowerShell 'git show' outputs utf16le
let missingObj = original.substring(original.indexOf("slug: 'navagraha-murugan-temple-tour'"));
missingObj = missingObj.substring(0, missingObj.indexOf("slug: 'kerala-package-6-days'"));
// missingObj now contains the whole navagraha tour, but starts with slug: '...' so we prepend '{\n    ' and append the closing if needed.

// Wait, let's just use string slicing exactly.
let originalUtf8 = original; 
let startIdx = originalUtf8.indexOf("  {\n    slug: 'navagraha-murugan-temple-tour',");
let endIdx = originalUtf8.indexOf("  {\n    slug: 'kerala-package-6-days',");

if (startIdx !== -1 && endIdx !== -1) {
    let missingTour = originalUtf8.substring(startIdx, endIdx);
    
    // Apply updates to missingTour
    missingTour = missingTour.replace("title: 'Navagraha & Murugan Temple Tour',", "title: 'Navagraha & Murugan Temple Tour',");
    missingTour = missingTour.replace("location: 'Tamil Nadu',", "location: 'Palani, Madurai, Kumbakonam, Chidambaram, Kancheepuram',");
    missingTour = missingTour.replace("image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',", "image: 'https://images.unsplash.com/photo-1665003815164-8f5bc853ef44?auto=format&fit=crop&w=1200&q=80',");
    missingTour = missingTour.replace("promoTitle: 'Divine Tamil Nadu Pilgrimage',", "promoTitle: 'Sacred Tamil Nadu',");

    // Insert it back into data
    data = data.replace("  {\n    slug: 'kerala-package-6-days',", missingTour + "  {\n    slug: 'kerala-package-6-days',");
}

fs.writeFileSync('src/data.js', data);
