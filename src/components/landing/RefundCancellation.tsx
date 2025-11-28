import { StaticPageLayout } from "./StaticPageLayout";

function RefundCancellationPolicy() {
  return (
    <StaticPageLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 pt-32 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sm:p-10 border border-gray-200 dark:border-gray-700">

          {/* Header */}
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-6 text-gray-900 dark:text-white">
            Refund & Cancellation Policy
          </h1>

          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-10">
            This Refund & Cancellation Policy explains how refunds and subscription
            cancellations work for SnipRepo (“we”, “our”, “us”). Please read the policy
            carefully before making any purchase once payments are enabled.
          </p>

          {/* Section 1 */}
          <SectionTitle number="1" title="Current Status (MVP Phase)" />

          <p className="mb-10 text-gray-700 dark:text-gray-300">
            SnipRepo is currently in its MVP stage. Payment features and premium
            subscriptions are <strong>not yet active</strong>.
            As a result:
          </p>

          <StyledList
            items={[
              "No payments are being processed",
              "No subscriptions can be purchased",
              "No refunds are necessary at this stage"
            ]}
          />

          <p className="mb-10 text-gray-700 dark:text-gray-300">
            This policy is provided in advance for when paid features are launched.
          </p>

          {/* Section 2 */}
          <SectionTitle number="2" title="Refund Policy (Future Pro Version)" />

          <p className="mb-6 text-gray-700 dark:text-gray-300">
            Once we introduce paid plans, the following rules will apply:
          </p>

          <StyledList
            items={[
              "Refunds will be available within 7 days of purchase for first-time subscribers only",
              "Refunds will not be provided for renewal payments",
              "Refunds will not be issued for misuse, abuse, or violations of our Terms of Service",
              "After a refund, your account will revert to the free plan immediately"
            ]}
          />

          <p className="mb-10 text-gray-700 dark:text-gray-300">
            Refunds will only be granted if you contact us at{" "}
            <strong>buildwithsahil9@gmail.com</strong> with your registered email.
          </p>

          {/* Section 3 */}
          <SectionTitle number="3" title="Cancellation Policy" />

          <p className="mb-3 text-gray-700 dark:text-gray-300">
            When paid subscriptions are introduced, you may:
          </p>

          <StyledList
            items={[
              "Cancel your paid subscription at any time",
              "Continue using the paid features until the billing cycle ends",
              "Lose access to paid features after the billing period ends",
              "Retain your snippets and data (nothing will be deleted)"
            ]}
          />

          <p className="mb-10 text-gray-700 dark:text-gray-300">
            Cancellation does <strong>not</strong> automatically trigger a refund.
          </p>

          {/* Section 4 */}
          <SectionTitle number="4" title="Non-Refundable Situations" />

          <p className="mb-3 text-gray-700 dark:text-gray-300">
            Refunds will not be issued under the following cases:
          </p>

          <StyledList
            items={[
              "Accidental or unwanted purchases after usage",
              "Failure to use the service",
              "Change of mind after the refund period",
              "Violation of Terms of Service",
              "Billing issues caused by the user's bank or payment provider"
            ]}
          />

          {/* Section 5 */}
          <SectionTitle number="5" title="Contact Us" />

          <p className="text-gray-700 dark:text-gray-300">
            For refund or cancellation requests, contact us at:{" "}
            <strong>buildwithsahil9@gmail.com</strong>.
          </p>

        </div>
      </div>
    </StaticPageLayout>
  );
}

// Shared Components
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

export default RefundCancellationPolicy;
