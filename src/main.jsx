import React, { useMemo, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import {
  Search, Wrench, FileText, Image as ImageIcon, Code2, Globe2,
  Calculator, ArrowRight, ShieldCheck, Zap, Sparkles, Upload,
  Copy, Download, CheckCircle2, Settings, LayoutDashboard,
  LogOut, CreditCard, Users, BarChart3, X, RefreshCw, User,
  UserPlus, Mail, Eye, EyeOff, KeyRound, Home, FolderKanban,
  Activity, Menu, ChevronRight, Database, Crown, Trash2, Edit3
} from "lucide-react";
import "./styles.css";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

const tools = [
  ["Text to Video","AI & Video","Turn a written prompt into an AI video project.","text-to-video"],
  ["Student AI Helper","AI & Education","Ask questions or upload study material.","student-ai-helper"],
  ["PDF to Word","PDF Tools","Convert PDF documents into editable Word files.","pdf-word"],
  ["Word to PDF","PDF Tools","Convert Word documents into PDF.","word-pdf"],
  ["PDF to JPG","PDF Tools","Turn PDF pages into JPG images.","pdf-jpg"],
  ["JPG to PDF","PDF Tools","Create a PDF from JPG images.","jpg-pdf"],
  ["Merge PDF","PDF Tools","Combine multiple PDF files.","merge-pdf"],
  ["Split PDF","PDF Tools","Split PDF files.","split-pdf"],
  ["Compress PDF","PDF Tools","Reduce PDF file size.","compress-pdf"],
  ["Rotate PDF","PDF Tools","Rotate PDF pages.","rotate-pdf"],
  ["PDF Unlock","PDF Tools","Unlock supported PDFs.","pdf-unlock"],
  ["PDF Watermark","PDF Tools","Add a watermark to PDF pages.","pdf-watermark"],

  ["Image Compressor","Image Tools","Compress JPG, PNG and WebP images.","image-compressor"],
  ["Image Resizer","Image Tools","Resize images to exact dimensions.","image-resizer"],
  ["Image Cropper","Image Tools","Crop images online.","image-cropper"],
  ["JPG to PNG","Image Tools","Convert JPG images to PNG.","jpg-png"],
  ["PNG to JPG","Image Tools","Convert PNG images to JPG.","png-jpg"],
  ["WebP Converter","Image Tools","Convert images to and from WebP.","webp-converter"],
  ["Image Background Remover","Image Tools","Remove simple image backgrounds.","background-remover"],
  ["Image to Text","Image Tools","Extract text from an image.","image-text"],

  ["QR Code Generator","SEO & Marketing","Create QR codes from text or URLs.","qr-generator"],
  ["Meta Tag Generator","SEO & Marketing","Generate SEO meta tags.","meta-tags"],
  ["Sitemap Generator","SEO & Marketing","Create a basic XML sitemap.","sitemap"],
  ["Robots.txt Generator","SEO & Marketing","Generate robots.txt.","robots"],
  ["Keyword Density Checker","SEO & Marketing","Analyze keyword frequency.","keyword-density"],
  ["URL Encoder","SEO & Marketing","Encode URLs safely.","url-encoder"],
  ["Open Graph Generator","SEO & Marketing","Create Open Graph meta tags.","open-graph"],
  ["Schema Markup Generator","SEO & Marketing","Create JSON-LD schema.","schema"],
  ["UTM Builder","SEO & Marketing","Build campaign tracking URLs.","utm"],
  ["URL Slug Generator","SEO & Marketing","Create clean SEO slugs.","slug"],

  ["Word Counter","Text Tools","Count words, characters and sentences.","word-counter"],
  ["Case Converter","Text Tools","Convert text case.","case-converter"],
  ["Text Cleaner","Text Tools","Clean extra spaces.","text-cleaner"],
  ["Lorem Ipsum Generator","Text Tools","Generate placeholder text.","lorem"],
  ["Duplicate Line Remover","Text Tools","Remove duplicate lines.","duplicate-lines"],
  ["Text Sorter","Text Tools","Sort lines alphabetically.","text-sorter"],
  ["Text Reverser","Text Tools","Reverse text.","text-reverser"],
  ["Palindrome Checker","Text Tools","Check palindrome text.","palindrome"],
  ["Reading Time Calculator","Text Tools","Estimate reading time.","reading-time"],
  ["Character Counter","Text Tools","Count characters.","characters"],
  ["Morse Code Converter","Text Tools","Convert text to Morse.","morse"],

  ["JSON Formatter","Developer Tools","Format and validate JSON.","json-formatter"],
  ["JSON Minifier","Developer Tools","Minify JSON.","json-minifier"],
  ["Base64 Encoder","Developer Tools","Encode text to Base64.","base64-encode"],
  ["Base64 Decoder","Developer Tools","Decode Base64.","base64-decode"],
  ["HTML Formatter","Developer Tools","Format HTML.","html-formatter"],
  ["CSS Formatter","Developer Tools","Format CSS.","css-formatter"],
  ["JavaScript Minifier","Developer Tools","Compact JavaScript.","js-minifier"],
  ["UUID Generator","Developer Tools","Generate UUID values.","uuid"],
  ["Timestamp Converter","Developer Tools","Convert Unix timestamps.","timestamp"],
  ["Color Converter","Developer Tools","Convert HEX/RGB/HSL.","color"],
  ["Regex Tester","Developer Tools","Test regular expressions.","regex"],
  ["HTML Entity Encoder","Developer Tools","Encode HTML entities.","html-entities"],
  ["URL Parser","Developer Tools","Break URL into parts.","url-parser"],
  ["CSV to JSON","Developer Tools","Convert CSV to JSON.","csv-json"],
  ["JSON to CSV","Developer Tools","Convert JSON to CSV.","json-csv"],
  ["XML Formatter","Developer Tools","Format XML.","xml"],
  ["Binary Converter","Developer Tools","Convert text to binary.","binary"],
  ["ASCII Converter","Developer Tools","Convert text to ASCII.","ascii"],

  ["Percentage Calculator","Calculator Tools","Calculate percentages.","percentage"],
  ["Age Calculator","Calculator Tools","Calculate age.","age"],
  ["BMI Calculator","Calculator Tools","Calculate BMI.","bmi"],
  ["Discount Calculator","Calculator Tools","Calculate discounts.","discount"],
  ["GST Calculator","Calculator Tools","Calculate GST.","gst"],
  ["Tip Calculator","Calculator Tools","Calculate tips.","tip"],
  ["Date Difference Calculator","Calculator Tools","Calculate date difference.","date-difference"],
  ["Aspect Ratio Calculator","Calculator Tools","Calculate proportional dimensions.","aspect"],
  ["Compound Interest Calculator","Calculator Tools","Calculate compound growth.","compound-interest"],
  ["Date Calculator","Calculator Tools","Add days to a date.","date-add"],
  ["Scientific Calculator","Calculator Tools","Perform calculations.","scientific"],

  ["Unit Converter","Converter Tools","Convert common units.","units"],
  ["Length Converter","Converter Tools","Convert length.","length"],
  ["Weight Converter","Converter Tools","Convert weight.","weight"],
  ["Temperature Converter","Converter Tools","Convert temperature.","temperature"],
  ["Currency Converter","Converter Tools","Convert currencies using entered rates.","currency"],
  ["Data Storage Converter","Converter Tools","Convert bytes and storage units.","storage"],

  ["Password Generator","Security Tools","Generate strong passwords.","password"],
  ["Password Strength Checker","Security Tools","Check password strength.","password-strength"],
  ["SHA-256 Generator","Security Tools","Generate SHA-256 hashes.","sha256"],
  ["Random Password Generator","Security Tools","Generate random passwords.","random-password"],

  ["Email Validator","Utility Tools","Validate email format.","email-validator"],
  ["Phone Number Formatter","Utility Tools","Clean phone numbers.","phone"],
  ["Random Number Generator","Utility Tools","Generate random numbers.","random-number"],
  ["Number to Words","Utility Tools","Convert numbers to English words.","number-words"],
  ["Roman Numeral Converter","Utility Tools","Convert numbers to Roman numerals.","roman"],
  ["Business Name Generator","Utility Tools","Generate business names.","business-name"],
  ["Username Generator","Utility Tools","Generate username ideas.","username"]
];

const plans = [
  {id:"free",name:"Free",credits:50,period:"daily",price:0,description:"50 credits every day"},
  {id:"starter",name:"Starter",credits:500,period:"monthly",price:5,description:"500 credits every month"},
  {id:"pro",name:"Pro",credits:2000,period:"monthly",price:15,description:"2,000 credits every month",popular:true},
  {id:"business",name:"Business",credits:10000,period:"monthly",price:49,description:"10,000 credits every month"}
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

function saveSession(session) {
  if(session) localStorage.setItem("tm_session",JSON.stringify(session));
  else localStorage.removeItem("tm_session");
}

function getSession() {
  try {
    return JSON.parse(localStorage.getItem("tm_session") || "null");
  } catch {
    return null;
  }
}

async function supabaseFetch(path,options={}) {
  if(!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error("Supabase environment variables are missing.");
  }

  const response = await fetch(`${SUPABASE_URL}${path}`,{
    ...options,
    headers:{
      apikey:SUPABASE_ANON_KEY,
      "Content-Type":"application/json",
      ...(options.headers || {})
    }
  });

  const data = await response.json().catch(()=>null);

  if(!response.ok) {
    throw new Error(
      data?.msg ||
      data?.message ||
      data?.error_description ||
      data?.error ||
      "Supabase request failed."
    );
  }

  return data;
}

function downloadBlob(blob,filename) {
  const url=URL.createObjectURL(blob);
  const a=document.createElement("a");
  a.href=url;
  a.download=filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
}

function textDownload(text,filename="toolmaster-result.txt") {
  downloadBlob(
    new Blob([text],{type:"text/plain;charset=utf-8"}),
    filename
  );
}

function App() {
  const [page,setPage]=useState("home");
  const [cat,setCat]=useState("All Tools");
  const [query,setQuery]=useState("");
  const [tool,setTool]=useState(null);
  const [auth,setAuth]=useState(null);
  const [authMode,setAuthMode]=useState(null);
  const [adminMode,setAdminMode]=useState(false);

  useEffect(()=>{
    const session=getSession();
    if(session) setAuth(session);
  },[]);

  const filtered=useMemo(()=>tools.filter(t=>
    (cat==="All Tools" || t[1]===cat) &&
    (
      t[0].toLowerCase().includes(query.toLowerCase()) ||
      t[2].toLowerCase().includes(query.toLowerCase())
    )
  ),[cat,query]);

  const openTool=t=>{
    setTool(t);
    setPage("tool");
    window.scrollTo({top:0,behavior:"smooth"});
  };

  const logout=()=>{
    saveSession(null);
    setAuth(null);
    setAdminMode(false);
    setPage("home");
  };

  if(adminMode) {
    return (
      <AdminPanel
        session={auth}
        onClose={()=>setAdminMode(false)}
        onLogout={logout}
      />
    );
  }

  if(authMode) {
    return (
      <>
        <PublicHeader
          auth={auth}
          onSignIn={()=>setAuthMode("login")}
          onSignUp={()=>setAuthMode("signup")}
          onLogout={logout}
          onAdmin={()=>setAdminMode(true)}
        />

        {authMode==="login" &&
          <LoginPage
            onClose={()=>setAuthMode(null)}
            onSignup={()=>setAuthMode("signup")}
            onForgot={()=>setAuthMode("forgot")}
            onSuccess={session=>{
              setAuth(session);
              setAuthMode(null);
            }}
          />
        }

        {authMode==="signup" &&
          <SignupPage
            onClose={()=>setAuthMode(null)}
            onLogin={()=>setAuthMode("login")}
            onSuccess={session=>{
              setAuth(session);
              setAuthMode(null);
            }}
          />
        }

        {authMode==="forgot" &&
          <ForgotPassword
            onClose={()=>setAuthMode(null)}
            onLogin={()=>setAuthMode("login")}
          />
        }
      </>
    );
  }

  return (
    <div className="app">
      <PublicHeader
        auth={auth}
        onSignIn={()=>setAuthMode("login")}
        onSignUp={()=>setAuthMode("signup")}
        onLogout={logout}
        onAdmin={()=>setAdminMode(true)}
      />

      {page==="tool" && tool ? (
        <ToolPage
          t={tool}
          back={()=>{
            setTool(null);
            setPage("home");
          }}
        />
      ) : (
        <>
          <section className="hero">
            <div className="pill">
              <Sparkles size={15}/>
              100+ Free Online Tools
            </div>

            <h1>
              One place for <span>every tool</span> you need.
            </h1>

            <p>
              Fast, simple and privacy-friendly online tools for PDF,
              images, SEO, text, developers, calculators and more.
            </p>

            <div className="search">
              <Search/>
              <input
                value={query}
                onChange={e=>setQuery(e.target.value)}
                placeholder="Search for a tool..."
              />
            </div>

            <div className="stats">
              <div>
                <b>{tools.length}+</b>
                <small>Tools</small>
              </div>
              <div>
                <b>10</b>
                <small>Categories</small>
              </div>
              <div>
                <b>100%</b>
                <small>Browser-based</small>
              </div>
            </div>
          </section>

          <main id="tools">
            <section id="categories" className="categories">
              {categories.map(([name,count,Icon])=>(
                <button
                  key={name}
                  className={cat===name?"cat active":"cat"}
                  onClick={()=>setCat(name)}
                >
                  <Icon/>
                  <span>{name}</span>
                  <em>{count}</em>
                </button>
              ))}
            </section>

            <div className="sectionHead">
              <div>
                <h2>{cat}</h2>
                <p>{filtered.length} tools available</p>
              </div>
            </div>

            <div className="grid">
              {filtered.map(t=>(
                <ToolCard
                  key={t[3]}
                  t={t}
                  open={()=>openTool(t)}
                />
              ))}
            </div>

            {!filtered.length &&
              <div className="empty">
                No tools found. Try another search.
              </div>
            }
          </main>
        </>
      )}

      <footer id="about">
        <div className="brand">
          <div className="brandIcon">
            <Wrench size={20}/>
          </div>
          <span>
            ToolMaster<span>Pro</span>
          </span>
        </div>

        <p>Powerful online tools, made simple.</p>

        <small>
          © 2026 ToolMaster Pro. All tools are designed for easy browser use.
        </small>
      </footer>
    </div>
  );
}

function PublicHeader({auth,onSignIn,onSignUp,onLogout,onAdmin}) {
  return (
    <header>
      <div className="nav">
        <div
          className="brand"
          onClick={()=>window.location.hash="tools"}
          style={{cursor:"pointer"}}
        >
          <div className="brandIcon">
            <Wrench size={22}/>
          </div>

          <span>
            ToolMaster<span>Pro</span>
          </span>
        </div>

        <nav>
          <a href="#tools">Tools</a>
          <a href="#categories">Categories</a>
          <a href="#about">About</a>
        </nav>

        <div className="authActions">
          {auth ? (
            <>
              <button className="profileBtn">
                <User size={16}/>
                {auth.profile?.username || auth.email?.split("@")[0]}
              </button>

              {auth.profile?.role==="admin" &&
                <button className="adminBtn" onClick={onAdmin}>
                  <LayoutDashboard size={17}/>
                  Admin
                </button>
              }

              <button className="secondary" onClick={onLogout}>
                <LogOut size={16}/>
                Logout
              </button>
            </>
          ) : (
            <>
              <button className="secondary" onClick={onSignIn}>
                Sign In
              </button>

              <button className="primary" onClick={onSignUp}>
                <UserPlus size={16}/>
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

function LoginPage({onClose,onSignup,onForgot,onSuccess}) {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [show,setShow]=useState(false);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState("");

  const submit=async e=>{
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data=await supabaseFetch(
        "/auth/v1/token?grant_type=password",
        {
          method:"POST",
          body:JSON.stringify({email,password})
        }
      );

      let profile=null;

      try {
        const rows=await supabaseFetch(
          `/rest/v1/profiles?select=*&id=eq.${encodeURIComponent(data.user.id)}&limit=1`,
          {
            headers:{
              Authorization:`Bearer ${data.access_token}`
            }
          }
        );

        profile=rows?.[0] || null;
      } catch {}

      const session={
        access_token:data.access_token,
        refresh_token:data.refresh_token,
        user:data.user,
        email:data.user.email,
        profile
      };

      saveSession(session);
      onSuccess(session);
    } catch(err) {
      setError(err.message || "Unable to sign in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to your ToolMaster Pro account."
      onClose={onClose}
    >
      <form className="authForm" onSubmit={submit}>
        <label>
          Email
          <div className="inputIcon">
            <Mail size={17}/>
            <input
              type="email"
              value={email}
              onChange={e=>setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>
        </label>

        <label>
          Password
          <div className="inputIcon">
            <KeyRound size={17}/>
            <input
              type={show?"text":"password"}
              value={password}
              onChange={e=>setPassword(e.target.value)}
              placeholder="Your password"
              required
            />

            <button
              type="button"
              className="iconButton"
              onClick={()=>setShow(!show)}
            >
              {show?<EyeOff size={17}/>:<Eye size={17}/>}
            </button>
          </div>
        </label>

        <div className="authRow">
          <button
            type="button"
            className="linkButton"
            onClick={onForgot}
          >
            Forgot Password?
          </button>
        </div>

        {error && <div className="errorBox">{error}</div>}

        <button className="primary authSubmit" disabled={loading}>
          {loading?"Signing in...":"Sign In"}
        </button>

        <p className="authBottom">
          Don't have an account?
          <button type="button" onClick={onSignup}>
            Create Account
          </button>
        </p>
      </form>
    </AuthShell>
  );
}

function SignupPage({onClose,onLogin,onSuccess}) {
  const [fullName,setFullName]=useState("");
  const [username,setUsername]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [confirm,setConfirm]=useState("");
  const [show,setShow]=useState(false);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState("");
  const [success,setSuccess]=useState("");

  const submit=async e=>{
    e.preventDefault();
    setError("");
    setSuccess("");

    if(password!==confirm) {
      setError("Passwords do not match.");
      return;
    }

    if(password.length<6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if(username.length<3) {
      setError("Username must contain at least 3 characters.");
      return;
    }

    setLoading(true);

    try {
      const data=await supabaseFetch(
        "/auth/v1/signup",
        {
          method:"POST",
          body:JSON.stringify({
            email,
            password,
            data:{
              full_name:fullName,
              username
            }
          })
        }
      );

      if(data?.access_token) {
        const session={
          access_token:data.access_token,
          refresh_token:data.refresh_token,
          user:data.user,
          email:data.user.email,
          profile:{
            id:data.user.id,
            full_name:fullName,
            username,
            email,
            role:"user"
          }
        };

        try {
          await supabaseFetch("/rest/v1/profiles",{
            method:"POST",
            headers:{
              Prefer:"return=minimal",
              Authorization:`Bearer ${data.access_token}`
            },
            body:JSON.stringify({
              id:data.user.id,
              full_name:fullName,
              username,
              email,
              role:"user"
            })
          });
        } catch {}

        saveSession(session);
        onSuccess(session);
      } else {
        setSuccess(
          "Account created. Please check your email to verify your account."
        );
      }
    } catch(err) {
      setError(err.message || "Account creation failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Create your account"
      subtitle="Join ToolMaster Pro."
      onClose={onClose}
    >
      <form className="authForm" onSubmit={submit}>
        <label>
          Full Name
          <div className="inputIcon">
            <User size={17}/>
            <input
              value={fullName}
              onChange={e=>setFullName(e.target.value)}
              placeholder="Your full name"
              required
            />
          </div>
        </label>

        <label>
          Username
          <div className="inputIcon">
            <UserPlus size={17}/>
            <input
              value={username}
              onChange={e=>setUsername(
                e.target.value.replace(/\s/g,"").toLowerCase()
              )}
              placeholder="yourusername"
              required
            />
          </div>
        </label>

        <label>
          Email
          <div className="inputIcon">
            <Mail size={17}/>
            <input
              type="email"
              value={email}
              onChange={e=>setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>
        </label>

        <label>
          Password
          <div className="inputIcon">
            <KeyRound size={17}/>
            <input
              type={show?"text":"password"}
              value={password}
              onChange={e=>setPassword(e.target.value)}
              placeholder="Minimum 6 characters"
              required
            />

            <button
              type="button"
              className="iconButton"
              onClick={()=>setShow(!show)}
            >
              {show?<EyeOff size={17}/>:<Eye size={17}/>}
            </button>
          </div>
        </label>

        <label>
          Confirm Password
          <div className="inputIcon">
            <KeyRound size={17}/>
            <input
              type={show?"text":"password"}
              value={confirm}
              onChange={e=>setConfirm(e.target.value)}
              required
            />
          </div>
        </label>

        {error && <div className="errorBox">{error}</div>}
        {success && <div className="successBox">{success}</div>}

        <button className="primary authSubmit" disabled={loading}>
          {loading?"Creating account...":"Create Account"}
        </button>

        <p className="authBottom">
          Already have an account?
          <button type="button" onClick={onLogin}>
            Sign In
          </button>
        </p>
      </form>
    </AuthShell>
  );
}

function ForgotPassword({onClose,onLogin}) {
  const [email,setEmail]=useState("");
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState("");
  const [success,setSuccess]=useState("");

  const submit=async e=>{
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await supabaseFetch(
        "/auth/v1/recover",
        {
          method:"POST",
          body:JSON.stringify({email})
        }
      );

      setSuccess("If this email exists, a reset link has been sent.");
    } catch(err) {
      setError(err.message || "Unable to send reset email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Reset your password"
      subtitle="Enter your email to receive a reset link."
      onClose={onClose}
    >
      <form className="authForm" onSubmit={submit}>
        <label>
          Email
          <div className="inputIcon">
            <Mail size={17}/>
            <input
              type="email"
              value={email}
              onChange={e=>setEmail(e.target.value)}
              required
            />
          </div>
        </label>

        {error && <div className="errorBox">{error}</div>}
        {success && <div className="successBox">{success}</div>}

        <button className="primary authSubmit" disabled={loading}>
          {loading?"Sending...":"Send Reset Link"}
        </button>

        <p className="authBottom">
          Remember your password?
          <button type="button" onClick={onLogin}>
            Back to Sign In
          </button>
        </p>
      </form>
    </AuthShell>
  );
}

function AuthShell({title,subtitle,onClose,children}) {
  return (
    <main className="authPage">
      <button className="back authBack" onClick={onClose}>
        ← Back to website
      </button>

      <div className="authCard">
        <button className="closeAuth" onClick={onClose}>
          <X size={19}/>
        </button>

        <div className="authLogo">
          <div className="brandIcon">
            <Wrench size={24}/>
          </div>
        </div>

        <h1>{title}</h1>
        <p>{subtitle}</p>

        {children}
      </div>
    </main>
  );
}

function AdminPanel({session,onClose,onLogout}) {
  const [tab,setTab]=useState("dashboard");
  const [mobile,setMobile]=useState(false);
  const [users,setUsers]=useState([]);
  const [loadingUsers,setLoadingUsers]=useState(false);
  const [message,setMessage]=useState("");

  const adminToken=session?.access_token;

  const loadUsers=async()=>{
    if(!adminToken) return;

    setLoadingUsers(true);

    try {
      const data=await supabaseFetch(
        "/rest/v1/profiles?select=id,full_name,username,email,role,created_at&order=created_at.desc",
        {
          headers:{
            Authorization:`Bearer ${adminToken}`
          }
        }
      );

      setUsers(data || []);
    } catch(err) {
      setMessage(err.message || "Unable to load users.");
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(()=>{
    if(tab==="users") loadUsers();
  },[tab]);

  const nav=[
    ["dashboard","Dashboard",LayoutDashboard],
    ["users","Users",Users],
    ["tools","Tools",Wrench],
    ["categories","Categories",FolderKanban],
    ["analytics","Analytics",BarChart3],
    ["plans","Plans",CreditCard],
    ["settings","Settings",Settings],
    ["activity","Activity",Activity]
  ];

  return (
    <div className="adminShell">
      <aside className={mobile?"adminSidebar open":"adminSidebar"}>
        <div className="adminBrand">
          <div className="brandIcon">
            <Wrench size={21}/>
          </div>
          <div>
            <strong>ToolMaster</strong>
            <span>Admin Pro</span>
          </div>
        </div>

        <div className="adminNav">
          <small>MAIN MENU</small>

          {nav.map(([id,label,Icon])=>(
            <button
              key={id}
              className={tab===id?"adminNavItem active":"adminNavItem"}
              onClick={()=>{
                setTab(id);
                setMobile(false);
              }}
            >
              <Icon size={18}/>
              <span>{label}</span>
              <ChevronRight size={14}/>
            </button>
          ))}
        </div>

        <div className="adminSidebarBottom">
          <div className="adminMiniProfile">
            <div className="avatar">
              {(session?.profile?.full_name || "A")
                .charAt(0)
                .toUpperCase()}
            </div>

            <div>
              <strong>
                {session?.profile?.full_name || "Administrator"}
              </strong>
              <span>{session?.email}</span>
            </div>
          </div>

          <button className="logoutAdmin" onClick={onLogout}>
            <LogOut size={17}/>
            Logout
          </button>
        </div>
      </aside>

      <div className="adminMain">
        <header className="adminHeader">
          <button
            className="mobileAdminMenu"
            onClick={()=>setMobile(!mobile)}
          >
            <Menu/>
          </button>

          <div>
            <span className="adminEyebrow">CONTROL CENTER</span>
            <h1>
              {nav.find(x=>x[0]===tab)?.[1] || "Dashboard"}
            </h1>
          </div>

          <div className="adminHeaderActions">
            <button className="secondary" onClick={onClose}>
              <Home size={16}/>
              Website
            </button>

            <div className="adminHeaderUser">
              <div className="avatar">
                {(session?.profile?.full_name || "A")
                  .charAt(0)
                  .toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {message &&
          <div className="notice adminNotice">
            {message}
            <button onClick={()=>setMessage("")}>
              <X size={15}/>
            </button>
          </div>
        }

        {tab==="dashboard" && <AdminDashboard users={users}/>}
        {tab==="users" &&
          <AdminUsers
            users={users}
            loading={loadingUsers}
            reload={loadUsers}
          />
        }
        {tab==="tools" && <AdminTools/>}
        {tab==="categories" && <AdminCategories/>}
        {tab==="analytics" && <AdminAnalytics/>}
        {tab==="plans" && <AdminPlans/>}
        {tab==="settings" && <AdminSettings/>}
        {tab==="activity" && <AdminActivity/>}
      </div>
    </div>
  );
}

function AdminDashboard({users}) {
  const stats=[
    ["Total Tools",tools.length,"+12%",Wrench],
    ["Registered Users",users.length || "—","+8.4%",Users],
    ["Categories",categories.length-1,"+2",FolderKanban],
    ["System Status","Online","Healthy",CheckCircle2]
  ];

  return (
    <div className="adminContent">
      <div className="welcomeAdmin">
        <div>
          <span>GOOD DAY 👋</span>
          <h2>Welcome to your control center</h2>
          <p>Manage your ToolMaster Pro platform.</p>
        </div>

        <div className="systemBadge">
          <span></span>
          All systems operational
        </div>
      </div>

      <div className="dashboardStats">
        {stats.map(([title,value,change,Icon])=>(
          <div className="dashboardStat" key={title}>
            <div className="statIcon">
              <Icon size={21}/>
            </div>

            <div className="statInfo">
              <span>{title}</span>
              <strong>{value}</strong>
              <small>{change}</small>
            </div>
          </div>
        ))}
      </div>

      <div className="adminTwoCol">
        <div className="adminPanelCard">
          <div className="panelTitle">
            <div>
              <h3>Platform Overview</h3>
              <p>Your platform at a glance.</p>
            </div>
            <BarChart3 size={21}/>
          </div>

          <div className="overviewRows">
            {categories.slice(1,5).map(([name,count])=>(
              <div key={name}>
                <span>{name}</span>
                <b>{count}</b>
              </div>
            ))}
          </div>
        </div>

        <div className="adminPanelCard">
          <div className="panelTitle">
            <div>
              <h3>Quick Actions</h3>
              <p>Common administration tasks.</p>
            </div>
            <Zap size={21}/>
          </div>

          <div className="quickActions">
            <button>
              <Users size={18}/>
              Manage Users
            </button>
            <button>
              <Wrench size={18}/>
              Manage Tools
            </button>
            <button>
              <Settings size={18}/>
              Platform Settings
            </button>
            <button>
              <Activity size={18}/>
              View Activity
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminUsers({users,loading,reload}) {
  return (
    <div className="adminContent">
      <div className="pageToolbar">
        <div>
          <h2>User Management</h2>
          <p>Manage registered users.</p>
        </div>

        <button className="primary" onClick={reload}>
          <RefreshCw size={16}/>
          Refresh
        </button>
      </div>

      <div className="adminTableCard">
        {loading ? (
          <div className="loadingAdmin">Loading users...</div>
        ) : users.length ? (
          <div className="tableWrap">
            <table>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Created</th>
                </tr>
              </thead>

              <tbody>
                {users.map(user=>(
                  <tr key={user.id}>
                    <td>
                      <div className="tableUser">
                        <div className="avatar">
                          {(user.full_name || "U")
                            .charAt(0)
                            .toUpperCase()}
                        </div>
                        <div>
                          <strong>{user.full_name || "No name"}</strong>
                          <span>{user.id.slice(0,8)}...</span>
                        </div>
                      </div>
                    </td>

                    <td>@{user.username || "—"}</td>
                    <td>{user.email || "—"}</td>

                    <td>
                      <span className={
                        user.role==="admin"
                          ?"roleBadge admin"
                          :"roleBadge"
                      }>
                        {user.role || "user"}
                      </span>
                    </td>

                    <td>
                      {user.created_at
                        ?new Date(user.created_at).toLocaleDateString()
                        :"—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="emptyAdmin">
            <Users size={35}/>
            <h3>No users loaded</h3>
            <p>Check Supabase profiles and RLS policies.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function AdminTools() {
  const [search,setSearch]=useState("");

  const filtered=tools.filter(t=>
    t[0].toLowerCase().includes(search.toLowerCase()) ||
    t[1].toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="adminContent">
      <div className="pageToolbar">
        <div>
          <h2>Tool Management</h2>
          <p>{tools.length} tools available.</p>
        </div>
      </div>

      <div className="adminSearch">
        <Search size={18}/>
        <input
          value={search}
          onChange={e=>setSearch(e.target.value)}
          placeholder="Search tools..."
        />
      </div>

      <div className="toolAdminGrid">
        {filtered.map(t=>(
          <div className="toolAdminCard" key={t[3]}>
            <div className="toolAdminIcon">
              <Wrench size={18}/>
            </div>

            <div className="toolAdminInfo">
              <strong>{t[0]}</strong>
              <span>{t[1]}</span>
            </div>

            <div className="toolAdminActions">
              <button>
                <Edit3 size={15}/>
              </button>
              <button>
                <CheckCircle2 size={15}/>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminCategories() {
  return (
    <div className="adminContent">
      <div className="pageToolbar">
        <div>
          <h2>Categories</h2>
          <p>Organize your tools.</p>
        </div>
      </div>

      <div className="categoryAdminGrid">
        {categories.slice(1).map(([name,count,Icon])=>(
          <div className="categoryAdminCard" key={name}>
            <div className="categoryAdminIcon">
              <Icon size={21}/>
            </div>

            <div>
              <strong>{name}</strong>
              <span>{count} tools</span>
            </div>

            <button>
              <Edit3 size={16}/>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminAnalytics() {
  return (
    <div className="adminContent">
      <div className="pageToolbar">
        <div>
          <h2>Analytics</h2>
          <p>Usage analytics will connect to Supabase next.</p>
        </div>
      </div>

      <div className="analyticsCards">
        <div>
          <span>Page Views</span>
          <strong>—</strong>
          <small>Tracking required</small>
        </div>

        <div>
          <span>Tool Runs</span>
          <strong>—</strong>
          <small>Usage tracking required</small>
        </div>

        <div>
          <span>New Users</span>
          <strong>—</strong>
          <small>Supabase data source</small>
        </div>

        <div>
          <span>Conversion</span>
          <strong>—</strong>
          <small>Analytics integration</small>
        </div>
      </div>

      <div className="chartPlaceholder">
        <BarChart3 size={38}/>
        <h3>Analytics chart</h3>
        <p>Live charts will be connected in the analytics phase.</p>
      </div>
    </div>
  );
}

function AdminPlans() {
  return (
    <div className="adminContent">
      <div className="pageToolbar">
        <div>
          <h2>Credit Plans</h2>
          <p>Manage subscription plans.</p>
        </div>
      </div>

      <div className="planAdminGrid">
        {plans.map(plan=>(
          <div
            className={plan.popular
              ?"adminPlanCard popular"
              :"adminPlanCard"}
            key={plan.id}
          >
            {plan.popular && <em>POPULAR</em>}

            <h3>{plan.name}</h3>

            <strong>
              {plan.price===0?"Free":`$${plan.price}`}
            </strong>

            <span>
              {plan.credits.toLocaleString()} credits / {plan.period}
            </span>

            <p>{plan.description}</p>

            <button className="secondary">
              <Edit3 size={15}/>
              Edit Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminSettings() {
  const [siteName,setSiteName]=useState("ToolMaster Pro");
  const [maintenance,setMaintenance]=useState(false);
  const [message,setMessage]=useState("");

  return (
    <div className="adminContent">
      <div className="pageToolbar">
        <div>
          <h2>Platform Settings</h2>
          <p>Configure your website.</p>
        </div>

        <button
          className="primary"
          onClick={()=>{
            setMessage("Settings saved locally.");
            setTimeout(()=>setMessage(""),2500);
          }}
        >
          Save Settings
        </button>
      </div>

      {message && <div className="successBox">{message}</div>}

      <div className="settingsGrid">
        <div className="settingsCard">
          <div className="panelTitle">
            <div>
              <h3>General</h3>
              <p>Basic website information.</p>
            </div>
            <Settings size={21}/>
          </div>

          <label>
            Website Name
            <input
              value={siteName}
              onChange={e=>setSiteName(e.target.value)}
            />
          </label>

          <label>
            Website Description
            <textarea defaultValue="Powerful online tools, made simple."/>
          </label>
        </div>

        <div className="settingsCard">
          <div className="panelTitle">
            <div>
              <h3>Security</h3>
              <p>Platform access controls.</p>
            </div>
            <ShieldCheck size={21}/>
          </div>

          <div className="settingToggle">
            <div>
              <strong>Maintenance Mode</strong>
              <span>Temporarily disable public access.</span>
            </div>

            <button
              className={maintenance?"toggle on":"toggle"}
              onClick={()=>setMaintenance(!maintenance)}
            >
              <span></span>
            </button>
          </div>

          <div className="settingToggle">
            <div>
              <strong>Public Tools</strong>
              <span>Allow tools without login.</span>
            </div>

            <button className="toggle on">
              <span></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminActivity() {
  return (
    <div className="adminContent">
      <div className="pageToolbar">
        <div>
          <h2>Activity Log</h2>
          <p>Important platform events.</p>
        </div>
      </div>

      <div className="activityCard">
        <div className="activityItem">
          <div className="activityIcon">
            <ShieldCheck size={17}/>
          </div>

          <div>
            <strong>Admin dashboard initialized</strong>
            <span>System is ready.</span>
          </div>

          <time>Now</time>
        </div>

        <div className="activityItem">
          <div className="activityIcon">
            <Wrench size={17}/>
          </div>

          <div>
            <strong>{tools.length} tools loaded</strong>
            <span>Current tools catalog is available.</span>
          </div>

          <time>Today</time>
        </div>

        <div className="activityItem">
          <div className="activityIcon">
            <Database size={17}/>
          </div>

          <div>
            <strong>Supabase integration</strong>
            <span>Authentication and database configured.</span>
          </div>

          <time>Today</time>
        </div>
      </div>
    </div>
  );
}

function ToolCard({t,open}) {
  const icons={
    "PDF Tools":FileText,
    "Image Tools":ImageIcon,
    "SEO & Marketing":Globe2,
    "Text Tools":FileText,
    "Developer Tools":Code2,
    "Calculator Tools":Calculator,
    "Converter Tools":Wrench,
    "Security Tools":ShieldCheck,
    "Utility Tools":Sparkles
  };

  const Icon=icons[t[1]] || Wrench;

  return (
    <article className="card" onClick={open}>
      <div className="toolIcon">
        <Icon size={21}/>
      </div>

      <div className="cardBody">
        <span>{t[1]}</span>
        <h3>{t[0]}</h3>
        <p>{t[2]}</p>
      </div>

      <ArrowRight className="arrow"/>
    </article>
  );
}

function ToolPage({t,back}) {
  if(t[3]==="text-to-video")
    return <TextToVideo back={back}/>;

  if(t[3]==="student-ai-helper")
    return <StudentAIHelper back={back}/>;

  if(t[1]==="PDF Tools" || t[1]==="Image Tools")
    return <FileToolWorkspace t={t} back={back}/>;

  return <GenericTool t={t} back={back}/>;
}

function TextToVideo({back}) {
  const [prompt,setPrompt]=useState("");
  const [style,setStyle]=useState("Cinematic");
  const [duration,setDuration]=useState("10 seconds");
  const [status,setStatus]=useState("");

  const generate=()=>{
    if(!prompt.trim()) {
      setStatus("Please enter a video prompt first.");
      return;
    }

    setStatus(
      "Prompt prepared successfully. A server-side AI video API is required to render the MP4."
    );
  };

  return (
    <main className="toolPage">
      <button className="back" onClick={back}>
        ← Back to tools
      </button>

      <div className="toolHero">
        <div className="toolIcon big">
          <Sparkles/>
        </div>

        <div>
          <span>AI & Video</span>
          <h1>Text to Video</h1>
          <p>Create AI video projects.</p>
        </div>
      </div>

      <div className="aiHelper">
        <div className="aiCard">
          <h3>🎬 Video Prompt</h3>

          <textarea
            value={prompt}
            onChange={e=>setPrompt(e.target.value)}
            placeholder="Describe your video..."
          />

          <div className="videoOptions">
            <label>
              Style
              <select
                value={style}
                onChange={e=>setStyle(e.target.value)}
              >
                <option>Cinematic</option>
                <option>Realistic</option>
                <option>Anime</option>
                <option>3D Animation</option>
                <option>Documentary</option>
              </select>
            </label>

            <label>
              Duration
              <select
                value={duration}
                onChange={e=>setDuration(e.target.value)}
              >
                <option>5 seconds</option>
                <option>10 seconds</option>
                <option>15 seconds</option>
                <option>30 seconds</option>
              </select>
            </label>
          </div>

          <button className="primary aiSolve" onClick={generate}>
            <Sparkles size={17}/>
            Prepare Video
          </button>

          {status && <div className="statusBox">{status}</div>}
        </div>

        <div className="aiCard resultCard">
          <h3>🎥 Video Preview</h3>

          <div className="videoPlaceholder">
            <div className="playCircle">▶</div>
            <b>Video preview</b>
            <small>{style} · {duration}</small>
          </div>
        </div>
      </div>
    </main>
  );
}

function StudentAIHelper({back}) {
  const [question,setQuestion]=useState("");
  const [file,setFile]=useState(null);
  const [answer,setAnswer]=useState("");
  const [loading,setLoading]=useState(false);

  const solve=()=>{
    if(!question.trim() && !file) {
      setAnswer("Please enter a question or upload a study file.");
      return;
    }

    setLoading(true);

    setTimeout(()=>{
      setAnswer(
        "Your request has been prepared. Connect your secure AI backend to generate the real step-by-step AI answer."
      );
      setLoading(false);
    },500);
  };

  return (
    <main className="toolPage">
      <button className="back" onClick={back}>
        ← Back to tools
      </button>

      <div className="toolHero">
        <div className="toolIcon big">
          <Sparkles/>
        </div>

        <div>
          <span>AI & Education</span>
          <h1>Student AI Helper</h1>
          <p>Ask questions or upload study material.</p>
        </div>
      </div>

      <div className="aiHelper">
        <div className="aiCard">
          <h3>📚 Ask your question</h3>

          <textarea
            value={question}
            onChange={e=>setQuestion(e.target.value)}
            placeholder="Ask your study question..."
          />

          <FileUpload
            file={file}
            setFile={setFile}
            accept=".pdf,image/*,.txt,.doc,.docx"
            label="Upload study material"
          />

          <button
            className="primary aiSolve"
            onClick={solve}
            disabled={loading}
          >
            <Sparkles size={17}/>
            {loading?"Preparing...":"Get AI Help"}
          </button>
        </div>

        <div className="aiCard resultCard">
          <h3>🤖 AI Answer</h3>

          <div className="answer">
            {answer || "Your AI answer will appear here."}
          </div>

          {answer && (
            <>
              <button
                className="secondary"
                onClick={()=>navigator.clipboard?.writeText(answer)}
              >
                <Copy size={17}/>
                Copy
              </button>

              <button
                className="secondary"
                onClick={()=>textDownload(answer,"student-ai-answer.txt")}
              >
                <Download size={17}/>
                Download
              </button>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

function FileUpload({file,setFile,accept,label="Upload File"}) {
  return (
    <label className="uploadBox">
      <Upload/>

      <div>
        <b>{label}</b>
        <small>Click or drag a file here</small>
        {file && <strong>{file.name}</strong>}
      </div>

      <input
        type="file"
        accept={accept}
        onChange={e=>setFile(e.target.files?.[0] || null)}
      />
    </label>
  );
}

function FileToolWorkspace({t,back}) {
  const [file,setFile]=useState(null);
  const [status,setStatus]=useState("");

  const process=()=>{
    if(!file) {
      setStatus("Please upload a file first.");
      return;
    }

    setStatus(
      `${t[0]} selected: ${file.name}. Real PDF/image conversion will be connected in the next processing backend phase.`
    );
  };

  return (
    <main className="toolPage">
      <button className="back" onClick={back}>
        ← Back to tools
      </button>

      <div className="toolHero">
        <div className="toolIcon big">
          <Upload/>
        </div>

        <div>
          <span>{t[1]}</span>
          <h1>{t[0]}</h1>
          <p>{t[2]}</p>
        </div>
      </div>

      <div className="fileWorkspace">
        <FileUpload
          file={file}
          setFile={setFile}
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp"
        />

        <div className="fileActions">
          <button className="primary" onClick={process}>
            <Zap size={17}/>
            Process File
          </button>

          <button
            className="secondary"
            onClick={()=>{
              setFile(null);
              setStatus("");
            }}
          >
            <RefreshCw size={17}/>
            Reset
          </button>
        </div>

        {status && <div className="statusBox">{status}</div>}
      </div>
    </main>
  );
}

function GenericTool({t,back}) {
  const [input,setInput]=useState("");
  const [out,setOut]=useState("");
  const [extra,setExtra]=useState({});

  const id=t[3];

  const run=()=>{
    let result="";

    try {
      switch(id) {

        case "word-counter": {
          const words=input.trim()?input.trim().split(/\s+/):[];
          const sentences=input
            .split(/[.!?]+/)
            .filter(x=>x.trim()).length;

          result=
            `Words: ${words.length}\n`+
            `Characters: ${input.length}\n`+
            `Characters without spaces: ${input.replace(/\s/g,"").length}\n`+
            `Sentences: ${sentences}`;
          break;
        }

        case "characters":
          result=
            `Characters: ${input.length}\n`+
            `Without spaces: ${input.replace(/\s/g,"").length}`;
          break;

        case "case-converter":
          result=input.toLowerCase();
          break;

        case "text-cleaner":
          result=input
            .replace(/[ \t]+/g," ")
            .replace(/\n{3,}/g,"\n\n")
            .trim();
          break;

        case "text-reverser":
          result=[...input].reverse().join("");
          break;

        case "duplicate-lines":
          result=[...new Set(input.split(/\r?\n/))].join("\n");
          break;

        case "text-sorter":
          result=input
            .split(/\r?\n/)
            .sort((a,b)=>a.localeCompare(b))
            .join("\n");
          break;

        case "slug":
          result=input
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g,"-")
            .replace(/^-|-$/g,"");
          break;

        case "url-encoder":
          result=encodeURIComponent(input);
          break;

        case "base64-encode":
          result=btoa(unescape(encodeURIComponent(input)));
          break;

        case "base64-decode":
          result=decodeURIComponent(escape(atob(input.trim())));
          break;

        case "json-formatter":
          result=JSON.stringify(JSON.parse(input),null,2);
          break;

        case "json-minifier":
          result=JSON.stringify(JSON.parse(input));
          break;

        case "uuid":
          result=crypto.randomUUID();
          break;

        case "password":
        case "random-password":
          result=generatePassword(20);
          break;

        case "password-strength":
          result=passwordStrength(input);
          break;

        case "binary":
          result=[...input]
            .map(c=>c.charCodeAt(0).toString(2).padStart(8,"0"))
            .join(" ");
          break;

        case "ascii":
          result=[...input]
            .map(c=>c.charCodeAt(0))
            .join(" ");
          break;

        case "palindrome": {
          const s=input.toLowerCase().replace(/[^a-z0-9]/g,"");
          result=s===s.split("").reverse().join("")
            ?"Palindrome"
            :"Not a palindrome";
          break;
        }

        case "reading-time": {
          const words=input.trim()
            ?input.trim().split(/\s+/).length
            :0;

          result=
            `Words: ${words}\n`+
            `Estimated reading time: ${Math.max(1,Math.ceil(words/200))} minute(s)`;
          break;
        }

        case "email-validator":
          result=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.trim())
            ?"Valid email format"
            :"Invalid email format";
          break;

        case "random-number":
          result=String(Math.floor(Math.random()*1000000));
          break;

        case "morse":
          result=textToMorse(input);
          break;

        case "html-entities":
          result=escapeHTML(input);
          break;

        case "url-parser": {
          const u=new URL(input);
          result=
            `Protocol: ${u.protocol}\n`+
            `Hostname: ${u.hostname}\n`+
            `Port: ${u.port || "(default)"}\n`+
            `Path: ${u.pathname}\n`+
            `Query: ${u.search}\n`+
            `Hash: ${u.hash}`;
          break;
        }

        case "regex": {
          const match=input.match(/^\/(.+)\/([gimsuy]*)$/);
          if(!match) {
            result="Use format /pattern/flags";
          } else {
            const re=new RegExp(match[1],match[2]);
            const matches=input.match(re);
            result=matches
              ?`Match found:\n${matches.join("\n")}`
              :"No match found.";
          }
          break;
        }

        case "percentage": {
          const value=Number(input);
          const percent=Number(extra.percent || 10);
          result=`${percent}% of ${value} = ${value*percent/100}`;
          break;
        }

        case "discount": {
          const price=Number(input);
          const discount=Number(extra.discount || 10);
          const saved=price*discount/100;
          result=
            `Original: ${price}\n`+
            `Discount: ${saved}\n`+
            `Final price: ${price-saved}`;
          break;
        }

        case "gst": {
          const amount=Number(input);
          const gst=Number(extra.gst || 18);
          const tax=amount*gst/100;
          result=
            `Amount: ${amount}\n`+
            `GST (${gst}%): ${tax}\n`+
            `Total: ${amount+tax}`;
          break;
        }

        case "tip": {
          const bill=Number(input);
          const tip=Number(extra.tip || 10);
          const people=Number(extra.people || 1);
          const tipAmount=bill*tip/100;
          const total=bill+tipAmount;

          result=
            `Bill: ${bill}\n`+
            `Tip: ${tipAmount}\n`+
            `Total: ${total}\n`+
            `Per person: ${total/people}`;
          break;
        }

        case "bmi": {
          const weight=Number(input);
          const height=Number(extra.height || 170)/100;
          const bmi=weight/(height*height);

          result=
            `BMI: ${bmi.toFixed(2)}\n`+
            `Category: ${bmiCategory(bmi)}`;
          break;
        }

        case "compound-interest": {
          const principal=Number(input);
          const rate=Number(extra.rate || 5);
          const years=Number(extra.years || 1);
          const n=Number(extra.compounds || 12);

          const amount=
            principal*Math.pow(
              1+(rate/100)/n,
              n*years
            );

          result=
            `Principal: ${principal}\n`+
            `Rate: ${rate}%\n`+
            `Years: ${years}\n`+
            `Final amount: ${amount.toFixed(2)}\n`+
            `Interest: ${(amount-principal).toFixed(2)}`;
          break;
        }

        case "temperature": {
          const c=Number(input);
          result=
            `Celsius: ${c}\n`+
            `Fahrenheit: ${(c*9/5+32).toFixed(2)}\n`+
            `Kelvin: ${(c+273.15).toFixed(2)}`;
          break;
        }

        case "length": {
          const m=Number(input);
          result=
            `Meters: ${m}\n`+
            `Kilometers: ${m/1000}\n`+
            `Centimeters: ${m*100}\n`+
            `Feet: ${m*3.28084}\n`+
            `Inches: ${m*39.3701}`;
          break;
        }

        case "weight": {
          const kg=Number(input);
          result=
            `Kilograms: ${kg}\n`+
            `Grams: ${kg*1000}\n`+
            `Pounds: ${kg*2.20462}\n`+
            `Ounces: ${kg*35.274}`;
          break;
        }

        case "storage": {
          const mb=Number(input);
          result=
            `MB: ${mb}\n`+
            `KB: ${mb*1024}\n`+
            `GB: ${mb/1024}\n`+
            `Bytes: ${mb*1024*1024}`;
          break;
        }

        case "sha256":
          result="SHA-256 requires Web Crypto and is calculated below...";
          crypto.subtle.digest(
            "SHA-256",
            new TextEncoder().encode(input)
          ).then(buffer=>{
            const hash=[...new Uint8Array(buffer)]
              .map(b=>b.toString(16).padStart(2,"0"))
              .join("");
            setOut(hash);
          });
          setOut(result);
          return;

        case "roman":
          result=toRoman(Number(input));
          break;

        case "number-words":
          result=numberToWords(Number(input));
          break;

        case "username":
          result=generateUsernames(input);
          break;

        case "business-name":
          result=generateBusinessNames(input);
          break;

        case "lorem":
          result=generateLorem(Number(input)||3);
          break;

        case "meta-tags":
          result=
`<title>${input}</title>
<meta name="description" content="${input}">
<meta name="robots" content="index, follow">`;
          break;

        case "robots":
          result=
`User-agent: *
Allow: /

Sitemap: ${input || "https://example.com/sitemap.xml"}`;
          break;

        case "open-graph":
          result=
`<meta property="og:title" content="${input}">
<meta property="og:description" content="${input}">
<meta property="og:type" content="website">
<meta property="og:url" content="https://example.com">`;
          break;

        case "schema":
          result=JSON.stringify({
            "@context":"https://schema.org",
            "@type":"WebSite",
            "name":input || "Your Website",
            "url":"https://example.com"
          },null,2);
          break;

        case "utm": {
          const base=input || "https://example.com";
          const u=new URL(base);
          u.searchParams.set("utm_source",extra.source || "google");
          u.searchParams.set("utm_medium",extra.medium || "cpc");
          u.searchParams.set("utm_campaign",extra.campaign || "campaign");
          result=u.toString();
          break;
        }

        case "keyword-density": {
          const words=input
            .toLowerCase()
            .match(/[a-z0-9]+/g) || [];

          const counts={};

          words.forEach(w=>{
            counts[w]=(counts[w]||0)+1;
          });

          result=Object.entries(counts)
            .sort((a,b)=>b[1]-a[1])
            .slice(0,20)
            .map(([word,count])=>
              `${word}: ${count} (${((count/words.length)*100).toFixed(2)}%)`
            )
            .join("\n");
          break;
        }

        case "scientific":
          result=String(safeMath(input));
          break;

        default:
          result=
            "This tool is available in the catalog. Its specialized backend processing will be connected in the next phase.";
      }
    } catch(err) {
      result=`Error: ${err.message || "Invalid input"}`;
    }

    setOut(String(result));
  };

  const fields=getExtraFields(id);

  return (
    <main className="toolPage">
      <button className="back" onClick={back}>
        ← Back to tools
      </button>

      <div className="toolHero">
        <div className="toolIcon big">
          <Wrench/>
        </div>

        <div>
          <span>{t[1]}</span>
          <h1>{t[0]}</h1>
          <p>{t[2]}</p>
        </div>
      </div>

      {fields.length>0 &&
        <div className="videoOptions">
          {fields.map(field=>(
            <label key={field.key}>
              {field.label}
              <input
                type="number"
                value={extra[field.key] || field.default || ""}
                onChange={e=>setExtra({
                  ...extra,
                  [field.key]:e.target.value
                })}
                placeholder={field.placeholder || ""}
              />
            </label>
          ))}
        </div>
      }

      <div className="workspace">
        <div className="panel">
          <label>Your input</label>

          <textarea
            value={input}
            onChange={e=>setInput(e.target.value)}
            placeholder={
              id==="url-parser"
                ?"https://example.com/page?name=test"
                :"Paste or type your content here..."
            }
          />

          <div className="actions">
            <button className="primary" onClick={run}>
              <Zap size={17}/>
              Run Tool
            </button>

            <button
              className="secondary"
              onClick={()=>{
                setInput("");
                setOut("");
              }}
            >
              Clear
            </button>
          </div>
        </div>

        <div className="panel">
          <label>Result</label>

          <textarea
            value={out}
            readOnly
            placeholder="Your result will appear here..."
          />

          <div className="actions">
            <button
              className="secondary"
              onClick={()=>navigator.clipboard?.writeText(out)}
            >
              <Copy size={17}/>
              Copy Result
            </button>

            <button
              className="secondary"
              onClick={()=>textDownload(out)}
            >
              <Download size={17}/>
              Download
            </button>
          </div>
        </div>
      </div>

      <div className="notice">
        <ShieldCheck/>
        Browser-safe processing runs locally whenever possible.
      </div>
    </main>
  );
}

function getExtraFields(id) {
  const map={
    percentage:[
      {key:"percent",label:"Percentage",default:10}
    ],
    discount:[
      {key:"discount",label:"Discount %",default:10}
    ],
    gst:[
      {key:"gst",label:"GST %",default:18}
    ],
    tip:[
      {key:"tip",label:"Tip %",default:10},
      {key:"people",label:"People",default:1}
    ],
    bmi:[
      {key:"height",label:"Height (cm)",default:170}
    ],
    "compound-interest":[
      {key:"rate",label:"Annual Rate %",default:5},
      {key:"years",label:"Years",default:1},
      {key:"compounds",label:"Compounds / Year",default:12}
    ]
  };

  return map[id] || [];
}

function generatePassword(length=20) {
  const chars=
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=";

  const values=new Uint32Array(length);
  crypto.getRandomValues(values);

  return [...values]
    .map(v=>chars[v%chars.length])
    .join("");
}

function passwordStrength(password) {
  let score=0;

  if(password.length>=8) score++;
  if(password.length>=12) score++;
  if(/[a-z]/.test(password)) score++;
  if(/[A-Z]/.test(password)) score++;
  if(/[0-9]/.test(password)) score++;
  if(/[^A-Za-z0-9]/.test(password)) score++;

  if(score<=2) return "Weak";
  if(score<=4) return "Medium";
  return "Strong";
}

function textToMorse(text) {
  const map={
    A:".-",B:"-...",C:"-.-.",D:"-..",E:".",F:"..-.",
    G:"--.",H:"....",I:"..",J:".---",K:"-.-",L:".-..",
    M:"--",N:"-.",O:"---",P:".--.",Q:"--.-",R:".-.",
    S:"...",T:"-",U:"..-",V:"...-",W:".--",X:"-..-",
    Y:"-.--",Z:"--..",
    0:"-----",1:".----",2:"..---",3:"...--",4:"....-",
    5:".....",6:"-....",7:"--...",8:"---..",9:"----."
  };

  return text
    .toUpperCase()
    .split("")
    .map(c=>c===" " ? "/" : map[c] || c)
    .join(" ");
}

function escapeHTML(text) {
  return text
    .replace(/&/g,"&amp;")
    .replace(/</g,"&lt;")
    .replace(/>/g,"&gt;")
    .replace(/"/g,"&quot;")
    .replace(/'/g,"&#039;");
}

function bmiCategory(bmi) {
  if(bmi<18.5) return "Underweight";
  if(bmi<25) return "Normal";
  if(bmi<30) return "Overweight";
  return "Obesity";
}

function toRoman(num) {
  if(!Number.isFinite(num) || num<=0)
    return "Enter a positive number.";

  const values=[
    [1000,"M"],[900,"CM"],[500,"D"],[400,"CD"],
    [100,"C"],[90,"XC"],[50,"L"],[40,"XL"],
    [10,"X"],[9,"IX"],[5,"V"],[4,"IV"],[1,"I"]
  ];

  let result="";

  for(const [value,symbol] of values) {
    while(num>=value) {
      result+=symbol;
      num-=value;
    }
  }

  return result;
}

function numberToWords(num) {
  if(!Number.isFinite(num))
    return "Invalid number.";

  if(num===0) return "zero";

  if(num<0)
    return "minus " + numberToWords(Math.abs(num));

  if(num>999999999)
    return "Number too large.";

  const ones=[
    "","one","two","three","four","five","six","seven",
    "eight","nine","ten","eleven","twelve","thirteen",
    "fourteen","fifteen","sixteen","seventeen","eighteen",
    "nineteen"
  ];

  const tens=[
    "","","twenty","thirty","forty","fifty",
    "sixty","seventy","eighty","ninety"
  ];

  function under1000(n) {
    let s="";

    if(n>=100) {
      s+=ones[Math.floor(n/100)]+" hundred";
      n%=100;
      if(n) s+=" ";
    }

    if(n>=20) {
      s+=tens[Math.floor(n/10)];
      n%=10;
      if(n) s+=" "+ones[n];
    } else if(n>0) {
      s+=ones[n];
    }

    return s;
  }

  let result="";

  if(num>=1000000) {
    result+=under1000(Math.floor(num/1000000))+" million";
    num%=1000000;
    if(num) result+=" ";
  }

  if(num>=1000) {
    result+=under1000(Math.floor(num/1000))+" thousand";
    num%=1000;
    if(num) result+=" ";
  }

  if(num) result+=under1000(num);

  return result;
}

function generateUsernames(text) {
  const base=(text || "user")
    .toLowerCase()
    .replace(/[^a-z0-9]/g,"");

  return [
    `${base}01`,
    `the${base}`,
    `${base}_official`,
    `${base}pro`,
    `${base}hub`,
    `${base}2026`,
    `real${base}`,
    `${base}online`
  ].join("\n");
}

function generateBusinessNames(text) {
  const base=(text || "Tech").trim();

  return [
    `${base}Pro`,
    `${base}Hub`,
    `${base}Labs`,
    `${base}Works`,
    `${base}Digital`,
    `${base}Solutions`,
    `${base}Studio`,
    `${base}Cloud`
  ].join("\n");
}

function generateLorem(paragraphs=3) {
  const text=
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " +
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. ";

  return Array.from(
    {length:Math.min(Math.max(paragraphs,1),20)},
    ()=>text.repeat(3).trim()
  ).join("\n\n");
}

function safeMath(expression) {
  if(!/^[0-9+\-*/().,%\s]+$/.test(expression))
    throw new Error("Only basic mathematical expressions are allowed.");

  const cleaned=expression.replace(/%/g,"/100");

  return Function(`"use strict"; return (${cleaned})`)();
}

createRoot(
  document.getElementById("root")
).render(<App/>);
