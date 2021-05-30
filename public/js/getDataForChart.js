//import {showHighcharts} from '/js/chart.js';
//import {showHighcharts} from '/js/chart.js';

export const getSales = () => {
    
    var res = 
    //return 
    [
      {name: 'Продажи СРС 2021', 
      data: 
      [
        [Date.UTC(2021, 0, 31), 520.277],
        [Date.UTC(2021, 1, 28), 965.512],
        [Date.UTC(2021, 2, 31), 803.427],
        [Date.UTC(2021, 3, 30), 993.879],
        [Date.UTC(2021, 4, 31), 330.670],
      ]
      },
     {name: 'Продажи КУРЬЕРКА 2021', 
     data: 
     [
        [Date.UTC(2021, 0, 31), 232.616],
        [Date.UTC(2021, 1, 28), 325.680],
        [Date.UTC(2021, 2, 31), 1012.453],
        [Date.UTC(2021, 3, 30), 1123.528],
        
     ]
    }
    ];
    //alert('from getsales ' + res);
    return res;
}

export const processListData = (data) =>{
    var a = data.задачи;
    var s = '';
    
    a.forEach(function(entry) {
        var allPoints = 0;
        var completedPoints = 0;
        var allPointsName = 'всегопунктов';
        var completedPointsName = 'выполненопунктов';

        for (var key in entry[0]) {
            var val = entry[0][key];
            
            if (key === 'Наименование'){
                s = s + ' ' + key + '=' + val;
            }
            
            if (key === allPointsName){
                allPoints = val;    
            }
            if (key === completedPointsName){
                completedPoints = val;    
            }
        }
        
        var completed = false;
        if (completedPoints >= allPoints){
          completed = true;
        }
        
        entry[0].выполнено = completed;
   
        //alert(JSON.stringify(entry[0]));
    });

/*
    s = '';
    a.forEach(function(entry_) {
        alert(' ' + entry_[0].Наименование + ' ');
        //s = s + JSON.stringify(entry_[0]);
        //s = s + JSON.stringify(entry_[0]);
    });
    alert(s);
*/
    return a;   
    
}

/*
export const prepareSeries = () => {
    return ['Apples', 'Bananas', 'Orangesm'];
    //let series__ = [{name: 'Jane', data: [1, 0, 4]},{name: 'John Week',data: [5, 7, 3]}];
    //alert(`alert from prepareseries` + JSON.stringify(series__));
    //return series__;
}
*/


/*
export const loadDataFromChartFetch = () => {
    var url = 'http://89.223.93.142:3001/lists';
    //let response = await fetch(url);
    let response = fetch(url);

    if (response.ok) { // если HTTP-статус в диапазоне 200-299
    // получаем тело ответа (см. про этот метод ниже)
        //let json = await response.json();
    } else {
        alert("Ошибка HTTP: " + response.status);
    }


}*/


export const loadDataForChart = () => {
            var xmlhttp = new XMLHttpRequest();
            var url = "http://89.223.93.142:3001/lists";``
            xmlhttp.onload = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == "200") {
                    document.getElementById("expressQueryData1").innerHTML = this.responseText;

                    //alert(this.json());
                    //showHighcharts(prepareCategories(), prepareSeries());
                    //17052021
                    //showHighcharts(prepareCategories(), prepareSeries());
                }
            }
            xmlhttp.open("GET", url, true);
            xmlhttp.send();
}
        
