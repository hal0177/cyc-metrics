
import { useRef, useEffect } from "react";
import styled from "styled-components";
import { createChart } from "lightweight-charts";

const TSChartContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: rgb(0, 0, 0, 0.8);
  box-shadow: 0.08rem 0.08rem 0.1rem rgb(255, 255, 255, 0.1);
`


export default function TSChart() {

  const chartCanvas = useRef();

  useEffect(() => {
    var chart = createChart(chartCanvas.current, {
      width: chartCanvas.current.clientWidth,
      height: chartCanvas.current.clientHeight,
      layout: {
        backgroundColor: "rgb(0, 0, 0, 0.8)",
        textColor: "rgba(255, 255, 255, 0.6)",
      },
      grid: {
        vertLines: {
          color: "rgba(197, 203, 206, 0.5)",
        },
        horzLines: {
          color: "rgba(197, 203, 206, 0.5)",
        },
      },
      rightPriceScale: {
        borderColor: "rgba(197, 203, 206, 0.8)",
      },
      timeScale: {
        borderColor: "rgba(197, 203, 206, 0.8)",
      },
    });
  
    var areaSeries = chart.addAreaSeries({
      topColor: 'rgba(30, 144, 255, 0.56)',
      bottomColor: 'rgba(30, 144, 255, 0.05)',
      lineColor: 'rgba(30, 144, 255, 1)',
      lineWidth: 2,
      crossHairMarkerVisible: false,
    });
  
    areaSeries.setData(data);
  }, []);


  var data = []
  var time = Date.now();
  var chartTime = "";
  for(let x = 0; x < 365; x++) {
    time = time + 86400000;
    chartTime = new Date(time).toISOString().slice(0, 10);
    console.log(chartTime);
    data.push({time: chartTime, value: Math.floor(Math.random() * 100000)});
  }

  return (
    <TSChartContainer ref={chartCanvas}>

    </TSChartContainer>
  );
}