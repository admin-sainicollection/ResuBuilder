import React, { useState, useEffect, useRef } from 'react';
import { ResumeData } from '../types';
import { Mail, Phone, Globe, Linkedin, Github, MapPin, Award, Loader2 } from 'lucide-react';

interface ResumePreviewProps {
  data: ResumeData;
  isPrintPreview?: boolean;
}

interface ResumeBlock {
  id: string;
  type: 'header' | 'summary' | 'section-header' | 'experience-item' | 'project-item' | 'skills' | 'education-item' | 'certifications' | 'custom-section-item';
  sectionId: string;
  data: any;
}

// Helper to ensure name is always beautifully capitalized with Title Case (first letters of words and hyphenated sub-words)
const formatName = (name: string): string => {
  if (!name) return '';
  return name
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

export default function ResumePreview({ data, isPrintPreview = false }: ResumePreviewProps) {
  const { 
    personalInfo, summary, experiences, educations, skills, projects, 
    certifications, customSections, templateId, themeColor, sectionOrder,
    fontFamily, fontSize, spacingDensity 
  } = data;
  const [pages, setPages] = useState<ResumeBlock[][]>([]);
  const [isCalculating, setIsCalculating] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const fontClass = fontFamily === 'georgia' || fontFamily === 'garamond' || fontFamily === 'merriweather' 
    ? 'font-serif' 
    : fontFamily === 'jetbrains' 
    ? 'font-mono' 
    : fontFamily === 'inter' 
    ? 'font-sans' 
    : templateId === 'classic' ? 'font-serif' : templateId === 'tech' ? 'font-mono' : 'font-sans';

  const fontSizeClass = fontSize === 'xs' ? 'text-[11px] leading-snug' : fontSize === 'sm' ? 'text-[12px] leading-normal' : fontSize === 'lg' ? 'text-[14px] leading-relaxed' : 'text-[13px] leading-relaxed';

  const densityConfig = spacingDensity === 'compact' 
    ? { pt: '12mm', pb: '12mm', gap: 'gap-2.5' } 
    : spacingDensity === 'spacious' 
    ? { pt: '22mm', pb: '22mm', gap: 'gap-5' } 
    : { pt: '18mm', pb: '18mm', gap: 'gap-3.5' };

  // Custom styling elements based on template
  const getTemplateStyles = () => {
    switch (templateId) {
      case 'classic':
        return {
          container: `${fontClass} ${fontSizeClass} text-slate-900 bg-white leading-relaxed`,
          header: 'text-center border-b pb-4 mb-3 border-slate-300',
          name: 'text-3xl font-bold tracking-tight text-slate-900 uppercase',
          title: 'text-base font-medium text-slate-700 italic tracking-wide mt-1',
          sectionHeader: 'text-md font-bold text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-0.5 mb-2 mt-3',
          subHeader: 'font-bold text-slate-800 text-xs sm:text-sm',
          metaText: 'text-slate-600 text-xs italic',
          bodyText: 'text-slate-700 text-xs mt-1 whitespace-pre-wrap',
        };
      case 'modern':
        return {
          container: `${fontClass} ${fontSizeClass} text-neutral-800 bg-white leading-relaxed`,
          header: 'flex flex-col items-start pb-4 mb-4 border-b border-neutral-200 gap-2.5 w-full',
          name: 'text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900 leading-none',
          title: 'text-base font-semibold uppercase tracking-wider mt-1 text-neutral-700',
          sectionHeader: 'text-sm font-extrabold uppercase tracking-widest pb-1 mb-2.5 mt-5 border-b-2',
          subHeader: 'font-bold text-neutral-900 text-xs sm:text-sm',
          metaText: 'text-neutral-500 text-xs',
          bodyText: 'text-neutral-600 text-xs mt-1 whitespace-pre-wrap',
        };
      case 'tech':
        return {
          container: `${fontClass} ${fontSizeClass} text-zinc-900 bg-white leading-normal`,
          header: 'border-l-4 pl-4 py-1 mb-3',
          name: 'text-2xl font-bold tracking-tight uppercase',
          title: 'text-xs font-semibold uppercase tracking-widest mt-1',
          sectionHeader: 'text-xs font-bold uppercase tracking-wider bg-zinc-100 p-1 mb-2 mt-3 border-l-2',
          subHeader: 'font-bold text-zinc-900 text-xs',
          metaText: 'text-zinc-500 text-xs',
          bodyText: 'text-zinc-700 mt-1 whitespace-pre-wrap font-sans text-xs',
        };
      case 'executive':
        return {
          container: `${fontClass} ${fontSizeClass} text-slate-900 bg-white leading-relaxed`,
          header: 'p-[15mm] -mx-[15mm] -mt-[18mm] mb-4 text-white print:m-0 print:px-[15mm] print:py-[18mm]',
          name: 'text-3xl font-extrabold tracking-tight uppercase',
          title: 'text-lg font-light tracking-wide opacity-90 mt-1',
          sectionHeader: 'text-md font-bold uppercase tracking-wider pb-1 mb-2.5 mt-5 border-b-2',
          subHeader: 'font-bold text-slate-900 text-xs sm:text-sm',
          metaText: 'text-slate-500 text-xs',
          bodyText: 'text-slate-700 text-xs mt-1 whitespace-pre-wrap',
        };
      default:
        return {
          container: `${fontClass} ${fontSizeClass} text-slate-800 bg-white leading-relaxed`,
          header: 'border-b pb-4 mb-3',
          name: 'text-3xl font-bold',
          title: 'text-lg font-medium text-slate-600',
          sectionHeader: 'text-md font-bold uppercase border-b pb-1 mb-2.5 mt-4',
          subHeader: 'font-bold text-slate-800 text-xs sm:text-sm',
          metaText: 'text-slate-500 text-xs',
          bodyText: 'text-slate-600 text-xs mt-1 whitespace-pre-wrap',
        };
    }
  };

  const styles = getTemplateStyles();

  // Helper to render contact item safely
  const renderContact = () => {
    const items = [
      personalInfo.email && { icon: <Mail size={12} />, value: personalInfo.email, label: 'Email' },
      personalInfo.phone && { icon: <Phone size={12} />, value: personalInfo.phone, label: 'Phone' },
      personalInfo.location && { icon: <MapPin size={12} />, value: personalInfo.location, label: 'Location' },
      personalInfo.website && { icon: <Globe size={12} />, value: personalInfo.website, label: 'Website', isLink: true },
      personalInfo.linkedin && { icon: <Linkedin size={12} />, value: personalInfo.linkedin, label: 'LinkedIn', isLink: true },
      personalInfo.github && { icon: <Github size={12} />, value: personalInfo.github, label: 'GitHub', isLink: true },
    ].filter(Boolean) as { icon: React.ReactNode; value: string; label: string; isLink?: boolean }[];

    if (templateId === 'classic') {
      return (
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-slate-600 mt-2">
          {items.map((item, idx) => (
            <span key={idx} className="flex items-center gap-1">
              {item.isLink ? (
                <a href={item.value.startsWith('http') ? item.value : `https://${item.value}`} target="_blank" rel="noreferrer" className="hover:underline">
                  {item.value}
                </a>
              ) : (
                <span>{item.value}</span>
              )}
              {idx < items.length - 1 && <span className="text-slate-400 ml-3">|</span>}
            </span>
          ))}
        </div>
      );
    }

    if (templateId === 'executive') {
      return (
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-100/90 mt-4 pt-3.5 border-t border-white/20 w-full">
          {items.map((item, idx) => (
            <span key={idx} className="flex items-center gap-2">
              <span className="text-white/70 print:text-white">{item.icon}</span>
              {item.isLink ? (
                <a href={item.value.startsWith('http') ? item.value : `https://${item.value}`} target="_blank" rel="noreferrer" className="hover:underline text-white font-medium">
                  {item.value}
                </a>
              ) : (
                <span className="text-white font-medium">{item.value}</span>
              )}
            </span>
          ))}
        </div>
      );
    }

    if (templateId === 'tech') {
      return (
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-600 mt-1">
          {items.map((item, idx) => (
            <span key={idx} className="flex items-center gap-1 font-mono">
              <span className="text-zinc-400">[{item.label.toLowerCase()}]</span>
              {item.isLink ? (
                <a href={item.value.startsWith('http') ? item.value : `https://${item.value}`} target="_blank" rel="noreferrer" className="hover:underline text-zinc-900">
                  {item.value}
                </a>
              ) : (
                <span className="text-zinc-900">{item.value}</span>
              )}
            </span>
          ))}
        </div>
      );
    }

    return (
      <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-slate-500 mt-2">
        {items.map((item, idx) => (
          <span key={idx} className="flex items-center gap-1.5">
            <span className="text-slate-400 print:hidden">{item.icon}</span>
            {item.isLink ? (
              <a href={item.value.startsWith('http') ? item.value : `https://${item.value}`} target="_blank" rel="noreferrer" className="hover:underline hover:text-slate-800">
                {item.value}
              </a>
            ) : (
              <span>{item.value}</span>
            )}
          </span>
        ))}
      </div>
    );
  };

  const getBlocks = (): ResumeBlock[] => {
    const blocks: ResumeBlock[] = [];

    blocks.push({
      id: 'header',
      type: 'header',
      sectionId: 'header',
      data: personalInfo,
    });

    sectionOrder.forEach((section) => {
      switch (section) {
        case 'summary':
          if (summary) {
            blocks.push({
              id: 'summary-block',
              type: 'summary',
              sectionId: 'summary',
              data: summary,
            });
          }
          break;

        case 'experience':
          if (experiences && experiences.length > 0) {
            blocks.push({
              id: 'experience-header',
              type: 'section-header',
              sectionId: 'experience',
              data: 'Work Experience',
            });
            experiences.forEach((exp) => {
              blocks.push({
                id: `experience-item-${exp.id}`,
                type: 'experience-item',
                sectionId: 'experience',
                data: exp,
              });
            });
          }
          break;

        case 'projects':
          if (projects && projects.length > 0) {
            blocks.push({
              id: 'projects-header',
              type: 'section-header',
              sectionId: 'projects',
              data: 'Key Projects',
            });
            projects.forEach((proj) => {
              blocks.push({
                id: `project-item-${proj.id}`,
                type: 'project-item',
                sectionId: 'projects',
                data: proj,
              });
            });
          }
          break;

        case 'skills':
          if (skills && skills.length > 0) {
            blocks.push({
              id: 'skills-block',
              type: 'skills',
              sectionId: 'skills',
              data: skills,
            });
          }
          break;

        case 'education':
          if (educations && educations.length > 0) {
            blocks.push({
              id: 'education-header',
              type: 'section-header',
              sectionId: 'education',
              data: 'Education',
            });
            educations.forEach((edu) => {
              blocks.push({
                id: `education-item-${edu.id}`,
                type: 'education-item',
                sectionId: 'education',
                data: edu,
              });
            });
          }
          break;

        case 'certifications':
          if (certifications && certifications.length > 0) {
            blocks.push({
              id: 'certifications-block',
              type: 'certifications',
              sectionId: 'certifications',
              data: certifications,
            });
          }
          break;
      }
    });

    // Also render Custom Sections
    if (customSections && customSections.length > 0) {
      customSections.forEach((cSec) => {
        if (cSec.items && cSec.items.length > 0) {
          blocks.push({
            id: `custom-header-${cSec.id}`,
            type: 'section-header',
            sectionId: `custom-${cSec.id}`,
            data: cSec.title || 'Custom Section',
          });
          cSec.items.forEach((item) => {
            blocks.push({
              id: `custom-item-${item.id}`,
              type: 'custom-section-item',
              sectionId: `custom-${cSec.id}`,
              data: item,
            });
          });
        }
      });
    }

    return blocks;
  };

  const renderBlock = (block: ResumeBlock) => {
    switch (block.type) {
      case 'header':
        return templateId === 'executive' ? (
          <div className={styles.header} style={{ backgroundColor: themeColor }}>
            <h1 className={styles.name}>{formatName(personalInfo.name) || 'Your Full Name'}</h1>
            <p className={styles.title}>{personalInfo.jobTitle || 'Desired Professional Title'}</p>
            {renderContact()}
          </div>
        ) : (
          <div className={styles.header}>
            <div>
              <h1 className={styles.name} style={{ color: templateId === 'tech' ? themeColor : undefined }}>
                {formatName(personalInfo.name) || 'Your Full Name'}
              </h1>
              <p className={styles.title} style={{ color: templateId === 'modern' ? themeColor : undefined }}>
                {personalInfo.jobTitle || 'Desired Professional Title'}
              </p>
            </div>
            {renderContact()}
          </div>
        );

      case 'summary':
        return (
          <div className="mb-4">
            <h2 className={styles.sectionHeader} style={{ borderColor: templateId !== 'classic' ? themeColor : undefined, color: templateId !== 'classic' ? themeColor : undefined }}>
              Professional Summary
            </h2>
            <p className={styles.bodyText}>{block.data}</p>
          </div>
        );

      case 'section-header':
        return (
          <h2 className={styles.sectionHeader} style={{ borderColor: templateId !== 'classic' ? themeColor : undefined, color: templateId !== 'classic' ? themeColor : undefined, marginBottom: '12px' }}>
            {block.data}
          </h2>
        );

      case 'experience-item': {
        const exp = block.data;
        return (
          <div className="relative mb-4 last:mb-0">
            <div className="flex justify-between items-baseline flex-wrap">
              <h3 className={styles.subHeader}>{exp.position}</h3>
              <span className={styles.metaText}>
                {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
              </span>
            </div>
            <div className="flex justify-between items-baseline flex-wrap text-xs text-slate-600 mb-1">
              <span className="font-semibold italic text-slate-700">{exp.company}</span>
              <span className="italic text-slate-500 text-xs">{exp.location}</span>
            </div>
            <div className={styles.bodyText}>
              {exp.description.includes('\n') || exp.description.startsWith('-') || exp.description.startsWith('•') ? (
                <ul className="list-disc pl-4 space-y-1">
                  {exp.description
                    .split('\n')
                    .map((line: string) => line.trim())
                    .filter((line: string) => line.length > 0)
                    .map((line: string, idx: number) => {
                      const cleanedLine = line.replace(/^[-•\s]+/, '');
                      return <li key={idx} className="leading-relaxed">{cleanedLine}</li>;
                    })}
                </ul>
              ) : (
                <p className="leading-relaxed">{exp.description}</p>
              )}
            </div>
          </div>
        );
      }

      case 'project-item': {
        const proj = block.data;
        return (
          <div className="mb-4 last:mb-0">
            <div className="flex justify-between items-baseline flex-wrap">
              <h3 className={styles.subHeader}>
                {proj.name}
                {proj.url && (
                  <span className="text-xs font-normal text-slate-500 ml-2 normal-case">
                    (
                    <a href={proj.url.startsWith('http') ? proj.url : `https://${proj.url}`} target="_blank" rel="noreferrer" className="hover:underline text-blue-600 print:text-slate-800">
                      {proj.url}
                    </a>
                    )
                  </span>
                )}
              </h3>
              <span className={styles.metaText}>
                {proj.startDate} – {proj.endDate}
              </span>
            </div>
            {proj.role && <div className="text-xs italic text-slate-600 font-medium mb-1">{proj.role}</div>}
            <div className={styles.bodyText}>
              {proj.description.includes('\n') || proj.description.startsWith('-') || proj.description.startsWith('•') ? (
                <ul className="list-disc pl-4 space-y-1">
                  {proj.description
                    .split('\n')
                    .map((line: string) => line.trim())
                    .filter((line: string) => line.length > 0)
                    .map((line: string, idx: number) => {
                      const cleanedLine = line.replace(/^[-•\s]+/, '');
                      return <li key={idx} className="leading-relaxed">{cleanedLine}</li>;
                    })}
                </ul>
              ) : (
                <p className="leading-relaxed">{proj.description}</p>
              )}
            </div>
          </div>
        );
      }

      case 'skills': {
        const skillsList = block.data;
        return (
          <div className="mb-4">
            <h2 className={styles.sectionHeader} style={{ borderColor: templateId !== 'classic' ? themeColor : undefined, color: templateId !== 'classic' ? themeColor : undefined }}>
              Skills & Expertise
            </h2>
            <div className="flex flex-col gap-1.5 text-xs">
              {skillsList.map((skill: any) => (
                <div key={skill.id} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                  <span className="font-bold text-slate-800 shrink-0 min-w-[120px]">
                    {skill.category}:
                  </span>
                  <span className="text-slate-600">
                    {skill.list.join(', ')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      }

      case 'education-item': {
        const edu = block.data;
        return (
          <div className="mb-4 last:mb-0">
            <div className="flex justify-between items-baseline flex-wrap">
              <h3 className={styles.subHeader}>
                {edu.degree} in {edu.fieldOfStudy}
              </h3>
              <span className={styles.metaText}>
                {edu.startDate} – {edu.current ? 'Present' : edu.endDate}
              </span>
            </div>
            <div className="flex justify-between items-baseline flex-wrap text-xs text-slate-600 mb-1">
              <span className="font-semibold italic text-slate-700">{edu.school}</span>
              <span className="italic text-slate-500 text-xs">{edu.location}</span>
            </div>
            {edu.grade && <div className="text-xs text-slate-600 mt-0.5 mb-1">GPA/Grade: <span className="font-semibold">{edu.grade}</span></div>}
            {edu.description && <p className={styles.bodyText}>{edu.description}</p>}
          </div>
        );
      }

      case 'certifications': {
        const certificationsList = block.data;
        return (
          <div className="mb-4">
            <h2 className={styles.sectionHeader} style={{ borderColor: templateId !== 'classic' ? themeColor : undefined, color: templateId !== 'classic' ? themeColor : undefined }}>
              Certifications & Awards
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
              {certificationsList.map((cert: any) => (
                <div key={cert.id} className="flex items-start gap-1.5">
                  <Award size={13} className="text-slate-400 shrink-0 mt-0.5 print:hidden" />
                  <div>
                    <span className="font-bold text-slate-800">{cert.name}</span>
                    <div className="text-slate-500 italic text-[11px]">
                      {cert.issuer} {cert.date && `• ${cert.date}`}
                      {cert.url && (
                        <span className="ml-1 not-italic">
                          (
                          <a href={cert.url.startsWith('http') ? cert.url : `https://${cert.url}`} target="_blank" rel="noreferrer" className="hover:underline text-blue-600 print:text-slate-800">
                            View
                          </a>
                          )
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }

      case 'custom-section-item': {
        const customItem = block.data;
        return (
          <div className="mb-3 last:mb-0">
            <div className="flex justify-between items-baseline flex-wrap">
              <h3 className={styles.subHeader}>{customItem.title}</h3>
              {customItem.date && <span className={styles.metaText}>{customItem.date}</span>}
            </div>
            {customItem.subtitle && (
              <div className="text-xs italic text-slate-600 font-medium mb-1">{customItem.subtitle}</div>
            )}
            {customItem.description && (
              <div className={styles.bodyText}>
                {customItem.description.includes('\n') || customItem.description.startsWith('-') || customItem.description.startsWith('•') ? (
                  <ul className="list-disc pl-4 space-y-1">
                    {customItem.description
                      .split('\n')
                      .map((line: string) => line.trim())
                      .filter((line: string) => line.length > 0)
                      .map((line: string, idx: number) => {
                        const cleanedLine = line.replace(/^[-•\s]+/, '');
                        return <li key={idx} className="leading-relaxed">{cleanedLine}</li>;
                      })}
                  </ul>
                ) : (
                  <p className="leading-relaxed">{customItem.description}</p>
                )}
              </div>
            )}
          </div>
        );
      }

      default:
        return null;
    }
  };

  useEffect(() => {
    setIsCalculating(true);
    const measureAndPartition = () => {
      const blocks = getBlocks();
      if (blocks.length === 0) {
        setIsCalculating(false);
        return;
      }

      const blockHeights: Record<string, number> = {};
      let totalMeasured = 0;

      blocks.forEach((block) => {
        const el = containerRef.current?.querySelector(`[id="measure-block-${block.id}"]`);
        if (el) {
          blockHeights[block.id] = el.getBoundingClientRect().height;
          totalMeasured++;
        }
      });

      // If DOM elements are not rendered or measured yet, retry shortly
      if (totalMeasured < blocks.length) {
        setTimeout(measureAndPartition, 60);
        return;
      }

      const getMaxPageHeight = (idx: number) => {
        const topMargin = 75.6;
        const bottomMargin = 75.6;
        return 1122.5 - topMargin - bottomMargin - 15; // 15px safe zone
      };
      
      const partitionedPages: ResumeBlock[][] = [];
      let currentPage: ResumeBlock[] = [];
      let currentHeight = 0;
      const gapHeight = 20;

      blocks.forEach((block, index) => {
        const height = blockHeights[block.id] || 0;
        const currentPageIdx = partitionedPages.length;
        const maxPageHeight = getMaxPageHeight(currentPageIdx);

        if (block.type === 'section-header') {
          const nextBlock = blocks[index + 1];
          const nextHeight = nextBlock ? (blockHeights[nextBlock.id] || 0) : 0;
          
          const addedGap = currentPage.length > 0 ? gapHeight : 0;
          const nextGap = gapHeight;
          
          if (currentHeight + addedGap + height + nextGap + nextHeight > maxPageHeight && currentPage.length > 0) {
            partitionedPages.push(currentPage);
            currentPage = [block];
            currentHeight = height;
            return;
          }
        }

        const addedGap = currentPage.length > 0 ? gapHeight : 0;
        if (currentHeight + addedGap + height > maxPageHeight && currentPage.length > 0) {
          partitionedPages.push(currentPage);
          currentPage = [block];
          currentHeight = height;
        } else {
          currentPage.push(block);
          currentHeight += (addedGap + height);
        }
      });

      if (currentPage.length > 0) {
        partitionedPages.push(currentPage);
      }

      setPages(partitionedPages);
      setIsCalculating(false);
    };

    const timer = setTimeout(measureAndPartition, 100);
    return () => clearTimeout(timer);
  }, [personalInfo, summary, experiences, educations, skills, projects, certifications, customSections, templateId, themeColor, sectionOrder, fontFamily, fontSize, spacingDensity]);

  return (
    <div ref={containerRef} id="printable-resume" className="w-full">
      {/* Hidden layout elements used purely to measure client-side height of each block under identical styles */}
      {/* Renders as absolute 1px height clipped, with low opacity, avoiding 'invisible' which can cause 0px heights in iframe environments */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '210mm',
          height: '1px',
          overflow: 'hidden',
          opacity: 0.01,
          pointerEvents: 'none',
          zIndex: -1000,
        }}
      >
        <div style={{ paddingLeft: '15mm', paddingRight: '15mm', boxSizing: 'border-box', width: '100%' }}>
          <div className={`w-full flex flex-col gap-5 ${styles.container}`}>
            {getBlocks().map((block) => (
              <div key={`measure-${block.id}`} id={`measure-block-${block.id}`}>
                {renderBlock(block)}
              </div>
            ))}
          </div>
        </div>
      </div>

      {isCalculating || pages.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-slate-200 shadow-sm w-full max-w-[210mm] min-h-[297mm] mx-auto">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-3" />
          <p className="text-sm font-medium text-slate-500">Formatting pages accurately...</p>
        </div>
      ) : (
        <div className="flex flex-col gap-6 print:gap-0">
          {pages.map((pageBlocks, pageIdx) => (
            <React.Fragment key={pageIdx}>
              {pageIdx > 0 && (
                <div className="w-full max-w-[210mm] mx-auto flex items-center gap-2 my-1 print:hidden select-none">
                  <div className="h-px border-t border-dashed border-amber-400 flex-1"></div>
                  <span className="text-[10px] font-extrabold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-300/80 shadow-2xs uppercase tracking-wider flex items-center gap-1.5">
                    <span>✂ Page {pageIdx + 1} A4 Print Cutoff Boundary Line</span>
                  </span>
                  <div className="h-px border-t border-dashed border-amber-400 flex-1"></div>
                </div>
              )}
              <div
                className={`a4-page-sheet relative bg-white mx-auto flex flex-col justify-between a4-preview-container shadow-sm border border-slate-200/80 rounded-sm`}
                style={{
                  width: '210mm',
                  minHeight: '297mm',
                  maxHeight: '297mm',
                  paddingLeft: '15mm',
                  paddingRight: '15mm',
                  paddingTop: densityConfig.pt,
                  paddingBottom: densityConfig.pb,
                  boxSizing: 'border-box',
                  overflow: 'hidden',
                }}
              >
                <div className={`w-full flex-1 flex flex-col ${densityConfig.gap} ${styles.container}`}>
                  {pageBlocks.map((block) => (
                    <div key={block.id} className="relative">
                      {renderBlock(block)}
                    </div>
                  ))}
                </div>
                
                {/* Visual Page Number inside margin footer (hidden on print) */}
                <div className="absolute bottom-4 left-[15mm] right-[15mm] flex justify-between items-center text-[10px] text-slate-400 font-medium font-sans border-t border-slate-100 pt-2 print:hidden select-none">
                  <span>ResuBuilder Pro • ATS Certified Format</span>
                  <span>Page {pageIdx + 1} of {pages.length}</span>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}
