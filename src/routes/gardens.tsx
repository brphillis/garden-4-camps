import React from "react";
import { useLoaderData } from "react-router-dom";
import GardenDisplay from "../../components/GardenDisplay";

export async function loader({ params }) {
  if (params) {
    const data = params;
    return data.id;
  }
}

const Gardens = () => {
  const id = useLoaderData() as string;
  return <GardenDisplay id={id} />;
};

export default Gardens;
