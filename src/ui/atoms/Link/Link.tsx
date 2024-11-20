"use client"
import React from 'react';
import Link from 'next/link';
import styles from "./Link.module.scss"

interface ILinkProps {
    key?: string;
    href: string;
    label: string;
    target?: '_blank' | '_self';
    onClick?: (e: React.MouseEvent) => void;
    icon?: React.ReactNode;
    className?: string;
}

const Links: React.FC<ILinkProps> = ({key, icon, className, href, target, label, onClick }) => {
    return (
        <Link
            key={key}
            href={href}
            onClick={onClick}
            target={target}
            className={`${styles.link} ${className}`}
        >
            {icon} {label}
        </Link>
    );
};

export default Links;