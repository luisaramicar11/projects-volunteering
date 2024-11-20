"use client";
import React from "react";
import styles from "./HeaderOffline.module.scss";
import Links from "@/ui/atoms/Link/Link";
import Button from "@/ui/atoms/Button";

const HeaderOffline: React.FC = () => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.titleContainer}>
        <h1 className={styles.mainTitle}>VolunteerConnect</h1>
      </div>
      <div className={styles.buttonsContainer}>
        <Button className={styles.buttonLogin} type="button">
          <Links
            className={styles.linkLogin}
            href="/login"
            label="Iniciar Sesión"
          />
        </Button>
        <Button className={styles.buttonRegister} type="button">
          <Links
            className={styles.linkRegister}
            href="/register"
            label="Registrarse"
          />
        </Button>
      </div>
    </div>
  );
};

export default HeaderOffline;
