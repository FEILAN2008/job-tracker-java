// src/App.tsx
import React, { useState, useEffect, JSX } from 'react';
import JobApplications from './pages/JobApplications';

// Extend the beforeinstallprompt event for TS
type BeforeInstallPromptEvent = Event & {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
};

export default function App(): JSX.Element {
    // store the beforeinstallprompt event
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    // whether we should show our own install button
    const [canInstall, setCanInstall] = useState(false);

    // 1) Capture the beforeinstallprompt event
    useEffect(() => {
        const handler = (e: Event) => {
            e.preventDefault();           // stop the default mini-infobar
            setDeferredPrompt(e as BeforeInstallPromptEvent);
            setCanInstall(true);          // allow our button to render
        };
        window.addEventListener('beforeinstallprompt', handler);
        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    // 2) If already running as PWA, never show the button
    useEffect(() => {
        // Desktop/chrome PWA detection
        if (window.matchMedia('(display-mode: standalone)').matches) {
            setCanInstall(false);
            setDeferredPrompt(null);
        }
        // iOS safari detection
        if ((window.navigator as any).standalone === true) {
            setCanInstall(false);
            setDeferredPrompt(null);
        }
    }, []);

    // 3) After the user actually installs it, hide the button
    useEffect(() => {
        const onInstalled = () => {
            setCanInstall(false);
            setDeferredPrompt(null);
        };
        window.addEventListener('appinstalled', onInstalled);
        return () => window.removeEventListener('appinstalled', onInstalled);
    }, []);

    // When our “Install App” button is clicked…
    const install = async () => {
        if (!deferredPrompt) return;
        await deferredPrompt.prompt();        // show browser prompt
        const choice = await deferredPrompt.userChoice;
        if (choice.outcome === 'accepted') {  // if accepted, hide button
            setCanInstall(false);
            setDeferredPrompt(null);
        }
    };

    return (
        <div className="container mt-4">
            {/* only show when install is actually possible */}
            {canInstall && (
                <button
                    className="btn-submit mb-3"
                    style={{ marginTop: '10px', borderRadius: '0.75rem', height: '2.5rem' }}
                    onClick={install}
                >
                    Install App
                </button>
            )}

            {/* your main app */}
            <JobApplications />
        </div>
    );
}
