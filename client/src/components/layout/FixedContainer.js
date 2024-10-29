import React from 'react';

const FixedContainer = (props) => {
    const style = {
        position: 'fixed',
        height:'100%',
        ...(props.style || {})
    }
    return (
        <div style={style}>
            {props.children}
        </div>
    );
};

export default FixedContainer;