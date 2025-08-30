import { useState } from "react";

export default function GoalCard({ goal, updateGoal, deleteGoal }) {
  const [deposit, setDeposit] = useState("");

  const progress = Math.min((goal.savedAmount / goal.targetAmount) * 100, 100).toFixed(1);
  const remaining = goal.targetAmount - goal.savedAmount;
  const deadlineDate = new Date(goal.deadline);
  const daysLeft = Math.ceil((deadlineDate - new Date()) / (1000 * 60 * 60 * 24));

  const handleDeposit = () => {
    const amount = Number(deposit);
    if (amount > 0) {
      updateGoal(goal.id, { savedAmount: goal.savedAmount + amount });
      setDeposit("");
    }
  };

  return (
    <div className={`goal-card ${daysLeft < 0 ? "overdue" : daysLeft <= 30 && remaining > 0 ? "warning" : ""}`}>
      <h3>{goal.name}</h3>
      <p>Category: {goal.category}</p>
      <p>Target: ${goal.targetAmount}</p>
      <p>Saved: ${goal.savedAmount} ({progress}%)</p>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>
      <p>{remaining > 0 ? `Remaining: $${remaining}` : "🎉 Goal Reached!"}</p>
      <p>Deadline: {goal.deadline} ({daysLeft >= 0 ? `${daysLeft} days left` : "Overdue"})</p>

      <div className="actions">
        <input type="number" placeholder="Deposit amount" value={deposit} onChange={(e) => setDeposit(e.target.value)} />
        <button onClick={handleDeposit}>💵 Deposit</button>
        <button onClick={() => deleteGoal(goal.id)}>🗑 Delete</button>
      </div>
    </div>
  );
}
