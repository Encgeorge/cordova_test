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
    var uriContainer = document.createElement('div');

    // Generate a dynamic filename based on the current timestamp
    var timestamp = new Date().getTime(); // Get current timestamp
    var fileName = "captured_image_" + timestamp + ".jpg";

    // Initialize the File Transfer plugin
    var fileTransfer = new FileTransfer();

    // Define the options for downloading the file
    var fileTransferOptions = new FileTransferOptions();
    fileTransferOptions.create = true;
    fileTransferOptions.mimeType = "image/jpeg";

    // Define the URL where the file will be downloaded to
    var fileURL = cordova.file.externalCacheDirectory + fileName;

    // Download the file from the imageURI to the fileURL
    fileTransfer.download(
        imageURI,
        fileURL,
        function (entry) {
            // File download success
            console.log("File downloaded to: " + entry.toURL());

            // Set the src attribute of the imgElement to the downloaded file URL
            imgElement.src = entry.toURL();

            // Append the imgElement to the photoContainer
            photoContainer.appendChild(imgElement);
        },
        function (error) {
            // File download error
            console.error("File download error: " + JSON.stringify(error));
        },
        fileTransferOptions
    );

    // Set the text content of the uriContainer to the image URI
    uriContainer.textContent = "Image URI: " + imageURI;

    // Append the uriContainer to the photoContainer
    photoContainer.appendChild(uriContainer);

    // Set CSS style for imgElement
    imgElement.style.maxWidth = '100%';
}

function onPhotoFail(message) {
    alert('Failed because: ' + message);
}
