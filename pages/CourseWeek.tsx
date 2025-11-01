
import React, { useState } from 'react';
import { Week } from '../types';

interface CourseWeekProps {
  week: Week;
  onComplete: (weekId: number) => void;
  onBackToDashboard: () => void;
  isCompleted: boolean;
}

const CodeBlock: React.FC<{ title: string; code: string }> = ({ title, code }) => (
  <div className="bg-slate-900 rounded-lg my-4 border border-slate-700">
    <div className="px-4 py-2 border-b border-slate-700 text-sm text-slate-400">{title}</div>
    <pre className="p-4 text-sm text-white overflow-x-auto">
      <code className="font-mono">{code}</code>
    </pre>
  </div>
);

const CourseWeek: React.FC<CourseWeekProps> = ({ week, onComplete, onBackToDashboard, isCompleted }) => {
  const [code, setCode] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  
  return (
    <div className="animate-fade-in-up">
      <button onClick={onBackToDashboard} className="mb-6 text-cyan-400 hover:text-cyan-300 text-sm">&larr; Back to Dashboard</button>
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold text-white">{week.title}</h1>
        <p className="text-lg text-slate-400 mt-2">{week.description}</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="p-6 bg-slate-800/50 rounded-lg border border-slate-700">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">Lesson Content</h2>
            {week.content.map((paragraph, index) => (
              <p key={index} className="text-slate-300 mb-4 leading-relaxed">{paragraph}</p>
            ))}
          </section>

          <section className="p-6 bg-slate-800/50 rounded-lg border border-slate-700">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">Instructional Video{week.videoUrls.length > 1 ? 's' : ''}</h2>
            <div className="space-y-6">
              {week.videoUrls.map((url, index) => (
                <div key={index} className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
                  <iframe
                    src={url}
                    title={`YouTube video player for week ${week.id} - video ${index + 1}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
              ))}
            </div>
          </section>

          <section className="p-6 bg-slate-800/50 rounded-lg border border-slate-700">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">Code Examples</h2>
            {week.examples.map((example, index) => (
              <CodeBlock key={index} title={example.title} code={example.code} />
            ))}
          </section>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <section className="p-6 bg-slate-800 rounded-lg border border-slate-700">
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">{week.assignment.title}</h2>
              <p className="text-slate-300 text-sm mb-4">{week.assignment.description}</p>

              <div className="space-y-4">
                <div>
                  <label htmlFor="ide" className="block text-sm font-medium text-slate-400 mb-1">Your Code</label>
                  <textarea
                    id="ide"
                    rows={10}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Write your code here..."
                    className="w-full p-2 bg-slate-900 border border-slate-600 rounded-md text-white font-mono text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
                    disabled={isCompleted}
                  ></textarea>
                </div>
                <div>
                  <label htmlFor="image-upload" className="block text-sm font-medium text-slate-400 mb-1">Upload Screenshot (Optional)</label>
                  <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-cyan-600 file:text-white hover:file:bg-cyan-700 disabled:opacity-50"
                    disabled={isCompleted}
                  />
                   {image && <p className="text-xs text-slate-500 mt-2 truncate">Selected: {image.name}</p>}
                </div>
              </div>
            </section>
            
            {isCompleted ? (
                 <div className="flex items-center justify-center p-4 bg-green-900/50 text-green-300 rounded-lg border border-green-500">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-semibold">Week Completed!</span>
                 </div>
            ) : (
                <button
                    onClick={() => onComplete(week.id)}
                    className="w-full py-3 px-4 text-lg font-semibold text-white bg-cyan-600 rounded-lg shadow-lg hover:bg-cyan-700 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-cyan-500 focus:ring-opacity-50"
                >
                    Mark as Complete & Submit
                </button>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseWeek;
