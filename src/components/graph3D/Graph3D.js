import { useEffect } from 'react';
import Graph from '../modules/Graph/Graph';
import Math3D, {Point, Light, Cube, Ellipsoid, Sphere, Toroid, ParabolicCylinder, Cylinder, TwoSheetedHyperboloid} from '../modules/Math3D';
import Graph3DUI from './Graph3DUI';
import useGraph from '../Hooks/useGraph';
// import './Graph3D.css';

const Graph3D = () => {
    const WIN = {
        LEFT: -10,
        BOTTOM: -10,
        WIDTH: 20,
        HEIGHT: 20,
        FOCUS: new Point(0, 0, 30),
        CAMERA: new Point(0, 0, 50)
    };

    const LIGHT = new Light(15, 15, 10, 1e4);
    const math3D = new Math3D({ WIN });
    let scene = [new Sphere()];
    const show = {
        edgeCheck: false,
        pointCheck: false,
        polygonsCheck: true,
        canRotate: false
    }
    
    const Graph = useGraph(renderScene);
    let graph = null;

    useEffect(() => {
        graph = Graph({
            id: 'canvas3d',
            WIN: WIN,
            width: 700,
            height: 700,
            callbacks: {
                wheel,
                mouseup,
                mousedown,
                mousemove,
                mouseleave,
            }
        });

        const interval = setInterval(() => scene.forEach(figure => {
            figure.doAnimation(math3D);
        }, 20))

        return () => {
            clearInterval(interval);
            //window.cancelAnimationFrame();
            graph = null;
        }
    }, [useGraph, renderScene, graph, Graph, clearInterval]);

    const wheel = (event) => {
        const delta = 1 + event.wheelDelta / 1200;
        scene.forEach(figure => {
            figure.points.forEach(point => {
                const matrix = math3D.zoom(delta);
                math3D.transform(matrix, point)
            });
        })
    }
    const mousemove = (event) => {
        if (show.canRotate) {
            const { movementX, movementY } = event;
            scene.forEach(figure => {
                figure.points.forEach(point => {
                    const OYmatrix = math3D.rotateOY(movementX / 180);
                    const OXmatrix = math3D.rotateOX(movementY / 180)
                    math3D.transform(OYmatrix, point);
                    math3D.transform(OXmatrix, point);
                });
            });
        }
    }
    const mouseup = () => {
        show.canRotate = false;
    }

    const mousedown = () => {
        show.canRotate = true;
    }

    const mouseleave = () => {
        show.canRotate = false;
    }
    const updateScene = (newFigure) => {
        scene = [newFigure];
    }

    const recolor = (color) => {
        scene.forEach(figure => {
            figure.polygons.forEach(polygon => {
                polygon.color = polygon.hexToRgb(color);
            })

        })
    }

    const updateVarEdges = (statement) => {
        show.edgeCheck = statement;
    }

    const updateVarPoints = (statement) => {
        show.pointCheck = statement;
    }

    const updateVarPolygons = (statement) => {
        show.polygonsCheck = statement;
    }

    function renderScene(OutFPS) {
        if (graph === null) return;
        graph.clear();
        scene.forEach(figure => {
            math3D.calcCenters(figure);
            math3D.calcDistance(figure, WIN.CAMERA, 'distance');
            math3D.calcDistance(figure, LIGHT, 'lumen')
            math3D.sortByArtistAlgoritm(figure.polygons);
            if (show.polygonsCheck) {
                figure.polygons.forEach(polygon => {
                    const points = [
                        figure.points[polygon.points[0]],
                        figure.points[polygon.points[1]],
                        figure.points[polygon.points[2]],
                        figure.points[polygon.points[3]]
                    ];
                    let { r, g, b, alpha } = polygon.color;
                    let lumen = math3D.calcIllumination(polygon.lumen, LIGHT.lumen);
                    if (polygon.isLit) {
                        lumen = 1
                    }
                    r = Math.round(r * lumen);
                    g = Math.round(g * lumen);
                    b = Math.round(b * lumen);
                    const color = polygon.rgbaToHex(r, g, b, alpha);
                    graph.polygon(
                        points.map(point => {
                            return {
                                x: math3D.xs(point),
                                y: math3D.ys(point)
                            }

                        }), color);

                })
            }
            if (show.edgeCheck) {
                figure.edges.forEach(({ p1, p2 }) => {
                    const point1 = figure.points[p1];
                    const point2 = figure.points[p2];
                    graph.line(
                        math3D.xs(point1),
                        math3D.ys(point1),
                        math3D.xs(point2),
                        math3D.ys(point2)
                    );
                });
            }
            if (show.pointCheck) {
                figure.points.forEach(point => {
                    graph.point(
                        math3D.xs(point),
                        math3D.ys(point)
                    );
                });
            }
        })
        graph.text(WIN.LEFT+0.35, 9.5, OutFPS);
        graph.render();
    }

    return (<>
        <Graph3DUI 
            show={show}
            updateVarPoints={updateVarPoints}
            updateVarPolygons={updateVarPolygons}
            updateVarEdges={updateVarEdges}
            updateScene={updateScene}
        />
        <canvas id='canvas3d'></canvas>
    </>);
}

export default Graph3D;