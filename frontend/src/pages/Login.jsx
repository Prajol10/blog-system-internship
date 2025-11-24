export function Login({ API_URL, onLogin }) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await fetch(`${API_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (data.success) {
          onLogin(data.user);
        } else {
          alert(data.error);
        }
      } catch (err) {
        alert('Login failed: ' + err.message);
      }
    };
  
    return (
      <div className="auth-container">
        <form onSubmit={handleSubmit} className="auth-form">
          <h2>Login</h2>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }