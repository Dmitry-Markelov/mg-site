import { Point, Polygon, Edge, Figure } from "../entities";
class Toroid extends Figure {
    constructor(R = 12, r = 7, count = 25, color = '#aaaaaaff') {
        super();
        //points
        const points = [];
        for(let i = 0; i <= count + 1; i++) { //кольца
            const T = 2 * Math.PI * i / count;
            for(let j = 0; j < count; j++) {
                const p = 2 * Math.PI * j / count;
                points.push(new Point(
                    (R + r * Math.cos(T)) * Math.cos(p),
                    (R + r * Math.cos(T)) * Math.sin(p),
                    r * Math.sin(T)
                ));
            }
        }
        //edges
        const edges = [];
        for(let i = 0; i < points.length; i++) {
            if (points[i + 1]) {
                if ((i + 1) % count === 0) {
                    edges.push(new Edge(i, i + 1 - count));
                } else {
                    edges.push(new Edge(i, i + 1));
                }
            }
            if (points[i + count]) {
                edges.push(new Edge(i, i + count));
            }
        }
        //polygons
        const polygons = [];


        const colors = [
            Polygon.prototype.rgbaToHex(255, 0, 0, 1),
            Polygon.prototype.rgbaToHex(255, 165, 0, 1),
            Polygon.prototype.rgbaToHex(255, 255, 0, 1),
            Polygon.prototype.rgbaToHex(0, 255, 0, 1),
            Polygon.prototype.rgbaToHex(0, 255, 255, 1),
            Polygon.prototype.rgbaToHex(0, 0, 255, 1),
            Polygon.prototype.rgbaToHex(105, 0, 198, 1)
        ]


        let k = 0;
        let selectColor = colors[0];


        for (let i = 0; i < points.length; i++) {
            if (i%count == 0) {
                k = 0
            } else {
                selectColor = colors[k];
                if(k == 6) {
                    k = 0;
                } else k++;
            }
            if (i + 1 + count < points.length && (i + 1) % count !== 0) {
                polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], selectColor));
            } else if (i + count < points.length && (i + 1) % count === 0) {
                polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], selectColor))
            }
        }
        for (let i = 0; i < polygons.length; i++) {
            if(i%count == 0) {
                let lastColor = Polygon.prototype.hexToRgba(colors[k])
                polygons[i].color = lastColor;
            }
        }


        // for(let i = 0; i < polygons.length * 0.2; i++) {
        //     polygons[i].isLit = true;
        //     if (i % 2) {
        //         polygons[i].color = Polygon.prototype.hexToRgba('#ffffffff')
        //     }
        // }

        this.points = points;
        this.edges = edges;
        this.polygons = polygons;
    }
}

export default Toroid;

// x = r * sin(T) * cos(p)
// y = r * sin(T) * sin(p)
// z = r * cos(p)
// T = [0 .. PI]
// p = [0 .. 2*PI]