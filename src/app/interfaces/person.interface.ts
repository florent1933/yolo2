export interface Person {
  name: string;
  age: number;
  img?: string;
  diedAt?: number | undefined;
}

export const initialStatePerson: Person = {
  name: '',
  age: 0,
};
