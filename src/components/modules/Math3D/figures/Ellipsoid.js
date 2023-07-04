import { Point, Polygon, Edge, Figure } from "../entities";
class Ellipsoid extends Figure {
    constructor(x = 10, y = 7, z = 9, count = 20, color = '#ffffff') {
        super();
        //points
        const points = [];
        for(let i = 0; i <= count + 1; i++) { //кольца
            const T = Math.PI * i / (count + 1);
            for(let j = 0; j < count; j++) {
                const p = 2 * Math.PI * j / count;
                points.push(new Point(
                    x * Math.sin(T) * Math.cos(p),
                    y * Math.cos(T),
                    z * Math.sin(T) * Math.sin(p)
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
        for(let i = 0; i < points.length; i++) {
            if (points[i + 1 + count]) {
                if ((i + 1) % count === 0) {
                    polygons.push(new Polygon([
                        i,
                        i + 1 - count,
                        i + 1,
                        i + count]));
                } else {
                    polygons.push(new Polygon([
                        i,
                        i + 1,
                        i + 1 + count,
                        i + count]));
                }
            }
            
        }
        polygons.push(new Polygon([
            points.length - 1 - count,
            points.length - 2 * count,
            points.length - count,
            points.length - 1
        ]));
        
        this.points = points;
        this.edges = edges;
        this.polygons = polygons;
    }
}

export default Ellipsoid;

// x = r * sin(T) * cos(p)
// y = r * sin(T) * sin(p)
// z = r * cos(p)
// T = [0 .. PI]
// p = [0 .. 2*PI]