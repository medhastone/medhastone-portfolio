import { ArrowLeft, Shield, Lock, FileText, CheckCircle2, Eye, Smartphone, Trash2, Mail, Users, RefreshCw, MapPin, Camera } from 'lucide-react';
import React, { useEffect } from 'react';

export default function PrivacyPolicyScreen({ appId, onBack }: { appId: string, onBack: () => void }) {
  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [appId]);

  const appNames: Record<string, string> = {
    rojgarbahi: "RojgarBahi",
    medijourney: "Medi Journey",
    parkdock: "ParkDock",
    brainmaze: "Brain Maze Master",
    pdfzero: "PDFZero",
    lexibrain: "LexiBrain: Hidden Words"
  };

  const appName = appNames[appId] || "Our Application";

  return (
    <div className="w-full min-h-screen bg-[#0a0a0f] text-white overflow-y-auto selection:bg-white/20">
      {/* Dynamic Header */}
      <header className="fixed top-0 w-full z-50 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group"
          >
            <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/15 border border-white/5 transition-all">
              <ArrowLeft size={16} />
            </div>
            <span className="font-bold tracking-widest text-[11px] uppercase">Back</span>
          </button>
          
          <div className="hidden md:flex items-center gap-3">
            <span className="text-white/40 text-[11px] font-bold uppercase tracking-widest">Legal</span>
            <span className="w-1 h-1 rounded-full bg-white/20"></span>
            <span className="text-[11px] font-bold uppercase tracking-widest text-purple-400">Privacy Policy</span>
          </div>
        </div>
      </header>

      <main className="pt-32 pb-32 max-w-4xl mx-auto px-6">
        
        {/* Hero Section */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-purple-500/10 text-purple-400 text-[10px] font-bold uppercase tracking-widest mb-8">
            <Shield size={14} />
            Data Protection
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-[1.1] mb-6">
            Privacy Policy
          </h1>
          
          <p className="text-xl text-white/60 leading-relaxed font-medium">
            {appId === 'rojgarbahi' 
              ? "Effective Date: August 21, 2026" 
              : appId === 'medijourney'
              ? "Effective Date: August 22, 2026"
              : appId === 'pdfzero'
              ? "Last Updated: August 30, 2026"
              : appId === 'lexibrain'
              ? "Last updated: September 13, 2026"
              : appId === 'parkdock'
              ? "Last updated: September 14, 2026"
              : `Your privacy is critically important to us. This document outlines how ${appName} handles your data with absolute security and transparency.`}
          </p>
        </div>

        {/* Policy Content */}
        <div className="space-y-12">
          
          {appId === 'rojgarbahi' ? (
            <>
              <section className="p-8 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-2xl bg-purple-500/10 border border-white/5">
                    <FileText className="text-purple-400" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold">1. Introduction</h2>
                </div>
                <div className="space-y-4 text-white/70 leading-relaxed">
                  <p>Welcome to our application ("the App"), developed by Medhastone. We respect your privacy and are committed to protecting it. This Privacy Policy explains our practices regarding the collection, use, and disclosure of your information when you use our mobile application.</p>
                  <p>The core philosophy of our App is that your business and financial data belongs to you. While the App uses an internet connection to display advertisements, your core business data remains completely offline.</p>
                </div>
              </section>

              <section className="p-8 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-2xl bg-purple-500/10 border border-white/5">
                    <Lock className="text-purple-400" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold">2. Data Collection and Usage</h2>
                </div>
                <div className="space-y-4 text-white/70 leading-relaxed">
                  <p>We categorize data into two types: Business Data (which we do not collect) and Advertising Data (which is collected by our ad partner).</p>
                  <ul className="space-y-3 mt-4">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="shrink-0 mt-1 text-purple-400" size={16} />
                      <span><strong>Business Data (100% Offline):</strong> All data you enter into the App (including names, attendance records, wages, advances, and calculations) is stored locally in a secure database on your physical device. Medhastone does not have access to this data. We do not operate any backend servers or cloud databases to store your business information.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="shrink-0 mt-1 text-purple-400" size={16} />
                      <span><strong>Advertising Data:</strong> To keep the App free for users, we use a third-party advertising service (Google AdMob) which may collect specific device information to serve relevant ads (see Section 4).</span>
                    </li>
                  </ul>
                </div>
              </section>

              <section className="p-8 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-2xl bg-purple-500/10 border border-white/5">
                    <Smartphone className="text-purple-400" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold">3. Device Permissions</h2>
                </div>
                <div className="space-y-4 text-white/70 leading-relaxed">
                  <p>To provide specific features, the App may request certain device permissions. These operate strictly on your device:</p>
                  <ul className="space-y-3 mt-4">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 shrink-0"></div>
                      <span><strong>Storage / Photos / Media:</strong> Requested only if you choose to attach images (like bills or receipts) to your records, or if you export your data as a PDF/CSV file.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 shrink-0"></div>
                      <span><strong>Camera:</strong> Requested only if you choose to take a live photo of a receipt or bill.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 shrink-0"></div>
                      <span><strong>Internet / Network State:</strong> Required to serve advertisements via Google AdMob.</span>
                    </li>
                  </ul>
                </div>
              </section>

              <section className="p-8 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-2xl bg-purple-500/10 border border-white/5">
                    <Eye className="text-purple-400" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold">4. Third-Party Services (Google AdMob)</h2>
                </div>
                <div className="space-y-4 text-white/70 leading-relaxed">
                  <p>We use Google AdMob to display advertisements in the App. AdMob is a third-party service that may collect and use data to provide and personalize ads.</p>
                  <p>AdMob may collect data such as your IP address, device identifiers (including the Android Advertising ID), and app usage data.</p>
                  <p>You can learn more about how Google uses data for advertising by visiting Google’s Privacy & Terms site: <a href="https://policies.google.com/privacy" className="text-purple-400 hover:underline" target="_blank" rel="noopener noreferrer">https://policies.google.com/privacy</a></p>
                  <p><strong>Opting Out:</strong> You can opt-out of personalized advertising by resetting your device's Advertising ID or turning off "Ads Personalization" in your Android device's Google Settings.</p>
                </div>
              </section>

              <section className="p-8 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-2xl bg-purple-500/10 border border-white/5">
                    <Shield className="text-purple-400" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold">5. Data Security & Retention</h2>
                </div>
                <div className="space-y-4 text-white/70 leading-relaxed">
                  <p>Because your business data is stored locally on your device, the security of your data depends on the security of your physical device. We recommend using a screen lock (PIN, pattern, or biometric) to protect your phone.</p>
                  <p><strong>Data Deletion:</strong> You can delete all your business data at any time by using the "Clear All Data" option within the App settings, or by simply uninstalling the App.</p>
                </div>
              </section>

              <section className="p-8 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-2xl bg-purple-500/10 border border-white/5">
                    <Users className="text-purple-400" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold">6. Children’s Privacy</h2>
                </div>
                <div className="space-y-4 text-white/70 leading-relaxed">
                  <p>These Services do not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13.</p>
                </div>
              </section>

              <section className="p-8 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-2xl bg-purple-500/10 border border-white/5">
                    <RefreshCw className="text-purple-400" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold">7. Changes to This Privacy Policy</h2>
                </div>
                <div className="space-y-4 text-white/70 leading-relaxed">
                  <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Effective Date" at the top. You are advised to review this Privacy Policy periodically for any changes.</p>
                </div>
              </section>

              <section className="p-8 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-2xl bg-purple-500/10 border border-white/5">
                    <Mail className="text-purple-400" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold">8. Contact Us</h2>
                </div>
                <div className="space-y-4 text-white/70 leading-relaxed">
                  <p>If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at:</p>
                  <ul className="space-y-2 mt-4">
                    <li className="flex items-center gap-2"><strong>Developer:</strong> Medhastone</li>
                    <li className="flex items-center gap-2"><strong>Email:</strong> <a href="mailto:medhastone@gmail.com" className="text-purple-400 hover:underline">medhastone@gmail.com</a></li>
                  </ul>
                </div>
              </section>
            </>
          ) : appId === 'medijourney' ? (
            <>
              <section className="p-8 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-2xl bg-purple-500/10 border border-white/5">
                    <FileText className="text-purple-400" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold">1. Information We Collect and How We Use It</h2>
                </div>
                <div className="space-y-4 text-white/70 leading-relaxed">
                  <p>MediJourney is designed with privacy in mind. The core functionality of the App operates using an Offline-First architecture, meaning your primary health data is stored locally on your device.</p>
                  <div className="mt-4 space-y-2">
                    <h3 className="font-bold text-white text-lg">A. Local Health and Medical Data</h3>
                    <p>Data such as your medication schedules, vitals, medical documents, diet records, and appointments are stored locally on your device in a secure database. We do not transmit this data to our servers.</p>
                  </div>
                  <div className="mt-4 space-y-2">
                    <h3 className="font-bold text-white text-lg">B. Google Drive Backups</h3>
                    <p>The App offers an optional feature to back up your data using your personal Google Drive account.</p>
                    <p>If enabled, the App accesses your Google Drive strictly to create, read, and manage the MediJourney backup files.</p>
                    <p>We do not have access to your Google credentials, nor do we access any other files in your Drive.</p>
                  </div>
                </div>
              </section>

              <section className="p-8 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-2xl bg-purple-500/10 border border-white/5">
                    <Eye className="text-purple-400" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold">2. Third-Party Services and Advertising (AdMob)</h2>
                </div>
                <div className="space-y-4 text-white/70 leading-relaxed">
                  <p>While your health data remains private, the App uses third-party services to display advertisements and monitor app performance. These services may collect device identifiers and usage data.</p>
                  <div className="mt-4 space-y-2">
                    <h3 className="font-bold text-white text-lg">Google AdMob:</h3>
                    <p>We use Google AdMob to display ads. AdMob may collect and use data such as:</p>
                    <ul className="space-y-2 mt-2 list-disc list-inside ml-2">
                      <li>Advertising ID (a unique, user-resettable ID for advertising).</li>
                      <li>IP Address and device information (model, OS version).</li>
                      <li>Interaction data (how you interact with ads).</li>
                    </ul>
                  </div>
                  <p>AdMob uses this information to provide personalized or non-personalized advertisements based on your device settings. You can opt out of personalized advertising in your Android device settings (Settings &gt; Google &gt; Ads &gt; Opt out of Ads Personalization).</p>
                  <p>For more information on how Google uses data, please review the <a href="https://policies.google.com/privacy" className="text-purple-400 hover:underline" target="_blank" rel="noopener noreferrer">Google Privacy & Terms</a>.</p>
                  <div className="mt-4 p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                    <strong className="text-purple-300">Important:</strong> Your personal health data, vitals, and medication logs are never shared with AdMob or any other advertising network.
                  </div>
                </div>
              </section>

              <section className="p-8 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-2xl bg-purple-500/10 border border-white/5">
                    <Lock className="text-purple-400" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold">3. App Permissions</h2>
                </div>
                <div className="space-y-4 text-white/70 leading-relaxed">
                  <p>To function correctly, MediJourney may request the following permissions on your device:</p>
                  <ul className="space-y-3 mt-4">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 shrink-0"></div>
                      <span><strong>Camera & Storage / Photos:</strong> To allow you to scan or attach medical documents, prescriptions, and lab reports to your secure vault.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 shrink-0"></div>
                      <span><strong>Alarms & Notifications:</strong> To send you timely medication reminders, appointment alerts, and health tips.</span>
                    </li>
                  </ul>
                  <p>You can revoke these permissions at any time through your device settings, though some features of the App may stop working.</p>
                </div>
              </section>

              <section className="p-8 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-2xl bg-purple-500/10 border border-white/5">
                    <Trash2 className="text-purple-400" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold">4. Data Retention and Deletion</h2>
                </div>
                <div className="space-y-4 text-white/70 leading-relaxed">
                  <p>Because your personal health data is stored locally on your device:</p>
                  <ul className="space-y-3 mt-4">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 shrink-0"></div>
                      <span><strong>To delete your data:</strong> You can simply clear the App’s data in your Android settings or uninstall the App entirely. This will permanently delete your local database.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 shrink-0"></div>
                      <span><strong>To delete cloud backups:</strong> You can delete your backups at any time by navigating to your Google Drive account and deleting the MediJourney backup folder.</span>
                    </li>
                  </ul>
                </div>
              </section>

              <section className="p-8 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-2xl bg-purple-500/10 border border-white/5">
                    <Shield className="text-purple-400" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold">5. Security</h2>
                </div>
                <div className="space-y-4 text-white/70 leading-relaxed">
                  <p>We value your trust in providing us with your Information. Your data is stored using Android's secure local SQLite databases. Data transmitted to third parties (like Google Drive) is encrypted in transit using standard HTTPS/TLS protocols. However, remember that no method of transmission over the internet or method of electronic storage is 100% secure.</p>
                </div>
              </section>

              <section className="p-8 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-2xl bg-purple-500/10 border border-white/5">
                    <Users className="text-purple-400" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold">6. Children’s Privacy</h2>
                </div>
                <div className="space-y-4 text-white/70 leading-relaxed">
                  <p>These Services do not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us so we can take necessary actions.</p>
                </div>
              </section>

              <section className="p-8 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-2xl bg-purple-500/10 border border-white/5">
                    <RefreshCw className="text-purple-400" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold">7. Changes to This Privacy Policy</h2>
                </div>
                <div className="space-y-4 text-white/70 leading-relaxed">
                  <p>We may update our Privacy Policy from time to time. We will notify you of any changes by updating the "Effective Date" at the top of this page. You are advised to review this Privacy Policy periodically for any changes.</p>
                </div>
              </section>

              <section className="p-8 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-2xl bg-purple-500/10 border border-white/5">
                    <Mail className="text-purple-400" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold">8. Contact Us</h2>
                </div>
                <div className="space-y-4 text-white/70 leading-relaxed">
                  <p>If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at:</p>
                  <ul className="space-y-2 mt-4">
                    <li className="flex items-center gap-2"><strong>Email:</strong> <a href="mailto:medhastone@gmail.com" className="text-purple-400 hover:underline">medhastone@gmail.com</a></li>
                    <li className="flex items-center gap-2"><strong>Website:</strong> <a href="https://zentova.in" className="text-purple-400 hover:underline" target="_blank" rel="noopener noreferrer">https://zentova.in</a></li>
                  </ul>
                </div>
              </section>
            </>
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
          ) : appId === 'lexibrain' ? (
            <>
              <div className="mb-8 p-6 rounded-2xl bg-white/5 border border-white/10 text-white/70 space-y-2">
                <p><strong className="text-white">Developer / Publisher:</strong> Medhastone</p>
                <p><strong className="text-white">Application:</strong> LexiBrain: Find Hidden Words (LexiBrain: Hidden Words)</p>
                <p><strong className="text-white">Contact Email:</strong> medhastone@gmail.com</p>
              </div>

              <section className="p-8 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-2xl bg-purple-500/10 border border-white/5">
                    <Shield className="text-purple-400" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold">1. Summary of Data Collection & Permissions</h2>
                </div>
                <div className="space-y-4 text-white/70 leading-relaxed">
                  <p>Welcome to <strong>LexiBrain: Hidden Words</strong> ("we," "our," or "us"). We are committed to protecting your privacy and providing a secure, engaging word puzzle and vocabulary experience. This Privacy Policy outlines how our mobile application handles user information and complies with the Google Play Developer Program Policies, GDPR, CCPA/CPRA, and COPPA.</p>
                  <ul className="space-y-3 mt-4">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="shrink-0 mt-1 text-purple-400" size={16} />
                      <span><strong>No Personal Account Required:</strong> You can play and enjoy all core features without registering an account.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="shrink-0 mt-1 text-purple-400" size={16} />
                      <span><strong>Local On-Device Storage:</strong> Your puzzle progress, high scores, coins, unlocked categories, and customized settings are stored locally on your device via Android's local Room database and SharedPreferences.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="shrink-0 mt-1 text-purple-400" size={16} />
                      <span><strong>No Sensitive Personal Data Collection:</strong> We do not collect, sell, or rent your real name, physical address, phone number, contacts, or biometric data.</span>
                    </li>
                  </ul>
                </div>
              </section>

              <section className="p-8 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-2xl bg-purple-500/10 border border-white/5">
                    <FileText className="text-purple-400" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold">2. Information Collected and Used</h2>
                </div>
                <div className="space-y-6 text-white/70 leading-relaxed">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">A. Information Stored Locally on Your Device</h3>
                    <ul className="space-y-2 list-disc pl-5">
                      <li><strong>Game Progress &amp; State:</strong> Levels cleared, words discovered, star ratings, hints remaining, and streak stats.</li>
                      <li><strong>Preferences:</strong> Sound/Vibration toggles, selected board theme style, and accessibility font sizing.</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">B. Third-Party Services &amp; Automated Data Collection</h3>
                    <p className="mb-4">Our game uses third-party developer libraries to enhance stability, provide vocabulary definitions, and serve advertisements. These service providers may collect non-identifiable technical data:</p>
                    <div className="space-y-4">
                      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                        <h4 className="font-bold text-white mb-1">Google Play Services / Google Mobile Ads (AdMob)</h4>
                        <p className="text-sm"><strong>Purpose:</strong> Serving banner, interstitial, and rewarded video ads to keep the game free to play.</p>
                        <p className="text-sm mt-1"><strong>Data Collected:</strong> Advertising ID (GAID), device brand/model, operating system version, coarse IP location, and ad interaction telemetry.</p>
                        <p className="text-sm mt-2"><strong>Privacy Policy:</strong> <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">Google Privacy Policy</a> &amp; <a href="https://support.google.com/admob/answer/6128543" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">Google AdMob Policy</a></p>
                      </div>

                      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                        <h4 className="font-bold text-white mb-1">Free Dictionary API (api.dictionaryapi.dev)</h4>
                        <p className="text-sm"><strong>Purpose:</strong> Providing real-time word definitions, parts of speech, and pronunciations when looking up vocabulary memory cards.</p>
                        <p className="text-sm mt-1"><strong>Data Collected:</strong> Word query string sent over secure HTTPS. No personal identifiers are attached to these dictionary lookup queries.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="p-8 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-2xl bg-purple-500/10 border border-white/5">
                    <CheckCircle2 className="text-purple-400" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold">3. How We Use Information</h2>
                </div>
                <div className="space-y-4 text-white/70 leading-relaxed">
                  <p>We use non-personal technical information strictly to:</p>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>Deliver smooth gameplay, word generation, and level progression.</li>
                    <li>Enable rewarded video ads for optional in-game hints and rewards.</li>
                    <li>Provide real-time and offline vocabulary learning definitions.</li>
                    <li>Identify and fix app crashes, performance bottlenecks, and bugs.</li>
                  </ul>
                </div>
              </section>

              <section className="p-8 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-2xl bg-purple-500/10 border border-white/5">
                    <Users className="text-purple-400" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold">4. Children’s Privacy (COPPA &amp; Families Policy Compliance)</h2>
                </div>
                <div className="space-y-4 text-white/70 leading-relaxed">
                  <p>LexiBrain: Hidden Words is designed as a family-friendly educational word puzzle game.</p>
                  <p>We do not knowingly solicit or collect personally identifiable information from children under the age of 13 (or the applicable age in your jurisdiction).</p>
                  <p>If ads are served to younger audiences, they are served via Google AdMob in compliance with Google Play's Families Policy and COPPA guidelines (utilizing contextual, non-personalized advertising tags).</p>
                </div>
              </section>

              <section className="p-8 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-2xl bg-purple-500/10 border border-white/5">
                    <Eye className="text-purple-400" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold">5. Third-Party Disclosure &amp; Sale of Data</h2>
                </div>
                <div className="space-y-4 text-white/70 leading-relaxed">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="shrink-0 mt-1 text-purple-400" size={16} />
                      <span><strong>No Sale of Data:</strong> We do not sell, trade, or monetize your personal data to data brokers or third parties.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="shrink-0 mt-1 text-purple-400" size={16} />
                      <span><strong>Service Providers:</strong> Data is shared only with trusted infrastructure and ad partners (like Google AdMob) strictly for running the core app features.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="shrink-0 mt-1 text-purple-400" size={16} />
                      <span><strong>Legal Compliance:</strong> We may disclose non-personal data only if required by law or to protect our legal rights.</span>
                    </li>
                  </ul>
                </div>
              </section>

              <section className="p-8 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-2xl bg-purple-500/10 border border-white/5">
                    <Lock className="text-purple-400" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold">6. Data Security &amp; Storage</h2>
                </div>
                <div className="space-y-4 text-white/70 leading-relaxed">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="shrink-0 mt-1 text-purple-400" size={16} />
                      <span><strong>Data Transmission:</strong> All external network requests (such as dictionary lookups and ad serving) are encrypted in transit via standard HTTPS/TLS.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="shrink-0 mt-1 text-purple-400" size={16} />
                      <span><strong>Data Retention &amp; Reset:</strong> Because game progress is stored locally on your device, clearing the app’s data or uninstalling the app permanently removes your local progress and preferences.</span>
                    </li>
                  </ul>
                </div>
              </section>

              <section className="p-8 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-2xl bg-purple-500/10 border border-white/5">
                    <Smartphone className="text-purple-400" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold">7. Your Rights (GDPR / CCPA / Regional Rights)</h2>
                </div>
                <div className="space-y-4 text-white/70 leading-relaxed">
                  <p>Depending on your jurisdiction, you have the following rights:</p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="shrink-0 mt-1 text-purple-400" size={16} />
                      <span><strong>Opt-out of Personalized Ads:</strong> You can reset or limit your Google Advertising ID anytime via your Android device settings (<em>Settings &gt; Google &gt; Ads &gt; Delete/Reset Advertising ID</em>).</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="shrink-0 mt-1 text-purple-400" size={16} />
                      <span><strong>Data Erasure:</strong> You can clear all game data by clearing the app cache/storage in your device's application settings.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="shrink-0 mt-1 text-purple-400" size={16} />
                      <span><strong>Inquiries:</strong> You can contact us at any time to ask questions regarding privacy practices.</span>
                    </li>
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
                  <p>We may update this Privacy Policy from time to time to reflect changes in our practices or regulatory standards. The updated date at the top of this page will reflect the latest revision.</p>
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
                  <p>If you have any questions, feedback, or concerns regarding this Privacy Policy, please contact us at:</p>
                  <ul className="space-y-2 mt-4">
                    <li className="flex items-center gap-2"><strong>Developer / Publisher:</strong> Medhastone</li>
                    <li className="flex items-center gap-2"><strong>Email:</strong> <a href="mailto:medhastone@gmail.com" className="text-purple-400 hover:underline">medhastone@gmail.com</a></li>
                    <li className="flex items-center gap-2"><strong>Application:</strong> LexiBrain: Find Hidden Words</li>
                  </ul>
                </div>
              </section>
            </>
          ) : appId === 'parkdock' ? (
            <>
              <div className="mb-8 p-6 rounded-2xl bg-white/5 border border-white/10 text-white/70 space-y-2">
                <p><strong className="text-white">Developer / Publisher:</strong> Medhastone</p>
                <p><strong className="text-white">Application:</strong> ParkDock: Smart Parking Memory & Driver Utility</p>
                <p><strong className="text-white">Contact Email:</strong> <a href="mailto:medhastone@gmail.com" className="text-blue-400 hover:underline">medhastone@gmail.com</a></p>
                <p><strong className="text-white">Official Website:</strong> <a href="https://zentova.in" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">https://zentova.in</a></p>
                <p><strong className="text-white">Effective Date:</strong> August 2026</p>
              </div>

              {/* 1. Introduction & Zero-Cloud Philosophy */}
              <section className="p-8 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-2xl bg-blue-500/10 border border-white/5">
                    <Shield className="text-blue-400" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold">1. Introduction & Zero-Cloud Philosophy</h2>
                </div>
                <div className="space-y-4 text-white/70 leading-relaxed">
                  <p>
                    Welcome to <strong>ParkDock</strong> ("the App"), developed and published by <strong>Medhastone</strong>. We respect your privacy and are committed to protecting it. This Privacy Policy outlines our data handling practices and demonstrates our strict compliance with Google Play Developer Policies and applicable global data protection regulations.
                  </p>
                  <p>
                    The fundamental architectural principle of ParkDock is that <strong>your vehicle location, parking history, expenses, and glovebox documents belong solely to you</strong>. All personal data stays stored locally on your device hardware in a private SQLite database with AES-256 encrypted storage. Medhastone does not operate cloud storage servers to harvest, monitor, sell, or profile your whereabouts.
                  </p>
                </div>
              </section>

              {/* 2. Data Collection and Usage */}
              <section className="p-8 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-2xl bg-blue-500/10 border border-white/5">
                    <Eye className="text-blue-400" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold">2. Data Collection and Usage</h2>
                </div>
                <div className="space-y-4 text-white/70 leading-relaxed">
                  <p>We classify data into two distinct categories:</p>

                  <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
                    <h3 className="font-bold text-emerald-400 text-lg mb-2">A. Personal Vehicle Data (100% Offline & Private)</h3>
                    <p className="text-slate-200">
                      All data you record in ParkDock—including saved parking GPS coordinates, notes, pillar numbers, vehicle registration numbers, fuel logs, service reminders, and digital glovebox documents—is stored exclusively on your device. Medhastone has zero access to this data.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-blue-500/10 border border-blue-500/30">
                    <h3 className="font-bold text-blue-400 text-lg mb-2">B. Advertising & Diagnostic Data (Google AdMob)</h3>
                    <p className="text-slate-200">
                      To keep ParkDock completely free for drivers without charging mandatory subscription fees, we integrate third-party mobile advertising via Google AdMob (Google LLC). AdMob may collect certain non-personally identifying device diagnostics and identifiers to serve contextual or personalized advertisements in compliance with Google Play standards.
                    </p>
                  </div>
                </div>
              </section>

              {/* 3. Third-Party Advertising (Google AdMob Disclosures) */}
              <section className="p-8 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-blue-500/20 bg-blue-950/10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-2xl bg-blue-500/10 border border-white/5">
                    <Smartphone className="text-blue-400" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold">3. Third-Party Advertising & Google AdMob</h2>
                </div>
                <div className="space-y-4 text-white/70 leading-relaxed">
                  <p>
                    ParkDock utilizes <strong>Google AdMob</strong> (provided by Google LLC) to serve advertisements within the application (e.g., banner ads, interstitial ads, or native ads).
                  </p>
                  <p>
                    When advertisements are requested and loaded, Google AdMob may automatically collect and process certain technical data, which may include:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-slate-200">
                    <li><strong>Google Advertising ID (GAID / AAID):</strong> A unique, user-resettable advertising identifier associated with your mobile device.</li>
                    <li><strong>IP Address & Approximate Location:</strong> Used for geographic ad serving, network routing, and regional fraud detection.</li>
                    <li><strong>Device & OS Specifications:</strong> Device model, manufacturer, Android OS version, screen size, and system language.</li>
                    <li><strong>Ad Interaction Metrics:</strong> Information regarding ad impressions, clicks, dismissals, and video view completions.</li>
                    <li><strong>Diagnostic Telemetry:</strong> Anonymized performance logs and crash metrics used to ensure SDK stability.</li>
                  </ul>
                  <p>
                    <strong>Purpose of Ad Processing:</strong> This data is utilized strictly for displaying advertisements, measuring advertising campaign performance, preventing fraudulent ad traffic or invalid clicks, and enforcing frequency caps.
                  </p>
                  <div className="pt-2">
                    <p>For detailed information on how Google processes and protects advertising data, please review:</p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Google Privacy Policy (https://policies.google.com/privacy)</a></li>
                      <li><a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">How Google uses information from sites or apps (https://policies.google.com/technologies/ads)</a></li>
                    </ul>
                  </div>
                  <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10">
                    <h4 className="font-bold text-white mb-1">User Control & Personalized Ads Opt-Out</h4>
                    <p className="text-xs text-slate-300">
                      You have full control over personalized advertising. You can reset your Google Advertising ID or opt out of personalized ads at any time via your Android device settings:
                      <br /><span className="text-blue-300 font-mono text-[11px] block mt-1">Settings &gt; Google &gt; Ads &gt; Opt out of Ads Personalization (or Delete Advertising ID)</span>
                    </p>
                  </div>
                </div>
              </section>

              {/* 4. Device Permissions Breakdown */}
              <section className="p-8 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-2xl bg-blue-500/10 border border-white/5">
                    <MapPin className="text-blue-400" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold">4. Device Permissions & Exact Usage</h2>
                </div>
                <div className="space-y-4 text-white/70 leading-relaxed">
                  <p>ParkDock requests only the minimal device permissions strictly necessary for its features:</p>
                  <ul className="space-y-3 mt-4">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="shrink-0 mt-1 text-blue-400" size={16} />
                      <div>
                        <strong className="text-white">ACCESS_FINE_LOCATION & ACCESS_COARSE_LOCATION (GPS):</strong>
                        <p className="text-slate-300 text-sm">Used solely when you tap "Park Here" to save your vehicle's physical coordinates and to provide real-time compass walking directions back to your car. Coordinates are never transmitted off your device.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="shrink-0 mt-1 text-blue-400" size={16} />
                      <div>
                        <strong className="text-white">CAMERA:</strong>
                        <p className="text-slate-300 text-sm">Optional. Requested only if you choose to take a photo of your parking spot (pillar number, floor marking) or scan vehicle documents into your Digital Glovebox. Images remain local.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="shrink-0 mt-1 text-blue-400" size={16} />
                      <div>
                        <strong className="text-white">STORAGE / READ_MEDIA_IMAGES:</strong>
                        <p className="text-slate-300 text-sm">Optional. Requested only to import vehicle document images or save generated PDF/CSV maintenance and fuel expense reports to your device storage.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="shrink-0 mt-1 text-blue-400" size={16} />
                      <div>
                        <strong className="text-white">INTERNET & ACCESS_NETWORK_STATE:</strong>
                        <p className="text-slate-300 text-sm">Used exclusively by the Google AdMob SDK to request and render advertisements, and to download map tiles for navigation.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="shrink-0 mt-1 text-blue-400" size={16} />
                      <div>
                        <strong className="text-white">USE_BIOMETRIC / USE_FINGERPRINT:</strong>
                        <p className="text-slate-300 text-sm">Used locally by the Android BiometricPrompt API to verify driver identity before unlocking the Encrypted Digital Glovebox.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </section>

              {/* 5. Security & Encrypted Digital Glovebox */}
              <section className="p-8 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-2xl bg-blue-500/10 border border-white/5">
                    <Lock className="text-blue-400" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold">5. Data Security & Local Encryption</h2>
                </div>
                <div className="space-y-4 text-white/70 leading-relaxed">
                  <p>
                    We prioritize data safety. When you save sensitive vehicle documents (such as your Driver's License, Vehicle Registration RC, Pollution PUC Certificate, or Insurance Policy) into the Digital Glovebox, ParkDock secures them using industry-standard <strong>AES-256 local encryption</strong>.
                  </p>
                  <p>
                    Decryption keys are anchored to your device's secure hardware keystore. No unencrypted document files or credentials are ever exposed or transmitted over the internet.
                  </p>
                </div>
              </section>

              {/* 6. Data Retention & User Deletion Rights */}
              <section className="p-8 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-2xl bg-blue-500/10 border border-white/5">
                    <Trash2 className="text-blue-400" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold">6. Data Retention & User Deletion Rights</h2>
                </div>
                <div className="space-y-4 text-white/70 leading-relaxed">
                  <p>
                    Because all user data is stored locally on your device and not on remote servers, you maintain complete data sovereignty:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-slate-200">
                    <li><strong>In-App Deletion:</strong> You can delete any vehicle, parking record, expense entry, or glovebox document instantly from within the application.</li>
                    <li><strong>Wipe All Data:</strong> You can select "Clear All Data" in the Settings screen or use Android's <em>Settings &gt; Apps &gt; ParkDock &gt; Storage &gt; Clear Storage</em>.</li>
                    <li><strong>App Uninstallation:</strong> Uninstalling ParkDock permanently deletes all associated local databases and encrypted documents from your device.</li>
                  </ul>
                </div>
              </section>

              {/* 7. Children's Privacy */}
              <section className="p-8 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-2xl bg-blue-500/10 border border-white/5">
                    <Users className="text-blue-400" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold">7. Children's Privacy (COPPA Compliance)</h2>
                </div>
                <div className="space-y-4 text-white/70 leading-relaxed">
                  <p>
                    ParkDock is an automotive and driver utility designed for general audiences and licensed drivers (ages 13 and above). We do not knowingly collect or solicit personal data from children under the age of 13.
                  </p>
                </div>
              </section>

              {/* 8. Policy Updates */}
              <section className="p-8 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-2xl bg-blue-500/10 border border-white/5">
                    <RefreshCw className="text-blue-400" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold">8. Policy Updates & Modifications</h2>
                </div>
                <div className="space-y-4 text-white/70 leading-relaxed">
                  <p>
                    We may update this Privacy Policy from time to time to adhere to evolving Google Play policies or regulatory requirements. Any revisions will be published at <a href="https://zentova.in/parkdock/privacy-policy" className="text-blue-400 hover:underline">https://zentova.in/parkdock/privacy-policy</a> with a revised Effective Date.
                  </p>
                </div>
              </section>

              {/* 9. Contact Us */}
              <section className="p-8 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-blue-500/30 bg-blue-950/20">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-2xl bg-blue-500/10 border border-white/5">
                    <Mail className="text-blue-400" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold">9. Contact Developer / Publisher</h2>
                </div>
                <div className="space-y-3 text-white/80 leading-relaxed">
                  <p>For any questions, privacy inquiries, or data safety requests, please contact us at:</p>
                  <div className="space-y-1.5 text-slate-200 mt-2">
                    <div><strong>Developer / Publisher:</strong> Medhastone</div>
                    <div><strong>Email:</strong> <a href="mailto:medhastone@gmail.com" className="text-blue-400 hover:underline">medhastone@gmail.com</a></div>
                    <div><strong>Official Website:</strong> <a href="https://zentova.in" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">https://zentova.in</a></div>
                    <div><strong>Application:</strong> ParkDock: Smart Parking Memory & Driver Utility</div>
                  </div>
                </div>
              </section>
            </>
          ) : appId === 'brainmaze' ? (
            <>
              <div className="mb-8 p-6 rounded-2xl bg-white/5 border border-indigo-500/20 text-white/70 space-y-2">
                <p><strong className="text-white">Developer / Publisher:</strong> Medhastone</p>
                <p><strong className="text-white">Application:</strong> Brain Maze Master: Offline Maze Puzzle & IQ Brain Training</p>
                <p><strong className="text-white">Package Name:</strong> com.brainmaze.master</p>
                <p><strong className="text-white">Contact Email:</strong> <a href="mailto:medhastone@gmail.com" className="text-indigo-400 hover:underline">medhastone@gmail.com</a></p>
                <p><strong className="text-white">Official Website:</strong> <a href="https://zentova.in" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">https://zentova.in</a></p>
                <p><strong className="text-white">Effective Date:</strong> September 2026</p>
              </div>

              {/* 1. Introduction & Overview */}
              <section className="p-8 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-2xl bg-indigo-500/10 border border-white/5">
                    <Shield className="text-indigo-400" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold">1. Introduction & Zero Personal Data Philosophy</h2>
                </div>
                <div className="space-y-4 text-white/70 leading-relaxed">
                  <p>
                    Welcome to <strong>Brain Maze Master</strong> ("the App"), developed and published by <strong>Medhastone</strong>. We value your privacy and are committed to maintaining a secure, transparent, and entertaining mobile puzzle experience.
                  </p>
                  <p>
                    Brain Maze Master is designed with an <strong>offline-first, privacy-by-design</strong> architecture. You can enjoy over 1,000+ labyrinth puzzles, unlock 20+ heroes, and play through 18+ artistic silhouette shapes without creating an account, registering personal credentials, or exposing personal identity data.
                  </p>
                </div>
              </section>

              {/* 2. Information Handled Locally */}
              <section className="p-8 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-2xl bg-indigo-500/10 border border-white/5">
                    <FileText className="text-indigo-400" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold">2. Information Stored Locally on Your Device</h2>
                </div>
                <div className="space-y-4 text-white/70 leading-relaxed">
                  <p>All core gameplay data is stored strictly on your local device via Android's local storage mechanisms (SQLite database / SharedPreferences):</p>
                  <ul className="list-disc pl-6 space-y-2 text-slate-200">
                    <li><strong>Gameplay Progression:</strong> Completed levels, unlocked maze difficulties (Easy, Medium, Hard, Expert, Master), star ratings, and IQ test scores.</li>
                    <li><strong>In-Game Economy & Collectibles:</strong> Earned coins, rare diamonds, unlocked hero characters (Starter through Divine tiers), unlocked trail themes, and daily streak counters.</li>
                    <li><strong>Audio & Gameplay Settings:</strong> Sound effects (SFX) toggle, background music (BGM) volume, and haptic vibration preferences.</li>
                  </ul>
                  <p>
                    This data remains on your physical device. Medhastone does not operate cloud servers that sync, harvest, or commercialize your gameplay records.
                  </p>
                </div>
              </section>

              {/* 3. Third-Party Advertising & Google AdMob */}
              <section className="p-8 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-indigo-500/30 bg-indigo-950/15">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-2xl bg-indigo-500/10 border border-white/5">
                    <Eye className="text-indigo-400" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold">3. Third-Party Advertising & Google AdMob Disclosures</h2>
                </div>
                <div className="space-y-4 text-white/70 leading-relaxed">
                  <p>
                    To keep Brain Maze Master completely free for all players around the globe, we integrate <strong>Google AdMob</strong> (provided by Google LLC) to serve mobile advertisements.
                  </p>
                  <p><strong>Ad Formats Used in Brain Maze Master:</strong></p>
                  <ul className="list-disc pl-6 space-y-1.5 text-slate-200">
                    <li><strong>Banner Ads:</strong> Displayed unobtrusively at the top or bottom of puzzle menus.</li>
                    <li><strong>Interstitial Ads:</strong> Displayed between completed maze levels or game sessions.</li>
                    <li><strong>Rewarded Video Ads (Optional):</strong> Opt-in videos you can choose to watch to earn free bonus hints, unlock lucky wheel spins, or revive during timed IQ challenges.</li>
                  </ul>
                  <h3 className="font-bold text-white text-lg mt-4 mb-2">Data Processed by the Google Mobile Ads (GMA) SDK:</h3>
                  <p>When ad requests are processed, Google AdMob may automatically collect and handle non-personally identifiable technical telemetry in compliance with Google Play Developer Policies:</p>
                  <ul className="list-disc pl-6 space-y-1.5 text-slate-200">
                    <li><strong>Google Advertising ID (GAID / AAID):</strong> A unique, resettable identifier assigned by Android for ad attribution.</li>
                    <li><strong>IP Address & Coarse Location:</strong> Used for regional ad routing, language localization, and click-fraud prevention.</li>
                    <li><strong>Device Specifications:</strong> Device model, manufacturer, OS build version, screen size, and system language.</li>
                    <li><strong>Ad Engagement Metrics:</strong> Ad impressions, view completion rates, click data, and SDK diagnostic telemetry.</li>
                  </ul>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2 mt-4">
                    <p className="font-bold text-white">Google Privacy Resources & Policies:</p>
                    <ul className="list-disc pl-6 text-slate-300 space-y-1 text-xs">
                      <li><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">Google Privacy Policy (https://policies.google.com/privacy)</a></li>
                      <li><a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">How Google uses information from apps (https://policies.google.com/technologies/ads)</a></li>
                      <li><a href="https://support.google.com/admob/answer/6128543" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">Google AdMob Policies & Restrictions</a></li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/30 mt-4">
                    <h4 className="font-bold text-white mb-1">User Control: Reset or Opt Out of Ads Personalization</h4>
                    <p className="text-xs text-slate-300">
                      You can opt out of personalized ads or reset your advertising ID at any time via Android system settings:
                      <br /><span className="text-indigo-300 font-mono text-[11px] block mt-1">Settings &gt; Google &gt; Ads &gt; Opt out of Ads Personalization (or Delete Advertising ID)</span>
                    </p>
                  </div>
                </div>
              </section>

              {/* 4. Minimal Device Permissions */}
              <section className="p-8 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-2xl bg-indigo-500/10 border border-white/5">
                    <Smartphone className="text-indigo-400" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold">4. Device Permissions & Exact Purpose</h2>
                </div>
                <div className="space-y-4 text-white/70 leading-relaxed">
                  <p>Brain Maze Master requests only the bare minimum runtime capabilities necessary for audio, haptics, and advertising:</p>
                  <ul className="space-y-3 mt-4">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="shrink-0 mt-1 text-indigo-400" size={16} />
                      <div>
                        <strong className="text-white">INTERNET & ACCESS_NETWORK_STATE:</strong>
                        <p className="text-slate-300 text-sm">Used exclusively by the Google AdMob SDK to request and load banner, interstitial, and rewarded video ads. No personal gameplay metrics are transmitted.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="shrink-0 mt-1 text-indigo-400" size={16} />
                      <div>
                        <strong className="text-white">VIBRATE:</strong>
                        <p className="text-slate-300 text-sm">Used to trigger subtle tactile feedback when sliding across labyrinth turns, hitting maze walls, or solving level goals.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="shrink-0 mt-1 text-indigo-400" size={16} />
                      <div>
                        <strong className="text-white">WAKE_LOCK:</strong>
                        <p className="text-slate-300 text-sm">Prevents your device display from timing out or dimming during active maze navigation.</p>
                      </div>
                    </li>
                  </ul>
                  <p className="text-xs text-slate-400 pt-2">
                    <em>Notice:</em> Brain Maze Master <strong>NEVER</strong> requests sensitive device permissions such as Camera, Microphone, GPS/Fine Location, Contacts, SMS, or Phone State.
                  </p>
                </div>
              </section>

              {/* 5. Data Retention & Deletion Rights */}
              <section className="p-8 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-2xl bg-indigo-500/10 border border-white/5">
                    <Trash2 className="text-indigo-400" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold">5. Data Retention & User Deletion Rights</h2>
                </div>
                <div className="space-y-4 text-white/70 leading-relaxed">
                  <p>In accordance with Google Play's Data Safety and user deletion standards:</p>
                  <ul className="list-disc pl-6 space-y-2 text-slate-200">
                    <li><strong>Clear Cache & Data:</strong> You can wipe all local progress, coins, and records at any time via Android <em>Settings &gt; Apps &gt; Brain Maze Master &gt; Storage &gt; Clear Data</em>.</li>
                    <li><strong>App Uninstallation:</strong> Deleting/uninstalling the application permanently purges all associated local files, database entries, and saved settings from your device.</li>
                  </ul>
                </div>
              </section>

              {/* 6. Children's Privacy & Families Policy */}
              <section className="p-8 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-2xl bg-indigo-500/10 border border-white/5">
                    <Users className="text-indigo-400" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold">6. Children's Privacy & COPPA Compliance</h2>
                </div>
                <div className="space-y-4 text-white/70 leading-relaxed">
                  <p>
                    Brain Maze Master is a family-friendly puzzle game suitable for audiences of all ages. We do not knowingly collect or solicit personal information from children under the age of 13.
                  </p>
                  <p>
                    Our integrated AdMob SDK is configured to comply with Google Play's Families Policy and Age-Restricted treatment flags (such as <code>TAG_FOR_CHILD_DIRECTED_TREATMENT</code> and <code>TAG_FOR_UNDER_AGE_OF_CONSENT</code>) where required.
                  </p>
                </div>
              </section>

              {/* 7. Changes to Policy */}
              <section className="p-8 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-2xl bg-indigo-500/10 border border-white/5">
                    <RefreshCw className="text-indigo-400" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold">7. Policy Updates & Modifications</h2>
                </div>
                <div className="space-y-4 text-white/70 leading-relaxed">
                  <p>
                    We may update our Privacy Policy periodically to reflect new features, app updates, or regulatory requirements. Any modifications will be published at <a href="https://zentova.in/brainmaze/privacy-policy" className="text-indigo-400 hover:underline">https://zentova.in/brainmaze/privacy-policy</a> with an updated Effective Date.
                  </p>
                </div>
              </section>

              {/* 8. Contact Developer */}
              <section className="p-8 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-indigo-500/30 bg-indigo-950/20">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-2xl bg-indigo-500/10 border border-white/5">
                    <Mail className="text-indigo-400" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold">8. Contact Developer / Publisher</h2>
                </div>
                <div className="space-y-3 text-white/80 leading-relaxed">
                  <p>If you have any questions, feedback, or privacy-related inquiries, please contact us at:</p>
                  <div className="space-y-1.5 text-slate-200 mt-2">
                    <div><strong>Developer / Publisher:</strong> Medhastone</div>
                    <div><strong>Support Email:</strong> <a href="mailto:medhastone@gmail.com" className="text-indigo-400 hover:underline">medhastone@gmail.com</a></div>
                    <div><strong>Official Website:</strong> <a href="https://zentova.in" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">https://zentova.in</a></div>
                    <div><strong>Application:</strong> Brain Maze Master: Offline Maze Puzzle & IQ Brain Training</div>
                  </div>
                </div>
              </section>
            </>
          ) : (
            <>
              <section className="p-8 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-2xl bg-purple-500/10 border border-white/5">
                    <Lock className="text-purple-400" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold">1. Data Collection & Storage</h2>
                </div>
                <div className="space-y-4 text-white/70 leading-relaxed">
                  <p>
                    {appName} is built with a privacy-first approach. All primary data related to your usage, ledgers, entries, and personal records are stored locally on your device.
                  </p>
                  <p>
                    We do not upload your sensitive financial or personal data to our servers without explicit action from you (such as initiating a cloud backup, if available).
                  </p>
                </div>
              </section>

              <section className="p-8 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-2xl bg-purple-500/10 border border-white/5">
                    <FileText className="text-purple-400" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold">2. How We Use Information</h2>
                </div>
                <div className="space-y-4 text-white/70 leading-relaxed">
                  <p>
                    Any analytics or crash reporting data collected is completely anonymized. We use this non-personally identifiable information solely to:
                  </p>
                  <ul className="space-y-3 mt-4">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="shrink-0 mt-1 text-purple-400" size={16} />
                      <span>Diagnose and fix technical crashes or bugs.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="shrink-0 mt-1 text-purple-400" size={16} />
                      <span>Understand high-level feature usage to improve the app.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="shrink-0 mt-1 text-purple-400" size={16} />
                      <span>Ensure security and prevent unauthorized access.</span>
                    </li>
                  </ul>
                </div>
              </section>

              <section className="p-8 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-2xl bg-purple-500/10 border border-white/5">
                    <Shield className="text-purple-400" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold">3. Third-Party Services</h2>
                </div>
                <div className="space-y-4 text-white/70 leading-relaxed">
                  <p>
                    {appName} may utilize secure third-party services (like Google Play Services) for core functionality. These providers are bound by strict data protection agreements. We do not sell, rent, or trade your personal information to outside parties.
                  </p>
                </div>
              </section>
              
              <section className="p-8 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5">
                <div className="flex items-center gap-4 mb-6">
                  <h2 className="text-2xl font-bold">4. Your Consent</h2>
                </div>
                <div className="space-y-4 text-white/70 leading-relaxed">
                  <p>
                    By using {appName}, you consent to our privacy policy. If we decide to change our privacy policy, we will post those changes on this page and update the modification date below.
                  </p>
                  <p className="pt-4 text-sm font-medium text-white/40">
                    Last modified: August 2026
                  </p>
                </div>
              </section>
            </>
          )}

        </div>
      </main>
    </div>
  );
}
