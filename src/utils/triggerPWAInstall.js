// utils/triggerPWAInstall.js

let deferredPrompt = null;

if (typeof window !== 'undefined') {
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
    });
}

export async function triggerPWAInstall() {
    if (!deferredPrompt) return false;

    try {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === 'accepted') {
            localStorage.setItem('pwa-installed', 'true');
            deferredPrompt = null;
            return true;
        } else {
            localStorage.setItem('pwa-install-dismissed', 'true');
            return false;
        }
    } catch (error) {
        console.error('PWA install error:', error);
        return false;
    }
}
