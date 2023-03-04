import styles from '@/styles/Home.module.css';
import cStyles from '@/styles/Custom.module.css';

import Intro from '@/components/Intro';
import Circles from './Circles';

import {
  useStateValue
} from "../state";

function Experiment(){
    const [{ phase }] = useStateValue();
  return(
    <main className={styles.main}>
        <p className={cStyles.debug}>            
            {phase}
        </p>
        {phase==="INTRO" && <Intro/> } 
        {phase==="QSR" && <Circles bsr={false}/> } 
        {phase==="BSR" && <Circles bsr={true}/> } 
    </main>
  )
}

export default Experiment;