import { useEffect } from 'react';
import { motion } from 'motion/react';

export default function MediJourneyTerms() {
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
        <h1 className="text-3xl md:text-4xl font-display font-bold glow-text mb-4">💙 Medi Journey – Terms of Service</h1>
        <p className="text-text-muted mb-8 italic">Last Updated: August 20, 2026</p>

        <div className="space-y-8 text-lg font-body-md leading-relaxed">
          <section>
            <p className="mb-4">Welcome to <strong>Medi Journey</strong>, developed by <strong>Medhastone</strong>.</p>
            <p className="mb-4">These Terms of Service ("Terms") govern your use of the Medi Journey mobile application ("App"). By downloading, installing, or using the App, you agree to these Terms.</p>
            <p>If you do not agree with these Terms, please discontinue use of the App.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-accent-3 mb-4">🩺 1. About Medi Journey</h2>
            <p className="mb-4">Medi Journey is a personal health management application that helps users organize and manage their personal health information.</p>
            <p className="font-semibold mb-2">Features may include:</p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>💊 Medicine Management</li>
              <li>⏰ Medicine Reminders</li>
              <li>❤️ Blood Pressure Tracking</li>
              <li>🩸 Blood Sugar Tracking</li>
              <li>⚖️ Weight Tracking</li>
              <li>📁 Medical Report Storage</li>
              <li>🧾 Prescription Storage</li>
              <li>📅 Appointment Reminders</li>
              <li>📝 Personal Health Notes</li>
              <li>📊 Health History</li>
              <li>☁️ Optional Backup & Restore</li>
              <li>🔔 Reminder Notifications</li>
            </ul>
            <p>The App is intended for personal organization and record-keeping only.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-accent-3 mb-4">⚕️ 2. Medical Disclaimer</h2>
            <div className="bg-red-500/10 p-6 rounded-lg border border-red-500/20 text-red-200 mb-4">
              <p className="mb-2"><strong>Medi Journey is not a medical device and does not provide:</strong></p>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>Medical advice</li>
                <li>Diagnosis</li>
                <li>Treatment</li>
                <li>Emergency medical services</li>
                <li>Medication recommendations</li>
                <li>Clinical monitoring</li>
              </ul>
            </div>
            <p className="mb-4">Information stored in the App is provided by you and is intended only to help organize your personal health records.</p>
            <p className="mb-4">Always seek advice from a qualified healthcare professional regarding medical questions or treatment decisions.</p>
            <p><strong>If you believe you are experiencing a medical emergency, contact your local emergency services immediately.</strong></p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-accent-3 mb-4">👤 3. Your Responsibilities</h2>
            <p className="font-semibold mb-2">You are responsible for:</p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>Entering accurate information.</li>
              <li>Reviewing medicine schedules and reminders.</li>
              <li>Keeping your health records updated.</li>
              <li>Verifying uploaded medical documents.</li>
              <li>Protecting your device and optional backup account.</li>
              <li>Enabling notifications if you wish to receive reminders.</li>
            </ul>
            <p>Reminder delivery may be affected by device settings, battery optimization, operating system restrictions, or notification permissions.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-accent-3 mb-4">📁 4. User Content</h2>
            <p className="mb-4">You retain ownership of the information you enter into Medi Journey, including:</p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>Medicine details</li>
              <li>Reminder schedules</li>
              <li>Health records</li>
              <li>Medical notes</li>
              <li>Doctor information</li>
              <li>Medical reports</li>
              <li>Prescriptions</li>
              <li>Appointment information</li>
            </ul>
            <p>You are responsible for ensuring that the information you store is lawful and accurate.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-accent-3 mb-4">☁️ 5. Optional Google Sign-In & Backup</h2>
            <p className="mb-4">Google Sign-In is optional.</p>
            <p className="mb-4">If you choose to sign in, it may be used to enable supported backup and restore features and to help you restore your own data when changing devices.</p>
            <p>You can continue using the core features of Medi Journey without signing in.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-accent-3 mb-4">🔔 6. Permissions</h2>
            <p className="mb-4">Medi Journey requests only the permissions necessary for the features you choose to use.</p>
            
            <h3 className="text-xl font-semibold mb-2 text-primary-light">Notification Permission</h3>
            <p className="mb-2">Used to send:</p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>Medicine reminders</li>
              <li>Health reminders</li>
              <li>Appointment reminders</li>
              <li>Document reminders</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2 text-primary-light">File Access</h3>
            <p className="mb-2">Used only when you choose to:</p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>Upload prescriptions</li>
              <li>Upload medical reports</li>
              <li>Select medical documents from your device</li>
            </ul>
            <p>The App accesses only the files you select.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-accent-3 mb-4">📢 7. Advertising</h2>
            <p className="mb-4">Medi Journey displays advertisements using Google AdMob.</p>
            <p className="mb-4">Advertisements help support the continued development and maintenance of the App.</p>
            <p className="mb-4">Some advertisements may be personalized depending on your consent, device settings, and applicable legal requirements.</p>
            <p>Advertising services are provided by third parties and are subject to their own terms and privacy policies.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-accent-3 mb-4">🔒 8. Privacy</h2>
            <p className="mb-4">Your use of Medi Journey is also governed by our Privacy Policy, which explains how information is collected, used, stored, and protected.</p>
            <p>Please review the Privacy Policy before using the App.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-accent-3 mb-4">💾 9. Data Storage & Backup</h2>
            <p className="mb-4">By default, your personal health information is stored locally on your device.</p>
            <p className="mb-4">If you enable supported backup features, copies of your data may also be stored through the selected backup service.</p>
            <p>You are responsible for verifying that your backups have completed successfully.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-accent-3 mb-4">🔄 10. Updates & Changes</h2>
            <p className="mb-4">We may release updates that include:</p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>New features</li>
              <li>Security improvements</li>
              <li>Performance enhancements</li>
              <li>Bug fixes</li>
              <li>User interface improvements</li>
              <li>Compatibility updates</li>
            </ul>
            <p>Some features may change, be improved, or be discontinued over time.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-accent-3 mb-4">🚫 11. Acceptable Use</h2>
            <p className="font-semibold mb-2">You agree not to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Use the App for unlawful purposes.</li>
              <li>Attempt to reverse engineer or modify the App except where permitted by law.</li>
              <li>Circumvent security or access controls.</li>
              <li>Introduce malware or harmful software.</li>
              <li>Interfere with the normal operation of the App.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-accent-3 mb-4">©️ 12. Intellectual Property</h2>
            <p className="mb-4">All intellectual property rights related to Medi Journey, including its design, branding, graphics, interface, logos, and software, are owned by Medhastone or its licensors unless otherwise stated.</p>
            <p>You may not copy, distribute, modify, or reproduce any part of the App without prior written permission, except where permitted by applicable law.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-accent-3 mb-4">⚠️ 13. Limitation of Liability</h2>
            <p className="mb-4">To the maximum extent permitted by applicable law, Medhastone is not liable for:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Missed reminders due to disabled notifications, device settings, battery optimization, or operating system restrictions.</li>
              <li>Incorrect or incomplete information entered by users.</li>
              <li>Loss of data caused by device failure, accidental deletion, or unsuccessful backups.</li>
              <li>Decisions made based on information stored in the App.</li>
              <li>Indirect, incidental, special, or consequential damages arising from the use or inability to use the App.</li>
            </ul>
            <p>Nothing in these Terms limits liability where such limitation is prohibited by applicable law.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-accent-3 mb-4">🤝 14. Third-Party Services</h2>
            <p className="mb-4">Medi Journey may use trusted third-party services such as:</p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>Google Play Services</li>
              <li>Google Sign-In (optional)</li>
              <li>Google Drive Backup (optional, if implemented)</li>
              <li>Google AdMob</li>
            </ul>
            <p>Your use of these services is governed by their respective terms and privacy policies.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-accent-3 mb-4">🗑️ 15. Termination</h2>
            <p className="mb-4">You may stop using Medi Journey at any time.</p>
            <p className="mb-4">You may remove the App from your device and delete your locally stored data.</p>
            <p>If you have enabled optional backup features, you may also disconnect your account or remove backed-up data using the relevant service where supported.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-accent-3 mb-4">📜 16. Changes to These Terms</h2>
            <p className="mb-4">We may update these Terms from time to time.</p>
            <p className="mb-4">The revised version will become effective when published in the App or on our official website with an updated Effective Date.</p>
            <p>Continued use of the App after the updated Terms become effective constitutes acceptance of the revised Terms.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-accent-3 mb-4">⚖️ 17. Governing Law</h2>
            <p>These Terms are governed by the applicable laws of the jurisdiction in which the developer operates, unless otherwise required by mandatory consumer protection laws.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-accent-3 mb-4">📧 18. Contact Us</h2>
            <p className="mb-4">If you have questions about these Terms, please contact us.</p>
            <div className="bg-surface/50 p-4 rounded-lg border border-white/5">
              <p><strong>Developer:</strong> Medhastone</p>
              <p><strong>Email:</strong> <a href="mailto:medhastone@gmail.com" className="text-accent-3 hover:underline">medhastone@gmail.com</a></p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-accent-3 mb-4">❤️ 19. Acknowledgment</h2>
            <p className="font-semibold mb-2">By using Medi Journey, you acknowledge that:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>You have read and understood these Terms.</li>
              <li>You agree to be bound by these Terms.</li>
              <li>You understand that Medi Journey is a personal health management and organization tool.</li>
              <li>You understand that the App is not a substitute for professional medical advice, diagnosis, or treatment.</li>
            </ul>
          </section>

        </div>
      </motion.div>
    </div>
  );
}
