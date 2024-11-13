import { LoginForm } from "@/ui/organisms"
import styles from "./LoginTemplate.module.scss"
export const LoginTemplate = () => {
    return (
        <div className={styles.divContainer}>
            <div className={styles.div}>
                <LoginForm />
        </div>
        </div>
        
    )
}