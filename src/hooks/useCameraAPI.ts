/**
 * Camera Hooks
 * Ready for API integration with fallback to mock data
 */

import { useState, useEffect } from "react";
import { Camera, CameraStats } from "@/types/camera";
import cameraService from "@/services/cameraService";

/**
 * Hook to fetch all cameras
 * Falls back to mock data if API is unavailable
 */
export const useCameras = (mockData?: Camera[]) => {
  const [cameras, setCameras] = useState<Camera[]>(mockData || []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCameras = async () => {
      try {
        setLoading(true);
        const data = await cameraService.getAllCameras();
        setCameras(data);
        setError(null);
      } catch (err) {
        console.warn("API unavailable, using mock data");
        if (mockData) {
          setCameras(mockData);
        }
        setError(err instanceof Error ? err.message : "Failed to fetch cameras");
      } finally {
        setLoading(false);
      }
    };

    fetchCameras();
  }, [mockData]);

  return { cameras, loading, error };
};

/**
 * Hook to fetch cameras by zone
 */
export const useCamerasByZone = (zone: string, mockData?: Camera[]) => {
  const [cameras, setCameras] = useState<Camera[]>(mockData || []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCameras = async () => {
      try {
        setLoading(true);
        const data = await cameraService.getCamerasByZone(zone);
        setCameras(data);
        setError(null);
      } catch (err) {
        console.warn(`Failed to fetch cameras for zone ${zone}`);
        if (mockData) {
          setCameras(mockData);
        }
        setError(err instanceof Error ? err.message : "Failed to fetch cameras");
      } finally {
        setLoading(false);
      }
    };

    if (zone) {
      fetchCameras();
    }
  }, [zone, mockData]);

  return { cameras, loading, error };
};

/**
 * Hook to fetch camera statistics
 */
export const useCameraStats = () => {
  const [stats, setStats] = useState<CameraStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await cameraService.getCameraStats();
        setStats(data);
        setError(null);
      } catch (err) {
        console.warn("Failed to fetch camera stats");
        setError(err instanceof Error ? err.message : "Failed to fetch stats");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading, error };
};

/**
 * Hook to fetch single camera
 */
export const useCamera = (id: number, mockData?: Camera) => {
  const [camera, setCamera] = useState<Camera | null>(mockData || null);
  const [loading, setLoading] = useState(!mockData);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCamera = async () => {
      try {
        setLoading(true);
        const data = await cameraService.getCameraById(id);
        setCamera(data);
        setError(null);
      } catch (err) {
        console.warn(`Failed to fetch camera ${id}`);
        setError(err instanceof Error ? err.message : "Failed to fetch camera");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCamera();
    }
  }, [id]);

  return { camera, loading, error };
};

/**
 * Hook for camera mutations (update, delete, create)
 */
export const useCameraMutation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = async (id: number, updates: any) => {
    try {
      setLoading(true);
      const result = await cameraService.updateCamera(id, updates);
      setError(null);
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Update failed";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id: number) => {
    try {
      setLoading(true);
      const result = await cameraService.deleteCamera(id);
      setError(null);
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Delete failed";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const create = async (data: any) => {
    try {
      setLoading(true);
      const result = await cameraService.createCamera(data);
      setError(null);
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Create failed";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, update, remove, create };
};
