import React from 'react';
import "./Pokedex.css";

function Pokedex(props) {

  return (
    <div id="device">
      <div id="screen"></div>
      <div id="selection-buttons">
        <button>
          <i className="arrow left"/>
        </button>
        <button>
          <i className="arrow right"/>
        </button>
      </div>
      <div id="info"></div>
    </div>
  );
}

export default Pokedex;
