import { Img } from "./img.entity";

export const imgProviders = [
    {
        provide: 'IMG_REPOSITORY',
        useValue: Img,
    }
];