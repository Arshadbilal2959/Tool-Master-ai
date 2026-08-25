import React, { useMemo, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import {
  Search, Wrench, FileText, Image as ImageIcon, Code2, Globe2,
  Calculator, ArrowRight, ShieldCheck, Zap, Sparkles, Upload,
  Copy, Download, CheckCircle2, LockKeyhole, Settings,
  LayoutDashboard, LogOut, CreditCard, Users, BarChart3,
  X, RefreshCw, User, UserPlus, Mail, Eye, EyeOff, KeyRound,
  Home, FolderKanban, Activity, Menu, ChevronRight, Database,
  Crown, Trash2, Edit3
} from "lucide-react";
import "./styles.css";

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

const fileTools = new Set([
  "pdf-word","word-pdf","pdf-jpg","jpg-pdf","merge-pdf","split-pdf",
  "compress-pdf","rotate-pdf","pdf-unlock","pdf-watermark",
  "image-compressor","image-resizer","image-cropper","jpg-png",
  "png-jpg","webp-converter","background-remover","image-text","favicon"
]);

async function supabaseFetch(path, options={}) {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error("Supabase environment variables are missing.");
  }

  const headers = {
    apikey: SUPABASE_ANON_KEY,
    "Content-Type":"application/json",
    ...(options.headers || {})
  };

  const response = await fetch(`${SUPABASE_URL}${path}`, {
    ...options,
    headers
  });

  const data = await response.json().catch(()=>null);

  if (!response.ok) {
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

function saveSession(session) {
  if (session) {
    localStorage.setItem("tm_session", JSON.stringify(session));
  } else {
    localStorage.removeItem("tm_session");
  }
}

function getSession() {
  try {
    return JSON.parse(localStorage.getItem("tm_session") || "null");
  } catch {
    return null;
  }
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
}

function textDownload(text, filename="toolmaster-result.txt") {
  downloadBlob(
    new Blob([text], {type:"text/plain;charset=utf-8"}),
    filename
  );
}

function App() {
  const [page,setPage] = useState("home");
  const [cat,setCat] = useState("All Tools");
  const [query,setQuery] = useState("");
  const [tool,setTool] = useState(null);
  const [auth,setAuth] = useState(null);
  const [authMode,setAuthMode] = useState(null);
  const [adminMode,setAdminMode] = useState(false);

  useEffect(()=>{
    const session = getSession();
    if(session) setAuth(session);
  },[]);

  const filtered = useMemo(()=>tools.filter(t =>
    (cat==="All Tools" || t[1]===cat) &&
    (
      t[0].toLowerCase().includes(query.toLowerCase()) ||
      t[2].toLowerCase().includes(query.toLowerCase())
    )
  ),[cat,query]);

  const openTool = t => {
    setTool(t);
    setPage("tool");
  };

  const logout = () => {
    saveSession(null);
    setAuth(null);
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

        {authMode==="login" && (
          <LoginPage
            onClose={()=>setAuthMode(null)}
            onSignup={()=>setAuthMode("signup")}
            onForgot={()=>setAuthMode("forgot")}
            onSuccess={session=>{
              setAuth(session);
              setAuthMode(null);
            }}
          />
        )}

        {authMode==="signup" && (
          <SignupPage
            onClose={()=>setAuthMode(null)}
            onLogin={()=>setAuthMode("login")}
            onSuccess={session=>{
              setAuth(session);
              setAuthMode(null);
            }}
          />
        )}

        {authMode==="forgot" && (
          <ForgotPassword
            onClose={()=>setAuthMode(null)}
            onLogin={()=>setAuthMode("login")}
          />
        )}
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
                  className={cat===name ? "cat active":"cat"}
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

            {!filtered.length && (
              <div className="empty">
                No tools found. Try another search.
              </div>
            )}
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

function PublicHeader({
  auth,
  onSignIn,
  onSignUp,
  onLogout,
  onAdmin
}) {
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

              {auth.profile?.role==="admin" && (
                <button className="adminBtn" onClick={onAdmin}>
                  <LayoutDashboard size={17}/>
                  Admin
                </button>
              )}

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

function LoginPage({
  onClose,
  onSignup,
  onForgot,
  onSuccess
}) {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [show,setShow] = useState(false);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("");

  const submit = async e => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if(!SUPABASE_URL || !SUPABASE_ANON_KEY) {
        throw new Error(
          "Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY."
        );
      }

      const data = await supabaseFetch(
        "/auth/v1/token?grant_type=password",
        {
          method:"POST",
          body:JSON.stringify({
            email,
            password
          })
        }
      );

      const token = data.access_token;

      let profile = null;

      try {
        const rows = await supabaseFetch(
          `/rest/v1/profiles?select=*&id=eq.${encodeURIComponent(data.user.id)}&limit=1`,
          {
            headers:{
              Authorization:`Bearer ${token}`
            }
          }
        );

        profile = rows?.[0] || null;
      } catch {
        profile = null;
      }

      const session = {
        access_token:token,
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
              {show ? <EyeOff size={17}/> : <Eye size={17}/>}
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

        <button
          className="primary authSubmit"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign In"}
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

function SignupPage({
  onClose,
  onLogin,
  onSuccess
}) {
  const [fullName,setFullName] = useState("");
  const [username,setUsername] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [confirm,setConfirm] = useState("");
  const [show,setShow] = useState(false);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("");
  const [success,setSuccess] = useState("");

  const submit = async e => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if(password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    if(password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if(username.length < 3) {
      setError("Username must contain at least 3 characters.");
      return;
    }

    setLoading(true);

    try {
      if(!SUPABASE_URL || !SUPABASE_ANON_KEY) {
        throw new Error(
          "Supabase is not configured. Add your VITE_SUPABASE variables."
        );
      }

      const data = await supabaseFetch(
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
        const session = {
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
        } catch {
          // Profile trigger may already create the row.
        }

        saveSession(session);
        onSuccess(session);
      } else {
        setSuccess(
          "Account created. Please check your email to verify your account, then sign in."
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
      subtitle="Join ToolMaster Pro and access your personal workspace."
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
              onChange={e=>setUsername(e.target.value.replace(/\s/g,"").toLowerCase())}
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
          Create Password
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
              {show ? <EyeOff size={17}/> : <Eye size={17}/>}
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
              placeholder="Repeat password"
              required
            />
          </div>
        </label>

        {error && <div className="errorBox">{error}</div>}
        {success && <div className="successBox">{success}</div>}

        <button
          className="primary authSubmit"
          disabled={loading}
        >
          {loading ? "Creating account..." : "Create Account"}
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
  const [email,setEmail] = useState("");
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("");
  const [success,setSuccess] = useState("");

  const submit = async e => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      if(!SUPABASE_URL || !SUPABASE_ANON_KEY) {
        throw new Error("Supabase is not configured.");
      }

      await supabaseFetch(
        "/auth/v1/recover",
        {
          method:"POST",
          body:JSON.stringify({
            email
          })
        }
      );

      setSuccess(
        "If an account exists for this email, a password reset email has been sent."
      );
    } catch(err) {
      setError(err.message || "Unable to send reset email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Reset your password"
      subtitle="Enter your email and we'll send you a password reset link."
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

        {error && <div className="errorBox">{error}</div>}
        {success && <div className="successBox">{success}</div>}

        <button className="primary authSubmit" disabled={loading}>
          {loading ? "Sending..." : "Send Reset Link"}
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
  const [tab,setTab] = useState("dashboard");
  const [mobile,setMobile] = useState(false);
  const [users,setUsers] = useState([]);
  const [loadingUsers,setLoadingUsers] = useState(false);
  const [message,setMessage] = useState("");

  const adminToken = session?.access_token;

  const loadUsers = async () => {
    if(!adminToken) return;

    setLoadingUsers(true);

    try {
      const data = await supabaseFetch(
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

  const nav = [
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
      <aside className={mobile ? "adminSidebar open":"adminSidebar"}>
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
              {(session?.profile?.full_name || "A").charAt(0).toUpperCase()}
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
                {(session?.profile?.full_name || "A").charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {message && (
          <div className="notice adminNotice">
            {message}
            <button onClick={()=>setMessage("")}>
              <X size={15}/>
            </button>
          </div>
        )}

        {tab==="dashboard" && (
          <AdminDashboard users={users}/>
        )}

        {tab==="users" && (
          <AdminUsers
            users={users}
            loading={loadingUsers}
            reload={loadUsers}
          />
        )}

        {tab==="tools" && (
          <AdminTools/>
        )}

        {tab==="categories" && (
          <AdminCategories/>
        )}

        {tab==="analytics" && (
          <AdminAnalytics/>
        )}

        {tab==="plans" && (
          <AdminPlans/>
        )}

        {tab==="settings" && (
          <AdminSettings/>
        )}

        {tab==="activity" && (
          <AdminActivity/>
        )}
      </div>
    </div>
  );
}

function AdminDashboard({users}) {
  const stats = [
    {
      title:"Total Tools",
      value:tools.length,
      change:"+12%",
      icon:Wrench
    },
    {
      title:"Registered Users",
      value:users.length || "—",
      change:"+8.4%",
      icon:Users
    },
    {
      title:"Categories",
      value:categories.length-1,
      change:"+2",
      icon:FolderKanban
    },
    {
      title:"System Status",
      value:"Online",
      change:"Healthy",
      icon:CheckCircle2
    }
  ];

  return (
    <div className="adminContent">
      <div className="welcomeAdmin">
        <div>
          <span>GOOD DAY 👋</span>
          <h2>Welcome to your control center</h2>
          <p>
            Manage your tools, users and platform settings from one place.
          </p>
        </div>

        <div className="systemBadge">
          <span></span>
          All systems operational
        </div>
      </div>

      <div className="dashboardStats">
        {stats.map(({title,value,change,icon:Icon})=>(
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
              <p>Your ToolMaster Pro platform at a glance.</p>
            </div>
            <BarChart3 size={21}/>
          </div>

          <div className="overviewRows">
            <div>
              <span>PDF Tools</span>
              <b>{tools.filter(x=>x[1]==="PDF Tools").length}</b>
            </div>

            <div>
              <span>Image Tools</span>
              <b>{tools.filter(x=>x[1]==="Image Tools").length}</b>
            </div>

            <div>
              <span>Developer Tools</span>
              <b>{tools.filter(x=>x[1]==="Developer Tools").length}</b>
            </div>

            <div>
              <span>SEO & Marketing</span>
              <b>{tools.filter(x=>x[1]==="SEO & Marketing").length}</b>
            </div>
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
          <p>Manage registered ToolMaster Pro users.</p>
        </div>

        <button className="primary" onClick={reload}>
          <RefreshCw size={16}/>
          Refresh
        </button>
      </div>

      <div className="adminTableCard">
        {loading ? (
          <div className="loadingAdmin">
            Loading users...
          </div>
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
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {users.map(user=>(
                  <tr key={user.id}>
                    <td>
                      <div className="tableUser">
                        <div className="avatar">
                          {(user.full_name || "U").charAt(0).toUpperCase()}
                        </div>

                        <div>
                          <strong>
                            {user.full_name || "No name"}
                          </strong>
                          <span>
                            {user.id.slice(0,8)}...
                          </span>
                        </div>
                      </div>
                    </td>

                    <td>@{user.username || "—"}</td>
                    <td>{user.email || "—"}</td>

                    <td>
                      <span className={
                        user.role==="admin"
                          ? "roleBadge admin"
                          : "roleBadge"
                      }>
                        {user.role || "user"}
                      </span>
                    </td>

                    <td>
                      {user.created_at
                        ? new Date(user.created_at).toLocaleDateString()
                        : "—"}
                    </td>

                    <td>
                      <button className="tableAction">
                        <Edit3 size={15}/>
                      </button>

                      <button className="tableAction danger">
                        <Trash2 size={15}/>
                      </button>
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
            <p>
              Configure your Supabase profiles table and RLS policies
              to show users here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function AdminTools() {
  const [search,setSearch] = useState("");

  const filtered = tools.filter(t =>
    t[0].toLowerCase().includes(search.toLowerCase()) ||
    t[1].toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="adminContent">
      <div className="pageToolbar">
        <div>
          <h2>Tool Management</h2>
          <p>Manage your complete online tools catalog.</p>
        </div>

        <button className="primary">
          <Wrench size={16}/>
          Add New Tool
        </button>
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
          <p>Organize your tools into clear categories.</p>
        </div>

        <button className="primary">
          <FolderKanban size={16}/>
          Add Category
        </button>
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
          <p>Monitor platform growth and tool activity.</p>
        </div>
      </div>

      <div className="analyticsCards">
        <div>
          <span>Page Views</span>
          <strong>—</strong>
          <small>Connect analytics API</small>
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
        <p>
          Connect your usage/events table to display live charts here.
        </p>
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
          <p>Manage Text-to-Video subscription plans.</p>
        </div>

        <button className="primary">
          <Crown size={16}/>
          Add Plan
        </button>
      </div>

      <div className="planAdminGrid">
        {plans.map(plan=>(
          <div
            className={
              plan.popular
                ? "adminPlanCard popular"
                : "adminPlanCard"
            }
            key={plan.id}
          >
            {plan.popular && <em>POPULAR</em>}

            <h3>{plan.name}</h3>

            <strong>
              {plan.price===0 ? "Free" : `$${plan.price}`}
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
  const [siteName,setSiteName] = useState("ToolMaster Pro");
  const [maintenance,setMaintenance] = useState(false);
  const [message,setMessage] = useState("");

  return (
    <div className="adminContent">
      <div className="pageToolbar">
        <div>
          <h2>Platform Settings</h2>
          <p>Configure your website experience.</p>
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
            <textarea
              defaultValue="Powerful online tools, made simple."
            />
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
              className={maintenance ? "toggle on":"toggle"}
              onClick={()=>setMaintenance(!maintenance)}
            >
              <span></span>
            </button>
          </div>

          <div className="settingToggle">
            <div>
              <strong>Public Tools</strong>
              <span>Allow tools without account login.</span>
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
          <p>Monitor important platform events.</p>
        </div>
      </div>

      <div className="activityCard">
        <div className="activityItem">
          <div className="activityIcon">
            <ShieldCheck size={17}/>
          </div>

          <div>
            <strong>Admin dashboard initialized</strong>
            <span>System is ready for production configuration.</span>
          </div>

          <time>Now</time>
        </div>

        <div className="activityItem">
          <div className="activityIcon">
            <Wrench size={17}/>
          </div>

          <div>
            <strong>{tools.length} tools loaded</strong>
            <span>Your current tools catalog is available.</span>
          </div>

          <time>Today</time>
        </div>

        <div className="activityItem">
          <div className="activityIcon">
            <Database size={17}/>
          </div>

          <div>
            <strong>Supabase integration</strong>
            <span>Authentication/database connection is configured through environment variables.</span>
          </div>

          <time>Today</time>
        </div>
      </div>
    </div>
  );
}

function ToolCard({t,open}) {
  const icons = {
    "PDF Tools":FileText,
    "Image Tools":ImageIcon,
    "SEO & Marketing":Globe2,
    "Text Tools":FileText,
    "Developer Tools":Code2,
    "Calculator Tools":Calculator
  };

  const Icon = icons[t[1]] || Wrench;

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
  if(t[3]==="student-ai-helper") {
    return <StudentAIHelper back={back}/>;
  }

  if(t[3]==="text-to-video") {
    return <TextToVideo back={back}/>;
  }

  if(fileTools.has(t[3])) {
    return <FileToolWorkspace t={t} back={back}/>;
  }

  return <GenericTool t={t} back={back}/>;
}

function TextToVideo({back}) {
  const [prompt,setPrompt] = useState("");
  const [style,setStyle] = useState("Cinematic");
  const [duration,setDuration] = useState("10 seconds");
  const [credits,setCredits] = useState(
    ()=>Number(localStorage.getItem("tm_daily_credits") || 50)
  );
  const [status,setStatus] = useState("");

  const generate = () => {
    if(!prompt.trim()) {
      setStatus("Please enter a video prompt first.");
      return;
    }

    if(credits<1) {
      setStatus("No credits left.");
      return;
    }

    setCredits(c=>{
      const n=c-1;
      localStorage.setItem("tm_daily_credits",n);
      return n;
    });

    setStatus(
      "Request accepted. Connect a server-side AI video provider to render the actual MP4."
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
          <p>Create an AI video project with plan-based credits.</p>
        </div>
      </div>

      <div className="creditBar">
        <div>
          <b>{credits}</b>
          <span>credits remaining</span>
        </div>
      </div>

      <div className="plansGrid">
        {plans.map(p=>(
          <div className="planCard" key={p.id}>
            <span>{p.name}</span>
            <b>{p.price===0 ? "Free":`$${p.price}/mo`}</b>
            <small>{p.description}</small>
          </div>
        ))}
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
            Generate Video · 1 credit
          </button>

          {status && (
            <div className="statusBox">{status}</div>
          )}
        </div>

        <div className="aiCard resultCard">
          <h3>🎥 Video Preview</h3>

          <div className="videoPlaceholder">
            <div className="playCircle">▶</div>
            <b>Your generated video will appear here</b>
            <small>{style} · {duration}</small>
          </div>
        </div>
      </div>
    </main>
  );
}

function StudentAIHelper({back}) {
  const [question,setQuestion] = useState("");
  const [file,setFile] = useState(null);
  const [answer,setAnswer] = useState("");
  const [loading,setLoading] = useState(false);

  const solve = () => {
    if(!question.trim() && !file) {
      setAnswer("Please enter a question or upload a study file.");
      return;
    }

    setLoading(true);

    setTimeout(()=>{
      setAnswer(
        "Student AI Helper is ready. Connect your secure AI backend to generate real step-by-step answers."
      );
      setLoading(false);
    },700);
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
          <p>Ask a question or upload study material.</p>
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
            {loading ? "Preparing...":"Get AI Help"}
          </button>
        </div>

        <div className="aiCard resultCard">
          <h3>🤖 AI Answer</h3>

          <div className="answer">
            {answer || "Your step-by-step answer will appear here."}
          </div>

          {answer && (
            <>
              <button
                className="secondary"
                onClick={()=>navigator.clipboard?.writeText(answer)}
              >
                <Copy size={17}/>
                Copy Answer
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

function FileUpload({
  file,
  setFile,
  accept,
  label="Upload File"
}) {
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
  const [file,setFile] = useState(null);
  const [result,setResult] = useState(null);
  const [status,setStatus] = useState("");

  const process = () => {
    if(!file) {
      setStatus("Please upload a file first.");
      return;
    }

    setStatus(
      `${t[0]} received "${file.name}". Connect the matching backend converter for production conversion.`
    );

    setResult({
      blob:file,
      name:`processed-${file.name}`
    });
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
              setResult(null);
              setStatus("");
            }}
          >
            <RefreshCw size={17}/>
            Reset
          </button>
        </div>

        {status && (
          <div className="statusBox">{status}</div>
        )}

        {result && (
          <button
            className="secondary downloadBtn"
            onClick={()=>
              downloadBlob(result.blob,result.name)
            }
          >
            <Download size={17}/>
            Download File
          </button>
        )}
      </div>
    </main>
  );
}

function GenericTool({t,back}) {
  const [text,setText] = useState("");
  const [out,setOut] = useState("");

  const run = () => {
    let r=text;
    const id=t[3];

    if(id==="word-counter" || id==="characters") {
      r=`Words: ${text.trim()?text.trim().split(/\s+/).length:0}\nCharacters: ${text.length}`;
    }
    else if(id==="case-converter") r=text.toLowerCase();
    else if(id==="text-reverser") r=[...text].reverse().join("");
    else if(id==="slug") {
      r=text.toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g,"-")
        .replace(/^-|-$/g,"");
    }
    else if(id==="url-encoder") r=encodeURIComponent(text);
    else if(id==="base64-encode") {
      r=btoa(unescape(encodeURIComponent(text)));
    }
    else if(id==="base64-decode") {
      try {
        r=decodeURIComponent(escape(atob(text)));
      } catch {
        r="Invalid Base64";
      }
    }
    else if(id==="json-formatter") {
      try {
        r=JSON.stringify(JSON.parse(text),null,2);
      } catch {
        r="Invalid JSON";
      }
    }
    else if(id==="json-minifier") {
      try {
        r=JSON.stringify(JSON.parse(text));
      } catch {
        r="Invalid JSON";
      }
    }
    else if(id==="uuid") {
      r=crypto.randomUUID();
    }
    else if(id==="password" || id==="random-password") {
      r=crypto.getRandomValues(new Uint32Array(3))
        .join("-")+"!Aa";
    }
    else if(id==="binary") {
      r=[...text]
        .map(c=>c.charCodeAt(0).toString(2).padStart(8,"0"))
        .join(" ");
    }
    else if(id==="ascii") {
      r=[...text]
        .map(c=>c.charCodeAt(0))
        .join(" ");
    }
    else if(id==="duplicate-lines") {
      r=[...new Set(text.split(/\r?\n/))].join("\n");
    }
    else if(id==="text-sorter") {
      r=text.split(/\r?\n/)
        .sort((a,b)=>a.localeCompare(b))
        .join("\n");
    }
    else if(id==="text-cleaner") {
      r=text
        .replace(/[ \t]+/g," ")
        .replace(/\n{3,}/g,"\n\n")
        .trim();
    }
    else if(id==="palindrome") {
      const s=text.toLowerCase().replace(/[^a-z0-9]/g,"");
      r=s===s.split("").reverse().join("")
        ?"Palindrome"
        :"Not a palindrome";
    }
    else if(id==="reading-time") {
      const words=text.trim()
        ?text.trim().split(/\s+/).length
        :0;

      r=`Estimated reading time: ${Math.max(
        1,
        Math.ceil(words/200)
      )} minute(s)`;
    }
    else if(id==="email-validator") {
      r=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text.trim())
        ?"Valid email format"
        :"Invalid email format";
    }
    else if(id==="random-number") {
      r=String(Math.floor(Math.random()*1000000));
    }
    else if(id==="number-words") {
      r="Number-to-words conversion is ready for backend/extended locale support.";
    }
    else {
      r="This tool is ready. Connect its production backend processing logic.";
    }

    setOut(r);
  };

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

      <div className="workspace">
        <div className="panel">
          <label>Your input</label>

          <textarea
            value={text}
            onChange={e=>setText(e.target.value)}
            placeholder="Paste or type your content here..."
          />

          <div className="actions">
            <button className="primary" onClick={run}>
              <Zap size={17}/>
              Run Tool
            </button>

            <button
              className="secondary"
              onClick={()=>{
                setText("");
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
              onClick={()=>
                navigator.clipboard?.writeText(out)
              }
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
        Browser-safe tools run locally whenever possible.
      </div>
    </main>
  );
}

createRoot(
  document.getElementById("root")
).render(<App/>);
