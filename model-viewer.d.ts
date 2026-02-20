declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": Record<string, unknown> & {
        src?: string;
        alt?: string;
        "auto-rotate"?: boolean;
        "auto-rotate-delay"?: string;
        "rotation-per-second"?: string;
        "camera-controls"?: boolean;
        "disable-zoom"?: boolean;
        exposure?: string;
        "shadow-intensity"?: string;
      };
    }
  }
}

export {};
