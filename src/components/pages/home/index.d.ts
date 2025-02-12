import { Message } from "models";

export interface HandleFilter {
  (filteredGenres: Message[]): void;
}
