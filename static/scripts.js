document.addEventListener('DOMContentLoaded', function () {
    const selectElement = document.getElementById('stat-select');
    const ctx = document.getElementById('myChart').getContext('2d');
    const pitchSelectElement = document.getElementById('pitch-stat-select');
    const pitchCtx = document.getElementById('pitchChart').getContext('2d');

    let chart;
    let pitchChart;
    
    selectElement.addEventListener('change', (event) => {
        const selectedStat = event.target.value;
        fetchDataAndRenderChart(selectedStat);
    });

    pitchSelectElement.addEventListener('change', (event) => {
        const selectedPitchStat = event.target.value;
        fetchPitchDataAndRenderChart(selectedPitchStat);
    });

    function fetchDataAndRenderChart(stat) {
        fetch('/api/stats')
            .then(response => response.json())
            .then(data => {
                if (chart) {
                    chart.destroy();
                }
                const labels = data.map(item => item.Name);
                const values = data.map(item => item[stat]); // Use the selected stat here

                chart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: `Players by ${stat.toUpperCase()}`,
                            data: values,
                            backgroundColor: 'rgba(54, 162, 235, 0.2)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            });
    }

    function fetchPitchDataAndRenderChart(stat) {
        fetch('/api/pitching_stats')
            .then(response => response.json())
            .then(data => {
                if (pitchChart) {
                    pitchChart.destroy();
                }
                const labels = data.map(item => item.Name);
                const values = data.map(item => item[stat]); // Use the selected stat here

                pitchChart = new Chart(pitchCtx, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: `Pitchers by ${stat.toUpperCase()}`,
                            data: values,
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            });
    }

    // Initial render with default stat
    fetchDataAndRenderChart('G'); // Default to games played for hitters
    fetchPitchDataAndRenderChart('GP'); // Default to games played for pitchers
});