const https = require('https');

https.get('https://switrus.com/europe-tour-packages/01-august-11-days-golden-europe-tour?location=MUMBAI', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const regex = /<span class="day-circle">(.*?)<\/span><span class="title-text">(.*?)<\/span><\/h3><\/button><div class="accordion-items "><ul>(.*?)<\/ul>/g;
    let match;
    while ((match = regex.exec(data)) !== null) {
      console.log(`--- ${match[1]} : ${match[2]} ---`);
      console.log(match[3].replace(/<li>/g, '').replace(/<\/li>/g, '\n').trim());
    }
  });
});
