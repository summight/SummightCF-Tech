
import React from 'react';

interface CertificateProps {
  studentName: string;
  courseName: string;
}

const Certificate: React.FC<CertificateProps> = ({ studentName, courseName }) => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div id="certificate" className="w-[1000px] h-[700px] p-10 bg-white text-slate-800 flex flex-col justify-between border-8 border-cyan-700 font-serif relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-cyan-100 rounded-full opacity-50"></div>
        <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-cyan-100 rounded-full opacity-50"></div>
        
        <div className="text-center z-10">
            <h1 className="text-5xl font-bold text-cyan-800">Certificate of Completion</h1>
            <p className="text-xl mt-4 text-slate-600">This certificate is proudly presented to</p>
        </div>

        <div className="text-center z-10">
            <h2 className="text-6xl font-extrabold" style={{ fontFamily: '"Great Vibes", cursive' }}>{studentName}</h2>
        </div>

        <div className="text-center z-10">
            <p className="text-xl text-slate-600">for successfully completing the course</p>
            <h3 className="text-3xl font-semibold mt-2 text-cyan-900">{courseName}</h3>
        </div>

        <div className="flex justify-between items-end mt-10 z-10">
            <div className="text-center">
                <p className="text-lg font-semibold border-t-2 border-slate-500 pt-2 w-60">Fabiyi Oluwasanmi Clement</p>
                <p className="text-sm text-slate-500">Lead Facilitator, SummightCF Tech</p>
            </div>
            <div className="text-center">
                 <p className="text-lg font-semibold border-t-2 border-slate-500 pt-2 w-48">{currentDate}</p>
                 <p className="text-sm text-slate-500">Date of Completion</p>
            </div>
        </div>
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-96 w-96 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
        </div>
    </div>
  );
};

export default Certificate;
