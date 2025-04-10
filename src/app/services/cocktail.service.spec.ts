import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CocktailService } from './cocktail.service';

describe('CocktailService', () => {
  let service: CocktailService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CocktailService]
    });
    service = TestBed.inject(CocktailService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should search cocktails and update the signal', () => {
    const mockResponse = {
      drinks: [
        {
          idDrink: '1',
          strDrink: 'Margarita',
          strGlass: 'Cocktail glass',
          strDrinkThumb: 'https://example.com/margarita.jpg'
        }
      ]
    };

    service.searchCocktails('margarita');

    const req = httpMock.expectOne('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);

    expect(service.cocktails()).toEqual([
      {
        idDrink: '1',
        strDrink: 'Margarita',
        strGlass: 'Cocktail glass',
        strDrinkThumb: 'https://example.com/margarita.jpg'
      }
    ]);
  });

  it('should handle empty response', () => {
    service.searchCocktails('nonexistent');

    const req = httpMock.expectOne('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=nonexistent');
    req.flush({ drinks: null });

    expect(service.cocktails()).toEqual([]);
  });
});
