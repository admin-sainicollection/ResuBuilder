import { FileText, Palette, Printer, Share2, Save, Cloud, Loader2 } from 'lucide-react';

interface TemplateSelectorProps {
  currentTemplateId: 'classic' | 'modern' | 'tech' | 'executive';
  onTemplateChange: (id: 'classic' | 'modern' | 'tech' | 'executive') => void;
  currentColor: string;
  onColorChange: (color: string) => void;
  onPrint: () => void;
  onShare: () => void;
  onSave: () => void;
  isSaving: boolean;
  isExportingPDF?: boolean;
  isShared: boolean;
  shareUrl: string | null;
}

const TEMPLATE_PREVIEWS = [
  {
    id: 'classic',
    name: 'Classic Harvard',
    desc: 'Georgia serif typography with traditional centered header. 100% ATS scanner approved for top corporate, tech, legal, and banking roles.',
    tag: '100% ATS Approved (Default)'
  },
  {
    id: 'modern',
    name: 'Modern Clean',
    desc: 'Sleek sans-serif fonts, spacious alignment, elegant accent borders. Perfect for startups, product, and sales.',
    tag: 'Recommended'
  },
  {
    id: 'tech',
    name: 'Tech & Eng (Silicon Valley)',
    desc: 'Clean monospaced accents, high visual hierarchy, dense skill layouts. Perfect for engineers, designers, and specialists.',
    tag: 'High Density'
  },
  {
    id: 'executive',
    name: 'Executive Leader',
    desc: 'Solid colored top headers, balanced serif text layout. Ideal for directors, project managers, and leaders.',
    tag: 'Executive'
  }
] as const;

const PROFESSIONAL_COLORS = [
  { hex: '#1e293b', name: 'Deep Slate' },
  { hex: '#1e3a8a', name: 'Navy Corporate' },
  { hex: '#0f766e', name: 'Teal Focus' },
  { hex: '#15803d', name: 'Forest Green' },
  { hex: '#9f1239', name: 'Burgundy Executive' },
  { hex: '#4338ca', name: 'Indigo Accent' },
  { hex: '#000000', name: 'Absolute Dark' }
] as const;

export default function TemplateSelector({
  currentTemplateId,
  onTemplateChange,
  currentColor,
  onColorChange,
  onPrint,
  onShare,
  onSave,
  isSaving,
  isExportingPDF = false,
  isShared,
  shareUrl
}: TemplateSelectorProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-6 animate-fade-in">
      
      {/* 1. Quick Actions (Save, Print) */}
      <div className="flex flex-col gap-2.5">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Actions</h4>
        <div className="grid grid-cols-1 gap-2.5">
          <button
            onClick={onPrint}
            disabled={isExportingPDF}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-xl text-sm font-extrabold transition-all shadow-md shadow-blue-100 cursor-pointer w-full group"
          >
            {isExportingPDF ? (
              <>
                <Loader2 size={16} className="animate-spin text-white" />
                <span>Generating PDF...</span>
              </>
            ) : (
              <>
                <Printer size={16} className="group-hover:scale-110 transition-transform" />
                <span>Download CV as PDF</span>
              </>
            )}
          </button>

          <button
            onClick={onSave}
            disabled={isSaving}
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 disabled:bg-slate-100 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer border border-slate-200"
          >
            {isSaving ? (
              <Loader2 size={14} className="animate-spin text-slate-500" />
            ) : (
              <Cloud size={14} className="text-slate-500" />
            )}
            <span>{isSaving ? 'Saving Progress...' : 'Save Progress to Database'}</span>
          </button>
        </div>
      </div>

      {/* 2. Style Templates */}
      <div className="space-y-3">
        <div className="flex items-center gap-1.5 text-xs font-extrabold text-slate-400 uppercase tracking-widest border-t border-slate-100 pt-4">
          <FileText size={13} />
          <span>Professional ATS Templates</span>
        </div>

        <div className="flex flex-col gap-2.5">
          {TEMPLATE_PREVIEWS.map((tpl) => {
            const isSelected = currentTemplateId === tpl.id;
            
            // Render specific mini-previews representing each template's real-life visual layout
            const renderMiniLayoutPreview = () => {
              if (tpl.id === 'classic') {
                return (
                  <div className="w-12 h-16 shrink-0 bg-slate-100 border border-slate-200 rounded flex flex-col items-center justify-start p-1.5 gap-1 select-none">
                    <div className="w-6 h-1 bg-slate-800 rounded-xs"></div>
                    <div className="w-8 h-0.5 bg-slate-300 rounded-xs"></div>
                    <div className="w-9 h-0.5 bg-slate-200 rounded-xs"></div>
                    <div className="w-10 h-0.5 bg-slate-200 rounded-xs mt-1"></div>
                    <div className="w-10 h-0.5 bg-slate-200 rounded-xs"></div>
                  </div>
                );
              }
              if (tpl.id === 'modern') {
                return (
                  <div className="w-12 h-16 shrink-0 bg-slate-100 border border-slate-200 rounded flex flex-col items-start justify-start p-1.5 gap-1 relative overflow-hidden select-none">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600"></div>
                    <div className="w-7 h-1.5 bg-slate-800 rounded-xs ml-1.5"></div>
                    <div className="w-9 h-0.5 bg-slate-300 rounded-xs ml-1.5"></div>
                    <div className="w-8 h-0.5 bg-slate-200 rounded-xs ml-1.5 mt-1"></div>
                    <div className="w-9 h-0.5 bg-slate-200 rounded-xs ml-1.5"></div>
                  </div>
                );
              }
              if (tpl.id === 'tech') {
                return (
                  <div className="w-12 h-16 shrink-0 bg-zinc-50 border border-zinc-200 rounded flex flex-col items-start justify-start p-1.5 gap-1 select-none font-mono">
                    <div className="w-8 h-1 bg-zinc-800"></div>
                    <div className="w-9 h-0.5 bg-zinc-400"></div>
                    <div className="flex gap-0.5 w-full mt-1">
                      <div className="w-2 h-0.5 bg-zinc-300"></div>
                      <div className="w-6 h-0.5 bg-zinc-300"></div>
                    </div>
                    <div className="flex gap-0.5 w-full">
                      <div className="w-2 h-0.5 bg-zinc-300"></div>
                      <div className="w-6 h-0.5 bg-zinc-300"></div>
                    </div>
                  </div>
                );
              }
              if (tpl.id === 'executive') {
                return (
                  <div className="w-12 h-16 shrink-0 bg-slate-100 border border-slate-200 rounded overflow-hidden flex flex-col gap-1 select-none">
                    <div className="h-3.5 bg-blue-600 w-full flex items-center justify-center">
                      <div className="w-6 h-0.5 bg-white opacity-80"></div>
                    </div>
                    <div className="p-1 flex flex-col gap-1">
                      <div className="w-9 h-0.5 bg-slate-400 rounded-xs"></div>
                      <div className="w-10 h-0.5 bg-slate-200 rounded-xs"></div>
                      <div className="w-8 h-0.5 bg-slate-200 rounded-xs"></div>
                    </div>
                  </div>
                );
              }
              return null;
            };

            return (
              <button
                key={tpl.id}
                onClick={() => onTemplateChange(tpl.id)}
                className={`w-full text-left p-3 rounded-xl border transition-all flex gap-3 cursor-pointer items-start hover:bg-slate-50/50 ${
                  isSelected 
                    ? 'border-blue-600 bg-blue-50/10 shadow-xs ring-2 ring-blue-500/10' 
                    : 'border-slate-200 bg-white'
                }`}
              >
                {renderMiniLayoutPreview()}

                <div className="flex-1 flex flex-col gap-0.5 min-w-0">
                  <div className="flex justify-between items-center w-full gap-2">
                    <span className={`text-xs font-bold truncate ${isSelected ? 'text-blue-900' : 'text-slate-800'}`}>
                      {tpl.name}
                    </span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-md font-semibold shrink-0 ${
                      isSelected ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {tpl.tag}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-normal line-clamp-2">
                    {tpl.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Theme Colors */}
      <div className="space-y-3 border-t border-slate-100 pt-4">
        <div className="flex items-center gap-1.5 text-xs font-extrabold text-slate-400 uppercase tracking-widest">
          <Palette size={13} />
          <span>Brand Color Customization</span>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {PROFESSIONAL_COLORS.map((color) => {
            const isSelected = currentColor.toLowerCase() === color.hex.toLowerCase();
            return (
              <button
                key={color.hex}
                onClick={() => onColorChange(color.hex)}
                className={`w-7 h-7 rounded-full border transition-all flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 ${
                  isSelected ? 'border-blue-600 ring-2 ring-blue-500/20 ring-offset-1' : 'border-slate-200'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              >
                {isSelected && (
                  <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Perfect PDF Download Guide */}
      <div className="bg-gradient-to-r from-blue-50/50 to-indigo-50/50 rounded-xl border border-blue-100 p-4 space-y-3 mt-4">
        <div className="flex items-center gap-1.5 text-xs font-bold text-blue-950">
          <Printer size={13} className="text-blue-600" />
          <span>Perfect A4 PDF Export Guide</span>
        </div>
        <p className="text-[11px] text-slate-600 leading-relaxed">
          For identical page breaks, margins, and brand colors as shown in the live preview, configure these settings in your browser print dialog:
        </p>
        <ul className="space-y-1.5 text-[11px] text-slate-700">
          <li className="flex items-start gap-1.5">
            <span className="text-blue-600 font-bold shrink-0 mt-0.5">•</span>
            <span><strong>Margins:</strong> Select <strong>"None"</strong> (ensures exact 1:1 page boundaries)</span>
          </li>
          <li className="flex items-start gap-1.5">
            <span className="text-blue-600 font-bold shrink-0 mt-0.5">•</span>
            <span><strong>Background Graphics:</strong> <strong>Enable</strong> / Check this box (renders accent colors & header backgrounds)</span>
          </li>
          <li className="flex items-start gap-1.5">
            <span className="text-blue-600 font-bold shrink-0 mt-0.5">•</span>
            <span><strong>Paper Size:</strong> Select <strong>"A4"</strong></span>
          </li>
          <li className="flex items-start gap-1.5">
            <span className="text-blue-600 font-bold shrink-0 mt-0.5">•</span>
            <span><strong>Headers & Footers:</strong> <strong>Disable</strong> / Uncheck this box (removes browser URL/date stamps)</span>
          </li>
        </ul>
      </div>

    </div>
  );
}
