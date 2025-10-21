import React from 'react';

// Theme constants for a more authentic feel
const POKEMON_THEME = {
  inputText: 'text-white',
  inputPlaceholder: 'placeholder-gray-500',
  inputBg: 'bg-transparent',
  inputBorder: 'border-b-2 border-gray-600 focus:border-amber-400',
};

// Health bar color logic
const getBarColor = (value) => {
  if (value >= 8) return 'bg-green-500'; // High HP
  if (value >= 4) return 'bg-yellow-500'; // Medium HP
  return 'bg-red-600'; // Low HP
};

export const PokemonStyleStatDisplay = ({ stat, onStatChange, isReadOnly }) => {
  const barColor = getBarColor(stat.value);
  const barWidth = `${stat.value * 10}%`;

  return (
    <div className="pixel-border p-3">
      {/* Stat Name and Value */}
      <div className="flex justify-between items-center mb-1">
        <input
          type="text"
          value={stat.name.toUpperCase()}
          onChange={(e) => onStatChange(stat.id, 'name', e.target.value)}
          maxLength="12"
          className={`flex-grow text-sm ${POKEMON_THEME.inputBg} ${POKEMON_THEME.inputText} ${POKEMON_THEME.inputPlaceholder} outline-none p-1 font-mono`}
          disabled={isReadOnly}
          aria-label="Stat Name"
        />
        <div className="flex items-center">
            <span className="text-xs text-gray-400 mr-1">Lv</span>
            <input
              type="number"
              min="1"
              max="10"
              value={stat.value}
              onChange={(e) => onStatChange(stat.id, 'value', e.target.value)}
              className={`w-12 text-center text-sm ${POKEMON_THEME.inputBg} ${POKEMON_THEME.inputText} outline-none`}
              disabled={isReadOnly}
              aria-label="Stat Value"
            />
        </div>
      </div>

      {/* Health Bar */}
      <div className="relative mb-2">
        <div className="absolute top-0 left-0 bg-black h-full w-full opacity-70 rounded-sm"></div>
        <div className="hp-bar bg-gray-700 border-2 border-gray-900">
          <div
            className={`hp-bar-inner ${barColor}`}
            style={{ width: barWidth }}
          ></div>
        </div>
      </div>
      
      {/* Description Input */}
      <input
        type="text"
        placeholder="Description..."
        value={stat.description}
        onChange={(e) => onStatChange(stat.id, 'description', e.target.value)}
        maxLength="50"
        className={`w-full mt-1 text-xs ${POKEMON_THEME.inputBg} text-gray-400 ${POKEMON_THEME.inputPlaceholder} outline-none p-1`}
        disabled={isReadOnly}
        aria-label="Stat Description"
      />
    </div>
  );
};
