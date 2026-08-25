import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

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
} from "lucide-react";

import { createClient } from "@supabase/supabase-js";

import "./styles.css";

/* =========================================================
   SUPABASE
========================================================= */

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

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
  "Productivity": LayoutDashboard,
};

/* =========================================================
   LOCAL STORAGE
========================================================= */

function getSaved(key, fallback) {
  try {
    return JSON.parse(
      localStorage.getItem(key)
    ) ?? fallback;
  } catch {
    return fallback;
  }
}

/* =========================================================
   APP
========================================================= */

function App() {
  const [category, setCategory] =
    useState("All Tools");

  const [query, setQuery] =
    useState("");

  const [selectedTool, setSelectedTool] =
    useState(null);

  const [admin, setAdmin] =
    useState(false);

  const [mobileMenu, setMobileMenu] =
    useState(false);

  const [dark, setDark] =
    useState(() =>
      getSaved("tm-theme", false)
    );

  const [favorites, setFavorites] =
    useState(() =>
      getSaved("tm-favorites", [])
    );

  const [tools, setTools] =
    useState([]);

  const [categoriesData, setCategoriesData] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  /* =======================================================
     LOAD SUPABASE DATA
  ======================================================= */

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    setError("");

    try {
      const [
        categoriesResult,
        toolsResult,
      ] = await Promise.all([
        supabase
          .from("categories")
          .select(
            "id,name,slug,description,icon,is_active,sort_order,created_at"
          )
          .eq("is_active", true)
          .order("sort_order", {
            ascending: true,
          }),

        supabase
          .from("tools")
          .select(
            "id,name,slug,description,long_description,category_id,icon_url,tool_type,tool_url,is_active,is_featured,sort_order,created_at,updated_at"
          )
          .eq("is_active", true)
          .order("sort_order", {
            ascending: true,
          }),
      ]);

      if (categoriesResult.error) {
        throw categoriesResult.error;
      }

      if (toolsResult.error) {
        throw toolsResult.error;
      }

      setCategoriesData(
        categoriesResult.data || []
      );

      setTools(
        toolsResult.data || []
      );
    } catch (err) {
      console.error(
        "Supabase loading error:",
        err
      );

      setError(
        err?.message ||
          "Unable to load tools from Supabase."
      );
    } finally {
      setLoading(false);
    }
  }

  /* =======================================================
     CATEGORY LIST
  ======================================================= */

  const categories = useMemo(() => {
    const all = [
      [
        "All Tools",
        tools.length,
        Wrench,
      ],
    ];

    const dbCategories =
      categoriesData.map((cat) => {
        const count =
          tools.filter(
            (tool) =>
              tool.category_id === cat.id
          ).length;

        return [
          cat.name,
          count,
          iconFor[cat.name] || Wrench,
        ];
      });

    return [
      ...all,
      ...dbCategories,
    ];
  }, [tools, categoriesData]);

  /* =======================================================
     FILTER TOOLS
  ======================================================= */

  const filtered = useMemo(() => {
    const q =
      query.toLowerCase().trim();

    return tools.filter((tool) => {
      const cat =
        categoriesData.find(
          (c) =>
            c.id === tool.category_id
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
        categoryName
          .toLowerCase()
          .includes(q) ||
        tool.description
          ?.toLowerCase()
          .includes(q);

      return (
        categoryMatch &&
        searchMatch
      );
    });
  }, [
    tools,
    categoriesData,
    category,
    query,
  ]);

  /* =======================================================
     THEME
  ======================================================= */

  const toggleTheme = () => {
    const next = !dark;

    setDark(next);

    localStorage.setItem(
      "tm-theme",
      JSON.stringify(next)
    );
  };

  /* =======================================================
     FAVORITES
  ======================================================= */

  const toggleFavorite = (id) => {
    const next =
      favorites.includes(id)
        ? favorites.filter(
            (x) => x !== id
          )
        : [...favorites, id];

    setFavorites(next);

    localStorage.setItem(
      "tm-favorites",
      JSON.stringify(next)
    );
  };

  /* =======================================================
     OPEN TOOL
  ======================================================= */

  const openTool = (tool) => {
    setSelectedTool(tool);

    const stats = getSaved(
      "tm-stats",
      {
        visits: 0,
        toolUses: 0,
      }
    );

    stats.visits += 1;

    localStorage.setItem(
      "tm-stats",
      JSON.stringify(stats)
    );
  };

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <div
        className={
          dark
            ? "app dark"
            : "app"
        }
      >
        <header className="header">
          <div className="nav">
            <div className="brand">
              <div className="brandIcon">
                <Wrench size={21} />
              </div>

              <span>
                ToolMaster
                <span>Pro</span>
              </span>
            </div>
          </div>
        </header>

        <main className="container">
          <div className="empty">
            <RefreshCw
              size={40}
              className="spin"
            />

            <h3>
              Loading tools...
            </h3>

            <p>
              Connecting to Supabase.
            </p>
          </div>
        </main>
      </div>
    );
  }

  /* =======================================================
     MAIN
  ======================================================= */

  return (
    <div
      className={
        dark
          ? "app dark"
          : "app"
      }
    >
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
            >
              {dark ? (
                <Sun size={18} />
              ) : (
                <Moon size={18} />
              )}
            </button>

            <button
              className="adminBtn"
              onClick={() => {
                setAdmin(!admin);
                setSelectedTool(null);
              }}
            >
              <LayoutDashboard
                size={17}
              />
              Admin
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

      {error && (
        <div className="container">
          <div className="notice">
            <ShieldCheck size={20} />

            <div>
              <b>
                Supabase connection error
              </b>

              <p>{error}</p>

              <button
                className="secondary"
                onClick={loadData}
              >
                <RefreshCw
                  size={16}
                />
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}

      {admin ? (
        <AdminPanel
          onClose={() =>
            setAdmin(false)
          }
          tools={tools}
          categories={
            categoriesData
          }
          reload={loadData}
        />
      ) : selectedTool ? (
        <ToolPage
          tool={selectedTool}
          categories={
            categoriesData
          }
          back={() =>
            setSelectedTool(null)
          }
        />
      ) : (
        <>
          <section className="hero">

            <div className="pill">
              <Sparkles size={15} />
              {tools.length}+
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
                <b>
                  {tools.length}+
                </b>

                <small>
                  Tools
                </small>
              </div>

              <div>
                <b>
                  {categoriesData.length}
                </b>

                <small>
                  Categories
                </small>
              </div>

              <div>
                <b>
                  100%
                </b>

                <small>
                  Browser Tools
                </small>
              </div>

            </div>
          </section>

          <main
            id="tools"
            className="container"
          >

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
                    className={
                      category === name
                        ? "cat active"
                        : "cat"
                    }
                    onClick={() =>
                      setCategory(
                        name
                      )
                    }
                  >
                    <Icon size={18} />

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
                <h2>
                  {category}
                </h2>

                <p>
                  {filtered.length}{" "}
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

                  {favorites.length}{" "}
                  favorites
                </div>
              )}
            </div>

            <div className="grid">

              {filtered.map(
                (tool) => (
                  <ToolCard
                    key={tool.id}
                    tool={tool}
                    categories={
                      categoriesData
                    }
                    open={() =>
                      openTool(tool)
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

            {!filtered.length && (
              <div className="empty">
                <Search size={40} />

                <h3>
                  No tools found
                </h3>

                <p>
                  Try another keyword
                  or category.
                </p>

                <button
                  className="primary"
                  onClick={() => {
                    setQuery("");
                    setCategory(
                      "All Tools"
                    );
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
            browser-based utilities.
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
  categories,
  open,
  favorite,
  toggleFavorite,
}) {
  const category =
    categories.find(
      (c) =>
        c.id ===
        tool.category_id
    );

  const categoryName =
    category?.name ||
    "Tools";

  const Icon =
    iconFor[categoryName] ||
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

          {tool.icon_url ? (
            <img
              src={tool.icon_url}
              alt=""
              style={{
                width: 28,
                height: 28,
                objectFit:
                  "contain",
              }}
            />
          ) : (
            <Icon size={21} />
          )}

        </div>

        <div className="cardBody">

          <span>
            {categoryName}
          </span>

          <h3>
            {tool.name}
          </h3>

          <p>
            {tool.description ||
              "Useful online tool."}
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

  const categoryName =
    category?.name ||
    "Tools";

  const runTool = () => {
    const id = tool.slug;

    let result = input;

    try {
      switch (id) {
        case "word-counter": {
          const words =
            input.trim()
              ? input
                  .trim()
                  .split(/\s+/)
                  .length
              : 0;

          const sentences =
            input
              ? input
                  .split(/[.!?]+/)
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
              .replace(/\s+/g, " ")
              .trim();

          break;

        case "text-reverser":
          result =
            [...input]
              .reverse()
              .join("");

          break;

        case "slug":
        case "url-slug":
          result =
            input
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
          result = btoa(
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
          result =
            [...input]
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
          result =
            [...input]
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
            [...clean]
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
          result =
            input
              .split("\n")
              .filter(Boolean)
              .sort(
                (a, b) =>
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
            "This tool is connected to ToolMaster Pro. Its full processing engine can be added next.";
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

    await navigator.clipboard?.writeText(
      output
    );

    setCopied(true);

    setTimeout(
      () => setCopied(false),
      1500
    );
  };

  /* SPECIAL AI TOOLS */

  if (
    tool.slug ===
    "student-ai-helper"
  ) {
    return (
      <StudentAIHelper
        back={back}
      />
    );
  }

  if (
    tool.slug ===
    "text-to-video"
  ) {
    return (
      <TextToVideo
        tool={tool}
        back={back}
      />
    );
  }

  if (
    tool.slug ===
    "ai-video-generator"
  ) {
    return (
      <TextToVideo
        tool={tool}
        back={back}
      />
    );
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
          {tool.icon_url ? (
            <img
              src={tool.icon_url}
              alt=""
              style={{
                width: 45,
                height: 45,
                objectFit:
                  "contain",
              }}
            />
          ) : (
            <Wrench />
          )}
        </div>

        <div>

          <span>
            {categoryName}
          </span>

          <h1>
            {tool.name}
          </h1>

          <p>
            {tool.long_description ||
              tool.description}
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

        Most text processing happens
        locally in your browser. Do
        not upload sensitive
        information to services you
        do not trust.

      </div>

    </main>
  );
}

/* =========================================================
   TEXT TO VIDEO
========================================================= */

function TextToVideo({
  tool,
  back,
}) {
  const [prompt, setPrompt] =
    useState("");

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
      "Prompt prepared. Connect your secure server-side video AI provider to render the actual video."
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
          <Sparkles />
        </div>

        <div>
          <span>
            AI & Video
          </span>

          <h1>
            {tool?.name ||
              "Text to Video"}
          </h1>

          <p>
            {tool?.description ||
              "Create an AI video from a text prompt."}
          </p>
        </div>

      </div>

      <div className="aiGrid">

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

          <button
            className="primary full"
            onClick={generate}
          >
            <Sparkles size={17} />
            Generate Video
          </button>

        </div>

        <div className="aiCard preview">

          <h3>
            🎥 Preview
          </h3>

          <div className="videoPlaceholder">

            <Sparkles size={40} />

            <b>
              Video preview
            </b>

            <small>
              Secure server-side
              video rendering can
              be connected here.
            </small>

            {status && (
              <p>
                {status}
              </p>
            )}

          </div>

        </div>

      </div>

      <div className="notice">

        <ShieldCheck size={20} />

        API keys must stay on a
        secure server and should
        never be placed inside
        frontend React code.

      </div>

    </main>
  );
}

/* =========================================================
   STUDENT AI
========================================================= */

function StudentAIHelper({
  back,
}) {
  const [question, setQuestion] =
    useState("");

  const [answer, setAnswer] =
    useState("");

  const solve = () => {
    if (!question.trim()) {
      setAnswer(
        "Please enter your question first."
      );

      return;
    }

    setAnswer(
      "Your AI backend is not connected yet. The frontend is ready for a secure server-side AI provider."
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
            Ask questions and get
            step-by-step explanations.
          </p>

        </div>

      </div>

      <div className="aiGrid">

        <div className="aiCard">

          <h3>
            📚 Your Question
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

          <button
            className="primary full"
            onClick={solve}
          >
            <Sparkles size={17} />
            Get AI Help
          </button>

        </div>

        <div className="aiCard">

          <h3>
            🤖 AI Answer
          </h3>

          <div className="answer">
            {answer ||
              "Your step-by-step answer will appear here."}
          </div>

          {answer && (
            <button
              className="secondary"
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
   ADMIN
========================================================= */

function AdminPanel({
  onClose,
  tools,
  categories,
  reload,
}) {
  const [tab, setTab] =
    useState("dashboard");

  const [adminSearch, setAdminSearch] =
    useState("");

  const stats = getSaved(
    "tm-stats",
    {
      visits: 0,
      toolUses: 0,
    }
  );

  const filteredTools =
    tools.filter((tool) =>
      tool.name
        .toLowerCase()
        .includes(
          adminSearch
            .toLowerCase()
        )
    );

  return (
    <main className="adminPage container">

      <div className="adminHeader">

        <div>

          <div className="pill">
            <ShieldCheck size={15} />
            Admin Panel
          </div>

          <h1>
            ToolMaster Pro
            Control Center
          </h1>

          <p>
            Manage tools and monitor
            your platform.
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
            className={
              tab === "dashboard"
                ? "active"
                : ""
            }
            onClick={() =>
              setTab("dashboard")
            }
          >
            <LayoutDashboard
              size={18}
            />
            Dashboard
          </button>

          <button
            className={
              tab === "tools"
                ? "active"
                : ""
            }
            onClick={() =>
              setTab("tools")
            }
          >
            <Wrench size={18} />
            Tools
          </button>

          <button
            className={
              tab === "analytics"
                ? "active"
                : ""
            }
            onClick={() =>
              setTab("analytics")
            }
          >
            <BarChart3 size={18} />
            Analytics
          </button>

          <button
            className={
              tab === "settings"
                ? "active"
                : ""
            }
            onClick={() =>
              setTab("settings")
            }
          >
            <Settings size={18} />
            Settings
          </button>

        </aside>

        <section className="adminContent">

          {tab === "dashboard" && (
            <>
              <h2>
                Dashboard
              </h2>

              <div className="metricGrid">

                <Metric
                  icon={<Wrench />}
                  title="Total Tools"
                  value={tools.length}
                />

                <Metric
                  icon={<Wrench />}
                  title="Categories"
                  value={
                    categories.length
                  }
                />

                <Metric
                  icon={<BarChart3 />}
                  title="Tool Uses"
                  value={
                    stats.toolUses
                  }
                />

                <Metric
                  icon={
                    <LayoutDashboard />
                  }
                  title="Visits"
                  value={
                    stats.visits
                  }
                />

              </div>

              <div className="adminCards">

                <AdminCard
                  title="Platform Status"
                  text="Frontend and Supabase connection are active."
                  action="Connected"
                  icon={
                    <CheckCircleIcon />
                  }
                  success
                />

                <AdminCard
                  title="Database"
                  text={`${tools.length} active tools loaded from Supabase.`}
                  action="Supabase Connected"
                  icon={
                    <ShieldCheck />
                  }
                  success
                />

              </div>
            </>
          )}

          {tab === "tools" && (
            <>

              <div className="adminTitleRow">

                <div>
                  <h2>
                    Tool Management
                  </h2>

                  <p>
                    {tools.length} active
                    tools loaded.
                  </p>
                </div>

                <button
                  className="primary"
                  onClick={reload}
                >
                  <RefreshCw
                    size={17}
                  />
                  Refresh
                </button>

              </div>

              <div className="adminSearch">

                <Search size={18} />

                <input
                  value={
                    adminSearch
                  }
                  onChange={(e) =>
                    setAdminSearch(
                      e.target.value
                    )
                  }
                  placeholder="Search tools..."
                />

              </div>

              <div className="toolTable">

                {filteredTools.map(
                  (tool) => {

                    const cat =
                      categories.find(
                        (c) =>
                          c.id ===
                          tool.category_id
                      );

                    return (
                      <div
                        className="toolRow"
                        key={tool.id}
                      >

                        <div>

                          <b>
                            {tool.name}
                          </b>

                          <small>
                            {cat?.name ||
                              "Tools"}
                          </small>

                        </div>

                        <span className="status">
                          Active
                        </span>

                      </div>
                    );
                  }
                )}

              </div>

            </>
          )}

          {tab === "analytics" && (
            <>

              <h2>
                Analytics
              </h2>

              <div className="metricGrid">

                <Metric
                  icon={
                    <BarChart3 />
                  }
                  title="Tool Opens"
                  value={
                    stats.visits
                  }
                />

                <Metric
                  icon={<Zap />}
                  title="Tool Runs"
                  value={
                    stats.toolUses
                  }
                />

                <Metric
                  icon={<Wrench />}
                  title="Available Tools"
                  value={
                    tools.length
                  }
                />

              </div>

            </>
          )}

          {tab === "settings" && (
            <>

              <h2>
                Settings
              </h2>

              <div className="settingsBox">

                <div>
                  <b>
                    Application
                  </b>

                  <p>
                    ToolMaster Pro
                  </p>
                </div>

                <div>
                  <b>
                    Database
                  </b>

                  <p>
                    Supabase
                  </p>
                </div>

                <div>
                  <b>
                    Deployment
                  </b>

                  <p>
                    Vercel / Vite
                  </p>
                </div>

                <div>
                  <b>
                    Active Tools
                  </b>

                  <p>
                    {tools.length}
                  </p>
                </div>

              </div>

            </>
          )}

        </section>
      </div>

    </main>
  );
}

/* =========================================================
   METRICS
========================================================= */

function Metric({
  icon,
  title,
  value,
}) {
  return (
    <div className="metric">

      <div className="metricIcon">
        {icon}
      </div>

      <small>
        {title}
      </small>

      <strong>
        {value}
      </strong>

    </div>
  );
}

/* =========================================================
   ADMIN CARD
========================================================= */

function AdminCard({
  title,
  text,
  action,
  icon,
  success,
}) {
  return (
    <div className="adminCard">

      <div className="adminCardIcon">
        {icon}
      </div>

      <h3>
        {title}
      </h3>

      <p>
        {text}
      </p>

      <strong
        className={
          success
            ? "ok"
            : ""
        }
      >
        {action}
      </strong>

    </div>
  );
}

function CheckCircleIcon() {
  return (
    <Check size={18} />
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
      new Uint32Array(
        length
      )
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
    .map((c) => {
      if (c === " ") {
        return "/";
      }

      return map[c] || c;
    })
    .join(" ");
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
