import * as React from 'react';
import FlexContainer from '../layout/FlexContainer';
import FlexSubContainer from '../layout/FlexSubContainer';
import ImageViewer from './ImageViewer';
import FeedText from './FeedText';

export default function FeedDetail(props) {
  const style = {
    height: '100%'
  }
  return (
    <FlexContainer>
      <FlexSubContainer style={style}>
        <ImageViewer fileImages={props.fileImages} />
      </FlexSubContainer>
      <FlexSubContainer style={style}>
        <FeedText textRef={props.textRef} />
      </FlexSubContainer>
    </FlexContainer>
  );
}
