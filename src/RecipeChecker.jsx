import React from 'react';

function RecipeChecker({ customRecipe, correctRecipe, onClose }) {
  const checkIngredients = () => {
    const customIngredients = customRecipe.ingredients;
    const correctIngredients = correctRecipe.ingredients;

    return correctIngredients.map((correctIng, index) => {
      let customIng;
      let isCorrect = false;
      let ingredientName = correctIng.name;
      let usedIngredientName = '';

      if (Array.isArray(correctIng.name)) {
        customIng = customIngredients.find(ci => correctIng.name.includes(ci.name));
        isCorrect = customIng && customIng.amount === correctIng.amount;
        ingredientName = correctIng.name.join(' or ');
        if(customIng) usedIngredientName = customIng.name;
      } else {
        customIng = customIngredients.find(ci => ci.name === correctIng.name);
        isCorrect = customIng && customIng.amount === correctIng.amount;
        if(customIng) usedIngredientName = customIng.name;
      }

      if (correctIng.optional && !customIng) {
        return (
          <li key={(Array.isArray(ingredientName) ? ingredientName.join('-') : ingredientName) + index} style={{ color: 'orange' }}>
            {ingredientName}: {correctIng.amount} {correctIng.unit} (Optional)
          </li>
        );
      }

      const key = Array.isArray(correctIng.name) ? correctIng.name.join('-') : correctIng.name;

      return (
        <li key={key + index} style={{ color: isCorrect ? 'lightgreen' : 'lightcoral' }}>
          {ingredientName}: {correctIng.amount} {correctIng.unit}
          {!isCorrect && customIng && ` (You used ${usedIngredientName} ${customIng.amount} ${customIng.unit})`}
          {!isCorrect && !customIng && ` (Missing)`}
        </li>
      );
    });
  };

  const isGlassCorrect = Array.isArray(correctRecipe.glass)
    ? correctRecipe.glass.includes(customRecipe.glass)
    : customRecipe.glass === correctRecipe.glass;
  const isGarnishCorrect = Array.isArray(correctRecipe.garnish)
    ? correctRecipe.garnish.includes(customRecipe.garnish)
    : customRecipe.garnish === correctRecipe.garnish;
  const isIceCorrect = Array.isArray(correctRecipe.ice)
    ? correctRecipe.ice.includes(customRecipe.ice)
    : customRecipe.ice === correctRecipe.ice;
  const isTypeCorrect = customRecipe.type === correctRecipe.type;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#1a0d2e', padding: 24, borderRadius: 12, border: '1px solid #4a3a6a', color: '#e8e0d0', width: '80%', maxWidth: 500 }}>
        <h2 style={{ color: '#ffd700', letterSpacing: 2, marginBottom: 20 }}>Recipe Check</h2>
        <h3 style={{ color: isGlassCorrect ? 'lightgreen' : 'lightcoral' }}>Glass: {Array.isArray(correctRecipe.glass) ? correctRecipe.glass.join(' or ') : correctRecipe.glass} {!isGlassCorrect && `(You used ${customRecipe.glass})`}</h3>
        <h3 style={{ color: isGarnishCorrect ? 'lightgreen' : 'lightcoral' }}>Garnish: {Array.isArray(correctRecipe.garnish) ? correctRecipe.garnish.join(' or ') : correctRecipe.garnish} {!isGarnishCorrect && `(You used ${customRecipe.garnish})`}</h3>
        <h3 style={{ color: isTypeCorrect ? 'lightgreen' : 'lightcoral' }}>Type: {correctRecipe.type} {!isTypeCorrect && `(You used ${customRecipe.type})`}</h3>
        <h3 style={{ color: isIceCorrect ? 'lightgreen' : 'lightcoral' }}>Ice: {Array.isArray(correctRecipe.ice) ? 'Optional' : (correctRecipe.ice ? 'Yes' : 'No')} {!isIceCorrect && `(You used ${customRecipe.ice ? 'Yes' : 'No'})`}</h3>
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
