import type {NextPage} from "next";
import CARDS from "@/data/cards";
import {useState} from "react";
import Head from "next/head";
import {AnimatePresence} from "framer-motion";
import RotateIcon from "@/icons/RotateIcon";
import Counter from "@/components/Counter";
import {CardType, ResultType, SwipeType, HistoryType, LikeType} from "@/types";
import Card from "@/components/Card";

const Home: NextPage = () => {
  const [like, setLike] = useState<LikeType>('');
  const [cards, setCards] = useState(CARDS);
  const [result, setResult] = useState<ResultType>({
    like: 0,
    nope: 0,
  });
  const [history, setHistory] = useState<HistoryType[]>([]);
  // index of last card
  const activeIndex = cards.length - 1;
  const removeCard = (oldCard: CardType, swipe: SwipeType) => {
    setHistory((current) => [...current, { ...oldCard, swipe }]);
    setCards((current) =>
      current.filter((card) => {
        return card.id !== oldCard.id;
      })
    );
    setResult((current) => ({ ...current, [swipe]: current[swipe] + 1 }));
  };
  const undoSwipe = () => {
    const newCard = history.pop();
    if (newCard) {
      const { swipe } = newCard;
      setHistory((current) =>
        current.filter((card) => {
          return card.id !== newCard.id;
        })
      );
      setResult((current) => ({ ...current, [swipe]: current[swipe] - 1 }));
      setCards((current) => [...current, newCard]);
    }
  };
  return (
    <div className="relative flex flex-col justify-center items-center w-full h-screen gradient">
      <Head>
        <title>Tinder cards with Framer motion</title>
      </Head>
      <AnimatePresence>
        {cards.map((card, index) => (
          <Card
            key={card.name}
            active={index === activeIndex}
            removeCard={removeCard}
            card={card}
            like={like}
            setLike={setLike}
          />
        ))}
      </AnimatePresence>
      {cards.length === 0 ? (
        <>
          <span className="text-slate-500 font-bold text-xl">今日のピックアップは以上です</span>
          <span className="text-slate-500">毎朝8時に更新されます</span>
        </>
      ) : null}
      <footer className="absolute bottom-4 flex items-center space-x-4">
        <div className="flex flex-col items-center space-y-2">
          <button
            disabled={history.length === 0}
            className="w-14 h-14 rounded-full text-black bg-white inline-flex justify-center items-center disabled:cursor-not-allowed"
            onClick={undoSwipe}
            data-testid="undo-btn"
            aria-label="Undo Swipe"
          >
            <RotateIcon strokeWidth={3} />
          </button>
          <span className="text-xs text-white">Undo</span>
        </div>
        <Counter label="Skip" count={result.nope} testid="nope-count" setLike={() => setLike("nope")}/>
        <Counter label="Likes" count={result.like} testid="like-count" setLike={() => setLike("like")}/>
      </footer>
    </div>
  );
};

export default Home;
