# 🚀 Aryeman One — Deployment Guide

## Folder Structure
```
aryemanone/
├── api/
│   └── server.js        ← Node.js Express backend
├── public/
│   └── index.html       ← Your frontend app
├── package.json
├── vercel.json          ← Vercel config
├── .env.example         ← Copy to .env
└── .gitignore
```

---

## STEP 1: Install Node.js
Download from: https://nodejs.org (LTS version)

---

## STEP 2: Setup MongoDB (Free Database)

1. Go to https://mongodb.com/atlas
2. Sign up free
3. Create cluster → Free tier → Region: Mumbai (ap-south-1)
4. Create database user (username + password)
5. Network access → Add IP → Allow from anywhere (0.0.0.0/0)
6. Get connection string: `mongodb+srv://user:pass@cluster.mongodb.net/aryemanone`

---

## STEP 3: Test Locally

```bash
# 1. Open terminal in this folder
cd aryemanone

# 2. Install packages
npm install

# 3. Create .env file
cp .env.example .env
# Edit .env with your MongoDB URL

# 4. Start server
npm start

# 5. Open browser: http://localhost:3000
```

---

## STEP 4: Deploy to Vercel (FREE)

### Method A: Vercel CLI (Recommended)
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy from project folder
cd aryemanone
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name: aryemanone
# - Which folder is your code? ./
# Done! You get URL like: https://aryemanone.vercel.app
```

### Method B: GitHub + Vercel (Auto-deploy)
1. Create GitHub account: https://github.com
2. Create new repository: `aryemanone`
3. Upload all files to GitHub
4. Go to https://vercel.com → "Import Project"
5. Select your GitHub repo
6. Click Deploy
7. Every time you push to GitHub → auto-deploys!

---

## STEP 5: Set Environment Variables on Vercel

1. Go to your Vercel project dashboard
2. Settings → Environment Variables
3. Add these:
   ```
   MONGODB_URI = mongodb+srv://...your connection string...
   JWT_SECRET  = any-random-long-string-here
   ANTHROPIC_API_KEY = sk-ant-... (optional, for real Zia AI)
   ```
4. Redeploy

---

## API Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| GET | /api/health | Check if server is running |
| GET | /api/leads | Get all leads (filter: ?assigned_to=Praveen) |
| POST | /api/leads | Add new lead |
| PUT | /api/leads/:id | Update lead |
| DELETE | /api/leads/:id | Delete lead |
| POST | /api/leads/bulk | Bulk import leads |
| GET | /api/leads/stats/summary | Lead statistics |
| GET | /api/deals | Get all deals |
| POST | /api/deals | Add new deal |
| PUT | /api/deals/:id | Update deal |
| DELETE | /api/deals/:id | Delete deal |
| GET | /api/dashboard/stats | Dashboard KPIs |
| POST | /api/zia/chat | Ask Zia AI |
| GET | /api/search?q=kamrup | Search everything |

---

## Connect Frontend to Backend

In `public/index.html`, add this at the top of the `<script>` section:

```javascript
// API Base URL — change this after deployment
const API_BASE = window.location.hostname === 'localhost'
  ? 'http://localhost:3000'
  : 'https://your-app.vercel.app';

// Example: fetch leads from backend
const fetchLeads = async () => {
  const res = await fetch(`${API_BASE}/api/leads`);
  const data = await res.json();
  return data.data; // array of leads
};
```

---

## Need Help?

WhatsApp/Call: (your number)
Email: aryeman@aryemanone.com
