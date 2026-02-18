import AddTask from "./AddTask";
// import ProfileCard from "./ProfileCard";

async function getTasks() {
  const res = await fetch("http://localhost:5000/api/tasks", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch tasks");
  }

  return res.json();
}

export default async function Home() {
  const tasks = await getTasks();

  return (
    <main className="max-w-xl mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold text-center mb-8">TaskMaster</h1>

      <AddTask />

      {/* <ProfileCard /> */}

      {/* 3. Render the Tasks */}
      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="
            bg-white 
              p-5 
              rounded-xl 
              shadow-sm 
              hover:shadow-md 
              transition-shadow 
              border 
             border-gray-100 
              flex 
              justify-between 
              items-center
            "
          >
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                {task.title}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Created: {new Date(task.createdAt).toLocaleDateString()}
              </p>
            </div>

            <span
              className={`
                px-3 py-1 
                rounded-full 
                text-xs 
                font-medium
                ${task.isCompleted ? 
                  "bg-green-100 text-green-800" : 
                  "bg-yellow-100 text-yellow-800"
                }
              `}
            >
              {task.isCompleted ? "Completed" : "Pending"}
            </span>
          </div>
        ))}

        {tasks.length === 0 && (
          <p className="text-center text-gray-500">No tasks yet.</p>
        )}
      </div>
    </main>
  );
}
