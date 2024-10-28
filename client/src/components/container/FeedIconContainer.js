import React from 'react';
import FlexContainer from '../layout/FlexContainer';
import { ICON_Path } from '../../constants/path';

const FeedIconContainer = () => {
    const style={
        cursor: 'pointer',
    }
    return (
        <FlexContainer>
            <img style={style} src={ICON_Path+'icon_favorite.png'} width='40px'/>
            <img style={style} src={ICON_Path+'icon_comment.png'} width='40px'/>
            <span style={{flex: 1}}></span>
            <img style={style} src={ICON_Path+'icon_bookmark.png'} width='40px'/>
        </FlexContainer>
    );
};

export default FeedIconContainer;