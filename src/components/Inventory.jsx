import React, { useState } from 'react';

const JRPG_THEME = {
  textPrimary: 'text-amber-200',
  textSecondary: 'text-gray-400',
  buttonBg: 'bg-amber-600 hover:bg-amber-500',
  buttonText: 'text-gray-900 font-bold',
  // DEFINITIVE FIX: Ensure the correct theme object is present
  inputText: 'text-amber-200',
  inputPlaceholder: 'placeholder-gray-500',
  inputBg: 'bg-gray-800',
  inputBorder: 'border-b-2 border-amber-500/50 focus:border-amber-400',
};

export const Inventory = ({ inventory, setInventory, currencies, setCurrencies, isReadOnly }) => {
  const [newItemText, setNewItemText] = useState('');

  const handleCurrencyChange = (id, field, value) => {
    setCurrencies(prev => prev.map(c => c.id === id ? { ...c, [field]: value } : c));
  };
  const addCurrency = () => {
    setCurrencies(prev => [...prev, { id: Date.now(), name: 'GIL', amount: 0 }]);
  };
  const removeCurrency = (id) => {
    setCurrencies(prev => prev.filter(c => c.id !== id));
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (newItemText.trim() === '') return;
    setInventory(prev => [...prev, { id: Date.now(), text: newItemText.trim() }]);
    setNewItemText('');
  };
  const removeItem = (id) => {
    setInventory(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className={`${JRPG_THEME.textSecondary} text-sm mb-2`}>CURRENCY</h3>
        <div className="space-y-2">
          {currencies.map(currency => (
            <div key={currency.id} className="flex items-center group">
              <input
                type="text"
                value={currency.name}
                onChange={(e) => handleCurrencyChange(currency.id, 'name', e.target.value)}
                placeholder="Currency Name"
                // DEFINITIVE FIX: Apply correct classes for color
                className={`w-2/5 ${JRPG_THEME.inputBg} ${JRPG_THEME.inputText} ${JRPG_THEME.inputPlaceholder} ${JRPG_THEME.inputBorder} outline-none p-1 text-sm`}
                disabled={isReadOnly}
              />
              <span className="mx-2">:</span>
              <input
                type="number"
                value={currency.amount}
                onChange={(e) => handleCurrencyChange(currency.id, 'amount', e.target.value)}
                // DEFINITIVE FIX: Apply correct classes for color
                className={`w-2/5 text-right ${JRPG_THEME.inputBg} ${JRPG_THEME.inputText} ${JRPG_THEME.inputBorder} outline-none p-1 text-sm`}
                disabled={isReadOnly}
              />
              {!isReadOnly && (
                <button onClick={() => removeCurrency(currency.id)} className="ml-auto text-red-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">&times;</button>
              )}
            </div>
          ))}
        </div>
        {!isReadOnly && (
          <button onClick={addCurrency} className="text-amber-400/80 hover:text-amber-300 text-xs mt-2">+ Add Currency</button>
        )}
      </div>
      <div>
        <h3 className={`${JRPG_THEME.textSecondary} text-sm mb-2`}>ITEMS</h3>
        <ul className="space-y-1">
          {inventory.map(item => (
            <li key={item.id} className="flex items-center group">
              <span className="text-amber-200">-</span>
              <span className="ml-2 flex-grow text-gray-300">{item.text}</span>
              {!isReadOnly && (
                <button onClick={() => removeItem(item.id)} className="ml-2 text-red-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">&times;</button>
              )}
            </li>
          ))}
        </ul>
        {!isReadOnly && (
          <form onSubmit={handleAddItem} className="mt-2 flex">
            <input
              type="text"
              value={newItemText}
              onChange={(e) => setNewItemText(e.target.value)}
              placeholder="Add a new item..."
              // DEFINITIVE FIX: Apply correct classes for color
              className={`flex-grow ${JRPG_THEME.inputBg} ${JRPG_THEME.inputText} ${JRPG_THEME.inputPlaceholder} ${JRPG_THEME.inputBorder} outline-none p-1 text-sm`}
            />
            <button type="submit" className={`ml-2 px-3 ${JRPG_THEME.buttonBg} ${JRPG_THEME.buttonText} text-sm rounded-sm`}>Add</button>
          </form>
        )}
      </div>
    </div>
  );
};

