import { RenderConfig } from "./types";

const drawChannel = (
    data: Float32Array | number[],
    height: number,
    context: CanvasRenderingContext2D,
    renderConfig: RenderConfig
) => {
    const { barGap, barWidth, waveColor } = renderConfig;

    context.fillStyle = waveColor;

    for (let i = 0; i < data.length; i++) {
        const x = i * (barGap + barWidth);
        const y = height;
        const barHeight = height - data[i];

        context.fillRect(x, y, barWidth, barHeight);
    }
};

const getUnsafeContext = (canvas: HTMLCanvasElement) => {
    return canvas.getContext("2d")!;
};

export { drawChannel, getUnsafeContext };
