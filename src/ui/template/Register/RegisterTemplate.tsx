"use client";

import RegisterForm from "@/ui/organisms/Register/RegisterForm";
import styles from "./RegisterTemplate.module.scss";
import Link from "next/link";

export default function RegisterTemplate() {
  return (
    <div className={styles.div}>
      <div className={styles.containerLink}>
        <Link href="/" className={styles.link}>
          Volver al inicio
        </Link>
      </div>

      <div className={styles.containerForm}>
        <RegisterForm />
      </div>
    </div>
  );
}
