const Header = ({showComponent}) => {
    return (
        <div>
            <button onClick={() => showComponent("Calculator")}>Calculator</button>
            <button onClick={() => showComponent("Graph2D")}>Graph2D</button>
            <button onClick={() => showComponent("Graph3D")}>Graph3D</button>

        </div>
    )
}
export default Header;