document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    document.getElementById('captureButton').addEventListener('click', capturePhoto);
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
