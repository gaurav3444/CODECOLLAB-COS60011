import React, { useState } from "react";
import "./App.css";
import uploadIcon from "./upload.png";

function App() {
  const [file, setFile] = useState(null);
  const [codeContent, setCodeContent] = useState("");   // store code
  const [analysis, setAnalysis] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [targetLang, setTargetLang] = useState("");
  const [converted, setConverted] = useState("");
  const [loading, setLoading] = useState(false);
  const backendUrl = "http://127.0.0.1:8000";

  const handleAnalyze = async () => {
    if (!file) return alert("Please upload a file first!");
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      // Read code text locally before sending
      const text = await file.text();
      setCodeContent(text); // save code

      const res = await fetch(`${backendUrl}/analyze`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setAnalysis(data.result || "Error analyzing file.");
    } catch {
      setAnalysis("Unable to analyze the file.");
    }
    setLoading(false);
  };

  const handleChat = async () => {
    if (!question.trim()) return alert("Please type a question!");
    if (!codeContent) return alert("Please analyze a file first!");
    setLoading(true);
    try {
      const res = await fetch(`${backendUrl}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: codeContent, question }), // send actual code
      });
      const data = await res.json();
      setAnswer(data.answer || "Error getting GPT response.");
    } catch {
      setAnswer("Unable to get GPT response.");
    }
    setLoading(false);
  };

  const handleConvert = async () => {
    if (!targetLang.trim()) return alert("Please enter a target language!");
    if (!codeContent) return alert("Please analyze a file first!");
    setLoading(true);
    try {
      const res = await fetch(`${backendUrl}/convert`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: codeContent, //  send real code
          target_language: targetLang,
        }),
      });
      const data = await res.json();
      setConverted(data.converted_code || "Error converting code.");
    } catch {
      setConverted("Unable to convert code.");
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <header className="navbar">
        <div className="navLeft">
          <div className="iconBox">&lt;/&gt;</div>
          <h2>CodeCollab</h2>
        </div>
        <p className="tagline">Learn to code better</p>
      </header>

      <main className="main">
        {/* === Upload & Analyze === */}
        <div className="uploadSection">
          <img src={uploadIcon} alt="upload" className="uploadImg" />
          <h3>Upload your Code</h3>
          <p className="grayText">Get instant feedback on your code</p>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="fileInput"
          />
          <button className="btn" onClick={handleAnalyze} disabled={loading}>
            {loading ? "Analyzing..." : "Analyze Code"}
          </button>
          <p className="grayText small">
            Supports: .py .js .cpp .java .c .html .css .ts  etc....
          </p>
          {analysis && (
            <div className="resultBox autoExpand">
              <h4>Analysis Result</h4>
              <pre>{analysis}</pre>
            </div>
          )}
        </div>

        {/* === Ask CodeCollab === */}
        <div className="questionBox">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask a follow-up question..."
          />
          <button className="btn" onClick={handleChat} disabled={loading}>
            {loading ? "Loading..." : "Ask CodeCollab"}
          </button>
          {answer && (
            <div className="resultBox autoExpand">
              <h4>GPT Answer</h4>
              <pre>{answer}</pre>
            </div>
          )}
        </div>

        {/* === Convert Code === */}
        <div className="convertBox">
          <input
            type="text"
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
            placeholder="Convert to (e.g. Python, C++)"
          />
          <button className="btn" onClick={handleConvert} disabled={loading}>
            {loading ? "Converting..." : "Convert Code"}
          </button>
          {converted && (
            <div className="resultBox autoExpand">
              <h4>Converted Code</h4>
              <pre>{converted}</pre>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
