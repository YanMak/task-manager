import Highcharts from 'https://code.highcharts.com/js/es-modules/masters/highcharts.src.js';

export const showHighcharts = (chartContainer, chartName='', categories = [], series = []) => {
  Highcharts.chart(chartContainer, {
    chart: {
      type: 'line'
    },
    title: {
      text: chartName
    },
    xAxis: {
      ,
      type: 'datetime',
      dateTimeLabelFormats: 
        {
           //day: '%d %b %Y'    //ex- 01 Jan 2016
           month: '%b \'%y'
        }
      
    },
    series
    
  });
}