import AddTask from "./AddTask";
import TaskItem from "./TaskItem";
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
          <TaskItem key={task._id} task={task} />
        ))}

        {tasks.length === 0 && (
          <p className="text-center text-gray-500">No tasks yet.</p>
        )}
      </div>
    </main>
  );
}
