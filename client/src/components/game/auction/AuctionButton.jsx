import React from 'react'
import styles from './AuctionButton.module.css'

const AuctionButton = ({ children, ...restProps }) => (
    <button type='button' className={styles.btn} {...restProps}>{children}</button>
)

export default AuctionButton
