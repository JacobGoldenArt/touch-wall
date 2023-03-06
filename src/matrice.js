import { useState } from 'react';
import './App.css';

const RoutesMaker = () => {
  const [Route, setRoute] = useState([
    Array.from({ length: 7 }, () => null), // A
    Array.from({ length: 5 }, () => null), // B
    Array.from({ length: 8 }, () => null), // C
    Array.from({ length: 7 }, () => null), // D
    Array.from({ length: 9 }, () => null), // E
    Array.from({ length: 8 }, () => null), // F
    Array.from({ length: 9 }, () => null), // G
    Array.from({ length: 8 }, () => null), // H
    Array.from({ length: 6 }, () => null), // I
  ]);
  const [Routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);

  const colors = [
    '#FFC300',
    '#FF5733',
    '#C70039',
    '#900C3F',
    '#581845',
    '#00FFFF',
    '#7FFFD4',
    '#DC143C',
    '#00FF7F',
    '#FF1493',
  ];
  const rowLetters = ['I', 'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A'];
  const rowLengths = [7, 5, 8, 7, 9, 8, 9, 8, 6];

  const handleCirclePress = (row, col) => {
    const updatedRoute = [...Route];
    const cell = updatedRoute[row][col];
    if (cell === 'selected') {
      updatedRoute[row][col] = null;
    } else {
      updatedRoute[row][col] = 'selected';
    }
    setRoute(updatedRoute);
  };

  const handleNewRoutePress = () => {
    setSelectedRoute(null);
    setRoute([
      Array.from({ length: 7 }, () => 'available'),
      Array.from({ length: 5 }, () => 'available'),
      Array.from({ length: 8 }, () => 'available'),
      Array.from({ length: 7 }, () => 'available'),
      Array.from({ length: 9 }, () => 'available'),
      Array.from({ length: 8 }, () => 'available'),
      Array.from({ length: 9 }, () => 'available'),
      Array.from({ length: 8 }, () => 'available'),
      Array.from({ length: 6 }, () => 'available'),
    ]);
  };

  const handleWriteNewRoutePress = () => {
    const updatedRoutes = [...Routes, Route];
    setRoutes(updatedRoutes);
    setSelectedRoute(updatedRoutes.length - 1);
    setRoute(Array.from({ length: 10 }, (_, i) => Array.from({ length: rowLengths[i] }, () => 'available')));
  };

  const handleWriteRoutesPress = () => {
    // Export the routes array as JSON
    const json = JSON.stringify(Routes);
    console.log(json);
  };

  const handleRoutePress = (index) => {
    setSelectedRoute(index);
    setRoute(Routes[index]);
  };

  const handleDeleteRoutePress = (index) => {
    const updatedRoutes = [...Routes];
    updatedRoutes.splice(index, 1);
    setRoutes(updatedRoutes);
    if (selectedRoute === index) {
      setSelectedRoute(null);
    } else if (selectedRoute > index) {
      setSelectedRoute(selectedRoute - 1);
    }
  };

  return (
    <div className="App-header">
      <div className="matrice">
        {Route.map((row, i) => (
          <div key={i} className="row" style={{ backgroundColor: colors[i] }}>
            <span className="rowLetter">{rowLetters[i]}</span>
            <div className="rowCells">
              {row.map((cell, j) => (
                j < rowLengths[i] && (
                  <button
                    key={j}
                    className={[
                      "circle",
                      cell === "selected" ? "yellowCircle" : "greenCircle",
                      selectedRoute !== null ? "disabledCircle" : null,
                      `cell${i}${j}`,
                    ].join(" ")}
                    onClick={() => handleCirclePress(i, j)}
                    disabled={selectedRoute !== null}
                  />
                )
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="buttons">
        <button className="button" onClick={handleNewRoutePress}>
          <span className="buttonText">New Route</span>
        </button>
        <button className="button" onClick={handleWriteNewRoutePress}>
          <span className="buttonText">Write New Route</span>
        </button>
        <button className="button" onClick={handleWriteRoutesPress}>
          <span className="buttonText">Write Routes</span>
        </button>
      </div>
      <div className="routes">
        {Routes.map((route, i) => (
          <div key={i} className="route">
            <button className="routeButton" onClick={() => handleRoutePress(i)}>
              <span className="routeText">Route {i + 1}</span>
            </button>
            <button className="deleteButton" onClick={() => handleDeleteRoutePress(i)}>
              <span className="deleteText">X</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};  

export default RoutesMaker;
