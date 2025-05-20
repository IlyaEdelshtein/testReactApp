import React from 'react';

const PageTwo: React.FC = () => {
  const [time, setTime] = React.useState(new Date());
  const [position, setPosition] = React.useState({ top: 0, left: 0 });

  React.useEffect(() => {
    const update = () => {
      setTime(new Date());
      setPosition({
        top: Math.random() * (window.innerHeight - 50),
        left: Math.random() * (window.innerWidth - 100),
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
        top: position.top,
        left: position.left,
        transition: 'top 0.5s linear, left 0.5s linear',
        fontSize: '2rem',
      }}
    >
      {time.toLocaleTimeString()}
    </div>
  );
};

export default PageTwo;
