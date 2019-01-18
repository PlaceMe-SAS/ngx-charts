import { SimpleChanges, EventEmitter, OnChanges, TemplateRef } from '@angular/core';
export declare class BubbleSeriesComponent implements OnChanges {
    data: any;
    xScale: any;
    yScale: any;
    rScale: any;
    xScaleType: any;
    yScaleType: any;
    colors: any;
    visibleValue: any;
    activeEntries: any[];
    xAxisLabel: string;
    yAxisLabel: string;
    tooltipDisabled: boolean;
    tooltipTemplate: TemplateRef<any>;
    select: EventEmitter<{}>;
    activate: EventEmitter<{}>;
    deactivate: EventEmitter<{}>;
    areaPath: any;
    circles: any[];
    ngOnChanges(changes: SimpleChanges): void;
    update(): void;
    getCircles(): any[];
    getTooltipText(circle: any): string;
    onClick(value: any, label: any): void;
    isActive(entry: any): boolean;
    isVisible(circle: any): boolean;
    activateCircle(circle: any): void;
    deactivateCircle(circle: any): void;
    trackBy(index: any, circle: any): string;
}
