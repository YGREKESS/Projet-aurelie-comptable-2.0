import React, { useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { NavLink } from "react-router-dom";

export default function StepCount({ count, setXPosition }) {
  useEffect(() => {
    return () => {};
  }, [count]);
  return (
    <div className="step-count">
      <ul>
        <li
          className={count >= 0 ? "active" : ""}
          onClick={() => setXPosition(0)}
        >
          Etape 1
        </li>
        <li
          className={count >= 1 ? "active" : ""}
          onClick={() => setXPosition(-100)}
        >
          Etape 2
        </li>
        <li
          className={count >= 2 ? "active" : ""}
          onClick={() => setXPosition(-200)}
        >
          Etape 3
        </li>
        <li
          className={count >= 3 ? "active" : ""}
          onClick={() => setXPosition(-300)}
        >
          Etape 4
        </li>
        <li
          className={count >= 4 ? "active" : ""}
          onClick={() => setXPosition(-400)}
        >
          Etape 5
        </li>
      </ul>
    </div>
  );
}
