import React from 'react';
import { 
  FileText, LogOut, Plus, Edit3, Trash2, Eye, ShieldCheck, 
  Clock, Award, Star, ArrowRight, ExternalLink, Sparkles, ArrowLeft, Copy
} from 'lucide-react';
import { ResumeData } from '../types';

interface UserDashboardProps {
  userName: string;
  userEmail: string;
  resumes: ResumeData[];
  onEditResume: (resume: ResumeData) => void;
  onDuplicateResume?: (resume: ResumeData) => void;
  onDeleteResume: (id: string) => void;
  onCreateNewResume: () => void;
  onLoadSampleTemplate: () => void;
  onLogout: () => void;
  onGoToLanding: () => void;
}

export default function UserDashboard({
  userName,
  userEmail,
  resumes,
  onEditResume,
  onDuplicateResume,
  onDeleteResume,
  onCreateNewResume,
  onLoadSampleTemplate,
  onLogout,
  onGoToLanding
}: UserDashboardProps) {

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px]">
      
      {/* Decorative colored blur bubbles */}
      <div className="absolute top-10 right-10 w-[300px] h-[300px] bg-blue-100/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-indigo-100/20 rounded-full blur-3xl pointer-events-none -z-10"></div>

      {/* Dashboard Top Header Bar */}
      <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
        <button
          onClick={onGoToLanding}
          className="flex items-center gap-2.5 hover:opacity-85 transition-opacity text-left bg-transparent border-none p-0 cursor-pointer"
          title="Go to Homepage"
        >
          <div className="w-8.5 h-8.5 bg-blue-600 rounded-lg flex items-center justify-center shadow-md shadow-blue-500/20">
            <svg className="w-5.5 h-5.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
          <span className="font-extrabold text-md tracking-tight text-slate-900">
            Resu<span className="text-blue-600">Builder</span> Pro <span className="text-[10px] bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded ml-1 border border-blue-100/60">WORKSPACE</span>
          </span>
        </button>

        {/* User Info & Logout Button */}
        <div className="flex items-center gap-4">
          <button
            onClick={onGoToLanding}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 text-slate-600 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-3xs"
            title="Go back to Homepage"
          >
            <ArrowLeft size={13} />
            <span>Back</span>
          </button>
          
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-xs font-bold text-slate-900">{userName}</span>
            <span className="text-[10px] text-slate-400 font-medium">{userEmail}</span>
          </div>
          <div className="w-8.5 h-8.5 rounded-full bg-blue-50 text-blue-700 font-black text-xs flex items-center justify-center border border-blue-100 shadow-3xs">
            {userName.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
          </div>
          <div className="h-6 w-px bg-slate-200"></div>
          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 text-slate-600 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-3xs"
          >
            <LogOut size={13} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Content Workspace Container */}
      <main className="grow max-w-5xl w-full mx-auto p-6 md:p-8 space-y-8 relative z-10">
        
        {/* Welcome Dashboard Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-950 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden shadow-lg border border-indigo-950">
          <div className="absolute -right-8 -top-8 w-44 h-44 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -left-8 -bottom-8 w-44 h-44 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="max-w-2xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-500/20 rounded-md text-[10px] font-bold text-blue-300 uppercase tracking-wider border border-blue-400/20 animate-pulse">
              <Sparkles size={11} className="text-blue-400" />
              <span>ATS Dashboard Active</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
              Hello, {userName.split(' ')[0]}! Ready to compile your next CV?
            </h1>
            <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed max-w-xl font-normal">
              All documents created under your account are automatically pre-formatted for optimal performance with automated scanning filters. Use our interactive steps to configure sections, run instant grammar audits, and export.
            </p>
          </div>
        </div>

        {/* Dashboard Statistics / Core Actions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-3xs flex items-center gap-4 hover:border-slate-300 transition-all">
            <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shrink-0 border border-blue-100/50 shadow-3xs">
              <FileText size={18} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Resumes</p>
              <p className="text-xl font-black text-slate-900">{resumes.length}</p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-3xs flex items-center gap-4 hover:border-slate-300 transition-all">
            <div className="w-11 h-11 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 shrink-0 border border-emerald-100/50 shadow-3xs">
              <ShieldCheck size={18} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">ATS Standard Pass</p>
              <p className="text-xl font-black text-slate-900">Passed</p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-3xs flex items-center gap-4 hover:border-slate-300 transition-all">
            <div className="w-11 h-11 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 shrink-0 border border-purple-100/50 shadow-3xs">
              <Star size={18} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Premium Access</p>
              <p className="text-xl font-black text-slate-900">Full & Unlimited</p>
            </div>
          </div>
        </div>

        {/* Resume History List */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">Your Resume Drafts</h2>
              <p className="text-xs text-slate-400 font-medium">Manage, edit, and export your personal ATS documents</p>
            </div>
            
            <div className="flex gap-2.5">
              <button
                onClick={onLoadSampleTemplate}
                className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200/70 text-indigo-700 font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-3xs"
              >
                <Sparkles size={13} className="text-indigo-600" />
                <span>Load Sample CV</span>
              </button>
              <button
                onClick={onCreateNewResume}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-1.5 group"
              >
                <Plus size={14} className="group-hover:rotate-90 transition-transform" />
                <span>Create Fresh CV</span>
              </button>
            </div>
          </div>

          {resumes.length === 0 ? (
            /* Empty State Container */
            <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 p-12 text-center flex flex-col items-center justify-center max-w-xl mx-auto gap-4 mt-6 shadow-3xs">
              <div className="w-14 h-14 bg-slate-50 border border-slate-200 rounded-full flex items-center justify-center text-slate-400 shadow-3xs">
                <FileText size={24} />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-slate-900">No Resumes Found</h3>
                <p className="text-xs text-slate-400 max-w-xs leading-relaxed font-medium">
                  You haven't created any resumes yet. Start fresh or load our rich sample engineering profile to see how it works!
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
                <button
                  onClick={onLoadSampleTemplate}
                  className="px-4 py-2.5 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 font-bold text-xs rounded-lg transition-colors cursor-pointer"
                >
                  Load Pre-filled Tech CV
                </button>
                <button
                  onClick={onCreateNewResume}
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg shadow-sm transition-all cursor-pointer"
                >
                  Start Blank Resume
                </button>
              </div>
            </div>
          ) : (
            /* Resumes Cards Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resumes.map((resume, idx) => {
                const uniqueKey = resume.id ? `resume-${resume.id}-${idx}` : `resume-token-${resume.creatorToken || 'draft'}-${idx}`;
                return (
                  <div 
                    key={uniqueKey}
                    className="bg-white border border-slate-200 rounded-xl p-5 shadow-3xs flex flex-col justify-between gap-5 hover:border-blue-500 hover:shadow-md transition-all relative group overflow-hidden"
                  >
                    {/* Small left color strip indicating draft is ready */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-indigo-600"></div>

                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-slate-600 shadow-3xs">
                          <FileText size={18} />
                        </div>
                        <div className="space-y-1">
                          <h3 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                            {resume.title || 'Untitled CV Draft'}
                          </h3>
                          <p className="text-[10px] text-slate-400 font-semibold">
                            Role: {resume.personalInfo.jobTitle || 'Not specified'}
                          </p>
                          <div className="flex flex-wrap items-center gap-1.5 pt-1">
                            <span className="text-[8px] font-extrabold uppercase px-2 py-0.5 bg-slate-100 text-slate-500 rounded-md border border-slate-200/50">
                              Template: {resume.templateId}
                            </span>
                            <span className="text-[8px] font-extrabold uppercase px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-md border border-emerald-100">
                              ATS COMPLIANT
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Delete Button */}
                      <button
                        onClick={() => onDeleteResume(resume.id || resume.creatorToken)}
                        title="Delete CV Draft"
                        className="p-1.5 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-lg transition-colors cursor-pointer"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>

                    <div className="border-t border-slate-100/80 pt-4 flex items-center justify-between text-[11px]">
                      <div className="flex items-center gap-1.5 text-slate-400 font-medium">
                        <Clock size={12} className="text-slate-400" />
                        <span>Last updated recently</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {onDuplicateResume && (
                          <button
                            type="button"
                            onClick={() => onDuplicateResume(resume)}
                            title="Duplicate CV draft"
                            className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer border border-slate-200"
                          >
                            <Copy size={12} />
                            <span>Duplicate</span>
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => onEditResume(resume)}
                          className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-3xs group"
                        >
                          <span>Edit CV</span>
                          <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Informational Guidelines Section */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-3xs">
          <div className="flex items-center gap-2 text-xs font-extrabold text-blue-950 uppercase tracking-wider">
            <div className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
              <ShieldCheck size={14} />
            </div>
            <span>ResuBuilder Pro ATS Optimization Checklist</span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed font-medium">
            Our templates avoid complex graphics, column break points, and weird meters that confuse recruitment parser computers. Follow these simple expert guidelines for maximum interview match probability:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600 font-medium border-t border-slate-100 pt-4">
            <div className="flex items-start gap-2">
              <span className="text-blue-500 font-black shrink-0">•</span>
              <span><strong>Action Verbs First:</strong> Begin each job descriptor with dynamic verbs like <i>Architected</i>, <i>Engineered</i>, or <i>Optimized</i>.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-500 font-black shrink-0">•</span>
              <span><strong>Quantified Metrics:</strong> Add numeric achievements where possible (e.g., <i>"reduced response times by 32%"</i>).</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-500 font-black shrink-0">•</span>
              <span><strong>Standard Headings:</strong> Standard headings are recognized automatically by scanners without conversion.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-500 font-black shrink-0">•</span>
              <span><strong>Single Font Family:</strong> Avoid using more than two font styles in the same resume sheet.</span>
            </div>
          </div>
        </div>

      </main>

    </div>
  );
}
