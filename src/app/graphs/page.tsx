"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";
import annotationPlugin from "chartjs-plugin-annotation";
import { useSocket } from "@/components/socket-context";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin
);

const options: ChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      //   position: "top" as const,
    },
    title: {
      display: true,
      text: "SISGPT Loss Function",
      font: {
        size: 70,
      },
    },
    annotation: {
      annotations: {
        line1: {
          type: "line",
          yMin: 0,
          yMax: 0,
          borderColor: "rgb(255, 99, 132)",
          borderWidth: 2,
        },
      },
    },
  },
  scales: {
    y: {
    //   min: -100,
      max: 1000,
      ticks: {
        font: {
          size: 50,
        },
      },
    },
    x: {
      display: false,
    },
  },
  animation: {
    duration: 0,
  },
};

const WINDOW_SIZE = 90;
const DEVIATION = 50;
const START_VALUE = 800;

const makeData = () => {
  const data = [];
  for (let i = 0; i < WINDOW_SIZE; i++) {
    data.push(Math.random() * DEVIATION + START_VALUE);
  }
  return data;
};

export default function Graphs() {
  const [points, setPoints] = useState<number[]>(makeData());
  const {baseHealth} = useSocket();
  console.log(baseHealth);
  const data = {
    labels: points.map((point, index) => index),
    datasets: [
      {
        label: "Dataset 1",
        data: points,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  const addNewData = useCallback(() => {
    setPoints((points) => {
        const newPoints = [...points, baseHealth > 0 ? Math.random() * DEVIATION + baseHealth : baseHealth];
        newPoints.shift();
        return newPoints
    });
  }, [baseHealth]);
  useEffect(() => {
    const interval = setInterval(() => {
      addNewData();
      console.log("add interval");
    }, 200);
    return () => {
      clearInterval(interval);
    };
  }, [addNewData]);
//   const growBack = useCallback(() => {
//     console.log("growBack");
//     if(baseHealth < 0) {
//         return;
//     }
//     let counter = 0;
//     const interval = setInterval(() => {
//         console.log("interval");
//         if (counter > 10) {
//             clearInterval(interval);
//             return;
//         }
//         counter++;
//         baseHealth = baseHealth + 10;
//     }, 205);
// }, []);
  return (
    <div>
      <Line options={options as any} data={data} />
      <button onClick={addNewData}>Add</button>
      {/* <form onSubmit={(ev) => {
        ev.preventDefault();
        console.log("aboba");
        // baseValue.current = newBaseValue;
        // growBack();
      }}> */}
      {/* <input
        type="number"
        onChange={(e) => { setNewBaseValue(Number(e.target.value)) }}
      ></input>
        <button type="submit">Set</button>
        </form> */}
    </div>
  );
}
