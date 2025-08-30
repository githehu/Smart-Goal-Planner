import GoalCard from "./GoalCard";

export default function GoalList({ goals, updateGoal, deleteGoal }) {
  return (
    <div className="goal-list">
      {goals.length === 0 && <p>No goals yet. Start by adding one!</p>}
      {goals.map(goal => (
        <GoalCard 
          key={goal.id} 
          goal={goal} 
          updateGoal={updateGoal} 
          deleteGoal={deleteGoal} 
        />
      ))}
    </div>
  );
}
