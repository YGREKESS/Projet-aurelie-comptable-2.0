import React from "react";
import { ImSpinner } from "react-icons/im";

export default function LoadingSpinner() {
  return (
    <div className="loading-spinner">
      <ImSpinner size={50} />
    </div>
  );
}
