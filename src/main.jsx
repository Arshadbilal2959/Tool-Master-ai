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
  Download,
  Copy,
  Check,
  Upload,
  Trash2,
  RefreshCw,
  FileDown,
  Type,
  Video,
  BarChart3,
  KeyRound,
  Lock,
  Eye,
  Hash,
  Link as LinkIcon,
} from "lucide-react";

import "./styles.css";

const TOOLS = [
  {
    id: "pdf-word",
    name: "PDF to Word",
    description: "Convert PDF documents into editable Word files.",
    category: "PDF",
    icon: FileText,
  },
  {
    id: "pdf-text",
    name: "PDF to Text",
    description: "Extract readable text from PDF documents.",
    category: "PDF",
    icon: FileText,
  },
  {
    id: "text-pdf",
    name: "Text to PDF",
    description: "Create a downloadable PDF from your text.",
    category: "PDF",
    icon: FileDown,
  },
  {
    id: "image-compress",
    name: "Image Compressor",
    description: "Compress images directly in your browser.",
    category: "Image",
    icon: ImageIcon,
  },
  {
    id: "image-converter",
    name: "Image Converter",
    description: "Convert images between common formats.",
    category: "Image",
    icon: ImageIcon,
  },
  {
    id: "text-video",
    name: "Text to Video",
    description: "Prepare a video script and scene plan from text.",
    category: "Video",
    icon: Video,
  },
  {
    id: "seo-analyzer",
    name: "SEO Analyzer",
    description: "Analyze title, description, headings and keyword usage.",
    category: "SEO",
    icon: BarChart3,
  },
  {
    id: "keyword-generator",
    name: "Keyword Generator",
    description: "Generate SEO keyword ideas from your topic.",
    category: "SEO",
    icon: KeyRound,
  },
  {
    id: "meta-generator",
    name: "Meta Tag Generator",
    description: "Generate SEO title and meta description suggestions.",
    category: "SEO",
    icon: Hash,
  },
  {
    id: "word-counter",
    name: "Word Counter",
    description: "Count words, characters, sentences and paragraphs.",
    category: "Text",
    icon: Type,
  },
  {
    id: "case-converter",
    name: "Case Converter",
    description: "Convert text to upper, lower and title case.",
    category: "Text",
    icon: Type,
  },
  {
    id: "text-cleaner",
    name: "Text Cleaner",
    description: "Remove extra spaces and clean your text.",
    category: "Text",
    icon: Sparkles,
  },
  {
    id: "calculator",
    name: "Calculator",
    description: "Perform common mathematical calculations.",
    category: "Utility",
    icon: Calculator,
  },
  {
    id: "password",
    name: "Password Generator",
    description: "Generate strong random passwords.",
    category: "Security",
    icon: Lock,
  },
  {
    id: "url-checker",
    name: "URL Generator",
    description: "Create a clean URL slug from your text.",
    category: "SEO",
    icon: LinkIcon,
  },
];

const CATEGORIES = [
  "All",
  "PDF",
  "Image",
  "Video",
  "SEO",
  "Text",
  "Utility",
  "Security",
];

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function downloadText(text, filename, type = "text/plain") {
  downloadBlob(new Blob([text], { type }), filename);
}

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function generateKeywords(topic) {
  if (!topic.trim()) return [];

  const base = topic.trim();

  return [
    base,
    `${base} online`,
    `${base} free`,
    `best ${base}`,
    `${base} tool`,
    `${base} guide`,
    `${base} tutorial`,
    `${base} tips`,
    `${base} software`,
    `${base} service`,
    `${base} generator`,
    `${base} converter`,
    `${base} for beginners`,
    `${base} 2026`,
    `${base} free online`,
  ];
}

function getTextStats(text) {
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, "").length;
  const sentences = text.trim()
    ? (text.match(/[.!?]+(?=\s|$)/g) || []).length
    : 0;
  const paragraphs = text.trim()
    ? text.split(/\n\s*\n/).filter(Boolean).length
    : 0;

  return {
    words,
    characters,
    charactersNoSpaces,
    sentences,
    paragraphs,
  };
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedTool, setSelectedTool] = useState(null);

  const filteredTools = useMemo(() => {
    return TOOLS.filter((tool) => {
      const categoryMatch =
        activeCategory === "All" || tool.category === activeCategory;

      const searchMatch =
        !search.trim() ||
        tool.name.toLowerCase().includes(search.toLowerCase()) ||
        tool.description.toLowerCase().includes(search.toLowerCase()) ||
        tool.category.toLowerCase().includes(search.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }, [activeCategory, search]);

  function openTool(tool) {
    setSelectedTool(tool);
    setMenuOpen(false);
  }

  return (
    <div className="app">
      <header className="navbar">
        <div className="container nav-inner">
          <button
            className="brand"
            onClick={() => {
              setSelectedTool(null);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <span className="brand-icon">
              <Wrench size={21} />
            </span>
            <span>ToolMaster<span className="brand-pro">Pro</span></span>
          </button>

          <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
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
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <main>
        {!selectedTool ? (
          <>
            <section className="hero">
              <div className="container hero-content">
                <div className="hero-badge">
                  <Sparkles size={15} />
                  Powerful tools. Simple experience.
                </div>

                <h1>
                  All Your Essential
                  <span> Online Tools</span>
                </h1>

                <p>
                  Convert, create, analyze and optimize with fast browser-based
                  tools. No complicated software required.
                </p>

                <div className="hero-search">
                  <Search size={21} />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search for a tool..."
                  />
                  {search && (
                    <button
                      className="clear-search"
                      onClick={() => setSearch("")}
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>

                <div className="hero-stats">
                  <div>
                    <strong>{TOOLS.length}+</strong>
                    <span>Tools</span>
                  </div>
                  <div>
                    <strong>8</strong>
                    <span>Categories</span>
                  </div>
                  <div>
                    <strong>100%</strong>
                    <span>Simple</span>
                  </div>
                </div>
              </div>
            </section>

            <section id="categories" className="categories-section">
              <div className="container">
                <div className="section-heading">
                  <div>
                    <span className="eyebrow">EXPLORE</span>
                    <h2>Categories</h2>
                  </div>
                </div>

                <div className="category-tabs">
                  {CATEGORIES.map((category) => (
                    <button
                      key={category}
                      className={
                        activeCategory === category ? "active" : ""
                      }
                      onClick={() => setActiveCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            <section id="tools" className="tools-section">
              <div className="container">
                <div className="section-heading">
                  <div>
                    <span className="eyebrow">TOOLS</span>
                    <h2>Choose a Tool</h2>
                  </div>
                  <span className="result-count">
                    {filteredTools.length} tools
                  </span>
                </div>

                {filteredTools.length === 0 ? (
                  <div className="empty-state">
                    <Search size={42} />
                    <h3>No tools found</h3>
                    <p>Try another search term or category.</p>
                    <button
                      className="primary-btn"
                      onClick={() => {
                        setSearch("");
                        setActiveCategory("All");
                      }}
                    >
                      Reset Search
                    </button>
                  </div>
                ) : (
                  <div className="tool-grid">
                    {filteredTools.map((tool) => (
                      <ToolCard
                        key={tool.id}
                        tool={tool}
                        onClick={() => openTool(tool)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </section>

            <section id="about" className="about-section">
              <div className="container about-grid">
                <div>
                  <span className="eyebrow">ABOUT TOOLMASTER PRO</span>
                  <h2>Useful tools without the complexity.</h2>
                  <p>
                    ToolMaster Pro brings everyday PDF, image, text, SEO,
                    security and utility tools together in one clean place.
                  </p>
                </div>

                <div className="feature-list">
                  <Feature
                    icon={<Zap size={20} />}
                    title="Fast"
                    text="Designed for quick everyday tasks."
                  />
                  <Feature
                    icon={<ShieldCheck size={20} />}
                    title="Privacy Friendly"
                    text="Browser-based features keep many tasks on your device."
                  />
                  <Feature
                    icon={<Wrench size={20} />}
                    title="Simple"
                    text="Clear interfaces with no unnecessary complexity."
                  />
                </div>
              </div>
            </section>
          </>
        ) : (
          <ToolPage
            tool={selectedTool}
            onBack={() => setSelectedTool(null)}
          />
        )}
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <div>
            <div className="footer-brand">
              <span className="brand-icon">
                <Wrench size={18} />
              </span>
              ToolMasterPro
            </div>
            <p>Simple tools for everyday work.</p>
          </div>
          <div className="footer-copy">
            © {new Date().getFullYear()} ToolMasterPro
          </div>
        </div>
      </footer>
    </div>
  );
}

function ToolCard({ tool, onClick }) {
  const Icon = tool.icon;

  return (
    <button className="tool-card" onClick={onClick}>
      <div className="tool-icon">
        <Icon size={24} />
      </div>

      <div className="tool-card-content">
        <div className="tool-category">{tool.category}</div>
        <h3>{tool.name}</h3>
        <p>{tool.description}</p>
      </div>

      <ArrowRight className="tool-arrow" size={20} />
    </button>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="feature">
      <div className="feature-icon">{icon}</div>
      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </div>
  );
}

function ToolPage({ tool, onBack }) {
  const components = {
    "pdf-word": <PdfWordTool />,
    "pdf-text": <PdfTextTool />,
    "text-pdf": <TextPdfTool />,
    "image-compress": <ImageCompressTool />,
    "image-converter": <ImageConverterTool />,
    "text-video": <TextVideoTool />,
    "seo-analyzer": <SeoAnalyzerTool />,
    "keyword-generator": <KeywordTool />,
    "meta-generator": <MetaTool />,
    "word-counter": <WordCounterTool />,
    "case-converter": <CaseConverterTool />,
    "text-cleaner": <TextCleanerTool />,
    calculator: <CalculatorTool />,
    password: <PasswordTool />,
    "url-checker": <SlugTool />,
  };

  return (
    <section className="tool-page">
      <div className="container">
        <button className="back-btn" onClick={onBack}>
          ← Back to tools
        </button>

        <div className="tool-page-header">
          <div className="tool-page-icon">
            <tool.icon size={30} />
          </div>
          <div>
            <span className="eyebrow">{tool.category}</span>
            <h1>{tool.name}</h1>
            <p>{tool.description}</p>
          </div>
        </div>

        <div className="tool-workspace">
          {components[tool.id] || (
            <div className="empty-state">
              <h3>Tool coming soon</h3>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Workspace({ children }) {
  return <div className="workspace-inner">{children}</div>;
}

function FileInput({ file, setFile, accept = ".pdf" }) {
  function handleFile(e) {
    const selected = e.target.files?.[0];
    if (selected) setFile(selected);
  }

  return (
    <div className="file-input">
      {!file ? (
        <label className="dropzone">
          <Upload size={35} />
          <strong>Choose a file</strong>
          <span>Click to upload or select a file</span>
          <small>Accepted: {accept}</small>
          <input type="file" accept={accept} onChange={handleFile} />
        </label>
      ) : (
        <div className="selected-file">
          <div className="selected-file-icon">
            <FileText size={24} />
          </div>
          <div>
            <strong>{file.name}</strong>
            <span>{(file.size / 1024 / 1024).toFixed(2)} MB</span>
          </div>
          <button
            className="icon-btn"
            onClick={() => setFile(null)}
            title="Remove file"
          >
            <Trash2 size={18} />
          </button>
        </div>
      )}
    </div>
  );
}

function PdfWordTool() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  function convert() {
    if (!file) {
      setMessage("Please select a PDF first.");
      return;
    }

    setMessage(
      `PDF selected: ${file.name}. Full PDF-to-Word conversion requires a document-processing backend.`
    );
  }

  return (
    <Workspace>
      <FileInput file={file} setFile={setFile} accept=".pdf,application/pdf" />

      <button className="primary-btn large" onClick={convert}>
        <FileDown size={19} />
        Convert to Word
      </button>

      {message && <div className="notice">{message}</div>}
    </Workspace>
  );
}

function PdfTextTool() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  function extract() {
    if (!file) {
      setMessage("Please select a PDF first.");
      return;
    }

    setMessage(
      `PDF selected: ${file.name}. Browser-only PDF text extraction can be connected to the processing backend next.`
    );
  }

  return (
    <Workspace>
      <FileInput file={file} setFile={setFile} accept=".pdf,application/pdf" />

      <button className="primary-btn large" onClick={extract}>
        <FileText size={19} />
        Extract Text
      </button>

      {message && <div className="notice">{message}</div>}
    </Workspace>
  );
}

function TextPdfTool() {
  const [text, setText] = useState("");

  function createPdf() {
    if (!text.trim()) return;

    const content = text
      .split("\n")
      .map((line) => line || " ")
      .join("\n");

    const pseudoPdf = `%PDF-1.4\n% ToolMasterPro Text Export\n\n${content}\n\n%%EOF`;

    downloadText(pseudoPdf, "toolmaster-document.pdf", "application/pdf");
  }

  return (
    <Workspace>
      <textarea
        className="big-textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type or paste your text here..."
      />

      <button className="primary-btn large" onClick={createPdf}>
        <Download size={19} />
        Download PDF
      </button>

      <div className="notice">
        For production-quality PDF layout, fonts and page handling, connect a
        PDF generation backend/library.
      </div>
    </Workspace>
  );
}

function ImageCompressTool() {
  const [file, setFile] = useState(null);
  const [quality, setQuality] = useState(0.7);
  const [preview, setPreview] = useState(null);

  function selectFile(e) {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setFile(selected);

    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result);
    reader.readAsDataURL(selected);
  }

  function compress() {
    if (!file || !preview) return;

    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const maxWidth = 2000;
      const scale = Math.min(1, maxWidth / img.width);

      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            downloadBlob(blob, `compressed-${file.name.replace(/\s+/g, "-")}`);
          }
        },
        "image/jpeg",
        quality
      );
    };

    img.src = preview;
  }

  return (
    <Workspace>
      <label className="dropzone">
        <ImageIcon size={35} />
        <strong>Choose an image</strong>
        <span>JPG, PNG, WEBP and other browser-supported images</span>
        <input type="file" accept="image/*" onChange={selectFile} />
      </label>

      {file && (
        <>
          <div className="image-preview">
            <img src={preview} alt="Preview" />
          </div>

          <div className="range-control">
            <label>
              Quality: <strong>{Math.round(quality * 100)}%</strong>
            </label>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.05"
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
            />
          </div>

          <button className="primary-btn large" onClick={compress}>
            <Download size={19} />
            Compress & Download
          </button>
        </>
      )}
    </Workspace>
  );
}

function ImageConverterTool() {
  const [file, setFile] = useState(null);
  const [format, setFormat] = useState("image/png");
  const [preview, setPreview] = useState(null);

  function choose(e) {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setFile(selected);

    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result);
    reader.readAsDataURL(selected);
  }

  function convert() {
    if (!file || !preview) return;

    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      const extension =
        format === "image/jpeg"
          ? "jpg"
          : format === "image/webp"
            ? "webp"
            : "png";

      canvas.toBlob((blob) => {
        if (blob) {
          downloadBlob(blob, `converted-${Date.now()}.${extension}`);
        }
      }, format);
    };

    img.src = preview;
  }

  return (
    <Workspace>
      <label className="dropzone">
        <ImageIcon size={35} />
        <strong>Choose an image</strong>
        <span>Select an image to convert</span>
        <input type="file" accept="image/*" onChange={choose} />
      </label>

      {file && (
        <>
          <div className="form-row">
            <label>Output format</label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
            >
              <option value="image/png">PNG</option>
              <option value="image/jpeg">JPG</option>
              <option value="image/webp">WEBP</option>
            </select>
          </div>

          <button className="primary-btn large" onClick={convert}>
            <Download size={19} />
            Convert Image
          </button>
        </>
      )}
    </Workspace>
  );
}

function TextVideoTool() {
  const [text, setText] = useState("");
  const [script, setScript] = useState("");

  function generate() {
    if (!text.trim()) return;

    const sentences = text
      .split(/[.!?]+/)
      .map((s) => s.trim())
      .filter(Boolean);

    const result = sentences
      .map(
        (sentence, index) =>
          `Scene ${index + 1}\nVisual: ${sentence}\nVoiceover: ${sentence}\nDuration: 5 seconds`
      )
      .join("\n\n");

    setScript(result);
  }

  function download() {
    if (!script) return;
    downloadText(script, "toolmaster-video-script.txt");
  }

  return (
    <Workspace>
      <textarea
        className="big-textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your topic or video text..."
      />

      <button className="primary-btn large" onClick={generate}>
        <Video size={19} />
        Generate Video Plan
      </button>

      {script && (
        <>
          <textarea className="result-textarea" value={script} readOnly />
          <button className="secondary-btn" onClick={download}>
            <Download size={18} />
            Download Script
          </button>
        </>
      )}

      <div className="notice">
        This creates a video script and scene plan. Actual MP4 rendering can
        be connected to a video-generation backend/API.
      </div>
    </Workspace>
  );
}

function SeoAnalyzerTool() {
  const [url, setUrl] = useState("");
  const [content, setContent] = useState("");
  const [result, setResult] = useState(null);

  function analyze() {
    const text = content.trim();

    const words = text ? text.split(/\s+/).length : 0;
    const headings = (text.match(/^#+\s.+$/gm) || []).length;
    const titleLength = url.length;

    const score = Math.min(
      100,
      35 +
        (words >= 300 ? 20 : 0) +
        (headings >= 2 ? 15 : 0) +
        (titleLength >= 10 ? 10 : 0) +
        (words >= 800 ? 20 : 0)
    );

    setResult({
      score,
      words,
      headings,
      recommendations: [
        words < 300 ? "Add more useful content." : "Content length is acceptable.",
        headings < 2
          ? "Use more descriptive headings."
          : "Heading structure looks good.",
        url.length < 10
          ? "Provide a title or page URL."
          : "Page information provided.",
      ],
    });
  }

  return (
    <Workspace>
      <input
        className="text-input"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Page title or URL"
      />

      <textarea
        className="big-textarea"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Paste your page content here..."
      />

      <button className="primary-btn large" onClick={analyze}>
        <BarChart3 size={19} />
        Analyze SEO
      </button>

      {result && (
        <div className="seo-result">
          <div className="score-circle">
            <strong>{result.score}</strong>
            <span>/100</span>
          </div>

          <div className="stats-grid">
            <div>
              <strong>{result.words}</strong>
              <span>Words</span>
            </div>
            <div>
              <strong>{result.headings}</strong>
              <span>Headings</span>
            </div>
          </div>

          <div className="recommendations">
            <h3>Recommendations</h3>
            {result.recommendations.map((item) => (
              <p key={item}>✓ {item}</p>
            ))}
          </div>
        </div>
      )}
    </Workspace>
  );
}

function KeywordTool() {
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [copied, setCopied] = useState(false);

  function generate() {
    setKeywords(generateKeywords(topic));
  }

  async function copyAll() {
    await navigator.clipboard.writeText(keywords.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <Workspace>
      <input
        className="text-input"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter your topic, e.g. digital marketing"
      />

      <button className="primary-btn large" onClick={generate}>
        <KeyRound size={19} />
        Generate Keywords
      </button>

      {keywords.length > 0 && (
        <div className="keyword-result">
          <div className="result-header">
            <h3>Keyword Ideas</h3>
            <button className="secondary-btn small" onClick={copyAll}>
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? "Copied" : "Copy All"}
            </button>
          </div>

          <div className="keyword-list">
            {keywords.map((keyword) => (
              <span key={keyword}>{keyword}</span>
            ))}
          </div>
        </div>
      )}
    </Workspace>
  );
}

function MetaTool() {
  const [topic, setTopic] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function generate() {
    const clean = topic.trim();

    if (!clean) return;

    setTitle(`${clean} - Complete Guide & Best Tools`);
    setDescription(
      `Discover the best ${clean} tips, tools and strategies. Learn how to get better results with this complete guide.`
    );
  }

  return (
    <Workspace>
      <input
        className="text-input"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter your main topic"
      />

      <button className="primary-btn large" onClick={generate}>
        <Hash size={19} />
        Generate Meta Tags
      </button>

      {title && (
        <div className="generated-fields">
          <label>SEO Title</label>
          <input className="text-input" value={title} readOnly />

          <label>Meta Description</label>
          <textarea
            className="result-textarea"
            value={description}
            readOnly
          />
        </div>
      )}
    </Workspace>
  );
}

function WordCounterTool() {
  const [text, setText] = useState("");
  const stats = getTextStats(text);

  return (
    <Workspace>
      <textarea
        className="big-textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type or paste your text..."
      />

      <div className="stats-grid large-stats">
        <div>
          <strong>{stats.words}</strong>
          <span>Words</span>
        </div>
        <div>
          <strong>{stats.characters}</strong>
          <span>Characters</span>
        </div>
        <div>
          <strong>{stats.charactersNoSpaces}</strong>
          <span>No Spaces</span>
        </div>
        <div>
          <strong>{stats.sentences}</strong>
          <span>Sentences</span>
        </div>
        <div>
          <strong>{stats.paragraphs}</strong>
          <span>Paragraphs</span>
        </div>
      </div>
    </Workspace>
  );
}

function CaseConverterTool() {
  const [text, setText] = useState("");

  function upper() {
    setText(text.toUpperCase());
  }

  function lower() {
    setText(text.toLowerCase());
  }

  function title() {
    setText(
      text.toLowerCase().replace(/\b\w/g, (letter) => letter.toUpperCase())
    );
  }

  function sentence() {
    setText(
      text
        .toLowerCase()
        .replace(/(^\s*\w|[.!?]\s+\w)/g, (match) => match.toUpperCase())
    );
  }

  async function copy() {
    await navigator.clipboard.writeText(text);
  }

  return (
    <Workspace>
      <textarea
        className="big-textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text..."
      />

      <div className="button-row">
        <button className="secondary-btn" onClick={upper}>
          UPPERCASE
        </button>
        <button className="secondary-btn" onClick={lower}>
          lowercase
        </button>
        <button className="secondary-btn" onClick={title}>
          Title Case
        </button>
        <button className="secondary-btn" onClick={sentence}>
          Sentence case
        </button>
        <button className="secondary-btn" onClick={copy}>
          <Copy size={17} />
          Copy
        </button>
      </div>
    </Workspace>
  );
}

function TextCleanerTool() {
  const [text, setText] = useState("");

  function clean() {
    const cleaned = text
      .split("\n")
      .map((line) => line.replace(/\s+/g, " ").trim())
      .join("\n")
      .replace(/\n{3,}/g, "\n\n");

    setText(cleaned);
  }

  return (
    <Workspace>
      <textarea
        className="big-textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste messy text here..."
      />

      <div className="button-row">
        <button className="primary-btn" onClick={clean}>
          <Sparkles size={18} />
          Clean Text
        </button>

        <button
          className="secondary-btn"
          onClick={() => setText("")}
        >
          <Trash2 size={18} />
          Clear
        </button>
      </div>
    </Workspace>
  );
}

function CalculatorTool() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");

  function calculate() {
    try {
      if (!expression.trim()) return;

      if (!/^[0-9+\-*/().%\s]+$/.test(expression)) {
        setResult("Invalid expression");
        return;
      }

      const value = Function(`"use strict"; return (${expression})`)();

      if (Number.isFinite(value)) {
        setResult(String(value));
      } else {
        setResult("Invalid result");
      }
    } catch {
      setResult("Invalid expression");
    }
  }

  return (
    <Workspace>
      <input
        className="text-input calculator-input"
        value={expression}
        onChange={(e) => setExpression(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") calculate();
        }}
        placeholder="Example: (25 * 4) + 10"
      />

      <button className="primary-btn large" onClick={calculate}>
        <Calculator size={19} />
        Calculate
      </button>

      {result && (
        <div className="calculator-result">
          <span>Result</span>
          <strong>{result}</strong>
        </div>
      )}
    </Workspace>
  );
}

function PasswordTool() {
  const [length, setLength] = useState(16);
  const [password, setPassword] = useState("");

  function generate() {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=";

    let output = "";

    const array = new Uint32Array(length);
    crypto.getRandomValues(array);

    for (let i = 0; i < length; i++) {
      output += chars[array[i] % chars.length];
    }

    setPassword(output);
  }

  async function copy() {
    if (password) await navigator.clipboard.writeText(password);
  }

  return (
    <Workspace>
      <div className="range-control">
        <label>
          Password length: <strong>{length}</strong>
        </label>
        <input
          type="range"
          min="8"
          max="64"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
        />
      </div>

      <button className="primary-btn large" onClick={generate}>
        <RefreshCw size={19} />
        Generate Password
      </button>

      {password && (
        <div className="password-output">
          <code>{password}</code>
          <button className="secondary-btn" onClick={copy}>
            <Copy size={18} />
            Copy
          </button>
        </div>
      )}

      <div className="notice">
        Generate and store passwords responsibly. Never share sensitive
        passwords with anyone.
      </div>
    </Workspace>
  );
}

function SlugTool() {
  const [text, setText] = useState("");
  const [slug, setSlug] = useState("");

  function generate() {
    setSlug(slugify(text));
  }

  async function copy() {
    if (slug) await navigator.clipboard.writeText(slug);
  }

  return (
    <Workspace>
      <input
        className="text-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter page title"
      />

      <button className="primary-btn large" onClick={generate}>
        <LinkIcon size={19} />
        Generate URL Slug
      </button>

      {slug && (
        <div className="password-output">
          <code>{slug}</code>
          <button className="secondary-btn" onClick={copy}>
            <Copy size={18} />
            Copy
          </button>
        </div>
      )}
    </Workspace>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
