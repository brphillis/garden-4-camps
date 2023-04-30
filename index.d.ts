declare module "*.jpg";

interface JSXChildren {
  children: JSX.Element | JSX.Element[];
}

interface NewGarden extends Garden {
  picture_One: string;
  picture_Two?: string;
  picture_Three?: string;
}

type Garden = {
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

interface GardenComment {
  text: string;
  user: string;
}

type LoadedGarden = {
  owner: Owner | null;
  _id: string;
  guid: string;
};

type Owner = {
  name: string;
  age: number;
  gender: string;
  phone: string;
  email: string;
};

interface User extends Owner {
  password: string;
}

type UserContextType = {
  user?: User;
  isRegistering: boolean;
  setIsRegistering: Function;
  register: (formData: User) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
};
