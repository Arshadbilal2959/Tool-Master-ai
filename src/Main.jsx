import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Search, Wrench, FileText, Image as ImageIcon, Code2, Globe2, Calculator,
  ArrowRight, ShieldCheck, Zap, Sparkles, Upload, Copy, Download,
  CheckCircle2, LockKeyhole, Settings, LayoutDashboard, LogOut, CreditCard,
  Users, BarChart3, X, RefreshCw
} from "lucide-react";
import "./styles.css";

/*
  ToolMaster Pro - upgraded main.jsx
  - Existing tool catalog preserved
  - Admin login UI with optional Supabase Auth REST integration
  - File upload/download workspace for file-oriented tools
  - Text-to-Video credit plans
  - Local fallback demo mode when Supabase env vars are not configured

  Vite env variables recommended:
    VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
    VITE_SUPABASE_ANON_KEY=YOUR_ANON_KEY

  IMPORTANT:
  Production admin authorization must be enforced by Supabase RLS/database roles.
  Never put a Supabase service_role key in VITE_* variables.
*/

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

const tools = [
["Text to Video","AI & Video","Turn a written prompt or script into an AI video project.","text-to-video"],
["Student AI Helper","AI & Education","Ask questions or upload a study image/PDF and get step-by-step AI help.","student-ai-helper"],
["PDF to Word","PDF Tools","Convert PDF documents into editable Word files.","pdf-word"],
["Word to PDF","PDF Tools","Convert Word documents into PDF.","word-pdf"],
["PDF to JPG","PDF Tools","Turn PDF pages into JPG images.","pdf-jpg"],
["JPG to PDF","PDF Tools","Create a PDF from JPG images.","jpg-pdf"],
["Merge PDF","PDF Tools","Combine multiple PDF files into one.","merge-pdf"],
["Split PDF","PDF Tools","Split a PDF into separate files.","split-pdf"],
["Compress PDF","PDF Tools","Reduce PDF file size quickly.","compress-pdf"],
["Rotate PDF","PDF Tools","Rotate PDF pages to the correct orientation.","rotate-pdf"],
["PDF Unlock","PDF Tools","Unlock supported password-protected PDFs.","pdf-unlock"],
["PDF Watermark","PDF Tools","Add a watermark to PDF pages.","pdf-watermark"],
["Image Compressor","Image Tools","Compress JPG, PNG and WebP images.","image-compressor"],
["Image Resizer","Image Tools","Resize images to exact dimensions.","image-resizer"],
["Image Cropper","Image Tools","Crop images online.","image-cropper"],
["JPG to PNG","Image Tools","Convert JPG images to PNG.","jpg-png"],
["PNG to JPG","Image Tools","Convert PNG images to JPG.","png-jpg"],
["WebP Converter","Image Tools","Convert images to and from WebP.","webp-converter"],
["Image Background Remover","Image Tools","Remove simple image backgrounds.","background-remover"],
["Image to Text","Image Tools","Extract text from an image.","image-text"],
["QR Code Generator","SEO & Marketing","Create custom QR codes from text or links.","qr-generator"],
["Meta Tag Generator","SEO & Marketing","Generate SEO-ready meta tags.","meta-tags"],
["Sitemap Generator","SEO & Marketing","Create a basic XML sitemap.","sitemap"],
["Robots.txt Generator","SEO & Marketing","Generate a robots.txt file.","robots"],
["Keyword Density Checker","SEO & Marketing","Analyze keyword frequency in text.","keyword-density"],
["URL Encoder","SEO & Marketing","Encode URLs safely.","url-encoder"],
["Word Counter","Text Tools","Count words, characters and sentences.","word-counter"],
["Case Converter","Text Tools","Convert text to upper, lower and title case.","case-converter"],
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
["MD5 Hash Generator","Security Tools","Generate an MD5-style hash placeholder locally.","md5"],
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
["Currency Converter","Converter Tools","Enter exchange rates and convert currencies.","currency"],
["Data Storage Converter","Converter Tools","Convert bytes, KB, MB and GB.","storage"],
["Color Converter","Developer Tools","Convert HEX, RGB and HSL values.","color"],
["IP Address Info","Network Tools","Inspect the IP address visible to your browser.","ip-info"],
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
["Barcode Generator","SEO & Marketing","Generate a simple barcode-ready value.","barcode"],
["Open Graph Generator","SEO & Marketing","Create Open Graph meta tags.","open-graph"],
["Schema Markup Generator","SEO & Marketing","Create basic JSON-LD schema templates.","schema"],
["Favicon Generator","SEO & Marketing","Prepare favicon assets from an image.","favicon"],
["UTM Builder","SEO & Marketing","Build campaign tracking URLs.","utm"],
["HTML Previewer","Developer Tools","Preview HTML in a sandboxed area.","html-preview"],
["Markdown Previewer","Developer Tools","Preview basic Markdown.","markdown"],
["SQL Formatter","Developer Tools","Format simple SQL statements.","sql"],
["CSV to JSON","Developer Tools","Convert CSV text to JSON.","csv-json"],
["JSON to CSV","Developer Tools","Convert simple JSON arrays to CSV.","json-csv"],
["XML Formatter","Developer Tools","Format XML text.","xml"],
["YAML to JSON","Developer Tools","Convert basic YAML-like key values to JSON.","yaml-json"],
["CSS Color Picker","Developer Tools","Pick and inspect a color.","color-picker"],
["Aspect Ratio Calculator","Calculator Tools","Calculate proportional dimensions.","aspect"],
["Compound Interest Calculator","Calculator Tools","Estimate compound growth.","compound-interest"],
["Scientific Calculator","Calculator Tools","Perform common scientific calculations.","scientific"],
["Date Calculator","Calculator Tools","Add days to a date.","date-add"],
["Business Name Generator","Utility Tools","Generate business name ideas from keywords.","business-name"],
["Username Generator","Utility Tools","Generate username ideas.","username"],
["Morse Code Converter","Text Tools","Convert text to Morse code.","morse"],
["Binary Converter","Developer Tools","Convert text and numbers to binary.","binary"],
["ASCII Converter","Developer Tools","Convert text to ASCII codes.","ascii"],
["URL Slug Generator","SEO & Marketing","Create clean SEO slugs.","slug"]
];

const categories = [
["All Tools", tools.length, Wrench],
["PDF Tools", tools.filter(x=>x[1]==="PDF Tools").length, FileText],
["Image Tools", tools.filter(x=>x[1]==="Image Tools").length, ImageIcon],
["SEO & Marketing", tools.filter(x=>x[1]==="SEO & Marketing").length, Globe2],
["Text Tools", tools.filter(x=>x[1]==="Text Tools").length, FileText],
["Developer Tools", tools.filter(x=>x[1]==="Developer Tools").length, Code2],
["Calculator Tools", tools.filter(x=>x[1]==="Calculator Tools").length, Calculator],
["Converter Tools", tools.filter(x=>x[1]==="Converter Tools").length, Wrench],
["Security Tools", tools.filter(x=>x[1]==="Security Tools").length, ShieldCheck],
["Utility Tools", tools.filter(x=>x[1]==="Utility Tools").length, Sparkles]
];

const plans = [
  { id:"free", name:"Free", credits:50, period:"daily", price:0, description:"50 credits every day" },
  { id:"starter", name:"Starter", credits:500, period:"monthly", price:5, description:"500 credits every month" },
  { id:"pro", name:"Pro", credits:2000, period:"monthly", price:15, description:"2,000 credits every month", popular:true },
  { id:"business", name:"Business", credits:10000, period:"monthly", price:49, description:"10,000 credits every month" }
];

const fileTools = new Set([
  "pdf-word","word-pdf","pdf-jpg","jpg-pdf","merge-pdf","split-pdf","compress-pdf",
  "rotate-pdf","pdf-unlock","pdf-watermark","image-compressor","image-resizer",
  "image-cropper","jpg-png","png-jpg","webp-converter","background-remover","image-text",
  "favicon"
]);

function downloadBlob(blob, filename){
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
}

function textDownload(text, filename="toolmaster-result.txt"){
  downloadBlob(new Blob([text],{type:"text/plain;charset=utf-8"}), filename);
}

async function supabaseFetch(path, options={}){
  if(!SUPABASE_URL || !SUPABASE_ANON_KEY) throw new Error("Supabase environment variables are not configured.");
  const headers = {
    apikey: SUPABASE_ANON_KEY,
    "Content-Type":"application/json",
    ...(options.headers||{})
  };
  const res = await fetch(`${SUPABASE_URL}${path}`, {...options, headers});
  const data = await res.json().catch(()=>null);
  if(!res.ok) throw new Error(data?.msg || data?.message || data?.error_description || "Supabase request failed");
  return data;
}

function App(){
 const [cat,setCat]=useState("All Tools");
 const [query,setQuery]=useState("");
 const [tool,setTool]=useState(null);
 const [admin,setAdmin]=useState(false);
 const [adminUser,setAdminUser]=useState(null);
 const filtered=useMemo(()=>tools.filter(t=>
   (cat==="All Tools"||t[1]===cat) &&
   (t[0].toLowerCase().includes(query.toLowerCase())||t[2].toLowerCase().includes(query.toLowerCase()))
 ),[cat,query]);

 const openAdmin=()=>{
   if(adminUser) setAdmin(true);
   else setAdmin("login");
 };

 return <div className="app">
  <header>
   <div className="nav">
    <div className="brand"><div className="brandIcon"><Wrench size={22}/></div><span>ToolMaster<span>Pro</span></span></div>
    <nav><a href="#tools">Tools</a><a href="#categories">Categories</a><a href="#about">About</a></nav>
    <button className="adminBtn" onClick={openAdmin}>
      <LayoutDashboard size={17}/> {adminUser?"Admin Dashboard":"Admin Login"}
    </button>
   </div>
  </header>

  {admin==="login" ? <AdminLogin onLogin={(u)=>{setAdminUser(u);setAdmin(true)}} onClose={()=>setAdmin(false)}/> :
   admin ? <Admin user={adminUser} onLogout={()=>{setAdminUser(null);setAdmin(false)}} onClose={()=>setAdmin(false)}/> :
   tool ? <ToolPage t={tool} back={()=>setTool(null)}/> :
  <>
   <section className="hero">
    <div className="pill"><Sparkles size={15}/> 100+ Free Online Tools</div>
    <h1>One place for <span>every tool</span> you need.</h1>
    <p>Fast, simple and privacy-friendly online tools for PDF, images, SEO, text, developers, calculators and more.</p>
    <div className="search"><Search/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search for a tool..."/></div>
    <div className="stats"><div><b>{tools.length}+</b><small>Tools</small></div><div><b>10</b><small>Categories</small></div><div><b>100%</b><small>Browser-based</small></div></div>
   </section>

   <main id="tools">
    <section id="categories" className="categories">
      {categories.map(([name,count,Icon])=><button className={cat===name?"cat active":"cat"} onClick={()=>setCat(name)} key={name}><Icon/><span>{name}</span><em>{count}</em></button>)}
    </section>
    <div className="sectionHead"><div><h2>{cat}</h2><p>{filtered.length} tools available</p></div></div>
    <div className="grid">{filtered.map(t=><ToolCard key={t[3]} t={t} open={()=>setTool(t)}/>)}</div>
    {!filtered.length && <div className="empty">No tools found. Try another search.</div>}
   </main>
  </>}

  <footer id="about"><div className="brand"><div className="brandIcon"><Wrench size={20}/></div><span>ToolMaster<span>Pro</span></span></div><p>Powerful online tools, made simple.</p><small>© 2026 ToolMaster Pro. All tools are designed for easy browser use.</small></footer>
 </div>
}

function ToolCard({t,open}){
 const icons={ "PDF Tools":FileText,"Image Tools":ImageIcon,"SEO & Marketing":Globe2,"Text Tools":FileText,"Developer Tools":Code2,"Calculator Tools":Calculator };
 const Icon=icons[t[1]]||Wrench;
 return <article className="card" onClick={open}><div className="toolIcon"><Icon size={21}/></div><div className="cardBody"><span>{t[1]}</span><h3>{t[0]}</h3><p>{t[2]}</p></div><ArrowRight className="arrow"/></article>
}

function AdminLogin({onLogin,onClose}){
 const [email,setEmail]=useState("");
 const [password,setPassword]=useState("");
 const [loading,setLoading]=useState(false);
 const [error,setError]=useState("");

 const login=async e=>{
   e.preventDefault(); setError(""); setLoading(true);
   try{
     if(SUPABASE_URL && SUPABASE_ANON_KEY){
       const data=await supabaseFetch("/auth/v1/token?grant_type=password",{
         method:"POST", body:JSON.stringify({email,password})
       });
       const token=data.access_token;
       const profile=await supabaseFetch(`/rest/v1/profiles?select=id,email,role&email=eq.${encodeURIComponent(email)}&limit=1`,{
         headers:{Authorization:`Bearer ${token}`}
       });
       const p=profile?.[0];
       if(!p || p.role!=="admin") throw new Error("This account is not authorized as an admin.");
       sessionStorage.setItem("tm_admin_token",token);
       onLogin({email,role:"admin",token});
     }else{
       const demoEmail="admin@toolmasterpro.com";
       const demoPassword="Admin@12345";
       if(email!==demoEmail || password!==demoPassword) throw new Error("Demo login: admin@toolmasterpro.com / Admin@12345");
       onLogin({email,role:"admin",demo:true});
     }
   }catch(err){setError(err.message||"Login failed.");}
   finally{setLoading(false);}
 };

 return <main className="toolPage">
   <button className="back" onClick={onClose}>← Back to website</button>
   <div className="authCard">
     <div className="toolIcon big"><LockKeyhole/></div>
     <h1>Admin Login</h1>
     <p>Secure access to ToolMaster Pro control center.</p>
     <form onSubmit={login} className="authForm">
       <label>Email<input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="admin@example.com" required/></label>
       <label>Password<input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" required/></label>
       {error&&<div className="errorBox">{error}</div>}
       <button className="primary" disabled={loading}>{loading?"Signing in...":"Sign in as Admin"}</button>
     </form>
     {!SUPABASE_URL && <div className="notice"><ShieldCheck size={18}/> Demo mode is active. Configure Supabase env variables before production use.</div>}
   </div>
 </main>
}

function Admin({user,onLogout,onClose}){
 const [tab,setTab]=useState("overview");
 const [notice,setNotice]=useState("");
 const save=()=>{setNotice("Settings saved locally. Connect the corresponding Supabase tables/API for persistent production changes.");setTimeout(()=>setNotice(""),3500)};
 return <main className="admin">
   <div className="adminTop">
    <div><span className="pill">Admin Panel</span><h1>ToolMaster Pro Control Center</h1><p>Signed in as {user?.email}</p></div>
    <div className="actions"><button className="secondary" onClick={onClose}>Website</button><button className="secondary" onClick={onLogout}><LogOut size={16}/> Logout</button></div>
   </div>
   <div className="adminTabs">
     <button className={tab==="overview"?"active":""} onClick={()=>setTab("overview")}><LayoutDashboard size={16}/> Overview</button>
     <button className={tab==="tools"?"active":""} onClick={()=>setTab("tools")}><Settings size={16}/> Tools</button>
     <button className={tab==="plans"?"active":""} onClick={()=>setTab("plans")}><CreditCard size={16}/> Plans</button>
     <button className={tab==="users"?"active":""} onClick={()=>setTab("users")}><Users size={16}/> Users</button>
   </div>
   {notice&&<div className="notice">{notice}</div>}
   {tab==="overview"&&<div className="adminGrid">
     <div className="adminCard"><BarChart3/><h3>Tools</h3><b>{tools.length}</b><p>Configured tools</p></div>
     <div className="adminCard"><CreditCard/><h3>Credit Plans</h3><b>{plans.length}</b><p>Text-to-Video plans</p></div>
     <div className="adminCard"><Users/><h3>Users</h3><b>—</b><p>Connect profiles table for live count</p></div>
     <div className="adminCard"><CheckCircle2/><h3>System</h3><b className="ok">Ready</b><p>Frontend upgrade loaded</p></div>
   </div>}
   {tab==="tools"&&<div className="adminPanel"><h2>Tool Management</h2><p>Existing tools are preserved. File-enabled tools:</p><div className="adminList">{tools.filter(t=>fileTools.has(t[3])).map(t=><div key={t[3]}><span>{t[0]}</span><em>File Upload + Download</em></div>)}</div><button className="primary" onClick={save}>Save Tool Settings</button></div>}
   {tab==="plans"&&<div className="adminPanel"><h2>Text-to-Video Plans</h2><div className="planAdmin">{plans.map(p=><div className="planRow" key={p.id}><b>{p.name}</b><span>{p.credits} credits/{p.period}</span><span>${p.price}</span></div>)}</div><button className="primary" onClick={save}>Save Plan Settings</button></div>}
   {tab==="users"&&<div className="adminPanel"><h2>Users & Access</h2><p>Production users are read from the Supabase <code>profiles</code> table after RLS is configured.</p><div className="notice"><LockKeyhole size={18}/> Only users with <code>role = admin</code> should access this dashboard.</div></div>}
 </main>
}

function TextToVideo({back}){
 const [prompt,setPrompt]=useState("");
 const [style,setStyle]=useState("Cinematic");
 const [duration,setDuration]=useState("10 seconds");
 const [plan,setPlan]=useState("free");
 const [credits,setCredits]=useState(()=>Number(localStorage.getItem("tm_daily_credits")||50));
 const [status,setStatus]=useState("");
 const [videoUrl,setVideoUrl]=useState("");

 const generate=()=>{
   if(!prompt.trim()){setStatus("Please enter a video prompt first.");return;}
   if(credits<1){setStatus("No credits left. Choose a paid plan below.");return;}
   setCredits(c=>{const n=c-1;localStorage.setItem("tm_daily_credits",n);return n;});
   setStatus("Request accepted. Connect a server-side video provider/API to render the actual MP4.");
 };

 return <main className="toolPage">
   <button className="back" onClick={back}>← Back to tools</button>
   <div className="toolHero"><div className="toolIcon big"><Sparkles/></div><div><span>AI & Video</span><h1>Text to Video</h1><p>Create an AI video project with plan-based credits.</p></div></div>
   <div className="creditBar"><div><b>{credits}</b><span>credits remaining</span></div><span>Current plan: <strong>{plans.find(p=>p.id===plan)?.name}</strong></span></div>
   <div className="plansGrid">{plans.map(p=><button key={p.id} className={`planCard ${plan===p.id?"selected":""}`} onClick={()=>setPlan(p.id)}><span>{p.name}</span><b>{p.price===0?"Free":`$${p.price}/mo`}</b><small>{p.description}</small>{p.popular&&<em>Popular</em>}</button>)}</div>
   <div className="aiHelper">
    <div className="aiCard">
      <h3>🎬 Video Prompt</h3>
      <textarea value={prompt} onChange={e=>setPrompt(e.target.value)} placeholder="Example: A cinematic drone shot of a futuristic city at sunset, realistic lighting, smooth camera movement..."/>
      <div className="videoOptions">
       <label>Style<select value={style} onChange={e=>setStyle(e.target.value)}><option>Cinematic</option><option>Realistic</option><option>Anime</option><option>3D Animation</option><option>Documentary</option><option>Product Ad</option></select></label>
       <label>Duration<select value={duration} onChange={e=>setDuration(e.target.value)}><option>5 seconds</option><option>10 seconds</option><option>15 seconds</option><option>30 seconds</option></select></label>
      </div>
      <button className="primary aiSolve" onClick={generate}><Sparkles size={17}/> Generate Video · 1 credit</button>
      {status&&<div className="statusBox">{status}</div>}
    </div>
    <div className="aiCard resultCard">
      <h3>🎥 Video Preview</h3>
      <div className="videoPlaceholder">
       {videoUrl?<video src={videoUrl} controls/>:<><div className="playCircle">▶</div><b>Your generated video will appear here</b><small>{style} · {duration}</small></>}
      </div>
      {videoUrl&&<button className="secondary full" onClick={()=>{const a=document.createElement("a");a.href=videoUrl;a.download="toolmaster-video.mp4";a.click()}}><Download size={17}/> Download Video</button>}
    </div>
   </div>
   <div className="notice"><ShieldCheck/> Real MP4 generation needs a secure server-side AI video provider. Keep provider API keys on the server, never in React/browser code.</div>
 </main>
}

function StudentAIHelper({back}){
 const [question,setQuestion]=useState("");
 const [file,setFile]=useState(null);
 const [answer,setAnswer]=useState("");
 const [loading,setLoading]=useState(false);
 const solve=async()=>{
   if(!question.trim()&&!file){setAnswer("Please enter a question or upload a study image/PDF.");return;}
   setLoading(true);
   setTimeout(()=>{setAnswer("Student AI Helper is ready. Connect your secure backend AI provider for real answers. The selected file remains local in this demo.");setLoading(false)},700);
 };
 return <main className="toolPage">
   <button className="back" onClick={back}>← Back to tools</button>
   <div className="toolHero"><div className="toolIcon big"><Sparkles/></div><div><span>AI & Education</span><h1>Student AI Helper</h1><p>Ask a question or upload a study image/PDF.</p></div></div>
   <div className="aiHelper">
    <div className="aiCard">
      <h3>📚 Ask your question</h3>
      <textarea value={question} onChange={e=>setQuestion(e.target.value)} placeholder="Explain photosynthesis, solve maths, summarize a chapter..."/>
      <FileUpload file={file} setFile={setFile} accept=".pdf,image/*,.txt,.doc,.docx" label="Upload study material"/>
      <button className="primary aiSolve" onClick={solve} disabled={loading}><Sparkles size={17}/>{loading?"Preparing...":"Get AI Help"}</button>
    </div>
    <div className="aiCard resultCard"><h3>🤖 AI Answer</h3><div className="answer">{answer||"Your step-by-step explanation will appear here."}</div>{answer&&<><button className="secondary" onClick={()=>navigator.clipboard?.writeText(answer)}><Copy size={17}/> Copy Answer</button><button className="secondary" onClick={()=>textDownload(answer,"student-ai-answer.txt")}><Download size={17}/> Download Answer</button></>}</div>
   </div>
 </main>
}

function FileUpload({file,setFile,accept,label="Upload File"}){
 return <label className="uploadBox"><Upload/><div><b>{label}</b><small>Click or drag a file here</small>{file&&<strong>{file.name}</strong>}</div><input type="file" accept={accept} onChange={e=>setFile(e.target.files?.[0]||null)}/></label>
}

function FileToolWorkspace({t,back}){
 const [file,setFile]=useState(null);
 const [result,setResult]=useState(null);
 const [status,setStatus]=useState("");
 const process=()=>{
   if(!file){setStatus("Please upload a file first.");return;}
   setStatus(`${t[0]} received "${file.name}". Connect the matching backend converter for production conversion.`);
   setResult({blob:file,type:file.type,name:`processed-${file.name}`});
 };
 return <main className="toolPage">
   <button className="back" onClick={back}>← Back to tools</button>
   <div className="toolHero"><div className="toolIcon big"><Upload/></div><div><span>{t[1]}</span><h1>{t[0]}</h1><p>{t[2]}</p></div></div>
   <div className="fileWorkspace">
     <FileUpload file={file} setFile={setFile} accept={t[1]==="Image Tools"?"image/*":".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp"} label="Upload File"/>
     <div className="fileActions">
       <button className="primary" onClick={process}><Zap size={17}/> Process File</button>
       <button className="secondary" onClick={()=>{setFile(null);setResult(null);setStatus("")}}><RefreshCw size={17}/> Reset</button>
     </div>
     {status&&<div className="statusBox">{status}</div>}
     {result&&<button className="secondary downloadBtn" onClick={()=>downloadBlob(result.blob,result.name)}><Download size={17}/> Download File</button>}
   </div>
   <div className="notice"><ShieldCheck/> Upload/download UI is enabled. Actual PDF/image conversion must run through the appropriate processing library or secure backend endpoint.</div>
 </main>
}

function ToolPage({t,back}){
 if(t[3]==="student-ai-helper") return <StudentAIHelper back={back}/>;
 if(t[3]==="text-to-video") return <TextToVideo back={back}/>;
 if(fileTools.has(t[3])) return <FileToolWorkspace t={t} back={back}/>;

 const [text,setText]=useState("");
 const [out,setOut]=useState("");
 const run=()=>{
   let r=text;
   const id=t[3];
   if(id==="word-counter"||id==="characters") r=`Words: ${text.trim()?text.trim().split(/\s+/).length:0}\nCharacters: ${text.length}`;
   else if(id==="case-converter") r=text.toLowerCase();
   else if(id==="text-reverser") r=[...text].reverse().join("");
   else if(id==="slug") r=text.toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
   else if(id==="url-encoder") r=encodeURIComponent(text);
   else if(id==="base64-encode") r=btoa(unescape(encodeURIComponent(text)));
   else if(id==="base64-decode"){try{r=decodeURIComponent(escape(atob(text)))}catch{r="Invalid Base64"}}
   else if(id==="json-formatter"){try{r=JSON.stringify(JSON.parse(text),null,2)}catch{r="Invalid JSON"}}
   else if(id==="json-minifier"){try{r=JSON.stringify(JSON.parse(text))}catch{r="Invalid JSON"}}
   else if(id==="uuid") r=crypto.randomUUID();
   else if(id==="password"||id==="random-password") r=crypto.getRandomValues(new Uint32Array(3)).join("-")+"!Aa";
   else if(id==="binary") r=[...text].map(c=>c.charCodeAt(0).toString(2).padStart(8,"0")).join(" ");
   else if(id==="ascii") r=[...text].map(c=>c.charCodeAt(0)).join(" ");
   else if(id==="morse"){const m={a:".-",b:"-...",c:"-.-.",d:"-..",e:".",f:"..-.",g:"--.",h:"....",i:"..",j:".---",k:"-.-",l:".-..",m:"--",n:"-.",o:"---",p:".--.",q:"--.-",r:".-.",s:"...",t:"-",u:"..-",v:"...-",w:".--",x:"-..-",y:"-.--",z:"--.."};r=text.toLowerCase().split("").map(c=>m[c]||c).join(" ");}
   else if(id==="duplicate-lines") r=[...new Set(text.split(/\r?\n/))].join("\n");
   else if(id==="text-sorter") r=text.split(/\r?\n/).sort((a,b)=>a.localeCompare(b)).join("\n");
   else if(id==="text-cleaner") r=text.replace(/[ \t]+/g," ").replace(/\n{3,}/g,"\n\n").trim();
   else if(id==="palindrome"){const s=text.toLowerCase().replace(/[^a-z0-9]/g,"");r=s===s.split("").reverse().join("")?"Palindrome":"Not a palindrome";}
   else if(id==="reading-time") r=`Estimated reading time: ${Math.max(1,Math.ceil((text.trim()?text.trim().split(/\s+/).length:0)/200))} minute(s)`;
   else if(id==="email-validator") r=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text.trim())?"Valid email format":"Invalid email format";
   else if(id==="random-number") r=String(Math.floor(Math.random()*1000000));
   else if(id==="number-words") r="Number-to-words conversion is ready for backend/extended locale support.";
   else r="This tool is ready. Add the tool-specific processing logic or connect its secure backend endpoint.";
   setOut(r);
 };
 return <main className="toolPage">
   <button className="back" onClick={back}>← Back to tools</button>
   <div className="toolHero"><div className="toolIcon big"><Wrench/></div><div><span>{t[1]}</span><h1>{t[0]}</h1><p>{t[2]}</p></div></div>
   <div className="workspace">
    <div className="panel"><label>Your input</label><textarea value={text} onChange={e=>setText(e.target.value)} placeholder="Paste or type your content here..."/><div className="actions"><button className="primary" onClick={run}><Zap size={17}/> Run Tool</button><button className="secondary" onClick={()=>{setText("");setOut("")}}>Clear</button></div></div>
    <div className="panel"><label>Result</label><textarea value={out} readOnly placeholder="Your result will appear here..."/><div className="actions"><button className="secondary" onClick={()=>navigator.clipboard?.writeText(out)}><Copy size={17}/> Copy Result</button><button className="secondary" onClick={()=>textDownload(out)}><Download size={17}/> Download</button></div></div>
   </div>
   <div className="notice"><ShieldCheck/> Browser-safe tools run locally whenever possible. Sensitive files should only be uploaded to a trusted backend.</div>
 </main>
}

createRoot(document.getElementById("root")).render(<App/>);
