/**
 * @description Component Model of Generic Type, Always expect a type when Implementing.
 */
export declare interface ComponentModel<T> {
    getData: () => T;
    fetchData: () => void;
}
