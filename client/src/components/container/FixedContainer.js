import React from 'react';

const FixedContainer = (props) => {
    const style = {
        position: 'fixed',
        ...(props.style || {})
    }
    return (
        <div style={style}>
            {props.children}
        </div>
    );
};

export default FixedContainer;