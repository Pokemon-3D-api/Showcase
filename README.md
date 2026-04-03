# 🏛️ Pokémon 3D API: Interactive Showcase

This is the official demonstration repository for the Pokémon 3D API. It serves as a real-world example of how to integrate web-optimized 3D assets into a responsive web application using React and Google's `<model-viewer>`.

## 🛠️ Tech Stack

- **Frontend:** React 19, TypeScript, Vite, SASS
- **3D Rendering:** Google `<model-viewer>` (Web Components)
- **Data Source:** Pokémon 3D API Server (Merged JSON)
- **Assets:** Pokémon 3D Assets (.glb models)

## 🚀 Key Features

- **Dynamic Filtering:** Search by Name, ID, Generation (1-9), or Form (Mega, Shiny, G-Max, etc.)
- **Animation Support:** Interactive modal allows users to swap between available animations (Idle, Walk, Attack, etc.) dynamically
- **Animated Number Indicator:** Smooth animated Pokémon number display
- **Not Found Model Indicator:** Visual feedback when 3D model is unavailable
- **Dark/Light Theme Toggle:** Switch between dark and light modes
- **Responsive Design:** Fully optimized for mobile, tablet, and desktop viewing
- **AR Ready:** Built-in Augmented Reality support for compatible mobile browsers

## 📦 How to Run Locally

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```bash
git clone https://github.com/deivid11/Showcase.git
cd Showcase
npm install
```

### Development

Start the development server with hot reload:

```bash
npm run dev
```

The app will be available at `http://localhost:5800`

### Build

Build for production:

```bash
npm run build
```

### Preview

Preview the production build locally:

```bash
npm run preview
```

### Lint

Run ESLint to check for code issues:

```bash
npm run lint
```

## 🤝 Contributing

If you find a bug or have a suggestion for improving the UI or performance:

- Open an issue
- Or submit a pull request

Contributions are welcome!

## ⚖️ Legal Notice

This project is an unofficial, fan-made resource.

- Pokémon and Pokémon character names are trademarks of Nintendo.
- This project is intended strictly for educational and non-commercial purposes.
