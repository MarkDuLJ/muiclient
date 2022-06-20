import { useQuery } from "@apollo/client";

import { GET_TODOS } from "../queries/todoQuery";

export default function Todos() {
  const { loading, error, data } = useQuery(GET_TODOS);
  if (loading) return "Loading...";
  if (error) return "error is here...";
  // console.log(data);
  return (
    <div>
      {data.todos.length === 0 ? (
        <h2>No todo yet...</h2>
      ) : (
        <>
          {data.todos.map((todo) => (
            <h3 key={todo.id}>{todo.type}</h3>
          ))}
        </>
      )}
    </div>
  );
}
