import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from './hooks/useAuth';
import { useReviews } from './hooks/useReviews';
import { CharacterSheet } from './components/CharacterSheet';
import { Sidebar } from './components/Sidebar';

const JRPG_THEME = {
  containerBg: 'bg-gray-900',
  textSecondary: 'text-gray-400',
};

// Initial state for a new character sheet
const initialStats = [
  { id: 1, name: 'Discipline', value: 8, description: 'Daily habits & routine adherence.' },
  { id: 2, name: 'Creativity', value: 6, description: 'New ideas & problem-solving.' },
  { id: 3, name: 'Fortitude', value: 7, description: 'Resilience to setbacks.' },
  { id: 4, name: 'Synergy', value: 5, description: 'Team collaboration.' },
  { id: 5, name: 'Acumen', value: 9, description: 'Learning & skill acquisition.' },
];
const initialQuests = [{ id: 1, text: 'Launch the Nexus Log MVP', completed: false }];
const initialInventory = [];
const initialCurrencies = [{ id: 1, name: 'GOLD', amount: 1000 }];

const NexusLogApp = () => {
  const { userId, authStatus } = useAuth();
  const { reviews, addReview, reviewsStatus } = useReviews(userId);

  const [customStats, setCustomStats] = useState(initialStats);
  const [quests, setQuests] = useState(initialQuests);
  const [inventory, setInventory] = useState(initialInventory);
  const [currencies, setCurrencies] = useState(initialCurrencies);
  const [characterName] = useState('Alex');
  const [characterClass] = useState('Chronomancer');
  const [viewingReview, setViewingReview] = useState(null);

  const isReadOnly = viewingReview !== null;

  const displayData = isReadOnly ? viewingReview : {
      characterName, characterClass, stats: customStats, quests, inventory, currencies, level: reviews.length + 1,
  };

  useEffect(() => {
    if (reviews.length > 0 && !isReadOnly) {
        const lastReview = reviews[0];
        if (lastReview.quests) setQuests(lastReview.quests.filter(q => !q.completed));
        if (lastReview.inventory) setInventory(lastReview.inventory);
        if (lastReview.currencies) setCurrencies(lastReview.currencies);
    }
  }, [reviews, isReadOnly]);

  const handleStatChange = useCallback((id, field, newValue) => {
    setCustomStats(prev => prev.map(stat => {
      if (stat.id !== id) return stat;
      if (field === 'value') {
        return { ...stat, value: Math.max(0, Math.min(10, Number(newValue))) };
      }
      return { ...stat, [field]: newValue };
    }));
  }, []);

  const addStat = () => customStats.length < 7 && setCustomStats(prev => [...prev, { id: Date.now(), name: 'NEW STAT', value: 1, description: '' }]);
  const removeStat = (id) => customStats.length > 5 && setCustomStats(prev => prev.filter(stat => stat.id !== id));

  const handleSave = async () => {
    if (isReadOnly) return;
    const reviewData = { characterName, characterClass, level: reviews.length + 1, stats: customStats, quests, inventory, currencies };
    await addReview(reviewData);
    setQuests(prev => prev.filter(q => !q.completed));
  };

  const overallStatus = authStatus === 'Ready' ? reviewsStatus : authStatus;

  return (
    <div id="nexus-log-root">
        <div className={`min-h-screen ${JRPG_THEME.containerBg} ${JRPG_THEME.textSecondary} p-4 sm:p-8 font-mono`}>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            <CharacterSheet
              characterData={{ name: displayData.characterName, characterClass: displayData.characterClass, level: displayData.level }}
              stats={displayData.stats}
              inventory={displayData.inventory}
              currencies={displayData.currencies}
              onStatChange={handleStatChange}
              onAddStat={addStat}
              onRemoveStat={removeStat}
              setInventory={setInventory}
              setCurrencies={setCurrencies}
              isReadOnly={isReadOnly}
            />
            {/* 🎯 FIXED: Passing the correct props to the Sidebar component */}
            <Sidebar
              quests={displayData.quests}
              setQuests={setQuests}
              reviews={reviews}
              onSave={handleSave}
              status={overallStatus}
              isViewing={isReadOnly}
              onSelectReview={setViewingReview}
              onReturn={() => setViewingReview(null)}
            />
          </div>
        </div>
    </div>
  );
};

export default NexusLogApp;

