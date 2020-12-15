import React from 'react';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import {TableContainer} from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";




function ShareTable({ sharePrices,shareNumbers }) {

    return(
        <div >
            <TableContainer component={Paper}>
                <Table aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>Brown</TableCell>
                            <TableCell>Blue</TableCell>
                            <TableCell>Yellow</TableCell>
                            <TableCell>Green</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>Prices</TableCell>
                            <TableCell>{sharePrices.brown}</TableCell>
                            <TableCell>{sharePrices.blue}</TableCell>
                            <TableCell>{sharePrices.yellow}</TableCell>
                            <TableCell>{sharePrices.green}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Remaining</TableCell>
                            <TableCell>{shareNumbers.brown}</TableCell>
                            <TableCell>{shareNumbers.blue}</TableCell>
                            <TableCell>{shareNumbers.yellow}</TableCell>
                            <TableCell>{shareNumbers.green}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default ShareTable;