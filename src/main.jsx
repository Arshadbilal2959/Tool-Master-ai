import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Search,
  Menu,
  X,
  Wrench,
  ArrowRight,
  Moon,
  Sun,
  Heart,
  ChevronLeft,
  Sparkles,
  ShieldCheck,
  LayoutDashboard,
  RefreshCw,
  ExternalLink,
} from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import "./styles.css";

/* =========================================================
   SUPABASE
========================================================= */

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

/* =========================================================
   FALLBACK DATA
========================================================= */

const fallbackCategories = [
  "Network Tools",
  "Converter Tools",
  "Calculator Tools",
  "SEO & Marketing",
  "Utility Tools",
  "AI & Education",
  "AI & Video",
  "Security Tools",
  "AI Tools",
  "Image Tools",
  "PDF Tools",
  "Text Tools",
  "Developer Tools",
  "Productivity",
];

const categoryIcons = {
  "Network Tools": Wrench,
  "Converter Tools": Wrench,
  "Calculator Tools": Wrench,
  "SEO & Marketing": Wrench,
  "Utility Tools": Wrench,
  "AI & Education": Sparkles,
  "AI & Video": Sparkles,
  "Security Tools": ShieldCheck,
  "AI Tools": Sparkles,
  "Image Tools": Wrench,
  "PDF Tools": Wrench,
  "Text Tools": Wrench,
  "Developer Tools": Wrench,
  Productivity: Wrench,
};

/* =========================================================
   HELPERS
========================================================= */

function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem("tm-favorites") || "[]");
  } catch {
    return [];
  }
}

function getTheme() {
  try {
    return JSON.parse(localStorage.getItem("tm-theme") || "false");
  } catch {
    return false;
  }
}

/* =========================================================
   APP
========================================================= */

function App() {
  const [categories, setCategories] = useState([]);
  const [tools, setTools] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [category, setCategory] = useState("All Tools");
  const [query, setQuery] = useState("");
  const [selectedTool, setSelectedTool] = useState(null);

  const [mobileMenu, setMobileMenu] = useState(false);
  const [dark, setDark] = useState(getTheme);
  const [favorites, setFavorites] = useState(getFavorites);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    setError("");

    if (!supabase) {
      setError(
        "Supabase environment variables are missing. Check Vercel settings."
      );
      setLoading(false);
      return;
    }

    const [categoryResult, toolResult] = await Promise.all([
      supabase
        .from("categories")
        .select(
          "id,name,slug,description,icon,is_active,sort_order,created_at"
        )
        .eq("is_active", true)
        .order("sort_order", { ascending: true }),

      supabase
        .from("tools")
        .select(
          "id,name,slug,description,category_id,long_description,icon_url,tool_type,tool_url,is_active,is_featured,sort_order,created_at,updated_at"
        )
        .eq("is_active", true)
        .order("sort_order", { ascending: true }),
    ]);

    if (categoryResult.error) {
      console.error(categoryResult.error);
      setError(
        "Categories load nahi ho rahi. Supabase table permissions/RLS check karein."
      );
    }

    if (toolResult.error) {
      console.error(toolResult.error);
      setError(
        "Tools load nahi ho rahe. Supabase table permissions/RLS check karein."
      );
    }

    setCategories(
      categoryResult.data?.length
        ? categoryResult.data
        : fallbackCategories.map((name, index) => ({
            id: `fallback-${index}`,
            name,
            slug: name.toLowerCase().replace(/\s+/g, "-"),
            sort_order: index,
          }))
    );

    setTools(toolResult.data || []);
    setLoading(false);
  }

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    localStorage.setItem("tm-theme", JSON.stringify(next));
  }

  function toggleFavorite(id) {
    const next = favorites.includes(id)
      ? favorites.filter((x) => x !== id)
      : [...favorites, id];

    setFavorites(next);
    localStorage.setItem("tm-favorites", JSON.stringify(next));
  }

  const filteredTools = useMemo(() => {
    const q = query.trim().toLowerCase();

    return tools.filter((tool) => {
      const categoryData = categories.find(
        (c) => c.id === tool.category_id
      );

      const categoryName = categoryData?.name || "";

      const categoryMatch =
        category === "All Tools" ||
        categoryName === category;

      const searchMatch =
        !q ||
        tool.name?.toLowerCase().includes(q) ||
        tool.description?.toLowerCase().includes(q) ||
        categoryName.toLowerCase().includes(q);

      return categoryMatch && searchMatch;
    });
  }, [tools, categories, category, query]);

  if (selectedTool) {
    return (
      <div className={dark ? "app dark" : "app"}>
        <ToolPage
          tool={selectedTool}
          categories={categories}
          back={() => setSelectedTool(null)}
        />
      </div>
    );
  }

  return (
    <div className={dark ? "app dark" : "app"}>
      <header className="header">
        <div className="nav">
          <button
            className="brand"
            onClick={() => {
              setCategory("All Tools");
              setQuery("");
              window.scrollTo({ top: 0, behavior: "smooth" });
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
            <button
              className="iconBtn"
              onClick={toggleTheme}
              title="Toggle theme"
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              className="adminBtn"
              onClick={() =>
                document
                  .getElementById("admin")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
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
          SEO, text, developers, calculators and AI.
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
            <b>{tools.length}</b>
            <small>Tools</small>
          </div>

          <div>
            <b>{categories.length}</b>
            <small>Categories</small>
          </div>

          <div>
            <b>100%</b>
            <small>Browser Friendly</small>
          </div>
        </div>
      </section>

      <main id="tools" className="container">
        <section id="categories" className="categories">
          <button
            className={
              category === "All Tools" ? "cat active" : "cat"
            }
            onClick={() => setCategory("All Tools")}
          >
            <Wrench size={18} />
            <span>All Tools</span>
            <em>{tools.length}</em>
          </button>

          {categories.map((item) => {
            const Icon =
              categoryIcons[item.name] || Wrench;

            const count = tools.filter(
              (tool) => tool.category_id === item.id
            ).length;

            return (
              <button
                key={item.id}
                className={
                  category === item.name
                    ? "cat active"
                    : "cat"
                }
                onClick={() => setCategory(item.name)}
              >
                <Icon size={18} />
                <span>{item.name}</span>
                <em>{count}</em>
              </button>
            );
          })}
        </section>

        <div className="sectionHead">
          <div>
            <h2>{category}</h2>
            <p>{filteredTools.length} tools available</p>
          </div>

          {favorites.length > 0 && (
            <div className="favoriteInfo">
              <Heart size={16} fill="currentColor" />
              {favorites.length} favorites
            </div>
          )}
        </div>

        {loading ? (
          <div className="empty">
            <RefreshCw size={40} className="spin" />
            <h3>Loading tools...</h3>
            <p>Supabase se tools load ho rahe hain.</p>
          </div>
        ) : error ? (
          <div className="empty">
            <ShieldCheck size={40} />
            <h3>Connection problem</h3>
            <p>{error}</p>

            <button className="primary" onClick={loadData}>
              <RefreshCw size={17} />
              Try Again
            </button>
          </div>
        ) : filteredTools.length ? (
          <div className="grid">
            {filteredTools.map((tool) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                category={
                  categories.find(
                    (c) => c.id === tool.category_id
                  )?.name || "Tools"
                }
                favorite={favorites.includes(tool.id)}
                toggleFavorite={() =>
                  toggleFavorite(tool.id)
                }
                open={() => setSelectedTool(tool)}
              />
            ))}
          </div>
        ) : (
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

      <section id="admin" className="adminPreview container">
        <div>
          <div className="pill">
            <LayoutDashboard size={15} />
            Admin
          </div>

          <h2>ToolMaster Pro Dashboard</h2>

          <p>
            Your tools and categories are now connected directly
            with Supabase.
          </p>
        </div>

        <div className="adminStats">
          <div>
            <b>{tools.length}</b>
            <span>Active Tools</span>
          </div>

          <div>
            <b>{categories.length}</b>
            <span>Categories</span>
          </div>

          <div>
            <b>{favorites.length}</b>
            <span>Favorites</span>
          </div>
        </div>
      </section>

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
            © 2026 ToolMaster Pro. Built with React, Vite,
            Supabase and Vercel.
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
  favorite,
  toggleFavorite,
  open,
}) {
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
      >
        <Heart
          size={16}
          fill={favorite ? "currentColor" : "none"}
        />
      </button>

      <div className="cardClick" onClick={open}>
        <div className="toolIcon">
          {tool.icon_url ? (
            <img
              src={tool.icon_url}
              alt=""
              className="toolImage"
            />
          ) : (
            <Wrench size={21} />
          )}
        </div>

        <div className="cardBody">
          <span>{category}</span>
          <h3>{tool.name}</h3>
          <p>{tool.description || "Explore this tool."}</p>
        </div>

        <ArrowRight className="arrow" size={19} />
      </div>
    </article>
  );
}

/* =========================================================
   TOOL PAGE
========================================================= */

function ToolPage({ tool, categories, back }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const category =
    categories.find((c) => c.id === tool.category_id)?.name ||
    "Tool";

  function runTool() {
    let result = input;

    switch (tool.slug) {
      case "word-counter":
        result = `Words: ${
          input.trim() ? input.trim().split(/\s+/).length : 0
        }\nCharacters: ${input.length}`;
        break;

      case "text-cleaner":
        result = input.replace(/\s+/g, " ").trim();
        break;

      case "text-reverser":
        result = [...input].reverse().join("");
        break;

      case "case-converter":
        result = input.toLowerCase();
        break;

      case "slug":
      case "url-slug-generator":
        result = input
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "");
        break;

      case "url-encoder":
        result = encodeURIComponent(input);
        break;

      case "json-formatter":
        try {
          result = JSON.stringify(
            JSON.parse(input),
            null,
            2
          );
        } catch {
          result = "Invalid JSON.";
        }
        break;

      case "json-minifier":
        try {
          result = JSON.stringify(JSON.parse(input));
        } catch {
          result = "Invalid JSON.";
        }
        break;

      case "uuid":
        result = crypto.randomUUID();
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

      case "base64-encode":
        result = btoa(
          unescape(encodeURIComponent(input))
        );
        break;

      case "base64-decode":
        try {
          result = decodeURIComponent(
            escape(atob(input))
          );
        } catch {
          result = "Invalid Base64.";
        }
        break;

      default:
        result =
          input ||
          `This is the ${tool.name} tool. Connect its processing API or add its browser-side logic here.`;
    }

    setOutput(result);
  }

  async function copyResult() {
    if (!output) return;

    await navigator.clipboard?.writeText(output);
    setCopied(true);

    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <main className="toolPage container">
      <button className="back" onClick={back}>
        <ChevronLeft size={18} />
        Back to tools
      </button>

      <div className="toolHero">
        <div className="toolIcon big">
          {tool.icon_url ? (
            <img
              src={tool.icon_url}
              alt=""
              className="toolImage"
            />
          ) : (
            <Wrench />
          )}
        </div>

        <div>
          <span>{category}</span>

          <h1>{tool.name}</h1>

          <p>
            {tool.long_description ||
              tool.description ||
              "Use this online tool quickly and easily."}
          </p>
        </div>
      </div>

      {tool.tool_url ? (
        <div className="externalTool">
          <h3>External Tool</h3>

          <p>
            This tool is provided through an external service.
          </p>

          <a
            href={tool.tool_url}
            target="_blank"
            rel="noreferrer"
            className="primary linkButton"
          >
            Open Tool
            <ExternalLink size={17} />
          </a>
        </div>
      ) : (
        <div className="workspace">
          <div className="panel">
            <label>Input</label>

            <textarea
              value={input}
              onChange={(e) =>
                setInput(e.target.value)
              }
              placeholder={`Enter content for ${tool.name}...`}
            />

            <button
              className="primary"
              onClick={runTool}
            >
              <Sparkles size={17} />
              Run Tool
            </button>
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
              onClick={copyResult}
            >
              {copied ? "Copied!" : "Copy Result"}
            </button>
          </div>
        </div>
      )}

      <div className="notice">
        <ShieldCheck size={20} />
        ToolMaster Pro uses Supabase for tool and category
        data. Never put private API keys in frontend code.
      </div>
    </main>
  );
}

/* =========================================================
   MOUNT
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
