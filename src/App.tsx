import React from "react";
import { useStore } from "./store";
import GardenCard from "../components/GardenCard";
import PageContent from "../components/Layout/PageContent";

export type AppProps = {};
export type AppComponent = React.FunctionComponent<AppProps>;

export const App: AppComponent = (): JSX.Element => {
  const { users } = useStore();
  console.log(users);

  return (
    <PageContent>
      {users.map((users: User) => {
        return <GardenCard {...users} />;
      })}
    </PageContent>
  );
};
