

// app/auth/signin.js
// app/auth/signin.js
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Use useRouter to handle redirection

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // For handling errors
  const router = useRouter(); // Initialize router for redirection

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Sign in with credentials
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false // Prevent automatic redirection
    });
  
    console.log('Sign-in result:', result); // Log the result
  
    // Handle sign-in result
    if (result?.error) {
      setError(result.error); // Display error message
    } else if (result?.ok) {
      setError(""); // Clear error message if login is successful
      router.push("/"); // Redirect to home page after successful login
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign In</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
    </div>
  );
}