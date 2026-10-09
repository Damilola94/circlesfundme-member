# CirclesFundMe — Web

Web version of the CirclesFundMe mobile app. Next.js 16 (App Router) + TypeScript + Tailwind v4 + shadcn/ui (Base UI).

- **Visual design:** the Figma file *2026 Innovation Slides*, canvas node `1431:2` (snapshots in `design/`).
- **Behaviour and API:** ported from the React Native app (`circlesfundme-web`, Expo Router). Screens keep the same route names.

## Getting started

```bash
cp .env.example .env.local   # points at https://api.circlesfundme.com/api/v1 by default
npm install
npm run dev                  # http://localhost:3000
```

| Variable      | Purpose                                                    |
| ------------- | ---------------------------------------------------------- |
| `CFM_API_URL` | Backend base URL (server-side only; the browser never calls it directly). |

## How it talks to the backend

```
browser ──fetch──▶ /api/backend/<endpoint>  ──▶  CFM_API_URL/<endpoint>
                   (src/app/api/backend/[...path]/route.ts)
```

- **Same-origin proxy.** The backend's CORS policy only allows certain origins, so every call goes through Next.js. The proxy works on any domain without backend changes.
- **Tokens never reach JavaScript.** When `auth/login` succeeds, the proxy stores `accessToken`/`refreshToken` in httpOnly cookies and strips them from the response. AsyncStorage `data` in the mobile app maps to these cookies.
- **Refresh and retry.** Same as `services/api/index.js`: on 401/403 the proxy calls `auth/refresh-token` once and retries, and on timeouts it retries once after 2.5s (backend cold starts).
- **`api()`** (`src/lib/api/client.ts`) takes the same options as the mobile `handleFetch` (`endpoint`, `extra`, `param`, `pQuery`, `method`, `body`, `multipart`) and uses the same error-message rules.
- **Route guard** (`src/proxy.ts`) mirrors `app/index.tsx` and `protected-route.tsx`:
  - The 15-minute session limit.
  - Unfinished onboarding goes to `/sign-in/welcome-onboarding`.
  - Incomplete KYC goes to `/sign-up/personal-info`.

## Web-specific adaptations

| Mobile | Web |
| --- | --- |
| Payment WebView watching for `success`/`callback` URLs | `/checkout` opens the provider in a pop-up and confirms payment by re-checking the relevant balance (contribution wallet, savings plan, or unpaid-installment count) while it's open and after it closes. |
| `expo-camera` selfie | `getUserMedia` with the oval guide; falls back to a photo upload. |
| Data passed between screens in route params (including the new user's password) | Sign-up credentials are kept in memory only, and the onboarding draft in `sessionStorage`. Nothing sensitive appears in URLs. |
| Stack carousel | A swipeable row of cards (CSS scroll snap). |
| `react-native-svg` icons | The same SVGs as React components in `src/components/icons/`. |

## Fixes compared with the mobile app

- **Lump-sum savings:** sent a ₦0 contribution and never showed a projection. It now uses the entered amount.
- **"Loan Protection Fee":** showed the management-fee value. It now shows `loanProtectionFund`.
- **Vehicle minimum price:** the app hard-coded "at least ₦7,000,000". The web app shows the backend's own message (the backend's minimum is ₦5,000,000).
- **Savings "Complete Setup":** called `savings/plans/undefined/top-up`. The web app now finds the user's plan first.
- **Wrong-password login:** showed a generic "not authorized" message. It now shows the backend's message.
- **Backend timestamps without a timezone:** treated as UTC and shown in local time. The mobile app hard-coded +1h.

## Project layout

```
src/
  app/                    routes (mirror the mobile app's paths)
    (tabs)/               dashboard, history, notification, profile + bottom nav
    sign-up/ sign-in/ auth/  onboarding & authentication
    api/backend/          backend proxy        api/session/  session flags & logout
    checkout/             payment hand-off
  components/
    ui/                   shadcn primitives
    forms/ feedback/ layout/ data/   shared building blocks
    dashboard/ history/ payments/ schemes/ profile/
    icons/                icons converted from the mobile app
  lib/                    api client, formatting, scheme constants, stores
  hooks/
design/                   Figma snapshots (canvas.png, per-screen crops, layer metadata)
```

## Scripts

- `npm run dev` — development server
- `npm run build && npm start` — production build
- `npm run lint` — ESLint
# circlesfundme-member
