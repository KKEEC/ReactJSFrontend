import React from 'react'

function Filter({handleSearch}) {
    return (
        <div>filter shown with <input onChange={handleSearch}/></div>
    )
}

export default Filter
