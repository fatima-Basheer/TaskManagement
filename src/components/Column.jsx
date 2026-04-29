import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";

export default function Column({ id, title, tasks }) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`w-72 min-h-[400px] p-4 rounded-lg shadow-md
        ${isOver ? "bg-indigo-100" : "bg-white"}
      `}
    >
      <h2 className="text-xl font-bold text-center mb-4">
        {title}
      </h2>

      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}