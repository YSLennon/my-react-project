import React from 'react';

export const FlexContainer = (props) => {
    const style = {
        display: 'flex',
        ...(props.style || {})
    }
    return (
        <div style={style}>
            {props.children}
        </div>
    );
};

export default FlexContainer;