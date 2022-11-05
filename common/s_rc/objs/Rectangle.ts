
export default class Rectangle {

    public x: number | undefined = 0;
    public y: number | undefined = 0;
    public width: number | undefined = 0;
    public height: number | undefined = 0;
    public rotated: boolean | undefined = false;

    public get top() : number { return this.y; }
    public get left() : number { return this.x; }
    public get right() : number { return this.x + this.width; }
    public get bottom() : number { return this.y + this.height; }

    isEmpty: boolean = false;

    public static get Empty() : Rectangle { return { isEmpty: true } as Rectangle; }

    public Normalize(rect: Rectangle) : void {
        rect.x = rect.x || 0;
        rect.y = rect.y || 0;
        rect.width = rect.width || 0;
        rect.height = rect.height || 0;
        rect.rotated = !!rect.rotated;
    }

    public Intersects(rect: Rectangle) : boolean {
        return !(
            this.x > rect.right  ||
            this.right < rect.x  ||
            this.y > rect.bottom ||
            this.bottom < rect.y
        );
    }

    public Contains(rect: Rectangle) : boolean {
        return (
            rect.x >= this.x &&
            rect.y >= this.y &&
            rect.right  <= this.right &&
            rect.bottom <= this.bottom
        );
    }

    public static Create(x: number, y: number, width: number, height: number, rotate: boolean) : Rectangle {
        return {
            x: x,
            y: y,
            width: width,
            height: height,
            rotated: !!rotate,
        } as Rectangle;
    }

    public static Copy(rect: Rectangle) : Rectangle {
        return {
            x: rect.x,
            y: rect.y,
            width: rect.width,
            height: rect.height,
            rotated: !!rect.rotated,
        } as Rectangle;
    }
}
