import { useAuth0 } from "@auth0/auth0-react";
import { Button, Divider, Input } from "@nextui-org/react";
import { getDatabase, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useDatabaseListData } from "reactfire";
import TodoTask from "~/components/TodoTask";
import firebaseApp from "~/firebase";
import { type ITask } from "~/interface/ITask";

const database = getDatabase(firebaseApp);

export default function Home() {
  //   const hello = api.post.hello.useQuery({ text: "from tRPC" });

  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const [task, setTask] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");
  const [todo, setTodo] = useState<ITask[]>([]);

  const userId = user?.sub?.split("|")[1];
  const { status, data: todoList } = useDatabaseListData(
    ref(database, "todo_list/" + userId),
    {
      idField: "id",
    },
  );

  const addTask = async () => {
    const newTask: ITask = {
      taskName: task,
      deadline: deadline,
      completed: false,
    };

    setTodo([...todo, newTask]);
    setTask("");
    setDeadline("");

    const userId = user?.sub;

    const res = await fetch("/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...newTask, userId: userId }),
    });
  };

  const completeTask = async (taskName: string, id: string) => {
    console.log(taskName, id);

    const userId = user?.sub;

    const res = await fetch("/api/complete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, taskName, id }),
    });
  };

  // void push(ref(database, "todo_list/" + userId), {
  //   taskName: taskName,
  //   completed: completed,
  //   deadline: deadline,
  // });

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
          {todoList && (
            <div className="todo-list">
              {todoList.map((task, index) => {
                if (task.completed) {
                } else {
                  return (
                    <TodoTask
                      key={index}
                      task={{
                        taskName: task.taskName as string,
                        completed: task.completed as boolean,
                        deadline: task.deadline as string,
                        id: task.id as string,
                      }}
                      completeTask={completeTask}
                    />
                  );
                }
              })}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
