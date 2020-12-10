import React from 'react';
import styles from './ShareTable.module.css';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import {TableContainer} from "@material-ui/core";
import TableButton from "./table/tableButton";
import TCell from "./table/TCell";



function ShareTable({ sharePrices,shareNumbers, priceUp }) {
    
    return(
        <div className={styles.center}>
            <TableContainer>
            <Table aria-label="a dense table" className={styles.container}>
                <TableHead>
                    <TableRow>
                        <TCell></TCell>
                        <TCell>Brown</TCell>
                        <TCell>Blue</TCell>
                        <TCell>Yellow</TCell>
                        <TCell>Green</TCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TCell>Prices</TCell>
                        <TCell>{sharePrices.brown}</TCell>
                        <TCell>{sharePrices.blue}</TCell>
                        <TCell>{sharePrices.yellow}</TCell>
                        <TCell>{sharePrices.green}</TCell>
                    </TableRow>
                    <TableRow>
                        <TCell>Remaining</TCell>
                        <TCell>{shareNumbers.brown}</TCell>
                        <TCell>{shareNumbers.blue}</TCell>
                        <TCell>{shareNumbers.yellow}</TCell>
                        <TCell>{shareNumbers.green}</TCell>
                    </TableRow>
                    <TableRow>
                        <TCell></TCell>
                        <TCell><TableButton children='GET' onClick={() => priceUp('brown')}/></TCell>
                        <TCell><TableButton children='GET' onClick={() => priceUp('blue')}/></TCell>
                        <TCell><TableButton children='GET' onClick={() => priceUp('yellow')}/></TCell>
                        <TCell><TableButton children='GET' onClick={() => priceUp('green')}/></TCell>
                    </TableRow>
                </TableBody>
            </Table>
            </TableContainer>
        </div>
    );
}

export default ShareTable;