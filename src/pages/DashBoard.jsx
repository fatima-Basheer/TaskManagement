import { useRef } from "react";
import { useSelector } from "react-redux";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { GiLaptop } from "react-icons/gi";

export default function DashBoard() {
  const containerRef = useRef();

  const tasks = useSelector((state) => state.tasks.tasks || []);
  const projects = useSelector((state) => state.projects.projects || []);

  const completedTasks = tasks.filter((t) => t.status === "done").length;

  const totalTasks = tasks.length;

  const taskProgress =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const getProjectProgress = (project) => {
    const projectTasks = tasks.filter((t) => t.projectId === project.id);

    if (projectTasks.length === 0) return 0;

    const completed = projectTasks.filter((t) => t.status === "done").length;

    return Math.round((completed / projectTasks.length) * 100);
  };

  const projectProgress =
    projects.length === 0
      ? 0
      : Math.round(
          projects.reduce((acc, p) => acc + getProjectProgress(p), 0) /
            projects.length,
        );

  const stats = [
    { title: "Total Tasks", value: totalTasks },
    { title: "Completed Tasks", value: completedTasks },
    { title: "Task Progress", value: taskProgress },
  ];

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.from(containerRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.out",
      });

      tl.from(
        ".card",
        {
          y: 25,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.2",
      );

      tl.from(
        ".progress-bar",
        {
          scaleX: 0,
          transformOrigin: "left",
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
        },
        "-=0.3",
      );
    },
    { scope: containerRef, dependencies: [tasks, projects] },
  );

  return (
    <div ref={containerRef} className="p-6 bg-gray-50 min-h-screen space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((item, i) => (
          <div
            key={i}
            className="card bg-white rounded-xl p-6 shadow-md border"
          >
            <h4 className="text-gray-500 text-sm">{item.title}</h4>

            <h2 className="text-3xl font-bold text-gray-800 mt-2">
              {item.value}
            </h2>

            <div className="w-full h-2 bg-gray-200 rounded-full mt-4 overflow-hidden">
              <div
                className="progress-bar h-full bg-blue-500 origin-left"
                style={{
                  transform: `scaleX(${
                    item.title === "Task Progress" ? taskProgress / 100 : 0.7
                  })`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="card bg-white rounded-xl p-6 shadow-md border">
        <h4 className="text-gray-600 mb-4 font-semibold">
          Active Projects Overview
        </h4>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            {projects.map((proj, i) => {
              const progress = getProjectProgress(proj);

              return (
                <div key={proj.id || i}>
                  <div className="flex justify-between text-sm font-medium">
                    <span>{proj.title || "Untitled"}</span>
                    <span>{progress}%</span>
                  </div>

                  <div className="w-full h-2 bg-gray-200 rounded-full mt-1 overflow-hidden">
                    <div
                      className="progress-bar h-full bg-green-500 origin-left"
                      style={{
                        transform: `scaleX(${progress / 100})`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col items-center justify-center gap-4">
            <GiLaptop className="text-5xl text-gray-400" />

            <div className="text-center">
              <p className="text-gray-500 text-sm">
                Overall Project Completion
              </p>
              <h2 className="text-3xl font-bold text-gray-800">
                {projectProgress}%
              </h2>
            </div>

            <div className="w-3/4 h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="progress-bar h-full bg-purple-500 origin-left"
                style={{
                  transform: `scaleX(${projectProgress / 100})`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
