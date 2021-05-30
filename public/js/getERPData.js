export const getERPdataForCharts = () => {
    let urlERP = "http://89.223.93.142:3001/geterpdata";
    //let response = await fetch(url);
    
    let col = 5;
    let resp = fetch(urlERP);
    //alert(urlERP);

    if (resp.ok) { // если HTTP-статус в диапазоне 200-299
    // получаем тело ответа (см. про этот метод ниже)
        //let json = await response.json();
        alert(resp.json());
    } else {
        alert("Ошибка HTTP: " + resp.status);
    }


}

export const processERPData = (data) =>{
    //[{"Дата":1619823599,"КаналПродаж":"СРС","Сумма":5000,"Себестоимость":1000,"Заказ":15},{"Дата":1622501999,"КаналПродаж":"СРС","Сумма":5000,"Себестоимость":1000,"Заказ":15}]
    for (let i = 0; i<data.length; i++){
        alert('processERPData  ' + i + ' ' + JSON.stringify(data[i]));
        alert(typeof(data[i].Дата));
        alert(typeof(data[i].Дата));
    }
}

export const sayERP = (user)=> {
  alert(`Hello, ${user}!`);
}

