//dependecies
const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const session = require(`express-session`)
const knexSessionStore = require('connect-session-knex')(session)


const sessionConfig = {
    name: "dog",
    secret: "secret",
    cookie: {
      maxAge: 3600 * 1000,
      secure: false,
      httpOnly: true,
    },
    resave: false,
    saveUninitialized: false,
    store: new knexSessionStore({
      knex: require("../data/db-config"),
      tablename: "sessions",
      sidfieldname: "sid",
      createtable: true,
      clearInterval: 3600 * 1000,
    }),
  };


//global middleware

module.exports = server => {
    server.use(express.json())
    server.use(helmet())
    server.use(cors())
    server.use(session (sessionConfig))
}