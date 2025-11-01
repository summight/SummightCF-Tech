
import React from 'react';
import { COURSE_DATA } from '../constants';

interface LandingPageProps {
  onEnroll: () => void;
}

const HeroIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const LandingPage: React.FC<LandingPageProps> = ({ onEnroll }) => {
  return (
    <div className="space-y-12 animate-fade-in-up">
      <section className="text-center pt-10 md:pt-20">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-violet-500">
          Unlock Your Potential in Web Development
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-400">
          Join our hands-on coding bootcamp and go from beginner to building your own interactive websites in just six weeks.
        </p>
        <button
          onClick={onEnroll}
          className="mt-8 px-8 py-3 text-lg font-semibold text-white bg-cyan-600 rounded-lg shadow-lg hover:bg-cyan-700 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-cyan-500 focus:ring-opacity-50 flex items-center justify-center mx-auto"
        >
          <HeroIcon />
          Enroll Now & Start Learning
        </button>
      </section>

      <section className="bg-slate-800/50 p-8 rounded-2xl shadow-xl border border-slate-700">
        <h2 className="text-3xl font-bold text-center mb-2 text-cyan-400">{COURSE_DATA.title}</h2>
        <p className="text-center text-slate-400 mb-8 max-w-3xl mx-auto">{COURSE_DATA.description}</p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COURSE_DATA.weeks.map((week) => (
            <div key={week.id} className="bg-slate-800 p-6 rounded-lg border border-slate-700 hover:border-cyan-500 transition-colors duration-300">
              <h3 className="font-bold text-lg text-white">
                <span className="text-cyan-400">Week {week.id}:</span> {week.title.split(': ')[1]}
              </h3>
              <p className="text-sm text-slate-400 mt-2">{week.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-3xl font-bold text-white">Meet Your Instructor</h2>
        <div className="mt-6 max-w-md mx-auto bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700">
            <img src={`https://picsum.photos/seed/clement/128/128`} alt="Fabiyi Oluwasanmi Clement" className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-cyan-500" />
            <h3 className="text-xl font-semibold text-cyan-400">Fabiyi Oluwasanmi Clement</h3>
            <p className="text-slate-400 mt-2">
                A passionate web developer and educator dedicated to making coding accessible and fun for everyone. With years of industry experience, Clement is excited to guide you on your journey into tech.
            </p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;