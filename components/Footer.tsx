
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="container mx-auto px-4 py-6 text-center text-slate-400 text-sm">
        <p>&copy; {currentYear} SummightCF Tech. All Rights Reserved.</p>
        <p className="mt-1">Lead Facilitator: Fabiyi Oluwasanmi Clement</p>
      </div>
    </footer>
  );
};

export default Footer;
