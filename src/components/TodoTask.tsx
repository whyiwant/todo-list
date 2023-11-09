import { Button, Card, CardBody, Switch } from "@nextui-org/react";
import { type ITask } from "~/interface/ITask";
import { FcCheckmark } from "react-icons/fc";

interface Props {
  task: ITask;
  completeTask(taskName: string): void;
}

const TodoTask = ({ task, completeTask }: Props) => {
  return (
    <>
      <Card>
        <CardBody>
          <div className="flex items-start justify-between space-y-2">
            <div>
              <p>{task.taskName}</p>
              <p>{task.deadline}</p>
            </div>
            <Button
              isIconOnly
              onClick={() => {
                completeTask(task.taskName);
              }}
            >
              <FcCheckmark></FcCheckmark>
            </Button>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default TodoTask;
