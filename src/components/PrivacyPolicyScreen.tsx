import { ArrowLeft, Shield, Lock, FileText, CheckCircle2, Eye, Smartphone, Trash2, Mail, Users, RefreshCw } from 'lucide-react';
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
    pdfzero: "PDFZero"
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
