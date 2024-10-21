import React from 'react';

import { createStore } from 'redux';
import { useState } from 'react';
import {Provider, useSelector, useDispatch, connect} from 'react-redux';


const reducer = (currentState, action) => {
    if(currentState === undefined){
      return {
        number: 1,
      }
    }
    const newState = {...currentState}  
    if(action.type === 'PLUS'){
        newState.number++;
    }
    return newState
  }

  const store = createStore(reducer);

  const Left = () => {
    
    const number = useSelector((state) => state.number);

    return (<div>
        Left: {number}
        <div>
        </div>
    </div>)
  }
  const Right = () => {
    const dispatch = useDispatch();
    return (<div>
        Right
        <button onClick={() => {
            dispatch({type: 'PLUS'})
        }}>button</button>
    </div>)
  }

const StudyRedux = () => {
    const [state, setState] = useState({number: 1})

    return (
        <div>
            <Provider store={store}>
            redux
            <Left></Left>
            <Right></Right>
            </Provider>
        </div>
    );
};



export default StudyRedux;