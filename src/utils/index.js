/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, ' ') +
      '"}'
  )
}

//图片上传将base64转换为文件
export function dataURLtoFile(urlData) {
  //去掉url的头，并转换为byte
  var bytes=window.atob(urlData.split(',')[1]);
  //处理异常,将ascii码小于0的转换为大于0
  var ab = new ArrayBuffer(bytes.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < bytes.length; i++) {
      ia[i] = bytes.charCodeAt(i);
  }
  return new Blob( [ab] , {type : 'image/png'});
}

//关键字转换为tags标签
export function keywordsToTags(keywords) {
  let tags = new Array();
  if(keywords==null||keywords==''){
    return tags;
  }else{
    const ks = keywords.split(',');
    for (var value of ks) {
      tags.push({"text":value,"tiClasses":["ti-valid"]});
    }
    return tags;
  }
}

//添加tag标签
export function addTag(tag,tags) {
  return tags.push({"text":tag,"tiClasses":["ti-valid"]});
}

//tags标签转换为关键字
export function tagsToKeywords(tags) {
  if(tags==null||tags.length==0){
    return null;
  }else{
    let ks = new Array();
    for (var value of tags) {
      ks.push(value.text);
    }
    return ks.join(',');
  }
}

// 字符加上金钱前缀
export function formatMoney(pp) {
  if (pp == null) {
    return '';
  }
  return '￥' + pp.toFixed(2);
}

//计算百分比
export function getPercent(num1,num2) {
	if(num2==0){
		return 'n/a';
	}
  return (Math.round(num1 / num2 * 10000) / 100.00);
}

/**
 * 业务类型的图标
 * @param {Object} bussType
 */
export function getBussIconClass(bussType) {
  let b = bussType.toLowerCase();
  const sa = b.split("_"); //分割
  return sa[0];
}

/**
 * 数据排序
 * @param {Object} datas
 * @param {Object} type:asc升序,desc降序
 */
export function sortData(datas,type){
  //冒泡排序
  for(let j=0;j<datas.length-1;j++){
  //两两比较，如果前一个比后一个大，则交换位置。
   for(let i=0;i<datas.length-1-j;i++){
      if('desc'==type&&datas[i].date<datas[i+1].date){
        let temp = datas[i];
        datas[i] = datas[i+1];
        datas[i+1] = temp;
      }
      if('asc'==type&&datas[i].date>datas[i+1].date){
        let temp = datas[i];
        datas[i] = datas[i+1];
        datas[i+1] = temp;
      }
    }
  }
}