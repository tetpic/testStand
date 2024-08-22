'use client'
import { useAppDispatch, useAppSelector, useAppStore } from "../../lib/hooks"


interface Props {
}

export default function TestComponent2(props: Props) {
  console.count('test component 2')
  const store = useAppStore()
  const counter = useAppSelector((state) => state.counterSlice.value2)


  return (<div > 
    <p>{counter}</p>
  </div>)
}