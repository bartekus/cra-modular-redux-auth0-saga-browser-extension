import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement, incrementIfOdd, incrementAsync } from '../store/modules/counter/actions';

export default function Counter() {
  const dispatch = useDispatch();

  // @ts-ignore
  const value = useSelector(store => store.counter);

  const onIncrement = () => dispatch(increment());
  const onDecrement = () => dispatch(decrement());
  const onIncrementIfOdd = () => dispatch(incrementIfOdd());
  const onIncrementAsync = () => dispatch(incrementAsync());

  return (
    <p>
      { value === null ? `Not Clicked yet` : `Clicked: ${value} times` }<br />
      <button onClick={onIncrement}>+</button> <button onClick={onDecrement}>-</button>{' '}
      <button onClick={onIncrementIfOdd}>Increment if odd</button>{' '}
      <button onClick={onIncrementAsync}>Increment async</button>
    </p>
  );
}
