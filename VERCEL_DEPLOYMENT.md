# Deploy to Vercel - Step by Step Guide

## 📋 Prerequisites
- GitHub account (free)
- Vercel account (free)
- Your code pushed to GitHub

## 🚀 Step 1: Push Code to GitHub

```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit - Provincial Office Dashboard"

# Add GitHub repo (replace YOUR_USERNAME and YOUR_REPO)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

## 🔗 Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up or log in
3. Click **"Add New..."** → **"Project"**
4. Click **"Import Git Repository"**
5. Select your GitHub repo
6. Click **"Import"**

## ⚙️ Step 3: Configure Environment (Optional)

If you need API connection:
1. In Vercel dashboard, go to **Settings** → **Environment Variables**
2. Add:
   - **VITE_API_URL**: `http://localhost:3000/api` (or your backend URL)
3. Click **Save**

## ✅ Step 4: Deploy

1. Click **"Deploy"**
2. Wait for build to complete (usually 1-2 minutes)
3. Get your live URL: `https://your-project.vercel.app`

## 🎉 Done!

Your app is now live and public!

---

## 🔄 Auto-Deploy

Every time you push to GitHub:
```bash
git add .
git commit -m "Your changes"
git push
```

Vercel will automatically rebuild and deploy.

---

## 📱 Share Your URL

```
https://your-project.vercel.app
```

Send this link to anyone - they can access your dashboard!

---

## 🐛 Troubleshooting

**Build fails?**
- Check console for errors
- Make sure all dependencies are in `package.json`
- Run `npm run build` locally to test

**Blank page?**
- Check browser console (F12) for errors
- Verify all routes are correct
- Check environment variables

**Want custom domain?**
- Vercel → Settings → Domains
- Add your custom domain
- Follow DNS instructions

---

## 📊 Monitor Your Site

- Vercel Dashboard shows:
  - Build logs
  - Performance metrics
  - Analytics
  - Error tracking

---

Need help? Check Vercel docs: [vercel.com/docs](https://vercel.com/docs)
