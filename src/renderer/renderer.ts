import { DEFAULT_RENDERER_CONFIG } from "./consts";
import { drawChannel, getUnsafeContext } from "./utils";
import type {
    OptionalRenderConfig,
    RenderConfig,
    RenderFunctionType,
} from "./types";
import type { TimeRange } from "../types";

class Renderer {
    private canvas: HTMLCanvasElement;

    private context: CanvasRenderingContext2D;

    private data: Float32Array | number[];

    private audioDuration: number;

    private renderConfig: RenderConfig;

    private timeRange: TimeRange;

    private renderFunction: RenderFunctionType;

    constructor(
        element: HTMLCanvasElement,
        data: Float32Array | number[],
        audioDuration: number,
        renderConfig: OptionalRenderConfig,
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

    render() {
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

        const dataPointsPerBar = Math.ceil(
            numberOfDataPointsInRange / displayedBars
        );

        for (let i = 0; i < displayedBars; i++) {
            let value = -2;

            for (let j = 0; j < dataPointsPerBar; j++) {
                const dataPoint =
                    this.data[startingDataPoint + i * dataPointsPerBar + j];

                value = Math.max(value, dataPoint);
            }

            filteredData.push(value);
        }

        this.clear();
        this.renderFunction(
            filteredData,
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
