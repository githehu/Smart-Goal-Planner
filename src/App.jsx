import { useEffect, useState } from "react";
import GoalForm from "./components/GoalForm.jsx";
import GoalList from "./components/GoalList";
import Overview from "./components/Overview";
import "./style.css";

const API_URL = "http://localhost:3000/goals";

export default function App() {
  const [goals, setGoals] = useState([]);

  // Fetch goals from json-server
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setGoals(data))
      .catch(err => console.error("Error fetching goals:", err));
  }, []);

  // Add new goal
  const addGoal = async (goal) => {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(goal),
    });
    const newGoal = await res.json();
    setGoals([...goals, newGoal]);
  };

  // Update goal
  const updateGoal = async (id, updates) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    const updated = await res.json();
    setGoals(goals.map(goal => (goal.id === id ? updated : goal)));
  };

  // Delete goal
  const deleteGoal = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    setGoals(goals.filter(goal => goal.id !== id));
  };

  return (
    <div className="container">
      <h1>💰 Smart Goal Planner</h1>
      <Overview goals={goals} />
      <GoalForm addGoal={addGoal} />
      <GoalList goals={goals} updateGoal={updateGoal} deleteGoal={deleteGoal} />
    </div>
  );
}
