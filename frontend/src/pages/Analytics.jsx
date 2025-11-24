export function Analytics({ API_URL, user }) {
    const [analytics, setAnalytics] = React.useState(null);
    const [blogId, setBlogId] = React.useState('');
  
    const fetchAnalytics = async (e) => {
      e.preventDefault();
      try {
        const res = await fetch(`${API_URL}/blogs/${blogId}/analytics`);
        const data = await res.json();
        if (data.success) {
          setAnalytics(data.analytics);
        }
      } catch (err) {
        console.error('Fetch failed:', err);
      }
    };
  
    if (user.userType === 'admin' || user.userType === 'author') {
      return (
        <div className="analytics">
          <h2>Blog Analytics</h2>
          <form onSubmit={fetchAnalytics}>
            <input type="number" placeholder="Blog ID" value={blogId} onChange={(e) => setBlogId(e.target.value)} required />
            <button type="submit">Get Analytics</button>
          </form>
          {analytics && (
            <div className="analytics-result">
              <p><strong>Title:</strong> {analytics.title}</p>
              <p><strong>Author:</strong> {analytics.firstName} {analytics.lastName}</p>
              <p><strong>Likes:</strong> {analytics.likeCount}</p>
              <p><strong>Comments:</strong> {analytics.commentCount}</p>
            </div>
          )}
        </div>
      );
    }
    return <p>Access Denied.</p>;
  }