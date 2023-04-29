import create from "zustand";
import { combine, devtools } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import { useId } from "react";
import data from "./data.json";

const loadData = JSON.parse(JSON.stringify(data));

const addGarden = (gardens: Garden[], newGarden: NewGarden): Garden[] => [
  ...gardens,
  {
    _id: "NEW ID PLACEHOLDER",
    guid: uuidv4(),
    ...newGarden,
  },
];

const updateGarden = (gardens: Garden[], id: string, text: string): Garden[] =>
  gardens.map((garden) => ({
    ...garden,
    // data: garden.id === id ? data : garden.data,
  }));

const removeGarden = (gardens: Garden[], id: string): Garden[] => {
  return gardens.filter((garden) => garden._id !== id);
};

export type StorePropsType = {
  gardens: Garden[];
};

export type StoreActionsPropsType = {
  addGarden: () => void;
  setNewGarden: () => void;
  removeGarden: Function;
};

const InitialState: StorePropsType = {
  gardens: loadData,
};

const StoreActions = (set: Function, get: Function): StoreActionsPropsType => ({
  addGarden() {
    set((state: any) => ({
      ...state,
      gardens: addGarden(state.gardens, state.newGarden),
      newGarden: "",
    }));
  },
  setNewGarden() {
    set((newGarden: NewGarden) => ({
      ...newGarden,
      newGarden,
    }));
  },
  removeGarden(_id: string) {
    set((state: any) => ({
      ...state,
      gardens: removeGarden(state.gardens, _id),
    }));
  },
});

export type useStorePropsType = StorePropsType & StoreActionsPropsType;

export const useStore =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? create<useStorePropsType, [["zustand/devtools", useStorePropsType]]>(
        // @ts-ignore
        devtools(combine(InitialState, StoreActions))
      )
    : create<useStorePropsType>(combine(InitialState, StoreActions));
