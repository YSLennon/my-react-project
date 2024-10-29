import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useDispatch } from 'react-redux'
import { handleDialogOpen } from '../../store/slices/dialogSlice';
import { feedDetail } from '../../styles/styleDialog';

export default function ChessImageList(props) {

  const dispatch = useDispatch();
  const feeds = props.feeds;
  const images = props.images;
  const comments = props.comments;
  return (
    <ImageList sx={{ margin:'50px auto',overflow:'visible',height:'fit-content', padding:'10px', width: '45vw', minWidth:'800px',}} cols={3}>
      {feeds.map((feed) => {
            return <ImageListItem key={feed.feedNo} 
                      images={images[feed.feedNo]}
                      onClick={() => {
                        dispatch(handleDialogOpen({
                          style: feedDetail,
                          title: 'feedDialog',
                          feed: feed,
                          comments: comments[feed.feedNo],
                          images: images[feed.feedNo]
                      }));
                      }}
                      sx={{padding:'5px', minWidth:'250px', border: '1px solid #ccc', borderRadius: '5px' }}>
                      <img
                        style={{cursor:'pointer'}}
                        src={images[feed.feedNo][0][2]}
                        alt={images[feed.feedNo][0][0]}
                        loading="lazy"
                      />
                    </ImageListItem>
      })}
      
    </ImageList>
  );
}
