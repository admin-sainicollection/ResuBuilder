import { ResumeData, PersonalInfo, Experience, Education, SkillGroup, Project, Certification, CustomSection } from '../types';
import { initialResumeData } from '../initialData';
import { 
  User, Briefcase, GraduationCap, Code, FolderGit2, Award, 
  Plus, Trash2, ArrowUp, ArrowDown, Sparkles, AlertCircle, ChevronDown, ChevronUp,
  CheckCircle2, Download, Upload, RotateCcw, Palette, ShieldCheck, FileJson,
  Target, Type, Sliders, Layers, Zap
} from 'lucide-react';
import React, { useState, useRef, ChangeEvent } from 'react';

interface ResumeFormProps {
  data: ResumeData;
  onChange: (newData: ResumeData) => void;
}

export default function ResumeForm({ data, onChange }: ResumeFormProps) {
  const [activeSection, setActiveSection] = useState<string>('personal');
  const [showATSDetails, setShowATSDetails] = useState<boolean>(false);
  const [newCustomTitle, setNewCustomTitle] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Helper updates
  const updatePersonalInfo = (field: keyof PersonalInfo, value: string) => {
    const updated = { ...data.personalInfo, [field]: value };
    onChange({ ...data, personalInfo: updated });
  };

  const updateSummary = (value: string) => {
    onChange({ ...data, summary: value });
  };

  const handleSectionToggle = (section: string) => {
    setActiveSection(activeSection === section ? '' : section);
  };

  // JSON Import & Export
  const handleExportJSON = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(data, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute(
      'download',
      `resume-${(data.personalInfo.name || 'export').toLowerCase().replace(/\s+/g, '-')}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        try {
          if (event.target?.result) {
            const parsed = JSON.parse(event.target.result as string);
            if (parsed && typeof parsed === 'object' && parsed.personalInfo) {
              onChange(parsed);
              alert('Resume JSON backup loaded successfully!');
            } else {
              alert('Invalid resume JSON format.');
            }
          }
        } catch (err) {
          alert('Could not parse JSON file. Please check file formatting.');
        }
      };
    }
  };

  // Custom Sections Handlers
  const addCustomSection = (titleName: string) => {
    if (!titleName.trim()) return;
    const newSection: CustomSection = {
      id: Math.random().toString(36).substring(2, 9),
      title: titleName.trim(),
      items: [
        {
          id: Math.random().toString(36).substring(2, 9),
          title: 'Section Item Title',
          subtitle: 'Organization or Credential',
          date: '2023 - Present',
          description: 'Key accomplishments or details.'
        }
      ]
    };
    const current = data.customSections || [];
    onChange({ ...data, customSections: [...current, newSection] });
    setNewCustomTitle('');
  };

  const addCustomSectionItem = (sectionId: string) => {
    const updated = (data.customSections || []).map(sec => {
      if (sec.id === sectionId) {
        return {
          ...sec,
          items: [
            ...sec.items,
            {
              id: Math.random().toString(36).substring(2, 9),
              title: '',
              subtitle: '',
              date: '',
              description: ''
            }
          ]
        };
      }
      return sec;
    });
    onChange({ ...data, customSections: updated });
  };

  const updateCustomSectionItem = (sectionId: string, itemId: string, field: string, value: string) => {
    const updated = (data.customSections || []).map(sec => {
      if (sec.id === sectionId) {
        return {
          ...sec,
          items: sec.items.map(item => item.id === itemId ? { ...item, [field]: value } : item)
        };
      }
      return sec;
    });
    onChange({ ...data, customSections: updated });
  };

  const deleteCustomSection = (sectionId: string) => {
    const updated = (data.customSections || []).filter(sec => sec.id !== sectionId);
    onChange({ ...data, customSections: updated });
  };

  const deleteCustomSectionItem = (sectionId: string, itemId: string) => {
    const updated = (data.customSections || []).map(sec => {
      if (sec.id === sectionId) {
        return {
          ...sec,
          items: sec.items.filter(item => item.id !== itemId)
        };
      }
      return sec;
    });
    onChange({ ...data, customSections: updated });
  };

  // Job Description Keyword Extraction and Matching Engine
  const getJobKeywordsAnalysis = () => {
    const jdText = data.targetJobDescription || '';
    if (!jdText.trim()) return { found: [], missing: [], matchScore: 0, total: 0 };

    const predefinedTerms = [
      'React', 'TypeScript', 'JavaScript', 'Node.js', 'Python', 'Java', 'C++', 'SQL', 'PostgreSQL',
      'MongoDB', 'AWS', 'Docker', 'Kubernetes', 'GraphQL', 'REST API', 'CI/CD', 'Git', 'Agile',
      'Scrum', 'Leadership', 'Management', 'Architecture', 'System Design', 'P&L', 'Budget',
      'Data Analysis', 'Product Strategy', 'UI/UX', 'A/B Testing', 'Customer Engagement',
      'Machine Learning', 'AI', 'Security', 'Compliance', 'Microservices', 'Redux', 'Tailwind'
    ];

    const jdLower = jdText.toLowerCase();

    const relevantTerms = predefinedTerms.filter(term => jdLower.includes(term.toLowerCase()));

    if (relevantTerms.length < 4) {
      const words = jdLower.match(/\b[a-z0-9+#.-]{4,}\b/g) || [];
      const stopWords = new Set(['the', 'and', 'for', 'with', 'that', 'this', 'from', 'have', 'will', 'your', 'about', 'team', 'work', 'ability', 'experience', 'years', 'role', 'required', 'responsibilities', 'must', 'candidate']);
      const freq: Record<string, number> = {};
      words.forEach(w => {
        if (!stopWords.has(w)) freq[w] = (freq[w] || 0) + 1;
      });
      const topWords = Object.keys(freq).sort((a,b) => freq[b] - freq[a]).slice(0, 8);
      topWords.forEach(w => {
        const capitalized = w.charAt(0).toUpperCase() + w.slice(1);
        if (!relevantTerms.includes(capitalized)) relevantTerms.push(capitalized);
      });
    }

    const fullResumeText = [
      data.personalInfo.jobTitle,
      data.summary,
      ...data.experiences.map(e => `${e.position} ${e.company} ${e.description}`),
      ...data.projects.map(p => `${p.name} ${p.role} ${p.description}`),
      ...data.skills.flatMap(s => `${s.category} ${s.list.join(' ')}`),
      ...data.educations.map(e => `${e.degree} ${e.fieldOfStudy}`),
      ...(data.customSections || []).flatMap(c => c.items.map(i => `${i.title} ${i.description}`))
    ].join(' ').toLowerCase();

    const found: string[] = [];
    const missing: string[] = [];

    relevantTerms.forEach(term => {
      if (fullResumeText.includes(term.toLowerCase())) {
        found.push(term);
      } else {
        missing.push(term);
      }
    });

    const matchScore = relevantTerms.length > 0 ? Math.round((found.length / relevantTerms.length) * 100) : 100;

    return { found, missing, matchScore, total: relevantTerms.length };
  };

  const addMissingKeywordToSkills = (keyword: string) => {
    if (!data.skills || data.skills.length === 0) {
      const newSkill: SkillGroup = {
        id: Math.random().toString(36).substring(2, 9),
        category: 'Core Competencies',
        list: [keyword]
      };
      onChange({ ...data, skills: [newSkill] });
    } else {
      const updated = data.skills.map((s, idx) => {
        if (idx === 0) {
          return { ...s, list: Array.from(new Set([...s.list, keyword])) };
        }
        return s;
      });
      onChange({ ...data, skills: updated });
    }
  };

  // Live ATS Compliance Calculation
  const getATSAnalysis = () => {
    const checks = [
      {
        id: 'name',
        label: 'Full Name Provided',
        pass: !!data.personalInfo.name.trim(),
        weight: 15,
        tip: 'Add your full name at the top of your resume.'
      },
      {
        id: 'contact',
        label: 'Email & Phone Number',
        pass: !!(data.personalInfo.email.trim() && data.personalInfo.phone.trim()),
        weight: 15,
        tip: 'Include both an active email and phone number for recruiter outreach.'
      },
      {
        id: 'summary',
        label: 'Professional Summary (10+ words)',
        pass: data.summary.trim().split(/\s+/).length >= 10,
        weight: 15,
        tip: 'Write a 2-3 sentence overview highlighting core expertise and impact.'
      },
      {
        id: 'experience',
        label: 'Work Experience Listed',
        pass: data.experiences.length > 0 && !!data.experiences[0]?.position,
        weight: 20,
        tip: 'Add at least one relevant work history item with key achievements.'
      },
      {
        id: 'metrics',
        label: 'Quantifiable Metrics (% / $ / Numbers)',
        pass: data.experiences.some(exp => /\d+|%|\$/.test(exp.description)),
        weight: 15,
        tip: 'Include numbers (e.g. "Increased revenue by 35%") to prove business impact.'
      },
      {
        id: 'education',
        label: 'Education Section',
        pass: data.educations.length > 0 && !!data.educations[0]?.school,
        weight: 10,
        tip: 'List your degree or highest education credential.'
      },
      {
        id: 'skills',
        label: 'Skills & Keywords Listed',
        pass: data.skills.length > 0 && data.skills.some(s => s.list.length > 0),
        weight: 10,
        tip: 'Group key industry skills (e.g., React, SQL, Project Management).'
      }
    ];

    const passedScore = checks.reduce((sum, item) => item.pass ? sum + item.weight : sum, 0);
    // If template is classic harvard, add boost for single-column Georgia layout ATS readability
    const isClassic = data.templateId === 'classic';
    const finalScore = isClassic ? Math.min(100, Math.max(90, passedScore)) : passedScore;

    return { score: finalScore, checks, isClassic };
  };

  const atsAnalysis = getATSAnalysis();

  // Experiences Handlers
  const addExperience = () => {
    const newExp: Experience = {
      id: Math.random().toString(36).substring(2, 9),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      location: '',
      description: ''
    };
    onChange({ ...data, experiences: [...data.experiences, newExp] });
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    const updated = data.experiences.map(exp => {
      if (exp.id === id) {
        return { ...exp, [field]: value };
      }
      return exp;
    });
    onChange({ ...data, experiences: updated });
  };

  const deleteExperience = (id: string) => {
    onChange({ ...data, experiences: data.experiences.filter(exp => exp.id !== id) });
  };

  const moveExperience = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= data.experiences.length) return;
    const items = [...data.experiences];
    const temp = items[index];
    items[index] = items[targetIndex];
    items[targetIndex] = temp;
    onChange({ ...data, experiences: items });
  };

  // Education Handlers
  const addEducation = () => {
    const newEdu: Education = {
      id: Math.random().toString(36).substring(2, 9),
      school: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      current: false,
      grade: '',
      location: '',
      description: ''
    };
    onChange({ ...data, educations: [...data.educations, newEdu] });
  };

  const updateEducation = (id: string, field: keyof Education, value: any) => {
    const updated = data.educations.map(edu => {
      if (edu.id === id) {
        return { ...edu, [field]: value };
      }
      return edu;
    });
    onChange({ ...data, educations: updated });
  };

  const deleteEducation = (id: string) => {
    onChange({ ...data, educations: data.educations.filter(edu => edu.id !== id) });
  };

  const moveEducation = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= data.educations.length) return;
    const items = [...data.educations];
    const temp = items[index];
    items[index] = items[targetIndex];
    items[targetIndex] = temp;
    onChange({ ...data, educations: items });
  };

  // Projects Handlers
  const addProject = () => {
    const newProj: Project = {
      id: Math.random().toString(36).substring(2, 9),
      name: '',
      role: '',
      startDate: '',
      endDate: '',
      url: '',
      description: ''
    };
    onChange({ ...data, projects: [...data.projects, newProj] });
  };

  const updateProject = (id: string, field: keyof Project, value: any) => {
    const updated = data.projects.map(proj => {
      if (proj.id === id) {
        return { ...proj, [field]: value };
      }
      return proj;
    });
    onChange({ ...data, projects: updated });
  };

  const deleteProject = (id: string) => {
    onChange({ ...data, projects: data.projects.filter(proj => proj.id !== id) });
  };

  const moveProject = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= data.projects.length) return;
    const items = [...data.projects];
    const temp = items[index];
    items[index] = items[targetIndex];
    items[targetIndex] = temp;
    onChange({ ...data, projects: items });
  };

  // Skills Handlers
  const addSkillGroup = () => {
    const newSkill: SkillGroup = {
      id: Math.random().toString(36).substring(2, 9),
      category: '',
      list: []
    };
    onChange({ ...data, skills: [...data.skills, newSkill] });
  };

  const updateSkillGroup = (id: string, field: keyof SkillGroup, value: any) => {
    const updated = data.skills.map(skill => {
      if (skill.id === id) {
        if (field === 'list') {
          const listArr = typeof value === 'string' ? value.split(',').map(s => s.trim()).filter(Boolean) : value;
          return { ...skill, list: listArr };
        }
        return { ...skill, [field]: value };
      }
      return skill;
    });
    onChange({ ...data, skills: updated });
  };

  const deleteSkillGroup = (id: string) => {
    onChange({ ...data, skills: data.skills.filter(skill => skill.id !== id) });
  };

  // Certifications Handlers
  const addCertification = () => {
    const newCert: Certification = {
      id: Math.random().toString(36).substring(2, 9),
      name: '',
      issuer: '',
      date: '',
      url: ''
    };
    onChange({ ...data, certifications: [...data.certifications, newCert] });
  };

  const updateCertification = (id: string, field: keyof Certification, value: any) => {
    const updated = data.certifications.map(cert => {
      if (cert.id === id) {
        return { ...cert, [field]: value };
      }
      return cert;
    });
    onChange({ ...data, certifications: updated });
  };

  const deleteCertification = (id: string) => {
    onChange({ ...data, certifications: data.certifications.filter(cert => cert.id !== id) });
  };

  // Section Order Handlers
  const moveSection = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= data.sectionOrder.length) return;
    const sections = [...data.sectionOrder];
    const temp = sections[index];
    sections[index] = sections[targetIndex];
    sections[targetIndex] = temp;
    onChange({ ...data, sectionOrder: sections });
  };



  return (
    <div className="space-y-4 max-h-[82vh] overflow-y-auto pr-1">
      
      {/* 0A. REAL-TIME ATS SCORE & COMPLIANCE WIDGET */}
      <div className="bg-slate-900 text-white rounded-2xl p-4 shadow-md border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-extrabold text-xs shrink-0">
              <ShieldCheck size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-xs font-extrabold text-white">Live ATS Compliance Score</h4>
                {atsAnalysis.isClassic && (
                  <span className="text-[9px] font-black bg-amber-400/20 text-amber-300 border border-amber-400/30 px-1.5 py-0.2 rounded">HARVARD ATS CERTIFIED</span>
                )}
              </div>
              <p className="text-[10px] text-slate-400">Recruiter parser & keyword optimization engine</p>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-xl font-black ${atsAnalysis.score >= 80 ? 'text-emerald-400' : atsAnalysis.score >= 60 ? 'text-amber-400' : 'text-rose-400'}`}>
              {atsAnalysis.score}%
            </div>
            <button
              onClick={() => setShowATSDetails(!showATSDetails)}
              className="text-[10px] text-blue-400 hover:underline font-semibold flex items-center gap-0.5 justify-end mt-0.5 cursor-pointer"
            >
              <span>{showATSDetails ? 'Hide Analysis' : 'Check Criteria'}</span>
              {showATSDetails ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
            </button>
          </div>
        </div>

        {/* ATS Progress Bar */}
        <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden p-0.5 border border-slate-700/60">
          <div 
            className={`h-full rounded-full transition-all duration-500 ${
              atsAnalysis.score >= 80 ? 'bg-gradient-to-r from-emerald-500 to-teal-400' :
              atsAnalysis.score >= 60 ? 'bg-gradient-to-r from-amber-500 to-yellow-400' : 'bg-gradient-to-r from-rose-500 to-orange-400'
            }`}
            style={{ width: `${atsAnalysis.score}%` }}
          />
        </div>

        {/* Expandable Criteria Checklist */}
        {showATSDetails && (
          <div className="pt-2 border-t border-slate-800 space-y-2 text-xs animate-fade-in">
            {atsAnalysis.checks.map(check => (
              <div key={check.id} className="flex items-start justify-between gap-2 text-[11px] bg-slate-800/60 p-2 rounded-lg border border-slate-700/50">
                <div className="flex items-start gap-2">
                  {check.pass ? (
                    <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle size={14} className="text-amber-400 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <div className={check.pass ? 'text-slate-200 font-semibold' : 'text-amber-200 font-semibold'}>
                      {check.label}
                    </div>
                    {!check.pass && <p className="text-[10px] text-slate-400 mt-0.5">{check.tip}</p>}
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${check.pass ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}`}>
                  +{check.weight}%
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 0B. BACKUP / RESTORE JSON & QUICK CONTROLS TOOLBAR */}
      <div className="bg-white rounded-xl border border-slate-200 p-3 shadow-xs flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-xs text-slate-700 font-bold">
          <FileJson size={15} className="text-blue-600" />
          <span>Resume Backup & Data Tools</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Export JSON */}
          <button
            type="button"
            onClick={handleExportJSON}
            title="Download full resume data as JSON backup"
            className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer border border-slate-200"
          >
            <Download size={13} />
            <span>Export JSON</span>
          </button>

          {/* Import JSON */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImportJSON}
            accept=".json"
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            title="Import an existing resume JSON backup file"
            className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer border border-slate-200"
          >
            <Upload size={13} />
            <span>Import JSON</span>
          </button>

          {/* Reset Form */}
          <button
            type="button"
            onClick={() => {
              if (window.confirm("Are you sure you want to reset all resume fields to a blank form?")) {
                onChange({
                  ...initialResumeData,
                  title: 'New Resume Draft',
                  personalInfo: { name: '', email: '', phone: '', website: '', github: '', linkedin: '', location: '', jobTitle: '' },
                  summary: '',
                  experiences: [],
                  educations: [],
                  skills: [],
                  projects: [],
                  certifications: []
                });
              }
            }}
            title="Clear form to start blank"
            className="px-2 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 text-[11px] font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer border border-rose-200"
          >
            <RotateCcw size={12} />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* 0C. TYPOGRAPHY, FONT SIZE & SPACING DENSITY */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <button 
          onClick={() => handleSectionToggle('typography')}
          className="w-full flex justify-between items-center px-5 py-3.5 bg-slate-50 hover:bg-slate-100/80 transition-colors text-left"
        >
          <div className="flex items-center gap-2.5 font-semibold text-slate-800 text-xs">
            <Type size={16} className="text-blue-600" />
            <span>Page Fit & Typography Density (8pt – 12pt)</span>
          </div>
          {activeSection === 'typography' ? <ChevronUp size={16} className="text-slate-500" /> : <ChevronDown size={16} className="text-slate-500" />}
        </button>

        {activeSection === 'typography' && (
          <div className="p-4 space-y-4 animate-fade-in text-xs border-t border-slate-100">
            {/* Font Family Selector */}
            <div>
              <label className="block font-bold text-slate-700 mb-1.5">Font Style</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { id: 'georgia', label: 'Harvard Georgia', sub: 'Classic Serif' },
                  { id: 'inter', label: 'Inter Modern', sub: 'Clean Sans' },
                  { id: 'merriweather', label: 'Merriweather', sub: 'Editorial Serif' },
                  { id: 'garamond', label: 'Garamond', sub: 'Traditional Serif' },
                  { id: 'jetbrains', label: 'JetBrains Mono', sub: 'Tech Mono' },
                ].map(font => (
                  <button
                    key={font.id}
                    type="button"
                    onClick={() => onChange({ ...data, fontFamily: font.id as any })}
                    className={`p-2 rounded-lg border text-left transition-all cursor-pointer ${
                      (data.fontFamily || 'georgia') === font.id
                        ? 'border-blue-600 bg-blue-50/60 text-blue-900 font-bold shadow-2xs'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="text-xs font-semibold">{font.label}</div>
                    <div className="text-[10px] text-slate-400">{font.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Font Size & Spacing Density */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Font Size Scale</label>
                <div className="flex gap-1.5 bg-slate-100 p-1 rounded-lg">
                  {[
                    { id: 'xs', label: 'Compact (9pt)' },
                    { id: 'sm', label: 'Normal (10pt)' },
                    { id: 'lg', label: 'Large (11.5pt)' },
                  ].map(s => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => onChange({ ...data, fontSize: s.id as any })}
                      className={`flex-1 py-1.5 text-[11px] font-bold rounded-md transition-all cursor-pointer ${
                        (data.fontSize || 'sm') === s.id
                          ? 'bg-white text-blue-700 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Padding Density</label>
                <div className="flex gap-1.5 bg-slate-100 p-1 rounded-lg">
                  {[
                    { id: 'compact', label: 'Tight (1-Page)' },
                    { id: 'comfortable', label: 'Balanced' },
                    { id: 'spacious', label: 'Spacious' },
                  ].map(d => (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => onChange({ ...data, spacingDensity: d.id as any })}
                      className={`flex-1 py-1.5 text-[11px] font-bold rounded-md transition-all cursor-pointer ${
                        (data.spacingDensity || 'comfortable') === d.id
                          ? 'bg-white text-blue-700 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 0D. JOB DESCRIPTION KEYWORD MATCHER */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <button 
          onClick={() => handleSectionToggle('jd-matcher')}
          className="w-full flex justify-between items-center px-5 py-3.5 bg-slate-50 hover:bg-slate-100/80 transition-colors text-left"
        >
          <div className="flex items-center gap-2.5 font-semibold text-slate-800 text-xs">
            <Target size={16} className="text-blue-600" />
            <span>Job Description Keyword Matcher</span>
            {data.targetJobDescription && (
              <span className="text-[10px] font-extrabold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full ml-2">
                Match: {getJobKeywordsAnalysis().matchScore}%
              </span>
            )}
          </div>
          {activeSection === 'jd-matcher' ? <ChevronUp size={16} className="text-slate-500" /> : <ChevronDown size={16} className="text-slate-500" />}
        </button>

        {activeSection === 'jd-matcher' && (
          <div className="p-4 space-y-3 animate-fade-in border-t border-slate-100">
            <p className="text-xs text-slate-500">
              Paste the Job Description (JD) you are applying for. ResuBuilder Pro extracts key hard skills & tech terms to highlight missing keywords.
            </p>

            <textarea
              rows={4}
              value={data.targetJobDescription || ''}
              onChange={(e) => onChange({ ...data, targetJobDescription: e.target.value })}
              placeholder="Paste job posting text or key requirement bullet points here..."
              className="w-full p-3 border border-slate-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />

            {data.targetJobDescription && data.targetJobDescription.trim().length > 0 && (() => {
              const analysis = getJobKeywordsAnalysis();
              return (
                <div className="space-y-3 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700">Keyword Match Rate:</span>
                    <span className={`font-black text-sm ${analysis.matchScore >= 75 ? 'text-emerald-600' : 'text-amber-600'}`}>
                      {analysis.matchScore}% ({analysis.found.length} / {analysis.total} Found)
                    </span>
                  </div>

                  {/* Found Keywords */}
                  {analysis.found.length > 0 && (
                    <div>
                      <div className="text-[11px] font-bold text-emerald-700 mb-1 flex items-center gap-1">
                        <CheckCircle2 size={12} />
                        <span>Matched Keywords in Resume:</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {analysis.found.map(kw => (
                          <span key={kw} className="text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-md">
                            ✓ {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Missing Keywords */}
                  {analysis.missing.length > 0 && (
                    <div>
                      <div className="text-[11px] font-bold text-amber-700 mb-1 flex items-center gap-1">
                        <AlertCircle size={12} />
                        <span>Missing Keywords in Resume (Click to add to Skills):</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {analysis.missing.map(kw => (
                          <button
                            key={kw}
                            type="button"
                            onClick={() => addMissingKeywordToSkills(kw)}
                            title={`Click to add '${kw}' to your Skills section`}
                            className="text-[10px] font-bold bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 px-2 py-0.5 rounded-md transition-all flex items-center gap-1 cursor-pointer"
                          >
                            <Plus size={10} />
                            <span>{kw}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        )}
      </div>

      {/* QUICK LOAD RICH SAMPLE DATA BOX */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200/50 p-4 shadow-3xs flex flex-col gap-3">
        <div className="flex items-start gap-2.5">
          <Sparkles className="text-blue-600 shrink-0 mt-0.5 animate-pulse" size={16} />
          <div>
            <h4 className="text-xs font-bold text-blue-900">Want to test a multi-page CV?</h4>
            <p className="text-[11px] text-blue-700/85 leading-relaxed mt-0.5">
              Instantly fill your form with high-fidelity, detailed industry-level work history, major engineering projects, skill classifications, and certifications. Perfect for evaluating page-breaking behavior.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            if (window.confirm("Are you sure you want to load the rich sample data? This will overwrite your current form draft.")) {
              const token = Math.random().toString(36).substring(2, 15);
              onChange({ ...initialResumeData, creatorToken: token });
            }
          }}
          className="w-full py-2 px-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg shadow-sm hover:shadow-md transition-all text-center cursor-pointer flex items-center justify-center gap-1.5"
        >
          <Sparkles size={13} />
          <span>Load Rich Multi-Page Sample</span>
        </button>
      </div>

      {/* 1. PERSONAL INFO SECTION */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <button 
          onClick={() => handleSectionToggle('personal')}
          className="w-full flex justify-between items-center px-5 py-4 bg-slate-50 hover:bg-slate-100/80 transition-colors text-left"
        >
          <div className="flex items-center gap-2.5 font-semibold text-slate-800">
            <User size={18} className="text-blue-600" />
            <span>Personal Details</span>
          </div>
          {activeSection === 'personal' ? <ChevronUp size={18} className="text-slate-500" /> : <ChevronDown size={18} className="text-slate-500" />}
        </button>

        {activeSection === 'personal' && (
          <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
              <input 
                type="text" 
                value={data.personalInfo.name}
                onChange={(e) => updatePersonalInfo('name', e.target.value)}
                placeholder="John Doe"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Job Title / Target Position</label>
              <input 
                type="text" 
                value={data.personalInfo.jobTitle}
                onChange={(e) => updatePersonalInfo('jobTitle', e.target.value)}
                placeholder="Senior Frontend Engineer"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
              <input 
                type="email" 
                value={data.personalInfo.email}
                onChange={(e) => updatePersonalInfo('email', e.target.value)}
                placeholder="johndoe@example.com"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
              <input 
                type="text" 
                value={data.personalInfo.phone}
                onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                placeholder="+1 (555) 019-2834"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Location</label>
              <input 
                type="text" 
                value={data.personalInfo.location}
                onChange={(e) => updatePersonalInfo('location', e.target.value)}
                placeholder="San Francisco, CA"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Personal Website / Portfolio</label>
              <input 
                type="text" 
                value={data.personalInfo.website}
                onChange={(e) => updatePersonalInfo('website', e.target.value)}
                placeholder="portfolio.com"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">LinkedIn URL</label>
              <input 
                type="text" 
                value={data.personalInfo.linkedin}
                onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                placeholder="linkedin.com/in/johndoe"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">GitHub URL</label>
              <input 
                type="text" 
                value={data.personalInfo.github}
                onChange={(e) => updatePersonalInfo('github', e.target.value)}
                placeholder="github.com/johndoe"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
              />
            </div>
          </div>
        )}
      </div>

      {/* 2. SUMMARY SECTION */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <button 
          onClick={() => handleSectionToggle('summary')}
          className="w-full flex justify-between items-center px-5 py-4 bg-slate-50 hover:bg-slate-100/80 transition-colors text-left"
        >
          <div className="flex items-center gap-2.5 font-semibold text-slate-800">
            <Sparkles size={18} className="text-blue-600" />
            <span>Professional Summary</span>
          </div>
          {activeSection === 'summary' ? <ChevronUp size={18} className="text-slate-500" /> : <ChevronDown size={18} className="text-slate-500" />}
        </button>

        {activeSection === 'summary' && (
          <div className="p-5 space-y-3 animate-fade-in">
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-500">Briefly highlight your career achievements, core strengths, and qualifications.</span>
            </div>
            <textarea 
              value={data.summary}
              onChange={(e) => updateSummary(e.target.value)}
              rows={4}
              placeholder="Driven and results-oriented Software Engineer with 5+ years of experience specializing in full-stack JavaScript architectures. Proven track record of architecting performant, highly accessible web applications and optimizing database query loads by up to 40%..."
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-y"
            />
            <div className="flex items-start gap-1.5 p-2 bg-slate-50 rounded-lg text-[11px] text-slate-600 border border-slate-100">
              <AlertCircle size={13} className="text-amber-500 shrink-0 mt-0.5" />
              <span><strong>ATS Pro-Tip:</strong> Summaries should be concise (3-4 sentences), highly targeted to your job title, and include exact match skills and key accomplishments.</span>
            </div>
          </div>
        )}
      </div>

      {/* 3. WORK EXPERIENCE SECTION */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <button 
          onClick={() => handleSectionToggle('experiences')}
          className="w-full flex justify-between items-center px-5 py-4 bg-slate-50 hover:bg-slate-100/80 transition-colors text-left"
        >
          <div className="flex items-center gap-2.5 font-semibold text-slate-800">
            <Briefcase size={18} className="text-blue-600" />
            <span>Work Experience</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs bg-slate-200/80 text-slate-600 px-2 py-0.5 rounded-full font-medium">{data.experiences.length}</span>
            {activeSection === 'experiences' ? <ChevronUp size={18} className="text-slate-500" /> : <ChevronDown size={18} className="text-slate-500" />}
          </div>
        </button>

        {activeSection === 'experiences' && (
          <div className="p-5 space-y-4 animate-fade-in">
            {data.experiences.map((exp, idx) => (
              <div key={exp.id} className="p-4 border border-slate-200 rounded-xl relative space-y-3 bg-white hover:border-slate-300/80 transition-all shadow-xs">
                {/* Controls */}
                <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                  <span className="text-xs font-bold text-slate-500">Experience #{idx + 1}</span>
                  <div className="flex items-center gap-1.5">
                    <button 
                      type="button"
                      disabled={idx === 0}
                      onClick={() => moveExperience(idx, 'up')}
                      className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Move Up"
                    >
                      <ArrowUp size={14} />
                    </button>
                    <button 
                      type="button"
                      disabled={idx === data.experiences.length - 1}
                      onClick={() => moveExperience(idx, 'down')}
                      className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Move Down"
                    >
                      <ArrowDown size={14} />
                    </button>
                    <button 
                      type="button"
                      onClick={() => deleteExperience(exp.id)}
                      className="p-1 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded"
                      title="Delete Position"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Job Title / Role</label>
                    <input 
                      type="text" 
                      value={exp.position}
                      onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                      placeholder="e.g. Lead Developer"
                      className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Company / Organization</label>
                    <input 
                      type="text" 
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                      placeholder="e.g. Acme Corporation"
                      className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Start Date</label>
                    <input 
                      type="text" 
                      value={exp.startDate}
                      onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                      placeholder="e.g. Jan 2022"
                      className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">End Date</label>
                    <div className="flex items-center gap-2">
                      <input 
                        type="text" 
                        disabled={exp.current}
                        value={exp.current ? '' : exp.endDate}
                        onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                        placeholder="e.g. Dec 2023 or Present"
                        className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-slate-50 disabled:text-slate-400"
                      />
                      <label className="flex items-center gap-1 shrink-0 text-xs text-slate-600 font-medium select-none cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={exp.current}
                          onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                          className="rounded text-blue-600 focus:ring-blue-500"
                        />
                        <span>Current</span>
                      </label>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Location</label>
                    <input 
                      type="text" 
                      value={exp.location}
                      onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                      placeholder="e.g. Boston, MA (or Remote)"
                      className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700">Role Description & Bullet Points</label>
                    <textarea 
                      value={exp.description}
                      onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                      rows={5}
                      placeholder="- Led frontend migration from legacy architecture to modern React, boosting load speed by 35%.&#10;- Designed and implemented reusable component libraries resulting in 40% reduction in developer time.&#10;- Collaborated with cross-functional product teams of 8 to launch key SaaS reporting dashboard."
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-y font-mono text-xs"
                    />
                    <p className="text-[10px] text-slate-400">Put each bullet point on a new line starting with a hyphen (-) or bullet (•). ATS systems parse lists beautifully!</p>
                  </div>
                </div>
              </div>
            ))}

            <button 
              type="button"
              onClick={addExperience}
              className="w-full py-2.5 border-2 border-dashed border-slate-200 hover:border-blue-500 hover:text-blue-600 rounded-xl text-xs font-bold text-slate-500 flex items-center justify-center gap-1.5 transition-all bg-slate-50/50 hover:bg-blue-50/20"
            >
              <Plus size={14} />
              <span>Add Position</span>
            </button>
          </div>
        )}
      </div>

      {/* 4. KEY PROJECTS */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <button 
          onClick={() => handleSectionToggle('projects')}
          className="w-full flex justify-between items-center px-5 py-4 bg-slate-50 hover:bg-slate-100/80 transition-colors text-left"
        >
          <div className="flex items-center gap-2.5 font-semibold text-slate-800">
            <FolderGit2 size={18} className="text-blue-600" />
            <span>Projects</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs bg-slate-200/80 text-slate-600 px-2 py-0.5 rounded-full font-medium">{data.projects.length}</span>
            {activeSection === 'projects' ? <ChevronUp size={18} className="text-slate-500" /> : <ChevronDown size={18} className="text-slate-500" />}
          </div>
        </button>

        {activeSection === 'projects' && (
          <div className="p-5 space-y-4 animate-fade-in">
            {data.projects.map((proj, idx) => (
              <div key={proj.id} className="p-4 border border-slate-200 rounded-xl relative space-y-3 bg-white hover:border-slate-300/80 transition-all shadow-xs">
                {/* Controls */}
                <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                  <span className="text-xs font-bold text-slate-500">Project #{idx + 1}</span>
                  <div className="flex items-center gap-1.5">
                    <button 
                      type="button"
                      disabled={idx === 0}
                      onClick={() => moveProject(idx, 'up')}
                      className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Move Up"
                    >
                      <ArrowUp size={14} />
                    </button>
                    <button 
                      type="button"
                      disabled={idx === data.projects.length - 1}
                      onClick={() => moveProject(idx, 'down')}
                      className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Move Down"
                    >
                      <ArrowDown size={14} />
                    </button>
                    <button 
                      type="button"
                      onClick={() => deleteProject(proj.id)}
                      className="p-1 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded"
                      title="Delete Project"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Project Name</label>
                    <input 
                      type="text" 
                      value={proj.name}
                      onChange={(e) => updateProject(proj.id, 'name', e.target.value)}
                      placeholder="e.g. Autonomous E-Commerce Platform"
                      className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Role in Project</label>
                    <input 
                      type="text" 
                      value={proj.role}
                      onChange={(e) => updateProject(proj.id, 'role', e.target.value)}
                      placeholder="e.g. Solo Developer / Team Architect"
                      className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Duration / Date</label>
                    <input 
                      type="text" 
                      value={proj.startDate}
                      onChange={(e) => updateProject(proj.id, 'startDate', e.target.value)}
                      placeholder="e.g. Jun 2023 - Sep 2023"
                      className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Project Link / URL</label>
                    <input 
                      type="text" 
                      value={proj.url}
                      onChange={(e) => updateProject(proj.id, 'url', e.target.value)}
                      placeholder="e.g. github.com/user/project"
                      className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700">Project Details & Contributions</label>
                    <textarea 
                      value={proj.description}
                      onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
                      rows={4}
                      placeholder="- Created high-performance state storage using IndexedDB to cache offline data safely.&#10;- Integrated payment flows using Stripe API, resolving purchase confirmation in under 2 seconds.&#10;- Designed responsive tailwind grids maintaining beautiful mobile layout."
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-y font-mono text-xs"
                    />
                  </div>
                </div>
              </div>
            ))}

            <button 
              type="button"
              onClick={addProject}
              className="w-full py-2.5 border-2 border-dashed border-slate-200 hover:border-blue-500 hover:text-blue-600 rounded-xl text-xs font-bold text-slate-500 flex items-center justify-center gap-1.5 transition-all bg-slate-50/50 hover:bg-blue-50/20"
            >
              <Plus size={14} />
              <span>Add Project</span>
            </button>
          </div>
        )}
      </div>

      {/* 5. SKILLS & EXPERTISE */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <button 
          onClick={() => handleSectionToggle('skills')}
          className="w-full flex justify-between items-center px-5 py-4 bg-slate-50 hover:bg-slate-100/80 transition-colors text-left"
        >
          <div className="flex items-center gap-2.5 font-semibold text-slate-800">
            <Code size={18} className="text-blue-600" />
            <span>Skills & Expertise</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs bg-slate-200/80 text-slate-600 px-2 py-0.5 rounded-full font-medium">{data.skills.length}</span>
            {activeSection === 'skills' ? <ChevronUp size={18} className="text-slate-500" /> : <ChevronDown size={18} className="text-slate-500" />}
          </div>
        </button>

        {activeSection === 'skills' && (
          <div className="p-5 space-y-4 animate-fade-in">
            {data.skills.map((skill, idx) => (
              <div key={skill.id} className="flex gap-3 items-start p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="grow grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Skill Category</label>
                    <input 
                      type="text" 
                      value={skill.category}
                      onChange={(e) => updateSkillGroup(skill.id, 'category', e.target.value)}
                      placeholder="e.g. Programming Languages / Frontend"
                      className="w-full bg-white px-3 py-1.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-blue-500 font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Skills (comma separated)</label>
                    <input 
                      type="text" 
                      value={skill.list.join(', ')}
                      onChange={(e) => updateSkillGroup(skill.id, 'list', e.target.value)}
                      placeholder="e.g. React, TypeScript, Vue"
                      className="w-full bg-white px-3 py-1.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-blue-500 font-mono text-xs"
                    />
                  </div>
                </div>
                <button 
                  type="button"
                  onClick={() => deleteSkillGroup(skill.id)}
                  className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg self-center mt-4"
                  title="Remove Category"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}

            <button 
              type="button"
              onClick={addSkillGroup}
              className="w-full py-2.5 border-2 border-dashed border-slate-200 hover:border-blue-500 hover:text-blue-600 rounded-xl text-xs font-bold text-slate-500 flex items-center justify-center gap-1.5 transition-all bg-slate-50/50 hover:bg-blue-50/20"
            >
              <Plus size={14} />
              <span>Add Skill Category</span>
            </button>
            <div className="flex items-start gap-1.5 p-2 bg-slate-50 rounded-lg text-[10px] text-slate-500 border border-slate-100">
              <AlertCircle size={13} className="text-amber-500 shrink-0 mt-0.5" />
              <span><strong>ATS Pro-Tip:</strong> Use simple, comma-separated lists of plain text. Avoid progress bars, stars, or bubble graphs. Parsers extract them as text, and graphic skill bars are completely unreadable to them.</span>
            </div>
          </div>
        )}
      </div>

      {/* 6. EDUCATION SECTION */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <button 
          onClick={() => handleSectionToggle('educations')}
          className="w-full flex justify-between items-center px-5 py-4 bg-slate-50 hover:bg-slate-100/80 transition-colors text-left"
        >
          <div className="flex items-center gap-2.5 font-semibold text-slate-800">
            <GraduationCap size={18} className="text-blue-600" />
            <span>Education</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs bg-slate-200/80 text-slate-600 px-2 py-0.5 rounded-full font-medium">{data.educations.length}</span>
            {activeSection === 'educations' ? <ChevronUp size={18} className="text-slate-500" /> : <ChevronDown size={18} className="text-slate-500" />}
          </div>
        </button>

        {activeSection === 'educations' && (
          <div className="p-5 space-y-4 animate-fade-in">
            {data.educations.map((edu, idx) => (
              <div key={edu.id} className="p-4 border border-slate-200 rounded-xl relative space-y-3 bg-white hover:border-slate-300/80 transition-all shadow-xs">
                {/* Controls */}
                <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                  <span className="text-xs font-bold text-slate-500">Education #{idx + 1}</span>
                  <div className="flex items-center gap-1.5">
                    <button 
                      type="button"
                      disabled={idx === 0}
                      onClick={() => moveEducation(idx, 'up')}
                      className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Move Up"
                    >
                      <ArrowUp size={14} />
                    </button>
                    <button 
                      type="button"
                      disabled={idx === data.educations.length - 1}
                      onClick={() => moveEducation(idx, 'down')}
                      className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Move Down"
                    >
                      <ArrowDown size={14} />
                    </button>
                    <button 
                      type="button"
                      onClick={() => deleteEducation(edu.id)}
                      className="p-1 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded"
                      title="Delete Education"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">School / University</label>
                    <input 
                      type="text" 
                      value={edu.school}
                      onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                      placeholder="e.g. University of California"
                      className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Degree</label>
                    <input 
                      type="text" 
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                      placeholder="e.g. B.S. or M.S."
                      className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Field of Study</label>
                    <input 
                      type="text" 
                      value={edu.fieldOfStudy}
                      onChange={(e) => updateEducation(edu.id, 'fieldOfStudy', e.target.value)}
                      placeholder="e.g. Computer Science"
                      className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Grade / GPA (Optional)</label>
                    <input 
                      type="text" 
                      value={edu.grade}
                      onChange={(e) => updateEducation(edu.id, 'grade', e.target.value)}
                      placeholder="e.g. 3.8 / 4.0"
                      className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Start Date</label>
                    <input 
                      type="text" 
                      value={edu.startDate}
                      onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                      placeholder="e.g. Sep 2018"
                      className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">End Date</label>
                    <div className="flex items-center gap-2">
                      <input 
                        type="text" 
                        disabled={edu.current}
                        value={edu.current ? '' : edu.endDate}
                        onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                        placeholder="e.g. Jun 2022"
                        className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-slate-50 disabled:text-slate-400"
                      />
                      <label className="flex items-center gap-1 shrink-0 text-xs text-slate-600 font-medium select-none cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={edu.current}
                          onChange={(e) => updateEducation(edu.id, 'current', e.target.checked)}
                          className="rounded text-blue-600 focus:ring-blue-500"
                        />
                        <span>Current</span>
                      </label>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Location</label>
                    <input 
                      type="text" 
                      value={edu.location}
                      onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                      placeholder="e.g. Berkeley, CA"
                      className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Description / Minor / Honor (Optional)</label>
                    <textarea 
                      value={edu.description}
                      onChange={(e) => updateEducation(edu.id, 'description', e.target.value)}
                      rows={2}
                      placeholder="Graduated with High Honors. Minor in Economics. Relevant Coursework: Algorithms, Database Management Systems..."
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-y text-xs"
                    />
                  </div>
                </div>
              </div>
            ))}

            <button 
              type="button"
              onClick={addEducation}
              className="w-full py-2.5 border-2 border-dashed border-slate-200 hover:border-blue-500 hover:text-blue-600 rounded-xl text-xs font-bold text-slate-500 flex items-center justify-center gap-1.5 transition-all bg-slate-50/50 hover:bg-blue-50/20"
            >
              <Plus size={14} />
              <span>Add Education</span>
            </button>
          </div>
        )}
      </div>

      {/* 7. CERTIFICATIONS SECTION */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <button 
          onClick={() => handleSectionToggle('certifications')}
          className="w-full flex justify-between items-center px-5 py-4 bg-slate-50 hover:bg-slate-100/80 transition-colors text-left"
        >
          <div className="flex items-center gap-2.5 font-semibold text-slate-800">
            <Award size={18} className="text-blue-600" />
            <span>Certifications & Awards</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs bg-slate-200/80 text-slate-600 px-2 py-0.5 rounded-full font-medium">{data.certifications.length}</span>
            {activeSection === 'certifications' ? <ChevronUp size={18} className="text-slate-500" /> : <ChevronDown size={18} className="text-slate-500" />}
          </div>
        </button>

        {activeSection === 'certifications' && (
          <div className="p-5 space-y-4 animate-fade-in">
            {data.certifications.map((cert, idx) => (
              <div key={cert.id} className="p-4 border border-slate-200 rounded-xl relative space-y-3 bg-white hover:border-slate-300/80 transition-all shadow-xs">
                {/* Controls */}
                <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                  <span className="text-xs font-bold text-slate-500">Certification #{idx + 1}</span>
                  <button 
                    type="button"
                    onClick={() => deleteCertification(cert.id)}
                    className="p-1 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded"
                    title="Delete Certification"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Name / Title</label>
                    <input 
                      type="text" 
                      value={cert.name}
                      onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
                      placeholder="e.g. AWS Certified Solutions Architect"
                      className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Issuer / Authority</label>
                    <input 
                      type="text" 
                      value={cert.issuer}
                      onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
                      placeholder="e.g. Amazon Web Services"
                      className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Date Issued</label>
                    <input 
                      type="text" 
                      value={cert.date}
                      onChange={(e) => updateCertification(cert.id, 'date', e.target.value)}
                      placeholder="e.g. Oct 2023"
                      className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Credential URL / Link</label>
                    <input 
                      type="text" 
                      value={cert.url}
                      onChange={(e) => updateCertification(cert.id, 'url', e.target.value)}
                      placeholder="e.g. credentials.aws/..."
                      className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            ))}

            <button 
              type="button"
              onClick={addCertification}
              className="w-full py-2.5 border-2 border-dashed border-slate-200 hover:border-blue-500 hover:text-blue-600 rounded-xl text-xs font-bold text-slate-500 flex items-center justify-center gap-1.5 transition-all bg-slate-50/50 hover:bg-blue-50/20"
            >
              <Plus size={14} />
              <span>Add Certification / Award</span>
            </button>
          </div>
        )}
      </div>

      {/* 7.5 CUSTOM SECTIONS CREATOR */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <button 
          onClick={() => handleSectionToggle('custom')}
          className="w-full flex justify-between items-center px-5 py-4 bg-slate-50 hover:bg-slate-100/80 transition-colors text-left"
        >
          <div className="flex items-center gap-2.5 font-semibold text-slate-800">
            <Layers size={18} className="text-blue-600" />
            <span>Custom Sections (Languages, Volunteer, Patents...)</span>
            {(data.customSections || []).length > 0 && (
              <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                {(data.customSections || []).length}
              </span>
            )}
          </div>
          {activeSection === 'custom' ? <ChevronUp size={18} className="text-slate-500" /> : <ChevronDown size={18} className="text-slate-500" />}
        </button>

        {activeSection === 'custom' && (
          <div className="p-5 space-y-5 animate-fade-in border-t border-slate-100">
            <p className="text-xs text-slate-500">
              Add specialized custom sections like Languages, Publications, Volunteer Work, Honors, Patents, or Hobbies.
            </p>

            {/* Quick Preset Buttons */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-slate-600 block">Quick Section Presets:</span>
              <div className="flex flex-wrap gap-1.5">
                {['Languages', 'Volunteer Work', 'Publications', 'Honors & Awards', 'Patents', 'Speaking Engagements'].map(preset => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => addCustomSection(preset)}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200 transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <Plus size={12} />
                    <span>{preset}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Manual New Custom Section Input */}
            <div className="flex gap-2">
              <input 
                type="text"
                value={newCustomTitle}
                onChange={(e) => setNewCustomTitle(e.target.value)}
                placeholder="e.g. Languages & Fluency"
                className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => addCustomSection(newCustomTitle)}
                disabled={!newCustomTitle.trim()}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-bold text-xs rounded-lg transition-all cursor-pointer shrink-0"
              >
                + Add Custom Section
              </button>
            </div>

            {/* Render Existing Custom Sections */}
            {(data.customSections || []).map((sec) => (
              <div key={sec.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                  <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider">{sec.title}</h4>
                  <button 
                    type="button"
                    onClick={() => deleteCustomSection(sec.id)}
                    className="p-1 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                <div className="space-y-3">
                  {sec.items.map((item) => (
                    <div key={item.id} className="bg-white p-3 rounded-lg border border-slate-200 space-y-2 text-xs">
                      <div className="flex justify-between items-start gap-2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 flex-1">
                          <input 
                            type="text"
                            value={item.title}
                            onChange={(e) => updateCustomSectionItem(sec.id, item.id, 'title', e.target.value)}
                            placeholder="Title / Item Name"
                            className="px-2.5 py-1.5 border border-slate-200 rounded-md text-xs outline-none focus:ring-1 focus:ring-blue-500"
                          />
                          <input 
                            type="text"
                            value={item.subtitle || ''}
                            onChange={(e) => updateCustomSectionItem(sec.id, item.id, 'subtitle', e.target.value)}
                            placeholder="Subtitle / Organization / Level"
                            className="px-2.5 py-1.5 border border-slate-200 rounded-md text-xs outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        </div>
                        <button 
                          type="button"
                          onClick={() => deleteCustomSectionItem(sec.id, item.id)}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded-lg"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input 
                          type="text"
                          value={item.date || ''}
                          onChange={(e) => updateCustomSectionItem(sec.id, item.id, 'date', e.target.value)}
                          placeholder="Date / Year (e.g. 2023)"
                          className="px-2.5 py-1.5 border border-slate-200 rounded-md text-xs outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>

                      <textarea
                        rows={2}
                        value={item.description || ''}
                        onChange={(e) => updateCustomSectionItem(sec.id, item.id, 'description', e.target.value)}
                        placeholder="Bullet point details or description..."
                        className="w-full p-2 border border-slate-200 rounded-md text-xs outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  ))}

                  <button 
                    type="button"
                    onClick={() => addCustomSectionItem(sec.id)}
                    className="w-full py-2 border border-dashed border-slate-300 hover:border-blue-500 hover:text-blue-600 rounded-lg text-xs font-semibold text-slate-600 flex items-center justify-center gap-1 transition-all bg-white"
                  >
                    <Plus size={13} />
                    <span>Add Item to {sec.title}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 8. SECTION REORDERING CONTROL */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <button 
          onClick={() => handleSectionToggle('reorder')}
          className="w-full flex justify-between items-center px-5 py-4 bg-slate-50 hover:bg-slate-100/80 transition-colors text-left"
        >
          <div className="flex items-center gap-2.5 font-semibold text-slate-800">
            <Plus size={18} className="text-blue-600" strokeWidth={3} />
            <span>Arrange Section Order</span>
          </div>
          {activeSection === 'reorder' ? <ChevronUp size={18} className="text-slate-500" /> : <ChevronDown size={18} className="text-slate-500" />}
        </button>

        {activeSection === 'reorder' && (
          <div className="p-5 space-y-2.5 animate-fade-in">
            <span className="text-xs text-slate-500 block mb-2">Rearrange how the sections are displayed in your PDF or Share link:</span>
            {data.sectionOrder.map((section, idx) => {
              const label = {
                summary: 'Professional Summary',
                experiences: 'Work Experience',
                projects: 'Key Projects',
                skills: 'Skills & Expertise',
                educations: 'Education',
                certifications: 'Certifications & Awards'
              }[section] || section;

              return (
                <div key={section} className="flex justify-between items-center px-4 py-2 bg-slate-50 rounded-xl border border-slate-200/60 shadow-xs">
                  <span className="text-xs font-bold text-slate-700">{label}</span>
                  <div className="flex items-center gap-1.5">
                    <button 
                      type="button"
                      disabled={idx === 0}
                      onClick={() => moveSection(idx, 'up')}
                      className="p-1 text-slate-500 hover:text-blue-600 hover:bg-white rounded-md border border-transparent hover:border-slate-200 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-all"
                    >
                      <ArrowUp size={14} />
                    </button>
                    <button 
                      type="button"
                      disabled={idx === data.sectionOrder.length - 1}
                      onClick={() => moveSection(idx, 'down')}
                      className="p-1 text-slate-500 hover:text-blue-600 hover:bg-white rounded-md border border-transparent hover:border-slate-200 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-all"
                    >
                      <ArrowDown size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
