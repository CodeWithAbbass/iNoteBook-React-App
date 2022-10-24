import React from 'react';

const Alert = (props) => {
    const Capitalize = (word)=>{
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    return (
        <div style={{height:'50px'}}>
        <div className={`alert alert-${props.type} alert-dismissible fade show`} role="alert">
            <strong>{Capitalize(props.type)}</strong>: {props.message}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        </div>
    )
}

export default Alert


