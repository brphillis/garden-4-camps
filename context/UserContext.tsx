import * as React from "react";
import type { User, UserContextType, JSXChildren } from "../";
import { createContext, useState } from "react";
import { useStore } from "../src/store";
import Swal from "sweetalert2";

export const UserContext = createContext<UserContextType>(
  {} as UserContextType
);

export const UserProvider = ({ children }: JSXChildren) => {
  const [user, setUser] = useState<User>();
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const { users } = useStore();
  const addUser = useStore((state) => state.addUser);

  const login = (email: string, password: string) => {
    const foundUser = users.find((users) => {
      return users.email === email && users.password === password;
    });

    if (foundUser) {
      setUser(foundUser);
    } else {
      Swal.fire({
        icon: "error",
        title: "Invalid Login Credentials.",
        showConfirmButton: true,
      });
    }
  };

  const register = (formData: User) => {
    const newUser: User = { ...formData };
    addUser(newUser);
    Swal.fire({
      icon: "success",
      title: "Registration was Successful!",
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const foundUser = users.find((users) => users.email === formData.email);
        if (foundUser) {
          setUser(foundUser);
        }
        setIsRegistering(false);
      }
    });
  };

  const logout = () => {
    setUser(undefined);
  };

  return (
    <UserContext.Provider
      value={{
        user: user,
        isRegistering,
        setIsRegistering,
        register,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
