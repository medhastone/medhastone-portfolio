import { useEffect } from 'react';
import { motion } from 'motion/react';

export default function MediJourneyContact() {
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
        <h1 className="text-3xl md:text-4xl font-display font-bold glow-text mb-8">💙 We'd Love to Hear From You</h1>

        <div className="space-y-8 text-lg font-body-md leading-relaxed">
          <section>
            <p className="mb-4">Thank you for using <strong>Medi Journey</strong>.</p>
            <p className="mb-4">Your feedback, suggestions, and questions help us improve the app and provide a better experience for everyone.</p>
            <p>If you need assistance, have feature suggestions, want to report a bug, or have questions regarding privacy or your account, please contact us using the details below.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-accent-3 mb-4">👨‍💻 Developer Information</h2>
            <div className="bg-surface/50 p-6 rounded-lg border border-white/5 space-y-3">
              <p><strong>App Name:</strong> 🏥 Medi Journey</p>
              <p><strong>Developer:</strong> 💙 Medhastone</p>
              <p><strong>Support Email:</strong> 📧 <a href="mailto:medhastone@gmail.com" className="text-accent-3 hover:underline">medhastone@gmail.com</a></p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-accent-3 mb-4">📬 Contact Us For</h2>
            <p className="mb-4">We are happy to assist you with:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ul className="list-disc pl-6 space-y-2">
                <li>💊 Medicine Reminder Questions</li>
                <li>❤️ Health Tracker Support</li>
                <li>📁 Medical Document Issues</li>
                <li>☁️ Backup & Restore Assistance</li>
                <li>🔐 Privacy Questions</li>
              </ul>
              <ul className="list-disc pl-6 space-y-2">
                <li>📱 App Performance Issues</li>
                <li>🐞 Bug Reports</li>
                <li>💡 Feature Suggestions</li>
                <li>⭐ Feedback & Reviews</li>
                <li>📄 Google Play Related Questions</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-accent-3 mb-4">🐞 Report a Bug</h2>
            <p className="mb-4">Found a problem?</p>
            <p className="mb-2">Please include the following information when reporting a bug:</p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>Device Model</li>
              <li>Android Version</li>
              <li>App Version</li>
              <li>Description of the issue</li>
              <li>Steps to reproduce the problem</li>
              <li>Screenshot (if available)</li>
            </ul>
            <p>Providing these details helps us investigate and resolve issues more efficiently.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-accent-3 mb-4">💡 Feature Requests</h2>
            <p className="mb-4">We welcome new ideas and suggestions.</p>
            <p className="mb-4">If there is a feature you would like to see in Medi Journey, please let us know.</p>
            <p>User feedback plays an important role in guiding future updates.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-accent-3 mb-4">🔒 Privacy & Security</h2>
            <p className="mb-4">If you have questions regarding:</p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li><a href="#medijourney/privacy-policy" className="text-accent-3 hover:underline">Privacy Policy</a></li>
              <li>Data Protection</li>
              <li>Permissions</li>
              <li>Backup & Restore</li>
              <li>Google Sign-In</li>
              <li>Medical Document Storage</li>
            </ul>
            <p>please contact us at: 📧 <a href="mailto:medhastone@gmail.com" className="text-accent-3 hover:underline">medhastone@gmail.com</a></p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-accent-3 mb-4">⏰ Support Hours</h2>
            <p className="mb-4">We aim to respond to support requests as quickly as possible.</p>
            <p className="mb-2">Typical response time: <strong>📩 Within 2–5 business days</strong></p>
            <p>Response times may vary during weekends, holidays, or periods of high support volume.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-accent-3 mb-4">🌐 Useful Links</h2>
            <ul className="space-y-4">
              <li><a href="#medijourney/privacy-policy" className="flex items-center text-accent-3 hover:underline gap-2">📄 Privacy Policy</a></li>
              <li><a href="#medijourney/terms-of-service" className="flex items-center text-accent-3 hover:underline gap-2">📜 Terms of Service</a></li>
              <li><a href="#medijourney" className="flex items-center text-accent-3 hover:underline gap-2">ℹ️ About Medi Journey</a></li>
              <li><a href="#medijourney" className="flex items-center text-accent-3 hover:underline gap-2">🏠 Home</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-accent-3 mb-4">⚠️ Medical Disclaimer</h2>
            <div className="bg-red-500/10 p-6 rounded-lg border border-red-500/20 text-red-200">
              <p className="mb-4"><strong>Medi Journey is a personal health management application designed to help users organize their own health information.</strong></p>
              <p className="mb-2">The app does not provide:</p>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>Medical advice</li>
                <li>Diagnosis</li>
                <li>Treatment</li>
                <li>Emergency medical services</li>
              </ul>
              <p className="mb-4">If you have concerns about your health or medications, please consult a qualified healthcare professional.</p>
              <p><strong>If you believe you are experiencing a medical emergency, contact your local emergency services immediately.</strong></p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-accent-3 mb-4">❤️ Thank You</h2>
            <p className="mb-4">Thank you for choosing Medi Journey.</p>
            <p className="mb-4">We appreciate your trust and are committed to continuously improving the app with better features, enhanced security, and a reliable user experience.</p>
            <p>Your feedback helps us make Medi Journey better for everyone.</p>
          </section>

        </div>
      </motion.div>
    </div>
  );
}
