import { useState } from "react";
import { messagesApi } from "../../lib/api/messages";
import toast from "react-hot-toast";
import { StaticPageLayout } from "./StaticPageLayout";

export function Contact() {
  const [loading, setLoading] = useState(false);

 const handleSubmit = async (e) => {
  e.preventDefault();
  if (loading) return;

  setLoading(true);

  const formData = new FormData(e.target);

  const name = (formData.get("name") as string).trim();
  const email = (formData.get("email") as string).trim();
  const message = (formData.get("message") as string).trim();

  // 🔍 Frontend validation
  if (name.length < 2) {
    toast.error("Your name looks too short 👀");
    setLoading(false);
    return;
  }

  if (!email.includes("@") || !email.includes(".")) {
    toast.error("Please enter a valid email address ✉️");
    setLoading(false);
    return;
  }

  if (message.length < 5) {
    toast.error("Your message is too short. Add a bit more 😊");
    setLoading(false);
    return;
  }

  try {
    await messagesApi.create({
      name,
      email,
      message,
      user_agent: navigator.userAgent,
      ip_address: null,
    });

    toast.success("Thanks! We received your message 🚀");
    e.target.reset();
  } catch (err) {
    console.error(err);
    toast.error("Something went wrong. Please try again.");
  }

  setLoading(false);
};


  return (
    <StaticPageLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 pt-32 pb-16 px-6">
        <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-10 border border-gray-200 dark:border-gray-700">

          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Contact Us</h1>
          <p className="mb-10 text-lg text-center opacity-80 max-w-xl mx-auto">
            Have questions, feedback, or feature requests? Fill out the form below and we'll get back to you.
          </p>


          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-gray-100 dark:bg-gray-800 p-3 sm:p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700"
          >
            <div>
              <label className="block mb-2 font-medium text-sm uppercase tracking-wide opacity-80">
                Name
              </label>
              <input
                name="name"
                type="text"
                required
                className="w-full p-3 rounded-md bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Your Name"
              />
            </div>


            <div>
              <label className="block mb-2 font-medium text-sm uppercase tracking-wide opacity-80">
                Email
              </label>
              <input
                name="email"
                type="email"
                required
                className="w-full p-3 rounded-md bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="you@example.com"
              />
            </div>


            <div>
              <label className="block mb-2 font-medium text-sm uppercase tracking-wide opacity-80">
                Message
              </label>
              <textarea
                name="message"
                rows="6"
                required
                className="w-full p-3 rounded-md bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Write your message..."
              ></textarea>
            </div>


            <button
              type="submit"
              className="px-6 py-3 rounded-md bg-blue-600 hover:bg-blue-700 text-white w-full font-semibold transition-all shadow-md hover:shadow-lg"
            >
              Send Message
            </button>
          </form >
        </div >
      </div >
    </StaticPageLayout>
  );
}