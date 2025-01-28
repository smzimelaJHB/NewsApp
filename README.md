# Scalable News Web Application

## Overview
This is a scalable news web application built using Node.js, Express.js, EJS templates, Bootstrap, PostgreSQL, and TypeScript for type safety and code maintainability. The application supports authentication for admin users, CRUD operations for news articles, and search functionality. Regular users can only view articles.

## Features

### Authentication
- **Admin Login**:
  - admin login default username and password
  ```bash 
    username: xman@gmail.com 
    password: xman 
  ```
  - Only admins can log in.
  - Authentication implemented using session-based or token-based methods.

### News Articles
- Each article includes:
  - Title
  - Image
  - Rich text content (using a WYSIWYG editor).
  - Tags
- Admin functionalities:
  - Create articles.
  - Read all articles.
  - Update articles.
  - Delete articles.
- Regular user functionalities:
  - View articles only.
- Articles are paginated for easy navigation.

### Search Functionality
- Search for articles by:
  - Title
  - Tags

### Frontend
- **Design**:
  - Built with Bootstrap for styling and responsiveness.
  - Includes a navigation bar with links to Home, Admin Login, and Search.
- **Pages**:
  - **Home Page**: Displays a list of all articles.
  - **Article Page**: Displays a single article with full content.
  - **Admin Dashboard**: Accessible only to logged-in admins. Includes:
    - List of articles with options to edit or delete.
    - Form to create a new article.
  - **Login Page**: Form for admin login.

### Validation and Error Handling
- Input validation for all forms (e.g., login, create/edit article).
- Meaningful error messages on invalid inputs or failed operations.

### Setup and Deployment
- Detailed installation steps and database setup instructions included.
- Optionally deployable on a cloud platform.

## Installation Steps

### Prerequisites
- Node.js (v16 or above)
- PostgreSQL (v13 or above)
- TypeScript

### Steps
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the database:
   - Create a PostgreSQL database.
   - Update the `.env` file with the database credentials:
     ```env
     DB_URL=database-url
     ```
     ```
4. Build the TypeScript code:
   ```bash
   npm run build
   ```
5. Start the application:
   ```bash
   npm start
   ```

## Running Locally
1. Start the PostgreSQL server.
2. Run the following command:
   ```bash
   npm run dev
   ```
3. Access the app in your browser at `http://localhost:3000`.

## Key Scripts
- `npm run dev`: Start the app in development mode.
- `npm run build`: Compile TypeScript to JavaScript.
- `npm start`: Start the app in production mode.



