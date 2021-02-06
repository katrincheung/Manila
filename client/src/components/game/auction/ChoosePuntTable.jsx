import React, {useEffect, useState} from 'react';
import styles from './AuctionShareTable.module.css';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import {TableContainer} from "@material-ui/core";
import TableButton from "../../common/table/tableButton";
import TCell from "../../common/table/TCell";
import TableCell from "@material-ui/core/TableCell";
import SetPuntButton from "../../common/ChoosePuntTable/SetPuntButton";
import {socket} from "../../../App";



const ChoosePuntTable = () => {

    const [ isBrown, setIsBrown ] = useState(false);
    const [ isBlue, setIsBlue ] = useState(false);
    const [ isYellow, setIsYellow ] = useState(false);
    const [ isGreen, setIsGreen ] = useState(false);

    const [ brownValue, setBrownValue ] = useState(0);
    const [ blueValue, setBlueValue ] = useState(0);
    const [ yellowValue, setYellowValue ] = useState(0);
    const [ greenValue, setGreenValue ] = useState(0);

    useEffect(()=>{if(!isBrown) setBrownValue(0)}, [isBrown])
    useEffect(()=>{if(!isBlue) setBlueValue(0)}, [isBlue])
    useEffect(()=>{if(!isYellow) setYellowValue(0)}, [isYellow])
    useEffect(()=>{if(!isGreen) setGreenValue(0)}, [isGreen])

    const [ sum, setSum ] = useState(0);
    useEffect(()=>{
        setSum(brownValue+blueValue+yellowValue+greenValue)
    }, [brownValue, blueValue, yellowValue, greenValue])

    const confirm = () => {
        let msg = `CHOOSE_PUNT`;
        let count = 0;
        if (isBrown) {
            msg += ` brown ${brownValue}`;
            count += 1;
        }
        if (isBlue) {
            msg += ` blue ${blueValue}`;
            count += 1;
        }
        if (isYellow) {
            msg += ` yellow ${yellowValue}`;
            count += 1;
        }
        if (isGreen) {
            msg += ` green ${greenValue}`;
            count += 1;
        }
        if (count === 3 && sum === 9)
            socket.send(msg);
    }


    return(
        <div className={styles.center}>
            <TableContainer>
            <Table aria-label="a dense table" className={styles.container}>
                <TableHead>
                    <TableCell align="center" colSpan={2}>Sum: {sum}</TableCell>
                    <TableCell align="center" colSpan={2}><TableButton children='CONFIRM' onClick={confirm}/></TableCell>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TCell>Brown</TCell>
                        <TCell>Blue</TCell>
                        <TCell>Yellow</TCell>
                        <TCell>Green</TCell>
                    </TableRow>
                    <TableRow>
                        <TCell>{brownValue}</TCell>
                        <TCell>{blueValue}</TCell>
                        <TCell>{yellowValue}</TCell>
                        <TCell>{greenValue}</TCell>
                    </TableRow>
                    <TableRow>
                        <TCell><SetPuntButton is={isBrown} setIs={setIsBrown} value={brownValue} setValue={setBrownValue} sum={sum}/></TCell>
                        <TCell><SetPuntButton is={isBlue} setIs={setIsBlue} value={blueValue} setValue={setBlueValue} sum={sum}/></TCell>
                        <TCell><SetPuntButton is={isYellow} setIs={setIsYellow} value={yellowValue} setValue={setYellowValue} sum={sum}/></TCell>
                        <TCell><SetPuntButton is={isGreen} setIs={setIsGreen} value={greenValue} setValue={setGreenValue} sum={sum}/></TCell>
                    </TableRow>
                </TableBody>
            </Table>
            </TableContainer>
        </div>
    );
}

export default ChoosePuntTable;