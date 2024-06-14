import { RenderFunctionType } from "./types";
import { drawChannel, getUnsafeContext } from "./utils";

class Renderer {
    private element: HTMLCanvasElement;

    private context: CanvasRenderingContext2D;

    private data: Float32Array | number[];

    private renderFunction: RenderFunctionType;

    constructor(
        element: HTMLCanvasElement,
        data: Float32Array | number[],
        renderFunction?: RenderFunctionType
    ) {
        this.element = element;
        this.context = getUnsafeContext(this.element);
        this.data = data;
        this.renderFunction = renderFunction ?? drawChannel;
    }

    draw() {
        this.renderFunction(this.data, this.context);
    }

    // TODO: Get a start and end time value, and resize the canvas element accordingly
    zoom() {}
}

export default Renderer;
