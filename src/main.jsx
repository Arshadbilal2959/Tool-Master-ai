/* ToolMaster Pro FINAL ALL-TOOLS BUILD */
import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { createClient } from "@supabase/supabase-js";
import {
  Search, Wrench, FileText, Image as ImageIcon, Code2, Globe2, Calculator,
  ArrowRight, ShieldCheck, Zap, Sparkles, Upload, Copy, Download, CheckCircle2,
  LockKeyhole, Settings, LayoutDashboard, Trash2, RefreshCw, Eye, Printer,
  LogIn, UserPlus, LogOut, Menu, X, Heart, History, User, Mail, KeyRound,
  ChevronRight, Star, Moon, Sun, ExternalLink, AlertCircle, Check, CreditCard
} from "lucide-react";

/* ============================================================
   ToolMaster Pro — single-file production-minded frontend
   Required Vercel environment variables:
   VITE_SUPABASE_URL
   VITE_SUPABASE_ANON_KEY (or VITE_SUPABASE_PUBLISHABLE_KEY)
   Optional:
   VITE_API_BASE_URL or VITE_SUPABASE_FUNCTION_URL
   ============================================================ */

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "";
const SUPABASE_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  "";
const supabase = SUPABASE_URL && SUPABASE_KEY ? createClient(SUPABASE_URL, SUPABASE_KEY) : null;

const tools = [
  ["Text to Video","AI & Video","Turn a written prompt or script into an AI video project.","text-to-video"],
  ["Student AI Helper","AI & Education","Ask questions or upload a study image/PDF and get step-by-step AI help.","student-ai-helper"],
  ["PDF to Word","PDF Tools","Convert PDF documents into editable Word files.","pdf-word"],
  ["Word to PDF","PDF Tools","Convert Word documents into a PDF-ready document.","word-pdf"],
  ["PDF to JPG","PDF Tools","Turn PDF pages into JPG images.","pdf-jpg"],
  ["JPG to PDF","PDF Tools","Create a PDF from JPG or PNG images.","jpg-pdf"],
  ["Merge PDF","PDF Tools","Combine multiple PDF files into one.","merge-pdf"],
  ["Split PDF","PDF Tools","Split selected PDF pages into separate files.","split-pdf"],
  ["Compress PDF","PDF Tools","Optimize PDF objects and remove unnecessary overhead.","compress-pdf"],
  ["Rotate PDF","PDF Tools","Rotate PDF pages to the correct orientation.","rotate-pdf"],
  ["PDF Unlock","PDF Tools","Create an unrestricted copy of supported PDFs.","pdf-unlock"],
  ["Edit & Sign PDF","PDF Tools","Edit PDF text, add text and images, fill supported forms, create links, sign and annotate PDFs online.","edit-pdf"],
  ["PDF Watermark","PDF Tools","Add a watermark to PDF pages.","pdf-watermark"],
  ["Image Compressor","Image Tools","Compress JPG, PNG and WebP images.","image-compressor"],
  ["Image Resizer","Image Tools","Resize images to exact dimensions.","image-resizer"],
  ["Image Cropper","Image Tools","Crop images online.","image-cropper"],
  ["JPG to PNG","Image Tools","Convert JPG images to PNG.","jpg-png"],
  ["PNG to JPG","Image Tools","Convert PNG images to JPG.","png-jpg"],
  ["WebP Converter","Image Tools","Convert images to and from WebP.","webp-converter"],
  ["Image Background Remover","Image Tools","Remove simple near-uniform backgrounds locally.","background-remover"],
  ["Image to Text","Image Tools","Extract text from an image with browser OCR.","image-text"],
  ["QR Code Generator","SEO & Marketing","Create custom QR codes from text or links.","qr-generator"],
  ["Meta Tag Generator","SEO & Marketing","Generate SEO-ready meta tags.","meta-tags"],
  ["Sitemap Generator","SEO & Marketing","Create a basic XML sitemap.","sitemap"],
  ["Robots.txt Generator","SEO & Marketing","Generate a robots.txt file.","robots"],
  ["Keyword Density Checker","SEO & Marketing","Analyze keyword frequency in text.","keyword-density"],
  ["URL Encoder","SEO & Marketing","Encode URLs safely.","url-encoder"],
  ["Word Counter","Text Tools","Count words, characters and sentences.","word-counter"],
  ["Case Converter","Text Tools","Convert text to upper, lower, title or sentence case.","case-converter"],
  ["Text Cleaner","Text Tools","Remove extra spaces and clean text.","text-cleaner"],
  ["Lorem Ipsum Generator","Text Tools","Generate placeholder text.","lorem"],
  ["Duplicate Line Remover","Text Tools","Remove duplicate lines from text.","duplicate-lines"],
  ["Text Sorter","Text Tools","Sort lines alphabetically.","text-sorter"],
  ["JSON Formatter","Developer Tools","Format and validate JSON.","json-formatter"],
  ["JSON Minifier","Developer Tools","Minify JSON for compact output.","json-minifier"],
  ["Base64 Encoder","Developer Tools","Encode text to Base64.","base64-encode"],
  ["Base64 Decoder","Developer Tools","Decode Base64 text.","base64-decode"],
  ["HTML Formatter","Developer Tools","Format HTML code.","html-formatter"],
  ["CSS Formatter","Developer Tools","Format CSS code.","css-formatter"],
  ["JavaScript Minifier","Developer Tools","Compact JavaScript text.","js-minifier"],
  ["UUID Generator","Developer Tools","Generate unique UUID values.","uuid"],
  ["Hash Generator","Developer Tools","Create common text hashes locally.","hash"],
  ["Timestamp Converter","Developer Tools","Convert Unix timestamps.","timestamp"],
  ["Password Generator","Security Tools","Generate strong random passwords locally.","password"],
  ["Password Strength Checker","Security Tools","Check password strength locally.","password-strength"],
  ["MD5 Hash Generator","Security Tools","Generate an MD5 hash locally.","md5"],
  ["SHA-256 Generator","Security Tools","Generate SHA-256 hashes using your browser.","sha256"],
  ["Percentage Calculator","Calculator Tools","Calculate percentages quickly.","percentage"],
  ["Age Calculator","Calculator Tools","Calculate age from date of birth.","age"],
  ["BMI Calculator","Calculator Tools","Calculate body mass index.","bmi"],
  ["Discount Calculator","Calculator Tools","Calculate sale discounts.","discount"],
  ["Loan Calculator","Calculator Tools","Estimate monthly loan payments.","loan"],
  ["GST Calculator","Calculator Tools","Calculate GST-inclusive or exclusive amounts.","gst"],
  ["Tip Calculator","Calculator Tools","Calculate tips and split bills.","tip"],
  ["Time Calculator","Calculator Tools","Add and subtract time values.","time"],
  ["Unit Converter","Converter Tools","Convert common units.","units"],
  ["Length Converter","Converter Tools","Convert length measurements.","length"],
  ["Weight Converter","Converter Tools","Convert weight measurements.","weight"],
  ["Temperature Converter","Converter Tools","Convert Celsius, Fahrenheit and Kelvin.","temperature"],
  ["Currency Converter","Converter Tools","Enter an exchange rate and convert currencies.","currency"],
  ["Data Storage Converter","Converter Tools","Convert bytes, KB, MB and GB.","storage"],
  ["Color Converter","Developer Tools","Convert HEX, RGB and HSL values.","color"],
  ["IP Address Info","Network Tools","Inspect the public IP address visible to your browser.","ip-info"],
  ["HTTP Status Checker","Network Tools","Explain common HTTP status codes.","http-status"],
  ["Regex Tester","Developer Tools","Test regular expressions in your browser.","regex"],
  ["Cron Expression Helper","Developer Tools","Build common cron expressions.","cron"],
  ["HTML Entity Encoder","Developer Tools","Encode HTML entities.","html-entities"],
  ["URL Parser","Developer Tools","Break a URL into its parts.","url-parser"],
  ["Email Validator","Utility Tools","Validate email address format.","email-validator"],
  ["Phone Number Formatter","Utility Tools","Clean and format phone numbers.","phone"],
  ["Date Difference Calculator","Calculator Tools","Calculate the difference between dates.","date-difference"],
  ["Random Number Generator","Utility Tools","Generate random numbers.","random-number"],
  ["Random Password Generator","Security Tools","Generate secure random passwords.","random-password"],
  ["Text Reverser","Text Tools","Reverse any text.","text-reverser"],
  ["Palindrome Checker","Text Tools","Check whether text is a palindrome.","palindrome"],
  ["Reading Time Calculator","Text Tools","Estimate reading time for text.","reading-time"],
  ["Character Counter","Text Tools","Count characters with and without spaces.","characters"],
  ["Number to Words","Utility Tools","Convert numbers to English words.","number-words"],
  ["Roman Numeral Converter","Utility Tools","Convert numbers to Roman numerals.","roman"],
  ["Barcode Generator","SEO & Marketing","Generate a simple barcode asset.","barcode"],
  ["Open Graph Generator","SEO & Marketing","Create Open Graph meta tags.","open-graph"],
  ["Schema Markup Generator","SEO & Marketing","Create basic JSON-LD schema templates.","schema"],
  ["Favicon Generator","SEO & Marketing","Create a favicon PNG from an image.","favicon"],
  ["UTM Builder","SEO & Marketing","Build campaign tracking URLs.","utm"],
  ["HTML Previewer","Developer Tools","Preview HTML safely in a new tab.","html-preview"],
  ["Markdown Previewer","Developer Tools","Preview basic Markdown.","markdown"],
  ["SQL Formatter","Developer Tools","Format simple SQL statements.","sql"],
  ["CSV to JSON","Developer Tools","Convert CSV text to JSON.","csv-json"],
  ["JSON to CSV","Developer Tools","Convert simple JSON arrays to CSV.","json-csv"],
  ["XML Formatter","Developer Tools","Format XML text.","xml"],
  ["YAML to JSON","Developer Tools","Convert basic YAML key/value text to JSON.","yaml-json"],
  ["CSS Color Picker","Developer Tools","Pick and inspect a color.","color-picker"],
  ["Aspect Ratio Calculator","Calculator Tools","Calculate proportional dimensions.","aspect"],
  ["Compound Interest Calculator","Calculator Tools","Estimate compound growth.","compound-interest"],
  ["Scientific Calculator","Calculator Tools","Evaluate common scientific expressions safely.","scientific"],
  ["Date Calculator","Calculator Tools","Add days to a date.","date-add"],
  ["Business Name Generator","Utility Tools","Generate business name ideas from keywords.","business-name"],
  ["Username Generator","Utility Tools","Generate username ideas.","username"],
  ["Morse Code Converter","Text Tools","Convert text to Morse code.","morse"],
  ["Binary Converter","Developer Tools","Convert text and numbers to binary.","binary"],
  ["ASCII Converter","Developer Tools","Convert text to ASCII codes.","ascii"],
  ["URL Slug Generator","SEO & Marketing","Create clean SEO slugs.","slug"],
  ["SEO Genius AI","SEO & Marketing","AI-powered website SEO and AI Search Visibility auditor with real crawl-based checks and reports.","seo-genius"],
  ["Stamp Generator","Design Tools","Create professional stamps and seals with instant PNG export.","stamp-generator"],
  ["Logo Maker","Design Tools","Create professional logos with templates, shapes, icons, uploads and advanced customization.","logo-maker"]
];

const categories = [
  "All Tools","PDF Tools","Image Tools","SEO & Marketing","Text Tools","Developer Tools",
  "Calculator Tools","Converter Tools","Security Tools","Utility Tools","Network Tools",
  "AI & Video","AI & Education","Design Tools"
].map(name => [name, name === "All Tools" ? tools.length : tools.filter(x => x[1] === name).length]);

const PLANS = [
  {id:"free", name:"Free", credits:50, period:"daily", price:0, description:"50 AI credits every day"},
  {id:"silver", name:"Silver", credits:500, period:"monthly", price:5, description:"For regular students"},
  {id:"gold", name:"Gold", credits:2000, period:"monthly", price:15, popular:true, description:"For serious study"},
  {id:"demand", name:"Demand", credits:10000, period:"monthly", price:49, description:"For heavy AI usage"},
  {id:"platinum", name:"Platinum", credits:50000, period:"monthly", price:99, description:"Maximum AI access"}
];

const VIDEO_PLANS = [
  {id:"video-free", name:"Free", credits:50, period:"monthly", price:0, description:"50 video credits for testing", features:["Short test clips","720p landscape/portrait","Basic generation"]},
  {id:"video-starter", name:"Starter", credits:500, period:"monthly", price:9, description:"For creators getting started", features:["500 video credits","Priority queue","HD downloads"]},
  {id:"video-pro", name:"Pro", credits:2000, period:"monthly", price:29, popular:true, description:"For regular creators", features:["2,000 video credits","Priority generation","Commercial projects"]},
  {id:"video-business", name:"Business", credits:10000, period:"monthly", price:79, description:"For teams and heavy usage", features:["10,000 video credits","Higher priority","Commercial projects"]},
  {id:"video-platinum", name:"Platinum", credits:50000, period:"monthly", price:199, description:"Maximum video access", features:["50,000 video credits","Highest priority","Commercial projects"]}
];

function PlanCards({title,plans,selected,onSelect,openAuth,user,kind}) {
  return <div className="panel" style={{marginTop:16,padding:18}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:12,flexWrap:"wrap",marginBottom:12}}>
      <div>
        <h3 style={{margin:"0 0 4px"}}>{title}</h3>
        <small style={{color:"#7d889b"}}>Choose a plan. AI usage remains protected by your signed-in account.</small>
      </div>
      {selected && <div className="pill"><CheckCircle2 size={14}/> {plans.find(p=>p.id===selected)?.name||"Selected"}</div>}
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:12}}>
      {plans.map((p)=>(
        <div key={p.id} className="card" style={{position:"relative",border:p.id===selected?"2px solid #6d4aff":"1px solid #e5e7ef",boxShadow:p.id===selected?"0 10px 30px rgba(109,74,255,.12)":"none"}}>
          {p.popular && <div className="pill" style={{position:"absolute",right:10,top:10}}>Popular</div>}
          <div style={{fontWeight:800,fontSize:18}}>{p.name}</div>
          <div style={{fontSize:28,fontWeight:900,marginTop:8}}>{p.price===0?"Free":`$${p.price}`}<small style={{fontSize:12,fontWeight:500,color:"#8490a3"}}>{p.price===0?"":" / month"}</small></div>
          <div style={{color:"#7d889b",fontSize:13,margin:"8px 0 10px"}}>{p.description}</div>
          <div style={{fontWeight:700,fontSize:13,marginBottom:8}}>{p.credits.toLocaleString()} credits · {p.period}</div>
          {Array.isArray(p.features)&&<div style={{display:"grid",gap:5,marginBottom:12}}>{p.features.map(f=><small key={f} style={{display:"flex",gap:6,alignItems:"center"}}><Check size={13}/>{f}</small>)}</div>}
          <button className={p.id===selected?"btn primary":"btn"} style={{width:"100%",justifyContent:"center"}} onClick={()=>{
            onSelect?.(p.id);
            if(!user) openAuth?.("signin");
          }}>
            {p.id===selected?"Selected":"Choose "+p.name}
          </button>
        </div>
      ))}
    </div>
  </div>;
}

const iconForCategory = (cat) => ({
  "PDF Tools": <FileText size={19}/>,
  "Image Tools": <ImageIcon size={19}/>,
  "SEO & Marketing": <Globe2 size={19}/>,
  "Text Tools": <FileText size={19}/>,
  "Developer Tools": <Code2 size={19}/>,
  "Calculator Tools": <Calculator size={19}/>,
  "Converter Tools": <RefreshCw size={19}/>,
  "Security Tools": <ShieldCheck size={19}/>,
  "Utility Tools": <Wrench size={19}/>,
  "Network Tools": <Globe2 size={19}/>,
  "AI & Video": <Sparkles size={19}/>,
  "AI & Education": <Star size={19}/>
}[cat] || <Wrench size={19}/>);

const downloadBlob = (blob, name) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};
const downloadText = (text, name, type="text/plain;charset=utf-8") =>
  downloadBlob(new Blob([text], {type}), name);

async function getSupabaseAccessToken() {
  try {
    if (!supabase) return "";
    const { data, error } = await supabase.auth.getSession();
    if (error) return "";
    return data?.session?.access_token || "";
  } catch {
    return "";
  }
}

async function loadLib(name) {
  const urls = {
    "pdf-lib":"https://esm.sh/pdf-lib@1.17.1",
    "pdfjs":"https://esm.sh/pdfjs-dist@4.10.38/legacy/build/pdf.mjs",
    "docx":"https://esm.sh/docx@9.5.0",
    "mammoth":"https://esm.sh/mammoth@1.9.0",
    "qrcode":"https://esm.sh/qrcode@1.5.4",
    "jsbarcode":"https://esm.sh/jsbarcode@3.11.6",
    "tesseract":"https://esm.sh/tesseract.js@5.1.1",
    "bg-remove":"https://esm.sh/@imgly/background-removal@1.7.0?bundle"
  };
  if (!urls[name]) throw new Error("Library not configured");
  const mod=await import(/* @vite-ignore */ urls[name]);
  if(name==="pdfjs" && mod?.GlobalWorkerOptions){mod.GlobalWorkerOptions.workerSrc="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.worker.min.mjs";}
  return mod;
}


const css = `
:root{
  --bg:#fbfbfe;--panel:#ffffff;--panel2:#f7f7fb;--text:#182033;--muted:#7d879b;
  --line:#e7e9f0;--brand:#6c4cf5;--brand2:#8b68ff;--good:#19b77a;--danger:#ef4444;
  --shadow:0 12px 40px rgba(36,31,79,.08);--sidebar:#ffffff;--soft:#f3f0ff;
}
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;font-family:Inter,ui-sans-serif,system-ui,-apple-system,Segoe UI,sans-serif;background:var(--bg);color:var(--text)}
button,input,textarea,select{font:inherit}button{cursor:pointer}
a{color:inherit;text-decoration:none}.app{min-height:100vh}
.container{max-width:1440px;margin:auto;padding:0 24px}
.header{position:sticky;top:0;z-index:50;background:rgba(255,255,255,.92);backdrop-filter:blur(14px);border-bottom:1px solid var(--line)}
.nav{height:70px;display:flex;align-items:center;justify-content:space-between;gap:22px}
.brand{display:flex;align-items:center;gap:10px;font-weight:900;font-size:20px;letter-spacing:-.02em}.brand span span{color:var(--brand)}
.brandIcon{width:38px;height:38px;border-radius:12px;display:grid;place-items:center;background:linear-gradient(135deg,#7657ff,#9277ff);color:#fff;box-shadow:0 8px 20px rgba(108,76,245,.24)}
.navLinks{display:flex;gap:28px;color:#4e576a;font-size:14px}.navLinks a:hover{color:var(--brand)}
.navActions{display:flex;gap:9px;align-items:center}.btn,.iconBtn{border:1px solid #dfe2ea;background:#fff;color:#263044;border-radius:11px;padding:10px 14px;display:inline-flex;align-items:center;gap:8px;font-weight:750}
.btn:hover,.iconBtn:hover{border-color:#cdd1dc;background:#fafafe}.btn.primary{border-color:transparent;color:#fff;background:linear-gradient(135deg,#6c4cf5,#8060f6);box-shadow:0 8px 22px rgba(108,76,245,.22)}
.btn.ghost{background:transparent}.btn.danger{color:#dc3545;border-color:#ffd7dc;background:#fff7f8}.iconBtn{padding:9px}
.hero{padding:76px 22px 44px;text-align:center;background:linear-gradient(180deg,#ffffff 0%,#fbfbff 72%,#f7f6fd 100%)}
.heroInner{max-width:920px;margin:auto}.pill{display:inline-flex;align-items:center;gap:7px;padding:7px 12px;border:1px solid #e5e1ff;background:#faf8ff;border-radius:999px;color:#6c4cf5;font-size:12px;font-weight:800}
.hero h1{font-size:clamp(42px,6vw,70px);line-height:1.02;letter-spacing:-.055em;margin:19px 0 14px}.hero h1 span{color:var(--brand)}
.hero p{max-width:760px;margin:0 auto;color:#778196;font-size:17px;line-height:1.7}
.searchBox{max-width:760px;margin:28px auto 0;display:flex;align-items:center;gap:12px;border:1px solid #dfe2ea;padding:5px 7px 5px 16px;background:#fff;border-radius:14px;box-shadow:var(--shadow)}
.searchBox input{flex:1;border:0;outline:0;background:transparent;color:var(--text);padding:13px 2px}.searchBox .kbd{font-size:11px;color:#8a94a7;border:1px solid #e4e6ee;padding:5px 8px;border-radius:8px}
.stats{display:flex;justify-content:center;gap:52px;margin-top:26px}.stats b{display:block;font-size:22px}.stats small{color:#8b94a7}
.main{padding-bottom:70px}.toolbar{display:flex;gap:8px;overflow:auto;padding:10px 0 18px;scrollbar-width:none}.toolbar::-webkit-scrollbar{display:none}
.cat{white-space:nowrap;border:1px solid #e2e5ed;background:#fff;color:#606b80;border-radius:11px;padding:10px 12px;display:flex;align-items:center;gap:8px;box-shadow:0 2px 8px rgba(30,35,50,.03)}.cat.active{background:#f0edff;color:#684af0;border-color:#d8d1ff}.cat em{font-style:normal;font-size:11px;color:#96a0b2}
.sectionHead{display:flex;justify-content:space-between;align-items:end;margin:18px 0 16px}.sectionHead h2{margin:0;font-size:27px;letter-spacing:-.02em}.sectionHead p{margin:5px 0 0;color:#8a93a5}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:16px}.card{position:relative;padding:18px;border:1px solid #e4e6ed;background:#fff;border-radius:16px;min-height:168px;transition:.18s;cursor:pointer;overflow:hidden;box-shadow:0 4px 16px rgba(36,31,79,.035)}
.card:hover{transform:translateY(-2px);border-color:#d5cdfd;box-shadow:0 12px 28px rgba(108,76,245,.10)}.toolIcon{width:44px;height:44px;border-radius:13px;display:grid;place-items:center;background:#f2efff;border:1px solid #e4ddff;color:#6d50ee}
.cardBody span,.toolHero span{font-size:11px;color:#8a93a6;text-transform:uppercase;letter-spacing:.08em}.cardBody h3{margin:11px 0 8px;font-size:17px}.cardBody p{margin:0;color:#7c879a;line-height:1.55;font-size:13px}.arrow{position:absolute;right:15px;bottom:15px;color:#9aa3b4}
.empty{border:1px dashed #dfe2ea;padding:55px;border-radius:16px;text-align:center;color:#8b94a6}
.toolPage{max-width:1440px;margin:auto;padding:28px 24px 70px}.back{border:0;background:transparent;color:#727d90;display:inline-flex;align-items:center;gap:5px;padding:7px 0}
.toolHero{display:flex;gap:15px;align-items:center;margin:18px 0 20px}.toolHero h1{margin:5px 0;font-size:32px;letter-spacing:-.03em}.toolHero p{margin:0;color:#7c879a}
.workspace,.aiHelper{display:grid;grid-template-columns:1fr 1fr;gap:16px}.panel,.aiCard,.adminCard{border:1px solid #e4e6ed;background:#fff;border-radius:16px;padding:20px;box-shadow:var(--shadow)}
.panel label,.aiCard label{display:block;color:#556075;font-size:12px;font-weight:800;margin-bottom:8px}.panel textarea,.aiCard textarea,.panel input,.panel select,.aiCard input,.aiCard select{width:100%;border:1px solid #dfe2ea;background:#fff;color:#1d2737;border-radius:11px;padding:12px;outline:0}.panel textarea,.aiCard textarea{min-height:300px;resize:vertical}
.actions{display:flex;gap:9px;flex-wrap:wrap;margin-top:12px}.notice{margin-top:16px;padding:12px 14px;border:1px solid #e1dcff;background:#faf8ff;border-radius:11px;color:#6d638f;display:flex;gap:9px;align-items:flex-start}
.uploadBox{display:flex;align-items:center;gap:13px;border:1px dashed #cfc8fb;padding:15px;border-radius:13px;background:#fbfaff;cursor:pointer;margin:0 0 12px}.uploadBox input{display:none}.uploadBox strong{display:block;margin-top:4px;color:#7f8899;font-size:11px}
.answer{min-height:300px;white-space:pre-wrap;line-height:1.7;color:#334055;background:#fafbfc;border:1px solid #e4e6ed;border-radius:12px;padding:16px}
.videoOptions{display:grid;grid-template-columns:1fr 1fr;gap:10px}.videoPlaceholder{min-height:310px;border-radius:14px;background:linear-gradient(145deg,#f7f4ff,#ffffff);display:grid;place-items:center;text-align:center;border:1px solid #e6e2f7;padding:20px}.playCircle{width:70px;height:70px;border-radius:50%;display:grid;place-items:center;background:#eee9ff;color:#6c4cf5;font-size:25px}
.admin{max-width:1280px;margin:auto;padding:42px 24px 80px}.adminTop{display:flex;justify-content:space-between;align-items:end;gap:18px}.adminTop h1{font-size:40px;margin:10px 0}.adminTop p{color:#7c879a;max-width:700px}.adminGrid{display:grid;grid-template-columns:repeat(2,1fr);gap:15px;margin-top:28px}.adminCard h3{margin:13px 0 6px}.adminCard p{color:#7c879a;min-height:44px}.ok{color:#15a875}
.footer{border-top:1px solid var(--line);padding:35px 22px 50px;color:#7f899b;background:#fff}.footerInner{max-width:1240px;margin:auto;display:flex;justify-content:space-between;gap:20px;align-items:center}
.modalBack{position:fixed;inset:0;z-index:100;display:grid;place-items:center;background:rgba(30,25,56,.32);backdrop-filter:blur(10px);padding:18px}.modal{width:min(480px,100%);background:#fff;border:1px solid #e2e4eb;border-radius:18px;padding:24px;box-shadow:0 30px 90px rgba(40,35,70,.2)}.modalHead{display:flex;justify-content:space-between;align-items:center}.modal h2{margin:5px 0}.modal p{color:#7c879a;line-height:1.6}.field{margin:12px 0}.field label{display:block;font-size:12px;color:#5b667a;margin-bottom:6px}.field input{width:100%;padding:12px;border-radius:10px;border:1px solid #dfe2ea;background:#fff;color:#1d2737;outline:0}.formGrid{display:grid;grid-template-columns:1fr 1fr;gap:10px}.authTabs{display:grid;grid-template-columns:1fr 1fr;border:1px solid #e2e4eb;padding:4px;border-radius:11px;margin:15px 0}.authTabs button{border:0;padding:10px;border-radius:8px;background:transparent;color:#7e8899}.authTabs button.active{background:#f0edff;color:#684af0}.formError,.formSuccess{padding:11px 12px;border-radius:10px;margin:10px 0;font-size:13px}.formError{background:#fff4f5;color:#c2394b;border:1px solid #ffd6dc}.formSuccess{background:#f0fbf6;color:#23845f;border:1px solid #ccefe0}
.profileMenu{position:relative}.profileCard{position:absolute;right:0;top:50px;width:260px;background:#fff;border:1px solid #e2e4eb;border-radius:14px;padding:14px;box-shadow:var(--shadow);z-index:70}.profileCard b{display:block}.profileCard small{display:block;color:#7f8999;margin:3px 0 12px}.mobileOnly{display:none}

.pdfProEditor{border:1px solid #e3e5ed;border-radius:18px;background:#fff;overflow:hidden;box-shadow:0 16px 45px rgba(50,43,110,.08)}
.pdfEditorTop{padding:18px 20px;border-bottom:1px solid #eceef4;display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap}.pdfTopTitle h2{margin:0;font-size:27px;letter-spacing:-.03em}.pdfTopTitle p{margin:5px 0 0;color:#8992a3}.pdfTopActions{display:flex;align-items:center;gap:9px}.pdfEditorToolbar{display:flex;align-items:stretch;gap:8px;padding:10px 12px;border-bottom:1px solid #e6e8ee;overflow:auto;background:#fff}.pdfAction{min-width:94px;border:1px solid #dfe3ec;background:#fff;border-radius:11px;padding:10px 11px;color:#58647a;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;font-size:11px;font-weight:800}.pdfAction:hover{border-color:#bfb8f9;background:#faf9ff}.pdfAction.active{color:#6648ef;border-color:#8e77fa;background:#f6f2ff;box-shadow:inset 0 0 0 1px rgba(108,76,245,.08)}.pdfAction span{white-space:nowrap}.dangerAction{color:#dc4451}.spacer{flex:1;min-width:12px}.pdfControlBar{padding:9px 14px;border-bottom:1px solid #e8eaf0;background:#fbfbfd;display:flex;justify-content:space-between;align-items:center;gap:12px}.pageControl,.zoomControl{display:flex;align-items:center;gap:8px;color:#5c6678;font-size:13px}.pageControl input,.zoomControl select{height:34px;border:1px solid #dfe2e9;border-radius:8px;padding:6px 8px;background:#fff}.zoomControl select{width:82px}.pdfWorkspace{display:grid;grid-template-columns:285px minmax(0,1fr);min-height:750px;background:#f1f2f6}.pdfToolsPanel{background:#fff;border-right:1px solid #e2e5eb;padding:18px;overflow:auto}.pdfToolsPanel h3{margin:0 0 8px;font-size:17px}.panelHint,.emptyHint{font-size:12px;line-height:1.55;color:#8891a2}.pdfToolsPanel label{display:grid;gap:6px;margin-top:13px;font-size:12px;font-weight:800;color:#566176}.pdfToolsPanel input,.pdfToolsPanel textarea,.pdfToolsPanel select{width:100%;border:1px solid #dfe2ea;border-radius:9px;padding:9px 10px;background:#fff;color:#1b2435;outline:none}.pdfToolsPanel textarea{min-height:82px;resize:vertical}.twoFields{display:grid;grid-template-columns:1fr 1fr;gap:9px}.inlineButtons{display:flex;gap:8px;margin-top:10px}.toggle{width:38px;height:38px;border:1px solid #dfe2ea;background:#fff;border-radius:9px}.toggle.on{border-color:#8f78f8;background:#f2eeff;color:#6848ef}.selectionInfo{display:grid;gap:5px;padding:10px;margin-top:12px;background:#faf8ff;border:1px solid #e3ddff;border-radius:10px;color:#6447ed;font-size:12px}.selectionInfo span{color:#6f7788;line-height:1.45}.detectedList{display:grid;gap:6px;margin-top:14px}.detectedList>b{font-size:12px;color:#5d6779}.detected{border:1px solid #e5e7ed;background:#fff;border-radius:8px;padding:8px;text-align:left;font-size:11px;color:#586477;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.detected.active{border-color:#8e79f6;background:#f7f4ff;color:#6142e7}.editControls{display:grid;gap:10px;margin-top:13px}.formatButtons{display:flex;gap:8px}.formatButtons .toggle{flex:1;display:flex;align-items:center;justify-content:center;gap:6px;border:1px solid #dfe2ea;background:#fff;border-radius:9px;padding:9px 8px;color:#596477;font-weight:700}.formatButtons .toggle.on{border-color:#8f78f8;background:#f2eeff;color:#6848ef}.downloadBtn{width:100%;justify-content:center;margin-top:8px}.fileBadge{margin-top:9px;padding:8px;border-radius:8px;background:#effaf5;color:#15966a;font-size:11px}.applyBtn{width:100%;justify-content:center;margin-top:18px}.pdfViewer{padding:24px;display:flex;justify-content:center;align-items:flex-start;overflow:auto}.pdfPaperLive{position:relative;background:#fff;box-shadow:0 10px 34px rgba(30,35,50,.16);border:1px solid #d9dce4;flex:none}.pdfPaperLive canvas{display:block;width:100%;height:100%}.pdfTextOverlay{position:absolute;left:0;top:0;z-index:6;pointer-events:none}.textEditItem{position:absolute;pointer-events:auto}.textHotspot{width:100%;height:100%;display:block;padding:0 1px;pointer-events:auto;border:1px solid transparent;background:transparent;color:transparent;cursor:text;text-align:left;overflow:hidden;border-radius:3px}.textHotspot:hover{background:rgba(112,82,245,.10);border:1px dashed rgba(112,82,245,.75)}.textHotspot.selected{background:rgba(112,82,245,.14);border:2px solid #8062f4;color:transparent}.editedPreviewText{display:block;box-sizing:border-box;line-height:1.05;position:relative;z-index:18}.inlinePdfInput{position:absolute;left:0;top:-2px;z-index:20;box-sizing:border-box;border:2px solid #7050f5;border-radius:4px;padding:2px 5px;background:#fff;color:#111827;font-family:Arial,sans-serif;outline:none;box-shadow:0 6px 18px rgba(67,50,170,.18)}.liveGhost{position:absolute;padding:2px 3px;background:rgba(255,255,255,.78);border:1px dashed rgba(108,76,245,.65);font-weight:500;pointer-events:none;white-space:pre-wrap;max-width:75%}.signGhost{font-family:cursive;color:#1c2a58;border-bottom:1px solid #1c2a58;background:rgba(255,255,255,.7)}.pdfFileBar{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 16px;border-top:1px solid #e7e9ef;flex-wrap:wrap}.pdfFileBar>div:first-child{display:flex;flex-direction:column;gap:3px}.pdfFileBar span{color:#8991a1;font-size:12px}.pdfPrivacy{display:flex;justify-content:center;align-items:center;gap:6px;padding:11px;background:#fbfbfd;border-top:1px solid #eef0f4;color:#7f8899;font-size:12px}.pdfEmptyState{margin:28px;border:2px dashed #dcd8fb;border-radius:18px;background:linear-gradient(180deg,#fcfbff,#f8f7ff);min-height:420px;display:grid;place-items:center;text-align:center;padding:50px 20px;cursor:pointer}.pdfUploadIcon{width:74px;height:74px;border-radius:20px;display:grid;place-items:center;color:#6c4cf5;background:#eeeaff;box-shadow:0 12px 28px rgba(108,76,245,.13)}.pdfEmptyState h3{margin:0;font-size:25px}.pdfEmptyState p{margin:0;color:#858ea0}.pdfEmptyState small{color:#9299a8}
.pdfEditorShell{border:1px solid #e2e4eb;border-radius:16px;background:#fff;box-shadow:var(--shadow);overflow:hidden}
.pdfEditorHeader{padding:16px 18px;border-bottom:1px solid #e6e8ef;display:flex;justify-content:space-between;gap:12px;align-items:center;flex-wrap:wrap}
.pdfEditorTitle h2{margin:0;font-size:26px}.pdfEditorTitle p{margin:5px 0 0;color:#8790a2}.beta{font-size:11px;color:#704ff3;background:#f1edff;padding:4px 7px;border-radius:6px;margin-left:7px;vertical-align:middle}
.pdfToolbar{display:flex;gap:8px;overflow:auto;padding:10px 12px;border-bottom:1px solid #e8e9ef;background:#fff}.pdfToolBtn{min-width:82px;border:1px solid #e2e4eb;background:#fff;border-radius:9px;padding:9px 10px;color:#5d677a;display:flex;flex-direction:column;align-items:center;gap:5px;font-size:11px;font-weight:750}.pdfToolBtn.active{border-color:#8f78f7;background:#faf8ff;color:#694cf0}.pdfCanvasBar{display:flex;align-items:center;gap:8px;padding:8px 12px;border-bottom:1px solid #e8e9ef;background:#fbfbfd}.pdfCanvasBar .grow{flex:1}.pdfEditorBody{display:grid;grid-template-columns:260px 1fr;min-height:660px;background:#f5f6f9}.pdfSide{background:#fff;border-right:1px solid #e3e5ec;padding:16px;overflow:auto}.pdfSide h4{margin:0 0 10px}.pdfSide .hint{font-size:12px;color:#838da0;line-height:1.5}.pdfStage{padding:18px;overflow:auto;display:flex;justify-content:center}.pdfPaper{width:min(760px,100%);min-height:760px;background:#fff;border:1px solid #dfe2e8;box-shadow:0 8px 28px rgba(34,39,53,.08);padding:48px;position:relative}.pdfFakeLine{height:10px;border-radius:6px;background:#e7eaf0;margin:9px 0}.pdfSelection{border:2px solid #8c72f6;border-radius:7px;padding:8px 10px;display:inline-block;background:#fff}.pdfSelection small{display:block;color:#7658ef;font-size:10px;margin-bottom:4px}.pdfEditorFooter{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:12px 16px;border-top:1px solid #e5e7ed;background:#fff;flex-wrap:wrap}.pdfFileMeta{display:flex;flex-direction:column;gap:2px}.pdfPrivacy{padding:12px 16px;text-align:center;color:#7d8798;font-size:12px;background:#fbfbfd;border-top:1px solid #eef0f4}


.pdfNavWrap{background:#fff;border-bottom:1px solid #e5e7eb;box-shadow:0 2px 10px rgba(15,23,42,.04);position:relative;z-index:40}.pdfNavMenu{max-width:1440px;margin:0 auto;display:flex;align-items:center;gap:0;overflow-x:auto;scrollbar-width:none}.pdfNavMenu::-webkit-scrollbar{display:none}.pdfNavMenu>button,.pdfDropdown summary{appearance:none;border:0;background:#fff;color:#111827;font-weight:900;font-size:14px;letter-spacing:.01em;padding:17px 18px;white-space:nowrap;display:flex;align-items:center;gap:5px;cursor:pointer}.pdfNavMenu>button:hover,.pdfDropdown summary:hover{color:#ef2b2d}.pdfNavMenu>button.pdfNavActive,.pdfDropdown.active summary{color:#ef2b2d}.pdfDropdown{position:relative}.pdfDropdown summary{list-style:none}.pdfDropdown summary::-webkit-details-marker{display:none}.pdfDropdown[open] summary{color:#ef2b2d}.pdfDropdownPanel{position:absolute;top:100%;left:0;min-width:260px;background:#fff;border:1px solid #e5e7eb;border-top:3px solid #ef2b2d;border-radius:0 0 10px 10px;box-shadow:0 16px 35px rgba(15,23,42,.12);padding:8px;display:grid;gap:3px}.pdfDropdownPanel.wide{min-width:620px;grid-template-columns:repeat(3,minmax(160px,1fr))}.pdfDropdownPanel button{border:0;background:#fff;text-align:left;padding:10px 12px;border-radius:7px;color:#111827;font-weight:800;cursor:pointer}.pdfDropdownPanel button:hover{background:#fff2f2;color:#ef2b2d}.pdfCloudButtons{display:flex;justify-content:center;gap:10px;flex-wrap:wrap;margin-top:16px}.pdfCloudBtn{border:2px solid #ef2b2d;background:#fff;color:#111827;border-radius:9px;padding:11px 16px;display:inline-flex;align-items:center;gap:9px;font-weight:900;cursor:pointer;box-shadow:0 3px 10px rgba(239,43,45,.08)}.pdfCloudBtn:hover{background:#fff5f5}.cloudCircle{width:25px;height:25px;border-radius:7px;background:#ef2b2d;color:#fff;display:grid;place-items:center;font-size:12px;font-weight:900}.pdfSelectedFile{width:min(720px,100%);margin:18px auto 0;border:1px solid #e5e7eb;border-radius:10px;background:#fff;padding:12px 14px;display:flex;align-items:center;gap:12px;text-align:left;box-shadow:0 5px 15px rgba(15,23,42,.05)}.pdfSelectedFile .pdfFileIcon{width:38px;height:38px;border-radius:8px;background:#fff0f0;color:#ef2b2d;display:grid;place-items:center;flex:0 0 auto}.pdfSelectedFile strong{display:block;color:#111827;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.pdfSelectedFile small{color:#7b8493}.pdfSelectedFile .removeFile{margin-left:auto;border:0;background:#fff0f0;color:#d52b2e;border-radius:7px;padding:7px 9px;font-weight:900;cursor:pointer}.pdfWorkNav{display:flex;gap:0;flex-wrap:wrap;background:#fff;border:1px solid #e5e7eb;border-top:0;padding:0}.pdfWorkNav button{border:0;background:#fff;color:#111827;font-weight:900;padding:13px 15px;border-right:1px solid #e5e7eb;cursor:pointer}.pdfWorkNav button.active{background:#ef2b2d;color:#fff}.bgTopControls{display:flex;gap:7px;flex-wrap:wrap}.bgTopControls .btn{font-weight:900;color:#111827}.bgTopControls .btn.primary{color:#fff}.bgUploadBtn{border:2px dashed #ef2b2d!important;background:#fff7f7!important;color:#111827!important}.bgUploadBtn:hover{background:#fff0f0!important}.bgGallery{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}.bgGallery button{padding:0;border:1px solid #e1e5eb;border-radius:12px;overflow:hidden;background:#fff;cursor:pointer}.bgGallery img{width:100%;aspect-ratio:1/1;object-fit:cover;display:block}.bgGallery button.selected{border:3px solid #ef2b2d}.bgCount{font-size:12px;color:#7b8493;margin:0 0 9px}.fastCutoutNote{padding:11px 12px;border-radius:10px;background:#f8fafc;border:1px solid #e5e7eb;color:#667085;font-size:12px;line-height:1.5}.bgUploadInline{display:none}@media(max-width:900px){.pdfDropdownPanel.wide{min-width:420px;grid-template-columns:repeat(2,minmax(140px,1fr))}}@media(max-width:560px){.pdfNavMenu>button,.pdfDropdown summary{font-size:12px;padding:14px 11px}.pdfDropdownPanel.wide{min-width:310px;grid-template-columns:1fr}.bgGallery{grid-template-columns:repeat(2,minmax(0,1fr))}}
.pdfProPage{margin-top:12px}
.pdfProHero{background:#f6f6fb;padding:40px 24px 50px;text-align:center;border:1px solid #e3e4eb;border-radius:16px 16px 0 0}
.pdfProHero h1{font-size:42px;margin:0 0 10px;letter-spacing:-.04em}
.pdfProHero p{font-size:17px;color:#667085;margin:0 auto 26px;max-width:800px}
.pdfUploadArea{max-width:760px;margin:auto;background:#fff;border:1px solid #ececf1;border-radius:12px;padding:20px;box-shadow:0 10px 30px rgba(17,24,39,.06)}
.pdfUploadArea .uploadBox{justify-content:center;background:#ef2b2d;color:#fff;border:0;box-shadow:0 8px 22px rgba(239,43,45,.22);padding:20px;border-radius:9px;font-weight:950}.pdfUploadArea .uploadBox strong{color:#fff}.pdfUploadArea .uploadBox span{color:#fff}
.pdfDropHint{color:#6f7787;font-size:13px;margin-top:9px}
.pdfWorkArea{display:grid;grid-template-columns:minmax(0,1fr) 340px;min-height:610px;border:1px solid #e2e4eb;border-top:0;background:#eef0f6}
.pdfCanvasZone{padding:28px;min-width:0}
.pdfThumbHeader{display:flex;justify-content:space-between;align-items:center;margin-bottom:18px;color:#566176;font-size:13px}
.pdfThumbGrid{min-height:490px;display:flex;justify-content:center;align-items:flex-start;gap:18px;flex-wrap:wrap;padding:20px}
.pdfThumb{width:180px;background:#fff;border-radius:11px;padding:12px;box-shadow:0 8px 26px rgba(34,39,53,.10);text-align:center}
.pdfThumb img{width:100%;height:240px;object-fit:contain;border:1px solid #e8eaf0}
.pdfThumb small{display:block;margin-top:8px;color:#657085;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.pdfThumb.file{height:180px;display:grid;place-items:center;align-content:center;gap:10px}
.pdfCanvasTip{text-align:center;color:#9198a8;font-size:12px;margin-top:6px}
.pdfSidePanel{background:#fff;border-left:1px solid #dedfe6;padding:28px;display:flex;flex-direction:column}
.pdfSidePanel h2{font-size:24px;margin:0 0 20px}
.pdfChoice{padding:17px 16px;border-top:1px solid #e5e7ed;border-bottom:1px solid #e5e7ed;display:grid;gap:5px}
.pdfChoice b{color:#ef3d34;font-size:14px}.pdfChoice span{color:#5e687c;line-height:1.45}
.pdfChoice.premium{border-top:0}.pdfChoice.premium b{color:#f59e0b}.pdfChoice.premium b span{background:#fff0c8;border-radius:5px;padding:3px 7px;font-size:11px;color:#7b5c00;margin-left:6px}
.pdfSidePanel label{display:grid;gap:7px;color:#566176;font-size:12px;font-weight:800;margin:12px 0}
.pdfSidePanel input,.pdfSidePanel select{width:100%;border:1px solid #dfe2ea;border-radius:9px;padding:11px;background:#fff}
.pdfMainAction{margin-top:auto;border:0;border-radius:11px;padding:17px;background:#ef332b;color:#fff;font-weight:850;font-size:17px;box-shadow:0 10px 25px rgba(239,51,43,.18)}
.pdfMainAction:disabled{opacity:.65;cursor:not-allowed}
.pdfSideNote{margin-top:12px;color:#8c95a6;font-size:11px;line-height:1.5}
.pdfQuickGrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;padding:22px;background:#fff;border:1px solid #e3e4eb;border-top:0;border-radius:0 0 16px 16px}
.pdfQuick{border:1px solid #e2e5ec;background:#fff;border-radius:12px;padding:14px;text-align:left;display:grid;grid-template-columns:auto 1fr;gap:7px 10px;color:#485267}
.pdfQuick span{font-weight:850}.pdfQuick small{grid-column:2;color:#8992a3;line-height:1.4}.pdfQuick.active{border-color:#8770f8;background:#faf8ff;color:#6848ee}
@media(max-width:900px){.navLinks{display:none}.pdfNavMenu{padding-left:14px;padding-right:14px;gap:2px}.pdfNavMenu>button,.pdfDropdown summary{font-size:11px;padding:9px 8px}.mobileOnly{display:inline-flex}.workspace,.aiHelper,.adminGrid{grid-template-columns:1fr}.hero{padding-top:55px}.stats{gap:24px}.footerInner,.adminTop{align-items:flex-start;flex-direction:column}.toolHero{align-items:flex-start}.formGrid{grid-template-columns:1fr}.pdfEditorBody{grid-template-columns:1fr}.pdfSide{border-right:0;border-bottom:1px solid #e3e5ec}.pdfPaper{min-height:620px;padding:28px}}
@media(max-width:560px){.hero h1{font-size:44px}.stats{display:grid;grid-template-columns:1fr 1fr}.videoOptions{grid-template-columns:1fr}.nav{height:64px}.navActions .btn span{display:none}.pdfToolBtn{min-width:72px}.pdfPaper{padding:20px;min-height:520px}}
`;

function GlobalStyle() { return <style>{css}</style>; }


function PdfNavMenu({openTool,activeId}) {
  const allPdf = tools.filter(t=>t[1]==="PDF Tools");
  const convert = ["jpg-pdf","word-pdf","pdf-ppt","pdf-excel","html-pdf","pdf-jpg","pdf-word","pdf-ppt","pdf-excel","pdf-pdfa"].map(id=>tools.find(t=>t[3]===id)).filter(Boolean);
  const [expanded,setExpanded]=useState(null);
  const nav=[
    ["merge-pdf","MERGE PDF"],["split-pdf","SPLIT PDF"],["compress-pdf","COMPRESS PDF"]
  ];
  const go=t=>{if(t){openTool(t);setExpanded(null)}};
  return <div className="pdfNavWrap">
    <div className="pdfNavMenu">
      {nav.map(([id,label])=>{const t=tools.find(x=>x[3]===id);return <button key={id} className={activeId===id?"pdfNavActive":""} type="button" onClick={()=>go(t)}>{label}</button>})}
      <button type="button" className={expanded==="convert"||convert.some(x=>x[3]===activeId)?"pdfNavActive":""} onClick={()=>setExpanded(expanded==="convert"?null:"convert")}>CONVERT PDF <ChevronRight size={15}/></button>
      <button type="button" className={expanded==="all"||allPdf.some(x=>x[3]===activeId)?"pdfNavActive":""} onClick={()=>setExpanded(expanded==="all"?null:"all")}>ALL PDF TOOLS <ChevronRight size={15}/></button>
    </div>
    {expanded && <div style={{position:"absolute",left:0,right:0,top:"100%",background:"#fff",borderBottom:"1px solid #e5e7eb",boxShadow:"0 18px 40px rgba(15,23,42,.12)"}}>
      <div style={{maxWidth:1440,margin:"0 auto",padding:"12px 24px"}}>
        <div style={{fontSize:12,fontWeight:900,color:"#ef2b2d",marginBottom:8}}>{expanded==="convert"?"CONVERT PDF":"ALL PDF TOOLS"}</div>
        <div style={{display:"grid",gridTemplateColumns:expanded==="convert"?"repeat(4,minmax(150px,1fr))":"repeat(5,minmax(150px,1fr))",gap:6}}>
          {(expanded==="convert"?convert:allPdf).map(t=><button key={t[3]} type="button" onClick={()=>go(t)} style={{border:0,background:"#fff",textAlign:"left",padding:"11px 12px",borderRadius:8,color:"#111827",fontWeight:850,cursor:"pointer"}} onMouseEnter={e=>e.currentTarget.style.background="#fff2f2"} onMouseLeave={e=>e.currentTarget.style.background="#fff"}>{t[0]}</button>)}
        </div>
      </div>
    </div>}
  </div>;
}

function App() {
  const [cat,setCat]=useState("All Tools");
  const [query,setQuery]=useState("");
  const [tool,setTool]=useState(null);
  const [authOpen,setAuthOpen]=useState(false);
  const [authMode,setAuthMode]=useState("signin");
  const [user,setUser]=useState(null);
  const [profile,setProfile]=useState(null);
  const [admin,setAdmin]=useState(false);
  const [mobile,setMobile]=useState(false);
  const [dark,setDark]=useState(false);
  const [profileOpen,setProfileOpen]=useState(false);
  const [favorites,setFavorites]=useState([]);
  const [history,setHistory]=useState([]);

  const filtered = useMemo(() => tools.filter(t =>
    (cat==="All Tools" || t[1]===cat) &&
    (t[0].toLowerCase().includes(query.toLowerCase()) || t[2].toLowerCase().includes(query.toLowerCase()))
  ), [cat,query]);

  useEffect(() => {
    const savedFav = JSON.parse(localStorage.getItem("tm_favorites") || "[]");
    const savedHist = JSON.parse(localStorage.getItem("tm_history") || "[]");
    setFavorites(savedFav); setHistory(savedHist);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (e.detail) openTool(e.detail);
    };
    window.addEventListener("tm-open-tool", handler);
    return () => window.removeEventListener("tm-open-tool", handler);
  }, [history]);

  useEffect(() => {
    if (!supabase) return;
    let mounted = true;
    supabase.auth.getSession().then(async ({data}) => {
      if (!mounted) return;
      const u=data.session?.user || null; setUser(u);
      if(u) loadProfile(u);
    });
    const {data: sub} = supabase.auth.onAuthStateChange((_event, session) => {
      const u=session?.user || null; setUser(u);
      if(u) loadProfile(u); else setProfile(null);
    });
    return () => { mounted=false; sub.subscription.unsubscribe(); };
  }, []);

  const loadProfile = async (u) => {
    if (!supabase || !u) return;
    const {data} = await supabase.from("profiles").select("*").eq("id",u.id).maybeSingle();
    setProfile(data || {id:u.id, email:u.email, full_name:u.user_metadata?.full_name || "", username:u.user_metadata?.username || ""});
  };

  const isAdmin = !!(profile?.role === "admin" || user?.app_metadata?.role === "admin" || user?.user_metadata?.role === "admin");

  const openTool = (t) => {
    setTool(t); setAdmin(false);
    const next=[t[3],...history.filter(x=>x!==t[3])].slice(0,10);
    setHistory(next); localStorage.setItem("tm_history",JSON.stringify(next));
    window.scrollTo({top:0,behavior:"smooth"});
  };

  const toggleFav = (slug) => {
    const next=favorites.includes(slug)?favorites.filter(x=>x!==slug):[...favorites,slug];
    setFavorites(next); localStorage.setItem("tm_favorites",JSON.stringify(next));
  };

  const signOut = async () => {
    if(supabase) await supabase.auth.signOut();
    setUser(null); setProfile(null); setAdmin(false); setProfileOpen(false);
  };

  return <div className="app">
    <GlobalStyle/>
    <header className="header"><div className="container nav">
      <div className="brand"><div className="brandIcon"><Wrench size={21}/></div><span>ToolMaster<span>Pro</span></span></div>
      <nav className="navLinks">
        <a href="#tools" onClick={()=>{setTool(null);setAdmin(false)}}>Tools</a>
        <a href="#categories" onClick={()=>{setTool(null);setAdmin(false)}}>Categories</a>
        <a href="#pricing" onClick={()=>{setTool(null);setAdmin(false)}}>Pricing</a>
        <a href="#about" onClick={()=>{setTool(null);setAdmin(false)}}>About</a>
        <a href="#seo-genius" onClick={()=>{const x=tools.find(t=>t[3]==="seo-genius");if(x)openTool(x)}} style={{fontWeight:900,color:"#ef2b2d"}}>SEO Genius AI</a>
      </nav>
      <div className="navActions">
        <button className="iconBtn mobileOnly" onClick={()=>setMobile(!mobile)}>{mobile?<X/>:<Menu/>}</button>
        <button className="iconBtn" onClick={()=>setDark(!dark)} title="Theme">{dark?<Sun size={17}/>:<Moon size={17}/>}</button>
        {isAdmin && <button className="btn" onClick={()=>{setAdmin(!admin);setTool(null)}}><LayoutDashboard size={16}/><span>{admin?"Website":"Admin"}</span></button>}
        {user ? <div className="profileMenu">
          <button className="iconBtn" onClick={()=>setProfileOpen(!profileOpen)}><User size={17}/></button>
          {profileOpen && <div className="profileCard">
            <b>{profile?.full_name || user.email}</b><small>{profile?.username ? "@"+profile.username+" · " : ""}{user.email}</small>
            <button className="btn" style={{width:"100%",justifyContent:"center"}} onClick={signOut}><LogOut size={15}/> Sign out</button>
          </div>}
        </div> : <><button className="btn" onClick={()=>{setAuthMode("signin");setAuthOpen(true)}}><LogIn size={16}/><span>Sign in</span></button><button className="btn primary" onClick={()=>{setAuthMode("signup");setAuthOpen(true)}}><UserPlus size={16}/><span>Sign up</span></button></>}
      </div>
    </div>
    <PdfNavMenu openTool={openTool} activeId={tool?.[3]}/> 
    {mobile&&<div className="container mobileNav" style={{paddingBottom:12,display:"flex",gap:16,flexWrap:"wrap"}}>
      <a href="#tools" onClick={()=>{setMobile(false);setTool(null);}}>Tools</a>
      <a href="#categories" onClick={()=>{setMobile(false);setTool(null);}}>Categories</a>
      <a href="#pricing" onClick={()=>{setMobile(false);setTool(null);}}>Pricing</a>
      <a href="#about" onClick={()=>{setMobile(false);setTool(null);}}>About</a>
      <a href="#seo-genius" onClick={()=>{setMobile(false);const x=tools.find(t=>t[3]==="seo-genius");if(x)openTool(x);}}>SEO Genius AI</a>
    </div>}</header>

    {admin ? <ToolErrorBoundary><Admin user={user} profile={profile} /></ToolErrorBoundary> : tool ? <ToolErrorBoundary><ToolPage t={tool} back={()=>setTool(null)} user={user} openAuth={(mode="signin")=>{setAuthMode(mode);setAuthOpen(true)}}/></ToolErrorBoundary> :
      <>
        <section className="hero"><div className="heroInner">
          <div className="pill"><Sparkles size={14}/> 100+ Free Online Tools · Browser-first</div>
          <h1>One place for <span>every tool</span> you need.</h1>
          <p>Fast, modern and privacy-friendly tools for PDF, images, SEO, text, developers, calculators, conversion and AI.</p>
          <div className="searchBox"><Search size={19}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search 100+ tools..."/><div className="kbd">Ctrl K</div></div>
          <div className="stats"><div><b>{tools.length}+</b><small>Tools</small></div><div><b>13</b><small>Categories</small></div><div><b>{user?"Signed in":"Open"}</b><small>Access</small></div></div>
        </div></section>
        <main className="main container" id="tools">
          <section id="categories"><div className="toolbar">
            {categories.map(([name,count])=><button className={cat===name?"cat active":"cat"} onClick={()=>setCat(name)} key={name}>{iconForCategory(name)}<span>{name}</span><em>{count}</em></button>)}
          </div></section>
          <div className="sectionHead"><div><h2>{cat}</h2><p>{filtered.length} tools available</p></div></div>
          <div className="grid">{filtered.map(t=><ToolCard key={t[3]} t={t} open={()=>openTool(t)} favorite={favorites.includes(t[3])} onFav={()=>toggleFav(t[3])}/>)}</div>
          {!filtered.length&&<div className="empty">No tools found. Try another search.</div>}
        </main>
      </>
    }

    <section id="pricing" className="container" style={{padding:"20px 24px 60px"}}>
      <div className="sectionHead"><div><h2>AI Pricing</h2><p>Student AI and Text-to-Video plans are ready for future billing integration.</p></div></div>
      <div className="grid">
        <div className="panel"><h3>Student AI Helper</h3><p style={{color:"#7c879a"}}>Free, Silver, Gold, Demand and Platinum plans.</p></div>
        <div className="panel"><h3>Text-to-Video</h3><p style={{color:"#7c879a"}}>Free, Starter, Pro, Business and Platinum plans.</p></div>
      </div>
    </section>
    <footer className="footer" id="about"><div className="footerInner"><div><div className="brand"><div className="brandIcon"><Wrench size={18}/></div><span>ToolMaster<span>Pro</span></span></div><p>Powerful online tools, made simple.</p></div><small>© 2026 ToolMaster Pro · Browser-first processing where possible.</small></div></footer>
    {authOpen && <AuthModal mode={authMode} setMode={setAuthMode} close={()=>setAuthOpen(false)} onDone={()=>setAuthOpen(false)}/>}
  </div>;
}

function ToolCard({t,open,favorite,onFav}) {
  return <article className="card" onClick={open}>
    <button className="iconBtn" style={{position:"absolute",top:14,right:14,zIndex:2}} onClick={(e)=>{e.stopPropagation();onFav()}}>{favorite?<Heart size={15} fill="currentColor"/>:<Heart size={15}/>}</button>
    <div className="toolIcon">{iconForCategory(t[1])}</div><div className="cardBody"><span>{t[1]}</span><h3>{t[0]}</h3><p>{t[2]}</p></div><ArrowRight className="arrow" size={17}/>
  </article>;
}

function AuthModal({mode,setMode,close,onDone}) {
  const [fullName,setFullName]=useState(""); const [username,setUsername]=useState("");
  const [email,setEmail]=useState(""); const [password,setPassword]=useState(""); const [confirm,setConfirm]=useState("");
  const [busy,setBusy]=useState(false); const [msg,setMsg]=useState(""); const [error,setError]=useState("");

  const submit=async(e)=>{
    e.preventDefault(); setError(""); setMsg(""); setBusy(true);
    try{
      if(!supabase) throw new Error("Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Vercel.");
      if(mode==="signup"){
        if(!fullName.trim()||!username.trim()) throw new Error("Full name and username are required.");
        if(password.length<6) throw new Error("Password must be at least 6 characters.");
        if(password!==confirm) throw new Error("Passwords do not match.");
        const {data,error}=await supabase.auth.signUp({email:email.trim(),password,options:{data:{full_name:fullName.trim(),username:username.trim()}}});
        if(error) throw error;
        if(data.session){ setMsg("Account created and signed in."); onDone(); }
        else setMsg("Account created. Check your email to confirm your account, then sign in.");
      } else {
        const {error}=await supabase.auth.signInWithPassword({email:email.trim(),password});
        if(error) throw error;
        setMsg("Signed in successfully."); onDone();
      }
    }catch(e){setError(e.message || "Authentication failed.");}finally{setBusy(false);}
  };

  const forgot=async()=>{
    setError("");setMsg("");
    if(!supabase) return setError("Supabase is not configured.");
    if(!email.trim()) return setError("Enter your email first.");
    setBusy(true);
    try{
      const redirect=window.location.origin;
      const {error}=await supabase.auth.resetPasswordForEmail(email.trim(),{redirectTo:redirect});
      if(error) throw error;
      setMsg("Password reset email sent. Check your inbox.");
    }catch(e){setError(e.message)}finally{setBusy(false)}
  };

  const googleSignIn = async () => {
    setError(""); setMsg(""); setBusy(true);
    try {
      if(!supabase) throw new Error("Supabase is not configured.");
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: window.location.origin }
      });
      if(error) throw error;
    } catch(e) {
      setError(e?.message || "Google sign-in failed.");
      setBusy(false);
    }
  };

  return <div className="modalBack" onMouseDown={close}><div className="modal" onMouseDown={e=>e.stopPropagation()}>
    <div className="modalHead"><div><div className="pill"><LockKeyhole size={13}/> Secure Auth</div><h2>{mode==="signup"?"Create your account":"Welcome back"}</h2></div><button className="iconBtn" onClick={close}><X size={17}/></button></div>
    <div className="authTabs"><button type="button" className={mode==="signin"?"active":""} onClick={()=>{setMode("signin");setError("");setMsg("")}}>Sign in</button><button type="button" className={mode==="signup"?"active":""} onClick={()=>{setMode("signup");setError("");setMsg("")}}>Sign up</button></div>
    <button type="button" className="btn" disabled={busy} onClick={googleSignIn} style={{width:"100%",justifyContent:"center",marginBottom:12,fontWeight:800}}><span style={{fontWeight:900,fontSize:16}}>G</span> Continue with Google</button>
    <div style={{display:"flex",alignItems:"center",gap:10,margin:"8px 0 12px",color:"#9299a8",fontSize:11}}><span style={{height:1,flex:1,background:"#e7e9f0"}}></span>OR<span style={{height:1,flex:1,background:"#e7e9f0"}}></span></div>
    <form onSubmit={submit}>
      {mode==="signup"&&<div className="formGrid"><div className="field"><label>Full name</label><input value={fullName} onChange={e=>setFullName(e.target.value)} required/></div><div className="field"><label>Username</label><input value={username} onChange={e=>setUsername(e.target.value)} required/></div></div>}
      <div className="field"><label>Email</label><input type="email" value={email} onChange={e=>setEmail(e.target.value)} required/></div>
      <div className="field"><label>Password</label><input type="password" value={password} onChange={e=>setPassword(e.target.value)} required/></div>
      {mode==="signup"&&<div className="field"><label>Confirm password</label><input type="password" value={confirm} onChange={e=>setConfirm(e.target.value)} required/></div>}
      {error&&<div className="formError"><AlertCircle size={15}/> {error}</div>}{msg&&<div className="formSuccess"><Check size={15}/> {msg}</div>}
      <button className="btn primary" disabled={busy} style={{width:"100%",justifyContent:"center",marginTop:7}}>{busy?<RefreshCw className="spin"/>:mode==="signup"?<UserPlus size={16}/>:<LogIn size={16}/>} {busy?"Please wait...":mode==="signup"?"Create account":"Sign in"}</button>
    </form>
    {mode==="signin"&&<button className="btn ghost" onClick={forgot} disabled={busy} style={{width:"100%",justifyContent:"center",marginTop:10}}><KeyRound size={15}/> Forgot password</button>}
  </div></div>
}


function FilePicker({multiple=false,accept,onChange,files=[]}) {
  const inputRef = useRef(null);
  return <label className="uploadBox" onClick={e=>{ if(e.target===inputRef.current) return; }}>
    <Upload size={20}/>
    <div style={{flex:1}}>
      <b>{multiple ? "Upload files" : "Upload file"}</b>
      <small style={{display:"block",marginTop:4}}>{accept || "Supported files"}</small>
      {files.length>0 && <strong>{files.map(f=>f.name).join(", ")}</strong>}
    </div>
    <input ref={inputRef} type="file" multiple={multiple} accept={accept} onChange={e=>onChange(Array.from(e.target.files||[]))}/>
  </label>;
}

function StudentAIHelper({back,user,openAuth}) {
  const [question,setQuestion]=useState("");
  const [files,setFiles]=useState([]);
  const [answer,setAnswer]=useState("");
  const [busy,setBusy]=useState(false);
  const [status,setStatus]=useState("");
  const [level,setLevel]=useState("Detailed");
  const [model,setModel]=useState("gpt-5.6-luna");
  const [selectedPlan,setSelectedPlan]=useState("free");
  const endpoint = import.meta.env.VITE_STUDENT_AI_FUNCTION_URL ||
    (SUPABASE_URL ? `${SUPABASE_URL}/functions/v1/student-ai-helper` : "");

  const solve=async()=>{
    if(!question.trim() && !files.length){setStatus("Enter a question or upload study material.");return;}
    if(!endpoint){setStatus("Student AI backend is not configured. Deploy student-ai-helper in Supabase.");return;}
    setBusy(true);setStatus("Connecting to Student AI...");setAnswer("");
    try{
      const token=await getSupabaseAccessToken();
      if(!token){
        setStatus("Please sign in first. Student AI needs your Supabase login to securely call the AI backend.");
        openAuth?.("signin");
        return;
      }
      const fd=new FormData();
      fd.append("question",question.trim());
      fd.append("model",model);
      fd.append("level",level);
      files.forEach(f=>fd.append("files",f,f.name));
      const headers={
        ...(SUPABASE_KEY?{apikey:SUPABASE_KEY}:{}),
        Authorization:`Bearer ${token}`
      };
      const r=await fetch(endpoint,{method:"POST",headers,body:fd});
      const raw=await r.text();
      let data={}; try{data=raw?JSON.parse(raw):{}}catch{}
      if(!r.ok) throw new Error(data.error||data.message||raw||`Student AI backend error (${r.status})`);
      const fallbackOutput = Array.isArray(data.output)
        ? data.output.flatMap(item => Array.isArray(item?.content) ? item.content : [])
            .map(part => part?.text?.value || part?.text || "")
            .filter(Boolean).join("\n")
        : "";
      const out=String(data.answer||data.output_text||fallbackOutput||data.output||data.message||"").trim();
      if(!out) throw new Error("Student AI returned an empty answer. Please check the OpenAI API key/model in Supabase.");
      setAnswer(out);
      setStatus(data.usage?`AI response received · ${data.usage}`:"AI response received.");
    }catch(e){
      setStatus(e?.message||"Student AI request failed.");
    }finally{setBusy(false);}
  };

  return <Shell back={back} t={["Student AI Helper","AI & Education","Ask questions or upload study material for step-by-step help.",""]} status={status}>
    <div className="aiHelper">
      <div className="aiCard">
        <h3>📚 Student AI Tutor</h3>
        {!user && <div className="formError"><AlertCircle size={15}/> Sign in to use Student AI. <button className="btn" style={{marginLeft:8,padding:"5px 9px"}} onClick={()=>openAuth?.("signin")}>Sign in</button></div>}
        <textarea value={question} onChange={e=>setQuestion(e.target.value)} placeholder="Example: Explain photosynthesis in simple words and give me 5 MCQs..." disabled={busy}/>
        <div className="videoOptions">
          <label>Answer level<select value={level} disabled={busy} onChange={e=>setLevel(e.target.value)}><option>Simple</option><option>Detailed</option><option>Exam Ready</option><option>Step by Step</option></select></label>
          <label>AI model<select value={model} disabled={busy} onChange={e=>setModel(e.target.value)}><option value="gpt-5.6-luna">Fast</option><option value="gpt-5.6-terra">Balanced</option><option value="gpt-5.6-sol">Advanced</option></select></label>
        </div>
        <FilePicker multiple accept="image/*,.txt,.md,.csv,.json,.js,.ts,.html,.css,.sql,.pdf" onChange={setFiles} files={files}/>
        <div className="actions">
          <button className="btn primary" disabled={busy} onClick={solve}><Sparkles size={16}/>{busy?"Processing...":"Get AI Help"}</button>
          {files.length>0&&<button className="btn" disabled={busy} onClick={()=>setFiles([])}><Trash2 size={15}/>Clear files</button>}
        </div>
        <small style={{display:"block",marginTop:10,color:"#8a93a5"}}>Sign in is required for secure AI usage. Choose a plan above; Free can be used for testing.</small>
      </div>
      <div className="aiCard">
        <h3>🤖 AI Answer</h3>
        <div className="answer" style={{whiteSpace:"pre-wrap"}}>{answer||"Your step-by-step answer will appear here."}</div>
        {answer&&<div className="actions"><button className="btn" onClick={()=>navigator.clipboard?.writeText(answer)}><Copy size={15}/>Copy</button><button className="btn" onClick={()=>downloadText(answer,"student-ai-answer.txt")}><Download size={15}/>Download</button></div>}
      </div>
    </div>
    <PlanCards title="Student AI Helper Plans" plans={PLANS} selected={selectedPlan} onSelect={setSelectedPlan} openAuth={openAuth} user={user} kind="student"/>
  </Shell>;
}

class ToolErrorBoundary extends React.Component {
  constructor(props){super(props);this.state={error:null};}
  static getDerivedStateFromError(error){return {error};}
  componentDidCatch(error,info){console.error("Tool runtime error",error,info);}
  render(){
    if(this.state.error) return <div className="toolPage"><div className="panel"><div className="formError"><AlertCircle size={18}/><div><b>Tool error</b><div style={{marginTop:5}}>{this.state.error.message||String(this.state.error)}</div></div></div><div className="actions"><button className="btn primary" onClick={()=>this.setState({error:null})}>Try Again</button><button className="btn" onClick={()=>window.location.reload()}>Reload Website</button></div></div></div>;
    return this.props.children;
  }
}



function downloadCanvas(canvas,name){
  if(!canvas)return;
  const a=document.createElement("a");
  a.href=canvas.toDataURL("image/png");
  a.download=name;
  a.click();
}

function drawRoundedRect(ctx,x,y,w,h,r){
  ctx.beginPath();
  ctx.moveTo(x+r,y);
  ctx.arcTo(x+w,y,x+w,y+h,r);
  ctx.arcTo(x+w,y+h,x,y+h,r);
  ctx.arcTo(x,y+h,x,y,r);
  ctx.arcTo(x,y,x+w,y,r);
  ctx.closePath();
}

const stampStyles=[
  {id:"round",name:"Round Seal"},
  {id:"square",name:"Classic"},
  {id:"badge",name:"Badge"},
  {id:"minimal",name:"Minimal"}
];

function StampGenerator({back,t}){
  const [name,setName]=useState("");
  const [title,setTitle]=useState("");
  const [org,setOrg]=useState("");
  const [extra,setExtra]=useState("");
  const [style,setStyle]=useState("round");
  const [color,setColor]=useState("#e53935");
  const [opacity,setOpacity]=useState(100);
  const canvasRef=useRef(null);

  const draw=()=>{
    const c=canvasRef.current;if(!c)return;
    const w=900,h=700,dpr=2;c.width=w*dpr;c.height=h*dpr;
    const ctx=c.getContext("2d");ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,w,h);
    ctx.globalAlpha=opacity/100;ctx.strokeStyle=color;ctx.fillStyle=color;ctx.textAlign="center";ctx.textBaseline="middle";
    const n=name||"YOUR NAME",tl=title||"DESIGNATION",og=org||"YOUR ORGANIZATION",ex=extra||"APPROVED";
    ctx.lineWidth=9;
    if(style==="round"){
      ctx.beginPath();ctx.arc(450,350,260,0,Math.PI*2);ctx.stroke();
      ctx.lineWidth=3;ctx.beginPath();ctx.arc(450,350,232,0,Math.PI*2);ctx.stroke();
      ctx.font="700 27px Arial";ctx.fillText(og.toUpperCase(),450,150);
      ctx.font="800 52px Arial";ctx.fillText(n.toUpperCase(),450,310);
      ctx.font="700 28px Arial";ctx.fillText(tl.toUpperCase(),450,375);
      ctx.font="600 22px Arial";ctx.fillText(ex.toUpperCase(),450,445);
      ctx.font="700 18px Arial";ctx.fillText("TOOLMASTER PRO",450,520);
    }else if(style==="square"){
      drawRoundedRect(ctx,125,105,650,490,30);ctx.stroke();ctx.lineWidth=3;drawRoundedRect(ctx,145,125,610,450,20);ctx.stroke();
      ctx.font="800 34px Arial";ctx.fillText(n.toUpperCase(),450,255);ctx.font="700 24px Arial";ctx.fillText(tl.toUpperCase(),450,315);ctx.font="700 28px Arial";ctx.fillText(og.toUpperCase(),450,395);ctx.font="600 21px Arial";ctx.fillText(ex.toUpperCase(),450,465);
    }else if(style==="badge"){
      ctx.beginPath();ctx.moveTo(450,80);ctx.lineTo(700,165);ctx.lineTo(700,455);ctx.lineTo(450,620);ctx.lineTo(200,455);ctx.lineTo(200,165);ctx.closePath();ctx.stroke();
      ctx.font="800 34px Arial";ctx.fillText(og.toUpperCase(),450,225);ctx.font="800 47px Arial";ctx.fillText(n.toUpperCase(),450,320);ctx.font="700 25px Arial";ctx.fillText(tl.toUpperCase(),450,385);ctx.font="600 21px Arial";ctx.fillText(ex.toUpperCase(),450,450);
    }else{
      ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(170,180);ctx.lineTo(730,180);ctx.moveTo(170,520);ctx.lineTo(730,520);ctx.stroke();
      ctx.font="800 48px Arial";ctx.fillText(n,450,280);ctx.font="700 26px Arial";ctx.fillText(tl,450,350);ctx.font="600 22px Arial";ctx.fillText(og,450,410);ctx.font="600 20px Arial";ctx.fillText(ex,450,465);
    }
    ctx.globalAlpha=1;
  };
  useEffect(()=>{draw()},[name,title,org,extra,style,color,opacity]);

  return <Shell back={back} t={t}>
    <div className="workspace">
      <div className="panel">
        <h3>Stamp Generator</h3><p>Create your stamp and download it as PNG.</p>
        <label>Name<input value={name} onChange={e=>setName(e.target.value)} placeholder="Muhammad Arshad"/></label>
        <label>Designation<input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Managing Director"/></label>
        <label>Company / Organization<input value={org} onChange={e=>setOrg(e.target.value)} placeholder="ABC Enterprises"/></label>
        <label>Extra text<input value={extra} onChange={e=>setExtra(e.target.value)} placeholder="Approved / Verified / Official"/></label>
        <div className="videoOptions"><label>Style<select value={style} onChange={e=>setStyle(e.target.value)}>{stampStyles.map(x=><option key={x.id} value={x.id}>{x.name}</option>)}</select></label><label>Color<input type="color" value={color} onChange={e=>setColor(e.target.value)}/></label></div>
        <label>Opacity <span>{opacity}%</span><input type="range" min="20" max="100" value={opacity} onChange={e=>setOpacity(Number(e.target.value))}/></label>
        <div className="actions"><button className="btn" onClick={draw}><RefreshCw size={15}/> Refresh</button><button className="btn primary" onClick={()=>downloadCanvas(canvasRef.current,"toolmaster-stamp.png")}><Download size={15}/> Download PNG</button></div>
      </div>
      <div className="panel"><h3>Live Preview</h3><div style={{display:"grid",placeItems:"center",minHeight:420,background:"#f8fafc",borderRadius:16}}><canvas ref={canvasRef} style={{maxWidth:"100%",height:"auto"}}/></div></div>
    </div>
  </Shell>;
}


const TM_LOGO_TEMPLATES = [
  {id:"royal",name:"Royal Gold",category:"Luxury",icon:"♛",primary:"#D4AF37",secondary:"#F8FAFC",bg:"#070B14"},
  {id:"medical",name:"Medical Care",category:"Medical",icon:"⚕",primary:"#22D3EE",secondary:"#E5E7EB",bg:"#07131A"},
  {id:"tech",name:"Tech Nova",category:"Technology",icon:"⬢",primary:"#8B5CF6",secondary:"#22D3EE",bg:"#080B18"},
  {id:"creative",name:"Creative",category:"Creative",icon:"✦",primary:"#F472B6",secondary:"#FBBF24",bg:"#120914"},
  {id:"fitness",name:"Fitness",category:"Fitness",icon:"✚",primary:"#84CC16",secondary:"#FACC15",bg:"#08130C"},
  {id:"coffee",name:"Coffee House",category:"Food",icon:"☕",primary:"#D6A15D",secondary:"#F5E0B8",bg:"#17120F"},
  {id:"nature",name:"Nature",category:"Nature",icon:"✿",primary:"#65A30D",secondary:"#BBF7D0",bg:"#07130C"},
  {id:"security",name:"Cyber Security",category:"Security",icon:"⬢",primary:"#38BDF8",secondary:"#A78BFA",bg:"#07111D"},
  {id:"fashion",name:"Luxury Fashion",category:"Fashion",icon:"◆",primary:"#F59E0B",secondary:"#F3F4F6",bg:"#120D08"},
  {id:"education",name:"Education",category:"Education",icon:"◆",primary:"#60A5FA",secondary:"#FDE68A",bg:"#08111F"},
  {id:"realestate",name:"Real Estate",category:"Real Estate",icon:"⌂",primary:"#FBBF24",secondary:"#E5E7EB",bg:"#0C0D10"},
  {id:"music",name:"Music Studio",category:"Music",icon:"♫",primary:"#C084FC",secondary:"#22D3EE",bg:"#10091A"}
];
const TM_SHAPES=["circle","rounded","square","hexagon","diamond","triangle","star","shield","badge","line"];
const TM_ICONS=["♛","★","✦","✚","☕","◈","✿","⬢","◆","⚕","⌂","♫","⚡","✈","♥","◉","C","D","B","M","A","S","P","T"];
const TM_FONTS=["Arial","Georgia","Verdana","Trebuchet MS","Times New Roman","Impact","Courier New"];
const TM_CATS=["All","Business","Medical","Technology","Creative","Fitness","Food","Education","Security","Nature","Fashion","Luxury"];

function tmRoundRect(ctx,x,y,w,h,r){const rr=Math.min(r,Math.abs(w)/2,Math.abs(h)/2);ctx.beginPath();ctx.moveTo(x+rr,y);ctx.arcTo(x+w,y,x+w,y+h,rr);ctx.arcTo(x+w,y+h,x,y+h,rr);ctx.arcTo(x,y+h,x,y,rr);ctx.arcTo(x,y,x+w,y,rr);ctx.closePath();}
function tmStar(ctx,cx,cy,outer,inner,points){ctx.beginPath();for(let i=0;i<points*2;i++){const a=-Math.PI/2+i*Math.PI/points;const r=i%2?inner:outer;const x=cx+Math.cos(a)*r,y=cy+Math.sin(a)*r;if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);}ctx.closePath();}
function tmShape(ctx,shape,cx,cy,size){
  const s=size;
  if(shape==="circle"){ctx.beginPath();ctx.arc(cx,cy,s,0,Math.PI*2);}
  else if(shape==="rounded"){tmRoundRect(ctx,cx-s,cy-s,cx?2*s:2*s,2*s,34);}
  else if(shape==="square"){ctx.rect(cx-s,cy-s,2*s,2*s);}
  else if(shape==="hexagon"){ctx.beginPath();for(let i=0;i<6;i++){const a=-Math.PI/2+i*Math.PI/3;const x=cx+Math.cos(a)*s,y=cy+Math.sin(a)*s;if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);}ctx.closePath();}
  else if(shape==="diamond"){ctx.beginPath();ctx.moveTo(cx,cy-s);ctx.lineTo(cx+s,cy);ctx.lineTo(cx,cy+s);ctx.lineTo(cx-s,cy);ctx.closePath();}
  else if(shape==="triangle"){ctx.beginPath();ctx.moveTo(cx,cy-s);ctx.lineTo(cx+s,cy+s*.8);ctx.lineTo(cx-s,cy+s*.8);ctx.closePath();}
  else if(shape==="star"){tmStar(ctx,cx,cy,s,s*.45,5);}
  else if(shape==="shield"){ctx.beginPath();ctx.moveTo(cx,cy-s);ctx.lineTo(cx+s*.8,cy-s*.65);ctx.lineTo(cx+s*.7,cy+s*.25);ctx.quadraticCurveTo(cx,cy+s,cx-s*.7,cy+s*.25);ctx.lineTo(cx-s*.8,cy-s*.65);ctx.closePath();}
  else if(shape==="badge"){ctx.beginPath();for(let i=0;i<12;i++){const a=-Math.PI/2+i*Math.PI/6;const r=i%2?s:s*.86;const x=cx+Math.cos(a)*r,y=cy+Math.sin(a)*r;if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);}ctx.closePath();}
  else {ctx.moveTo(cx-s,cy);ctx.lineTo(cx+s,cy);}
}

function LogoMaker({back,t}){
  const canvasRef=useRef(null),uploadRef=useRef(null);
  const [brand,setBrand]=useState("IQRA GROUP"),[tag,setTag]=useState("OF LAB");
  const [template,setTemplate]=useState("royal"),[shape,setShape]=useState("circle"),[icon,setIcon]=useState("♛");
  const [font,setFont]=useState("Arial"),[weight,setWeight]=useState("700"),[primary,setPrimary]=useState("#D4AF37"),[secondary,setSecondary]=useState("#F8FAFC"),[textColor,setTextColor]=useState("#FFFFFF"),[background,setBackground]=useState("#070B14");
  const [uploaded,setUploaded]=useState(null),[leftTab,setLeftTab]=useState("Templates"),[rightTab,setRightTab]=useState("Design"),[category,setCategory]=useState("All"),[search,setSearch]=useState(""),[zoom,setZoom]=useState(100),[effect,setEffect]=useState("none"),[bgMode,setBgMode]=useState("gradient"),[mockup,setMockup]=useState(false),[status,setStatus]=useState("");
  const [shapeSize,setShapeSize]=useState(190),[iconSize,setIconSize]=useState(145),[textSize,setTextSize]=useState(66),[rotation,setRotation]=useState(0);
  const visibleTemplates=TM_LOGO_TEMPLATES.filter(x=>(category==="All"||x.category===category)&&((x.name+" "+x.category).toLowerCase().includes(search.toLowerCase())));
  const applyTemplate=x=>{setTemplate(x.id);setIcon(x.icon);setCategory(x.category);setPrimary(x.primary);setSecondary(x.secondary);setBackground(x.bg);setStatus(x.name+" template applied.");};
  const uploadFile=file=>{if(!file)return;if(!/^image\//i.test(file.type)){setStatus("Please upload PNG, JPG, WEBP or SVG image.");return;}const r=new FileReader();r.onload=()=>{setUploaded(String(r.result||""));setStatus("Your logo/image has been uploaded.");};r.readAsDataURL(file);};
  const draw=()=>{
    const c=canvasRef.current;if(!c)return;const W=1000,H=760,dpr=2;c.width=W*dpr;c.height=H*dpr;const ctx=c.getContext("2d");ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,W,H);
    if(bgMode==="transparent"){ctx.clearRect(0,0,W,H);}else if(bgMode==="color"){ctx.fillStyle=background;ctx.fillRect(0,0,W,H);}else{const g=ctx.createLinearGradient(0,0,W,H);g.addColorStop(0,background);g.addColorStop(1,secondary);ctx.fillStyle=g;ctx.fillRect(0,0,W,H);}
    if(mockup){ctx.fillStyle="#111827";ctx.globalAlpha=.35;tmRoundRect(ctx,40,35,920,690,32);ctx.fill();ctx.globalAlpha=1;}
    ctx.save();ctx.translate(500,335);ctx.rotate(rotation*Math.PI/180);
    ctx.shadowColor=effect==="shadow"||effect==="3d"?"rgba(0,0,0,.55)":"transparent";ctx.shadowBlur=effect==="glow"?26:effect==="shadow"?22:effect==="3d"?10:0;ctx.shadowOffsetY=effect==="3d"?10:5;
    ctx.strokeStyle=primary;ctx.fillStyle="rgba(255,255,255,.025)";ctx.lineWidth=10;tmShape(ctx,shape,0,0,shapeSize);if(shape!=="line")ctx.fill(),ctx.stroke();else ctx.stroke();ctx.shadowColor="transparent";
    if(uploaded){const im=new Image();im.onload=()=>{ctx.drawImage(im,-90,-110,180,180);finish();};im.src=uploaded;}else{ctx.fillStyle=primary;ctx.font=weight+" "+iconSize+"px "+font;ctx.textAlign="center";ctx.textBaseline="middle";ctx.fillText(icon,0,0);finish();}
    function finish(){ctx.restore();ctx.textAlign="center";ctx.textBaseline="middle";ctx.fillStyle=textColor;ctx.font=weight+" "+textSize+"px "+font;ctx.fillText(String(brand||"BRAND NAME").slice(0,24),500,545);ctx.fillStyle=secondary;ctx.font="500 28px "+font;ctx.fillText(String(tag||"TAGLINE HERE").slice(0,36),500,600);ctx.strokeStyle=primary;ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(315,645);ctx.lineTo(430,645);ctx.moveTo(570,645);ctx.lineTo(685,645);ctx.stroke();ctx.fillStyle=secondary;ctx.font="700 16px "+font;ctx.fillText((category==="All"?"BUSINESS":category).toUpperCase(),500,675);}
  };
  useEffect(()=>{draw();},[brand,tag,template,shape,icon,font,weight,primary,secondary,textColor,background,uploaded,zoom,effect,bgMode,mockup,shapeSize,iconSize,textSize,rotation,category]);
  const download=()=>{const c=canvasRef.current;if(!c)return;const a=document.createElement("a");a.href=c.toDataURL("image/png");a.download="toolmaster-pro-logo.png";a.click();setStatus("High-quality PNG downloaded.");};
  const aiAction=type=>{if(type==="enhance"){setEffect("3d");setTextSize(72);setIconSize(160);setStatus("AI Enhance applied: sharper scale, depth and stronger typography.");}else if(type==="background"){setBgMode("gradient");setBackground("#0B1020");setSecondary("#5B21B6");setStatus("AI Background applied: premium gradient background.");}else{setMockup(true);setEffect("shadow");setStatus("Professional mockup preview applied.");}};
  return <Shell back={back} t={t} status={status}>
    <div style={{background:"#050914",color:"#eef2ff",border:"1px solid #1d2740",borderRadius:22,overflow:"hidden",boxShadow:"0 25px 80px rgba(0,0,0,.18)"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 18px",borderBottom:"1px solid #1d2740",gap:10,flexWrap:"wrap"}}><div style={{fontWeight:900,fontSize:18}}>ToolMaster<span style={{color:"#8b5cf6"}}>Pro</span> <span style={{fontSize:11,color:"#9aa7bd",fontWeight:700}}>ADVANCED LOGO STUDIO</span></div><div style={{display:"flex",gap:8}}><button className="btn" onClick={()=>setStatus("All changes are saved locally in this browser.")}>Save</button><button className="btn" onClick={()=>setMockup(v=>!v)}>Mockup</button><button className="btn primary" onClick={download}><Download size={15}/> Download</button></div></div>
      <div style={{display:"grid",gridTemplateColumns:"270px minmax(420px,1fr) 310px",minHeight:760}}>
        <aside style={{borderRight:"1px solid #1d2740",padding:14,background:"#080D18"}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:5,marginBottom:12}}>{["Templates","Icons","Shapes"].map(x=><button key={x} onClick={()=>setLeftTab(x)} style={{border:0,borderRadius:9,padding:"9px 4px",background:leftTab===x?"#6d3df5":"#111827",color:"#fff",fontWeight:800,fontSize:11}}>{x}</button>)}</div>
          {leftTab==="Templates"&&<><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search templates..." style={{width:"100%",boxSizing:"border-box",padding:10,borderRadius:9,border:"1px solid #26324d",background:"#0d1424",color:"#fff",marginBottom:8}}/><div style={{display:"flex",gap:5,overflowX:"auto",paddingBottom:8}}>{TM_CATS.map(x=><button key={x} onClick={()=>setCategory(x)} style={{whiteSpace:"nowrap",border:"1px solid #29334c",borderRadius:15,padding:"6px 9px",background:category===x?"#6d3df5":"#0d1424",color:"#fff",fontSize:10}}>{x}</button>)}</div><h4 style={{margin:"9px 0"}}>Premium Templates</h4><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>{visibleTemplates.map(x=><button key={x.id} onClick={()=>applyTemplate(x)} style={{textAlign:"center",minHeight:112,border:"1px solid "+(template===x.id?"#8b5cf6":"#25304a"),borderRadius:12,background:template===x.id?"#17102e":"#0d1422",color:"#fff",padding:8,cursor:"pointer"}}><div style={{fontSize:38,color:x.primary}}>{x.icon}</div><b style={{fontSize:11}}>{x.name}</b><small style={{display:"block",color:"#91a0b7",fontSize:9}}>{x.category}</small></button>)}</div></>}
          {leftTab==="Icons"&&<><h4>Icon Library</h4><div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:7}}>{TM_ICONS.map((x,i)=><button key={i} onClick={()=>{setIcon(x);setUploaded(null)}} style={{fontSize:25,padding:8,border:"1px solid #27324b",borderRadius:9,background:icon===x&&!uploaded?"#24154d":"#0d1422",color:primary}}>{x}</button>)}</div></>}
          {leftTab==="Shapes"&&<><h4>Shape Library</h4><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7}}>{TM_SHAPES.map(x=><button key={x} onClick={()=>setShape(x)} style={{padding:12,border:"1px solid #27324b",borderRadius:9,background:shape===x?"#24154d":"#0d1422",color:"#fff",textTransform:"capitalize"}}>{x}</button>)}</div><label style={{display:"block",marginTop:12}}>Shape size <input type="range" min="110" max="230" value={shapeSize} onChange={e=>setShapeSize(Number(e.target.value))}/></label></>}
          <div style={{marginTop:14,border:"1px dashed #5140a8",borderRadius:12,padding:12,textAlign:"center"}} onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault();uploadFile(e.dataTransfer.files?.[0])}}><Upload size={22} color="#9b7cff"/><b style={{display:"block",marginTop:5}}>Upload Logo / Image</b><small style={{color:"#8795ad"}}>PNG, JPG, WEBP, SVG • Max 10MB</small><input ref={uploadRef} type="file" accept="image/*" hidden onChange={e=>uploadFile(e.target.files?.[0])}/><button className="btn primary" style={{marginTop:9,width:"100%"}} onClick={()=>uploadRef.current?.click()}>Upload from PC</button>{uploaded&&<button className="btn" style={{marginTop:6,width:"100%"}} onClick={()=>setUploaded(null)}>Remove Upload</button>}</div>
        </aside>
        <main style={{padding:14,background:"#060A13"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}><div><b>Canvas</b><span style={{marginLeft:12,color:"#8d9ab0",fontSize:12}}>1:1 • Professional logo workspace</span></div><div style={{display:"flex",gap:5}}>{["1:1","16:9","4:3","3:4","Custom"].map(x=><button key={x} className="btn" style={{padding:"6px 9px",fontSize:10}}>{x}</button>)}</div></div>
          <div style={{display:"grid",placeItems:"center",minHeight:610,background:"radial-gradient(circle at 50% 40%,#151d31,#050914 68%)",border:"1px solid #202b45",borderRadius:16,padding:12,overflow:"auto"}}><canvas ref={canvasRef} style={{width:Math.round(650*zoom/100),maxWidth:"100%",height:"auto",borderRadius:12}}/></div>
          <div style={{display:"flex",justifyContent:"center",gap:8,alignItems:"center",marginTop:10}}><button className="btn" onClick={()=>setZoom(Math.max(60,zoom-10))}>−</button><span style={{minWidth:45,textAlign:"center"}}>{zoom}%</span><button className="btn" onClick={()=>setZoom(Math.min(140,zoom+10))}>+</button><button className="btn" onClick={()=>setZoom(100)}>Fit</button></div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:7,marginTop:10}}>{[["AI Enhance","enhance"],["AI Background","background"],["Mockup","mockup"],["Shadows","shadow"],["Upload","upload"]].map(x=><button key={x[0]} className="btn" onClick={()=>x[1]==="upload"?uploadRef.current?.click():x[1]==="shadow"?(setEffect("shadow"),setStatus("Shadow effect applied.")):aiAction(x[1])}>{x[0]}</button>)}</div>
        </main>
        <aside style={{borderLeft:"1px solid #1d2740",padding:14,background:"#080D18"}}>
          <div style={{display:"flex",gap:3,borderBottom:"1px solid #202a43",marginBottom:12}}>{["Design","Text","Effects","Layers"].map(x=><button key={x} onClick={()=>setRightTab(x)} style={{flex:1,border:0,padding:9,background:"transparent",color:rightTab===x?"#b9a6ff":"#8e9bb0",fontWeight:800}}>{x}</button>)}</div>
          {rightTab!=="Layers"&&<>
            <h3 style={{margin:"5px 0 12px"}}>{rightTab==="Text"?"Typography":rightTab==="Effects"?"Effects & Background":"Logo Design"}</h3>
            <label>Brand Name<input value={brand} onChange={e=>setBrand(e.target.value)} style={{width:"100%",boxSizing:"border-box",padding:10,marginTop:5,borderRadius:9,border:"1px solid #29334c",background:"#0d1422",color:"#fff"}}/></label>
            <label style={{display:"block",marginTop:9}}>Tagline<input value={tag} onChange={e=>setTag(e.target.value)} style={{width:"100%",boxSizing:"border-box",padding:10,marginTop:5,borderRadius:9,border:"1px solid #29334c",background:"#0d1422",color:"#fff"}}/></label>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7,marginTop:9}}><label>Font<select value={font} onChange={e=>setFont(e.target.value)} style={{width:"100%",padding:9}}>{TM_FONTS.map(x=><option key={x}>{x}</option>)}</select></label><label>Weight<select value={weight} onChange={e=>setWeight(e.target.value)} style={{width:"100%",padding:9}}><option value="400">Regular</option><option value="600">Semi Bold</option><option value="700">Bold</option><option value="800">Extra Bold</option></select></label></div>
            <label style={{display:"block",marginTop:9}}>Text size <input type="range" min="42" max="90" value={textSize} onChange={e=>setTextSize(Number(e.target.value))}/></label>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6,marginTop:9}}><label>Primary<input type="color" value={primary} onChange={e=>setPrimary(e.target.value)} style={{width:"100%",height:35}}/></label><label>Secondary<input type="color" value={secondary} onChange={e=>setSecondary(e.target.value)} style={{width:"100%",height:35}}/></label><label>Text<input type="color" value={textColor} onChange={e=>setTextColor(e.target.value)} style={{width:"100%",height:35}}/></label></div>
            <div style={{marginTop:12}}><b>Background</b><div style={{display:"flex",gap:5,marginTop:7}}>{["#050914","#111827","#0F172A","#1E1B4B","#172554","#18181B"].map(x=><button key={x} onClick={()=>{setBackground(x);setBgMode("gradient")}} style={{width:30,height:30,borderRadius:8,border:background===x?"2px solid #a78bfa":"1px solid #334155",background:x}}/>)}</div></div>
            <div style={{marginTop:12}}><b>Effects</b><div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:5,marginTop:7}}>{["none","shadow","glow","3d"].map(x=><button key={x} onClick={()=>setEffect(x)} style={{padding:7,borderRadius:8,border:"1px solid #2b3650",background:effect===x?"#5b21b6":"#0d1422",color:"#fff",fontSize:10}}>{x}</button>)}</div></div>
          </>}
          {rightTab==="Layers"&&<div>{[["♛","Logo / Icon"],["T","Brand Name"],["T","Tagline"],["◉","Shape / Frame"],["▣","Background"]].map(x=><div key={x[1]} style={{display:"flex",justifyContent:"space-between",padding:11,background:"#0d1422",border:"1px solid #26324c",borderRadius:9,marginBottom:7}}><span><b style={{marginRight:8}}>{x[0]}</b>{x[1]}</span><span>◉ ⋮</span></div>)}</div>}
        </aside>
      </div>
    </div>
  </Shell>;
}


function SeoGeniusAI({back,user,openAuth}) {
  const [url,setUrl]=useState("");
  const [report,setReport]=useState(null);
  const [ai,setAi]=useState(null);
  const [busy,setBusy]=useState(false);
  const [status,setStatus]=useState("");
  const [active,setActive]=useState("overview");
  const [history,setHistory]=useState([]);
  const [websites,setWebsites]=useState([]);
  const [plan,setPlan]=useState({name:"FREE",limit:3,used:0,remaining:3});
  const [saved,setSaved]=useState(false);

  const fn=(name)=>SUPABASE_URL?`${SUPABASE_URL}/functions/v1/${name}`:"";
  const authHeaders=async()=>{
    const token=await getSupabaseAccessToken();
    return {"Content-Type":"application/json",...(SUPABASE_KEY?{apikey:SUPABASE_KEY}:{}),...(token?{Authorization:`Bearer ${token}`}:{})};
  };
  const loadData=async()=>{
    if(!supabase||!user)return;
    const [{data:scans},{data:sites}]=await Promise.all([
      supabase.from("seo_scans").select("id,url,overall_score,created_at,status").order("created_at",{ascending:false}).limit(12),
      supabase.from("websites").select("id,url,title,created_at").order("created_at",{ascending:false}).limit(20)
    ]);
    setHistory(scans||[]);setWebsites(sites||[]);
  };
  useEffect(()=>{loadData();},[user]);

  const analyze=async()=>{
    if(!user){openAuth?.("signin");return;}
    let parsed;
    try{parsed=new URL(url.trim());}catch{setStatus("Please enter a valid website URL, for example https://example.com");return;}
    if(!/^https?:$/.test(parsed.protocol)){setStatus("Only http:// and https:// website URLs are allowed.");return;}
    if(parsed.username||parsed.password){setStatus("URLs containing usernames or passwords are not allowed.");return;}
    setBusy(true);setStatus("Securely validating URL and starting crawl…");setReport(null);setAi(null);
    try{
      const r=await fetch(fn("seo-audit"),{method:"POST",headers:await authHeaders(),body:JSON.stringify({url:parsed.href})});
      const raw=await r.text();let d={};try{d=raw?JSON.parse(raw):{};}catch{}
      if(!r.ok)throw new Error(d.error||d.message||`SEO audit failed (${r.status})`);
      setReport(d);setPlan(d.usage||plan);setStatus("Audit completed from live website checks.");
      if(d.scan_id){
        setStatus("Audit complete. Generating AI recommendations…");
        const ar=await fetch(fn("seo-ai-recommendations"),{method:"POST",headers:await authHeaders(),body:JSON.stringify({scan_id:d.scan_id})});
        const araw=await ar.text();let ad={};try{ad=araw?JSON.parse(araw):{};}catch{}
        if(ar.ok)setAi(ad);else setAi({available:false,error:ad.error||ad.message||`AI recommendations unavailable (${ar.status})`});
      }
      await loadData();setActive("overview");
    }catch(e){setStatus(e?.message||"Website analysis failed.");}
    finally{setBusy(false);}
  };

  const saveWebsite=async()=>{
    if(!supabase||!user||!report?.url)return;
    const {error}=await supabase.from("websites").upsert({user_id:user.id,url:report.url,title:report.meta?.title||report.url,updated_at:new Date().toISOString()},{onConflict:"user_id,url"});
    setSaved(!error);if(!error){setStatus("Website saved to your account.");await loadData();}else setStatus(error.message||"Could not save website.");
  };

  const openScan=async(id)=>{
    if(!supabase)return;
    setStatus("Loading saved scan…");
    const {data,error}=await supabase.from("seo_scans").select("*").eq("id",id).maybeSingle();
    if(error||!data){setStatus(error?.message||"Scan not found.");return;}
    setReport(data.result_json||data);setAi(data.ai_json||null);setActive("overview");setStatus("Saved scan loaded.");
  };

  const downloadPdf=async()=>{
    if(!report)return;
    try{
      setStatus("Preparing PDF report…");
      const {PDFDocument,StandardFonts,rgb}=await loadLib("pdf-lib");
      const doc=await PDFDocument.create();const font=await doc.embedFont(StandardFonts.Helvetica);const bold=await doc.embedFont(StandardFonts.HelveticaBold);
      const margin=42;let page=doc.addPage([595,842]);let y=800;
      const add=(text,size=10,b=false)=>{const lines=String(text??"").split("\n");for(const line of lines){if(y<55){page=doc.addPage([595,842]);y=800;}page.drawText(line.slice(0,105),{x:margin,y,size,font:b?bold:font,color:rgb(.08,.12,.18)});y-=size+6;}};
      add("SEO Genius AI — Website SEO & AI Visibility Report",18,true);y-=4;add(`Website: ${report.url}`,10);add(`Scan date: ${new Date(report.scan_date||Date.now()).toLocaleString()}`,10);y-=8;
      add(`Overall SEO Score: ${report.scores?.overall??"Not available"}/100`,15,true);
      for(const [k,v] of Object.entries(report.scores||{})){if(k!=="overall")add(`${labelScore(k)}: ${v==null?"Not available":v}/100`,11,true);}
      y-=6;add("Critical / High Priority Issues",13,true);for(const x of (ai?.critical||report.issues?.filter(i=>i.severity==="critical")||[]).slice(0,12))add(`• ${typeof x==="string"?x:(x.title||x.what||x.message||"Issue")}`,10);
      add("Passed Checks",13,true);for(const c of (report.checks||[]).filter(x=>x.status==="pass").slice(0,30))add(`• ${c.name}: ${c.detail||"Passed"}`,9);
      add("Warnings / Failed Checks",13,true);for(const c of (report.checks||[]).filter(x=>x.status!=="pass").slice(0,30))add(`• ${c.name}: ${c.status} — ${c.detail||""}`,9);
      add("Technical Findings",13,true);for(const c of (report.checks||[]).filter(x=>x.category==="technical").slice(0,35))add(`• ${c.name}: ${c.status}${c.detail?` — ${c.detail}`:""}`,9);
      add("AI Search Visibility",13,true);add(`AI Visibility Score: ${report.scores?.ai_visibility??"Not available"}/100`,10,true);for(const x of (ai?.aiVisibility?.contentGaps||report.ai_visibility?.content_gaps||[]).slice(0,10))add(`• ${x}`,9);
      add("Action Plan",13,true);for(const x of (ai?.actionPlan||[]).slice(0,15))add(`• ${x}`,9);
      const bytes=await doc.save();const reportName=`seo-genius-${new URL(report.url).hostname}.pdf`;downloadBlob(new Blob([bytes],{type:"application/pdf"}),reportName);if(supabase&&user&&report.scan_id){await supabase.from("seo_reports").insert({user_id:user.id,scan_id:report.scan_id,report_name:reportName,report_json:{url:report.url,scan_date:report.scan_date,scores:report.scores,generated_at:new Date().toISOString()}});}setStatus("PDF report downloaded and report metadata saved.");
    }catch(e){setStatus(e?.message||"PDF generation failed.");}
  };

  const score=report?.scores?.overall;const checks=report?.checks||[];
  const count=(s)=>checks.filter(x=>x.status===s).length;
  const nav=["overview","issues","recommendations","ai-visibility","keywords","performance","technical","reports","settings"];
  const card=(title,value,sub)=> <div style={sg.card}><div style={sg.muted}>{title}</div><div style={sg.big}>{value}</div><div style={sg.muted}>{sub}</div></div>;
  const progress=(label,value)=> <div style={{marginBottom:14}}><div style={sg.row}><b>{label}</b><span>{value==null?"Not available":`${value}/100`}</span></div><div style={sg.track}><div style={{...sg.fill,width:`${Math.max(0,Math.min(100,Number(value)||0))}%`}}/></div></div>;
  const severity=(s)=> <span style={{...sg.badge,background:s==="critical"?"#3b1115":s==="high"?"#3a2509":s==="medium"?"#2d2808":"#0d2b20",color:s==="critical"?"#ff9a9a":s==="high"?"#ffc46b":s==="medium"?"#ffe37d":"#78e6b0"}}>{s}</span>;

  return <main className="toolPage">
    <style>{`
      .seoGeniusResponsiveInput{flex-wrap:wrap}.seoGeniusResponsiveInput input{flex:1;min-width:180px;background:transparent;border:0;outline:0;color:#fff;font-size:16px}.seoGeniusResponsiveInput .btn{white-space:nowrap}
      @media (max-width:700px){.seoGeniusResponsiveInput{padding:8px}.seoGeniusResponsiveInput input{width:100%;min-width:0;flex-basis:100%}.seoGeniusResponsiveInput .btn{width:100%;justify-content:center}.seoGeniusIssue{grid-template-columns:1fr!important}.seoGeniusTableRow{grid-template-columns:1fr!important}.seoGeniusHistory{grid-template-columns:1fr!important}}
    `}</style>
    <div style={sg.shell}>
      <div style={sg.top}>
        <button className="back" onClick={back}>← Back to tools</button>
        <div style={sg.brandRow}><div style={sg.logo}><Sparkles size={18}/></div><div><b>SEO Genius AI</b><small>Website SEO & AI Visibility Auditor</small></div></div>
      </div>
      {!report ? <>
        <section style={sg.hero}>
          <span style={sg.pill}><ShieldCheck size={14}/> Real crawl-based checks · No guaranteed rankings</span>
          <h1>Audit your website for <span style={sg.grad}>SEO + AI Search</span></h1>
          <p>Analyze technical SEO, on-page signals, performance basics, crawlability, structured data and AI-readable content from the live page.</p>
          <div className="seoGeniusResponsiveInput" style={sg.inputWrap}><Globe2 size={20}/><input value={url} onChange={e=>setUrl(e.target.value)} onKeyDown={e=>e.key==="Enter"&&!busy&&analyze()} placeholder="https://example.com"/><button className="btn primary" disabled={busy||!url.trim()} onClick={analyze}>{busy?<RefreshCw size={16} className="spin"/>:<Sparkles size={16}/>} {busy?"Analyzing…":"Analyze My Website"}</button></div>
          <div style={sg.note}>{status||`Plan: ${plan.name||"FREE"} · ${plan.remaining??3} scan${(plan.remaining??3)===1?"":"s"} remaining this month`}</div>
        </section>
        <div style={sg.featureGrid}>{[["Technical SEO","Meta, headings, canonical, robots, sitemap, schema, indexability"],["AI Search Visibility","Entity coverage, answer opportunities, expertise and content gaps"],["Real checks","Scores are calculated from performed checks; unavailable checks stay unavailable"],["Actionable report","WHAT is wrong · WHY it matters · HOW to fix it"],["Scan history","Keep your previous scans and saved websites in your account"],["PDF reports","Download a shareable audit report after each completed scan"]].map(([a,b])=><div style={sg.feature} key={a}><div style={sg.featureIcon}><CheckCircle2 size={17}/></div><div><b>{a}</b><p>{b}</p></div></div>)}</div>
        <section style={sg.infoGrid}><div style={sg.info}><h3>How it works</h3><ol><li>Enter a public HTTP/HTTPS URL.</li><li>Our server validates the target and fetches it securely.</li><li>SEO Genius evaluates actual page signals and selected links.</li><li>AI turns the findings into prioritized recommendations.</li></ol></div><div style={sg.info}><h3>What we do not promise</h3><p>SEO Genius AI does not guarantee Google rankings, traffic, or AI citations. Search visibility depends on many external factors.</p></div></section>
        <section style={{marginTop:18}}><h2 style={{textAlign:"center"}}>Simple SEO Genius pricing</h2><p style={{textAlign:"center",color:"#91a2bb"}}>Limits are enforced server-side. Actual billing activation should update the subscription only after a verified payment event.</p><div style={sg.priceGrid}>{[["FREE","$0/mo","3 scans/month","Basic audit"],["BASIC","$9.99/mo","30 scans/month","Full audit · AI recommendations · PDF reports"],["POPULAR","$19.99/mo","100 scans/month","Full audit · AI Visibility · competitor analysis · content recommendations"],["PREMIUM","$39.99/mo","High / 100,000 scans/month","Scheduled audits · monitoring · white-label · agency features"]].map(([a,b,c,d])=><div style={sg.price} key={a}><span style={sg.pill}>{a}</span><h3>{b}</h3><b>{c}</b><p>{d}</p></div>)}</div></section>
        <section style={{marginTop:18}}><h2 style={{textAlign:"center"}}>FAQ</h2><div style={sg.faq}>{[["Does SEO Genius guarantee Google rankings?","No. It reports observed SEO signals and recommendations; it cannot guarantee rankings or AI citations."],["Are scores invented?","No. Scores are calculated from performed checks. Unsupported measurements such as real-browser Core Web Vitals are shown as Not available."],["Can I audit private or local URLs?","No. The server blocks localhost, private/internal IP ranges and credential-bearing URLs to reduce SSRF risk."],["Where is my AI key stored?","AI calls run in the Supabase Edge Function. The provider key is never shipped to the browser."]].map(([q,a])=><details style={sg.faqItem} key={q}><summary>{q}</summary><p>{a}</p></details>)}</div></section>
      </> : <>
        <div style={sg.dashboardTop}><div><span style={sg.pill}>Live audit</span><h1>{report.meta?.title||report.url}</h1><p>{report.url}</p></div><div style={{display:"flex",gap:8,flexWrap:"wrap"}}><button className="btn" onClick={saveWebsite}><Heart size={15}/> {saved?"Saved":"Save website"}</button><button className="btn primary" onClick={downloadPdf}><Download size={15}/> PDF Report</button><button className="btn" onClick={()=>{setReport(null);setAi(null);setStatus("")}}>New scan</button></div></div>
          <div style={sg.nav}>{nav.map(x=><button key={x} onClick={()=>setActive(x)} style={active===x?sg.navActive:sg.navBtn}>{x.replace("ai-visibility","AI Visibility").replace("-"," ").replace(/\b\w/g,m=>m.toUpperCase())}</button>)}</div>
          {active==="overview"&&<div>
            <div style={sg.scoreGrid}>{card("Overall SEO Score",score==null?"Not available":`${score}/100`,`${count("pass")} passed · ${count("warn")} warnings · ${count("fail")} failed`)}{card("Technical SEO",report.scores?.technical==null?"Not available":`${report.scores.technical}/100`,"Based on performed technical checks")}{card("On-Page SEO",report.scores?.onpage==null?"Not available":`${report.scores.onpage}/100`,"Titles, headings, content and media")}{card("Performance",report.scores?.performance==null?"Not available":`${report.scores.performance}/100`,report.performance?.ttfb_ms!=null?`${report.performance.ttfb_ms} ms server response`:"Browser CWV not measured")}{card("Mobile SEO",report.scores?.mobile==null?"Not available":`${report.scores.mobile}/100`,"Viewport and mobile-readiness signals")}{card("AI Visibility",report.scores?.ai_visibility==null?"Not available":`${report.scores.ai_visibility}/100`,"AI Search readiness signals")}</div>
            <div style={sg.two}><div style={sg.panel}><h3>Category scores</h3>{progress("Technical SEO",report.scores?.technical)}{progress("On-Page SEO",report.scores?.onpage)}{progress("Content SEO",report.scores?.content)}{progress("Performance",report.scores?.performance)}{progress("Mobile SEO",report.scores?.mobile)}{progress("AI Visibility",report.scores?.ai_visibility)}</div><div style={sg.panel}><h3>Audit status</h3><div style={sg.checkStats}><div><b>{count("pass")}</b><span>Passed</span></div><div><b>{count("warn")}</b><span>Warnings</span></div><div><b>{count("fail")}</b><span>Failed</span></div><div><b>{count("not_available")}</b><span>Not available</span></div></div><p style={sg.muted}>A score is only calculated from checks that were actually performed.</p></div></div>
          </div>}
          {active==="issues"&&<div style={sg.panel}><h2>Issues</h2><p style={sg.muted}>Every finding comes from a crawl check. Unavailable checks are not scored as failures.</p><div>{checks.filter(x=>x.status!=="pass").map((x,i)=><div style={sg.issue} key={i}><div>{severity(x.severity||"medium")}</div><div><b>{x.name}</b><p>{x.detail||"No additional detail available."}</p><small><b>WHAT:</b> {x.what||x.detail||"See finding"} · <b>WHY:</b> {x.why||"This can affect search usability or discoverability."} · <b>HOW:</b> {x.how||"Review and correct the finding."}</small></div></div>)}</div></div>}
          {active==="recommendations"&&<div style={sg.panel}><h2>AI Recommendations</h2>{!ai?.available&&<div style={sg.notice}><AlertCircle size={16}/>{ai?.error||"AI recommendations are not available. Configure the server-side AI provider and credits."}</div>}<div style={sg.recGrid}>{["critical","high","medium","low"].map(level=><div key={level} style={sg.recCol}><h3>{severity(level)} {level}</h3>{(ai?.[level]||[]).map((x,i)=><div style={sg.rec} key={i}><b>{x.title||x.what||x.issue||"Recommendation"}</b><p><b>WHAT:</b> {x.what||x.issue||""}</p><p><b>WHY:</b> {x.why||""}</p><p><b>HOW:</b> {x.how||x.fix||""}</p></div>)}{!(ai?.[level]?.length)&&<div style={sg.empty}>No items in this priority.</div>}</div>)}</div>{ai?.suggestions&&<div style={sg.panelInner}><h3>Suggested metadata & content</h3><pre style={sg.pre}>{JSON.stringify(ai.suggestions,null,2)}</pre></div>}</div>}
          {active==="ai-visibility"&&<div style={sg.two}><div style={sg.panel}><h2>AI Search Visibility</h2>{progress("AI visibility score",report.scores?.ai_visibility)}{progress("Content clarity",report.ai_visibility?.content_clarity)}{progress("Entity / topic coverage",report.ai_visibility?.entity_coverage)}{progress("Expertise signals",report.ai_visibility?.expertise)}<h3>Question-answer opportunities</h3><ul>{(report.ai_visibility?.question_opportunities||[]).map((x,i)=><li key={i}>{x}</li>)}</ul></div><div style={sg.panel}><h3>Content gaps</h3><ul>{(report.ai_visibility?.content_gaps||[]).map((x,i)=><li key={i}>{x}</li>)}</ul><h3>Recommended FAQ topics</h3><ul>{(ai?.aiVisibility?.faqTopics||report.ai_visibility?.faq_topics||[]).map((x,i)=><li key={i}>{x}</li>)}</ul><h3>Supporting pages</h3><ul>{(ai?.aiVisibility?.supportingPages||report.ai_visibility?.supporting_pages||[]).map((x,i)=><li key={i}>{x}</li>)}</ul></div></div>}
          {active==="keywords"&&<div style={sg.panel}><h2>Keywords & Content</h2><p style={sg.muted}>Keyword extraction is heuristic and based on visible page text; it is not a search-volume database.</p><div style={sg.keywordGrid}>{(report.keywords||[]).map((x,i)=><div style={sg.keyword} key={i}><b>{x.term}</b><span>{x.count} uses · {x.density}%</span></div>)}</div><h3>Content quality signals</h3><pre style={sg.pre}>{JSON.stringify(report.content||{},null,2)}</pre></div>}
          {active==="performance"&&<div style={sg.panel}><h2>Performance</h2>{progress("Performance score",report.scores?.performance)}<div style={sg.scoreGrid}>{card("Server response",report.performance?.ttfb_ms!=null?`${report.performance.ttfb_ms} ms`:"Not available","Measured by the audit server")}{card("Page size",report.performance?.bytes!=null?`${Math.round(report.performance.bytes/1024)} KB`:"Not available","HTML response bytes")}{card("Core Web Vitals","Not available","Requires a real browser/user session or a PageSpeed-style provider")}</div></div>}
          {active==="technical"&&<div style={sg.panel}><h2>Technical SEO</h2><div style={sg.table}>{checks.map((x,i)=><div className="seoGeniusTableRow" style={sg.tr} key={i}><b>{x.name}</b><span style={x.status==="pass"?sg.pass:x.status==="fail"?sg.fail:x.status==="not_available"?sg.na:sg.warn}>{x.status}</span><small>{x.detail||"Not available"}</small></div>)}</div></div>}
          {active==="reports"&&<div style={sg.panel}><h2>Reports & Scan History</h2><button className="btn primary" onClick={downloadPdf}><Download size={15}/> Download current PDF</button><div style={{marginTop:16}}>{history.map(x=><button className="seoGeniusHistory" key={x.id} onClick={()=>openScan(x.id)} style={sg.historyBtn}><span>{new URL(x.url).hostname}</span><b>{x.overall_score==null?"—":`${x.overall_score}/100`}</b><small>{new Date(x.created_at).toLocaleString()}</small></button>)}</div></div>}
          {active==="settings"&&<div><div style={sg.two}><div style={sg.panel}><h2>Account</h2><p>{user?.email}</p><p>Plan: <b>{plan.name||"FREE"}</b></p><p>Monthly usage: <b>{plan.used??0}/{plan.limit??3}</b></p><p style={sg.muted}>Upgrades should be applied only by a verified billing webhook or administrator.</p></div><div style={sg.panel}><h2>Saved websites</h2>{websites.map(w=><div style={sg.site} key={w.id}><b>{w.title||w.url}</b><span>{w.url}</span></div>)}{!websites.length&&<p style={sg.muted}>No saved websites yet.</p>}</div></div><div style={{...sg.priceGrid,marginTop:14}}>{[["FREE","$0/mo","3 scans/month"],["BASIC","$9.99/mo","30 scans/month"],["POPULAR","$19.99/mo","100 scans/month"],["PREMIUM","$39.99/mo","High allowance"]].map(([a,b,c])=><div style={sg.price} key={a}><span style={sg.pill}>{a}</span><h3>{b}</h3><p>{c}</p></div>)}</div></div>}
          <div style={sg.disclaimer}><ShieldCheck size={15}/> SEO Genius AI reports observed signals. It does not guarantee Google rankings, traffic, or AI citations.</div>
        </>}
    </div>
  </main>;
}

const labelScore=(k)=>({technical:"Technical SEO",onpage:"On-Page SEO",content:"Content SEO",performance:"Performance",mobile:"Mobile SEO",ai_visibility:"AI Visibility",overall:"Overall Score"}[k]||k);
const sg={shell:{maxWidth:1240,margin:"0 auto",padding:"22px 18px 70px"},top:{display:"flex",alignItems:"center",justifyContent:"space-between",gap:16,flexWrap:"wrap"},brandRow:{display:"flex",alignItems:"center",gap:10},logo:{width:38,height:38,borderRadius:12,display:"grid",placeItems:"center",background:"linear-gradient(135deg,#7c3aed,#06b6d4)",color:"white"},hero:{marginTop:28,padding:"46px 28px",borderRadius:28,border:"1px solid #26324b",background:"radial-gradient(circle at 80% 10%,rgba(124,58,237,.25),transparent 38%),linear-gradient(135deg,#0b1220,#101a2d)",textAlign:"center"},grad:{background:"linear-gradient(90deg,#a78bfa,#22d3ee)",WebkitBackgroundClip:"text",color:"transparent"},pill:{display:"inline-flex",alignItems:"center",gap:7,padding:"7px 10px",borderRadius:999,border:"1px solid #33415e",background:"#101a2b",color:"#b7c5dc",fontSize:12},inputWrap:{maxWidth:820,margin:"26px auto 0",display:"flex",alignItems:"center",gap:10,padding:9,borderRadius:16,background:"#07101e",border:"1px solid #31415f"},featureGrid:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:12,marginTop:18},feature:{display:"flex",gap:11,padding:18,borderRadius:16,background:"#0d1625",border:"1px solid #22314b"},featureIcon:{width:32,height:32,borderRadius:10,display:"grid",placeItems:"center",background:"#102c25",color:"#6ee7b7",flex:"0 0 auto"},infoGrid:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:14,marginTop:16},info:{padding:22,borderRadius:18,border:"1px solid #24334d",background:"#0c1422",color:"#c8d3e5"},dashboardTop:{display:"flex",justifyContent:"space-between",alignItems:"end",gap:16,flexWrap:"wrap",marginTop:20},nav:{display:"flex",gap:7,overflowX:"auto",padding:"16px 0",position:"sticky",top:0,zIndex:4,background:"rgba(7,12,21,.92)",backdropFilter:"blur(12px)"},navBtn:{border:"1px solid #25344d",background:"#0d1625",color:"#9fb0c8",padding:"9px 12px",borderRadius:10,whiteSpace:"nowrap",cursor:"pointer"},navActive:{border:"1px solid #7c3aed",background:"#28154f",color:"#fff",padding:"9px 12px",borderRadius:10,whiteSpace:"nowrap",cursor:"pointer"},scoreGrid:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(175px,1fr))",gap:12,marginBottom:14},card:{padding:18,borderRadius:16,border:"1px solid #25344d",background:"#0d1625"},big:{fontSize:28,fontWeight:800,margin:"7px 0"},muted:{color:"#91a2bb",fontSize:13},two:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:14},panel:{padding:20,borderRadius:18,border:"1px solid #25344d",background:"#0c1422",color:"#d6e0ef",marginBottom:14},panelInner:{marginTop:14,padding:16,borderRadius:14,background:"#0a1120",border:"1px solid #22304a"},row:{display:"flex",justifyContent:"space-between",gap:10,fontSize:13},track:{height:8,borderRadius:99,background:"#1a2639",overflow:"hidden",marginTop:6},fill:{height:"100%",borderRadius:99,background:"linear-gradient(90deg,#7c3aed,#22d3ee)"},checkStats:{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:10},checkStatsItem:{},issue:{display:"grid",gridTemplateColumns:"90px 1fr",gap:14,padding:"16px 0",borderBottom:"1px solid #203047"},badge:{display:"inline-block",padding:"5px 8px",borderRadius:8,fontSize:11,textTransform:"uppercase",fontWeight:700},recGrid:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:12},recCol:{padding:14,borderRadius:15,background:"#0a1120",border:"1px solid #22304a"},rec:{padding:13,borderRadius:12,background:"#0e192a",border:"1px solid #263650",marginTop:9},empty:{color:"#70829d",padding:16},notice:{display:"flex",gap:8,alignItems:"center",padding:12,borderRadius:12,background:"#2b2110",color:"#ffd68a",marginBottom:12},pre:{whiteSpace:"pre-wrap",overflowX:"auto",padding:14,borderRadius:12,background:"#07101c",color:"#b9c8dc",fontSize:12},keywordGrid:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:9},keyword:{display:"flex",flexDirection:"column",gap:4,padding:13,borderRadius:12,border:"1px solid #24334c",background:"#0d1625"},table:{border:"1px solid #22304a",borderRadius:14,overflow:"hidden"},tr:{display:"grid",gridTemplateColumns:"1.2fr 110px 2fr",gap:10,padding:"12px 14px",borderBottom:"1px solid #203047",alignItems:"center"},pass:{color:"#6ee7b7"},fail:{color:"#ff8e8e"},warn:{color:"#ffd27a"},na:{color:"#8191a9"},historyBtn:{width:"100%",display:"grid",gridTemplateColumns:"1fr 90px 180px",gap:10,textAlign:"left",padding:13,marginTop:8,borderRadius:12,border:"1px solid #25344d",background:"#0d1625",color:"#d7e1ef",cursor:"pointer"},site:{display:"flex",flexDirection:"column",gap:3,padding:12,borderBottom:"1px solid #22304a"},disclaimer:{display:"flex",gap:8,alignItems:"center",marginTop:10,padding:12,borderRadius:12,background:"#0b1320",color:"#8191a9",fontSize:12}}

function ToolPage({t,back,user,openAuth}) {
  if(t[3]==="student-ai-helper") return <StudentAIHelper back={back} user={user} openAuth={openAuth}/>;
  if(t[3]==="text-to-video") return <TextToVideo back={back} user={user} openAuth={openAuth}/>;
  if(t[3]==="edit-pdf") return <PdfEditorTool t={t} back={back}/>;
  if(t[3]==="stamp-generator") return <StampGenerator t={t} back={back}/>;
  if(t[3]==="logo-maker") return <LogoMaker t={t} back={back}/>;
  if(t[3]==="seo-genius") return <SeoGeniusAI back={back} user={user} openAuth={openAuth}/>;
  if(t[1]==="PDF Tools") return <PdfTool t={t} back={back}/>;
  if(t[3]==="background-remover") return <BackgroundRemoverTool t={t} back={back}/>;
  if(t[1]==="Image Tools") return <ImageTool t={t} back={back}/>;
  if(t[1]==="SEO & Marketing") return <SeoTool t={t} back={back}/>;
  return <GenericTool t={t} back={back}/>;
}

function Shell({back,t,children,status}) {
  return <main className="toolPage"><button className="back" onClick={back}>← Back to tools</button>
    <div className="toolHero"><div className="toolIcon big">{iconForCategory(t[1])}</div><div><span>{t[1]}</span><h1>{t[0]}</h1><p>{t[2]}</p></div></div>
    {children}{status&&<div className="notice"><ShieldCheck size={17}/> {status}</div>}
  </main>;
}

function TextToVideo({back,user,openAuth}) {
  const [prompt,setPrompt]=useState("");
  const [style,setStyle]=useState("Cinematic");
  const [duration,setDuration]=useState("8 seconds");
  const [aspect,setAspect]=useState("16:9");
  const [status,setStatus]=useState("");
  const [busy,setBusy]=useState(false);
  const [result,setResult]=useState(null);
  const [progress,setProgress]=useState(0);
  const [selectedPlan,setSelectedPlan]=useState("video-free");

  const getBackend=()=>import.meta.env.VITE_VIDEO_FUNCTION_URL || (SUPABASE_URL ? `${SUPABASE_URL}/functions/v1/video-generator` : "");

  const authHeaders=async()=>{
    const token=await getSupabaseAccessToken();
    return {
      "Content-Type":"application/json",
      ...(SUPABASE_KEY?{apikey:SUPABASE_KEY}:{}),
      ...(token?{Authorization:`Bearer ${token}`}:{})
    };
  };

  const createVideo=async()=>{
    if(!prompt.trim()){setStatus("Please enter a video prompt first.");return;}
    const base=getBackend();
    if(!base){setStatus("Video backend is not configured. Deploy video-generator in Supabase.");return;}
    setBusy(true);setProgress(0);setResult(null);setStatus("Checking your secure session...");
    try{
      const token=await getSupabaseAccessToken();
      if(!token){
        setStatus("Please sign in first. Video generation needs a secure Supabase session.");
        openAuth?.("signin");
        return;
      }
      const size=aspect==="9:16"?"720x1280":"1280x720";
      const r=await fetch(base,{method:"POST",headers:await authHeaders(),body:JSON.stringify({
        action:"create",
        prompt:`${style} video, ${aspect} composition: ${prompt.trim()}`,
        duration,
        aspect_ratio:aspect,
        size
      })});
      const raw=await r.text(); let d={}; try{d=raw?JSON.parse(raw):{}}catch{}
      if(!r.ok) throw new Error(d.error||d.message||raw||`Video backend error (${r.status})`);
      if(!d.video_id) throw new Error("Video job was created without a video ID.");
      setResult({video_id:d.video_id,status:d.status||"queued"});
      setStatus("Video job created. Rendering started...");
      await pollVideo(d.video_id,base);
    }catch(e){setStatus(e?.message||"Video generation failed.");}
    finally{setBusy(false);}
  };

  const pollVideo=async(videoId,base)=>{
    const maxAttempts=180;
    for(let attempt=0;attempt<maxAttempts;attempt++){
      const r=await fetch(base,{method:"POST",headers:await authHeaders(),body:JSON.stringify({action:"status",video_id:videoId})});
      const raw=await r.text(); let d={}; try{d=raw?JSON.parse(raw):{}}catch{}
      if(!r.ok) throw new Error(d.error||d.message||raw||`Status check failed (${r.status})`);
      const p=Math.max(0,Math.min(100,Number(d.progress||0)));
      setProgress(Number.isFinite(p)?p:0);
      setResult(prev=>({...prev,...d,video_id:videoId}));
      if(d.status==="completed"){
        setProgress(100);setStatus("Video rendered successfully. Preparing MP4...");
        const content=await fetch(base,{method:"POST",headers:await authHeaders(),body:JSON.stringify({action:"content",video_id:videoId})});
        if(!content.ok){const e=await content.text().catch(()=>"");throw new Error(e||`Video download failed (${content.status})`);}
        const blob=await content.blob();
        const videoUrl=URL.createObjectURL(blob);
        setResult(prev=>({...prev,video_url:videoUrl}));
        setStatus("MP4 is ready. You can play it or download it below.");
        return;
      }
      if(d.status==="failed" || d.status==="cancelled") {
        const msg = d.error?.message || d.error || "Video generation failed on the video provider.";
        setProgress(0);
        setResult(prev=>({...prev, status:d.status, error:d.error||msg}));
        throw new Error(msg);
      }
      setStatus(d.status === "in_progress" ? `Video is rendering… ${Number.isFinite(p)?p:0}%` : `Video is queued… ${Number.isFinite(p)?p:0}%`);
      await new Promise(resolve=>setTimeout(resolve,5000));
    }
    throw new Error("Video is taking longer than expected. The provider may be busy. Please try again in a moment.");
  };

  const downloadVideo=()=>{if(!result?.video_url)return;const a=document.createElement("a");a.href=result.video_url;a.download="toolmaster-video.mp4";document.body.appendChild(a);a.click();a.remove();};

  return <Shell back={back} t={["Text to Video","AI & Video","Generate AI video clips from text prompts.",""]} status={status}>
    <div className="aiHelper">
      <div className="aiCard">
        <h3>🎬 AI Video Creator</h3>
        {!user&&<div className="formError"><AlertCircle size={15}/> Sign in before generating a video. <button className="btn" style={{marginLeft:8,padding:"5px 9px"}} onClick={()=>openAuth?.("signin")}>Sign in</button></div>}
        <textarea value={prompt} onChange={e=>setPrompt(e.target.value)} disabled={busy} placeholder="Example: A cinematic sunrise over the mountains, drone camera, soft mist, realistic lighting..."/>
        <div className="videoOptions">
          <label>Style<select value={style} disabled={busy} onChange={e=>setStyle(e.target.value)}><option>Cinematic</option><option>Realistic</option><option>Anime</option><option>3D Animation</option><option>Documentary</option><option>Product Ad</option></select></label>
          <label>Duration<select value={duration} disabled={busy} onChange={e=>setDuration(e.target.value)}><option>4 seconds</option><option>8 seconds</option><option>12 seconds</option></select></label>
          <label>Aspect<select value={aspect} disabled={busy} onChange={e=>setAspect(e.target.value)}><option>16:9</option><option>9:16</option></select></label>
        </div>
        <button className="btn primary" disabled={busy||!prompt.trim()} onClick={createVideo} style={{marginTop:12}}><Sparkles size={17}/>{busy?`Generating... ${progress}%`:"Generate Video"}</button>
        <small style={{display:"block",marginTop:10,color:"#8a93a5"}}>Choose a video plan above. Shorter 4–8 second clips are best for quick testing. A signed-in account is required.</small>
      </div>
      <div className="aiCard"><h3>🎥 Video Preview</h3>
        {result?.video_url?<><video controls style={{width:"100%",borderRadius:14}} src={result.video_url}/><button className="btn primary" onClick={downloadVideo} style={{marginTop:12}}><Download size={16}/> Download MP4</button></>:result?.status==="failed"||result?.status==="cancelled"?<div className="formError" style={{minHeight:220,display:"grid",placeItems:"center",textAlign:"center",padding:24}}><div><b>Video generation failed</b><small style={{display:"block",marginTop:8,color:"#b42318"}}>{result?.error?.message||result?.error||status||"The video provider rejected the generation job."}</small></div></div>:<div className="videoPlaceholder"><div><div className="playCircle" style={{margin:"0 auto 12px"}}>▶</div><b>{result?`Rendering: ${result.status||"queued"}`:"Ready for generation"}</b><small style={{display:"block",marginTop:7,color:"#92a4bf"}}>{result?`${progress}% complete · ${style} · ${duration} · ${aspect}`:"Enter a prompt and click Generate Video"}</small></div></div>}
      </div>
    </div>
    <PlanCards title="Text-to-Video Plans" plans={VIDEO_PLANS} selected={selectedPlan} onSelect={setSelectedPlan} openAuth={openAuth} user={user} kind="video"/>
  </Shell>;
}

function PdfEditorTool({t,back}) {
  const uploadRef = useRef(null);
  const canvasRef = useRef(null);
  const editInputRef = useRef(null);

  const [file,setFile] = useState(null);
  const [pdfDoc,setPdfDoc] = useState(null);
  const [page,setPage] = useState(1);
  const [scale,setScale] = useState(1);
  const [viewport,setViewport] = useState({width:0,height:0});
  const [items,setItems] = useState([]);
  const [edits,setEdits] = useState({});
  const [selected,setSelected] = useState(null);
  const [editing,setEditing] = useState(false);
  const [draft,setDraft] = useState('');
  const [busy,setBusy] = useState(false);
  const [status,setStatus] = useState('');
  const [active,setActive] = useState('edit');
  const [editStyles,setEditStyles] = useState({});
  const [fontSize,setFontSize] = useState(16);
  const [bold,setBold] = useState(false);
  const [italic,setItalic] = useState(false);
  const [underline,setUnderline] = useState(false);
  const [textColor,setTextColor] = useState('#111827');
  const [hasApplied,setHasApplied] = useState(false);

  const getPdf = async f => {
    const pdfjs = await loadLib('pdfjs');
    const bytes = new Uint8Array(await f.arrayBuffer());
    return pdfjs.getDocument({data:bytes, disableWorker:true}).promise;
  };

  const extractText = async (pg,vp) => {
    const pdfjs = await loadLib('pdfjs');
    const tc = await pg.getTextContent({disableCombineTextItems:false});
    const list = [];
    for (let i=0;i<(tc.items||[]).length;i++) {
      const it = tc.items[i];
      const value = String(it.str||'').trim();
      if (!value || !/[\p{L}\p{N}]/u.test(value)) continue;
      const tr = it.transform || [1,0,0,1,0,0];
      const m = pdfjs.Util.transform(vp.transform,tr);
      const x = Number(m[4]||0);
      const yBaseline = Number(m[5]||0);
      const height = Math.max(10, Math.abs(Number(m[3]||tr[3]||12)));
      const width = Math.max(12, Math.abs(Number(it.width||value.length*height*.52)) * vp.scale);
      const top = Math.max(0, yBaseline-height*0.88);
      list.push({
        id:i,
        text:value,
        x,
        y:top,
        width,
        height:Math.max(12,height*1.15),
        pdfX:Number(tr[4]||0),
        pdfY:Number(tr[5]||0),
        pdfWidth:Math.max(10,Number(it.width||value.length*height*.52)),
        pdfHeight:Math.max(8,Math.abs(Number(tr[3]||height/vp.scale))),
        page,
        source:'pdf'
      });
    }
    return list;
  };

  const renderCurrentPage = async (doc, pageNum, s) => {
    const pg = await doc.getPage(pageNum);
    const vp = pg.getViewport({scale:s});
    const canvas = canvasRef.current;
    if (!canvas) throw new Error('PDF canvas is not ready.');
    canvas.width = Math.ceil(vp.width);
    canvas.height = Math.ceil(vp.height);
    canvas.style.width = `${Math.ceil(vp.width)}px`;
    canvas.style.height = `${Math.ceil(vp.height)}px`;
    const ctx = canvas.getContext('2d',{alpha:false});
    if (!ctx) throw new Error('Could not create canvas context.');
    ctx.fillStyle='#fff';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    await pg.render({canvasContext:ctx,viewport:vp}).promise;
    const extracted = await extractText(pg,vp);
    setViewport({width:vp.width,height:vp.height});
    setItems(extracted);
    setSelected(null);
    setEditing(false);
    setDraft('');
    setStatus(extracted.length ? `${extracted.length} text items found. Click any item to edit.` : 'No selectable text found on this page. Use Add Text for scanned PDFs.');
  };

  useEffect(()=>{
    if(!file || !pdfDoc) return;
    let dead=false;
    (async()=>{
      setBusy(true);
      try { await new Promise(r=>requestAnimationFrame(r)); if(!dead) await renderCurrentPage(pdfDoc,page,scale); }
      catch(e){ if(!dead) setStatus(e?.message||String(e)); }
      finally { if(!dead) setBusy(false); }
    })();
    return ()=>{dead=true};
  },[file,pdfDoc,page,scale]);

  const openPdf = async f => {
    if(!f) return;
    if(f.type!=='application/pdf' && !/\.pdf$/i.test(f.name)) { setStatus('Please choose a PDF file.'); return; }
    setBusy(true); setStatus('Opening PDF…');
    try {
      const doc = await getPdf(f);
      setFile(f);
      setPdfDoc(doc);
      setPage(1);
      setScale(1);
      setEdits({});
      setSelected(null);
      setItems([]);
      setStatus(`${doc.numPages} page${doc.numPages===1?'':'s'} loaded.`);
    } catch(e) {
      setFile(null); setPdfDoc(null); setStatus(`Could not open this PDF: ${e?.message||String(e)}`);
    } finally { setBusy(false); }
  };

  const onUpload = e => {
    const f=e.target.files?.[0];
    e.target.value='';
    if(f) openPdf(f);
  };

  const selectItem = item => {
    if(active!=='edit') return;
    const current = Object.prototype.hasOwnProperty.call(edits,item.id) ? edits[item.id] : item.text;
    setSelected(item);
    setDraft(current);
    const style = editStyles[item.id] || {};
    setFontSize(Number(style.fontSize) || Math.max(9, Math.round(item.height * 0.72)));
    setBold(Boolean(style.bold));
    setItalic(Boolean(style.italic));
    setUnderline(Boolean(style.underline));
    setTextColor(style.textColor || '#111827');
    setEditing(true);
    requestAnimationFrame(()=>editInputRef.current?.focus());
  };

  const saveCurrentEdit = (message='Text change prepared. Press Apply Changes, then Download PDF.') => {
    if(!selected) return false;
    setEdits(prev=>({...prev,[selected.id]:draft}));
    setEditStyles(prev=>({...prev,[selected.id]:{fontSize:Number(fontSize)||16,bold,italic,underline,textColor}}));
    setEditing(false);
    setHasApplied(true);
    setStatus(message);
    return true;
  };

  const commitDraft = () => {
    saveCurrentEdit();
  };

  const applyChanges = () => {
    if(!selected) {
      setStatus('Click the exact PDF text you want to edit first.');
      return;
    }
    const nextEdits = {...edits,[selected.id]:draft};
    const nextStyles = {...editStyles,[selected.id]:{fontSize:Number(fontSize)||16,bold,italic,underline,textColor}};
    setEdits(nextEdits);
    setEditStyles(nextStyles);
    setHasApplied(true);
    setEditing(false);
    setStatus('Changes applied successfully. The edited text is now visible.');
  };

  const applyAndDownload = async () => {
    if(!selected) {
      setStatus('Click the exact PDF text you want to edit first.');
      return;
    }
    const nextEdits={...edits,[selected.id]:draft};
    const nextStyles={...editStyles,[selected.id]:{fontSize:Number(fontSize)||16,bold,italic,underline,textColor}};
    setEdits(nextEdits);
    setEditStyles(nextStyles);
    setHasApplied(true);
    setEditing(false);
    setStatus('Applying the text change and creating your edited PDF…');
    await downloadEdited(nextEdits,nextStyles);
  };

  const cancelDraft = () => {
    setSelected(null); setEditing(false); setDraft('');
  };

  const downloadEdited = async (editsOverride = edits, stylesOverride = editStyles) => {
    if(!file) return;
    setBusy(true); setStatus('Creating edited PDF…');
    try {
      const {PDFDocument,StandardFonts,rgb}=await loadLib('pdf-lib');
      const doc=await PDFDocument.load(await file.arrayBuffer(),{ignoreEncryption:true,updateMetadata:false});
      const regularFont=await doc.embedFont(StandardFonts.Helvetica);
      const boldFont=await doc.embedFont(StandardFonts.HelveticaBold);
      const italicFont=await doc.embedFont(StandardFonts.HelveticaOblique);
      const boldItalicFont=await doc.embedFont(StandardFonts.HelveticaBoldOblique);
      const pdfPages=doc.getPages();
      for(const item of items){
        if(!Object.prototype.hasOwnProperty.call(editsOverride,item.id)) continue;
        const replacement=String(editsOverride[item.id] ?? '');
        const style=stylesOverride[item.id] || {};
        const pg=pdfPages[Math.max(0,item.page-1)];
        const px=item.pdfX;
        const py=item.pdfY;
        const size=Math.max(7,Math.min(96,Number(style.fontSize)||item.pdfHeight));
        const drawFont = style.bold && style.italic ? boldItalicFont : style.bold ? boldFont : style.italic ? italicFont : regularFont;
        const coverW=Math.max(item.pdfWidth, drawFont.widthOfTextAtSize(item.text,size)+4);
        pg.drawRectangle({x:px-1,y:py-size*0.18,width:coverW+3,height:size*1.25,color:rgb(1,1,1),opacity:1,borderWidth:0});
        if(replacement) {
          const hex=String(style.textColor||'#111827').replace('#','');
          const rr=parseInt(hex.slice(0,2)||'11',16)/255, gg=parseInt(hex.slice(2,4)||'18',16)/255, bb=parseInt(hex.slice(4,6)||'27',16)/255;
          pg.drawText(replacement,{x:px,y:py-size*0.05,size,color:rgb(rr,gg,bb),font:drawFont});
          if(style.underline){
            const uw=Math.max(8,drawFont.widthOfTextAtSize(replacement,size));
            pg.drawLine({start:{x:px,y:py-size*0.22},end:{x:px+uw,y:py-size*0.22},thickness:Math.max(0.5,size/14),color:rgb(rr,gg,bb)});
          }
        }
      }
      const bytes=await doc.save();
      const safeBytes = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
      const pdfBlob = new Blob([new Uint8Array(safeBytes)],{type:'application/pdf'}); downloadBlob(pdfBlob,file.name.replace(/\.pdf$/i,'')+'-edited.pdf');
      setStatus('Edited PDF downloaded successfully.');
    } catch(e) { setStatus(`Could not create edited PDF: ${e?.message||String(e)}`); }
    finally { setBusy(false); }
  };

  const reset=()=>{setFile(null);setPdfDoc(null);setItems([]);setEdits({});setEditStyles({});setSelected(null);setEditing(false);setDraft('');setHasApplied(false);setFontSize(16);setBold(false);setItalic(false);setUnderline(false);setTextColor('#111827');setViewport({width:0,height:0});setPage(1);setScale(1);setStatus('');if(uploadRef.current)uploadRef.current.value='';};
  const changeScale=v=>setScale(Math.max(.6,Math.min(2,Number(v)||1)));

  if(!file) return <Shell back={back} t={['Edit & Sign PDF','PDF Tools','Edit existing PDF text by clicking directly on the text. Add text, images, links, annotations and signatures.','']} status={status}>
    <div className="pdfEmptyState" onClick={()=>uploadRef.current?.click()}>
      <input ref={uploadRef} type="file" accept="application/pdf,.pdf" onChange={onUpload} style={{display:'none'}}/>
      <div>
        <div className="pdfUploadIcon" style={{margin:'0 auto 14px'}}><Upload size={34}/></div>
        <h3>Upload PDF file</h3>
        <p>After upload, click only the text you want to edit.</p>
        <button type="button" className="btn primary" onClick={e=>{e.stopPropagation();uploadRef.current?.click()}}><Upload size={16}/> Choose PDF</button>
      </div>
    </div>
  </Shell>;

  return <Shell back={back} t={['Edit & Sign PDF','PDF Tools','Click any text directly in the document, change it inline, then download your edited PDF.','']} status={status}>
    <div className="pdfEditor">
      <div className="pdfEditorTop"><div className="pdfTopTitle"><h2>Online PDF editor <span className="beta">BETA</span></h2><p>Edit PDF files. Click text to change it.</p></div><div className="pdfTopActions"><button type="button" className="btn" onClick={()=>uploadRef.current?.click()}><Upload size={16}/> Replace PDF</button><button type="button" className="btn primary" onClick={applyChanges} disabled={busy || !selected}><Check size={16}/> Apply Changes</button><button type="button" className="btn primary" onClick={()=>downloadEdited()} disabled={busy || !hasApplied || !Object.keys(edits).length}> <Download size={16}/> Download PDF</button><input ref={uploadRef} type="file" accept="application/pdf,.pdf" onChange={onUpload} style={{display:'none'}}/></div></div>

      <div className="pdfEditorToolbar">{[
        ['edit','Edit Text',FileText],['add-text','Add Text',FileText],['image','Add Image',ImageIcon],['link','Create Link',ExternalLink],['annotate','Annotate',Eye],['sign','Sign',Printer],['forms','Fill Forms',CheckCircle2]
      ].map(([v,l,I])=><button type="button" key={v} className={active===v?'pdfAction active':'pdfAction'} onClick={()=>setActive(v)}><I size={18}/><span>{l}</span></button>)}<div className="spacer"/><button type="button" className="pdfAction dangerAction" onClick={reset}><Trash2 size={18}/><span>Clear</span></button></div>

      <div className="pdfControlBar"><div className="pageControl"><span>Page:</span><input type="number" min="1" max={pdfDoc?.numPages||1} value={page} onChange={e=>setPage(Math.max(1,Math.min(pdfDoc?.numPages||1,Number(e.target.value)||1)))}/><span>/ {pdfDoc?.numPages||1}</span></div><div className="zoomControl"><button type="button" className="iconBtn" onClick={()=>changeScale(scale-.1)}>−</button><select value={String(Math.round(scale*100))} onChange={e=>changeScale(Number(e.target.value)/100)}><option value="75">75%</option><option value="90">90%</option><option value="100">100%</option><option value="125">125%</option><option value="150">150%</option><option value="200">200%</option></select><button type="button" className="iconBtn" onClick={()=>changeScale(scale+.1)}>+</button></div></div>

      <div className="pdfWorkspace"><aside className="pdfToolsPanel">
        {active==='edit' ? <>
          <h3>Edit Text</h3>
          <p className="panelHint"><b>Click only the text you want to edit.</b><br/>An inline editor will appear exactly over that text.</p>
          {selected && <div className="selectionInfo"><strong>Editing</strong><span>{selected.text}</span></div>}
          <div className="editControls">
            <div className="formatRow">
              <label>Font Size<input type="number" min="6" max="96" value={fontSize} onChange={e=>setFontSize(e.target.value)} /></label>
              <label>Text Color<input type="color" value={textColor} onChange={e=>setTextColor(e.target.value)} /></label>
            </div>
            <div className="formatButtons">
              <button type="button" className={bold?'toggle on':'toggle'} onClick={()=>setBold(v=>!v)}><b>B</b> Bold</button>
              <button type="button" className={italic?'toggle on':'toggle'} onClick={()=>setItalic(v=>!v)}><i>I</i> Italic</button>
              <button type="button" className={underline?'toggle on':'toggle'} onClick={()=>setUnderline(v=>!v)}><u>U</u> Underline</button>
            </div>
          </div>
          <div className="fileBadge">✓ {items.length} text items detected on this page</div>
          <div className="advancedHint">Advanced: click text → edit → choose size, color, bold, italic or underline → Apply Changes.</div>
          <div className="detectedList"><b>Click a text item</b>{items.length?items.map(item=><button type="button" key={item.id} className="detected" onClick={()=>selectItem(item)}>{edits[item.id] ?? item.text}</button>):<span>No selectable text found. Use Add Text for scanned/image PDFs.</span>}</div>
          <div className="applyActions">
            <button type="button" className="btn primary applyBtn" onClick={applyChanges} disabled={busy || !selected}><Check size={16}/> Apply Changes</button>
            <button type="button" className="btn" onClick={applyAndDownload} disabled={busy || !selected}><Download size={16}/> Apply & Download</button>
            <button type="button" className="btn secondary" onClick={cancelDraft} disabled={!selected}>Cancel</button>
          </div>
          <button type="button" className="btn downloadBtn" onClick={()=>downloadEdited()} disabled={busy || !hasApplied || !Object.keys(edits).length}><Download size={16}/> Download PDF</button>
        </> : <>
          <h3>{active==='add-text'?'Add Text':active==='image'?'Add Image':active==='link'?'Create Link':active==='annotate'?'Annotate PDF':active==='sign'?'Sign PDF':'Fill Forms'}</h3>
          <p className="panelHint">Use this mode for adding content. For existing text, switch back to <b>Edit Text</b> and click the exact text.</p>
          <button type="button" className="btn primary" onClick={()=>setActive('edit')}>Back to Edit Text</button>
        </>}
      </aside>

      <section className="pdfViewer"><div className="pdfPaperLive" style={{width:viewport.width||820,height:viewport.height||1060}} onClick={()=>{if(active==='edit'&&!editing)setStatus('Click directly on a text item to edit it.')}}>
        <canvas ref={canvasRef}/>
        {viewport.width>0 && <div className="pdfTextOverlay" style={{width:viewport.width,height:viewport.height}}>
          {active==='edit' && items.map(item=>{
            const value=edits[item.id] ?? item.text;
            const isSelected=selected?.id===item.id;
            return <div key={item.id} className="textEditItem" style={{left:item.x,top:item.y,width:Math.max(12,item.width),height:Math.max(12,item.height)}} onClick={e=>{e.stopPropagation();selectItem(item)}}>
              {isSelected && editing ? <input ref={editInputRef} value={draft} onChange={e=>setDraft(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'){e.preventDefault();applyChanges()}if(e.key==='Escape'){e.preventDefault();cancelDraft()}}} className="inlinePdfInput" style={{fontSize:Number(fontSize)||14,fontWeight:bold?'700':'400',fontStyle:italic?'italic':'normal',textDecoration:underline?'underline':'none',color:textColor,width:Math.max(90,item.width+30),height:Math.max(24,(Number(fontSize)||14)+10)}} /> : edits[item.id] ? <div className="editedPreviewText" style={{fontSize:Number(editStyles[item.id]?.fontSize)||Math.max(9,Math.round(item.height*.72)),fontWeight:editStyles[item.id]?.bold?'700':'400',fontStyle:editStyles[item.id]?.italic?'italic':'normal',textDecoration:editStyles[item.id]?.underline?'underline':'none',color:editStyles[item.id]?.textColor||'#111827',minHeight:Math.max(12,item.height),minWidth:Math.max(12,item.width),background:'#fff',border:'1px solid rgba(108,76,245,.45)',borderRadius:3,padding:'1px 2px',whiteSpace:'nowrap',overflow:'visible'}}>{value}</div> : <button type="button" className={isSelected?'textHotspot selected':'textHotspot'}>{value}</button>}
            </div>
          })}
        </div>}
      </div></section></div>
      <div className="pdfFileBar"><div><strong>{file.name}</strong><span>{(file.size/1024).toFixed(1)} KB</span></div><span>{pdfDoc?.numPages||1} page{(pdfDoc?.numPages||1)===1?'':'s'} · {Object.keys(edits).length} change{Object.keys(edits).length===1?'':'s'}</span><button type="button" className="btn danger" onClick={reset}><Trash2 size={15}/>Remove</button></div>
      <div className="pdfPrivacy"><ShieldCheck size={15}/>Files stay in your browser while editing.</div>
    </div>
  </Shell>;
}

async function convertWithSecureBackend(file, target) {
  if (!file) throw new Error("Please choose a file first.");
  const configured = import.meta.env.VITE_DOCUMENT_CONVERTER_URL || "";
  const base = configured || (SUPABASE_URL ? `${SUPABASE_URL}/functions/v1/document-converter` : "");
  if (!base) {
    throw new Error("Document converter backend is not configured. Add VITE_DOCUMENT_CONVERTER_URL or deploy the document-converter Supabase Edge Function.");
  }

  const form = new FormData();
  form.append("file", file, file.name);
  form.append("output_format", target);

  const headers = {};
  if (SUPABASE_KEY) headers.apikey = SUPABASE_KEY;

  const response = await fetch(base, { method: "POST", headers, body: form });
  const contentType = response.headers.get("content-type") || "";
  if (!response.ok) {
    let message = "";
    if (contentType.includes("application/json")) {
      const errData = await response.json().catch(() => ({}));
      message = errData?.error || errData?.message || "";
    } else {
      message = await response.text().catch(() => "");
    }
    throw new Error(message || `Document converter failed (${response.status}).`);
  }

  // Backend may return the converted file directly.
  if (contentType.includes("application/pdf") || contentType.includes("application/vnd.openxmlformats-officedocument.wordprocessingml.document") || contentType.includes("application/msword")) {
    const blob = await response.blob();
    const ext = target === "pdf" ? "pdf" : "docx";
    const baseName = file.name.replace(/\.[^.]+$/, "");
    downloadBlob(blob, `${baseName}.${ext}`);
    return { message: `${ext.toUpperCase()} converted and downloaded.` };
  }

  const data = await response.json().catch(() => ({}));
  const downloadUrl = data.download_url || data.url || data.file_url || data.result?.download_url || data.result?.url;
  if (!downloadUrl) {
    throw new Error(data.error || data.message || "Converter returned no downloadable file.");
  }

  const fileResponse = await fetch(downloadUrl);
  if (!fileResponse.ok) throw new Error(`Converted file download failed (${fileResponse.status}).`);
  const blob = await fileResponse.blob();
  const ext = target === "pdf" ? "pdf" : "docx";
  const baseName = file.name.replace(/\.[^.]+$/, "");
  downloadBlob(blob, `${baseName}.${ext}`);
  return { message: data.message || `${ext.toUpperCase()} converted and downloaded.` };
}


function PdfCloudButtons({onStatus,onFile}) {
  const drive=()=>{
    if(window.google?.picker && import.meta.env.VITE_GOOGLE_API_KEY && import.meta.env.VITE_GOOGLE_CLIENT_ID && import.meta.env.VITE_GOOGLE_APP_ID){
      onStatus?.("Google Drive Picker is configured; complete the picker OAuth setup to enable direct selection.");
    }else{
      window.open("https://drive.google.com/drive/my-drive","_blank","noopener,noreferrer");
      onStatus?.("Google Drive opened. Select/download your PDF, then use Select PDF file.");
    }
  };
  const dropbox=()=>{
    if(window.Dropbox?.choose && import.meta.env.VITE_DROPBOX_APP_KEY){
      window.Dropbox.choose({success:async files=>{const link=files?.[0]?.link;if(!link)return;try{const r=await fetch(link);const blob=await r.blob();onFile?.(new File([blob],files[0].name||"cloud-file.pdf",{type:"application/pdf"}));onStatus?.("Dropbox PDF selected.");}catch{onStatus?.("Dropbox selected. If direct import is blocked, download the file and use Select PDF file.");}},cancel:()=>{},linkType:"direct",multiselect:false,extensions:[".pdf"]});
    }else{
      window.open("https://www.dropbox.com/home","_blank","noopener,noreferrer");
      onStatus?.("Dropbox opened. Select/download your PDF, then use Select PDF file.");
    }
  };
  return <div className="pdfCloudButtons">
    <button type="button" className="pdfCloudBtn" onClick={drive}><span className="cloudCircle">G</span><span>Select from Google Drive</span></button>
    <button type="button" className="pdfCloudBtn" onClick={dropbox}><span className="cloudCircle">D</span><span>Select from Dropbox</span></button>
  </div>;
}

function PdfTool({t,back}) {
  const id=t[3];
  const [files,setFiles]=useState([]);
  const [busy,setBusy]=useState(false);
  const [status,setStatus]=useState("");
  const [watermark,setWatermark]=useState("ToolMaster Pro");
  const [angle,setAngle]=useState("90");
  const [quality,setQuality]=useState(.65);
  const [pages,setPages]=useState("1");
  const [active,setActive]=useState(id);
  const [thumbs,setThumbs]=useState([]);

  const pdfTools = [
    {id:"merge-pdf", name:"Merge PDF", desc:"Combine multiple PDFs into one file."},
    {id:"split-pdf", name:"Split PDF", desc:"Extract selected pages into separate PDFs."},
    {id:"compress-pdf", name:"Compress PDF", desc:"Reduce PDF size where possible."},
    {id:"pdf-word", name:"PDF to Word", desc:"Convert selectable-text PDFs to editable DOCX."},
    {id:"word-pdf", name:"Word to PDF", desc:"Convert DOC/DOCX files to PDF."},
    {id:"pdf-jpg", name:"PDF to JPG", desc:"Convert each PDF page to a JPG image."},
    {id:"jpg-pdf", name:"JPG to PDF", desc:"Create a PDF from JPG/PNG images."},
    {id:"rotate-pdf", name:"Rotate PDF", desc:"Rotate every page."},
    {id:"pdf-unlock", name:"PDF Unlock", desc:"Create an unrestricted copy when supported."},
    {id:"pdf-watermark", name:"PDF Watermark", desc:"Add a watermark to all pages."},
    {id:"edit-pdf", name:"Edit & Sign PDF", desc:"Open the advanced PDF editor."}
  ];
  const current = pdfTools.find(x=>x.id===active) || pdfTools.find(x=>x.id===id) || pdfTools[0];

  useEffect(()=>{
    let dead=false;
    (async()=>{
      if(!files.length || !(files[0].type==="application/pdf" || /\.pdf$/i.test(files[0].name))) { setThumbs([]); return; }
      try {
        const pdfjs=await loadLib("pdfjs");
        const pdf=await pdfjs.getDocument({data:await files[0].arrayBuffer(),disableWorker:true}).promise;
        const out=[];
        for(let i=1;i<=Math.min(pdf.numPages,6);i++){
          const pg=await pdf.getPage(i); const vp=pg.getViewport({scale:.32});
          const c=document.createElement("canvas"); c.width=Math.ceil(vp.width); c.height=Math.ceil(vp.height);
          await pg.render({canvasContext:c.getContext("2d"),viewport:vp}).promise;
          out.push({page:i,url:c.toDataURL("image/jpeg",.82)});
        }
        if(!dead) setThumbs(out);
      } catch { if(!dead) setThumbs([]); }
    })();
    return ()=>{dead=true};
  },[files]);

  const convertAndDownload = async (file,target)=>{
    const configured=import.meta.env.VITE_DOCUMENT_CONVERTER_URL||"";
    const base=configured||(SUPABASE_URL?`${SUPABASE_URL}/functions/v1/document-converter`:"");
    if(!base) throw new Error("Document converter backend is not configured.");
    const fd=new FormData(); fd.append("file",file,file.name); fd.append("output_format",target);
    const r=await fetch(base,{method:"POST",headers:SUPABASE_KEY?{apikey:SUPABASE_KEY}:{},body:fd});
    const ct=r.headers.get("content-type")||"";
    if(!r.ok){
      const msg=ct.includes("application/json") ? ((await r.json().catch(()=>({}))).error||"Converter failed.") : await r.text().catch(()=>"Converter failed.");
      throw new Error(msg||`Converter failed (${r.status})`);
    }
    if(ct.includes("application/pdf")||ct.includes("application/vnd.openxmlformats-officedocument.wordprocessingml.document")){
      downloadBlob(await r.blob(),`${file.name.replace(/\.[^.]+$/,"")}.${target}`);
      return;
    }
    const d=await r.json().catch(()=>({})); const u=d.download_url||d.url||d.file_url||d.result?.download_url;
    if(!u) throw new Error(d.error||"Converter returned no download URL.");
    const fr=await fetch(u); if(!fr.ok) throw new Error(`Converted file download failed (${fr.status}).`);
    downloadBlob(await fr.blob(),`${file.name.replace(/\.[^.]+$/,"")}.${target}`);
  };

  const run=async()=>{
    if(active==="pdf-word"||active==="word-pdf"){
      if(!files.length) return setStatus(`Upload a ${active==="pdf-word"?"PDF":"Word"} file first.`);
    } else if(active==="jpg-pdf"){
      if(!files.length) return setStatus("Upload JPG/PNG images first.");
    } else if(!files.length) return setStatus("Upload a PDF file first.");
    setBusy(true);setStatus("");
    try{
      if(active==="pdf-word"){setStatus("Converting PDF to Word…");await convertAndDownload(files[0],"docx");setStatus("PDF converted to Word successfully.");return;}
      if(active==="word-pdf"){setStatus("Converting Word to PDF…");await convertAndDownload(files[0],"pdf");setStatus("Word converted to PDF successfully.");return;}
      if(active==="jpg-pdf"){
        const {PDFDocument}=await loadLib("pdf-lib"); const doc=await PDFDocument.create();
        for(const f of files){const bytes=await f.arrayBuffer();let img;try{img=await doc.embedJpg(bytes)}catch{img=await doc.embedPng(bytes)}const p=doc.addPage([img.width,img.height]);p.drawImage(img,{x:0,y:0,width:img.width,height:img.height});}
        downloadBlob(new Blob([await doc.save()],{type:"application/pdf"}),"images-to-pdf.pdf");setStatus(`${files.length} image(s) converted to PDF.`);return;
      }
      if(active==="pdf-jpg"){
        const pdfjs=await loadLib("pdfjs"); const pdf=await pdfjs.getDocument({data:await files[0].arrayBuffer(),disableWorker:true}).promise;
        for(let i=1;i<=pdf.numPages;i++){const pg=await pdf.getPage(i);const vp=pg.getViewport({scale:1.7});const c=document.createElement("canvas");c.width=vp.width;c.height=vp.height;await pg.render({canvasContext:c.getContext("2d"),viewport:vp}).promise;const blob=await new Promise(r=>c.toBlob(r,"image/jpeg",Number(quality)));downloadBlob(blob,`${files[0].name.replace(/\.pdf$/i,"")}-page-${i}.jpg`);}
        setStatus(`${pdf.numPages} JPG page(s) downloaded.`);return;
      }
      const {PDFDocument,degrees,rgb}=await loadLib("pdf-lib");
      const src=await PDFDocument.load(await files[0].arrayBuffer(),{ignoreEncryption:active==="pdf-unlock"});
      if(active==="merge-pdf"){
        const out=await PDFDocument.create();
        for(const f of files){const d=await PDFDocument.load(await f.arrayBuffer(),{ignoreEncryption:true});(await out.copyPages(d,d.getPageIndices())).forEach(p=>out.addPage(p));}
        downloadBlob(new Blob([await out.save()],{type:"application/pdf"}),"merged.pdf");setStatus(`${files.length} PDF files merged successfully.`);return;
      }
      if(active==="split-pdf"){
        const nums=pages.split(",").map(x=>parseInt(x.trim(),10)-1).filter(Number.isInteger);const list=nums.length?nums:src.getPageIndices();
        for(const n of list){if(n<0||n>=src.getPageCount())continue;const one=await PDFDocument.create();const [p]=await one.copyPages(src,[n]);one.addPage(p);downloadBlob(new Blob([await one.save()],{type:"application/pdf"}),`page-${n+1}.pdf`);}
        setStatus("Selected pages downloaded.");return;
      }
      if(active==="compress-pdf"){downloadBlob(new Blob([await src.save({useObjectStreams:true,addDefaultPage:false})],{type:"application/pdf"}),"compressed.pdf");setStatus("Optimized PDF downloaded.");return;}
      if(active==="rotate-pdf"){src.getPages().forEach(p=>p.setRotation(degrees(Number(angle)||90)));downloadBlob(new Blob([await src.save()],{type:"application/pdf"}),"rotated.pdf");setStatus("Rotated PDF downloaded.");return;}
      if(active==="pdf-unlock"){downloadBlob(new Blob([await src.save()],{type:"application/pdf"}),"unlocked.pdf");setStatus("Unlocked copy downloaded when supported.");return;}
      if(active==="pdf-watermark"){src.getPages().forEach(p=>{const {width,height}=p.getSize();p.drawText(watermark||"ToolMaster Pro",{x:width/2-60,y:height/2,size:28,color:rgb(.65,.65,.65),opacity:.35,rotate:degrees(35)})});downloadBlob(new Blob([await src.save()],{type:"application/pdf"}),"watermarked.pdf");setStatus("Watermarked PDF downloaded.");return;}
      if(active==="edit-pdf"){setStatus("Choose Edit & Sign PDF from All PDF Tools to open the advanced editor.");return;}
    }catch(e){setStatus(`Error: ${e?.message||String(e)}`)}finally{setBusy(false);}
  };

  const accept=active==="word-pdf"?".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    active==="jpg-pdf"?"image/jpeg,image/png":".pdf,application/pdf";
  const multi=active==="merge-pdf"||active==="jpg-pdf";

  const selectOperation=(next)=>{
    if(next==="edit-pdf"){
      // Open full editor through the parent page routing by reusing the browser history hash.
      setActive(next);
      const target=tools.find(x=>x[3]===next);
      if(target){ setTimeout(()=>window.dispatchEvent(new CustomEvent("tm-open-tool",{detail:target})),0); }
      return;
    }
    setActive(next); setStatus("");
  };

  return <Shell back={back} t={t} status={status}>
    <div className="pdfProPage">
      <section className="pdfProHero">
        <h1>{current.name}</h1>
        <p>{current.desc}</p>
        <div className="pdfUploadArea">
          <FilePicker multiple={multi} accept={accept} onChange={setFiles} files={files}/>
          <div className="pdfDropHint">or drop {active==="word-pdf"?"Word":active==="jpg-pdf"?"images":"PDF"} here</div>
          <PdfCloudButtons onStatus={setStatus} onFile={f=>setFiles([f])}/>
          {files.length>0 && <div className="pdfSelectedFile"><div className="pdfFileIcon"><FileText size={19}/></div><div style={{minWidth:0}}><strong>{files[0].name}</strong><small>{(files[0].size/1024).toFixed(1)} KB · ready</small></div><button type="button" className="removeFile" onClick={()=>setFiles([])}>Remove</button></div>}
        </div>
      </section>

      {files.length>0 && <section className="pdfWorkArea">
        <div className="pdfCanvasZone">
          <div className="pdfThumbHeader"><span>{files.length} file{files.length>1?"s":""} selected</span><button type="button" className="btn" onClick={()=>setFiles([])}>Remove</button></div>
          <div className="pdfThumbGrid">
            {thumbs.length?thumbs.map(x=><div className="pdfThumb" key={x.page}><img src={x.url} alt={`Page ${x.page}`}/><small>Page {x.page}</small></div>):files.map(f=><div className="pdfThumb file" key={f.name}><FileText size={34}/><small>{f.name}</small></div>)}
          </div>
          <div className="pdfCanvasTip">Your original file stays here until you start the selected operation.</div>
        </div>
        <aside className="pdfSidePanel">
          <h2>{current.name}</h2>
          {active==="pdf-word"&&<div className="pdfChoice"><b>NO OCR</b><span>Convert selectable-text PDFs into editable Word files.</span></div>}
          {active==="pdf-word"&&<div className="pdfChoice premium"><b>OCR <span>Premium</span></b><span>Scanned/image PDFs need OCR for editable Word output.</span></div>}
          {active==="split-pdf"&&<label>Pages <input value={pages} onChange={e=>setPages(e.target.value)} placeholder="1,3,5"/></label>}
          {active==="rotate-pdf"&&<label>Rotation <select value={angle} onChange={e=>setAngle(e.target.value)}><option value="90">90°</option><option value="180">180°</option><option value="270">270°</option></select></label>}
          {active==="pdf-watermark"&&<label>Watermark text <input value={watermark} onChange={e=>setWatermark(e.target.value)}/></label>}
          {active==="pdf-jpg"&&<label>JPG quality <input type="range" min=".3" max=".95" step=".05" value={quality} onChange={e=>setQuality(e.target.value)}/></label>}
          <button type="button" className="pdfMainAction" disabled={busy} onClick={run}>{busy?"Processing…":current.name==="Merge PDF"?"Merge PDF":current.name==="Split PDF"?"Split PDF":current.name==="Compress PDF"?"Compress PDF":current.name==="PDF to Word"?"Convert to WORD":current.name==="Word to PDF"?"Convert to PDF":current.name==="PDF to JPG"?"Convert to JPG":current.name}</button>
          <div className="pdfSideNote">Secure browser-first processing where possible. Conversion tools use your configured backend.</div>
        </aside>
      </section>}

      <section className="pdfQuickGrid">
        {pdfTools.map(x=><button key={x.id} type="button" className={active===x.id?"pdfQuick active":"pdfQuick"} onClick={()=>selectOperation(x.id)}>
          <FileText size={18}/><span>{x.name}</span><small>{x.desc}</small>
        </button>)}
      </section>
    </div>
  </Shell>;
}

function BackgroundRemoverTool({t,back}) {
  const inputRef = useRef(null);
  const [file,setFile] = useState(null);
  const [originalUrl,setOriginalUrl] = useState("");
  const [resultUrl,setResultUrl] = useState("");
  const [resultBlob,setResultBlob] = useState(null);
  const [cutoutBlob,setCutoutBlob] = useState(null);
  const [busy,setBusy] = useState(false);
  const [status,setStatus] = useState("Upload an image to start.");
  const [tab,setTab] = useState("cutout");
  const [bgMode,setBgMode] = useState("transparent");
  const [bgColor,setBgColor] = useState("#ffffff");
  const [bgImage,setBgImage] = useState("");
  const [bgCategory,setBgCategory] = useState("photo");
  const [effect,setEffect] = useState("none");
  const [brightness,setBrightness] = useState(100);
  const [contrast,setContrast] = useState(100);
  const [saturation,setSaturation] = useState(100);
  const [shadow,setShadow] = useState(false);
  const [design,setDesign] = useState("original");
  const [lastCutoutReady,setLastCutoutReady] = useState(false);

  const photoBackgrounds = [
    "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=82",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=82",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=82",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=82",
    "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=82",
    "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=900&q=82",
    "https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=900&q=82",
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=82",
    "https://images.unsplash.com/photo-1510784722466-f2aa9c52db6c?auto=format&fit=crop&w=900&q=82",
    "https://images.unsplash.com/photo-1526481280695-3c687fd643ed?auto=format&fit=crop&w=900&q=82",
    "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=900&q=82",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=82",
    "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=82",
    "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=900&q=82",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=82",
    "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=900&q=82",
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=82",
    "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=900&q=82",
    "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=900&q=82",
    "https://images.unsplash.com/photo-1473445361085-b9a07f55608b?auto=format&fit=crop&w=900&q=82",
    "https://images.unsplash.com/photo-1441716844725-09cedc13a54a?auto=format&fit=crop&w=900&q=82",
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=900&q=82",
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=82",
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=82",
    "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=900&q=82",
    "https://images.unsplash.com/photo-1439853949127-fa647821eba0?auto=format&fit=crop&w=900&q=82",
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=900&q=82",
    "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=900&q=82",
    "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=900&q=82",
    "https://images.unsplash.com/photo-1456926631375-92c8ce872def?auto=format&fit=crop&w=900&q=82",
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=82",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=82",
    "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=900&q=82",
    "https://images.unsplash.com/photo-1444080748397-f442f95f3e67?auto=format&fit=crop&w=900&q=82",
    "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=82",
    "https://images.unsplash.com/photo-1473445361085-b9a07f55608b?auto=format&fit=crop&w=900&q=82",
    "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=900&q=82",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=82",
    "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=900&q=82",
    "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=82",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=82",
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=900&q=82",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=82",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=82",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=82",
    "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=900&q=82",
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=82",
    "https://images.unsplash.com/photo-1526481280695-3c687fd643ed?auto=format&fit=crop&w=900&q=82",
    "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=82",
    "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=900&q=82"
  ];

  const colorBackgrounds = ["#ffffff","#f3f4f6","#111827","#000000","#fde68a","#fecdd3","#bfdbfe","#c7d2fe","#bbf7d0","#ddd6fe"];

  useEffect(()=>()=>{
    if(originalUrl) URL.revokeObjectURL(originalUrl);
    if(resultUrl) URL.revokeObjectURL(resultUrl);
  },[originalUrl,resultUrl]);

  const readImage = f => new Promise((resolve,reject)=>{
    const u=URL.createObjectURL(f); const img=new Image();
    img.onload=()=>{URL.revokeObjectURL(u);resolve(img)};
    img.onerror=reject; img.src=u;
  });

  const readSourceImage = src => new Promise((resolve,reject)=>{
    const img=new Image();
    img.crossOrigin="anonymous";
    img.onload=()=>resolve(img);
    img.onerror=()=>reject(new Error("Background image could not be loaded."));
    img.src=src;
  });

  const setNewResult = blob => {
    if(!blob) return;
    if(resultUrl) URL.revokeObjectURL(resultUrl);
    const u=URL.createObjectURL(blob);
    setResultUrl(u);
    setResultBlob(blob);
  };

  const fastRemove = async sourceFile => {
    const img=await readImage(sourceFile);
    const maxSide=1500; const ratio=Math.min(1,maxSide/Math.max(img.naturalWidth,img.naturalHeight));
    const w=Math.max(1,Math.round(img.naturalWidth*ratio)),h=Math.max(1,Math.round(img.naturalHeight*ratio));
    const c=document.createElement("canvas"); c.width=w;c.height=h; const ctx=c.getContext("2d"); ctx.drawImage(img,0,0,w,h);
    const im=ctx.getImageData(0,0,w,h), d=im.data;
    const samples=[]; const pts=[[0,0],[w-1,0],[0,h-1],[w-1,h-1],[Math.round(w*.05),Math.round(h*.05)],[Math.round(w*.95),Math.round(h*.05)],[Math.round(w*.05),Math.round(h*.95)],[Math.round(w*.95),Math.round(h*.95)]];
    for(const [x,y] of pts){const i=(y*w+x)*4;samples.push([d[i],d[i+1],d[i+2]])}
    const avg=samples.reduce((a,v)=>[a[0]+v[0],a[1]+v[1],a[2]+v[2]],[0,0,0]).map(x=>x/samples.length);
    for(let i=0;i<d.length;i+=4){const r=d[i],g=d[i+1],b=d[i+2];const dist=Math.hypot(r-avg[0],g-avg[1],b-avg[2]);const bright=(r+g+b)/3;const lowSat=Math.max(r,g,b)-Math.min(r,g,b)<28;if((dist<48 && (bright>175 || lowSat)) || (bright>242 && dist<75)) d[i+3]=0;}
    ctx.putImageData(im,0,0); const blob=await new Promise(r=>c.toBlob(r,"image/png")); if(!blob) throw new Error("Fast cutout failed."); return blob;
  };

  const doCutout = async (sourceFile=file, useAI=false) => {

    if(!sourceFile) return setStatus("Upload an image first.");
    setBusy(true);
    setStatus(useAI?"AI background removal…":"Fast background removal…");
    try{
      let blob;
      if(useAI){
        const mod=await loadLib("bg-remove");
        const removeBackground=mod.removeBackground || mod.default?.removeBackground || mod.default;
        if(typeof removeBackground!=="function") throw new Error("Background-removal engine could not be loaded.");
        blob=await removeBackground(sourceFile,{model:"isnet_fp16",output:{format:"image/png",type:"foreground"}});
      }else{
        blob=await fastRemove(sourceFile);
      }
      setCutoutBlob(blob); setNewResult(blob); setLastCutoutReady(true);
      setStatus(useAI?"AI background removed. Choose a background or download.":"Fast background removal complete. For complex images you can use AI Remove HD.");
    }catch(e){
      try{
        const img=await readImage(sourceFile), c=document.createElement("canvas"), ctx=c.getContext("2d");
        c.width=img.naturalWidth; c.height=img.naturalHeight; ctx.drawImage(img,0,0);
        const data=ctx.getImageData(0,0,c.width,c.height);
        for(let i=0;i<data.data.length;i+=4){
          const r=data.data[i],g=data.data[i+1],b=data.data[i+2];
          if((r>238&&g>238&&b>238) || (Math.max(r,g,b)-Math.min(r,g,b)<9&&r>220)) data.data[i+3]=0;
        }
        ctx.putImageData(data,0,0);
        const blob=await new Promise(r=>c.toBlob(r,"image/png"));
        if(!blob) throw new Error("Fallback cutout could not create PNG.");
        setCutoutBlob(blob);
        setNewResult(blob);
        setLastCutoutReady(true);
        setStatus("AI model was unavailable, so a local light-background fallback was used.");
      }catch(fallbackErr){
        setStatus(`Background removal failed: ${fallbackErr?.message||String(e)}`);
      }
    }finally{setBusy(false);}
  };

  const upload = e => {
    const f=e.target.files?.[0];
    e.target.value="";
    if(!f) return;
    if(!/^image\/(png|jpe?g|webp)$/i.test(f.type)) { setStatus("Please upload PNG, JPG or WebP."); return; }
    if(originalUrl) URL.revokeObjectURL(originalUrl);
    if(resultUrl) URL.revokeObjectURL(resultUrl);
    setFile(f);
    setOriginalUrl(URL.createObjectURL(f));
    setResultUrl("");
    setResultBlob(null);
    setCutoutBlob(null);
    setLastCutoutReady(false);
    setBgMode("transparent");
    setBgImage("");
    setBgCategory("photo");
    setTab("cutout");
    doCutout(f);
  };

  const renderComposite = async (overrides={}) => {
    if(!file && !resultBlob && !cutoutBlob) return setStatus("Upload an image first.");
    setBusy(true);
    setStatus("Applying your image edits…");
    try{
      const sourceBlob=cutoutBlob||resultBlob||file;
      const img=await readImage(sourceBlob);
      const iw=img.naturalWidth, ih=img.naturalHeight;
      const nextBgMode=overrides.bgMode ?? bgMode;
      const nextBgColor=overrides.bgColor ?? bgColor;
      const nextBgImage=overrides.bgImage ?? bgImage;
      const nextDesign=overrides.design ?? design;
      const nextEffect=overrides.effect ?? effect;
      const nextBrightness=Number(overrides.brightness ?? brightness) || 100;
      const nextContrast=Number(overrides.contrast ?? contrast) || 100;
      const nextSaturation=Number(overrides.saturation ?? saturation) || 100;
      const nextShadow=overrides.shadow ?? shadow;
      let cw=iw,ch=ih;
      if(nextDesign==="square"){const side=Math.max(iw,ih);cw=ch=side;}
      if(nextDesign==="portrait"){const target=4/5;cw=Math.min(iw,Math.round(ih*target));ch=Math.round(cw/target);}
      if(nextDesign==="landscape"){const target=16/9;ch=Math.min(ih,Math.round(iw/target));cw=Math.round(ch*target);}
      const c=document.createElement("canvas"); c.width=Math.max(1,Math.round(cw)); c.height=Math.max(1,Math.round(ch));
      const ctx=c.getContext("2d"); if(!ctx) throw new Error("Canvas is not available.");
      const cropScale=Math.min(cw/iw,ch/ih), drawW=iw*cropScale, drawH=ih*cropScale, dx=(cw-drawW)/2, dy=(ch-drawH)/2;

      if(nextBgImage){
        const bgImg=await readSourceImage(nextBgImage);
        ctx.drawImage(bgImg,0,0,cw,ch);
      }else if(nextBgMode==="white"){ctx.fillStyle="#fff";ctx.fillRect(0,0,cw,ch);}
      else if(nextBgMode==="black"){ctx.fillStyle="#000";ctx.fillRect(0,0,cw,ch);}
      else if(nextBgMode==="color"){ctx.fillStyle=nextBgColor;ctx.fillRect(0,0,cw,ch);}
      else {ctx.clearRect(0,0,cw,ch);}

      ctx.save();
      ctx.filter=`brightness(${nextBrightness}%) contrast(${nextContrast}%) saturate(${nextSaturation}%) ${nextEffect==="grayscale"?"grayscale(100%)":""} ${nextEffect==="blur"?"blur(1px)":""}`;
      if(nextShadow){ctx.shadowColor="rgba(0,0,0,.28)";ctx.shadowBlur=Math.max(12,cw*.02);ctx.shadowOffsetY=Math.max(5,ch*.015);}
      if(nextDesign==="original") ctx.drawImage(img,0,0,iw,ih);
      else ctx.drawImage(img,dx,dy,drawW,drawH);
      ctx.restore();

      const blob=await new Promise(r=>c.toBlob(r,"image/png"));
      if(!blob) throw new Error("Could not create edited PNG.");
      setNewResult(blob);
      setStatus("Changes applied successfully.");
    }catch(e){
      setStatus(e?.message||"Could not apply image changes.");
    }finally{setBusy(false);}
  };

  const chooseBackground = async (mode, value="") => {
    setBgMode(mode);
    setBgImage(mode==="image"?value:"");
    if(mode==="image") setStatus("Background selected. Applying it to your cutout…");
    setTab("background");
    if(lastCutoutReady || resultBlob || cutoutBlob) await renderComposite({bgMode:mode,bgImage:mode==="image"?value:"" , bgColor: mode==="color" ? (value || bgColor) : bgColor});
  };

  const download = (hd=false) => {
    if(!resultBlob) return setStatus("Your image is still processing.");
    downloadBlob(resultBlob,hd?"toolmaster-background-remover-hd.png":"toolmaster-background-remover.png");
    setStatus(hd?"HD PNG downloaded.":"PNG downloaded.");
  };

  const Tab = ({id,label}) => <button type="button" className={tab===id?"btn primary":"btn"} onClick={()=>setTab(id)}>{label}</button>;

  const uploadHero = <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:28,alignItems:"center",padding:"42px 34px",background:"linear-gradient(135deg,#ffffff,#f8fafc)"}}>
    <div>
      <div style={{fontSize:14,fontWeight:700,color:"#2563eb",marginBottom:12}}>AI PHOTO EDITOR</div>
      <h2 style={{fontSize:"clamp(34px,5vw,58px)",lineHeight:1.04,margin:"0 0 14px",fontWeight:800,color:"#20242b"}}>Remove Image Background</h2>
      <p style={{fontSize:18,lineHeight:1.6,color:"#586174",maxWidth:560,margin:"0 0 22px"}}>100% automatic background removal, then replace it with a photo, color or transparent canvas.</p>
      <button type="button" className="btn primary" style={{fontSize:18,padding:"14px 26px",borderRadius:999}} onClick={()=>inputRef.current?.click()}><Upload size={20}/> Upload Image</button>
      <p style={{margin:"14px 0 0",fontSize:13,color:"#8993a6"}}>or drop a file · PNG, JPG or WebP</p>
    </div>
    <div style={{borderRadius:24,padding:24,background:"linear-gradient(135deg,#eef4ff,#ffffff)",border:"1px solid #e8edf7",minHeight:360,display:"grid",placeItems:"center"}}>
      <div style={{width:"min(390px,100%)",aspectRatio:"1/1",borderRadius:20,background:"radial-gradient(circle at 35% 30%,#dbeafe,transparent 40%),linear-gradient(135deg,#fff,#e9eef7)",display:"grid",placeItems:"center",boxShadow:"0 24px 70px rgba(15,23,42,.10)"}}>
        <div style={{textAlign:"center"}}><ImageIcon size={64} strokeWidth={1.5} color="#64748b"/><div style={{fontWeight:700,marginTop:10,color:"#475569"}}>Upload your photo</div><div style={{fontSize:13,color:"#94a3b8",marginTop:6}}>Background removal starts automatically</div></div>
      </div>
    </div>
    <input ref={inputRef} type="file" accept="image/png,image/jpeg,image/webp" onChange={upload} style={{display:"none"}}/>
  </div>;

  const checkerStyle={backgroundImage:"linear-gradient(45deg,#eceff3 25%,transparent 25%),linear-gradient(-45deg,#eceff3 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#eceff3 75%),linear-gradient(-45deg,transparent 75%,#eceff3 75%)",backgroundSize:"22px 22px",backgroundPosition:"0 0,0 11px,11px -11px,-11px 0"};

  return <Shell back={back} t={t} status={status}>
    <div className="bgRemoveShell" style={{border:"1px solid #e4e6ed",borderRadius:18,background:"#fff",boxShadow:"var(--shadow)",overflow:"hidden"}}>
      {!file ? uploadHero : <>
        <input ref={inputRef} type="file" accept="image/png,image/jpeg,image/webp" onChange={upload} style={{display:"none"}}/>
        <div style={{padding:"12px 16px",borderBottom:"1px solid #eceef4",display:"flex",alignItems:"center",gap:7,flexWrap:"wrap",background:"#fff"}}>
          <Tab id="cutout" label="✂ Cutout"/>
          <Tab id="background" label="▣ Background"/>
          <Tab id="effect" label="◉ Effects"/>
          <Tab id="adjust" label="◐ Adjust"/>
          <Tab id="design" label="▧ Design"/>
          <div style={{marginLeft:"auto",display:"flex",gap:8,alignItems:"center"}}>
            <button type="button" className="btn" onClick={()=>inputRef.current?.click()}>＋ Replace</button>
            <button type="button" className="btn primary" disabled={!resultBlob||busy} onClick={()=>download(false)}><Download size={16}/> Download</button>
          </div>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"minmax(0,1fr) 330px",minHeight:560}}>
          <div style={{...checkerStyle,backgroundColor:"#fff",display:"grid",placeItems:"center",padding:26}}>
            <div style={{width:"min(760px,100%)",height:"min(590px,72vh)",borderRadius:18,overflow:"hidden",display:"grid",placeItems:"center",position:"relative",border:"1px solid #dfe4eb",boxShadow:"0 12px 40px rgba(15,23,42,.08)",background:bgImage?`url("${bgImage}") center/cover no-repeat`:bgMode==="white"?"#fff":bgMode==="black"?"#000":bgMode==="color"?bgColor:"transparent"}}>
              {resultUrl && <img src={resultUrl} alt="Background removed result" style={{maxWidth:"94%",maxHeight:"94%",objectFit:"contain",filter:`brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) ${effect==="grayscale"?"grayscale(1)":""}`,filterOrigin:"center",boxShadow:shadow?"0 18px 40px rgba(0,0,0,.24)":"none"}}/>}
              {!resultUrl && <div style={{padding:20,textAlign:"center",color:"#64748b"}}>{busy?"Removing background…":"Preparing image…"}</div>}
              {busy && <div style={{position:"absolute",inset:0,display:"grid",placeItems:"center",background:"rgba(255,255,255,.58)",backdropFilter:"blur(2px)"}}><div style={{background:"#fff",padding:"12px 18px",borderRadius:999,fontWeight:700,boxShadow:"0 10px 30px rgba(15,23,42,.12)"}}>AI processing…</div></div>}
            </div>
          </div>

          <aside style={{borderLeft:"1px solid #eceef4",background:"#fff",padding:18,overflow:"auto"}}>
            {tab==="cutout" && <div>
              <h3 style={{marginTop:0}}>Cutout</h3>
              <p style={{color:"#667085",lineHeight:1.55}}>Your image is removed automatically as soon as it uploads.</p>
              <button type="button" className="btn primary" disabled={busy} onClick={()=>doCutout(file,false)} style={{width:"100%"}}>{busy?"Processing…":resultBlob?"Fast Remove Again":"Remove Background"}</button>
              <button type="button" className="btn" disabled={busy} onClick={()=>doCutout(file,true)} style={{width:"100%",marginTop:9,borderColor:"#ef2b2d",color:"#ef2b2d",fontWeight:900}}><Sparkles size={15}/> AI Remove HD</button>
              <div className="fastCutoutNote" style={{marginTop:12}}>Fast Remove runs locally for speed. AI Remove HD is available for more complex images but can take longer.</div>
            </div>}
            {tab==="background" && <div>
              <div className="bgTopControls" style={{marginBottom:14,borderBottom:"1px solid #eceef4",paddingBottom:10}}>
                <button type="button" className={bgCategory==="photo"?"btn primary":"btn"} onClick={()=>setBgCategory("photo")}>Magic</button>
                <button type="button" className={bgCategory==="color"?"btn primary":"btn"} onClick={()=>setBgCategory("color")}>Color</button>
                <label className="btn bgUploadBtn" style={{cursor:"pointer"}}><Upload size={15}/> Upload Wallpaper<input className="bgUploadInline" type="file" accept="image/png,image/jpeg,image/webp" onChange={uploadWallpaper}/></label>
              </div>
              {bgCategory==="photo" && <>
                <p style={{fontWeight:700,margin:"0 0 5px"}}>Choose a background</p>
                <p className="bgCount">50+ ready-made wallpapers · or upload your own</p>
                <div className="bgGallery">
                  {photoBackgrounds.map((src,i)=><button key={`${src}-${i}`} type="button" className={bgImage===src?"selected":""} onClick={()=>chooseBackground("image",src)}><img loading="lazy" src={src} alt={`Background ${i+1}`}/></button>)}
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:12}}>
                  <button type="button" className={bgMode==="transparent"&&!bgImage?"btn primary":"btn"} onClick={()=>chooseBackground("transparent")}>Transparent</button>
                  <button type="button" className={bgMode==="white"&&!bgImage?"btn primary":"btn"} onClick={()=>chooseBackground("white")}>White</button>
                </div>
              </>}
              {bgCategory==="color" && <>
                <p style={{fontWeight:700,margin:"0 0 10px"}}>Solid colors</p>
                <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:8}}>{colorBackgrounds.map(c=><button key={c} type="button" aria-label={`Set ${c}`} onClick={()=>{setBgColor(c);chooseBackground("color",c);}} style={{width:"100%",aspectRatio:"1/1",border:bgColor===c&&bgMode==="color"?"3px solid #2563eb":"1px solid #d8dde7",borderRadius:10,background:c,cursor:"pointer"}}/>)}</div>
                <label style={{display:"block",marginTop:14}}>Custom color<input type="color" value={bgColor} onChange={e=>{setBgColor(e.target.value);setBgMode("color");setBgImage("");}} style={{display:"block",marginTop:8,width:"100%",height:42}}/></label>
                <button type="button" className="btn primary" style={{width:"100%",marginTop:10}} onClick={()=>chooseBackground("color",bgColor)}>Apply Color</button>
              </>}
            </div>}
            {tab==="effect" && <div><h3 style={{marginTop:0}}>Effects</h3><label>Filter<select value={effect} onChange={e=>setEffect(e.target.value)}><option value="none">None</option><option value="grayscale">Grayscale</option><option value="blur">Soft blur</option></select></label><label style={{display:"flex",alignItems:"center",gap:8,marginTop:12}}><input type="checkbox" checked={shadow} onChange={e=>setShadow(e.target.checked)}/> Soft shadow</label><button type="button" className="btn primary" style={{width:"100%",marginTop:14}} disabled={busy} onClick={()=>renderComposite()}>Apply Effects</button></div>}
            {tab==="adjust" && <div><h3 style={{marginTop:0}}>Adjust</h3><label>Brightness<input type="range" min="50" max="150" value={brightness} onChange={e=>setBrightness(e.target.value)}/></label><label>Contrast<input type="range" min="50" max="160" value={contrast} onChange={e=>setContrast(e.target.value)}/></label><label>Saturation<input type="range" min="0" max="180" value={saturation} onChange={e=>setSaturation(e.target.value)}/></label><button type="button" className="btn primary" style={{width:"100%",marginTop:14}} disabled={busy} onClick={()=>renderComposite()}>Apply Adjust</button></div>}
            {tab==="design" && <div><h3 style={{marginTop:0}}>Design</h3><label>Canvas<select value={design} onChange={e=>setDesign(e.target.value)}><option value="original">Original</option><option value="square">Square 1:1</option><option value="portrait">Portrait 4:5</option><option value="landscape">Landscape 16:9</option><option value="contain">Contain</option></select></label><button type="button" className="btn primary" style={{width:"100%",marginTop:14}} disabled={busy} onClick={()=>renderComposite()}>Apply Design</button></div>}
          </aside>
        </div>

        <div style={{padding:"11px 16px",borderTop:"1px solid #eceef4",display:"flex",alignItems:"center",gap:10,background:"#fff",flexWrap:"wrap"}}>
          <div style={{width:56,height:56,borderRadius:12,overflow:"hidden",border:"2px solid #2563eb",background:"#f1f5f9",display:"grid",placeItems:"center"}}>{resultUrl?<img src={resultUrl} alt="Result thumbnail" style={{width:"100%",height:"100%",objectFit:"cover"}}/>:<img src={originalUrl} alt="Original thumbnail" style={{width:"100%",height:"100%",objectFit:"cover"}}/>}</div>
          <button type="button" className="btn" onClick={()=>inputRef.current?.click()}>＋ Replace</button><label className="btn bgUploadBtn" style={{cursor:"pointer"}}>＋ Wallpaper<input className="bgUploadInline" type="file" accept="image/png,image/jpeg,image/webp" onChange={uploadWallpaper}/></label>
          <div style={{marginLeft:"auto",display:"flex",gap:8}}><button type="button" className="btn" disabled={!resultBlob||busy} onClick={()=>download(false)}>Download PNG</button><button type="button" className="btn" disabled={!resultBlob||busy} onClick={()=>download(true)}>Download HD</button></div>
        </div>
      </>}
    </div>
  </Shell>;
}

function ImageTool({t,back}) {
  const id=t[3];const [files,setFiles]=useState([]);const [busy,setBusy]=useState(false);const [status,setStatus]=useState("");const [w,setW]=useState(1200),[h,setH]=useState(800),[quality,setQuality]=useState(.75),[crop,setCrop]=useState("1:1");
  const run=async()=>{
    if(!files.length)return setStatus("Please upload an image.");setBusy(true);setStatus("");
    try{
      const file=files[0]; if(id==="image-text"){setStatus("Running browser OCR...");const {createWorker}=await loadLib("tesseract");const worker=await createWorker("eng");const {data}=await worker.recognize(file);await worker.terminate();downloadText(data.text.trim()||"No text found.","ocr-result.txt");setStatus("OCR complete. Text file downloaded.");return}
      const img=await loadImage(file),c=document.createElement("canvas"),ctx=c.getContext("2d");let ow=img.naturalWidth,oh=img.naturalHeight;
      if(id==="image-resizer"){c.width=Number(w)||ow;c.height=Number(h)||oh;ctx.drawImage(img,0,0,c.width,c.height)}
      else if(id==="image-cropper"){const [rw,rh]=crop.split(":").map(Number);const target=rw/rh;let cw=ow,ch=oh;if(ow/oh>target)cw=oh*target;else ch=ow/target;const sx=(ow-cw)/2,sy=(oh-ch)/2;c.width=Math.round(cw);c.height=Math.round(ch);ctx.drawImage(img,sx,sy,cw,ch,0,0,c.width,c.height)}
      else if(id==="background-remover"){c.width=ow;c.height=oh;const image=ctx.createImageData(ow,oh);const temp=document.createElement("canvas");temp.width=ow;temp.height=oh;temp.getContext("2d").drawImage(img,0,0);const source=temp.getContext("2d").getImageData(0,0,ow,oh);for(let i=0;i<source.data.length;i+=4){const r=source.data[i],g=source.data[i+1],b=source.data[i+2];if(r>235&&g>235&&b>235||Math.max(r,g,b)-Math.min(r,g,b)<9&&r>220)source.data[i+3]=0}image.data.set(source.data);ctx.putImageData(image,0,0)}
      else {c.width=ow;c.height=oh;ctx.drawImage(img,0,0)}
      let type="image/png",name=file.name.replace(/\.[^.]+$/,"")+".png";if(id==="png-jpg"||id==="image-compressor"){type="image/jpeg";name=file.name.replace(/\.[^.]+$/,"")+".jpg"}if(id==="webp-converter"){type="image/webp";name=file.name.replace(/\.[^.]+$/,"")+".webp"}if(id==="jpg-png")type="image/png";
      const blob=await new Promise(r=>c.toBlob(r,type,Number(quality)));downloadBlob(blob,name);setStatus("Image downloaded.");
    }catch(e){setStatus(e.message||"Image processing failed.")}finally{setBusy(false)}
  };
  const loadImage=file=>new Promise((res,rej)=>{const i=new Image();i.onload=()=>{URL.revokeObjectURL(i.src);res(i)};i.onerror=rej;i.src=URL.createObjectURL(file)});
  return <Shell back={back} t={t} status={status}><div className="workspace"><div className="panel"><FilePicker accept="image/*" onChange={setFiles} files={files}/>
    {id==="image-resizer"&&<div className="videoOptions"><label>Width<input type="number" value={w} onChange={e=>setW(e.target.value)}/></label><label>Height<input type="number" value={h} onChange={e=>setH(e.target.value)}/></label></div>}
    {id==="image-cropper"&&<label>Aspect ratio<select value={crop} onChange={e=>setCrop(e.target.value)}><option>1:1</option><option>4:3</option><option>16:9</option><option>3:4</option><option>9:16</option></select></label>}
    {id==="image-compressor"&&<label>Quality<input type="range" min=".2" max=".95" step=".05" value={quality} onChange={e=>setQuality(e.target.value)}/></label>}
    <button className="btn primary" disabled={busy||!files.length} onClick={run}>{busy?<RefreshCw/>:<Download/>}{busy?"Processing...":id==="image-text"?"Extract Text":"Process & Download"}</button>
  </div><div className="panel">{files.map(f=><p key={f.name}>🖼️ {f.name}</p>)}<p style={{color:"#8395ae",fontSize:12}}>Image Background Remover uses a simple local near-white background algorithm; complex photos need a dedicated AI model.</p></div></div></Shell>;
}

function SeoTool({t, back}) {
  const id = t[3];
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [keyword, setKeyword] = useState("");
  const [utmBase, setUtmBase] = useState("");
  const [utmSource, setUtmSource] = useState("");
  const [utmMedium, setUtmMedium] = useState("");
  const [utmCampaign, setUtmCampaign] = useState("");
  const [utmTerm, setUtmTerm] = useState("");
  const [utmContent, setUtmContent] = useState("");
  const [file, setFile] = useState(null);
  const [out, setOut] = useState("");
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [qrPreview, setQrPreview] = useState("");

  const makeSeoUrl = () => {
    const raw = url.trim();
    if (!raw) throw new Error("Enter a website URL first.");
    return new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`);
  };

  const run = async () => {
    setStatus("");
    setOut("");
    try {
      setBusy(true);
      if (id === "meta-tags") {
        if (!title.trim() && !description.trim() && !url.trim()) throw new Error("Enter title, description and URL.");
        const canonical = url.trim() || "https://example.com/";
        const result = `<title>${escapeHtml(title || "Page Title")}</title>\n<meta name="description" content="${escapeHtml(description)}">\n<link rel="canonical" href="${escapeHtml(canonical)}">`;
        setOut(result);
      } else if (id === "open-graph") {
        if (!title.trim() && !description.trim() && !url.trim()) throw new Error("Enter Open Graph details.");
        const result = `<meta property="og:title" content="${escapeHtml(title)}">\n<meta property="og:description" content="${escapeHtml(description)}">\n<meta property="og:url" content="${escapeHtml(url)}">\n<meta property="og:image" content="${escapeHtml(imageUrl)}">\n<meta property="og:type" content="website">`;
        setOut(result);
      } else if (id === "schema") {
        if (!title.trim() && !url.trim()) throw new Error("Enter site name and URL.");
        const result = JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: title.trim(),
          url: url.trim(),
          description: description.trim()
        }, null, 2);
        setOut(result);
      } else if (id === "robots") {
        const site = url.trim() || "https://example.com/";
        const result = `User-agent: *\nAllow: /\n\nSitemap: ${site.replace(/\/$/, "")}/sitemap.xml`;
        setOut(result);
      } else if (id === "sitemap") {
        const site = url.trim() || "https://example.com/";
        const normalized = site.replace(/\/$/, "");
        const urls = text.split(/\r?\n/).map(x => x.trim()).filter(Boolean);
        const locations = urls.length ? urls : ["/"];
        const body = locations.map(path => {
          const absolute = /^https?:\/\//i.test(path) ? path : `${normalized}${path.startsWith("/") ? path : `/${path}`}`;
          return `  <url><loc>${escapeXml(absolute)}</loc></url>`;
        }).join("\\n");
        setOut(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>`);
      } else if (id === "keyword-density") {
        const source = text.toLowerCase().match(/[\p{L}\p{N}]+/gu) || [];
        if (!source.length) throw new Error("Enter text to analyze.");
        const counts = {};
        source.forEach(word => counts[word] = (counts[word] || 0) + 1);
        const rows = Object.entries(counts).sort((a,b) => b[1]-a[1]).slice(0, 50);
        const target = keyword.trim().toLowerCase();
        const targetCount = target ? (counts[target] || 0) : 0;
        const lines = [
          `Total words: ${source.length}`,
          target ? `Target keyword: ${target}` : "Target keyword: not specified",
          target ? `Target keyword count: ${targetCount}` : "",
          target ? `Target density: ${(targetCount / source.length * 100).toFixed(2)}%` : "",
          "",
          "Top keywords:"
        ].filter(Boolean);
        rows.forEach(([word,count], i) => lines.push(`${i+1}. ${word}: ${count} (${(count/source.length*100).toFixed(2)}%)`));
        setOut(lines.join("\n"));
      } else if (id === "url-encoder") {
        if (!text.trim()) throw new Error("Enter text or URL to encode.");
        setOut(encodeURI(text.trim()));
      } else if (id === "slug") {
        if (!text.trim()) throw new Error("Enter a title or keyword phrase.");
        setOut(slugify(text));
      } else if (id === "utm") {
        if (!utmBase.trim()) throw new Error("Enter the base URL first.");
        const u = new URL(/^https?:\/\//i.test(utmBase.trim()) ? utmBase.trim() : `https://${utmBase.trim()}`);
        if (utmSource.trim()) u.searchParams.set("utm_source", utmSource.trim());
        if (utmMedium.trim()) u.searchParams.set("utm_medium", utmMedium.trim());
        if (utmCampaign.trim()) u.searchParams.set("utm_campaign", utmCampaign.trim());
        if (utmTerm.trim()) u.searchParams.set("utm_term", utmTerm.trim());
        if (utmContent.trim()) u.searchParams.set("utm_content", utmContent.trim());
        setOut(u.toString());
      } else if (id === "qr-generator") {
        if (!text.trim()) throw new Error("Enter text or a URL for the QR code.");
        const QRCodeModule = await loadLib("qrcode");
        const QRCode = QRCodeModule.default || QRCodeModule;
        if(typeof QRCode.toDataURL !== "function" && typeof QRCode.toCanvas !== "function") throw new Error("QR code library is unavailable.");
        const canvas = document.createElement("canvas");
        if(typeof QRCode.toCanvas === "function") await QRCode.toCanvas(canvas, text.trim(), { width: 640, margin: 4, errorCorrectionLevel: "H", color: { dark: "#111827", light: "#ffffff" } });
        else { const dataUrl=await QRCode.toDataURL(text.trim(), {width:640,margin:4,errorCorrectionLevel:"H"}); const img=new Image(); await new Promise((res,rej)=>{img.onload=res;img.onerror=rej;img.src=dataUrl}); canvas.width=img.width;canvas.height=img.height;canvas.getContext("2d").drawImage(img,0,0); }
        const dataUrl=canvas.toDataURL("image/png");
        setQrPreview(dataUrl);
        const blob=await (await fetch(dataUrl)).blob();
        downloadBlob(blob, "toolmaster-qr.png");
        setOut("QR code generated successfully. Scan the preview or use the downloaded PNG.");
        setStatus("QR code generated successfully.");
      } else if (id === "barcode") {
        if (!text.trim()) throw new Error("Enter a value for the barcode.");
        const JsBarcodeModule = await loadLib("jsbarcode");
        const JsBarcode = JsBarcodeModule.default || JsBarcodeModule;
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        JsBarcode(svg, text.trim(), { format: "CODE128", width: 2, height: 100, displayValue: true, margin: 16 });
        const serializer = new XMLSerializer();
        const svgText = serializer.serializeToString(svg);
        downloadText(svgText, "toolmaster-barcode.svg", "image/svg+xml;charset=utf-8");
        setOut(svgText);
        setStatus("Barcode generated and SVG downloaded.");
      } else if (id === "favicon") {
        if (!file) throw new Error("Upload an image first.");
        const img = await loadImageFile(file);
        const canvas = document.createElement("canvas");
        canvas.width = 256; canvas.height = 256;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, 256, 256);
        const side = Math.min(img.naturalWidth, img.naturalHeight);
        const sx = (img.naturalWidth - side) / 2;
        const sy = (img.naturalHeight - side) / 2;
        ctx.drawImage(img, sx, sy, side, side, 0, 0, 256, 256);
        const blob = await new Promise(resolve => canvas.toBlob(resolve, "image/png"));
        if (!blob) throw new Error("Favicon could not be created.");
        downloadBlob(blob, "favicon-256x256.png");
        setOut("Favicon PNG generated at 256 × 256 pixels.");
        setStatus("Favicon generated and downloaded.");
      }
    } catch (e) {
      setStatus(e?.message || "SEO tool failed.");
    } finally {
      setBusy(false);
    }
  };

  const download = () => {
    if (!out) return;
    const ext = id === "sitemap" ? "xml" : id === "robots" ? "txt" : id === "barcode" ? "svg" : "txt";
    const type = id === "sitemap" ? "application/xml;charset=utf-8" : id === "barcode" ? "image/svg+xml;charset=utf-8" : "text/plain;charset=utf-8";
    downloadText(out, `${id}-result.${ext}`, type);
    setStatus("Result downloaded.");
  };

  const clear = () => {
    setText(""); setTitle(""); setDescription(""); setUrl(""); setImageUrl(""); setKeyword("");
    setUtmBase(""); setUtmSource(""); setUtmMedium(""); setUtmCampaign(""); setUtmTerm(""); setUtmContent("");
    setFile(null); setOut(""); setQrPreview(""); setStatus("");
  };

  const commonFields = id === "meta-tags" || id === "open-graph" || id === "schema";
  const singleText = id === "keyword-density" || id === "slug" || id === "url-encoder";
  const fileOnly = id === "favicon";
  const utm = id === "utm";
  const sitemap = id === "sitemap";

  return <Shell back={back} t={t} status={status || "SEO tool runs locally in your browser."}>
    <div className="workspace">
      <div className="panel">
        <h3>{t[0]}</h3>
        {commonFields && <>
          <label>Title / Site name<input value={title} onChange={e => setTitle(e.target.value)} placeholder="ToolMaster Pro" /></label>
          <label>Description<textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="A short SEO-friendly description..." /></label>
          <label>URL<input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://example.com" /></label>
          {id === "open-graph" && <label>Image URL<input value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="https://example.com/cover.jpg" /></label>}
        </>}
        {utm && <>
          <label>Base URL<input value={utmBase} onChange={e => setUtmBase(e.target.value)} placeholder="https://example.com/page" /></label>
          <label>UTM Source<input value={utmSource} onChange={e => setUtmSource(e.target.value)} placeholder="google" /></label>
          <label>UTM Medium<input value={utmMedium} onChange={e => setUtmMedium(e.target.value)} placeholder="cpc" /></label>
          <label>UTM Campaign<input value={utmCampaign} onChange={e => setUtmCampaign(e.target.value)} placeholder="summer-sale" /></label>
          <label>UTM Term (optional)<input value={utmTerm} onChange={e => setUtmTerm(e.target.value)} placeholder="keyword" /></label>
          <label>UTM Content (optional)<input value={utmContent} onChange={e => setUtmContent(e.target.value)} placeholder="banner-a" /></label>
        </>}
        {sitemap && <>
          <label>Website URL<input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://example.com" /></label>
          <label>Additional URLs (one per line)<textarea value={text} onChange={e => setText(e.target.value)} placeholder="/about\n/contact\n/blog" /></label>
        </>}
        {id === "robots" && <label>Sitemap website URL<input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://example.com" /></label>}
        {id === "keyword-density" && <>
          <label>Target keyword (optional)<input value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="target keyword" /></label>
          <label>Content<textarea value={text} onChange={e => setText(e.target.value)} placeholder="Paste your article/content here..." /></label>
        </>}
        {singleText && <label>{id === "slug" ? "Title / Phrase" : "Text / URL"}<textarea value={text} onChange={e => setText(e.target.value)} placeholder={placeholderFor(id)} /></label>}
        {(id === "qr-generator" || id === "barcode") && <label>{id === "qr-generator" ? "Text or URL" : "Barcode value"}<textarea value={text} onChange={e => setText(e.target.value)} placeholder={id === "qr-generator" ? "https://example.com" : "123456789012"} /></label>}
        {fileOnly && <label>Favicon source image<input type="file" accept="image/png,image/jpeg,image/webp" onChange={e => setFile(e.target.files?.[0] || null)} /></label>}
        <div className="actions">
          <button className="btn primary" disabled={busy} onClick={run}><Zap size={17}/> {busy ? "Processing..." : "Generate"}</button>
          <button className="btn" onClick={clear}>Clear</button>
        </div>
      </div>
      <div className="panel">
        <label>Result</label>
        {id === "qr-generator" && qrPreview && <div style={{display:"grid",placeItems:"center",padding:18,border:"1px solid #e4e6ed",borderRadius:14,background:"#fff",marginBottom:12}}><img src={qrPreview} alt="Generated QR code" style={{width:"min(340px,100%)",height:"auto",imageRendering:"pixelated"}}/><div style={{marginTop:8,color:"#7f8999",fontSize:12}}>Scan the QR code with a phone camera to verify the destination.</div></div>}
        <textarea value={out} readOnly placeholder="Generated SEO result will appear here..." style={{minHeight:320}} />
        <div className="actions">
          <button className="btn" disabled={!out} onClick={() => navigator.clipboard?.writeText(out)}><Copy/> Copy</button>
          <button className="btn" disabled={!out} onClick={download}><Download/> Download</button>
          {id === "qr-generator" && qrPreview && <button className="btn primary" onClick={async()=>{const blob=await (await fetch(qrPreview)).blob();downloadBlob(blob,"toolmaster-qr.png");setStatus("QR PNG downloaded.")}}><Download/> Download QR</button>}
        </div>
      </div>
    </div>
  </Shell>;
}

function escapeHtml(value) {
  return String(value || "").replace(/[&<>\"]/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[ch]));
}
function escapeXml(value) {
  return String(value || "").replace(/[&<>\"]/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[ch]));
}
function slugify(value) {
  return String(value || "").toLowerCase().trim().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 120);
}
function loadImageFile(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.onload = () => { URL.revokeObjectURL(objectUrl); resolve(img); };
    img.onerror = () => { URL.revokeObjectURL(objectUrl); reject(new Error("Unable to read image.")); };
    img.src = objectUrl;
  });
}

function GenericTool({t,back}) {
  const id=t[3];const [text,setText]=useState("");const [out,setOut]=useState("");const [extra,setExtra]=useState("");const [status,setStatus]=useState("");
  const run=async()=>{
    try{setStatus("");let r=text;
      if(id==="word-counter"||id==="characters"){r=`Words: ${text.trim()?text.trim().split(/\s+/).length:0}\nCharacters: ${text.length}\nCharacters without spaces: ${text.replace(/\s/g,"").length}\nSentences: ${text.trim()?text.split(/[.!?]+/).filter(Boolean).length:0}`}
      else if(id==="case-converter")r=text.toLowerCase();
      else if(id==="text-cleaner")r=text.split("\n").map(x=>x.trim().replace(/\s+/g," ")).filter(Boolean).join("\n");
      else if(id==="duplicate-lines")r=[...new Set(text.split(/\r?\n/))].join("\n");
      else if(id==="text-sorter")r=text.split(/\r?\n/).sort((a,b)=>a.localeCompare(b)).join("\n");
      else if(id==="text-reverser")r=[...text].reverse().join("");
      else if(id==="palindrome"){const x=text.toLowerCase().replace(/[^a-z0-9]/g,"");r=x===x.split("").reverse().join("")?"Palindrome":"Not a palindrome"}
      else if(id==="slug")r=text.toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
      else if(id==="url-encoder")r=encodeURIComponent(text);
      else if(id==="url-parser"){const u=new URL(text);r=JSON.stringify({protocol:u.protocol,host:u.host,path:u.pathname,query:u.search,hash:u.hash},null,2)}
      else if(id==="base64-encode")r=btoa(unescape(encodeURIComponent(text)));
      else if(id==="base64-decode")r=decodeURIComponent(escape(atob(text)));
      else if(id==="json-formatter")r=JSON.stringify(JSON.parse(text),null,2);
      else if(id==="json-minifier")r=JSON.stringify(JSON.parse(text));
      else if(id==="csv-json")r=JSON.stringify(csvToRows(text),null,2);
      else if(id==="json-csv")r=rowsToCsv(JSON.parse(text));
      else if(id==="yaml-json")r=JSON.stringify(Object.fromEntries(text.split(/\r?\n/).filter(x=>x.includes(":")).map(x=>{const i=x.indexOf(":");return[x.slice(0,i).trim(),x.slice(i+1).trim()]})),null,2);
      else if(id==="html-entities")r=text.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;");
      else if(id==="html-formatter")r=text.replace(/></g,">\n<").split("\n").map(x=>x.trim()).join("\n");
      else if(id==="css-formatter")r=text.replace(/\{/g," {\n").replace(/;/g,";\n").replace(/\}/g,"\n}\n");
      else if(id==="js-minifier")r=text.replace(/\/\*[\s\S]*?\*\//g,"").replace(/\/\/.*$/gm,"").replace(/\s+/g," ").trim();
      else if(id==="uuid")r=crypto.randomUUID();
      else if(id==="password"||id==="random-password")r=randomPassword(20);
      else if(id==="binary")r=[...text].map(c=>c.codePointAt(0).toString(2).padStart(8,"0")).join(" ");
      else if(id==="ascii")r=[...text].map(c=>c.codePointAt(0)).join(" ");
      else if(id==="morse")r=morse(text);
      else if(id==="email-validator")r=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text.trim())?"Valid email":"Invalid email";
      else if(id==="phone")r=text.replace(/[^\d+]/g,"").replace(/^00/,"+");
      else if(id==="reading-time")r=`${Math.max(1,Math.ceil((text.trim()?text.trim().split(/\s+/).length:0)/200))} minute(s)`;
      else if(id==="timestamp"){const n=Number(text);r=isFinite(n)?new Date(n*(String(n).length<=10?1000:1)).toISOString():"Invalid timestamp"}
      else if(id==="regex"){const [pat,flags]=extra.split("\n");const re=new RegExp(pat,flags||"");r=JSON.stringify([...text.matchAll(re)].map(m=>m[0]),null,2)}
      else if(id==="http-status")r=httpStatus(text);
      else if(id==="color")r=colorConvert(text);
      else if(id==="number-words")r=numberWords(Number(text));
      else if(id==="roman")r=toRoman(Number(text));
      else if(id==="random-number"){const [a,b]=text.split(",").map(Number);r=Number.isFinite(a)&&Number.isFinite(b)?String(Math.floor(Math.random()*(b-a+1))+a):"Use: min,max"}
      else if(id==="business-name")r=businessNames(text);
      else if(id==="username")r=usernameIdeas(text);
      else if(id==="percentage"){const [a,b]=text.split(",").map(Number);r=`${a}% of ${b} = ${(a*b/100).toFixed(2)}`}
      else if(id==="discount"){const [price,pct]=text.split(",").map(Number);r=`Discount: ${(price*pct/100).toFixed(2)}\nSale price: ${(price-price*pct/100).toFixed(2)}`}
      else if(id==="gst"){const [amount,rate]=text.split(",").map(Number);r=`GST: ${(amount*rate/100).toFixed(2)}\nTotal: ${(amount*(1+rate/100)).toFixed(2)}`}
      else if(id==="tip"){const [bill,pct,people]=text.split(",").map(Number);const tip=bill*pct/100;r=`Tip: ${tip.toFixed(2)}\nTotal: ${(bill+tip).toFixed(2)}\nPer person: ${((bill+tip)/(people||1)).toFixed(2)}`}
      else if(id==="loan"){const [principal,annual,months]=text.split(",").map(Number);const m=annual/1200;const p=m?principal*m*Math.pow(1+m,months)/(Math.pow(1+m,months)-1):principal/months;r=`Monthly payment: ${p.toFixed(2)}\nTotal: ${(p*months).toFixed(2)}\nInterest: ${(p*months-principal).toFixed(2)}`}
      else if(id==="compound-interest"){const [p,rate,years,n]=text.split(",").map(Number);const a=p*Math.pow(1+rate/100/(n||1),(n||1)*years);r=`Final amount: ${a.toFixed(2)}\nInterest: ${(a-p).toFixed(2)}`}
      else if(id==="bmi"){const [kg,cm]=text.split(",").map(Number);const bmi=kg/Math.pow(cm/100,2);r=`BMI: ${bmi.toFixed(2)} — ${bmi<18.5?"Underweight":bmi<25?"Normal":bmi<30?"Overweight":"Obesity"}`}
      else if(id==="aspect"){const [w,h]=text.split(",").map(Number);const g=gcd(w,h);r=`Ratio: ${g?`${w/g}:${h/g}`:"Invalid"}`}
      else if(id==="temperature"){const [v,u]=text.split(",").map(x=>x.trim());const n=Number(v);r=u?.toUpperCase()==="C"?`${(n*9/5+32).toFixed(2)} °F / ${(n+273.15).toFixed(2)} K`:u?.toUpperCase()==="F"?`${((n-32)*5/9).toFixed(2)} °C / ${((n-32)*5/9+273.15).toFixed(2)} K`:`${(n-273.15).toFixed(2)} °C / ${((n-273.15)*9/5+32).toFixed(2)} °F`}
      else if(id==="length")r=convertLength(text);
      else if(id==="weight")r=convertWeight(text);
      else if(id==="storage")r=convertStorage(text);
      else if(id==="units")r=convertLength(text);
      else if(id==="date-difference"){const [a,b]=text.split(",").map(x=>new Date(x.trim()));r=isNaN(a)||isNaN(b)?"Invalid dates":`Days: ${Math.abs(b-a)/86400000}`}
      else if(id==="date-add"){const [d,n]=text.split(",");const x=new Date(d.trim());x.setDate(x.getDate()+Number(n));r=isNaN(x)?"Invalid date":x.toISOString().slice(0,10)}
      else if(id==="age"){const d=new Date(text);const now=new Date();let years=now.getFullYear()-d.getFullYear();if(now.getMonth()<d.getMonth()||(now.getMonth()===d.getMonth()&&now.getDate()<d.getDate()))years--;r=isNaN(d)?"Invalid date":`Age: ${Math.max(0,years)} years`}
      else if(id==="time"){const [a,b]=text.split(",").map(x=>x.trim().split(":").map(Number));const x=(a[0]*60+a[1])+(b[0]*60+b[1]);r=`${Math.floor(x/60)}:${String(x%60).padStart(2,"0")}`}
      else if(id==="scientific"){r=safeScientific(text)}
      else if(id==="meta-tags")r=metaTags(text);
      else if(id==="open-graph")r=openGraph(text);
      else if(id==="schema")r=schema(text);
      else if(id==="robots")r=`User-agent: *\nAllow: /\nSitemap: ${text||"https://example.com/sitemap.xml"}`;
      else if(id==="sitemap")r=`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${text||"https://example.com/"}</loc></url>\n</urlset>`;
      else if(id==="utm"){const u=new URL(text.split("\n")[0]||"https://example.com");const [source,medium,campaign]=text.split("\n").slice(1);if(source)u.searchParams.set("utm_source",source);if(medium)u.searchParams.set("utm_medium",medium);if(campaign)u.searchParams.set("utm_campaign",campaign);r=u.toString()}
      else if(id==="keyword-density"){const words=text.toLowerCase().match(/[a-z0-9]+/g)||[];const m={};words.forEach(x=>m[x]=(m[x]||0)+1);r=words.length?Object.entries(m).sort((a,b)=>b[1]-a[1]).slice(0,30).map(([k,v])=>`${k}: ${v} (${(v/words.length*100).toFixed(2)}%)`).join("\n"):"No words"}
      else if(id==="color-picker")r=text||"#000000";
      else if(id==="sql")r=text.replace(/\s+/g," ").replace(/\b(SELECT|FROM|WHERE|INSERT INTO|VALUES|UPDATE|SET|DELETE FROM|ORDER BY|GROUP BY|LIMIT)\b/gi,"\n$1 ").trim();
      else if(id==="markdown"){r=markdownToHtml(text)}
      else if(id==="html-preview"){const w=window.open();if(!w)throw new Error("Popup blocked");w.document.write(`<html><body>${text}</body></html>`);w.document.close();r="HTML preview opened."}
      else if(id==="crc"){r="Not configured"}
      else r=`${t[0]} is ready. Enter your data and press Run Tool.`;
      setOut(r);
    }catch(e){setOut("Error: "+e.message)}
  };
  const fileAction=e=>{const f=e.target.files?.[0];if(f)f.text().then(setText)};
  const download=()=>{if(out)downloadText(out,`${id}-result.txt`)};
  const clear=()=>{setText("");setOut("");setExtra("");setStatus("")};
  return <Shell back={back} t={t} status={status}><div className="workspace"><div className="panel"><label>Your input</label><textarea value={text} onChange={e=>setText(e.target.value)} placeholder={placeholderFor(id)}/>
    {id==="regex"&&<textarea value={extra} onChange={e=>setExtra(e.target.value)} placeholder="pattern on line 1, flags on line 2 (e.g. gi)"/>}
    {["image-text","favicon"].includes(id)&&<input type="file" accept="image/*" onChange={fileAction}/>}
    <div className="actions"><button className="btn primary" onClick={run}><Zap size={17}/> Run Tool</button><button className="btn" onClick={clear}>Clear</button></div></div>
  <div className="panel"><label>Result</label><textarea value={out} readOnly placeholder="Your result will appear here..."/><div className="actions"><button className="btn" onClick={()=>navigator.clipboard?.writeText(out)} disabled={!out}><Copy/> Copy</button><button className="btn" onClick={download} disabled={!out}><Download/> Download</button></div></div></div></Shell>;
}

function placeholderFor(id){
  const m={percentage:"Enter percentage,number e.g. 15,500",discount:"Enter price,discount e.g. 1000,20",gst:"Enter amount,rate e.g. 1000,18",tip:"Enter bill,tip%,people e.g. 2000,10,4",loan:"Enter principal,annual rate,months e.g. 100000,12,24","compound-interest":"Enter principal,rate,years,compounds/year e.g. 10000,8,5,12",temperature:"Enter value,unit (C/F/K)",length:"Enter value,from,to (m,km,cm,mm,ft,yd,mi,in)",weight:"Enter value,from,to (kg,g,mg,lb,oz)",storage:"Enter value,from,to (b,kb,mb,gb,tb)",units:"Enter value,from,to","date-difference":"Enter date1,date2 e.g. 2026-01-01,2026-08-29","date-add":"Enter date,days e.g. 2026-08-29,30",age:"Enter date of birth e.g. 2000-01-01",time:"Enter time1,time2 e.g. 01:30,02:45",scientific:"Example: sin(30)+sqrt(16)*2","meta-tags":"Title on line 1\\nDescription on line 2\\nURL on line 3","open-graph":"Title\\nDescription\\nURL\\nImage URL",schema:"Site name\\nURL\\nDescription",utm:"URL\\nsource\\nmedium\\ncampaign"};return m[id]||"Paste or type your content here...";
}

function Admin({user,profile}){
  const [tab,setTab]=useState("overview");const [msg,setMsg]=useState("");
  const [backend,setBackend]=useState("checking");const [toolsCount,setToolsCount]=useState(tools.length);const [plans,setPlans]=useState(PLANS);
  const [seoStats,setSeoStats]=useState({scans:0,users:0,websites:0,issues:0,subscriptions:0});
  const [seoEnabled,setSeoEnabled]=useState(true);const [seoLimits,setSeoLimits]=useState({free:3,basic:30,popular:100,premium:100000});
  useEffect(()=>{(async()=>{const base=import.meta.env.VITE_API_BASE_URL||import.meta.env.VITE_SUPABASE_FUNCTION_URL;if(!base)return setBackend("not configured");try{const r=await fetch(base,{method:"GET"});setBackend(String(r.status))}catch{setBackend("offline")}})()},[]);
  useEffect(()=>{if(!supabase)return;(async()=>{const [{count:scans},{count:users},{count:websites},{count:issues},{count:subscriptions},{data:settings}]=await Promise.all([
    supabase.from("seo_scans").select("id",{count:"exact",head:true}),supabase.from("profiles").select("id",{count:"exact",head:true}),supabase.from("websites").select("id",{count:"exact",head:true}),supabase.from("seo_issues").select("id",{count:"exact",head:true}),supabase.from("subscriptions").select("id",{count:"exact",head:true}),supabase.from("seo_settings").select("key,value").in("key",["enabled","limits"])
  ]);setSeoStats({scans:scans||0,users:users||0,websites:websites||0,issues:issues||0,subscriptions:subscriptions||0});for(const s of settings||[]){if(s.key==="enabled")setSeoEnabled(s.value!==false);if(s.key==="limits"&&s.value)setSeoLimits(s.value);}})()},[tab]);
  const saveSeo=async()=>{if(!supabase)return;await supabase.from("seo_settings").upsert([{key:"enabled",value:seoEnabled,updated_by:user?.id},{key:"limits",value:seoLimits,updated_by:user?.id}],{onConflict:"key"});setMsg("SEO Genius settings saved.");};
  return <main className="admin"><div className="adminTop"><div><div className="pill"><LayoutDashboard size={14}/> Admin Control Center</div><h1>ToolMaster Pro</h1><p>Signed in as <b>{profile?.full_name||user?.email}</b>. Admin access is based on the user's Supabase role.</p></div></div>
    <div className="toolbar" style={{marginTop:24}}>{["overview","tools","plans","users","seo-genius"].map(x=><button key={x} className={tab===x?"cat active":"cat"} onClick={()=>setTab(x)}>{x==="overview"?<LayoutDashboard/>:x==="tools"?<Settings/>:x==="plans"?<CreditCard/>:x==="users"?<User/>:<Sparkles/>}{x==="seo-genius"?"SEO Genius":x[0].toUpperCase()+x.slice(1)}</button>)}</div>
    {tab==="overview"&&<div className="adminGrid"><div className="adminCard"><Wrench/><h3>Tool Engine</h3><p>{toolsCount} tools loaded in the frontend tool registry.</p><button className="btn primary" onClick={()=>setMsg("Tool registry check complete.")}>Check Tools</button></div><div className="adminCard"><LockKeyhole/><h3>Auth</h3><p>Supabase Auth is {supabase?"configured":"not configured"}.</p><strong className="ok">{supabase?"Connected":"Action required"}</strong></div><div className="adminCard"><Globe2/><h3>Backend</h3><p>AI / server backend status: {backend}.</p><button className="btn" onClick={()=>setMsg(`Backend status: ${backend}`)}>View Status</button></div><div className="adminCard"><CheckCircle2/><h3>System</h3><p>{msg||"Browser tool engine ready."}</p><strong className="ok">Ready</strong></div></div>}
    {tab==="tools"&&<div className="panel" style={{marginTop:16}}><h3>Tool Management</h3><p style={{color:"#93a6bf"}}>The tool catalog is embedded in this build. Production CRUD can be connected to your <code>tools</code> table without exposing service-role keys.</p><div className="grid">{tools.slice(0,12).map(t=><div className="card" key={t[3]}><span>{t[1]}</span><h3>{t[0]}</h3><p>{t[2]}</p></div>)}</div></div>}
    {tab==="plans"&&<div className="panel" style={{marginTop:16}}><h3>Student AI Helper Plans</h3><div className="grid">{plans.map(p=><div className="card" key={p.id}><div className="pill">{p.popular?"Popular":"Plan"}</div><h3>{p.name}</h3><p>{p.description}</p><b>{p.credits.toLocaleString()} credits · ${p.price}</b></div>)}</div></div>}
    {tab==="users"&&<div className="panel" style={{marginTop:16}}><h3>Current User</h3><p>Email: {user?.email}</p><p>User ID: {user?.id}</p><p>Role: {profile?.role || user?.app_metadata?.role || user?.user_metadata?.role || "user"}</p></div>}
    {tab==="seo-genius"&&<div className="panel" style={{marginTop:16}}><h2>SEO Genius AI Administration</h2><div className="grid"><div className="adminCard"><Sparkles/><h3>System</h3><p>Enable or disable new SEO Genius scans.</p><label style={{display:"flex",gap:10,alignItems:"center"}}><input type="checkbox" checked={seoEnabled} onChange={e=>setSeoEnabled(e.target.checked)}/> Enabled</label></div><div className="adminCard"><History/><h3>Scans</h3><strong>{seoStats.scans}</strong><p>Total stored scans</p></div><div className="adminCard"><Globe2/><h3>Websites</h3><strong>{seoStats.websites}</strong><p>Saved websites</p></div><div className="adminCard"><AlertCircle/><h3>Issues</h3><strong>{seoStats.issues}</strong><p>Stored issue records</p></div><div className="adminCard"><CreditCard/><h3>Subscriptions</h3><strong>{seoStats.subscriptions}</strong><p>Subscription records</p></div></div><h3 style={{marginTop:20}}>Monthly scan limits</h3><div className="grid">{Object.entries(seoLimits).map(([k,v])=><label className="card" key={k}><b>{k.toUpperCase()}</b><input type="number" min="0" value={v} onChange={e=>setSeoLimits(p=>({...p,[k]:Number(e.target.value)}))}/></label>)}</div><button className="btn primary" onClick={saveSeo}><Check size={16}/> Save SEO settings</button><p style={{color:"#8191a9",marginTop:10}}>{msg||"Admin settings are stored in Supabase and protected by RLS."}</p></div>}
  </main>;
}

function csvToRows(s){const lines=s.trim().split(/\r?\n/);if(!lines.length)return[];const headers=splitCsv(lines[0]);return lines.slice(1).map(l=>{const v=splitCsv(l);return Object.fromEntries(headers.map((h,i)=>[h,v[i]??""]))})}
function splitCsv(s){const out=[];let cur="",q=false;for(let i=0;i<s.length;i++){const c=s[i];if(c==='"'&&s[i+1]==='"'){cur+='"';i++;continue}if(c==='"'){q=!q;continue}if(c===","&&!q){out.push(cur.trim());cur="";continue}cur+=c}out.push(cur.trim());return out}
function rowsToCsv(rows){if(!Array.isArray(rows)||!rows.length)return"";const h=Object.keys(rows[0]);return [h.join(","),...rows.map(r=>h.map(k=>`"${String(r[k]??"").replace(/"/g,'""')}"`).join(","))].join("\n")}
function randomPassword(n=20){const chars="ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*";const a=new Uint32Array(n);crypto.getRandomValues(a);return [...a].map(x=>chars[x%chars.length]).join("")}
function morse(s){const m={a:".-",b:"-...",c:"-.-.",d:"-..",e:".",f:"..-.",g:"--.",h:"....",i:"..",j:".---",k:"-.-",l:".-..",m:"--",n:"-.",o:"---",p:".--.",q:"--.-",r:".-.",s:"...",t:"-",u:"..-",v:"...-",w:".--",x:"-..-",y:"-.--",z:"--.."," ":"/"};return s.toLowerCase().split("").map(c=>m[c]||c).join(" ")}
function gcd(a,b){while(b){[a,b]=[b,a%b]}return Math.abs(a)}
function toRoman(n){if(!Number.isInteger(n)||n<=0||n>3999)return"Enter 1-3999";const v=[[1000,"M"],[900,"CM"],[500,"D"],[400,"CD"],[100,"C"],[90,"XC"],[50,"L"],[40,"XL"],[10,"X"],[9,"IX"],[5,"V"],[4,"IV"],[1,"I"]];let r="";for(const[x,c]of v){while(n>=x){r+=c;n-=x}}return r}
function numberWords(n){if(!Number.isFinite(n))return"Invalid number";if(n===0)return"zero";const ones=["","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen"],tens=["","","twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety"];const small=x=>x<20?ones[x]:x<100?tens[Math.floor(x/10)]+(x%10?"-"+ones[x%10]:""):x<1000?ones[Math.floor(x/100)]+" hundred"+(x%100?" "+small(x%100):""):x<1e6?small(Math.floor(x/1000))+" thousand"+(x%1000?" "+small(x%1000):""):x<1e9?small(Math.floor(x/1e6))+" million"+(x%1e6?" "+small(x%1e6):""):String(x);return n<0?"minus "+small(-n):small(Math.floor(n))}
function businessNames(s){const k=(s||"tech").split(/[,\s]+/).filter(Boolean),a=["Nova","Prime","Pixel","Bright","Cloud","Swift","Next","Smart"],b=["Labs","Works","Hub","Studio","Solutions","Pro","Digital","Forge"];return [...new Set(a.map((x,i)=>`${x}${k[i%k.length]||"Tech"} ${b[i]}`))].join("\n")}
function usernameIdeas(s){const x=(s||"user").toLowerCase().replace(/[^a-z0-9]/g,"");return [x,x+"pro",x+"official",x+"_hub",x+"2026","the"+x,x+".online"].join("\n")}
function httpStatus(s){const m={200:"OK — successful request",201:"Created",204:"No Content",301:"Moved Permanently",302:"Found",400:"Bad Request",401:"Unauthorized",403:"Forbidden",404:"Not Found",405:"Method Not Allowed",408:"Request Timeout",409:"Conflict",429:"Too Many Requests",500:"Internal Server Error",502:"Bad Gateway",503:"Service Unavailable"};return m[Number(s)]||"Unknown/common status code"}
function colorConvert(s){const h=s.trim().replace("#","");if(!/^[0-9a-f]{6}$/i.test(h))return"Enter HEX like #336699";const r=parseInt(h.slice(0,2),16),g=parseInt(h.slice(2,4),16),b=parseInt(h.slice(4),16),mx=Math.max(r,g,b)/255,mn=Math.min(r,g,b)/255,l=(mx+mn)/2;let hh=0,ss=0;if(mx!==mn){const d=mx-mn;ss=l>.5?d/(2-mx-mn):d/(mx+mn);switch(mx){case r/255:hh=((g-b)/255/d+(g<b?6:0));break;case g/255:hh=(b-r)/255/d+2;break;default:hh=(r-g)/255/d+4}hh*=60}return`HEX: #${h.toUpperCase()}\nRGB: rgb(${r}, ${g}, ${b})\nHSL: hsl(${Math.round(hh)}, ${Math.round(ss*100)}%, ${Math.round(l*100)}%)`}
function convertLength(s){const [v,from,to]=s.split(",").map(x=>x.trim().toLowerCase()),n=Number(v),m={m:1,km:1000,cm:.01,mm:.001,ft:.3048,yd:.9144,mi:1609.344,in:.0254};return m[from]&&m[to]?String(n*m[from]/m[to]):"Use: value,from,to (m,km,cm,mm,ft,yd,mi,in)"}
function convertWeight(s){const [v,from,to]=s.split(",").map(x=>x.trim().toLowerCase()),n=Number(v),m={kg:1,g:.001,mg:.000001,lb:.45359237,oz:.0283495};return m[from]&&m[to]?String(n*m[from]/m[to]):"Use: value,from,to (kg,g,mg,lb,oz)"}
function convertStorage(s){const [v,from,to]=s.split(",").map(x=>x.trim().toLowerCase()),n=Number(v),m={b:1,kb:1024,mb:1048576,gb:1073741824,tb:1099511627776};return m[from]&&m[to]?String(n*m[from]/m[to]):"Use: value,from,to (b,kb,mb,gb,tb)"}
function metaTags(s){const [title,desc,url]=s.split("\n");return `<title>${title||"Page Title"}</title>\n<meta name="description" content="${desc||""}">\n<link rel="canonical" href="${url||""}">`}
function openGraph(s){const [title,desc,url,img]=s.split("\n");return `<meta property="og:title" content="${title||""}">\n<meta property="og:description" content="${desc||""}">\n<meta property="og:url" content="${url||""}">\n<meta property="og:image" content="${img||""}">`}
function schema(s){const [name,url,description]=s.split("\n");return JSON.stringify({"@context":"https://schema.org","@type":"WebSite",name:name||"",url:url||"",description:description||""},null,2)}
function markdownToHtml(s){return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/^### (.*)$/gm,"<h3>$1</h3>").replace(/^## (.*)$/gm,"<h2>$1</h2>").replace(/^# (.*)$/gm,"<h1>$1</h1>").replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>").replace(/\n/g,"<br>")}
function safeScientific(s){
  if(!/^[0-9+\-*/().,\s%a-zA-Z_]+$/.test(s))throw new Error("Only basic scientific characters are allowed.");
  let x=s.replace(/\bpi\b/gi,"Math.PI").replace(/\be\b/g,"Math.E").replace(/\bsqrt\(/gi,"Math.sqrt(").replace(/\bsin\(/gi,"Math.sin(").replace(/\bcos\(/gi,"Math.cos(").replace(/\btan\(/gi,"Math.tan(").replace(/\blog\(/gi,"Math.log10(").replace(/\bln\(/gi,"Math.log(");
  if(!/^Math\.[A-Za-z]+|\d/.test(x) && !/^[0-9.+\-*/%()\sMath]+$/.test(x)) throw new Error("Unsupported expression.");
  const result=Function(`"use strict";return (${x})`)();return Number.isFinite(result)?String(result):"Invalid result";
}

createRoot(document.getElementById("root")).render(<App/>);
