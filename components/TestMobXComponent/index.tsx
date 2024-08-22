'use client'

import { observable } from "mobx";
import { useStores } from "../../mobx/hooks";
import { observer } from "mobx-react";
import TestComponent2 from "../TestComponent2";
import TestMobxComponent2 from "../TestMobxComponent2";

interface Props {
}




const TestMobxComponentObservable = observer((props: Props)=> {
  console.count('test mobx component')
  const store = useStores();


  
  return (<div> 
    <p>{store.UiStore.count}</p>
    <button onClick={() => store.UiStore.increment()}>+ increment</button>
    <TestMobxComponent2/>
  </div>)
})

export default function TestMobxComponent(props: Props) {
  
  return (
    <>
  <TestMobxComponentObservable {...props} />
  
    </>
  )
}

