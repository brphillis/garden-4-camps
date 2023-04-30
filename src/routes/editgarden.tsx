import React from "react";
import GardenForm from "../../components/GardenForm";
import { useLoaderData } from "react-router-dom";

export async function loader({ params }) {
  if (params) {
    const data = params;
    return data.id;
  }
}

const AddGarden = () => {
  const id = useLoaderData() as string;
  return <GardenForm id={id} />;
};

export default AddGarden;
