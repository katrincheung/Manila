import React from 'react'

const MyInput = ({ value, onChange, placeholder }) => (
    <div>
        <input value={value} placeholder={placeholder} onChange={onChange}/>
    </div>
)

export default MyInput
