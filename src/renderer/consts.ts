import type { RenderConfig } from "./types";

const DEFAULT_RENDERER_CONFIG: Pick<RenderConfig, "barGap" | "barWidth"> = {
    barWidth: 2,
    barGap: 0,
};

export { DEFAULT_RENDERER_CONFIG };
