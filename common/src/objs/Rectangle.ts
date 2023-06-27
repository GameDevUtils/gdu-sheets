
export default class Rectangle {

    public x: number = 0;
    public y: number = 0;
    public width: number = 0;
    public height: number = 0;
    public rotated: boolean = false;

    public get top() : number { return this.y; }
    public get left() : number { return this.x; }
    public get right() : number { return this.x + this.width; }
    public get bottom() : number { return this.y + this.height; }
    public get isEmpty(): boolean { return this.width <= 0 || this.height <= 0; }
    public get area(): number { return this.width * this.height; }

    public static get Empty() : Rectangle {
        return new Rectangle();
    }

    public Intersects(rect: Rectangle): boolean {
        // console.log(`
        //     ${this.x} > ${rect.right} - t.x > r.right
        //     ${this.right} < ${rect.x} - t.right < r.x
        //     ${this.y} > ${rect.bottom} - t.y > r.bottom
        //     ${this.bottom} < ${rect.y} - t.bottom < r.y
        // `);
        return (
            this.ContainsPoint(rect.x, rect.y) ||
            this.ContainsPoint(rect.x, rect.y + rect.height - 1) ||
            this.ContainsPoint(rect.x + rect.width -1, rect.y) ||
            this.ContainsPoint(rect.x + rect.width - 1, rect.y + rect.height - 1)
        );
    }

    public Contains(rect: Rectangle) : boolean {
        return (
            this.x <= rect.x &&
            this.y <= rect.y &&
            this.right >= rect.right &&
            this.bottom >= rect.bottom
        );
    }

    public ContainsPoint(x: number, y: number): boolean {
        const rect = Rectangle.Create(x, y, 1, 1);
        return this.Contains(rect);
        // return (
        //     this.x <= rect.x &&
        //     this.y <= rect.y &&
        //     this.right >= rect.right &&
        //     this.bottom >= rect.bottom
        // );
    }

    public ContainedIn(rect: Rectangle) : boolean {
        return (
            rect.x >= this.x &&
            rect.y >= this.y &&
            rect.right  <= this.right &&
            rect.bottom <= this.bottom
        );
    }

    public static Inflate(rect: Rectangle, padding: number) : Rectangle {
        const result = Rectangle.Copy(rect);
        result.x -= padding;
        result.y -= padding;
        result.width += 2 * padding;
        result.height += 2 * padding;
        return result;
    }

    public static Create(x: number, y: number, width: number, height: number, rotated?: boolean) : Rectangle {
        return (Object.assign(new Rectangle(),{
            x: x,
            y: y,
            width: width,
            height: height,
            rotated: !!rotated,
        }) as Rectangle); //.Normalize();
    }

    public static Copy(rect: Rectangle) : Rectangle {
        return (Object.assign(new Rectangle(),{
            x: rect.x,
            y: rect.y,
            width: rect.width,
            height: rect.height,
            rotated: rect.rotated,
        }) as Rectangle); //.Normalize();
    }

}
