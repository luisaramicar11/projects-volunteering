import React from 'react';
import styles from "./Card.module.scss"
interface CardProps {
    value: string; 
    title: string;
    icon: React.ReactNode;
}

export default function Card({ value, title, icon }: CardProps) {
    return (
        <div className={styles.card}>
            <div className={styles.containerCard}>
                <h3>{title}</h3>
                <span>{icon}</span>
            </div>
            <p >{value}</p>
        </div>
    );
}