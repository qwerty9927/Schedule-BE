const { ErrorResponse } = require("../core/error.response")

const convertDayToNumber = (data) => {
  if(Array.isArray(data)){
    return data.map(item => {
      switch (item) {
        case "Hai" || "hai":
          return 2
        case "Ba" || "ba":
          return 3
        case "Tư" || "tư":
          return 4
        case "Năm" || "năm":
          return 5
        case "Sáu" || "sáu":
          return 6
        case "Bảy" || "bảy":
          return 7
      }
    })
  } else {
    switch (data) {
      case "Hai" || "hai":
        return 2
      case "Ba" || "ba":
        return 3
      case "Tư" || "tư":
        return 4
      case "Năm" || "năm":
        return 5
      case "Sáu" || "sáu":
        return 6
      case "Bảy" || "bảy":
        return 7
    }
  }
}

const convertStringToNumber = (data) => {
  if(Array.isArray(data)){
    return data.map(item => {
      return parseInt(item)
    })
  } else {
    return parseInt(data)
  }
}

const createCodeCS = (data) => {
  if(Array.isArray(data)){
    return data.map(item => {
      const symbol = item.slice(0, 1);
      switch (symbol) {
        case "C":
          return 1
        case "1":
          return 2
        case "2":
          return 3
      }
    })
  } else {
    const symbol = data.slice(0, 1);
    switch (symbol) {
      case "C":
        return 1
      case "1":
        return 2
      case "2":
        return 3
    }
  }
}

const removeAccents = (str) => {
  var AccentsMap = [
    "aàảãáạăằẳẵắặâầẩẫấậ",
    "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
    "dđ", "DĐ",
    "eèẻẽéẹêềểễếệ",
    "EÈẺẼÉẸÊỀỂỄẾỆ",
    "iìỉĩíị",
    "IÌỈĨÍỊ",
    "oòỏõóọôồổỗốộơờởỡớợ",
    "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
    "uùủũúụưừửữứự",
    "UÙỦŨÚỤƯỪỬỮỨỰ",
    "yỳỷỹýỵ",
    "YỲỶỸÝỴ"    
  ];
  for (var i=0; i<AccentsMap.length; i++) {
    var re = new RegExp('[' + AccentsMap[i].substring(1) + ']', 'g');
    var char = AccentsMap[i][0];
    str = str.replace(re, char).replace(' ', '').toLowerCase();
  }
  return str;
}

const verifyInput = (input) => {
  Object.entries(input).forEach(([key, value]) => {
    if(!value){
      throw new ErrorResponse(`${key} is not "${value}"`)
    }
  })
  return input
}

module.exports = { convertDayToNumber, convertStringToNumber, createCodeCS, removeAccents, verifyInput }