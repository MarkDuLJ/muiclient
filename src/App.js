import { useState } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

// import DogPhoto from "./components/DogPhoto";
// import DelayedQuery from "./components/DelayedQuery";
// import ExchangeRates from "./components/ExchangeRates";
import Todos from "./components/Todos";
import AddTodo from "./components/AddTodo";

import "./App.css";

function App() {
  // const [selectedDog, setSelectedDog] = useState(null);
  const client = new ApolloClient({
    // uri: "https://48p1r2roz4.sse.codesandbox.io",
    // uri: "https://71z1g.sse.codesandbox.io/",
    uri: "https://sxewr.sse.codesandbox.io/",
    cache: new InMemoryCache(),
  });

  // function onDogSelected({ target }) {
  //   setSelectedDog(target.value);
  // }

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h2>My Apollo</h2>
        {/* {selectedDog && <DogPhoto breed={selectedDog} />}
        <ExchangeRates onDogSelected={onDogSelected} />
        <DelayedQuery /> */}
        <AddTodo />
        <Todos />
      </div>
    </ApolloProvider>
  );
}

export default App;
