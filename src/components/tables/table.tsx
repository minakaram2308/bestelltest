import React from 'react';

interface TableProps {
  Hcolumns: (string | number)[];
  Bcolumns: (JSX.Element | string | number)[][];
}

interface ColumnProps {
  columns: (string | number)[];
}

const Thead: React.FC<ColumnProps> = ({ columns }) => {
  return (
    <tr className="w-100">
      {columns.map((column, index) => {
        return <th key={index}>{column}</th>;
      })}
    </tr>
  );
};

const Tbody: React.FC<{ rows: (JSX.Element | string | number)[][] }> = ({ rows }) => {
  return (
    <>
      {rows.map((columns, rowIndex) => (
        <tr key={rowIndex} className="w-100">
          {columns.map((column, colIndex) => {
            return <td key={colIndex}>{column}</td>;
          })}
        </tr>
      ))}
    </>
  );
};

export const Table: React.FC<TableProps> = ({ Hcolumns, Bcolumns }) => {
  return (
    <table>
      <thead>
        <Thead columns={Hcolumns} />
      </thead>
      <tbody>
        <Tbody rows={Bcolumns} />
      </tbody>
    </table>
  );
};

export default Table;
