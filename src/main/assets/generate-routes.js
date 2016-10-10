/*
* 递归同步抓取src/page  下所有一Routes.js命名的文件，最终生成src/page/allRoutes.js文件
* */
var fs = require('fs');
var path = require('path');
var pagePath = path.join(__dirname, './src/page');
var imports = [];
var routesNames = [];

var startRoutes = new Date();
function getRoutes(filePath, fileName, modulesName) {
    if (!modulesName) {
        modulesName = 'modules';
    }

    var stat = fs.statSync(filePath);
    var isDir = stat.isDirectory();
    if (isDir) {
        var files = fs.readdirSync(filePath)
        if (files && files.length) {
            files.forEach(function (fn, index) {
                var fp = path.join(filePath, fn);
                getRoutes(fp, fn, (modulesName + (index + '')));
            });
        }
    } else {
        if (fileName === 'Routes.js') {
            var pathName = filePath.replace(pagePath, '');
            var routesPath = '.' + pathName;

            if (process.platform.indexOf('win') >= 0) {
                routesPath = routesPath.replace(/\\/g, "\/");
            }

            pathName = pathName.replace('.js', '');
            pathName = pathName.split('/');
            var pName = '';
            pathName.forEach(function(p) {
                if(p){
                    var ps = p.split('-');
                    ps.forEach(function (v) {
                        pName += v.replace(/(\w)/, function(v) {
                            return v.toUpperCase()
                        });
                    });
                }
            });
            console.log(routesPath);
            routesNames.push(modulesName);
            imports.push("import " + modulesName + " from '"+routesPath+"';");
        }
    }
}

getRoutes(pagePath);
var fileString = imports.join('\n');
fileString += '\nexport default [].concat(\n    ';
fileString += routesNames.join(',\n    ');
fileString += '\n);\n';
fs.writeFileSync(path.join(__dirname, './src/page/AllRoutes.js'), fileString);
var endRoutes = new Date();
console.log('route completed, time ' + (endRoutes.getTime() - startRoutes.getTime()) + ' ms.');


/*
* 抓取java目录下route并生成server route
 */
var startServerRoutes = new Date();
var regexStr = /router\.([A-Z]+)\(\)\.route\((.*)\.with\((.*)\.class\,.*\"(.*)\"\)\;/g;
var serverRoutePath = path.join(__dirname, '../java/conf/Routes.java');
var serverRouteStr = fs.readFileSync(serverRoutePath, 'utf-8', function(err, data) {
    if (err) {
        // console.error(err);
        throw 'server routes文件路径不对';
    } else {
        console.log(data);
    }
});
var serverRouteArray = serverRouteStr.match(regexStr);


var serverObjectArray = serverRouteArray.map((serverRoute) => {
    var routeObject = {};
    routeObject.type = serverRoute.split('().')[0].split('.')[1];
    routeObject.url = serverRoute.split('.route("')[1].split('").with')[0];
    routeObject.controllerName = serverRoute.split('.with(')[1].split('.class,')[0];
    if (serverRoute.split('.class, "')[1]) {
        routeObject.className = serverRoute.split('.class, "')[1].split('");')[0];
    } else {
        routeObject.className = serverRoute.split('.class,"')[1].split('");')[0];
    }
    return routeObject;
});

var routes = {};
serverObjectArray.forEach((route) => {
    routes[route.controllerName + '.' + route.className] = route;
});

var serverRouteString = 'const routes = ';
serverRouteString += JSON.stringify(routes);
serverRouteString += ';';
serverRouteString += '\n';
serverRouteString += 'exports.getRoute = (name) => {return routes[name];}';
fs.writeFileSync(path.join(__dirname, './src/server-routes/ServerRoutes.js'), serverRouteString);
console.log('server routes completed, time ' + (new Date().getTime() - startServerRoutes.getTime()) + ' ms.');

