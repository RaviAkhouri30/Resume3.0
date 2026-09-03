import { ITimeline } from "../interfaces/i-timeline";

export function mapToTimelineItems<T>(
    items: T[] | undefined,
    transformFn: (item: T) => ITimeline
): ITimeline[] {
    return (items ?? []).map(transformFn);
}
