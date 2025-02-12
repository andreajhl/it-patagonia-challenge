export interface Message {
  id: number;
  title: string;
  content: string | null;
  createdAt: Date;
  updatedAt: Date;
}
