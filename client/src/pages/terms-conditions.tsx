import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TermsConditions() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="mb-6">
            <Link href="/" className="inline-flex items-center text-primary-custom hover:text-primary-custom/80 mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Terms and Conditions</h1>
            <p className="text-gray-600 mt-2">Last updated: August 29, 2025</p>
          </div>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Agreement to Terms</h2>
              <p className="text-gray-700 mb-4">
                By accessing and using Your Healthy Alternative ("we," "our," or "us"), you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Use License</h2>
              <p className="text-gray-700 mb-4">
                Permission is granted to temporarily access our platform for personal, non-commercial transitory viewing only. This includes:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4">
                <li>Searching for and viewing provider profiles</li>
                <li>Booking appointments with healthcare providers</li>
                <li>Managing your account and appointments</li>
                <li>Leaving reviews for services received</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Provider Services</h2>
              <p className="text-gray-700 mb-4">
                Your Healthy Alternative serves as a platform connecting patients with alternative medicine providers. We do not:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4">
                <li>Provide medical advice, diagnosis, or treatment</li>
                <li>Guarantee the quality of services provided by third-party practitioners</li>
                <li>Assume responsibility for provider-patient interactions</li>
                <li>Practice medicine or provide healthcare services directly</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. User Accounts</h2>
              <p className="text-gray-700 mb-4">
                When creating an account, you must provide accurate and complete information. You are responsible for:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4">
                <li>Maintaining the confidentiality of your account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us immediately of unauthorized access</li>
                <li>Providing truthful information in reviews and communications</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Provider Applications</h2>
              <p className="text-gray-700 mb-4">
                Healthcare providers applying to join our platform must:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4">
                <li>Hold valid licenses and certifications in their field</li>
                <li>Provide accurate professional and practice information</li>
                <li>Maintain professional liability insurance</li>
                <li>Comply with all applicable healthcare regulations</li>
                <li>Submit to background verification as required</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Appointments and Cancellations</h2>
              <p className="text-gray-700 mb-4">
                Appointments booked through our platform are subject to:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4">
                <li>Provider availability and scheduling policies</li>
                <li>Individual provider cancellation and rescheduling terms</li>
                <li>Payment terms as established by each provider</li>
                <li>Our platform booking and notification systems</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Privacy and Data Protection</h2>
              <p className="text-gray-700 mb-4">
                Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy, which is incorporated into these terms by reference.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Prohibited Uses</h2>
              <p className="text-gray-700 mb-4">
                You may not use our platform to:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4">
                <li>Violate any local, state, national, or international law</li>
                <li>Transmit harmful, threatening, or offensive content</li>
                <li>Impersonate another person or entity</li>
                <li>Interfere with the platform's security features</li>
                <li>Submit false reviews or misleading information</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Disclaimer of Warranties</h2>
              <p className="text-gray-700 mb-4">
                The information on this platform is provided on an "as is" basis. To the fullest extent permitted by law, we exclude all representations, warranties, and conditions relating to our website and the use of this website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Limitation of Liability</h2>
              <p className="text-gray-700 mb-4">
                In no event shall Your Healthy Alternative be liable for any special, incidental, indirect, or consequential damages whatsoever arising out of or in connection with your use of this platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Changes to Terms</h2>
              <p className="text-gray-700 mb-4">
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Your continued use of the platform constitutes acceptance of revised terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Contact Information</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about these Terms and Conditions, please contact us at:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Your Healthy Alternative</strong><br />
                  Email: legal@yourhealthyalternative.com<br />
                  Phone: (555) 123-4567<br />
                  Address: 123 Wellness Way, Health City, HC 12345
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}