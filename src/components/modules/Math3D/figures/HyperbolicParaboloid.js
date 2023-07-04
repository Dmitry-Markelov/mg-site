import { Point, Polygon, Edge } from "../entities";
import Figure from './Figure';
class HyperbolicParaboloid extends Figure {
    constructor(count = 20, a = 5, b = 4) {
        super({});
    const points = [];
    // точки
    for (let x = -9; x < 10; x++) {
        for (let y = -10; y < 10; y++) {
            points.push(new Point(
                x,
                x * x / (a * a) - y * y / (b * b),
                y,
            ));
        }
    }

    //ребра
    const edges = [];
    for (let i = 0; i < points.length; i++) {
        //вдоль
        if (i + 1 < points.length && (i + 1) % count !== 0) {
            edges.push(new Edge(
                i,
                i + 1
            ));
        }
        //поперек
        if (i < points.length - count) {
            edges.push(new Edge(
                i,
                i + count
            ));
        }
    }

    //полигоны
    const polygons = [];
    for (let i = 0; i < points.length; i++) {
        if (i % 2 === 0) {
            if (i + 1 + count < points.length && (i + 1) % count !== 0) {
                polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count]));
            }
        } else if (i + 1 + count < points.length && (i + 1) % count !== 0) {
            polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count]));
        }
    }


    this.points = points;
    this.edges = edges;
    this.polygons = polygons;
}
}

export default HyperbolicParaboloid;