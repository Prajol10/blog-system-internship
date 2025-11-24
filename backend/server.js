const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Database connection
const sequelize = new Sequelize(
  process.env.DB_NAME || 'blog_system',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: process.env.DB_DIALECT || 'mysql',
    logging: false
  }
);

// Models
const User = sequelize.define('User', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  middleName: {
    type: Sequelize.STRING,
    allowNull: true
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  dob: {
    type: Sequelize.DATE,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  phoneNo: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  userType: {
    type: Sequelize.ENUM('admin', 'author', 'reader'),
    allowNull: false
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
}, { timestamps: false });

const Blog = sequelize.define('Blog', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  images: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  status: {
    type: Sequelize.ENUM('published', 'draft', 'rejected'),
    defaultValue: 'draft'
  },
  createdBy: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
}, { timestamps: false });

const Like = sequelize.define('Like', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  blogId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Blog,
      key: 'id'
    }
  }
}, { timestamps: false });

const Comment = sequelize.define('Comment', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  text: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  blogId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Blog,
      key: 'id'
    }
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
}, { timestamps: false });

// Routes
// 1. AUTH & USER MANAGEMENT
app.post('/api/auth/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password, phoneNo, dob, userType, middleName } = req.body;
    const user = await User.create({
      firstName,
      middleName,
      lastName,
      email,
      password,
      phoneNo,
      dob,
      userType: userType || 'reader'
    });
    res.json({ success: true, userId: user.id });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email, password } });
    if (!user) return res.status(401).json({ success: false, error: 'Invalid credentials' });
    res.json({ success: true, user });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// Get all users (Admin only)
app.get('/api/users', async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = 10;
    const offset = (page - 1) * limit;
    const { count, rows } = await User.findAndCountAll({ limit, offset });
    res.json({ success: true, users: rows, total: count, page, pages: Math.ceil(count / limit) });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// Update user (Admin)
app.put('/api/users/:id', async (req, res) => {
  try {
    const user = await User.update(req.body, { where: { id: req.params.id } });
    res.json({ success: true, message: 'User updated' });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// 2. BLOG MANAGEMENT
app.post('/api/blogs', async (req, res) => {
  try {
    const { title, body, images, createdBy } = req.body;
    const blog = await Blog.create({ title, body, images, createdBy, status: 'draft' });
    res.json({ success: true, blogId: blog.id });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// Get blogs by author with date filter
app.get('/api/blogs/author/:authorId', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    let where = { createdBy: req.params.authorId };
    
    if (startDate && endDate) {
      where.createdAt = {
        [Sequelize.Op.between]: [new Date(startDate), new Date(endDate)]
      };
    }
    
    const blogs = await Blog.findAll({ where, include: User });
    res.json({ success: true, blogs });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// Get all published blogs for public view
app.get('/api/blogs/public/all', async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      where: { status: 'published' },
      include: [{ model: User, attributes: ['firstName', 'lastName'] }]
    });
    res.json({ success: true, blogs });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// Get single blog with likes and comments
app.get('/api/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findOne({
      where: { id: req.params.id },
      include: [
        { model: User, attributes: ['firstName', 'lastName'] },
        { model: Like },
        { model: Comment, include: User }
      ]
    });
    res.json({ success: true, blog });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// Update blog status (Admin moderation)
app.put('/api/blogs/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    await Blog.update({ status }, { where: { id: req.params.id } });
    res.json({ success: true, message: 'Blog status updated' });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// Like blog
app.post('/api/blogs/:blogId/like', async (req, res) => {
  try {
    const { userId } = req.body;
    const existing = await Like.findOne({ where: { blogId: req.params.blogId, userId } });
    if (existing) return res.json({ success: false, message: 'Already liked' });
    await Like.create({ blogId: req.params.blogId, userId });
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// Comment on blog
app.post('/api/blogs/:blogId/comment', async (req, res) => {
  try {
    const { userId, text } = req.body;
    await Comment.create({ blogId: req.params.blogId, userId, text });
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// Get blog analytics (raw SQL)
app.get('/api/blogs/:blogId/analytics', async (req, res) => {
  try {
    const result = await sequelize.query(`
      SELECT 
        b.id,
        b.title,
        u.firstName,
        u.lastName,
        COUNT(DISTINCT l.id) as likeCount,
        COUNT(DISTINCT c.id) as commentCount
      FROM blogs b
      LEFT JOIN users u ON b.createdBy = u.id
      LEFT JOIN likes l ON b.id = l.blogId
      LEFT JOIN comments c ON b.id = c.blogId
      WHERE b.id = ?
      GROUP BY b.id
    `, { replacements: [req.params.blogId], type: Sequelize.QueryTypes.SELECT });
    
    res.json({ success: true, analytics: result[0] });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// Database sync and start server
sequelize.sync().then(() => {
  app.listen(5000, () => {
    console.log('Server running on port 5000');
  });
}).catch(err => console.log('Database error:', err));