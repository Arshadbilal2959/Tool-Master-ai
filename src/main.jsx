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
import { supabase } from "./supabase";
import "./styles.css";

/* =========================================================
   CATEGORY ICONS
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
   LOCAL STORAGE
========================================================= */

function getSaved(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

/* =========================================================
   APP
========================================================= */

function App() {
  const [tools, setTools] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  /* =======================================================
     LOAD SUPABASE DATA
  ======================================================= */

  async function loadData() {
    setLoading(true);
    setError("");

    try {
      const [toolsResult, categoriesResult] =
        await Promise.all([
          supabase
            .from("tools")
            .select("*")
            .eq("is_active", true)
            .order("sort_order", {
              ascending: true,
            }),

          supabase
            .from("categories")
            .select("*")
            .order("name", {
              ascending: true,
            }),
        ]);

      if (toolsResult.error) {
        throw toolsResult.error;
      }

      if (categoriesResult.error) {
        throw categoriesResult.error;
      }

      setTools(toolsResult.data || []);
      setCategories(categoriesResult.data || []);
    } catch (err) {
      console.error(err);

      setError(
        "Supabase se data load nahi ho saka. Database table names aur permissions check karein."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  /* =======================================================
     CATEGORY LIST
  ======================================================= */

  const categoryList = useMemo(() => {
    const result = [
      {
        id: "all",
        name: "All Tools",
        count: tools.length,
        icon: Wrench,
      },
    ];

    categories.forEach((cat) => {
      const count = tools.filter(
        (tool) =>
          tool.category_id === cat.id
      ).length;

      result.push({
        id: cat.id,
        name: cat.name,
        count,
        icon:
          iconFor[cat.name] || Wrench,
      });
    });

    return result;
  }, [categories, tools]);

  /* =======================================================
     FILTER
  ======================================================= */

  const filteredTools = useMemo(() => {
    const q = query.toLowerCase().trim();

    return tools.filter((tool) => {
      const cat =
        categories.find(
          (c) => c.id === tool.category_id
        );

      const categoryName =
        cat?.name || "";

      const categoryMatch =
        category === "All Tools" ||
        categoryName === category;

      const searchMatch =
        !q ||
        tool.name
          ?.toLowerCase()
          .includes(q) ||
        tool.slug
          ?.toLowerCase()
          .includes(q) ||
        tool.description
          ?.toLowerCase()
          .includes(q) ||
        categoryName
          .toLowerCase()
          .includes(q);

      return (
        categoryMatch && searchMatch
      );
    });
  }, [
    tools,
    categories,
    category,
    query,
  ]);

  /* =======================================================
     THEME
  ======================================================= */

  function toggleTheme() {
    const next = !dark;

    setDark(next);

    localStorage.setItem(
      "tm-theme",
      JSON.stringify(next)
    );
  }

  /* =======================================================
     FAVORITES
  ======================================================= */

  function toggleFavorite(id) {
    const next = favorites.includes(id)
      ? favorites.filter(
          (item) => item !== id
        )
      : [...favorites, id];

    setFavorites(next);

    localStorage.setItem(
      "tm-favorites",
      JSON.stringify(next)
    );
  }

  /* =======================================================
     OPEN TOOL
  ======================================================= */

  function openTool(tool) {
    setSelectedTool(tool);
    setMobileMenu(false);
  }

  /* =======================================================
     UI
  ======================================================= */

  return (
    <div
      className={
        dark ? "app dark" : "app"
      }
    >
      {/* HEADER */}

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
              ToolMaster
              <span>Pro</span>
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
              title="Toggle theme"
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
                setMobileMenu(
                  !mobileMenu
                )
              }
            >
              {mobileMenu ? (
                <X />
              ) : (
                <Menu />
              )}
            </button>
          </div>
        </div>
      </header>

      {selectedTool ? (
        <ToolPage
          tool={selectedTool}
          categories={categories}
          back={() =>
            setSelectedTool(null)
          }
        />
      ) : (
        <>
          {/* HERO */}

          <section className="hero">
            <div className="pill">
              <Sparkles size={15} />

              {loading
                ? "Loading tools..."
                : `${tools.length}+ Free Online Tools`}
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
              privacy-friendly tools
              for PDF, images, SEO,
              text, developers,
              calculators and more.
            </p>

            <div className="searchBox">
              <Search size={20} />

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
                <b>{tools.length}</b>
                <small>Tools</small>
              </div>

              <div>
                <b>
                  {categories.length}
                </b>
                <small>
                  Categories
                </small>
              </div>

              <div>
                <b>100%</b>
                <small>
                  Browser Friendly
                </small>
              </div>
            </div>
          </section>

          <main
            id="tools"
            className="container"
          >
            {/* ERROR */}

            {error && (
              <div className="notice">
                <ShieldCheck
                  size={20}
                />

                <div>
                  <b>
                    Supabase connection
                    problem
                  </b>

                  <p>{error}</p>

                  <button
                    className="secondary"
                    onClick={
                      loadData
                    }
                  >
                    <RefreshCw
                      size={16}
                    />
                    Retry
                  </button>
                </div>
              </div>
            )}

            {/* LOADING */}

            {loading ? (
              <div className="empty">
                <RefreshCw
                  size={40}
                  className="spin"
                />

                <h3>
                  Loading tools...
                </h3>

                <p>
                  Supabase se tools
                  load ho rahe hain.
                </p>
              </div>
            ) : (
              <>
                {/* CATEGORIES */}

                <section
                  id="categories"
                  className="categories"
                >
                  {categoryList.map(
                    (cat) => {
                      const Icon =
                        cat.icon;

                      return (
                        <button
                          key={cat.id}
                          className={
                            category ===
                            cat.name
                              ? "cat active"
                              : "cat"
                          }
                          onClick={() =>
                            setCategory(
                              cat.name
                            )
                          }
                        >
                          <Icon
                            size={18}
                          />

                          <span>
                            {cat.name}
                          </span>

                          <em>
                            {
                              cat.count
                            }
                          </em>
                        </button>
                      );
                    }
                  )}
                </section>

                {/* SECTION HEADER */}

                <div className="sectionHead">
                  <div>
                    <h2>
                      {category}
                    </h2>

                    <p>
                      {
                        filteredTools.length
                      }{" "}
                      tools available
                    </p>
                  </div>

                  {favorites.length >
                    0 && (
                    <div className="favoriteInfo">
                      <Heart
                        size={16}
                        fill="currentColor"
                      />

                      {
                        favorites.length
                      }{" "}
                      favorites
                    </div>
                  )}
                </div>

                {/* TOOL GRID */}

                <div className="grid">
                  {filteredTools.map(
                    (tool) => (
                      <ToolCard
                        key={tool.id}
                        tool={tool}
                        category={
                          categories.find(
                            (c) =>
                              c.id ===
                              tool.category_id
                          )
                        }
                        open={() =>
                          openTool(
                            tool
                          )
                        }
                        favorite={favorites.includes(
                          tool.id
                        )}
                        toggleFavorite={() =>
                          toggleFavorite(
                            tool.id
                          )
                        }
                      />
                    )
                  )}
                </div>

                {/* EMPTY */}

                {!filteredTools.length && (
                  <div className="empty">
                    <Search size={40} />

                    <h3>
                      No tools found
                    </h3>

                    <p>
                      Try another
                      keyword or
                      category.
                    </p>

                    <button
                      className="primary"
                      onClick={() => {
                        setQuery(
                          ""
                        );
                        setCategory(
                          "All Tools"
                        );
                      }}
                    >
                      Reset Search
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
        </>
      )}

      {/* FOOTER */}

      <footer id="about">
        <div className="footerInner">
          <div>
            <div className="brand">
              <div className="brandIcon">
                <Wrench size={19} />
              </div>

              <span>
                ToolMaster
                <span>Pro</span>
              </span>
            </div>

            <p>
              Powerful online tools,
              made simple.
            </p>
          </div>

          <small>
            © 2026 ToolMaster Pro.
            Built for fast
            browser-based
            utilities.
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
  category,
  open,
  favorite,
  toggleFavorite,
}) {
  const Icon =
    iconFor[category?.name] ||
    Wrench;

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
          <span>
            {category?.name ||
              "Tool"}
          </span>

          <h3>
            {tool.name}
          </h3>

          <p>
            {tool.description ||
              "Online tool"}
          </p>
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

function ToolPage({
  tool,
  categories,
  back,
}) {
  const [input, setInput] =
    useState("");

  const [output, setOutput] =
    useState("");

  const [copied, setCopied] =
    useState(false);

  const category =
    categories.find(
      (c) =>
        c.id ===
        tool.category_id
    );

  const Icon =
    iconFor[category?.name] ||
    Wrench;

  function runTool() {
    const id = tool.slug;

    let result = input;

    try {
      switch (id) {
        case "word-counter": {
          const words = input.trim()
            ? input
                .trim()
                .split(/\s+/)
                .length
            : 0;

          const sentences = input
            ? input
                .split(
                  /[.!?]+/
                )
                .filter(Boolean)
                .length
            : 0;

          result =
            `Words: ${words}\n` +
            `Characters: ${input.length}\n` +
            `Characters without spaces: ${
              input.replace(
                /\s/g,
                ""
              ).length
            }\n` +
            `Sentences: ${sentences}`;

          break;
        }

        case "characters":
          result =
            `Characters: ${input.length}\n` +
            `Without spaces: ${
              input.replace(
                /\s/g,
                ""
              ).length
            }`;
          break;

        case "case-converter":
          result =
            input.toLowerCase();
          break;

        case "text-cleaner":
          result =
            input
              .replace(
                /\s+/g,
                " "
              )
              .trim();
          break;

        case "text-reverser":
          result = [
            ...input,
          ]
            .reverse()
            .join("");
          break;

        case "slug":
        case "url-slug":
          result = input
            .toLowerCase()
            .trim()
            .replace(
              /[^a-z0-9]+/g,
              "-"
            )
            .replace(
              /^-+|-+$/g,
              "");
          break;

        case "url-encoder":
          result =
            encodeURIComponent(
              input
            );
          break;

        case "base64-encode":
          result =
            btoa(
              unescape(
                encodeURIComponent(
                  input
                )
              )
            );
          break;

        case "base64-decode":
          result =
            decodeURIComponent(
              escape(
                atob(input)
              )
            );
          break;

        case "json-formatter":
          result =
            JSON.stringify(
              JSON.parse(input),
              null,
              2
            );
          break;

        case "json-minifier":
          result =
            JSON.stringify(
              JSON.parse(input)
            );
          break;

        case "uuid":
          result =
            crypto.randomUUID();
          break;

        case "password":
        case "random-password":
          result =
            generatePassword(18);
          break;

        case "binary":
          result = [
            ...input,
          ]
            .map((c) =>
              c.charCodeAt(0)
                .toString(2)
                .padStart(
                  8,
                  "0"
                )
            )
            .join(" ");
          break;

        case "ascii":
          result = [
            ...input,
          ]
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
          const clean =
            input
              .toLowerCase()
              .replace(
                /[^a-z0-9]/g,
                ""
              );

          result =
            clean ===
            [
              ...clean,
            ]
              .reverse()
              .join("")
              ? "Yes — this is a palindrome."
              : "No — this is not a palindrome.";

          break;
        }

        case "reading-time": {
          const words =
            input.trim()
              ? input
                  .trim()
                  .split(/\s+/)
                  .length
              : 0;

          result = `Approximately ${Math.max(
            1,
            Math.ceil(
              words / 200
            )
          )} minute(s)`;

          break;
        }

        case "text-sorter":
          result = input
            .split("\n")
            .filter(Boolean)
            .sort((a, b) =>
              a.localeCompare(
                b
              )
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

        case "percentage":
          result =
            calculatePercentage(
              input
            );
          break;

        default:
          result =
            `Tool "${tool.name}" is connected successfully.\n\nFull processing engine can be connected to this tool next.`;
      }
    } catch {
      result =
        "Invalid input. Please check your data and try again.";
    }

    setOutput(result);
  }

  async function copyResult() {
    if (!output) return;

    try {
      await navigator.clipboard.writeText(
        output
      );

      setCopied(true);

      setTimeout(
        () =>
          setCopied(false),
        1500
      );
    } catch {
      setCopied(false);
    }
  }

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
          <Icon />
        </div>

        <div>
          <span>
            {category?.name ||
              "Tool"}
          </span>

          <h1>
            {tool.name}
          </h1>

          <p>
            {tool.long_description ||
              tool.description ||
              "Use this online tool."}
          </p>
        </div>
      </div>

      <div className="workspace">
        <div className="panel">
          <label>
            Input
          </label>

          <textarea
            value={input}
            onChange={(e) =>
              setInput(
                e.target.value
              )
            }
            placeholder="Enter or paste your content here..."
          />

          <div className="actions">
            <button
              className="primary"
              onClick={
                runTool
              }
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
          <label>
            Result
          </label>

          <textarea
            value={output}
            readOnly
            placeholder="Your result will appear here..."
          />

          <button
            className="secondary full"
            onClick={
              copyResult
            }
          >
            {copied ? (
              <>
                <Check
                  size={17}
                />
                Copied
              </>
            ) : (
              <>
                <Copy
                  size={17}
                />
                Copy Result
              </>
            )}
          </button>
        </div>
      </div>

      <div className="notice">
        <ShieldCheck
          size={20}
        />

        <div>
          Most text processing
          happens locally in your
          browser. Sensitive data
          should not be sent to
          untrusted services.
        </div>
      </div>
    </main>
  );
}

/* =========================================================
   HELPERS
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

  return [
    ...values,
  ]
    .map(
      (v) =>
        chars[
          v % chars.length
        ]
    )
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
    .map((char) => {
      if (char === " ")
        return "/";

      return (
        map[char] || char
      );
    })
    .join(" ");
}

function calculatePercentage(
  value
) {
  const match = String(
    value
  ).match(
    /([\d.]+)\s*%?\s*(?:of)?\s*([\d.]+)?/i
  );

  if (!match) {
    return "Example: 20% of 500";
  }

  const percent =
    Number(match[1]);

  const total =
    Number(match[2]);

  if (
    !Number.isFinite(
      percent
    ) ||
    !Number.isFinite(total)
  ) {
    return "Example: 20% of 500";
  }

  return `${percent}% of ${total} = ${
    (percent / 100) * total
  }`;
}

/* =========================================================
   MOUNT
========================================================= */

const root =
  document.getElementById(
    "root"
  );

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
