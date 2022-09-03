import React from 'react'
import { useHistory } from "react-router-dom";
export default function IndexPage() {
  let history = useHistory();
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (!token) {
      history.push("/login");
    } else {
      history.push("/dashboard");
    }
    // eslint-disable-next-line
  }, [0]);
  return <div></div>;
}
