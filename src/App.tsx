import React from "react";

import { useStore } from "./store";

export type AppProps = {};
export type AppComponent = React.FunctionComponent<AppProps>;

export const App: AppComponent = (): JSX.Element => {
  const store = useStore();
  console.log("store", store);

  return <div>Your app goes here</div>;
};
