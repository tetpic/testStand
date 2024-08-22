'use client';

import { useCallback, useEffect, useState } from 'react';
import styles from './index.module.scss';
import { pdfjs, Document, Page } from 'react-pdf';
import { Stage, Layer, Circle, Rect, Transformer, Text, Group } from 'react-konva';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';


import type { PDFDocumentProxy } from 'pdfjs-dist';
import classNames from 'classnames';
import Konva from 'konva';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
};

const resizeObserverOptions = {};

const maxWidth = 800;

type PDFFile = string | File | null;

export default function PDFInstance() {
  const [file, setFile] = useState<PDFFile>('./sample.pdf');
  const [numPages, setNumPages] = useState<number>();
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [signers, setSigners] = useState<Map<number, {1?: {x: number, y: number, ref: Konva.Rect}, 2?: {x: number, y: number, ref: Konva.Rect}}>>(new Map)

  const onResize = useCallback<ResizeObserverCallback>((entries) => {
    const [entry] = entries;

    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  const addSigner = (signer: 1|2) => {
    if(signers.get(currentPage)?.[signer]) {
      setSigners(state => {
        const _newObj = {...state.get(currentPage)}
        delete _newObj[signer]
        state.set(currentPage, _newObj)
        return new Map(state)
      })
    }
    else {
      setSigners(state => {
        const _newObj = {...state.get(currentPage), [signer]: {x: signer === 1 ? 0 : 400, y: 0}}
        state.set(currentPage, _newObj)
        return new Map(state)
      })
    }
  }

  const setCoordinates = (signer: number, coord: {x: number, y: number}) => {
    console.log(signer, coord)
    setSigners(state => {
      const _newObj = {...state.get(currentPage), [signer]: {x: coord.x, y: coord.y}}
      state.set(currentPage, _newObj)
      return new Map(state)
    })
  }

  useEffect(()=>{
    console.log(signers)
  }, [signers])


  function onFileChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { files } = event.target;

    const nextFile = files?.[0];

    if (nextFile) {
      setFile(nextFile);
    }
  }

  function onDocumentLoadSuccess({ numPages: nextNumPages }: PDFDocumentProxy): void {
    setNumPages(nextNumPages);
  }

  return (
    <div className="Example">
      <header>
        <h1>react-pdf sample page</h1>
      </header>
      <div className="Example__container">
        <div className="Example__container__load">
          <label htmlFor="file">Load from file:</label>{' '}
          <input onChange={onFileChange} type="file" />
        </div>
          <p>Выберите страницу</p>
        <div className={styles.pagination}></div>
        <div className={styles.pagination}>
          {Array.from(new Array(numPages), (_el, index) => (
            <button
              key={`page_${index + 1}`}
              className={classNames(currentPage === index + 1 && styles.button_active, styles.button)}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <div className={styles.signers}>
          <button onClick={() => addSigner(1)} className={classNames(styles.signer, signers.get(currentPage)?.[1] && styles.signer_active)}>Подписант 1</button>
          <button onClick={() => addSigner(2)} className={classNames(styles.signer, signers.get(currentPage)?.[2] && styles.signer_active)}>Подписант 2</button>
        </div>

        <div className={styles.container} ref={setContainerRef}>
          <div className={styles.signersContainer}>
          <Stage width={800} height={1132}>
            <Layer>
              {signers.get(currentPage) && Object.entries(signers.get(currentPage)!).map(([key, {x, y}]) => (
                <Group 
                onDragEnd={(e) => {
                  setCoordinates(Number(key), {x: e.target.x(), y: e.target.y()})
                }}
                key={currentPage.toString() + key.toString()}  
                x={x} 
                y={y} 
                draggable 
                >
                  <Rect x={0} width={200} height={100} y={0} fill={Number(key) === 1? 'blue' : 'red'}/>
                  <Text 
                  fontSize={20} 
                  width={200} 
                  height={100} 
                  align="center"
                  padding={16}
                  fill="black" text={`Подписант ${key} \n\n email: test${key}.com`}
                  />
                </Group>
              ))}             
            </Layer>
          </Stage>
          </div>
          <Document file={file} onLoadSuccess={onDocumentLoadSuccess} options={options} className={styles.document}>
              <Page
                pageNumber={currentPage}
                width={containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth}
              />
          </Document>
        </div>
      </div>
    </div>
  );
}


