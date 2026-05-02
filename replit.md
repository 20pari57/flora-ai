# FLORE AI – Smart AI Powered Plant Care Platform

## Overview
A React + Vite + TypeScript frontend application for AI-powered plant care. Uses Tailwind CSS for styling, React Router for navigation, Chart.js for data visualization, and Leaflet for maps.

## Project Structure
```
flore-ai/          # Main application directory
  src/             # Source code
    App.tsx        # Root component with routing
    main.tsx       # Entry point
    pages/         # Page components
    components/    # Reusable components
  index.html       # HTML entry point
  vite.config.ts   # Vite config (host: 0.0.0.0, port: 5000, allowedHosts: true)
  package.json     # Dependencies
  tailwind.config.js
  tsconfig.json
```

## Tech Stack
- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 3
- **Routing**: React Router DOM 7
- **HTTP Client**: Axios
- **Charts**: Chart.js + react-chartjs-2
- **Maps**: Leaflet + react-leaflet
- **Animations**: Framer Motion
- **Icons**: React Icons

## Running the App
- **Workflow**: "Start application" — runs `cd flore-ai && npm run dev` on port 5000

## Deployment
- **Type**: Static site
- **Build**: `cd flore-ai && npm run build`
- **Public Dir**: `flore-ai/dist`

## Notes
- Vite is configured to allow all hosts (`allowedHosts: true`) for Replit proxy compatibility
- Dev server binds to `0.0.0.0:5000`
