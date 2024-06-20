import type { RenderConfig } from "./types";

const DEFAULT_RENDERER_CONFIG: Pick<
    RenderConfig,
    "barGap" | "barWidth" | "waveColor"
> = {
    barWidth: 2,
    barGap: 0,
    waveColor: "#1179ab",
};

export { DEFAULT_RENDERER_CONFIG };
