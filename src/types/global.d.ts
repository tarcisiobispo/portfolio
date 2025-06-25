// Extensão do objeto Window global
type GtagFunction = (command: string, action: string, params?: any) => void;

declare global {
  interface Window {
    isScrollingProgrammatically: boolean;
    gtag: GtagFunction;
    dataLayer: any[];
    google_tag_manager: any;
    clarity: (...args: any[]) => void;
  }
}

export type { GtagFunction };
export {};