import React from "react";

const Filters = ({
  activeTodos,
  setFilterParam,
  filterParam,
  completedTodos,
  removeAllDoneTodos,
}) => {
  return (
    <div className="todo-filters">
      <span className="active-count">{activeTodos().length} item</span>

      <div
        className={filterParam === "all" ? "filter-btn -active" : "filter-btn"}
        onClick={() => setFilterParam("all")}
      >
        All
      </div>
      <div
        className={
          filterParam === "active" ? "filter-btn -active" : "filter-btn"
        }
        onClick={() => setFilterParam("active")}
      >
        Active
      </div>
      <div
        className={
          filterParam === "completed" ? "filter-btn -active" : "filter-btn"
        }
        onClick={() => setFilterParam("completed")}
      >
        Completed
      </div>
      {completedTodos().length ? (
        <div className="remove-completed" onClick={removeAllDoneTodos}>
          Remove Completed
        </div>
      ) : null}
    </div>
  );
};

export default Filters;
