// services/historyService.ts
const API_URL = '/weather-history'; // Replace with your backend API URL if needed

export const saveSearchHistory = async (historyData: any) => {
  try {
    const response = await fetch(`${API_URL}/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Ensure to attach token
      },
      body: JSON.stringify(historyData),
    });
    if (!response.ok) {
      throw new Error('Failed to save search history');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const fetchSearchHistory = async () => {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Ensure to attach token
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch search history');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};
