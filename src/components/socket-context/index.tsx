"use client";
import { useState, useEffect, createContext, useContext } from "react";
import io from "socket.io-client";

type State = {
  baseHealth: number;
  locks: number[];
  nextLocks: number[];
}

const SocketContext = createContext<State>({
  baseHealth: 0,
  locks: [],
  nextLocks: [],
});

export const socket = io("http://192.168.11.242:3001");

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [value, setValue] = useState<State>({
    baseHealth: 0,
    locks: [],
    nextLocks: [],
  });
  useEffect(() => {
    socket.on("health", (newHealth) => {
      console.log(newHealth);
      setValue((prev) => ({
        ...prev,
        baseHealth: newHealth,
      }));
    });
    socket.on("locks", (newLocks) => {
      setValue((prev) => ({
        ...prev,
        locks: newLocks,
      }));
    });
    socket.on("nextLocks", (newLocks) => {
      setValue((prev) => ({
        ...prev,
        nextLocks: newLocks,
      }));
    });
  }, []);

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

export default SocketProvider;
