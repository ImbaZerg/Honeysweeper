import refresh from "../img/refresh_white_24dp.png"
export default function Menu(props) {
    console.log("props",props, props.mines)
    const {restart} = props;

    return (
        <div className="menu">
            <button className="restart" onClick={()=>restart()}>
                <img src={refresh}/> Restart</button>
            <div className="mines">Mines left: <span className="mines_count">{props.mines}</span></div>
        </div>
    )
}