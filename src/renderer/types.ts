import { Optional } from "../types";

type RenderFunctionType = (
    data: Float32Array | number[],
    context: CanvasRenderingContext2D
) => void;

type RenderConfig = {
    audioDuration: number;
    windowWidth: number;
    barGap: number;
    barWidth: number;
};

type OptionalRenderConfig = Optional<RenderConfig, "barGap" | "barWidth">;

export type { RenderFunctionType, RenderConfig, OptionalRenderConfig };
