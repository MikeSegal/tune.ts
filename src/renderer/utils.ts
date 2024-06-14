// TODO: add a default render function
const drawChannel = () => {};

const getUnsafeContext = (canvas: HTMLCanvasElement) => {
    return canvas.getContext("2d")!;
};

export { drawChannel, getUnsafeContext };
