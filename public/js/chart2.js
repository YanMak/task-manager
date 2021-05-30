import Highcharts from 'https://code.highcharts.com/js/es-modules/masters/highcharts.src.js';

export const showHighcharts2 = (categories = [], series = []) => {
  Highcharts.chart('chartContainer0', {
    chart: {
      type: 'line'
      //type: 'bar'
    },
    title: {
      text: 'Показатели ИМ'
    },
    xAxis: {
      //categories,
      type: 'datetime',
      
    },
    series
    
  });
}
