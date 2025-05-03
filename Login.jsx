import React, { useState } from 'react';
import './Auth.css';
import { useAuth } from '../../context/AuthContext';
import TwitterLogo from '../Logo/TwitterLogo';

function Login({ onToggleForm }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { loginUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      await loginUser(email, password);
    } catch (err) {
      setError(err.msg || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth">
      <div className="auth__logo">
        <TwitterLogo />
      </div>
      <h1>Log in to Twitter</h1>
      
      {error && <div className="auth__error">{error}</div>}
      
      <form className="auth__form" onSubmit={handleSubmit}>
        <div className="auth__formGroup">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="auth__formGroup">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button 
          type="submit" 
          className="auth__button"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Log in'}
        </button>
      </form>
      
      <div className="auth__switch">
        <span>Don't have an account?</span>
        <button onClick={onToggleForm}>Sign up</button>
      </div>
    </div>
  );
}

export default Login;
