export interface Cocktail {
  idDrink: string;
  strDrink: string;
  strGlass: string;
  strDrinkThumb: string;
}

export interface CocktailResponse {
  drinks: Cocktail[];
}
