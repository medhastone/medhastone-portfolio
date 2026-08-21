import { useEffect } from 'react';
import { motion } from 'motion/react';

export default function RojgarBahiPrivacy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-24 z-10 relative text-on-surface">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-panel p-8 md:p-12"
      >
        <h1 className="text-3xl md:text-4xl font-display font-bold glow-text mb-4">🛡️ RojgarBahi Privacy Policy</h1>
        <p className="text-text-muted mb-8 italic">Effective Date: August 21, 2026</p>
        
        <div className="space-y-8 text-lg font-body-md leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-accent-3 mb-4">1. Introduction</h2>
            <p className="mb-4">Welcome to our application ("the App"), developed by <strong>Medhastone</strong>. We respect your privacy and are committed to protecting it. This Privacy Policy explains our practices regarding the collection, use, and disclosure of your information when you use our mobile application.</p>
            <p>The core philosophy of our App is that your business and financial data belongs to you. While the App uses an internet connection to display advertisements, your core business data remains completely offline.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-accent-3 mb-4">2. Data Collection and Usage</h2>
            <p className="mb-4">We categorize data into two types: Business Data (which we do not collect) and Advertising Data (which is collected by our ad partner).</p>
            <ul className="list-none space-y-4">
              <li>
                <strong>Business Data (100% Offline):</strong> All data you enter into the App (including names, attendance records, wages, advances, and calculations) is stored locally in a secure database on your physical device. Medhastone does not have access to this data. We do not operate any backend servers or cloud databases to store your business information.
              </li>
              <li>
                <strong>Advertising Data:</strong> To keep the App free for users, we use a third-party advertising service (Google AdMob) which may collect specific device information to serve relevant ads (see Section 4).
              </li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-accent-3 mb-4">3. Device Permissions</h2>
            <p className="mb-4">To provide specific features, the App may request certain device permissions. These operate strictly on your device:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Storage / Photos / Media:</strong> Requested only if you choose to attach images (like bills or receipts) to your records, or if you export your data as a PDF/CSV file.</li>
              <li><strong>Camera:</strong> Requested only if you choose to take a live photo of a receipt or bill.</li>
              <li><strong>Internet / Network State:</strong> Required to serve advertisements via Google AdMob.</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-accent-3 mb-4">4. Third-Party Services (Google AdMob)</h2>
            <p className="mb-4">We use Google AdMob to display advertisements in the App. AdMob is a third-party service that may collect and use data to provide and personalize ads.</p>
            <p className="mb-4">AdMob may collect data such as your IP address, device identifiers (including the Android Advertising ID), and app usage data.</p>
            <p className="mb-4">You can learn more about how Google uses data for advertising by visiting Google's Privacy & Terms site: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-accent-3 hover:underline">https://policies.google.com/privacy</a></p>
            <p><strong>Opting Out:</strong> You can opt-out of personalized advertising by resetting your device's Advertising ID or turning off "Ads Personalization" in your Android device's Google Settings.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-accent-3 mb-4">5. Data Security & Retention</h2>
            <p className="mb-4">Because your business data is stored locally on your device, the security of your data depends on the security of your physical device. We recommend using a screen lock (PIN, pattern, or biometric) to protect your phone.</p>
            <p><strong>Data Deletion:</strong> You can delete all your business data at any time by using the "Clear All Data" option within the App settings, or by simply uninstalling the App.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-accent-3 mb-4">6. Children's Privacy</h2>
            <p>These Services do not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-accent-3 mb-4">7. Changes to This Privacy Policy</h2>
            <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Effective Date" at the top. You are advised to review this Privacy Policy periodically for any changes.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-accent-3 mb-4">8. Contact Us</h2>
            <p className="mb-4">If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at:</p>
            <div className="bg-surface/50 p-4 rounded-lg border border-white/5">
              <p><strong>Developer:</strong> Medhastone</p>
              <p><strong>Email:</strong> <a href="mailto:medhastone@gmail.com" className="text-accent-3 hover:underline">medhastone@gmail.com</a></p>
            </div>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
