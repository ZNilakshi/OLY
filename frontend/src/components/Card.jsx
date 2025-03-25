import React from "react";

export const Card = ({ children }) => {
  return <div className="rounded-lg shadow-md p-6 border">{children}</div>;
};

export const CardContent = ({ children }) => {
  return <div className="p-4">{children}</div>;
};
