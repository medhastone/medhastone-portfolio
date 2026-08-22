const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const seoTags = `
    <!-- SEO and Social Meta Tags -->
    <meta name="keywords" content="free browser games, online games, unblocked games, puzzle games, action games, arcade games, HTML5 games, Zentova, Medhastone">
    <meta property="og:title" content="Zentova Play Games - Free Online Browser Games" />
    <meta property="og:description" content="Play our collection of high-performance web games! Enjoy 15+ ad-free puzzles, action, and arcade games directly in your browser without downloads." />
    <meta property="og:image" content="https://zentova.in/medi.jpg" />
    <meta property="og:url" content="https://zentova.in/#play-games" />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Zentova Play Games" />
    <meta name="twitter:description" content="Play 15+ high-quality puzzle and arcade games directly in your browser." />
    
    <!-- JSON-LD Structured Data for Google -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Zentova Play Games",
      "url": "https://zentova.in/",
      "description": "A premium collection of high-performance HTML5 browser games.",
      "genre": ["Action", "Puzzle", "Arcade", "Educational"]
    }
    </script>
`;

if (!html.includes('og:title')) {
    html = html.replace('</head>', `${seoTags}  </head>`);
    fs.writeFileSync('index.html', html);
    console.log('SEO tags added successfully.');
} else {
    console.log('SEO tags already exist.');
}
