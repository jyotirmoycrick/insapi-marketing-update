const API_URL = import.meta.env.VITE_API_URL || '/api';

// Get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Set auth token
export const setAuthToken = (token: string) => {
  localStorage.setItem('authToken', token);
};

// Remove auth token
export const removeAuthToken = () => {
  localStorage.removeItem('authToken');
};

// API request helper
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'API request failed');
  }

  return response.json();
};

// ===== AUTH API (Admin Only) =====

export const authAPI = {
  login: async (data: { email: string; password: string }) => {
    const response = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (response.token) {
      setAuthToken(response.token);
    }
    return response;
  },

  logout: () => {
    removeAuthToken();
  },

  getCurrentUser: async () => {
    return apiRequest('/auth/me');
  },
};

// ===== CONTENT API =====

export const contentAPI = {
  getPageContent: async (page: string) => {
    return apiRequest(`/content/page/${page}`);
  },

  getContent: async (page: string, section: string, key: string) => {
    return apiRequest(`/content/${page}/${section}/${key}`);
  },

  createOrUpdateContent: async (data: any) => {
    return apiRequest('/content', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  deleteContent: async (id: string) => {
    return apiRequest(`/content/${id}`, {
      method: 'DELETE',
    });
  },

  toggleVisibility: async (id: string, isVisible: boolean) => {
    return apiRequest(`/content/${id}/visibility`, {
      method: 'PATCH',
      body: JSON.stringify({ isVisible }),
    });
  },
};

// ===== CLIENT API =====

export const clientAPI = {
  getAll: async () => {
    return apiRequest('/content/clients');
  },

  create: async (data: any) => {
    return apiRequest('/content/clients', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update: async (id: string, data: any) => {
    return apiRequest(`/content/clients/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete: async (id: string) => {
    return apiRequest(`/content/clients/${id}`, {
      method: 'DELETE',
    });
  },
};

// ===== PORTFOLIO API =====

export const portfolioAPI = {
  getAll: async (category?: string) => {
    const query = category ? `?category=${category}` : '';
    return apiRequest(`/content/portfolio${query}`);
  },

  create: async (data: any) => {
    return apiRequest('/content/portfolio', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update: async (id: string, data: any) => {
    return apiRequest(`/content/portfolio/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete: async (id: string) => {
    return apiRequest(`/content/portfolio/${id}`, {
      method: 'DELETE',
    });
  },
};

// ===== UPLOAD API =====

export const uploadAPI = {
  uploadImage: async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);

    const token = getAuthToken();
    const response = await fetch(`${API_URL}/upload/image`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Upload failed');
    }

    return response.json();
  },

  uploadMultipleImages: async (files: File[]) => {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('images', file);
    });

    const token = getAuthToken();
    const response = await fetch(`${API_URL}/upload/images`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Upload failed');
    }

    return response.json();
  },

  deleteImage: async (filename: string) => {
    return apiRequest(`/upload/image/${filename}`, {
      method: 'DELETE',
    });
  },

  getAllImages: async () => {
    return apiRequest('/upload/images');
  },
};
