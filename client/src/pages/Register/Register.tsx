import { useState } from "react";
import styles from "./Register.module.scss";

function Register() {
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [server_error, setServer_error] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className={styles.register}>
      <form action="" className={styles.register_form}>
        <input type="text" />
        <input type="text" />
        <input type="text" />
        <input type="text" />
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
}

export default Register;
