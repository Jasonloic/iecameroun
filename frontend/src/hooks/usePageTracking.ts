import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const IGNORED = ['/login', '/404'];

export function usePageTracking() {
    const location = useLocation();

    useEffect(() => {
        const path = location.pathname + location.search;

        if (IGNORED.some(p => path.startsWith(p))) return;

        // Beacon — ne bloque pas le rendu, ne lève pas d'erreur visible
        const payload = JSON.stringify({
            path,
            referrer: document.referrer || null,
        });

        // sendBeacon si dispo (fiable même en cas de navigation rapide)
        if (navigator.sendBeacon) {
            const blob = new Blob([payload], { type: 'application/json' });
            navigator.sendBeacon('/api/track', blob);
        } else {
            fetch('/api/track', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: payload,
                keepalive: true,
            }).catch(() => {});
        }
    }, [location.pathname, location.search]);
}