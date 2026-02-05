# Camera API Integration Guide

## Overview
The application is fully prepared for API and database integration. Mock data is currently used for development, but all components are structured to work with a real backend API.

## Architecture

### File Structure
```
src/
  types/
    camera.ts              # TypeScript interfaces for Camera data
  services/
    cameraService.ts       # API service layer for camera operations
  hooks/
    useCameraAPI.ts       # React hooks for API integration
  pages/
    Cameras.tsx           # Cameras management page
    Zones.tsx             # Zone management page with cameras
```

## Key Features

### 1. Type-Safe Camera Models (`types/camera.ts`)
```typescript
interface Camera {
  id: number;
  name: string;
  zone: string;
  status: "online" | "offline" | "warning";
  resolution: "4K" | "2K" | "1080p" | "720p";
  fps: number;
  location?: string;
  ipAddress?: string;
  mac?: string;
  lastUpdated?: string;
  uptime?: number;
}
```

### 2. API Service (`services/cameraService.ts`)
Provides the following methods:

#### Read Operations
- `getAllCameras()` - Fetch all cameras
- `getCameraById(id)` - Fetch specific camera
- `getCamerasByZone(zone)` - Fetch cameras by zone
- `getCameraStats()` - Fetch camera statistics
- `getCamerasByZones()` - Get cameras grouped by zones

#### Write Operations
- `createCamera(data)` - Create new camera
- `updateCamera(id, updates)` - Update camera
- `deleteCamera(id)` - Delete camera

#### Special Operations
- `getCameraStatus(id)` - Get real-time camera status
- `testCameraConnection(id)` - Test camera connectivity
- `restartCamera(id)` - Restart camera
- `getStreamingUrl(id)` - Get camera streaming URL

### 3. React Hooks (`hooks/useCameraAPI.ts`)
Ready-to-use hooks for components:

```typescript
// Fetch all cameras with fallback to mock data
const { cameras, loading, error } = useCameras(mockData);

// Fetch cameras by zone
const { cameras, loading, error } = useCamerasByZone("zone-a", mockData);

// Fetch camera statistics
const { stats, loading, error } = useCameraStats();

// Fetch single camera
const { camera, loading, error } = useCamera(1, mockData);

// Mutations (create, update, delete)
const { loading, error, create, update, remove } = useCameraMutation();
```

## Backend Requirements

### Expected API Endpoints

#### GET Endpoints
```
GET /api/cameras                          # List all cameras
GET /api/cameras/:id                      # Get camera by ID
GET /api/cameras?zone=zone-a              # List cameras by zone
GET /api/cameras/grouped/zones            # Get cameras grouped by zone
GET /api/cameras/:id/status               # Get camera status
GET /api/cameras/:id/stream-url           # Get streaming URL
GET /api/cameras/stats                    # Get camera statistics
```

#### POST Endpoints
```
POST /api/cameras                         # Create camera
POST /api/cameras/:id/test-connection     # Test camera connection
POST /api/cameras/:id/restart             # Restart camera
```

#### PUT Endpoints
```
PUT /api/cameras/:id                      # Update camera
```

#### DELETE Endpoints
```
DELETE /api/cameras/:id                   # Delete camera
```

## Environment Configuration

Create a `.env` file based on `.env.example`:

```env
VITE_API_URL=http://localhost:3000/api
VITE_API_TIMEOUT=30000
VITE_ENABLE_MOCK_DATA=true
```

## Implementation Steps for Backend

### 1. Camera Model (Database)
```sql
CREATE TABLE cameras (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  zone VARCHAR(50) NOT NULL,
  status ENUM('online', 'offline', 'warning') DEFAULT 'offline',
  resolution VARCHAR(20),
  fps INTEGER,
  location VARCHAR(255),
  ip_address VARCHAR(15),
  mac_address VARCHAR(17),
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  uptime INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 2. API Response Format
All API responses should follow this format:

```json
{
  "success": true,
  "data": { /* camera data */ },
  "message": "Operation successful"
}
```

For list endpoints:
```json
{
  "success": true,
  "data": [ /* camera array */ ],
  "total": 12,
  "page": 1,
  "pageSize": 20
}
```

### 3. Error Handling
API errors should return:
```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

## Migration from Mock to Real API

### Current State (Mock Data)
- All data is stored in component state
- No API calls are made
- Perfect for development and UI testing

### Step 1: Uncomment API Calls
Hooks automatically fall back to mock data if API is unavailable:

```typescript
// This will try API first, then fall back to mockData
const { cameras } = useCameras(mockCameraData);
```

### Step 2: Update Environment
```env
VITE_API_URL=http://your-backend.com/api
VITE_ENABLE_MOCK_DATA=false
```

### Step 3: Implement Backend
- Create database tables
- Implement API endpoints matching the specification
- Add authentication if needed (JWT tokens)

## Error Handling

All API service methods include try-catch blocks and return meaningful error messages. Components receive error states and can display them appropriately:

```typescript
if (error) {
  return <div className="text-destructive">Error: {error}</div>;
}
```

## Streaming Integration

For real-time camera feeds, use the `getStreamingUrl()` method:

```typescript
const streamUrl = await cameraService.getStreamingUrl(cameraId);
// Use URL with <video> tag or streaming library
<video src={streamUrl} />
```

## Authentication

The service automatically includes Authorization headers if a token is stored:

```typescript
localStorage.setItem("authToken", token);
// Service will add: Authorization: Bearer {token}
```

## Caching Strategy (Future Enhancement)

Consider adding:
- React Query for automatic caching and synchronization
- WebSocket for real-time status updates
- Optimistic updates for mutations

## Testing

All API calls can be tested with mock data before backend is ready. Simply update the mock data to test different scenarios:

```typescript
const testCameras = [
  { id: 1, status: "online", ... },
  { id: 2, status: "offline", ... },
];

const { cameras } = useCameras(testCameras);
```

## Support

For additional endpoints or modifications, update:
1. `types/camera.ts` - Add new types
2. `services/cameraService.ts` - Add new methods
3. `hooks/useCameraAPI.ts` - Add new hooks if needed
