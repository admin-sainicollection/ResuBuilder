import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, Search, Briefcase, Mail, Phone, MapPin, X, Sparkles, 
  FileText, Check, ExternalLink, Calendar, GraduationCap, Code
} from 'lucide-react';
import { PORTFOLIO_USERS, PortfolioUser } from './LandingPage';

interface ViewAllCreatorsProps {
  initialSearch?: string;
  onBackToHome: () => void;
  onGetStarted: () => void;
  onViewPortfolio?: (user: PortfolioUser) => void;
}

export default function ViewAllCreators({ initialSearch = '', onBackToHome, onGetStarted, onViewPortfolio }: ViewAllCreatorsProps) {
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeUserResume, setActiveUserResume] = useState<PortfolioUser | null>(null);

  // Available quick filters / categories based on data
  const categories = useMemo(() => {
    const cats = new Set<string>();
    PORTFOLIO_USERS.forEach(user => {
      if (user.designation) {
        // Simple normalized categories
        const desc = user.designation.toLowerCase();
        if (desc.includes('software') || desc.includes('dev') || desc.includes('engineer')) {
          cats.add('Engineering');
        } else if (desc.includes('design') || desc.includes('ui') || desc.includes('ux')) {
          cats.add('Design');
        } else if (desc.includes('product') || desc.includes('project') || desc.includes('manager')) {
          cats.add('Management');
        } else {
          cats.add('Other');
        }
      }
    });
    return ['all', ...Array.from(cats)];
  }, []);

  // Filter users based on category and search query
  const filteredUsers = useMemo(() => {
    return PORTFOLIO_USERS.filter(user => {
      // 1. Category Filter
      if (selectedCategory !== 'all') {
        const desc = user.designation.toLowerCase();
        const matchesEng = selectedCategory === 'Engineering' && (desc.includes('software') || desc.includes('dev') || desc.includes('engineer'));
        const matchesDesign = selectedCategory === 'Design' && (desc.includes('design') || desc.includes('ui') || desc.includes('ux'));
        const matchesMgmt = selectedCategory === 'Management' && (desc.includes('product') || desc.includes('project') || desc.includes('manager'));
        const matchesOther = selectedCategory === 'Other' && !matchesEng && !matchesDesign && !matchesMgmt;
        
        if (!matchesEng && !matchesDesign && !matchesMgmt && !matchesOther) {
          return false;
        }
      }

      // 2. Search Query Filter
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        user.name.toLowerCase().includes(q) ||
        user.designation.toLowerCase().includes(q) ||
        user.location.toLowerCase().includes(q) ||
        user.username.toLowerCase().includes(q) ||
        user.resume.skills.some(skill => skill.toLowerCase().includes(q))
      );
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900 animate-fade-in">
      
      {/* 1. STICKY GLASSMORPHIC NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBackToHome}
            className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-1.5 font-semibold text-xs uppercase tracking-wider cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Home</span>
          </button>
          <div className="h-5 w-px bg-slate-200 hidden sm:block"></div>
          <div onClick={onBackToHome} className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-md shadow-blue-500/20">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <span className="font-extrabold text-sm tracking-tight text-slate-900 hidden xs:inline">
              Resu<span className="text-blue-600">Builder</span> Pro
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={onGetStarted}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg shadow-sm transition-all cursor-pointer"
          >
            Create Your CV
          </button>
        </div>
      </nav>

      {/* 2. DYNAMIC RICH HEADER BANNER (EDGE-TO-EDGE) */}
      <header className="relative bg-slate-950 text-white py-16 px-6 border-b border-slate-900 overflow-hidden">
        {/* Abstract shapes or clean backgrounds */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-[10px] font-extrabold text-blue-400 uppercase tracking-widest">
            <Sparkles size={11} className="text-blue-400" />
            <span>Community Talent Directory</span>
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Explore All Creators
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-medium">
            Discover resumes and professional portfolios crafted by our community. Search by roles, industries, specific skills, or countries to find your next great hire or design inspiration.
          </p>
        </div>
      </header>

      {/* 3. MAIN INTERACTIVE FILTERING & GRID VIEW */}
      <main className="grow max-w-7xl w-full mx-auto px-6 py-12 space-y-8">
        
        {/* Search bar and Filters control block */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Realtime Search Field */}
            <div className="relative grow">
              <Search className="absolute left-4 top-3.5 text-slate-400 w-5 h-5" />
              <input 
                type="text"
                placeholder="Search by name, skills, location, or designation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:bg-slate-50/50"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-3.5 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Categories pills desktop-inline */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2.5 text-xs font-bold rounded-xl border transition-all cursor-pointer capitalize ${
                    selectedCategory === cat
                      ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                  }`}
                >
                  {cat === 'all' ? 'All Roles' : cat}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-semibold text-slate-500">
            <p>Showing {filteredUsers.length} of {PORTFOLIO_USERS.length} professional profiles</p>
            {(searchQuery || selectedCategory !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="text-blue-600 hover:text-blue-700 transition-colors font-bold cursor-pointer"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Portfolios Grid Display */}
        {filteredUsers.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center max-w-md mx-auto space-y-4 shadow-sm animate-fade-in">
            <div className="w-14 h-14 bg-slate-50 border border-slate-200 rounded-full flex items-center justify-center text-slate-400 mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800">No creators match your criteria</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                We couldn't find any profiles matching your search or category filters. Try checking your spelling or trying a broader term.
              </p>
            </div>
            <button 
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-5 py-2.5 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition-all cursor-pointer shadow-sm"
            >
              Reset Search & Category
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredUsers.map((user) => (
              <div 
                key={user.username} 
                className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs hover:shadow-lg hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div className="space-y-5">
                  {/* Card Header */}
                  <div className="flex items-center gap-4">
                    {user.avatarUrl ? (
                      <img 
                        src={user.avatarUrl} 
                        alt={user.name} 
                        referrerPolicy="no-referrer"
                        className="w-14 h-14 rounded-full border border-slate-100 object-cover shadow-xs shrink-0" 
                      />
                    ) : (
                      <div className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg shadow-xs shrink-0 ${user.colorClass}`}>
                        {user.initials}
                      </div>
                    )}
                    <div className="min-w-0">
                      <h3 className="font-extrabold text-slate-900 text-sm truncate capitalize leading-tight">
                        {user.name}
                      </h3>
                      <div className="mt-1">
                        <span className="text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-full inline-block">
                          @{user.username.replace(/^@/, '')}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-1.5 font-semibold capitalize truncate">
                        <Briefcase className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{user.designation}</span>
                      </p>
                    </div>
                  </div>

                  <hr className="border-slate-100" />

                  {/* Card Contact details */}
                  <div className="space-y-2 text-slate-600 text-xs font-medium">
                    <p className="flex items-center gap-2.5">
                      <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{user.phone}</span>
                    </p>
                    <p className="flex items-center gap-2.5 truncate">
                      <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{user.email}</span>
                    </p>
                    <p className="flex items-center gap-2.5 truncate">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{user.location}</span>
                    </p>
                  </div>

                  {/* Skills tags summary */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {user.resume.skills.slice(0, 4).map((skill) => (
                      <span 
                        key={skill} 
                        className="px-2 py-0.5 bg-slate-100 border border-slate-200 rounded text-[9px] font-bold text-slate-600 tracking-wide uppercase"
                      >
                        {skill}
                      </span>
                    ))}
                    {user.resume.skills.length > 4 && (
                      <span className="px-2 py-0.5 bg-slate-50 border border-slate-100 rounded text-[9px] font-extrabold text-slate-400">
                        +{user.resume.skills.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Card CTA */}
                <button 
                  onClick={() => onViewPortfolio ? onViewPortfolio(user) : setActiveUserResume(user)}
                  className="w-full mt-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs hover:shadow transition-all cursor-pointer text-center"
                >
                  View Full CV Portfolio
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* 4. IMMERSIVE PORTFOLIO DIALOG MODAL */}
      {activeUserResume && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            
            {/* Modal Header */}
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between sticky top-0 z-20">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                  <FileText className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm capitalize">{activeUserResume.name}'s Verified CV</h3>
                  <p className="text-[10px] text-slate-400">Compiled via ResuBuilder Pro</p>
                </div>
              </div>
              <button 
                onClick={() => setActiveUserResume(null)}
                className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body / Resume Preview Sheets */}
            <div className="grow overflow-y-auto p-6 md:p-10 bg-slate-100 flex justify-center items-start">
              <div className="w-full max-w-2xl bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden p-8 space-y-8 text-left text-slate-800">
                
                {/* CV Header */}
                <div className="border-b-2 border-slate-900 pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                  <div className="space-y-2">
                    <h1 className="text-3xl font-black tracking-tight text-slate-900 uppercase">
                      {activeUserResume.resume.personalInfo.name}
                    </h1>
                    <p className="text-sm font-bold text-blue-600 uppercase tracking-widest">
                      {activeUserResume.resume.personalInfo.jobTitle}
                    </p>
                  </div>
                  <div className="text-xs text-slate-600 space-y-1 font-medium md:text-right">
                    <p>{activeUserResume.resume.personalInfo.phone}</p>
                    <p>{activeUserResume.resume.personalInfo.email}</p>
                    <p>{activeUserResume.resume.personalInfo.location}</p>
                    {activeUserResume.resume.personalInfo.website && (
                      <p className="text-blue-600">
                        <a href={activeUserResume.resume.personalInfo.website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-0.5">
                          <span>Portfolio Website</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </p>
                    )}
                  </div>
                </div>

                {/* Summary */}
                {activeUserResume.resume.personalInfo.summary && (
                  <div className="space-y-2">
                    <h2 className="text-xs font-black uppercase tracking-widest text-slate-900 flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                      <span>Professional Profile</span>
                    </h2>
                    <p className="text-xs leading-relaxed text-slate-600 font-medium">
                      {activeUserResume.resume.personalInfo.summary}
                    </p>
                  </div>
                )}

                {/* Professional Experience */}
                {activeUserResume.resume.experience && activeUserResume.resume.experience.length > 0 && (
                  <div className="space-y-4">
                    <h2 className="text-xs font-black uppercase tracking-widest text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                      <span>Employment History</span>
                    </h2>
                    <div className="space-y-5">
                      {activeUserResume.resume.experience.map((exp, i) => (
                        <div key={i} className="space-y-1">
                          <div className="flex justify-between items-start text-xs">
                            <div>
                              <h3 className="font-extrabold text-slate-900 text-sm capitalize">{exp.position}</h3>
                              <p className="font-semibold text-slate-500">{exp.company}</p>
                            </div>
                            <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md flex items-center gap-1 shrink-0">
                              <Calendar className="w-3 h-3" />
                              <span>{exp.startDate} – {exp.endDate}</span>
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed pt-1 whitespace-pre-line">{exp.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Core Skills */}
                {activeUserResume.resume.skills && activeUserResume.resume.skills.length > 0 && (
                  <div className="space-y-3">
                    <h2 className="text-xs font-black uppercase tracking-widest text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-1.5">
                      <Code className="w-3.5 h-3.5 text-blue-600" />
                      <span>Professional Skills</span>
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {activeUserResume.resume.skills.map((skill) => (
                        <span key={skill} className="px-3 py-1 bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold rounded-md flex items-center gap-1.5">
                          <Check className="w-3 h-3 text-blue-600" />
                          <span>{skill}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Education */}
                {activeUserResume.resume.education && activeUserResume.resume.education.length > 0 && (
                  <div className="space-y-4">
                    <h2 className="text-xs font-black uppercase tracking-widest text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-1.5">
                      <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
                      <span>Education & Credentials</span>
                    </h2>
                    <div className="space-y-4">
                      {activeUserResume.resume.education.map((edu, i) => (
                        <div key={i} className="space-y-1">
                          <div className="flex justify-between items-start text-xs">
                            <div>
                              <h3 className="font-extrabold text-slate-900 text-sm">{edu.degree}</h3>
                              <p className="font-semibold text-slate-500">{edu.institution}</p>
                            </div>
                            <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md flex items-center gap-1 shrink-0">
                              <Calendar className="w-3 h-3" />
                              <span>{edu.startDate} – {edu.endDate}</span>
                            </span>
                          </div>
                          {edu.description && (
                            <p className="text-xs text-slate-600 leading-relaxed pt-1">{edu.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Projects */}
                {activeUserResume.resume.projects && activeUserResume.resume.projects.length > 0 && (
                  <div className="space-y-4">
                    <h2 className="text-xs font-black uppercase tracking-widest text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-1.5">
                      <FileText className="w-3.5 h-3.5 text-blue-600" />
                      <span>Key Portfolios & Projects</span>
                    </h2>
                    <div className="space-y-4">
                      {activeUserResume.resume.projects.map((proj, i) => (
                        <div key={i} className="space-y-1">
                          <div className="flex justify-between items-start text-xs">
                            <div>
                              <h3 className="font-extrabold text-slate-900 text-sm">{proj.name}</h3>
                              <p className="font-semibold text-slate-500">{proj.role}</p>
                            </div>
                            {proj.link && (
                              <a href={proj.link} target="_blank" rel="noreferrer" className="text-blue-600 font-semibold text-xs flex items-center gap-1 hover:underline">
                                <span>Link</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed pt-1">{proj.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col xs:flex-row xs:items-center xs:justify-between gap-3 sticky bottom-0 z-20">
              <p className="text-xs text-slate-500 font-medium">Looking to build a resume with a similar ATS-optimized structure?</p>
              <button 
                onClick={() => {
                  setActiveUserResume(null);
                  onGetStarted();
                }}
                className="px-4.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all cursor-pointer whitespace-nowrap"
              >
                Create Your Own Free CV
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
