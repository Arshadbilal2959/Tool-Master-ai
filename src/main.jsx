/* =========================================================
   STUDENT AI
========================================================= */

function StudentAIHelper({ back }) {
  const [question, setQuestion] = useState("");
  const [file, setFile] = useState(null);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = (selectedFile) => {
    setError("");

    if (!selectedFile) return;

    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/webp",
      "text/plain",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    const allowedExtensions = [
      ".pdf",
      ".jpg",
      ".jpeg",
      ".png",
      ".webp",
      ".txt",
      ".doc",
      ".docx",
    ];

    const fileName =
      selectedFile.name.toLowerCase();

    const validType =
      allowedTypes.includes(
        selectedFile.type
      );

    const validExtension =
      allowedExtensions.some((ext) =>
        fileName.endsWith(ext)
      );

    if (!validType && !validExtension) {
      setFile(null);
      setError(
        "Unsupported file. Please upload PDF, JPG, PNG, WEBP, TXT, DOC or DOCX."
      );
      return;
    }

    // 20 MB limit
    if (
      selectedFile.size >
      20 * 1024 * 1024
    ) {
      setFile(null);
      setError(
        "Maximum file size is 20 MB."
      );
      return;
    }

    setFile(selectedFile);
    setAnswer("");
  };

  const removeFile = () => {
    setFile(null);
    setError("");
  };

  const solve = async () => {
    setError("");
    setAnswer("");

    if (!question.trim() && !file) {
      setError(
        "Please enter a question or upload study material."
      );
      return;
    }

    setLoading(true);

    try {
      // Temporary frontend processing.
      // Real AI backend can be connected here later.
      await new Promise((resolve) =>
        setTimeout(resolve, 800)
      );

      let message =
        "Student AI Helper is ready.";

      if (file) {
        message +=
          `\n\nUploaded file: ${file.name}`;

        message +=
          "\n\nA secure AI backend can now read this file and generate a step-by-step answer.";
      }

      if (question.trim()) {
        message +=
          `\n\nYour question:\n${question}`;
      }

      setAnswer(message);
    } catch (err) {
      console.error(err);

      setError(
        err?.message ||
          "Unable to process your request."
      );
    } finally {
      setLoading(false);
    }
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

        {/* LEFT SIDE */}
        <div className="aiCard">
          <h3>
            📚 Ask your question
          </h3>

          <textarea
            value={question}
            onChange={(e) =>
              setQuestion(e.target.value)
            }
            placeholder="Example: Explain photosynthesis in simple words..."
          />

          {/* FILE UPLOAD */}
          <div className="uploadBox">

            <div className="uploadIcon">
              <Upload size={25} />
            </div>

            <div className="uploadContent">
              <b>
                Upload study material
              </b>

              <small>
                PDF, JPG, PNG, WEBP, TXT, DOC or DOCX
              </small>

              {file && (
                <div className="selectedUpload">
                  <strong>
                    📎 {file.name}
                  </strong>

                  <small>
                    {(
                      file.size /
                      1024 /
                      1024
                    ).toFixed(2)}{" "}
                    MB
                  </small>
                </div>
              )}
            </div>

            {/* IMPORTANT:
                Do not hide this input with display:none.
            */}
            <input
              id="student-file-upload"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.webp,.txt,.doc,.docx,application/pdf,image/*,text/plain"
              onChange={(e) => {
                const selected =
                  e.target.files?.[0];

                handleFile(selected);

                // Allow selecting the same file again
                e.target.value = "";
              }}
            />

            <label
              htmlFor="student-file-upload"
              className="uploadButton"
            >
              <Upload size={17} />
              Choose File
            </label>
          </div>

          {file && (
            <div className="fileActions">
              <span>
                ✓ File selected
              </span>

              <button
                type="button"
                className="secondary"
                onClick={removeFile}
              >
                <X size={16} />
                Remove
              </button>
            </div>
          )}

          {error && (
            <div className="authError">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <button
            className="primary"
            onClick={solve}
            disabled={loading}
            type="button"
          >
            {loading ? (
              <>
                <Loader2
                  className="spin"
                  size={17}
                />
                Processing...
              </>
            ) : (
              <>
                <Sparkles size={17} />
                Get AI Help
              </>
            )}
          </button>
        </div>

        {/* RIGHT SIDE */}
        <div className="aiCard">
          <h3>
            🤖 AI Answer
          </h3>

          <div className="answer">
            {answer ||
              "Your step-by-step explanation will appear here."}
          </div>

          {answer && (
            <div className="actions">

              <button
                className="secondary"
                type="button"
                onClick={() =>
                  navigator.clipboard?.writeText(
                    answer
                  )
                }
              >
                <Copy size={17} />
                Copy Answer
              </button>

              <button
                className="secondary"
                type="button"
                onClick={() => {
                  const blob =
                    new Blob(
                      [answer],
                      {
                        type:
                          "text/plain",
                      }
                    );

                  const url =
                    URL.createObjectURL(
                      blob
                    );

                  const a =
                    document.createElement(
                      "a"
                    );

                  a.href = url;
                  a.download =
                    "student-ai-answer.txt";

                  document.body.appendChild(
                    a
                  );

                  a.click();
                  a.remove();

                  URL.revokeObjectURL(
                    url
                  );
                }}
              >
                <Download size={17} />
                Download
              </button>

            </div>
          )}
        </div>
      </div>

      <div className="notice">
        <ShieldCheck />

        <span>
          Your selected file stays in
          the browser until a secure AI
          backend is connected.
        </span>
      </div>
    </main>
  );
}
