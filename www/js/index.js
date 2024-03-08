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
    imgElement.src = imageURI;
    imgElement.style.maxWidth = '100%';
    photoContainer.innerHTML = '';
    photoContainer.appendChild(imgElement);
}

function onPhotoFail(message) {
    alert('Failed because: ' + message);
}

