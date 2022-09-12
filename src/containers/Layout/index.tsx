import React from "react";

import Header from "@/containers/Layout/Header";

export interface ILayoutProps {
  children: JSX.Element | JSX.Element[];
}

const Layout = (props: ILayoutProps) => {
  const { children } = props;
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Layout;
