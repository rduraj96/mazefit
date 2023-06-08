export type ActivityData = {
    day: string,
    calories: number
}

export type Macros = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

export type Meal = {
  id: number
  userId: number
  day: string
  name: string
  type: string | null
  calories: number
  protein: number
  carbs: number
  fat: number
};

export type SupplementLog = {
  id: number
  day: string
  isTaken: boolean
  supplemenId: number
}

export type Supplements = {
  id: number
  name: string
  userId: number
  supplementLogs: Array<SupplementLog>
}


