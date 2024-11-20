import React, { useState } from "react";
import styles from "./Dropdown.module.scss";

interface DropdownProps {
  user: {
    id?: string;
    token?: string;
    email?: string | null;
    role?: string | null;
    photo?: string | null;
  };
  signOut: () => void;
}

const Dropdown = ({ user, signOut }: DropdownProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className={styles.containerProfile}>
      <div className={styles.profile} onClick={toggleDropdown}>
        <div className={styles.avatar}>
          {user?.photo ? (
            <img
              src={user.photo}
              alt="Foto de perfil"
              className={styles.avatarImage}
              width={50}
              height={50}
            />
          ) : (
            <p>No se ha cargado la foto de perfil</p>
          )}
        </div>
        <div className={styles.email}>
          <span>{user.email || "Email no disponible"}</span>{" "}
          {/* Mensaje por defecto */}
        </div>

        {isDropdownOpen && (
          <div className={styles.dropdown}>
            <button className={styles.dropdownItem} onClick={signOut}>
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
