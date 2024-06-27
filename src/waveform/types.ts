import { RenderConfig } from "../renderer/types";

type ChannelOptions = {
    data: Float32Array | number[];
    style?: CSSStyleObject;
    renderConfig?: RenderConfig;
};

type CSSStyleObject = Partial<CSSStyleDeclaration> &
    Record<string, string | null>;

export type { ChannelOptions };
