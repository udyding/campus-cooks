import React from "react";
import { Link } from "react-router-dom";

export default function Verify() {
  return (
    <div>
      A verification email has been sent to your inbox! Once verified, you can
      log in here:
      <div className="w-100 text-center mt-2">
        <Link to="/login">Log In</Link>
      </div>
    </div>
  );
}
