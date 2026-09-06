Flipkart-Inspired Full-Stack E-Commerce Platform
A production-ready, full-stack e-commerce ecosystem built with the MERN stack (MongoDB, Express.js, React.js, Node.js). This project features a strict "Pure CSS" design architecture without reliance on external UI libraries, delivering a highly responsive, premium user experience. The system is split into a User Storefront and an Admin Control Panel, perfectly synchronized in real-time using Socket.IO.

🚀 Key Features
Admin Dashboard (Seller Control Center)
Premium Dark UI: AMOLED-optimized dark theme utilizing modern glassmorphism, glowing accents, and fluid transitions (Pure CSS).

Secure Authentication: JWT-based admin login and protected routing.

Advanced Product Management: Full CRUD capabilities with support for Flipkart-style data structures (Brand, MRP, Highlights, Description).

Multi-Image Handling: Drag-and-drop multiple image uploads with live frontend previews and seamless Cloudinary integration.

High-Res Image Viewer: Custom modal for inspecting high-resolution product imagery directly from the data grid.

User Storefront
Responsive Architecture: Fluid layouts that adapt flawlessly from desktop monitors to mobile devices.

Dynamic Product Grid: Flipkart-styled product cards featuring automatic discount calculations and review aggregates.

Product Details Page: Comprehensive view with interactive thumbnail galleries, sticky action buttons for mobile, and structured specification lists.

Real-Time Synchronization: Socket.IO integration ensures the user catalog instantly updates the moment an admin adds, edits, or deletes a product—zero page refreshes required.

💻 Tech Stack
Frontend: React.js, Vite, React Router DOM, Axios, Socket.IO Client.

Styling: Pure CSS (CSS Variables, Flexbox, CSS Grid, Glassmorphism).

Backend: Node.js, Express.js, Socket.IO.

Database: MongoDB Atlas, Mongoose.

Media Storage: Cloudinary, Multer.

Security & Auth: JSON Web Tokens (JWT), bcryptjs, CORS, Helmet.

📁 Project Structure
The repository is organized into a monorepo architecture containing three distinct applications:

Plaintext
ecommerce-project/
├── backend/            # Node.js/Express API & Socket.io server
├── admin-frontend/     # React Admin Dashboard (Port 5173)
├── user-frontend/      # React User Storefront (Port 5174)
├── .gitignore
└── README.md
⚙️ Environment Variables
To run this project locally, you must create .env files in all three directories with the following configurations.

1. backend/.env

Code snippet
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
FRONTEND_URL_USER=http://localhost:5174
FRONTEND_URL_ADMIN=http://localhost:5173
2. admin-frontend/.env

Code snippet
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
3. user-frontend/.env

Code snippet
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
🛠️ Installation & Setup
Clone the repository

Bash
git clone <your-repository-url>
cd ecommerce-project
Install Backend Dependencies

Bash
cd backend
npm install
Install Admin Frontend Dependencies

Bash
cd ../admin-frontend
npm install
Install User Frontend Dependencies

Bash
cd ../user-frontend
npm install
🏃‍♂️ Running the Project Locally
For the full real-time experience, you need to run all three servers simultaneously in separate terminal windows.

Terminal 1 (Backend):

Bash
cd backend
npm run dev
Terminal 2 (Admin Frontend):

Bash
cd admin-frontend
npm run dev
Terminal 3 (User Frontend):

Bash
cd user-frontend
npm run dev
User Storefront running at: http://localhost:5174

Admin Dashboard running at: http://localhost:5173

Backend API running at: http://localhost:5000

👨‍💻 Author
Shravan Kumar