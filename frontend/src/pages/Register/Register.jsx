import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import background from "../../assets/background.png";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";

const registerSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  role: Yup.string()
    .oneOf(["patient", "doctor"])
    .required("User Type is required"),
});

function Register() {
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
        <div className={styles.register_container}>
          <h1>Register</h1>
          <Form onSubmit={formik.handleSubmit}>
            <Row className="mb-3 g-3">
              <Form.Group className="col-md-6" controlId="formGridFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  className={
                    formik.touched.firstName && formik.errors.firstName
                      ? "is-invalid"
                      : ""
                  }
                  type="text"
                  placeholder="Enter first name"
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.firstName && formik.errors.firstName}
              </Form.Group>

              <Form.Group className="col-md-6" controlId="formGridLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  className={
                    formik.touched.lastName && formik.errors.lastName
                      ? "is-invalid"
                      : ""
                  }
                  type="text"
                  placeholder="Enter last name"
                  name="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.lastName && formik.errors.lastName}
              </Form.Group>
            </Row>

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
              <Form.Group controlId="formGridState">
                <Form.Label>User Type</Form.Label>
                <Form.Select
                  className={
                    formik.touched.role && formik.errors.role
                      ? "is-invalid"
                      : ""
                  }
                  name="role"
                  value={formik.values.role}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="patient">Patient</option>
                  <option value="doctor">Doctor</option>
                </Form.Select>
                {formik.touched.role && formik.errors.role}
              </Form.Group>

              <div className="col-12 mt-3">
                <p className={styles.small_text}>
                  Already have an account?{" "}
                  <span
                    className={styles.link}
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    Login here
                  </span>
                </p>
              </div>
            </Row>

            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>
        </div>
      </div>
    </section>
  );
}

export default Register;
