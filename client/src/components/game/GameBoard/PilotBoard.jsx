import React from 'react';
import styles from './AuctionShareTable.module.css';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import {TableContainer} from "@material-ui/core";
import TableButton from "../../common/table/tableButton";
import TCell from "../../common/table/TCell";



const PilotBoard = () => {

    const up = (color) => {
        console.log(color,' up 1')
    }
    const down = (color) => {
        console.log(color,' down 1')
    }


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
                            <TCell><TableButton children='UP' onClick={()=>up('brown')}/></TCell>
                            <TCell><TableButton children='UP' onClick={()=>up('blue')}/></TCell>
                            <TCell><TableButton children='UP' onClick={()=>up('yellow')}/></TCell>
                            <TCell><TableButton children='UP' onClick={()=>up('green')}/></TCell>
                        </TableRow>
                        <TableRow>
                            <TCell><TableButton children='DOWN' onClick={()=>down('brown')}/></TCell>
                            <TCell><TableButton children='DOWN' onClick={()=>down('blue')}/></TCell>
                            <TCell><TableButton children='DOWN' onClick={()=>down('yellow')}/></TCell>
                            <TCell><TableButton children='DOWN' onClick={()=>down('green')}/></TCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default PilotBoard;