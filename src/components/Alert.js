import React from 'react'

function Alert(props) {
    const Capitalize = (word)=>{
        if(word=== "danger"){
            word='error';
        }
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    return (
        <div style={{height:'56px',marginTop:'56px'}}>
        {props.Alert && <div className={`alert alert-${props.Alert.type} alert-dismissible fade show `} role="alert">
            <strong>{Capitalize(props.Alert.type)}</strong>: {props.Alert.message}
        </div>}
        </div>
    )
}

export default Alert