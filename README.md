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
6. Open your browser and navigate to `http://localhost:3000` to see the application running.

### Notes

- FE consumes, the localhost:3000 port currently for data, the port is hardcoded right now, It can also be scaled for production.
- The db.json file is where all the data is stored, can be replaced with BE database, graphQL etc
- The header only has the logo, but due to its static functionality, I haven't focussed much on it.
- I have a few questions left regarding the calculation of udpateStatus functionality. for now, I am updating transporter, lastPingTime.
- no axios, react router, redux has been used as this is just a single page application, used react context

### Contact

- email: ajithkumarjm@gmail.com
