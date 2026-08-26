import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Upload,
  FileText,
  Download,
  Loader2,
  CheckCircle,
  AlertCircle,
  X,
  Sparkles,
} from "lucide-react";
import "./index.css";

const SUPABASE_URL =
  "https://xpjhcwowzxpiiwkteiua.supabase.co";

const PDF_TO_WORD_FUNCTION =
  `${SUPABASE_URL}/functions/v1/pdf-to-word`;

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [downloadName, setDownloadName] = useState("");

  const publishableKey =
    import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  const selectFile = (file) => {
    setError("");
    setSuccess("");
    setDownloadUrl("");
    setDownloadName("");

    if (!file) return;

    if (file.type !== "application/pdf") {
      setError("Please select a PDF file.");
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      setError("Maximum PDF size is 20 MB.");
      return;
    }

    setSelectedFile(file);
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    selectFile(file);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files?.[0];
    selectFile(file);
  };

  const removeFile = () => {
    setSelectedFile(null);
    setError("");
    setSuccess("");
    setDownloadUrl("");
    setDownloadName("");
  };

  const convertPdfToWord = async () => {
    setError("");
    setSuccess("");
    setDownloadUrl("");
    setDownloadName("");

    if (!selectedFile) {
      setError("Please select a PDF file first.");
      return;
    }

    if (!publishableKey) {
      setError(
        "Supabase publishable key is missing. Add VITE_SUPABASE_PUBLISHABLE_KEY in Vercel Environment Variables."
      );
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch(PDF_TO_WORD_FUNCTION, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${publishableKey}`,
          apikey: publishableKey,
        },
        body: formData,
      });

      if (!response.ok) {
        let message = "PDF conversion failed.";

        try {
          const contentType =
            response.headers.get("content-type") || "";

          if (contentType.includes("application/json")) {
            const json = await response.json();

            message =
              json.error ||
              json.message ||
              json.msg ||
              message;
          } else {
            const text = await response.text();

            if (text) {
              message = text;
            }
          }
        } catch {
          // Keep default error message
        }

        throw new Error(message);
      }

      const blob = await response.blob();

      if (!blob || blob.size === 0) {
        throw new Error(
          "The conversion server returned an empty file."
        );
      }

      /*
       * Sometimes the function may return JSON containing
       * a download URL instead of the actual DOCX file.
       * This handles both cases.
       */

      const contentType =
        response.headers.get("content-type") || "";

      if (
        contentType.includes("application/json") ||
        contentType.includes("text/plain")
      ) {
        try {
          const text = await blob.text();
          const json = JSON.parse(text);

          const url =
            json.downloadUrl ||
            json.download_url ||
            json.url;

          if (url) {
            const name =
              json.filename ||
              json.fileName ||
              selectedFile.name.replace(/\.pdf$/i, ".docx");

            setDownloadUrl(url);
            setDownloadName(name);
            setSuccess("PDF converted successfully!");

            return;
          }
        } catch {
          // If not JSON, continue as a file
        }
      }

      /*
       * Normal case:
       * Supabase function returns the DOCX directly.
       */

      const objectUrl = URL.createObjectURL(blob);

      const outputName =
        selectedFile.name.replace(/\.pdf$/i, "") +
        ".docx";

      setDownloadUrl(objectUrl);
      setDownloadName(outputName);
      setSuccess("PDF converted successfully!");

    } catch (err) {
      console.error("PDF conversion error:", err);

      setError(
        err?.message ||
          "Something went wrong while converting the PDF."
      );
    } finally {
      setLoading(false);
    }
  };

  const downloadFile = () => {
    if (!downloadUrl) return;

    const link = document.createElement("a");

    link.href = downloadUrl;
    link.download =
      downloadName || "converted-document.docx";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-slate-950/95">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600">
              <Sparkles size={22} />
            </div>

            <div>
              <h1 className="text-xl font-bold">
                Tool Master Pro
              </h1>

              <p className="text-xs text-slate-400">
                Free Online Tools
              </p>
            </div>
          </div>

          <div className="rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2 text-sm text-green-400">
            Free
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-4xl px-5 py-12">
        <div className="mb-10 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600/20 text-blue-400">
            <FileText size={34} />
          </div>

          <h2 className="text-4xl font-bold tracking-tight">
            PDF to Word Converter
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Convert your PDF files into editable Word documents
            quickly and easily.
          </p>
        </div>

        {/* Upload Box */}
        <div
          onDragOver={(event) => {
            event.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`rounded-3xl border-2 border-dashed p-8 transition ${
            isDragging
              ? "border-blue-500 bg-blue-500/10"
              : "border-slate-700 bg-slate-900"
          }`}
        >
          {!selectedFile ? (
            <label className="flex cursor-pointer flex-col items-center justify-center py-14">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-slate-800">
                <Upload
                  size={30}
                  className="text-blue-400"
                />
              </div>

              <h3 className="text-xl font-semibold">
                Upload your PDF
              </h3>

              <p className="mt-2 text-center text-sm text-slate-400">
                Drag & drop your PDF here or click to browse
              </p>

              <span className="mt-5 rounded-xl bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-700">
                Choose PDF
              </span>

              <input
                type="file"
                accept="application/pdf,.pdf"
                onChange={handleFileChange}
                className="hidden"
              />

              <p className="mt-5 text-xs text-slate-500">
                Maximum file size: 20 MB
              </p>
            </label>
          ) : (
            <div className="py-8">
              <div className="mx-auto flex max-w-xl items-center justify-between rounded-2xl border border-slate-700 bg-slate-800 p-5">
                <div className="flex min-w-0 items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
                    <FileText size={25} />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate font-semibold">
                      {selectedFile.name}
                    </p>

                    <p className="mt-1 text-sm text-slate-400">
                      {(
                        selectedFile.size /
                        1024 /
                        1024
                      ).toFixed(2)}{" "}
                      MB
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={removeFile}
                  className="ml-4 rounded-lg p-2 text-slate-400 transition hover:bg-slate-700 hover:text-white"
                  aria-label="Remove file"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="mt-7 flex justify-center">
                <button
                  type="button"
                  onClick={convertPdfToWord}
                  disabled={loading}
                  className="flex min-w-[220px] items-center justify-center gap-3 rounded-xl bg-blue-600 px-7 py-4 font-bold transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2
                        size={21}
                        className="animate-spin"
                      />
                      Converting...
                    </>
                  ) : (
                    <>
                      <FileText size={21} />
                      Convert to Word
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 p-5 text-red-300">
            <AlertCircle
              size={22}
              className="mt-0.5 shrink-0"
            />

            <div>
              <p className="font-semibold">
                Conversion Error
              </p>

              <p className="mt-1 text-sm">
                {error}
              </p>
            </div>
          </div>
        )}

        {/* Success */}
        {success && downloadUrl && (
          <div className="mt-6 rounded-2xl border border-green-500/30 bg-green-500/10 p-6">
            <div className="flex items-center justify-center gap-3 text-green-400">
              <CheckCircle size={24} />

              <span className="font-semibold">
                {success}
              </span>
            </div>

            <p className="mt-3 text-center text-sm text-slate-400">
              Your Word document is ready.
            </p>

            {/* DOWNLOAD BUTTON */}
            <div className="mt-5 flex justify-center">
              <button
                type="button"
                onClick={downloadFile}
                className="flex items-center gap-3 rounded-xl bg-green-600 px-8 py-4 font-bold text-white shadow-lg transition hover:bg-green-700"
              >
                <Download size={22} />
                Download Word File
              </button>
            </div>

            <p className="mt-3 text-center text-xs text-slate-500">
              {downloadName}
            </p>
          </div>
        )}

        {/* Features */}
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-slate-900 p-5 text-center">
            <div className="text-2xl">⚡</div>

            <h3 className="mt-3 font-semibold">
              Fast Conversion
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              Convert your PDF quickly.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900 p-5 text-center">
            <div className="text-2xl">🔒</div>

            <h3 className="mt-3 font-semibold">
              Secure
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              Your files are processed securely.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900 p-5 text-center">
            <div className="text-2xl">💯</div>

            <h3 className="mt-3 font-semibold">
              Free
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              No payment required for basic use.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center">
        <p className="text-sm text-slate-500">
          © 2026 Tool Master Pro. Free online tools.
        </p>
      </footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
