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

import "./styles.css";
import { createClient } from "@supabase/supabase-js";

/* =========================================================
   SUPABASE CONFIG
========================================================= */

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

const SUPABASE_KEY =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(
  SUPABASE_URL || "",
  SUPABASE_KEY || ""
);

const PDF_TO_WORD_FUNCTION = SUPABASE_URL
  ? `${SUPABASE_URL}/functions/v1/pdf-to-word`
  : "";

/* =========================================================
   FALLBACK TOOLS
========================================================= */

const fallbackTools = [
  [
    "Text to Video",
    "AI & Video",
    "Turn a written prompt or script into an AI video project.",
    "text-to-video",
  ],
  [
    "Student AI Helper",
    "AI & Education",
    "Ask questions or upload study material and get AI help.",
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
    "Turn PDF pages into JPG images.",
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
    "Combine multiple PDF files into one.",
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
    "Rotate PDF",
    "PDF Tools",
    "Rotate PDF pages.",
    "rotate-pdf",
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
    "Extract text from an image.",
    "image-text",
  ],

  [
    "QR Code Generator",
    "SEO & Marketing",
    "Create custom QR codes from text or links.",
    "qr-generator",
  ],
  [
    "Meta Tag Generator",
    "SEO & Marketing",
    "Generate SEO-ready meta tags.",
    "meta-tags",
  ],
  [
    "Sitemap Generator",
    "SEO & Marketing",
    "Create a basic XML sitemap.",
    "sitemap",
  ],
  [
    "Robots.txt Generator",
    "SEO & Marketing",
    "Generate robots.txt content.",
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
    "Open Graph Generator",
    "SEO & Marketing",
    "Create Open Graph meta tags.",
    "open-graph",
  ],
  [
    "Schema Markup Generator",
    "SEO & Marketing",
    "Create JSON-LD schema templates.",
    "schema",
  ],
  [
    "Favicon Generator",
    "SEO & Marketing",
    "Prepare favicon assets.",
    "favicon",
  ],
  [
    "UTM Builder",
    "SEO & Marketing",
    "Build campaign tracking URLs.",
    "utm",
  ],
  [
    "URL Slug Generator",
    "SEO & Marketing",
    "Create clean SEO slugs.",
    "slug",
  ],

  [
    "Word Counter",
    "Text Tools",
    "Count words, characters and sentences.",
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
    "Remove extra spaces and clean text.",
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
    "Check whether text is a palindrome.",
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
    "Decode Base64.",
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
    "Create common hashes.",
    "hash",
  ],
  [
    "URL Parser",
    "Developer Tools",
    "Break a URL into parts.",
    "url-parser",
  ],
  [
    "CSV to JSON",
    "Developer Tools",
    "Convert CSV text to JSON.",
    "csv-json",
  ],
  [
    "JSON to CSV",
    "Developer Tools",
    "Convert JSON arrays to CSV.",
    "json-csv",
  ],

  [
    "Password Generator",
    "Security Tools",
    "Generate strong random passwords.",
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
    "Convert temperatures.",
    "temperature",
  ],
  [
    "Currency Converter",
    "Converter Tools",
    "Convert currencies using an entered rate.",
    "currency",
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
    "Clean phone numbers.",
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
   CATEGORY ICONS
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

/* =========================================================
   HELPERS
========================================================= */

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

function formatFileSize(bytes) {
  if (!bytes) return "0 Bytes";

  const units = [
    "Bytes",
    "KB",
    "MB",
    "GB",
  ];

  const index = Math.floor(
    Math.log(bytes) / Math.log(1024)
  );

  return `${(
    bytes /
    Math.pow(1024, index)
  ).toFixed(2)} ${units[index]}`;
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");

  a.href = url;
  a.download = filename;

  document.body.appendChild(a);
  a.click();
  a.remove();

  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 1000);
}

function safeClipboard(text) {
  if (!text) return;

  navigator.clipboard
    ?.writeText(text)
    .catch(() => {});
}

/* =========================================================
   APP
========================================================= */

function App() {
  const [dbTools, setDbTools] = useState([]);

  const [toolsLoading, setToolsLoading] =
    useState(true);

  const [toolsError, setToolsError] =
    useState("");

  const [cat, setCat] =
    useState("All Tools");

  const [query, setQuery] =
    useState("");

  const [tool, setTool] =
    useState(null);

  const [admin, setAdmin] =
    useState(false);

  const [adminUser, setAdminUser] =
    useState(null);

  const [authLoading, setAuthLoading] =
    useState(true);

  const [showAdminLogin, setShowAdminLogin] =
    useState(false);

  const loadTools = async () => {
    setToolsLoading(true);
    setToolsError("");

    if (!SUPABASE_URL || !SUPABASE_KEY) {
      setToolsError(
        "Supabase environment variables are missing."
      );

      setDbTools([]);
      setToolsLoading(false);

      return;
    }

    try {
      const { data, error } =
        await supabase
          .from("tools")
          .select(
            "id,name,category,description,slug,icon,is_active,sort_order,created_at"
          )
          .order("sort_order", {
            ascending: true,
          })
          .order("created_at", {
            ascending: true,
          });

      if (error) {
        console.error(
          "Tools load error:",
          error
        );

        setToolsError(error.message);
        setDbTools([]);
      } else {
        setDbTools(
          (data || []).map(
            normalizeTool
          )
        );
      }
    } catch (error) {
      console.error(error);

      setToolsError(
        error?.message ||
          "Unable to load tools."
      );

      setDbTools([]);
    } finally {
      setToolsLoading(false);
    }
  };

  useEffect(() => {
    loadTools();
  }, []);

  useEffect(() => {
    let mounted = true;

    async function loadSession() {
      try {
        const {
          data,
        } =
          await supabase.auth.getSession();

        if (!mounted) return;

        if (data.session?.user) {
          const isAdmin =
            await verifyAdmin(
              data.session.user
            );

          if (!mounted) return;

          if (isAdmin) {
            setAdminUser(
              data.session.user
            );

            setAdmin(true);
          }
        }
      } catch (error) {
        console.error(
          "Session error:",
          error
        );
      } finally {
        if (mounted) {
          setAuthLoading(false);
        }
      }
    }

    loadSession();

    const {
      data: listener,
    } =
      supabase.auth.onAuthStateChange(
        (_event, session) => {
          setTimeout(async () => {
            if (!mounted) return;

            if (!session?.user) {
              setAdminUser(null);
              setAdmin(false);
              return;
            }

            const isAdmin =
              await verifyAdmin(
                session.user
              );

            if (!mounted) return;

            if (isAdmin) {
              setAdminUser(
                session.user
              );

              setAdmin(true);
            } else {
              await supabase.auth.signOut();

              setAdminUser(null);
              setAdmin(false);
              setShowAdminLogin(false);
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
    if (dbTools.length > 0) {
      return dbTools;
    }

    return fallbackTools.map(
      fallbackToObject
    );
  }, [dbTools]);

  const activeTools = useMemo(
    () =>
      allTools.filter(
        (item) =>
          item.is_active !== false
      ),
    [allTools]
  );

  const categories = useMemo(() => {
    const counts = {};

    activeTools.forEach((item) => {
      counts[item.category] =
        (counts[item.category] || 0) + 1;
    });

    const result = [
      [
        "All Tools",
        activeTools.length,
        Wrench,
      ],
    ];

    Object.keys(counts)
      .sort()
      .forEach((category) => {
        result.push([
          category,
          counts[category],
          categoryIcons[category] ||
            Wrench,
        ]);
      });

    return result;
  }, [activeTools]);

  const filtered = useMemo(() => {
    const q =
      query.trim().toLowerCase();

    return activeTools.filter((t) => {
      const categoryMatch =
        cat === "All Tools" ||
        t.category === cat;

      const searchMatch =
        !q ||
        t.name
          .toLowerCase()
          .includes(q) ||
        t.category
          .toLowerCase()
          .includes(q) ||
        t.description
          .toLowerCase()
          .includes(q);

      return (
        categoryMatch &&
        searchMatch
      );
    });
  }, [
    activeTools,
    cat,
    query,
  ]);

  const openTool = (selectedTool) => {
    setTool(selectedTool);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const backHome = () => {
    setTool(null);

    if (admin) {
      setAdmin(false);
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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
            <a href="#tools">
              Tools
            </a>

            <a href="#categories">
              Categories
            </a>

            <a href="#about">
              About
            </a>
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
                setShowAdminLogin(
                  true
                );
              }
            }}
            type="button"
          >
            <LayoutDashboard
              size={17}
            />

            {admin
              ? "Close Admin"
              : "Admin"}
          </button>
        </div>
      </header>

      {admin ? (
        <Admin
          user={adminUser}
          tools={allTools}
          refreshTools={loadTools}
          onClose={() => {
            setAdmin(false);
            setTool(null);
          }}
          onLogout={async () => {
            await supabase.auth.signOut();

            setAdminUser(null);
            setAdmin(false);
            setShowAdminLogin(
              false
            );
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

              {activeTools.length}+
              Free Online Tools
            </div>

            <h1>
              One place for{" "}
              <span>
                every tool
              </span>{" "}
              you need.
            </h1>

            <p>
              Fast, simple and
              privacy-friendly
              online tools for PDF,
              images, SEO, text,
              developers,
              calculators and more.
            </p>

            <div className="search">
              <Search />

              <input
                value={query}
                onChange={(e) =>
                  setQuery(
                    e.target.value
                  )
                }
                placeholder="Search for a tool..."
              />

              {query && (
                <button
                  type="button"
                  onClick={() =>
                    setQuery("")
                  }
                >
                  <X size={18} />
                </button>
              )}
            </div>

            <div className="stats">
              <div>
                <b>
                  {activeTools.length}+
                </b>

                <small>
                  Tools
                </small>
              </div>

              <div>
                <b>
                  {Math.max(
                    0,
                    categories.length - 1
                  )}
                </b>

                <small>
                  Categories
                </small>
              </div>

              <div>
                <b>100%</b>

                <small>
                  Browser-based
                </small>
              </div>
            </div>
          </section>

          <main id="tools">
            {toolsError && (
              <div className="errorBox">
                <AlertCircle size={22} />

                <div>
                  <strong>
                    Database tools could not
                    be loaded
                  </strong>

                  <p>
                    {toolsError}
                  </p>

                  <button
                    className="secondary"
                    onClick={loadTools}
                    type="button"
                  >
                    <RefreshCw
                      size={16}
                    />
                    Retry
                  </button>
                </div>
              </div>
            )}

            <section
              id="categories"
              className="categories"
            >
              {categories.map(
                ([
                  name,
                  count,
                  Icon,
                ]) => (
                  <button
                    key={name}
                    type="button"
                    className={
                      cat === name
                        ? "cat active"
                        : "cat"
                    }
                    onClick={() => {
                      setCat(name);
                      setQuery("");
                    }}
                  >
                    <Icon />

                    <span>
                      {name}
                    </span>

                    <em>
                      {count}
                    </em>
                  </button>
                )
              )}
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
                type="button"
                disabled={
                  toolsLoading
                }
              >
                <RefreshCw
                  size={16}
                  className={
                    toolsLoading
                      ? "spin"
                      : ""
                  }
                />

                Refresh
              </button>
            </div>

            <div className="grid">
              {filtered.map((t) => (
                <ToolCard
                  key={
                    t.id ||
                    t.slug
                  }
                  t={t}
                  open={() =>
                    openTool(t)
                  }
                />
              ))}
            </div>

            {!toolsLoading &&
              !filtered.length && (
                <div className="empty">
                  No active tools
                  found.
                </div>
              )}
          </main>
        </>
      )}

      {showAdminLogin &&
        !admin && (
          <AdminLogin
            onClose={() =>
              setShowAdminLogin(
                false
              )
            }
            onSuccess={(user) => {
              setAdminUser(user);
              setAdmin(true);
              setShowAdminLogin(
                false
              );
              setTool(null);
            }}
          />
        )}

      {authLoading && (
        <div className="authLoading">
          <Loader2
            className="spin"
            size={22}
          />

          <span>
            Checking secure session...
          </span>
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

        <p>
          Powerful online tools,
          made simple.
        </p>

        <small>
          © 2026 ToolMaster Pro.
        </small>
      </footer>
    </div>
  );
}

/* =========================================================
   TOOL CARD
========================================================= */

function ToolCard({ t, open }) {
  const Icon =
    categoryIcons[t.category] ||
    Wrench;

  return (
    <article
      className="card"
      onClick={open}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          open();
        }
      }}
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
   TOOL PAGE
========================================================= */

function ToolPage({ t, back }) {
  if (t.slug === "pdf-word") {
    return (
      <PdfToWord back={back} />
    );
  }

  if (
    t.slug ===
    "student-ai-helper"
  ) {
    return (
      <StudentAIHelper
        back={back}
      />
    );
  }

  if (
    t.slug ===
    "text-to-video"
  ) {
    return (
      <TextToVideo back={back} />
    );
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
  const fileInputRef =
    useRef(null);

  const [selectedFile, setSelectedFile] =
    useState(null);

  const [dragging, setDragging] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [downloadUrl, setDownloadUrl] =
    useState("");

  const [downloadName, setDownloadName] =
    useState("");

  const cleanupDownload = () => {
    if (
      downloadUrl &&
      downloadUrl.startsWith(
        "blob:"
      )
    ) {
      URL.revokeObjectURL(
        downloadUrl
      );
    }
  };

  useEffect(() => {
    return () => {
      cleanupDownload();
    };
  }, [downloadUrl]);

  const selectFile = (file) => {
    setError("");
    setSuccess("");

    cleanupDownload();

    setDownloadUrl("");
    setDownloadName("");

    if (!file) {
      setSelectedFile(null);
      return;
    }

    const filename =
      file.name.toLowerCase();

    const isPdf =
      file.type ===
        "application/pdf" ||
      filename.endsWith(".pdf");

    if (!isPdf) {
      setSelectedFile(null);

      setError(
        "Please select a PDF file only."
      );

      return;
    }

    if (
      file.size >
      20 * 1024 * 1024
    ) {
      setSelectedFile(null);

      setError(
        "Maximum PDF size is 20 MB."
      );

      return;
    }

    setSelectedFile(file);
  };

  const chooseFile = () => {
    fileInputRef.current?.click();
  };

  const removeFile = () => {
    cleanupDownload();

    setSelectedFile(null);
    setError("");
    setSuccess("");
    setDownloadUrl("");
    setDownloadName("");

    if (fileInputRef.current) {
      fileInputRef.current.value =
        "";
    }
  };

  const convert = async () => {
    setError("");
    setSuccess("");

    if (!selectedFile) {
      setError(
        "Please select a PDF file first."
      );

      return;
    }

    if (!SUPABASE_URL) {
      setError(
        "VITE_SUPABASE_URL is missing."
      );

      return;
    }

    if (!SUPABASE_KEY) {
      setError(
        "VITE_SUPABASE_PUBLISHABLE_KEY or VITE_SUPABASE_ANON_KEY is missing."
      );

      return;
    }

    if (!PDF_TO_WORD_FUNCTION) {
      setError(
        "PDF conversion function URL is missing."
      );

      return;
    }

    setLoading(true);

    try {
      const formData =
        new FormData();

      formData.append(
        "file",
        selectedFile,
        selectedFile.name
      );

      const response =
        await fetch(
          PDF_TO_WORD_FUNCTION,
          {
            method: "POST",
            headers: {
              Authorization:
                `Bearer ${SUPABASE_KEY}`,
              apikey:
                SUPABASE_KEY,
            },
            body: formData,
          }
        );

      const contentType =
        response.headers.get(
          "content-type"
        ) || "";

      if (!response.ok) {
        let message =
          `Conversion failed (${response.status}).`;

        try {
          if (
            contentType.includes(
              "application/json"
            )
          ) {
            const json =
              await response.json();

            message =
              json.error ||
              json.message ||
              message;
          } else {
            const text =
              await response.text();

            if (text.trim()) {
              message =
                text.trim();
            }
          }
        } catch {}

        throw new Error(
          message
        );
      }

      /*
       * Some Edge Functions return
       * the actual DOCX file.
       */
      if (
        contentType.includes(
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) ||
        contentType.includes(
          "application/octet-stream"
        )
      ) {
        const blob =
          await response.blob();

        if (!blob.size) {
          throw new Error(
            "The server returned an empty Word file."
          );
        }

        const name =
          selectedFile.name.replace(
            /\.pdf$/i,
            ""
          ) + ".docx";

        cleanupDownload();

        const url =
          URL.createObjectURL(
            blob
          );

        setDownloadUrl(url);
        setDownloadName(name);
        setSuccess(
          "PDF converted successfully!"
        );

        return;
      }

      /*
       * Some Edge Functions return JSON
       * containing a download URL.
       */
      if (
        contentType.includes(
          "application/json"
        )
      ) {
        const data =
          await response.json();

        const url =
          data.downloadUrl ||
          data.download_url ||
          data.url;

        if (!url) {
          throw new Error(
            data.error ||
              data.message ||
              "Conversion completed but no download file was returned."
          );
        }

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

      /*
       * Fallback: treat response as file.
       */
      const blob =
        await response.blob();

      if (!blob.size) {
        throw new Error(
          "The conversion server returned an empty file."
        );
      }

      const name =
        selectedFile.name.replace(
          /\.pdf$/i,
          ""
        ) + ".docx";

      const url =
        URL.createObjectURL(
          blob
        );

      setDownloadUrl(url);
      setDownloadName(name);

      setSuccess(
        "PDF converted successfully!"
      );
    } catch (error) {
      console.error(
        "PDF to Word error:",
        error
      );

      setError(
        error?.message ||
          "Something went wrong while converting the PDF."
      );
    } finally {
      setLoading(false);
    }
  };

  const download = () => {
    if (!downloadUrl) return;

    const a =
      document.createElement(
        "a"
      );

    a.href =
      downloadUrl;

    a.download =
      downloadName ||
      "converted-document.docx";

    a.target = "_blank";
    a.rel = "noopener";

    document.body.appendChild(
      a
    );

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
          <span>
            PDF Tools
          </span>

          <h1>
            PDF to Word
          </h1>

          <p>
            Convert your PDF
            documents into editable
            Word files.
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
          e.stopPropagation();
          setDragging(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setDragging(false);
        }}
        onDrop={(e) => {
          e.preventDefault();
          e.stopPropagation();

          setDragging(false);

          selectFile(
            e.dataTransfer.files?.[0]
          );
        }}
      >
        {!selectedFile ? (
          <div
            className="pdfChoose"
            onClick={chooseFile}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (
                e.key ===
                  "Enter" ||
                e.key === " "
              ) {
                chooseFile();
              }
            }}
          >
            <Upload size={42} />

            <h3>
              Upload your PDF
            </h3>

            <p>
              Drag & drop your PDF
              here or click to browse
            </p>

            <span className="primary">
              Choose PDF
            </span>

            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,application/pdf"
              onChange={(e) =>
                selectFile(
                  e.target.files?.[0]
                )
              }
              onClick={(e) =>
                e.stopPropagation()
              }
              style={{
                display: "none",
              }}
            />

            <small>
              Maximum file size: 20 MB
            </small>
          </div>
        ) : (
          <div className="pdfSelected">
            <div className="selectedFile">
              <FileText size={30} />

              <div>
                <strong>
                  {selectedFile.name}
                </strong>

                <small>
                  {formatFileSize(
                    selectedFile.size
                  )}
                </small>
              </div>
            </div>

            <button
              type="button"
              className="iconButton"
              onClick={
                removeFile
              }
              disabled={loading}
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

      {success &&
        downloadUrl && (
          <div className="successBox">
            <CheckCircle2 size={27} />

            <div>
              <strong>
                {success}
              </strong>

              <p>
                Your Word document
                is ready.
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
          Your PDF is uploaded only
          when you press Convert to
          Word.
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
      `Video project prepared: ${style}, ${duration}.`
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
          <span>
            AI & Video
          </span>

          <h1>
            Text to Video
          </h1>

          <p>
            Create an AI video
            project from a written
            prompt.
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
              setPrompt(
                e.target.value
              )
            }
            placeholder="Example: A cinematic drone shot of a futuristic city at sunset..."
          />

          <div className="videoOptions">
            <label>
              Style

              <select
                value={style}
                onChange={(e) =>
                  setStyle(
                    e.target.value
                  )
                }
              >
                <option>
                  Cinematic
                </option>

                <option>
                  Realistic
                </option>

                <option>
                  Anime
                </option>

                <option>
                  3D Animation
                </option>

                <option>
                  Documentary
                </option>

                <option>
                  Product Ad
                </option>
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
                <option>
                  5 seconds
                </option>

                <option>
                  10 seconds
                </option>

                <option>
                  15 seconds
                </option>

                <option>
                  30 seconds
                </option>
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
              Your generated video
              will appear here
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
          Real AI video generation
          requires a secure
          server-side provider.
        </span>
      </div>
    </main>
  );
}

/* =========================================================
   STUDENT AI HELPER
========================================================= */

function StudentAIHelper({ back }) {
  const fileInputRef =
    useRef(null);

  const [question, setQuestion] =
    useState("");

  const [file, setFile] =
    useState(null);

  const [answer, setAnswer] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const chooseFile = () => {
    fileInputRef.current?.click();
  };

  const selectFile = (selected) => {
    setError("");

    if (!selected) return;

    const allowed = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/webp",
      "text/plain",
    ];

    const ext =
      selected.name
        .split(".")
        .pop()
        ?.toLowerCase();

    const allowedExt = [
      "pdf",
      "jpg",
      "jpeg",
      "png",
      "webp",
      "txt",
      "doc",
      "docx",
    ];

    if (
      !allowed.includes(
        selected.type
      ) &&
      !allowedExt.includes(
        ext
      )
    ) {
      setError(
        "Please upload PDF, JPG, PNG, WebP, TXT, DOC or DOCX."
      );

      return;
    }

    if (
      selected.size >
      20 * 1024 * 1024
    ) {
      setError(
        "Maximum file size is 20 MB."
      );

      return;
    }

    setFile(selected);
  };

  const solve = async () => {
    setError("");

    if (
      !question.trim() &&
      !file
    ) {
      setError(
        "Please enter a question or upload study material."
      );

      return;
    }

    setLoading(true);

    /*
     * At this stage the file is correctly
     * selected in the browser.
     *
     * Actual AI processing needs a
     * server-side AI function/provider.
     */
    setTimeout(() => {
      setAnswer(
        `Your request is ready for AI processing.

Question:
${question || "No text question provided."}

Study file:
${file?.name || "No file uploaded."}

Connect an AI Edge Function to send this question/file to an AI model securely.`
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

          <div
            className="uploadBox"
            onClick={chooseFile}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (
                e.key ===
                  "Enter" ||
                e.key === " "
              ) {
                chooseFile();
              }
            }}
          >
            <Upload />

            <div>
              <b>
                {file
                  ? "File selected"
                  : "Upload study material"}
              </b>

              <small>
                PDF, JPG, PNG, TXT,
                DOC or DOCX
              </small>

              {file && (
                <strong>
                  {file.name}
                  <br />
                  {formatFileSize(
                    file.size
                  )}
                </strong>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.webp,.txt,.doc,.docx"
              onChange={(e) =>
                selectFile(
                  e.target.files?.[0]
                )
              }
              onClick={(e) =>
                e.stopPropagation()
              }
              style={{
                display: "none",
              }}
            />

            {file && (
              <button
                type="button"
                className="iconButton"
                onClick={(e) => {
                  e.stopPropagation();

                  setFile(null);

                  if (
                    fileInputRef.current
                  ) {
                    fileInputRef.current.value =
                      "";
                  }
                }}
              >
                <X size={18} />
              </button>
            )}
          </div>

          {error && (
            <div className="authError">
              <AlertCircle size={18} />

              <span>
                {error}
              </span>
            </div>
          )}

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
                safeClipboard(
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

  const [extra, setExtra] =
    useState("");

  const run = async () => {
    let result = text;

    try {
      switch (t.slug) {
        case "word-counter":
          result =
            `Words: ${
              text.trim()
                ? text
                    .trim()
                    .split(
                      /\s+/
                    ).length
                : 0
            }
Characters: ${text.length}
Characters without spaces: ${text.replace(
              /\s/g,
              ""
            ).length}`;
          break;

        case "characters":
          result =
            `Characters: ${text.length}
Without spaces: ${text.replace(
              /\s/g,
              ""
            ).length}`;
          break;

        case "case-converter":
          result =
            `UPPERCASE:
${text.toUpperCase()}

lowercase:
${text.toLowerCase()}

Title Case:
${text
  .toLowerCase()
  .replace(
    /\b\w/g,
    (c) =>
      c.toUpperCase()
  )}`;
          break;

        case "text-reverser":
          result =
            [...text]
              .reverse()
              .join("");
          break;

        case "slug":
          result =
            text
              .toLowerCase()
              .trim()
              .replace(
                /[^a-z0-9]+/g,
                "-"
              )
              .replace(
                /^-|-$/g,
                "");
          break;

        case "url-encoder":
          result =
            encodeURIComponent(
              text
            );
          break;

        case "base64-encode":
          result =
            btoa(
              unescape(
                encodeURIComponent(
                  text
                )
              )
            );
          break;

        case "base64-decode":
          result =
            decodeURIComponent(
              escape(
                atob(text)
              )
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

        case "password":
          result =
            generatePassword(18);
          break;

        case "password-strength":
          result =
            passwordStrength(
              text
            );
          break;

        case "sha256":
          result =
            await sha256(text);
          break;

        case "morse":
          result =
            textToMorse(text);
          break;

        case "palindrome": {
          const clean =
            text
              .toLowerCase()
              .replace(
                /[^a-z0-9]/g,
                "");

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
              .replace(
                /[ \t]+/g,
                " "
              )
              .replace(
                /\n\s*\n+/g,
                "\n"
              )
              .trim();
          break;

        case "duplicate-lines": {
          const lines =
            text
              .split("\n")
              .map((x) =>
                x.trim()
              )
              .filter(Boolean);

          result = [
            ...new Set(lines),
          ].join("\n");

          break;
        }

        case "text-sorter":
          result =
            text
              .split("\n")
              .sort(
                (a, b) =>
                  a.localeCompare(b)
              )
              .join("\n");
          break;

        case "reading-time": {
          const words = text.trim()
            ? text
                .trim()
                .split(/\s+/)
                .length
            : 0;

          const minutes =
            Math.max(
              1,
              Math.ceil(
                words / 200
              )
            );

          result =
            `Words: ${words}
Estimated reading time: ${minutes} minute(s)`;
          break;
        }

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

        case "random-number": {
          const min =
            Number(
              text || 0
            );

          const max =
            Number(
              extra || 100
            );

          if (
            Number.isNaN(
              min
            ) ||
            Number.isNaN(
              max
            )
          ) {
            throw new Error(
              "Enter valid minimum and maximum numbers."
            );
          }

          result = String(
            Math.floor(
              Math.random() *
                (max -
                  min +
                  1)
            ) + min
          );

          break;
        }

        case "percentage": {
          const value =
            Number(text);

          const percent =
            Number(extra);

          if (
            !Number.isFinite(
              value
            ) ||
            !Number.isFinite(
              percent
            )
          ) {
            throw new Error(
              "Enter number in input and percentage in Extra Value."
            );
          }

          result =
            `${percent}% of ${value} = ${
              (value *
                percent) /
              100
            }`;

          break;
        }

        case "discount": {
          const price =
            Number(text);

          const discount =
            Number(extra);

          const saved =
            (price *
              discount) /
            100;

          result =
            `Original Price: ${price}
Discount: ${discount}%
You Save: ${saved.toFixed(
              2
            )}
Final Price: ${(price -
              saved).toFixed(
              2
            )}`;

          break;
        }

        case "temperature": {
          const value =
            Number(text);

          const celsius =
            value;

          const fahrenheit =
            (value * 9) /
              5 +
            32;

          const kelvin =
            value + 273.15;

          result =
            `Celsius: ${celsius.toFixed(
              2
            )}
Fahrenheit: ${fahrenheit.toFixed(
              2
            )}
Kelvin: ${kelvin.toFixed(
              2
            )}`;

          break;
        }

        default:
          result =
            "This tool is ready. Enter your content and run the tool.";
      }
    } catch (error) {
      result =
        `Invalid input: ${
          error?.message ||
          "Unable to process."
        }`;
    }

    setOut(result);
  };

  const clear = () => {
    setText("");
    setExtra("");
    setOut("");
  };

  const Icon =
    categoryIcons[t.category] ||
    Wrench;

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
          <Icon />
        </div>

        <div>
          <span>
            {t.category}
          </span>

          <h1>{t.name}</h1>

          <p>
            {t.description}
          </p>
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
              setText(
                e.target.value
              )
            }
            placeholder="Paste or type your content here..."
          />

          {[
            "percentage",
            "discount",
            "random-number",
          ].includes(
            t.slug
          ) && (
            <label>
              Extra value

              <input
                value={extra}
                onChange={(e) =>
                  setExtra(
                    e.target.value
                  )
                }
                placeholder={
                  t.slug ===
                  "random-number"
                    ? "Maximum"
                    : "Percentage"
                }
              />
            </label>
          )}

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
                safeClipboard(out)
              }
              type="button"
              disabled={!out}
            >
              <Copy size={17} />

              Copy Result
            </button>

            {out && (
              <button
                className="secondary"
                type="button"
                onClick={() =>
                  downloadBlob(
                    new Blob(
                      [out],
                      {
                        type:
                          "text/plain;charset=utf-8",
                      }
                    ),
                    "toolmaster-result.txt"
                  )
                }
              >
                <Download
                  size={17}
                />

                Download
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="notice">
        <ShieldCheck />

        <span>
          Processing is designed to
          happen locally in your
          browser whenever possible.
        </span>
      </div>
    </main>
  );
}

/* =========================================================
   ADMIN LOGIN
========================================================= */

function AdminLogin({
  onClose,
  onSuccess,
}) {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const login = async (e) => {
    e.preventDefault();

    setError("");

    if (
      !email.trim() ||
      !password
    ) {
      setError(
        "Please enter your admin email and password."
      );

      return;
    }

    if (
      !SUPABASE_URL ||
      !SUPABASE_KEY
    ) {
      setError(
        "Supabase configuration is missing."
      );

      return;
    }

    setLoading(true);

    try {
      const {
        data,
        error: authError,
      } =
        await supabase.auth.signInWithPassword(
          {
            email:
              email.trim(),
            password,
          }
        );

      if (authError)
        throw authError;

      if (!data.user) {
        throw new Error(
          "Login failed."
        );
      }

      const isAdmin =
        await verifyAdmin(
          data.user
        );

      if (!isAdmin) {
        await supabase.auth.signOut();

        throw new Error(
          "Access denied. This account does not have the admin role."
        );
      }

      onSuccess(
        data.user
      );
    } catch (err) {
      setError(
        err?.message ||
          "Unable to sign in."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="authOverlay"
      role="dialog"
      aria-modal="true"
    >
      <form
        className="authCard"
        onSubmit={login}
      >
        <button
          className="authClose"
          type="button"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        <div className="toolIcon big authIcon">
          <LockKeyhole />
        </div>

        <span className="pill">
          Secure Admin Access
        </span>

        <h2>
          Admin Login
        </h2>

        <p>
          Sign in with an account
          that has the{" "}
          <b>admin</b> role.
        </p>

        <label>
          Email

          <input
            type="email"
            autoComplete="username"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            placeholder="admin@example.com"
          />
        </label>

        <label>
          Password

          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            placeholder="••••••••"
          />
        </label>

        {error && (
          <div className="authError">
            <AlertCircle size={18} />

            <span>
              {error}
            </span>
          </div>
        )}

        <button
          className="primary authSubmit"
          disabled={loading}
          type="submit"
        >
          {loading ? (
            <>
              <Loader2
                className="spin"
                size={18}
              />

              Signing in...
            </>
          ) : (
            <>
              <LockKeyhole
                size={18}
              />

              Sign in to Admin
            </>
          )}
        </button>

        <small className="authSecurity">
          <ShieldCheck size={15} />

          Authentication and
          session are handled by
          Supabase.
        </small>
      </form>
    </div>
  );
}

/* =========================================================
   ADMIN VERIFICATION
========================================================= */

async function verifyAdmin(user) {
  if (!user?.id) {
    return false;
  }

  try {
    const {
      data,
      error,
    } =
      await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .maybeSingle();

    if (error) {
      console.error(
        "Admin role check failed:",
        error
      );

      return false;
    }

    return data?.role === "admin";
  } catch (error) {
    console.error(error);

    return false;
  }
}

/* =========================================================
   ADMIN PANEL
========================================================= */

function Admin({
  user,
  tools,
  refreshTools,
  onClose,
  onLogout,
}) {
  const [
    activeSection,
    setActiveSection,
  ] = useState("dashboard");

  const sections = [
    [
      "dashboard",
      "Dashboard",
      LayoutDashboard,
    ],
    [
      "tools",
      "Manage Tools",
      Settings,
    ],
    [
      "users",
      "Manage Users",
      LockKeyhole,
    ],
    [
      "analytics",
      "Analytics",
      LayoutDashboard,
    ],
  ];

  return (
    <main className="admin">
      <div className="adminTop">
        <div>
          <span className="pill">
            <ShieldCheck size={15} />

            Secure Admin Panel
          </span>

          <h1>
            ToolMaster Pro
            Control Center
          </h1>

          <p>
            Welcome,{" "}
            {user?.email ||
              "Administrator"}
            .
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
        {sections.map(
          ([
            id,
            label,
            Icon,
          ]) => (
            <button
              key={id}
              type="button"
              className={
                activeSection ===
                id
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveSection(
                  id
                )
              }
            >
              <Icon size={17} />

              {label}
            </button>
          )
        )}
      </div>

      {activeSection ===
        "dashboard" && (
        <AdminDashboard
          tools={tools}
          goTools={() =>
            setActiveSection(
              "tools"
            )
          }
          goUsers={() =>
            setActiveSection(
              "users"
            )
          }
          goAnalytics={() =>
            setActiveSection(
              "analytics"
            )
          }
        />
      )}

      {activeSection ===
        "tools" && (
        <AdminTools
          tools={tools}
          refreshTools={
            refreshTools
          }
        />
      )}

      {activeSection ===
        "users" && (
        <AdminUsers
          adminEmail={
            user?.email
          }
        />
      )}

      {activeSection ===
        "analytics" && (
        <AdminAnalytics
          tools={tools}
        />
      )}
    </main>
  );
}

/* =========================================================
   ADMIN DASHBOARD
========================================================= */

function AdminDashboard({
  tools,
  goTools,
  goUsers,
  goAnalytics,
}) {
  const active =
    tools.filter(
      (t) => t.is_active
    ).length;

  const inactive =
    tools.length - active;

  return (
    <div className="adminGrid">
      <div className="adminCard">
        <Settings />

        <h3>
          Tool Management
        </h3>

        <p>
          {tools.length} tools are
          currently in database.
        </p>

        <button
          className="primary"
          onClick={goTools}
          type="button"
        >
          Manage Tools
        </button>
      </div>

      <div className="adminCard">
        <CheckCircle2 />

        <h3>
          Active Tools
        </h3>

        <p>
          {active} tools are visible
          on website.
        </p>

        <strong className="ok">
          Active
        </strong>
      </div>

      <div className="adminCard">
        <Power />

        <h3>
          Inactive Tools
        </h3>

        <p>
          {inactive} tools are
          currently disabled.
        </p>

        <strong>
          Hidden
        </strong>
      </div>

      <div className="adminCard">
        <LockKeyhole />

        <h3>
          Users & Access
        </h3>

        <p>
          Admin authentication is
          protected by Supabase.
        </p>

        <button
          className="primary"
          onClick={goUsers}
          type="button"
        >
          Manage Users
        </button>
      </div>

      <div className="adminCard">
        <LayoutDashboard />

        <h3>
          Analytics
        </h3>

        <p>
          Usage analytics can be
          connected.
        </p>

        <button
          className="primary"
          onClick={goAnalytics}
          type="button"
        >
          View Analytics
        </button>
      </div>

      <div className="adminCard">
        <ShieldCheck />

        <h3>
          Security Status
        </h3>

        <p>
          Supabase Auth + profiles
          role verification active.
        </p>

        <strong className="ok">
          Protected
        </strong>
      </div>
    </div>
  );
}

/* =========================================================
   ADMIN TOOLS CRUD
========================================================= */

function AdminTools({
  tools,
  refreshTools,
}) {
  const [showForm, setShowForm] =
    useState(false);

  const [editing, setEditing] =
    useState(null);

  const [search, setSearch] =
    useState("");

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [message, setMessage] =
    useState("");

  const filtered = useMemo(() => {
    const q =
      search
        .trim()
        .toLowerCase();

    if (!q) return tools;

    return tools.filter(
      (t) =>
        t.name
          .toLowerCase()
          .includes(q) ||
        t.slug
          .toLowerCase()
          .includes(q) ||
        t.category
          .toLowerCase()
          .includes(q)
    );
  }, [tools, search]);

  const saveTool = async (
    form
  ) => {
    setSaving(true);
    setError("");
    setMessage("");

    try {
      const payload = {
        name:
          form.name.trim(),
        category:
          form.category.trim() ||
          "Utility Tools",
        description:
          form.description.trim(),
        slug:
          form.slug.trim(),
        icon:
          form.icon.trim(),
        is_active:
          Boolean(
            form.is_active
          ),
        sort_order:
          Number(
            form.sort_order || 0
          ),
      };

      if (
        !payload.name ||
        !payload.slug
      ) {
        throw new Error(
          "Name and slug are required."
        );
      }

      if (editing) {
        const {
          error: updateError,
        } =
          await supabase
            .from("tools")
            .update(payload)
            .eq(
              "id",
              editing.id
            );

        if (updateError)
          throw updateError;

        setMessage(
          "Tool updated successfully."
        );
      } else {
        const {
          error: insertError,
        } =
          await supabase
            .from("tools")
            .insert(
              payload
            );

        if (insertError)
          throw insertError;

        setMessage(
          "Tool added successfully."
        );
      }

      setShowForm(false);
      setEditing(null);

      await refreshTools();
    } catch (err) {
      console.error(
        "Tool save error:",
        err
      );

      setError(
        err?.message ||
          "Unable to save tool."
      );
    } finally {
      setSaving(false);
    }
  };

  const deleteTool = async (
    id,
    name
  ) => {
    if (
      !window.confirm(
        `Delete "${name}" permanently?`
      )
    ) {
      return;
    }

    setError("");
    setMessage("");

    const {
      error: deleteError,
    } =
      await supabase
        .from("tools")
        .delete()
        .eq("id", id);

    if (deleteError) {
      setError(
        deleteError.message
      );

      return;
    }

    setMessage(
      "Tool deleted successfully."
    );

    await refreshTools();
  };

  const toggleTool = async (
    item
  ) => {
    setError("");
    setMessage("");

    const {
      error: updateError,
    } =
      await supabase
        .from("tools")
        .update({
          is_active:
            !item.is_active,
        })
        .eq(
          "id",
          item.id
        );

    if (updateError) {
      setError(
        updateError.message
      );

      return;
    }

    setMessage(
      item.is_active
        ? "Tool disabled."
        : "Tool activated."
    );

    await refreshTools();
  };

  const moveTool = async (
    item,
    direction
  ) => {
    const current =
      Number(
        item.sort_order || 0
      );

    const next =
      direction === "up"
        ? current - 1
        : current + 1;

    const {
      error: updateError,
    } =
      await supabase
        .from("tools")
        .update({
          sort_order:
            Math.max(
              0,
              next
            ),
        })
        .eq(
          "id",
          item.id
        );

    if (updateError) {
      setError(
        updateError.message
      );

      return;
    }

    await refreshTools();
  };

  return (
    <section className="adminCard adminWide">
      <div className="adminSectionHeader">
        <div>
          <Settings />

          <h2>
            Manage Tools
          </h2>

          <p>
            Add, edit, activate,
            deactivate and delete
            website tools.
          </p>
        </div>

        <button
          className="primary"
          type="button"
          onClick={() => {
            setEditing(null);
            setShowForm(true);
            setError("");
            setMessage("");
          }}
        >
          <Plus size={18} />

          Add Tool
        </button>
      </div>

      {error && (
        <div className="authError">
          <AlertCircle size={18} />

          <span>{error}</span>
        </div>
      )}

      {message && (
        <div className="successBox">
          <CheckCircle2 size={20} />

          <span>
            {message}
          </span>
        </div>
      )}

      {showForm && (
        <ToolForm
          initial={
            editing || {
              name: "",
              category:
                "Utility Tools",
              description: "",
              slug: "",
              icon: "",
              is_active:
                true,
              sort_order:
                tools.length,
            }
          }
          editing={
            Boolean(editing)
          }
          saving={saving}
          onCancel={() => {
            setShowForm(false);
            setEditing(null);
          }}
          onSave={saveTool}
        />
      )}

      <div className="adminToolbar">
        <div className="search">
          <Search size={18} />

          <input
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
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
          <span>
            Tool
          </span>

          <span>
            Category
          </span>

          <span>
            Status
          </span>

          <span>
            Order
          </span>

          <span>
            Actions
          </span>
        </div>

        {filtered.map((item) => (
          <div
            className="toolTableRow"
            key={item.id}
          >
            <div>
              <strong>
                {item.name}
              </strong>

              <small>
                /{item.slug}
              </small>

              <p>
                {item.description}
              </p>
            </div>

            <span>
              {item.category}
            </span>

            <span>
              <b
                className={
                  item.is_active
                    ? "statusActive"
                    : "statusInactive"
                }
              >
                {item.is_active
                  ? "Active"
                  : "Inactive"}
              </b>
            </span>

            <span className="orderButtons">
              <button
                type="button"
                className="iconButton"
                title="Move up"
                onClick={() =>
                  moveTool(
                    item,
                    "up"
                  )
                }
              >
                <ChevronUp
                  size={17}
                />
              </button>

              <b>
                {item.sort_order}
              </b>

              <button
                type="button"
                className="iconButton"
                title="Move down"
                onClick={() =>
                  moveTool(
                    item,
                    "down"
                  )
                }
              >
                <ChevronDown
                  size={17}
                />
              </button>
            </span>

            <div className="rowActions">
              <button
                className="iconButton"
                title="Edit"
                type="button"
                onClick={() => {
                  setEditing(
                    item
                  );

                  setShowForm(
                    true
                  );

                  setError("");
                  setMessage("");
                }}
              >
                <Pencil
                  size={17}
                />
              </button>

              <button
                className="iconButton"
                title={
                  item.is_active
                    ? "Disable"
                    : "Enable"
                }
                type="button"
                onClick={() =>
                  toggleTool(
                    item
                  )
                }
              >
                <Power
                  size={17}
                />
              </button>

              <button
                className="iconButton danger"
                title="Delete"
                type="button"
                onClick={() =>
                  deleteTool(
                    item.id,
                    item.name
                  )
                }
              >
                <Trash2
                  size={17}
                />
              </button>
            </div>
          </div>
        ))}

        {!filtered.length && (
          <div className="empty">
            No tools found.
          </div>
        )}
      </div>
    </section>
  );
}

/* =========================================================
   TOOL FORM
========================================================= */

function ToolForm({
  initial,
  editing,
  saving,
  onCancel,
  onSave,
}) {
  const [form, setForm] =
    useState({
      name:
        initial.name || "",
      category:
        initial.category ||
        "Utility Tools",
      description:
        initial.description ||
        "",
      slug:
        initial.slug || "",
      icon:
        initial.icon || "",
      is_active:
        initial.is_active !==
        false,
      sort_order:
        Number(
          initial.sort_order || 0
        ),
    });

  const change = (
    key,
    value
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="toolForm">
      <div className="formTitle">
        <h3>
          {editing
            ? "Edit Tool"
            : "Add New Tool"}
        </h3>
      </div>

      <div className="formGrid">
        <label>
          Tool Name

          <input
            value={form.name}
            onChange={(e) =>
              change(
                "name",
                e.target.value
              )
            }
            placeholder="PDF to Word"
          />
        </label>

        <label>
          Category

          <input
            value={
              form.category
            }
            onChange={(e) =>
              change(
                "category",
                e.target.value
              )
            }
            placeholder="PDF Tools"
          />
        </label>

        <label>
          Slug

          <input
            value={form.slug}
            onChange={(e) =>
              change(
                "slug",
                e.target.value
              )
            }
            placeholder="pdf-word"
          />
        </label>

        <label>
          Icon

          <input
            value={form.icon}
            onChange={(e) =>
              change(
                "icon",
                e.target.value
              )
            }
            placeholder="FileText"
          />
        </label>

        <label>
          Sort Order

          <input
            type="number"
            value={
              form.sort_order
            }
            onChange={(e) =>
              change(
                "sort_order",
                e.target.value
              )
            }
          />
        </label>

        <label className="checkboxLabel">
          <input
            type="checkbox"
            checked={
              form.is_active
            }
            onChange={(e) =>
              change(
                "is_active",
                e.target.checked
              )
            }
          />

          Active
        </label>

        <label className="full">
          Description

          <textarea
            value={
              form.description
            }
            onChange={(e) =>
              change(
                "description",
                e.target.value
              )
            }
            placeholder="Describe what this tool does..."
          />
        </label>
      </div>

      <div className="actions">
        <button
          className="primary"
          type="button"
          disabled={saving}
          onClick={() =>
            onSave(form)
          }
        >
          {saving ? (
            <>
              <Loader2
                className="spin"
                size={17}
              />

              Saving...
            </>
          ) : (
            <>
              <Save size={17} />

              {editing
                ? "Update Tool"
                : "Create Tool"}
            </>
          )}
        </button>

        <button
          className="secondary"
          type="button"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   ADMIN USERS
========================================================= */

function AdminUsers({
  adminEmail,
}) {
  return (
    <section className="adminCard adminWide">
      <LockKeyhole />

      <h2>
        Users & Access
      </h2>

      <p>
        Current admin access is
        verified using the
        Supabase profiles table.
      </p>

      <div className="adminInfo">
        <b>
          Current admin:
        </b>{" "}
        {adminEmail ||
          "Unknown"}

        <br />

        <span>
          Role: admin
        </span>
      </div>
    </section>
  );
}

/* =========================================================
   ADMIN ANALYTICS
========================================================= */

function AdminAnalytics({
  tools,
}) {
  const active =
    tools.filter(
      (t) => t.is_active
    ).length;

  const categories =
    new Set(
      tools.map(
        (t) => t.category
      )
    ).size;

  return (
    <section className="adminCard adminWide">
      <LayoutDashboard />

      <h2>
        Analytics
      </h2>

      <p>
        Basic database statistics
        are available.
      </p>

      <div className="stats adminStats">
        <div>
          <b>
            {tools.length}
          </b>

          <small>
            Total Tools
          </small>
        </div>

        <div>
          <b>
            {active}
          </b>

          <small>
            Active Tools
          </small>
        </div>

        <div>
          <b>
            {categories}
          </b>

          <small>
            Categories
          </small>
        </div>
      </div>

      <div className="adminInfo">
        <b>
          Next analytics phase:
        </b>

        <br />

        <span>
          Total users, tool runs,
          popular tools, daily
          activity and usage
          charts.
        </span>
      </div>
    </section>
  );
}

/* =========================================================
   SECURITY / TEXT HELPERS
========================================================= */

function generatePassword(
  length = 18
) {
  const chars =
    "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*";

  const values =
    new Uint32Array(
      length
    );

  crypto.getRandomValues(
    values
  );

  return Array.from(
    values,
    (value) =>
      chars[
        value %
          chars.length
      ]
  ).join("");
}

function passwordStrength(
  password
) {
  let score = 0;

  if (password.length >= 8)
    score++;

  if (password.length >= 12)
    score++;

  if (/[A-Z]/.test(password))
    score++;

  if (/[a-z]/.test(password))
    score++;

  if (/[0-9]/.test(password))
    score++;

  if (
    /[^A-Za-z0-9]/.test(
      password
    )
  )
    score++;

  if (score <= 2)
    return "Weak password.";

  if (score <= 4)
    return "Medium password.";

  return "Strong password.";
}

async function sha256(text) {
  const data =
    new TextEncoder().encode(
      text
    );

  const hash =
    await crypto.subtle.digest(
      "SHA-256",
      data
    );

  return Array.from(
    new Uint8Array(hash)
  )
    .map((b) =>
      b.toString(16).padStart(
        2,
        "0"
      )
    )
    .join("");
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
        : morse[char] ||
          char
    )
    .join(" ");
}

/* =========================================================
   START APPLICATION
========================================================= */

const rootElement =
  document.getElementById(
    "root"
  );

if (!rootElement) {
  throw new Error(
    "Root element not found. Check index.html."
  );
}

createRoot(
  rootElement
).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
