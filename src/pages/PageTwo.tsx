import React from 'react';

const PageTwo: React.FC = () => {
  const [time, setTime] = React.useState(new Date());
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

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
      }}
    >
      {time.toLocaleTimeString()}
    </div>
  );
};

export default PageTwo;
