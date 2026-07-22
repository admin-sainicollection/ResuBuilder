import React, { useState } from 'react';
import { 
  ArrowLeft, Printer, Sparkles, Check, Copy, Download, Share2, Eye, Loader2
} from 'lucide-react';
import { PortfolioUser } from './LandingPage';
import ResumePreview from './ResumePreview';
import { ResumeData } from '../types';
import { exportResumeToPDF } from '../utils/pdfExport';

interface CreatorPortfolioPageProps {
  user: PortfolioUser;
  onBack: () => void;
  onGetStarted: (template: 'modern' | 'executive' | 'tech' | 'classic') => void;
  isLoggedIn?: boolean;
}

export function portfolioUserToResumeData(user: PortfolioUser, activeTemplate: 'modern' | 'executive' | 'tech' | 'classic' = 'modern'): ResumeData {
  const p = user.resume.personalInfo;
  return {
    id: user.username,
    creatorToken: user.username,
    title: `${p.name}'s Verified CV`,
    templateId: activeTemplate,
    themeColor: '#2563eb',
    sectionOrder: ['summary', 'experiences', 'skills', 'projects', 'educations', 'certifications'],
    personalInfo: {
      name: p.name,
      email: p.email,
      phone: p.phone,
      website: p.website || '',
      github: p.website?.includes('github') ? p.website : '',
      linkedin: p.website?.includes('linkedin') ? p.website : '',
      location: p.location,
      jobTitle: p.jobTitle,
    },
    summary: p.summary,
    experiences: (user.resume.experience || []).map((exp, idx) => ({
      id: `exp-${idx}`,
      company: exp.company,
      position: exp.position,
      startDate: exp.startDate,
      endDate: exp.endDate,
      current: exp.endDate?.toLowerCase() === 'present',
      location: p.location,
      description: exp.description,
    })),
    educations: (user.resume.education || []).map((edu, idx) => ({
      id: `edu-${idx}`,
      school: edu.institution,
      degree: edu.degree,
      fieldOfStudy: edu.fieldOfStudy || '',
      startDate: edu.startDate,
      endDate: edu.endDate,
      current: edu.endDate?.toLowerCase() === 'present',
      grade: edu.grade || '',
      location: p.location,
      description: edu.description,
    })),
    skills: user.resume.skills && user.resume.skills.length > 0 ? [
      {
        id: 'skills-1',
        category: 'Technical & Professional Skills',
        list: user.resume.skills,
      }
    ] : [],
    projects: (user.resume.projects || []).map((proj, idx) => ({
      id: `proj-${idx}`,
      name: proj.name,
      role: proj.role || 'Contributor',
      startDate: '',
      endDate: '',
      url: proj.link || '',
      description: proj.description,
    })),
    certifications: (user.resume.certifications || []).map((cert, idx) => ({
      id: `cert-${idx}`,
      name: cert.name,
      issuer: cert.issuer,
      date: cert.date,
      url: cert.url || '',
    })),
  };
}

export default function CreatorPortfolioPage({ user, onBack, onGetStarted, isLoggedIn = false }: CreatorPortfolioPageProps) {
  const [copied, setCopied] = useState(false);
  const [isExportingPDF, setIsExportingPDF] = useState(false);
  const [activeTemplate, setActiveTemplate] = useState<'modern' | 'executive' | 'tech' | 'classic'>('modern');

  const resumeData = portfolioUserToResumeData(user, activeTemplate);

  const handleCopyLink = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleDownloadPDF = async () => {
    setIsExportingPDF(true);
    try {
      await exportResumeToPDF('printable-resume-pdf', user.name || 'cv');
    } finally {
      setIsExportingPDF(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans print:bg-white print:p-0">
      
      {/* PDF Generation Buffering Overlay */}
      {isExportingPDF && (
        <div className="fixed inset-0 bg-slate-950/65 backdrop-blur-xs z-[9999] flex flex-col items-center justify-center p-6 text-center animate-fade-in print:hidden">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full flex flex-col items-center border border-slate-100">
            <div className="w-14 h-14 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center mb-4 text-blue-600 shadow-sm">
              <Loader2 className="w-7 h-7 animate-spin text-blue-600" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-lg">Generating PDF Document</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed mb-4">
              Rendering high-resolution A4 pages and compiling vector fonts. Your CV file download will start automatically...
            </p>
            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div className="bg-blue-600 h-full rounded-full w-full animate-pulse"></div>
            </div>
          </div>
        </div>
      )}

      {/* 1. TOP NAVBAR (Hidden on Print) */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 py-3 flex items-center justify-between shadow-xs print:hidden">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-2 font-bold text-xs uppercase tracking-wider cursor-pointer"
            title="Go Back"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </button>
          
          <div className="h-5 w-px bg-slate-200 hidden sm:block"></div>
          
          <div className="flex items-center gap-2.5">
            {user.avatarUrl ? (
              <img 
                src={user.avatarUrl} 
                alt={user.name} 
                referrerPolicy="no-referrer"
                className="w-8 h-8 rounded-full border border-blue-200 object-cover shrink-0" 
              />
            ) : (
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs text-white shrink-0 ${user.colorClass}`}>
                {user.initials}
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm text-slate-900 capitalize truncate max-w-[140px] sm:max-w-xs">
                  {user.name}
                </span>
                <span className="hidden lg:inline-block px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-100 text-[10px] font-bold rounded-full">
                  @{user.username.replace(/^@/, '')}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                {user.designation}
              </p>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={handleCopyLink}
            className="px-3 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
            title="Copy URL to Share"
          >
            {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
            <span className="hidden md:inline">{copied ? 'Link Copied!' : 'Share URL'}</span>
          </button>

          <button
            onClick={handleDownloadPDF}
            disabled={isExportingPDF}
            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-600 text-white text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            title="Download PDF"
          >
            {isExportingPDF ? (
              <>
                <Loader2 size={14} className="animate-spin text-blue-400" />
                <span>Generating PDF...</span>
              </>
            ) : (
              <>
                <Download size={14} />
                <span>Download PDF</span>
              </>
            )}
          </button>

          <button 
            onClick={() => onGetStarted(activeTemplate)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold rounded-lg shadow-sm hover:shadow transition-all cursor-pointer flex items-center gap-1.5"
            title={isLoggedIn ? "Customize this template in CV Builder" : "Create your CV"}
          >
            <Sparkles size={13} />
            <span>{isLoggedIn ? 'Use this Template' : 'Create Your CV'}</span>
          </button>
        </div>
      </nav>

      {/* 2. TEMPLATE SELECTOR TOOLBAR (Light Minimalist Toolbar) */}
      <div className="bg-white border-b border-slate-200 py-2.5 px-4 sm:px-8 print:hidden">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
            <Eye size={15} className="text-blue-600" />
            <span>Layout Style:</span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {(['modern', 'executive', 'tech', 'classic'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setActiveTemplate(t)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer capitalize text-center ${
                  activeTemplate === t 
                    ? 'bg-blue-600 border-blue-600 text-white shadow-2xs' 
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {t} Layout
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. MAIN STANDALONE CV DISPLAY AREA */}
      <main className="grow py-8 px-4 sm:px-6 flex justify-center items-start print:p-0 print:m-0">
        <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl border border-slate-200 overflow-hidden print:shadow-none print:border-none print:rounded-none">
          <div id="printable-resume-pdf" className="p-4 sm:p-8 md:p-12 print:p-0">
            <ResumePreview data={resumeData} />
          </div>
        </div>
      </main>

    </div>
  );
}
