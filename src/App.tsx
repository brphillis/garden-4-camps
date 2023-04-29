import React from "react";
import { useStore } from "./store";
import GardenCard from "../components/GardenCard";
import PageContent from "../components/Layout/PageContent";

export type AppProps = {};
export type AppComponent = React.FunctionComponent<AppProps>;

export const App: AppComponent = (): JSX.Element => {
  const { gardens } = useStore();
  return (
    <PageContent>
      {gardens.map((gardens: Garden) => {
        return (
          <React.Fragment key={gardens._id}>
            <GardenCard {...gardens} />
          </React.Fragment>
        );
      })}
    </PageContent>
  );
};
