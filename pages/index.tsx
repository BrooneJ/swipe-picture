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
          <svg  className="h-10 mb-4 text-slate-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z"></path>
          </svg>
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
