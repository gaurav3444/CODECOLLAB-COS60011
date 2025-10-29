from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
from dotenv import load_dotenv
import os

# ---------- SETUP ----------

load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise ValueError(" OPENAI_API_KEY not found in .env file")

client = OpenAI(api_key=api_key)

app = FastAPI()

# Allow frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------- MODELS ----------

class ChatRequest(BaseModel):
    code: str
    question: str

class ConvertRequest(BaseModel):
    code: str
    target_language: str


# ---------- ENDPOINTS ----------

@app.post("/analyze")
async def analyze_code(file: UploadFile = File(...)):
    code = (await file.read()).decode("utf-8")

    prompt = f"""
    You are a code analyzer. Analyze the following code:
    1. Identify the programming language
    2. Explain what this code does in simple words
    3. Detect any errors and suggest fixes
    4. Summarize what this code can be used for

    CODE:
    {code}
    """

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
    )

    return {"result": response.choices[0].message.content}


@app.post("/chat")
async def chat_about_code(req: ChatRequest):
    prompt = f"""
    The user is asking a follow-up question about the following code:

    Code:
    {req.code}

    Question:
    {req.question}

    Provide a detailed and clear answer.
    """

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
    )

    return {"answer": response.choices[0].message.content}


@app.post("/convert")
async def convert_code(req: ConvertRequest):
    prompt = f"""
    Convert the following code into {req.target_language} language:

    {req.code}
    """

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
    )

    return {"converted_code": response.choices[0].message.content}
