import React from "react";
import {CardType, SwipeType} from "@/types";

interface CounterProps {
  testid: string
  label: string
  count: number
  setLike: () => void
}

const Counter: React.FC<CounterProps> = ({count, label, testid, setLike}) => {
  return(
    <div onClick={setLike} className="flex flex-col items-center space-y-2">
      <div
        className="w-14 h-14 text-xl font-medium rounded-full bg-white inline-flex justify-center items-center"
        data-testid={testid}
      >
        {label === "Likes" ? <svg className="h-9 text-pink-400" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"></path>
        </svg> : <svg className="h-9" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"></path>
        </svg>}
      </div>
      <span className="text-xs text-white">{label}</span>
    </div>
  )
}

export default Counter