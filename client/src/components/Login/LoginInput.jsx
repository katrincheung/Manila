import React from 'react';
import MyInput from "../common/MyInput";
import styles from './LoginInput.module.css'

function LoginInput({ value, placeholder, onClick }) {
    return(
        <div>
            <MyInput className={styles.input} value={value} placeholder={placeholder} onClick={onClick}/>
        </div>
    )
}

export default LoginInput;