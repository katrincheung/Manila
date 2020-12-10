import React from 'react'
import styles from './TableButton.module.css'

const TableButton = ({ children, ...restProps }) => (
    <button type='button' className={styles.btn} {...restProps}>{children}</button>
)

export default TableButton;
