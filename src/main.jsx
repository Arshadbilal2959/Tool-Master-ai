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
  RefreshCw,
  Download,
  Upload,
} from "lucide-react";
import "./styles.css";

/* =========================================================
   TOOL LIST
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
  ["WebP Converter", "Image Tools", "Convert images to WebP.", "webp-converter"],
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
  ["JavaScript Minifier", "Developer Tools", "Compact JavaScript.", "js-minifier"],
  ["UUID Generator", "Developer Tools", "Generate UUID values.", "uuid"],
  ["Hash Generator", "Developer Tools", "Create SHA-256 hashes.", "hash"],
  ["Timestamp Converter", "Developer Tools", "Convert Unix timestamps.", "timestamp"],
  ["Color Converter", "Developer Tools", "Convert HEX, RGB and HSL.", "color"],
  ["Regex Tester", "Developer Tools", "Test regular expressions.", "regex"],
  ["Cron Expression Helper", "Developer Tools", "Build cron expressions.", "cron"],
  ["HTML Entity Encoder", "Developer Tools", "Encode HTML entities.", "html-entities"],
  ["URL Parser", "Developer Tools", "Parse URL components.", "url-parser"],
  ["HTML Previewer", "Developer Tools", "Preview HTML.", "html-preview"],
  ["Markdown Previewer", "Developer Tools", "Preview Markdown.", "markdown"],
  ["SQL Formatter", "Developer Tools", "Format SQL.", "sql"],
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
  ["Scientific Calculator", "Calculator Tools", "Scientific calculations.", "scientific"],
  ["Date Calculator", "Calculator Tools", "Add days to dates.", "date-add"],

  ["Unit Converter", "Converter Tools", "Convert common units.", "units"],
  ["Length Converter", "Converter Tools", "Convert length.", "length"],
  ["Weight Converter", "Converter Tools", "Convert weight.", "weight"],
  ["Temperature Converter", "Converter Tools", "Convert temperature.", "temperature"],
  ["Currency Converter", "Converter Tools", "Convert currencies.", "currency"],
  ["Data Storage Converter", "Converter Tools", "Convert storage units.", "storage"],

  ["Password Generator", "Security Tools", "Generate strong passwords.", "password"],
  ["Password Strength Checker", "Security Tools", "Check password strength.", "password-strength"],
  ["SHA-256 Generator", "Security Tools", "Generate SHA-256 hashes.", "sha256"],
  ["MD5 Hash Generator", "Security Tools", "Generate MD5-style hash.", "md5"],
  ["Random Password Generator", "Security Tools", "Generate random passwords.", "random-password"],

  ["IP Address Info", "Network Tools", "View browser-visible IP information.", "ip-info"],
  ["HTTP Status Checker", "Network Tools", "Check HTTP status codes.", "http-status"],

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
  "Network Tools": Globe2,
  "Utility Tools": Settings,
  "AI & Video": Sparkles,
  "AI & Education": Sparkles,
};

const getSaved = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
};

function downloadFile(filename, content, type = "text/plain") {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function parseNumbers(text) {
  return text
    .split(/[,\s]+/)
    .map(Number)
    .filter((n) => Number.isFinite(n));
}

function escapeHtml(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function sha256(text) {
  const data = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(hash)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function generatePassword(length = 18) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=";

  const values = crypto.getRandomValues(new Uint32Array(length));

  return [...values]
    .map((v) => chars[v % chars.length])
    .join("");
}

const morseMap = {
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

function textToMorse(text) {
  return text
    .toLowerCase()
    .split("")
    .map((c) => (c === " " ? "/" : morseMap[c] || c))
    .join(" ");
}

function morseToText(text) {
  const reverse = Object.fromEntries(
    Object.entries(morseMap).map(([k, v]) => [v, k])
  );

  return text
    .trim()
    .split(/\s+/)
    .map((x) => (x === "/" ? " " : reverse[x] || x))
    .join("");
}

function numberToWords(num) {
  if (!Number.isFinite(num)) return "Invalid number.";

  if (num === 0) return "zero";

  const ones = [
    "",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
  ];

  const tens = [
    "",
    "",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ];

  const under1000 = (n) => {
    let result = "";

    if (n >= 100) {
      result += ones[Math.floor(n / 100)] + " hundred";
      n %= 100;
      if (n) result += " ";
    }

    if (n >= 20) {
      result += tens[Math.floor(n / 10)];
      n %= 10;
      if (n) result += "-" + ones[n];
    } else if (n > 0) {
      result += ones[n];
    }

    return result;
  };

  if (num < 0) return "minus " + numberToWords(Math.abs(num));

  if (num > 999999999) return "Number too large.";

  let result = "";

  const millions = Math.floor(num / 1000000);
  const thousands = Math.floor((num % 1000000) / 1000);
  const rest = num % 1000;

  if (millions) result += under1000(millions) + " million";
  if (thousands) {
    if (result) result += " ";
    result += under1000(thousands) + " thousand";
  }
  if (rest) {
    if (result) result += " ";
    result += under1000(rest);
  }

  return result;
}

function toRoman(num) {
  if (!Number.isInteger(num) || num < 1 || num > 3999) {
    return "Enter an integer between 1 and 3999.";
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

function fromRoman(text) {
  const map = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  const s = text.toUpperCase().trim();

  if (!s) return "Enter a Roman numeral.";

  let total = 0;

  for (let i = 0; i < s.length; i++) {
    const current = map[s[i]];
    const next = map[s[i + 1]];

    if (!current) return "Invalid Roman numeral.";

    total += next && current < next ? -current : current;
  }

  return String(total);
}

function simpleMarkdown(text) {
  return escapeHtml(text)
    .replace(/^### (.*)$/gm, "<h3>$1</h3>")
    .replace(/^## (.*)$/gm, "<h2>$1</h2>")
    .replace(/^# (.*)$/gm, "<h1>$1</h1>")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/\n/g, "<br>");
}

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

    const stats = getSaved("tm-stats", {
      visits: 0,
      toolUses: 0,
    });

    stats.visits += 1;

    localStorage.setItem(
      "tm-stats",
      JSON.stringify(stats)
    );
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
              Fast, simple and privacy-friendly tools for PDF,
              images, SEO, text, developers, calculators and more.
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
                  toggleFavorite={() =>
                    toggleFavorite(tool[3])
                  }
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
        className={favorite ? "favorite active" : "favorite"}
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
  const [loading, setLoading] = useState(false);

  const runTool = async () => {
    setLoading(true);

    try {
      const result = await processTool(tool[3], input);
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
    } catch (error) {
      setOutput(
        error?.message ||
          "Invalid input. Please check your data and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const copy = async () => {
    if (!output) return;

    try {
      await navigator.clipboard.writeText(output);
    } catch {
      const area = document.createElement("textarea");
      area.value = output;
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      area.remove();
    }

    setCopied(true);

    setTimeout(() => setCopied(false), 1500);
  };

  const downloadResult = () => {
    if (!output) return;

    downloadFile(
      `${tool[3]}-result.txt`,
      output
    );
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
            onChange={(e) => setInput(e.target.value)}
            placeholder={getPlaceholder(tool[3])}
          />

          <div className="actions">
            <button
              className="primary"
              onClick={runTool}
              disabled={loading}
            >
              <Zap size={17} />
              {loading ? "Processing..." : "Run Tool"}
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

          <div className="actions">
            <button
              className="secondary"
              onClick={copy}
              disabled={!output}
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

            <button
              className="secondary"
              onClick={downloadResult}
              disabled={!output}
            >
              <Download size={17} />
              Download
            </button>
          </div>
        </div>
      </div>

      <div className="notice">
        <ShieldCheck size={20} />
        Most text processing happens locally in your browser.
      </div>
    </main>
  );
}

/* =========================================================
   PLACEHOLDERS
========================================================= */

function getPlaceholder(id) {
  const placeholders = {
    "word-counter": "Paste your text here...",
    "json-formatter": '{"name":"ToolMaster","tools":100}',
    "json-minifier": '{"name":"ToolMaster","tools":100}',
    "base64-encode": "Enter text to encode...",
    "base64-decode": "Enter Base64 text...",
    percentage: "20 500",
    discount: "1000 20",
    gst: "1000 18",
    bmi: "70 1.75",
    tip: "100 15",
    loan: "100000 8 5",
    "compound-interest": "10000 8 5 12",
    "temperature": "100 C",
    length: "10 km",
    weight: "10 kg",
    storage: "1024 MB",
    "random-number": "1 100",
    "number-words": "12345",
    roman: "2026",
    "date-difference": "2026-01-01\n2026-08-25",
    "date-add": "2026-08-25\n30",
    regex: "hello world\nhello",
    color: "#ff0000",
    binary: "Hello",
    ascii: "Hello",
    morse: "hello world",
    "password-strength": "MyPassword123!",
    "http-status": "404",
    "email-validator": "example@email.com",
    phone: "03001234567",
    "keyword-density": "Enter text here...",
    "url-encoder": "https://example.com/hello world",
    slug: "My Amazing Website",
    "meta-tags": "My Website Title\nMy website description\nhttps://example.com",
    "open-graph": "My Website\nhttps://example.com/image.jpg\nhttps://example.com",
    "utm": "https://example.com\nfacebook\nsocial\nsummer-sale",
    "csv-json": "name,age\nAli,25\nAhmed,30",
    "json-csv": '[{"name":"Ali","age":25},{"name":"Ahmed","age":30}]',
    "markdown": "# Hello\n\n**ToolMaster Pro**",
    "html-preview": "<h1>Hello ToolMaster</h1>",
    scientific: "2 + 2 * 10",
    units: "10 km",
  };

  return placeholders[id] || "Enter or paste your content here...";
}

/* =========================================================
   PROCESSING ENGINE
========================================================= */

async function processTool(id, input) {
  const value = input.trim();

  switch (id) {
    case "word-counter": {
      const words = value ? value.split(/\s+/).length : 0;
      const chars = input.length;
      const noSpaces = input.replace(/\s/g, "").length;
      const lines = input ? input.split(/\r?\n/).length : 0;
      const sentences = input
        ? input.split(/[.!?]+/).filter(Boolean).length
        : 0;

      return [
        `Words: ${words}`,
        `Characters: ${chars}`,
        `Characters without spaces: ${noSpaces}`,
        `Lines: ${lines}`,
        `Sentences: ${sentences}`,
        `Reading time: ${Math.max(1, Math.ceil(words / 200))} minute(s)`,
      ].join("\n");
    }

    case "characters":
      return [
        `Characters: ${input.length}`,
        `Without spaces: ${input.replace(/\s/g, "").length}`,
      ].join("\n");

    case "case-converter":
      return [
        `UPPERCASE:\n${input.toUpperCase()}`,
        `lowercase:\n${input.toLowerCase()}`,
        `Title Case:\n${input.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())}`,
      ].join("\n\n");

    case "text-cleaner":
      return input.replace(/\s+/g, " ").trim();

    case "text-reverser":
      return [...input].reverse().join("");

    case "slug":
      return value
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

    case "url-encoder":
      return encodeURIComponent(input);

    case "base64-encode":
      return btoa(unescape(encodeURIComponent(input)));

    case "base64-decode":
      return decodeURIComponent(escape(atob(value)));

    case "json-formatter":
      return JSON.stringify(JSON.parse(value), null, 2);

    case "json-minifier":
      return JSON.stringify(JSON.parse(value));

    case "uuid":
      return crypto.randomUUID();

    case "password":
    case "random-password":
      return generatePassword(20);

    case "password-strength": {
      let score = 0;

      if (input.length >= 8) score++;
      if (input.length >= 12) score++;
      if (/[A-Z]/.test(input)) score++;
      if (/[a-z]/.test(input)) score++;
      if (/[0-9]/.test(input)) score++;
      if (/[^A-Za-z0-9]/.test(input)) score++;

      const level =
        score <= 2 ? "Weak" :
        score <= 4 ? "Medium" :
        "Strong";

      return `Strength: ${level}\nScore: ${score}/6`;
    }

    case "binary":
      return [...input]
        .map((c) =>
          c.charCodeAt(0).toString(2).padStart(8, "0")
        )
        .join(" ");

    case "ascii":
      return [...input]
        .map((c) => c.charCodeAt(0))
        .join(" ");

    case "morse":
      return textToMorse(input);

    case "palindrome": {
      const clean = input
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "");

      return clean === [...clean].reverse().join("")
        ? "Yes — this is a palindrome."
        : "No — this is not a palindrome.";
    }

    case "reading-time": {
      const words = value ? value.split(/\s+/).length : 0;
      return `Approximately ${Math.max(
        1,
        Math.ceil(words / 200)
      )} minute(s)`;
    }

    case "text-sorter":
      return input
        .split(/\r?\n/)
        .filter(Boolean)
        .sort((a, b) => a.localeCompare(b))
        .join("\n");

    case "duplicate-lines":
      return [...new Set(
        input.split(/\r?\n/).filter(Boolean)
      )].join("\n");

    case "lorem": {
      const text =
        "Lorem ipsum dolor sit amet consectetur adipiscing elit. ";
      const count = Math.max(
        1,
        Math.min(50, Number(value) || 5)
      );

      return Array.from(
        { length: count },
        () => text.trim()
      ).join(" ");
    }

    case "hash":
    case "sha256":
      return await sha256(input);

    case "timestamp": {
      const n = Number(value);

      if (!Number.isFinite(n)) {
        return "Enter a valid Unix timestamp.";
      }

      const ms = n < 100000000000 ? n * 1000 : n;
      return new Date(ms).toString();
    }

    case "percentage": {
      const [percent, number] = parseNumbers(input);

      if (!Number.isFinite(percent) || !Number.isFinite(number)) {
        return "Enter: percentage number\nExample: 20 500";
      }

      return `${percent}% of ${number} = ${
        (percent / 100) * number
      }`;
    }

    case "discount": {
      const [price, discount] = parseNumbers(input);

      if (!Number.isFinite(price) || !Number.isFinite(discount)) {
        return "Enter: price discount\nExample: 1000 20";
      }

      const saved = price * discount / 100;

      return [
        `Original price: ${price}`,
        `Discount: ${discount}%`,
        `You save: ${saved}`,
        `Final price: ${price - saved}`,
      ].join("\n");
    }

    case "gst": {
      const [price, gst] = parseNumbers(input);

      if (!Number.isFinite(price) || !Number.isFinite(gst)) {
        return "Enter: price GST%\nExample: 1000 18";
      }

      const tax = price * gst / 100;

      return [
        `Price: ${price}`,
        `GST: ${tax}`,
        `Total: ${price + tax}`,
      ].join("\n");
    }

    case "tip": {
      const [bill, tip] = parseNumbers(input);

      if (!Number.isFinite(bill) || !Number.isFinite(tip)) {
        return "Enter: bill tip%\nExample: 100 15";
      }

      const amount = bill * tip / 100;

      return [
        `Bill: ${bill}`,
        `Tip: ${amount}`,
        `Total: ${bill + amount}`,
      ].join("\n");
    }

    case "bmi": {
      const [kg, meters] = parseNumbers(input);

      if (!Number.isFinite(kg) || !Number.isFinite(meters) || meters <= 0) {
        return "Enter: weight_kg height_m\nExample: 70 1.75";
      }

      const bmi = kg / (meters * meters);

      const category =
        bmi < 18.5 ? "Underweight" :
        bmi < 25 ? "Normal" :
        bmi < 30 ? "Overweight" :
        "Obesity";

      return `BMI: ${bmi.toFixed(2)}\nCategory: ${category}`;
    }

    case "age": {
      const date = new Date(value);

      if (Number.isNaN(date.getTime())) {
        return "Enter your birth date, e.g. 2000-05-15";
      }

      const now = new Date();

      let age = now.getFullYear() - date.getFullYear();

      const month =
        now.getMonth() - date.getMonth();

      if (
        month < 0 ||
        (month === 0 && now.getDate() < date.getDate())
      ) {
        age--;
      }

      return `Your age is approximately ${age} years.`;
    }

    case "loan": {
      const [principal, annualRate, years] =
        parseNumbers(input);

      if (
        !Number.isFinite(principal) ||
        !Number.isFinite(annualRate) ||
        !Number.isFinite(years)
      ) {
        return "Enter: loan rate years\nExample: 100000 8 5";
      }

      const monthlyRate = annualRate / 100 / 12;
      const months = years * 12;

      const payment =
        monthlyRate === 0
          ? principal / months
          : principal *
            monthlyRate *
            Math.pow(1 + monthlyRate, months) /
            (Math.pow(1 + monthlyRate, months) - 1);

      return [
        `Monthly payment: ${payment.toFixed(2)}`,
        `Total payment: ${(payment * months).toFixed(2)}`,
        `Total interest: ${(payment * months - principal).toFixed(2)}`,
      ].join("\n");
    }

    case "compound-interest": {
      const [principal, rate, years, times] =
        parseNumbers(input);

      if (
        !Number.isFinite(principal) ||
        !Number.isFinite(rate) ||
        !Number.isFinite(years)
      ) {
        return "Enter: principal rate years timesPerYear";
      }

      const n = times || 1;

      const amount =
        principal *
        Math.pow(
          1 + rate / 100 / n,
          n * years
        );

      return [
        `Principal: ${principal}`,
        `Final amount: ${amount.toFixed(2)}`,
        `Interest earned: ${(amount - principal).toFixed(2)}`,
      ].join("\n");
    }

    case "scientific": {
      const expression = input
        .replaceAll("^", "**")
        .replaceAll("π", "Math.PI")
        .replaceAll("sqrt", "Math.sqrt");

      if (!/^[0-9+\-*/().%\s*MathPIqrt]+$/.test(expression)) {
        throw new Error("Only basic mathematical expressions are allowed.");
      }

      const result = Function(
        `"use strict"; return (${expression})`
      )();

      return String(result);
    }

    case "random-number": {
      const [min, max] = parseNumbers(input);

      if (!Number.isFinite(min) || !Number.isFinite(max)) {
        return "Enter: minimum maximum\nExample: 1 100";
      }

      const low = Math.ceil(Math.min(min, max));
      const high = Math.floor(Math.max(min, max));

      return String(
        Math.floor(Math.random() * (high - low + 1)) + low
      );
    }

    case "number-words":
      return numberToWords(Number(value));

    case "roman": {
      const n = Number(value);

      if (/^[IVXLCDM]+$/i.test(value)) {
        return fromRoman(value);
      }

      return toRoman(n);
    }

    case "date-difference": {
      const dates = input
        .split(/\r?\n/)
        .map((x) => new Date(x.trim()));

      if (
        dates.length < 2 ||
        dates.some((d) => Number.isNaN(d.getTime()))
      ) {
        return "Enter two dates on separate lines.";
      }

      const diff = Math.abs(
        dates[1].getTime() - dates[0].getTime()
      );

      const days = Math.floor(
        diff / 86400000
      );

      return `Difference: ${days} day(s)`;
    }

    case "date-add": {
      const lines = input.split(/\r?\n/);
      const date = new Date(lines[0]);
      const days = Number(lines[1]);

      if (Number.isNaN(date.getTime()) || !Number.isFinite(days)) {
        return "Enter date on first line and number of days on second line.";
      }

      date.setDate(date.getDate() + days);

      return date.toISOString().slice(0, 10);
    }

    case "temperature": {
      const [number, unit] = value.split(/\s+/);

      const n = Number(number);
      const u = (unit || "C").toUpperCase();

      if (!Number.isFinite(n)) {
        return "Example: 100 C";
      }

      if (u === "C") {
        return `${n} °C = ${(n * 9 / 5 + 32).toFixed(2)} °F = ${(n + 273.15).toFixed(2)} K`;
      }

      if (u === "F") {
        return `${n} °F = ${((n - 32) * 5 / 9).toFixed(2)} °C`;
      }

      if (u === "K") {
        return `${n} K = ${(n - 273.15).toFixed(2)} °C`;
      }

      return "Use C, F or K.";
    }

    case "length": {
      const [n, unit] = value.split(/\s+/);
      const number = Number(n);

      const factors = {
        mm: 0.001,
        cm: 0.01,
        m: 1,
        km: 1000,
        in: 0.0254,
        ft: 0.3048,
        yd: 0.9144,
        mi: 1609.344,
      };

      if (!Number.isFinite(number) || !factors[unit]) {
        return "Example: 10 km";
      }

      const meters = number * factors[unit];

      return [
        `Meters: ${meters}`,
        `Kilometers: ${meters / 1000}`,
        `Centimeters: ${meters * 100}`,
        `Feet: ${meters / 0.3048}`,
        `Miles: ${meters / 1609.344}`,
      ].join("\n");
    }

    case "weight": {
      const [n, unit] = value.split(/\s+/);
      const number = Number(n);

      const factors = {
        mg: 0.000001,
        g: 0.001,
        kg: 1,
        lb: 0.45359237,
        oz: 0.0283495231,
      };

      if (!Number.isFinite(number) || !factors[unit]) {
        return "Example: 10 kg";
      }

      const kg = number * factors[unit];

      return [
        `Kilograms: ${kg}`,
        `Grams: ${kg * 1000}`,
        `Pounds: ${kg / 0.45359237}`,
        `Ounces: ${kg / 0.0283495231}`,
      ].join("\n");
    }

    case "storage": {
      const [n, unit] = value.split(/\s+/);
      const number = Number(n);

      const factors = {
        B: 1,
        KB: 1024,
        MB: 1024 ** 2,
        GB: 1024 ** 3,
        TB: 1024 ** 4,
      };

      const factor = factors[(unit || "B").toUpperCase()];

      if (!Number.isFinite(number) || !factor) {
        return "Example: 1024 MB";
      }

      const bytes = number * factor;

      return [
        `Bytes: ${bytes}`,
        `KB: ${bytes / 1024}`,
        `MB: ${bytes / 1024 ** 2}`,
        `GB: ${bytes / 1024 ** 3}`,
        `TB: ${bytes / 1024 ** 4}`,
      ].join("\n");
    }

    case "email-validator":
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        ? "Valid email address."
        : "Invalid email address.";

    case "phone":
      return value.replace(/\D/g, "").replace(
        /(\d{3})(\d{3})(\d{4})/,
        "$1-$2-$3"
      );

    case "regex": {
      const [pattern, ...textParts] =
        input.split(/\r?\n/);

      const text = textParts.join("\n");

      if (!pattern) return "Enter regex on first line.";

      const match = new RegExp(pattern, "gi").exec(text);

      return match
        ? `Match found: ${match[0]}`
        : "No match found.";
    }

    case "html-entities":
      return escapeHtml(input);

    case "html-formatter":
      return input
        .replace(/></g, ">\n<")
        .replace(/^\s+/gm, "")
        .trim();

    case "css-formatter":
      return input
        .replace(/\{/g, "{\n  ")
        .replace(/;/g, ";\n  ")
        .replace(/\}/g, "\n}\n")
        .replace(/\n\s+\n/g, "\n")
        .trim();

    case "js-minifier":
      return input
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/\/\/.*$/gm, "")
        .replace(/\s+/g, " ")
        .trim();

    case "url-parser": {
      const url = new URL(value);

      return [
        `Protocol: ${url.protocol}`,
        `Host: ${url.host}`,
        `Hostname: ${url.hostname}`,
        `Port: ${url.port || "(default)"}`,
        `Path: ${url.pathname}`,
        `Query: ${url.search}`,
        `Hash: ${url.hash}`,
      ].join("\n");
    }

    case "markdown":
      return simpleMarkdown(input);

    case "csv-json": {
      const lines = input
        .split(/\r?\n/)
        .filter(Boolean);

      if (!lines.length) return "Enter CSV data.";

      const headers = lines[0]
        .split(",")
        .map((x) => x.trim());

      const result = lines.slice(1).map((line) => {
        const values = line.split(",");

        return Object.fromEntries(
          headers.map((h, i) => [
            h,
            values[i]?.trim() ?? "",
          ])
        );
      });

      return JSON.stringify(result, null, 2);
    }

    case "json-csv": {
      const data = JSON.parse(value);

      if (!Array.isArray(data) || !data.length) {
        throw new Error("JSON must be a non-empty array of objects.");
      }

      const headers = [
        ...new Set(
          data.flatMap((row) => Object.keys(row))
        ),
      ];

      const rows = data.map((row) =>
        headers
          .map((h) =>
            JSON.stringify(row[h] ?? "")
          )
          .join(",")
      );

      return [
        headers.join(","),
        ...rows,
      ].join("\n");
    }

    case "keyword-density": {
      const words = value
        .toLowerCase()
        .match(/[a-z0-9]+/g) || [];

      const counts = {};

      for (const word of words) {
        if (word.length > 2) {
          counts[word] = (counts[word] || 0) + 1;
        }
      }

      return Object.entries(counts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 20)
        .map(
          ([word, count]) =>
            `${word}: ${count} (${((count / words.length) * 100).toFixed(2)}%)`
        )
        .join("\n");
    }

    case "meta-tags": {
      const [title = "", description = "", url = ""] =
        input.split(/\r?\n/);

      return `<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(description)}">
<link rel="canonical" href="${escapeHtml(url)}">`;
    }

    case "open-graph": {
      const [title = "", image = "", url = ""] =
        input.split(/\r?\n/);

      return `<meta property="og:title" content="${escapeHtml(title)}">
<meta property="og:image" content="${escapeHtml(image)}">
<meta property="og:url" content="${escapeHtml(url)}">
<meta property="og:type" content="website">`;
    }

    case "robots":
      return `User-agent: *
Allow: /
Sitemap: ${value || "https://example.com/sitemap.xml"}`;

    case "sitemap":
      return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${escapeHtml(value || "https://example.com/")}</loc>
  </url>
</urlset>`;

    case "schema":
      return JSON.stringify(
        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: value || "My Website",
        },
        null,
        2
      );

    case "utm": {
      const [url, source, medium, campaign] =
        input.split(/\r?\n/);

      if (!url) return "Enter URL on first line.";

      const u = new URL(url);

      if (source) u.searchParams.set("utm_source", source);
      if (medium) u.searchParams.set("utm_medium", medium);
      if (campaign) u.searchParams.set("utm_campaign", campaign);

      return u.toString();
    }

    case "ip-info":
      return "For privacy, IP lookup should be performed through a trusted server-side service.";

    case "http-status": {
      const code = Number(value);

      const statuses = {
        200: "OK",
        201: "Created",
        204: "No Content",
        301: "Moved Permanently",
        302: "Found",
        304: "Not Modified",
        400: "Bad Request",
        401: "Unauthorized",
        403: "Forbidden",
        404: "Not Found",
        405: "Method Not Allowed",
        408: "Request Timeout",
        429: "Too Many Requests",
        500: "Internal Server Error",
        502: "Bad Gateway",
        503: "Service Unavailable",
        504: "Gateway Timeout",
      };

      return statuses[code]
        ? `${code} — ${statuses[code]}`
        : "Unknown HTTP status code.";
    }

    case "business-name": {
      const words = [
        "Nova",
        "Prime",
        "Bright",
        "Smart",
        "Vertex",
        "Cloud",
        "Pixel",
        "Master",
        "Pro",
        "Tech",
      ];

      const suffixes = [
        "Labs",
        "Hub",
        "Works",
        "Studio",
        "Solutions",
        "Tools",
        "Systems",
        "Digital",
      ];

      return Array.from(
        { length: 10 },
        () =>
          `${words[Math.floor(Math.random() * words.length)]} ${
            suffixes[Math.floor(Math.random() * suffixes.length)]
          }`
      ).join("\n");
    }

    case "username": {
      const base =
        value.replace(/[^a-zA-Z0-9]/g, "").toLowerCase() ||
        "user";

      return Array.from(
        { length: 10 },
        (_, i) =>
          `${base}${Math.floor(100 + Math.random() * 900)}`
      ).join("\n");
    }

    case "color": {
      const hex = value.replace("#", "");

      if (!/^[0-9a-fA-F]{6}$/.test(hex)) {
        return "Enter a 6-digit HEX color, e.g. #ff0000";
      }

      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);

      return [
        `HEX: #${hex}`,
        `RGB: rgb(${r}, ${g}, ${b})`,
        `HSL: ${rgbToHsl(r, g, b)}`,
      ].join("\n");
    }

    case "color-picker":
      return "Use a browser color input in the next UI update.";

    default:
      return `Tool "${id}" is ready for browser processing.`;
  }
}

function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  let h;
  let s;

  const l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;

    s =
      l > 0.5
        ? d / (2 - max - min)
        : d / (max + min);

    switch (max) {
      case r:
        h =
          (g - b) / d +
          (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      default:
        h = (r - g) / d + 4;
    }

    h /= 6;
  }

  return `${Math.round(h * 360)}°, ${Math.round(
    s * 100
  )}%, ${Math.round(l * 100)}%`;
}

/* =========================================================
   AI PLACEHOLDERS
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
      "Your video prompt is ready. A server-side video AI provider is required for actual video rendering."
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
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Example: A cinematic drone shot of a futuristic city at sunset..."
          />

          <button
            className="primary full"
            onClick={generate}
          >
            <Sparkles size={17} />
            Prepare Video
          </button>
        </div>

        <div className="aiCard preview">
          <h3>🎥 Preview</h3>

          <div className="videoPlaceholder">
            <Sparkles size={40} />
            <b>Video preview</b>
            <small>
              {status || "Enter a prompt to prepare your video."}
            </small>
          </div>
        </div>
      </div>

      <div className="notice">
        <ShieldCheck size={20} />
        Keep AI API keys on a secure server.
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
      `Question received:\n\n${question}\n\nAI backend is required for a real AI-generated answer. The frontend is ready for secure server-side AI integration.`
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
            onChange={(e) => setQuestion(e.target.value)}
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
          <h3>🤖 Answer</h3>

          <div className="answer">
            {answer || "Your answer will appear here."}
          </div>
        </div>
      </div>
    </main>
  );
}

/* =========================================================
   ADMIN
========================================================= */

function AdminPanel({ onClose, tools }) {
  const [tab, setTab] = useState("dashboard");
  const [adminSearch, setAdminSearch] = useState("");

  const stats = getSaved("tm-stats", {
    visits: 0,
    toolUses: 0,
  });

  const filteredTools = tools.filter((t) =>
    t[0]
      .toLowerCase()
      .includes(adminSearch.toLowerCase())
  );

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
            Manage tools and monitor browser usage.
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
          {[
            ["dashboard", LayoutDashboard, "Dashboard"],
            ["tools", Wrench, "Tools"],
            ["users", Users, "Users"],
            ["analytics", BarChart3, "Analytics"],
            ["settings", Settings, "Settings"],
          ].map(([id, Icon, label]) => (
            <button
              key={id}
              className={tab === id ? "active" : ""}
              onClick={() => setTab(id)}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </aside>

        <section className="adminContent">
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
            </>
          )}

          {tab === "tools" && (
            <>
              <h2>Tool Management</h2>

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
                  <div
                    className="toolRow"
                    key={t[3]}
                  >
                    <div>
                      <b>{t[0]}</b>
                      <small>{t[1]}</small>
                    </div>

                    <span className="status">
                      Active
                    </span>
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
                Supabase Auth can be connected here next.
              </p>
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
                  window.location.reload();
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
                  <p>3.0.0</p>
                </div>

                <div>
                  <b>Deployment</b>
                  <p>Vercel / Vite</p>
                </div>

                <div>
                  <b>Frontend</b>
                  <p>React</p>
                </div>

                <div>
                  <b>Supabase</b>
                  <p>Environment configured</p>
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
      <div className="metricIcon">
        {icon}
      </div>

      <small>{title}</small>
      <strong>{value}</strong>
    </div>
  );
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
