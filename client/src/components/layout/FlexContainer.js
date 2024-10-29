import React from 'react';

export const FlexContainer = (props) => {
    const style = {
        display: 'flex',
        height: '100%',
        ...(props.style || {})
    }
    return (
        <div style={style}>
            {props.children}
        </div>
    );
};

export default FlexContainer;