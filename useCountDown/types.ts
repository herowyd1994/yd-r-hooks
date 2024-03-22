/** @format */

export interface Props {
    time: number;
    reset?: boolean;
    delay?: number;
    formatTime?(time: number): number | string;
}
