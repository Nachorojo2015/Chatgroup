export const login = async (username, password, BACKEND_URL) => {
  try {
    const response = await fetch(`${BACKEND_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
      credentials: 'include',
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

export const sendForgotPasswordEmail = async (email, BACKEND_URL) => {
  try {
    const response = await fetch(`${BACKEND_URL}/auth/email/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
      credentials: 'include',
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
