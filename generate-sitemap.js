import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const domain = 'https://www.tourswale.co.in';

const staticRoutes = [
  '/',
  '/domestic-tours',
  '/international-tours',
  '/about',
  '/insights',
  '/contact',
  '/visa-services',
  '/passport-services',
  '/visa-services/singapore',
  '/visa-services/japan-business',
  '/visa-services/us-tourist',
  '/visa-services/uk-tourist',
  '/visa-services/australia-tourist',
  '/visa-services/thailand-tourist',
  '/visa-services/qatar-tourist',
  '/visa-services/oman-tourist',
  '/visa-services/china-tourist',
  '/visa-services/indonesia-tourist',
  '/visa-services/philippines-tourist',
  '/visa-services/egypt-tourist',
  '/visa-services/canada-tourist',
  '/visa-services/schengen-tourist',
  '/visa-services/new-zealand-tourist',
  '/visa-services/south-korea-tourist',
  '/visa-services/malaysia-tourist',
  '/visa-services/dubai-tourist',
  '/visa-services/saudi-arabia-tourist',
  '/visa-services/turkey-tourist',
  '/visa-services/hong-kong-tourist',
  '/visa-services/vietnam-tourist',
  '/visa-services/mauritius-tourist',
  '/visa-services/sri-lanka-tourist',
  '/privacy-policy',
  '/terms'
];

const dataPath = path.join(__dirname, 'src', 'data.js');
const dataContent = fs.readFileSync(dataPath, 'utf8');

const articlesIndex = dataContent.indexOf('export const articles');
const toursContent = dataContent.substring(0, articlesIndex);
const articlesContent = dataContent.substring(articlesIndex);

const extractSlugs = (text) => {
  const slugs = [];
  const regex = /slug:\s*['"]([^'"]+)['"]/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    slugs.push(match[1]);
  }
  return [...new Set(slugs)];
};

const tourSlugs = extractSlugs(toursContent);
const articleSlugs = extractSlugs(articlesContent);

const urls = [];

// Static routes
staticRoutes.forEach(route => {
  urls.push({
    loc: `${domain}${route}`,
    priority: route === '/' ? '1.0' : '0.8',
    changefreq: 'weekly'
  });
});

// Tour routes
tourSlugs.forEach(slug => {
  urls.push({
    loc: `${domain}/tours/${slug}`,
    priority: '0.9',
    changefreq: 'monthly'
  });
});

// Article routes
articleSlugs.forEach(slug => {
  urls.push({
    loc: `${domain}/insights/${slug}`,
    priority: '0.7',
    changefreq: 'monthly'
  });
});

const today = new Date().toISOString().split('T')[0];

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

fs.writeFileSync(path.join(__dirname, 'public', 'sitemap.xml'), sitemapXml);
console.log('Successfully generated public/sitemap.xml');

const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${domain}/sitemap.xml
`;

fs.writeFileSync(path.join(__dirname, 'public', 'robots.txt'), robotsTxt);
console.log('Successfully generated public/robots.txt');
