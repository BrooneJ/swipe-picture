import CARDS from "@/data/cards";
import {SetStateAction} from "react";

export type ArrayElementType<ArrType> = ArrType extends readonly (infer ElementType)[] ? ElementType : never;

export type CardType = ArrayElementType<typeof CARDS>

export type SwipeType = "like" | "nope";

export type ResultType = Record<SwipeType, number>

export type HistoryType = CardType & { swipe: SwipeType }

type LikeType = 'like' | 'nope' | ''

export interface CardProps {
  card: CardType;
  active: boolean;
  removeCard: (oldCard: CardType, swipe: SwipeType) => void
  like: LikeType
  setLike: Dispatch<SetStateAction<LikeType>>
}