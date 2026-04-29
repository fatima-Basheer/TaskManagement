import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";
import {
  addTaskToProject,
  deleteTask,
  updateProject,
  selectProject,
} from "../features/projectsSlice";

function ProjectModal() {
  const dispatch = useDispatch();

  const selectedProjectId = useSelector(
    (state) => state.projects.selectedProjectId
  );

  const project = useSelector((state) =>
    state.projects.projects.find((p) => p.id === selectedProjectId)
  );

  const [taskTitle, setTaskTitle] = useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    if (project) {
      setForm({
        title: project.title || "",
        description: project.description || "",
        startDate: project.startDate || "",
        endDate: project.endDate || "",
      });
    }
  }, [project]);

  if (!project) return null;

  const handleUpdateProject = () => {
  dispatch(
    updateProject({
      id: project.id,
      data: form,
    })
  );

  dispatch(selectProject(null));
};

  const handleAddTask = (e) => {
    e.preventDefault();

    if (!taskTitle.trim()) return;

    dispatch(
      addTaskToProject({
        projectId: project.id,
        task: { title: taskTitle },
      })
    );

    setTaskTitle("");
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="bg-white w-[90%] max-w-2xl p-8 rounded relative">

        <button
          onClick={() => dispatch(selectProject(null))}
          className="absolute right-3 top-3"
        >
          <RxCross1 />
        </button>

        <div className="space-y-2">
          <input
            className="border p-2 w-full"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />

          <textarea
            className="border p-2 w-full"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <input
            type="date"
            className="border p-2 w-full"
            value={form.startDate}
            onChange={(e) =>
              setForm({ ...form, startDate: e.target.value })
            }
          />

          <input
            type="date"
            className="border p-2 w-full"
            value={form.endDate}
            onChange={(e) =>
              setForm({ ...form, endDate: e.target.value })
            }
          />
        </div>

        <div className="flex gap-2 mt-4">
          <input
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            className="border p-2 flex-1"
            placeholder="New task"
          />

          <button
            type="button"
            onClick={handleAddTask}
            className="bg-green-600 text-white px-8"
          >
            Add
          </button>
        </div>

      
        <div className="mt-4 space-y-2">
          {project.tasks?.map((t) => (
            <div key={t.id} className="flex justify-between border p-2">
              <span>{t.title}</span>

              <button
                onClick={() =>
                  dispatch(
                    deleteTask({
                      projectId: project.id,
                      taskId: t.id,
                    })
                  )
                }
                className="text-red-500"
              >
                <RxCross1 />
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={handleUpdateProject}
          className="mt-6 w-full bg-blue-600 text-white py-2"
        >
          Update Project
        </button>
      </div>
    </div>
  );
}

export default ProjectModal;