'use client'

import RegisterForm from "@/ui/organisms/Register/RegisterForm";
import { useRouter } from "next/navigation";
import styles from "./RegisterTemplate.module.scss"
import Button from "@/ui/atoms/Button";


export default function RegisterTemplate(){

    const router = useRouter();

    const handleBack = () => {
        router.push("/");
    };

    return(
        <div className={styles.divContainer}>
            <div className={styles.div}>
                <Button onClick={handleBack} className={styles.button}>Volver al inicio</Button>
            </div>
            <div className={styles.containerRegister}>
                <div className={styles.cardContainer}>
                    <RegisterForm />
                </div>
            </div>
        </div>
    )
}