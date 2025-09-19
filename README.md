# next-device-context

A react Context + Hook utility for comprehensive client device information including screen size, OS, browser, theme preferences, and more.

## Features

- 📱 **Device Detection**: Mobile, tablet, and desktop breakpoints
- 🖥️ **Screen Information**: Viewport dimensions, pixel ratio, touch support
- 🌐 **Browser & OS Detection**: Automatic detection of browser and operating system
- 🎨 **Theme Detection**: Light/dark mode preference detection
- 🌍 **Localization**: Language and timezone information
- 📡 **Network Status**: Online/offline detection
- ⚡ **Real-time Updates**: Automatic updates on window resize, theme changes, and network status changes
- 🔧 **TypeScript Support**: Full TypeScript definitions included

## Installation

```bash
npm install next-device-context
```

## Quick Start

### 1. Wrap your app/layout with DeviceProvider

```tsx
import React from "react";
import { DeviceProvider } from "next-device-context";

function App() {
  return (
    <DeviceProvider>
      <YourApp />
    </DeviceProvider>
  );
}
```

### 2. Use the useDevice hook

```tsx
import React from "react";
import { useDevice } from "next-device-context";

function MyComponent() {
  const device = useDevice();

  return (
    <div>
      <h1>Device Information</h1>
      <p>
        Screen: {device.viewWidth} x {device.viewHeight}
      </p>
      <p>
        Device:{" "}
        {device.isMobile ? "Mobile" : device.isTablet ? "Tablet" : "Desktop"}
      </p>
      <p>OS: {device.os}</p>
      <p>Browser: {device.browser}</p>
      <p>Theme: {device.theme}</p>
    </div>
  );
}
```

## API Reference

### DeviceProvider

A Next Context Provider that wraps your app and provides device information to all child components.

**Props:**

- `children: ReactNode` - Your app components

### useDevice

A React hook that returns the current device information.

**Returns:** `DeviceContextType`

### DeviceContextType

The device information object containing the following properties:

| Property        | Type                | Description                                                     |
| --------------- | ------------------- | --------------------------------------------------------------- |
| `isMobile`      | `boolean`           | `true` if viewport width < 768px                                |
| `isTablet`      | `boolean`           | `true` if viewport width >= 768px and < 1024px                  |
| `isDesktop`     | `boolean`           | `true` if viewport width >= 1024px                              |
| `viewWidth`     | `number`            | Current viewport width in pixels                                |
| `viewHeight`    | `number`            | Current viewport height in pixels                               |
| `pixelRatio`    | `number`            | Device pixel ratio                                              |
| `isTouchDevice` | `boolean`           | `true` if device supports touch input                           |
| `theme`         | `"light" \| "dark"` | User's preferred color scheme                                   |
| `os`            | `string`            | Operating system (Windows, MacOS, Android, iOS, Linux, unknown) |
| `browser`       | `string`            | Browser name (Chrome, Safari, Firefox, Edge, unknown)           |
| `userAgent`     | `string`            | Full user agent string                                          |
| `language`      | `string`            | Browser language (e.g., "en-US")                                |
| `timezone`      | `string`            | User's timezone (e.g., "America/New_York")                      |
| `isOnline`      | `boolean`           | Network connection status                                       |

## Examples

### Responsive Design

```tsx
import { useDevice } from "next-device-context";

function ResponsiveComponent() {
  const { isMobile, isTablet, isDesktop } = useDevice();

  if (isMobile) {
    return <MobileLayout />;
  }

  if (isTablet) {
    return <TabletLayout />;
  }

  return <DesktopLayout />;
}
```

### Theme-aware Styling

```tsx
import { useDevice } from "next-device-context";

function ThemedComponent() {
  const { theme } = useDevice();

  return (
    <div className={theme === "dark" ? "dark-theme" : "light-theme"}>
      <h1>Hello World</h1>
    </div>
  );
}
```

### Browser-specific Features

```tsx
import { useDevice } from "next-device-context";

function BrowserSpecificComponent() {
  const { browser, isTouchDevice } = useDevice();

  return (
    <div>
      {browser === "Safari" && <SafariSpecificFeature />}
      {isTouchDevice && <TouchGestures />}
    </div>
  );
}
```

### Network Status

```tsx
import { useDevice } from "next-device-context";

function NetworkStatus() {
  const { isOnline } = useDevice();

  return (
    <div className={isOnline ? "online" : "offline"}>
      {isOnline ? "Connected" : "Offline"}
    </div>
  );
}
```

## TypeScript Support

This package includes full TypeScript definitions. The `DeviceContextType` interface is exported for your convenience:

```tsx
import { DeviceContextType } from "next-device-context";

function MyComponent() {
  const device: DeviceContextType = useDevice();
  // TypeScript will provide full autocomplete and type checking
}
```

## Requirements

- React >= 17
- React DOM >= 17

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Changelog

### 1.0.0

- Initial release
- Device detection (mobile, tablet, desktop)
- Screen information (dimensions, pixel ratio, touch support)
- Browser and OS detection
- Theme preference detection
- Language and timezone information
- Network status detection
- Real-time updates on window resize and theme changes
