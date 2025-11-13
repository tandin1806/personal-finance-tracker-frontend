document.addEventListener('DOMContentLoaded', () => {
  // Donut Charts
  const donut1 = document.getElementById("donut1");
  const donut2 = document.getElementById("donut2");

  if (donut1 && donut2) {
    const ctx1 = donut1.getContext("2d");
    const ctx2 = donut2.getContext("2d");

    new Chart(ctx1, {
      type: "doughnut",
      data: {
        labels: ["Income", "Expense"],
        datasets: [
          {
            data: [30000, 16000],
            backgroundColor: ["#2e7d32", "#c62828"],
          },
        ],
      },
      options: {
        responsive: true,
        cutout: "75%",
        plugins: {
          legend: { display: false },
        },
      },
    });

    new Chart(ctx2, {
      type: "doughnut",
      data: {
        labels: ["Balance", "Used"],
        datasets: [
          {
            data: [36000, 16000],
            backgroundColor: ["#4caf50", "#ef5350"],
          },
        ],
      },
      options: {
        responsive: true,
        cutout: "75%",
        plugins: {
          legend: { display: false },
        },
      },
    });
  }

  // Bar Chart
  const barChart = document.getElementById("barChart");
  if (barChart) {
    const barCtx = barChart.getContext("2d");
    new Chart(barCtx, {
      type: "bar",
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "Income",
            data: [100, 60, 70, 50, 90, 30, 85],
            backgroundColor: "#2e7d32",
          },
          {
            label: "Expense",
            data: [80, 40, 60, 30, 70, 50, 75],
            backgroundColor: "#c62828",
          },
        ],
      },
      options: {
        responsive: true,
        scales: { y: { beginAtZero: true } },
        plugins: {
          legend: {
            labels: { font: { size: 14 } },
          },
        },
      },
    });
  }

  // Line Chart
  const lineChart = document.getElementById("lineChart");
  if (lineChart) {
    const lineCtx = lineChart.getContext("2d");
    new Chart(lineCtx, {
      type: "line",
      data: {
        labels: ["Aug 01", "Aug 03", "Aug 05", "Aug 07", "Aug 09"],
        datasets: [
          {
            label: "Balance",
            data: [15000, 15200, 15100, 18000, 21000],
            borderColor: "#388e3c",
            tension: 0.3,
            fill: false,
            pointRadius: 4,
            pointBackgroundColor: "#2e7d32",
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: { font: { size: 14 } },
          },
        },
        scales: {
          y: {
            beginAtZero: false,
            ticks: { font: { size: 13 } },
          },
          x: {
            ticks: { font: { size: 13 } },
          },
        },
      },
    });
  }
});
