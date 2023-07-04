import { Point, Polygon, Edge, Figure } from "../entities";
class Cube extends Figure {
    constructor(x = -5, y = -5, z = -5, size = 10) {
        super();
        this.points = [
            new Point(10, 10, 10),
            new Point(-10, 10, 10),
            new Point(-10, -10, 10),
            new Point(10, -10, 10),
            new Point(10, 10, -10),
            new Point(-10, 10, -10),
            new Point(-10, -10, -10),
            new Point(10, -10, -10)];
        this.edges = [
            new Edge(0, 1),
            new Edge(0, 3),
            new Edge(0, 4),
            new Edge(1, 2),
            new Edge(1, 5),
            new Edge(2, 3),
            new Edge(2, 6),
            new Edge(3, 7),
            new Edge(4, 5),
            new Edge(4, 7),
            new Edge(5, 6),
            new Edge(6, 7),];
        this.polygons = [
            new Polygon([0, 4, 5, 1]),
            new Polygon([1, 5, 6, 2]),
            new Polygon([7, 3, 2, 6]),
            new Polygon([3, 7, 4, 0]),
            new Polygon([0, 1, 2, 3]),
            new Polygon([4, 7, 6, 5])
        ]
    }
}

export default Cube;