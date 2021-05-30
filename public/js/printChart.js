import Highcharts from 'https://code.highcharts.com/js/es-modules/masters/highcharts.src.js';

export const printHighchart = (incomingData, container) => {

    Highcharts.chart(container, {
    chart: {
      type: 'line'
      //type: 'bar'
    },
    title: {
      text: incomingData.name
    },
    xAxis: {
      //categories,
      type: 'datetime',
      
    },
    series: 
    [
      {name: incomingData.series[0].name, 
      data: incomingData.series[0].data
      
      },
      {name: incomingData.series[1].name, 
      data: incomingData.series[1].data
    }
     
    ]
    
  });

}