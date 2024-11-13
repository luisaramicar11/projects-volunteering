"use client"
import React from 'react';

interface ThProps {
    children: React.ReactNode;
    classname?: string;
};

const TableDataHead: React.FC<ThProps> = ({ children, classname }) => {
  return (
    <th className={classname}>
      {children}
    </th>
  );
};

export default TableDataHead;