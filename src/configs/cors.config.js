const cors = require("cors")

const corConfig = () => {
  const whiteList = ['http://thongtindaotao.sgu.edu.vn', 'https://schedule-sgu.netlify.app']
  if(process.env.NODE_ENV === "dev"){
    return cors()
  }
  return cors({origin: whiteList})
}

module.exports =  corConfig