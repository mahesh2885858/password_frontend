import React from "react";
import { useParams } from "react-router";
import "./ItemDetails.scss";

const ItemDetails = (props) => {
  const params = useParams();
  const items = props.state.items;
  const item = items.filter((item) => item._id === params.id);
  return (
    <div className="item-detail-container">
      {/* <h1>Entrie details</h1> */}
      <div className="item-details">
        <div>
          <span>Website Name: </span>
          <p>{item[0].websitename}</p>
        </div>
        <div>
          <span>Username: </span>
          <p> {item[0].username}</p>
        </div>
        <div>
          <span>Email: </span>
          <p>{item[0].email}</p>
        </div>
        <div>
          <span>Password: </span>
          <p>{item[0].password}</p>
        </div>
      </div>
      <div className="item-edit-delete-container">
        <button onClick={() => props.editItem(item[0]._id)}>Edit</button>
        <button onClick={() => props.deleteItem(item[0]._id)}> Delete</button>
      </div>
    </div>
  );
};

export default ItemDetails;
