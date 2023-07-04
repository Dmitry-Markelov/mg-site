import Graph from '../modules/Graph/Graph';

function useGraph(render = () => {}) {
    window.requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
            window.webkit.requestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            }
    })();

    let FPS = 0;
    let OutFPS = 0;
    let lastTimesStamp = Date.now();
    const animLoop = () => {
        FPS++;
        const timestamp = Date.now();
        if(timestamp-lastTimesStamp >= 1000){
            OutFPS = FPS;
            FPS = 0;
            lastTimesStamp = timestamp;
        }
        render(OutFPS);
        window.requestAnimationFrame(animLoop);
    }
    return(params) =>{
        animLoop();
        return new Graph(params);
    }
}

export default useGraph;