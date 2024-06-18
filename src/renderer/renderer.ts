import { DEFAULT_RENDERER_CONFIG } from "./consts";
import { drawChannel, getUnsafeContext } from "./utils";
import type {
    OptionalRenderConfig,
    RenderConfig,
    RenderFunctionType,
} from "./types";
import type { TimeRange } from "../types";

class Renderer {
    private element: HTMLCanvasElement;

    private context: CanvasRenderingContext2D;

    private data: Float32Array | number[];

    private renderConfig: RenderConfig;

    private timeRange: TimeRange;

    private renderFunction: RenderFunctionType;

    constructor(
        element: HTMLCanvasElement,
        data: Float32Array | number[],
        renderConfig: OptionalRenderConfig,
        renderFunction?: RenderFunctionType
    ) {
        this.element = element;
        this.context = getUnsafeContext(this.element);
        this.data = data;
        this.renderConfig = { ...DEFAULT_RENDERER_CONFIG, ...renderConfig };
        this.timeRange = { start: 0, end: renderConfig.audioDuration };
        this.renderFunction = renderFunction ?? drawChannel;

        this.render();
    }

    zoom(newAudioDuration: number) {
        const { audioDuration, windowWidth } = this.renderConfig;
        const newCanvasWidth = windowWidth * (audioDuration / newAudioDuration);

        this.element.width = newCanvasWidth;
    }

    setRange(start: number, end: number) {
        this.timeRange = { start, end };
        this.render();
    }

    render() {
        this.element.innerHTML = "";

        const { audioDuration, barGap, barWidth } = this.renderConfig;
        const { start, end } = this.timeRange;

        // TODO: figure out if there is a better way to calculate the total number of displayed samples
        const newElementWidth =
            this.element.width * (audioDuration / (end - start));

        const samples = newElementWidth / (barWidth + barGap);
        const dataPerSample = this.data.length / samples;

        const startSample = Math.floor(samples * (start / audioDuration));
        const endSample = Math.floor(samples * (end / audioDuration));

        const filteredData: number[] = [];

        for (let i = startSample; i <= endSample; i++) {
            let maxDataPoint = -2;

            for (let j = 0; j < dataPerSample; j++) {
                // TODO: verify this
                // * Going over all of the possible data points for that specific bar, and choosing the tallest
                const sample = this.data[i * dataPerSample + j];
                maxDataPoint = Math.max(maxDataPoint, sample);
            }

            filteredData.push(maxDataPoint);
        }

        this.renderFunction(filteredData, this.context);
    }
}

export default Renderer;
