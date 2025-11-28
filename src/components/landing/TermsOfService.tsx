import { Link } from "react-router-dom";
import { StaticPageLayout } from "./StaticPageLayout";

function TermsOfService() {
  return (
    <StaticPageLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-10 border border-gray-200 dark:border-gray-700">

          {/* Header */}
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-6 text-gray-900 dark:text-white">
            Terms of Service
          </h1>

          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-10">
            Welcome to SnipRepo (“we”, “our”, “us”). By accessing or using our
            service, you agree to these Terms of Service. Please read them
            carefully before using SnipRepo.
          </p>

          {/* Section 1 */}
          <SectionTitle number="1" title="Acceptance of Terms" />

          <p className="mb-10 text-gray-700 dark:text-gray-300">
            By creating an account or using SnipRepo, you agree to comply with
            these Terms. If you do not agree, you should not use the platform.
          </p>

          {/* Section 2 */}
          <SectionTitle number="2" title="Use of the Service" />

          <p className="mb-3 text-gray-700 dark:text-gray-300">You agree not to:</p>

          <StyledList
            items={[
              "Use SnipRepo for any illegal or unauthorized purpose",
              "Upload malicious, harmful, or illegal content",
              "Attempt to break, bypass, or disrupt the service",
              "Copy, resell, or exploit any part of SnipRepo",
            ]}
          />

          <p className="mb-10 text-gray-700 dark:text-gray-300">
            You are responsible for maintaining the confidentiality of your account
            and all activity that occurs under it.
          </p>

          {/* Section 3 */}
          <SectionTitle number="3" title="User Content" />

          <p className="mb-6 text-gray-700 dark:text-gray-300">
            You retain full ownership of the snippets and content you add to
            SnipRepo. We do not claim any rights over your code.
          </p>

          <p className="mb-10 text-gray-700 dark:text-gray-300">
            However, by using SnipRepo, you grant us permission to store and process
            your content as required to operate the service.
          </p>

          {/* Section 4 */}
          <SectionTitle number="4" title="MVP Limitations" />

          <p className="mb-6 text-gray-700 dark:text-gray-300">
            This MVP version of SnipRepo is offered “as is” with certain features
            disabled, including:
          </p>

          <StyledList items={["AI features", "Analytics", "Version History", "Embed Snippe"]} />

          <p className="mb-10 text-gray-700 dark:text-gray-300">
            Additional features may be added, changed, or removed in future updates.
          </p>

          {/* Section 5 */}
          <SectionTitle number="5" title="Data & Privacy" />

          <p className="mb-6 text-gray-700 dark:text-gray-300">
            Your data is handled in accordance with our{" "}
            <Link to="/privacy-policy" className="text-blue-600 dark:text-blue-400 hover:underline">
              Privacy Policy
            </Link>.
          </p>

          <p className="mb-10 text-gray-700 dark:text-gray-300">
            We do not sell or share your information with advertisers.
          </p>

          {/* Section 6 */}
          <SectionTitle number="6" title="Service Availability" />

          <p className="mb-10 text-gray-700 dark:text-gray-300">
            We strive to keep SnipRepo online and available, but we do not guarantee
            uninterrupted operation. Outages or maintenance may occur.
          </p>

          {/* Section 7 */}
          <SectionTitle number="7" title="Termination" />

          <p className="mb-6 text-gray-700 dark:text-gray-300">
            We reserve the right to suspend or terminate your account if you:
          </p>

          <StyledList
            items={[
              "Violate these Terms",
              "Abuse the platform",
              "Engage in harmful or suspicious activity",
            ]}
          />

          <p className="mb-10 text-gray-700 dark:text-gray-300">
            You may delete your account at any time. Upon deletion, your snippets
            and stored data will be permanently removed.
          </p>

          {/* Section 8 */}
          <SectionTitle number="8" title="Disclaimer" />

          <p className="mb-10 text-gray-700 dark:text-gray-300">
            SnipRepo is provided “as is” without warranties of any kind. You use
            the service at your own risk. We are not liable for data loss, service
            interruptions, or any damages related to your use of SnipRepo.
          </p>

          {/* Section 9 */}
          <SectionTitle number="9" title="Changes to These Terms" />

          <p className="mb-10 text-gray-700 dark:text-gray-300">
            We may update these Terms from time to time. Continued use of SnipRepo
            after changes means you agree to the updated Terms.
          </p>

          {/* Section 10 */}
          <SectionTitle number="10" title="Contact Us" />

          <p className="text-gray-700 dark:text-gray-300">
            If you have any questions about these Terms, contact us at{" "}
            <strong>buildwithsahil9@gmail.com</strong>.
          </p>
        </div>
      </div>
    </StaticPageLayout>
  );
}

// Shared components (same as your privacy page)
function SectionTitle({ number, title }) {
  return (
    <h2 className="text-2xl font-bold mt-12 mb-4 border-l-4 pl-4 border-blue-500">
      {number}. {title}
    </h2>
  );
}

function StyledList({ items }) {
  return (
    <ul className="list-disc ml-6 mb-6 space-y-1 text-gray-700 dark:text-gray-300">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default TermsOfService;
