import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import background from "../../assets/background.png";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

function Login() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        // Perform login logic
        const response = await axios.post("http://localhost:3001/auth/login", values);
        
        // Assuming the backend returns a JWT token upon successful login
        const token = response.data.token;
    
        // Store the token in localStorage or sessionStorage
        localStorage.setItem("token", token);
    
        // Redirect to the home page after successful login
        navigate("/home");
      } catch (error) {
        console.error("Login failed:", error.message);
      }
    },
  });

  return (
    <section
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className={styles.container}>
        <div className={styles.login_container}>
          <h1>Login</h1>
          <Form onSubmit={formik.handleSubmit}>

            <Form.Group className="col-md-12 mb-3" controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                className={
                  formik.touched.email && formik.errors.email
                    ? "is-invalid"
                    : ""
                }
                type="email"
                placeholder="email@hotmail.com"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email}
            </Form.Group>

            <Form.Group className="col-md-12 mb-3" controlId="formGridPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                className={
                  formik.touched.password && formik.errors.password
                    ? "is-invalid"
                    : ""
                }
                type="password"
                placeholder="Password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password}
            </Form.Group>

            <Row className="col-md-14">

              <div className="col-12 mt-3">
                <p className={styles.small_text}>
                  Don&apos;t have an account?{" "}
                  <span
                    className={styles.link}
                    onClick={() => {
                      navigate("/register");
                    }}
                  >
                    Register here
                  </span>
                </p>
              </div>
            </Row>

            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </div>
      </div>
    </section>
  );
}

export default Login;
