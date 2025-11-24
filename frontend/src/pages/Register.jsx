export function Register({ API_URL }) {
    const [form, setForm] = React.useState({
      firstName: '', lastName: '', email: '', password: '', phoneNo: '', dob: '', userType: 'reader'
    });
  
    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await fetch(`${API_URL}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form)
        });
        const data = await res.json();
        if (data.success) {
          alert('Registration successful! Please login.');
        } else {
          alert(data.error);
        }
      } catch (err) {
        alert('Registration failed: ' + err.message);
      }
    };
  
    return (
      <div className="auth-container">
        <form onSubmit={handleSubmit} className="auth-form">
          <h2>Register</h2>
          <input type="text" name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} required />
          <input type="text" name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
          <input type="tel" name="phoneNo" placeholder="Phone No" value={form.phoneNo} onChange={handleChange} required />
          <input type="date" name="dob" value={form.dob} onChange={handleChange} required />
          <select name="userType" value={form.userType} onChange={handleChange}>
            <option value="reader">Reader</option>
            <option value="author">Author</option>
          </select>
          <button type="submit">Register</button>
        </form>
      </div>
    );
  }