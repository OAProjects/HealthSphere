import styles from "./Landing.module.css";
import background from "../../assets/background.png";

const Landing = () => {
  return (
    <section
      className={styles.container}
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className={styles.hero}>
        <h1>Welcome to Health Sphere</h1>
        <p>
          The No.1 booking system for your health and wellness needs. Book your
          next appointment with us today!
        </p>
        <div className={styles.buttons}>
          <button>
            <a href="/login">Login</a>
          </button>
          <button>
            <a href="/register">Register</a>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Landing;
