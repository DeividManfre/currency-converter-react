import {useState} from "react";
import {useNavigate, Link} from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


    const handleRegister = (e) => {
        e.preventDefault();

        if (name && email && password) {
            alert("Registration successful! Please log in");
            navigate("/");
        } else {
            alert("Please fill in all fields");
        }
    };
    
  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input type="text" className="input-login" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" className="input-login" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" className="input-login" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="button-login">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  );
}