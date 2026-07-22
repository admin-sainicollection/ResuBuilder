import { useState, useEffect } from 'react';
import { db } from './firebase';
import { doc, getDoc, collection, addDoc, setDoc, query, where, getDocs, deleteDoc } from 'firebase/firestore';
import { initialResumeData } from './initialData';
import { ResumeData } from './types';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';
import TemplateSelector from './components/TemplateSelector';
import LandingPage, { PORTFOLIO_USERS, PortfolioUser, getSampleDataForTemplate } from './components/LandingPage';
import CreatorPortfolioPage, { portfolioUserToResumeData } from './components/CreatorPortfolioPage';
import AuthPages from './components/AuthPages';
import UserDashboard from './components/UserDashboard';
import ViewAllCreators from './components/ViewAllCreators';
import { Printer, Share2, Save, FileText, CheckCircle2, RefreshCw, Eye, Edit3, ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { exportResumeToPDF } from './utils/pdfExport';

const replaceOklchInString = (str: string): string => {
  if (!str || typeof str !== 'string') return '';
  const oklchRegex = /\boklch\(\s*([+-]?[0-9.eE+-]+%?|none)\s+([+-]?[0-9.eE+-]+%?|none)\s+([+-]?[0-9.eE+-]+(?:deg|rad|turn|%)?|none)(?:\s*[\/,]\s*([+-]?[0-9.eE+-]+%?|none))?\s*\)/gi;
  
  let result = str.replace(oklchRegex, (_match, lStr, cStr, hStr, aStr) => {
    try {
      let l = lStr === 'none' ? 0 : (lStr.endsWith('%') ? parseFloat(lStr) / 100 : parseFloat(lStr));
      let c = cStr === 'none' ? 0 : (cStr.endsWith('%') ? parseFloat(cStr) / 100 : parseFloat(cStr));
      let h = 0;
      if (hStr && hStr !== 'none') {
        if (hStr.endsWith('deg')) h = parseFloat(hStr);
        else if (hStr.endsWith('rad')) h = (parseFloat(hStr) * 180) / Math.PI;
        else if (hStr.endsWith('turn')) h = parseFloat(hStr) * 360;
        else if (hStr.endsWith('%')) h = (parseFloat(hStr) / 100) * 360;
        else h = parseFloat(hStr);
      }
      let a = 1;
      if (aStr && aStr !== 'none') {
        a = aStr.endsWith('%') ? parseFloat(aStr) / 100 : parseFloat(aStr);
      }

      if (isNaN(l)) l = 0;
      if (isNaN(c)) c = 0;
      if (isNaN(h)) h = 0;
      if (isNaN(a)) a = 1;

      // Convert LCH to Lab
      const hRad = (h * Math.PI) / 180;
      const L = l;
      const a_ = c * Math.cos(hRad);
      const b_lab = c * Math.sin(hRad);

      // Lab to LMS
      const l_ = L + 0.3963377774 * a_ + 0.2158037573 * b_lab;
      const m_ = L - 0.1055613458 * a_ - 0.0638541728 * b_lab;
      const s_ = L - 0.0894841775 * a_ - 1.2914855480 * b_lab;

      const l3 = l_ * l_ * l_;
      const m3 = m_ * m_ * m_;
      const s3 = s_ * s_ * s_;

      // LMS to XYZ (approx/linear sRGB)
      const r_ = +4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3;
      const g_ = -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3;
      const b_ = -0.0041960863 * l3 - 0.7034186147 * m3 + 1.7076147010 * s3;

      const toSRGB = (val: number) => {
        if (isNaN(val)) return 0;
        return val <= 0.0031308 ? 12.92 * val : 1.055 * Math.pow(val, 1 / 2.4) - 0.055;
      };

      const r = Math.min(255, Math.max(0, Math.round(toSRGB(r_) * 255)));
      const g = Math.min(255, Math.max(0, Math.round(toSRGB(g_) * 255)));
      const b = Math.min(255, Math.max(0, Math.round(toSRGB(b_) * 255)));

      return a >= 0.99 ? `rgb(${r}, ${g}, ${b})` : `rgba(${r}, ${g}, ${b}, ${a.toFixed(3)})`;
    } catch {
      return 'rgb(0, 0, 0)';
    }
  });

  return result.replace(/\boklch\([^)]*\)/gi, 'rgb(0, 0, 0)');
};

const replaceOklabInString = (str: string): string => {
  if (!str || typeof str !== 'string') return '';
  const oklabRegex = /\boklab\(\s*([+-]?[0-9.eE+-]+%?|none)\s+([+-]?[0-9.eE+-]+%?|none)\s+([+-]?[0-9.eE+-]+%?|none)(?:\s*[\/,]\s*([+-]?[0-9.eE+-]+%?|none))?\s*\)/gi;

  let result = str.replace(oklabRegex, (_match, lStr, aStr_val, bStr_val, alphaStr) => {
    try {
      let L = lStr === 'none' ? 0 : (lStr.endsWith('%') ? parseFloat(lStr) / 100 : parseFloat(lStr));
      let a_ = aStr_val === 'none' ? 0 : (aStr_val.endsWith('%') ? parseFloat(aStr_val) / 100 : parseFloat(aStr_val));
      let b_lab = bStr_val === 'none' ? 0 : (bStr_val.endsWith('%') ? parseFloat(bStr_val) / 100 : parseFloat(bStr_val));
      
      let alpha = 1;
      if (alphaStr && alphaStr !== 'none') {
        alpha = alphaStr.endsWith('%') ? parseFloat(alphaStr) / 100 : parseFloat(alphaStr);
      }

      if (isNaN(L)) L = 0;
      if (isNaN(a_)) a_ = 0;
      if (isNaN(b_lab)) b_lab = 0;
      if (isNaN(alpha)) alpha = 1;

      // Lab to LMS
      const l_ = L + 0.3963377774 * a_ + 0.2158037573 * b_lab;
      const m_ = L - 0.1055613458 * a_ - 0.0638541728 * b_lab;
      const s_ = L - 0.0894841775 * a_ - 1.2914855480 * b_lab;

      const l3 = l_ * l_ * l_;
      const m3 = m_ * m_ * m_;
      const s3 = s_ * s_ * s_;

      // LMS to XYZ
      const r_ = +4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3;
      const g_ = -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3;
      const b_ = -0.0041960863 * l3 - 0.7034186147 * m3 + 1.7076147010 * s3;

      const toSRGB = (val: number) => {
        if (isNaN(val)) return 0;
        return val <= 0.0031308 ? 12.92 * val : 1.055 * Math.pow(val, 1 / 2.4) - 0.055;
      };

      const r = Math.min(255, Math.max(0, Math.round(toSRGB(r_) * 255)));
      const g = Math.min(255, Math.max(0, Math.round(toSRGB(g_) * 255)));
      const b = Math.min(255, Math.max(0, Math.round(toSRGB(b_) * 255)));

      return alpha >= 0.99 ? `rgb(${r}, ${g}, ${b})` : `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(3)})`;
    } catch {
      return 'rgb(0, 0, 0)';
    }
  });

  return result.replace(/\boklab\([^)]*\)/gi, 'rgb(0, 0, 0)');
};

const sanitizeCSSForHTML2Canvas = (css: string): string => {
  if (!css) return '';
  let clean = replaceOklchInString(css);
  clean = replaceOklabInString(clean);
  clean = clean.replace(/color-mix\([^)]*\)/gi, 'transparent');
  clean = clean.replace(/\boklab\b/gi, 'srgb');
  clean = clean.replace(/\boklch\b/gi, 'srgb');
  return clean;
};

const capitalizeWords = (str: string): string => {
  if (!str) return '';
  return str
    .trim()
    .split(/\s+/)
    .map(word => {
      if (!word) return '';
      return word
        .split('-')
        .map(subWord => {
          if (!subWord) return '';
          return subWord.charAt(0).toUpperCase() + subWord.slice(1).toLowerCase();
        })
        .join('-');
    })
    .join(' ');
};

export default function App() {
  const [view, setView] = useState<'landing' | 'login' | 'signup' | 'dashboard' | 'builder' | 'view-all-creators' | 'portfolio'>('landing');
  const [selectedPortfolioUser, setSelectedPortfolioUser] = useState<PortfolioUser | null>(null);
  const [creatorsSearchQuery, setCreatorsSearchQuery] = useState('');
  const [currentUser, setCurrentUser] = useState<{ email: string; name: string } | null>(null);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [resumes, setResumes] = useState<ResumeData[]>([]);
  const [isLoadingResumes, setIsLoadingResumes] = useState(false);
  const [isExportingPDF, setIsExportingPDF] = useState(false);

  const getPortfolioUserFromURL = (): PortfolioUser | null => {
    const path = window.location.pathname;
    const params = new URLSearchParams(window.location.search);
    let usernameParam = params.get('portfolio') || params.get('user') || params.get('cv');

    if (!usernameParam && path.startsWith('/portfolio/')) {
      usernameParam = decodeURIComponent(path.replace('/portfolio/', ''));
    }

    if (usernameParam) {
      const clean = usernameParam.toLowerCase().replace(/^@/, '');
      return PORTFOLIO_USERS.find(u => 
        u.username.toLowerCase().replace(/^@/, '') === clean ||
        u.name.toLowerCase().replace(/\s+/g, '-') === clean ||
        u.name.toLowerCase().replace(/\s+/g, '') === clean
      ) || null;
    }
    return null;
  };

  const handleViewPortfolio = (user: PortfolioUser) => {
    setSelectedPortfolioUser(user);
    setView('portfolio');
    const handle = user.username.toLowerCase().replace(/^@/, '');
    const targetPath = `/portfolio/${handle}`;
    if (window.location.pathname !== targetPath) {
      window.history.pushState({ view: 'portfolio', username: user.username }, '', targetPath);
    }
  };

  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [pendingTemplateData, setPendingTemplateData] = useState<ResumeData | null>(null);
  const [shareId, setShareId] = useState<string | null>(null);
  const [isShareView, setIsShareView] = useState(false);

  const handleRequireAuthForTemplate = (templateData: ResumeData) => {
    setPendingTemplateData(templateData);
    const hasAccount = localStorage.getItem('ats_has_account') === 'true';
    if (hasAccount) {
      setAuthMode('login');
      setView('login');
    } else {
      setAuthMode('signup');
      setView('signup');
    }
  };
  
  // App UI states
  const [activeTab, setActiveTab] = useState<'edit' | 'styles' | 'preview'>('edit');
  const [isSaving, setIsSaving] = useState(false);
  const [isShared, setIsShared] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<'unsaved' | 'saving' | 'saved'>('saved');
  const [isLoadingShare, setIsLoadingShare] = useState(false);
  const [errorShare, setErrorShare] = useState<string | null>(null);

  const fetchUserResumesFromFirestore = async (email: string, userDisplayName: string) => {
    setIsLoadingResumes(true);
    try {
      const q = query(collection(db, 'resumes'), where('creatorEmail', '==', email.toLowerCase()));
      const querySnapshot = await getDocs(q);
      let list: ResumeData[] = [];
      querySnapshot.forEach((doc) => {
        list.push({ ...doc.data(), id: doc.id } as ResumeData);
      });

      if (list.length === 0) {
        // Create a default resume
        const defaultCV: ResumeData = {
          ...initialResumeData,
          title: 'My Primary Resume',
          creatorToken: Math.random().toString(36).substring(2, 15),
          personalInfo: {
            ...initialResumeData.personalInfo,
            name: userDisplayName,
            email: email,
          }
        };
        list = [defaultCV];
        // Save to firestore
        const docId = defaultCV.creatorToken;
        await setDoc(doc(db, 'resumes', docId), {
          ...defaultCV,
          id: docId,
          creatorEmail: email.toLowerCase(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      }
      
      // Deduplicate list by id or creatorToken
      const seenDocIds = new Set<string>();
      const uniqueList: ResumeData[] = [];
      for (const item of list) {
        const itemKey = item.id || item.creatorToken;
        if (itemKey && !seenDocIds.has(itemKey)) {
          seenDocIds.add(itemKey);
          uniqueList.push(item);
        } else if (!itemKey) {
          uniqueList.push(item);
        }
      }

      // Sort resumes by updatedAt descending to show latest first
      uniqueList.sort((a, b) => {
        const dateA = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
        const dateB = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
        return dateB - dateA;
      });
      
      setResumes(uniqueList);
      return uniqueList;
    } catch (err) {
      console.error("Error fetching user resumes:", err);
      return [];
    } finally {
      setIsLoadingResumes(false);
    }
  };

  // Check URL query parameters for shareId on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sharedResumeId = params.get('share');
    if (sharedResumeId) {
      setShareId(sharedResumeId);
      setIsShareView(true);
      fetchSharedResume(sharedResumeId);
    } else {
      const urlUser = getPortfolioUserFromURL();
      const path = window.location.pathname;

      if (urlUser) {
        setSelectedPortfolioUser(urlUser);
        setView('portfolio');
      } else if (path === '/view-all') {
        setView('view-all-creators');
      } else if (path === '/features') {
        setView('landing');
        setTimeout(() => {
          document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      } else {
        // Check if user is logged in
        const savedUser = localStorage.getItem('ats_current_user');
        if (savedUser) {
          try {
            const parsedUser = JSON.parse(savedUser);
            parsedUser.name = capitalizeWords(parsedUser.name);
            setCurrentUser(parsedUser);
            
            // Load user resumes from Firestore
            fetchUserResumesFromFirestore(parsedUser.email, parsedUser.name).then((list) => {
              if (path === '/login' || path === '/signup') {
                setView('dashboard');
              } else if (path === '/builder') {
                if (list.length > 0) {
                  setResumeData(list[0]);
                  setView('builder');
                } else {
                  setView('dashboard');
                }
              } else if (path === '/dashboard') {
                setView('dashboard');
              } else {
                setView('landing');
              }
            });
          } catch (e) {
            console.error('Error auto-logging in user', e);
            setView('landing');
          }
        } else {
          if (path === '/login') {
            setView('login');
          } else if (path === '/signup') {
            setView('signup');
          } else {
            setView('landing');
          }
        }
      }
    }
  }, []);

  // Synchronize state changes to URL path
  useEffect(() => {
    if (isShareView) return;

    const path = window.location.pathname;
    let targetPath = '/';

    switch (view) {
      case 'landing':
        targetPath = '/';
        break;
      case 'view-all-creators':
        targetPath = '/view-all';
        break;
      case 'portfolio':
        if (selectedPortfolioUser) {
          const handle = selectedPortfolioUser.username.toLowerCase().replace(/^@/, '');
          targetPath = `/portfolio/${handle}`;
        }
        break;
      case 'login':
        targetPath = '/login';
        break;
      case 'signup':
        targetPath = '/signup';
        break;
      case 'dashboard':
        targetPath = '/dashboard';
        break;
      case 'builder':
        targetPath = '/builder';
        break;
    }

    if (path !== targetPath) {
      window.history.pushState({ view, user: selectedPortfolioUser?.username }, '', targetPath);
    }
  }, [view, isShareView, selectedPortfolioUser]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      if (params.get('share')) return;

      const urlUser = getPortfolioUserFromURL();
      const path = window.location.pathname;

      if (urlUser) {
        setSelectedPortfolioUser(urlUser);
        setView('portfolio');
      } else if (path === '/view-all') {
        setView('view-all-creators');
      } else if (path === '/login') {
        setView('login');
      } else if (path === '/signup') {
        setView('signup');
      } else if (path === '/dashboard') {
        setView('dashboard');
      } else if (path === '/builder') {
        setView('builder');
      } else if (path === '/features') {
        setView('landing');
        setTimeout(() => {
          document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
        }, 200);
      } else {
        setView('landing');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Fetch shared resume from Firestore
  const fetchSharedResume = async (id: string) => {
    setIsLoadingShare(true);
    setErrorShare(null);
    try {
      const docRef = doc(db, 'resumes', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setResumeData(docSnap.data() as ResumeData);
      } else {
        setErrorShare('The shared resume could not be found. It may have been deleted or the link is invalid.');
      }
    } catch (err: any) {
      console.error('Error fetching shared resume:', err);
      setErrorShare('Could not load the shared resume due to a database connection error.');
    } finally {
      setIsLoadingShare(false);
    }
  };

  // Load local resume from localStorage or init template
  const loadLocalResume = () => {
    try {
      const saved = localStorage.getItem('ats_resume_builder_data');
      if (saved) {
        const parsed = JSON.parse(saved) as ResumeData;
        setResumeData(parsed);
      } else {
        // Create fresh creator token and load seed template data
        const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const data = { ...initialResumeData, creatorToken: token };
        setResumeData(data);
        localStorage.setItem('ats_resume_builder_data', JSON.stringify(data));
      }
    } catch (e) {
      console.error('Error loading local resume:', e);
      // Fallback
      setResumeData(initialResumeData);
    }
  };

  // Simple update that triggers our auto-save useEffect debounce loop below
  const handleDataChange = (newData: ResumeData) => {
    setResumeData(newData);
    setSaveStatus('unsaved');
  };

  // Debounce Firestore save on resumeData change
  useEffect(() => {
    if (!currentUser || !resumeData) return;
    if (saveStatus !== 'unsaved') return;

    const delayDebounce = setTimeout(async () => {
      setSaveStatus('saving');
      try {
        const docId = resumeData.id || resumeData.creatorToken;
        if (docId) {
          const docRef = doc(db, 'resumes', docId);
          await setDoc(docRef, {
            ...resumeData,
            id: docId,
            creatorEmail: currentUser.email.toLowerCase(),
            updatedAt: new Date().toISOString()
          }, { merge: true });

          // Update local resumes list
          setResumes(prev => prev.map(r => 
            ((resumeData.id && r.id === resumeData.id) || (r.creatorToken === resumeData.creatorToken))
              ? resumeData 
              : r
          ));
        }
        setSaveStatus('saved');
      } catch (err) {
        console.error('Error auto-saving to Firestore:', err);
        setSaveStatus('unsaved');
      }
    }, 1500); // 1.5 seconds debounce

    return () => clearTimeout(delayDebounce);
  }, [resumeData, currentUser, saveStatus]);

  // Auth helper callbacks
  const handleAuthSuccess = async (user: { email: string; name: string }) => {
    const formattedUser = {
      ...user,
      name: capitalizeWords(user.name)
    };
    localStorage.setItem('ats_has_account', 'true');
    localStorage.setItem('ats_current_user', JSON.stringify(formattedUser));
    setCurrentUser(formattedUser);
    
    // Fetch resumes from Firestore
    await fetchUserResumesFromFirestore(formattedUser.email, formattedUser.name);

    if (pendingTemplateData) {
      const docId = Math.random().toString(36).substring(2, 15);
      const newResume: ResumeData = {
        ...pendingTemplateData,
        id: docId,
        creatorToken: docId,
        creatorEmail: formattedUser.email.toLowerCase(),
        title: pendingTemplateData.title && pendingTemplateData.title.toLowerCase().includes('resume')
          ? pendingTemplateData.title
          : `${formattedUser.name}'s Resume`,
        personalInfo: {
          ...pendingTemplateData.personalInfo,
          name: formattedUser.name,
          email: formattedUser.email,
        }
      };

      try {
        await setDoc(doc(db, 'resumes', docId), {
          ...newResume,
          id: docId,
          creatorEmail: formattedUser.email.toLowerCase(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      } catch (e) {
        console.error('Error saving pending template resume to Firestore:', e);
      }

      setResumes(prev => [newResume, ...prev.filter(r => r.id !== docId)]);
      setResumeData(newResume);
      setPendingTemplateData(null);
      setView('builder');
    } else {
      setView('dashboard');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('ats_current_user');
    setCurrentUser(null);
    setResumes([]);
    setResumeData(null);
    setView('landing');
  };

  const handleCreateNewResume = async () => {
    if (!currentUser) return;
    const newCV: ResumeData = {
      title: 'Fresh CV Draft',
      creatorToken: Math.random().toString(36).substring(2, 15),
      templateId: 'modern',
      themeColor: '#1e3a8a',
      sectionOrder: ['summary', 'experiences', 'skills', 'projects', 'educations', 'certifications'],
      personalInfo: {
        name: currentUser.name,
        jobTitle: '',
        email: currentUser.email,
        phone: '',
        location: '',
        website: '',
        linkedin: '',
        github: ''
      },
      summary: '',
      experiences: [],
      projects: [],
      skills: [],
      educations: [],
      certifications: []
    };
    
    const docId = newCV.creatorToken;
    const updated = [...resumes, newCV];
    setResumes(updated);
    setResumeData(newCV);
    setView('builder');

    // Save to Firestore
    try {
      await setDoc(doc(db, 'resumes', docId), {
        ...newCV,
        id: docId,
        creatorEmail: currentUser.email.toLowerCase(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    } catch (e) {
      console.error('Error creating resume in Firestore:', e);
    }
  };

  const handleLoadSampleTemplate = async () => {
    if (!currentUser) return;
    const sampleCV: ResumeData = {
      ...initialResumeData,
      title: 'Alex Mercer - Engineering Specialist CV',
      creatorToken: Math.random().toString(36).substring(2, 15),
    };
    
    const docId = sampleCV.creatorToken;
    const updated = [...resumes, sampleCV];
    setResumes(updated);
    setResumeData(sampleCV);
    setView('builder');

    // Save to Firestore
    try {
      await setDoc(doc(db, 'resumes', docId), {
        ...sampleCV,
        id: docId,
        creatorEmail: currentUser.email.toLowerCase(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    } catch (e) {
      console.error('Error saving sample template to Firestore:', e);
    }
  };

  const handleDeleteResume = async (id: string) => {
    if (!currentUser) return;
    if (window.confirm('Are you sure you want to delete this resume draft? This action cannot be undone.')) {
      const updated = resumes.filter(r => r.id !== id && r.creatorToken !== id);
      setResumes(updated);

      // Delete from Firestore
      try {
        await deleteDoc(doc(db, 'resumes', id));
      } catch (e) {
        console.error('Error deleting resume from Firestore:', e);
      }
    }
  };

  const handleDuplicateResume = async (resumeToDuplicate: ResumeData) => {
    if (!currentUser) return;
    const newToken = Math.random().toString(36).substring(2, 15);
    const duplicated: ResumeData = {
      ...JSON.parse(JSON.stringify(resumeToDuplicate)),
      title: `${resumeToDuplicate.title || 'Resume'} (Copy)`,
      creatorToken: newToken,
      id: newToken,
    };

    const updated = [...resumes, duplicated];
    setResumes(updated);

    try {
      await setDoc(doc(db, 'resumes', newToken), {
        ...duplicated,
        id: newToken,
        creatorEmail: currentUser.email.toLowerCase(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      alert('Resume draft duplicated successfully!');
    } catch (e) {
      console.error('Error duplicating resume:', e);
    }
  };



  // Save full resume silently in Firestore
  const handleSaveSilent = async (): Promise<string | null> => {
    if (!resumeData) return null;
    setIsSaving(true);
    try {
      const now = new Date().toISOString();
      const updatedData = {
        ...resumeData,
        updatedAt: now,
        creatorEmail: currentUser ? currentUser.email.toLowerCase() : (resumeData.creatorEmail || ''),
      };

      if (!updatedData.createdAt) {
        updatedData.createdAt = now;
      }

      let docId = resumeData.id || resumeData.creatorToken;

      if (docId) {
        // Update existing document
        const docRef = doc(db, 'resumes', docId);
        await setDoc(docRef, updatedData, { merge: true });
      } else {
        // Create new document
        const collRef = collection(db, 'resumes');
        const docRef = await addDoc(collRef, updatedData);
        docId = docRef.id;
        // Keep ID in state
        const savedData = { ...updatedData, id: docId };
        setResumeData(savedData);
      }

      // Update local list
      setResumes(prev => prev.map(r => 
        ((docId && r.id === docId) || (r.creatorToken === resumeData.creatorToken))
          ? { ...updatedData, id: docId } 
          : r
      ));
      
      return docId;
    } catch (err: any) {
      console.error('Firestore save error:', err);
      return null;
    } finally {
      setIsSaving(false);
    }
  };

  // Direct Finish & Download PDF Handler
  const handleFinishAndDownload = async () => {
    // Ensure preview tab is active on small screens so DOM nodes are painted
    if (activeTab !== 'preview') {
      setActiveTab('preview');
      await new Promise((resolve) => setTimeout(resolve, 200));
    }

    // Save draft securely to database
    await handleSaveSilent();
    setIsExportingPDF(true);
    try {
      await exportResumeToPDF('printable-resume', resumeData?.personalInfo?.name || 'my');
    } finally {
      setIsExportingPDF(false);
    }
  };

  // Simple Print/PDF Handler
  const handlePrint = () => {
    handleFinishAndDownload();
  };

  if (isShareView) {
    if (isLoadingShare) {
      return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
          <h2 className="font-bold text-slate-800 text-md">Retrieving ATS Approved CV...</h2>
          <p className="text-xs text-slate-500 mt-1">Connecting to Firestore cloud database</p>
        </div>
      );
    }

    if (errorShare || !resumeData) {
      return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto">
          <div className="w-16 h-16 bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center rounded-2xl mb-4 shadow-2xs">
            <Eye size={24} />
          </div>
          <h2 className="font-bold text-slate-950 text-lg">Failed to Retrieve Resume</h2>
          <p className="text-xs text-slate-600 mt-2 leading-relaxed">{errorShare || 'No resume data found.'}</p>
          <a
            href="/"
            className="mt-6 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
          >
            Create Your Own CV
          </a>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        {/* PDF Generation Buffering Overlay in Share View */}
        {isExportingPDF && (
          <div className="fixed inset-0 bg-slate-950/65 backdrop-blur-xs z-[9999] flex flex-col items-center justify-center p-6 text-center animate-fade-in print:hidden">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full flex flex-col items-center border border-slate-100">
              <div className="w-14 h-14 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center mb-4 text-blue-600 shadow-sm">
                <Loader2 className="w-7 h-7 animate-spin text-blue-600" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-lg">Generating PDF File</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed mb-4">
                Converting CV pages to high-resolution A4 layout & vector fonts. Your downloaded file will be ready in a moment...
              </p>
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full w-full animate-pulse"></div>
              </div>
            </div>
          </div>
        )}

        {/* Share Header Banner (Hidden on Print) */}
        <div className="bg-slate-900 text-white px-4 py-3 border-b border-slate-800 shadow-md print:hidden flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white shadow-inner">CV</div>
            <div>
              <h3 className="text-xs font-bold">{resumeData.personalInfo.name}'s Professional CV</h3>
              <p className="text-[10px] text-slate-400">ATS Approved Template • Real-time View</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handlePrint}
              disabled={isExportingPDF}
              className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold text-xs rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
            >
              {isExportingPDF ? (
                <>
                  <Loader2 size={13} className="animate-spin text-white" />
                  <span>Generating PDF...</span>
                </>
              ) : (
                <>
                  <Printer size={13} />
                  <span>Download PDF</span>
                </>
              )}
            </button>
            <a
              href="/"
              className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-lg border border-slate-700 transition-all flex items-center gap-1"
            >
              <span>Build My CV</span>
              <ArrowRight size={13} />
            </a>
          </div>
        </div>

        {/* Printable Resume Container */}
        <div className="grow overflow-y-auto p-4 md:p-8 flex items-start justify-center print:p-0 print:overflow-visible">
          <ResumePreview data={resumeData} />
        </div>
      </div>
    );
  }

  // Handle Main Routing Views
  if (view === 'portfolio' && selectedPortfolioUser) {
    return (
      <CreatorPortfolioPage
        user={selectedPortfolioUser}
        isLoggedIn={!!currentUser}
        onBack={() => {
          if (creatorsSearchQuery) {
            setView('view-all-creators');
          } else {
            setView('landing');
          }
        }}
        onGetStarted={(template) => {
          const clonedCV = portfolioUserToResumeData(selectedPortfolioUser, template);
          if (!currentUser) {
            handleRequireAuthForTemplate(clonedCV);
          } else {
            const newResume: ResumeData = {
              ...clonedCV,
              id: Math.random().toString(36).substring(2, 11),
              creatorToken: Math.random().toString(36).substring(2, 15),
              creatorEmail: currentUser.email.toLowerCase(),
              title: `${currentUser.name}'s Resume (${selectedPortfolioUser.designation})`,
              personalInfo: {
                ...clonedCV.personalInfo,
                name: currentUser.name,
                email: currentUser.email,
              }
            };
            setResumeData(newResume);
            setView('builder');
          }
        }}
      />
    );
  }

  if (view === 'landing') {
    const handleLandingTemplateChoice = (templateId?: string) => {
      const selectedTemplate = templateId || 'classic';
      const baseSample = getSampleDataForTemplate(selectedTemplate);

      if (!currentUser) {
        handleRequireAuthForTemplate(baseSample);
      } else {
        const newResume: ResumeData = {
          ...baseSample,
          id: Math.random().toString(36).substring(2, 11),
          creatorToken: Math.random().toString(36).substring(2, 15),
          creatorEmail: currentUser.email.toLowerCase(),
          title: `${currentUser.name}'s Resume`,
          personalInfo: {
            ...baseSample.personalInfo,
            name: currentUser.name,
            email: currentUser.email,
          }
        };
        setResumeData(newResume);
        setView('builder');
      }
    };

    return (
      <LandingPage
        onGetStarted={handleLandingTemplateChoice}
        onSelectTemplate={handleLandingTemplateChoice}
        onLogin={() => { setAuthMode('login'); setView('login'); }}
        onSignUp={() => { setAuthMode('signup'); setView('signup'); }}
        onViewAllCreators={(query) => {
          setCreatorsSearchQuery(query || '');
          setView('view-all-creators');
        }}
        isLoggedIn={!!currentUser}
        onGoToDashboard={() => setView('dashboard')}
        onViewPortfolio={handleViewPortfolio}
      />
    );
  }

  if (view === 'view-all-creators') {
    return (
      <ViewAllCreators
        initialSearch={creatorsSearchQuery}
        onBackToHome={() => setView('landing')}
        onGetStarted={() => {
          if (!currentUser) {
            const hasAccount = localStorage.getItem('ats_has_account') === 'true';
            if (hasAccount) {
              setAuthMode('login');
              setView('login');
            } else {
              setAuthMode('signup');
              setView('signup');
            }
          } else {
            setView('dashboard');
          }
        }}
        onViewPortfolio={handleViewPortfolio}
      />
    );
  }

  if (view === 'login' || view === 'signup') {
    return (
      <AuthPages
        initialMode={view === 'login' ? 'login' : 'signup'}
        onBackToHome={() => setView('landing')}
        onAuthSuccess={handleAuthSuccess}
        hasPendingTemplate={!!pendingTemplateData}
      />
    );
  }

  if (view === 'dashboard') {
    return (
      <UserDashboard
        userName={currentUser?.name || 'Candidate'}
        userEmail={currentUser?.email || ''}
        resumes={resumes}
        onEditResume={(resume) => {
          setResumeData(resume);
          setView('builder');
        }}
        onDuplicateResume={handleDuplicateResume}
        onDeleteResume={handleDeleteResume}
        onCreateNewResume={handleCreateNewResume}
        onLoadSampleTemplate={handleLoadSampleTemplate}
        onLogout={handleLogout}
        onGoToLanding={() => setView('landing')}
      />
    );
  }

  // Loaded Builder Workspace
  if (!resumeData) return null;

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-sans print:bg-white print:p-0">
      {isExportingPDF && (
        <div className="fixed inset-0 bg-slate-950/65 backdrop-blur-xs z-[9999] flex flex-col items-center justify-center p-6 text-center animate-fade-in print:hidden">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full flex flex-col items-center border border-slate-100">
            <div className="w-14 h-14 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center mb-4 text-blue-600 shadow-sm">
              <Loader2 className="w-7 h-7 animate-spin text-blue-600" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-lg">Generating PDF File</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed mb-4">
              Converting your CV pages into a crisp, pixel-perfect ATS-compliant document. Download starting shortly...
            </p>
            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div className="bg-blue-600 h-full rounded-full w-full animate-pulse"></div>
            </div>
          </div>
        </div>
      )}
      {/* 1. Header Navigation Workspace */}
      <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs print:hidden shrink-0">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setView('dashboard')}
              title="Return to Dashboard"
              className="p-1.5 hover:bg-slate-100 text-slate-500 hover:text-slate-800 rounded-lg transition-all mr-1 cursor-pointer flex items-center gap-1.5"
            >
              <ArrowLeft size={16} />
              <span className="text-xs font-bold hidden sm:inline">Dashboard</span>
            </button>
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-100">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <span className="font-bold text-lg tracking-tight text-slate-800">ResuBuilder Pro</span>
          </div>
          <div className="h-6 w-px bg-slate-200 hidden md:block"></div>
          
          {/* Main Workspace Navigation Options synced with tabs */}
          <div className="hidden md:flex gap-6 text-sm font-medium">
            <button 
              onClick={() => setActiveTab('edit')} 
              className={`pb-1 transition-colors cursor-pointer text-xs uppercase tracking-wider font-semibold ${activeTab === 'edit' ? 'text-blue-600 border-b-2 border-blue-600 font-bold' : 'text-slate-500 hover:text-slate-800'}`}
            >
              Editor
            </button>

            <button 
              onClick={() => setActiveTab('styles')} 
              className={`pb-1 transition-colors cursor-pointer text-xs uppercase tracking-wider font-semibold ${activeTab === 'styles' ? 'text-blue-600 border-b-2 border-blue-600 font-bold' : 'text-slate-500 hover:text-slate-800'}`}
            >
              Templates
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs text-slate-400 font-medium italic">Autosaved • ATS compliant</span>
          </div>
          <button 
            onClick={async () => {
              const res = await handleSaveSilent();
              if (res) {
                alert('Progress saved successfully to database!');
              } else {
                alert('Failed to save progress. Please check connection.');
              }
            }}
            disabled={isSaving}
            className="px-4 py-2 text-xs font-bold border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-700 cursor-pointer transition-colors"
          >
            {isSaving ? 'Saving...' : 'Save Draft'}
          </button>
          <button 
            onClick={handleFinishAndDownload}
            disabled={isSaving || isExportingPDF}
            className="px-4 py-2 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md shadow-blue-100 disabled:bg-blue-400 cursor-pointer transition-all flex items-center gap-1.5"
          >
            {isExportingPDF ? (
              <>
                <Loader2 size={13} className="animate-spin text-white" />
                <span>Generating PDF...</span>
              </>
            ) : isSaving ? (
              <>
                <Loader2 size={13} className="animate-spin text-white" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Printer size={13} />
                <span>Download PDF</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* 2. Responsive Workstation Layout */}
      <div className="grow flex flex-col lg:flex-row overflow-hidden print:overflow-visible print:block bg-slate-50">
        
        {/* Editor Workspace Panel (Left Side, Hidden on Print) */}
        <div className="w-full lg:w-[480px] xl:w-[520px] bg-white border-r border-slate-200 shrink-0 flex flex-col print:hidden shadow-xs h-[calc(100vh-64px)] lg:h-[calc(100vh-64px)] overflow-hidden">
          
          {/* Sub-Tabs Selector */}
          <div className="flex border-b border-slate-100 bg-slate-50/50 p-2 gap-1.5">
            <button
              onClick={() => setActiveTab('edit')}
              className={`grow flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'edit'
                  ? 'bg-blue-50 border border-blue-100 text-blue-700 shadow-3xs'
                  : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50 border border-transparent'
              }`}
            >
              <FileText size={14} className={activeTab === 'edit' ? 'text-blue-600' : 'text-slate-400'} />
              <span>Form Editor</span>
            </button>
            <button
              onClick={() => setActiveTab('styles')}
              className={`grow flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'styles'
                  ? 'bg-blue-50 border border-blue-100 text-blue-700 shadow-3xs'
                  : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50 border border-transparent'
              }`}
            >
              <Eye size={14} className={activeTab === 'styles' ? 'text-blue-600' : 'text-slate-400'} />
              <span>Templates</span>
            </button>
            {/* Mobile-only Preview Tab */}
            <button
              onClick={() => setActiveTab('preview')}
              className={`lg:hidden grow flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'preview'
                  ? 'bg-blue-50 border border-blue-100 text-blue-700'
                  : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50 border border-transparent'
              }`}
            >
              <Eye size={14} className={activeTab === 'preview' ? 'text-blue-600' : 'text-slate-400'} />
              <span>Preview</span>
            </button>
          </div>

          {/* Active Tab Panel */}
          <div className="grow overflow-hidden p-5 bg-slate-50/40">
            {activeTab === 'edit' && (
              <ResumeForm
                data={resumeData}
                onChange={handleDataChange}
              />
            )}
            {activeTab === 'styles' && (
              <TemplateSelector
                currentTemplateId={resumeData.templateId}
                onTemplateChange={(id) => handleDataChange({ ...resumeData, templateId: id })}
                currentColor={resumeData.themeColor}
                onColorChange={(color) => handleDataChange({ ...resumeData, themeColor: color })}
                onPrint={handleFinishAndDownload}
                onShare={handleFinishAndDownload}
                onSave={async () => {
                  const res = await handleSaveSilent();
                  if (res) {
                    alert('Draft successfully saved to cloud database!');
                  } else {
                    alert('Failed to save draft. Please check connection.');
                  }
                }}
                isSaving={isSaving}
                isExportingPDF={isExportingPDF}
                isShared={isShared}
                shareUrl={shareUrl}
              />
            )}
            {activeTab === 'preview' && (
              <div className="h-[75vh] overflow-y-auto">
                <ResumePreview data={resumeData} />
              </div>
            )}
          </div>
        </div>

        {/* Real-time PDF Canvas Preview (Right Side, Scrollable, Prints directly) */}
        <main className={`grow bg-slate-100/50 p-6 md:p-10 overflow-y-auto flex justify-center items-start print:bg-white print:p-0 print:overflow-visible ${
          activeTab === 'preview' ? 'block' : 'hidden lg:flex'
        }`}>
          <div className="w-full max-w-[210mm]">
            {/* Action Reminder inside Canvas */}
            <div className="mb-4 bg-white rounded-xl border border-slate-200 p-3 flex justify-between items-center print:hidden shadow-2xs">
              <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                <CheckCircle2 size={14} className="text-emerald-500" />
                <span>Live PDF Canvas. Hit "Download PDF" (or Ctrl+P) to print beautifully as an industry-standard CV document.</span>
              </div>
              <button
                onClick={handlePrint}
                className="shrink-0 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-[10px] rounded-lg transition-all"
              >
                Trigger Print
              </button>
            </div>

            <ResumePreview data={resumeData} />
          </div>
        </main>

      </div>

      {/* Mobile Sticky Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 px-3 py-2 z-50 flex items-center justify-around print:hidden shadow-2xl">
        <button
          onClick={() => setActiveTab('edit')}
          className={`flex flex-col items-center gap-1 px-3 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
            activeTab === 'edit' ? 'text-blue-400 bg-slate-800' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Edit3 size={16} />
          <span>Edit Form</span>
        </button>
        <button
          onClick={() => setActiveTab('preview')}
          className={`flex flex-col items-center gap-1 px-3 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
            activeTab === 'preview' ? 'text-blue-400 bg-slate-800' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Eye size={16} />
          <span>Live Preview</span>
        </button>
        <button
          onClick={handleFinishAndDownload}
          disabled={isExportingPDF}
          className="flex flex-col items-center gap-1 px-3 py-1 rounded-lg text-[10px] font-bold text-emerald-400 hover:bg-slate-800 transition-all cursor-pointer"
        >
          <Printer size={16} />
          <span>Download PDF</span>
        </button>
      </div>
    </div>
  );
}
