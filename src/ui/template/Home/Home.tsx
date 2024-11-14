import HeaderOffline from "@/ui/organisms/HeaderOffline/HeaderOffline"
import styles from "./Home.module.scss"
import { Home } from "@/ui/organisms"
export default function HomePage() {

    return (
        <div className={styles.div}>
            <HeaderOffline/>
            <Home/>
        </div>
    )
}