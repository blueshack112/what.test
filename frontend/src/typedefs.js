//@flow

export interface IStorageService {
  get(string): string | number | null;

  set(string, string | number): void;

  remove(string): void;
}
