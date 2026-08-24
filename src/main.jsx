 import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Search,
  Menu,
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
  Copy,
  Check,
  Settings,
  LayoutDashboard,
  Users,
  BarChart3,
  Moon,
  Sun,
  Heart,
  ChevronLeft,
  Trash2,
  Plus,
  RefreshCw,
} from "lucide-react";
import "./styles.css";

/* =========================================================
   TOOLS
========================================================= */

const tools = [
  ["Text to Video", "AI & Video", "Create an AI video project from a text prompt.", "text-to-video"],
  ["Student AI Helper", "AI & Education", "Get step-by-step help with study questions.", "student-ai-helper"],

  ["PDF to Word", "PDF Tools", "Convert PDF documents into editable Word files.", "pdf-word"],
  ["Word to PDF", "PDF Tools", "Convert Word documents into PDF.", "word-pdf"],
  ["PDF to JPG", "PDF Tools", "Convert PDF pages into JPG images.", "pdf-jpg"],
  ["JPG to PDF", "PDF Tools", "Create a PDF from JPG images.", "jpg-pdf"],
  ["Merge PDF", "PDF Tools", "Combine multiple PDF files.", "merge-pdf"],
  ["Split PDF", "PDF Tools", "Split a PDF into separate files.", "split-pdf"],
  ["Compress PDF", "PDF Tools", "Reduce PDF file size.", "compress-pdf"],
  ["Rotate PDF", "PDF Tools", "Rotate PDF pages.", "rotate-pdf"],
  ["PDF Unlock", "PDF Tools", "Unlock supported PDF files.", "pdf-unlock"],
  ["PDF Watermark", "PDF Tools", "Add watermarks to PDF pages.", "pdf-watermark"],

  ["Image Compressor", "Image Tools", "Compress JPG, PNG and WebP images.", "image-compressor"],
  ["Image Resizer", "Image Tools", "Resize images to exact dimensions.", "image-resizer"],
  ["Image Cropper", "Image Tools", "Crop images online.", "image-cropper"],
  ["JPG to PNG", "Image Tools", "Convert JPG images to PNG.", "jpg-png"],
  ["PNG to JPG", "Image Tools", "Convert PNG images to JPG.", "png-jpg"],
  ["WebP Converter", "Image Tools", "Convert images to and from WebP.", "webp-converter"],
  ["Image Background Remover", "Image Tools", "Remove simple image backgrounds.", "background-remover"],
  ["Image to Text", "Image Tools", "Extract text from images.", "image-text"],

  ["QR Code Generator", "SEO & Marketing", "Create QR codes from links or text.", "qr-generator"],
  ["Meta Tag Generator", "SEO & Marketing", "Generate SEO meta tags.", "meta-tags"],
  ["Sitemap Generator", "SEO & Marketing", "Create an XML sitemap.", "sitemap"],
  ["Robots.txt Generator", "SEO & Marketing", "Generate robots.txt.", "robots"],
  ["Keyword Density Checker", "SEO & Marketing", "Analyze keyword frequency.", "keyword-density"],
  ["URL Encoder", "SEO & Marketing", "Encode URLs safely.", "url-encoder"],
  ["Open Graph Generator", "SEO & Marketing", "Generate Open Graph tags.", "open-graph"],
  ["Schema Markup Generator", "SEO & Marketing", "Generate JSON-LD schema.", "schema"],
  ["Favicon Generator", "SEO & Marketing", "Prepare favicon assets.", "favicon"],
  ["UTM Builder", "SEO & Marketing", "Build UTM campaign URLs.", "utm"],
  ["URL Slug Generator", "SEO & Marketing", "Create clean SEO slugs.", "slug"],

  ["Word Counter", "Text Tools", "Count words and characters.", "word-counter"],
  ["Case Converter", "Text Tools", "Convert text case.", "case-converter"],
  ["Text Cleaner", "Text Tools", "Clean unnecessary spaces.", "text-cleaner"],
  ["Lorem Ipsum Generator", "Text Tools", "Generate placeholder text.", "lorem"],
  ["Duplicate Line Remover", "Text Tools", "Remove duplicate lines.", "duplicate-lines"],
  ["Text Sorter", "Text Tools", "Sort lines alphabetically.", "text-sorter"],
  ["Text Reverser", "Text Tools", "Reverse text.", "text-reverser"],
  ["Palindrome Checker", "Text Tools", "Check if text is a palindrome.", "palindrome"],
  ["Reading Time Calculator", "Text Tools", "Estimate reading time.", "reading-time"],
  ["Character Counter", "Text Tools", "Count characters.", "characters"],
  ["Morse Code Converter", "Text Tools", "Convert text to Morse code.", "morse"],

  ["JSON Formatter", "Developer Tools", "Format and validate JSON.", "json-formatter"],
  ["JSON Minifier", "Developer Tools", "Minify JSON.", "json-minifier"],
  ["Base64 Encoder", "Developer Tools", "Encode text to Base64.", "base64-encode"],
  ["Base64 Decoder", "Developer Tools", "Decode Base64 text.", "base64-decode"],
  ["HTML Formatter", "Developer Tools", "Format HTML.", "html-formatter"],
  ["CSS Formatter", "Developer Tools", "Format CSS.", "css-formatter"],
  ["JavaScript Minifier", "Developer Tools", "Compact JavaScript text.", "js-minifier"],
  ["UUID Generator", "Developer Tools", "Generate UUID values.", "uuid"],
  ["Hash Generator", "Developer Tools", "Create text hashes.", "hash"],
  ["Timestamp Converter", "Developer Tools", "Convert Unix timestamps.", "timestamp"],
  ["Color Converter", "Developer Tools", "Convert HEX, RGB and HSL.", "color"],
  ["Regex Tester", "Developer Tools", "Test regular expressions.", "regex"],
  ["Cron Expression Helper", "Developer Tools", "Build cron expressions.", "cron"],
  ["HTML Entity Encoder", "Developer Tools", "Encode HTML entities.", "html-entities"],
  ["URL Parser", "Developer Tools", "Parse URL components.", "url-parser"],
  ["HTML Previewer", "Developer Tools", "Preview HTML.", "html-preview"],
  ["Markdown Previewer", "Developer Tools", "Preview Markdown.", "markdown"],
  ["SQL Formatter", "Developer Tools", "Format SQL statements.", "sql"],
  ["CSV to JSON", "Developer Tools", "Convert CSV to JSON.", "csv-json"],
  ["JSON to CSV", "Developer Tools", "Convert JSON to CSV.", "json-csv"],
  ["XML Formatter", "Developer Tools", "Format XML.", "xml"],
  ["YAML to JSON", "Developer Tools", "Convert YAML-like data to JSON.", "yaml-json"],
  ["CSS Color Picker", "Developer Tools", "Pick a CSS color.", "color-picker"],
  ["Binary Converter", "Developer Tools", "Convert text to binary.", "binary"],
  ["ASCII Converter", "Developer Tools", "Convert text to ASCII.", "ascii"],

  ["Percentage Calculator", "Calculator Tools", "Calculate percentages.", "percentage"],
  ["Age Calculator", "Calculator Tools", "Calculate age.", "age"],
  ["BMI Calculator", "Calculator Tools", "Calculate BMI.", "bmi"],
  ["Discount Calculator", "Calculator Tools", "Calculate discounts.", "discount"],
  ["Loan Calculator", "Calculator Tools", "Estimate loan payments.", "loan"],
  ["GST Calculator", "Calculator Tools", "Calculate GST.", "gst"],
  ["Tip Calculator", "Calculator Tools", "Calculate tips.", "tip"],
  ["Time Calculator", "Calculator Tools", "Calculate time.", "time"],
  ["Aspect Ratio Calculator", "Calculator Tools", "Calculate image dimensions.", "aspect"],
  ["Compound Interest Calculator", "Calculator Tools", "Calculate compound interest.", "compound-interest"],
  ["Scientific Calculator", "Calculator Tools", "Perform scientific calculations.", "scientific"],
  ["Date Calculator", "Calculator Tools", "Add days to dates.", "date-add"],

  ["Unit Converter", "Converter Tools", "Convert common units.", "units"],
  ["Length Converter", "Converter Tools", "Convert length.", "length"],
  ["Weight Converter", "Converter Tools", "Convert weight.", "weight"],
  ["Temperature Converter", "Converter Tools", "Convert temperature.", "temperature"],
  ["Currency Converter", "Converter Tools", "Convert currencies using your rate.", "currency"],
  ["Data Storage Converter", "Converter Tools", "Convert bytes and storage units.", "storage"],

  ["Password Generator", "Security Tools", "Generate strong passwords.", "password"],
  ["Password Strength Checker", "Security Tools", "Check password strength.", "password-strength"],
  ["SHA-256 Generator", "Security Tools", "Generate SHA-256 hashes.", "sha256"],
  ["MD5 Hash Generator", "Security Tools", "Generate MD5-style hash placeholder.", "md5"],
  ["Random Password Generator", "Security Tools", "Generate random passwords.", "random-password"],

  ["IP Address Info", "Network Tools", "View browser-visible IP information.", "ip-info"],
  ["HTTP Status Checker", "Network Tools", "Explain HTTP status codes.", "http-status"],

  ["Email Validator", "Utility Tools", "Validate email format.", "email-validator"],
  ["Phone Number Formatter", "Utility Tools", "Format phone numbers.", "phone"],
  ["Date Difference Calculator", "Utility Tools", "Calculate date differences.", "date-difference"],
  ["Random Number Generator", "Utility Tools", "Generate random numbers.", "random-number"],
  ["Number to Words", "Utility Tools", "Convert numbers to English words.", "number-words"],
  ["Roman Numeral Converter", "Utility Tools", "Convert numbers to Roman numerals.", "roman"],
  ["Business Name Generator", "Utility Tools", "Generate business name ideas.", "business-name"],
  ["Username Generator", "Utility Tools", "Generate username ideas.", "username"],
];

/* =========================================================
   HELPERS
========================================================= */

const iconFor = {
  "PDF Tools": FileText,
  "Image Tools": ImageIcon,
  "SEO & Marketing": Globe2,
  "Text Tools": FileText,
  "Developer Tools": Code2,
  "Calculator Tools": Calculator,
  "Converter Tools": Wrench,
  "Security Tools": ShieldCheck,
};

const getSaved = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
};

/* =========================================================
   APP
========================================================= */

function App() {
  const [category, setCategory] = useState("All Tools");
  const [query, setQuery] = useState("");
  const [selectedTool, setSelectedTool] = useState(null);
  const [admin, setAdmin] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [dark, setDark] = useState(() => getSaved("tm-theme", false));
  const [favorites, setFavorites] = useState(() =>
    getSaved("tm-favorites", [])
  );

  const categories = useMemo(() => {
    const names = [...new Set(tools.map((t) => t[1]))];

    return [
      ["All Tools", tools.length, Wrench],
      ...names.map((name) => [
        name,
        tools.filter((t) => t[1] === name).length,
        iconFor[name] || Wrench,
      ]),
    ];
  }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();

    return tools.filter((t) => {
      const categoryMatch =
        category === "All Tools" || t[1] === category;

      const searchMatch =
        !q ||
        t[0].toLowerCase().includes(q) ||
        t[1].toLowerCase().includes(q) ||
        t[2].toLowerCase().includes(q);

      return categoryMatch && searchMatch;
    });
  }, [category, query]);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    localStorage.setItem("tm-theme", JSON.stringify(next));
  };

  const toggleFavorite = (id) => {
    const next = favorites.includes(id)
      ? favorites.filter((x) => x !== id)
      : [...favorites, id];

    setFavorites(next);
    localStorage.setItem("tm-favorites", JSON.stringify(next));
  };

  const openTool = (tool) => {
    setSelectedTool(tool);
    const stats = getSaved("tm-stats", { visits: 0, toolUses: 0 });
    stats.visits += 1;
    localStorage.setItem("tm-stats", JSON.stringify(stats));
  };

  return (
    <div className={dark ? "app dark" : "app"}>
      <header className="header">
        <div className="nav">
          <button
            className="brand"
            onClick={() => {
              setSelectedTool(null);
              setAdmin(false);
            }}
          >
            <div className="brandIcon">
              <Wrench size={21} />
            </div>
            <span>
              ToolMaster<span>Pro</span>
            </span>
          </button>

          <nav className={mobileMenu ? "navLinks show" : "navLinks"}>
            <a href="#tools" onClick={() => setMobileMenu(false)}>
              Tools
            </a>
            <a href="#categories" onClick={() => setMobileMenu(false)}>
              Categories
            </a>
            <a href="#about" onClick={() => setMobileMenu(false)}>
              About
            </a>
          </nav>

          <div className="navActions">
            <button className="iconBtn" onClick={toggleTheme}>
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              className="adminBtn"
              onClick={() => {
                setAdmin(!admin);
                setSelectedTool(null);
              }}
            >
              <LayoutDashboard size={17} />
              Admin
            </button>

            <button
              className="mobileBtn"
              onClick={() => setMobileMenu(!mobileMenu)}
            >
              {mobileMenu ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {admin ? (
        <AdminPanel
          onClose={() => setAdmin(false)}
          tools={tools}
        />
      ) : selectedTool ? (
        <ToolPage
          tool={selectedTool}
          back={() => setSelectedTool(null)}
        />
      ) : (
        <>
          <section className="hero">
            <div className="pill">
              <Sparkles size={15} />
              {tools.length}+ Free Online Tools
            </div>

            <h1>
              One place for <span>every tool</span> you need.
            </h1>

            <p>
              Fast, simple and privacy-friendly tools for PDF, images,
              SEO, text, developers, calculators and more.
            </p>

            <div className="searchBox">
              <Search size={20} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for a tool..."
              />
              {query && (
                <button onClick={() => setQuery("")}>
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
                <b>{categories.length - 1}</b>
                <small>Categories</small>
              </div>
              <div>
                <b>100%</b>
                <small>Browser Tools</small>
              </div>
            </div>
          </section>

          <main id="tools" className="container">
            <section id="categories" className="categories">
              {categories.map(([name, count, Icon]) => (
                <button
                  key={name}
                  className={
                    category === name ? "cat active" : "cat"
                  }
                  onClick={() => setCategory(name)}
                >
                  <Icon size={18} />
                  <span>{name}</span>
                  <em>{count}</em>
                </button>
              ))}
            </section>

            <div className="sectionHead">
              <div>
                <h2>{category}</h2>
                <p>{filtered.length} tools available</p>
              </div>

              {favorites.length > 0 && (
                <div className="favoriteInfo">
                  <Heart size={16} fill="currentColor" />
                  {favorites.length} favorites
                </div>
              )}
            </div>

            <div className="grid">
              {filtered.map((tool) => (
                <ToolCard
                  key={tool[3]}
                  tool={tool}
                  open={() => openTool(tool)}
                  favorite={favorites.includes(tool[3])}
                  toggleFavorite={() => toggleFavorite(tool[3])}
                />
              ))}
            </div>

            {!filtered.length && (
              <div className="empty">
                <Search size={40} />
                <h3>No tools found</h3>
                <p>Try another keyword or category.</p>
                <button
                  className="primary"
                  onClick={() => {
                    setQuery("");
                    setCategory("All Tools");
                  }}
                >
                  Reset Search
                </button>
              </div>
            )}
          </main>
        </>
      )}

      <footer id="about">
        <div className="footerInner">
          <div>
            <div className="brand">
              <div className="brandIcon">
                <Wrench size={19} />
              </div>
              <span>
                ToolMaster<span>Pro</span>
              </span>
            </div>
            <p>Powerful online tools, made simple.</p>
          </div>

          <small>
            © 2026 ToolMaster Pro. Built for fast browser-based utilities.
          </small>
        </div>
      </footer>
    </div>
  );
}

/* =========================================================
   TOOL CARD
========================================================= */

function ToolCard({
  tool,
  open,
  favorite,
  toggleFavorite,
}) {
  const Icon = iconFor[tool[1]] || Wrench;

  return (
    <article className="card">
      <button
        className={
          favorite ? "favorite active" : "favorite"
        }
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite();
        }}
        aria-label="Favorite"
      >
        <Heart
          size={16}
          fill={favorite ? "currentColor" : "none"}
        />
      </button>

      <div className="cardClick" onClick={open}>
        <div className="toolIcon">
          <Icon size={21} />
        </div>

        <div className="cardBody">
          <span>{tool[1]}</span>
          <h3>{tool[0]}</h3>
          <p>{tool[2]}</p>
        </div>

        <ArrowRight className="arrow" size={19} />
      </div>
    </article>
  );
}

/* =========================================================
   TOOL PAGE
========================================================= */

function ToolPage({ tool, back }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const runTool = () => {
    const id = tool[3];
    let result = input;

    try {
      switch (id) {
        case "word-counter": {
          const words = input.trim()
            ? input.trim().split(/\s+/).length
            : 0;
          const sentences = input
            ? input.split(/[.!?]+/).filter(Boolean).length
            : 0;

          result =
            `Words: ${words}\n` +
            `Characters: ${input.length}\n` +
            `Characters without spaces: ${input.replace(/\s/g, "").length}\n` +
            `Sentences: ${sentences}`;
          break;
        }

        case "characters":
          result =
            `Characters: ${input.length}\n` +
            `Without spaces: ${input.replace(/\s/g, "").length}`;
          break;

        case "case-converter":
          result = input.toLowerCase();
          break;

        case "text-cleaner":
          result = input.replace(/\s+/g, " ").trim();
          break;

        case "text-reverser":
          result = [...input].reverse().join("");
          break;

        case "slug":
          result = input
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");
          break;

        case "url-encoder":
          result = encodeURIComponent(input);
          break;

        case "base64-encode":
          result = btoa(
            unescape(encodeURIComponent(input))
          );
          break;

        case "base64-decode":
          result = decodeURIComponent(
            escape(atob(input))
          );
          break;

        case "json-formatter":
          result = JSON.stringify(
            JSON.parse(input),
            null,
            2
          );
          break;

        case "json-minifier":
          result = JSON.stringify(JSON.parse(input));
          break;

        case "uuid":
          result = crypto.randomUUID();
          break;

        case "password":
        case "random-password":
          result = generatePassword(18);
          break;

        case "binary":
          result = [...input]
            .map((c) =>
              c.charCodeAt(0)
                .toString(2)
                .padStart(8, "0")
            )
            .join(" ");
          break;

        case "ascii":
          result = [...input]
            .map((c) => c.charCodeAt(0))
            .join(" ");
          break;

        case "morse":
          result = textToMorse(input);
          break;

        case "palindrome": {
          const clean = input
            .toLowerCase()
            .replace(/[^a-z0-9]/g, "");

          result =
            clean === [...clean].reverse().join("")
              ? "Yes — this is a palindrome."
              : "No — this is not a palindrome.";
          break;
        }

        case "reading-time": {
          const words = input.trim()
            ? input.trim().split(/\s+/).length
            : 0;

          result = `Approximately ${Math.max(
            1,
            Math.ceil(words / 200)
          )} minute(s)`;
          break;
        }

        case "text-sorter":
          result = input
            .split("\n")
            .filter(Boolean)
            .sort((a, b) =>
              a.localeCompare(b)
            )
            .join("\n");
          break;

        case "duplicate-lines":
          result = [
            ...new Set(
              input.split("\n").filter(Boolean)
            ),
          ].join("\n");
          break;

        case "percentage":
          result =
            input || "Enter a value such as 20% of 500.";
          break;

        default:
          result =
            "This tool interface is ready. This utility can be connected to its full processing engine next.";
      }
    } catch {
      result = "Invalid input. Please check your data and try again.";
    }

    setOutput(result);

    const stats = getSaved("tm-stats", {
      visits: 0,
      toolUses: 0,
    });

    stats.toolUses += 1;
    localStorage.setItem(
      "tm-stats",
      JSON.stringify(stats)
    );
  };

  const copy = async () => {
    if (!output) return;

    await navigator.clipboard?.writeText(output);
    setCopied(true);

    setTimeout(() => setCopied(false), 1500);
  };

  if (tool[3] === "student-ai-helper") {
    return <StudentAIHelper back={back} />;
  }

  if (tool[3] === "text-to-video") {
    return <TextToVideo back={back} />;
  }

  return (
    <main className="toolPage container">
      <button className="back" onClick={back}>
        <ChevronLeft size={18} />
        Back to tools
      </button>

      <div className="toolHero">
        <div className="toolIcon big">
          <Wrench />
        </div>

        <div>
          <span>{tool[1]}</span>
          <h1>{tool[0]}</h1>
          <p>{tool[2]}</p>
        </div>
      </div>

      <div className="workspace">
        <div className="panel">
          <label>Input</label>

          <textarea
            value={input}
            onChange={(e) =>
              setInput(e.target.value)
            }
            placeholder="Enter or paste your content here..."
          />

          <div className="actions">
            <button
              className="primary"
              onClick={runTool}
            >
              <Zap size={17} />
              Run Tool
            </button>

            <button
              className="secondary"
              onClick={() => {
                setInput("");
                setOutput("");
              }}
            >
              <Trash2 size={17} />
              Clear
            </button>
          </div>
        </div>

        <div className="panel">
          <label>Result</label>

          <textarea
            value={output}
            readOnly
            placeholder="Your result will appear here..."
          />

          <button
            className="secondary full"
            onClick={copy}
          >
            {copied ? (
              <>
                <Check size={17} />
                Copied
              </>
            ) : (
              <>
                <Copy size={17} />
                Copy Result
              </>
            )}
          </button>
        </div>
      </div>

      <div className="notice">
        <ShieldCheck size={20} />
        Most text processing happens locally in your browser.
        Do not upload sensitive information to services you do
        not trust.
      </div>
    </main>
  );
}

/* =========================================================
   AI TOOLS
========================================================= */

function TextToVideo({ back }) {
  const [prompt, setPrompt] = useState("");
  const [status, setStatus] = useState("");

  const generate = () => {
    if (!prompt.trim()) {
      setStatus("Please enter a video prompt first.");
      return;
    }

    setStatus(
      "Prompt prepared. Connect a server-side video AI provider to generate the actual video."
    );
  };

  return (
    <main className="toolPage container">
      <button className="back" onClick={back}>
        <ChevronLeft size={18} />
        Back to tools
      </button>

      <div className="toolHero">
        <div className="toolIcon big">
          <Sparkles />
        </div>
        <div>
          <span>AI & Video</span>
          <h1>Text to Video</h1>
          <p>
            Turn your idea into a production-ready video prompt.
          </p>
        </div>
      </div>

      <div className="aiGrid">
        <div className="aiCard">
          <h3>🎬 Video Prompt</h3>

          <textarea
            value={prompt}
            onChange={(e) =>
              setPrompt(e.target.value)
            }
            placeholder="Example: A cinematic drone shot of a futuristic city at sunset..."
          />

          <button
            className="primary full"
            onClick={generate}
          >
            <Sparkles size={17} />
            Generate Video
          </button>
        </div>

        <div className="aiCard preview">
          <h3>🎥 Preview</h3>

          <div className="videoPlaceholder">
            <Sparkles size={40} />
            <b>Video preview</b>
            <small>
              Connect a secure video AI API for rendering.
            </small>

            {status && <p>{status}</p>}
          </div>
        </div>
      </div>

      <div className="notice">
        <ShieldCheck size={20} />
        API keys must stay on a secure server and should never
        be placed inside frontend React code.
      </div>
    </main>
  );
}

function StudentAIHelper({ back }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const solve = () => {
    if (!question.trim()) {
      setAnswer("Please enter your question first.");
      return;
    }

    setAnswer(
      "Your AI backend is not connected yet. This frontend is ready for OpenAI or another secure AI provider through a server-side API route."
    );
  };

  return (
    <main className="toolPage container">
      <button className="back" onClick={back}>
        <ChevronLeft size={18} />
        Back to tools
      </button>

      <div className="toolHero">
        <div className="toolIcon big">
          <Sparkles />
        </div>
        <div>
          <span>AI & Education</span>
          <h1>Student AI Helper</h1>
          <p>
            Ask questions and get step-by-step explanations.
          </p>
        </div>
      </div>

      <div className="aiGrid">
        <div className="aiCard">
          <h3>📚 Your Question</h3>

          <textarea
            value={question}
            onChange={(e) =>
              setQuestion(e.target.value)
            }
            placeholder="Example: Explain photosynthesis in simple words..."
          />

          <button
            className="primary full"
            onClick={solve}
          >
            <Sparkles size={17} />
            Get AI Help
          </button>
        </div>

        <div className="aiCard">
          <h3>🤖 AI Answer</h3>

          <div className="answer">
            {answer ||
              "Your step-by-step answer will appear here."}
          </div>

          {answer && (
            <button
              className="secondary"
              onClick={() =>
                navigator.clipboard?.writeText(answer)
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
   ADMIN PANEL
========================================================= */

function AdminPanel({ onClose, tools }) {
  const [tab, setTab] = useState("dashboard");
  const [adminSearch, setAdminSearch] = useState("");
  const [notice, setNotice] = useState("");

  const stats = getSaved("tm-stats", {
    visits: 0,
    toolUses: 0,
  });

  const filteredTools = tools.filter((t) =>
    t[0]
      .toLowerCase()
      .includes(adminSearch.toLowerCase())
  );

  const showNotice = (text) => {
    setNotice(text);
    setTimeout(() => setNotice(""), 2000);
  };

  return (
    <main className="adminPage container">
      <div className="adminHeader">
        <div>
          <div className="pill">
            <ShieldCheck size={15} />
            Admin Panel
          </div>

          <h1>ToolMaster Pro Control Center</h1>

          <p>
            Manage tools, monitor usage and configure your
            platform.
          </p>
        </div>

        <button
          className="secondary"
          onClick={onClose}
        >
          <ChevronLeft size={17} />
          Website
        </button>
      </div>

      <div className="adminLayout">
        <aside className="adminSidebar">
          <button
            className={tab === "dashboard" ? "active" : ""}
            onClick={() => setTab("dashboard")}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </button>

          <button
            className={tab === "tools" ? "active" : ""}
            onClick={() => setTab("tools")}
          >
            <Wrench size={18} />
            Tools
          </button>

          <button
            className={tab === "users" ? "active" : ""}
            onClick={() => setTab("users")}
          >
            <Users size={18} />
            Users
          </button>

          <button
            className={tab === "analytics" ? "active" : ""}
            onClick={() => setTab("analytics")}
          >
            <BarChart3 size={18} />
            Analytics
          </button>

          <button
            className={tab === "settings" ? "active" : ""}
            onClick={() => setTab("settings")}
          >
            <Settings size={18} />
            Settings
          </button>
        </aside>

        <section className="adminContent">
          {notice && (
            <div className="toast">
              <CheckCircleIcon />
              {notice}
            </div>
          )}

          {tab === "dashboard" && (
            <>
              <h2>Dashboard</h2>

              <div className="metricGrid">
                <Metric
                  icon={<Wrench />}
                  title="Total Tools"
                  value={tools.length}
                />
                <Metric
                  icon={<Users />}
                  title="Users"
                  value="0"
                />
                <Metric
                  icon={<BarChart3 />}
                  title="Tool Uses"
                  value={stats.toolUses}
                />
                <Metric
                  icon={<LayoutDashboard />}
                  title="Visits"
                  value={stats.visits}
                />
              </div>

              <div className="adminCards">
                <AdminCard
                  title="Platform Status"
                  text="Frontend application is running."
                  action="System Healthy"
                  icon={<CheckCircleIcon />}
                  success
                />

                <AdminCard
                  title="Security"
                  text="Keep authentication and API keys on the server."
                  action="Review Security"
                  icon={<ShieldCheck />}
                />

                <AdminCard
                  title="Database"
                  text="LocalStorage is currently used for demo statistics."
                  action="Connect Database"
                  icon={<Settings />}
                />
              </div>
            </>
          )}

          {tab === "tools" && (
            <>
              <div className="adminTitleRow">
                <div>
                  <h2>Tool Management</h2>
                  <p>{tools.length} tools configured.</p>
                </div>

                <button
                  className="primary"
                  onClick={() =>
                    showNotice(
                      "Tool creation requires a database in production."
                    )
                  }
                >
                  <Plus size={17} />
                  Add Tool
                </button>
              </div>

              <div className="adminSearch">
                <Search size={18} />
                <input
                  value={adminSearch}
                  onChange={(e) =>
                    setAdminSearch(e.target.value)
                  }
                  placeholder="Search tools..."
                />
              </div>

              <div className="toolTable">
                {filteredTools.map((t) => (
                  <div className="toolRow" key={t[3]}>
                    <div>
                      <b>{t[0]}</b>
                      <small>{t[1]}</small>
                    </div>

                    <span className="status">
                      Active
                    </span>

                    <button
                      className="iconBtn"
                      onClick={() =>
                        showNotice(
                          `${t[0]} settings opened`
                        )
                      }
                    >
                      <Settings size={17} />
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {tab === "users" && (
            <div className="emptyAdmin">
              <Users size={48} />
              <h2>User Management</h2>
              <p>
                Connect Supabase, Firebase or another database
                to add real user authentication.
              </p>

              <button
                className="primary"
                onClick={() =>
                  showNotice(
                    "Authentication backend is not connected yet."
                  )
                }
              >
                Configure Authentication
              </button>
            </div>
          )}

          {tab === "analytics" && (
            <>
              <h2>Analytics</h2>

              <div className="metricGrid">
                <Metric
                  icon={<BarChart3 />}
                  title="Tool Opens"
                  value={stats.visits}
                />
                <Metric
                  icon={<Zap />}
                  title="Tool Runs"
                  value={stats.toolUses}
                />
                <Metric
                  icon={<Wrench />}
                  title="Available Tools"
                  value={tools.length}
                />
              </div>

              <button
                className="secondary"
                onClick={() => {
                  localStorage.removeItem("tm-stats");
                  showNotice("Analytics reset.");
                }}
              >
                <RefreshCw size={17} />
                Reset Analytics
              </button>
            </>
          )}

          {tab === "settings" && (
            <>
              <h2>Settings</h2>

              <div className="settingsBox">
                <div>
                  <b>Application</b>
                  <p>ToolMaster Pro</p>
                </div>

                <div>
                  <b>Version</b>
                  <p>2.0.0</p>
                </div>

                <div>
                  <b>Deployment</b>
                  <p>Vercel / Vite</p>
                </div>

                <div>
                  <b>Backend</b>
                  <p>Not connected</p>
                </div>
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  );
}

function Metric({ icon, title, value }) {
  return (
    <div className="metric">
      <div className="metricIcon">{icon}</div>
      <small>{title}</small>
      <strong>{value}</strong>
    </div>
  );
}

function AdminCard({
  title,
  text,
  action,
  icon,
  success,
}) {
  return (
    <div className="adminCard">
      <div className="adminCardIcon">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
      <strong className={success ? "ok" : ""}>
        {action}
      </strong>
    </div>
  );
}

function CheckCircleIcon() {
  return <Check size={18} />;
}

/* =========================================================
   UTILITIES
========================================================= */

function generatePassword(length = 18) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

  const values = crypto.getRandomValues(
    new Uint32Array(length)
  );

  return [...values]
    .map((v) => chars[v % chars.length])
    .join("");
}

function textToMorse(text) {
  const map = {
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
    "0": "-----",
    "1": ".----",
    "2": "..---",
    "3": "...--",
    "4": "....-",
    "5": ".....",
    "6": "-....",
    "7": "--...",
    "8": "---..",
    "9": "----.",
  };

  return text
    .toLowerCase()
    .split("")
    .map((c) => {
      if (c === " ") return "/";
      return map[c] || c;
    })
    .join(" ");
}

/* =========================================================
   MOUNT
========================================================= */

const root = document.getElementById("root");

if (!root) {
  throw new Error(
    "Root element not found. Check index.html."
  );
}

createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
