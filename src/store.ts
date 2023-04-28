import create from "zustand";
import { combine, devtools } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import { useId } from "react";
import data from "./data.json";

const loadData = JSON.parse(JSON.stringify(data));

const addUser = (users: User[], newUser: NewUser): User[] => [
  ...users,
  {
    _id: useId(),
    guid: uuidv4(),
    ...newUser,
  },
];

export type StorePropsType = {
  users: User[];
};

export type StoreActionsPropsType = {
  addUser: () => void;
  setNewUser: () => void;
};

const InitialState: StorePropsType = {
  users: loadData,
};

const StoreActions = (set: Function, get: Function): StoreActionsPropsType => ({
  addUser() {
    set((state: any) => ({
      ...state,
      users: addUser(state.users, state.newUser),
      newUser: "",
    }));
  },
  setNewUser() {
    set((newUser: NewUser) => ({
      ...newUser,
      newUser,
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
