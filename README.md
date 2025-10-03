# Store Rating System

A full-stack web application for store ratings with role-based access control.

## Tech Stack
- **Backend**: Express.js, PostgreSQL, JWT Authentication
- **Frontend**: React.js, Axios
- **Database**: PostgreSQL

## Features

### System Administrator
- Dashboard with total users, stores, and ratings
- Add new users (admin, normal, store_owner)
- Add new stores with store owner selection
- View and filter users and stores
- Complete user and store management

### Normal User
- User registration and login
- View all stores with ratings
- Search stores by name and address
- Submit and modify ratings (1-5 stars)
- Update password

### Store Owner
- View store performance dashboard
- See average rating and customer reviews
- View list of users who rated their store
- Update password

## Setup Instructions

### Backend Setup
1. Navigate to backend directory:
   ```bash
   cd backend
   npm install
   ```

2. Setup PostgreSQL database:
   - Create a PostgreSQL database named `store_rating_db`
   - Update `.env` file with your database credentials
   - Run the SQL script: `psql -d store_rating_db -f database.sql`

3. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to frontend directory:
   ```bash
   cd frontend
   npm install
   ```

2. Start the React development server:
   ```bash
   npm start
   ```

## Default Credentials
- **Admin**: admin@system.com / Admin123!
- **Store Owner 1**: owner1@store.com / Admin123!
- **Store Owner 2**: owner2@store.com / Admin123!
- **Normal User 1**: user1@email.com / Admin123!
- **Normal User 2**: user2@email.com / Admin123!

## Form Validations
- **Name**: 20-60 characters
- **Address**: Max 400 characters  
- **Password**: 8-16 characters, uppercase + special character
- **Email**: Standard email validation
- **Rating**: 1-5 stars only

## API Endpoints

### Authentication
- POST `/api/auth/register` - User registration
- POST `/api/auth/login` - User login
- PUT `/api/auth/password` - Update password

### Admin Routes
- GET `/api/admin/dashboard` - Dashboard stats
- GET `/api/admin/users` - List users with filters
- GET `/api/admin/stores` - List stores with filters
- GET `/api/admin/store-owners` - List store owners
- POST `/api/admin/users` - Add new user
- POST `/api/admin/stores` - Add new store

### Store Routes
- GET `/api/stores` - List stores for normal users
- POST `/api/stores/:id/rating` - Submit/update rating

### Store Owner Routes
- GET `/api/store-owner/dashboard` - Store performance data

## Database Schema
- **users**: id, name, email, password, address, role, created_at
- **stores**: id, name, email, address, owner_id, created_at
- **ratings**: id, user_id, store_id, rating, created_at, updated_at

## Key Features
- ✅ Role-based authentication (admin, normal, store_owner)
- ✅ Form validations with proper error handling
- ✅ Admin can create store owners and assign stores
- ✅ Store owner dashboard with ratings analytics
- ✅ Normal users can rate stores
- ✅ Search and filtering capabilities
- ✅ Sorting support for all tables
- ✅ Sample data for testing

## Security Features
- JWT token authentication
- Password hashing with bcrypt
- Role-based access control
- Input validation and sanitization
- SQL injection prevention# Roxiler-Systems-Internship-Project
