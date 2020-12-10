import React from 'react';
import MyInput from "../common/MyInput";
import styles from './LoginInput.module.css'

function LoginInput({ value, placeholder, onChange }) {
    return(
        <div>
            <MyInput className={styles.input} value={value} placeholder={placeholder} onChange={onChange}/>
        </div>
    )
}

export default LoginInput;