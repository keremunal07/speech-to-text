import React, { Children } from 'react'

const Note = ({children}) => {
    return (
        <div className='note'>
            {children}
        </div>
    )
}

export default Note
