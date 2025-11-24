export function BlogDetail({ API_URL, user, onPageChange }) {
    const [blog, setBlog] = React.useState(null);
    const [comment, setComment] = React.useState('');
    const blogId = localStorage.getItem('selectedBlogId');
  
    React.useEffect(() => {
      if (blogId) fetchBlog();
    }, [blogId]);
  
    const fetchBlog = async () => {
      try {
        const res = await fetch(`${API_URL}/blogs/${blogId}`);
        const data = await res.json();
        if (data.success) {
          setBlog(data.blog);
        }
      } catch (err) {
        console.error('Fetch failed:', err);
      }
    };
  
    const handleLike = async () => {
      if (!user) {
        alert('Please login to like');
        return;
      }
      try {
        await fetch(`${API_URL}/blogs/${blogId}/like`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id })
        });
        fetchBlog();
      } catch (err) {
        console.error('Like failed:', err);
      }
    };
  
    const handleComment = async (e) => {
      e.preventDefault();
      if (!user) {
        alert('Please login to comment');
        return;
      }
      try {
        await fetch(`${API_URL}/blogs/${blogId}/comment`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id, text: comment })
        });
        setComment('');
        fetchBlog();
      } catch (err) {
        console.error('Comment failed:', err);
      }
    };
  
    if (!blog) return <p>Loading...</p>;
  
    return (
      <div className="blog-detail">
        <button onClick={() => onPageChange('all-blogs')}>← Back</button>
        <h1>{blog.title}</h1>
        <p className="author">by {blog.User.firstName} {blog.User.lastName}</p>
        {blog.images && <img src={blog.images} alt="blog" />}
        <div className="blog-body">{blog.body}</div>
        <div className="engagement">
          <button onClick={handleLike}>👍 Like ({blog.Likes?.length || 0})</button>
          <span>💬 Comments ({blog.Comments?.length || 0})</span>
        </div>
        <div className="comments-section">
          <h3>Comments</h3>
          {user && (
            <form onSubmit={handleComment}>
              <textarea placeholder="Write a comment..." value={comment} onChange={(e) => setComment(e.target.value)} required />
              <button type="submit">Post Comment</button>
            </form>
          )}
          <div className="comments-list">
            {blog.Comments?.map(c => (
              <div key={c.id} className="comment">
                <strong>{c.User.firstName}</strong>: {c.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }