import React from 'react';
import { QuestLog } from './QuestLog';
import { ChronicleHistory } from './ChronicleHistory';

const JRPG_THEME = {
  frameBorder: 'border-2 border-amber-400',
  containerBg: 'bg-gray-900',
  textPrimary: 'text-amber-200',
  buttonBg: 'bg-amber-600 hover:bg-amber-500',
  buttonText: 'text-gray-900 font-bold',
  secondaryButtonBg: 'bg-gray-600 hover:bg-gray-500',
};

const Frame = ({ title, children }) => (
  <div className={`p-4 ${JRPG_THEME.frameBorder} ${JRPG_THEME.containerBg} bg-opacity-80`}>
    <h2 className={`text-xl font-bold mb-4 ${JRPG_THEME.textPrimary} tracking-wider`}>{title}</h2>
    {children}
  </div>
);

export const Sidebar = ({ quests, setQuests, reviews, onSave, onSelectReview, status, isViewing, onReturn }) => {
  return (
    <div className="space-y-6">
      <Frame title={isViewing ? "ARCHIVED QUESTS" : "QUEST LOG"}>
        <QuestLog quests={quests} setQuests={setQuests} isReadOnly={isViewing} />
      </Frame>
      <Frame title="SYSTEM">
        <p>Status: <span className={JRPG_THEME.textPrimary}>{status}</span></p>
        {isViewing && (
            // 🎯 FIXED: Added the "nl-button-secondary" class
            <button onClick={onReturn} className={`nl-button-secondary w-full mt-4 py-2 ${JRPG_THEME.secondaryButtonBg} ${JRPG_THEME.buttonText} text-sm rounded-sm`}>
                ← Return to Current Review
            </button>
        )}
      </Frame>
      <Frame title="NEXUS CHRONICLE">
        <ChronicleHistory reviews={reviews} onSelectReview={onSelectReview} />
      </Frame>
      {!isViewing && (
        // Ensure the primary button has its class
        <button onClick={onSave} className={`nl-button w-full py-3 ${JRPG_THEME.buttonBg} ${JRPG_THEME.buttonText} rounded-sm text-lg`}>
            Save to Chronicle
        </button>
      )}
    </div>
  );
};

