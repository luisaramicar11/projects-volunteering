"use client"
import React from 'react';

interface TrProps {
    children: React.ReactNode;
    classname?: string;
};

const TableDataRow: React.FC<TrProps> = ({ children, classname }) => {
  return (
    <tr className={classname}>
      {children}
    </tr>
  );
};

export default TableDataRow;