const Item2 = (props) => {
  return (
    <li>
      <label>
        <input type="checkbox" checked={props.done || false} onClick={props.clickHandler}/>
        <span>{props.text}</span>
      </label>
    </li>
  );
};

export default Item2;
