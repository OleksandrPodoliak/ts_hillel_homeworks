interface IUser {
  login: string;
  password: string;
}

//* Вам потрібно створити тип DeepReadonly який буде робити доступними тільки для читання навіть властивості вкладених обʼєктів.

interface IAnotherUser extends IUser {
  personalInfo: {
    firstName: string;
    secondName: string;
    adress: {
      country: string;
      city: string;
    };
  };
}

type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

const user1: DeepReadonly<IAnotherUser> = {
  login: 'somelogin',
  password: 'somepassword',
  personalInfo: {
    firstName: 'John',
    secondName: 'Doe',
    adress: {
      country: 'Ukraine',
      city: 'Kyiv',
    },
  },
};

// user.personalInfo.adress.city = "Zaporizhzhya";

//* Вам потрібно створити тип DeepRequireReadonly який буде робити доступними тільки для читання навіть властивості вкладених обʼєктів
//* та ще й робити їх обовʼязковими.

interface IUserOptional extends IUser {
  personalInfo?: {
    firstName: string;
    secondName: string;
    adress?: {
      country?: string;
      city: string;
    };
  };
}

type DeepRequireReadonly<T> = {
  readonly [K in keyof T]-?: T[K] extends object
    ? DeepRequireReadonly<T[K]>
    : T[K];
};

const user2: DeepRequireReadonly<IUserOptional> = {
  login: 'somelogin',
  password: 'somepassword',
  personalInfo: {
    firstName: 'John',
    secondName: 'Doe',
    adress: {
      country: 'Ukraine',
      city: 'Kyiv',
    },
  },
};

// const user3: DeepRequireReadonly<IUserOptional> = {
//   login: "somelogin",
//   password: "somepassword",
// };

//* Вам потрібно створити тип UpperCaseKeys, який буде приводити всі ключі до верхнього регістру.

type UpperCaseKeys<T> = {
  [K in keyof T as Uppercase<K & string>]: T[K];
};

const user4: UpperCaseKeys<IUser> = {
  LOGIN: 'somelogin',
  PASSWORD: 'somepassword',
};

//* Створіть тип ObjectToPropertyDescriptor, який перетворює звичайний обʼєкт на обʼєкт де кожне value є дескриптором.

interface IUserWithAge extends IUser {
  age: number;
}

interface PropertyDescriptorType<T> {
  value: T;
  writable: boolean;
  configurable: boolean;
  enumerable: boolean;
};

type PropertyDescriptorObject<T> = {
  [K in keyof T]: PropertyDescriptorType<T[K]>;
};

const user5: PropertyDescriptorObject<UpperCaseKeys<IUserWithAge>> = {
  LOGIN: {
    value: 'somelogin',
    writable: true,
    configurable: true,
    enumerable: true,
  },
  PASSWORD: {
    value: 'somepassword',
    writable: false,
    configurable: false,
    enumerable: false,
  },
  AGE: {
    value: 21,
    writable: false,
    configurable: true,
    enumerable: false,
  },
};