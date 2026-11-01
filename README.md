# Ilamaran R. — AI/ML Developer Portfolio

A professional, distinctive, and responsive personal portfolio website crafted with **pure HTML5, CSS3, and Vanilla JavaScript**. Built with a **Swiss Minimalist + Modern Tech Editorial** design identity using the **Arctic Blue + Frost** color palette.

---

## 👤 Confirmed Personal Information

* **Name**: Ilamaran R.
* **Role**: Aspiring AI/ML Developer
* **Degree**: Bachelor of Technology (B.Tech) in Information Technology
* **Institution**: Perunthalaivar Kamarajar Institute of Engineering and Technology (PKIET)
* **Academic Duration**: 2024–2028
* **Email**: [ilamaran5648@gmail.com](mailto:ilamaran5648@gmail.com)
* **GitHub Profile**: [https://github.com/ilamaran5648-Professional](https://github.com/ilamaran5648-Professional)
* **LinkedIn Profile**: [https://www.linkedin.com/in/ilamaran-r-771007417/](https://www.linkedin.com/in/ilamaran-r-771007417/)

---

## 🎨 Design System & Color Palette

* **Deep Navy (`#102A43`)**: Primary contrast anchor, typography, high-contrast dark sections, and specimen cards.
* **Primary Blue (`#1D4E89`)**: Brand accent, section subheadings, and active interactive borders.
* **Sky Blue (`#3B82B8`)**: Secondary highlights, category accents, and list bullets.
* **Ice Cyan (`#B9E8F5`)**: High-contrast chips, micro-badges, and borders.
* **Frost White (`#F0FAFF`)**: Primary canvas background providing a clean, frosty feel.

---

## 📁 Project Structure

```
portfolio/
├── index.html              # Semantic HTML5 architecture (all 8 sections)
├── style.css               # Swiss layout system, Arctic color tokens & responsive rules
├── script.js               # Accessible mobile nav, project filter, form validation
├── README.md               # Documentation and setup guide
└── assets/
    ├── images/             # Static image assets
    ├── projects/           # Project screenshots or schematics
    └── icons/              # Static SVG icons
```

---

## 🚀 Website Sections

1. **Home (Hero)**:
   * Professional headline: *"Learning today. Building intelligent solutions for tomorrow."*
   * Asymmetric 2-column Swiss grid featuring the **Dev Log Specimen Card** with verified learning topics, project highlights, and development approach.
   * System metadata strip with a live opportunity status indicator.

2. **About Me**:
   * Natural, beginner-friendly introduction as a B.Tech IT student (**2024–2028**) at **PKIET**.
   * First-principles perspective on Machine Learning, from mathematical intuition in NumPy to supervised models and practical GenAI experiments.
   * Institutional profile specimen card with verified academic milestones.

3. **Technical Skills (3-Tier Status Distinction)**:
   * **Tier 01: Used in Projects**: HTML5, CSS3, Vanilla JavaScript, Python, FastAPI, Resend API (Email Integration).
   * **Tier 02: Familiar With**: NumPy, Pandas, Scikit-learn, Machine Learning Fundamentals, Git & GitHub.
   * **Tier 03: Currently Learning**: Vector Search Concepts, RAG Architectures, Linear Regression.

4. **Projects (Selected Dark Section)**:
   * High-contrast dark navy section (`#102A43`) with interactive **Vanilla JavaScript Category Filtering** (`All`, `GenAI & RAG`, `Machine Learning`, `Web & AI`).
   * Clean SVG architectural schematic diagrams for each project (zero generic AI stock photos).
   * **Projects Showcased**:
     1. **Study with Buddy**: AI study assistant built with Flask and Gemini API for summaries, quizzes, and answer refinement.
     2. **DocuMind RAG**: Grounded multi-format document intelligence assistant with FAISS vector indexing and Gemini API.
     3. **AI Urban Disaster Evacuation System**: Algorithmic decision-support framework optimizing emergency routing.
     4. **Smart Canteen AI App**: Intelligent ordering engine and queue-management system.
   * Direct GitHub links point directly to your verified GitHub profile: `https://github.com/ilamaran5648-Professional`.

5. **Experience**:
   * **ShadowFox** — *AI Engineer Intern* (**August 2026 · 1 month · Remote**): AI application development, LLM integration, Study With Buddy, DocuMind RAG, FAISS, and LangGraph.
   * **Micro Labs KKL** — *Machine Learning Intern* (**June 2026 – July 2026 · 1 month · Remote**): Foundational exposure in Machine Learning workflows, supervised learning, and algorithmic intuition.

6. **Education**:
   * **Bachelor of Technology (B.Tech) in Information Technology** at **PKIET** (**2024–2028**).
   * Coursework chips covering Data Structures, OOP, DBMS, Computer Networks, and Discrete Mathematics.

7. **Contact**:
   * Direct contact directory with working links:
     * Email: `ilamaran5648@gmail.com` (working mailto link)
     * LinkedIn: `https://www.linkedin.com/in/ilamaran-r-771007417/`
     * GitHub: `https://github.com/ilamaran5648-Professional`
   * Functional client-side validated contact form with accessible error feedback (`aria-live="polite"`).
   * Clear, honest submission notice explaining that the form validates inputs on the frontend and directs visitors to send direct messages via email or LinkedIn.

8. **Footer**:
   * Identity summary, navigation links, direct social links, architecture spec, copyright 2026, and smooth scroll back-to-top.

---

## 🛠️ How to Run Locally

You can run this portfolio locally without any build steps or node installations:

### Option 1: Direct File Open
Double-click `portfolio/index.html` (or open it in Chrome, Firefox, Safari, or Edge).

### Option 2: VS Code Live Server
1. Open the project folder in VS Code.
2. Right-click `portfolio/index.html` and select **"Open with Live Server"**.

### Option 3: Python Built-in HTTP Server
Run the following command from the project root:
```bash
python -m http.server 8000
```
Then navigate to `http://localhost:8000/portfolio/` in your web browser.

---

## ⚙️ Backend Email Integration (FastAPI + Resend)

The contact form is connected to a dedicated FastAPI backend using Resend for email transmission:

### Running the Backend Locally
1. Navigate to the backend directory:
   ```bash
   cd portfolio/backend
   ```
2. Activate your virtual environment and install dependencies:
   ```bash
   # Windows PowerShell:
   .venv\Scripts\Activate.ps1
   pip install -r requirements.txt
   ```
3. Ensure `.env` is configured with your Resend credentials:
   ```env
   RESEND_API_KEY=your_resend_api_key
   EMAIL_TO=your_target_email@example.com
   EMAIL_FROM=onboarding@resend.dev
   ```
4. Start the FastAPI server on port 8000:
   ```bash
   uvicorn main:app --reload --host 127.0.0.1 --port 8000
   ```
5. Interactive API docs (Swagger UI) are accessible at `http://127.0.0.1:8000/docs`.

### Production Deployment Notes
* **Frontend API URL**: In production, specify `window.PORTFOLIO_API_URL = "https://your-backend-api.com/api/contact";` before `script.js` or update the fallback in `portfolio/script.js`.
* **CORS Allowed Origins**: In `backend/.env`, set `ALLOWED_ORIGINS=https://your-portfolio-domain.com` so FastAPI permits requests from your live domain.
