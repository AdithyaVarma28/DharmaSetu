# DharmaSetu

DharmaSetu is an AI-powered legal-tech platform designed to bridge the gap between legal systems and citizens. It provides tools to make legal knowledge accessible, transparent, and actionable for everyone.

## Features

- **Legal Answer Assistant**: An AI chatbot that explains legal rights, civic duties, and government procedures in plain language.
- **Legal Language Simplifier**: Summarizes dense legal documents into easy-to-understand text.
- **Community Hub**: A platform for raising grievances, creating petitions, and tracking local issues.
- **Case Predictor and Resolution Tool**: Suggests probable outcomes and solutions based on historical data.
- **Contract Review and Compliance Checker**: Analyzes contracts for risks, missing clauses, and regulatory mismatches.
- **Multilingual Support**: Regional language support for better accessibility.

## Tech Stack

- **Frontend**: React, Next.js, TailwindCSS
- **Backend**: Python, FastAPI
- **AI Models**: Llama GPT-based models
- **Other Tools**: Radix UI, Lucide Icons

## Installation

### Prerequisites

- Node.js (v18 or higher)
- Python (v3.9 or higher)
- pnpm (preferred package manager)

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/DharmaSetu.git
   cd DharmaSetu
   ```

2. Install frontend dependencies:
   ```bash
   cd frontend
   pnpm install
   ```

3. Install backend dependencies:
   ```bash
   cd ../backend
   pip install -r requirements.txt
   ```

4. Set up environment variables:
   - Create `.env` files in both `frontend` and `backend` directories.
   - Refer to `.env.example` for required variables.

5. Start the development servers:
   - Frontend:
     ```bash
     cd frontend
     pnpm dev
     ```
   - Backend:
     ```bash
     cd ../backend
     uvicorn main:app --reload
     ```

6. Access the application:
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:8000`

## Contribution Guidelines

We welcome contributions to DharmaSetu! Here's how you can help:

1. Fork the repository and create a new branch for your feature or bug fix.
2. Make your changes and ensure they are well-documented.
3. Run tests to verify your changes.
4. Submit a pull request with a detailed description of your changes.

### Code Style

- Follow the ESLint and Prettier configurations for the frontend.
- Use PEP 8 guidelines for Python code in the backend.
