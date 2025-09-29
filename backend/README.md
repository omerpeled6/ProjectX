# Backend API

A basic Node.js Express application with TypeScript.

## Features

- TypeScript support
- Express.js framework
- CORS enabled
- Environment variable support
- Error handling middleware
- Health check endpoint
- Development and production scripts

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the root directory:

```bash
NODE_ENV=development
PORT=3000
```

### Development

Run the development server with hot reload:

```bash
npm run dev
```

The server will start on `http://localhost:3000`

### Production

1. Build the project:

```bash
npm run build
```

2. Start the production server:

```bash
npm start
```

## API Endpoints

- `GET /` - Welcome message
- `GET /health` - Health check endpoint

## Project Structure

```
backend/
├── src/
│   ├── app.ts          # Express app configuration
│   └── server.ts       # Server startup
├── dist/               # Compiled JavaScript (generated)
├── package.json
├── tsconfig.json
└── README.md
```
