# Note Vault

Note Vault is a secure, user-friendly application designed to help you organize, store, and manage your notes effectively. With a modern and intuitive interface, you can create, edit, search, and categorize notes with ease. Note Vault ensures your data is safe and accessible across platforms.

---

## Features

- **Create Notes**: Add your thoughts and ideas with a simple, rich-text editor.
- **Organized Storage**: Categorize and tag your notes for easy management and retrieval.
- **Search Functionality**: Quickly find notes with powerful search capabilities.
- **Secure Data**: Data encryption and user authentication to ensure privacy.
- **Cross-Platform Access**: Access your notes from any device with a consistent experience.

---

## Technology Stack

Note Vault is built using modern web technologies to ensure scalability, performance, and ease of use.

**Frontend**:
- React (TypeScript)
- Styled with CSS and other modern UI design tools
- Vite (for faster builds during development and production)

**Backend**:
- Node.js + Express
- Database: MongoDB or SQL (as per implementation preference)

This stack ensures a responsive UI and robust backend support for dynamic API calls.

---

## Setup and Installation

### Prerequisites
Make sure you have the following installed on your system:
- Node.js (v16 or higher)
- npm (v8 or higher) or yarn
- MongoDB (if using MongoDB for storage)

### Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/sapphire2207/note-vault.git
   cd note-vault
   ```

2. **For the backend setup**:
   - Navigate to the `backend` folder:
     ```bash
     cd backend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Set up environment variables:
     - Create a `.env` file in the `backend` directory and configure the required settings such as database credentials and JWT secret.

   - Start the backend server:
     ```bash
     npm start
     ```

3. **For the frontend setup**:
   - Navigate to the `frontend` folder:
     ```bash
     cd ../frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the development server:
     ```bash
     npm run dev
     ```

4. Open the application by visiting `http://localhost:3000` (or the port specified).

---

## Project Structure

```
note-vault/
├── backend/       # Server-side code (Node.js, Express, database configurations)
├── frontend/      # Client-side code (React, Vite)
├── README.md      # Project documentation
```

---
