import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export const replaceOklchInString = (str: string): string => {
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

export const replaceOklabInString = (str: string): string => {
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

const dummyCanvas = typeof document !== 'undefined' ? document.createElement('canvas') : null;
const dummyCtx = dummyCanvas ? dummyCanvas.getContext('2d') : null;

export function convertToRgb(colorStr: string): string {
  if (!colorStr || typeof colorStr !== 'string') return '';
  const trimmed = colorStr.trim();
  if (trimmed === 'transparent' || trimmed === 'rgba(0, 0, 0, 0)') return 'transparent';

  if (dummyCtx) {
    try {
      dummyCtx.fillStyle = '#123456';
      dummyCtx.fillStyle = trimmed;
      const res = dummyCtx.fillStyle;
      if (res && res !== '#123456') {
        return res;
      }
    } catch {
      // fallback
    }
  }
  return replaceOklchInString(replaceOklabInString(trimmed));
}

export const sanitizeCSSForHTML2Canvas = (css: string): string => {
  if (!css) return '';
  let clean = replaceOklchInString(css);
  clean = replaceOklabInString(clean);
  clean = clean.replace(/color-mix\([^)]*\)/gi, 'transparent');
  return clean;
};

export async function exportResumeToPDF(containerId: string = 'printable-resume', nameRaw: string = 'my_cv'): Promise<boolean> {
  // Yield to browser UI thread to allow React to paint buffering loader overlay
  await new Promise((resolve) => setTimeout(resolve, 200));

  let container = document.getElementById(containerId) || document.getElementById('printable-resume');

  if (!container) {
    alert('Error: Resume content element not found in DOM.');
    return false;
  }

  let pagesElements = container.querySelectorAll('.a4-page-sheet');
  if (pagesElements.length === 0) {
    pagesElements = document.querySelectorAll('.a4-page-sheet');
  }

  if (pagesElements.length === 0) {
    alert('Please wait a moment for the CV template formatting to load completely.');
    return false;
  }

  try {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    if (document.fonts) {
      await document.fonts.ready;
    }

    for (let i = 0; i < pagesElements.length; i++) {
      const pageEl = pagesElements[i] as HTMLElement;

      const canvas = await html2canvas(pageEl, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        scrollX: 0,
        scrollY: 0,
        windowWidth: 794,
        windowHeight: 1123,
        onclone: (clonedDoc) => {
          // 1. Sanitize all <style> tags in clonedDoc
          const styleTags = Array.from(clonedDoc.querySelectorAll('style'));
          styleTags.forEach((styleEl) => {
            if (styleEl.textContent) {
              styleEl.textContent = sanitizeCSSForHTML2Canvas(styleEl.textContent);
            }
          });

          // 2. Locate cloned target page
          const clonedPages = clonedDoc.querySelectorAll('.a4-page-sheet');
          const targetPage = (clonedPages[i] || pageEl) as HTMLElement;

          if (targetPage) {
            // Remove print:hidden items inside targetPage
            const printHidden = targetPage.querySelectorAll('.print\\:hidden, [class*="print:hidden"]');
            printHidden.forEach((el) => {
              (el as HTMLElement).style.display = 'none';
            });

            // Convert ALL computed colors inside targetPage to standard RGB/Hex
            const win = clonedDoc.defaultView || window;
            const allElements = targetPage.getElementsByTagName('*');
            const propsToConvert = [
              'color',
              'backgroundColor',
              'borderColor',
              'borderTopColor',
              'borderRightColor',
              'borderBottomColor',
              'borderLeftColor',
              'outlineColor',
              'fill',
              'stroke',
            ];

            // Convert targetPage itself
            try {
              const comp = win.getComputedStyle(targetPage);
              const bg = comp.backgroundColor;
              if (bg && bg !== 'transparent' && bg !== 'rgba(0, 0, 0, 0)') {
                targetPage.style.backgroundColor = convertToRgb(bg);
              }
            } catch {}

            for (let j = 0; j < allElements.length; j++) {
              const el = allElements[j] as HTMLElement;
              if (el && typeof el.getAttribute === 'function') {
                const styleAttr = el.getAttribute('style');
                if (styleAttr && (styleAttr.includes('oklch') || styleAttr.includes('oklab') || styleAttr.includes('color-mix'))) {
                  el.setAttribute('style', sanitizeCSSForHTML2Canvas(styleAttr));
                }

                try {
                  const comp = win.getComputedStyle(el);
                  for (const prop of propsToConvert) {
                    const rawVal = comp.getPropertyValue(prop) || (comp as any)[prop];
                    if (
                      typeof rawVal === 'string' &&
                      rawVal &&
                      rawVal !== 'transparent' &&
                      rawVal !== 'rgba(0, 0, 0, 0)' &&
                      (rawVal.includes('oklch') || rawVal.includes('oklab') || rawVal.includes('color-mix') || rawVal.includes('var('))
                    ) {
                      const converted = convertToRgb(rawVal);
                      if (converted) {
                        el.style.setProperty(prop, converted, 'important');
                      }
                    }
                  }
                } catch {}
              }
            }

            // Create 210mm x 297mm wrapper directly in clonedDoc.body
            const wrapper = clonedDoc.createElement('div');
            wrapper.style.width = '210mm';
            wrapper.style.height = '297mm';
            wrapper.style.margin = '0';
            wrapper.style.padding = '0';
            wrapper.style.background = '#ffffff';
            wrapper.style.overflow = 'hidden';
            wrapper.style.position = 'absolute';
            wrapper.style.top = '0';
            wrapper.style.left = '0';

            targetPage.style.margin = '0';
            targetPage.style.transform = 'none';
            targetPage.style.boxShadow = 'none';
            targetPage.style.borderRadius = '0';
            targetPage.style.opacity = '1';
            targetPage.style.visibility = 'visible';
            targetPage.style.display = 'flex';

            wrapper.appendChild(targetPage);

            clonedDoc.body.innerHTML = '';
            clonedDoc.body.style.margin = '0';
            clonedDoc.body.style.padding = '0';
            clonedDoc.body.style.background = '#ffffff';
            clonedDoc.body.appendChild(wrapper);
          }
        },
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.98);

      if (i > 0) {
        pdf.addPage();
      }

      pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297, undefined, 'FAST');
    }

    const sanitizedName = nameRaw.trim().toLowerCase().replace(/[^a-z0-9]+/g, '_');
    pdf.save(`${sanitizedName}_cv.pdf`);
    return true;
  } catch (err) {
    console.error('PDF export error:', err);
    alert('An error occurred during PDF compilation. Opening browser print view...');
    window.print();
    return false;
  }
}
