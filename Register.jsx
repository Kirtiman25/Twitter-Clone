import React, { useState } from 'react';
import './Auth.css';
import { useAuth } from '../../context/AuthContext';
import TwitterLogo from '../Logo/TwitterLogo';

function Register({ onToggleForm }) {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { registerUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name || !username || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      await registerUser(name, username, email, password);
    } catch (err) {
      setError(err.msg || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth">
      <div className="auth__logo">
        <TwitterLogo />
      </div>
      <h1>Create your account</h1>
      
      {error && <div className="auth__error">{error}</div>}
      
      <form className="auth__form" onSubmit={handleSubmit}>
        <div className="auth__formGroup">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="auth__formGroup">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
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
        <div className="auth__formGroup">
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button 
          type="submit" 
          className="auth__button"
          disabled={loading}
        >
          {loading ? 'Signing up...' : 'Sign up'}
        </button>
      </form>
      
      <div className="auth__switch">
        <span>Already have an account?</span>
        <button onClick={onToggleForm}>Log in</button>
      </div>
    </div>
  );
}

export default Register;
