"use client";
import React from 'react'; 
import styles from "./ButtonsCard.module.scss"
import Button from '@/ui/atoms/Button';

interface ActionButtonsProps {
  onEdit: () => void;
  onDelete: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onEdit, onDelete }) => {
  return (
    <div className={styles.divButtonsContainer}>
      <Button
        onClick={onEdit} 
        className={styles.buttonEdit}
      />
      <Button 
        onClick={onDelete} 
        className={styles.buttonDelete}
      />
    </div>
  );
};

export default ActionButtons;