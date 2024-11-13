import TableDataCell from "@/ui/atoms/Td";
import TableDataRow from "@/ui/atoms/Tr";
import ActionButtons from "../../ButtonsCard/ButtonsCard";
import styles from "./TableDataRow.module.scss";

interface TableRowProps {
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    isActive: boolean;
    organizer: string;
    onEdit: () => void;
    onDelete: () => void;
}

const TableRow: React.FC<TableRowProps> = ({ title, description, startDate, endDate, isActive, organizer, onEdit, onDelete})  => {
    return (
        <TableDataRow classname={styles.tr}>
            <TableDataCell classname={styles.td}>{title}</TableDataCell>
            <TableDataCell classname={styles.td}>{description}</TableDataCell>
            <TableDataCell classname={styles.td}>{(startDate).toString()}</TableDataCell>
            <TableDataCell classname={styles.td}>{(endDate).toString()}</TableDataCell>
            <TableDataCell classname={styles.td}>{isActive? 'Active' : 'Inactive'}</TableDataCell>
            <TableDataCell classname={styles.td}>{organizer}</TableDataCell>
            <TableDataCell classname={styles.td}><ActionButtons onEdit={onEdit} onDelete={onDelete}/></TableDataCell> 
        </TableDataRow>
    );
}

export default TableRow;