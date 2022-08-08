import Header from "@/containers/Layout/Header";
import React from "react";

export interface ILayoutProps {
  children: JSX.Element | JSX.Element[];
}

function Layout(props: ILayoutProps) {
  const { children } = props;
  return (
    <>
      <Header />
      {children}
    </>
  );
}

export default Layout;
