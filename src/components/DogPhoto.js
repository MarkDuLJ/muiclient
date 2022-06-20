import { useQuery, NetworkStatus } from "@apollo/client";

import { GET_DOG_PHOTO } from "../queries/exchangerate";

export default function DogPhoto({ breed }) {
  const { loading, error, data, refetch, networkStatus } = useQuery(
    GET_DOG_PHOTO,
    {
      variables: { breed },
      notifyOnNetworkStatusChange: true,
    }
  );

  if (networkStatus === NetworkStatus.refetch)
    return <h2>"refecthing data..."</h2>;
  if (loading) return null;
  if (error) return `Error! ${error}`;

  return (
    <>
      <img
        src={data.dog.displayImage}
        alt={data.dog.id}
        style={{ height: 100, width: 100 }}
      />
      <button onClick={() => refetch({ breed: "dane" })}> ReFetch Dane</button>
    </>
  );
}
