import {CardProps} from "@/types";
import {useEffect, useState} from "react";
import {PanInfo, motion, useMotionValue, useTransform} from "framer-motion";

const Card: React.FC<CardProps> = ({card, removeCard, active, like, setLike}) => {
  const [leaveX, setLeaveX] = useState(0)
  useEffect(() => {
    if (active) {
      if (like === "like") {
        setLeaveX(1000)
        removeCard(card, 'like')
        setLike('')
      } else if (like === "nope") {
        setLeaveX(-1000)
        removeCard(card, 'nope')
        setLike('')
      }
    }
  }, [like])
  const onDragEnd = (_e: any, info: PanInfo) => {
    if (info.offset.x > 100) {
      setLeaveX(1000)
      removeCard(card, 'like')
    }
    if (info.offset.x < -100) {
      setLeaveX(-1000)
      removeCard(card, 'nope')
    }
  }
  const className = `absolute h-[430px] w-[300px] bg-white shadow-xl rounded-2xl flex flex-col justify-center cursor-grab`
  const x = useMotionValue(0)
  const xInput = [-100, 1, 100];
  const rotate = useTransform(x, xInput, [6, 0, -6])
  const backgroundColor = useTransform(x, xInput, ["gray", "gray", "red"])
  const opacity = useTransform(x, xInput, [0.8, 0, 0.3])
  const opacitySkip = useTransform(x, xInput, [1, 0, 0])
  const opacityLike = useTransform(x, xInput, [0, 0, 1])
  return (
    <>
      {active ? (
        <motion.div
          drag={true}
          dragConstraints={{left: 0, right: 0, top: 0, bottom: 0}}
          style={{x, rotate}}
          onDragEnd={onDragEnd}
          initial={{
            scale: 1
          }}
          animate={{
            scale: 1.05,
          }}
          exit={{
            x: leaveX,
            opacity: 0,
            scale: 0.5,
            transition: {duration: 0.2}
          }}
          className={className}
          data-testid="active-card"
        >
          <motion.div style={{backgroundColor, opacity}} className="h-full w-full absolute top-0 z-10 rounded-xl">
            <motion.svg style={{opacity: opacityLike}} className="absolute text-white h-full w-full" fill="none"
                        stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"></path>
            </motion.svg>
            <motion.svg style={{opacity: opacitySkip}} className="absolute text-white h-full w-full" fill="none"
                        stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"></path>
            </motion.svg>
          </motion.div>
          <Emoji emoji={card.emoji} label={card.name}/>
          <Title title={card.name} born={card.born}/>
        </motion.div>
      ) : <div
        className={`${className} ${card.name.length % 2 === 0 ? 'rotate-6' : "-rotate-6"}`}
      >
        <Emoji emoji={card.emoji} label={card.name}/>
        <Title title={card.name} born={card.born}/>
      </div>}
    </>
  )
}

const Emoji: React.FC<{ emoji: string, label: string, x?: number }> = ({
  emoji,
  label
}) => {
  const backgroundImage = `url(/${emoji})`
  return (
    <div
      style={{backgroundImage}}
      className="z-0 w-full h-full bg-center bg-cover rounded-2xl"
      aria-label={label}
    />
  )
}

const Title: React.FC<{ title: string, born: string }> = ({title, born}) => {
  return (
    <div className="flex flex-col pl-4 absolute bottom-5">
      <span
        className="text-xl font-bold text-white"
      >{title}</span>
      <span className="text-sm font-bold text-white">出身：{born}</span>
    </div>
  )
}

export default Card