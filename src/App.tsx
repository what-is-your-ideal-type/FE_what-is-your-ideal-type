import React, { useState } from "react";
import Loading from "./components/Loading";
import Result from "./Pages/Result";

function App() {
  const [loading, setLoading] = useState(false);
  return (
    <>
      {/* <h1>What is your ideal type?</h1> */}
      <div className="App">{loading ? <Loading></Loading> : <></>}</div>
      <Result />
    </>
  );
}

export default App;
