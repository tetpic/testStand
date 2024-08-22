'use client'
import styles from './index.module.scss'

import {
  increment, 
  decrement,
  incrementByAmount
} from "../../lib/slices/counterSlice"
import { useAppDispatch, useAppSelector, useAppStore } from '../../lib/hooks'
import TestComponent2 from '../TestComponent2'
import P from '../P'

interface Props {
}

export default function TestComponent(props: Props) {
  console.count('test component 1')

  const store = useAppStore()
  const counter = useAppSelector((state) => state.counterSlice.value)
  const dispatch = useAppDispatch()

  //  здесь по тестам перерисовывается еще и компонент TestComponent2, хотя для него стейт не меняется. 
  //но если вынести этот компонент наружу, на одном уровне с TextComponent то TestComponent2  не перерисовывается. что уже лучше 

  //даже если вынести тег p в отдельный компонент, для него это будет пропс, и поидее должен перерисовываться он, то перерисовывается все равно весь TestComponent.
  return (<div className={styles.root}> 
  <P>{counter}</P>
  <button onClick={() => dispatch(increment())}>+</button>
  <button onClick={() => dispatch(decrement())} >-</button>
  <TestComponent2/>

  </div>)
}