import React from "react";
import { Button } from "semantic-ui-react";
import "./incrementDecrementBtn.scss";

function IncrementDecrementBtn({ setCount, count }) {

  const handleDecrementCounter = () => {
    if (count > 0) {
      setCount((previousCount) => previousCount - 1)
    }
  }

  const handleIncrementCounter = () => {
    setCount((previousCount) => previousCount + 1)
  }

  return (
    <>
      <Button icon="minus" className="quantity-btn" onClick={handleDecrementCounter} />
      <span className="quantity__span">{count}</span>
      <Button icon="plus" className="quantity-btn" onClick={handleIncrementCounter} ></Button>
    </>
  )
}

export default IncrementDecrementBtn;
