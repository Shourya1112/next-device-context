import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export interface DeviceContextType {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  viewWidth: number;
  viewHeight: number;
  pixelRatio: number;
  isTouchDevice: boolean;
  theme: "light" | "dark";
  os: string;
  browser: string;
  userAgent: string;
  language: string;
  timezone: string;
  isOnline: boolean;
}

const DeviceContext = createContext<DeviceContextType | undefined>(undefined);

export const DeviceProvider = ({ children }: { children: ReactNode }) => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceContextType>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    viewWidth: 0,
    viewHeight: 0,
    pixelRatio: 1,
    isTouchDevice: false,
    theme: "light",
    os: "unknown",
    browser: "unknown",
    userAgent: "",
    language: "en",
    timezone: "UTC",
    isOnline: true,
  });

  const detectDevice = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const userAgent = navigator.userAgent;
    const pixelRatio = window.devicePixelRatio || 1;
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;

    // device breakpoints
    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1024;
    const isDesktop = width >= 1024;

    // OS detection
    let os = "unknown";
    if (/Windows/i.test(userAgent)) os = "Windows";
    else if (/Mac OS/i.test(userAgent)) os = "MacOS";
    else if (/Android/i.test(userAgent)) os = "Android";
    else if (/iPhone|iPad|iPod/i.test(userAgent)) os = "iOS";
    else if (/Linux/i.test(userAgent)) os = "Linux";

    // Browser detection
    let browser = "unknown";
    if (/Chrome/i.test(userAgent) && !/Edge|Edg/i.test(userAgent))
      browser = "Chrome";
    else if (/Safari/i.test(userAgent) && !/Chrome/i.test(userAgent))
      browser = "Safari";
    else if (/Firefox/i.test(userAgent)) browser = "Firefox";
    else if (/Edg/i.test(userAgent)) browser = "Edge";

    // theme preference
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";

    // language & timezone
    const language = navigator.language || "en";
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    setDeviceInfo({
      isMobile,
      isTablet,
      isDesktop,
      viewWidth: width,
      viewHeight: height,
      pixelRatio,
      isTouchDevice,
      theme: prefersDark,
      os,
      browser,
      userAgent,
      language,
      timezone,
      isOnline: navigator.onLine,
    });
  };

  useEffect(() => {
    detectDevice();

    window.addEventListener("resize", detectDevice);
    window.addEventListener("online", detectDevice);
    window.addEventListener("offline", detectDevice);

    // theme change listener
    const darkModeListener = window.matchMedia("(prefers-color-scheme: dark)");
    darkModeListener.addEventListener("change", detectDevice);

    return () => {
      window.removeEventListener("resize", detectDevice);
      window.removeEventListener("online", detectDevice);
      window.removeEventListener("offline", detectDevice);
      darkModeListener.removeEventListener("change", detectDevice);
    };
  }, []);

  return (
    <DeviceContext.Provider value={deviceInfo}>
      {children}
    </DeviceContext.Provider>
  );
};

export const useDevice = () => {
  const context = useContext(DeviceContext);
  if (!context) {
    throw new Error("useDevice must be used within a DeviceProvider");
  }
  return context;
};
