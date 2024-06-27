import Renderer from "../renderer";
import type { ChannelOptions } from "./types";

class Waveform {
    private container: HTMLDivElement;

    private audioDuration: number;

    private channelOptions: ChannelOptions[];

    private renderers: Renderer[];

    private canvasesContainer: HTMLDivElement;

    constructor(
        container: HTMLDivElement,
        audioDuration: number,
        channelOptions: ChannelOptions[]
    ) {
        this.container = container;
        this.audioDuration = audioDuration;
        this.channelOptions = channelOptions;
        this.canvasesContainer = document.createElement("div");
        this.renderers = [];

        this.initRenderers();
    }

    private initRenderers() {
        const { height, width } = this.container.getBoundingClientRect();

        this.channelOptions.forEach((channel) => {
            const canvas = document.createElement("canvas");
            canvas.id = `${channel}`;
            canvas.height = height;
            canvas.width = width;

            if (channel.style) {
                for (const property in channel.style) {
                    // TODO: Fix this TS error
                    // @ts-expect-error The style object has unusual behavior, this work but TS does not like it
                    canvas.style[property] = channel.style[property];
                }
            }

            this.canvasesContainer.appendChild(canvas);

            const newRenderer = new Renderer(
                canvas,
                channel.data,
                this.audioDuration,
                channel.renderConfig
            );

            this.renderers.push(newRenderer);
        });

        this.container.appendChild(this.canvasesContainer);
    }

    setRange(start: number, end: number) {
        this.renderers.forEach((renderer) => renderer.setRange(start, end));
    }

    destroy() {
        this.renderers.forEach((renderer) => renderer.destroy());
        this.canvasesContainer.remove();
    }
}

export default Waveform;
