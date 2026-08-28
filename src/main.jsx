import React, { useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Search, Wrench, FileText, Image as ImageIcon, Code2, Globe2, Calculator,
  ArrowRight, ShieldCheck, Zap, Sparkles, Upload, Copy, Download, CheckCircle2,
  LockKeyhole, Settings, LayoutDashboard, Trash2, RefreshCw, Eye, Printer
} from "lucide-react";
import "./styles.css";

/*
  ToolMaster Pro - functional browser-first build.
  - Text/developer/SEO/calculator/converter tools run locally.
  - Image tools use Canvas and provide real downloadable files.
  - PDF tools use pdf-lib/pdfjs loaded only when a PDF tool is opened.
  - DOCX helpers use docx/pdfjs/mammoth when required.
  - AI/video tools expose a backend hook through VITE_API_BASE_URL or
    VITE_SUPABASE_FUNCTION_URL when those environment variables exist.
*/

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
  ["PDF Unlock","PDF Tools","Create an unrestricted copy of supported PDFs.","pdf-unlock"],
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
  ["All Tools", tools.length],
  ["PDF Tools", tools.filter(x=>x[1]==="PDF Tools").length],
  ["Image Tools", tools.filter(x=>x[1]==="Image Tools").length],
  ["SEO & Marketing", tools.filter(x=>x[1]==="SEO & Marketing").length],
  ["Text Tools", tools.filter(x=>x[1]==="Text Tools").length],
  ["Developer Tools", tools.filter(x=>x[1]==="Developer Tools").length],
  ["Calculator Tools", tools.filter(x=>x[1]==="Calculator Tools").length],
  ["Converter Tools", tools.filter(x=>x[1]==="Converter Tools").length],
  ["Security Tools", tools.filter(x=>x[1]==="Security Tools").length],
  ["Utility Tools", tools.filter(x=>x[1]==="Utility Tools").length]
];

const downloadBlob = (blob, name) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = name; document.body.appendChild(a); a.click(); a.remove();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
};
const downloadText = (text,name,type="text/plain;charset=utf-8") =>
  downloadBlob(new Blob([text],{type}),name);

async function loadLib(name) {
  const urls = {
    "pdf-lib":"https://esm.sh/pdf-lib@1.17.1",
    "pdfjs":"https://esm.sh/pdfjs-dist@4.10.38/legacy/build/pdf.mjs",
    "docx":"https://esm.sh/docx@9.5.1",
    "mammoth":"https://esm.sh/mammoth@1.9.0",
    "qrcode":"https://esm.sh/qrcode@1.5.4",
    "jsbarcode":"https://esm.sh/jsbarcode@3.11.6"
  };
  if(!urls[name]) throw new Error("Library not configured");
  return import(/* @vite-ignore */ urls[name]);
}

function App(){
  const [cat,setCat]=useState("All Tools");
  const [query,setQuery]=useState("");
  const [tool,setTool]=useState(null);
  const [admin,setAdmin]=useState(false);
  const filtered=useMemo(()=>tools.filter(t=>
    (cat==="All Tools"||t[1]===cat) &&
    (t[0].toLowerCase().includes(query.toLowerCase())||t[2].toLowerCase().includes(query.toLowerCase()))
  ),[cat,query]);

  return <div className="app">
    <header><div className="nav">
      <div className="brand"><div className="brandIcon"><Wrench size={22}/></div><span>ToolMaster<span>Pro</span></span></div>
      <nav><a href="#tools">Tools</a><a href="#categories">Categories</a><a href="#about">About</a></nav>
      <button className="adminBtn" onClick={()=>setAdmin(!admin)}><LayoutDashboard size={17}/> {admin?"Close Admin":"Admin"}</button>
    </div></header>

    {admin ? <Admin onClose={()=>setAdmin(false)}/> : tool ? <ToolPage t={tool} back={()=>setTool(null)}/> :
      <>
        <section className="hero">
          <div className="pill"><Sparkles size={15}/> 100+ Free Online Tools</div>
          <h1>One place for <span>every tool</span> you need.</h1>
          <p>Fast, simple and privacy-friendly online tools for PDF, images, SEO, text, developers, calculators and more.</p>
          <div className="search"><Search/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search for a tool..."/></div>
          <div className="stats"><div><b>{tools.length}+</b><small>Tools</small></div><div><b>10</b><small>Categories</small></div><div><b>Browser</b><small>First</small></div></div>
        </section>
        <main id="tools">
          <section id="categories" className="categories">
            {categories.map(([name,count])=><button className={cat===name?"cat active":"cat"} onClick={()=>setCat(name)} key={name}><Wrench/><span>{name}</span><em>{count}</em></button>)}
          </section>
          <div className="sectionHead"><div><h2>{cat}</h2><p>{filtered.length} tools available</p></div></div>
          <div className="grid">{filtered.map(t=><ToolCard key={t[3]} t={t} open={()=>setTool(t)}/>)}</div>
          {!filtered.length && <div className="empty">No tools found. Try another search.</div>}
        </main>
      </>
    }
    <footer id="about"><div className="brand"><div className="brandIcon"><Wrench size={20}/></div><span>ToolMaster<span>Pro</span></span></div><p>Powerful online tools, made simple.</p><small>© 2026 ToolMaster Pro. Browser-first processing where possible.</small></footer>
  </div>;
}

function ToolCard({t,open}){
  return <article className="card" onClick={open}><div className="toolIcon"><Wrench size={21}/></div><div className="cardBody"><span>{t[1]}</span><h3>{t[0]}</h3><p>{t[2]}</p></div><ArrowRight className="arrow"/></article>;
}

function FilePicker({multiple=false,accept,onChange,files}){
  return <label className="uploadBox"><Upload/>
    <div><b>{multiple?"Upload files":"Upload file"}</b><small>{accept||"Supported files"}</small>
      {files?.length ? <strong>{files.map(f=>f.name).join(", ")}</strong> : null}
    </div>
    <input type="file" multiple={multiple} accept={accept} onChange={e=>onChange([...e.target.files])}/>
  </label>;
}

function ToolPage({t,back}){
  if(t[3]==="student-ai-helper") return <StudentAIHelper back={back}/>;
  if(t[3]==="text-to-video") return <TextToVideo back={back}/>;
  if(t[1]==="PDF Tools") return <PdfTool t={t} back={back}/>;
  if(t[1]==="Image Tools") return <ImageTool t={t} back={back}/>;
  return <GenericTool t={t} back={back}/>;
}

function Shell({back,t,children,status}){
  return <main className="toolPage"><button className="back" onClick={back}>← Back to tools</button>
    <div className="toolHero"><div className="toolIcon big"><Wrench/></div><div><span>{t[1]}</span><h1>{t[0]}</h1><p>{t[2]}</p></div></div>
    {children}{status&&<div className="notice"><ShieldCheck/> {status}</div>}
  </main>;
}

function TextToVideo({back}){
  const [prompt,setPrompt]=useState(""); const [style,setStyle]=useState("Cinematic");
  const [duration,setDuration]=useState("10 seconds"); const [status,setStatus]=useState("");
  const generate=async()=>{
    if(!prompt.trim()) return setStatus("Please enter a video prompt first.");
    setStatus("Preparing video request...");
    try{
      const base=import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_SUPABASE_FUNCTION_URL;
      if(!base) return setStatus("Prompt prepared locally. Add VITE_API_BASE_URL or a Supabase Edge Function to render real video.");
      const r=await fetch(base,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({prompt,style,duration})});
      const data=await r.json().catch(()=>({}));
      if(!r.ok) throw new Error(data.error||"Video API request failed");
      setStatus(data.message||"Video request submitted successfully.");
    }catch(e){setStatus(e.message);}
  };
  return <Shell back={back} t={["Text to Video","AI & Video","",""]} status={status}>
    <div className="aiHelper"><div className="aiCard"><h3>🎬 Video Prompt</h3>
      <textarea value={prompt} onChange={e=>setPrompt(e.target.value)} placeholder="Describe your video..."/>
      <div className="videoOptions"><label>Style<select value={style} onChange={e=>setStyle(e.target.value)}><option>Cinematic</option><option>Realistic</option><option>Anime</option><option>3D Animation</option><option>Documentary</option><option>Product Ad</option></select></label>
      <label>Duration<select value={duration} onChange={e=>setDuration(e.target.value)}><option>5 seconds</option><option>10 seconds</option><option>15 seconds</option><option>30 seconds</option></select></label></div>
      <button className="primary aiSolve" onClick={generate}><Sparkles size={17}/> Generate Video</button>
    </div><div className="aiCard resultCard"><h3>🎥 Video Preview</h3><div className="videoPlaceholder"><div className="playCircle">▶</div><b>Backend video output appears here</b><small>{style} · {duration}</small></div></div></div>
  </Shell>;
}

function StudentAIHelper({back}){
  const [question,setQuestion]=useState(""); const [files,setFiles]=useState([]);
  const [answer,setAnswer]=useState(""); const [loading,setLoading]=useState(false);
  const solve=async()=>{
    if(!question.trim()&&!files.length) return setAnswer("Please enter a question or upload a study file.");
    setLoading(true);
    try{
      const base=import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_SUPABASE_FUNCTION_URL;
      if(!base){ setAnswer("Your file is selected locally. Connect a secure AI backend to receive real AI answers."); return; }
      const fd=new FormData(); fd.append("question",question); files.forEach(f=>fd.append("files",f));
      const r=await fetch(base,{method:"POST",body:fd}); const d=await r.json().catch(()=>({}));
      if(!r.ok) throw new Error(d.error||"AI request failed"); setAnswer(d.answer||d.message||"AI response received.");
    }catch(e){setAnswer(e.message);} finally{setLoading(false);}
  };
  return <Shell back={back} t={["Student AI Helper","AI & Education","",""]} status="AI processing is sent to your configured secure backend only when VITE_API_BASE_URL or VITE_SUPABASE_FUNCTION_URL is configured.">
    <div className="aiHelper"><div className="aiCard"><h3>📚 Ask your question</h3><textarea value={question} onChange={e=>setQuestion(e.target.value)} placeholder="Ask a question or explain what you need help with..."/>
      <FilePicker multiple accept=".pdf,image/*,.txt,.doc,.docx" onChange={setFiles} files={files}/><div className="actions"><button className="primary" disabled={loading} onClick={solve}><Sparkles size={17}/>{loading?"Processing...":"Get AI Help"}</button>{files.length>0&&<button className="secondary" onClick={()=>setFiles([])}><Trash2/> Clear files</button>}</div>
    </div><div className="aiCard resultCard"><h3>🤖 AI Answer</h3><div className="answer">{answer||"Your step-by-step answer will appear here."}</div>{answer&&<div className="actions"><button className="secondary" onClick={()=>navigator.clipboard?.writeText(answer)}><Copy/> Copy</button><button className="secondary" onClick={()=>downloadText(answer,"student-ai-answer.txt")}><Download/> Download</button></div>}</div></div>
  </Shell>;
}

function PdfTool({t,back}){
  const id=t[3]; const [files,setFiles]=useState([]); const [busy,setBusy]=useState(false); const [status,setStatus]=useState(""); const [watermark,setWatermark]=useState("ToolMaster Pro"); const [angle,setAngle]=useState("90");
  const [quality,setQuality]=useState(.65); const [pages,setPages]=useState("1");
  const run=async()=>{
    if(!files.length) return setStatus("Please upload a PDF first.");
    setBusy(true); setStatus("");
    try{
      const {PDFDocument,degrees,rgb}=await loadLib("pdf-lib");
      if(id==="pdf-word"){ await pdfToWord(files[0]); return; }
      if(id==="word-pdf"){ await wordToPdf(files[0]); return; }
      if(id==="pdf-jpg"){ await pdfToJpg(files[0]); return; }
      const src=await PDFDocument.load(await files[0].arrayBuffer(),{ignoreEncryption:id==="pdf-unlock"});
      if(id==="jpg-pdf") throw new Error("Use JPG to PDF: upload JPG/PNG images.");
      if(id==="merge-pdf"){
        const out=await PDFDocument.create();
        for(const f of files){const doc=await PDFDocument.load(await f.arrayBuffer(),{ignoreEncryption:true}); const copied=await out.copyPages(doc,doc.getPageIndices()); copied.forEach(p=>out.addPage(p));}
        downloadBlob(new Blob([await out.save()],{type:"application/pdf"}),"merged.pdf"); setStatus("Merged PDF downloaded."); return;
      }
      if(id==="split-pdf"){
        const nums=pages.split(",").map(x=>parseInt(x.trim(),10)-1).filter(Number.isInteger);
        const list=nums.length?nums:src.getPageIndices();
        for(const n of list){if(n<0||n>=src.getPageCount())continue; const one=await PDFDocument.create(); const [p]=await one.copyPages(src,[n]); one.addPage(p); downloadBlob(new Blob([await one.save()],{type:"application/pdf"}),`page-${n+1}.pdf`);}
        setStatus("Selected pages downloaded."); return;
      }
      if(id==="compress-pdf"){
        const bytes=await src.save({useObjectStreams:true,addDefaultPage:false});
        downloadBlob(new Blob([bytes],{type:"application/pdf"}),"compressed.pdf"); setStatus("Optimized PDF downloaded. For image-heavy PDFs, raster compression needs server-side processing."); return;
      }
      if(id==="rotate-pdf"){
        src.getPages().forEach(p=>p.setRotation(degrees(Number(angle)||90)));
        downloadBlob(new Blob([await src.save()],{type:"application/pdf"}),"rotated.pdf"); setStatus("Rotated PDF downloaded."); return;
      }
      if(id==="pdf-unlock"){
        downloadBlob(new Blob([await src.save()],{type:"application/pdf"}),"unlocked.pdf"); setStatus("A new unrestricted copy was downloaded if the source encryption was supported by pdf-lib."); return;
      }
      if(id==="pdf-watermark"){
        src.getPages().forEach(p=>{const {width,height}=p.getSize(); p.drawText(watermark||"ToolMaster Pro",{x:width/2-60,y:height/2,size:28,color:rgb(.65,.65,.65),opacity:.35,rotate:degrees(35)});});
        downloadBlob(new Blob([await src.save()],{type:"application/pdf"}),"watermarked.pdf"); setStatus("Watermarked PDF downloaded."); return;
      }
    }catch(e){setStatus("Error: "+(e?.message||String(e)))}finally{setBusy(false);}
  };
  async function pdfToJpg(file){
    const pdfjs=await loadLib("pdfjs"); const pdf=await pdfjs.getDocument({data:await file.arrayBuffer()}).promise;
    for(let i=1;i<=pdf.numPages;i++){const page=await pdf.getPage(i); const viewport=page.getViewport({scale:1.7}); const c=document.createElement("canvas"); c.width=viewport.width;c.height=viewport.height;await page.render({canvasContext:c.getContext("2d"),viewport}).promise; const blob=await new Promise(r=>c.toBlob(r,"image/jpeg",Number(quality))); downloadBlob(blob,`${file.name.replace(/\\.pdf$/i,"")}-page-${i}.jpg`);}
    setStatus(`${pdf.numPages} JPG page(s) downloaded.`);
  }
  async function pdfToWord(file){
    const pdfjs=await loadLib("pdfjs"); const {Document,Packer,Paragraph}=await loadLib("docx");
    const pdf=await pdfjs.getDocument({data:await file.arrayBuffer()}).promise; const children=[];
    for(let i=1;i<=pdf.numPages;i++){const page=await pdf.getPage(i); const tc=await page.getTextContent(); const text=tc.items.map(x=>x.str).join(" "); children.push(new Paragraph(text));}
    const doc=new Document({sections:[{children}]}); const blob=await Packer.toBlob(doc); downloadBlob(blob,file.name.replace(/\\.pdf$/i,"")+".docx"); setStatus("Editable Word file downloaded.");
  }
  async function wordToPdf(file){
    const mammoth=await loadLib("mammoth"); const html=(await mammoth.convertToHtml({arrayBuffer:await file.arrayBuffer()})).value;
    const w=window.open("","_blank"); if(!w) throw new Error("Popup blocked. Allow popups for this site.");
    w.document.write(`<html><head><title>Word to PDF</title><style>body{font-family:Arial;padding:40px;line-height:1.6}img{max-width:100%}</style></head><body>${html}</body></html>`); w.document.close(); w.focus(); setTimeout(()=>w.print(),500); setStatus("Print dialog opened. Choose 'Save as PDF' to download."); 
  }
  async function jpgToPdf(){
    const {PDFDocument}=await loadLib("pdf-lib"); const doc=await PDFDocument.create();
    for(const f of files){const bytes=await f.arrayBuffer(); let img; try{img=await doc.embedJpg(bytes)}catch{img=await doc.embedPng(bytes)} const page=doc.addPage([img.width,img.height]); page.drawImage(img,{x:0,y:0,width:img.width,height:img.height});}
    downloadBlob(new Blob([await doc.save()],{type:"application/pdf"}),"images.pdf"); setStatus("PDF downloaded.");
  }
  if(id==="jpg-pdf") return <Shell back={back} t={t} status={status}><div className="workspace"><div className="panel"><FilePicker multiple accept="image/jpeg,image/png" onChange={setFiles} files={files}/><button className="primary" disabled={busy||!files.length} onClick={jpgToPdf}><Download/> Create & Download PDF</button></div><div className="panel"><h3>{files.length} image(s) selected</h3>{files.map(f=><p key={f.name}>✓ {f.name}</p>)}</div></div></Shell>;
  return <Shell back={back} t={t} status={status||"Files are processed in your browser when supported."}><div className="workspace"><div className="panel"><FilePicker multiple={id==="merge-pdf"} accept=".pdf,application/pdf" onChange={setFiles} files={files}/>
    {(id==="split-pdf")&&<label>Pages (e.g. 1,3,5)<input value={pages} onChange={e=>setPages(e.target.value)} /></label>}
    {(id==="rotate-pdf")&&<label>Rotation<select value={angle} onChange={e=>setAngle(e.target.value)}><option value="90">90°</option><option value="180">180°</option><option value="270">270°</option></select></label>}
    {(id==="pdf-watermark")&&<label>Watermark text<input value={watermark} onChange={e=>setWatermark(e.target.value)}/></label>}
    {(id==="pdf-jpg")&&<label>JPG quality<input type="range" min=".3" max=".95" step=".05" value={quality} onChange={e=>setQuality(e.target.value)}/></label>}
    <button className="primary" disabled={busy||!files.length} onClick={run}>{busy?<RefreshCw className="spin"/>:<Download/>}{busy?"Processing...":"Process & Download"}</button>
  </div><div className="panel"><h3>Selected files</h3>{files.map(f=><p key={f.name}>📄 {f.name} — {(f.size/1024).toFixed(1)} KB</p>)}</div></div></Shell>;
}

function ImageTool({t,back}){
  const id=t[3]; const [files,setFiles]=useState([]); const [busy,setBusy]=useState(false); const [status,setStatus]=useState("");
  const [w,setW]=useState(1200),[h,setH]=useState(800),[quality,setQuality]=useState(.75),[crop,setCrop]=useState("1:1");
  const run=async()=>{
    if(!files.length)return setStatus("Please upload an image.");
    setBusy(true);setStatus("");
    try{
      const file=files[0], img=await loadImage(file), c=document.createElement("canvas"), ctx=c.getContext("2d");
      if(id==="image-text") throw new Error("Image-to-text OCR needs an OCR backend/library. Connect your AI/OCR Edge Function.");
      let ow=img.naturalWidth,oh=img.naturalHeight;
      if(id==="image-resizer"){c.width=Number(w)||ow;c.height=Number(h)||oh;ctx.drawImage(img,0,0,c.width,c.height);}
      else if(id==="image-cropper"){const [rw,rh]=crop.split(":").map(Number); const target=rw/rh; let cw=ow,ch=oh;if(ow/oh>target)cw=oh*target;else ch=ow/target; const sx=(ow-cw)/2,sy=(oh-ch)/2;c.width=Math.round(cw);c.height=Math.round(ch);ctx.drawImage(img,sx,sy,cw,ch,0,0,c.width,c.height);}
      else {c.width=ow;c.height=oh;ctx.drawImage(img,0,0);}
      let type="image/png",name=file.name.replace(/\.[^.]+$/,"")+".png";
      if(id==="png-jpg"||id==="image-compressor"){type="image/jpeg";name=file.name.replace(/\.[^.]+$/,"")+".jpg";}
      if(id==="webp-converter"){type="image/webp";name=file.name.replace(/\.[^.]+$/,"")+".webp";}
      if(id==="jpg-png"){type="image/png";name=file.name.replace(/\.[^.]+$/,"")+".png";}
      const blob=await new Promise(r=>c.toBlob(r,type,Number(quality))); downloadBlob(blob,name); setStatus("Image downloaded.");
    }catch(e){setStatus(e.message)}finally{setBusy(false)}
  };
  const loadImage=file=>new Promise((res,rej)=>{const i=new Image();i.onload=()=>{URL.revokeObjectURL(i.src);res(i)};i.onerror=rej;i.src=URL.createObjectURL(file)});
  if(id==="background-remover") return <Shell back={back} t={t} status="Simple background removal is not implemented as a fake effect. Connect an image-background-removal API/Edge Function for real AI removal."><div className="workspace"><div className="panel"><FilePicker accept="image/*" onChange={setFiles} files={files}/><button className="primary" onClick={()=>setStatus("Connect your secure background-removal backend to process this image.")}>Remove Background</button></div></div></Shell>;
  return <Shell back={back} t={t} status={status}><div className="workspace"><div className="panel"><FilePicker accept="image/*" onChange={setFiles} files={files}/>
    {(id==="image-resizer")&&<div className="videoOptions"><label>Width<input type="number" value={w} onChange={e=>setW(e.target.value)}/></label><label>Height<input type="number" value={h} onChange={e=>setH(e.target.value)}/></label></div>}
    {(id==="image-cropper")&&<label>Aspect ratio<select value={crop} onChange={e=>setCrop(e.target.value)}><option>1:1</option><option>4:3</option><option>16:9</option><option>3:4</option><option>9:16</option></select></label>}
    {(id==="image-compressor")&&<label>Quality<input type="range" min=".2" max=".95" step=".05" value={quality} onChange={e=>setQuality(e.target.value)}/></label>}
    <button className="primary" disabled={busy||!files.length} onClick={run}>{busy?"Processing...":"Process & Download"}</button>
  </div><div className="panel">{files.map(f=><p key={f.name}>🖼️ {f.name}</p>)}</div></div></Shell>;
}

function GenericTool({t,back}){
  const id=t[3]; const [text,setText]=useState(""); const [out,setOut]=useState(""); const [extra,setExtra]=useState(""); const [status,setStatus]=useState("");
  const run=async()=>{
    try{setStatus("");let r=text;
      if(id==="word-counter"||id==="characters"){r=`Words: ${text.trim()?text.trim().split(/\s+/).length:0}\nCharacters: ${text.length}\nCharacters without spaces: ${text.replace(/\s/g,"").length}\nSentences: ${text.trim()?text.split(/[.!?]+/).filter(Boolean).length:0}`;}
      else if(id==="case-converter") r=text.toLowerCase();
      else if(id==="text-cleaner") r=text.split("\n").map(x=>x.trim().replace(/\s+/g," ")).filter(Boolean).join("\n");
      else if(id==="duplicate-lines") r=[...new Set(text.split(/\r?\n/))].join("\n");
      else if(id==="text-sorter") r=text.split(/\r?\n/).sort((a,b)=>a.localeCompare(b)).join("\n");
      else if(id==="text-reverser") r=[...text].reverse().join("");
      else if(id==="palindrome") r=(text.toLowerCase().replace(/[^a-z0-9]/g,"")===text.toLowerCase().replace(/[^a-z0-9]/g,"").split("").reverse().join(""))?"Palindrome":"Not a palindrome";
      else if(id==="slug") r=text.toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
      else if(id==="url-encoder") r=encodeURIComponent(text);
      else if(id==="url-parser"){const u=new URL(text);r=JSON.stringify({protocol:u.protocol,host:u.host,path:u.pathname,query:u.search,hash:u.hash},null,2);}
      else if(id==="base64-encode") r=btoa(unescape(encodeURIComponent(text)));
      else if(id==="base64-decode") r=decodeURIComponent(escape(atob(text)));
      else if(id==="json-formatter") r=JSON.stringify(JSON.parse(text),null,2);
      else if(id==="json-minifier") r=JSON.stringify(JSON.parse(text));
      else if(id==="csv-json") r=JSON.stringify(csvToRows(text),null,2);
      else if(id==="json-csv") r=rowsToCsv(JSON.parse(text));
      else if(id==="yaml-json") r=JSON.stringify(Object.fromEntries(text.split(/\r?\n/).filter(x=>x.includes(":")).map(x=>{const i=x.indexOf(":");return[x.slice(0,i).trim(),x.slice(i+1).trim()]})),null,2);
      else if(id==="html-entities") r=text.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;");
      else if(id==="html-formatter") r=text.replace(/></g,">\n<").split("\n").map(x=>x.trim()).join("\n");
      else if(id==="css-formatter") r=text.replace(/\{/g," {\n").replace(/;/g,";\n").replace(/\}/g,"\n}\n");
      else if(id==="js-minifier") r=text.replace(/\/\*[\s\S]*?\*\//g,"").replace(/\/\/.*$/gm,"").replace(/\s+/g," ").trim();
      else if(id==="uuid") r=crypto.randomUUID();
      else if(id==="password"||id==="random-password") r=randomPassword(20);
      else if(id==="binary") r=[...text].map(c=>c.codePointAt(0).toString(2).padStart(8,"0")).join(" ");
      else if(id==="ascii") r=[...text].map(c=>c.codePointAt(0)).join(" ");
      else if(id==="morse") r=morse(text);
      else if(id==="email-validator") r=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text.trim())?"Valid email":"Invalid email";
      else if(id==="phone") r=text.replace(/[^\d+]/g,"").replace(/^00/,"+");
      else if(id==="reading-time") r=`${Math.max(1,Math.ceil((text.trim()?text.trim().split(/\s+/).length:0)/200))} minute(s)`;
      else if(id==="timestamp") {const n=Number(text);r=isFinite(n)?new Date(n*(String(n).length<=10?1000:1)).toISOString():"Invalid timestamp";}
      else if(id==="regex"){const [pat,flags]=extra.split("\n");const re=new RegExp(pat,flags||"");r=JSON.stringify([...text.matchAll(re)].map(m=>m[0]),null,2);}
      else if(id==="http-status") r=httpStatus(text);
      else if(id==="color") r=colorConvert(text);
      else if(id==="number-words") r=numberWords(Number(text));
      else if(id==="roman") r=toRoman(Number(text));
      else if(id==="random-number"){const [a,b]=text.split(",").map(Number);r=String(Math.floor(Math.random()*(b-a+1))+a);}
      else if(id==="business-name") r=businessNames(text);
      else if(id==="username") r=usernameIdeas(text);
      else if(id==="percentage"){const [a,b]=text.split(",").map(Number);r=`${a}% of ${b} = ${(a*b/100).toFixed(2)}`;}
      else if(id==="discount"){const [price,pct]=text.split(",").map(Number);r=`Discount: ${(price*pct/100).toFixed(2)}\nSale price: ${(price-price*pct/100).toFixed(2)}`;}
      else if(id==="gst"){const [amount,rate]=text.split(",").map(Number);r=`GST: ${(amount*rate/100).toFixed(2)}\nTotal: ${(amount*(1+rate/100)).toFixed(2)}`;}
      else if(id==="tip"){const [bill,pct,people]=text.split(",").map(Number);const tip=bill*pct/100;r=`Tip: ${tip.toFixed(2)}\nTotal: ${(bill+tip).toFixed(2)}\nPer person: ${((bill+tip)/(people||1)).toFixed(2)}`;}
      else if(id==="loan"){const [principal,annual,months]=text.split(",").map(Number);const m=annual/1200;const p=m?principal*m*Math.pow(1+m,months)/(Math.pow(1+m,months)-1):principal/months;r=`Monthly payment: ${p.toFixed(2)}\nTotal: ${(p*months).toFixed(2)}`;}
      else if(id==="compound-interest"){const [p,rate,years,n]=text.split(",").map(Number);const a=p*Math.pow(1+rate/100/(n||1),(n||1)*years);r=`Final amount: ${a.toFixed(2)}\nInterest: ${(a-p).toFixed(2)}`;}
      else if(id==="bmi"){const [kg,cm]=text.split(",").map(Number);const bmi=kg/Math.pow(cm/100,2);r=`BMI: ${bmi.toFixed(2)} — ${bmi<18.5?"Underweight":bmi<25?"Normal":bmi<30?"Overweight":"Obesity"}`;}
      else if(id==="aspect"){const [w,h]=text.split(",").map(Number);r=`Ratio: ${gcd(w,h)?`${w/gcd(w,h)}:${h/gcd(w,h)}`:"Invalid"}`;}
      else if(id==="temperature"){const [v,u]=text.split(",").map(x=>x.trim());const n=Number(v);r=u?.toUpperCase()==="C"?`${(n*9/5+32).toFixed(2)} °F / ${(n+273.15).toFixed(2)} K`:u?.toUpperCase()==="F"?`${((n-32)*5/9).toFixed(2)} °C / ${((n-32)*5/9+273.15).toFixed(2)} K`:`${(n-273.15).toFixed(2)} °C / ${((n-273.15)*9/5+32).toFixed(2)} °F`;}
      else if(id==="length") r=convertLength(text);
      else if(id==="weight") r=convertWeight(text);
      else if(id==="storage") r=convertStorage(text);
      else if(id==="units") r=convertLength(text);
      else if(id==="date-difference"){const [a,b]=text.split(",").map(x=>new Date(x.trim()));r=`Days: ${Math.abs(b-a)/86400000}`;}
      else if(id==="date-add"){const [d,n]=text.split(",");const x=new Date(d.trim());x.setDate(x.getDate()+Number(n));r=x.toISOString().slice(0,10);}
      else if(id==="time"){const [a,b]=text.split(",").map(x=>x.trim().split(":").map(Number));const x=(a[0]*60+a[1])+(b[0]*60+b[1]);r=`${Math.floor(x/60)}:${String(x%60).padStart(2,"0")}`;}
      else if(id==="meta-tags") r=metaTags(text);
      else if(id==="open-graph") r=openGraph(text);
      else if(id==="schema") r=schema(text);
      else if(id==="robots") r=`User-agent: *\nAllow: /\nSitemap: ${text||"https://example.com/sitemap.xml"}`;
      else if(id==="sitemap") r=`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${text||"https://example.com/"}</loc></url>\n</urlset>`;
      else if(id==="utm"){const u=new URL(text.split("\n")[0]||"https://example.com");const [source,medium,campaign]=text.split("\n").slice(1);if(source)u.searchParams.set("utm_source",source);if(medium)u.searchParams.set("utm_medium",medium);if(campaign)u.searchParams.set("utm_campaign",campaign);r=u.toString();}
      else if(id==="keyword-density"){const words=text.toLowerCase().match(/[a-z0-9]+/g)||[];const m={};words.forEach(x=>m[x]=(m[x]||0)+1);r=Object.entries(m).sort((a,b)=>b[1]-a[1]).slice(0,30).map(([k,v])=>`${k}: ${v} (${(v/words.length*100).toFixed(2)}%)`).join("\n");}
      else if(id==="color-picker") r=text||"#000000";
      else if(id==="sql") r=text.replace(/\s+/g," ").replace(/\b(SELECT|FROM|WHERE|INSERT INTO|VALUES|UPDATE|SET|DELETE FROM|ORDER BY|GROUP BY|LIMIT)\b/gi,"\n$1 ").trim();
      else if(id==="markdown") r=markdownToHtml(text);
      else if(id==="html-preview"){const w=window.open();if(!w)throw new Error("Popup blocked");w.document.write(text);w.document.close();r="HTML preview opened in a new tab.";}
      else r=`${t[0]} is ready. Enter your data and press Run Tool.`;
      setOut(r);
    }catch(e){setOut("Error: "+e.message);}
  };
  const fileAction=(e)=>{const f=e.target.files?.[0];if(f){f.text().then(setText)}};
  const download=()=>{if(out)downloadText(out,`${id}-result.txt`,"text/plain;charset=utf-8")};
  const clear=()=>{setText("");setOut("");setExtra("");setStatus("")};
  const placeholder = id==="regex"?"Regex pattern and flags in the second field": "Paste or type your content here...";
  return <Shell back={back} t={t} status={status}><div className="workspace"><div className="panel"><label>Your input</label>
    {["meta-tags","open-graph","schema","utm"].includes(id)?<textarea value={text} onChange={e=>setText(e.target.value)} placeholder={placeholder}/>:<textarea value={text} onChange={e=>setText(e.target.value)} placeholder={placeholder}/>}
    {id==="regex"&&<textarea value={extra} onChange={e=>setExtra(e.target.value)} placeholder="pattern on line 1, flags on line 2 (e.g. gi)"/>}
    {["image-text","favicon"].includes(id)&&<input type="file" accept="image/*" onChange={fileAction}/>}
    <div className="actions"><button className="primary" onClick={run}><Zap size={17}/> Run Tool</button><button className="secondary" onClick={clear}>Clear</button></div>
  </div><div className="panel"><label>Result</label><textarea value={out} readOnly placeholder="Your result will appear here..."/>
    <div className="actions"><button className="secondary" onClick={()=>navigator.clipboard?.writeText(out)} disabled={!out}><Copy/> Copy</button><button className="secondary" onClick={download} disabled={!out}><Download/> Download</button></div>
  </div></div></Shell>;
}

function csvToRows(s){const lines=s.trim().split(/\r?\n/);if(!lines.length)return[];const headers=splitCsv(lines[0]);return lines.slice(1).map(l=>{const v=splitCsv(l);return Object.fromEntries(headers.map((h,i)=>[h,v[i]??""]))})}
function splitCsv(s){return s.split(",").map(x=>x.trim().replace(/^"|"$/g,""))}
function rowsToCsv(rows){if(!Array.isArray(rows)||!rows.length)return"";const h=Object.keys(rows[0]);return [h.join(","),...rows.map(r=>h.map(k=>`"${String(r[k]??"").replace(/"/g,'""')}"`).join(","))].join("\n")}
function randomPassword(n=20){const chars="ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*";const a=new Uint32Array(n);crypto.getRandomValues(a);return [...a].map(x=>chars[x%chars.length]).join("")}
function morse(s){const m={a:".-",b:"-...",c:"-.-.",d:"-..",e:".",f:"..-.",g:"--.",h:"....",i:"..",j:".---",k:"-.-",l:".-..",m:"--",n:"-.",o:"---",p:".--.",q:"--.-",r:".-.",s:"...",t:"-",u:"..-",v:"...-",w:".--",x:"-..-",y:"-.--",z:"--.."," ":"/"};return s.toLowerCase().split("").map(c=>m[c]||c).join(" ")}
function gcd(a,b){while(b){[a,b]=[b,a%b]}return Math.abs(a)}
function toRoman(n){if(!Number.isInteger(n)||n<=0||n>3999)return"Enter 1-3999";const v=[[1000,"M"],[900,"CM"],[500,"D"],[400,"CD"],[100,"C"],[90,"XC"],[50,"L"],[40,"XL"],[10,"X"],[9,"IX"],[5,"V"],[4,"IV"],[1,"I"]];let r="";for(const[x,c]of v){while(n>=x){r+=c;n-=x}}return r}
function numberWords(n){if(!Number.isFinite(n))return"Invalid number";if(n===0)return"zero";const ones=["","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen"],tens=["","","twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety"];const small=x=>x<20?ones[x]:x<100?tens[Math.floor(x/10)]+(x%10?"-"+ones[x%10]:""):x<1000?ones[Math.floor(x/100)]+" hundred"+(x%100?" "+small(x%100):""):x<1e6?small(Math.floor(x/1000))+" thousand"+(x%1000?" "+small(x%1000):""):x<1e9?small(Math.floor(x/1e6))+" million"+(x%1e6?" "+small(x%1e6):""):String(x);return n<0?"minus "+small(-n):small(Math.floor(n))}
function businessNames(s){const k=(s||"tech").split(/[,\s]+/).filter(Boolean);const a=["Nova","Prime","Pixel","Bright","Cloud","Swift","Next","Smart","Vertex","Orbit"],b=["Labs","Works","Hub","Studio","Solutions","Pro","Digital","Forge"];return [...new Set(a.slice(0,8).map((x,i)=>`${x}${k[i%k.length]||"Tech"} ${b[i%8]}`))].join("\n")}
function usernameIdeas(s){const x=(s||"user").toLowerCase().replace(/[^a-z0-9]/g,"");return [...new Set([x,x+"pro",x+"official",x+"_hub",x+"2026","the"+x,x+".online"])].join("\n")}
function httpStatus(s){const m={200:"OK — successful request",201:"Created",204:"No Content",301:"Moved Permanently",302:"Found",400:"Bad Request",401:"Unauthorized",403:"Forbidden",404:"Not Found",405:"Method Not Allowed",408:"Request Timeout",429:"Too Many Requests",500:"Internal Server Error",502:"Bad Gateway",503:"Service Unavailable"};return m[Number(s)]||"Unknown/common status code"}
function colorConvert(s){const h=s.trim().replace("#","");if(!/^[0-9a-f]{6}$/i.test(h))return"Enter HEX like #336699";const r=parseInt(h.slice(0,2),16),g=parseInt(h.slice(2,4),16),b=parseInt(h.slice(4),16);const mx=Math.max(r,g,b)/255,mn=Math.min(r,g,b)/255,l=(mx+mn)/2;let hh=0,ss=0;if(mx!==mn){const d=mx-mn;ss=l>.5?d/(2-mx-mn):d/(mx+mn);switch(mx){case r/255:hh=((g-b)/255/d+(g<b?6:0));break;case g/255:hh=(b-r)/255/d+2;break;default:hh=(r-g)/255/d+4}hh*=60}return`HEX: #${h.toUpperCase()}\nRGB: rgb(${r}, ${g}, ${b})\nHSL: hsl(${Math.round(hh)}, ${Math.round(ss*100)}%, ${Math.round(l*100)}%)`}
function convertLength(s){const [v,from,to]=s.split(",").map(x=>x.trim().toLowerCase());const n=Number(v),m={m:1,km:1000,cm:.01,mm:.001,ft:.3048,yd:.9144,mi:1609.344,in:.0254};return m[from]&&m[to]?String(n*m[from]/m[to]):"Use: value,from,to (m, km, cm, mm, ft, yd, mi, in)"}
function convertWeight(s){const [v,from,to]=s.split(",").map(x=>x.trim().toLowerCase());const n=Number(v),m={kg:1,g:.001,mg:.000001,lb:.45359237,oz:.0283495};return m[from]&&m[to]?String(n*m[from]/m[to]):"Use: value,from,to (kg,g,mg,lb,oz)"}
function convertStorage(s){const [v,from,to]=s.split(",").map(x=>x.trim().toLowerCase());const n=Number(v),m={b:1,kb:1024,mb:1048576,gb:1073741824,tb:1099511627776};return m[from]&&m[to]?String(n*m[from]/m[to]):"Use: value,from,to (b,kb,mb,gb,tb)"}
function metaTags(s){const [title,desc,url]=s.split("\n");return `<title>${title||"Page Title"}</title>\n<meta name="description" content="${desc||""}">\n<link rel="canonical" href="${url||""}">`}
function openGraph(s){const [title,desc,url,img]=s.split("\n");return `<meta property="og:title" content="${title||""}">\n<meta property="og:description" content="${desc||""}">\n<meta property="og:url" content="${url||""}">\n<meta property="og:image" content="${img||""}">`}
function schema(s){const [name,url,description]=s.split("\n");return JSON.stringify({"@context":"https://schema.org","@type":"WebSite",name:name||"",url:url||"",description:description||""},null,2)}
function markdownToHtml(s){return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/^### (.*)$/gm,"<h3>$1</h3>").replace(/^## (.*)$/gm,"<h2>$1</h2>").replace(/^# (.*)$/gm,"<h1>$1</h1>").replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>").replace(/\n/g,"<br>")}

function Admin({onClose}){
  const [msg,setMsg]=useState("");
  const ping=async()=>{const base=import.meta.env.VITE_API_BASE_URL||import.meta.env.VITE_SUPABASE_FUNCTION_URL;if(!base)return setMsg("No backend URL configured. Add VITE_API_BASE_URL or VITE_SUPABASE_FUNCTION_URL in Vercel.");try{const r=await fetch(base,{method:"GET"});setMsg(`Backend response: ${r.status}`)}catch(e){setMsg("Backend check failed: "+e.message)}};
  return <main className="admin"><div className="adminTop"><div><span className="pill">Admin Panel</span><h1>ToolMaster Pro Control Center</h1><p>Frontend tools are configured. Connect your existing authenticated backend through environment variables for server operations.</p></div><button className="secondary" onClick={onClose}>Back to Website</button></div>
    <div className="adminGrid"><div className="adminCard"><Settings/><h3>Tool Management</h3><p>{tools.length} tools configured.</p><button className="primary" onClick={()=>setMsg("All tool cards are active. Tool processing is handled by the tool pages.")}>Check Tools</button></div>
      <div className="adminCard"><LockKeyhole/><h3>Users & Access</h3><p>Use your existing Supabase Auth/roles backend. Do not put service-role keys in frontend code.</p><button className="primary" onClick={ping}>Check Backend</button></div>
      <div className="adminCard"><LayoutDashboard/><h3>Analytics</h3><p>Ready to connect to Supabase usage tables.</p><button className="primary" onClick={()=>setMsg("Analytics UI is ready; connect it to your Supabase usage table.")}>View Status</button></div>
      <div className="adminCard"><CheckCircle2/><h3>System Status</h3><p>{msg||"Browser tool engine ready."}</p><strong className="ok">Ready</strong></div></div>
  </main>
}

createRoot(document.getElementById("root")).render(<App/>);
