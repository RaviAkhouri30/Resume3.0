/** Which `IHttpBackend` implementation the app should use. */
export type BackendKind = 'fake' | 'firebase';

export interface IEnvironment {
    production: boolean;
    backend: BackendKind;
    baseUrl: string;
    /** Non-secret Firebase settings; the API key is injected at deploy time. */
    firebase: {
        authDomain: string;
        projectId: string;
        storageBucket: string;
        messagingSenderId: string;
        appId: string;
        measurementId: string;
    };
    emailJs: {
        serviceId: string;
        templateId: string;
        publicKey: string;
    };
    /** Cloudinary delivery settings; an empty `cloudName` falls back to local assets. */
    media: {
        cloudName: string;
        profilePhotoId: string;
        resumeId: string;
    };
}
