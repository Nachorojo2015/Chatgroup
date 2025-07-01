export const joinTheGroup = async (id, BACKEND_URL) => {
  try {
    const response = await fetch(`${BACKEND_URL}/group/join/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getGroup = async (id, BACKEND_URL) => {
  try {
    const response = await fetch(`${BACKEND_URL}/group/${id}`);

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};
