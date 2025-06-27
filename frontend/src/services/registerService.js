const register = async (email, fullname, username, password, BACKEND_URL) => {
  try {
    const response = await fetch(`${BACKEND_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, fullname, username, password }),
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

export default register;
