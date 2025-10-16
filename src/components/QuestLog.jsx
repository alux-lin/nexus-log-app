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

export const QuestLog = ({ quests, setQuests, isReadOnly }) => {
  const [newQuestText, setNewQuestText] = useState('');

  const handleAddQuest = (e) => {
    e.preventDefault();
    if (newQuestText.trim() === '') return;
    const newQuest = { id: Date.now(), text: newQuestText.trim(), completed: false };
    setQuests(prev => [...prev, newQuest]);
    setNewQuestText('');
  };

  const toggleQuestCompletion = (id) => {
    setQuests(prev => prev.map(q => q.id === id ? { ...q, completed: !q.completed } : q));
  };

  const removeQuest = (id) => {
    setQuests(prev => prev.filter(q => q.id !== id));
  };

  return (
    <>
      <div className="space-y-2">
        {quests.map(quest => (
          <div key={quest.id} className="flex items-center group">
            <input
              type="checkbox"
              checked={quest.completed}
              onChange={() => toggleQuestCompletion(quest.id)}
              className="form-checkbox h-4 w-4 bg-gray-800 border-gray-600 text-amber-500 rounded-sm focus:ring-0"
              disabled={isReadOnly}
            />
            <span className={`ml-2 flex-grow ${quest.completed ? 'line-through text-gray-500' : JRPG_THEME.textPrimary}`}>
              {quest.text}
            </span>
            {!isReadOnly && (
              <button onClick={() => removeQuest(quest.id)} className="ml-2 text-red-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">&times;</button>
            )}
          </div>
        ))}
      </div>
      {!isReadOnly && (
        <form onSubmit={handleAddQuest} className="mt-4 flex">
          <input
            type="text"
            value={newQuestText}
            onChange={(e) => setNewQuestText(e.target.value)}
            placeholder="Add a new quest..."
            // DEFINITIVE FIX: Apply correct classes for color
            className={`flex-grow ${JRPG_THEME.inputBg} ${JRPG_THEME.inputText} ${JRPG_THEME.inputPlaceholder} ${JRPG_THEME.inputBorder} outline-none p-1 text-sm`}
          />
          <button type="submit" className={`ml-2 px-3 ${JRPG_THEME.buttonBg} ${JRPG_THEME.buttonText} text-sm rounded-sm`}>Add</button>
        </form>
      )}
    </>
  );
};

