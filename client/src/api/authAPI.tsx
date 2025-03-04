import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    });

    if (!response.ok) {
      // Extract error message from the response if available
      console.log(response);
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    // Parse and return the JSON response (expected to contain the JWT token)
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

export { login };
