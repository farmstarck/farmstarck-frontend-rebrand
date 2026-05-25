import { useState, useEffect } from "react";
import Link from "next/link";

type ConsentState = {
  essential: true; // always true, can't be turned off
  analytics: boolean;
  marketing: boolean;
};

const COOKIE_KEY = "farmstarck_cookie_consent";

export const useCookieConsent = () => {
  const [consent, setConsent] = useState<ConsentState | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_KEY);
    if (stored) {
      try {
        setConsent(JSON.parse(stored));
      } catch {
        setConsent(null);
      }
    }
  }, []);

  const saveConsent = (state: ConsentState) => {
    localStorage.setItem(COOKIE_KEY, JSON.stringify(state));
    setConsent(state);
  };

  const acceptAll = () =>
    saveConsent({ essential: true, analytics: true, marketing: true });

  const rejectAll = () =>
    saveConsent({ essential: true, analytics: false, marketing: false });

  const hasConsented = consent !== null;

  return { consent, hasConsented, acceptAll, rejectAll, saveConsent };
};

const CookieBanner = () => {
  const { hasConsented, acceptAll, rejectAll } = useCookieConsent();
  const [showDetails, setShowDetails] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(!hasConsented), 800);
    return () => clearTimeout(t);
  }, [hasConsented]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-5 left-4 right-4 md:left-auto md:right-6 md:max-w-lg z-[9999]">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Top accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-primary via-green-400 to-primary" />

        <div className="p-5">
          {/* Header */}
          <div className="flex items-center gap-2.5 mb-3">
            <span className="text-xl">🍪</span>
            <p className="font-bold text-gray-900 text-base">
              Your privacy matters
            </p>
          </div>

          {/* Body text */}
          <p className="text-sm text-gray-700 leading-relaxed mb-1">
            We use{" "}
            <span className="font-semibold text-gray-700">
              essential cookies
            </span>{" "}
            to keep the marketplace running — things like your cart, login
            session, and checkout. With your permission, we also use{" "}
            <span className="font-semibold text-gray-700">
              analytics cookies
            </span>{" "}
            to understand how shoppers use Farmstarck so we can improve it.
          </p>

          <p className="text-xs text-gray-600 mb-4">
            You can change your preference at any time.{" "}
            <Link
              href="/legal/cookie-policy"
              className="text-primary underline underline-offset-2 hover:no-underline"
            >
              Read our cookie policy →
            </Link>
          </p>

          {/* Details panel */}
          {showDetails && (
            <div className="mb-4 rounded-xl border border-gray-100 bg-gray-50 divide-y divide-gray-100">
              <div className="flex items-start justify-between gap-3 p-3">
                <div>
                  <p className="text-xs font-bold text-gray-700">
                    Essential cookies
                  </p>
                  <p className="text-[12px] text-gray-700 mt-0.5">
                    Login sessions, cart, checkout security. Cannot be disabled.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full shrink-0 mt-0.5">
                  Always on
                </span>
              </div>
              <div className="flex items-start justify-between gap-3 p-3">
                <div>
                  <p className="text-xs font-bold text-gray-700">
                    Analytics cookies
                  </p>
                  <p className="text-[12px] text-gray-700 mt-0.5">
                    Helps us see which pages and products are most visited so we
                    can improve your shopping experience.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-gray-600 bg-gray-200 px-2 py-0.5 rounded-full shrink-0 mt-0.5">
                  Optional
                </span>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={() => {
                rejectAll();
                setVisible(false);
              }}
              className="flex-1 py-2.5 px-4 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Essential only
            </button>
            <button
              onClick={() => setShowDetails((p) => !p)}
              className="flex-1 py-2.5 px-4 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              {showDetails ? "Hide details" : "Manage cookies"}
            </button>
            <button
              onClick={() => {
                acceptAll();
                setVisible(false);
              }}
              className="flex-1 py-2.5 px-4 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors cursor-pointer"
            >
              Accept all
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
