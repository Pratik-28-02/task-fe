const BASE_URL = "http://localhost:8080/api";

export const getTaskLists = async() => {
   const response = await fetch(`${BASE_URL}/task-lists`);
   if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
   }
   return response.json();
};

export const createTaskList = async(data) => {
   const response = await fetch(`${BASE_URL}/task-lists`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
   });
   if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
   }
   return response.json();
};

export const getListById = async (id) => {
   const response = await fetch(`${BASE_URL}/task-lists/${id}`);
   if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
   }
   return response.json();
};

export const updateTaskList = async (id, data) => {
   const response = await fetch(`${BASE_URL}/task-lists/${id}`, {
      method: "PUT",
      headers: {
         "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
   });
   if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
   }
   return response.json();
};

export const deleteTaskList = async(id) => {
   const response = await fetch(`${BASE_URL}/task-lists/${id}`, {
      method: "DELETE"
   });
   // 204 No Content is success for DELETE
   if (response.status === 204 || response.ok) {
      return null;
   }
   throw new Error(`HTTP error! status: ${response.status}`);
};