export default function toString(obj) {

  let formatObj = formatLongName(obj)

  let result = JSON.stringify(obj, function(key, val) {
        if (typeof val === 'function') {
            return `~--demo--~${val}~--demo--~`;
        }
        return val;
    });

    do {
        result = result.replace('\"~--demo--~', '').replace('~--demo--~\"', '').replace(/\\n/g, '').replace(/\\\"/g,"\"");//最后一个replace将release模式中莫名生成的\"转换成"
    } while (result.indexOf('~--demo--~') >= 0);

    result = result.replaceAll('**n**', `\\n`)

    return result;
}

const formatLongName = (obj) => {
  if (obj && obj.radar && obj.radar.indicator) {
    obj.radar.indicator.forEach((item, index)=>{
      if (index === 1 || index === 4) {
        item.text = splitString(item.text, 6)
      }
      if (index === 2 || index === 3) {
        item.text = splitString(item.text, 9)
      }
    })
  } else {
    return obj
  }
}

const splitString =  (value, splitNum) => {
  let list = value.split('');
  let result = '';
  for (let i = 1; i <= list.length; i++) {
    if (!(i % splitNum) && list[i] !== undefined) {
      result += list[i - 1] + `**n**`;
    } else {
      result += list[i - 1];
    }
  }
  return result;
}
