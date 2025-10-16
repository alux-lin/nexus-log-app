import React, { useMemo } from 'react';

// JRPG Theme Constants
const JRPG_THEME = {
    textPrimary: 'text-amber-200',
    textSecondary: 'text-gray-400',
    // DEFINITIVE FIX: Ensure the correct theme object is present
    inputText: 'text-amber-200',
    inputPlaceholder: 'placeholder-gray-500',
    inputBg: 'bg-gray-800',
    inputBorder: 'border-b-2 border-amber-500/50 focus:border-amber-400',
};

const JRPGStatBar = ({ stat, onStatChange, isReadOnly }) => {
    const barColor = useMemo(() => {
        if (stat.value >= 8) return 'bg-green-500';
        if (stat.value >= 5) return 'bg-yellow-500';
        if (stat.value > 0) return 'bg-red-600';
        return 'bg-gray-700';
    }, [stat.value]);

    const barWidth = `${stat.value * 10}%`;

    return (
        <div className="mb-4 font-mono">
            <div className="flex justify-between items-center mb-1">
                <input
                    type="text"
                    value={stat.name.toUpperCase()}
                    onChange={(e) => onStatChange(stat.id, 'name', e.target.value)}
                    maxLength="15"
                    // DEFINITIVE FIX: Apply correct classes for layout and color
                    className={`flex-grow mr-4 text-base ${JRPG_THEME.inputBg} ${JRPG_THEME.inputText} ${JRPG_THEME.inputPlaceholder} ${JRPG_THEME.inputBorder} outline-none p-1`}
                    disabled={isReadOnly}
                />
                <input
                    type="number"
                    min="1"
                    max="10"
                    value={stat.value}
                    onChange={(e) => onStatChange(stat.id, 'value', e.target.value)}
                    className={`w-16 text-center ${JRPG_THEME.inputBg} ${JRPG_THEME.inputText} ${JRPG_THEME.inputBorder} outline-none`}
                    disabled={isReadOnly}
                />
            </div>
            <div className="w-full bg-gray-700 rounded-sm h-4 border border-black">
                <div
                    className={`${barColor} h-full rounded-sm transition-all duration-500`}
                    style={{ width: barWidth }}
                ></div>
            </div>
            <input
                type="text"
                placeholder="Metric Description..."
                value={stat.description}
                onChange={(e) => onStatChange(stat.id, 'description', e.target.value)}
                maxLength="200"
                className={`w-full mt-2 text-sm ${JRPG_THEME.inputBg} ${JRPG_THEME.inputText} ${JRPG_THEME.inputPlaceholder} ${JRPG_THEME.inputBorder} outline-none p-1`}
                disabled={isReadOnly}
            />
        </div>
    );
};

export default JRPGStatBar;

