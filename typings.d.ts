declare module "*.jpg";

type NewGarden = {
  pictures: string[];
  status: string;
  owner: Owner;
  address: string;
  about: string;
  latitude: number;
  longitude: number;
  tags: string[];
  comments: string[];
};

interface Garden extends NewGarden {
  _id: string;
  guid: string;
}

type Owner = {
  name: string;
  age: number;
  gender: string;
  phone: string;
  email: string;
};

interface User extends Owner {
  password?: string;
}
