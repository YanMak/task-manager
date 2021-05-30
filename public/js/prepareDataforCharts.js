export const getERPdataForCharts = (expData) => {
/*    expData.srn.sales.summ.push([(new Date(1000*elem.Дата)).getTime(), elem.СуммаПродажи]);
            expData.srn.sales.cost.push([(new Date(1000*elem.Дата)).getTime(), elem.СебестоимостьПродажи]);
            expData.srn.sales.quantity.push([(new Date(1000*elem.Дата)).getTime(), elem.ЗаказыПродажи]);

            expData.srn.orders.summ.push([(new Date(1000*elem.Дата)).getTime(), elem.СуммаОформлено]);
            expData.srn.orders.quantity.push([(new Date(1000*elem.Дата)).getTime(), elem.ЗаказОформлено]);

        }
        else
        {
            expData.courier.sales.summ.push([(new Date(1000*elem.Дата)).getTime(), elem.СуммаПродажи]);
            expData.courier.sales.cost.push([(new Date(1000*elem.Дата)).getTime(), elem.СебестоимостьПродажи]);
            expData.courier.sales.quantity.push([(new Date(1000*elem.Дата)).getTime(), elem.ЗаказыПродажи]);

            expData.courier.orders.summ.push([(new Date(1000*elem.Дата)).getTime(), elem.СуммаОформлено]);
            expData.courier.orders.quantity.push([(new Date(1000*elem.Дата)).getTime(), elem.ЗаказОформлено]);
*/
    
    let arr = [];
    arr.push(
        {
            name: 'Сумма продаж', 
            container: '', 
            series:[
                { name:'Сумма продаж', data: expData.srn.sales.summ }        
            ] 
        });
        return arr;
       alert(arr);
    /*arr.push(expData.srn.sales.cost);
    arr.push(expData.srn.sales.quantity);
    arr.push(expData.srn.orders.summ);
    arr.push(expData.srn.orders.quantity);
    arr.push(expData.srn.sales.summ);
    arr.push(expData.srn.sales.cost);
    arr.push(expData.srn.sales.quantity);
    arr.push(expData.srn.orders.summ);
    arr.push(expData.srn.orders.quantity);
    */
}