import { IPersonalProject } from "src/app/shared-module/interfaces/i-personal-project";

/**
 * Hobby projects built in spare time; worded as personal learning projects, not paid or client work.
 * Kept in code rather than Firestore because each entry is tied to the
 * site's Content-Security-Policy: a new preview origin must also be added to `frame-src`
 * in `src/staticwebapp.config.json`.
 */
export const PERSONAL_PROJECTS: IPersonalProject[] = [
    {
        title: 'Taal Yatra',
        label: 'Hobby project',
        summary: 'A weekend project that brings together two things I enjoy, music and frontend engineering: '
            + 'a website for a drum circle group in Pune, built for fun in my spare time as a playground for new ideas.',
        highlights: [
            'A chance to try out zoneless Angular 22, signals and a ports-and-adapters architecture.',
            'Content loads from Cloud Firestore, so pages update without a new release.',
            'Extras I wanted to try building: a playable rhythm game, a filterable video library and a photo gallery.',
            'An exercise in quality: WCAG 2.2 AA, a strict Content-Security-Policy, and tests with Vitest and Playwright.'
        ],
        tech: ['Angular 22', 'Signals', 'RxJS', 'Cloud Firestore', 'EmailJS', 'Bootstrap 5', 'Vitest', 'Playwright',
            'Azure Static Web Apps'],
        liveUrl: 'https://www.taalyatra.in/',
        previewUrl: 'https://www.taalyatra.in/',
        displayUrl: 'taalyatra.in',
        repoUrl: 'https://github.com/RaviAkhouri30/taalyatra',
        previewHeight: 3000
    },
    {
        title: 'Resume 3.0',
        label: 'Hobby project · this site',
        summary: 'The site you are reading, built and rebuilt in my spare time to experiment with modern Angular: '
            + 'every section loads from Cloud Firestore and renders through view models.',
        highlights: [
            'Standalone, zoneless Angular 22 with signals and an MVVM structure.',
            'A pluggable backend: a local JSON database in development, Cloud Firestore in production.',
            'Photo and résumé delivered by Cloudinary in modern image formats, sized per screen.',
            'A validated contact form with spam protection, deployed to Azure Static Web Apps by GitHub Actions.'
        ],
        tech: ['Angular 22', 'TypeScript', 'Signals', 'RxJS', 'Cloud Firestore', 'Cloudinary', 'EmailJS',
            'Angular Material', 'Azure Static Web Apps'],
        liveUrl: 'https://raviakhouri.in/',
        // Same-origin path, so the preview always shows the deployed version. The query string keeps the
        // address different from the page itself; browsers refuse to frame a page inside an identical one.
        previewUrl: '/?preview=1',
        displayUrl: 'raviakhouri.in',
        repoUrl: 'https://github.com/RaviAkhouri30/Resume3.0',
        previewHeight: 3200
    }
];
