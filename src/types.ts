type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

type TimeRange = {
    start: number;
    end: number;
};

export type { Optional, TimeRange };
