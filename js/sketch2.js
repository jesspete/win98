let chartContainer;
let canvas;


function setup() {
  chartContainer = document.getElementById('chart-container');
  canvas = createCanvas(300, 300);
  canvas.parent(chartContainer);
  noLoop(); // Run once and stop
}
const centerX = 150; // Adjust the value as needed
const centerY = 150; // Adjust the value as needed
const outerRadius = 75; // Adjust the value as needed
const innerRadius = 25; // Adjust the value as needed
function drawSubjectChart() {
  background("#FEECD6");
  fill(0);
  noStroke();
  ellipseMode(RADIUS);

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
    fill(color);

    let wedgeSize = map(count, 0, totalCount, 0, TAU);
    let angleStop = angleStart + wedgeSize;
    arc(centerX, centerY, outerRadius, outerRadius, angleStart, angleStop);
    angleStart = angleStop;
    colorIndex++;
  }

  // knock a hole out of the middle
  fill("#FEECD6");
  ellipse(centerX, centerY, innerRadius, innerRadius);

  // draw the legend
  let legendX = 207;
  let y = 220;
  let legendBox = 6;
  noStroke();
  textAlign(LEFT);
  colorIndex = 0;

  for (let [subject, _] of filteredSubjects) {
    let color = colors[colorIndex % colors.length];
    fill(color);
    rect(legendX, y - legendBox, legendBox, legendBox);
    fill(0);
    textSize(10);
    text(subject, legendX + legendBox + 3, y);
    y += 15;
    colorIndex++;
  }

  fill(0);
  textAlign(CENTER);
  textSize(12);
  text("Top 5 Zine Subjects", width / 2, 50);
}

function updateSubjectChart(data) {
  subjectCounts = data;
  if (canvas) {
    drawSubjectChart(); // Call the drawSubjectChart function to draw the chart
  }
}

