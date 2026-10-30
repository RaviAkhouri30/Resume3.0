/** A side project shown with a description and a live, auto-scrolling preview. */
export interface IPersonalProject {
    title: string;
    /** Short tag above the title, e.g. "Client website". */
    label: string;
    summary: string;
    highlights: string[];
    tech: string[];
    liveUrl: string;
    /** Address loaded in the preview frame; may differ from `liveUrl` (e.g. a same-origin path). */
    previewUrl: string;
    /** Host name shown in the preview's address bar. */
    displayUrl: string;
    repoUrl: string;
    /** Height in CSS pixels of the page area the preview pans through, at a 1280px-wide desktop layout. */
    previewHeight: number;
}
