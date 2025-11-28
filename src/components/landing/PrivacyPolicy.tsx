import { StaticPageLayout } from "./StaticPageLayout";

function PrivacyPolicy() {
  return (
    <StaticPageLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 pt-32 pb-16 px-6">
        <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-10 border border-gray-200 dark:border-gray-700">

          {/* Header */}
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-6 text-gray-900 dark:text-white">
            Privacy Policy
          </h1>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-10">
            SnipRepo (“we”, “our”, “us”) provides a simple tool for storing and
            organizing code snippets. This Privacy Policy explains what information
            we collect and how we use it. By using SnipRepo, you agree to the
            practices described here.
          </p>

          {/* Section 1 */}
          <SectionTitle number="1" title="Information We Collect" />

          <SubTitle text="A. Account Information" />
          <StyledList items={["Email address", "Password (stored as a secure hash)"]} />

          <SubTitle text="B. User Content" />
          <p className="mb-3 text-gray-700 dark:text-gray-300">
            We store the following data you create inside SnipRepo:
          </p>
          <StyledList items={["Code snippets", "Folders and tags"]} />

          <SubTitle text="C. Basic Technical Data" />
          <StyledList items={[
            "Device and browser information",
            "IP address (automatically logged by our hosting provider)",
          ]} />

          <p className="mb-10 text-gray-700 dark:text-gray-300">
            We currently <strong>do not</strong> use any analytics or tracking tools
            in this MVP version.
          </p>

          {/* Section 2 */}
          <SectionTitle number="2" title="How We Use Your Information" />

          <p className="mb-3 text-gray-700 dark:text-gray-300">We use your data to:</p>
          <StyledList
            items={[
              "Create and manage your SnipRepo account",
              "Store your snippets using Supabase",
              "Ensure the app functions as expected",
              "Send essential emails (login, security notifications)",
            ]}
          />
          <p className="mb-10 text-gray-700 dark:text-gray-300">
            We do <strong>not</strong> use your data for advertising or marketing
            purposes.
          </p>

          {/* Section 3 */}
          <SectionTitle number="3" title="Data Storage & Security" />

          <p className="mb-10 leading-relaxed text-gray-700 dark:text-gray-300">
            Your data is securely stored using Supabase and industry-standard practices
            including SSL/TLS encryption, hashed passwords, and access controls. While
            we take reasonable measures to protect your data, no online service is
            completely secure.
          </p>

          {/* Section 4 */}
          <SectionTitle number="4" title="Data Sharing" />

          <p className="mb-3 text-gray-700 dark:text-gray-300">
            We only share data with essential service providers:
          </p>
          <StyledList
            items={[
              "Supabase – authentication, database, and storage",
              "Email provider – for account-related emails",
            ]}
          />
          <p className="mb-10 text-gray-700 dark:text-gray-300">
            We do <strong>not</strong> sell or share data with advertisers or unrelated
            third parties.
          </p>

          {/* Section 5 */}
          <SectionTitle number="5" title="Your Rights" />

          <p className="mb-3 text-gray-700 dark:text-gray-300">You may request to:</p>
          <StyledList
            items={[
              "Delete your account",
              "Export your snippets",
              "Update or correct your email",
              "Remove all associated data",
            ]}
          />

          <p className="mb-10 text-gray-700 dark:text-gray-300">
            To make a request, contact: <strong>buildwithsahil9@gmail.com</strong>
          </p>

          {/* Section 6 */}
          <SectionTitle number="6" title="Children’s Privacy" />

          <p className="mb-10 text-gray-700 dark:text-gray-300">
            SnipRepo is not intended for children under 13, and we do not knowingly
            collect personal information from children.
          </p>

          {/* Section 7 */}
          <SectionTitle number="7" title="Changes to This Policy" />

          <p className="mb-10 text-gray-700 dark:text-gray-300">
            We may update this Privacy Policy as SnipRepo evolves. Significant changes
            will be communicated to users.
          </p>

          {/* Section 8 */}
          <SectionTitle number="8" title="Contact Us" />

          <p className="text-gray-700 dark:text-gray-300">
            If you have questions or concerns, email us at:{" "}
            <strong>buildwithsahil9@gmail.com</strong>
          </p>
        </div>
      </div>
    </StaticPageLayout>
  );
}

// Small reusable styled components
function SectionTitle({ number, title }) {
  return (
    <h2 className="text-xl sm:text-2xl font-bold mt-12 mb-4 border-l-4 pl-4 border-blue-500">
      {number}. {title}
    </h2>
  );
}

function SubTitle({ text }) {
  return <h3 className="text-lg sm:text-xl font-semibold mt-6 mb-2">{text}</h3>;
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

export default PrivacyPolicy;
