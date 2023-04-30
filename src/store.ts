import create from "zustand";
import { combine, devtools } from "zustand/middleware";
import data from "./data.json";
import mockUserData from "./mockusers.json";

const loadData = JSON.parse(JSON.stringify(data));

const loadUserData = JSON.parse(JSON.stringify(mockUserData));

const addGarden = (gardens: Garden[], newGarden: Garden): Garden[] => {
  if (gardens) {
    return [
      ...gardens,
      {
        ...newGarden,
      },
    ];
  } else
    return [
      {
        ...newGarden,
      },
    ];
};
const updateGarden = (gardens: Garden[], updatedGarden: Garden): Garden[] => {
  return gardens.map((garden) => {
    if (garden._id === updatedGarden._id) {
      return { ...updatedGarden };
    }
    return garden;
  });
};

const removeGarden = (gardens: Garden[], id: string): Garden[] => {
  return gardens.filter((garden) => garden._id !== id);
};

const addUser = (users: User[], newUser: User): User[] => {
  if (users) {
    return [
      ...users,
      {
        ...newUser,
      },
    ];
  } else return [{ ...newUser }];
};

export type StorePropsType = {
  gardens: Garden[];
  users: User[];
};

export type StoreActionsPropsType = {
  addGarden: (garden: Garden) => void;
  updateGarden: (garden: Garden) => void;
  removeGarden: (gardenId: string) => void;
  addUser: (user: User) => void;
};

const InitialState: StorePropsType = {
  gardens: loadData,
  users: loadUserData,
};

const StoreActions = (set: Function, get: Function): StoreActionsPropsType => ({
  addUser(user: User) {
    set((state: any) => ({
      ...state,
      users: addUser(state.user, user),
    }));
  },
  addGarden(garden: Garden) {
    set((state: any) => ({
      ...state,
      gardens: addGarden(state.gardens, garden),
    }));
  },
  updateGarden: (garden: Garden) =>
    set((state: any) => ({
      ...state,
      gardens: updateGarden(state.gardens, garden),
    })),
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
