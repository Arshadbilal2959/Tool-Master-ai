import React, { useEffect, useMemo, useState } from "react";
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
  Moon,
  Sun,
  Heart,
  ChevronLeft,
  Trash2,
  RefreshCw,
} from "lucide-react";

import "./styles.css";
import { supabase } from "./supabase";

/* =========================================================
   ICONS
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
  "Utility Tools": Wrench,
  "AI & Education": Sparkles,
  "AI & Video": Sparkles,
  "AI Tools": Sparkles,
  "Productivity": Wrench,
};

/* =========================================================
   LOCAL FALLBACK TOOLS
   Supabase se data na aaye to ye tools show honge.
========================================================= */

const fallbackTools = [
  [
    "Text to Video",
    "AI & Video",
    "Create an AI video project from a text prompt.",
    "text-to-video",
  ],
  [
    "Student AI Helper",
    "AI & Education",
    "Get step-by-step help with study questions.",
    "student-ai-helper",
  ],
  [
    "PDF to Word",
    "PDF Tools",
    "Convert PDF documents into editable Word files.",
    "pdf-word",
  ],
  [
    "Word to PDF",
    "PDF Tools",
    "Convert Word documents into PDF.",
    "word-pdf",
  ],
  [
    "PDF to JPG",
    "PDF Tools",
    "Convert PDF pages into JPG images.",
    "pdf-jpg",
  ],
  [
    "JPG to PDF",
    "PDF Tools",
    "Create a PDF from JPG images.",
    "jpg-pdf",
  ],
  [
    "Merge PDF",
    "PDF Tools",
    "Combine multiple PDF files.",
    "merge-pdf",
  ],
  [
    "Split PDF",
    "PDF Tools",
    "Split a PDF into separate files.",
    "split-pdf",
  ],
  [
    "Compress PDF",
    "PDF Tools",
    "Reduce PDF file size.",
    "compress-pdf",
  ],
  [
    "Image Compressor",
    "Image Tools",
    "Compress JPG, PNG and WebP images.",
    "image-compressor",
  ],
  [
    "Image Resizer",
    "Image Tools",
    "Resize images to exact dimensions.",
    "image-resizer",
  ],
  [
    "Image Cropper",
    "Image Tools",
    "Crop images online.",
    "image-cropper",
  ],
  [
    "JPG to PNG",
    "Image Tools",
    "Convert JPG images to PNG.",
    "jpg-png",
  ],
  [
    "PNG to JPG",
    "Image Tools",
    "Convert PNG images to JPG.",
    "png-jpg",
  ],
  [
    "WebP Converter",
    "Image Tools",
    "Convert images to and from WebP.",
    "webp-converter",
  ],
  [
    "Image to Text",
    "Image Tools",
    "Extract text from images.",
    "image-text",
  ],
  [
    "QR Code Generator",
    "SEO & Marketing",
    "Create QR codes from links or text.",
    "qr-generator",
  ],
  [
    "Meta Tag Generator",
    "SEO & Marketing",
    "Generate SEO meta tags.",
    "meta-tags",
  ],
  [
    "Sitemap Generator",
    "SEO & Marketing",
    "Create an XML sitemap.",
    "sitemap",
  ],
  [
    "Robots.txt Generator",
    "SEO & Marketing",
    "Generate robots.txt.",
    "robots",
  ],
  [
    "Keyword Density Checker",
    "SEO & Marketing",
    "Analyze keyword frequency.",
    "keyword-density",
  ],
  [
    "URL Encoder",
    "SEO & Marketing",
    "Encode URLs safely.",
    "url-encoder",
  ],
  [
    "Word Counter",
    "Text Tools",
    "Count words and characters.",
    "word-counter",
  ],
  [
    "Case Converter",
    "Text Tools",
    "Convert text case.",
    "case-converter",
  ],
  [
    "Text Cleaner",
    "Text Tools",
    "Clean unnecessary spaces.",
    "text-cleaner",
  ],
  [
    "Lorem Ipsum Generator",
    "Text Tools",
    "Generate placeholder text.",
    "lorem",
  ],
  [
    "Duplicate Line Remover",
    "Text Tools",
    "Remove duplicate lines.",
    "duplicate-lines",
  ],
  [
    "Text Sorter",
    "Text Tools",
    "Sort lines alphabetically.",
    "text-sorter",
  ],
  [
    "Text Reverser",
    "Text Tools",
    "Reverse text.",
    "text-reverser",
  ],
  [
    "Palindrome Checker",
    "Text Tools",
    "Check if text is a palindrome.",
    "palindrome",
  ],
  [
    "Reading Time Calculator",
    "Text Tools",
    "Estimate reading time.",
    "reading-time",
  ],
  [
    "Character Counter",
    "Text Tools",
    "Count characters.",
    "characters",
  ],
  [
    "Morse Code Converter",
    "Text Tools",
    "Convert text to Morse code.",
    "morse",
  ],
  [
    "JSON Formatter",
    "Developer Tools",
    "Format and validate JSON.",
    "json-formatter",
  ],
  [
    "JSON Minifier",
    "Developer Tools",
    "Minify JSON.",
    "json-minifier",
  ],
  [
    "Base64 Encoder",
    "Developer Tools",
    "Encode text to Base64.",
    "base64-encode",
  ],
  [
    "Base64 Decoder",
    "Developer Tools",
    "Decode Base64 text.",
    "base64-decode",
  ],
  [
    "UUID Generator",
    "Developer Tools",
    "Generate UUID values.",
    "uuid",
  ],
  [
    "Hash Generator",
    "Developer Tools",
    "Create text hashes.",
    "hash",
  ],
  [
    "Timestamp Converter",
    "Developer Tools",
    "Convert Unix timestamps.",
    "timestamp",
  ],
  [
    "Regex Tester",
    "Developer Tools",
    "Test regular expressions.",
    "regex",
  ],
  [
    "Percentage Calculator",
    "Calculator Tools",
    "Calculate percentages.",
    "percentage",
  ],
  [
    "Age Calculator",
    "Calculator Tools",
    "Calculate age.",
    "age",
  ],
  [
    "BMI Calculator",
    "Calculator Tools",
    "Calculate BMI.",
    "bmi",
  ],
  [
    "Discount Calculator",
    "Calculator Tools",
    "Calculate discounts.",
    "discount",
  ],
  [
    "Loan Calculator",
    "Calculator Tools",
    "Estimate loan payments.",
    "loan",
  ],
  [
    "GST Calculator",
    "Calculator Tools",
    "Calculate GST.",
    "gst",
  ],
  [
    "Tip Calculator",
    "Calculator Tools",
    "Calculate tips.",
    "tip",
  ],
  [
    "Unit Converter",
    "Converter Tools",
    "Convert common units.",
    "units",
  ],
  [
    "Length Converter",
    "Converter Tools",
    "Convert length.",
    "length",
  ],
  [
    "Weight Converter",
    "Converter Tools",
    "Convert weight.",
    "weight",
  ],
  [
    "Temperature Converter",
    "Converter Tools",
    "Convert temperature.",
    "temperature",
  ],
  [
    "Currency Converter",
    "Converter Tools",
    "Convert currencies.",
    "currency",
  ],
  [
    "Password Generator",
    "Security Tools",
    "Generate strong passwords.",
    "password",
  ],
  [
    "Password Strength Checker",
    "Security Tools",
    "Check password strength.",
    "password-strength",
  ],
  [
    "SHA-256 Generator",
    "Security Tools",
    "Generate SHA-256 hashes.",
    "sha256",
  ],
  [
    "IP Address Info",
    "Network Tools",
    "View browser-visible IP information.",
    "ip-info",
  ],
  [
    "HTTP Status Checker",
    "Network Tools",
    "Explain HTTP status codes.",
    "http-status",
  ],
  [
    "Email Validator",
    "Utility Tools",
    "Validate email format.",
    "email-validator",
  ],
  [
    "Phone Number Formatter",
    "Utility Tools",
    "Format phone numbers.",
    "phone",
  ],
  [
    "Random Number Generator",
    "Utility Tools",
    "Generate random numbers.",
    "random-number",
  ],
  [
    "Number to Words",
    "Utility Tools",
    "Convert numbers to English words.",
    "number-words",
  ],
  [
    "Roman Numeral Converter",
    "Utility Tools",
    "Convert numbers to Roman numerals.",
    "roman",
  ],
  [
    "Business Name Generator",
    "Utility Tools",
    "Generate business name ideas.",
    "business-name",
  ],
  [
    "Username Generator",
    "Utility Tools",
    "Generate username ideas.",
    "username",
  ],
];

/* =========================================================
   HELPERS
========================================================= */

function getSaved(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function normalizeTool(row) {
  return [
    row.name || "Unnamed Tool",
    row.category_name || row.category || "Utility Tools",
    row.long_description ||
      row.description ||
      "Useful online tool.",
    row.slug || row.id,
    row,
  ];
}

/* =========================================================
   APP
========================================================= */

function App() {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dbError, setDbError] = useState("");

  const [category, setCategory] = useState("All Tools");
  const [query, setQuery] = useState("");
  const [selectedTool, setSelectedTool] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);

  const [dark, setDark] = useState(() =>
    getSaved("tm-theme", false)
  );

  const [favorites, setFavorites] = useState(() =>
    getSaved("tm-favorites", [])
  );

  /* ---------------------------------------------------------
     LOAD TOOLS FROM SUPABASE
  --------------------------------------------------------- */

  useEffect(() => {
    async function loadTools() {
      setLoading(true);
      setDbError("");

      try {
        const { data, error } = await supabase
          .from("tools")
          .select("*")
          .eq("is_active", true)
          .order("sort_order", {
            ascending: true,
          });

        if (error) {
          console.error("Supabase tools error:", error);
          setDbError(error.message);
          setTools(fallbackTools);
          return;
        }

        if (!data || data.length === 0) {
          setTools(fallbackTools);
          return;
        }

        /*
          Agar category_name table mein directly nahi hai,
          to category_id ke basis par baad mein categories
          connect ki ja sakti hain.
        */

        const formatted = data.map(normalizeTool);

        setTools(formatted);
      } catch (error) {
        console.error(error);
        setDbError("Unable to connect to Supabase.");
        setTools(fallbackTools);
      } finally {
        setLoading(false);
      }
    }

    loadTools();
  }, []);

  /* ---------------------------------------------------------
     CATEGORIES
  --------------------------------------------------------- */

  const categories = useMemo(() => {
    const names = [
      ...new Set(tools.map((tool) => tool[1])),
    ];

    return [
      ["All Tools", tools.length, Wrench],
      ...names.map((name) => [
        name,
        tools.filter((tool) => tool[1] === name).length,
        iconFor[name] || Wrench,
      ]),
    ];
  }, [tools]);

  /* ---------------------------------------------------------
     SEARCH
  --------------------------------------------------------- */

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();

    return tools.filter((tool) => {
      const categoryMatch =
        category === "All Tools" || tool[1] === category;

      const searchMatch =
        !q ||
        tool[0].toLowerCase().includes(q) ||
        tool[1].toLowerCase().includes(q) ||
        tool[2].toLowerCase().includes(q);

      return categoryMatch && searchMatch;
    });
  }, [tools, category, query]);

  /* ---------------------------------------------------------
     THEME
  --------------------------------------------------------- */

  const toggleTheme = () => {
    const next = !dark;

    setDark(next);

    localStorage.setItem(
      "tm-theme",
      JSON.stringify(next)
    );
  };

  /* ---------------------------------------------------------
     FAVORITES
  --------------------------------------------------------- */

  const toggleFavorite = (id) => {
    const next = favorites.includes(id)
      ? favorites.filter((x) => x !== id)
      : [...favorites, id];

    setFavorites(next);

    localStorage.setItem(
      "tm-favorites",
      JSON.stringify(next)
    );
  };

  /* ---------------------------------------------------------
     OPEN TOOL
  --------------------------------------------------------- */

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

  /* ---------------------------------------------------------
     UI
  --------------------------------------------------------- */

  return (
    <div className={dark ? "app dark" : "app"}>
      <header className="header">
        <div className="nav">
          <button
            className="brand"
            onClick={() => {
              setSelectedTool(null);
              setCategory("All Tools");
              setQuery("");
            }}
          >
            <div className="brandIcon">
              <Wrench size={21} />
            </div>

            <span>
              ToolMaster<span>Pro</span>
            </span>
          </button>

          <nav
            className={
              mobileMenu
                ? "navLinks show"
                : "navLinks"
            }
          >
            <a
              href="#tools"
              onClick={() =>
                setMobileMenu(false)
              }
            >
              Tools
            </a>

            <a
              href="#categories"
              onClick={() =>
                setMobileMenu(false)
              }
            >
              Categories
            </a>

            <a
              href="#about"
              onClick={() =>
                setMobileMenu(false)
              }
            >
              About
            </a>
          </nav>

          <div className="navActions">
            <button
              className="iconBtn"
              onClick={toggleTheme}
            >
              {dark ? (
                <Sun size={18} />
              ) : (
                <Moon size={18} />
              )}
            </button>

            <button
              className="mobileBtn"
              onClick={() =>
                setMobileMenu(!mobileMenu)
              }
            >
              {mobileMenu ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {selectedTool ? (
        <ToolPage
          tool={selectedTool}
          back={() => setSelectedTool(null)}
        />
      ) : (
        <>
          <section className="hero">
            <div className="pill">
              <Sparkles size={15} />

              {loading
                ? "Loading tools..."
                : `${tools.length}+ Online Tools`}
            </div>

            <h1>
              One place for{" "}
              <span>every tool</span> you need.
            </h1>

            <p>
              Fast, simple and privacy-friendly tools
              for PDF, images, SEO, text, developers,
              calculators and more.
            </p>

            <div className="searchBox">
              <Search size={20} />

              <input
                value={query}
                onChange={(e) =>
                  setQuery(e.target.value)
                }
                placeholder="Search for a tool..."
              />

              {query && (
                <button
                  onClick={() => setQuery("")}
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
                <b>
                  {Math.max(
                    0,
                    categories.length - 1
                  )}
                </b>

                <small>Categories</small>
              </div>

              <div>
                <b>100%</b>
                <small>Browser Tools</small>
              </div>
            </div>
          </section>

          {dbError && (
            <div className="container">
              <div className="notice">
                <ShieldCheck size={20} />

                Supabase connected nahi hua, isliye
                temporary local tools show ho rahe hain.
              </div>
            </div>
          )}

          <main
            id="tools"
            className="container"
          >
            <section
              id="categories"
              className="categories"
            >
              {categories.map(
                ([name, count, Icon]) => (
                  <button
                    key={name}
                    className={
                      category === name
                        ? "cat active"
                        : "cat"
                    }
                    onClick={() =>
                      setCategory(name)
                    }
                  >
                    <Icon size={18} />

                    <span>{name}</span>

                    <em>{count}</em>
                  </button>
                )
              )}
            </section>

            <div className="sectionHead">
              <div>
                <h2>{category}</h2>

                <p>
                  {filtered.length} tools available
                </p>
              </div>

              {favorites.length > 0 && (
                <div className="favoriteInfo">
                  <Heart
                    size={16}
                    fill="currentColor"
                  />

                  {favorites.length} favorites
                </div>
              )}
            </div>

            {loading ? (
              <div className="empty">
                <RefreshCw
                  size={40}
                  className="spin"
                />

                <h3>Loading tools...</h3>

                <p>
                  Supabase se tools load ho rahe hain.
                </p>
              </div>
            ) : (
              <div className="grid">
                {filtered.map((tool) => (
                  <ToolCard
                    key={tool[3]}
                    tool={tool}
                    open={() =>
                      openTool(tool)
                    }
                    favorite={favorites.includes(
                      tool[3]
                    )}
                    toggleFavorite={() =>
                      toggleFavorite(
                        tool[3]
                      )
                    }
                  />
                ))}
              </div>
            )}

            {!loading && !filtered.length && (
              <div className="empty">
                <Search size={40} />

                <h3>No tools found</h3>

                <p>
                  Try another keyword or category.
                </p>

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

            <p>
              Powerful online tools, made simple.
            </p>
          </div>

          <small>
            © 2026 ToolMaster Pro.
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
  const Icon =
    iconFor[tool[1]] || Wrench;

  return (
    <article className="card">
      <button
        className={
          favorite
            ? "favorite active"
            : "favorite"
        }
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite();
        }}
        aria-label="Favorite"
      >
        <Heart
          size={16}
          fill={
            favorite
              ? "currentColor"
              : "none"
          }
        />
      </button>

      <div
        className="cardClick"
        onClick={open}
      >
        <div className="toolIcon">
          <Icon size={21} />
        </div>

        <div className="cardBody">
          <span>{tool[1]}</span>

          <h3>{tool[0]}</h3>

          <p>{tool[2]}</p>
        </div>

        <ArrowRight
          className="arrow"
          size={19}
        />
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

  const runTool = async () => {
    const id = tool[3];

    let result = input;

    try {
      switch (id) {
        case "word-counter": {
          const words = input.trim()
            ? input.trim().split(/\s+/).length
            : 0;

          result =
            `Words: ${words}\n` +
            `Characters: ${input.length}\n` +
            `Characters without spaces: ${
              input.replace(/\s/g, "").length
            }`;

          break;
        }

        case "characters":
          result =
            `Characters: ${input.length}\n` +
            `Without spaces: ${
              input.replace(/\s/g, "").length
            }`;

          break;

        case "case-converter":
          result = input.toLowerCase();
          break;

        case "text-cleaner":
          result = input
            .replace(/\s+/g, " ")
            .trim();
          break;

        case "text-reverser":
          result = [...input]
            .reverse()
            .join("");
          break;

        case "slug":
          result = input
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(
              /^-+|-+$/g,
              ""
            );

          break;

        case "url-encoder":
          result =
            encodeURIComponent(input);
          break;

        case "base64-encode":
          result = btoa(
            unescape(
              encodeURIComponent(input)
            )
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
          result = JSON.stringify(
            JSON.parse(input)
          );

          break;

        case "uuid":
          result =
            crypto.randomUUID();
          break;

        case "password":
          result =
            generatePassword(18);
          break;

        case "random-password":
          result =
            generatePassword(18);
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
            .map((c) =>
              c.charCodeAt(0)
            )
            .join(" ");

          break;

        case "morse":
          result =
            textToMorse(input);
          break;

        case "palindrome": {
          const clean = input
            .toLowerCase()
            .replace(
              /[^a-z0-9]/g,
              ""
            );

          result =
            clean ===
            [...clean]
              .reverse()
              .join("")
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
              input
                .split("\n")
                .filter(Boolean)
            ),
          ].join("\n");

          break;

        default:
          result =
            "This tool is ready. Full processing can be connected next.";
      }
    } catch {
      result =
        "Invalid input. Please check your data and try again.";
    }

    setOutput(result);

    const stats = getSaved(
      "tm-stats",
      {
        visits: 0,
        toolUses: 0,
      }
    );

    stats.toolUses += 1;

    localStorage.setItem(
      "tm-stats",
      JSON.stringify(stats)
    );
  };

  const copy = async () => {
    if (!output) return;

    try {
      await navigator.clipboard.writeText(
        output
      );
    } catch {}

    setCopied(true);

    setTimeout(
      () => setCopied(false),
      1500
    );
  };

  return (
    <main className="toolPage container">
      <button
        className="back"
        onClick={back}
      >
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

        Most browser tools process data locally.
      </div>
    </main>
  );
}

/* =========================================================
   PASSWORD
========================================================= */

function generatePassword(
  length = 18
) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

  const values =
    crypto.getRandomValues(
      new Uint32Array(length)
    );

  return [...values]
    .map(
      (v) =>
        chars[
          v % chars.length
        ]
    )
    .join("");
}

/* =========================================================
   MORSE
========================================================= */

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
    .map((c) =>
      c === " "
        ? "/"
        : map[c] || c
    )
    .join(" ");
}

/* =========================================================
   MOUNT
========================================================= */

const root =
  document.getElementById("root");

if (!root) {
  throw new Error(
    "Root element not found."
  );
}

createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
