BlogHub - Blogging System

A full-stack blogging application built with React.js, Node.js/Express, and MySQL that allows users to create, read, and interact with blog posts.

  Features

User Management
- Three User Types: Admin, Author, Reader
- User Registration and Login
- Admin can view all registered users with pagination
- User profile with First Name, Last Name, Email, Phone, DOB

 Blog Management
- Authors can create blog posts with title, body, and images
- Posts can be saved as draft or published
- Admin can moderate and approve/reject posts
- Filter blog posts by date range
- Public viewing of all published blogs

 Engagement Features
- Readers can like blog posts
- Registered users can comment on blogs
- Real-time like and comment counts
- Analytics dashboard showing likes and comments per post

 Admin Features
- Manage all users with pagination
- Moderate blog posts (approve/reject/publish)
- View analytics for all blog posts

 Technology Stack

- Frontend: React.js 18+
- Backend: Node.js with Express.js
- Database: MySQL
- ORM: Sequelize
- Styling: CSS3
- Version Control: Git

 Installation & Setup

 Prerequisites
- Node.js (v14 or higher)
- MySQL server running locally
- Git

Backend Setup

1. Navigate to backend folder**
`''bash
cd backend
```

2. Install dependencies**
```bash
npm install
```

3. Create .env file
Create a `.env` file in the backend root:
```
DB_NAME=blog_system
DB_USER=root
DB_PASSWORD=your_password
DB_HOST=localhost
DB_DIALECT=mysql
NODE_ENV=development
```

4. Create MySQL Database
```sql
CREATE DATABASE blog_system;
```

5. Start the server**
```bash
npm start
```
Server runs on `http://localhost:5000`

 Frontend Setup

1. Navigate to frontend folder
```bash
cd frontend
```

2. Install dependencies
```bash
npm install
```

3. Start React app
```bash
npm start
```
App opens at `http://localhost:3000`

 How to Use

 For Readers
1. Click "All Blogs" to see published blog posts
2. Click any blog card to read the full post
3. Sign up to comment and like blog posts

 For Authors
1. Register as an "Author"
2. Click "Create Blog" to write a new post
3. Go to "My Blogs" to manage your posts
4. Check "Analytics" to see likes and comments on your posts

 For Admins
1. Register as an "Admin" or request admin access
2. Go to "Users" to see all registered users
3. Check "Analytics" to view all blog statistics

 Database Schema

 Tables

users
- id (Primary Key)
- firstName, middleName, lastName
- email, phoneNo
- password (stored as plain text for demo - use hashing in production)
- userType (admin, author, reader)
- createdAt

blogs
- id (Primary Key)
- title, body
- images (stored as base64)
- status (draft, published, rejected)
- createdBy (Foreign Key to users)
- createdAt

likes
- id (Primary Key)
- userId (Foreign Key to users)
- blogId (Foreign Key to blogs)

comments
- id (Primary Key)
- text
- userId (Foreign Key to users)
- blogId (Foreign Key to blogs)
- createdAt

 API Endpoints

Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

Users
- `GET /api/users?page=1` - Get all users (paginated)
- `PUT /api/users/:id` - Update user (Admin only)

Blogs
- `POST /api/blogs` - Create blog post
- `GET /api/blogs/author/:authorId` - Get author's blogs
- `GET /api/blogs/public/all` - Get all published blogs
- `GET /api/blogs/:id` - Get single blog with comments/likes
- `PUT /api/blogs/:id/status` - Update blog status (Admin)
- `POST /api/blogs/:blogId/like` - Like a blog
- `POST /api/blogs/:blogId/comment` - Comment on blog
- `GET /api/blogs/:blogId/analytics` - Get blog analytics

User Types & Permissions

Reader
- View all published blogs
- Like and comment on blogs
- View their profile

 Author
- All Reader permissions
- Create new blog posts
- Edit their own posts
- View analytics on their posts
- Filter posts by date range

 Admin
- View all registered users
- Moderate blog posts
- View analytics for all blogs
- Manage user accounts

 Screenshots

[To be added after running the application]

 Home Page
- Navigation bar with all menu options
- Public blogs displayed as cards

Login Page
- Simple login form with email and password

Create Blog
- Form to create new blog with title, body, and image upload

 Blog Detail
- Full blog content with author name
- Like button with count
- Comments section with user comments

 User Management
- Table showing all registered users with pagination
- Admin can view user details

Analytics
- Shows likes and comments count for each blog
- Real-time statistics

 Git Workflow

This project uses Git for version control. Check commit history to see the evolution of the solution:

```bash
git log --oneline
```

Key commits show:
1. Initial project setup
2. Database schema and models
3. Backend API endpoints
4. Frontend components
5. Styling and UI improvements
6. Bug fixes and optimizations

 Important Notes

- Confidentiality: Do not share this project externally as per requirements
- Password Security: In production, use bcrypt to hash passwords (currently stored as plain text for demo)
- Image Storage: Images are stored as base64 in database (use cloud storage like S3 in production)
- CORS: Enabled for localhost:3000 - configure for production domains

 Additional Features

- Responsive design that works on mobile and desktop
- Smooth pagination for user listings
- Date range filtering for blog posts
- Real-time engagement metrics
- Error handling and validation

Contributing

For future improvements, consider:
- Adding blog post editing capability for authors
- Implementing search functionality
- Adding blog categories/tags
- User profile customization
- Email notifications

 Contact

For queries or issues:
- Contact: prajolghimire10023@gmail.com
           9864579439

---

Last Updated: 2025
Status: Complete and Ready for Deployment
