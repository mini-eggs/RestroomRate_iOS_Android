
const DeviceInfo = require('react-native-device-info');

import {Actions} from 'react-native-router-flux'

const serialize = function(obj, prefix) {
    var str = [];
    for(var p in obj) {
        if (obj.hasOwnProperty(p)) {
            var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
            str.push(typeof v == "object" ?
                serialize(v, k) :
            encodeURIComponent(k) + "=" + encodeURIComponent(v));
        }
    }
    return str.join("&");
};

const register = function(Obj){
    return new Promise(function(resolve, reject){
        Obj.device = DeviceInfo.getUniqueID();
        let data = serialize(Obj);
        let url = 'https://restroomrate.herokuapp.com/api/register/?' + data;
        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(function(response){
            response.json().then(function(data){
                if(parseInt(data.status) == 1){
                    resolve(data.data);
                } else {
                    reject({text:'Something went wrong'});
                }
            });
        });
    })
};

const login = function(Obj){
    return new Promise(function(resolve, reject){
        Obj.device = DeviceInfo.getUniqueID();
        let data = serialize(Obj);
        let url = 'https://restroomrate.herokuapp.com/api/login/?' + data;
        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(function(response){
            response.json().then(function(data){
                if(parseInt(data.status) == 1){
                    resolve(data.data);
                } else {
                    reject({text:'Something went wrong'});
                }
            });
        });
    })
};

const logout = function(Obj){
    return new Promise(function(resolve, reject){
        Obj.device = DeviceInfo.getUniqueID();
        let data = serialize(Obj);
        let url = 'https://restroomrate.herokuapp.com/api/logout/?' + data;
        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(function(response){
            response.json().then(function(data){
                if(parseInt(data.status) == 1){
                    resolve(data.data);
                } else {
                    reject({text:'Something went wrong'});
                }
            });
        });
    })
};

const autoLogin = function(){
    return new Promise(function(resolve, reject){
        let Obj = {};
        Obj.device = DeviceInfo.getUniqueID();
        let data = serialize(Obj);
        let url = 'https://restroomrate.herokuapp.com/api/checkLogin/?' + data;
        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(function(response){
            response.json().then(function(data){
                if(parseInt(data.status) == 1){
                    resolve(data.data);
                } else {
                    reject({text:'Something went wrong'});
                }
            });
        });
    })
};

const getDataSwitch = (plainObj) => {
    return new Promise( (resolve, reject) => {

        if(!(Actions.location)){reject('Locations are not enabled')}

        let url =
            'https://restroomrate.herokuapp.com/api/data/' +
            '?type=' + plainObj.type +
            '&page=' + plainObj.page +
            '&length=' + plainObj.length +
            '&lat=' + plainObj.location.lat +
            '&long=' + plainObj.location.long +
            '&users_id=' + plainObj.users_id;

        console.log(url);

        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(function(response){
            response.json().then(function(data){
                if(parseInt(data.status) == 1){
                    resolve(data.data);
                } else {
                    reject(data);
                }
            }).catch( (err) => {
                reject(err);
            });
        }).catch( (err) => {
            reject(err);
        });
    });
};

const create = (plainObj) => {
    return new Promise( (complete, failure) => {

        let location = new Promise( (resolve,reject)=>{
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    Actions.location = {
                        lat: position.coords.latitude,
                        long: position.coords.longitude
                    };
                    resolve(Actions.location);
                },
                (error) => {
                    console.log('using fake location');
                    Actions.location = {
                        lat: 44,
                        long: -109
                    };
                    resolve(Actions.location);
                },
                {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000}
            );
        });

        location.done( (loc) => {

            if(!(Actions.user)){failure('Please login to do that');}

            let data = {
                name:plainObj.name,
                rate:plainObj.rate,
                desc:plainObj.description,
                file:plainObj.image,
                lat:loc.lat,
                long:loc.long,
                location:'Exact',
                users_id:Actions.user.users_id
            };

            data = serialize(data);

            let url = 'https://restroomrate.herokuapp.com/api/create/?' + data;

            fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            }).then(function(response){
                response.json().then(function(data){
                    if(parseInt(data.status) == 1){
                        complete(data.data);
                    } else {
                        failure(data);
                    }
                }).catch( (err) => {
                    failure(err);
                });
            }).catch( (err) => {
                failure(err);
            });
        });
    });
};

const deleteItem = (plainObj) => {
    return new Promise( (resolve, reject) => {

        if(!(Actions.user)){reject('Please login to do that');}

        let data = {
            rate_id:plainObj.rate_id,
            users_id:Actions.user.users_id
        };

        data = serialize(data);

        let url = 'https://restroomrate.herokuapp.com/api/delete/?' + data;

        console.log(url);

        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(function(response){
            response.json().then(function(data){
                if(parseInt(data.status) == 1){
                    resolve(data.data);
                } else {
                    reject(data);
                }
            }).catch( (err) => {
                reject(err);
            });
        }).catch( (err) => {
            reject(err);
        });
    });
};

export default {
    login:login,
    register:register,
    logout:logout,
    autoLogin:autoLogin,
    getDataSwitch:getDataSwitch,
    create:create,
    deleteItem:deleteItem
}