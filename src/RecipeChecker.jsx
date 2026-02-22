import React from 'react';

function RecipeChecker({ customRecipe, correctRecipe, onClose }) {
  const checkIngredients = () => {
    const customIngredients = customRecipe.ingredients;
    const correctIngredients = correctRecipe.ingredients;

    return correctIngredients.map(correctIng => {
      const customIng = customIngredients.find(ci => ci.name === correctIng.name);
      const isCorrect = customIng && customIng.amount === correctIng.amount;

      return (
        <li key={correctIng.name} style={{ color: isCorrect ? 'lightgreen' : 'lightcoral' }}>
          {correctIng.name}: {correctIng.amount} {correctIng.unit}
          {!isCorrect && customIng && ` (You used ${customIng.amount} ${customIng.unit})`}
          {!customIng && ` (Missing)`}
        </li>
      );
    });
  };

  const isGlassCorrect = customRecipe.glass === correctRecipe.glass;
  const isGarnishCorrect = customRecipe.garnish === correctRecipe.garnish;
  const isIceCorrect = customRecipe.ice === correctRecipe.ice;
  const isTypeCorrect = customRecipe.type === correctRecipe.type;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#1a0d2e', padding: 24, borderRadius: 12, border: '1px solid #4a3a6a', color: '#e8e0d0', width: '80%', maxWidth: 500 }}>
        <h2 style={{ color: '#ffd700', letterSpacing: 2, marginBottom: 20 }}>Recipe Check</h2>
        <h3 style={{ color: isGlassCorrect ? 'lightgreen' : 'lightcoral' }}>Glass: {correctRecipe.glass} {!isGlassCorrect && `(You used ${customRecipe.glass})`}</h3>
        <h3 style={{ color: isGarnishCorrect ? 'lightgreen' : 'lightcoral' }}>Garnish: {correctRecipe.garnish} {!isGarnishCorrect && `(You used ${customRecipe.garnish})`}</h3>
        <h3 style={{ color: isTypeCorrect ? 'lightgreen' : 'lightcoral' }}>Type: {correctRecipe.type} {!isTypeCorrect && `(You used ${customRecipe.type})`}</h3>
        <h3 style={{ color: isIceCorrect ? 'lightgreen' : 'lightcoral' }}>Ice: {correctRecipe.ice ? 'Yes' : 'No'} {!isIceCorrect && `(You used ${customRecipe.ice ? 'Yes' : 'No'})`}</h3>
        <h3>Ingredients:</h3>
        <ul>{checkIngredients()}</ul>
        <button onClick={onClose} style={{ width: '100%', padding: '12px', borderRadius: 8, border: 'none', background: '#ffd700', color: '#1a1030', cursor: 'pointer', fontSize: 16, fontWeight: 'bold', letterSpacing: 1, marginTop: 16 }}>
          Close
        </button>
      </div>
    </div>
  );
}

export default RecipeChecker;
