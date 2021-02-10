import React, { useState, useContext } from "react"
import { authContext } from "./auth.context";
import { useProvideAuth } from "./use-auth";

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
}