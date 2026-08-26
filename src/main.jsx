import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Search,
  Menu,
  X,
  Wrench,
  FileText,
  Video,
  BarChart3,
  KeyRound,
  Image as ImageIcon,
  Code2,
  Calculator,
  ArrowRight,
  ShieldCheck,
  Zap,
  Sparkles,
  Upload,
  Download,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Copy,
} from "lucide-react";

import { createClient } from "@supabase/supabase-js";

/* =========================================================
   SUPABASE
   ========================================================= */

const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL ||
  "https://xpjhcwowzxpiiwkteiua.supabase.co";

const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY || "";

const supabase =
  SUPABASE_ANON_KEY
    ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    : null;

/*
  Your deployed Edge Function:
  pdf-to-word

  If VITE_SUPABASE_ANON_KEY is configured in Vercel,
  Supabase client will be used.

  Otherwise the function URL is called directly.
*/

const PDF_TO_WORD_URL =
  `${SUPABASE_URL}/functions/v1/pdf-to-word`;

/* =========================================================
   TOOL DATA
   ========================================================= */

const tools = [
  {
    id: "pdf",
    name: "PDF to Word",
    category: "PDF",
    description: "Convert PDF documents into editable Word files.",
    icon: FileText,
  },
  {
    id: "video",
    name: "Text to Video",
    category: "Video",
    description: "Turn your text idea into a video-ready script.",
    icon: Video,
  },
  {
    id: "seo",
    name: "SEO Analyzer",
    category: "SEO",
    description: "Analyze your content and get useful SEO suggestions.",
    icon: BarChart3,
  },
  {
    id: "keywords",
    name: "Keyword Generator",
    category: "SEO",
    description: "Generate keyword ideas for your content.",
    icon: KeyRound,
  },
  {
    id: "image",
    name: "Image Tools",
    category: "Image",
    description: "Work with image-related utilities.",
    icon: ImageIcon,
  },
  {
    id: "code",
    name: "Code Formatter",
    category: "Developer",
    description: "Clean and format your code.",
    icon: Code2,
  },
  {
    id: "calculator",
    name: "Calculator",
    category: "Math",
    description: "Perform quick mathematical calculations.",
    icon: Calculator,
  },
];

const categories = [
  "All",
  "PDF",
  "Video",
  "SEO",
  "Image",
  "Developer",
  "Math",
];

/* =========================================================
   HELPERS
   ========================================================= */

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

function formatBytes(bytes) {
  if (!bytes) return "0 KB";

  const units = ["B", "KB", "MB", "GB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1024));

  return `${(bytes / Math.pow(1024, index)).toFixed(
    index === 0 ? 0 : 2
  )} ${units[index]}`;
}

/* =========================================================
   PDF TO WORD
   ========================================================= */

async function sendPdfToFunction(file) {
  const formData = new FormData();
  formData.append("file", file);

  let headers = {};

  if (SUPABASE_ANON_KEY) {
    headers = {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    };
  }

  const response = await fetch(PDF_TO_WORD_URL, {
    method: "POST",
    headers,
    body: formData,
  });

  let data = null;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    throw new Error(
      data?.error ||
        `Server error (${response.status}). Please try again.`
    );
  }

  return data;
}

/* =========================================================
   MAIN APP
   ========================================================= */

function App() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [activeTool, setActiveTool] = useState(null);

  const [pdfFile, setPdfFile] = useState(null);
  const [pdfStatus, setPdfStatus] = useState("");
  const [pdfError, setPdfError] = useState("");
  const [pdfLoading, setPdfLoading] = useState(false);

  const [seoText, setSeoText] = useState("");
  const [seoResult, setSeoResult] = useState(null);

  const [keywordInput, setKeywordInput] = useState("");
  const [keywords, setKeywords] = useState([]);

  const [videoText, setVideoText] = useState("");
  const [videoResult, setVideoResult] = useState("");

  const [codeInput, setCodeInput] = useState("");
  const [codeResult, setCodeResult] = useState("");

  const [calcInput, setCalcInput] = useState("");
  const [calcResult, setCalcResult] = useState("");

  const filteredTools = useMemo(() => {
    const query = search.trim().toLowerCase();

    return tools.filter((tool) => {
      const matchesCategory =
        category === "All" || tool.category === category;

      const matchesSearch =
        !query ||
        tool.name.toLowerCase().includes(query) ||
        tool.category.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [search, category]);

  /* =======================================================
     PDF FILE SELECT
     ======================================================= */

  function handlePdfSelect(event) {
    const file = event.target.files?.[0];

    setPdfError("");
    setPdfStatus("");

    if (!file) {
      setPdfFile(null);
      return;
    }

    const isPdf =
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf");

    if (!isPdf) {
      setPdfFile(null);
      setPdfError("Please select a PDF file.");
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      setPdfFile(null);
      setPdfError("Maximum PDF size is 20 MB.");
      return;
    }

    setPdfFile(file);
    setPdfStatus("PDF selected and ready.");
  }

  /* =======================================================
     PDF SEND
     ======================================================= */

  async function handlePdfConvert() {
    if (!pdfFile) {
      setPdfError("Please select a PDF file first.");
      return;
    }

    setPdfLoading(true);
    setPdfError("");
    setPdfStatus("Uploading PDF...");

    try {
      const result = await sendPdfToFunction(pdfFile);

      if (result?.success) {
        setPdfStatus(
          "PDF processed successfully. Your Word file is ready."
        );
      } else {
        setPdfStatus(
          result?.message ||
            "PDF was received by the processing server."
        );
      }
    } catch (error) {
      console.error(error);

      setPdfError(
        error?.message ||
          "Unable to connect to the PDF processing server."
      );

      setPdfStatus("");
    } finally {
      setPdfLoading(false);
    }
  }

  /* =======================================================
     SEO ANALYZER
     ======================================================= */

  function analyzeSEO() {
    const text = seoText.trim();

    if (!text) {
      setSeoResult(null);
      return;
    }

    const words = text.split(/\s+/).filter(Boolean);
    const characters = text.length;
    const sentences = text
      .split(/[.!?]+/)
      .filter((x) => x.trim()).length;

    const headings = (
      text.match(
        /(^|\n)(title|h1|h2|h3|heading)/gi
      ) || []
    ).length;

    const keywordLikeWords = [...new Set(
      words
        .map((word) =>
          word
            .toLowerCase()
            .replace(/[^a-z0-9-]/g, "")
        )
        .filter((word) => word.length >= 5)
    )].slice(0, 10);

    const score = Math.min(
      100,
      35 +
        Math.min(25, words.length / 8) +
        Math.min(20, sentences * 2) +
        Math.min(10, headings * 5) +
        (characters > 300 ? 10 : 0)
    );

    setSeoResult({
      score: Math.round(score),
      words: words.length,
      characters,
      sentences,
      headings,
      suggestions: [
        words.length < 300
          ? "Add more useful content to improve topical depth."
          : "Content length looks reasonable.",
        headings === 0
          ? "Add clear headings such as H1 and H2."
          : "Heading structure detected.",
        sentences > 0 && words.length / sentences > 25
          ? "Some sentences are long. Consider shorter sentences."
          : "Sentence length looks reasonable.",
        "Add your primary keyword naturally in the title, introduction and headings.",
        "Add a useful meta description when publishing the page.",
      ],
      keywordIdeas: keywordLikeWords,
    });
  }

  /* =======================================================
     KEYWORD GENERATOR
     ======================================================= */

  function generateKeywords() {
    const input = keywordInput.trim().toLowerCase();

    if (!input) {
      setKeywords([]);
      return;
    }

    const base = input
      .split(/\s+/)
      .filter(Boolean)
      .join(" ");

    const generated = [
      base,
      `${base} tools`,
      `${base} online`,
      `${base} free`,
      `${base} generator`,
      `${base} tutorial`,
      `${base} guide`,
      `${base} software`,
      `${base} service`,
      `${base} for beginners`,
      `best ${base}`,
      `${base} website`,
      `${base} app`,
      `${base} solution`,
      `${base} 2026`,
    ];

    setKeywords([...new Set(generated)]);
  }

  /* =======================================================
     TEXT TO VIDEO
     ======================================================= */

  function generateVideoScript() {
    const text = videoText.trim();

    if (!text) {
      setVideoResult("");
      return;
    }

    setVideoResult(
      `VIDEO SCRIPT

Title:
${text}

HOOK:
Discover ${text} in this simple and engaging video.

INTRO:
In this video, we will explain ${text} and why it matters.

MAIN POINTS:
1. What is ${text}?
2. Why is ${text} useful?
3. How can beginners use it?
4. What are the most important things to remember?

CALL TO ACTION:
If you found this useful, save this video, share it and follow for more helpful content.`
    );
  }

  /* =======================================================
     CODE FORMATTER
     ======================================================= */

  function formatCode() {
    const text = codeInput.trim();

    if (!text) {
      setCodeResult("");
      return;
    }

    let formatted = text
      .replace(/\{/g, "{\n")
      .replace(/\}/g, "\n}\n")
      .replace(/;/g, ";\n")
      .replace(/\n\s*\n/g, "\n");

    const lines = formatted
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    let indent = 0;

    const output = lines.map((line) => {
      if (line.startsWith("}")) {
        indent = Math.max(0, indent - 1);
      }

      const result =
        "  ".repeat(indent) + line;

      if (
        line.endsWith("{") ||
        line.includes("{")
      ) {
        if (!line.startsWith("}")) {
          indent++;
        }
      }

      return result;
    });

    setCodeResult(output.join("\n"));
  }

  /* =======================================================
     CALCULATOR
     ======================================================= */

  function calculate() {
    const expression = calcInput.trim();

    if (!expression) {
      setCalcResult("");
      return;
    }

    // Basic calculator only.
    // No eval().
    if (!/^[0-9+\-*/().%\s]+$/.test(expression)) {
      setCalcResult("Invalid expression");
      return;
    }

    try {
      const sanitized = expression.replace(
        /(\d+(?:\.\d+)?)%/g,
        "($1/100)"
      );

      const result = Function(
        `"use strict"; return (${sanitized})`
      )();

      if (!Number.isFinite(result)) {
        setCalcResult("Invalid calculation");
      } else {
        setCalcResult(String(result));
      }
    } catch {
      setCalcResult("Invalid expression");
    }
  }

  /* =======================================================
     OPEN TOOL
     ======================================================= */

  function openTool(tool) {
    setActiveTool(tool.id);
    setPdfError("");
    setPdfStatus("");

    setTimeout(() => {
      document
        .getElementById("tool-workspace")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 50);
  }

  function closeTool() {
    setActiveTool(null);
  }

  /* =======================================================
     COPY
     ======================================================= */

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      console.log("Copy failed");
    }
  }

  /* =======================================================
     RENDER
     ======================================================= */

  return (
    <div className="app">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="header">
        <div className="container nav">
          <button
            className="logo"
            onClick={() => scrollToId("home")}
          >
            <span className="logoIcon">
              <Wrench size={20} />
            </span>

            <span>
              <strong>ToolMaster</strong>
              <small>Pro</small>
            </span>
          </button>

          <nav className={mobileMenu ? "navLinks open" : "navLinks"}>
            <button onClick={() => {
              scrollToId("home");
              setMobileMenu(false);
            }}>
              Home
            </button>

            <button onClick={() => {
              scrollToId("tools");
              setMobileMenu(false);
            }}>
              Tools
            </button>

            <button onClick={() => {
              scrollToId("categories");
              setMobileMenu(false);
            }}>
              Categories
            </button>

            <button onClick={() => {
              scrollToId("about");
              setMobileMenu(false);
            }}>
              About
            </button>
          </nav>

          <button
            className="mobileMenu"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* =====================================================
          HERO
      ===================================================== */}

      <main>
        <section id="home" className="hero">
          <div className="container heroGrid">
            <div>
              <div className="badge">
                <Sparkles size={15} />
                All-in-one online tools
              </div>

              <h1>
                Powerful Tools.
                <span> Simple Results.</span>
              </h1>

              <p>
                Convert files, generate keywords, analyze SEO,
                create content and use useful online utilities —
                all in one place.
              </p>

              <div className="heroButtons">
                <button
                  className="primaryButton"
                  onClick={() => scrollToId("tools")}
                >
                  Our Tools
                  <ArrowRight size={18} />
                </button>

                <button
                  className="secondaryButton"
                  onClick={() => scrollToId("about")}
                >
                  Learn More
                </button>
              </div>
            </div>

            <div className="heroCard">
              <div className="heroCardIcon">
                <Wrench size={42} />
              </div>

              <h3>Everything in one place</h3>

              <p>
                Simple utilities for files, SEO, content,
                development and everyday work.
              </p>

              <div className="miniStats">
                <div>
                  <strong>{tools.length}+</strong>
                  <span>Tools</span>
                </div>

                <div>
                  <strong>24/7</strong>
                  <span>Available</span>
                </div>

                <div>
                  <strong>Fast</strong>
                  <span>Results</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================
            TOOLS
        =================================================== */}

        <section id="tools" className="section">
          <div className="container">
            <div className="sectionHeading">
              <div>
                <div className="eyebrow">
                  <Wrench size={15} />
                  OUR TOOLS
                </div>

                <h2>Everything you need</h2>

                <p>
                  Choose a tool and start working instantly.
                </p>
              </div>

              <div className="searchBox">
                <Search size={18} />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search tools..."
                />
              </div>
            </div>

            <div className="toolGrid">
              {filteredTools.map((tool) => {
                const Icon = tool.icon;

                return (
                  <div className="toolCard" key={tool.id}>
                    <div className="toolIcon">
                      <Icon size={24} />
                    </div>

                    <div className="toolCategory">
                      {tool.category}
                    </div>

                    <h3>{tool.name}</h3>

                    <p>{tool.description}</p>

                    <button
                      className="toolButton"
                      onClick={() => openTool(tool)}
                    >
                      Use Tool
                      <ArrowRight size={17} />
                    </button>
                  </div>
                );
              })}
            </div>

            {filteredTools.length === 0 && (
              <div className="empty">
                <Search size={30} />
                <h3>No tools found</h3>
                <p>Try another search.</p>
              </div>
            )}
          </div>
        </section>

        {/* ===================================================
            CATEGORIES
        =================================================== */}

        <section id="categories" className="section soft">
          <div className="container">
            <div className="sectionHeading centered">
              <div>
                <div className="eyebrow">
                  CATEGORIES
                </div>

                <h2>Find the right tool</h2>

                <p>
                  Browse ToolMaster by category.
                </p>
              </div>
            </div>

            <div className="categoryGrid">
              {categories.map((item) => (
                <button
                  key={item}
                  className={
                    category === item
                      ? "categoryCard active"
                      : "categoryCard"
                  }
                  onClick={() => {
                    setCategory(item);
                    scrollToId("tools");
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================
            WORKSPACE
        =================================================== */}

        <section
          id="tool-workspace"
          className="workspaceSection"
        >
          <div className="container">
            {!activeTool ? (
              <div className="workspaceEmpty">
                <Wrench size={40} />
                <h2>Select a tool</h2>
                <p>
                  Choose any tool above to start working.
                </p>
              </div>
            ) : (
              <div className="workspace">
                <div className="workspaceHeader">
                  <div>
                    <div className="eyebrow">
                      TOOL WORKSPACE
                    </div>

                    <h2>
                      {
                        tools.find(
                          (x) => x.id === activeTool
                        )?.name
                      }
                    </h2>
                  </div>

                  <button
                    className="closeButton"
                    onClick={closeTool}
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* =========================================
                    PDF TO WORD
                ========================================= */}

                {activeTool === "pdf" && (
                  <div className="toolWorkspace">
                    <div className="uploadArea">
                      <div className="uploadIcon">
                        <Upload size={35} />
                      </div>

                      <h3>
                        Upload your PDF
                      </h3>

                      <p>
                        Select a PDF file up to 20 MB.
                      </p>

                      <label className="uploadButton">
                        <Upload size={18} />
                        Select PDF
                        <input
                          type="file"
                          accept="application/pdf,.pdf"
                          onChange={handlePdfSelect}
                          hidden
                        />
                      </label>

                      {pdfFile && (
                        <div className="selectedFile">
                          <FileText size={22} />

                          <div>
                            <strong>
                              {pdfFile.name}
                            </strong>

                            <span>
                              {formatBytes(pdfFile.size)}
                            </span>
                          </div>

                          <CheckCircle2
                            size={20}
                          />
                        </div>
                      )}

                      {pdfError && (
                        <div className="message error">
                          <AlertCircle size={18} />
                          {pdfError}
                        </div>
                      )}

                      {pdfStatus && !pdfError && (
                        <div className="message success">
                          <CheckCircle2 size={18} />
                          {pdfStatus}
                        </div>
                      )}

                      <button
                        className="primaryButton convertButton"
                        disabled={
                          !pdfFile || pdfLoading
                        }
                        onClick={handlePdfConvert}
                      >
                        {pdfLoading ? (
                          <>
                            <Loader2
                              size={18}
                              className="spin"
                            />
                            Processing...
                          </>
                        ) : (
                          <>
                            Convert PDF to Word
                            <ArrowRight size={18} />
                          </>
                        )}
                      </button>

                      <p className="workspaceNote">
                        Your file is securely sent to the
                        ToolMaster PDF processing function.
                      </p>
                    </div>
                  </div>
                )}

                {/* =========================================
                    VIDEO
                ========================================= */}

                {activeTool === "video" && (
                  <div className="toolWorkspace">
                    <textarea
                      className="largeTextarea"
                      value={videoText}
                      onChange={(e) =>
                        setVideoText(e.target.value)
                      }
                      placeholder="Enter your video idea..."
                    />

                    <button
                      className="primaryButton"
                      onClick={generateVideoScript}
                    >
                      Generate Script
                      <Sparkles size={18} />
                    </button>

                    {videoResult && (
                      <div className="resultBox">
                        <div className="resultHeader">
                          <strong>
                            Video Script
                          </strong>

                          <button
                            onClick={() =>
                              copyText(videoResult)
                            }
                          >
                            <Copy size={17} />
                          </button>
                        </div>

                        <pre>
                          {videoResult}
                        </pre>
                      </div>
                    )}
                  </div>
                )}

                {/* =========================================
                    SEO
                ========================================= */}

                {activeTool === "seo" && (
                  <div className="toolWorkspace">
                    <textarea
                      className="largeTextarea"
                      value={seoText}
                      onChange={(e) =>
                        setSeoText(e.target.value)
                      }
                      placeholder="Paste your content here..."
                    />

                    <button
                      className="primaryButton"
                      onClick={analyzeSEO}
                    >
                      Analyze SEO
                      <BarChart3 size={18} />
                    </button>

                    {seoResult && (
                      <div className="seoResults">
                        <div className="scoreCard">
                          <strong>
                            {seoResult.score}
                          </strong>
                          <span>
                            SEO Score
                          </span>
                        </div>

                        <div className="statGrid">
                          <div>
                            <strong>
                              {seoResult.words}
                            </strong>
                            <span>Words</span>
                          </div>

                          <div>
                            <strong>
                              {seoResult.characters}
                            </strong>
                            <span>Characters</span>
                          </div>

                          <div>
                            <strong>
                              {seoResult.sentences}
                            </strong>
                            <span>Sentences</span>
                          </div>

                          <div>
                            <strong>
                              {seoResult.headings}
                            </strong>
                            <span>Headings</span>
                          </div>
                        </div>

                        <div className="suggestions">
                          <h3>
                            Suggestions
                          </h3>

                          {seoResult.suggestions.map(
                            (item, index) => (
                              <div
                                key={index}
                                className="suggestion"
                              >
                                <CheckCircle2
                                  size={18}
                                />
                                {item}
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* =========================================
                    KEYWORDS
                ========================================= */}

                {activeTool === "keywords" && (
                  <div className="toolWorkspace">
                    <input
                      className="largeInput"
                      value={keywordInput}
                      onChange={(e) =>
                        setKeywordInput(e.target.value)
                      }
                      placeholder="Enter a topic, e.g. digital marketing"
                    />

                    <button
                      className="primaryButton"
                      onClick={generateKeywords}
                    >
                      Generate Keywords
                      <KeyRound size={18} />
                    </button>

                    {keywords.length > 0 && (
                      <div className="keywordResults">
                        {keywords.map((keyword) => (
                          <div
                            className="keywordChip"
                            key={keyword}
                          >
                            {keyword}

                            <button
                              onClick={() =>
                                copyText(keyword)
                              }
                            >
                              <Copy size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* =========================================
                    IMAGE
                ========================================= */}

                {activeTool === "image" && (
                  <div className="toolWorkspace">
                    <div className="comingSoon">
                      <ImageIcon size={40} />
                      <h3>
                        Image Tools
                      </h3>
                      <p>
                        Image processing tools are being
                        prepared for the next processing phase.
                      </p>
                    </div>
                  </div>
                )}

                {/* =========================================
                    CODE
                ========================================= */}

                {activeTool === "code" && (
                  <div className="toolWorkspace">
                    <textarea
                      className="codeTextarea"
                      value={codeInput}
                      onChange={(e) =>
                        setCodeInput(e.target.value)
                      }
                      placeholder="Paste your code here..."
                    />

                    <button
                      className="primaryButton"
                      onClick={formatCode}
                    >
                      Format Code
                      <Code2 size={18} />
                    </button>

                    {codeResult && (
                      <div className="resultBox">
                        <div className="resultHeader">
                          <strong>
                            Formatted Code
                          </strong>

                          <button
                            onClick={() =>
                              copyText(codeResult)
                            }
                          >
                            <Copy size={17} />
                          </button>
                        </div>

                        <pre>
                          {codeResult}
                        </pre>
                      </div>
                    )}
                  </div>
                )}

                {/* =========================================
                    CALCULATOR
                ========================================= */}

                {activeTool === "calculator" && (
                  <div className="toolWorkspace calculator">
                    <input
                      className="calculatorInput"
                      value={calcInput}
                      onChange={(e) =>
                        setCalcInput(e.target.value)
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          calculate();
                        }
                      }}
                      placeholder="e.g. 25 * 4 + 10"
                    />

                    <button
                      className="primaryButton"
                      onClick={calculate}
                    >
                      Calculate
                      <Calculator size={18} />
                    </button>

                    {calcResult && (
                      <div className="calculatorResult">
                        {calcResult}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* ===================================================
            FEATURES
        =================================================== */}

        <section className="section soft">
          <div className="container featureGrid">
            <div className="featureCard">
              <Zap size={28} />
              <h3>Fast</h3>
              <p>
                Quick and simple tools designed for
                everyday tasks.
              </p>
            </div>

            <div className="featureCard">
              <ShieldCheck size={28} />
              <h3>Secure</h3>
              <p>
                Your workflow is designed with privacy
                and security in mind.
              </p>
            </div>

            <div className="featureCard">
              <Sparkles size={28} />
              <h3>Useful</h3>
              <p>
                A growing collection of practical
                online utilities.
              </p>
            </div>
          </div>
        </section>

        {/* ===================================================
            ABOUT
        =================================================== */}

        <section id="about" className="section">
          <div className="container about">
            <div className="eyebrow">
              ABOUT TOOLMASTER
            </div>

            <h2>
              One place for your everyday digital tools.
            </h2>

            <p>
              ToolMaster Pro brings useful converters,
              generators, SEO tools, calculators and
              other utilities into one clean workspace.
            </p>
          </div>
        </section>
      </main>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="footer">
        <div className="container footerInner">
          <div className="footerBrand">
            <span className="logoIcon">
              <Wrench size={18} />
            </span>

            <strong>
              ToolMaster<span>Pro</span>
            </strong>
          </div>

          <p>
            © 2026 ToolMaster Pro. All rights reserved.
          </p>
        </div>
      </footer>

      {/* =====================================================
          INTERNAL CSS
          No styles.css import required
      ===================================================== */}

      <style>{`
        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          font-family:
            Inter,
            ui-sans-serif,
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
          background: #f8fafc;
          color: #0f172a;
        }

        button,
        input,
        textarea {
          font: inherit;
        }

        button {
          cursor: pointer;
        }

        .app {
          min-height: 100vh;
        }

        .container {
          width: min(1160px, calc(100% - 40px));
          margin: 0 auto;
        }

        .header {
          position: sticky;
          top: 0;
          z-index: 50;
          background: rgba(255,255,255,.94);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid #e2e8f0;
        }

        .nav {
          min-height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }

        .logo {
          border: 0;
          background: transparent;
          display: flex;
          align-items: center;
          gap: 10px;
          color: #0f172a;
        }

        .logo span:last-child {
          display: flex;
          align-items: baseline;
          gap: 4px;
        }

        .logo strong {
          font-size: 20px;
          letter-spacing: -.5px;
        }

        .logo small {
          color: #64748b;
          font-weight: 700;
        }

        .logoIcon {
          width: 38px;
          height: 38px;
          border-radius: 11px;
          display: grid;
          place-items: center;
          background: #0f172a;
          color: white;
        }

        .navLinks {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .navLinks button {
          border: 0;
          background: transparent;
          color: #475569;
          padding: 10px 14px;
          border-radius: 9px;
          font-weight: 600;
        }

        .navLinks button:hover {
          background: #f1f5f9;
          color: #0f172a;
        }

        .mobileMenu {
          display: none;
          border: 0;
          background: transparent;
        }

        .hero {
          padding: 90px 0 80px;
          background:
            radial-gradient(
              circle at top right,
              #dbeafe 0,
              transparent 34%
            ),
            #f8fafc;
        }

        .heroGrid {
          display: grid;
          grid-template-columns: 1.15fr .85fr;
          align-items: center;
          gap: 70px;
        }

        .badge {
          width: fit-content;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 13px;
          border-radius: 999px;
          background: white;
          border: 1px solid #e2e8f0;
          color: #475569;
          font-size: 13px;
          font-weight: 700;
          margin-bottom: 22px;
        }

        .hero h1 {
          margin: 0;
          font-size: clamp(42px, 6vw, 70px);
          line-height: 1.02;
          letter-spacing: -3px;
          max-width: 750px;
        }

        .hero h1 span {
          color: #2563eb;
        }

        .hero p {
          color: #64748b;
          font-size: 18px;
          line-height: 1.7;
          max-width: 680px;
          margin: 24px 0 30px;
        }

        .heroButtons {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .primaryButton,
        .secondaryButton,
        .toolButton,
        .uploadButton {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          border-radius: 10px;
          padding: 12px 17px;
          font-weight: 700;
          border: 1px solid transparent;
          transition: .2s ease;
        }

        .primaryButton {
          background: #2563eb;
          color: white;
        }

        .primaryButton:hover:not(:disabled) {
          background: #1d4ed8;
          transform: translateY(-1px);
        }

        .primaryButton:disabled {
          opacity: .5;
          cursor: not-allowed;
        }

        .secondaryButton {
          background: white;
          color: #0f172a;
          border-color: #cbd5e1;
        }

        .secondaryButton:hover {
          background: #f8fafc;
        }

        .heroCard {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 24px;
          padding: 34px;
          box-shadow: 0 20px 60px rgba(15,23,42,.08);
        }

        .heroCardIcon {
          width: 76px;
          height: 76px;
          display: grid;
          place-items: center;
          border-radius: 20px;
          background: #eff6ff;
          color: #2563eb;
          margin-bottom: 22px;
        }

        .heroCard h3 {
          margin: 0 0 10px;
          font-size: 25px;
        }

        .heroCard p {
          margin: 0;
          font-size: 15px;
        }

        .miniStats {
          display: grid;
          grid-template-columns: repeat(3,1fr);
          gap: 10px;
          margin-top: 25px;
        }

        .miniStats div {
          padding: 15px;
          border-radius: 13px;
          background: #f8fafc;
          text-align: center;
        }

        .miniStats strong,
        .miniStats span {
          display: block;
        }

        .miniStats strong {
          font-size: 17px;
        }

        .miniStats span {
          margin-top: 4px;
          color: #64748b;
          font-size: 12px;
        }

        .section {
          padding: 90px 0;
          background: white;
        }

        .soft {
          background: #f8fafc;
        }

        .sectionHeading {
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 30px;
          margin-bottom: 35px;
        }

        .sectionHeading.centered {
          justify-content: center;
          text-align: center;
        }

        .eyebrow {
          display: flex;
          align-items: center;
          gap: 7px;
          color: #2563eb;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: .12em;
          margin-bottom: 9px;
        }

        .sectionHeading h2,
        .about h2,
        .workspaceHeader h2 {
          margin: 0;
          font-size: 36px;
          letter-spacing: -1.4px;
        }

        .sectionHeading p,
        .about p {
          color: #64748b;
          margin: 10px 0 0;
        }

        .searchBox {
          width: min(320px,100%);
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 11px 13px;
          border: 1px solid #cbd5e1;
          border-radius: 10px;
          background: white;
        }

        .searchBox input {
          width: 100%;
          border: 0;
          outline: 0;
        }

        .toolGrid {
          display: grid;
          grid-template-columns: repeat(4,1fr);
          gap: 18px;
        }

        .toolCard {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 17px;
          padding: 23px;
          min-height: 285px;
          display: flex;
          flex-direction: column;
          transition: .2s ease;
        }

        .toolCard:hover {
          transform: translateY(-4px);
          box-shadow: 0 15px 40px rgba(15,23,42,.08);
        }

        .toolIcon {
          width: 50px;
          height: 50px;
          border-radius: 13px;
          display: grid;
          place-items: center;
          background: #eff6ff;
          color: #2563eb;
          margin-bottom: 18px;
        }

        .toolCategory {
          color: #2563eb;
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: .08em;
        }

        .toolCard h3 {
          margin: 7px 0 9px;
          font-size: 21px;
        }

        .toolCard p {
          color: #64748b;
          line-height: 1.55;
          font-size: 14px;
          margin: 0;
        }

        .toolButton {
          margin-top: auto;
          width: fit-content;
          background: transparent;
          color: #2563eb;
          padding: 0;
        }

        .categoryGrid {
          display: grid;
          grid-template-columns: repeat(7,1fr);
          gap: 12px;
        }

        .categoryCard {
          border: 1px solid #e2e8f0;
          background: white;
          border-radius: 13px;
          padding: 17px 10px;
          font-weight: 700;
          color: #475569;
        }

        .categoryCard.active,
        .categoryCard:hover {
          background: #2563eb;
          color: white;
          border-color: #2563eb;
        }

        .workspaceSection {
          padding: 75px 0;
          background: #0f172a;
        }

        .workspaceEmpty {
          background: rgba(255,255,255,.05);
          border: 1px solid rgba(255,255,255,.1);
          color: white;
          border-radius: 22px;
          padding: 60px;
          text-align: center;
        }

        .workspaceEmpty p {
          color: #94a3b8;
        }

        .workspace {
          background: white;
          border-radius: 22px;
          overflow: hidden;
          box-shadow: 0 25px 70px rgba(0,0,0,.2);
        }

        .workspaceHeader {
          padding: 25px 28px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #e2e8f0;
        }

        .closeButton {
          width: 40px;
          height: 40px;
          display: grid;
          place-items: center;
          border: 0;
          background: #f1f5f9;
          border-radius: 10px;
        }

        .toolWorkspace {
          padding: 30px;
        }

        .uploadArea {
          border: 2px dashed #cbd5e1;
          border-radius: 18px;
          padding: 45px 25px;
          text-align: center;
          background: #f8fafc;
        }

        .uploadIcon {
          width: 70px;
          height: 70px;
          margin: 0 auto 18px;
          display: grid;
          place-items: center;
          border-radius: 18px;
          background: #dbeafe;
          color: #2563eb;
        }

        .uploadArea h3 {
          margin: 0 0 8px;
          font-size: 24px;
        }

        .uploadArea p {
          color: #64748b;
        }

        .uploadButton {
          margin: 12px auto;
          background: #0f172a;
          color: white;
          width: fit-content;
        }

        .selectedFile {
          max-width: 600px;
          margin: 22px auto;
          display: flex;
          align-items: center;
          gap: 13px;
          text-align: left;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 14px;
        }

        .selectedFile > svg:last-child {
          margin-left: auto;
          color: #16a34a;
        }

        .selectedFile div {
          display: flex;
          flex-direction: column;
          gap: 3px;
          overflow: hidden;
        }

        .selectedFile strong {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .selectedFile span {
          color: #64748b;
          font-size: 12px;
        }

        .message {
          max-width: 600px;
          margin: 15px auto;
          padding: 12px 14px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          gap: 9px;
          text-align: left;
          font-size: 14px;
        }

        .message.error {
          background: #fef2f2;
          color: #b91c1c;
          border: 1px solid #fecaca;
        }

        .message.success {
          background: #f0fdf4;
          color: #15803d;
          border: 1px solid #bbf7d0;
        }

        .convertButton {
          margin-top: 8px;
        }

        .workspaceNote {
          font-size: 12px !important;
        }

        .spin {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .largeTextarea,
        .codeTextarea,
        .largeInput,
        .calculatorInput {
          width: 100%;
          border: 1px solid #cbd5e1;
          border-radius: 12px;
          padding: 15px;
          outline: none;
          margin-bottom: 15px;
          background: white;
        }

        .largeTextarea {
          min-height: 230px;
          resize: vertical;
        }

        .largeInput,
        .calculatorInput {
          min-height: 52px;
        }

        .codeTextarea {
          min-height: 300px;
          resize: vertical;
          font-family: Consolas, monospace;
        }

        .largeTextarea:focus,
        .codeTextarea:focus,
        .largeInput:focus,
        .calculatorInput:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 3px #dbeafe;
        }

        .resultBox {
          margin-top: 25px;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          overflow: hidden;
        }

        .resultHeader {
          padding: 13px 15px;
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #e2e8f0;
          background: #f8fafc;
        }

        .resultHeader button {
          border: 0;
          background: transparent;
        }

        .resultBox pre {
          margin: 0;
          padding: 20px;
          white-space: pre-wrap;
          overflow: auto;
          font-family: Consolas, monospace;
          line-height: 1.6;
        }

        .seoResults {
          margin-top: 25px;
        }

        .scoreCard {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 150px;
          height: 150px;
          border-radius: 50%;
          background: #eff6ff;
          color: #2563eb;
          margin-bottom: 25px;
        }

        .scoreCard strong {
          font-size: 42px;
        }

        .scoreCard span {
          font-size: 12px;
          font-weight: 700;
        }

        .statGrid {
          display: grid;
          grid-template-columns: repeat(4,1fr);
          gap: 12px;
        }

        .statGrid div {
          padding: 18px;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
        }

        .statGrid strong,
        .statGrid span {
          display: block;
        }

        .statGrid strong {
          font-size: 23px;
        }

        .statGrid span {
          margin-top: 5px;
          color: #64748b;
          font-size: 12px;
        }

        .suggestions {
          margin-top: 25px;
        }

        .suggestions h3 {
          margin-bottom: 12px;
        }

        .suggestion {
          display: flex;
          gap: 9px;
          padding: 11px 0;
          color: #475569;
          border-bottom: 1px solid #e2e8f0;
        }

        .suggestion svg {
          color: #16a34a;
          flex: 0 0 auto;
        }

        .keywordResults {
          margin-top: 25px;
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .keywordChip {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #eff6ff;
          color: #1d4ed8;
          border: 1px solid #bfdbfe;
          border-radius: 999px;
          padding: 9px 12px;
          font-size: 14px;
        }

        .keywordChip button {
          border: 0;
          background: transparent;
          color: inherit;
          display: grid;
          place-items: center;
        }

        .comingSoon {
          text-align: center;
          padding: 55px 20px;
          color: #64748b;
        }

        .comingSoon svg {
          color: #2563eb;
        }

        .comingSoon h3 {
          color: #0f172a;
          font-size: 24px;
        }

        .calculator {
          max-width: 600px;
          margin: auto;
        }

        .calculatorResult {
          font-size: 38px;
          font-weight: 800;
          padding: 25px;
          border-radius: 15px;
          background: #f1f5f9;
          margin-top: 20px;
          text-align: center;
        }

        .featureGrid {
          display: grid;
          grid-template-columns: repeat(3,1fr);
          gap: 18px;
        }

        .featureCard {
          padding: 28px;
          border: 1px solid #e2e8f0;
          border-radius: 17px;
          background: white;
        }

        .featureCard svg {
          color: #2563eb;
        }

        .featureCard h3 {
          margin-bottom: 7px;
        }

        .featureCard p {
          color: #64748b;
          line-height: 1.6;
          margin: 0;
        }

        .about {
          max-width: 800px;
        }

        .about h2 {
          margin-top: 0;
        }

        .about p {
          line-height: 1.8;
          font-size: 17px;
        }

        .footer {
          background: #0f172a;
          color: white;
          padding: 25px 0;
        }

        .footerInner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .footerBrand {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .footerBrand strong span {
          color: #94a3b8;
          margin-left: 3px;
        }

        .footer p {
          color: #94a3b8;
          font-size: 13px;
          margin: 0;
        }

        .empty {
          text-align: center;
          padding: 50px;
          color: #64748b;
        }

        @media (max-width: 950px) {
          .heroGrid {
            grid-template-columns: 1fr;
          }

          .toolGrid {
            grid-template-columns: repeat(2,1fr);
          }

          .categoryGrid {
            grid-template-columns: repeat(4,1fr);
          }
        }

        @media (max-width: 700px) {
          .container {
            width: min(100% - 28px, 1160px);
          }

          .navLinks {
            display: none;
            position: absolute;
            top: 72px;
            left: 0;
            right: 0;
            background: white;
            border-bottom: 1px solid #e2e8f0;
            padding: 10px 15px 15px;
            flex-direction: column;
            align-items: stretch;
          }

          .navLinks.open {
            display: flex;
          }

          .mobileMenu {
            display: block;
          }

          .hero {
            padding: 65px 0;
          }

          .hero h1 {
            font-size: 45px;
            letter-spacing: -2px;
          }

          .section {
            padding: 65px 0;
          }

          .sectionHeading {
            align-items: stretch;
            flex-direction: column;
          }

          .sectionHeading h2,
          .about h2,
          .workspaceHeader h2 {
            font-size: 30px;
          }

          .searchBox {
            width: 100%;
          }

          .toolGrid {
            grid-template-columns: 1fr;
          }

          .categoryGrid {
            grid-template-columns: repeat(2,1fr);
          }

          .featureGrid {
            grid-template-columns: 1fr;
          }

          .statGrid {
            grid-template-columns: repeat(2,1fr);
          }

          .footerInner {
            flex-direction: column;
            align-items: flex-start;
          }

          .workspaceHeader {
            padding: 20px;
          }

          .toolWorkspace {
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
}

/* =========================================================
   START REACT
   ========================================================= */

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
