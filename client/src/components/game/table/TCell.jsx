import React from 'react';
import TableCell from "@material-ui/core/TableCell";
import styles from './TCell.module.css';

function TCell({ children }) {
    return (
        <TableCell align='center' padding='none'>
            <p className={styles.tableCell}>{children}</p>
        </TableCell>
    );
}

export default TCell;