import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import background from "../../assets/background.png";
import styles from "./Login.module.css";

const Login = () => {
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
          <h1>Login</h1>
          <Form className={styles.form}>
            <Form.Group as={Row} className="mb-3">
              <Col sm={10}>
                <Form.Check
                  type="radio"
                  label="Patient"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios1"
                />
                <Form.Check
                  type="radio"
                  label="Doctor"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios2"
                />
              </Col>
            </Form.Group>
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your full name" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your full name" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Enter your email address:</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your your email address"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter your password" />
            </Form.Group>
            <a href="/register">Don't have an account? Register here</a>
            <Button variant="primary" type="submit">
              Log in
            </Button>
            <fieldset></fieldset>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default Login;
