import * as Config from 'lib/config';
import * as Sanity from 'lib/sanity';

import LegacyRecipes from 'data/legacyRecipes';

if (Config.SANITY_DATASET === 'production')
  throw "You can't run migrations against the production dataset!";

console.log('🏃 Running migrations against dataset:', Config.SANITY_DATASET);

const transaction = Sanity.Transaction.new();

const transactionWithRecipes = await LegacyRecipes.reduce(async (transaction, recipe) => {
  return Sanity.Recipes.createOrReplace(await transaction, recipe);
}, Promise.resolve(transaction));

console.log('Committing transaction...');
const results = await transactionWithRecipes.commit();

console.log('Dry run result:', results);

console.log('✅ Transaction complete');
