import { RxCross1 } from "react-icons/rx";

function ProjectDetails({ project, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="relative bg-white w-[90%] max-w-lg p-6 rounded-xl">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-gray-200 p-1 rounded-full"
        >
          <RxCross1 />
        </button>

        <h2 className="text-xl font-bold mb-2">{project.title}</h2>

        <p className="text-gray-600 mb-4">{project.description}</p>

        <div className="text-sm mb-4">
          <p>
            <strong>Start:</strong> {project.startDate}
          </p>
          <p>
            <strong>End:</strong> {project.endDate}
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Tasks</h3>

          {project.tasks?.length === 0 ? (
            <p className="text-gray-400">No tasks available</p>
          ) : (
            <ul className="space-y-2">
              {project.tasks.map((t) => (
                <li
                  key={t.id}
                  className="flex items-center justify-between border p-2 rounded"
                >
                  <span>{t.title}</span>

                  <div className="flex items-center gap-2 text-xs">
                    {t.status === "done" && (
                      <span className="flex items-center gap-1 text-green-600">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        Done
                      </span>
                    )}

                    {t.status === "in-progress" && (
                      <span className="flex items-center gap-1 text-yellow-600">
                        <span className="w-3 h-3 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin"></span>
                        In Progress
                      </span>
                    )}

                    {t.status === "todo" && (
                      <span className="flex items-center gap-1 text-gray-500">
                        <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                        Todo
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectDetails;
