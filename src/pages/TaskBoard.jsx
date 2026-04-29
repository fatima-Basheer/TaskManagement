import { DndContext, closestCorners, DragOverlay } from "@dnd-kit/core";

import { useSelector, useDispatch } from "react-redux";
import { moveTask, addTask } from "../features/tasksSlice";
import { useState } from "react";
import Column from "../components/Column";
import { RxCross1 } from "react-icons/rx";

export default function TaskBoard() {
  const [show, setShow] = useState(false);
  const [activeTask, setActiveTask] = useState(null);

  const [title, setTitle] = useState("");
  const [assignTo, setAssignTo] = useState("");
  const [status, setStatus] = useState("todo");
  const [description, setDescription] = useState("");
  const [projectId, setProjectId] = useState("");

  const tasks = useSelector((state) => state.tasks.tasks);
  const projects = useSelector((state) => state.projects.projects);

  const dispatch = useDispatch();

  const handleAdd = (e) => {
    e.preventDefault();

    if (!title.trim() || !projectId) return;

    dispatch(
      addTask({
        title,
        assignTo,
        description,
        status,
        projectId,
      }),
    );

    setTitle("");
    setAssignTo("");
    setStatus("todo");
    setDescription("");
    setProjectId("");
    setShow(false);
  };

  const getTasks = (status) => tasks.filter((t) => t.status === status);

  return (
    <div className="min-h-screen bg-gray-100 w-full">
      <div className="flex justify-end px-8 py-4">
        <button
          onClick={() => setShow(true)}
          className="bg-black text-white px-5 py-2 rounded-sm shadow-md cursor-pointer transition hover:scale-x-110 duration-500"
        >
          Add New Task
        </button>
      </div>

      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="w-full max-w-sm bg-gray-900 p-6 rounded-xl relative">
            <button
              onClick={() => setShow(false)}
              className="absolute top-3 right-3 text-white"
            >
              <RxCross1 />
            </button>

            <form className="space-y-3" onSubmit={handleAdd}>
              <select
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                className="w-full p-2 bg-gray-700 text-white rounded"
              >
                <option value="">Select Project</option>
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title}
                  </option>
                ))}
              </select>

              <input
                placeholder="Task Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 bg-gray-700 text-white rounded"
              />

              <input
                placeholder="Assign To"
                value={assignTo}
                onChange={(e) => setAssignTo(e.target.value)}
                className="w-full p-2 bg-gray-700 text-white rounded"
              />

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full p-2 bg-gray-700 text-white rounded"
              >
                <option value="todo">Todo</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>

              <input
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 bg-gray-700 text-white rounded"
              />

              <button className="w-full bg-indigo-600 text-white py-2 rounded">
                Add Task
              </button>
            </form>
          </div>
        </div>
      )}

      <DndContext
        collisionDetection={closestCorners}
        onDragStart={(event) => {
          const task = tasks.find((t) => t.id === event.active.id);
          setActiveTask(task);
        }}
        onDragEnd={(event) => {
          setActiveTask(null);

          const { active, over } = event;

          if (!over) return;

          dispatch(
            moveTask({
              id: active.id,
              status: over.id,
            }),
          );
        }}
      >
        <div className="grid grid-cols-3 gap-8 px-8 pb-8 w-full">
          <Column id="todo" title="Todo" tasks={getTasks("todo")} />

          <Column
            id="in-progress"
            title="In Progress"
            tasks={getTasks("in-progress")}
          />

          <Column id="done" title="Done" tasks={getTasks("done")} />
        </div>

        <DragOverlay>
          {activeTask && (
            <div className="bg-white border p-3 rounded shadow-xl w-72">
              <div className="font-medium text-gray-800">
                {activeTask.title}
              </div>

              <div className="text-xs text-gray-500 mt-1">
                {projects.find((p) => p.id === activeTask.projectId)?.title ||
                  "No Project"}
              </div>
            </div>
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
