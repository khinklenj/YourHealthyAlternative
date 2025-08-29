import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="mb-6">
            <Link href="/" className="inline-flex items-center text-primary-custom hover:text-primary-custom/80 mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
            <p className="text-gray-600 mt-2">Last updated: August 29, 2025</p>
          </div>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
              <p className="text-gray-700 mb-4">
                We collect information you provide directly to us, such as when you create an account, book an appointment, or contact us for support.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Personal Information</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4">
                <li>Name, email address, and phone number</li>
                <li>Account credentials and profile information</li>
                <li>Appointment details and healthcare preferences</li>
                <li>Payment information (processed securely through third-party providers)</li>
                <li>Communication preferences and history</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Usage Information</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4">
                <li>Pages visited and features used on our platform</li>
                <li>Search queries and provider interactions</li>
                <li>Device information and browser type</li>
                <li>IP address and general location data</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">
                We use the information we collect to provide, maintain, and improve our services:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4">
                <li>Facilitate appointment bookings and provider connections</li>
                <li>Send appointment confirmations and reminders</li>
                <li>Provide customer support and respond to inquiries</li>
                <li>Improve our platform and develop new features</li>
                <li>Ensure platform security and prevent fraud</li>
                <li>Comply with legal obligations and regulatory requirements</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Information Sharing</h2>
              <p className="text-gray-700 mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:
              </p>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">With Healthcare Providers</h3>
              <p className="text-gray-700 mb-4">
                We share necessary appointment and contact information with providers you choose to book appointments with.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Service Providers</h3>
              <p className="text-gray-700 mb-4">
                We work with trusted third-party service providers who assist us in operating our platform, such as payment processors and email service providers.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Legal Requirements</h3>
              <p className="text-gray-700 mb-4">
                We may disclose your information when required by law or to protect our rights, property, or safety.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Security</h2>
              <p className="text-gray-700 mb-4">
                We implement appropriate technical and organizational measures to protect your personal information:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4">
                <li>Encryption of sensitive data in transit and at rest</li>
                <li>Regular security assessments and updates</li>
                <li>Access controls and employee training</li>
                <li>Secure payment processing through certified providers</li>
                <li>Regular backups and disaster recovery procedures</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Your Rights and Choices</h2>
              <p className="text-gray-700 mb-4">
                You have the following rights regarding your personal information:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4">
                <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal requirements)</li>
                <li><strong>Portability:</strong> Request transfer of your data to another service provider</li>
                <li><strong>Opt-out:</strong> Unsubscribe from marketing communications at any time</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Cookies and Tracking</h2>
              <p className="text-gray-700 mb-4">
                We use cookies and similar tracking technologies to enhance your experience:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4">
                <li><strong>Essential Cookies:</strong> Required for basic platform functionality</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how our platform is used</li>
                <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
              </ul>
              <p className="text-gray-700 mb-4">
                You can control cookies through your browser settings, though some features may not work properly if cookies are disabled.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Children's Privacy</h2>
              <p className="text-gray-700 mb-4">
                Our platform is not intended for children under 18 years of age. We do not knowingly collect personal information from children under 18. If we become aware that we have collected personal information from a child under 18, we will take steps to delete such information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. International Data Transfers</h2>
              <p className="text-gray-700 mb-4">
                Your information may be processed and stored in countries other than your country of residence. We ensure appropriate safeguards are in place to protect your information in accordance with this privacy policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Data Retention</h2>
              <p className="text-gray-700 mb-4">
                We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this privacy policy, unless a longer retention period is required by law.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Changes to This Privacy Policy</h2>
              <p className="text-gray-700 mb-4">
                We may update this privacy policy from time to time. We will notify you of any material changes by posting the new privacy policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Your Healthy Alternative - Privacy Team</strong><br />
                  Email: privacy@yourhealthyalternative.com<br />
                  Phone: (555) 123-4567<br />
                  Address: 123 Wellness Way, Health City, HC 12345
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. State-Specific Rights</h2>
              <p className="text-gray-700 mb-4">
                Residents of certain states may have additional privacy rights under state law. Please contact us if you would like to exercise these rights or learn more about them.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}