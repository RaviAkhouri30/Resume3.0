import { IEnvironment } from "src/environments/i-environment";

export type MediaConfig = IEnvironment['media'];

/** Alternative format offered through `<picture><source>`. */
export interface IImageSource {
    srcset: string;
    type: string;
}

/** Everything a `<picture>` needs to render a responsive image. */
export interface IResponsiveImage {
    sources: IImageSource[];
    src: string;
    srcset: string;
}

/** A file offered for download. */
export interface IDownloadLink {
    url: string;
    fileName: string;
}

const CLOUDINARY_BASE = 'https://res.cloudinary.com';
const RESUME_FILE_NAME = 'Ravi_Akhouri_Resume';

/**
 * Profile photo sized for a `displayWidth` CSS-pixel slot at 1x and 2x density.
 * Cloudinary picks the best format per browser (`f_auto`) and crops around the face.
 */
export function profilePhoto(media: MediaConfig, displayWidth: number): IResponsiveImage {
    if (!media.cloudName) {
        return {
            sources: [{ srcset: 'assets/profile.avif', type: 'image/avif' }],
            src: 'assets/profile.jpg',
            srcset: ''
        };
    }

    const url = (width: number) =>
        `${CLOUDINARY_BASE}/${media.cloudName}/image/upload/f_auto,q_auto,c_fill,g_face,ar_1:1,w_${width}/${media.profilePhotoId}`;

    return {
        sources: [],
        src: url(displayWidth * 2),
        srcset: `${url(displayWidth)} 1x, ${url(displayWidth * 2)} 2x`
    };
}

/**
 * Resume PDF. Cloud-hosted files are cross-origin, where browsers ignore the `download`
 * attribute, so Cloudinary's `fl_attachment` flag sets the download file name instead.
 */
export function resumeDownload(media: MediaConfig): IDownloadLink {
    const fileName = `${RESUME_FILE_NAME}.pdf`;

    if (!media.cloudName) {
        return { url: `assets/${fileName}`, fileName };
    }

    return {
        url: `${CLOUDINARY_BASE}/${media.cloudName}/image/upload/fl_attachment:${RESUME_FILE_NAME}/${media.resumeId}.pdf`,
        fileName
    };
}
