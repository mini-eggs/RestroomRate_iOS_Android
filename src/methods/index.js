import {Actions} from 'react-native-router-flux'
import API from '../api/'

function capitalizeFirstLetter(string) {

    return string.charAt(0).toUpperCase() + string.slice(1);
}
export {capitalizeFirstLetter}

function getItems(type, page, length, searchTerm = false){

    return new Promise( (complete, failure) => {

        let location = new Promise( (resolve,reject)=>{
            if(!(Actions.location)) {
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
            } else {
                resolve(Actions.location);
            }
        });

        location.done( (loc) => {

            let users_id = (Actions.user) ? Actions.user.users_id : '-1';

            let data = {
                type:type,
                page:page,
                length:length,
                users_id:users_id,
                location:loc
            };

            API.getDataSwitch(data).then( (items) => {
                complete(items);
            }).catch( (err) => {
                console.log(err);
                failure();
            });
        });
    });
}
export {getItems}


function fixImageURL(url){

    return url.replace('http://', 'https://').replace('.jpg', 'm.jpg');
}
export{fixImageURL}

function truncate(string, amount){
    if (string.length > amount)
        return string.substring(0,amount)+'...';
    else
        return string;
}
export {truncate}

function formatDate (date) {

    date = new Date(date);

    let monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    return monthNames[date.getMonth() -1] + ' ' + date.getDay() + ', 20' + (date.getYear()-100);
}
export {formatDate}