import { AdditionItem, TopicItem } from "./mongodb/schemas";

export interface DrawingControls {
  color: string;
  strokeWeight: number;
}

export interface Drawing {
  addition: AdditionItem | null;
  topic: TopicItem | null;
  open: boolean;
  loading: boolean;
}

export interface DrawingHistory {
  prev_additions: AdditionItem[] | null;
  topic_history: TopicItem[] | null;
  page: number;
}
