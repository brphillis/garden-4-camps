declare module "*.jpg";

export interface JSXChildren {
  children: JSX.Element | JSX.Element[];
}

export interface NewGarden extends Garden {
  picture_One: string;
  picture_Two?: string;
  picture_Three?: string;
}

export type Garden = {
  _id: string;
  guid: string;
  pictures: string[];
  status: string;
  owner: Owner;
  address: string;
  about: string;
  latitude: number;
  longitude: number;
  tags: string[];
  comments: GardenComment[];
};

export interface GardenComment {
  text: string;
  user: string;
}

export type LoadedGarden = {
  owner: Owner | null;
  _id: string;
  guid: string;
  tags?: string[];
};

export type Owner = {
  name: string;
  age: number;
  gender: string;
  phone: string;
  email: string;
};

export interface User extends Owner {
  password: string;
}

export type UserContextType = {
  user?: User;
  isRegistering: boolean;
  setIsRegistering: Function;
  register: (formData: User) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
};

export type Filter = "Address" | "Tag" | "About";
