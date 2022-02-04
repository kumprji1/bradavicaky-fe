import React, { useState } from "react";

const TryLuckPage = () => {
    const [canRoll, setCanRoll] = useState(false);
    useState(() => {
        fetchCanRoll()

        setCanRoll(true)
    }, [auth.token])
  return (
    <div className="custom-page--wrapper">
      <h1 className="custom-page--title">Zkus štěstí ;)</h1>
      
    </div>
  );
};

export default TryLuckPage;
