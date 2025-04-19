// src/hooks/useInstallPrompt.ts
import { useEffect, useState } from 'react';

/**
 * Custom hook to capture the `beforeinstallprompt` event
 * and expose a method to trigger the native install dialog.
 */
export function useInstallPrompt() {
    // Holds the deferred `beforeinstallprompt` event
    const [promptEvent, setPromptEvent] = useState<BeforeInstallPromptEvent | null>(null);

    useEffect(() => {
        const handler = (e: any) => {
            // Prevent the default mini-infobar from appearing on mobile
            e.preventDefault();
            // Save the event for later use
            setPromptEvent(e);
        };

        window.addEventListener('beforeinstallprompt', handler);
        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    /**
     * Call this function (e.g. on button click) to show
     * the browser’s install prompt.
     */
    const install = async () => {
        if (!promptEvent) return;
        // Show the install prompt
        promptEvent.prompt();
        // Wait for the user to respond
        const choice = await promptEvent.userChoice;
        console.log('User choice outcome:', choice.outcome);
        // Clear the saved event; user can be prompted again later
        setPromptEvent(null);
    };

    return {
        canInstall: Boolean(promptEvent),
        install,
    };
}
