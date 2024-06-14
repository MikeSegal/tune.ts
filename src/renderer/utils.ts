const drawChannel = (
    data: Float32Array | number[],
    context: CanvasRenderingContext2D
) => {};

const getUnsafeContext = (canvas: HTMLCanvasElement) => {
    return canvas.getContext("2d")!;
};

export { drawChannel, getUnsafeContext };
