let downloadsChartContainer;
let downloadsChartCanvas;
let subjectChartContainer;
let subjectChartCanvas;

function setup() {
  noLoop(); // Run once and stop
  textAlign(LEFT, TOP);

  fetchAllZines().then(() => {
    topDownloadedZines = getTopDownloadedZines(zineData);
    console.log(topDownloadedZines);

    const subjectCounts = countSubjects(zineData);
    console.log(subjectCounts);
    updateSubjectChart(subjectCounts);

    const downloadCounts = topDownloadedZines;
    console.log(downloadCounts);
    updateDownloadsChart(downloadCounts);
  });
}

function updateSubjectChart(data) {
  subjectChartContainer = document.getElementById('subject-chart-container');
  subjectChartCanvas = createCanvas(300, 300);
  subjectChartCanvas.parent(subjectChartContainer);
  
  subjectCounts = data;
  drawSubjectChart();
}

function updateDownloadsChart(data2) {
  downloadsChartContainer = document.getElementById('downloads-chart-container');
  downloadsChartCanvas = createCanvas(downloadsChartContainer.offsetWidth, downloadsChartContainer.offsetHeight);
  downloadsChartCanvas.parent(downloadsChartContainer);
  
  downloadCounts = data2;
  drawDownloadsChart();
}


// ... (drawChart function remains the same) ...
function drawDownloadsChart() {
  console.log("Drawing downloads chart"); // Debugging statement

  // Check if topDownloadedZines is defined and has data
  if (topDownloadedZines && topDownloadedZines.length > 0) {
    // Sort the zines based on download count in descending order
    topDownloadedZines.sort((a, b) => [0].downloads - [1].downloads);

    // Get the top 5 zines
    const top5Zines = topDownloadedZines.slice(0, 5);

    // Calculate the maximum download count for scaling
    const maxDownloads = top5Zines[0].downloads;

    // Set the chart dimensions and spacing
    const chartX = 25;
    const chartY = 25;
    const chartWidth = downloadsChartCanvas.width - 50;
    const chartHeight = canvas.height - 50;
    const barWidth = chartWidth / top5Zines.length;
    const barSpacing = 5;

    // Draw the bars
    for (let i = 0; i < top5Zines.length; i++) {
      const zine = top5Zines[i];
      const barHeight = map(zine.downloads, 0, maxDownloads, 0, chartHeight);
      const barX = chartX + i * (barWidth + barSpacing);
      const barY = chartY + chartHeight - barHeight;

      fill(0, 0, 127);
      rect(barX, barY, barWidth, barHeight);

      // Draw the zine title and download count
      fill(0);
      text(zine.title, barX, barY - 5);
      text(zine.downloads + " downloads", barX, barY - 2);
    }
  }
   else {
    console.log("topDownloadedZines data is not available or empty");
  }
}

function drawSubjectChart() {
  const centerX = subjectChartCanvas.width / 2;
  const centerY = subjectChartCanvas.height / 2;
  const outerRadius = subjectChartCanvas.width / 4;
  const innerRadius = subjectChartCanvas.width / 8;

  subjectChartCanvas.background("#FEECD6");
  subjectChartCanvas.fill(0);
  subjectChartCanvas.noStroke();
  subjectChartCanvas.ellipseMode(RADIUS);


  // Filter out subjects that include the word "zine" and sort based on count values
  const filteredSubjects = Object.entries(subjectCounts)
    .filter(([subject, _]) => !subject.toLowerCase().includes("zine"))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5); // Take the top 5 entries

  const totalCount = filteredSubjects.reduce((sum, [_, count]) => sum + count, 0);

  let angleStart = -HALF_PI; // start at the top
  let colorIndex = 0;
  const colors = ["#DEB3E0", "#A39FE1", "#FEC6DF", "#ff7f50", "#9BB8ED", "#FEECD6"]; // Add more colors if needed

  for (let [subject, count] of filteredSubjects) {
    let color = colors[colorIndex % colors.length];
    subjectChartCanvas.fill(color);
    let wedgeSize = map(count, 0, totalCount, 0, TAU);
    let angleStop = angleStart + wedgeSize;
    subjectChartCanvas.arc(centerX, centerY, outerRadius, outerRadius, angleStart, angleStop);
    angleStart = angleStop;
    colorIndex++;
  }

  // knock a hole out of the middle
  subjectChartCanvas.fill("#FEECD6");
  subjectChartCanvas.ellipse(centerX, centerY, innerRadius, innerRadius);

  // draw the legend
  let legendX = subjectChartCanvas.width - 100;
  let y = subjectChartCanvas.height - 80;
  let legendBox = 6;
  subjectChartCanvas.textAlign(LEFT);
  colorIndex = 0;

  for (let [subject, _] of filteredSubjects) {
    let color = colors[colorIndex % colors.length];
    subjectChartCanvas.fill(color);
    subjectChartCanvas.rect(legendX, y - legendBox, legendBox, legendBox);
    subjectChartCanvas.fill(0);
    subjectChartCanvas.textSize(10);
    subjectChartCanvas.text(subject, legendX + legendBox + 3, y);
    y += 15;
    colorIndex++;
  }

  subjectChartCanvas.fill(0);
  subjectChartCanvas.textAlign(CENTER);
  subjectChartCanvas.textSize(12);
  subjectChartCanvas.text("Top 5 Zine Subjects", subjectChartCanvas.width / 2, 20);
}

function updateSubjectChart(data) {
  subjectCounts = data;
  if (subjectChartCanvas) {
    drawSubjectChart(); // Call the drawSubjectChart function to draw the chart
  }
}

// function updateDownloadsChart(data2) {
//   downloadCounts = data2;
//   if (downloadsChartCanvas) {
//     drawDownloadsChart();
//   }
// }

// ... (mouseClicked and handleMouseClick functions remain the same) ...
function mouseClicked() {
  // Check if the mouse click is within the chart container
  if (mouseX >= 0 && mouseX <= subjectChartCanvas.width && mouseY >= 0 && mouseY <= subjectChartCanvas.height) {
    handleMouseClick(subjectChartCanvas, 'subject-chart-container');
  } else if (mouseX >= 0 && mouseX <= downloadsChartCanvas.width && mouseY >= 0 && mouseY <= downloadsChartCanvas.height) {
    handleMouseClick(downloadsChartCanvas, 'downloads-chart-container');
  }
}

function handleMouseClick(canvas, containerId) {
  // Check if topDownloadedZines is defined and has data
  if (topDownloadedZines && topDownloadedZines.length > 0) {
    // Check if the mouse is over any of the bars
    const top5Zines = topDownloadedZines.slice(0, 5);
    const barWidth = (canvas.width - 200) / top5Zines.length;
    const barSpacing = 10;

    for (let i = 0; i < top5Zines.length; i++) {
      const barX = 100 + i * (barWidth + barSpacing);
      if (mouseX >= barX && mouseX <= barX + barWidth && mouseY >= 100 && mouseY <= canvas.height - 100) {
        const zine = top5Zines[i];
        window.open(zine.url, "_blank");
        break;
      }
    }
  }
}