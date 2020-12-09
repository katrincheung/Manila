import React from 'react'

const MyInput = ({ value, onClick, placeholder }) => (
    <div>
        <input value={value} placeholder={placeholder} onChange={onClick}/>
    </div>
)

export default MyInput
