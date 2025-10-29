# 🚀 CodeCollab – AI-Powered Code Analyzer, Chat & Converter

**CodeCollab** is a full-stack AI-driven application that helps developers understand, debug, and convert code easily.  
Upload your code file, ask questions about it, or convert it into another programming language — all with the power of OpenAI.

---

## 🧩 Project Overview

CodeCollab enables developers to:

- 🧠 Analyze uploaded code files — detect language, summarize, and identify possible errors.  
- 💬 Chat with the AI about any uploaded code.  
- 🔁 Convert code between programming languages (e.g., Python → C++, Java → JS, etc.).

The project uses:

- **FastAPI (Backend)** – to handle analysis, chat, and conversion requests.  
- **React.js (Frontend)** – to provide an intuitive UI for interacting with the AI.  
- **OpenAI API** – to process and respond to user queries intelligently.

---

## ⚙️ Tech Stack

### Frontend
- React.js (with hooks)
- CSS (custom styling)
- Fetch API for backend communication

### Backend
- FastAPI
- OpenAI Python SDK
- Pydantic for request validation
- dotenv for environment variables
- CORS middleware for frontend-backend communication

---

## 🧠 Features

### 📝 1. Code Analysis
- Upload any code file (.py, .js, .cpp, .java, .html, .css, etc.)  
- Detects programming language automatically.  
- Explains what the code does in simple words.  
- Identifies possible bugs and suggests fixes.  
- Provides a high-level summary of its purpose.  

### 💬 2. Ask CodeCollab
- Type a question about the uploaded code.  
- Get a detailed AI-generated answer or explanation.  
- Great for learning or debugging your own projects.  

### 🔄 3. Convert Code
- Instantly convert uploaded code into another programming language.  
- Supports any language pair (e.g., JS → Python, Python → C++, etc.).  

---

# 🧰 Installation & Setup

## 🖥️ Backend (FastAPI)

1. Navigate to the root folder:

    ```bash
    cd CodeCollab
    ```

2. Create a virtual environment (recommended):

    ```bash
    python -m venv venv
    ```

    For macOS/Linux:

    ```bash
    source venv/bin/activate
    ```

    For Windows:

    ```bash
    venv\Scripts\activate
    ```

3. Install dependencies:

    ```bash
    pip install fastapi uvicorn python-dotenv openai
    ```

4. Create a `.env` file in the root directory:

    ```
    OPENAI_API_KEY=your_openai_api_key_here
    ```

5. Run the FastAPI server:

    ```bash
    uvicorn main:app --reload
    ```

    The backend will start at:

    👉 [http://127.0.0.1:8000](http://127.0.0.1:8000)

---

## 💻 Frontend (React)

1. Go to the `client` directory:

    ```bash
    cd client
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Run the React app:

    ```bash
    npm start
    ```

    The frontend will start at:

    👉 [http://localhost:3000](http://localhost:3000)

---

## 🔗 Connecting Frontend and Backend

The backend URL in `App.js` is already set to:

```js
const backendUrl = "http://127.0.0.1:8000";
```


## 🧪 API Endpoints

| Endpoint   | Method | Description                                | Input                             | Output                  |
|------------|--------|--------------------------------------------|-----------------------------------|-------------------------|
| /analyze   | POST   | Analyzes uploaded code                     | file (UploadFile)                 | result (string)         |
| /chat      | POST   | Answers a question about code              | { code, question }                | answer (string)         |
| /convert   | POST   | Converts code into another language        | { code, target_language }         | converted_code (string) |

# 🧑‍💻 Example Workflow

1. Upload a Python file (`main.py`) using the Upload button.
2. View the AI-generated analysis and summary.
3. Ask: "What is the purpose of the `main()` function?"
4. See AI explanation in the GPT Answer section.
5. Enter “C++” as the target language and click Convert Code to see the equivalent version.

---

# 🧾 Example .env File

```env
OPENAI_API_KEY=sk-your-real-key-here
```

# 🧠 Notes

- The app supports multiple file types and language conversions.
- You must have an active OpenAI API key for the backend to function.
- The backend uses the `gpt-4o-mini` model for efficient, high-quality responses.
