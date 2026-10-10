# One installable PWA for both audiences, not native apps

The product is a single Progressive Web App over one backend, serving staff (mainly on phones) and the Administrator (mainly on desktop, but fully usable on a phone mid-service). We chose it over native apps to avoid app-store review and per-device distribution, and because **updates take effect immediately**: with sideloaded native apps, a staff member on an old build could be paid or scored under rules that have since changed.

## Consequences

- Every function is reachable on both phone and desktop, and dense surfaces such as the weekly calendar get a designed mobile layout, not a squeezed desktop one (NFR-5, Phase 1).
- Notifications (Phase 2) use Web Push with an in-app inbox as a fallback. On iOS, push only works for an app added to the Home Screen, so installing it is part of onboarding.
- Native apps stay a future option, most likely triggered by the time clock's camera and background needs. They'd be distributed through Apple Business Manager, not an enterprise certificate.
