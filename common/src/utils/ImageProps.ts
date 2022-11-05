// import {ImageFrame} from './ImageFrame';

export class ImageProps {
    width: number = 0;
    height: number = 0;
    frames: any[] = [];
    gamma: number = 0;
    isValid: boolean = false;

    static get EMPTY_IMAGE_PROPS() : ImageProps
    {
        return {
            width: 0,
            height: 0,
            frames: [],
            gamma: 0,
            isValid: false,
        } as ImageProps;
    }
}
