# Backend API

A Node.js backend server built with Express.js and MongoDB for managing counter operations.

## 🚀 Features

- RESTful API for counter management
- MongoDB integration with Mongoose
- CORS enabled for cross-origin requests
- TypeScript support
- Environment variable configuration
- Hot reloading in development mode

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB database
- npm or yarn package manager

## 🛠️ Installation

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```env
   MONGOURI=your_mongodb_connection_string
   PORT=3000
   ```

## 🏃‍♂️ Running the Application

### Development Mode

```bash
npm run dev
```

This will start the server with hot reloading using nodemon.

### Production Mode

```bash
npm start
```

The server will start on the port specified in your `.env` file (default: 3000).

## 📡 API Endpoints

### Base URL

```
http://localhost:3000
```

### Health Check

- **GET** `/` - Returns server status

### Counter Operations

- **GET** `/counter` - Get current counter value
- **POST** `/counter/update` - Update counter value

#### Get Counter

```bash
curl http://localhost:3000/counter
```

Response:

```json
{
  "counter": {
    "_id": "...",
    "count": 0,
    "__v": 0
  }
}
```

#### Update Counter

```bash
curl -X POST http://localhost:3000/counter/update \
  -H "Content-Type: application/json" \
  -d '{"count": 5}'
```

Response:

```json
{
  "counter": {
    "_id": "...",
    "count": 5,
    "__v": 0
  }
}
```

## 🗄️ Database Schema

### Counter Model

```typescript
{
  count: Number (required, default: 0)
}
```

## 🏗️ Project Structure

```
backend/
├── models/
│   └── counterModel.ts      # Mongoose schema for Counter
├── routes/
│   └── counterRoutes.ts     # Counter API routes
├── server.ts               # Main server file
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── README.md              # This file
```

## 🔧 Technologies Used

- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB object modeling
- **TypeScript** - Type safety
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management
- **nodemon** - Development hot reloading

## 🌐 Environment Variables

| Variable   | Description               | Default  |
| ---------- | ------------------------- | -------- |
| `MONGOURI` | MongoDB connection string | Required |
| `PORT`     | Server port               | 3000     |

## 📝 Development Notes

- The server uses ES modules (`"type": "module"` in package.json)
- TypeScript files are executed directly using ts-node/esm loader
- Counter operations use upsert functionality to ensure a single counter document exists
- All routes are prefixed with `/counter` for counter-related operations

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**

   - Ensure MongoDB is running
   - Check your `MONGOURI` environment variable
   - Verify database permissions

2. **Port Already in Use**

   - Change the `PORT` in your `.env` file
   - Kill the process using the port: `lsof -ti:3000 | xargs kill`

3. **TypeScript Compilation Errors**
   - Run `npm install` to ensure all dependencies are installed
   - Check `tsconfig.json` configuration

## 📄 License

This project is part of ProjectX and follows the same licensing terms.
