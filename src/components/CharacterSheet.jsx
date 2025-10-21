import React from 'react';
import { Inventory } from './Inventory';
import { PokemonStyleStatDisplay } from './PokemonStyleStatDisplay'; // <-- Import the new component

const JRPG_THEME = {
  frameBorder: 'border-2 border-amber-400',
  containerBg: 'bg-gray-900',
  textPrimary: 'text-amber-200',
  textSecondary: 'text-gray-400',
  buttonBg: 'bg-amber-600 hover:bg-amber-500',
  buttonText: 'text-gray-900 font-bold',
};

// Simplified Frame component for main sections
const Frame = ({ title, children }) => (
  <div className={`p-4 ${JRPG_THEME.frameBorder} ${JRPG_THEME.containerBg} bg-opacity-80`}>
    <h2 className={`text-xl font-bold mb-4 ${JRPG_THEME.textPrimary} tracking-wider`}>{title}</h2>
    {children}
  </div>
);


export const CharacterSheet = ({
    characterData,
    stats, onStatChange, onAddStat, onRemoveStat,
    inventory, setInventory,
    currencies, setCurrencies,
    isReadOnly = false
}) => {
  const { name, characterClass, level } = characterData;
  return (
    <div className="md:col-span-2 space-y-6">
      <Frame title="CHARACTER STATUS">
        <div className="flex justify-between text-lg">
          <p><span className={JRPG_THEME.textSecondary}>NAME:</span> <span className={JRPG_THEME.textPrimary}>{name}</span></p>
          <p><span className={JRPG_THEME.textSecondary}>CLASS:</span> <span className={JRPG_THEME.textPrimary}>{characterClass}</span></p>
          <p><span className={JRPG_THEME.textSecondary}>LEVEL:</span> <span className={JRPG_THEME.textPrimary}>{level}</span></p>
        </div>
      </Frame>

      {/* --- UPDATED: Using the new Pokemon-style stat display --- */}
      <Frame title="PRIMARY METRICS">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {stats.map(stat => (
            <div key={stat.id} className="relative group">
              <PokemonStyleStatDisplay 
                stat={stat} 
                onStatChange={onStatChange} 
                isReadOnly={isReadOnly} 
              />
              {!isReadOnly && stats.length > 5 && (
                <button 
                  onClick={() => onRemoveStat(stat.id)} 
                  className="absolute -top-2 -right-2 text-red-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity font-bold text-2xl bg-gray-800 rounded-full h-8 w-8 flex items-center justify-center leading-none"
                  aria-label="Remove Stat"
                >
                  &times;
                </button>
              )}
            </div>
          ))}
        </div>
        {!isReadOnly && stats.length < 7 && (
          <button onClick={onAddStat} className={`w-full mt-6 py-2 ${JRPG_THEME.buttonBg} ${JRPG_THEME.buttonText} rounded-sm`}>+ Add Metric</button>
        )}
      </Frame>

      <Frame title="INVENTORY">
          <Inventory
            inventory={inventory}
            setInventory={setInventory}
            currencies={currencies}
            setCurrencies={setCurrencies}
            isReadOnly={isReadOnly}
          />
      </Frame>
    </div>
  );
};
