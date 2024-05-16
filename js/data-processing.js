console.log("data-processing script loaded");
let zineData = [];
let subjectCounts = {};
let topDownloadedZines = [];
let collectionCounts = {};
let collectionSubjectProfiles = {};

async function fetchAllZines() {
  console.log("Fetching all zines...");
  try {
    const url = `https://archive.org/advancedsearch.php?q=%28collection%3Asproutdistro+OR+collection%3Azines_inbox%29+AND+language%3A%28English+OR+eng%29+AND+date%3A%5B2010-01-01+TO+*%5D&fl%5B%5D=avg_rating&fl%5B%5D=btih&fl%5B%5D=collection&fl%5B%5D=contributor&fl%5B%5D=creator&fl%5B%5D=date&fl%5B%5D=description&fl%5B%5D=downloads&fl%5B%5D=format&fl%5B%5D=identifier&fl%5B%5D=imagecount&fl%5B%5D=language&fl%5B%5D=mediatype&fl%5B%5D=name&fl%5B%5D=num_reviews&fl%5B%5D=publisher&fl%5B%5D=source&fl%5B%5D=subject&fl%5B%5D=title&sort%5B%5D=&sort%5B%5D=&sort%5B%5D=&rows=1000&page=1&output=json`;
    console.log("Fetching zines from URL:", url);
    const response = await fetch(url);
    console.log("Response:", response);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    console.log("API Response:", result);
    if (result.response && result.response.docs) {
      zineData = result.response.docs;
    } else {
      console.error("Unexpected API response format:", result);
    }
  } catch (error) {
    console.error("error fetching zines to count:", error);
  }
}

function countSubjects(zineData) {
  const subjectCounts = {};
  zineData.forEach((zine) => {
    if (Array.isArray(zine.subject)) {
      zine.subject.forEach((subject) => {
        if (subject) {
          subject = subject.toLowerCase();
          if (subjectCounts[subject]) {
            subjectCounts[subject]++;
          } else {
            subjectCounts[subject] = 1;
          }
        }
      });
    } else if (typeof zine.subject === 'string') {
      const subject = zine.subject.toLowerCase();
      if (subjectCounts[subject]) {
        subjectCounts[subject]++;
      } else {
        subjectCounts[subject] = 1;
      }
    }
  });
  return subjectCounts;
}

function getTopDownloadedZines(zines) {
  const downloadCounts = zines.map((zine) => {
    return {
      title: zine.title,
      downloads: zine.downloads || 0,
      url: `https://archive.org/details/${zine.identifier}`
    };
  });
  return downloadCounts;
}

function getCollectionProfiles(zines) {
  const  collectionProfiles = {};
  zineData.forEach((zine) => {
    if (Array.isArray(zine.collection)) {
      zine.collection.forEach((collection) => {
        if (collection) {
          collection = collection.toLowerCase();
          if (collectionProfiles[collection]) {
            collectionProfiles[collection]++;
          } else {
            collectionProfiles[collection] = 1;
          }
        }
      });
    } else if (typeof zine.collection === 'string') {
      const collection = zine.collection.toLowerCase();
      if (collectionProfiles[collection]) {
        collectionProfiles[collection]++;
      } else {
        collectionProfiles[collection] = 1;
      }
    }
  });    return collectionProfiles;


}
 
function subjectCountPerCollection(zineData) {
  const collectionSubjectCounts = {
    zines_inbox: {},
    sproutdistro: {}
  };

  zineData.forEach((zine) => {
    if (Array.isArray(zine.collection)) {
      zine.collection.forEach((collection) => {
        if (collection) {
          collection = collection.toLowerCase();
          if (collection === 'zines_inbox' || collection === 'sproutdistro') {
            if (Array.isArray(zine.subject)) {
              zine.subject.forEach((subject) => {
                if (subject) {
                  subject = subject.toLowerCase();
                  if (collectionSubjectCounts[collection][subject]) {
                    collectionSubjectCounts[collection][subject]++;
                  } else {
                    collectionSubjectCounts[collection][subject] = 1;
                  }
                }
              });
            } else if (typeof zine.subject === 'string') {
              const subject = zine.subject.toLowerCase();
              if (collectionSubjectCounts[collection][subject]) {
                collectionSubjectCounts[collection][subject]++;
              } else {
                collectionSubjectCounts[collection][subject] = 1;
              }
            }
          }
        }
      });
    }
  });

  return collectionSubjectCounts;
}
 
  // const collectionSubProfiles = zines.map((zine) => {
  //   return {
  //     zine: zine.subject, 
  //     collection: zine.collection || "N/A" 
  //   };
  // });

// data-processing.js

function processData() {
  // Process the fetched data and assign the results to global variables
  subjectCounts = countSubjects(allZines);
  topDownloadedZines = getTopDownloadedZines(allZines);
  collectionCounts = countZinesPerCollection(allZines);
  collectionProfiles = getCollectionProfiles(allZines);
}

// ... (rest of the data processing functions)

// Call the fetchAllZines function and process the data when it's loaded


fetchAllZines().then(() => {
  const subjectCounts = countSubjects(zineData);
  console.log(subjectCounts);
   updateSubjectChart(subjectCounts);

  const downloadCounts = getTopDownloadedZines(zineData);
  console.log(downloadCounts);
  const collectionProfiles = getCollectionProfiles(zineData);
  console.log(collectionProfiles);
  const collectionSubjectCounts = subjectCountPerCollection(zineData);
  console.log(collectionSubjectCounts);  

});

  // Sort the zines based on their download count
//     // ...
//   }
  
//   function countZinesPerCollection(zines) {
//     // Count the number of zines in each collection
//     // ...
//   }
  
//   
  
//   function drawSubjectChart(subjectCounts) {
//     // Use p5.js to create a chart showing the most popular subjects
//     // ...
//   }
  
//   function drawDownloadsChart(topDownloadedZines) {
//    function setup() {
//   createCanvas(800, 800);
//   angleMode(DEGREES);
//   rectMode(BOTTOM);
//   for (let i = 0; i < 100; i = i + 1) {
//     let randomNumber = random(20, 80);
//     data.push(randomNumber);
//   }
//   maxData = max(data);
// }

// function draw() {
//   background(43, 53, 63);
//   fill(139, 171, 203);
//   stroke(89, 86, 74);

//   let angleSeparation = 360 / data.length;
//   let padding = 10;

//   if (frameCount <= 400) {
//     maxValue = constrain(frameCount * 2, 0, 400);
//   } else {
//     maxValue = 400;
//   }
//   let offset = 200;
//   let dataMultiplier = (height/2-offset-padding) / maxData;


//   for (let i = 0; i < data.length; i = i + 1) {
//     push();
//     let currentData = data[i];
//     let finalHeight = currentData * dataMultiplier;
//     let animatedHeight = map(maxValue, 0, 400, 0, finalHeight);
//     translate(width / 2, height / 2);
//     rotate(angleSeparation * i);
//     rect(0, offset, angleSeparation*2, animatedHeight);
//     text(Math.floor(currentData), offset-20, 0);
//     pop();
//   }


// } // Use p5.js to create a chart showing the zines with the most downloads
//     // ...
//   }
  
  // function drawCollectionChart(collectionCounts) {
  //   // Use p5.js to create a chart showing the collections with the most zines
  //   // ...
  // }
  
  // function drawCollectionSubjectChart(collectionSubjectProfiles) {
  //   // Use p5.js to create a chart showing the subject profile of each collection
  //   // ...
  // }
  
  // Call the fetchAllZines function and process the data when it's loaded
