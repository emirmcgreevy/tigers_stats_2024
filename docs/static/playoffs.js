document.addEventListener('DOMContentLoaded', function () {
    const selectElement = document.getElementById('stat-select');
    const ctx = document.getElementById('batPostChart').getContext('2d');
    const pitchSelectElement = document.getElementById('pitch-stat-select');
    const pitchCtx = document.getElementById('pitchPostChart').getContext('2d');

    let batChart;
    let pitchPostChart;
    
    selectElement.addEventListener('change', (event) => {
        const selectedStat = event.target.value;
        fetchBatPostDataAndRenderChart(selectedStat);
    });

    pitchSelectElement.addEventListener('change', (event) => {
        const selectedPitchStat = event.target.value;
        fetchPostPitchDataAndRenderChart(selectedPitchStat);
    });

    function fetchBatPostDataAndRenderChart(stat) {
        fetch('/api/playoff_batting_stats')
            .then(response => response.json())
            .then(data => {
                if (batChart) {
                    batChart.destroy();
                }
                const labels = data.map(item => item.Name);
                const values = data.map(item => item[stat]); // Use the selected stat here

                batChart = new Chart(ctx, {
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

    function fetchPostPitchDataAndRenderChart(stat) {
        fetch('/api/playoff_pitching_stats')
            .then(response => response.json())
            .then(data => {
                if (pitchPostChart) {
                    pitchPostChart.destroy();
                }
                const labels = data.map(item => item.Name);
                const values = data.map(item => item[stat]); // Use the selected stat here

                pitchPostChart = new Chart(pitchCtx, {
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
    fetchBatPostDataAndRenderChart('G'); // Default to games played for hitters
    fetchPostPitchDataAndRenderChart('GP'); // Default to games played for pitchers
});