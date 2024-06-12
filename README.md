# Aerchain Dashboard

## Getting Started

### Prerequisites

- Node.js and npm installed
- Git installed

### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/AjithkumarJM/aerchain-dashboard/
   ```
2. Navigate to the backend folder and install dependencies
   ```sh
   cd backend
   npm install
   ```
3. Start the backend server
   ```sh
   node server.js
   ```
4. Open a new terminal, navigate to the frontend folder, and install dependencies
   ```sh
   cd ../frontend
   npm install
   ```
5. Start the frontend development server
   ```sh
   npm run dev
   ```
6. Open your browser and navigate to `http://localhost:3001` to see the application running.
7. Open `http://localhost:3001` to see the BE data.

### Notes

- The frontend consumes data from localhost:3000, which can be easily scaled for production by updating the URL.
- The db.json file stores all the data but can be replaced with a more robust backend database solution like MongoDB, PostgreSQL, or GraphQL.
- The header component currently displays a static logo. It can be further enhanced with additional functionality if required.
- The application includes functionality to update the transporter and last ping time, but further enhancements can be made to include more fields or actions.
- No external libraries like Axios, React Router, or Redux have been used, as the application is a single-page application and uses React context for state management.
- Components like Cards, AddTripForm, and UpdateStatusForm can be further scaled and broken down into smaller, more reusable components. Due to time constraints, these components are currently as they are.

### Contact

- email: ajithkumarjm@gmail.com
