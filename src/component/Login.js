import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('eve.holt@reqres.in');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        if (password !== "cityslicka") {
            setError("Invalid password. Please try again.");
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post('https://reqres.in/api/login', { email, password });
            localStorage.setItem('token', response.data.token);
            navigate('/users/UsersList');
        } catch (err) {
            setError('Invalid credentials. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
      <div>
      
      <section className="vh-100" style={{background:"#388c8c"}}>
      
        <div className="container py-5 h-100" >
          <div className="row d-flex align-items-center justify-content-center h-100"
           style={{background:"#1d7373",borderRadius:"2rem"}}>
            <div className="col-md-8 col-lg-7 col-xl-6">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="img-fluid"
                alt="Phone image"
              />
            </div>
            
            <div className="col-md-6 col-lg-4 col-xl-4  offset-xl-1">
            
              <form >
                {/* Email input */}
                <div className="form-outline mb-4">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
  
                {/* Password input */}
                <div className="form-outline mb-4">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    value={password}
                    placeholder='password'
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
  
                {/* Submit button */}
                <button
                  type="submit"
                  onClick={handleLogin}
                  className="btn btn-primary btn-lg btn-block"
                  style={{flex:2, justifyContent:"center"}}>
                  {isLoading ? 'Logging in...' : 'Login 🚀'}
                  </button> 
                  {error && <p  style={{ color: 'red', textAlign: 'center',paddingTop:20 }}>{error}</p>}
              </form>
            </div>
          </div>
        </div>
      </section>
  
      </div>
    );
}

export default Login;
