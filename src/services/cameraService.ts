/**
 * Camera API Service
 * Handles all camera-related API calls
 * Ready for API and Database integration
 */

import {
  Camera,
  CameraListResponse,
  CameraResponse,
  CameraStats,
  CameraCreateRequest,
  CameraUpdateRequest,
  ZoneCameras,
} from "@/types/camera";

// Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

/**
 * Create API request with headers
 */
const createHeaders = (): HeadersInit => {
  const token = localStorage.getItem("authToken");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

/**
 * Handle API response
 */
const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }
  return response.json();
};

/**
 * Camera Service API Methods
 */
export const cameraService = {
  /**
   * Get all cameras
   */
  getAllCameras: async (): Promise<Camera[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/cameras`, {
        method: "GET",
        headers: createHeaders(),
      });
      const data = await handleResponse<CameraListResponse>(response);
      return data.data || [];
    } catch (error) {
      console.error("Failed to fetch cameras:", error);
      throw error;
    }
  },

  /**
   * Get camera by ID
   */
  getCameraById: async (id: number): Promise<Camera> => {
    try {
      const response = await fetch(`${API_BASE_URL}/cameras/${id}`, {
        method: "GET",
        headers: createHeaders(),
      });
      const data = await handleResponse<CameraResponse>(response);
      if (data.data && typeof data.data === "object" && "id" in data.data) {
        return data.data as Camera;
      }
      throw new Error("Invalid camera response");
    } catch (error) {
      console.error(`Failed to fetch camera ${id}:`, error);
      throw error;
    }
  },

  /**
   * Get cameras by zone
   */
  getCamerasByZone: async (zone: string): Promise<Camera[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/cameras?zone=${zone}`, {
        method: "GET",
        headers: createHeaders(),
      });
      const data = await handleResponse<CameraListResponse>(response);
      return data.data || [];
    } catch (error) {
      console.error(`Failed to fetch cameras for zone ${zone}:`, error);
      throw error;
    }
  },

  /**
   * Get camera statistics
   */
  getCameraStats: async (): Promise<CameraStats> => {
    try {
      const response = await fetch(`${API_BASE_URL}/cameras/stats`, {
        method: "GET",
        headers: createHeaders(),
      });
      const data = await handleResponse<{ data: CameraStats }>(response);
      return data.data;
    } catch (error) {
      console.error("Failed to fetch camera stats:", error);
      throw error;
    }
  },

  /**
   * Create new camera
   */
  createCamera: async (
    cameraData: CameraCreateRequest
  ): Promise<Camera> => {
    try {
      const response = await fetch(`${API_BASE_URL}/cameras`, {
        method: "POST",
        headers: createHeaders(),
        body: JSON.stringify(cameraData),
      });
      const data = await handleResponse<CameraResponse>(response);
      if (data.data && typeof data.data === "object" && "id" in data.data) {
        return data.data as Camera;
      }
      throw new Error("Invalid camera response");
    } catch (error) {
      console.error("Failed to create camera:", error);
      throw error;
    }
  },

  /**
   * Update camera
   */
  updateCamera: async (
    id: number,
    updates: CameraUpdateRequest
  ): Promise<Camera> => {
    try {
      const response = await fetch(`${API_BASE_URL}/cameras/${id}`, {
        method: "PUT",
        headers: createHeaders(),
        body: JSON.stringify(updates),
      });
      const data = await handleResponse<CameraResponse>(response);
      if (data.data && typeof data.data === "object" && "id" in data.data) {
        return data.data as Camera;
      }
      throw new Error("Invalid camera response");
    } catch (error) {
      console.error(`Failed to update camera ${id}:`, error);
      throw error;
    }
  },

  /**
   * Delete camera
   */
  deleteCamera: async (id: number): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/cameras/${id}`, {
        method: "DELETE",
        headers: createHeaders(),
      });
      const data = await handleResponse<CameraResponse>(response);
      return data.success;
    } catch (error) {
      console.error(`Failed to delete camera ${id}:`, error);
      throw error;
    }
  },

  /**
   * Get camera status
   */
  getCameraStatus: async (id: number): Promise<string> => {
    try {
      const response = await fetch(`${API_BASE_URL}/cameras/${id}/status`, {
        method: "GET",
        headers: createHeaders(),
      });
      const data = await handleResponse<{ status: string }>(response);
      return data.status;
    } catch (error) {
      console.error(`Failed to fetch camera ${id} status:`, error);
      throw error;
    }
  },

  /**
   * Get cameras grouped by zone
   */
  getCamerasByZones: async (): Promise<ZoneCameras> => {
    try {
      const response = await fetch(`${API_BASE_URL}/cameras/grouped/zones`, {
        method: "GET",
        headers: createHeaders(),
      });
      const data = await handleResponse<{ data: ZoneCameras }>(response);
      return data.data;
    } catch (error) {
      console.error("Failed to fetch cameras by zones:", error);
      throw error;
    }
  },

  /**
   * Test camera connection
   */
  testCameraConnection: async (id: number): Promise<boolean> => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/cameras/${id}/test-connection`,
        {
          method: "POST",
          headers: createHeaders(),
        }
      );
      const data = await handleResponse<{ success: boolean }>(response);
      return data.success;
    } catch (error) {
      console.error(`Failed to test camera ${id} connection:`, error);
      throw error;
    }
  },

  /**
   * Restart camera
   */
  restartCamera: async (id: number): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/cameras/${id}/restart`, {
        method: "POST",
        headers: createHeaders(),
      });
      const data = await handleResponse<{ success: boolean }>(response);
      return data.success;
    } catch (error) {
      console.error(`Failed to restart camera ${id}:`, error);
      throw error;
    }
  },

  /**
   * Get camera streaming URL
   */
  getStreamingUrl: async (id: number): Promise<string> => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/cameras/${id}/stream-url`,
        {
          method: "GET",
          headers: createHeaders(),
        }
      );
      const data = await handleResponse<{ url: string }>(response);
      return data.url;
    } catch (error) {
      console.error(`Failed to get streaming URL for camera ${id}:`, error);
      throw error;
    }
  },
};

export default cameraService;
