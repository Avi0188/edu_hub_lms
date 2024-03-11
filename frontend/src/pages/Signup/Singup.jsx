import React, { useState } from 'react';
// import axios from 'axios';
const URL= process.env.URL

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    // const handleSignUp = async () => {
    //   try {
    //     const response = await axios.post(`${URL}/student/register`, {
    //       data: {
    //         name,
    //         email,
    //         password,
    //       },
    //     });
  
    //     console.log(response.data); // You can handle the response as needed, e.g., show a success message, redirect, etc.
    //   } catch (error) {
    //     console.error('Error signing up:', error.response ? error.response.data : error.message);
    //   }
    // };
  
    return (
      <div>
        {/* <h2>Sign Up</h2>
        <form>
          <label>Name:</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
  
          <label>Email:</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
  
          <label>Password:</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
  
          <button type="button" onClick={handleSignUp}>
            Sign Up
          </button>
        </form> */}
      </div>
    );
  };
  
  export default Signup;
