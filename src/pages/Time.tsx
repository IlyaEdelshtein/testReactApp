import React from 'react';
import { useTheme } from '@mui/material/styles';

const Time: React.FC = () => {
  const [time, setTime] = React.useState(new Date());
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const theme = useTheme();

  React.useEffect(() => {
    const update = () => {
      setTime(new Date());
      setPosition({
        x: Math.random() * (window.innerWidth - 100),
        y: Math.random() * (window.innerHeight - 50),
      });
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: 'transform 0.5s ease-in-out',
        fontSize: '2rem',
        color: theme.palette.text.primary,
      }}
    >
      {time.toLocaleTimeString()}
    </div>
  );
};

export default Time;
