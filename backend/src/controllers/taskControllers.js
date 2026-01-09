import Task from "../models/Task.js";

const getAllTasks = async (req, res) => {
  const { filter = "today" } = req.query;
  const now = new Date();
  let startDate;

  switch (filter) {
    case "today":
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      break;
    case "week":
      const firstDayOfWeek = now.getDate() - now.getDay();
      startDate = new Date(now.getFullYear(), now.getMonth(), firstDayOfWeek);
      break;
    case "month":
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    case "all":
      startDate = null;
      break;
    default:
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }

  const query = startDate ? { createdAt: { $gte: startDate } } : {};

  try {
    const result = await Task.aggregate([
      { $match: query },
      {
        $facet: {
          tasks: [{ $sort: { createdAt: -1 } }],
          activeCount: [{ $match: { status: "active" } }, { $count: "count" }],
          completedCount: [
            { $match: { status: "completed" } },
            { $count: "count" },
          ],
        },
      },
    ]);

    const tasks = result[0]?.tasks ?? [];
    const activeCount = result[0]?.activeCount?.[0]?.count ?? 0;
    const completedCount = result[0]?.completedCount?.[0]?.count ?? 0;

    res.status(200).json({ tasks, activeCount, completedCount });
  } catch (error) {
    console.log("🚀 ~ getAllTasks ~ error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const createTask = async (req, res) => {
  try {
    const { title } = req.body;
    const newTask = new Task({ title });
    await newTask.save();

    res
      .status(201)
      .json({ message: "task created successfully", task: newTask });
  } catch (error) {
    console.log("🚀 ~ createTask ~ error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const updateTask = async (req, res) => {
  try {
    const { title, status, completedAt } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { title, status, completedAt },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "task updated successfully" });
  } catch (error) {
    console.log("🚀 ~ updateTask ~ error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const deleteTask = await Task.findByIdAndDelete(req.params.id);
    if (!deleteTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "task deleted successfully" });
  } catch (error) {
    console.log("🚀 ~ deleteTask ~ error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export { getAllTasks, createTask, updateTask, deleteTask };
