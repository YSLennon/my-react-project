import React from 'react';

export const FlexSubContainer = (props) => {
    const style = {
        flex: 1,
        ...(props.style || {})
    }
    return (
        <div style={style}>
            {props.children}
        </div>
    );
};

export default FlexSubContainer;