import React from 'react';
import JRPGStatBar from '../JRPGStatBar';
import { Inventory } from './Inventory'; // <-- Import new component

const JRPG_THEME = {
  frameBorder: 'border-2 border-amber-400',
  containerBg: 'bg-gray-900',
  textPrimary: 'text-amber-200',
  textSecondary: 'text-gray-400',
  buttonBg: 'bg-amber-600 hover:bg-amber-500',
  buttonText: 'text-gray-900 font-bold',
};

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

      <Frame title="PRIMARY METRICS">
        {stats.map(stat => (
          <div key={stat.id} className="relative group mb-2">
            <JRPGStatBar stat={stat} onStatChange={onStatChange} isReadOnly={isReadOnly} />
            {!isReadOnly && stats.length > 5 && (
              <button onClick={() => onRemoveStat(stat.id)} className="absolute top-0 right-0 text-red-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity font-bold text-xl px-2">×</button>
            )}
          </div>
        ))}
        {!isReadOnly && stats.length < 7 && (
          <button onClick={onAddStat} className={`w-full mt-4 py-2 ${JRPG_THEME.buttonBg} ${JRPG_THEME.buttonText} rounded-sm`}>+ Add Metric</button>
        )}
      </Frame>

      {/* --- NEW: Inventory Frame --- */}
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

