(function () {
let events = ['app.record.edit.change.和暦3'
              ,'app.record.create.change.和暦3'
              ,'app.record.edit.change.和暦年3'
              ,'app.record.create.change.和暦年3'
              ,'app.record.edit.change.和暦月3'
              ,'app.record.create.change.和暦月3'
              ,'app.record.edit.change.和暦日3'
              ,'app.record.create.change.和暦日3'
              ];
kintone.events.on(events, function(event) {
  let record = event.record;
  let year = 0;

  //▼----------和暦が完全に入力されていない場合は処理を抜ける
  if(record['和暦年3'].value === undefined || record['和暦月3'].value === undefined || record['和暦日3'].value === undefined){exit;}
  
  if(record['和暦3'].value === "大正"){
    year = Number(record['和暦年3'].value) + 1911;
  }
  else if(record['和暦3'].value === "昭和"){
    year = Number(record['和暦年3'].value) + 1925;
  }
  else if(record['和暦3'].value === "平成"){
    year = Number(record['和暦年3'].value) + 1988;
  }
  else if(record['和暦3'].value === "令和"){
    year = Number(record['和暦年3'].value) + 2018;
  }
  
  //▼----------西暦を代入する
  if(record['西暦3'].value === undefined){
    record['西暦3'].value = year + '-' + record['和暦月3'].value + '-' + record['和暦日3'].value;
    return event;
  }
  else if(record['西暦3'].value !== undefined){
    let JapanDate = record['西暦3'].value.replace('-0','-');
    let WestDate = year + '-' + record['和暦月3'].value + '-' + record['和暦日3'].value;
    //▼----------西暦を変更する
    if(JapanDate !== WestDate){
      record['西暦3'].value = year + '-' + record['和暦月3'].value + '-' + record['和暦日3'].value;
      return event;
    }
    //▼----------西暦を変更なし
    else{
      return false;
    }
  }
});
})();

(function () {
let events = ['app.record.edit.change.西暦3'
              ,'app.record.create.change.西暦3'
              ];
kintone.events.on(events, function(event) {
  let record = event.record;
  let yeardate = record['西暦3'].value.split('-');
  let JapanDate = [];
  let WestDate = [];
  if(Number(yeardate[0]) > 2018){
    WestDate.push('令和');
    WestDate.push(Number(yeardate[0]) - 2018);
  }
  else if(Number(yeardate[0]) > 1988){
    WestDate.push('平成');
    WestDate.push(Number(yeardate[0]) - 1988);
  }
  else if(Number(yeardate[0]) > 1925){
    WestDate.push('昭和');
    WestDate.push(Number(yeardate[0]) - 1925);
  }
  else if(Number(yeardate[0]) > 1911){
    WestDate.push('大正');
    WestDate.push(Number(yeardate[0]) - 1911);
  }
  WestDate.push(Number(yeardate[1]));
  WestDate.push(Number(yeardate[2]));
  
  //▼---------新規で和暦を代入する
  if(record['和暦年3'].value === undefined && record['和暦月3'].value === undefined && record['和暦日3'].value === undefined){
    record['和暦3'].value = WestDate[0];
    record['和暦年3'].value = WestDate[1];
    record['和暦月3'].value = WestDate[2];
    record['和暦日3'].value = WestDate[3];
    return event;
  }
  
  //▼----------西暦->和暦 変更
  else{
    JapanDate.push(record['和暦3'].value,record['和暦年3'].value,record['和暦月3'].value,record['和暦日3'].value);
    if(WestDate[0].value === JapanDate[0].value || WestDate[1].value === JapanDate[1].value || WestDate[2].value === JapanDate[2].value || WestDate[3].value === JapanDate[3].value ){
      record['和暦3'].value = WestDate[0];
      record['和暦年3'].value = WestDate[1];
      record['和暦月3'].value = WestDate[2];
      record['和暦日3'].value = WestDate[3];
      return event;
    }
    else{
      return false;
    }
  }
});
})();
