import React from 'react'

export default function MessageBox(props) {
    return (
        <div>
            <div className={`alert alert-${props.variant || "info"}`}>
                {/* Shows the children of the message box */}
                {props.children}
            </div>
        </div>
    )
}
