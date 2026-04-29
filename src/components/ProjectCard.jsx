import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RxCross1 } from "react-icons/rx";

import {
  addProject,
  deleteProject,
  selectProject,
} from "../features/projectsSlice";

import ProjectModal from "./ProjectModal";
import ProjectDetails from "../pages/ProjectDetails";

function ProjectCard() {
  const containerRef = useRef();

  const projects = useSelector((state) => state.projects.projects);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  const handleAdd = (e) => {
    e.preventDefault();

    if (!form.title.trim()) return;

    dispatch(addProject(form));

    setForm({
      title: "",
      description: "",
      startDate: "",
      endDate: "",
    });

    setShow(false);
  };

  return (
    <div ref={containerRef}>
      <div className="flex justify-end p-4">
        <button
          onClick={() => setShow(true)}
          className="add-btn bg-black text-white px-4 py-2 rounded cursor-pointer hover:scale-x-110 duration-700"
        >
          + Add Project
        </button>
      </div>

      {show && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 modal-overlay">
          <div className="modal-box relative bg-white p-8 rounded-xl w-[90%] max-w-md">
            <button
              onClick={() => setShow(false)}
              className="absolute top-2 right-2 bg-gray-200 p-1 rounded-full text-gray-500 hover:text-black"
            >
              <RxCross1 />
            </button>

            <form onSubmit={handleAdd} className="space-y-3">
              <input
                placeholder="Title"
                className="w-full border p-2"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />

              <textarea
                placeholder="Description"
                className="w-full border p-2"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />

              <input
                type="date"
                className="w-full border p-2"
                value={form.startDate}
                onChange={(e) =>
                  setForm({ ...form, startDate: e.target.value })
                }
              />

              <input
                type="date"
                className="w-full border p-2"
                value={form.endDate}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
              />

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2"
              >
                Create
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="table-header grid grid-cols-[2fr_2fr_2fr_1fr_1fr_1fr] gap-6 px-8 font-bold border-b pb-2 mt-4">
        <div className="text-center">Title</div>
        <div className="text-center">Description</div>
        <div className="text-center">Dates</div>
        <div className="text-center">Tasks</div>
        <div className="text-center">Update</div>
        <div className="text-center">Delete</div>
      </div>

      <div className="text-sm text-gray-500 flex flex-col gap-3 px-6 mt-2">
        {projects.map((p) => (
          <div
            key={p.id}
            className="project-row grid grid-cols-[2fr_2fr_2fr_1fr_1fr_1fr] gap-6 items-center p-4 bg-white shadow-sm shadow-gray-200 rounded hover:bg-gray-100 transition"
          >
            <div
              className="min-w-0 truncate font-medium cursor-pointer"
              title={p.title}
              onClick={() => {
                setSelectedProject(p);
                setShowDetails(true);
              }}
            >
              {p.title}
            </div>

            <div className="min-w-0 truncate" title={p.description}>
              {p.description}
            </div>

            <div title={`${p.startDate} → ${p.endDate}`}>
              {p.startDate} → {p.endDate}
            </div>

            <div className="text-center">{p.tasks?.length || 0}</div>

            <div className="flex justify-center">
              <button
                onClick={() => dispatch(selectProject(p.id))}
                className="text-blue-600"
              >
                Update
              </button>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => dispatch(deleteProject(p.id))}
                className="text-red-500"
              >
                <RxCross1 />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showDetails && selectedProject && (
        <ProjectDetails
          project={selectedProject}
          onClose={() => setShowDetails(false)}
        />
      )}

      <ProjectModal />
    </div>
  );
}

export default ProjectCard;
