import React from "react";
import { useParams } from "react-router";

const ItemDetails = (props) => {
  const params = useParams();
  const items = props.state.items;
  const item = items.filter((item) => item._id === params.id);
  return (
    <div>
      <h1>theese are item details</h1>
      <p>Website: {item[0].websitename}</p>
      <p> username: {item[0].username}</p>
      <p>Email: {item[0].email}</p>
      <p>Password: {item[0].password}</p>
      <button onClick={() => props.editItem(item[0]._id)}>Edit</button>
      <button onClick={() => props.deleteItem(item[0]._id)}> Delete</button>
    </div>
  );
};

export default ItemDetails;
