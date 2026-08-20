import { useEffect } from 'react';
import { motion } from 'motion/react';

export default function MediJourneyPrivacy() {
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
        <h1 className="text-3xl md:text-4xl font-display font-bold glow-text mb-4">💙 Medi Journey Privacy Policy</h1>
        <p className="text-text-muted mb-8 italic">Last Updated: August 20, 2026</p>

        <div className="space-y-8 text-lg font-body-md leading-relaxed">
          <section>
            <p className="mb-4">Welcome to <strong>Medi Journey</strong>, developed by <strong>Medhastone</strong>.</p>
            <p className="mb-4">Your privacy is important to us. This Privacy Policy explains how Medi Journey collects, uses, stores, and protects your information when you use our application.</p>
            <p>By installing or using Medi Journey, you agree to this Privacy Policy.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-accent-3 mb-4">🩺 About Medi Journey</h2>
            <p className="mb-4">Medi Journey is a personal health management application designed to help you organize your personal health information in one place.</p>
            <p className="font-semibold mb-2">Features include:</p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>💊 Medicine Management</li>
              <li>⏰ Medicine Reminders</li>
              <li>❤️ Blood Pressure Tracking</li>
              <li>🩸 Blood Sugar Tracking</li>
              <li>⚖️ Weight Tracking</li>
              <li>📊 Personal Health Records</li>
              <li>📁 Medical Document Storage</li>
              <li>🧾 Prescription Storage</li>
              <li>🏥 Doctor Visit Records</li>
              <li>📅 Appointment Reminders</li>
              <li>📝 Personal Health Notes</li>
              <li>☁️ Optional Backup & Restore</li>
            </ul>
            <div className="bg-surface/50 p-4 rounded-lg border border-white/5">
              <p><strong>Medi Journey is intended for personal health organization only.</strong></p>
              <p>It does not provide medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional for medical decisions.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-accent-3 mb-4">📌 Information You Provide</h2>
            <p className="mb-4">You decide what information to store in the app.</p>
            <p className="font-semibold mb-2">Examples include:</p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>Medicine names</li>
              <li>Dosage information</li>
              <li>Reminder schedules</li>
              <li>Blood pressure records</li>
              <li>Blood sugar records</li>
              <li>Weight records</li>
              <li>Health notes</li>
              <li>Doctor information</li>
              <li>Hospital information</li>
              <li>Medical reports</li>
              <li>Prescription images</li>
              <li>Laboratory reports</li>
              <li>Appointment information</li>
              <li>Personal health history</li>
            </ul>
            <p>You may also choose to upload medical documents from your device.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-accent-3 mb-4">💾 Local Data Storage</h2>
            <p className="mb-2">By default, Medi Journey stores your information <strong>locally on your device</strong>.</p>
            <p>You can use the core features of the app without creating an account.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-accent-3 mb-4">☁️ Optional Google Sign-In & Backup</h2>
            <p className="mb-4">Google Sign-In is completely optional.</p>
            <p className="font-semibold mb-2">If you choose to sign in, it may be used to:</p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>Enable backup and restore (if available)</li>
              <li>Restore your own app data on another device</li>
              <li>Synchronize your own app data across your devices (if available)</li>
            </ul>
            <p>You may continue using Medi Journey without signing in.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-accent-3 mb-4">🔔 Permissions</h2>
            <p className="mb-4">Medi Journey requests only the permissions needed for the features you use.</p>
            
            <h3 className="text-xl font-semibold mb-2 text-primary-light">Notification Permission</h3>
            <p className="mb-2">Used to deliver:</p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>Medicine reminders</li>
              <li>Health reminders</li>
              <li>Appointment reminders</li>
              <li>Document reminders</li>
            </ul>
            <p className="mb-6">You can disable notifications at any time through your device settings.</p>

            <h3 className="text-xl font-semibold mb-2 text-primary-light">File Access</h3>
            <p className="mb-2">Used only when you choose to:</p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>Upload prescriptions</li>
              <li>Upload medical reports</li>
              <li>Upload health documents</li>
              <li>Select files from your device</li>
            </ul>
            <p>The app only accesses files that you explicitly choose.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-accent-3 mb-4">🚫 Permissions We Do Not Request</h2>
            <p className="mb-2">Medi Journey does <strong>not</strong> request access to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Contacts</li>
              <li>Phone calls</li>
              <li>SMS</li>
              <li>Call logs</li>
              <li>Precise location</li>
              <li>Background location</li>
              <li>Microphone</li>
              <li>Camera (unless you later add a camera feature)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-accent-3 mb-4">📢 Advertising</h2>
            <p className="mb-4">Medi Journey uses Google AdMob to display advertisements.</p>
            <p className="mb-4">AdMob may collect certain information automatically to display and measure advertisements, depending on your device, region, and your consent where required by law.</p>
            <p className="font-semibold mb-2">This information may include:</p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>Advertising ID (where available)</li>
              <li>Device information</li>
              <li>App interactions related to ads</li>
              <li>Approximate location derived from IP address (where applicable)</li>
              <li>Diagnostic information</li>
            </ul>
            <p className="mb-2">Advertising is provided by Google and is subject to Google's privacy practices.</p>
            <p>Learn more: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-accent-3 hover:underline">https://policies.google.com/privacy</a></p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-accent-3 mb-4">🍪 Personalized Ads & Consent</h2>
            <p className="mb-4">Where required by applicable laws, Medi Journey uses Google's User Messaging Platform (UMP) or another consent mechanism to request your consent before serving personalized advertising.</p>
            <p className="mb-4">If you do not consent to personalized advertising, non-personalized ads may still be shown where supported.</p>
            <p>You can change your advertising preferences through your device settings or applicable consent options.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-accent-3 mb-4">🔐 Data Security</h2>
            <p className="mb-4">We take reasonable technical and organizational measures to help protect your information.</p>
            <p className="mb-4">Depending on the features you use, your information may be protected through local storage protections and encrypted backup features where implemented.</p>
            <p>However, no electronic storage or transmission method can be guaranteed to be completely secure.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-accent-3 mb-4">🗑️ Data Deletion</h2>
            <p className="mb-4">You control your information.</p>
            <p className="font-semibold mb-2">You can:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Delete medicines</li>
              <li>Delete reminders</li>
              <li>Delete health records</li>
              <li>Delete medical documents</li>
              <li>Clear app data</li>
              <li>Remove optional backups (where supported)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-accent-3 mb-4">👶 Children's Privacy</h2>
            <p className="mb-4">Medi Journey is not specifically directed to children under the age required by applicable law in their country.</p>
            <p>If you believe a child has provided personal information without appropriate authorization, please contact us.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-accent-3 mb-4">🤝 Third-Party Services</h2>
            <p className="mb-4">Depending on the features you use, Medi Journey may integrate with trusted third-party services, including:</p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>Google Play Services</li>
              <li>Google Sign-In (optional)</li>
              <li>Google Drive Backup (optional, if implemented)</li>
              <li>Google AdMob</li>
            </ul>
            <p>These services operate under their own privacy policies.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-accent-3 mb-4">🔄 Changes to This Privacy Policy</h2>
            <p className="mb-4">We may update this Privacy Policy from time to time.</p>
            <p>When changes are made, the updated version will be published within the app and/or on our website with a revised Effective Date.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-accent-3 mb-4">📧 Contact Us</h2>
            <p className="mb-4">If you have any questions, suggestions, or concerns about this Privacy Policy, please contact us.</p>
            <div className="bg-surface/50 p-4 rounded-lg border border-white/5">
              <p><strong>Developer:</strong> Medhastone</p>
              <p><strong>Email:</strong> <a href="mailto:medhastone@gmail.com" className="text-accent-3 hover:underline">medhastone@gmail.com</a></p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-accent-3 mb-4">⚠️ Medical Disclaimer</h2>
            <div className="bg-red-500/10 p-6 rounded-lg border border-red-500/20 text-red-200">
              <p className="mb-4"><strong>Medi Journey is a personal health management and organization tool.</strong></p>
              <p className="mb-4">The app does not provide medical advice, diagnosis, emergency services, or treatment recommendations.</p>
              <p>Always consult a qualified healthcare professional regarding your health or medications.</p>
            </div>
          </section>

          <section className="mt-12 pt-8 border-t border-white/10 opacity-70">
            <h2 className="text-xl font-bold text-gray-400 mb-4">✅ Note: Before Publishing to Google Play</h2>
            <div className="text-sm space-y-4">
              <p>To stay compliant, make sure your Play Console Data Safety form matches the app's actual behavior. For example:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>If health information stays only on the device and is not transmitted to your servers, declare that accurately.</li>
                <li>If you use Google Sign-In and cloud backup, disclose only the data actually used for those features.</li>
                <li>If you use AdMob, disclose advertising-related data collection as required.</li>
                <li>If you later add analytics, crash reporting, or additional permissions (such as camera), update both this Privacy Policy and your Data Safety declarations before releasing the update.</li>
              </ul>
              <p>Keeping the Privacy Policy and Data Safety section consistent with your app's real behavior is one of the most important factors for Google Play compliance.</p>
            </div>
          </section>

        </div>
      </motion.div>
    </div>
  );
}
