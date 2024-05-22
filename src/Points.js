import React, { createContext, useState } from 'react';

export const PointsContext = createContext();

export const PointsProvider = ({ children }) => {
  const [totalPoints, setTotalPoints] = useState(0);

  const addPoints = (points) => {
    setTotalPoints(totalPoints + points);
  };

  const subtractPoints = (points) => {
    setTotalPoints(totalPoints - points);
  };

  return (
    <PointsContext.Provider value={{ totalPoints, addPoints, subtractPoints }}>
      {children}
    </PointsContext.Provider>
  );
};

