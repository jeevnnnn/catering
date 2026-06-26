# Deployment Guide

This guide explains how to deploy the Next.js luxury catering application to production hosting platforms and configure its environment variables.

---

## Deployment Platforms

Next.js projects are best hosted on **Vercel** (the creators of Next.js) or other modern platforms like **Netlify**, **Render**, or **AWS Amplify**.

---

## 1. Deploying to Vercel (Recommended)

Vercel provides native support for Next.js with zero configuration.

### Option A: Via Vercel Web Dashboard

1. Push your repository to your GitHub account (e.g., `https://github.com/jeevnnnn/catering.git`).
2. Log in to the [Vercel Dashboard](https://vercel.com).
3. Click **Add New** -> **Project**.
4. Import your Git repository from GitHub.
5. In the **Configure Project** screen, expand the **Environment Variables** section.
6. Copy and paste the keys from your `.env` file:
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`
   - `NEXT_PUBLIC_ADMIN_PASSCODE` (Set your custom passcode for the Admin Dashboard)
7. Click **Deploy**. Vercel will build and launch your application.

### Option B: Via Vercel CLI

1. Install the Vercel CLI globally:
   ```bash
   npm install -g vercel
   ```
2. Log in to your Vercel account:
   ```bash
   vercel login
   ```
3. Link your project and follow the prompts:
   ```bash
   vercel
   ```
4. Set environment variables on Vercel:
   ```bash
   vercel env add NEXT_PUBLIC_FIREBASE_API_KEY
   vercel env add NEXT_PUBLIC_ADMIN_PASSCODE
   ```
5. Deploy to production:
   ```bash
   vercel --prod
   ```

---

## 2. Deploying to Netlify

1. Commit your codebase to GitHub.
2. Log in to [Netlify](https://netlify.com) and click **Add new site** -> **Import an existing project**.
3. Link Netlify to your GitHub account and select your repository.
4. Set the build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
5. Go to **Site Configuration** -> **Environment variables** -> **Add a variable**.
6. Input all the required Firebase keys and `NEXT_PUBLIC_ADMIN_PASSCODE`.
7. Click **Deploy site**. Netlify will build and deploy your app.
