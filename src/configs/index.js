
const dev = {
  APP: {
    PORT: process.env.PORT_APP_DEV
  },
  DB: {
    URLDB: process.env.URLDB_DEV
  }

}

const pro = {
  APP: {
    PORT: process.env.PORT_APP_PRO
  },
  DB: {
    URLDB: process.env.URLDB_PRO
  }
}

module.exports = { dev, pro }[process.env.NODE_ENV]