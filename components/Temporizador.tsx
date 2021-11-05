import { CountdownCircleTimer } from "react-countdown-circle-timer"
import styles from "../styles/Temporizador.module.css"

interface TemporizadorProps {
    key: any
    duracao: number 
    tempoEsgotado: () => void
}

export default function Temporizador(props: TemporizadorProps) {
    return (
        <div className={styles.temporizador}>
            <CountdownCircleTimer 
                isPlaying
                duration={props.duracao}
                size={120}
                onComplete={props.tempoEsgotado}
                colors={[
                    // ['#BCE596', 0.33],

                    ['#4ED212', 0.45],
                    ['#F7B801', 0.35],
                    ['#DC2020', 0.20],

                    // ['#ED827A', 0.33],
                ]}>
                    {({ remainingTime }) => remainingTime}
                </CountdownCircleTimer>
        </div>
    )
}