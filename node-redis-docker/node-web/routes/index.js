var express = require('express');
var router = express.Router();
var redis = require('redis');

const APP_VERSION = '3.0.0'

const redis_host = process.env.REDIS_SERVICE_HOST || 'localhost';
const redis_port = process.env.REDIS_SERVICE_PORT || "6379";

console.info("Using Redis Host ",redis_host)
console.info("Using Redis Port ",redis_port)

// const redisClient = redis.createClient(redis_port,redis_host);

const redisClient  = redis.createClient({
  port: redis_port,
  host: redis_host,
  connection_strategy: function (options) {
      if (options.total_retry_time > 1000 * 60 * 60) {
          // kill the client with the error event
          return new Error('Retry time exhausted');
      }
      // attempt reconnect after this delay
      return Math.min(options.attempt * 100, 3000);
  },
  retry_strategy: function (options) {
      if (options.attempt >= 3) {
          // flush all pending commands with this error
          return new Error('Redis unavailable');
      }
      // let the client maintain its existing queues
      return null;
  }
});


redisClient.on('connect', function(){
  console.log('Connected to Redis');
});

redisClient.on('error', function(err) {
  console.log('Redis error: ' + err);
});

router.get('/pretend-fail', function(req, res, next) {
  setTimeout(() =>{
    console.warn("Shutting down the Node JS process")
    process.exit(9)
  },20000)
  res.json({ title: 'Test App' , host: process.env.HOSTNAME, appVersion: APP_VERSION,result:"Killing the server in 20 seconds"})
});

router.get('/redis', function(req, res, next) {
  redisClient.incr('count', (error, result) => {
    if (error ){
      res.json({ title: 'Test App' , host: process.env.HOSTNAME, appVersion: APP_VERSION,redis_error: error})
    }else{
      res.json({ title: 'Test App' , host: process.env.HOSTNAME, appVersion: APP_VERSION,hits: result})
    }
  })
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Test App' , host: process.env.HOSTNAME, appVersion: APP_VERSION});
});

module.exports = router;
