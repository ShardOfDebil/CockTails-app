export interface Cocktail {
  idDrink: string;
  strDrink: string;
  strGlass: string;
  strDrinkThumb: string;
  strInstructions: string;
  ingredients: string[];
}

export interface CocktailResponse {
  drinks: Cocktail[];
}
