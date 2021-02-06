import React from 'react';
import UpDownButton from "./upDownButton";
import Checkbox from '@material-ui/core/Checkbox';






const SetPuntButton = ({ is, setIs, value, setValue, sum }) => {

    const upDown = (v) => {
        if (is && value+v <= 5 && value+v >= 0 && sum+v <= 9)
            setValue(value+v)
    }

    return (
        <div>
            <UpDownButton children='+' onClick={()=>upDown(1)}/><Checkbox onChange={e=>setIs(e.target.checked)}/><UpDownButton children='-' onClick={()=>upDown(-1)}/>
        </div>
    );
}

export default SetPuntButton;