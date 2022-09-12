import React from "react";

export interface IHrProps {
  vertical?: boolean;
  darkest?: boolean;
  styles?: React.CSSProperties;
}

const Hr = ({ vertical, darkest, styles }: IHrProps) => (
  <div
    className={darkest ? "bg-gray-darkest" : "bg-gray-dark"}
    style={{
      width: vertical ? "1px" : "100%",
      height: vertical ? "100%" : "1px",
      ...styles,
    }}
  />
);

export default Hr;
