const fs = require('fs');

let content = fs.readFileSync('scripts/generate-portfolio-pages.ts', 'utf8');

const generatePrivacyPolicyFn = `
function generatePrivacyPolicyHtml(id: string, proj: any): string {
  const pageUrl = \`https://zentova.in/\${id}/privacy-policy\`;
  return \`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Privacy Policy - \${proj.title}</title>
  <meta name="description" content="Privacy Policy for \${proj.title}." />
  <link rel="canonical" href="\${pageUrl}" />
  <link rel="icon" type="image/jpeg" href="\${proj.image}" />
  <link rel="stylesheet" href="/static.css" />
</head>
<body class="bg-[#07090e] text-white">
  <div id="root">
    <div class="flex items-center justify-center min-h-screen bg-[#07090e] text-white p-8">
      <div class="max-w-2xl text-center">
        <h1 class="text-3xl font-bold mb-4">Privacy Policy - \${proj.title}</h1>
        <p class="text-white/60">Loading privacy policy...</p>
      </div>
    </div>
  </div>
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>\`;
}

`;

content = content.replace(
  "for (const [id, proj] of Object.entries(PORTFOLIO_PROJECTS)) {",
  generatePrivacyPolicyFn + "\nfor (const [id, proj] of Object.entries(PORTFOLIO_PROJECTS)) {"
);

const loopStart = `  const targetDir = path.join(publicDir, id);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }`;

const privacyPolicyGen = `
  const privacyDir = path.join(targetDir, 'privacy-policy');
  if (!fs.existsSync(privacyDir)) {
    fs.mkdirSync(privacyDir, { recursive: true });
  }
  fs.writeFileSync(path.join(privacyDir, 'index.html'), generatePrivacyPolicyHtml(id, proj), 'utf-8');
`;

content = content.replace(loopStart, loopStart + privacyPolicyGen);

fs.writeFileSync('scripts/generate-portfolio-pages.ts', content);
