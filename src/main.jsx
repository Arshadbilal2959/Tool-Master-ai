import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Search,
  X,
  Wrench,
  FileText,
  Image as ImageIcon,
  Code2,
  Globe2,
  Calculator,
  ArrowRight,
  ShieldCheck,
  Zap,
  Sparkles,
  Upload,
  Copy,
  Download,
  CheckCircle2,
  LockKeyhole,
  Settings,
  LayoutDashboard,
  Loader2,
  AlertCircle,
  Plus,
  Pencil,
  Trash2,
  Power,
  RefreshCw,
  Save,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import "./styles.css";

/* =========================================================
   SUPABASE
========================================================= */

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "";

const SUPABASE_KEY =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  "";

const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

const PDF_TO_WORD_FUNCTION = SUPABASE_URL
  ? `${SUPABASE_URL}/functions/v1/pdf-to-word`
  : "";

/* =========================================================
   TOOLS
========================================================= */

const fallbackTools = [
  ["Text to Video", "AI & Video", "Turn text into an AI video project.", "text-to-video"],
  ["Student AI Helper", "AI & Education", "Ask questions or upload study material.", "student-ai-helper"],

  ["PDF to Word", "PDF Tools", "Convert PDF documents into editable Word files.", "pdf-word"],
  ["Word to PDF", "PDF Tools", "Convert Word documents into PDF.", "word-pdf"],
  ["PDF to JPG", "PDF Tools", "Convert PDF pages into images.", "pdf-jpg"],
  ["JPG to PDF", "PDF Tools", "Create PDF from JPG images.", "jpg-pdf"],
  ["Merge PDF", "PDF Tools", "Combine PDF files.", "merge-pdf"],
  ["Split PDF", "PDF Tools", "Split PDF pages.", "split-pdf"],
  ["Compress PDF", "PDF Tools", "Reduce PDF file size.", "compress-pdf"],
  ["Rotate PDF", "PDF Tools", "Rotate PDF pages.", "rotate-pdf"],

  ["Image Compressor", "Image Tools", "Compress JPG, PNG and WebP images.", "image-compressor"],
  ["Image Resizer", "Image Tools", "Resize images.", "image-resizer"],
  ["Image Cropper", "Image Tools", "Crop images online.", "image-cropper"],
  ["JPG to PNG", "Image Tools", "Convert JPG to PNG.", "jpg-png"],
  ["PNG to JPG", "Image Tools", "Convert PNG to JPG.", "png-jpg"],
  ["WebP Converter", "Image Tools", "Convert images to WebP.", "webp-converter"],
  ["Image to Text", "Image Tools", "Extract text from images.", "image-text"],

  ["QR Code Generator", "SEO & Marketing", "Generate QR codes.", "qr-generator"],
  ["Meta Tag Generator", "SEO & Marketing", "Generate SEO meta tags.", "meta-tags"],
  ["Sitemap Generator", "SEO & Marketing", "Generate XML sitemap.", "sitemap"],
  ["Robots.txt Generator", "SEO & Marketing", "Generate robots.txt.", "robots"],
  ["Keyword Density Checker", "SEO & Marketing", "Analyze keyword frequency.", "keyword-density"],
  ["URL Encoder", "SEO & Marketing", "Encode URLs.", "url-encoder"],
  ["Open Graph Generator", "SEO & Marketing", "Generate Open Graph tags.", "open-graph"],
  ["Schema Markup Generator", "SEO & Marketing", "Generate JSON-LD schema.", "schema"],
  ["Favicon Generator", "SEO & Marketing", "Prepare favicon assets.", "favicon"],
  ["UTM Builder", "SEO & Marketing", "Build campaign URLs.", "utm"],
  ["URL Slug Generator", "SEO & Marketing", "Create SEO-friendly slugs.", "slug"],

  ["Word Counter", "Text Tools", "Count words.", "word-counter"],
  ["Case Converter", "Text Tools", "Convert text case.", "case-converter"],
  ["Text Cleaner", "Text Tools", "Clean text.", "text-cleaner"],
  ["Lorem Ipsum Generator", "Text Tools", "Generate placeholder text.", "lorem"],
  ["Duplicate Line Remover", "Text Tools", "Remove duplicate lines.", "duplicate-lines"],
  ["Text Sorter", "Text Tools", "Sort text lines.", "text-sorter"],
  ["Text Reverser", "Text Tools", "Reverse text.", "text-reverser"],
  ["Palindrome Checker", "Text Tools", "Check palindrome.", "palindrome"],
  ["Reading Time Calculator", "Text Tools", "Calculate reading time.", "reading-time"],
  ["Character Counter", "Text Tools", "Count characters.", "characters"],
  ["Morse Code Converter", "Text Tools", "Convert text to Morse.", "morse"],

  ["JSON Formatter", "Developer Tools", "Format JSON.", "json-formatter"],
  ["JSON Minifier", "Developer Tools", "Minify JSON.", "json-minifier"],
  ["Base64 Encoder", "Developer Tools", "Encode Base64.", "base64-encode"],
  ["Base64 Decoder", "Developer Tools", "Decode Base64.", "base64-decode"],
  ["UUID Generator", "Developer Tools", "Generate UUID.", "uuid"],
  ["Hash Generator", "Developer Tools", "Generate text hash.", "hash"],
  ["SHA-256 Generator", "Developer Tools", "Generate SHA-256 hash.", "sha256"],
  ["URL Parser", "Developer Tools", "Parse URLs.", "url-parser"],
  ["CSV to JSON", "Developer Tools", "Convert CSV to JSON.", "csv-json"],
  ["JSON to CSV", "Developer Tools", "Convert JSON to CSV.", "json-csv"],

  ["Password Generator", "Security Tools", "Generate secure passwords.", "password"],
  ["Password Strength Checker", "Security Tools", "Check password strength.", "password-strength"],

  ["Percentage Calculator", "Calculator Tools", "Calculate percentage.", "percentage"],
  ["Age Calculator", "Calculator Tools", "Calculate age.", "age"],
  ["BMI Calculator", "Calculator Tools", "Calculate BMI.", "bmi"],
  ["Discount Calculator", "Calculator Tools", "Calculate discount.", "discount"],
  ["Loan Calculator", "Calculator Tools", "Calculate loan payment.", "loan"],
  ["GST Calculator", "Calculator Tools", "Calculate GST.", "gst"],
  ["Tip Calculator", "Calculator Tools", "Calculate tips.", "tip"],

  ["Unit Converter", "Converter Tools", "Convert common units.", "units"],
  ["Length Converter", "Converter Tools", "Convert length.", "length"],
  ["Weight Converter", "Converter Tools", "Convert weight.", "weight"],
  ["Temperature Converter", "Converter Tools", "Convert temperature.", "temperature"],
  ["Currency Converter", "Converter Tools", "Convert currencies using your rate.", "currency"],

  ["Email Validator", "Utility Tools", "Validate email.", "email-validator"],
  ["Phone Number Formatter", "Utility Tools", "Format phone numbers.", "phone"],
  ["Random Number Generator", "Utility Tools", "Generate random numbers.", "random-number"],
  ["Number to Words", "Utility Tools", "Convert numbers to words.", "number-words"],
  ["Roman Numeral Converter", "Utility Tools", "Convert Roman numerals.", "roman"],
  ["Business Name Generator", "Utility Tools", "Generate business names.", "business-name"],
  ["Username Generator", "Utility Tools", "Generate usernames.", "username"],
];

const categoryIcons = {
  "PDF Tools": FileText,
  "Image Tools": ImageIcon,
  "SEO & Marketing": Globe2,
  "Text Tools": FileText,
  "Developer Tools": Code2,
  "Calculator Tools": Calculator,
  "Converter Tools": Wrench,
  "Security Tools": ShieldCheck,
  "Utility Tools": Sparkles,
  "AI & Video": Sparkles,
  "AI & Education": Sparkles,
};

function normalizeTool(row) {
  return {
    id: row.id,
    name: row.name || "Unnamed Tool",
    category: row.category || "Utility Tools",
    description: row.description || "",
    slug: row.slug || "",
    icon: row.icon || "",
    is_active: row.is_active !== false,
    sort_order: Number(row.sort_order || 0),
    created_at: row.created_at,
  };
}

function fallbackToObject(item, index) {
  return {
    id: `fallback-${index}`,
    name: item[0],
    category: item[1],
    description: item[2],
    slug: item[3],
    icon: "",
    is_active: true,
    sort_order: index,
  };
}

/* =========================================================
   MAIN APP
========================================================= */

function App() {
  const [dbTools, setDbTools] = useState([]);
  const [toolsLoading, setToolsLoading] = useState(true);
  const [toolsError, setToolsError] = useState("");

  const [cat, setCat] = useState("All Tools");
  const [query, setQuery] = useState("");
  const [tool, setTool] = useState(null);

  const [admin, setAdmin] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  const loadTools = async () => {
    setToolsLoading(true);
    setToolsError("");

    if (!SUPABASE_URL || !SUPABASE_KEY) {
      setToolsLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("tools")
      .select(
        "id,name,category,description,slug,icon,is_active,sort_order,created_at"
      )
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });

    if (error) {
      console.error(error);
      setToolsError(error.message);
      setDbTools([]);
    } else {
      setDbTools((data || []).map(normalizeTool));
    }

    setToolsLoading(false);
  };

  useEffect(() => {
    loadTools();
  }, []);

  useEffect(() => {
    let mounted = true;

    async function checkSession() {
      if (!SUPABASE_URL || !SUPABASE_KEY) {
        setAuthLoading(false);
        return;
      }

      const { data } = await supabase.auth.getSession();

      if (!mounted) return;

      if (data.session?.user) {
        const ok = await verifyAdmin(data.session.user);

        if (ok) {
          setAdminUser(data.session.user);
          setAdmin(true);
        }
      }

      setAuthLoading(false);
    }

    checkSession();

    const {
      data: listener,
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setTimeout(async () => {
          if (!mounted) return;

          if (!session?.user) {
            setAdminUser(null);
            setAdmin(false);
            return;
          }

          const ok = await verifyAdmin(session.user);

          if (ok) {
            setAdminUser(session.user);
            setAdmin(true);
          } else {
            await supabase.auth.signOut();
            setAdminUser(null);
            setAdmin(false);
          }
        }, 0);
      }
    );

    return () => {
      mounted = false;
      listener?.subscription?.unsubscribe();
    };
  }, []);

  const allTools = useMemo(() => {
    if (dbTools.length) return dbTools;
    return fallbackTools.map(fallbackToObject);
  }, [dbTools]);

  const activeTools = useMemo(
    () => allTools.filter((t) => t.is_active !== false),
    [allTools]
  );

  const categories = useMemo(() => {
    const counts = {};

    activeTools.forEach((t) => {
      counts[t.category] = (counts[t.category] || 0) + 1;
    });

    const result = [["All Tools", activeTools.length, Wrench]];

    Object.keys(counts)
      .sort()
      .forEach((name) => {
        result.push([
          name,
          counts[name],
          categoryIcons[name] || Wrench,
        ]);
      });

    return result;
  }, [activeTools]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return activeTools.filter((t) => {
      const categoryMatch =
        cat === "All Tools" || t.category === cat;

      const searchMatch =
        !q ||
        t.name.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q);

      return categoryMatch && searchMatch;
    });
  }, [activeTools, cat, query]);

  const backHome = () => {
    setTool(null);
    setAdmin(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="app">
      <header>
        <div className="nav">
          <button className="brand" onClick={backHome} type="button">
            <div className="brandIcon">
              <Wrench size={22} />
            </div>
            <span>
              ToolMaster<span>Pro</span>
            </span>
          </button>

          <nav>
            <a href="#tools">Tools</a>
            <a href="#categories">Categories</a>
            <a href="#about">About</a>
          </nav>

          <button
            className="adminBtn"
            onClick={() => {
              setTool(null);

              if (admin) {
                setAdmin(false);
              } else if (adminUser) {
                setAdmin(true);
              } else {
                setShowAdminLogin(true);
              }
            }}
            type="button"
          >
            <LayoutDashboard size={17} />
            {admin ? "Close Admin" : "Admin"}
          </button>
        </div>
      </header>

      {admin ? (
        <Admin
          user={adminUser}
          tools={allTools}
          refreshTools={loadTools}
          onClose={backHome}
          onLogout={async () => {
            await supabase.auth.signOut();
            setAdminUser(null);
            setAdmin(false);
          }}
        />
      ) : tool ? (
        <ToolPage t={tool} back={backHome} />
      ) : (
        <>
          <section className="hero">
            <div className="pill">
              <Sparkles size={15} />
              {activeTools.length}+ Free Online Tools
            </div>

            <h1>
              One place for <span>every tool</span> you need.
            </h1>

            <p>
              Fast, simple and privacy-friendly online tools for
              PDF, images, SEO, text, developers and calculators.
            </p>

            <div className="search">
              <Search />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for a tool..."
              />

              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                >
                  <X size={18} />
                </button>
              )}
            </div>

            <div className="stats">
              <div>
                <b>{activeTools.length}+</b>
                <small>Tools</small>
              </div>
              <div>
                <b>{categories.length - 1}</b>
                <small>Categories</small>
              </div>
              <div>
                <b>100%</b>
                <small>Browser Tools</small>
              </div>
            </div>
          </section>

          <main id="tools">
            {toolsError && (
              <div className="errorBox">
                <AlertCircle size={22} />
                <div>
                  <strong>Database error</strong>
                  <p>{toolsError}</p>
                  <button
                    className="secondary"
                    onClick={loadTools}
                    type="button"
                  >
                    Retry
                  </button>
                </div>
              </div>
            )}

            <section id="categories" className="categories">
              {categories.map(([name, count, Icon]) => (
                <button
                  key={name}
                  type="button"
                  className={cat === name ? "cat active" : "cat"}
                  onClick={() => {
                    setCat(name);
                    setQuery("");
                  }}
                >
                  <Icon />
                  <span>{name}</span>
                  <em>{count}</em>
                </button>
              ))}
            </section>

            <div className="sectionHead">
              <div>
                <h2>{cat}</h2>
                <p>
                  {toolsLoading
                    ? "Loading tools..."
                    : `${filtered.length} tools available`}
                </p>
              </div>

              <button
                className="secondary"
                onClick={loadTools}
                disabled={toolsLoading}
                type="button"
              >
                <RefreshCw
                  size={16}
                  className={toolsLoading ? "spin" : ""}
                />
                Refresh
              </button>
            </div>

            <div className="grid">
              {filtered.map((t) => (
                <ToolCard
                  key={t.id || t.slug}
                  t={t}
                  open={() => {
                    setTool(t);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                />
              ))}
            </div>
          </main>
        </>
      )}

      {showAdminLogin && !admin && (
        <AdminLogin
          onClose={() => setShowAdminLogin(false)}
          onSuccess={(user) => {
            setAdminUser(user);
            setAdmin(true);
            setShowAdminLogin(false);
            setTool(null);
          }}
        />
      )}

      {authLoading && (
        <div className="authLoading">
          <Loader2 className="spin" size={22} />
          <span>Checking secure session...</span>
        </div>
      )}

      <footer id="about">
        <div className="brand">
          <div className="brandIcon">
            <Wrench size={20} />
          </div>
          <span>
            ToolMaster<span>Pro</span>
          </span>
        </div>

        <p>Powerful online tools, made simple.</p>
        <small>© 2026 ToolMaster Pro.</small>
      </footer>
    </div>
  );
}

/* =========================================================
   CARD
========================================================= */

function ToolCard({ t, open }) {
  const Icon = categoryIcons[t.category] || Wrench;

  return (
    <article
      className="card"
      onClick={open}
      onKeyDown={(e) => e.key === "Enter" && open()}
      role="button"
      tabIndex={0}
    >
      <div className="toolIcon">
        <Icon size={21} />
      </div>

      <div className="cardBody">
        <span>{t.category}</span>
        <h3>{t.name}</h3>
        <p>{t.description}</p>
      </div>

      <ArrowRight className="arrow" />
    </article>
  );
}

/* =========================================================
   TOOL ROUTER
========================================================= */

function ToolPage({ t, back }) {
  if (t.slug === "pdf-word") return <PdfToWord back={back} />;

  if (
    t.category === "Image Tools"
  ) {
    return <ImageTool t={t} back={back} />;
  }

  if (
    t.slug === "qr-generator" ||
    t.slug === "meta-tags" ||
    t.slug === "sitemap" ||
    t.slug === "robots" ||
    t.slug === "open-graph" ||
    t.slug === "schema" ||
    t.slug === "utm" ||
    t.slug === "keyword-density" ||
    t.slug === "favicon"
  ) {
    return <SeoTool t={t} back={back} />;
  }

  if (t.slug === "text-to-video") {
    return <TextToVideo back={back} />;
  }

  if (t.slug === "student-ai-helper") {
    return <StudentAIHelper back={back} />;
  }

  return <GenericTool t={t} back={back} />;
}

/* =========================================================
   PDF TO WORD
========================================================= */

function PdfToWord({ back }) {
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [downloadName, setDownloadName] = useState("");

  const selectFile = (f) => {
    setError("");
    setSuccess("");
    setDownloadUrl("");

    if (!f) return;

    if (
      f.type !== "application/pdf" &&
      !f.name.toLowerCase().endsWith(".pdf")
    ) {
      setFile(null);
      setError("Please select a PDF file.");
      return;
    }

    if (f.size > 20 * 1024 * 1024) {
      setFile(null);
      setError("Maximum PDF size is 20 MB.");
      return;
    }

    setFile(f);
  };

  const convert = async () => {
    if (!file) {
      setError("Please select a PDF file.");
      return;
    }

    if (!SUPABASE_KEY || !PDF_TO_WORD_FUNCTION) {
      setError("Supabase configuration is missing.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(PDF_TO_WORD_FUNCTION, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${SUPABASE_KEY}`,
          apikey: SUPABASE_KEY,
        },
        body: formData,
      });

      if (!response.ok) {
        let message = `Conversion failed (${response.status}).`;

        try {
          const type =
            response.headers.get("content-type") || "";

          if (type.includes("application/json")) {
            const data = await response.json();
            message =
              data.error ||
              data.message ||
              message;
          } else {
            const text = await response.text();
            if (text.trim()) message = text.trim();
          }
        } catch {}

        throw new Error(message);
      }

      const type =
        response.headers.get("content-type") || "";

      const blob = await response.blob();

      if (!blob.size) {
        throw new Error("Server returned an empty file.");
      }

      if (
        type.includes("application/json") ||
        type.includes("text/plain")
      ) {
        const text = await blob.text();

        try {
          const data = JSON.parse(text);
          const url =
            data.downloadUrl ||
            data.download_url ||
            data.url;

          if (url) {
            setDownloadUrl(url);
            setDownloadName(
              data.filename ||
                file.name.replace(/\.pdf$/i, ".docx")
            );
            setSuccess("PDF converted successfully!");
            return;
          }
        } catch {}
      }

      const url = URL.createObjectURL(blob);

      setDownloadUrl(url);
      setDownloadName(
        file.name.replace(/\.pdf$/i, "") + ".docx"
      );
      setSuccess("PDF converted successfully!");
    } catch (e) {
      console.error(e);
      setError(e?.message || "Conversion failed.");
    } finally {
      setLoading(false);
    }
  };

  const download = () => {
    if (!downloadUrl) return;

    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = downloadName || "converted.docx";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <main className="toolPage">
      <button className="back" onClick={back} type="button">
        ← Back to tools
      </button>

      <div className="toolHero">
        <div className="toolIcon big">
          <FileText />
        </div>

        <div>
          <span>PDF Tools</span>
          <h1>PDF to Word</h1>
          <p>Convert PDF documents into editable Word files.</p>
        </div>
      </div>

      <div
        className={`pdfUpload ${dragging ? "dragging" : ""}`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          selectFile(e.dataTransfer.files?.[0]);
        }}
      >
        {!file ? (
          <label className="pdfChoose">
            <Upload size={42} />
            <h3>Upload your PDF</h3>
            <p>Drag & drop or click to browse</p>

            <span className="primary">Choose PDF</span>

            <input
              type="file"
              accept=".pdf,application/pdf"
              onChange={(e) => selectFile(e.target.files?.[0])}
            />

            <small>Maximum file size: 20 MB</small>
          </label>
        ) : (
          <div className="pdfSelected">
            <div className="selectedFile">
              <FileText size={30} />
              <div>
                <strong>{file.name}</strong>
                <small>
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </small>
              </div>
            </div>

            <button
              type="button"
              className="iconButton"
              onClick={() => setFile(null)}
            >
              <X size={20} />
            </button>
          </div>
        )}

        {file && (
          <button
            className="primary convertButton"
            onClick={convert}
            disabled={loading}
            type="button"
          >
            {loading ? (
              <>
                <Loader2 className="spin" size={19} />
                Converting...
              </>
            ) : (
              <>
                <FileText size={19} />
                Convert to Word
              </>
            )}
          </button>
        )}
      </div>

      {error && (
        <div className="errorBox">
          <AlertCircle size={22} />
          <div>
            <strong>Conversion Error</strong>
            <p>{error}</p>
          </div>
        </div>
      )}

      {success && downloadUrl && (
        <div className="successBox">
          <CheckCircle2 size={27} />
          <div>
            <strong>{success}</strong>
            <p>Your Word document is ready.</p>

            <button
              className="downloadButton"
              onClick={download}
              type="button"
            >
              <Download size={21} />
              Download Word File
            </button>
          </div>
        </div>
      )}

      <div className="notice">
        <ShieldCheck />
        <span>
          Your PDF is sent to the configured conversion server.
        </span>
      </div>
    </main>
  );
}

/* =========================================================
   IMAGE TOOLS
========================================================= */

function ImageTool({ t, back }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [result, setResult] = useState("");
  const [width, setWidth] = useState(1000);
  const [height, setHeight] = useState(1000);
  const [quality, setQuality] = useState(0.8);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef(null);

  const choose = (f) => {
    if (!f) return;

    if (!f.type.startsWith("image/")) {
      alert("Please select an image.");
      return;
    }

    setFile(f);
    setResult("");

    const url = URL.createObjectURL(f);
    setPreview(url);

    const img = new Image();

    img.onload = () => {
      setWidth(img.width);
      setHeight(img.height);
    };

    img.src = url;
  };

  const processImage = async () => {
    if (!file) {
      alert("Please select an image first.");
      return;
    }

    setLoading(true);

    try {
      const img = new Image();

      img.src = URL.createObjectURL(file);

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      let w = img.width;
      let h = img.height;

      if (t.slug === "image-resizer") {
        w = Math.max(1, Number(width));
        h = Math.max(1, Number(height));
      }

      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;

      const ctx = canvas.getContext("2d");

      if (
        t.slug === "png-jpg" ||
        t.slug === "webp-converter"
      ) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, w, h);
      }

      ctx.drawImage(img, 0, 0, w, h);

      let mime = file.type || "image/png";

      if (t.slug === "jpg-png") mime = "image/png";
      if (t.slug === "png-jpg") mime = "image/jpeg";
      if (t.slug === "webp-converter") mime = "image/webp";

      const url = canvas.toDataURL(
        mime,
        Number(quality)
      );

      setResult(url);
    } catch (e) {
      alert(e?.message || "Image processing failed.");
    } finally {
      setLoading(false);
    }
  };

  const download = () => {
    if (!result) return;

    let ext = "png";

    if (t.slug === "png-jpg") ext = "jpg";
    else if (t.slug === "webp-converter") ext = "webp";
    else if (file?.type === "image/jpeg") ext = "jpg";

    const a = document.createElement("a");
    a.href = result;
    a.download = `toolmaster-${t.slug}.${ext}`;
    a.click();
  };

  return (
    <main className="toolPage">
      <button className="back" onClick={back} type="button">
        ← Back to tools
      </button>

      <div className="toolHero">
        <div className="toolIcon big">
          <ImageIcon />
        </div>

        <div>
          <span>{t.category}</span>
          <h1>{t.name}</h1>
          <p>{t.description}</p>
        </div>
      </div>

      <div className="imageWorkspace">
        <div className="panel">
          <label>Upload Image</label>

          <div
            className="uploadBox"
            onClick={() => inputRef.current?.click()}
          >
            <Upload size={35} />
            <b>
              {file ? file.name : "Choose an image"}
            </b>
            <small>JPG, PNG or WebP</small>

            <input
              ref={inputRef}
              hidden
              type="file"
              accept="image/*"
              onChange={(e) => choose(e.target.files?.[0])}
            />
          </div>

          {file && (
            <img
              src={preview}
              alt="Preview"
              style={{
                maxWidth: "100%",
                maxHeight: 300,
                marginTop: 20,
                borderRadius: 12,
              }}
            />
          )}
        </div>

        <div className="panel">
          {t.slug === "image-resizer" && (
            <div className="formGrid">
              <label>
                Width
                <input
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                />
              </label>

              <label>
                Height
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
              </label>
            </div>
          )}

          {(
            t.slug === "image-compressor" ||
            t.slug === "jpg-png" ||
            t.slug === "png-jpg" ||
            t.slug === "webp-converter"
          ) && (
            <label>
              Quality
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.1"
                value={quality}
                onChange={(e) => setQuality(e.target.value)}
              />
            </label>
          )}

          {t.slug === "image-cropper" && (
            <p>
              Basic crop mode uses the selected image dimensions.
              Use Image Resizer for exact dimensions.
            </p>
          )}

          <button
            className="primary"
            onClick={processImage}
            disabled={loading}
            type="button"
          >
            {loading ? (
              <>
                <Loader2 className="spin" />
                Processing...
              </>
            ) : (
              <>
                <Zap size={17} />
                Process Image
              </>
            )}
          </button>

          {result && (
            <>
              <img
                src={result}
                alt="Result"
                style={{
                  width: "100%",
                  maxHeight: 300,
                  objectFit: "contain",
                  marginTop: 20,
                  borderRadius: 12,
                }}
              />

              <button
                className="secondary"
                onClick={download}
                type="button"
              >
                <Download size={17} />
                Download
              </button>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

/* =========================================================
   SEO TOOLS
========================================================= */

function SeoTool({ t, back }) {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [result, setResult] = useState("");

  const run = () => {
    let out = "";

    switch (t.slug) {
      case "qr-generator":
        out =
          `QR content:\n${text}\n\nUse a QR library/backend to render the image.`;
        break;

      case "meta-tags":
        out = `<title>${title}</title>
<meta name="description" content="${description}">
<link rel="canonical" href="${url}">`;
        break;

      case "open-graph":
        out = `<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:url" content="${url}">
<meta property="og:type" content="website">`;
        break;

      case "schema":
        out = JSON.stringify(
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: title,
            description,
            url,
          },
          null,
          2
        );
        break;

      case "sitemap":
        out = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${url}</loc>
  </url>
</urlset>`;
        break;

      case "robots":
        out = `User-agent: *
Allow: /

Sitemap: ${url.replace(/\/$/, "")}/sitemap.xml`;
        break;

      case "utm": {
        try {
          const u = new URL(url);
          u.searchParams.set("utm_source", title || "website");
          u.searchParams.set(
            "utm_medium",
            description || "online"
          );
          out = u.toString();
        } catch {
          out = "Please enter a valid URL.";
        }
        break;
      }

      case "keyword-density": {
        const words = text
          .toLowerCase()
          .match(/[a-z0-9]+/g) || [];

        const counts = {};

        words.forEach(
          (w) => (counts[w] = (counts[w] || 0) + 1)
        );

        out = Object.entries(counts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 30)
          .map(
            ([word, count]) =>
              `${word}: ${count} (${((count / words.length) * 100).toFixed(2)}%)`
          )
          .join("\n");

        break;
      }

      default:
        out = text;
    }

    setResult(out);
  };

  const download = () => {
    const blob = new Blob([result], {
      type: "text/plain;charset=utf-8",
    });

    const url2 = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url2;
    a.download = `${t.slug}-result.txt`;
    a.click();
    URL.revokeObjectURL(url2);
  };

  return (
    <main className="toolPage">
      <button className="back" onClick={back} type="button">
        ← Back to tools
      </button>

      <div className="toolHero">
        <div className="toolIcon big">
          <Globe2 />
        </div>

        <div>
          <span>{t.category}</span>
          <h1>{t.name}</h1>
          <p>{t.description}</p>
        </div>
      </div>

      <div className="workspace">
        <div className="panel">
          <label>Input</label>

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title / source"
          />

          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
          />

          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description / medium"
          />

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter content..."
          />

          <button
            className="primary"
            onClick={run}
            type="button"
          >
            <Zap size={17} />
            Generate
          </button>
        </div>

        <div className="panel">
          <label>Result</label>

          <textarea
            value={result}
            readOnly
            placeholder="Generated result..."
          />

          <div className="actions">
            <button
              className="secondary"
              onClick={() =>
                navigator.clipboard?.writeText(result)
              }
              type="button"
            >
              <Copy size={17} />
              Copy
            </button>

            {result && (
              <button
                className="secondary"
                onClick={download}
                type="button"
              >
                <Download size={17} />
                Download
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

/* =========================================================
   GENERIC TOOLS
========================================================= */

function GenericTool({ t, back }) {
  const [text, setText] = useState("");
  const [out, setOut] = useState("");

  const run = async () => {
    let result = "";

    try {
      switch (t.slug) {
        case "word-counter": {
          const words = text.trim()
            ? text.trim().split(/\s+/).length
            : 0;

          const sentences = text
            .split(/[.!?]+/)
            .filter(Boolean).length;

          result =
            `Words: ${words}\n` +
            `Characters: ${text.length}\n` +
            `Characters without spaces: ${text.replace(/\s/g, "").length}\n` +
            `Sentences: ${sentences}`;
          break;
        }

        case "characters":
          result =
            `Characters: ${text.length}\nWithout spaces: ${text.replace(/\s/g, "").length}`;
          break;

        case "case-converter":
          result =
            `UPPERCASE:\n${text.toUpperCase()}\n\nLOWERCASE:\n${text.toLowerCase()}\n\nTitle Case:\n${toTitleCase(text)}`;
          break;

        case "text-cleaner":
          result = text
            .replace(/[ \t]+/g, " ")
            .replace(/\n\s*\n+/g, "\n")
            .trim();
          break;

        case "text-reverser":
          result = [...text].reverse().join("");
          break;

        case "slug":
          result = text
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");
          break;

        case "url-encoder":
          result = encodeURIComponent(text);
          break;

        case "base64-encode":
          result = unicodeBase64Encode(text);
          break;

        case "base64-decode":
          result = unicodeBase64Decode(text);
          break;

        case "json-formatter":
          result = JSON.stringify(JSON.parse(text), null, 2);
          break;

        case "json-minifier":
          result = JSON.stringify(JSON.parse(text));
          break;

        case "uuid":
          result = crypto.randomUUID();
          break;

        case "password":
          result = generatePassword(20);
          break;

        case "sha256":
        case "hash":
          result = await sha256(text);
          break;

        case "url-parser": {
          const u = new URL(text);

          result = JSON.stringify(
            {
              protocol: u.protocol,
              hostname: u.hostname,
              port: u.port,
              pathname: u.pathname,
              search: u.search,
              hash: u.hash,
            },
            null,
            2
          );
          break;
        }

        case "email-validator":
          result = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
            text.trim()
          )
            ? "Valid email format."
            : "Invalid email format.";
          break;

        case "random-number":
          result = String(
            Math.floor(Math.random() * 1000000)
          );
          break;

        case "password-strength":
          result = passwordStrength(text);
          break;

        case "duplicate-lines":
          result = [
            ...new Set(
              text
                .split("\n")
                .map((x) => x.trim())
                .filter(Boolean)
            ),
          ].join("\n");
          break;

        case "text-sorter":
          result = text
            .split("\n")
            .sort((a, b) => a.localeCompare(b))
            .join("\n");
          break;

        case "palindrome": {
          const clean = text
            .toLowerCase()
            .replace(/[^a-z0-9]/g, "");

          result =
            clean === [...clean].reverse().join("")
              ? "Yes, this is a palindrome."
              : "No, this is not a palindrome.";
          break;
        }

        case "reading-time": {
          const words = text.trim()
            ? text.trim().split(/\s+/).length
            : 0;

          result =
            `Words: ${words}\nEstimated reading time: ${(words / 200).toFixed(1)} minutes`;
          break;
        }

        case "morse":
          result = textToMorse(text);
          break;

        case "lorem":
          result = loremIpsum(
            Math.max(1, Number(text) || 3)
          );
          break;

        case "percentage":
          result = calculatePercentage(text);
          break;

        case "discount":
          result = calculateDiscount(text);
          break;

        case "bmi":
          result = calculateBMI(text);
          break;

        case "gst":
          result = calculateGST(text);
          break;

        case "tip":
          result = calculateTip(text);
          break;

        case "temperature":
          result = convertTemperature(text);
          break;

        case "length":
        case "weight":
        case "units":
          result = convertUnits(text);
          break;

        case "number-words":
          result = numberToWords(Number(text));
          break;

        case "roman":
          result = numberToRoman(Number(text));
          break;

        case "business-name":
          result = generateNames(text, "Business");
          break;

        case "username":
          result = generateNames(text, "User");
          break;

        case "phone":
          result = text.replace(/[^\d+]/g, "");
          break;

        case "csv-json":
          result = JSON.stringify(csvToJson(text), null, 2);
          break;

        case "json-csv":
          result = jsonToCsv(text);
          break;

        default:
          result =
            "This tool needs a dedicated backend/library integration.";
      }
    } catch (e) {
      result = `Invalid input: ${
        e?.message || "Unable to process."
      }`;
    }

    setOut(result);
  };

  return (
    <main className="toolPage">
      <button className="back" onClick={back} type="button">
        ← Back to tools
      </button>

      <div className="toolHero">
        <div className="toolIcon big">
          {React.createElement(
            categoryIcons[t.category] || Wrench
          )}
        </div>

        <div>
          <span>{t.category}</span>
          <h1>{t.name}</h1>
          <p>{t.description}</p>
        </div>
      </div>

      <div className="workspace">
        <div className="panel">
          <label>Your Input</label>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={
              t.slug === "bmi"
                ? "Example: 70, 175"
                : t.slug === "percentage"
                ? "Example: 20, 500"
                : "Enter or paste your content..."
            }
          />

          <div className="actions">
            <button
              className="primary"
              onClick={run}
              type="button"
            >
              <Zap size={17} />
              Run Tool
            </button>

            <button
              className="secondary"
              onClick={() => {
                setText("");
                setOut("");
              }}
              type="button"
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
              onClick={() =>
                navigator.clipboard?.writeText(out)
              }
              type="button"
            >
              <Copy size={17} />
              Copy Result
            </button>

            {out && (
              <button
                className="secondary"
                onClick={() => downloadText(out, `${t.slug}.txt`)}
                type="button"
              >
                <Download size={17} />
                Download
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

/* =========================================================
   AI DEMO PAGES
========================================================= */

function TextToVideo({ back }) {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("Cinematic");
  const [duration, setDuration] = useState("10 seconds");
  const [status, setStatus] = useState("");

  const generate = () => {
    if (!prompt.trim()) {
      setStatus("Please enter a video prompt.");
      return;
    }

    setStatus(
      `Video project prepared — ${style}, ${duration}.`
    );
  };

  return (
    <main className="toolPage">
      <button className="back" onClick={back} type="button">
        ← Back to tools
      </button>

      <div className="toolHero">
        <div className="toolIcon big">
          <Sparkles />
        </div>
        <div>
          <span>AI & Video</span>
          <h1>Text to Video</h1>
          <p>Create a video project from text.</p>
        </div>
      </div>

      <div className="workspace">
        <div className="panel">
          <label>Video Prompt</label>

          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your video..."
          />

          <label>Style</label>

          <select
            value={style}
            onChange={(e) => setStyle(e.target.value)}
          >
            <option>Cinematic</option>
            <option>Realistic</option>
            <option>Anime</option>
            <option>3D Animation</option>
            <option>Documentary</option>
            <option>Product Ad</option>
          </select>

          <label>Duration</label>

          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          >
            <option>5 seconds</option>
            <option>10 seconds</option>
            <option>15 seconds</option>
            <option>30 seconds</option>
          </select>

          <button
            className="primary"
            onClick={generate}
            type="button"
          >
            <Sparkles size={17} />
            Generate Video
          </button>
        </div>

        <div className="panel">
          <h3>Video Preview</h3>

          <div className="videoPlaceholder">
            <div className="playCircle">▶</div>
            <b>Your video will appear here</b>
            <small>{style} · {duration}</small>
            {status && <p>{status}</p>}
          </div>
        </div>
      </div>

      <div className="notice">
        <ShieldCheck />
        <span>
          Real AI video generation requires a server-side AI provider.
        </span>
      </div>
    </main>
  );
}

function StudentAIHelper({ back }) {
  const [question, setQuestion] = useState("");
  const [file, setFile] = useState(null);
  const [answer, setAnswer] = useState("");

  const solve = () => {
    if (!question.trim() && !file) {
      setAnswer("Please enter a question or upload material.");
      return;
    }

    setAnswer(
      `Question received.\n\n${
        question || "Study material uploaded."
      }\n\nA real AI model can be connected through a secure Supabase Edge Function for the final answer.`
    );
  };

  return (
    <main className="toolPage">
      <button className="back" onClick={back} type="button">
        ← Back to tools
      </button>

      <div className="toolHero">
        <div className="toolIcon big">
          <Sparkles />
        </div>

        <div>
          <span>AI & Education</span>
          <h1>Student AI Helper</h1>
          <p>Ask questions or upload study material.</p>
        </div>
      </div>

      <div className="workspace">
        <div className="panel">
          <label>Question</label>

          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask your question..."
          />

          <label className="uploadBox">
            <Upload />
            <div>
              <b>{file ? file.name : "Upload study material"}</b>
              <small>PDF, JPG, PNG, TXT, DOC or DOCX</small>
            </div>

            <input
              type="file"
              accept=".pdf,image/*,.txt,.doc,.docx"
              onChange={(e) =>
                setFile(e.target.files?.[0] || null)
              }
            />
          </label>

          <button
            className="primary"
            onClick={solve}
            type="button"
          >
            <Sparkles size={17} />
            Get AI Help
          </button>
        </div>

        <div className="panel">
          <label>AI Answer</label>

          <textarea
            value={answer}
            readOnly
            placeholder="Answer will appear here..."
          />

          {answer && (
            <button
              className="secondary"
              onClick={() =>
                navigator.clipboard?.writeText(answer)
              }
              type="button"
            >
              <Copy size={17} />
              Copy Answer
            </button>
          )}
        </div>
      </div>
    </main>
  );
}

/* =========================================================
   ADMIN
========================================================= */

async function verifyAdmin(user) {
  if (!user?.id || !SUPABASE_URL || !SUPABASE_KEY) {
    return false;
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (error) {
    console.error("Admin check:", error);
    return false;
  }

  return data?.role === "admin";
}

function AdminLogin({ onClose, onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Enter email and password.");
      return;
    }

    setLoading(true);

    try {
      const { data, error } =
        await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

      if (error) throw error;

      if (!data.user) {
        throw new Error("Login failed.");
      }

      const ok = await verifyAdmin(data.user);

      if (!ok) {
        await supabase.auth.signOut();
        throw new Error("This account is not an admin.");
      }

      onSuccess(data.user);
    } catch (e) {
      setError(e?.message || "Unable to sign in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="authOverlay">
      <form className="authCard" onSubmit={login}>
        <button
          className="authClose"
          type="button"
          onClick={onClose}
        >
          <X />
        </button>

        <div className="toolIcon big authIcon">
          <LockKeyhole />
        </div>

        <span className="pill">Secure Admin Access</span>

        <h2>Admin Login</h2>

        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        {error && (
          <div className="authError">
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        <button
          className="primary authSubmit"
          disabled={loading}
          type="submit"
        >
          {loading ? (
            <>
              <Loader2 className="spin" />
              Signing in...
            </>
          ) : (
            <>
              <LockKeyhole size={18} />
              Sign in
            </>
          )}
        </button>
      </form>
    </div>
  );
}

function Admin({
  user,
  tools,
  refreshTools,
  onClose,
  onLogout,
}) {
  const [section, setSection] = useState("dashboard");

  return (
    <main className="admin">
      <div className="adminTop">
        <div>
          <span className="pill">
            <ShieldCheck size={15} />
            Secure Admin Panel
          </span>

          <h1>ToolMaster Pro Control Center</h1>

          <p>
            Welcome, {user?.email || "Administrator"}.
          </p>
        </div>

        <div className="adminActions">
          <button
            className="secondary"
            onClick={onClose}
            type="button"
          >
            Back to Website
          </button>

          <button
            className="secondary"
            onClick={onLogout}
            type="button"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="adminNav">
        {[
          ["dashboard", "Dashboard", LayoutDashboard],
          ["tools", "Manage Tools", Settings],
          ["users", "Manage Users", LockKeyhole],
          ["analytics", "Analytics", LayoutDashboard],
        ].map(([id, label, Icon]) => (
          <button
            key={id}
            className={section === id ? "active" : ""}
            onClick={() => setSection(id)}
            type="button"
          >
            <Icon size={17} />
            {label}
          </button>
        ))}
      </div>

      {section === "dashboard" && (
        <AdminDashboard
          tools={tools}
          goTools={() => setSection("tools")}
          goUsers={() => setSection("users")}
          goAnalytics={() => setSection("analytics")}
        />
      )}

      {section === "tools" && (
        <AdminTools
          tools={tools}
          refreshTools={refreshTools}
        />
      )}

      {section === "users" && (
        <AdminUsers adminEmail={user?.email} />
      )}

      {section === "analytics" && (
        <AdminAnalytics tools={tools} />
      )}
    </main>
  );
}

function AdminDashboard({
  tools,
  goTools,
  goUsers,
  goAnalytics,
}) {
  const active = tools.filter((t) => t.is_active).length;

  return (
    <div className="adminGrid">
      <div className="adminCard">
        <Settings />
        <h3>Tool Management</h3>
        <p>{tools.length} tools in database.</p>
        <button className="primary" onClick={goTools}>
          Manage Tools
        </button>
      </div>

      <div className="adminCard">
        <CheckCircle2 />
        <h3>Active Tools</h3>
        <p>{active} tools visible.</p>
      </div>

      <div className="adminCard">
        <Power />
        <h3>Inactive Tools</h3>
        <p>{tools.length - active} tools hidden.</p>
      </div>

      <div className="adminCard">
        <LockKeyhole />
        <h3>Users</h3>
        <p>Admin authentication protected by Supabase.</p>
        <button className="primary" onClick={goUsers}>
          Manage Users
        </button>
      </div>

      <div className="adminCard">
        <LayoutDashboard />
        <h3>Analytics</h3>
        <p>Database statistics.</p>
        <button className="primary" onClick={goAnalytics}>
          View Analytics
        </button>
      </div>
    </div>
  );
}

function AdminUsers({ adminEmail }) {
  return (
    <section className="adminCard adminWide">
      <LockKeyhole />
      <h2>Users & Access</h2>
      <p>Current admin access is verified from profiles.</p>

      <div className="adminInfo">
        <b>Current admin:</b> {adminEmail || "Unknown"}
        <br />
        <span>Role: admin</span>
      </div>
    </section>
  );
}

function AdminAnalytics({ tools }) {
  const active = tools.filter((t) => t.is_active).length;
  const categories = new Set(
    tools.map((t) => t.category)
  ).size;

  return (
    <section className="adminCard adminWide">
      <LayoutDashboard />
      <h2>Analytics</h2>

      <div className="stats adminStats">
        <div>
          <b>{tools.length}</b>
          <small>Total Tools</small>
        </div>

        <div>
          <b>{active}</b>
          <small>Active Tools</small>
        </div>

        <div>
          <b>{categories}</b>
          <small>Categories</small>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   ADMIN CRUD
========================================================= */

function AdminTools({ tools, refreshTools }) {
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const filtered = tools.filter((t) => {
    const q = search.toLowerCase();

    return (
      !q ||
      t.name.toLowerCase().includes(q) ||
      t.slug.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q)
    );
  });

  const save = async (form) => {
    setError("");
    setMessage("");

    const payload = {
      name: form.name.trim(),
      category: form.category.trim(),
      description: form.description.trim(),
      slug: form.slug.trim(),
      icon: form.icon.trim(),
      is_active: Boolean(form.is_active),
      sort_order: Number(form.sort_order || 0),
    };

    if (!payload.name || !payload.slug) {
      setError("Name and slug are required.");
      return;
    }

    const result = editing
      ? await supabase
          .from("tools")
          .update(payload)
          .eq("id", editing.id)
      : await supabase.from("tools").insert(payload);

    if (result.error) {
      setError(result.error.message);
      return;
    }

    setMessage(
      editing
        ? "Tool updated successfully."
        : "Tool created successfully."
    );

    setEditing(null);
    setShowForm(false);

    await refreshTools();
  };

  const remove = async (item) => {
    if (!window.confirm(`Delete "${item.name}"?`)) return;

    const { error } = await supabase
      .from("tools")
      .delete()
      .eq("id", item.id);

    if (error) {
      setError(error.message);
      return;
    }

    await refreshTools();
  };

  const toggle = async (item) => {
    const { error } = await supabase
      .from("tools")
      .update({ is_active: !item.is_active })
      .eq("id", item.id);

    if (error) {
      setError(error.message);
      return;
    }

    await refreshTools();
  };

  return (
    <section className="adminCard adminWide">
      <div className="adminSectionHeader">
        <div>
          <Settings />
          <h2>Manage Tools</h2>
          <p>Add, edit, activate and delete tools.</p>
        </div>

        <button
          className="primary"
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          type="button"
        >
          <Plus size={18} />
          Add Tool
        </button>
      </div>

      {error && (
        <div className="authError">
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      {message && (
        <div className="successBox">
          <CheckCircle2 size={20} />
          {message}
        </div>
      )}

      {showForm && (
        <ToolForm
          initial={
            editing || {
              name: "",
              category: "Utility Tools",
              description: "",
              slug: "",
              icon: "",
              is_active: true,
              sort_order: tools.length,
            }
          }
          editing={Boolean(editing)}
          onCancel={() => {
            setShowForm(false);
            setEditing(null);
          }}
          onSave={save}
        />
      )}

      <div className="adminToolbar">
        <div className="search">
          <Search size={18} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tools..."
          />
        </div>

        <button
          className="secondary"
          onClick={refreshTools}
          type="button"
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      <div className="toolTable">
        <div className="toolTableHead">
          <span>Tool</span>
          <span>Category</span>
          <span>Status</span>
          <span>Order</span>
          <span>Actions</span>
        </div>

        {filtered.map((item) => (
          <div className="toolTableRow" key={item.id}>
            <div>
              <strong>{item.name}</strong>
              <small>/{item.slug}</small>
              <p>{item.description}</p>
            </div>

            <span>{item.category}</span>

            <span>
              <b
                className={
                  item.is_active
                    ? "statusActive"
                    : "statusInactive"
                }
              >
                {item.is_active ? "Active" : "Inactive"}
              </b>
            </span>

            <span>{item.sort_order}</span>

            <div className="rowActions">
              <button
                className="iconButton"
                onClick={() => {
                  setEditing(item);
                  setShowForm(true);
                }}
                type="button"
              >
                <Pencil size={17} />
              </button>

              <button
                className="iconButton"
                onClick={() => toggle(item)}
                type="button"
              >
                <Power size={17} />
              </button>

              <button
                className="iconButton danger"
                onClick={() => remove(item)}
                type="button"
              >
                <Trash2 size={17} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ToolForm({
  initial,
  editing,
  onCancel,
  onSave,
}) {
  const [form, setForm] = useState({
    name: initial.name || "",
    category: initial.category || "Utility Tools",
    description: initial.description || "",
    slug: initial.slug || "",
    icon: initial.icon || "",
    is_active: initial.is_active !== false,
    sort_order: Number(initial.sort_order || 0),
  });

  const change = (key, value) =>
    setForm((p) => ({ ...p, [key]: value }));

  return (
    <div className="toolForm">
      <h3>{editing ? "Edit Tool" : "Add New Tool"}</h3>

      <div className="formGrid">
        <label>
          Tool Name
          <input
            value={form.name}
            onChange={(e) => change("name", e.target.value)}
          />
        </label>

        <label>
          Category
          <input
            value={form.category}
            onChange={(e) =>
              change("category", e.target.value)
            }
          />
        </label>

        <label>
          Slug
          <input
            value={form.slug}
            onChange={(e) => change("slug", e.target.value)}
          />
        </label>

        <label>
          Icon
          <input
            value={form.icon}
            onChange={(e) => change("icon", e.target.value)}
          />
        </label>

        <label>
          Sort Order
          <input
            type="number"
            value={form.sort_order}
            onChange={(e) =>
              change("sort_order", e.target.value)
            }
          />
        </label>

        <label className="checkboxLabel">
          <input
            type="checkbox"
            checked={form.is_active}
            onChange={(e) =>
              change("is_active", e.target.checked)
            }
          />
          Active
        </label>

        <label className="full">
          Description
          <textarea
            value={form.description}
            onChange={(e) =>
              change("description", e.target.value)
            }
          />
        </label>
      </div>

      <div className="actions">
        <button
          className="primary"
          onClick={() => onSave(form)}
          type="button"
        >
          <Save size={17} />
          {editing ? "Update Tool" : "Create Tool"}
        </button>

        <button
          className="secondary"
          onClick={onCancel}
          type="button"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   HELPERS
========================================================= */

function toTitleCase(text) {
  return text.toLowerCase().replace(
    /\b\w/g,
    (c) => c.toUpperCase()
  );
}

function unicodeBase64Encode(text) {
  const bytes = new TextEncoder().encode(text);

  let binary = "";

  bytes.forEach((b) => {
    binary += String.fromCharCode(b);
  });

  return btoa(binary);
}

function unicodeBase64Decode(text) {
  const binary = atob(text);

  const bytes = Uint8Array.from(
    binary,
    (c) => c.charCodeAt(0)
  );

  return new TextDecoder().decode(bytes);
}

async function sha256(text) {
  const data = new TextEncoder().encode(text);

  const hash = await crypto.subtle.digest(
    "SHA-256",
    data
  );

  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function generatePassword(length = 18) {
  const chars =
    "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*";

  const values = new Uint32Array(length);

  crypto.getRandomValues(values);

  return Array.from(
    values,
    (v) => chars[v % chars.length]
  ).join("");
}

function passwordStrength(password) {
  let score = 0;

  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) return "Weak";
  if (score <= 4) return "Medium";
  return "Strong";
}

function textToMorse(text) {
  const morse = {
    a: ".-", b: "-...", c: "-.-.", d: "-..",
    e: ".", f: "..-.", g: "--.", h: "....",
    i: "..", j: ".---", k: "-.-", l: ".-..",
    m: "--", n: "-.", o: "---", p: ".--.",
    q: "--.-", r: ".-.", s: "...", t: "-",
    u: "..-", v: "...-", w: ".--", x: "-..-",
    y: "-.--", z: "--..",
    0: "-----", 1: ".----", 2: "..---",
    3: "...--", 4: "....-", 5: ".....",
    6: "-....", 7: "--...", 8: "---..",
    9: "----.",
  };

  return text
    .toLowerCase()
    .split("")
    .map((c) => (c === " " ? "/" : morse[c] || c))
    .join(" ");
}

function loremIpsum(paragraphs = 3) {
  const base =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

  return Array.from(
    { length: paragraphs },
    () => base
  ).join("\n\n");
}

function calculatePercentage(text) {
  const [percent, value] = text
    .split(/[,\s]+/)
    .map(Number);

  if (!Number.isFinite(percent) || !Number.isFinite(value)) {
    return "Use: percentage, value — example: 20, 500";
  }

  return `${percent}% of ${value} = ${(percent * value / 100).toFixed(2)}`;
}

function calculateDiscount(text) {
  const [price, discount] = text
    .split(/[,\s]+/)
    .map(Number);

  if (!Number.isFinite(price) || !Number.isFinite(discount)) {
    return "Use: price, discount — example: 1000, 20";
  }

  const saved = price * discount / 100;

  return `Original: ${price}\nDiscount: ${saved.toFixed(2)}\nFinal: ${(price - saved).toFixed(2)}`;
}

function calculateBMI(text) {
  const [weight, heightCm] = text
    .split(/[,\s]+/)
    .map(Number);

  if (!weight || !heightCm) {
    return "Use: weight(kg), height(cm) — example: 70, 175";
  }

  const height = heightCm / 100;
  const bmi = weight / (height * height);

  return `BMI: ${bmi.toFixed(2)}`;
}

function calculateGST(text) {
  const [amount, rate = 18] = text
    .split(/[,\s]+/)
    .map(Number);

  if (!Number.isFinite(amount)) {
    return "Use: amount, GST rate — example: 1000, 18";
  }

  const gst = amount * rate / 100;

  return `Amount: ${amount}\nGST: ${gst.toFixed(2)}\nTotal: ${(amount + gst).toFixed(2)}`;
}

function calculateTip(text) {
  const [bill, tip = 10, people = 1] = text
    .split(/[,\s]+/)
    .map(Number);

  if (!Number.isFinite(bill)) {
    return "Use: bill, tip%, people — example: 1000, 10, 2";
  }

  const tipAmount = bill * tip / 100;
  const total = bill + tipAmount;

  return `Tip: ${tipAmount.toFixed(2)}\nTotal: ${total.toFixed(2)}\nPer person: ${(total / people).toFixed(2)}`;
}

function convertTemperature(text) {
  const parts = text.trim().split(/[,\s]+/);
  const value = Number(parts[0]);
  const from = (parts[1] || "C").toUpperCase();

  if (!Number.isFinite(value)) {
    return "Use: value, unit — example: 100, C";
  }

  if (from === "C") {
    return `Fahrenheit: ${(value * 9 / 5 + 32).toFixed(2)}\nKelvin: ${(value + 273.15).toFixed(2)}`;
  }

  if (from === "F") {
    return `Celsius: ${((value - 32) * 5 / 9).toFixed(2)}\nKelvin: ${(((value - 32) * 5 / 9) + 273.15).toFixed(2)}`;
  }

  if (from === "K") {
    return `Celsius: ${(value - 273.15).toFixed(2)}\nFahrenheit: ${((value - 273.15) * 9 / 5 + 32).toFixed(2)}`;
  }

  return "Unit must be C, F or K.";
}

function convertUnits(text) {
  const parts = text.trim().split(/[,\s]+/);

  const value = Number(parts[0]);
  const from = (parts[1] || "").toLowerCase();

  if (!Number.isFinite(value)) {
    return "Use: value, unit — example: 10, km";
  }

  const conversions = {
    km: {
      m: value * 1000,
      mi: value * 0.621371,
      ft: value * 3280.84,
    },
    m: {
      km: value / 1000,
      ft: value * 3.28084,
      mi: value * 0.000621371,
    },
    kg: {
      g: value * 1000,
      lb: value * 2.20462,
    },
    g: {
      kg: value / 1000,
      lb: value * 0.00220462,
    },
  };

  const result = conversions[from];

  if (!result) {
    return "Supported units: km, m, kg, g";
  }

  return Object.entries(result)
    .map(([unit, val]) => `${unit}: ${val}`)
    .join("\n");
}

function numberToWords(num) {
  if (!Number.isFinite(num)) return "Enter a valid number.";

  if (num === 0) return "Zero";

  if (num < 0) return "Minus " + numberToWords(-num);

  const ones = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];

  const tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];

  function under1000(n) {
    let s = "";

    if (n >= 100) {
      s += ones[Math.floor(n / 100)] + " Hundred ";
      n %= 100;
    }

    if (n >= 20) {
      s += tens[Math.floor(n / 10)] + " ";
      n %= 10;
    }

    if (n > 0) s += ones[n] + " ";

    return s.trim();
  }

  let n = Math.floor(num);
  let result = "";

  const millions = Math.floor(n / 1000000);

  if (millions) {
    result += under1000(millions) + " Million ";
    n %= 1000000;
  }

  const thousands = Math.floor(n / 1000);

  if (thousands) {
    result += under1000(thousands) + " Thousand ";
    n %= 1000;
  }

  if (n) result += under1000(n);

  return result.trim();
}

function numberToRoman(num) {
  if (!Number.isInteger(num) || num < 1 || num > 3999) {
    return "Enter an integer from 1 to 3999.";
  }

  const values = [
    [1000, "M"],
    [900, "CM"],
    [500, "D"],
    [400, "CD"],
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];

  let result = "";

  for (const [value, symbol] of values) {
    while (num >= value) {
      result += symbol;
      num -= value;
    }
  }

  return result;
}

function generateNames(text, type) {
  const base =
    text
      .trim()
      .split(/\s+/)
      .filter(Boolean)[0] || "Smart";

  return [
    `${base}${type}Hub`,
    `${base}${type}Pro`,
    `${base}Studio`,
    `${base}Labs`,
    `Get${base}`,
    `${base}Works`,
    `${base}Plus`,
    `${base}Flow`,
    `${base}Cloud`,
    `${base}Master`,
  ].join("\n");
}

function csvToJson(csv) {
  const lines = csv.trim().split(/\r?\n/);

  if (!lines.length) return [];

  const headers = lines[0].split(",").map((x) => x.trim());

  return lines.slice(1).map((line) => {
    const values = line.split(",");

    return Object.fromEntries(
      headers.map((h, i) => [
        h,
        (values[i] || "").trim(),
      ])
    );
  });
}

function jsonToCsv(text) {
  const data = JSON.parse(text);

  if (!Array.isArray(data) || !data.length) {
    throw new Error("JSON must be a non-empty array.");
  }

  const headers = Object.keys(data[0]);

  const rows = data.map((obj) =>
    headers
      .map((h) =>
        `"${String(obj[h] ?? "").replace(/"/g, '""')}"`
      )
      .join(",")
  );

  return [
    headers.join(","),
    ...rows,
  ].join("\n");
}

function downloadText(text, filename) {
  const blob = new Blob([text], {
    type: "text/plain;charset=utf-8",
  });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();

  URL.revokeObjectURL(url);
}

/* =========================================================
   START
========================================================= */

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element not found.");
}

createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
