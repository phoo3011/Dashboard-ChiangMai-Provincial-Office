/**
 * Camera Types and Interfaces
 * Prepared for API and Database integration
 */

export type CameraStatus = "online" | "offline" | "warning";
export type CameraResolution = "4K" | "2K" | "1080p" | "720p";

export interface Camera {
  id: number;
  name: string;
  zone: string;
  status: CameraStatus;
  resolution: CameraResolution;
  fps: number;
  location?: string;
  ipAddress?: string;
  mac?: string;
  lastUpdated?: string;
  uptime?: number;
}

export interface CameraStats {
  totalCameras: number;
  onlineCameras: number;
  offlineCameras: number;
  warningCameras: number;
}

export interface CameraResponse {
  success: boolean;
  data?: Camera | Camera[];
  error?: string;
  message?: string;
}

export interface CameraListResponse extends CameraResponse {
  data?: Camera[];
  total?: number;
  page?: number;
  pageSize?: number;
}

export interface CameraUpdateRequest {
  name?: string;
  location?: string;
  zone?: string;
  fps?: number;
  resolution?: CameraResolution;
}

export interface CameraCreateRequest extends CameraUpdateRequest {
  ipAddress: string;
  mac: string;
  zone: string;
  name: string;
}

export interface ZoneCameras {
  [key: string]: Camera[];
}
