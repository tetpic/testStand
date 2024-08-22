'use client'
import { Ellipse, Layer, Rect, Stage } from 'react-konva'
import styles from './index.module.scss'
import Konva from 'konva'
import { useEffect, useRef, useState } from 'react'

interface Props {
}

export default function KonvaPage(props: Props) {
  const rect = useRef<Konva.Rect>(null!)
  const rect2 = useRef<Konva.Rect>(null!)
  const rect3 = useRef<Konva.Rect>(null!)
  const isActive = useRef(false)
  const layer = useRef<Konva.Layer>(null!)
  

  const setAnimation = () => {
    const anim = new Konva.Animation((frame) => {
      const amplitudeX = 200
      const amplitudeY = 50
      
      rect.current?.x((Math.cos((frame!.time / 1000 +  2.9)) * amplitudeX) + 195)
      rect.current?.y((Math.cos((frame!.time / 1000 +  1.3)) * amplitudeY) + 45)
      rect2.current?.x(-(Math.cos((frame!.time / 900 +  2.2)) * amplitudeX) + 195)
      rect2.current?.y(-(Math.cos((frame!.time / 900 +  0.6)) * amplitudeY) + 45)
      rect3.current?.x(-(Math.cos((frame!.time / 800 +  1.9)) * amplitudeX) + 195)
      rect3.current?.y(-(Math.cos((frame!.time / 800 +  0.3)) * amplitudeY) + 45)

    }, layer.current)
    anim.start()
    // setTimeout(() => {
    //   anim.stop()
    // }, 5000)
  }

  useEffect(()=>{
    if(isActive.current) return
    setAnimation()
    isActive.current = true
  }, [])

  return (<div className={styles.root}> 
    <Stage className={styles.stage} width={800} height={500}>
      <Layer ref={layer}>
        <Ellipse radiusX={200} radiusY={50} stroke={'black'} strokeWidth={2} x={200} y={50}/>
        <Rect width={10} height={10} fill={'red'} x={10} y={10} ref={rect} cornerRadius={4} />
        <Rect width={10} height={10} fill={'blue'} x={10} y={10} ref={rect2} cornerRadius={4} />
        <Rect width={10} height={10} fill={'green'} x={10} y={10} ref={rect3} cornerRadius={4} />
      </Layer>
    </Stage>
  </div>)
}