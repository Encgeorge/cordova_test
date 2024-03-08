document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    document.getElementById('captureButton').addEventListener('click', capturePhoto);
    checkConnection();
}

function capturePhoto() {
    var options = {
        quality: 80,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        mediaType: Camera.MediaType.CAMERA,
        encodingType: Camera.EncodingType.JPEG,
        saveToPhotoAlbum: true,
        correctOrientation: true
    };

    navigator.camera.getPicture(onPhotoSuccess, onPhotoFail, options);
}

function onPhotoSuccess(imageURI) {
    var photoContainer = document.getElementById('photoContainer');
    var imgElement = document.createElement('img');
    imgElement.src = "data:image/jpeg;base64," + imageURI;
    imgElement.style.maxWidth = '100%';
    photoContainer.appendChild(imgElement);

    // Get the current location
    getCurrentLocation();
   
}

function onPhotoFail(message) {
    alert('Failed because: ' + message);
}

function getCurrentLocation() {
    var geolocationOptions = {
        enableHighAccuracy: true,
        maximumAge: 3000,
        timeout: 5000
    };

    navigator.geolocation.getCurrentPosition(onLocationSuccess, onLocationError, geolocationOptions);
}

function onLocationSuccess(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    var locationContainer = document.createElement('div');
    locationContainer.textContent = "Latitude: " + latitude + ", Longitude: " + longitude;

    var photoContainer = document.getElementById('photoContainer');
    photoContainer.appendChild(locationContainer);
}

function onLocationError(error) {
    alert('Failed to get location: ' + error.message);
}

function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN] = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI] = 'WiFi connection';
    states[Connection.CELL_2G] = 'Cell 2G connection';
    states[Connection.CELL_3G] = 'Cell 3G connection';
    states[Connection.CELL_4G] = 'Cell 4G connection';
    states[Connection.CELL] = 'Cell generic connection';
    states[Connection.NONE] = 'No network connection';

    alert('Connection type: ' + states[networkState]);
}
