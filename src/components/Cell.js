//import outline from "../img/outline.png"
//import outline_open from "../img/outline_open.png"
//import outline_w_shadow from "../img/outline_w_shadow.png"

export default function Cell(props) {
  // console.log(outline);
  const { item, handleClick } = props;

  return (
    <div
      //key={item.indexCounter}
      className={'cell'
        + (item?.show ? " show" : "")

        + (item?.active === true ? '' : ' nonactive') + " "
        + item?.active}
      //cellId={item.id}
      data-cell-bg={item.bg}
      onClick={item ? (e) => handleClick(item, e) : undefined}
      onContextMenu={item ? (e) => handleClick(item, e) : undefined}
    >
      <div draggable="false"
        className={"img " + (item.show ?
          item.mine ? "mine" :
            item.number === 0 ? 'outline_open' : "number" + item.number
          : item.flag ? "flag" :
            item.outline === 1 ? 'outline_w_shadow' : 'outline')}
      
      ></div>
    
      {item ? item.id : 0}
    </div>
  )
}