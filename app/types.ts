export type ActivityData = {
    day: string,
    calories: number,
    protein: number
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

export type TransformedSupplements = {
  name: string,
  isTaken: boolean,
  id: number,
  logId: number,
}

export type FoodItem = {
  brand: string | null;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  serving: string,
  nutrients: {
    foodId: string,
    measureUri: string,
  },
  measures: Array<Measure>
};

export type Measure = {
  uri: string,
  label: string;
  weight: number;
};

export type UserDetails = {
  age: number,
  gender: string,
  weight: number,
  height: number,
  activityLevel: string
};


