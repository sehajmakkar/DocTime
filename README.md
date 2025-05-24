# DocTime - Doctor Appointment Booking Platform

A comprehensive doctor appointment booking platform built with modern web technologies, featuring Role-Based Access Control (RBAC) and separate interfaces for users, administrators, and doctors.

## 🏥 Features

### User Features
- Browse and search doctors by speciality
- Book appointments with available doctors
- View and manage personal appointments
- User profile management
- Responsive design for all devices

### Doctor Features
- Doctor dashboard with appointment overview
- Manage appointment schedules
- Update profile and availability
- View patient appointment history

### Admin Features
- Comprehensive admin dashboard
- Add and manage doctors
- View all appointments across the platform
- Manage doctor profiles and specialities
- Platform analytics and insights

### System Features
- **Role-Based Access Control (RBAC)** - Secure authentication and authorization
- **Multi-panel Architecture** - Separate interfaces for different user roles
- **Cloud Integration** - Image storage with Cloudinary
- **Responsive Design** - Mobile-first approach

## 🚀 Tech Stack

### Frontend
- **React.js** - User interface library
- **Vite** - Build tool and development server
- **CSS3** - Styling and animations
- **Context API** - State management

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

### Additional Technologies
- **Cloudinary** - Image storage and management
- **Multer** - File upload handling
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing

## 📁 Project Structure

```
sehajmakkar-doctime/
├── admin/          # Admin panel (React)
├── backend/        # Server-side application
└── frontend/       # User-facing application (React)
```

### Backend Structure
```
backend/
├── config/         # Database and third-party service configurations
├── controllers/    # Route handlers for different user roles
├── middlewares/    # Authentication and authorization middlewares
├── models/         # Database schemas
└── routes/         # API route definitions
```

### Frontend Structure
```
frontend/ & admin/
├── src/
│   ├── components/ # Reusable UI components
│   ├── context/    # State management
│   ├── pages/      # Application pages
│   └── assets/     # Static assets
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment variables file (`.env`):
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   PORT=5000
   ```

4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

### Admin Panel Setup
1. Navigate to the admin directory:
   ```bash
   cd admin
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## 🔐 Authentication & Authorization

The platform implements Role-Based Access Control with three distinct user roles:

- **Users**: Can book appointments and manage their profile
- **Doctors**: Can manage their schedule and view appointments
- **Admins**: Full platform management capabilities

Each role has dedicated middleware for route protection and access control.

## 📊 Database Models

### User Model
- Personal information
- Authentication credentials
- Appointment history

### Doctor Model
- Professional information
- Speciality and qualifications
- Availability schedule
- Profile image

### Appointment Model
- Patient and doctor references
- Appointment date and time
- Status tracking
- Payment information

## 🌐 API Endpoints

### User Routes (`/api/user`)
- `POST /register` - User registration
- `POST /login` - User authentication
- `GET /profile` - Get user profile
- `POST /book-appointment` - Book appointment

### Doctor Routes (`/api/doctor`)
- `POST /login` - Doctor authentication
- `GET /appointments` - Get doctor appointments
- `PUT /profile` - Update doctor profile

### Admin Routes (`/api/admin`)
- `POST /login` - Admin authentication
- `POST /add-doctor` - Add new doctor
- `GET /doctors` - Get all doctors
- `GET /appointments` - Get all appointments

## 🚀 Deployment

### Backend Deployment
1. Set up environment variables on your hosting platform
2. Deploy to services like Render, Railway, or DigitalOcean
3. Ensure MongoDB connection is configured for production

### Frontend Deployment
1. Build the applications:
   ```bash
   npm run build
   ```
2. Deploy to services like Vercel, Netlify, or AWS S3
3. Update API endpoints to point to production backend

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Sehaj Makkar**
- GitHub: [@sehajmakkar](https://github.com/sehajmakkar)

## 🙏 Acknowledgments

- Thanks to all contributors who helped build this platform
- Special thanks to the healthcare professionals who provided insights for the user experience
- Built with modern web technologies and best practices

---

For more information, please contact the development team or check the individual README files in each directory for specific setup instructions.
