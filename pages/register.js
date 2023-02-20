import { useState } from "react";

const initialCredentials = {
  userName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function Register() {
  const [credentials, setCredentials] = useState(initialCredentials);

  const handleChange = (e) => {
    let { value, name } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(credentials);
    try {
      const response = await axios.post("/api/auth/login", credentials);
      if (response.status === 200) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  return (
    <div>

      <form onSubmit={handleSubmit}>
      <input
          placeholder="Username"
          onChange={handleChange}
          type="text"
          value={credentials.userName}
          name="userName"
        />
        <input
          placeholder="Email"
          onChange={handleChange}
          type="email"
          value={credentials.email}
          name="email"
        />
        <input
          placeholder="Password"
          onChange={handleChange}
          type="password"
          value={credentials.password}
          name="password"
        />
         <input
          placeholder="Confirm password"
          onChange={handleChange}
          type="password"
          value={credentials.confirmPassword}
          name="confirmPassword"
        />

       
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}

export default Register;
