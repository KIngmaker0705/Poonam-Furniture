import React from 'react';
export const DemoAdminNotice: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-5">
    <h1 className="text-3xl font-bold font-serif">Admin Dashboard</h1>
    <p className="text-sm opacity-80">
      The staff dashboard (inventory, pricing, orders) needs a secure server and is not part of this
      online design demo. It is included in the full version of the website.
    </p>
    <button onClick={onBack} className="px-5 py-2.5 rounded-lg bg-[#B38639] text-white font-semibold cursor-pointer">
      Back to Home
    </button>
  </div>
);
