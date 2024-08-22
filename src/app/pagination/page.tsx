'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import styles from './index.module.scss'

interface Props {
}

const data: Map<number, {text: string}[]> = new Map([
  [1, [
    {text: '1'},
    {text: '2'},
    {text: '3'},
    {text: '4'},
    {text: '5'},
    {text: '6'},
    {text: '7'},
    {text: '8'},
    {text: '9'},
    {text: '10'},
  ]],
  [2, [
    {text: '11'},
    {text: '12'},
    {text: '13'},
    {text: '14'},
    {text: '15'},
    {text: '16'},
    {text: '17'},
    {text: '18'},
    {text: '19'},
    {text: '20'},
  
   
  ]],
  [3, [
    {text: '21'},
    {text: '22'},
    {text: '23'},
    {text: '24'},
    {text: '25'},
    {text: '26'},
    {text: '27'},
    {text: '28'},
    {text: '29'},
    {text: '30'},
  
  ]],
  [4, [
    {text: '31'},
    {text: '32'},
    {text: '33'},
    {text: '34'},
    {text: '35'},
    {text: '36'},
    {text: '37'},
    {text: '38'},
    {text: '39'},
    {text: '40'},
 
 
  ]],
  [5, [
    {text: '41'},
    {text: '42'},
    {text: '43'},
    {text: '44'},
    {text: '45'},
    {text: '46'},
    {text: '47'},
    {text: '48'},
    {text: '49'},
    {text: '50'},
  
  ]],
  [6, [
    {text: '51'},
    {text: '52'},
    {text: '53'},
    {text: '54'},
    {text: '55'},
    {text: '56'},
    {text: '57'},
    {text: '58'},
    {text: '59'},
    {text: '60'},
  
  ]],
  [7, [
    {text: '61'},
    {text: '62'},
    {text: '63'},
    {text: '64'},
    {text: '65'},
    {text: '66'},
    {text: '67'},
    {text: '68'},
    {text: '69'},
    {text: '70'},
  
  ]],
  [8, [
    {text: '71'},
    {text: '72'},
    {text: '73'},
    {text: '74'},
    {text: '75'},
    {text: '76'},
    {text: '77'},
    {text: '78'},
    {text: '79'},
    {text: '80'},
  
  ]],
  [9, [
    {text: '81'},
    {text: '82'},
    {text: '83'},
    {text: '84'},
    {text: '85'},
    {text: '86'},
    {text: '87'},
    {text: '88'},
    {text: '89'},
    {text: '90'},
  
  ]],
  [10, [
    {text: '91'},
    {text: '92'},
    {text: '93'},
    {text: '94'},
    {text: '95'},
    {text: '96'},
    {text: '97'},
    {text: '98'},
    {text: '99'},
    {text: '100'},
  
  ]],

])

export default function Pagination(props: Props) {
  const [pages, setPages] = useState<[number, number, number, number, number]>([1,2,3,4,5])
  const rootRef = useRef<HTMLDivElement>(null!)
  const [pagesRef, setPagesRef] = useState<HTMLDivElement[]>([])
  const observerRef = useRef<IntersectionObserver>(null!)
  const mutationsRef = useRef<MutationObserver>(null!)
  const currentPage = useRef(1)
  const pagesCount = [...data.keys()].length
  const timeout = useRef<ReturnType<typeof setTimeout>>()
  const loadingPage = useRef(false)
  const backwards = useRef<HTMLDivElement>(null!)
  const forwards = useRef<HTMLDivElement>(null!)

  const observerCallback:IntersectionObserverCallback = useCallback((entries, observer) => {
    entries.forEach(entry => {
      const target = entry.target as HTMLDivElement
      console.log(target.previousSibling, target.nextSibling)
      const direction = (((target.nextSibling as HTMLDivElement)?.dataset?.trigger === 'backwards')&&'backwards')|| (((target.previousSibling as HTMLDivElement)?.dataset.trigger === 'forwards')&&'forwards')
      if(entry.isIntersecting){
        console.dir(direction)
        // console.dir(target.previousSibling)
        
      


        // const targetDirection = target.dataset.trigger as 'backwards' | 'forwards'

        switch(direction) {
          case 'backwards': {
           
            // if(pages[0] < pagesCount) {
              setPages(state => {
                if(state[4] < pagesCount){
                  return [state[0]+1, state[1]+1, state[2]+1, state[3]+1, state[4]+1]
                }
                else {
                  return state
                }
              })
            // }
          }
          break
          case 'forwards': {
                   
            setPages(state => {
              if(state[0] > 1) {
                return [state[0]-1, state[1]-1, state[2]-1, state[3]-1, state[4]-1]
              }
              else {
                return state
              }
            })
          }
          break
        }

      //   const _currentPage = Number(target.dataset.page)
      //   console.log(currentPage.current, _currentPage)
        
        
      //   if(_currentPage !== currentPage.current && _currentPage < pagesCount) {
      //     // loadingPage.current = true
      //     // timeout.current = setTimeout(() => {
      //     //   loadingPage.current = false
      //     // }, 500)
  
      //     currentPage.current = _currentPage         
      //       setPages(_ => {
      //         return [(_currentPage < pagesCount&&_currentPage+1),  _currentPage, (_currentPage>1&&_currentPage-1),].filter(Boolean) as number[]
      //       })          
        
      }
    })
  }, [pages])

  const setObserver = () => {
    // observerRef.current?.disconnect()
    observerRef.current = new IntersectionObserver(observerCallback, {
      root: rootRef.current,
      threshold: 0.1
    })


    if(!backwards.current || !forwards.current) return
   
    observerRef.current?.observe(backwards.current.previousSibling as HTMLDivElement)
    observerRef.current?.observe(forwards.current.nextSibling as HTMLDivElement)
    // rootRef.current.childNodes.forEach(r => {
    // })  
  }

  // const setMutations = useCallback(() => {
  //   mutationsRef.current = new MutationObserver((mutationsList, observer) => {
 
   
  //     setTimeout(() => {
  //       console.log(mutationsList)
  //       rootRef.current.childNodes.forEach(r => {
  //         observerRef.current.observe(r as HTMLDivElement)
  //       })  
  //     }, 200)
  //     // observerRef.current?.disconnect()
  //     // rootRef.current.childNodes.forEach(r => {
  //     //   observerRef.current.observe(r as HTMLDivElement)
  //     // })  
  //     // observerRef.current.observe( as HTMLDivElement)
  //     // mutationsList.forEach(mutation => {
  //     //   mutation.addedNodes.forEach(el => {
  //     //     observerRef.current.observe(el as HTMLDivElement)
  //     //   })
  //     // })
  //   })
  //   mutationsRef.current.observe(rootRef.current, {childList: true})
  // }, [rootRef])



  useEffect(()=>{   
    // const root = document?.querySelector?.('[data-container="root"]')
    // if(root) {
    //   root.scrollTop = rootRef.current.scrollHeight
    // }

    if(!loadingPage.current) {

      setTimeout(() => {
        setObserver()
        // setMutations()
      }, 0)
      loadingPage.current = true
    }
  }, [])


  useEffect(()=>{
    console.log(pages);
    if( observerRef.current &&loadingPage.current) {
      // setTimeout(() => {
        observerRef.current.disconnect()
        
        
        observerRef.current.observe(backwards.current.previousSibling as HTMLDivElement)
        observerRef.current.observe(forwards.current.nextSibling as HTMLDivElement)
      // }, 300)
    }
    
    
  }, [pages])

  return (<div className={styles.root} ref={rootRef} data-container="root" >  
    <div className={styles.wrapper}  >

      <div className={styles.forwardsTrigger} ref={forwards} data-trigger={"forwards"}></div>
    {[...pages].map((page, i) => {
      return <div key={page} data-page={page} className={styles.page}>
      {data.get(page)&& [...(data.get(page)||[])].reverse().map((el, index) => {
        return (       
          <div key={index} className={styles.itemWrapper}>
            <div style={{height: (index+1)*10 + (page+1)*10}}  className={styles.item}>{el.text} </div>
          </div>
        )
      })}
      </div>
    })}
    <div className={styles.backwardsTrigger} ref={backwards} data-trigger={"backwards"}></div>
    </div>

  </div>)
}

