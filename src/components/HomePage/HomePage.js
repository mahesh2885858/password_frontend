import React from "react";
import "./HomePage.scss";

const HomePage = (props) => {
  const items = props.state.items;
  return (
    <div className="home-container">
      {props.state.isLoggedIn ? (
        items.length > 0 ? (
          items.map((item) => {
            return (
              <li onClick={() => props.itemDetails(item._id)} key={item._id}>
                {item.websitename}
              </li>
            );
          })
        ) : (
          <div>There are no entries </div>
        )
      ) : (
        <div>
          <p>This is Vault</p>
          <p> One place for all your Passwords</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
