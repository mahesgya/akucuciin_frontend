import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="w-full font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 text-gray-800">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">📄 Privacy Policy</h1>
        <p className="text-xs sm:text-sm text-gray-500 mb-6 sm:mb-8">Effective Date: 19 March 2025</p>
        
        <section className="mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-semibold mb-2">1. Introduction</h2>
          <p className="text-sm sm:text-base">
            Your privacy is important to us. This Privacy Policy explains how we
            collect, use, and protect your information when you use our website
            and services, including logging in with Google.
          </p>
        </section>
        
        <section className="mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-semibold mb-2">2. Information We Collect</h2>
          <p className="text-sm sm:text-base mb-2">
            When you sign in using Google OAuth, we may collect the following
            information (depending on what you grant permission for):
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm sm:text-base">
            <li>Your full name</li>
            <li>Your email address</li>
            <li>
              <em>(Optional)</em> Other data like address or phone number, if
              explicitly requested and approved
            </li>
          </ul>
        </section>
        
        <section className="mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-semibold mb-2">3. How We Use Your Information</h2>
          <p className="text-sm sm:text-base mb-2">We use your data only for the following purposes:</p>
          <ul className="list-disc list-inside space-y-1 text-sm sm:text-base">
            <li>To create and manage your account</li>
            <li>To authenticate and authorize your login</li>
            <li>To improve our service and personalize your experience</li>
            <li>
              <em>(Optional)</em> To contact you if needed
            </li>
          </ul>
          <p className="mt-2 text-sm sm:text-base">
            We do <strong>not</strong> sell or share your personal data with third parties.
          </p>
        </section>
        
        <section className="mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-semibold mb-2">4. Data Storage and Security</h2>
          <p className="text-sm sm:text-base">
            Your information is securely stored on our servers and protected using
            industry-standard security practices.
          </p>
        </section>
        
        <section className="mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-semibold mb-2">5. Your Rights</h2>
          <p className="text-sm sm:text-base mb-2">You have the right to:</p>
          <ul className="list-disc list-inside space-y-1 text-sm sm:text-base">
            <li>Access your data</li>
            <li>Request correction or deletion of your data</li>
            <li>Withdraw consent at any time</li>
          </ul>
          <p className="mt-2 text-sm sm:text-base">
            To do so, please contact us at:{" "}
            <a href="mailto:akucuciin.bisnis@gmail.com" className="text-blue-600 underline break-words">
              akucuciin.bisnis@gmail.com
            </a>
          </p>
        </section>
        
        <section className="mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-semibold mb-2">6. Changes to This Policy</h2>
          <p className="text-sm sm:text-base">
            We may update this Privacy Policy from time to time. Changes will be
            posted on this page.
          </p>
        </section>
        
        <section>
          <h2 className="text-lg sm:text-xl font-semibold mb-2">7. Contact Us</h2>
          <p className="mb-1 text-sm sm:text-base">
            📧 Email:{" "}
            <a href="mailto:akucuciin.bisnis@gmail.com" className="text-blue-600 underline break-words">
              akucuciin.bisnis@gmail.com
            </a>
          </p>
          <p className="text-sm sm:text-base">
            🌐 Website:{" "}
            <a 
              href="https://akucuciin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-600 underline break-words"
            >
              https://akucuciin.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;