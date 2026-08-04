const fs = require('fs');

let original = fs.readFileSync('src/data_original.js', 'utf16le'); 

let startIdx = original.indexOf("  {\n    slug: 'navagraha-murugan-temple-tour',");
let endIdx = original.indexOf("  {\n    slug: 'kerala-package-6-days',");

if (startIdx !== -1 && endIdx !== -1) {
    let missingTour = original.substring(startIdx, endIdx);
    
    // Apply updates to missingTour
    missingTour = missingTour.replace("title: 'Navagraha & Murugan Temple Tour',", "title: 'Navagraha & Murugan Temple Tour',");
    missingTour = missingTour.replace("location: 'Tamil Nadu',", "location: 'Palani, Madurai, Kumbakonam, Chidambaram, Kancheepuram',");
    missingTour = missingTour.replace("image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',", "image: 'https://images.unsplash.com/photo-1665003815164-8f5bc853ef44?auto=format&fit=crop&w=1200&q=80',");
    missingTour = missingTour.replace("promoTitle: 'Divine Tamil Nadu Pilgrimage',", "promoTitle: 'Sacred Tamil Nadu',");

    let data = fs.readFileSync('src/data.js', 'utf8');
    
    // Check if it's already there
    if (!data.includes("'navagraha-murugan-temple-tour'")) {
        data = data.replace("  {\n    slug: 'kerala-package-6-days',", missingTour + "  {\n    slug: 'kerala-package-6-days',");
        fs.writeFileSync('src/data.js', data);
        console.log("Restored navagraha-murugan-temple-tour");
    } else {
        console.log("Tour already exists");
    }
} else {
    console.log("Could not find boundaries in data_original.js");
}
