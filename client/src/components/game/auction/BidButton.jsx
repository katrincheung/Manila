import React from 'react'
import styles from './BidButton.module.css'

const BidButton = ({ children, ...restProps }) => (
    <button type='button' className={styles.btn} {...restProps}>{children}</button>
)

export default BidButton;
