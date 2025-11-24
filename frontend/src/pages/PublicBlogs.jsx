export function PublicBlogs({ API_URL, onPageChange }) {
    const [blogs, setBlogs] = React.useState([]);
    const [selectedBlogId, setSelectedBlogId] = React.useState(null);
  
    React.useEffect(() => {
      fetchBlogs();
    }, []);
  
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${API_URL}/blogs/public/all`);
        const data = await res.json();
        if (data.success) {
          setBlogs(data.blogs);
        }
      } catch (err) {
        console.error('Fetch failed:', err);
      }
    };
  
    const handleBlogClick = (blogId) => {
      localStorage.setItem('selectedBlogId', blogId);
      onPageChange('blog-detail');
    };
  
    return (
      <div className="public-blogs">
        <h2>All Blog Posts</h2>
        <div className="blogs-grid">
          {blogs.map(blog => (
            <div key={blog.id} className="blog-card" onClick={() => handleBlogClick(blog.id)}>
              <h3>{blog.title}</h3>
              <p className="author">by {blog.User.firstName} {blog.User.lastName}</p>
              <p className="excerpt">{blog.body.substring(0, 100)}...</p>
              <small>{new Date(blog.createdAt).toLocaleDateString()}</small>
            </div>
          ))}
        </div>
      </div>
    );
  }