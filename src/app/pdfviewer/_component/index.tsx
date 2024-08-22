import styles from './index.module.scss'
import dynamic from 'next/dynamic'
import PdfInstance from './PdfInstance'


interface Props {
}

export default function PdfViewer(props: Props) {

  return (<div className={styles.root}> 
    <PdfInstance/>
  </div>)
}