interface NewUser {
  users: User[];
  pictures: string[];
  status: string;
  owner: Owner;
  address: string;
  about: string;
  latitude: number;
  longitude: number;
  tags: string[];
  comments: string[];
}

interface User extends NewUser {
  _id: string;
  guid: string;
}

interface Owner {
  name: string;
  age: number;
  gender: string;
  phone: string;
  email: string;
}
