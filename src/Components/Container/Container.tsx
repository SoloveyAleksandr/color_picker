import React, { FC } from "react";

interface IContainer {
  children: React.ReactNode,
}

const Container: FC<IContainer> = ({ children }) => {
  return (
    <div style={{ margin: '0 auto', maxWidth: '1170px', padding: '0px 15px' }}>
      {children}
    </div>
  );
};

export default Container;
