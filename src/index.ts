//* Вам потрібно створити умовний тип, що служить для встановлення типу, що повертається з функції. 
//* Як параметр типу повинен обов'язково виступати функціональний тип.

type FunctionReturnType<T> = T extends (...args: any[]) => infer R ? R : unknown /*never*/;

//* Вам потрібно створити умовний тип, який приймає функціональний тип з одним параметром (або задовільним) та повертає кортеж,
//* де перше значення - це тип, що функція повертає, а другий - тип її параметру

type FunctionReturnAndFirstParamArrayType<T> = T extends (...args: [infer P, ...any[]]) => infer R ? [R, P] : [unknown, unknown] /*never*/;

//* У вас є дві сутності - список фільмів і список категорій фільмів.
//* Кожен фільм містить поля: назва, рік випуску, рейтинг, список нагород.
//* Категорія містить поля: назва і фільми.
//* У кожного списку є пошук за ім'ям (це, по суті, фільтрація), у списку фільмів є додаткова фільтрація за роком випуску,
//* рейтингом і нагородами.
//* У нас визначено три типи фільтрів:
//* Фільтр відповідності має поле filter
//* Фільтр діапазону має поле filter і filterTo
//* Фільтр пошуку за значеннями має поле values
//* Кожен список містить стан його фільтрів, який може бути змінений тільки методом applySearchValue або applyFiltersValue
//* (за наявності додаткових фільтрів)
//* Вам необхідно подумати про поділ вашого коду на різні сутності, інтерфеси і типи, щоб зробити ваше рішення типобезпечним.
//* Реалізація всіх методів не є необхідною - це за бажанням.

interface Movie {
  name: string;
  year: number;
  rate: number;
  awards: string[];
}

interface Category {
  name: string;
  movies: Movie[];
}

interface Filters {
  year?: RangeFilter;
  rate?: RangeFilter;
  awards?: ValueSearchFilter<string>;
};

interface RangeFilter {
  from: number;
  to: number;
}

interface ValueSearchFilter<T> {
  values: T[];
}

abstract class List<T> {
  constructor(protected list: T[], protected filters: Filters) {}

  public setFilters(filters: Filters): void {
    this.filters = filters;
  }

  public clearFilters(): void {
    this.filters = {};
  }

  public applySearchValue(query: string): T[] {
    return this.filterListByFiltersAndQuery(query);
  };

  public applyFiltersValue(): T[] {
    return this.filterListByFiltersAndQuery();
  };

  protected abstract filterListByFiltersAndQuery(query?: string): T[];
}

class MovieList extends List<Movie> {
  constructor(movies: Movie[]) {
    super(movies, {});
  }

  protected filterListByFiltersAndQuery(query?: string): Movie[] {
    return this.list.filter(el => {
      //.....fiter list by filter properties
      //.....fiter list by name query properties
      if (query) {
        return true
      }

      return true
    });
  }
}

class CategoryList extends List<Category> {
  constructor(categories: Category[]) {
    super(categories, {});
  }

  protected filterListByFiltersAndQuery(query?: string): Category[] {
    return this.list.filter(el => {
      //.....fiter list by filter properties
      //.....fiter list by name query properties
      if (query) {
        return true
      }

      return true
    });
  }
}