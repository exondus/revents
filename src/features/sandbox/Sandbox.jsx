import React from "react"
import { useSelector, useDispatch } from 'react-redux'
import { Button } from 'semantic-ui-react'
import { Decrement, Increment} from './testReducer';

export default function Sandbox() {
  const data = useSelector(state => state.test.data);
  const dispatch = useDispatch();

  return (
    <>
        <h1>testing</h1>
        <h3>data is: {data}</h3>
        <Button onClick={() => dispatch(Increment(30))} content="Increment" color="green" />
        <Button onClick={() => dispatch(Decrement(5))} content="Decrement" color="red" />
    </>
  )
}