import React from 'react';

import { createStore } from 'redux';
import { useState } from 'react';
import {Provider, useSelector, useDispatch, connect} from 'react-redux';
import { store } from './hooks/storeTest';
import { counterSlice } from './hooks/TestReduxToolkit';
import {plus} from './hooks/TestReduxToolkit';

// const reducer = (currentState, action) => {
// 
  // if(currentState === undefined){
  //     return {
  //       number: 1,
  //     }
  //   }
  //   const newState = {...currentState}  
  //   if(action.type === 'PLUS'){
  //       newState.number++;
  //   }
  //   return newState
  // }

  // const store = createStore(reducer);

  const Left = () => {
    
    const number = useSelector((state) => state.counter.value);

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
            // dispatch({type: 'counter/plus'})
            dispatch(plus())
        }}>button</button>
        <button onClick={() => {
            dispatch(counterSlice.actions.change(0))
        }}>button</button>
    </div>)
  }

const StudyRedux = () => {
    // const [state, setState] = useState({number: 1})
    const dispatch = useDispatch();
    const count = useSelector((state) => {
      console.log(state);
      return state.counter.value
    });

    return (
        <div>
              redux
              <Left></Left>
              <Right></Right>

        </div>
    );
};



export default StudyRedux;