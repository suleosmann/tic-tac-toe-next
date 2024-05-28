'use client';

import { useState, useEffect } from "react";

interface BlueDiv {
  id: number;
  value: string;
}

export default function Home() {
  const initialBlueDivs: BlueDiv[] = [
    { id: 1, value: '' },
    { id: 2, value: '' },
    { id: 3, value: '' },
    { id: 4, value: '' },
    { id: 5, value: '' },
    { id: 6, value: '' },
    { id: 7, value: '' },
    { id: 8, value: '' },
    { id: 9, value: '' },
  ];

  const [blueDivs, setBlueDivs] = useState<BlueDiv[]>(initialBlueDivs);
  const [userTurn, setUserTurn] = useState<boolean>(true);
  const [winner, setWinner] = useState<string | null>(null);

  const handleClick = (id: number): void => {
    if (userTurn && !winner) {
      const updatedDivs = blueDivs.map((div) =>
        div.id === id && div.value === '' ? { ...div, value: 'X' } : div
      );
      setBlueDivs(updatedDivs);
      setUserTurn(false);
    }
  };

  useEffect(() => {
    const checkWinner = (): void => {
      const winningCombos: number[][] = [
        [1, 2, 3], [4, 5, 6], [7, 8, 9], // Rows
        [1, 4, 7], [2, 5, 8], [3, 6, 9], // Columns
        [1, 5, 9], [3, 5, 7] // Diagonals
      ];

      for (const combo of winningCombos) {
        const [a, b, c] = combo;
        const divA = blueDivs.find(div => div.id === a);
        const divB = blueDivs.find(div => div.id === b);
        const divC = blueDivs.find(div => div.id === c);

        if (divA && divB && divC && divA.value !== '' && divA.value === divB.value && divB.value === divC.value) {
          setWinner(divA.value);
          return;
        }
      }
    };

    checkWinner();

    if (!userTurn && !winner) {
      const setRandomO = (): void => {
        const emptyDivs = blueDivs.filter((div) => div.value === '');
        if (emptyDivs.length > 0) {
          const randomIndex = Math.floor(Math.random() * emptyDivs.length);
          const randomDiv = emptyDivs[randomIndex];
          const updatedDivs = blueDivs.map((div) =>
            div.id === randomDiv.id ? { ...div, value: 'O' } : div
          );
          setBlueDivs(updatedDivs);
          setUserTurn(true);
        }
      };

      setTimeout(setRandomO, 1000);
    }
  }, [blueDivs, userTurn, winner]);

  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <div className="w-[40vw] h-[70vh] grid grid-cols-3 p-2 gap-2">
        {blueDivs.map((div) => (
          <div
            key={div.id}
            id={`blue-div-${div.id}`}
            className="bg-blue-600 h-48 rounded-lg text-9xl text-center pt-6 cursor-pointer"
            onClick={() => handleClick(div.id)}
          >
            {div.value}
          </div>
        ))}
      </div>
      {winner && (
        <div className="mt-4 text-3xl">
          {winner === 'X' ? 'You win!' : 'AI wins!'}
        </div>
      )}
    </main>
  );
}
