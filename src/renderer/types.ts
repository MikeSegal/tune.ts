import type { Optional } from "../types";

type RenderFunctionType = (
    data: Float32Array | number[],
    canvasHeight: number,
    context: CanvasRenderingContext2D,
    renderConfig: RenderConfig
) => void;

type RenderConfig = {
    barGap: number;
    barWidth: number;
    waveColor: string;
};

type OptionalRenderConfig = Optional<RenderConfig, "barGap" | "barWidth">;

export type { RenderFunctionType, RenderConfig, OptionalRenderConfig };
