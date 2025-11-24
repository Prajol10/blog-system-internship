export function Dashboard({ user }) {
    return (
      <div className="dashboard">
        <h1>Welcome, {user.firstName}!</h1>
        <div className="dashboard-info">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>User Type:</strong> {user.userType}</p>
          <p><strong>Phone:</strong> {user.phoneNo}</p>
        </div>
      </div>
    );
  }