import React from 'react'
import styles from './TableButton.module.css'

const UpDownButton = ({ children, ...restProps }) => (
    <button type='button' className={styles.btn} {...restProps}>{children}</button>
)

export default UpDownButton;
