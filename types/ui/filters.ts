import { Dispatch, SetStateAction } from "react";

export interface FiltersProps {
  search: string;
  page: number;
  from_date: number;
  to_date: number;
}
