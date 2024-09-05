export interface Draggable {
    dragStartHandler(event: DragEvent): void;
    dragEndHandler(event: DragEvent): void;
}

export interface Touchable {
    toushStartHandler(event: TouchEvent): void;
    toushEndHandler(event: TouchEvent): void;
}

export interface DragTarget {
    dragOverHandler(event: DragEvent): void;
    dragHandler(event: DragEvent): void;
    dragLeaveHandler(event: DragEvent): void;
}

export interface TouchTarget {
    touchOverHandler(event: TouchEvent): void;
    touchHandler(event: TouchEvent): void;
    touchLeaveHandler(event: TouchEvent): void;
}