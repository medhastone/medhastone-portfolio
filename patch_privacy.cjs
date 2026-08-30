const fs = require('fs');
let content = fs.readFileSync('src/components/PrivacyPolicyScreen.tsx', 'utf-8');

// 1. Update the date header
const dateTarget = `            {appId === 'rojgarbahi' 
               ? "Effective Date: August 21, 2026" 
               : appId === 'medijourney'
              ? "Effective Date: August 22, 2026"
              : \`Your privacy is critically important to us. This document outlines how \${appName} handles your data with absolute security and transparency.\`}`;
const dateReplacement = `            {appId === 'rojgarbahi' 
               ? "Effective Date: August 21, 2026" 
               : appId === 'medijourney'
              ? "Effective Date: August 22, 2026"
              : appId === 'pdfzero'
              ? "Last Updated: August 30, 2026"
              : \`Your privacy is critically important to us. This document outlines how \${appName} handles your data with absolute security and transparency.\`}`;

if (content.includes(dateTarget)) {
    content = content.replace(dateTarget, dateReplacement);
} else {
    console.log("Could not find dateTarget");
}

// 2. Add pdfzero content
const genericTarget = `            </>
          ) : (
            <>
              <section className="p-8 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5">`;

const pdfzeroContent = `            </>
          ) : appId === 'pdfzero' ? (
            <>
              <div className="mb-8 p-6 rounded-2xl bg-white/5 border border-white/10 text-white/70 space-y-2">
                <p><strong className="text-white">Developer Brand / Publisher:</strong> Medhastone</p>
                <p><strong className="text-white">App Name:</strong> PDFZero: Offline PDF Editor</p>
                <p><strong className="text-white">Contact Email:</strong> medhastone@gmail.com</p>
              </div>

              <section className="p-8 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-2xl bg-purple-500/10 border border-white/5">
                    <Shield className="text-purple-400" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold">1. Introduction & Core Privacy Guarantee</h2>
                </div>
                <div className="space-y-4 text-white/70 leading-relaxed">
                  <p>At PDFZero, your privacy is our foundational principle. PDFZero is engineered from the ground up as a 100% Offline, On-Device Document Studio.</p>
                  <p>We do not operate remote document servers, cloud processing pipelines, or user-tracking accounts. All document viewing, PDF merging, splitting, compressing, resizing, academic conversions (LaTeX/Markdown), image editing, background removal, and optical character recognition (OCR) take place locally and exclusively on your device hardware. Your documents, images, and scanned files are never uploaded to our servers or transmitted to any third party.</p>
                </div>
              </section>

              <section className="p-8 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-2xl bg-purple-500/10 border border-white/5">
                    <FileText className="text-purple-400" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold">2. Information We Handle & On-Device Processing</h2>
                </div>
                <div className="space-y-6 text-white/70 leading-relaxed">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">A. Documents and Media Files</h3>
                    <ul className="space-y-2">
                      <li><strong>Local Processing Only:</strong> When you select, edit, compress, convert, or merge PDF files or images, the application accesses them temporarily in your local device memory (RAM/local storage).</li>
                      <li><strong>Zero Cloud Uploads:</strong> No file content, extracted text, or generated documents are ever collected, stored, transmitted, or analyzed on remote servers by the developer.</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">B. Camera & Scanner Hub</h3>
                    <ul className="space-y-2">
                      <li><strong>Real-Time Edge Detection & OCR:</strong> Camera input used for scanning receipts, ID cards, and passports is processed entirely on-device in real time.</li>
                      <li><strong>No Image Logging:</strong> Captured frames are converted directly into local PDFs/images without transmitting visual biometric or identity data externally.</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">C. Audio & Voice Actions (Smart Mic)</h3>
                    <p><strong>On-Device Voice Command Processing:</strong> If you use voice commands (e.g., "Merge PDF", "Snapshot"), audio input is converted to functional commands on-device. Audio recordings are not saved or sent over the network.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">D. Security & Encryption</h3>
                    <p><strong>Local Cryptography:</strong> When you set AES-256 bit encryption passwords or use the Biometric App Lock, cryptographic operations and biometric validations use Android's secure hardware keystore (BiometricPrompt API). Biometric data is never accessible to our application code.</p>
                  </div>
                </div>
              </section>

              <section className="p-8 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-2xl bg-purple-500/10 border border-white/5">
                    <Eye className="text-purple-400" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold">3. Third-Party Services & Advertising (Google AdMob)</h2>
                </div>
                <div className="space-y-4 text-white/70 leading-relaxed">
                  <p>To keep core features free, PDFZero integrates Google AdMob to display mobile advertisements. While the PDFZero application itself collects zero personal data, the Google Mobile Ads (GMA) SDK may automatically collect and process certain device and diagnostic data in compliance with Google Play Policies.</p>
                  <h3 className="text-lg font-bold text-white mt-6 mb-2">Data Collected by Google AdMob:</h3>
                  <ul className="space-y-2 list-disc pl-5">
                    <li><strong>Device & Network Identifiers:</strong> IP address (for general coarse geolocation / ad routing), Google Play Advertising ID (AAID), and SDK instance IDs.</li>
                    <li><strong>Ad Interaction & Diagnostics:</strong> Ad impressions, clicks, crash logs, and network performance metrics.</li>
                  </ul>
                  <p className="mt-4">Google AdMob handles this data in accordance with Google's Privacy Policy. You can learn more about how Google uses data by visiting: <a href="https://policies.google.com/privacy" className="text-purple-400 hover:underline" target="_blank" rel="noopener noreferrer">Google Privacy & Terms</a></p>
                  
                  <h3 className="text-lg font-bold text-white mt-6 mb-2">Opting Out of Personalized Advertising:</h3>
                  <p>You can manage or reset your Android Advertising ID and opt out of personalized ads at any time via your device settings: <strong>Settings &gt; Privacy &gt; Ads &gt; Delete Advertising ID</strong> or <strong>Opt out of Ads Personalization</strong>.</p>
                </div>
              </section>

              <section className="p-8 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-2xl bg-purple-500/10 border border-white/5">
                    <Smartphone className="text-purple-400" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold">4. Device Permissions & Purpose</h2>
                </div>
                <div className="space-y-4 text-white/70 leading-relaxed">
                  <p>PDFZero requests only the minimum permissions necessary for document tools to operate:</p>
                  <ul className="space-y-3">
                    <li><strong>Camera (android.permission.CAMERA):</strong> Required exclusively to scan physical documents, ID cards, and QR codes.</li>
                    <li><strong>Microphone / Record Audio (android.permission.RECORD_AUDIO):</strong> Required only when you trigger the optional Smart Mic voice action feature.</li>
                    <li><strong>Storage / Photos / Media Access (READ_MEDIA_IMAGES / scoped storage):</strong> Required to allow you to import images and export converted PDF/image documents to your device storage.</li>
                    <li><strong>Biometric Hardware (android.permission.USE_BIOMETRIC):</strong> Required to unlock the application using your device's fingerprint or face authentication.</li>
                    <li><strong>Internet (android.permission.INTERNET):</strong> Used solely by the Google AdMob SDK to load and display advertisements. No document data is transmitted via this connection.</li>
                  </ul>
                </div>
              </section>

              <section className="p-8 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-2xl bg-purple-500/10 border border-white/5">
                    <Trash2 className="text-purple-400" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold">5. Data Retention & Document Deletion</h2>
                </div>
                <div className="space-y-4 text-white/70 leading-relaxed">
                  <ul className="space-y-2">
                    <li><strong>Local History & Trash Bin:</strong> Processed files stored in your "History Hub" or "Secure Trash Bin" reside solely on your physical device.</li>
                    <li><strong>User Control:</strong> You retain full control over your files. Deleting an item or clearing the app cache via the built-in "Cleanup Assistant" or system settings permanently purges that data from your device.</li>
                  </ul>
                </div>
              </section>

              <section className="p-8 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-2xl bg-purple-500/10 border border-white/5">
                    <Users className="text-purple-400" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold">6. Children’s Privacy & Families Policy</h2>
                </div>
                <div className="space-y-4 text-white/70 leading-relaxed">
                  <p>PDFZero is a general-audience productivity tool. We do not knowingly collect personal identifiable information from children under the age of 13 (or under the applicable age of consent in your jurisdiction). The integrated AdMob SDK is configured to comply with Google Play's Families Policy and Age-Restricted treatment flags where applicable.</p>
                </div>
              </section>

              <section className="p-8 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-2xl bg-purple-500/10 border border-white/5">
                    <CheckCircle2 className="text-purple-400" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold">7. Google Play Data Safety Alignment</h2>
                </div>
                <div className="space-y-4 text-white/70 leading-relaxed">
                  <p>For transparency with the Google Play Console Data safety section:</p>
                  <ul className="space-y-2">
                    <li><strong>Data Shared / Collected:</strong> Minimal diagnostic, device ID, and ad performance data collected solely by third-party Google AdMob.</li>
                    <li><strong>Data Handled Locally (Not Collected):</strong> Photos, documents, text files, voice inputs, and scanned IDs are processed 100% on-device and are never collected or shared.</li>
                    <li><strong>Data Security:</strong> All local password-protected files use standard AES-256 bit encryption.</li>
                  </ul>
                </div>
              </section>

              <section className="p-8 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-2xl bg-purple-500/10 border border-white/5">
                    <RefreshCw className="text-purple-400" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold">8. Changes to This Privacy Policy</h2>
                </div>
                <div className="space-y-4 text-white/70 leading-relaxed">
                  <p>We may periodically update our Privacy Policy to reflect app updates or legal/policy changes. Any revisions will be published with an updated "Last Updated" date at the top of this page.</p>
                </div>
              </section>

              <section className="p-8 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-2xl bg-purple-500/10 border border-white/5">
                    <Mail className="text-purple-400" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold">9. Contact Us</h2>
                </div>
                <div className="space-y-4 text-white/70 leading-relaxed">
                  <p>If you have questions, feedback, or concerns regarding this Privacy Policy or PDFZero's offline security architecture, please contact us at:</p>
                  <ul className="space-y-2 mt-4">
                    <li className="flex items-center gap-2"><strong>Developer Brand:</strong> Medhastone</li>
                    <li className="flex items-center gap-2"><strong>Support Email:</strong> <a href="mailto:medhastone@gmail.com" className="text-purple-400 hover:underline">medhastone@gmail.com</a></li>
                  </ul>
                </div>
              </section>
            </>
          ) : (
            <>
              <section className="p-8 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5">`;

if (content.includes(genericTarget)) {
    content = content.replace(genericTarget, pdfzeroContent);
} else {
    console.log("Could not find genericTarget");
}

fs.writeFileSync('src/components/PrivacyPolicyScreen.tsx', content);
console.log('Update complete.');
