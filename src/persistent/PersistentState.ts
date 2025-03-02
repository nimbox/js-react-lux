export class PersistentState {

    private static instance: PersistentState;
    private cache: Record<string, unknown> = {};
    private readonly storageKey = '@nimbox/js-react-lux/state';
    private listeners: Record<string, Set<(value: unknown) => void>> = {};

    private constructor() {
        this.loadSettings();
        window.addEventListener('storage', this.handleStorageEvent);
    }

    public static getInstance(): PersistentState {

        if (!PersistentState.instance) {
            PersistentState.instance = new PersistentState();
        }

        return PersistentState.instance;

    }

    private loadSettings() {

        try {
            const stored = localStorage.getItem(this.storageKey);
            this.cache = stored ? JSON.parse(stored) : {};
        } catch (error) {
            console.error('Error loading component state', error);
            this.cache = {};
        }

    }

    private handleStorageEvent = (event: StorageEvent) => {

        if (event.key === this.storageKey && event.newValue) {

            const newSettings = JSON.parse(event.newValue);

            Object.keys(newSettings).forEach((key) => {
                if (this.cache[key] !== newSettings[key]) {
                    this.cache[key] = newSettings[key];
                    this.notifyListeners(key, newSettings[key]);
                }
            });

        }

    };

    private notifyListeners(key: string, value: unknown) {

        this.listeners[key]?.forEach((callback) => callback(value));

    }

    public get<T>(key: string, defaultValue: T): T {

        const value = this.cache[key];
        return value === undefined ? defaultValue : value as T;

    }

    public set<T>(key: string, value: T) {

        if (this.cache[key] === value) return;

        this.cache[key] = value;
        localStorage.setItem(this.storageKey, JSON.stringify(this.cache));
        this.notifyListeners(key, value);

    }

    public subscribe<T>(key: string, callback: (value: T) => void) {

        if (!this.listeners[key]) {
            this.listeners[key] = new Set<(value: unknown) => void>();
        }
        this.listeners[key].add(callback as (value: unknown) => void);

        return () => {
            this.listeners[key].delete(callback as (value: unknown) => void);
            if (this.listeners[key].size === 0) delete this.listeners[key];
        };

    }

}
