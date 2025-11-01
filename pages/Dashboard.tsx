
import React from 'react';
import { User, Course, Week } from '../types';
import Certificate from '../components/Certificate';

// This is a browser-only feature, so we need to tell TypeScript about these global objects
declare const jspdf: any;
declare const html2canvas: any;

interface DashboardProps {
  user: User;
  course: Course;
  completedWeeks: number[];
  onSelectWeek: (week: Week) => void;
}

const CheckCircleIcon: React.FC<{className: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
);

const PlayCircleIcon: React.FC<{className: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
    </svg>
);

const DownloadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
  </svg>
);

const Dashboard: React.FC<DashboardProps> = ({ user, course, completedWeeks, onSelectWeek }) => {
  const isCourseComplete = completedWeeks.length === course.weeks.length;

  const handleDownloadCertificate = async () => {
    // Create a temporary container for the certificate to be rendered off-screen
    const certificateContainer = document.createElement('div');
    certificateContainer.style.position = 'absolute';
    certificateContainer.style.left = '-9999px';
    document.body.appendChild(certificateContainer);

    // Create a temporary root and render the Certificate component
    const root = (await import('react-dom/client')).createRoot(certificateContainer);
    root.render(<Certificate studentName={user.name} courseName={course.title} />);

    // Add a small delay for rendering
    await new Promise(resolve => setTimeout(resolve, 500));

    const certificateElement = certificateContainer.querySelector('#certificate');
    if (certificateElement && typeof html2canvas !== 'undefined' && typeof jspdf !== 'undefined') {
      const canvas = await html2canvas(certificateElement, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jspdf.jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [1000, 700]
      });
      pdf.addImage(imgData, 'PNG', 0, 0, 1000, 700);
      pdf.save(`Certificate-${user.name.replace(/\s/g, '_')}.pdf`);
    } else {
        console.error("Certificate element or PDF libraries not found");
    }

    // Clean up
    root.unmount();
    document.body.removeChild(certificateContainer);
  };
  
  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold">Welcome to your Dashboard, {user.name}!</h1>
      <p className="text-slate-400 mt-2">{course.title}</p>
      
      {isCourseComplete && (
        <div className="mt-8 p-6 bg-green-900/50 border border-green-500 rounded-lg text-center">
            <h2 className="text-2xl font-bold text-green-300">Congratulations!</h2>
            <p className="mt-2 text-green-200">You have completed the entire course. You've earned your certificate!</p>
            <button
                onClick={handleDownloadCertificate}
                className="mt-4 px-6 py-2 text-md font-semibold text-slate-900 bg-green-400 rounded-lg shadow-lg hover:bg-green-300 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-400 focus:ring-opacity-50 flex items-center justify-center mx-auto"
            >
                <DownloadIcon />
                Download Certificate
            </button>
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Course Curriculum</h2>
        <div className="space-y-4">
          {course.weeks.map((week, index) => {
            const isCompleted = completedWeeks.includes(week.id);
            const isLocked = index > 0 && !completedWeeks.includes(course.weeks[index - 1].id);

            return (
              <div
                key={week.id}
                onClick={() => !isLocked && onSelectWeek(week)}
                className={`flex items-center p-4 rounded-lg transition-all duration-300 ${
                  isLocked
                    ? 'bg-slate-800 opacity-50 cursor-not-allowed'
                    : 'bg-slate-800 hover:bg-slate-700 hover:shadow-lg cursor-pointer'
                }`}
              >
                {isCompleted ? (
                    <CheckCircleIcon className="w-8 h-8 text-green-400 flex-shrink-0" />
                ) : (
                    <PlayCircleIcon className={`w-8 h-8 ${isLocked ? 'text-slate-500' : 'text-cyan-400'} flex-shrink-0`} />
                )}
                <div className="ml-4 flex-grow">
                  <h3 className={`font-bold text-lg ${isLocked ? 'text-slate-500' : 'text-white'}`}>{week.title}</h3>
                  <p className={`text-sm ${isLocked ? 'text-slate-600' : 'text-slate-400'}`}>{week.description}</p>
                </div>
                {isLocked && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-500 flex-shrink-0 ml-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
