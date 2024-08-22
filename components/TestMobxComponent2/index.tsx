'use client'

import { observer } from "mobx-react";
import { useStores } from "../../mobx/hooks";

interface Props {
}

const TestMobxComponent2Observable = observer((props: Props)=> {
  console.count('test mobx component 2')
  const store = useStores();


  return (<div > 
    <p>{store.UiStore.count2}</p>

  </div>)
})

export default function TestMobxComponent2(props: Props) {
  return (
    <TestMobxComponent2Observable {...props} />
  )
}