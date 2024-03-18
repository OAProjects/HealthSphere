import styles from "./Landing.module.css";

const Landing = () => {
  return (
    <section className={styles.container}>
      <h1>Welcome to Health Sphere</h1>
      <p>Please login to book your doctors appointment</p>
      <div className={styles.buttons}>

        <button>Login</button>
        <button>Register</button>
      </div>
    </section>
  );
};

export default Landing;
