import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import SignIn from "./components/auth/sign-in";
import SignUp from "./components/auth/sign-up";
import CreatePost from "./components/posts/create-post";
import TodoList from "./components/todos/todo-list";

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/todos" exact>
          <TodoList />
        </Route>
        <Route path="/createpost" exact>
          <CreatePost />
        </Route>
        <Redirect to='/todos'/>
      </Switch>
    );
  }
  return (
    <Switch>
      <Route path="/signin" exact>
        <SignIn />
      </Route>
      <Route path="/signup" exact>
        <SignUp />
      </Route>
    </Switch>
  );
};
