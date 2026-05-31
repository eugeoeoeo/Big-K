# ⚡ Big K

> *Master Linear Programming Maximization with Mixed Constraints — one pivot at a time.*

An interactive, step-by-step educational web app that teaches the **Simplex Algorithm with the Big-K Method**. Built for students who want to actually *understand* LP, not just survive it.

---

## 🎯 What is this?

**Big K** is a guided, quiz-driven reviewer that breaks down LP Maximization with Mixed Constraints into bite-sized, easy-to-digest steps. It's like having a tutor who explains things in plain English *before* hitting you with the math.

### ✨ Features

- 📖 **Step-by-step lessons** — Every concept broken down into micro-steps with clear explanations
- 📊 **Interactive simplex tableaux** — Color-coded tables with highlighted pivots, ratios, and row operations
- 🧠 **Quizzes after every section** — Wrong answers get specific explanations, not just "try again"
- 💡 **Tips & shortcuts** — Memory tricks, common mistakes to avoid, and speed techniques
- 📝 **Final exam** — Solve a full 3-variable LP problem with guided step-by-step checking
- 🔒 **Progressive unlocking** — Sections unlock as you learn, ensuring you build knowledge in order
- 🎨 **Premium dark UI** — Glassmorphism, smooth animations, and beautiful math rendering with KaTeX

### 📚 Topics Covered

1. **Introduction** — What is LP? What are mixed constraints?
2. **Constraint Conversion** — Converting ≤, ≥, and = constraints to standard form
3. **Tableau Construction** — Building the simplex tableau row by row
4. **Driving Out k** — Eliminating Big-K from the objective row via row operations
5. **Pivoting & Iteration** — Finding pivots, performing row operations, iterating to optimality
6. **Reading the Solution** — Extracting and verifying the final answer
7. **Final Exam** — Solve: Maximize P = x + 2y + 3z (with mixed constraints)

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)

### Installation

```bash
git clone https://github.com/YOUR_USERNAME/big-k.git
cd big-k
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

The static output will be in the `dist/` folder — deploy anywhere (Vercel, Netlify, GitHub Pages, etc.).

---

## 🛠️ Tech Stack

| Tech | Purpose |
|------|---------|
| [Vite](https://vite.dev/) | Lightning-fast build tool |
| [React](https://react.dev/) | Component-based UI |
| [KaTeX](https://katex.org/) | Beautiful math rendering |
| Vanilla CSS | Custom design system with glassmorphism |

---

## 📂 Project Structure

```
src/
├── App.jsx              # Main app with navigation & progress tracking
├── components.jsx       # Reusable UI components (Math, Tableau, Quiz, TipCard)
├── index.css            # Full design system
├── main.jsx             # Entry point
└── sections/
    ├── SectionIntro.jsx        # Welcome & LP overview
    ├── SectionConversion.jsx   # Step 1: Constraint conversion
    ├── SectionTableau.jsx      # Step 2: Tableau construction
    ├── SectionDriveK.jsx       # Step 3: Driving out k
    ├── SectionPivot.jsx        # Steps 4-6: Pivoting & iteration
    ├── SectionSolution.jsx     # Reading the final answer
    └── SectionExam.jsx         # Final exam (3-variable problem)
```

---

## 📄 License

MIT — use it, share it, learn from it.

---

<p align="center">
  Built with ⚡ <strong>Big K</strong> energy
</p>
