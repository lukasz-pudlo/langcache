import React, { useState, createContext } from 'react';

export const ShowAddPhraseContext = createContext();

export const ShowAddPhraseProvider = ({ children }) => {
    const [showAddPhrase, setShowAddPhrase] = useState(false);

    return (
        <ShowAddPhraseContext.Provider value={{ showAddPhrase, setShowAddPhrase }}>
            {children}
        </ShowAddPhraseContext.Provider>
    );
};
