
import { Sidebar } from "@/ui/organisms";
import { Roboto } from "next/font/google";
import styles from "./layout.module.scss"; // Archivo CSS/Sass para los estilos

const roboto = Roboto({
  subsets: ['latin'],
  weight: ["300", "400", "500", "700"] 
});

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} ${styles.layoutContainer}`}>
        <div className={styles.mainContainer}>
          <Sidebar />
          <div className={styles.content}>{children}</div>
        </div>
      </body>
    </html>
  );
}
