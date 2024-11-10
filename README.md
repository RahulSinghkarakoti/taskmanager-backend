 
# Task Manager (Backend)

## Description
The Task Manager backend is built using Node.js, Express, and MongoDB (via Mongoose). It handles all task-related operations such as adding, editing, deleting, and marking tasks as completed. The backend includes a cron job for marking expired tasks automatically. This backend API is designed to be used by the frontend Task Manager app, providing a seamless experience for users to manage their tasks.

## Installation Instructions

To set up the Task Manager backend locally, follow these steps:

### Prerequisites
- Node.js (v14 or higher)
- npm (Node package manager)

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/RahulSinghkarakoti/taskmanager-backend.git
   cd task-manager-backend
   ```

2. **Install dependencies**:
   Run the following command to install the required Node.js packages:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and add the following environment variables:
   ```
   MONGO_URI=<your-mongo-db-connection-string>
   CORS_ORIGIN=* //or any your domain/ip
   PORT=8000
   ```

4. **Start the server**:
   Run the application in development mode:
   ```bash
   npm run dev
   ```
   The backend API will be available at `http://localhost:8000`.

 

## Directory Structure
```
/src
  /controllers    - Contains the logic for handling requests and responses
    /exampleController.js  - Example controller file
  /models         - Contains Mongoose models for database schema
    /exampleModel.js      - Example model file
  /middleware     - Custom middleware functions like authentication
    /authMiddleware.js    - Example middleware file
  /routes         - Contains route handlers
    /exampleRoute.js      - Example route file
  /services       - Business logic services
    /exampleService.js    - Example service file
  /config          - Configuration files like database connection
    /db.js            - Database connection configuration
  index.js        - Main entry point of the application
```

## API Endpoints

- `POST /tasks` - Create a new task.
- `GET /tasks` - Get all tasks.
- `GET /tasks/:id` - Get a single task by its ID.
- `PUT /tasks/:id` - Update an existing task.
- `DELETE /tasks/:id` - Delete a task.
- `PATCH /tasks/:id/complete` - Mark a task as completed.
  
## Features

- **Task Creation**: Add tasks with a title, description, and deadline.
- **Task Management**: Edit, delete, and mark tasks as completed.
- **Cron Job for Expiry**: Automatically mark expired tasks using a cron job.
- **Environment Configuration**: Managed via dotenv for ease of setup.
  
## Technologies Used

- **Node.js** - JavaScript runtime for building the backend.
- **Express.js** - Web framework for handling HTTP requests and responses.
- **MongoDB & Mongoose** - NoSQL database and ODM for managing task data.
- **node-cron** - Library for scheduling cron jobs to manage task expiry.
- **CORS** - Middleware to enable cross-origin resource sharing.
- **dotenv** - For environment variable management.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
 