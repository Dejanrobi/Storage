// importing the firebase app
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.11.0/firebase-auth.js";

//importing the storage buckets
import {
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
  getBlob,
} from "https://www.gstatic.com/firebasejs/9.11.0/firebase-storage.js";

//setting up the configuration details
const firebaseApp = initializeApp({
  storageBucket: "gs://cloud-storage-1eb88.appspot.com/",
  apiKey: "AIzaSyBD8Z5g6-dpU3IDi8EC8kdgw_rtVLeiiR8",
  authDomain: "cloud-storage-1eb88.firebaseapp.com",
  projectId: "cloud-storage-1eb88",
  storageBucket: "cloud-storage-1eb88.appspot.com",
  messagingSenderId: "428945643052",
  appId: "1:428945643052:web:98d356948f8708b6096389",
  measurementId: "G-HCTKCLLQPS",
});

//initializing the storage
const storage = getStorage(firebaseApp);

const downloadButton = document.querySelector(".download");
const imageDownload = document.querySelector(".img-download");
let files;
//Getting elements on the document
const inputFile = document.querySelector(".input-file");
const uploadButton = document.querySelector(".upload-button");
const cancelButton = document.querySelector(".cancel");
const pauseButton = document.querySelector(".pause");
const resumeButton = document.querySelector(".resume");
const uploadProgress = document.querySelector(".uploadProgress");
const anchorLink = document.querySelector(".download-anchor");

inputFile.addEventListener("change", (e) => {
  files = e.target.files[0];
  // console.log(files.name);
});

// //Uploading the file
// uploadButton.addEventListener("click", () => {
//   //creating a storage ref
//   let imageRef = ref(storage, `images/${files.name}`);

//   //uploading the file by passing the imageRef and then the file
//   const uploadTask = uploadBytesResumable(imageRef, files);

//   cancelButton.addEventListener("click", () => {
//     uploadTask.cancel();
//   });

//   //Pause button
//   pauseButton.addEventListener("click", () => {
//     uploadTask.pause();
//   });

//   //Resume Button
//   resumeButton.addEventListener("click", () => {
//     uploadTask.resume();
//   });

//   uploadTask.on(
//     "state_changed",
//     function (snapshot) {
//       const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//       uploadProgress.innerHTML = "Upload " + progress + "%";

//       switch (snapshot.state) {
//         case "paused":
//           uploadProgress.innerHTML = "Upload Paused";
//           break;
//         case "resumed":
//           uploadProgress.innerHTML = "Upload " + progress + "%";
//           break;
//       }
//     },
//     (error) => {
//       switch (error.code) {
//         case "storage/canceled":
//           uploadProgress.innerHTML = "Upload Cancelled";
//           break;
//       }
//     },
//     () => {
//       //Upload completed successfully
//       alert("File Uploaded Successfully!!!!");
//       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//         console.log("File available at", downloadURL);
//       });
//     }
//   );

//   // uploadTask.cancel();
// });

downloadButton.addEventListener("click", () => {
  //creating a reference to the file we want to download

  const downloadRef = ref(storage, "images/IMG_5696.jpeg");

  //getting the download URL
  getDownloadURL(downloadRef)
    .then((url) => {
      // This can be downloaded directly:
      // imageDownload.setAttribute("src", url);
      const xhr = new XMLHttpRequest();
      xhr.responseType = "blob";
      xhr.onload = (event) => {
        const blob = xhr.response;
      };
      xhr.open("GET", url);
      xhr.send();

      // getBlob(url);
    })
    .catch((e) => {
      switch (e.code) {
        case "storage/unknown":
          alert("Storage Unknown");
          break;

        case "storage/object-not-found":
          alert("Object not found");
          break;
        case "storage/unauthorized":
          alert("Unauthorized");
          break;
        case "storage/canceled":
          alert("Canceled");
          break;
      }
    });
});
