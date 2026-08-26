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
  ShieldCheck,
  Zap,
  Sparkles,
  Upload,
  Download,
  Copy,
  Check,
  ArrowRight,
  Video,
  FileOutput,
  KeyRound,
  BarChart3,
  Type,
  RefreshCw,
} from "lucide-react";
import "./styles.css";

const TOOLS = [
  {
    id: "pdf-word",
    name: "PDF to Word",
    description: "Convert PDF documents into editable Word files.",
    category: "PDF Tools",
    icon: FileOutput,
  },
  {
    id: "pdf-text",
    name: "PDF to Text",
    description: "Extract readable text from PDF documents.",
    category: "PDF Tools",
    icon: FileText,
  },
  {
    id: "text-video",
    name: "Text to Video",
    description: "Turn your text idea into a video-ready script.",
    category: "AI Tools",
    icon: Video,
  },
  {
    id: "seo",
    name: "SEO Analyzer",
    description: "Analyze title, description, keywords and SEO score.",
    category: "SEO Tools",
    icon: BarChart3,
  },
  {
    id: "keyword",
    name: "Keyword Generator",
    description: "Generate useful SEO keyword ideas from your topic.",
    category: "SEO Tools",
    icon: KeyRound,
  },
  {
    id: "word-counter",
    name: "Word Counter",
    description: "Count words, characters and sentences.",
    category: "Text Tools",
    icon: Type,
  },
  {
    id: "case",
    name: "Text Case Converter",
    description: "Convert text to upper, lower and title case.",
    category: "Text Tools",
    icon: RefreshCw,
  },
  {
    id: "calculator",
    name: "Calculator",
    description: "Perform quick mathematical calculations.",
    category: "Utility",
    icon: Calculator,
  },
  {
    id: "image-info",
    name: "Image Tool",
    description: "Upload an image and inspect basic information.",
    category: "Image Tools",
    icon: ImageIcon,
  },
  {
    id: "code",
    name: "Code Formatter",
    description: "Format and clean your code.",
    category: "Developer Tools",
    icon: Code2,
  },
  {
    id: "website",
    name: "Website Analyzer",
    description: "Enter a website URL and get an analysis checklist.",
    category: "SEO Tools",
    icon: Globe2,
  },
];

function downloadText(filename, text, type = "text/plain") {
  const blob = new Blob([text], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function ToolWorkspace({ tool, onClose }) {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [imageInfo, setImageInfo] = useState(null);

  const Icon = tool.icon;

  const copyResult = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const processTool = () => {
    if (tool.id === "word-counter") {
      const words = text.trim() ? text.trim().split(/\s+/).length : 0;
      const chars = text.length;
      const sentences = text
        .split(/[.!?]+/)
        .map((x) => x.trim())
        .filter(Boolean).length;

      setResult(
        `Words: ${words}\nCharacters: ${chars}\nSentences: ${sentences}`
      );
      return;
    }

    if (tool.id === "case") {
      setResult(
        `UPPERCASE:\n${text.toUpperCase()}\n\nLOWERCASE:\n${text.toLowerCase()}\n\nTITLE CASE:\n${text
          .toLowerCase()
          .replace(/\b\w/g, (c) => c.toUpperCase())}`
      );
      return;
    }

    if (tool.id === "keyword") {
      const base = text.trim();
      if (!base) {
        setResult("Please enter a topic first.");
        return;
      }

      const generated = [
        base,
        `${base} tools`,
        `${base} online`,
        `free ${base}`,
        `${base} generator`,
        `${base} software`,
        `${base} tutorial`,
        `${base} guide`,
        `${base} best tools`,
        `${base} for beginners`,
        `${base} free online`,
        `${base} services`,
      ];

      setKeywords(generated);
      setResult(generated.join("\n"));
      return;
    }

    if (tool.id === "seo") {
      const title = text.trim();
      const score =
        title.length >= 30 && title.length <= 60
          ? 100
          : title.length > 0
          ? 70
          : 0;

      setResult(
        `SEO ANALYSIS

Title:
${title || "No title provided"}

SEO Score: ${score}/100

Recommendations:
- Keep the title around 30–60 characters.
- Include your main keyword.
- Use a clear and descriptive title.
- Create a unique meta description.
- Use relevant headings and internal links.`
      );
      return;
    }

    if (tool.id === "calculator") {
      try {
        const safe = text.replace(/[^0-9+\-*/().%\s]/g, "");
        if (!safe.trim()) {
          setResult("Enter a mathematical expression.");
          return;
        }

        // Basic calculator only.
        const answer = Function(`"use strict"; return (${safe})`)();
        setResult(String(answer));
      } catch {
        setResult("Invalid calculation.");
      }
      return;
    }

    if (tool.id === "text-video") {
      if (!text.trim()) {
        setResult("Enter your video topic or script first.");
        return;
      }

      setResult(
        `VIDEO SCRIPT

TITLE:
${text.trim()}

HOOK:
Are you ready to learn more about ${text.trim()}?

INTRO:
Welcome! In this video we will explore ${text.trim()}.

MAIN CONTENT:
Explain the main idea clearly.
Add examples and useful information.
Keep each section short and engaging.

CALL TO ACTION:
If you found this useful, share the video and follow for more.

END:
Thanks for watching!`
      );
      return;
    }

    if (tool.id === "code") {
      const formatted = text
        .replace(/\{/g, "{\n")
        .replace(/\}/g, "\n}\n")
        .replace(/;/g, ";\n");

      setResult(formatted);
      return;
    }

    if (tool.id === "website") {
      if (!url.trim()) {
        setResult("Please enter a website URL.");
        return;
      }

      setResult(
        `WEBSITE ANALYSIS

URL:
${url}

Checklist:
✓ Website URL received
✓ Mobile responsiveness should be checked
✓ Page title should be optimized
✓ Meta description should be present
✓ H1 heading should be present
✓ Images should have alt text
✓ Website speed should be optimized
✓ HTTPS should be enabled
✓ Internal links should be checked

Note:
For a complete live website crawl, connect a server-side SEO API in the backend.`
      );
      return;
    }

    if (tool.id === "pdf-word") {
      if (!file) {
        setResult("Please select a PDF file first.");
        return;
      }

      setResult(
        `PDF selected successfully:

${file.name}

File size:
${(file.size / 1024 / 1024).toFixed(2)} MB

The file is ready for the PDF processing backend.

This frontend version does not require jspdf and will build safely on Vercel.`
      );
      return;
    }

    if (tool.id === "pdf-text") {
      if (!file) {
        setResult("Please select a PDF file first.");
        return;
      }

      setResult(
        `PDF selected:

${file.name}

For actual PDF text extraction, connect a server-side PDF parser / Edge Function.

The upload interface is working correctly.`
      );
      return;
    }

    setResult("Tool is ready.");
  };

  const handleImage = (selected) => {
    if (!selected) return;

    setFile(selected);

    if (selected.type.startsWith("image/")) {
      const img = new Image();

      img.onload = () => {
        setImageInfo({
          width: img.width,
          height: img.height,
          size: (selected.size / 1024).toFixed(1),
          type: selected.type,
        });
      };

      img.src = URL.createObjectURL(selected);
    }
  };

  const needsFile =
    tool.id === "pdf-word" ||
    tool.id === "pdf-text" ||
    tool.id === "image-info";

  return (
    <div className="workspace-overlay">
      <div className="workspace">
        <div className="workspace-header">
          <div className="workspace-title">
            <div className="tool-icon-large">
              <Icon size={26} />
            </div>

            <div>
              <h2>{tool.name}</h2>
              <p>{tool.description}</p>
            </div>
          </div>

          <button className="icon-btn" onClick={onClose}>
            <X size={22} />
          </button>
        </div>

        <div className="workspace-body">
          {needsFile && (
            <div className="upload-box">
              <Upload size={38} />

              <h3>
                {tool.id === "image-info"
                  ? "Upload an image"
                  : "Upload your PDF"}
              </h3>

              <p>
                {tool.id === "image-info"
                  ? "PNG, JPG, JPEG or WebP"
                  : "Select a PDF file from your computer"}
              </p>

              <label className="upload-button">
                Choose File
                <input
                  type="file"
                  hidden
                  accept={
                    tool.id === "image-info"
                      ? "image/*"
                      : ".pdf,application/pdf"
                  }
                  onChange={(e) => {
                    const selected = e.target.files?.[0];
                    if (tool.id === "image-info") {
                      handleImage(selected);
                    } else {
                      setFile(selected || null);
                    }
                  }}
                />
              </label>

              {file && (
                <div className="selected-file">
                  <FileText size={18} />
                  <span>{file.name}</span>
                </div>
              )}

              {imageInfo && tool.id === "image-info" && (
                <div className="info-card">
                  <strong>Image Information</strong>
                  <p>
                    Dimensions: {imageInfo.width} × {imageInfo.height}
                  </p>
                  <p>Size: {imageInfo.size} KB</p>
                  <p>Type: {imageInfo.type}</p>
                </div>
              )}
            </div>
          )}

          {tool.id === "website" && (
            <div className="input-section">
              <label>Website URL</label>
              <input
                className="text-input"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
              />
            </div>
          )}

          {!needsFile && tool.id !== "website" && (
            <div className="input-section">
              <label>
                {tool.id === "calculator"
                  ? "Expression"
                  : tool.id === "seo"
                  ? "Enter your page title"
                  : tool.id === "keyword"
                  ? "Enter your topic"
                  : "Enter your text"}
              </label>

              <textarea
                className="main-textarea"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={
                  tool.id === "calculator"
                    ? "25 * 4 + 10"
                    : tool.id === "keyword"
                    ? "e.g. PDF converter"
                    : "Type or paste your content here..."
                }
              />
            </div>
          )}

          <div className="action-row">
            <button className="primary-btn" onClick={processTool}>
              <Sparkles size={18} />
              Process
            </button>

            {result && (
              <>
                <button className="secondary-btn" onClick={copyResult}>
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                  {copied ? "Copied" : "Copy"}
                </button>

                <button
                  className="secondary-btn"
                  onClick={() =>
                    downloadText(
                      `${tool.id}-result.txt`,
                      result,
                      "text/plain"
                    )
                  }
                >
                  <Download size={18} />
                  Download
                </button>
              </>
            )}
          </div>

          {result && (
            <div className="result-box">
              <div className="result-header">
                <strong>Result</strong>
              </div>

              <pre>{result}</pre>
            </div>
          )}

          {keywords.length > 0 && (
            <div className="keyword-list">
              {keywords.map((keyword, index) => (
                <span key={index}>{keyword}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function App() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [search, setSearch] = useState("");
  const [activeTool, setActiveTool] = useState(null);
  const [category, setCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...new Set(TOOLS.map((tool) => tool.category))],
    []
  );

  const filteredTools = useMemo(() => {
    return TOOLS.filter((tool) => {
      const categoryMatch =
        category === "All" || tool.category === category;

      const searchMatch =
        !search ||
        tool.name.toLowerCase().includes(search.toLowerCase()) ||
        tool.description.toLowerCase().includes(search.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }, [category, search]);

  return (
    <div className="app">
      <header className="navbar">
        <div className="container nav-inner">
          <a className="logo" href="#home">
            <div className="logo-mark">
              <Wrench size={22} />
            </div>

            <span>
              Tool<span>Master</span>
            </span>
          </a>

          <nav className={mobileMenu ? "nav-links mobile-open" : "nav-links"}>
            <a href="#home" onClick={() => setMobileMenu(false)}>
              Home
            </a>

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

          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="container hero-content">
            <div className="badge">
              <Sparkles size={15} />
              All-in-one online tools
            </div>

            <h1>
              Powerful tools.
              <br />
              <span>Simple results.</span>
            </h1>

            <p>
              Convert files, optimize content, generate keywords, analyze SEO
              and more — all from one simple platform.
            </p>

            <div className="hero-search">
              <Search size={21} />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for a tool..."
              />

              <button onClick={() => {
                document
                  .getElementById("tools")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}>
                Search
              </button>
            </div>

            <div className="hero-stats">
              <div>
                <strong>{TOOLS.length}+</strong>
                <span>Useful Tools</span>
              </div>

              <div>
                <strong>Free</strong>
                <span>To Use</span>
              </div>

              <div>
                <strong>Fast</strong>
                <span>Processing</span>
              </div>
            </div>
          </div>
        </section>

        <section className="tools-section" id="tools">
          <div className="container">
            <div className="section-heading">
              <div>
                <span className="section-label">OUR TOOLS</span>
                <h2>Everything you need</h2>
                <p>
                  Select a tool and start working instantly.
                </p>
              </div>
            </div>

            <div className="category-tabs" id="categories">
              {categories.map((item) => (
                <button
                  key={item}
                  className={category === item ? "active" : ""}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="tools-grid">
              {filteredTools.map((tool) => {
                const Icon = tool.icon;

                return (
                  <article className="tool-card" key={tool.id}>
                    <div className="tool-card-icon">
                      <Icon size={24} />
                    </div>

                    <div className="tool-card-content">
                      <span className="tool-category">
                        {tool.category}
                      </span>

                      <h3>{tool.name}</h3>

                      <p>{tool.description}</p>

                      <button
                        className="tool-link"
                        onClick={() => setActiveTool(tool)}
                      >
                        Open Tool
                        <ArrowRight size={17} />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>

            {filteredTools.length === 0 && (
              <div className="empty-state">
                <Search size={35} />
                <h3>No tools found</h3>
                <p>Try another search.</p>
              </div>
            )}
          </div>
        </section>

        <section className="features">
          <div className="container">
            <div className="features-grid">
              <div className="feature">
                <Zap size={28} />
                <h3>Fast</h3>
                <p>
                  Designed for quick and simple processing.
                </p>
              </div>

              <div className="feature">
                <ShieldCheck size={28} />
                <h3>Secure</h3>
                <p>
                  Your files stay in your browser unless processing requires
                  a backend.
                </p>
              </div>

              <div className="feature">
                <Wrench size={28} />
                <h3>Easy to Use</h3>
                <p>
                  Clean interface with straightforward tools.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="about-section" id="about">
          <div className="container about-content">
            <span className="section-label">ABOUT TOOLMASTER</span>
            <h2>One platform for everyday digital tasks.</h2>
            <p>
              ToolMaster Pro brings useful PDF, text, SEO, developer,
              calculator and AI utilities together in one place.
            </p>
          </div>
        </section>
      </main>

      <footer>
        <div className="container footer-inner">
          <div className="logo">
            <div className="logo-mark">
              <Wrench size={19} />
            </div>

            <span>
              Tool<span>Master</span>
            </span>
          </div>

          <p>© 2026 ToolMaster Pro. All rights reserved.</p>
        </div>
      </footer>

      {activeTool && (
        <ToolWorkspace
          tool={activeTool}
          onClose={() => setActiveTool(null)}
        />
      )}
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
