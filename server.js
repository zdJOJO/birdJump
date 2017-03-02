var webpack = require('webpack');

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var config = require('./webpack.dev.config');

var isProduction = process.env.NODE_ENV === 'production';
var isDeveloping = !isProduction;

var app = express();

var devMiddleWare, publicPath = isDeveloping ? path.join(__dirname) : path.join(__dirname, 'dist');

// Webpack developer
if (isDeveloping) {
  var compiler = webpack(config);
  devMiddleWare = require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath,
    stats: {
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }
  })
  app.use(devMiddleWare);

  app.use(require('webpack-hot-middleware')(compiler));
  
  var mfs = devMiddleWare.fileSystem
  var file = path.join(config.output.path, 'index.html')
  app.get('*', function(req, res) {
    devMiddleWare.waitUntilValid(function(){
      var html = mfs.readFileSync(file)
      res.end(html)
    })
  })
} else {
  app.get('/', function(req, res) {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
  })
}

// static
app.use(express.static(publicPath));

//  RESTful API
app.use(bodyParser.json({ type: 'application/json' }))

var port = isProduction ? (process.env.PORT || 80) : 8080;


app.post('/api/menu', function(req, res) {
  res.json({
      menus: [
          {
              key: 1,
              name: '管理',
              icon: 'user',
              child: [
                  {
                      name: '产品列表',
                      key: 101,
                      url: '/home'
                  }
              ]
          }
      ]
  });
});


// app.put('/api/login', function(req, res) {
//     var credentials = req.body;
//     if(credentials.user==='admin' && credentials.password==='123456'){
//         res.cookie('uid', '1', {domain:'127.0.0.1'});
//         res.json({'user': credentials.user, 'role': 'ADMIN', 'uid': 1});
//     }else{
//         res.status('500').send({'message' : 'Invalid user/password'});
//     }
// });

// app.post('/api/my', function(req, res) {
//   res.json({'user': 'admin', 'role': 'ADMIN', 'uid': 1});
// });
//
// app.post('/api/logout', function(req, res) {
//   res.clearCookie('uid');
//   res.json({'user': 'admin', 'role': 'ADMIN'});
// });

app.listen(port, function (err, result) {
  if(err){
    console.log(err);
  }
  console.log('Server running on http://localhost:' + port);
});
