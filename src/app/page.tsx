import Link from "next/link";
import TestComponent from "../../components/TestComponent";
import TestComponent2 from "../../components/TestComponent2";
import TestMobxComponent from "../../components/TestMobXComponent";
import Canvas from "./canvas/canvas";
import styles from "./page.module.scss";


export default function Home() {




  return (
    <main className={styles.main}>
      <Link href={"/canvas"}/>
      <Link href={"/pdfviewer"}/>
      {/* <TestMobxComponent/> */}
       {/* <TestComponent/> */}
        {/* <TestComponent2/> */}
      {/* <Canvas/> */}
    </main>
  );
}
