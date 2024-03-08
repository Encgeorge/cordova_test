document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    document.getElementById('captureButton').addEventListener('click', capturePhoto);
}

function capturePhoto() {
    var options = {
        quality: 80,
        saveToPhotoAlbum: true,
        destinationType: Camera.DestinationType.FILE_URI,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        correctOrientation: true
    };

    navigator.camera.getPicture(onPhotoSuccess, onPhotoFail, options);
}

function onPhotoSuccess(imageURI) {
    var photoContainer = document.getElementById('photoContainer');
    var imgElement = document.createElement('img');
    imgElement.src ="data:image/jpeg;base64," + imageURI;
    console.log(imageURI);
    console.log(imgElement);
    var uriContainer = document.createElement('div');
    uriContainer.textContent = "Image URI: " + imageURI;
    photoContainer.appendChild(uriContainer);
    imgElement.style.maxWidth = '100%';
    photoContainer.appendChild(imgElement);
}

function onPhotoFail(message) {
    alert('Failed because: ' + message);
}

