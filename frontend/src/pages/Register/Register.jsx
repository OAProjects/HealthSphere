import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import background from "../../assets/background.png";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";

const registerSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(6, "Password must contain at least 6 characters")
    .required("Required"),
});

const Register = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "patient", // Default role to patient
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      try {
        // Perform registration logic
        await axios.post("http://localhost:3001/auth/register", values);

        // Redirect to the login page after successful registration
        navigate("/login");
      } catch (error) {
        console.error("Registration failed:", error.message);
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
        <div className={styles.panel}>
          <h1>Register</h1>
          <Form className={styles.form} onSubmit={formik.handleSubmit}>
            <Form.Group as={Row} className="mb-3">
              <Col sm={10}>
                <Form.Check
                  type="radio"
                  label="Patient"
                  name="role"
                  value="patient"
                  id="role-patient"
                  checked={formik.values.role === "patient"}
                  onChange={formik.handleChange}
                />
                <Form.Check
                  type="radio"
                  label="Doctor"
                  name="role"
                  value="doctor"
                  id="role-doctor"
                  checked={formik.values.role === "doctor"}
                  onChange={formik.handleChange}
                />
              </Col>
            </Form.Group>
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your full name"
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <div className="error">{formik.errors.firstName}</div>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your full name"
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <div className="error">{formik.errors.lastName}</div>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>Enter your email address:</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your your email address"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="error">{formik.errors.email}</div>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="error">{formik.errors.password}</div>
              )}
            </Form.Group>
            <a href="/login">Already have an account? Login here</a>
            <Button variant="primary" type="submit">
              Register
            </Button>
            <fieldset></fieldset>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default Register;
