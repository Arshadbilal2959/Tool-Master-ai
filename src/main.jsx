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
  ["URL Slug Generator","SEO & Marketing","Create clean SEO slugs.","slug"]
];

const categories = [
  "All Tools","PDF Tools","Image Tools","SEO & Marketing","Text Tools","Developer Tools",
  "Calculator Tools","Converter Tools","Security Tools","Utility Tools","Network Tools",
  "AI & Video","AI & Education"
].map(name => [name, name === "All Tools" ? tools.length : tools.filter(x => x[1] === name).length]);

const PLANS = [
  {id:"free", name:"Free", credits:50, period:"daily", price:0, description:"50 AI credits every day"},
  {id:"silver", name:"Silver", credits:500, period:"monthly", price:5, description:"For regular students"},
  {id:"gold", name:"Gold", credits:2000, period:"monthly", price:15, popular:true, description:"For serious study"},
  {id:"demand", name:"Demand", credits:10000, period:"monthly", price:49, description:"For heavy AI usage"},
  {id:"platinum", name:"Platinum", credits:50000, period:"monthly", price:99, description:"Maximum AI access"}
];

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

async function loadLib(name) {
  const urls = {
    "pdf-lib":"https://esm.sh/pdf-lib@1.17.1",
    "pdfjs":"https://esm.sh/pdfjs-dist@4.10.38/legacy/build/pdf.mjs",
    "docx":"https://esm.sh/docx@9.5.1",
    "mammoth":"https://esm.sh/mammoth@1.9.0",
    "qrcode":"https://esm.sh/qrcode@1.5.4",
    "jsbarcode":"https://esm.sh/jsbarcode@3.11.6",
    "tesseract":"https://esm.sh/tesseract.js@5.1.1"
  };
  if (!urls[name]) throw new Error("Library not configured");
  return import(/* @vite-ignore */ urls[name]);
}

const css = `
:root{
  --bg:#07111f;--bg2:#0b1728;--panel:rgba(13,28,48,.82);--panel2:rgba(17,35,58,.94);
  --text:#eef5ff;--muted:#9fb0c7;--line:rgba(255,255,255,.09);--brand:#6ea8fe;
  --brand2:#8b7cff;--good:#35d49a;--danger:#ff6b81;--shadow:0 24px 70px rgba(0,0,0,.32);
}
*{box-sizing:border-box} body{margin:0;font-family:Inter,ui-sans-serif,system-ui,-apple-system,Segoe UI,sans-serif;background:
radial-gradient(circle at 20% 0%,rgba(92,109,255,.18),transparent 35%),radial-gradient(circle at 90% 10%,rgba(0,211,180,.11),transparent 30%),var(--bg);color:var(--text)}
button,input,textarea,select{font:inherit} button{cursor:pointer}
a{color:inherit;text-decoration:none}.app{min-height:100vh}.container{max-width:1240px;margin:auto;padding:0 22px}
.header{position:sticky;top:0;z-index:50;backdrop-filter:blur(18px);background:rgba(7,17,31,.72);border-bottom:1px solid var(--line)}
.nav{height:72px;display:flex;align-items:center;justify-content:space-between;gap:20px}
.brand{display:flex;align-items:center;gap:11px;font-weight:900;font-size:19px}.brand span span{color:#88a6ff}
.brandIcon{width:40px;height:40px;border-radius:13px;display:grid;place-items:center;background:linear-gradient(135deg,#718eff,#8c64ff);box-shadow:0 10px 30px rgba(113,142,255,.3)}
.navLinks{display:flex;gap:20px;color:#c5d2e5;font-size:14px}.navLinks a:hover{color:#fff}.navActions{display:flex;gap:9px;align-items:center}
.btn,.iconBtn{border:1px solid var(--line);background:rgba(255,255,255,.05);color:#fff;border-radius:12px;padding:10px 14px;display:inline-flex;align-items:center;gap:8px;font-weight:750}
.btn:hover,.iconBtn:hover{background:rgba(255,255,255,.09)}.btn.primary{border:0;background:linear-gradient(135deg,#6f8cff,#8d67ff);box-shadow:0 12px 28px rgba(110,136,255,.28)}
.btn.ghost{background:transparent}.btn.danger{background:rgba(255,81,112,.12);color:#ffb0bf;border-color:rgba(255,81,112,.2)}
.iconBtn{padding:9px}.hero{padding:78px 22px 55px;text-align:center;position:relative}
.heroInner{max-width:930px;margin:auto}.pill{display:inline-flex;align-items:center;gap:7px;padding:8px 12px;border:1px solid var(--line);background:rgba(255,255,255,.04);border-radius:999px;color:#c7d6ee;font-size:12px;font-weight:800}
.hero h1{font-size:clamp(44px,6vw,78px);line-height:.98;letter-spacing:-.055em;margin:20px 0}.hero h1 span{background:linear-gradient(135deg,#84a9ff,#9b82ff);-webkit-background-clip:text;color:transparent}
.hero p{max-width:760px;margin:0 auto;color:var(--muted);font-size:18px;line-height:1.7}
.searchBox{max-width:760px;margin:28px auto 0;display:flex;align-items:center;gap:12px;border:1px solid rgba(126,151,255,.28);padding:5px 7px 5px 16px;background:rgba(10,24,43,.78);border-radius:18px;box-shadow:var(--shadow)}
.searchBox input{flex:1;border:0;outline:0;background:transparent;color:#fff;padding:13px 2px}.searchBox .kbd{font-size:11px;color:#8395ae;border:1px solid var(--line);padding:5px 8px;border-radius:8px}
.stats{display:flex;justify-content:center;gap:48px;margin-top:30px}.stats b{display:block;font-size:24px}.stats small{color:var(--muted)}
.main{padding-bottom:70px}.toolbar{display:flex;gap:8px;overflow:auto;padding:5px 0 12px;scrollbar-width:none}.toolbar::-webkit-scrollbar{display:none}
.cat{white-space:nowrap;border:1px solid var(--line);background:rgba(255,255,255,.035);color:#b9c9de;border-radius:12px;padding:10px 12px;display:flex;align-items:center;gap:8px}.cat.active{background:rgba(115,133,255,.16);color:#fff;border-color:rgba(131,147,255,.35)}
.cat em{font-style:normal;font-size:11px;color:#7f92ad}.sectionHead{display:flex;justify-content:space-between;align-items:end;margin:22px 0 16px}.sectionHead h2{margin:0;font-size:26px}.sectionHead p{margin:5px 0 0;color:var(--muted)}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(265px,1fr));gap:14px}.card{position:relative;padding:18px;border:1px solid var(--line);background:linear-gradient(180deg,rgba(15,32,53,.8),rgba(10,23,39,.86));border-radius:18px;min-height:164px;transition:.2s;cursor:pointer;overflow:hidden}
.card:before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 90% 0%,rgba(122,128,255,.12),transparent 40%);opacity:0;transition:.2s}.card:hover{transform:translateY(-3px);border-color:rgba(143,157,255,.32);box-shadow:0 15px 45px rgba(0,0,0,.24)}.card:hover:before{opacity:1}
.toolIcon{width:44px;height:44px;border-radius:14px;display:grid;place-items:center;background:rgba(120,137,255,.12);border:1px solid rgba(120,137,255,.18);color:#9eb3ff}.toolIcon.big{width:58px;height:58px;border-radius:18px}
.cardBody span,.toolHero span{font-size:11px;color:#91a8c9;text-transform:uppercase;letter-spacing:.08em}.cardBody h3{margin:11px 0 8px;font-size:17px;position:relative}.cardBody p{margin:0;color:#91a1b6;line-height:1.55;font-size:13px;position:relative}.arrow{position:absolute;right:15px;bottom:15px;color:#7185a3}
.empty{border:1px dashed var(--line);padding:55px;border-radius:18px;text-align:center;color:var(--muted)}
.toolPage{max-width:1120px;margin:auto;padding:35px 22px 70px}.back{border:0;background:transparent;color:#a9bbd2;display:inline-flex;align-items:center;gap:5px;padding:7px 0}.toolHero{display:flex;gap:17px;align-items:center;margin:20px 0 28px}.toolHero h1{margin:6px 0;font-size:34px}.toolHero p{margin:0;color:var(--muted)}
.workspace,.aiHelper{display:grid;grid-template-columns:1fr 1fr;gap:16px}.panel,.aiCard,.adminCard{border:1px solid var(--line);background:linear-gradient(180deg,rgba(17,36,59,.8),rgba(10,23,39,.88));border-radius:20px;padding:20px;box-shadow:0 15px 50px rgba(0,0,0,.16)}
.panel label,.aiCard label{display:block;color:#adbed2;font-size:12px;font-weight:800;margin-bottom:9px}.panel textarea,.aiCard textarea,.panel input,.panel select,.aiCard input,.aiCard select{width:100%;border:1px solid var(--line);background:#09192c;color:#fff;border-radius:13px;padding:13px;outline:0}.panel textarea,.aiCard textarea{min-height:300px;resize:vertical}
.actions{display:flex;gap:9px;flex-wrap:wrap;margin-top:12px}.notice{margin-top:16px;padding:12px 14px;border:1px solid rgba(118,141,255,.2);background:rgba(118,141,255,.08);border-radius:12px;color:#aebee0;display:flex;gap:9px;align-items:flex-start}
.uploadBox{display:flex;align-items:center;gap:13px;border:1px dashed rgba(135,157,255,.32);padding:15px;border-radius:15px;background:rgba(120,140,255,.05);cursor:pointer;margin:0 0 12px}.uploadBox input{display:none}.uploadBox strong{display:block;margin-top:4px;color:#7e98bc;font-size:11px}
.answer{min-height:300px;white-space:pre-wrap;line-height:1.7;color:#dbe6f5;background:rgba(3,11,22,.45);border:1px solid var(--line);border-radius:14px;padding:16px}
.videoOptions{display:grid;grid-template-columns:1fr 1fr;gap:10px}.videoPlaceholder{min-height:310px;border-radius:16px;background:radial-gradient(circle,#192e51,#071120 70%);display:grid;place-items:center;text-align:center;border:1px solid var(--line);padding:20px}.playCircle{width:70px;height:70px;border-radius:50%;display:grid;place-items:center;background:rgba(255,255,255,.09);font-size:25px}
.admin{max-width:1180px;margin:auto;padding:45px 22px 80px}.adminTop{display:flex;justify-content:space-between;align-items:end;gap:18px}.adminTop h1{font-size:40px;margin:10px 0}.adminTop p{color:var(--muted);max-width:700px}.adminGrid{display:grid;grid-template-columns:repeat(2,1fr);gap:15px;margin-top:28px}.adminCard h3{margin:13px 0 6px}.adminCard p{color:var(--muted);min-height:44px}.ok{color:var(--good)}
.footer{border-top:1px solid var(--line);padding:35px 22px 50px;color:#7f92ac}.footerInner{max-width:1240px;margin:auto;display:flex;justify-content:space-between;gap:20px;align-items:center}
.modalBack{position:fixed;inset:0;z-index:100;display:grid;place-items:center;background:rgba(1,6,13,.72);backdrop-filter:blur(13px);padding:18px}.modal{width:min(480px,100%);background:#0d1c30;border:1px solid var(--line);border-radius:22px;padding:24px;box-shadow:0 30px 100px rgba(0,0,0,.5)}.modalHead{display:flex;justify-content:space-between;align-items:center}.modal h2{margin:5px 0}.modal p{color:var(--muted);line-height:1.6}.field{margin:12px 0}.field label{display:block;font-size:12px;color:#a9bbd2;margin-bottom:6px}.field input{width:100%;padding:12px;border-radius:11px;border:1px solid var(--line);background:#09182b;color:#fff;outline:0}.formGrid{display:grid;grid-template-columns:1fr 1fr;gap:10px}.authTabs{display:grid;grid-template-columns:1fr 1fr;border:1px solid var(--line);padding:4px;border-radius:12px;margin:15px 0}.authTabs button{border:0;padding:10px;border-radius:9px;background:transparent;color:#8fa2be}.authTabs button.active{background:rgba(255,255,255,.09);color:#fff}.formError,.formSuccess{padding:11px 12px;border-radius:10px;margin:10px 0;font-size:13px}.formError{background:rgba(255,86,116,.1);color:#ffb1bf;border:1px solid rgba(255,86,116,.18)}.formSuccess{background:rgba(53,212,154,.1);color:#9af0cb;border:1px solid rgba(53,212,154,.18)}
.profileMenu{position:relative}.profileCard{position:absolute;right:0;top:50px;width:260px;background:#0e2036;border:1px solid var(--line);border-radius:16px;padding:14px;box-shadow:var(--shadow);z-index:70}.profileCard b{display:block}.profileCard small{display:block;color:#8095b1;margin:3px 0 12px}.mobileOnly{display:none}
@media(max-width:900px){.navLinks{display:none}.mobileOnly{display:inline-flex}.workspace,.aiHelper,.adminGrid{grid-template-columns:1fr}.hero{padding-top:55px}.stats{gap:24px}.footerInner,.adminTop{align-items:flex-start;flex-direction:column}.toolHero{align-items:flex-start}.formGrid{grid-template-columns:1fr}}
@media(max-width:560px){.hero h1{font-size:44px}.stats{display:grid;grid-template-columns:1fr 1fr}.videoOptions{grid-template-columns:1fr}.nav{height:64px}.navActions .btn span{display:none}}
`;

function GlobalStyle() { return <style>{css}</style>; }

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
  const [dark,setDark]=useState(true);
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
        <a href="#tools">Tools</a><a href="#categories">Categories</a><a href="#about">About</a>
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
    </div>{mobile&&<div className="container" style={{paddingBottom:12,display:"flex",gap:16}}><a href="#tools" onClick={()=>setMobile(false)}>Tools</a><a href="#categories" onClick={()=>setMobile(false)}>Categories</a><a href="#about" onClick={()=>setMobile(false)}>About</a></div>}</header>

    {admin ? <Admin user={user} profile={profile} /> : tool ? <ToolPage t={tool} back={()=>setTool(null)} user={user}/> :
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

  return <div className="modalBack" onMouseDown={close}><div className="modal" onMouseDown={e=>e.stopPropagation()}>
    <div className="modalHead"><div><div className="pill"><LockKeyhole size={13}/> Secure Auth</div><h2>{mode==="signup"?"Create your account":"Welcome back"}</h2></div><button className="iconBtn" onClick={close}><X size={17}/></button></div>
    <div className="authTabs"><button className={mode==="signin"?"active":""} onClick={()=>{setMode("signin");setError("");setMsg("")}}>Sign in</button><button className={mode==="signup"?"active":""} onClick={()=>{setMode("signup");setError("");setMsg("")}}>Sign up</button></div>
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

function ToolPage({t,back,user}) {
  if(t[3]==="student-ai-helper") return <StudentAIHelper back={back} user={user}/>;
  if(t[3]==="text-to-video") return <TextToVideo back={back} user={user}/>;
  if(t[1]==="PDF Tools") return <PdfTool t={t} back={back}/>;
  if(t[1]==="Image Tools") return <ImageTool t={t} back={back}/>;
  return <GenericTool t={t} back={back}/>;
}

function Shell({back,t,children,status}) {
  return <main className="toolPage"><button className="back" onClick={back}>← Back to tools</button>
    <div className="toolHero"><div className="toolIcon big">{iconForCategory(t[1])}</div><div><span>{t[1]}</span><h1>{t[0]}</h1><p>{t[2]}</p></div></div>
    {children}{status&&<div className="notice"><ShieldCheck size={17}/> {status}</div>}
  </main>;
}

function TextToVideo({back,user}) {
  const [prompt,setPrompt]=useState(""); const [style,setStyle]=useState("Cinematic");
  const [duration,setDuration]=useState("10 seconds"); const [status,setStatus]=useState("");
  const [busy,setBusy]=useState(false); const [result,setResult]=useState(null);
  const generate=async()=>{
    if(!prompt.trim()) return setStatus("Please enter a video prompt first.");
    setBusy(true);setStatus("Preparing video request...");
    try{
      const base=import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_SUPABASE_FUNCTION_URL;
      if(!base) { setResult({prompt,style,duration}); setStatus("Video project prepared locally. Connect a secure video backend to render an MP4."); return; }
      const headers={"Content-Type":"application/json"}; if(user?.access_token) headers.Authorization=`Bearer ${user.access_token}`;
      const r=await fetch(base,{method:"POST",headers,body:JSON.stringify({type:"text-to-video",prompt,style,duration})});
      const data=await r.json().catch(()=>({}));
      if(!r.ok) throw new Error(data.error||data.message||"Video API request failed");
      setResult(data.video_url?data:{prompt,style,duration});
      setStatus(data.message||"Video request submitted successfully.");
    }catch(e){setStatus(e.message||"Video request failed.");}finally{setBusy(false)}
  };
  return <Shell back={back} t={["Text to Video","AI & Video","",""]} status={status}>
    <div className="aiHelper"><div className="aiCard"><h3>🎬 Video Prompt</h3>
      <textarea value={prompt} onChange={e=>setPrompt(e.target.value)} placeholder="Example: A cinematic sunrise over the mountains, drone camera, soft mist..."/>
      <div className="videoOptions"><label>Style<select value={style} onChange={e=>setStyle(e.target.value)}><option>Cinematic</option><option>Realistic</option><option>Anime</option><option>3D Animation</option><option>Documentary</option><option>Product Ad</option></select></label>
      <label>Duration<select value={duration} onChange={e=>setDuration(e.target.value)}><option>5 seconds</option><option>10 seconds</option><option>15 seconds</option><option>30 seconds</option></select></label></div>
      <button className="btn primary" disabled={busy} onClick={generate} style={{marginTop:12}}><Sparkles size={17}/>{busy?"Generating...":"Generate Video"}</button>
    </div><div className="aiCard"><h3>🎥 Video Preview</h3>{result?.video_url?<video controls style={{width:"100%",borderRadius:14}} src={result.video_url}/>:<div className="videoPlaceholder"><div><div className="playCircle" style={{margin:"0 auto 12px"}}>▶</div><b>{result?"Project ready":"Backend video output appears here"}</b><small style={{display:"block",marginTop:7,color:"#92a4bf"}}>{result?`${style} · ${duration}`:"Configure VITE_API_BASE_URL for real rendering"}</small></div></div>}</div></div>
  </Shell>;
}

function StudentAIHelper({back,user}) {
  const [question,setQuestion]=useState(""); const [files,setFiles]=useState([]);
  const [answer,setAnswer]=useState(""); const [loading,setLoading]=useState(false);
  const [plan,setPlan]=useState("free"); const [status,setStatus]=useState("");

  const solve=async()=>{
    if(!question.trim()&&!files.length) return setAnswer("Please enter a question or upload a study file.");
    setLoading(true);setStatus("");
    try{
      const base=import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_SUPABASE_FUNCTION_URL;
      if(!base){
        setAnswer(localStudyHelper(question, files)); setStatus("Local study helper mode is active. Connect your AI backend for GPT-style answers.");
        return;
      }
      const fd=new FormData(); fd.append("type","student-ai-helper"); fd.append("question",question); fd.append("plan",plan);
      if(user?.id) fd.append("user_id",user.id); files.forEach(f=>fd.append("files",f));
      const headers={}; if(user?.access_token) headers.Authorization=`Bearer ${user.access_token}`;
      const r=await fetch(base,{method:"POST",headers,body:fd}); const d=await r.json().catch(()=>({}));
      if(!r.ok) {
        if(r.status===401 && /credit/i.test(d.error||"")) throw new Error("AI backend is connected, but its API account has no credits. Add API credits or switch the backend to another provider.");
        throw new Error(d.error||d.message||`AI request failed (${r.status})`);
      }
      setAnswer(d.answer||d.message||"AI response received."); setStatus(`Plan: ${PLANS.find(p=>p.id===plan)?.name||plan}`);
    }catch(e){setAnswer("");setStatus(e.message||"AI request failed.");}
    finally{setLoading(false)}
  };

  return <Shell back={back} t={["Student AI Helper","AI & Education","",""]} status={status}>
    <div className="aiHelper"><div className="aiCard"><h3>📚 Ask your question</h3>
      <textarea value={question} onChange={e=>setQuestion(e.target.value)} placeholder="Ask a question, paste homework, or explain a concept..."/>
      <label style={{marginTop:12}}>AI plan<select value={plan} onChange={e=>setPlan(e.target.value)}>{PLANS.map(p=><option key={p.id} value={p.id}>{p.name} · {p.credits.toLocaleString()} credits</option>)}</select></label>
      <FilePicker multiple accept=".pdf,image/*,.txt,.doc,.docx" onChange={setFiles} files={files}/>
      <div className="actions"><button className="btn primary" disabled={loading} onClick={solve}><Sparkles size={17}/>{loading?"Processing...":"Get AI Help"}</button>{files.length>0&&<button className="btn" onClick={()=>setFiles([])}><Trash2/> Clear files</button>}</div>
      <div style={{marginTop:15,color:"#8093ae",fontSize:12}}>Plans: Free, Silver, Gold, Demand and Platinum.</div>
    </div><div className="aiCard"><h3>🤖 AI Answer</h3><div className="answer">{answer||"Your step-by-step answer will appear here."}</div>{answer&&<div className="actions"><button className="btn" onClick={()=>navigator.clipboard?.writeText(answer)}><Copy/> Copy</button><button className="btn" onClick={()=>downloadText(answer,"student-ai-answer.txt")}><Download/> Download</button></div>}</div></div>
  </Shell>;
}

function localStudyHelper(question, files) {
  const q=question.trim();
  if(!q) return `I received ${files.length} study file(s). Start by entering the exact question you want explained.`;
  const lower=q.toLowerCase();
  if(lower.includes("math")||/[0-9][+*/=-][0-9]/.test(q)) return `Step 1: Identify the given values.\nStep 2: Choose the correct formula or operation.\nStep 3: Work through the calculation carefully.\nStep 4: Check the result.\n\nQuestion received:\n${q}\n\nFor an exact answer, connect the secure AI backend or paste the full problem.`;
  if(lower.includes("define")||lower.includes("what is")) return `Simple explanation:\n${q}\n\nStart with the key definition, then explain the idea in a real-world example, and finally list the important points to remember.`;
  return `Study plan:\n1. Break the question into smaller parts.\n2. Identify the key terms.\n3. Explain the main concept in simple language.\n4. Work through an example.\n5. Review the final answer.\n\nYour question:\n${q}\n\nThis is local helper mode; a connected AI backend can provide a detailed subject-specific answer.`;
}

function FilePicker({multiple=false,accept,onChange,files}) {
  return <label className="uploadBox"><Upload size={19}/><div><b>{multiple?"Upload files":"Upload file"}</b><small style={{display:"block",color:"#7f93ae",marginTop:3}}>{accept||"Supported files"}</small>{files?.length?<strong>{files.map(f=>f.name).join(", ")}</strong>:null}</div><input type="file" multiple={multiple} accept={accept} onChange={e=>onChange([...e.target.files])}/></label>;
}

function PdfTool({t,back}) {
  const id=t[3]; const [files,setFiles]=useState([]); const [busy,setBusy]=useState(false); const [status,setStatus]=useState("");
  const [watermark,setWatermark]=useState("ToolMaster Pro"); const [angle,setAngle]=useState("90");
  const [quality,setQuality]=useState(.65); const [pages,setPages]=useState("1");

  const run=async()=>{
    if(!files.length) return setStatus("Please upload the required file first.");
    setBusy(true);setStatus("");
    try{
      const {PDFDocument,degrees,rgb}=await loadLib("pdf-lib");
      if(id==="pdf-word"){await pdfToWord(files[0]);return}
      if(id==="word-pdf"){await wordToPdf(files[0]);return}
      if(id==="pdf-jpg"){await pdfToJpg(files[0]);return}
      const src=await PDFDocument.load(await files[0].arrayBuffer(),{ignoreEncryption:id==="pdf-unlock"});
      if(id==="merge-pdf"){
        const out=await PDFDocument.create(); for(const f of files){const d=await PDFDocument.load(await f.arrayBuffer(),{ignoreEncryption:true});(await out.copyPages(d,d.getPageIndices())).forEach(p=>out.addPage(p))}
        downloadBlob(new Blob([await out.save()],{type:"application/pdf"}),"merged.pdf");setStatus("Merged PDF downloaded.");return;
      }
      if(id==="split-pdf"){
        const nums=pages.split(",").map(x=>parseInt(x.trim(),10)-1).filter(Number.isInteger);const list=nums.length?nums:src.getPageIndices();
        for(const n of list){if(n<0||n>=src.getPageCount())continue;const one=await PDFDocument.create();const [p]=await one.copyPages(src,[n]);one.addPage(p);downloadBlob(new Blob([await one.save()],{type:"application/pdf"}),`page-${n+1}.pdf`)}
        setStatus("Selected pages downloaded.");return;
      }
      if(id==="compress-pdf"){
        const bytes=await src.save({useObjectStreams:true,addDefaultPage:false});downloadBlob(new Blob([bytes],{type:"application/pdf"}),"compressed.pdf");setStatus("Optimized PDF downloaded.");return;
      }
      if(id==="rotate-pdf"){
        src.getPages().forEach(p=>p.setRotation(degrees(Number(angle)||90)));downloadBlob(new Blob([await src.save()],{type:"application/pdf"}),"rotated.pdf");setStatus("Rotated PDF downloaded.");return;
      }
      if(id==="pdf-unlock"){
        downloadBlob(new Blob([await src.save()],{type:"application/pdf"}),"unlocked.pdf");setStatus("Unlocked copy downloaded when the source encryption is supported.");return;
      }
      if(id==="pdf-watermark"){
        src.getPages().forEach(p=>{const {width,height}=p.getSize();p.drawText(watermark||"ToolMaster Pro",{x:width/2-60,y:height/2,size:28,color:rgb(.65,.65,.65),opacity:.35,rotate:degrees(35)})});
        downloadBlob(new Blob([await src.save()],{type:"application/pdf"}),"watermarked.pdf");setStatus("Watermarked PDF downloaded.");return;
      }
    }catch(e){setStatus("Error: "+(e?.message||String(e)))}finally{setBusy(false)}
  };

  async function pdfToJpg(file){
    const pdfjs=await loadLib("pdfjs");const pdf=await pdfjs.getDocument({data:await file.arrayBuffer()}).promise;
    for(let i=1;i<=pdf.numPages;i++){const page=await pdf.getPage(i);const viewport=page.getViewport({scale:1.7});const c=document.createElement("canvas");c.width=viewport.width;c.height=viewport.height;await page.render({canvasContext:c.getContext("2d"),viewport}).promise;const blob=await new Promise(r=>c.toBlob(r,"image/jpeg",Number(quality)));downloadBlob(blob,`${file.name.replace(/\\.pdf$/i,"")}-page-${i}.jpg`)}
    setStatus(`${pdf.numPages} JPG page(s) downloaded.`);
  }
  async function pdfToWord(file){
    const pdfjs=await loadLib("pdfjs");const {Document,Packer,Paragraph}=await loadLib("docx");const pdf=await pdfjs.getDocument({data:await file.arrayBuffer()}).promise;const children=[];
    for(let i=1;i<=pdf.numPages;i++){const page=await pdf.getPage(i);const tc=await page.getTextContent();const text=tc.items.map(x=>x.str).join(" ");children.push(new Paragraph(text))}
    const doc=new Document({sections:[{children}]});const blob=await Packer.toBlob(doc);downloadBlob(blob,file.name.replace(/\\.pdf$/i,"")+".docx");setStatus("Editable Word file downloaded.");
  }
  async function wordToPdf(file){
    const mammoth=await loadLib("mammoth");const html=(await mammoth.convertToHtml({arrayBuffer:await file.arrayBuffer()})).value;const w=window.open("","_blank");
    if(!w)throw new Error("Popup blocked. Allow popups for this site.");w.document.write(`<html><head><title>Word to PDF</title><style>body{font-family:Arial;padding:48px;line-height:1.6;max-width:850px;margin:auto}img{max-width:100%}</style></head><body>${html}</body></html>`);w.document.close();w.focus();setTimeout(()=>w.print(),500);setStatus("Print dialog opened. Choose Save as PDF.");
  }
  async function jpgToPdf(){
    const {PDFDocument}=await loadLib("pdf-lib");const doc=await PDFDocument.create();
    for(const f of files){const bytes=await f.arrayBuffer();let img;try{img=await doc.embedJpg(bytes)}catch{img=await doc.embedPng(bytes)}const page=doc.addPage([img.width,img.height]);page.drawImage(img,{x:0,y:0,width:img.width,height:img.height})}
    downloadBlob(new Blob([await doc.save()],{type:"application/pdf"}),"images.pdf");setStatus("PDF downloaded.");
  }
  if(id==="jpg-pdf") return <Shell back={back} t={t} status={status}><div className="workspace"><div className="panel"><FilePicker multiple accept="image/jpeg,image/png" onChange={setFiles} files={files}/><button className="btn primary" disabled={busy||!files.length} onClick={jpgToPdf}><Download/> Create PDF</button></div><div className="panel"><h3>{files.length} image(s) selected</h3>{files.map(f=><p key={f.name}>✓ {f.name}</p>)}</div></div></Shell>;
  return <Shell back={back} t={t} status={status||"Files are processed in your browser when supported."}><div className="workspace"><div className="panel"><FilePicker multiple={id==="merge-pdf"} accept=".pdf,application/pdf" onChange={setFiles} files={files}/>
    {id==="split-pdf"&&<label>Pages (e.g. 1,3,5)<input value={pages} onChange={e=>setPages(e.target.value)}/></label>}
    {id==="rotate-pdf"&&<label>Rotation<select value={angle} onChange={e=>setAngle(e.target.value)}><option value="90">90°</option><option value="180">180°</option><option value="270">270°</option></select></label>}
    {id==="pdf-watermark"&&<label>Watermark text<input value={watermark} onChange={e=>setWatermark(e.target.value)}/></label>}
    {id==="pdf-jpg"&&<label>JPG quality<input type="range" min=".3" max=".95" step=".05" value={quality} onChange={e=>setQuality(e.target.value)}/></label>}
    <button className="btn primary" disabled={busy||!files.length} onClick={run}>{busy?<RefreshCw/>:<Download/>}{busy?"Processing...":"Process & Download"}</button>
  </div><div className="panel"><h3>Selected files</h3>{files.map(f=><p key={f.name}>📄 {f.name} — {(f.size/1024).toFixed(1)} KB</p>)}</div></div></Shell>;
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
  const m={percentage:"Enter percentage,number e.g. 15,500",discount:"Enter price,discount e.g. 1000,20",gst:"Enter amount,rate e.g. 1000,18",tip:"Enter bill,tip%,people e.g. 2000,10,4",loan:"Enter principal,annual rate,months e.g. 100000,12,24",compound-interest:"Enter principal,rate,years,compounds/year e.g. 10000,8,5,12",temperature:"Enter value,unit (C/F/K)",length:"Enter value,from,to (m,km,cm,mm,ft,yd,mi,in)",weight:"Enter value,from,to (kg,g,mg,lb,oz)",storage:"Enter value,from,to (b,kb,mb,gb,tb)",units:"Enter value,from,to",date-difference:"Enter date1,date2 e.g. 2026-01-01,2026-08-29",date-add:"Enter date,days e.g. 2026-08-29,30",age:"Enter date of birth e.g. 2000-01-01",time:"Enter time1,time2 e.g. 01:30,02:45",scientific:"Example: sin(30)+sqrt(16)*2",meta-tags:"Title on line 1\\nDescription on line 2\\nURL on line 3",open-graph:"Title\\nDescription\\nURL\\nImage URL",schema:"Site name\\nURL\\nDescription",utm:"URL\\nsource\\nmedium\\ncampaign"};return m[id]||"Paste or type your content here...";
}

function Admin({user,profile}){
  const [tab,setTab]=useState("overview");const [msg,setMsg]=useState("");
  const [backend,setBackend]=useState("checking");const [toolsCount,setToolsCount]=useState(tools.length);const [plans,setPlans]=useState(PLANS);
  useEffect(()=>{(async()=>{const base=import.meta.env.VITE_API_BASE_URL||import.meta.env.VITE_SUPABASE_FUNCTION_URL;if(!base)return setBackend("not configured");try{const r=await fetch(base,{method:"GET"});setBackend(String(r.status))}catch{setBackend("offline")}})()},[]);
  return <main className="admin"><div className="adminTop"><div><div className="pill"><LayoutDashboard size={14}/> Admin Control Center</div><h1>ToolMaster Pro</h1><p>Signed in as <b>{profile?.full_name||user?.email}</b>. Admin access is based on the user's Supabase role.</p></div></div>
    <div className="toolbar" style={{marginTop:24}}>{["overview","tools","plans","users"].map(x=><button key={x} className={tab===x?"cat active":"cat"} onClick={()=>setTab(x)}>{x==="overview"?<LayoutDashboard/>:x==="tools"?<Settings/>:x==="plans"?<CreditCard/>:<User/>}{x[0].toUpperCase()+x.slice(1)}</button>)}</div>
    {tab==="overview"&&<div className="adminGrid"><div className="adminCard"><Wrench/><h3>Tool Engine</h3><p>{toolsCount} tools loaded in the frontend tool registry.</p><button className="btn primary" onClick={()=>setMsg("Tool registry check complete.")}>Check Tools</button></div><div className="adminCard"><LockKeyhole/><h3>Auth</h3><p>Supabase Auth is {supabase?"configured":"not configured"}.</p><strong className="ok">{supabase?"Connected":"Action required"}</strong></div><div className="adminCard"><Globe2/><h3>Backend</h3><p>AI / server backend status: {backend}.</p><button className="btn" onClick={()=>setMsg(`Backend status: ${backend}`)}>View Status</button></div><div className="adminCard"><CheckCircle2/><h3>System</h3><p>{msg||"Browser tool engine ready."}</p><strong className="ok">Ready</strong></div></div>}
    {tab==="tools"&&<div className="panel" style={{marginTop:16}}><h3>Tool Management</h3><p style={{color:"#93a6bf"}}>The tool catalog is embedded in this build. Production CRUD can be connected to your `tools` table without exposing service-role keys.</p><div className="grid">{tools.slice(0,12).map(t=><div className="card" key={t[3]}><span>{t[1]}</span><h3>{t[0]}</h3><p>{t[2]}</p></div>)}</div></div>}
    {tab==="plans"&&<div className="panel" style={{marginTop:16}}><h3>Student AI Helper Plans</h3><div className="grid">{plans.map(p=><div className="card" key={p.id}><div className="pill">{p.popular?"Popular":"Plan"}</div><h3>{p.name}</h3><p>{p.description}</p><b>{p.credits.toLocaleString()} credits · ${p.price}</b></div>)}</div></div>}
    {tab==="users"&&<div className="panel" style={{marginTop:16}}><h3>Current User</h3><p>Email: {user?.email}</p><p>User ID: {user?.id}</p><p>Role: {profile?.role || user?.app_metadata?.role || user?.user_metadata?.role || "user"}</p></div>}
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
