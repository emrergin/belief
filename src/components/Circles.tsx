import { useState,useRef,useEffect } from 'react';
import styles from '@/styles/Circles.module.css';

function Circles({bsr}:{bsr:boolean}){
    const [redRatio,setRedRatio]=useState(50);
    const range = useRef<HTMLInputElement>(null);
    const thumb = useRef<HTMLDivElement>(null);
    const track = useRef<HTMLDivElement>(null);
    const whiteCircle1 = useRef<HTMLDivElement>(null);
    const whiteCircle2 = useRef<HTMLDivElement>(null);
    // if(bsr){
      const blackCircle1 = useRef<HTMLDivElement>(null);
      const blackCircle2 = useRef<HTMLDivElement>(null);
    // }


  useEffect(()=>{
    thumb.current!.style.left = `${50}%`;
    thumb.current!.style.transform = `translate(-${50}%, -50%)`;
    track.current!.style.width = `${50}%`;
    whiteCircle1.current!.style.width=`150px`;
    whiteCircle1.current!.style.height=`150px`;
    whiteCircle2.current!.style.width=`150px`;
    whiteCircle2.current!.style.height=`150px`;
    if(bsr){
      blackCircle1.current!.style.display=`none`;
      blackCircle2.current!.style.display=`none`;
    }
  },[bsr])

  function updateSlider (e:React.ChangeEvent<HTMLInputElement>){
    setRedRatio(Number(e.target.value));
    thumb.current!.style.left = `${e.target.value}%`;
    thumb.current!.style.transform = `translate(-${e.target.value}%, -50%)`;
    track.current!.style.width = `${e.target.value}%`;
    whiteCircle1.current!.style.width=`${+e.target.value*3}px`;
    whiteCircle1.current!.style.height=`${+e.target.value*3}px`;
    whiteCircle2.current!.style.width=`${300-Number(e.target.value)*3}px`;
    whiteCircle2.current!.style.height=`${300-Number(e.target.value)*3}px`;
  }

  function choosePoint(){
    if(!bsr){return false;}
    const angle = Math.random()*Math.PI*2;
    const dist = Math.random()*150;
    const x=Math.cos(angle)*dist+150;
    const y=Math.sin(angle)*dist+150;
    console.log(angle,dist,x,y);
    blackCircle1.current!.style.display=`none`;
    blackCircle2.current!.style.display=`none`;
    // const chooseCircle = Math.floor(Math.random()*2)+1;
    const chooseCircle=1;
    if(chooseCircle===1){
      blackCircle1.current!.style.display="block";
      blackCircle1.current!.style.top=`${y}px`;
      blackCircle1.current!.style.left=`${x}px`;
      blackCircle1.current!.style.transform=`translate(-3px,-3px)`;
    }else{
      blackCircle2.current!.style.display="block";
      blackCircle2.current!.style.top=`${y}px`;
      blackCircle2.current!.style.left=`${x}px`;
      blackCircle2.current!.style.transform=`translate(-${y}px,-${x}px)`;
    }
  }

  return(
    <div>
      <div className={styles.center}>
        
        <div className={styles.wrap}>
          <input type="range" className={styles.range} ref={range} min="0" max="100" step="0.1" value={redRatio} onChange={(e) => updateSlider(e)}/>
          <div className={styles.track} >
            <div className={styles.trackInner} ref={track}></div>
          </div>
          <div className={styles.thumb} ref={thumb}></div>
        </div>
      </div>
      <div className={styles.circleHolder}>
        <div className={styles.bigCircle+' '+styles.blue+' '+styles.circle}>
          {bsr && <div className={styles.circle+' '+styles.black+' '+styles.smallestCircle} ref={blackCircle1}>
          </div>}
          <div className={styles.circle +' '+styles.white+' '+styles.smallCircle} ref={whiteCircle1}>
          </div>
        </div>
        <div className={styles.bigCircle+' '+styles.red+' '+styles.circle}>
          <div className={styles.circle+' '+styles.white+' '+styles.smallCircle} ref={whiteCircle2}>
          {bsr && <div className={styles.circle+' '+styles.black+' '+styles.smallestCircle} ref={blackCircle2}>
          </div>}
          </div>
        </div>
      </div>

      {bsr && <button className={styles.exp} onClick={choosePoint}>Choose Point </button>}
    </div>
  )
}

export default Circles;