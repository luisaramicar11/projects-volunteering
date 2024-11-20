import Button from "@/ui/atoms/Button";
import styles from "./HomePage.module.scss";
import Links from "@/ui/atoms/Link/Link";

export function Home() {
  return (
    <div className={styles.homeContent}>
      <div className={styles.bodyContainer}>
        <h1>Conecta, Colabora, Cambia el Mundo</h1>
        <p>
          Únete a nuestra comunidad de voluntarios y organizadores. Encuentra
          proyectos que te apasionen o crea los tuyos propios para hacer una
          diferencia en tu comunidad.
        </p>
        <div className={styles.buttonsContainer}>
          <Button className={styles.explorer} type="button">
            <Links
              className={styles.linkExplorer}
              href="/login"
              label="Explorar Proyectos"
            />
          </Button>
          <Button className={styles.begin} type="button">
            <Links
              className={styles.linkBegin}
              href="/login"
              label="Comenzar como Organizador"
            />
          </Button>
        </div>
      </div>
    </div>
  );
}
