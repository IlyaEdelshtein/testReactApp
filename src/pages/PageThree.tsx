import React from 'react';
import styled, { keyframes, css } from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: ${({ theme }) => theme.palette.text.primary};
`;

const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-template-rows: repeat(3, 100px);
  gap: 8px;
`;

const appear = keyframes`
  from {
    transform: scale(0) rotate(180deg);
    opacity: 0;
  }
  to {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
`;

const blink = keyframes`
  0%, 100% {
    background-color: transparent;
  }
  50% {
    background-color: rgba(255, 215, 0, 0.5);
  }
`;

interface SquareProps {
  animate: boolean;
  winning: boolean;
}

const Square = styled.button<SquareProps>`
  width: 100px;
  height: 100px;
  font-size: 2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.palette.text.primary};
  background: ${({ theme }) => theme.palette.background.paper};
  border: 2px solid ${({ theme }) => theme.palette.text.primary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  ${({ animate }) =>
    animate &&
    css`
      animation: ${appear} 0.4s ease forwards;
    `}
  ${({ winning }) =>
    winning &&
    css`
      animation: ${blink} 1s linear infinite;
    `}
`;

const Status = styled.div`
  margin-top: 1rem;
  font-size: 1.25rem;
`;

const winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const PageThree: React.FC = () => {
  const [board, setBoard] = React.useState<(null | 'X' | 'O')[]>(
    Array(9).fill(null)
  );
  const [xIsNext, setXIsNext] = React.useState(true);
  const [winner, setWinner] = React.useState<null | 'X' | 'O' | 'Draw'>(null);
  const [lastMove, setLastMove] = React.useState<number | null>(null);
  const [winningCells, setWinningCells] = React.useState<number[]>([]);

  const checkWinner = (b: (null | 'X' | 'O')[]) => {
    for (const [a, b1, c] of winningLines) {
      if (b[a] && b[a] === b[b1] && b[a] === b[c]) {
        return { player: b[a] as 'X' | 'O', line: [a, b1, c] };
      }
    }
    return null;
  };

  const handleClick = (idx: number) => {
    if (board[idx] || winner) return;
    const newBoard = board.slice();
    newBoard[idx] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setLastMove(idx);
    const res = checkWinner(newBoard);
    if (res) {
      setWinner(res.player);
      setWinningCells(res.line);
    } else if (newBoard.every(Boolean)) {
      setWinner('Draw');
    } else {
      setXIsNext(!xIsNext);
    }
  };

  const reset = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
    setLastMove(null);
    setWinningCells([]);
  };

  return (
    <Container>
      <Board>
        {board.map((val, idx) => (
          <Square
            key={idx}
            onClick={() => handleClick(idx)}
            animate={idx === lastMove}
            winning={winningCells.includes(idx)}
            disabled={!!val || !!winner}
          >
            {val}
          </Square>
        ))}
      </Board>
      <Status>
        {winner
          ? winner === 'Draw'
            ? 'It\'s a draw!'
            : `${winner} wins!`
          : `Next player: ${xIsNext ? 'X' : 'O'}`}
      </Status>
      {winner && (
        <button onClick={reset} style={{ marginTop: '0.5rem' }}>
          Play Again
        </button>
      )}
    </Container>
  );
};

export default PageThree;
