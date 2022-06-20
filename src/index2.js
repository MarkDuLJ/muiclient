import React, { useState, useEffect } from "react";
import { render } from "react-dom";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  useQuery,
  NetworkStatus,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "https://71z1g.sse.codesandbox.io/",
  cache: new InMemoryCache(),
});

function App() {
  const GET_DOG_PHOTO = gql`
    query Dog($breed: String!) {
      dog(breed: $breed) {
        id
        displayImage
      }
    }
  `;

  function DogPhoto({ breed }) {
    const { loading, error, data, refetch, networkStatus } = useQuery(
      GET_DOG_PHOTO,
      {
        variables: { breed },
        //   pollInterval: 4000,
        notifyOnNetworkStatusChange: true,
      }
    );

    if (networkStatus === NetworkStatus.refetch) return "refetching...";
    if (loading) return null;
    if (error) return `Error! ${error}`;

    return (
      <>
        <img
          src={data.dog.displayImage}
          alt="dog"
          style={{ height: 100, width: 100 }}
        />
        <button onClick={() => refetch({ breed: "dane" })}>
          Refetch new dane!
        </button>
      </>
    );
  }

  const GET_DOGS = gql`
    query GetDogs {
      dogs {
        id
        breed
      }
    }
  `;

  function Dogs({ onDogSelected, selectedDog }) {
    const { loading, error, data } = useQuery(GET_DOGS);

    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;

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
  const [selectedDog, setSelectedDog] = useState(null);
  const [breed, setBreed] = useState("bulldog");

  useEffect(() => {
    selectedDog && setBreed(selectedDog.breed);
  }, [selectedDog]);

  function onDogSelected({ target }) {
    setSelectedDog(target.value);
  }

  return (
    <ApolloProvider client={client}>
      <div>
        <h2>Building Query components 🚀</h2>
        <Dogs onDogSelected={onDogSelected} />
        <DogPhoto breed={breed} />
      </div>
    </ApolloProvider>
  );
}

render(<App />, document.getElementById("root"));
