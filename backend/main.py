import os
import html
import resend
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr, Field
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

# Configure allowed origins: default to "*" in local development so any local port or file:// origin works seamlessly
origins_env = os.getenv("ALLOWED_ORIGINS", "").strip()
if origins_env and origins_env != "*":
    allow_origins = [o.strip() for o in origins_env.split(",") if o.strip()]
else:
    allow_origins = ["*"]

app = FastAPI(title="Portfolio Contact API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=allow_origins,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
    allow_private_network=True,
)
resend.api_key = os.getenv("RESEND_API_KEY")

EMAIL_TO = os.getenv("EMAIL_TO")
EMAIL_FROM = os.getenv("EMAIL_FROM")


class ContactMessage(BaseModel):
    name: str = Field(min_length=2, max_length=80)
    email: EmailStr
    subject: str = Field(default="Portfolio Contact Message", max_length=120)
    message: str = Field(min_length=10, max_length=2000)


@app.get("/")
def home():
    return {"message": "Portfolio backend is running!"}


@app.get("/api/health")
def health_check():
    return {"status": "healthy"}


@app.options("/api/contact")
def options_contact():
    return {"status": "ok"}


@app.post("/api/contact")
def send_contact_message(data: ContactMessage):

    if not resend.api_key or not EMAIL_TO or not EMAIL_FROM:
        raise HTTPException(
            status_code=500,
            detail="Email service is not configured."
        )

    clean_subject = (data.subject or "").strip() or "Portfolio Contact Message"

    safe_name = html.escape(data.name.strip())
    safe_email = html.escape(str(data.email).strip())
    safe_subject = html.escape(clean_subject)
    safe_message = html.escape(data.message.strip()).replace("\n", "<br>")

    params = {
        "from": EMAIL_FROM,
        "to": [EMAIL_TO],
        "reply_to": str(data.email),
        "subject": f"Portfolio Contact: {clean_subject}",
        "html": f"""
            <h2>New Portfolio Message</h2>
            <p><strong>Name:</strong> {safe_name}</p>
            <p><strong>Email:</strong> {safe_email}</p>
            <p><strong>Subject:</strong> {safe_subject}</p>
            <p><strong>Message:</strong><br>{safe_message}</p>
        """
    }

    try:
        resend.Emails.send(params)
        return {"message": "Message sent successfully!"}

    except Exception as err:
        print(f"Resend error: {err}")
        raise HTTPException(
            status_code=502,
            detail="Unable to send message via email service. Please try again later."
        )
