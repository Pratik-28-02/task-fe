const BASE_URL = import.meta.env.VITE_API_BASE_URL;

/* Get tasks for a task list */
export const getTasksByTaskListId = async (taskListId) => {
  const response = await fetch(
    `${BASE_URL}/task-lists/${taskListId}/tasks`
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

/* Create task */
export const createTask = async (taskListId, data) => {
  const response = await fetch(
    `${BASE_URL}/task-lists/${taskListId}/tasks`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

/* Get single task */
export const getTask = async (taskListId, taskId) => {
  const response = await fetch(
    `${BASE_URL}/task-lists/${taskListId}/tasks/${taskId}`
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

/* Update task */
export const updateTask = async (taskListId, taskId, data) => {
  const response = await fetch(
    `${BASE_URL}/task-lists/${taskListId}/tasks/${taskId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

/* Delete task */
export const deleteTask = async (taskListId, taskId) => {
  const response = await fetch(
    `${BASE_URL}/task-lists/${taskListId}/tasks/${taskId}`,
    {
      method: "DELETE"
    }
  );
  // 204 No Content is success for DELETE
  if (response.status === 204 || response.ok) {
    return null;
  }
  throw new Error(`HTTP error! status: ${response.status}`);
};