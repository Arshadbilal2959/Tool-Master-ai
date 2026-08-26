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
  Upload,
  Download,
  Copy,
  Check,
} from "lucide-react";



const tools = [
  {
    id: "pdf-word",
    name: "PDF to Word",
    description: "Convert PDF documents into editable Word files.",
    category: "PDF",
    icon: FileText,
  },
  {
    id: "text-video",
    name: "Text to Video",
    description: "Turn your text idea into a video-ready script.",
    category: "Video",
    icon: Sparkles,
  },
  {
    id: "seo",
    name: "SEO Analyzer",
    description: "Analyze your content and get useful SEO suggestions.",
    category: "SEO",
    icon: Globe2,
  },
  {
    id: "keyword",
    name: "Keyword Generator",
    description: "Generate keyword ideas for your content.",
    category: "SEO",
    icon: Search,
  },
  {
    id: "image",
    name: "Image Tools",
    description: "Work with image-related utilities.",
    category: "Image",
    icon: ImageIcon,
  },
  {
    id: "code",
    name: "Code Formatter",
    description: "Clean and format your code.",
    category: "Developer",
    icon: Code2,
  },
  {
    id: "calculator",
    name: "Calculator",
    description: "Perform quick mathematical calculations.",
    category: "Math",
    icon: Calculator,
  },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedTool, setSelectedTool] = useState(null);
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);

  const filteredTools = useMemo(() => {
    const value = search.toLowerCase().trim();

    if (!value) return tools;

    return tools.filter(
      (tool) =>
        tool.name.toLowerCase().includes(value) ||
        tool.description.toLowerCase().includes(value) ||
        tool.category.toLowerCase().includes(value)
    );
  }, [search]);

  function openTool(tool) {
    setSelectedTool(tool);
    setFile(null);
    setText("");
    setResult("");
    setCopied(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function closeTool() {
    setSelectedTool(null);
    setFile(null);
    setText("");
    setResult("");
  }

  function handleFile(event) {
    const selected = event.target.files?.[0];

    if (!selected) return;

    setFile(selected);
    setResult(
      `${selected.name} selected successfully.\n\nFile is ready for processing.`
    );
  }

  function processTool() {
    if (!selectedTool) return;

    if (selectedTool.id === "pdf-word") {
      if (!file) {
        setResult("Please select a PDF file first.");
        return;
      }

      setResult(
        `PDF selected: ${file.name}\n\n` +
          `Your file is ready for PDF → Word processing.\n\n` +
          `The frontend is working correctly. A server-side PDF conversion API can be connected to this tool next.`
      );
      return;
    }

    if (selectedTool.id === "text-video") {
      if (!text.trim()) {
        setResult("Please enter some text first.");
        return;
      }

      setResult(
        `VIDEO SCRIPT\n\n` +
          `Title: ${text.slice(0, 60)}\n\n` +
          `Scene 1:\n${text}\n\n` +
          `Voiceover:\n${text}\n\n` +
          `This script is ready for a video generation API.`
      );
      return;
    }

    if (selectedTool.id === "seo") {
      if (!text.trim()) {
        setResult("Please enter your website/content text.");
        return;
      }

      const words = text.trim().split(/\s+/).length;

      setResult(
        `SEO ANALYSIS\n\n` +
          `Word count: ${words}\n` +
          `Content length: ${text.length} characters\n\n` +
          `Suggestions:\n` +
          `• Add a clear SEO title\n` +
          `• Add a meta description\n` +
          `• Use your main keyword naturally\n` +
          `• Add headings and subheadings\n` +
          `• Improve internal linking\n` +
          `• Add descriptive image alt text`
      );
      return;
    }

    if (selectedTool.id === "keyword") {
      if (!text.trim()) {
        setResult("Please enter a topic.");
        return;
      }

      const topic = text.trim();

      setResult(
        `KEYWORD IDEAS FOR: ${topic}\n\n` +
          `${topic}\n` +
          `best ${topic}\n` +
          `${topic} guide\n` +
          `${topic} tools\n` +
          `${topic} online\n` +
          `${topic} free\n` +
          `how to use ${topic}\n` +
          `${topic} for beginners\n` +
          `${topic} tips\n` +
          `${topic} tutorial`
      );
      return;
    }

    if (selectedTool.id === "code") {
      if (!text.trim()) {
        setResult("Please paste your code.");
        return;
      }

      setResult(
        `CODE FORMATTER\n\n` +
          text
            .split("\n")
            .map((line) => line.trim())
            .filter(Boolean)
            .join("\n")
      );
      return;
    }

    if (selectedTool.id === "calculator") {
      if (!text.trim()) {
        setResult("Example: 25 * 4 + 10");
        return;
      }

      try {
        const expression = text.replace(/[^0-9+\-*/().% ]/g, "");

        if (!expression.trim()) {
          setResult("Invalid calculation.");
          return;
        }

        // Basic calculator for normal arithmetic expressions.
        const answer = Function(`"use strict"; return (${expression})`)();

        setResult(`Calculation:\n${expression}\n\nAnswer:\n${answer}`);
      } catch {
        setResult("Could not calculate this expression.");
      }

      return;
    }

    if (selectedTool.id === "image") {
      setResult(
        "Image Tools are ready.\n\n" +
          "Upload an image above to continue. " +
          "An image-processing backend can be connected next."
      );
    }
  }

  async function copyResult() {
    if (!result) return;

    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch {
      setCopied(false);
    }
  }

  function downloadResult() {
    if (!result) return;

    const blob = new Blob([result], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = "toolmaster-result.txt";
    document.body.appendChild(a);
    a.click();
    a.remove();

    URL.revokeObjectURL(url);
  }

  return (
    <div className="app">
      <header className="navbar">
        <div className="nav-inner">
          <a className="brand" href="#home">
            <span className="brand-icon">
              <Wrench size={22} />
            </span>

            <span>
              <strong>ToolMaster</strong>
              <small>Pro</small>
            </span>
          </a>

          <nav className={`nav-links ${menuOpen ? "show" : ""}`}>
            <a href="#home" onClick={() => setMenuOpen(false)}>
              Home
            </a>
            <a href="#tools" onClick={() => setMenuOpen(false)}>
              Tools
            </a>
            <a href="#categories" onClick={() => setMenuOpen(false)}>
              Categories
            </a>
            <a href="#about" onClick={() => setMenuOpen(false)}>
              About
            </a>
          </nav>

          <button
            className="mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <div className="badge">
              <Sparkles size={16} />
              All-in-one online tools
            </div>

            <h1>
              Powerful Tools.
              <br />
              <span>Simple Results.</span>
            </h1>

            <p>
              Convert files, generate keywords, analyze SEO, create content
              and use useful online utilities — all in one place.
            </p>

            <div className="hero-search">
              <Search size={20} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for a tool..."
              />
            </div>
          </div>
        </section>

        {selectedTool && (
          <section className="tool-workspace">
            <div className="workspace-card">
              <div className="workspace-header">
                <div>
                  <div className="tool-title">
                    <selectedTool.icon size={28} />
                    <h2>{selectedTool.name}</h2>
                  </div>

                  <p>{selectedTool.description}</p>
                </div>

                <button className="close-tool" onClick={closeTool}>
                  <X size={20} />
                </button>
              </div>

              {selectedTool.id === "pdf-word" && (
                <div className="input-area">
                  <label className="upload-box">
                    <Upload size={34} />

                    <strong>
                      {file ? file.name : "Choose a PDF file"}
                    </strong>

                    <span>
                      Click here to upload your PDF document
                    </span>

                    <input
                      type="file"
                      accept=".pdf,application/pdf"
                      onChange={handleFile}
                    />
                  </label>
                </div>
              )}

              {selectedTool.id === "image" && (
                <div className="input-area">
                  <label className="upload-box">
                    <ImageIcon size={34} />

                    <strong>
                      {file ? file.name : "Choose an image"}
                    </strong>

                    <span>
                      PNG, JPG, JPEG and other common image files
                    </span>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFile}
                    />
                  </label>
                </div>
              )}

              {[
                "text-video",
                "seo",
                "keyword",
                "code",
                "calculator",
              ].includes(selectedTool.id) && (
                <div className="input-area">
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder={
                      selectedTool.id === "text-video"
                        ? "Enter your text or video idea..."
                        : selectedTool.id === "seo"
                        ? "Paste your website/content text here..."
                        : selectedTool.id === "keyword"
                        ? "Enter your topic..."
                        : selectedTool.id === "code"
                        ? "Paste your code here..."
                        : "Example: 100 + 50 * 2"
                    }
                  />
                </div>
              )}

              <div className="action-row">
                <button className="primary-btn" onClick={processTool}>
                  <Zap size={18} />
                  Process Tool
                </button>

                {result && (
                  <>
                    <button className="secondary-btn" onClick={copyResult}>
                      {copied ? <Check size={18} /> : <Copy size={18} />}
                      {copied ? "Copied" : "Copy"}
                    </button>

                    <button
                      className="secondary-btn"
                      onClick={downloadResult}
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
            </div>
          </section>
        )}

        <section className="tools-section" id="tools">
          <div className="section-heading">
            <div>
              <span className="section-label">OUR TOOLS</span>
              <h2>Everything you need</h2>
            </div>

            <p>
              Choose a tool and start working instantly.
            </p>
          </div>

          <div className="tools-grid">
            {filteredTools.map((tool) => {
              const Icon = tool.icon;

              return (
                <button
                  className="tool-card"
                  key={tool.id}
                  onClick={() => openTool(tool)}
                >
                  <div className="tool-card-icon">
                    <Icon size={25} />
                  </div>

                  <div className="tool-card-content">
                    <span className="tool-category">
                      {tool.category}
                    </span>

                    <h3>{tool.name}</h3>

                    <p>{tool.description}</p>

                    <span className="use-tool">
                      Use Tool <ArrowRight size={16} />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {filteredTools.length === 0 && (
            <div className="empty-state">
              <Search size={40} />
              <h3>No tools found</h3>
              <p>Try another search term.</p>
            </div>
          )}
        </section>

        <section className="features" id="categories">
          <div className="feature">
            <div className="feature-icon">
              <Zap />
            </div>
            <h3>Fast</h3>
            <p>Quick and simple tools designed for everyday tasks.</p>
          </div>

          <div className="feature">
            <div className="feature-icon">
              <ShieldCheck />
            </div>
            <h3>Secure</h3>
            <p>Your workflow is designed with privacy and security in mind.</p>
          </div>

          <div className="feature">
            <div className="feature-icon">
              <Wrench />
            </div>
            <h3>Useful</h3>
            <p>A growing collection of practical online utilities.</p>
          </div>
        </section>

        <section className="about" id="about">
          <div>
            <span className="section-label">ABOUT TOOLMASTER</span>

            <h2>
              One place for your
              <br />
              everyday digital tools.
            </h2>
          </div>

          <p>
            ToolMaster Pro brings useful converters, generators, SEO tools,
            calculators and other utilities into one clean workspace.
          </p>
        </section>
      </main>

      <footer>
        <div className="footer-inner">
          <div className="brand footer-brand">
            <span className="brand-icon">
              <Wrench size={20} />
            </span>

            <span>
              <strong>ToolMaster</strong>
              <small>Pro</small>
            </span>
          </div>

          <p>© 2026 ToolMaster Pro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
