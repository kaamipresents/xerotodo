import React, { useState, useRef, useContext, useEffect } from "react";
import "./TodoApp.css";
import "../../styles/theme.css";
import moment from "moment";
import { AuthContext } from "../../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

// 🔹 Firebase imports
import { db, auth } from "../../firebase";
import {
  collection,
  updateDoc,
  deleteDoc,
  doc,
  setDoc,
  getDocs,
} from "firebase/firestore";

const TodoApp = () => {
  const { tasks, setTasks, currentUser, notify } = useContext(AuthContext);
  const [newTaskText, setNewTaskText] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editText, setEditText] = useState("");
  const editButtonRef = useRef(null);
  const editSelectRef = useRef(null);
  const [newPriority, setNewPriority] = useState("");
  const [editPriority, setEditPriority] = useState("");

  // ✅ Add Task
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;

    const taskId = crypto.randomUUID();
    const newTask = {
      id: taskId,
      text: newTaskText,
      completed: false,
      priority: newPriority,
      date: moment(Date.now()).format("Do MMM YYYY"),
    };

    try {
      const taskRef = doc(
        db,
        "users",
        auth.currentUser?.email,
        "tasks",
        taskId
      );
      await setDoc(taskRef, newTask);

      notify("Task added successfully!", 500);

      // fetch updated tasks from Firestore
      await fetchTasks();
      setNewTaskText("");
      setNewPriority("");
    } catch (error) {
      console.error("❌ Error adding task:", error);
    }
  };

  // ✅ Toggle Task
  const handleToggleTask = async (taskId) => {
    try {
      const taskToUpdate = tasks.find((task) => task.id === taskId);
      if (taskToUpdate) {
        const taskRef = doc(
          db,
          "users",
          auth.currentUser?.email,
          "tasks",
          taskId
        );
        await updateDoc(taskRef, { completed: !taskToUpdate.completed });
        // notify("Task status updated!", 500);

        await fetchTasks();
      }
    } catch (error) {
      console.error("❌ Error updating task:", error);
    }
  };

  // ✅ Delete Task
  const handleDeleteTask = async (taskId) => {
    try {
      const taskRef = doc(
        db,
        "users",
        auth.currentUser?.email,
        "tasks",
        taskId
      );
      await deleteDoc(taskRef);
      notify("Task deleted successfully!", 500);
      await fetchTasks();
    } catch (error) {
      console.error("❌ Error deleting task:", error);
    }
  };

  // ✅ Edit Task
  const startEditing = (task) => {
    setEditingTaskId(task.id);
    setEditText(task.text);
    setEditPriority(task.priority);
  };

  const saveEdit = async (taskId) => {
    const taskRef = doc(db, "users", auth.currentUser?.email, "tasks", taskId);

    try {
      if (editText.trim() === "") {
        await deleteDoc(taskRef);
        console.log("🗑️ Deleted empty task:", taskId);
      } else {
        await updateDoc(taskRef, {
          text: editText,
          priority: editPriority,
        });

          notify("Task updated successfully!", 500);
        console.log("✏️ Updated task:", taskId);
      }

      setEditingTaskId(null);
      await fetchTasks();
    } catch (error) {
      console.error("❌ Error saving edit:", error);
    }
  };

  const handleBlur = (e, taskId) => {
    if (editButtonRef.current && editButtonRef.current.contains(e.relatedTarget))
      return;
    if (editSelectRef.current && editSelectRef.current.contains(e.relatedTarget))
      return;
    saveEdit(taskId);
  };

  // ✅ Fetch Tasks from Firestore
  const fetchTasks = async () => {
    if (!auth.currentUser) return;

    const tasksRef = collection(
      db,
      "users",
      auth.currentUser?.email,
      "tasks"
    );
    const snapshot = await getDocs(tasksRef);

    const fetchedTasks = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setTasks(fetchedTasks);
  };

  useEffect(() => {
    fetchTasks();
  }, [auth.currentUser]);

  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;
  const progressText = `${completedTasks}/${totalTasks}`;

  // ✅ Sort tasks by priority
  const priorityOrder = { High: 3, Medium: 2, Low: 1 };
  const sortedTasks = [...tasks].sort(
    (a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]
  );

  return (
    <div className="todo-app">
      <div className="container">
        {/* Stats */}
        <div className="stats-section">
          <div className="stats-text">
            {totalTasks === 0 ? (
              <>
                <h2>Add A Task</h2>
                <p>Let's Begin</p>
              </>
            ) : (
              <>
                <h2>Todo Started</h2>
                <p>Keep Going</p>
              </>
            )}
          </div>
          <div className="progress-circle">
            <div className="progress-text">{progressText}</div>
          </div>
        </div>

        {/* New Task */}
        <form onSubmit={handleAddTask} className="input-section">
          <input
            required
            type="text"
            className="task-input"
            placeholder="write your next task"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
          />

          <select
            className="task-select"
            value={newPriority}
            onChange={(e) => setNewPriority(e.target.value)}
            required
          >
            <option value="" disabled>
              Choose priority
            </option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <button type="submit" className="add-button">
            +
          </button>
        </form>

        {/* Task List */}
        <div className="task-list">
          <AnimatePresence>
            {sortedTasks.length === 0 ? (
              <div className="empty-state">No tasks yet. Add one above!</div>
            ) : (
              sortedTasks.map((task) => (
                <motion.div
                  key={task.id}
                  className="task-item"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Checkbox */}
                  <button
                    onClick={() => handleToggleTask(task.id)}
                    className={`task-checkbox ${
                      task.completed ? "completed" : ""
                    }`}
                  >
                    {task.completed && <div className="task-checkbox-dot" />}
                  </button>

                  {/* Task Text */}
                  {editingTaskId === task.id ? (
                    <>
                      <input
                        className={`task-text ${
                          task.completed ? "completed" : ""
                        }`}
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onBlur={(e) => handleBlur(e, task.id)}
                      />
                      <select
                        className="edittask-select"
                        ref={editSelectRef}
                        value={editPriority}
                        onBlur={(e) => handleBlur(e, task.id)}
                        onChange={(e) => setEditPriority(e.target.value)}
                      >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </>
                  ) : (
                    <>
                      <span
                        className={`task-text ${
                          task.completed ? "completed" : ""
                        }`}
                      >
                        {task.text}
                      </span>
                      <span>{task.priority}</span>
                      <span className="task-date">{task.date}</span>
                    </>
                  )}

                  {/* Action Buttons */}
                  <div className="task-actions">
                    {editingTaskId === task.id ? (
                      <button
                        ref={editButtonRef}
                        onClick={(e) => handleBlur(e, task.id)}
                        className="delete-button"
                      >
                        ✅
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          task.completed ? null : startEditing(task)
                        }
                        className="delete-button"
                      >
                        ✏️
                      </button>
                    )}

                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="delete-button"
                    >
                      🗑
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
