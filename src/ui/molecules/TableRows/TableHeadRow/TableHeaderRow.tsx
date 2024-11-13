import TableDataHead from "@/ui/atoms/Th";
import TableDataRow from "@/ui/atoms/Tr";
import styles from "./TableHeaderRow.module.scss"
const TableHeaderRow: React.FC = () => {
    return (
      <thead>
        <TableDataRow classname={styles.tr}>
          <TableDataHead classname={styles.th}>Título</TableDataHead>
          <TableDataHead classname={styles.th}>Descripción</TableDataHead>
          <TableDataHead classname={styles.th}>Fecha de inicio</TableDataHead>
          <TableDataHead classname={styles.th}>Fecha de fin</TableDataHead>
          <TableDataHead classname={styles.th}>Estado</TableDataHead>
          <TableDataHead classname={styles.th}>Organizador</TableDataHead>
          <TableDataHead classname={styles.th}>Acciones</TableDataHead>
        </TableDataRow>
      </thead>
    );
  };
  
  export default TableHeaderRow;