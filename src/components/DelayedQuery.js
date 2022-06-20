import React from "react";
import { useLazyQuery } from "@apollo/client";

import { GET_DOG_PHOTO } from "../queries/exchangerate";

export default function DelayedQuery() {
  const [getDog, { loading, error, data }] = useLazyQuery(GET_DOG_PHOTO);
  if (loading) return "Loading...";
  if (error) return `Error! ${error}`;
  return (
    <div>
      {data?.dog && <img src={data.dog.displayImage} alt="dog" />}
      <button
        onClick={() =>
          getDog({
            variables: { breed: "bulldog" },
            fetchPolicy: "network-only",
          })
        }
      >
        Click me
      </button>
    </div>
  );
}
