import React from "react";
import { useState } from "react";
import Header from './components/Header/Header';
import Graph3D from './components/graph3D/Graph3D';
import Graph2D from './components/graph2D/Graph2D';
import Calculator from './components/calculator/Calculator';

const App = () => {
    const [showComponent, setShowComponent] = useState(`Graph3D`);
    return (<div>
            <Header showComponent={setShowComponent}/>
            {showComponent === 'Calculator' ? <Calculator/> :
                showComponent === 'Graph2D' ? <Graph2D/> :
                    showComponent === 'Graph3D' ? <Graph3D/> :
                        <></>
            }
        </div>
    )
}

export default App;