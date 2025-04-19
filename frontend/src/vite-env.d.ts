/// <reference types="vite/client" />

declare module 'virtual:pwa-register' {
    export function registerSW(options?: { immediate?: boolean }): void;
}

export {};

declare global {
    /**
     * Event fired by Chrome/Edge when your PWA meets installability criteria.
     */
    interface BeforeInstallPromptEvent extends Event {
        /** Show the install prompt. */
        prompt(): Promise<void>;
        /** Outcome of the user’s choice. */
        userChoice: Promise<{
            outcome: 'accepted' | 'dismissed';
            platform: string;
        }>;
    }
}