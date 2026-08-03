import urllib.request
import re

url = 'https://switrus.com/europe-tour-packages/07-august-12-days-magical-europe-tour?location=MUMBAI'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
html = urllib.request.urlopen(req).read().decode('utf-8')

# extract image
image_match = re.search(r'<meta property="og:image" content="(.*?)"', html)
image = image_match.group(1) if image_match else ''

print('--- ITINERARY ---')
days = re.findall(r'<div class="accordion-items[^>]*>(.*?)</div>', html, re.DOTALL)
for i, d in enumerate(days):
    d = re.sub(r'<[^>]+>', ' ', d)
    d = re.sub(r'\s+', ' ', d).strip()
    print(f'Day {i+1}: {d}')
    
print('--- IMAGE ---')
print(image)
