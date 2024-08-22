'use client'
import styles from "./index.module.scss";
import { useEffect, useRef, useState } from "react";


interface Props {
}

type BezierCurvePositions = "cp1"|"cp2"|"start"|"end"

export default function CanvasStand(props: Props) {
  const canvas = useRef<HTMLCanvasElement>(null!)
  const elPosition = useRef<{x: number, y: number}>(null!)
  const [currentElement, setCurrentElement] = useState<BezierCurvePositions|undefined>(undefined)
  const [bezierHandler, setHandler] = useState<{cp1: {x: number, y: number}, cp2: {x: number, y: number}, start: {x: number, y: number}, end: {x: number, y: number}}>({
   cp1: {x:80, y:80},
   cp2: {x:40, y:80},
   start: {x:40, y:40},
   end: {x:80, y:40}
  })

  const init = () => {
    const c = canvas.current.getContext('2d')
    if(!c) return
    c.clearRect(0, 0, c.canvas.width, c.canvas.height)

    c.beginPath()
    c.moveTo(bezierHandler.start.x, bezierHandler.start.y)
    c.bezierCurveTo(bezierHandler.cp1.x, bezierHandler.cp1.y, bezierHandler.cp2.x, bezierHandler.cp2.y, bezierHandler.end.x, bezierHandler.end.y)
    c.stroke()
    
    c.beginPath()
    c.arc(bezierHandler.start.x, bezierHandler.start.y, 10, 0, Math.PI * 2, true)
    c.stroke()

    c.beginPath()
    c.arc(bezierHandler.end.x, bezierHandler.end.y, 10, 0, Math.PI * 2, true)
    c.stroke()

    c.beginPath()
    c.moveTo(bezierHandler.end.x, bezierHandler.end.y)
    c.lineTo(bezierHandler.cp1.x, bezierHandler.cp1.y)
    c.stroke()

    c.beginPath()
    c.moveTo(bezierHandler.start.x, bezierHandler.start.y)
    c.lineTo(bezierHandler.cp2.x, bezierHandler.cp2.y)
    c.stroke()

    c.beginPath()
    c.arc(bezierHandler.cp1.x, bezierHandler.cp1.y, 5, 0, Math.PI * 2, true)
    c.stroke()
    
    c.beginPath()
    c.arc(bezierHandler.cp2.x, bezierHandler.cp2.y, 5, 0, Math.PI * 2, true)
    c.stroke()
    
    c.fillStyle = "rgb(200,0,0)";
    c.strokeRect(10, 10, 55, 50);

    c.fillStyle = "rgba(0, 0, 200, 0.5)";
    c.strokeRect(40, 100, 100, 150);

    c.beginPath();
    c.moveTo(85, 50);
    c.lineTo(100, 75);
    c.lineTo(100, 25);
    c.closePath();
    c.stroke()

    c.beginPath()
    c.arc(200, 200, 50, 0, Math.PI, true)
    c.stroke()

    c.beginPath()
    c.moveTo(564, 273)
    c.bezierCurveTo(520, 304, 297, 409, 136, 260)
    c.stroke()
  }

  const onInputChange =( e: React.ChangeEvent<HTMLInputElement>, key: string, value: number) => {
    setHandler(prev => {
      return {
        ...prev,
        [key]: Number(e.target.value)
      }
    })
  }

  const onMouseUp = (e: React.MouseEvent) => {
    setCurrentElement(undefined)
  }

  const onMouseMove = (e: React.MouseEvent) => {
    if(currentElement){
      console.log(e)
    }

  }

  const onDown = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const target = e.target as HTMLCanvasElement
    if(!elPosition.current) {
      elPosition.current = target.getBoundingClientRect()
    }
    const pos: {x: number, y: number} = {x: e.clientX - elPosition.current.x , y: e.clientY - elPosition.current.y}
    Object.entries(bezierHandler).forEach(([key, value])=>{
      if(pos.x > value.x - 6 && pos.x < value.x + 6 && pos.y > value.y - 6 && pos.y < value.y + 6){
        setCurrentElement(key as BezierCurvePositions)
      }

      if(key.includes("X") && pos.x > value.x - 6 && pos.x < value.y + 6){
        console.log(key)
        setCurrentElement('cp1')
      }
      if(key.includes("Y") && pos.y > value.y - 6 && pos.y < value.y + 6){
        setCurrentElement('cp2')
      }
    })
  }

  useEffect(()=>{
    console.log(currentElement)
      
  }, [currentElement])

  useEffect(()=>{
    init()
    console.log(bezierHandler)
  }, [bezierHandler])

  return (<div className={styles.root}> 
    <div className={styles.helper}>
      {Object.entries(bezierHandler).map(([key, value])=>{
        return <input key={key} type='range' min="0" max="700" onChange={(e)=>onInputChange(e, key, Number(e.target.value))} value={value}/>
      })}
    </div>
    <canvas 
    className={styles.canvas} 
    width={700} 
    height={450} 
    ref={canvas}
    onMouseMove={(e)=>onMouseMove(e)}
    onMouseUp={onMouseUp}
    onMouseDown={(e)=>onDown(e)}
    ></canvas>
  </div>)
}