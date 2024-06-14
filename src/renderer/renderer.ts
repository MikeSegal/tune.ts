import { DEFAULT_RENDERER_CONFIG } from "./consts";
import { drawChannel, getUnsafeContext } from "./utils";
import type {
    OptionalRenderConfig,
    RenderConfig,
    RenderFunctionType,
} from "./types";

class Renderer {
    private element: HTMLCanvasElement;

    private context: CanvasRenderingContext2D;

    private data: Float32Array | number[];

    private renderConfig: RenderConfig;

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
        this.renderConfig = { ...renderConfig, ...DEFAULT_RENDERER_CONFIG };
        this.renderFunction = renderFunction ?? drawChannel;

        this.draw();
    }

    zoom(newAudioDuration: number) {
        const { audioDuration, windowWidth } = this.renderConfig;
        const displayedPercentage = (newAudioDuration / audioDuration) * 100;

        this.element.width = windowWidth * displayedPercentage;
    }

    draw() {
        this.renderFunction(this.data, this.context);
    }
}

export default Renderer;
