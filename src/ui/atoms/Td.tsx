"use client"
import React from 'react';

interface TdProps {
    children: React.ReactNode;
    classname?: string;
};

const TableDataCell: React.FC<TdProps> = ({ children, classname }) => {
  return (
    <td className={classname}>
      {children}
    </td>
  );
};

export default TableDataCell;