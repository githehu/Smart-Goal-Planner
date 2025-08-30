import { useState } from "react";

export default function GoalForm({ addGoal }) {
  const [form, setForm] = useState({
    name: "",
    targetAmount: "",
    category: "",
    deadline: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.targetAmount) return;
    addGoal({
      ...form,
      savedAmount: 0,
      createdAt: new Date().toISOString().split("T")[0]
    });
    setForm({ name: "", targetAmount: "", category: "", deadline: "" });
  };

  return (
    <form className="goal-form" onSubmit={handleSubmit}>
      <input name="name" placeholder="Goal Name" value={form.name} onChange={handleChange} />
      <input name="targetAmount" type="number" placeholder="Target Amount" value={form.targetAmount} onChange={handleChange} />
      <input name="category" placeholder="Category" value={form.category} onChange={handleChange} />
      <input name="deadline" type="date" value={form.deadline} onChange={handleChange} />
      <button type="submit">➕ Add Goal</button>
    </form>
  );
}
