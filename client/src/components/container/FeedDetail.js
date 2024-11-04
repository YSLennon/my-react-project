import * as React from 'react';
import FlexContainer from '../layout/FlexContainer';
import FlexSubContainer from '../layout/FlexSubContainer';
import ImageViewer from './ImageViewer';
import FeedText from './FeedText';
import ProfileContainer from './ProfileContainer';
import { useSelector } from 'react-redux'

export default function FeedDetail(props) {
  const { title, images, comments, feed } = useSelector((state) => state.dialog);
  const style = {
    hegiht: 'calc( 100% - 35px )',
    minWidth: '50%',    // 최소 너비 설정
    maxWidth: '50%',    // 최대 너비 설정 (비율 유지)
  }
  return (
    <FlexContainer>
      <FlexSubContainer style={style}>
        <ImageViewer fileImages={props.fileImages} type={title} feedImages={images}/>
      </FlexSubContainer>
      <FlexSubContainer style={style}>
        <FeedText textRef={props.textRef} title={title} feed={feed} comments={comments} />
      </FlexSubContainer>
    </FlexContainer>
  );
}
