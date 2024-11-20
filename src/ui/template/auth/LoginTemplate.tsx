import { LoginForm } from "@/ui/organisms";
import styles from "./LoginTemplate.module.scss";
import Link from "next/link";
export const LoginTemplate = () => {
  return (
    <div className={styles.div}>
      <div className={styles.containerLink}>
        <Link href="/" className={styles.link}>
          Volver al inicio
        </Link>
      </div>
      <div className={styles.containerForm}>
        <LoginForm />
      </div>
    </div>
  );
};
