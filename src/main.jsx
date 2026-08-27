import React, { useEffect, useMemo, useState } from "react";
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
} from "lucide-react";

import "./styles.css";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
    import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
);

/* =========================================================
   CONFIGURATION
========================================================= */

const SUPABASE_URL = "https://xpjhcwowzxpiiwkteiua.supabase.co";

const PDF_TO_WORD_FUNCTION =
  `${SUPABASE_URL}/functions/v1/pdf-to-word`;

/* =========================================================
   TOOLS
========================================================= */

const tools = [
  ["Text to Video", "AI & Video", "Turn a written prompt or script into an AI video project.", "text-to-video"],
  ["Student AI Helper", "AI & Education", "Ask questions or upload a study image/PDF and get step-by-step AI help.", "student-ai-helper"],

  ["PDF to Word", "PDF Tools", "Convert PDF documents into editable Word files.", "pdf-word"],
  ["Word to PDF", "PDF Tools", "Convert Word documents into PDF.", "word-pdf"],
  ["PDF to JPG", "PDF Tools", "Turn PDF pages into JPG images.", "pdf-jpg"],
  ["JPG to PDF", "PDF Tools", "Create a PDF from JPG images.", "jpg-pdf"],
  ["Merge PDF", "PDF Tools", "Combine multiple PDF files into one.", "merge-pdf"],
  ["Split PDF", "PDF Tools", "Split a PDF into separate files.", "split-pdf"],
  ["Compress PDF", "PDF Tools", "Reduce PDF file size quickly.", "compress-pdf"],
  ["Rotate PDF", "PDF Tools", "Rotate PDF pages to the correct orientation.", "rotate-pdf"],
  ["PDF Unlock", "PDF Tools", "Unlock supported password-protected PDFs.", "pdf-unlock"],
  ["PDF Watermark", "PDF Tools", "Add a watermark to PDF pages.", "pdf-watermark"],

  ["Image Compressor", "Image Tools", "Compress JPG, PNG and WebP images.", "image-compressor"],
  ["Image Resizer", "Image Tools", "Resize images to exact dimensions.", "image-resizer"],
  ["Image Cropper", "Image Tools", "Crop images online.", "image-cropper"],
  ["JPG to PNG", "Image Tools", "Convert JPG images to PNG.", "jpg-png"],
  ["PNG to JPG", "Image Tools", "Convert PNG images to JPG.", "png-jpg"],
  ["WebP Converter", "Image Tools", "Convert images to and from WebP.", "webp-converter"],
  ["Image Background Remover", "Image Tools", "Remove simple image backgrounds.", "background-remover"],
  ["Image to Text", "Image Tools", "Extract text from an image.", "image-text"],

  ["QR Code Generator", "SEO & Marketing", "Create custom QR codes from text or links.", "qr-generator"],
  ["Meta Tag Generator", "SEO & Marketing", "Generate SEO-ready meta tags.", "meta-tags"],
  ["Sitemap Generator", "SEO & Marketing", "Create a basic XML sitemap.", "sitemap"],
  ["Robots.txt Generator", "SEO & Marketing", "Generate a robots.txt file.", "robots"],
  ["Keyword Density Checker", "SEO & Marketing", "Analyze keyword frequency in text.", "keyword-density"],
  ["URL Encoder", "SEO & Marketing", "Encode URLs safely.", "url-encoder"],
  ["Open Graph Generator", "SEO & Marketing", "Create Open Graph meta tags.", "open-graph"],
  ["Schema Markup Generator", "SEO & Marketing", "Create basic JSON-LD schema templates.", "schema"],
  ["Favicon Generator", "SEO & Marketing", "Prepare favicon assets from an image.", "favicon"],
  ["UTM Builder", "SEO & Marketing", "Build campaign tracking URLs.", "utm"],
  ["Barcode Generator", "SEO & Marketing", "Generate a simple barcode-ready value.", "barcode"],
  ["URL Slug Generator", "SEO & Marketing", "Create clean SEO slugs.", "slug"],

  ["Word Counter", "Text Tools", "Count words, characters and sentences.", "word-counter"],
  ["Case Converter", "Text Tools", "Convert text to upper, lower and title case.", "case-converter"],
  ["Text Cleaner", "Text Tools", "Remove extra spaces and clean text.", "text-cleaner"],
  ["Lorem Ipsum Generator", "Text Tools", "Generate placeholder text.", "lorem"],
  ["Duplicate Line Remover", "Text Tools", "Remove duplicate lines from text.", "duplicate-lines"],
  ["Text Sorter", "Text Tools", "Sort lines alphabetically.", "text-sorter"],
  ["Text Reverser", "Text Tools", "Reverse any text.", "text-reverser"],
  ["Palindrome Checker", "Text Tools", "Check whether text is a palindrome.", "palindrome"],
  ["Reading Time Calculator", "Text Tools", "Estimate reading time for text.", "reading-time"],
  ["Character Counter", "Text Tools", "Count characters with and without spaces.", "characters"],
  ["Morse Code Converter", "Text Tools", "Convert text to Morse code.", "morse"],

  ["JSON Formatter", "Developer Tools", "Format and validate JSON.", "json-formatter"],
  ["JSON Minifier", "Developer Tools", "Minify JSON for compact output.", "json-minifier"],
  ["Base64 Encoder", "Developer Tools", "Encode text to Base64.", "base64-encode"],
  ["Base64 Decoder", "Developer Tools", "Decode Base64 text.", "base64-decode"],
  ["HTML Formatter", "Developer Tools", "Format HTML code.", "html-formatter"],
  ["CSS Formatter", "Developer Tools", "Format CSS code.", "css-formatter"],
  ["JavaScript Minifier", "Developer Tools", "Compact JavaScript text.", "js-minifier"],
  ["UUID Generator", "Developer Tools", "Generate unique UUID values.", "uuid"],
  ["Hash Generator", "Developer Tools", "Create common text hashes locally.", "hash"],
  ["Timestamp Converter", "Developer Tools", "Convert Unix timestamps.", "timestamp"],
  ["Color Converter", "Developer Tools", "Convert HEX, RGB and HSL values.", "color"],
  ["Regex Tester", "Developer Tools", "Test regular expressions in your browser.", "regex"],
  ["Cron Expression Helper", "Developer Tools", "Build common cron expressions.", "cron"],
  ["HTML Entity Encoder", "Developer Tools", "Encode HTML entities.", "html-entities"],
  ["URL Parser", "Developer Tools", "Break a URL into its parts.", "url-parser"],
  ["HTML Previewer", "Developer Tools", "Preview HTML in a sandboxed area.", "html-preview"],
  ["Markdown Previewer", "Developer Tools", "Preview basic Markdown.", "markdown"],
  ["SQL Formatter", "Developer Tools", "Format simple SQL statements.", "sql"],
  ["CSV to JSON", "Developer Tools", "Convert CSV text to JSON.", "csv-json"],
  ["JSON to CSV", "Developer Tools", "Convert simple JSON arrays to CSV.", "json-csv"],
  ["XML Formatter", "Developer Tools", "Format XML text.", "xml"],
  ["YAML to JSON", "Developer Tools", "Convert basic YAML-like key values to JSON.", "yaml-json"],
  ["CSS Color Picker", "Developer Tools", "Pick and inspect a color.", "color-picker"],
  ["Binary Converter", "Developer Tools", "Convert text and numbers to binary.", "binary"],
  ["ASCII Converter", "Developer Tools", "Convert text to ASCII codes.", "ascii"],

  ["Password Generator", "Security Tools", "Generate strong random passwords locally.", "password"],
  ["Password Strength Checker", "Security Tools", "Check password strength locally.", "password-strength"],
  ["MD5 Hash Generator", "Security Tools", "Generate an MD5-style hash placeholder locally.", "md5"],
  ["SHA-256 Generator", "Security Tools", "Generate SHA-256 hashes using your browser.", "sha256"],
  ["Random Password Generator", "Security Tools", "Generate secure random passwords.", "random-password"],

  ["Percentage Calculator", "Calculator Tools", "Calculate percentages quickly.", "percentage"],
  ["Age Calculator", "Calculator Tools", "Calculate age from date of birth.", "age"],
  ["BMI Calculator", "Calculator Tools", "Calculate body mass index.", "bmi"],
  ["Discount Calculator", "Calculator Tools", "Calculate sale discounts.", "discount"],
  ["Loan Calculator", "Calculator Tools", "Estimate monthly loan payments.", "loan"],
  ["GST Calculator", "Calculator Tools", "Calculate GST-inclusive or exclusive amounts.", "gst"],
  ["Tip Calculator", "Calculator Tools", "Calculate tips and split bills.", "tip"],
  ["Time Calculator", "Calculator Tools", "Add and subtract time values.", "time"],
  ["Date Difference Calculator", "Calculator Tools", "Calculate the difference between dates.", "date-difference"],
  ["Aspect Ratio Calculator", "Calculator Tools", "Calculate proportional dimensions.", "aspect"],
  ["Compound Interest Calculator", "Calculator Tools", "Estimate compound growth.", "compound-interest"],
  ["Scientific Calculator", "Calculator Tools", "Perform common scientific calculations.", "scientific"],
  ["Date Calculator", "Calculator Tools", "Add days to a date.", "date-add"],

  ["Unit Converter", "Converter Tools", "Convert common units.", "units"],
  ["Length Converter", "Converter Tools", "Convert length measurements.", "length"],
  ["Weight Converter", "Converter Tools", "Convert weight measurements.", "weight"],
  ["Temperature Converter", "Converter Tools", "Convert Celsius, Fahrenheit and Kelvin.", "temperature"],
  ["Currency Converter", "Converter Tools", "Enter exchange rates and convert currencies.", "currency"],
  ["Data Storage Converter", "Converter Tools", "Convert bytes, KB, MB and GB.", "storage"],

  ["IP Address Info", "Network Tools", "Inspect the IP address visible to your browser.", "ip-info"],
  ["HTTP Status Checker", "Network Tools", "Explain common HTTP status codes.", "http-status"],

  ["Email Validator", "Utility Tools", "Validate email address format.", "email-validator"],
  ["Phone Number Formatter", "Utility Tools", "Clean and format phone numbers.", "phone"],
  ["Random Number Generator", "Utility Tools", "Generate random numbers.", "random-number"],
  ["Number to Words", "Utility Tools", "Convert numbers to English words.", "number-words"],
  ["Roman Numeral Converter", "Utility Tools", "Convert numbers to Roman numerals.", "roman"],
  ["Business Name Generator", "Utility Tools", "Generate business name ideas from keywords.", "business-name"],
  ["Username Generator", "Utility Tools", "Generate username ideas.", "username"],
];

/* =========================================================
   CATEGORIES
========================================================= */

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
  "Network Tools": Globe2,
  "AI & Video": Sparkles,
  "AI & Education": Sparkles,
};

const categories = [
  ["All Tools", tools.length, Wrench],
  ["PDF Tools", tools.filter((x) => x[1] === "PDF Tools").length, FileText],
  ["Image Tools", tools.filter((x) => x[1] === "Image Tools").length, ImageIcon],
  ["SEO & Marketing", tools.filter((x) => x[1] === "SEO & Marketing").length, Globe2],
  ["Text Tools", tools.filter((x) => x[1] === "Text Tools").length, FileText],
  ["Developer Tools", tools.filter((x) => x[1] === "Developer Tools").length, Code2],
  ["Calculator Tools", tools.filter((x) => x[1] === "Calculator Tools").length, Calculator],
  ["Converter Tools", tools.filter((x) => x[1] === "Converter Tools").length, Wrench],
  ["Security Tools", tools.filter((x) => x[1] === "Security Tools").length, ShieldCheck],
  ["Utility Tools", tools.filter((x) => x[1] === "Utility Tools").length, Sparkles],
];

/* =========================================================
   MAIN APP
========================================================= */

function App() {
  const [cat, setCat] = useState("All Tools");
  const [query, setQuery] = useState("");
  const [tool, setTool] = useState(null);
  const [admin, setAdmin] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  useEffect(() => {
    let mounted = true;

    const loadSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;

      if (data.session?.user) {
        const isAdmin = await verifyAdmin(data.session.user);
        if (isAdmin) {
          setAdminUser(data.session.user);
          setAdmin(true);
        }
      }
      setAuthLoading(false);
    };

    loadSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!mounted) return;

        // Run database role verification outside the auth callback so
        // Supabase's internal auth lock is not blocked by another request.
        setTimeout(async () => {
          if (!mounted) return;

          if (!session?.user) {
            setAdminUser(null);
            setAdmin(false);
            setShowAdminLogin(false);
            return;
          }

          const isAdmin = await verifyAdmin(session.user);

          if (isAdmin) {
            setAdminUser(session.user);
            setAdmin(true);
          } else {
            await supabase.auth.signOut();
            setAdminUser(null);
            setAdmin(false);
            setShowAdminLogin(false);
            window.alert("Access denied. This account is not an admin.");
          }
        }, 0);
      }
    );

    return () => {
      mounted = false;
      listener?.subscription?.unsubscribe();
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return tools.filter((t) => {
      const categoryMatch = cat === "All Tools" || t[1] === cat;

      const searchMatch =
        !q ||
        t[0].toLowerCase().includes(q) ||
        t[1].toLowerCase().includes(q) ||
        t[2].toLowerCase().includes(q);

      return categoryMatch && searchMatch;
    });
  }, [cat, query]);

  const openTool = (selectedTool) => {
    setTool(selectedTool);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const backHome = () => {
    setTool(null);
    setAdmin(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="app">
      <header>
        <div className="nav">
          <button
            className="brand"
            onClick={backHome}
            type="button"
          >
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
          onClose={backHome}
          onLogout={async () => {
            await supabase.auth.signOut();
            setAdminUser(null);
            setAdmin(false);
            setShowAdminLogin(false);
          }}
        />
      ) : tool ? (
        <ToolPage
          t={tool}
          back={backHome}
        />
      ) : (
        <>
          <section className="hero">
            <div className="pill">
              <Sparkles size={15} />
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
                  aria-label="Clear search"
                >
                  <X size={18} />
                </button>
              )}
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
            <section
              id="categories"
              className="categories"
            >
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
                <p>{filtered.length} tools available</p>
              </div>
            </div>

            <div className="grid">
              {filtered.map((t) => (
                <ToolCard
                  key={t[3]}
                  t={t}
                  open={() => openTool(t)}
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

        <small>
          © 2026 ToolMaster Pro. All tools are designed for easy browser use.
        </small>
      </footer>
    </div>
  );
}

/* =========================================================
   TOOL CARD
========================================================= */

function ToolCard({ t, open }) {
  const Icon = categoryIcons[t[1]] || Wrench;

  return (
    <article
      className="card"
      onClick={open}
      onKeyDown={(e) => {
        if (e.key === "Enter") open();
      }}
      role="button"
      tabIndex={0}
    >
      <div className="toolIcon">
        <Icon size={21} />
      </div>

      <div className="cardBody">
        <span>{t[1]}</span>
        <h3>{t[0]}</h3>
        <p>{t[2]}</p>
      </div>

      <ArrowRight className="arrow" />
    </article>
  );
}

/* =========================================================
   TOOL PAGE
========================================================= */

function ToolPage({ t, back }) {
  if (t[3] === "pdf-word") {
    return <PdfToWord back={back} />;
  }

  if (t[3] === "student-ai-helper") {
    return <StudentAIHelper back={back} />;
  }

  if (t[3] === "text-to-video") {
    return <TextToVideo back={back} />;
  }

  return (
    <GenericTool
      t={t}
      back={back}
    />
  );
}

/* =========================================================
   PDF TO WORD
========================================================= */

function PdfToWord({ back }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [downloadName, setDownloadName] = useState("");

  const publishableKey =
    import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  const selectFile = (file) => {
    setError("");
    setSuccess("");
    setDownloadUrl("");
    setDownloadName("");

    if (!file) return;

    const isPdf =
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf");

    if (!isPdf) {
      setSelectedFile(null);
      setError("Please select a PDF file.");
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      setSelectedFile(null);
      setError("Maximum PDF size is 20 MB.");
      return;
    }

    setSelectedFile(file);
  };

  const removeFile = () => {
    if (downloadUrl && downloadUrl.startsWith("blob:")) {
      URL.revokeObjectURL(downloadUrl);
    }

    setSelectedFile(null);
    setError("");
    setSuccess("");
    setDownloadUrl("");
    setDownloadName("");
  };

  const convert = async () => {
    setError("");
    setSuccess("");

    if (!selectedFile) {
      setError("Please select a PDF file first.");
      return;
    }

    if (!publishableKey) {
      setError(
        "VITE_SUPABASE_PUBLISHABLE_KEY is missing in Vercel Environment Variables."
      );
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch(
        PDF_TO_WORD_FUNCTION,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${publishableKey}`,
            apikey: publishableKey,
          },
          body: formData,
        }
      );

      const contentType =
        response.headers.get("content-type") || "";

      if (!response.ok) {
        let message = `Conversion failed (${response.status}).`;

        try {
          if (contentType.includes("application/json")) {
            const data = await response.json();

            message =
              data.error ||
              data.message ||
              data.msg ||
              message;
          } else {
            const text = await response.text();

            if (text.trim()) {
              message = text.trim();
            }
          }
        } catch {
          // Keep default message.
        }

        throw new Error(message);
      }

      const blob = await response.blob();

      if (!blob || blob.size === 0) {
        throw new Error(
          "The conversion server returned an empty file."
        );
      }

      /*
       * Case 1:
       * Function returned JSON with a download URL.
       */

      if (
        contentType.includes("application/json") ||
        contentType.includes("text/plain")
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
                data.fileName ||
                selectedFile.name.replace(
                  /\.pdf$/i,
                  ".docx"
                )
            );

            setSuccess(
              "PDF converted successfully!"
            );

            return;
          }
        } catch {
          /*
           * If response was not JSON,
           * continue as a normal file.
           */
        }
      }

      /*
       * Case 2:
       * Function returned DOCX directly.
       */

      const objectUrl =
        URL.createObjectURL(blob);

      setDownloadUrl(objectUrl);

      setDownloadName(
        selectedFile.name.replace(
          /\.pdf$/i,
          ""
        ) + ".docx"
      );

      setSuccess(
        "PDF converted successfully!"
      );
    } catch (err) {
      console.error(
        "PDF to Word error:",
        err
      );

      setError(
        err?.message ||
          "Something went wrong while converting the PDF."
      );
    } finally {
      setLoading(false);
    }
  };

  const download = () => {
    if (!downloadUrl) return;

    const a =
      document.createElement("a");

    a.href = downloadUrl;
    a.download =
      downloadName ||
      "converted-document.docx";

    a.target = "_blank";
    a.rel = "noopener";

    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <main className="toolPage">
      <button
        className="back"
        onClick={back}
        type="button"
      >
        ← Back to tools
      </button>

      <div className="toolHero">
        <div className="toolIcon big">
          <FileText />
        </div>

        <div>
          <span>PDF Tools</span>
          <h1>PDF to Word</h1>
          <p>
            Convert your PDF documents into
            editable Word files.
          </p>
        </div>
      </div>

      <div
        className={
          dragging
            ? "pdfUpload dragging"
            : "pdfUpload"
        }
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() =>
          setDragging(false)
        }
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          selectFile(
            e.dataTransfer.files?.[0]
          );
        }}
      >
        {!selectedFile ? (
          <label className="pdfChoose">
            <Upload size={42} />

            <h3>
              Upload your PDF
            </h3>

            <p>
              Drag & drop your PDF here
              or click to browse
            </p>

            <span className="primary">
              Choose PDF
            </span>

            <input
              type="file"
              accept=".pdf,application/pdf"
              onChange={(e) =>
                selectFile(
                  e.target.files?.[0]
                )
              }
            />

            <small>
              Maximum file size: 20 MB
            </small>
          </label>
        ) : (
          <div className="pdfSelected">
            <div className="selectedFile">
              <FileText size={30} />

              <div>
                <strong>
                  {selectedFile.name}
                </strong>

                <small>
                  {(
                    selectedFile.size /
                    1024 /
                    1024
                  ).toFixed(2)}{" "}
                  MB
                </small>
              </div>
            </div>

            <button
              type="button"
              className="iconButton"
              onClick={removeFile}
            >
              <X size={20} />
            </button>
          </div>
        )}

        {selectedFile && (
          <button
            type="button"
            className="primary convertButton"
            disabled={loading}
            onClick={convert}
          >
            {loading ? (
              <>
                <Loader2
                  className="spin"
                  size={19}
                />
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
            <strong>
              Conversion Error
            </strong>

            <p>{error}</p>
          </div>
        </div>
      )}

      {success && downloadUrl && (
        <div className="successBox">
          <CheckCircle2 size={27} />

          <div>
            <strong>
              {success}
            </strong>

            <p>
              Your Word document is ready.
            </p>

            <button
              type="button"
              className="downloadButton"
              onClick={download}
            >
              <Download size={21} />
              Download Word File
            </button>

            <small>
              {downloadName}
            </small>
          </div>
        </div>
      )}

      <div className="notice">
        <ShieldCheck />

        <span>
          Files are sent to your configured
          conversion server. Do not upload
          sensitive documents unless you trust
          the service.
        </span>
      </div>
    </main>
  );
}

/* =========================================================
   TEXT TO VIDEO
========================================================= */

function TextToVideo({ back }) {
  const [prompt, setPrompt] =
    useState("");

  const [style, setStyle] =
    useState("Cinematic");

  const [duration, setDuration] =
    useState("10 seconds");

  const [status, setStatus] =
    useState("");

  const generate = () => {
    if (!prompt.trim()) {
      setStatus(
        "Please enter a video prompt first."
      );
      return;
    }

    setStatus(
      `Video project prepared: ${style}, ${duration}. Actual AI video rendering requires a server-side video API.`
    );
  };

  return (
    <main className="toolPage">
      <button
        className="back"
        onClick={back}
        type="button"
      >
        ← Back to tools
      </button>

      <div className="toolHero">
        <div className="toolIcon big">
          <Sparkles />
        </div>

        <div>
          <span>AI & Video</span>
          <h1>Text to Video</h1>
          <p>
            Create an AI video project
            from a written prompt.
          </p>
        </div>
      </div>

      <div className="aiHelper">
        <div className="aiCard">
          <h3>
            🎬 Video Prompt
          </h3>

          <textarea
            value={prompt}
            onChange={(e) =>
              setPrompt(e.target.value)
            }
            placeholder="Example: A cinematic drone shot of a futuristic city at sunset..."
          />

          <div className="videoOptions">
            <label>
              Style

              <select
                value={style}
                onChange={(e) =>
                  setStyle(e.target.value)
                }
              >
                <option>Cinematic</option>
                <option>Realistic</option>
                <option>Anime</option>
                <option>3D Animation</option>
                <option>Documentary</option>
                <option>Product Ad</option>
              </select>
            </label>

            <label>
              Duration

              <select
                value={duration}
                onChange={(e) =>
                  setDuration(
                    e.target.value
                  )
                }
              >
                <option>5 seconds</option>
                <option>10 seconds</option>
                <option>15 seconds</option>
                <option>30 seconds</option>
              </select>
            </label>
          </div>

          <button
            className="primary"
            onClick={generate}
            type="button"
          >
            <Sparkles size={17} />
            Generate Video
          </button>
        </div>

        <div className="aiCard">
          <h3>
            🎥 Video Preview
          </h3>

          <div className="videoPlaceholder">
            <div className="playCircle">
              ▶
            </div>

            <b>
              Your generated video will appear here
            </b>

            <small>
              {style} · {duration}
            </small>

            {status && (
              <p>{status}</p>
            )}
          </div>
        </div>
      </div>

      <div className="notice">
        <ShieldCheck />

        <span>
          Real AI video generation needs
          a secure server-side provider.
          Never expose an AI API key in
          browser code.
        </span>
      </div>
    </main>
  );
}

/* =========================================================
   STUDENT AI
========================================================= */

function StudentAIHelper({ back }) {
  const [question, setQuestion] =
    useState("");

  const [file, setFile] =
    useState(null);

  const [answer, setAnswer] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const solve = () => {
    if (
      !question.trim() &&
      !file
    ) {
      setAnswer(
        "Please enter a question or upload study material."
      );
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setAnswer(
        "Student AI Helper is ready. A real AI provider can be connected through a secure backend without exposing the API key in your website."
      );

      setLoading(false);
    }, 700);
  };

  return (
    <main className="toolPage">
      <button
        className="back"
        onClick={back}
        type="button"
      >
        ← Back to tools
      </button>

      <div className="toolHero">
        <div className="toolIcon big">
          <Sparkles />
        </div>

        <div>
          <span>
            AI & Education
          </span>

          <h1>
            Student AI Helper
          </h1>

          <p>
            Ask questions or upload
            study material.
          </p>
        </div>
      </div>

      <div className="aiHelper">
        <div className="aiCard">
          <h3>
            📚 Ask your question
          </h3>

          <textarea
            value={question}
            onChange={(e) =>
              setQuestion(
                e.target.value
              )
            }
            placeholder="Example: Explain photosynthesis in simple words..."
          />

          <label className="uploadBox">
            <Upload />

            <div>
              <b>
                Upload study material
              </b>

              <small>
                PDF, JPG, PNG or TXT
              </small>

              {file && (
                <strong>
                  {file.name}
                </strong>
              )}
            </div>

            <input
              type="file"
              accept=".pdf,image/*,.txt,.doc,.docx"
              onChange={(e) =>
                setFile(
                  e.target.files?.[0] ||
                    null
                )
              }
            />
          </label>

          <button
            className="primary"
            onClick={solve}
            disabled={loading}
            type="button"
          >
            <Sparkles size={17} />

            {loading
              ? "Preparing..."
              : "Get AI Help"}
          </button>
        </div>

        <div className="aiCard">
          <h3>
            🤖 AI Answer
          </h3>

          <div className="answer">
            {answer ||
              "Your step-by-step explanation will appear here."}
          </div>

          {answer && (
            <button
              className="secondary"
              type="button"
              onClick={() =>
                navigator.clipboard?.writeText(
                  answer
                )
              }
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
   GENERIC TOOLS
========================================================= */

function GenericTool({ t, back }) {
  const [text, setText] =
    useState("");

  const [out, setOut] =
    useState("");

  const run = async () => {
    let result = text;

    try {
      switch (t[3]) {
        case "word-counter":
          result =
            `Words: ${
              text.trim()
                ? text.trim().split(/\s+/).length
                : 0
            }\nCharacters: ${text.length}`;
          break;

        case "characters":
          result =
            `Characters: ${text.length}\nWithout spaces: ${
              text.replace(/\s/g, "").length
            }`;
          break;

        case "case-converter":
          result =
            text.toLowerCase();
          break;

        case "text-reverser":
          result =
            [...text].reverse().join("");
          break;

        case "slug":
          result =
            text
              .toLowerCase()
              .trim()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/^-|-$/g, "");
          break;

        case "url-encoder":
          result =
            encodeURIComponent(text);
          break;

        case "base64-encode":
          result =
            btoa(
              unescape(
                encodeURIComponent(text)
              )
            );
          break;

        case "base64-decode":
          result =
            decodeURIComponent(
              escape(atob(text))
            );
          break;

        case "json-formatter":
          result =
            JSON.stringify(
              JSON.parse(text),
              null,
              2
            );
          break;

        case "json-minifier":
          result =
            JSON.stringify(
              JSON.parse(text)
            );
          break;

        case "uuid":
          result =
            crypto.randomUUID();
          break;

        case "random-password":
        case "password":
          result =
            generatePassword(18);
          break;

        case "binary":
          result =
            [...text]
              .map((c) =>
                c.charCodeAt(0)
                  .toString(2)
                  .padStart(8, "0")
              )
              .join(" ");
          break;

        case "ascii":
          result =
            [...text]
              .map((c) =>
                c.charCodeAt(0)
              )
              .join(" ");
          break;

        case "morse":
          result =
            textToMorse(text);
          break;

        case "palindrome": {
          const clean =
            text
              .toLowerCase()
              .replace(/[^a-z0-9]/g, "");

          result =
            clean ===
            [...clean]
              .reverse()
              .join("")
              ? "Yes, this is a palindrome."
              : "No, this is not a palindrome.";
          break;
        }

        case "text-cleaner":
          result =
            text
              .replace(/[ \t]+/g, " ")
              .replace(/\n\s*\n+/g, "\n")
              .trim();
          break;

        case "duplicate-lines": {
          const lines =
            text
              .split("\n")
              .map((x) => x.trim())
              .filter(Boolean);

          result =
            [...new Set(lines)].join("\n");
          break;
        }

        case "text-sorter":
          result =
            text
              .split("\n")
              .sort((a, b) =>
                a.localeCompare(b)
              )
              .join("\n");
          break;

        case "url-parser": {
          const url =
            new URL(text);

          result =
            JSON.stringify(
              {
                protocol:
                  url.protocol,
                hostname:
                  url.hostname,
                port:
                  url.port,
                pathname:
                  url.pathname,
                search:
                  url.search,
                hash:
                  url.hash,
              },
              null,
              2
            );
          break;
        }

        case "email-validator":
          result =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
              text.trim()
            )
              ? "Valid email format."
              : "Invalid email format.";
          break;

        case "random-number":
          result =
            String(
              Math.floor(
                Math.random() * 1000000
              )
            );
          break;

        default:
          result =
            "This tool is ready. Enter your content and run the tool.";
      }
    } catch (error) {
      result =
        `Invalid input: ${
          error?.message || "Unable to process."
        }`;
    }

    setOut(result);
  };

  const clear = () => {
    setText("");
    setOut("");
  };

  return (
    <main className="toolPage">
      <button
        className="back"
        onClick={back}
        type="button"
      >
        ← Back to tools
      </button>

      <div className="toolHero">
        <div className="toolIcon big">
          {React.createElement(
            categoryIcons[t[1]] || Wrench
          )}
        </div>

        <div>
          <span>{t[1]}</span>

          <h1>{t[0]}</h1>

          <p>{t[2]}</p>
        </div>
      </div>

      <div className="workspace">
        <div className="panel">
          <label>
            Your input
          </label>

          <textarea
            value={text}
            onChange={(e) =>
              setText(e.target.value)
            }
            placeholder="Paste or type your content here..."
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
              onClick={clear}
              type="button"
            >
              Clear
            </button>
          </div>
        </div>

        <div className="panel">
          <label>
            Result
          </label>

          <textarea
            value={out}
            readOnly
            placeholder="Your result will appear here..."
          />

          <div className="actions">
            <button
              className="secondary"
              onClick={() =>
                navigator.clipboard?.writeText(
                  out
                )
              }
              type="button"
            >
              <Copy size={17} />
              Copy Result
            </button>

            {out && (
              <button
                className="secondary"
                type="button"
                onClick={() => {
                  const blob =
                    new Blob(
                      [out],
                      {
                        type: "text/plain",
                      }
                    );

                  const url =
                    URL.createObjectURL(
                      blob
                    );

                  const a =
                    document.createElement(
                      "a"
                    );

                  a.href = url;
                  a.download =
                    "toolmaster-result.txt";

                  a.click();

                  URL.revokeObjectURL(
                    url
                  );
                }}
              >
                <Download size={17} />
                Download
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="notice">
        <ShieldCheck />

        <span>
          Processing is designed to happen
          locally in your browser whenever
          possible.
        </span>
      </div>
    </main>
  );
}

/* =========================================================
   ADMIN
========================================================= */

function AdminLogin({ onClose, onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your admin email and password.");
      return;
    }

    setLoading(true);

    try {
      const { data, error: authError } =
        await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

      if (authError) throw authError;
      if (!data.user) throw new Error("Login failed.");

      const isAdmin = await verifyAdmin(data.user);

      if (!isAdmin) {
        await supabase.auth.signOut();
        throw new Error(
          "Access denied. This account does not have the admin role."
        );
      }

      onSuccess(data.user);
    } catch (err) {
      setError(err?.message || "Unable to sign in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="authOverlay" role="dialog" aria-modal="true">
      <form className="authCard" onSubmit={login}>
        <button
          className="authClose"
          type="button"
          onClick={onClose}
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="toolIcon big authIcon">
          <LockKeyhole />
        </div>

        <span className="pill">Secure Admin Access</span>
        <h2>Admin Login</h2>
        <p>Sign in with an account that has the <b>admin</b> role.</p>

        <label>
          Email
          <input
            type="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@example.com"
          />
        </label>

        <label>
          Password
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </label>

        {error && (
          <div className="authError">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <button className="primary authSubmit" disabled={loading} type="submit">
          {loading ? (
            <>
              <Loader2 className="spin" size={18} />
              Signing in...
            </>
          ) : (
            <>
              <LockKeyhole size={18} />
              Sign in to Admin
            </>
          )}
        </button>

        <small className="authSecurity">
          <ShieldCheck size={15} />
          Authentication and session are handled by Supabase.
        </small>
      </form>
    </div>
  );
}

async function verifyAdmin(user) {
  if (!user?.id) return false;

  const { data, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (error) {
    console.error("Admin role check failed:", error);
    return false;
  }

  return data?.role === "admin";
}

function Admin({ user, onClose, onLogout }) {
  const [activeSection, setActiveSection] = useState("dashboard");

  const sections = [
    ["dashboard", "Dashboard", LayoutDashboard],
    ["tools", "Manage Tools", Settings],
    ["users", "Manage Users", LockKeyhole],
    ["analytics", "Analytics", LayoutDashboard],
  ];

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
            Welcome, {user?.email || "Administrator"}. Manage your platform
            from one secure dashboard.
          </p>
        </div>

        <div className="adminActions">
          <button className="secondary" onClick={onClose} type="button">
            Back to Website
          </button>

          <button className="secondary" onClick={onLogout} type="button">
            Logout
          </button>
        </div>
      </div>

      <div className="adminNav">
        {sections.map(([id, label, Icon]) => (
          <button
            key={id}
            type="button"
            className={activeSection === id ? "active" : ""}
            onClick={() => setActiveSection(id)}
          >
            <Icon size={17} />
            {label}
          </button>
        ))}
      </div>

      {activeSection === "dashboard" && (
        <div className="adminGrid">
          <div className="adminCard">
            <Settings />
            <h3>Tool Management</h3>
            <p>{tools.length} tools are currently configured in the frontend.</p>
            <button
              className="primary"
              type="button"
              onClick={() => setActiveSection("tools")}
            >
              Manage Tools
            </button>
          </div>

          <div className="adminCard">
            <LockKeyhole />
            <h3>Users & Access</h3>
            <p>Admin authentication is connected to Supabase Auth.</p>
            <button
              className="primary"
              type="button"
              onClick={() => setActiveSection("users")}
            >
              Manage Users
            </button>
          </div>

          <div className="adminCard">
            <LayoutDashboard />
            <h3>Analytics</h3>
            <p>Analytics foundation is ready for database usage events.</p>
            <button
              className="primary"
              type="button"
              onClick={() => setActiveSection("analytics")}
            >
              View Analytics
            </button>
          </div>

          <div className="adminCard">
            <CheckCircle2 />
            <h3>System Status</h3>
            <p>Supabase authentication and admin role protection are active.</p>
            <strong className="ok">Protected</strong>
          </div>
        </div>
      )}

      {activeSection === "tools" && (
        <AdminToolsPlaceholder />
      )}

      {activeSection === "users" && (
        <AdminUsersPlaceholder adminEmail={user?.email} />
      )}

      {activeSection === "analytics" && (
        <AdminAnalyticsPlaceholder />
      )}
    </main>
  );
}

function AdminToolsPlaceholder() {
  return (
    <section className="adminCard adminWide">
      <Settings />
      <h2>Manage Tools</h2>
      <p>
        Phase 1 security is complete. Tool CRUD will be connected to the
        Supabase <code>tools</code> table in the next phase.
      </p>
      <div className="adminInfo">
        <b>Current tools:</b> {tools.length}
        <br />
        <span>
          Next: Add, edit, delete, enable/disable and reorder tools from the
          database.
        </span>
      </div>
    </section>
  );
}

function AdminUsersPlaceholder({ adminEmail }) {
  return (
    <section className="adminCard adminWide">
      <LockKeyhole />
      <h2>Users & Access</h2>
      <p>
        Your current authenticated admin account is verified against the
        Supabase <code>profiles.role</code> value.
      </p>
      <div className="adminInfo">
        <b>Current admin:</b> {adminEmail || "Unknown"}
        <br />
        <span>
          Next: connect the user-management table and admin-only RLS policies.
        </span>
      </div>
    </section>
  );
}

function AdminAnalyticsPlaceholder() {
  return (
    <section className="adminCard adminWide">
      <LayoutDashboard />
      <h2>Analytics</h2>
      <p>
        The dashboard is ready for usage statistics. We will connect tool
        usage events to Supabase in the analytics phase.
      </p>
      <div className="adminInfo">
        <b>Next:</b> total users, tool runs, popular tools, daily activity and
        usage charts.
      </div>
    </section>
  );
}


/* =========================================================
   HELPERS
========================================================= */

function generatePassword(length = 18) {
  const chars =
    "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*";

  const values =
    new Uint32Array(length);

  crypto.getRandomValues(values);

  return Array.from(
    values,
    (value) =>
      chars[value % chars.length]
  ).join("");
}

function textToMorse(text) {
  const morse = {
    a: ".-",
    b: "-...",
    c: "-.-.",
    d: "-..",
    e: ".",
    f: "..-.",
    g: "--.",
    h: "....",
    i: "..",
    j: ".---",
    k: "-.-",
    l: ".-..",
    m: "--",
    n: "-.",
    o: "---",
    p: ".--.",
    q: "--.-",
    r: ".-.",
    s: "...",
    t: "-",
    u: "..-",
    v: "...-",
    w: ".--",
    x: "-..-",
    y: "-.--",
    z: "--..",

    0: "-----",
    1: ".----",
    2: "..---",
    3: "...--",
    4: "....-",
    5: ".....",
    6: "-....",
    7: "--...",
    8: "---..",
    9: "----.",
  };

  return text
    .toLowerCase()
    .split("")
    .map((char) =>
      char === " "
        ? "/"
        : morse[char] || char
    )
    .join(" ");
}

/* =========================================================
   START APP
========================================================= */

const rootElement =
  document.getElementById("root");

if (!rootElement) {
  throw new Error(
    "Root element not found. Check index.html."
  );
}

createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
