import { useDraggable } from "@dnd-kit/core";
import { useDispatch, useSelector } from "react-redux";;
import { deleteTask } from "../features/tasksSlice";
import { RxCross1 } from "react-icons/rx";
export default function TaskCard({ task }) {
  const dispatch = useDispatch();

  const projects = useSelector((state) => state.projects.projects);

  const projectName =
    projects.find((p) => p.id === task.projectId)?.title || "No Project";

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
    });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    opacity: isDragging ? 0 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative bg-white hover:bg-gray-100 border border-gray-200 p-3 mb-2 rounded-md shadow-sm"
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          dispatch(deleteTask(task.id));
        }}
        className="absolute top-1 right-1 w-6 h-6 flex items-center justify-center rounded-full bg-red-500 text-white text-xs leading-none cursor-pointer"
      >
        <RxCross1 />
      </button>

      <div
        {...listeners}
        {...attributes}
        className="font-medium text-gray-800 cursor-grab pr-6"
      >
        {task.title}
      </div>

      <div className="text-xs text-gray-500 mt-1">{projectName}</div>
    </div>
  );
}
