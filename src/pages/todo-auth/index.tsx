import { useAuth0 } from "@auth0/auth0-react";
import { Button, Divider, Input } from "@nextui-org/react";
import { useState } from "react";
import TodoTask from "~/components/TodoTask";
import { type ITask } from "~/interface/ITask";

export default function Home() {
  //   const hello = api.post.hello.useQuery({ text: "from tRPC" });

  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const [task, setTask] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");
  const [todo, setTodo] = useState<ITask[]>([]);

  const addTask = () => {
    const newTask: ITask = {
      taskName: task,
      deadline: parseInt(deadline),
    };

    setTodo([...todo, newTask]);
    setTask("");
    setDeadline("");
  };

  const completeTask = (taskName: string) => {
    setTodo(
      todo.filter((task) => {
        return taskName != task.taskName;
      }),
    );
  };

  return (
    <>
      {!isAuthenticated && (
        <Button onClick={() => loginWithRedirect()}>Log In</Button>
      )}
      {isAuthenticated && <Button>Welcome, {user?.email}</Button>}
      {isAuthenticated && (
        <Button
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
        >
          Log Out
        </Button>
      )}
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="app">
          <div className="header">
            <div className="input-container">
              <Input
                type="text"
                label="Task"
                placeholder="Add a task"
                value={task}
                onValueChange={setTask}
              />
              <Input
                type="number"
                label="Deadline (days)"
                placeholder="Set a deadline (in days)"
                value={deadline}
                onValueChange={setDeadline}
              />
            </div>
            <Button color="primary" onClick={addTask}>
              Add
            </Button>
          </div>
          <Divider className="my-4" />
          <div className="todo-list">
            {todo.map((task: ITask, key: number) => {
              return (
                <TodoTask key={key} task={task} completeTask={completeTask} />
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}
