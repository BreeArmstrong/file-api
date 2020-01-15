//IIFE
(function() {
  imageUploadHandler();
  fileUploadHandler();
  //need this to grab the files later
  window.files = [];
  uploadHandler();
}());

function imageUploadHandler(){
  //Specify the fileInput
  const fileInput = document.querySelector('input[accept="image/*"]');
  //Identify the container you want to attach it to
  const container = document.querySelector('.image');
  //Event listener and anonymous function
  fileInput.addEventListener('change', () => {
    //Store the file im a files array
    const file = fileInput.files[0];
    console.log(file);
    //Initiating a new Image:
    const img = new Image();
    
    //Here is where we read the image file as a data uri using FileReader
    const reader = new FileReader();
    //Create an event listener for load state ( EMPTY = 0, LOADING = 1, DONE = 2;) <-- from the docs
    reader.addEventListener('load', function () {
      //log the result of the file reader
      console.log(reader.result);
      //Set the image src to the render result
      img.src = reader.result;
    });
    //Reads the data from the image as a Data URL
    //data:[<mime type>][;charset=<charset>][;base64],<encoded data>
    reader.readAsDataURL(file);
    //Appends the image into the container
    container.appendChild(img);
  
    // Required for the upload
    window.files.push(file);
  })
}

function fileUploadHandler(){
  //Same as the image, we specify the file location we are changing
  const fileInput = document.querySelector('input[accept="text/plain"]');
  const container = document.querySelector('pre');
  
  //Add out event handler:
  fileInput.addEventListener('change', () => {
    //Match the file with the array of files from input
    const file = fileInput.files[0];
    console.log(file);
    
    //Read the file data
    const reader = new FileReader();
    //Event listener for the lode state
    reader.addEventListener('load', function () {
      //Log the result
      console.log(reader.result);
      //Change the html in the container to have the result
      container.innerHTML = reader.result;
    });
    //Tell the browser to read the file as a text (plain)
    reader.readAsText(file);
  
    // Required for the upload
    window.files.push(file);
  })
}

function uploadHandler() {
  //Grab the button from DOM, attach a listener on it
  document.querySelector('.upload-button').addEventListener('click', () => {
    //Create new Form Data
    const formData = new FormData();
    //Log the files that were uploaded
    console.log(window.files);
    //For each file, attach the filename and the file
    window.files.forEach((file, index) => formData.append(file.name, file));
    //Logout the data
    console.log(formData);
  })
}

// use this formData with axios or fetch
// Axios - https://stackoverflow.com/questions/47630163/axios-post-request-to-send-form-data
// Fetch - https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#Uploading_a_file