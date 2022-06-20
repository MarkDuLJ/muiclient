import React from "react";
import { useMutation, gql } from "@apollo/client";

import { ADD_TODO } from "../mutations/todoMutation";
import { GET_TODOS } from "../queries/todoQuery";

export default function AddTodo() {
  let input;
  const [addTodo, { loading, error, data, reset }] = useMutation(ADD_TODO, {
    update(cache, { data: { addTodo } }) {
      cache.modify({
        fields: {
          todos(existingTodos = []) {
            const newTodoRef = cache.writeFragment({
              data: addTodo,
              fragment: gql`
                fragment NewTodo on Todo {
                  id
                  type
                }
              `,
            });
            return [...existingTodos, newTodoRef];
          },
        },
      });
    },
    // refetchQueries: [{ query: GET_TODOS }, "todos"],
    //doesn't work for name somehow
    // refetchQueries: ["todos"],
  });
  //reset here is to reset the mutation's result to its initial state
  // console.log("input", input);
  // console.log("data", data);
  if (loading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTodo({ variables: { type: input.value } });
        }}
      >
        <input ref={(node) => (input = node)} />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
