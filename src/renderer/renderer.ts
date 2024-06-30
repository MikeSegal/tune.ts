import { DEFAULT_RENDERER_CONFIG } from "./consts";
import { drawChannel, getUnsafeContext } from "./utils";
import type { RenderConfig, RenderFunctionType } from "./types";
import type { TimeRange } from "../types";

class Renderer {
    private canvas: HTMLCanvasElement;

    private context: CanvasRenderingContext2D;

    private data: Float32Array | number[];

    private audioDuration: number;

    private renderConfig: RenderConfig;

    private timeRange: TimeRange;

    private renderFunction: RenderFunctionType;

    private dataCache: Map<number, number> = new Map();

    constructor(
        element: HTMLCanvasElement,
        data: Float32Array | number[],
        audioDuration: number,
        renderConfig?: RenderConfig,
        renderFunction?: RenderFunctionType
    ) {
        this.canvas = element;
        this.context = getUnsafeContext(this.canvas);
        this.data = data;
        this.audioDuration = audioDuration;
        this.renderConfig = {
            ...DEFAULT_RENDERER_CONFIG,
            ...renderConfig,
        };
        this.timeRange = { start: 0, end: audioDuration };

        this.renderFunction = renderFunction ?? drawChannel;
        this.render();
    }

    setRange(start: number, end: number) {
        this.timeRange = { start, end };
        this.render();
    }

    setWidth(width: number) {
        this.canvas.width = width;
        this.render();
    }

    setHeight(height: number) {
        this.canvas.height = height;
        this.render();
    }

    calculate() {
        const filteredData: number[] = [];
        const { barGap, barWidth } = this.renderConfig;
        const { start, end } = this.timeRange;

        const currentRange = end - start;

        const sampleRate = Math.ceil(this.data.length / this.audioDuration);
        const startingDataPoint = Math.ceil(sampleRate * start);
        const numberOfDataPointsInRange = Math.ceil(sampleRate * currentRange);

        const displayedBars = Math.ceil(
            this.canvas.width / (barWidth + barGap)
        );

        const virtualBarCount = Math.ceil(
            displayedBars * (this.audioDuration / currentRange)
        );

        const startVirtualBar =
            virtualBarCount * (startingDataPoint / this.data.length);

        const dataPointsPerBar = Math.ceil(
            numberOfDataPointsInRange / displayedBars
        );

        for (let i = 0; i < displayedBars; i++) {
            let value = -2;
            const cacheKey = startVirtualBar + i;

            if (this.dataCache.has(cacheKey)) {
                filteredData.push(this.dataCache.get(cacheKey)!);
            } else {
                for (let j = 0; j < dataPointsPerBar; j++) {
                    const dataPoint =
                        this.data[startingDataPoint + i * dataPointsPerBar + j];

                    value = Math.max(value, dataPoint);
                }

                this.dataCache.set(cacheKey, value);
                filteredData.push(value);
            }
        }

        this.data = filteredData;
    }

    destroy() {
        this.canvas.remove();
    }

    private render() {
        this.calculate();
        this.clear();
        this.renderFunction(
            this.data,
            this.canvas.height,
            this.context,
            this.renderConfig
        );
    }

    private clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

export default Renderer;
