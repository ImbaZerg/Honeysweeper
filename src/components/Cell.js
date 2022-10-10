

export default function Cell(props) {
    const { item, handleClick } = props;
  
    return (
      <div
        //key={item.indexCounter}
        className={'cell'
          + (item?.show ? " show" : "")
          + (item?.active === true ? '' : ' nonactive') + " "
          + item?.active}
        //cellId={item.id}
        onClick={item ? (e) => handleClick(item, e) : undefined}
        onContextMenu={item ? (e) => handleClick(item, e) : undefined}
      >
        {item ? item.id : 0}
      </div>
    )
  }