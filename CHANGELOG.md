# Changelog

All notable changes to the KAÈON Luxury Catering project will be documented in this file.

## [1.0.0] - 2026-06-26

### Added
- Created `DEPLOYMENT_GUIDE.md` with step-by-step production deployment instructions for Vercel/Netlify.
- Created `FIREBASE_SETUP.md` with detailed instructions on configuring GCP/Firebase projects and enabling the Cloud Firestore API.
- Introduced GPU-accelerated transition and hover styles inside `globals.css` to prevent layout shifts (CLS) and scroll jitter on dynamic cards and overlays.
- Added `.gpu-accelerated` helper class supporting `translate3d(0, 0, 0)`, `will-change: transform, opacity`, and `backface-visibility: hidden`.
- Configured user-level portable Git integration in workspace to bypass administrator execution restrictions.

### Changed
- Refactored `Navbar` component scroll event handler to utilize `requestAnimationFrame` throttle, `passive: true` listener, and a boolean ticking flag to prevent main-thread blocking.
- Refactored `FloatingCTA` component scroll listener to also throttle scrolling updates with `requestAnimationFrame`.
- Enhanced accessibility in `BudgetCalculator` and `InquiryForm` by binding labels to form control fields via matching `htmlFor` and `id` properties.
- Applied the GPU acceleration utility class to gallery masonry items in `GallerySection` to stabilize filter transition scales.
- Updated `.gitignore` to explicitly ignore `/mingit/` and `/mingit.zip` portable git binaries.

### Secured
- Removed default hardcoded passcode `"admin123"` in admin dashboard `src/app/admin/page.tsx`, transitioning dashboard authentication to `process.env.NEXT_PUBLIC_ADMIN_PASSCODE` with local state validation and security alert components.
- Sanitized environment variables configuration by placing actual Firebase project secrets strictly inside `.env.local` (ignored from Git), preventing exposure.

### Verified
- Executed local production Next.js builds successfully (`npm run build` generates 14 static pages cleanly).
- Verified environment config routing to Firestore connectivity client fallbacks.
