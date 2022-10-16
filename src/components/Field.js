import {Cell} from './';

export default function Field(props) {
    //  [field, setField] = useState(field);
  
    return <div className='sapper'>
      <div className='field_wrapper'>
      {props.matrix.map((row, i) => (
        <div key={i} className='row'>
          {row.map((item) => {
  
            return <Cell key={`${item?.id}${item.y}${item.x}`} item={props.normalized[item?.id]} handleClick={props.handleClick} handleMouseDownUp={props.handleMouseDownUp} />
          })}
        </div>
      ))}
      </div>
    </div>
  }