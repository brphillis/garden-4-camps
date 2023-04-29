import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { useStore } from "../store";

export async function loader({ params }) {
  const data = params;
  return data.id;
}

const Garden = () => {
  const id = useLoaderData() as string;
  const [garden, setGarden] = useState<Garden>();
  const { gardens } = useStore();

  const findThenSetGarden = (id: string) => {
    const foundGarden = gardens.find((gardens) => gardens._id === id);
    if (foundGarden) {
      setGarden(foundGarden);
    }
  };

  useEffect(() => {
    findThenSetGarden(id);
  }, []);

  return (
    <div
      style={{ backgroundColor: "white", padding: "50px", margin: "12px 12px" }}
    >
      {id}
    </div>
  );
};

export default Garden;
