import { Point, Polygon, Edge } from "../entities";
import Figure from './Figure'
class HyperbolicCylinder extends Figure {
    constructor(a = 60, b = 7, count = 10) {
        super();
        //точки
        const deltaZ = a / count;
        const deltaT = 2 * Math.PI / count;

        const points = [];
        //points
        for(let j = -a; j < a; j += deltaZ) {
            for(let i = -(Math.PI); i < Math.PI; i += deltaT) {
                points.push(new Point(
                    b * Math.sinh(i),
                    j,
                    b * Math.cosh(i), 
                ));
            }
        }
        for(let j = -a; j < a; j += deltaZ) {
            for(let i = -(Math.PI); i < Math.PI; i += deltaT) {
                points.push(new Point(
                    b * Math.sinh(i),
                    j,
                    -b * Math.cosh(i), 
                ));
            }
        }

        const edges = [];
        //edges
        for(let i = 0; i < points.length; i++) {
            if(points[i + 1]) {
                if((i + 1) % count === 0) {
                    
                } else {
                    edges.push(new Edge(i, i + 1));
                }
            }
        }
        for(let j = 0; j < points.length / 2 - count; j++) {
            if(points[j + count * 2]) {
                edges.push(new Edge(j, j + count));
            }
        }
        for(let j = points.length / 2 ; j < points.length; j++) {
            if(points[j + count]) {
                edges.push(new Edge(j, j + count));
            }
        }

        const polygons = [];
        //polygons
        for(let i = 0; i < points.length / 2 - count; i++) {
            if(points[i + count + 1]) {
                if((i + 1) % count === 0) {
                    
                } else
                polygons.push(new Polygon([i, i + 1, i + count + 1, i + count]));
            }
        }
        for(let i = points.length / 2; i < points.length; i++) {
            if(points[i + count + 1]) {
                if((i + 1) % count === 0) {
                    
                } else
                polygons.push(new Polygon([i, i + 1, i + count + 1, i + count]));
            }
        }

            this.points = points;
            this.edges = edges;
            this.polygons = polygons;
        }
}
export default HyperbolicCylinder;