import { useQuery } from "@apollo/client";

import { GET_DOGS } from "../queries/exchangerate";

export default function ExchangeRates({ onDogSelected }) {
  const { loading, error, data } = useQuery(GET_DOGS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      <select name="dog" onChange={onDogSelected}>
        {data.dogs.map((dog) => (
          <option key={dog.id} value={dog.breed}>
            {dog.breed}
          </option>
        ))}
      </select>
    </>
  );
}
