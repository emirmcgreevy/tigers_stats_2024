document.addEventListener('DOMContentLoaded', function () {
    function fetchDataAndRenderChart(stat) {
        fetch('static/tigers_regular_batting.json')
            .then(response => response.json())
            .then(data => {
                const ctx = document.getElementById('myChart')?.getContext('2d');
                if (!ctx) return;
                if (window.myChart) window.myChart.destroy();

                const labels = data.map(item => item.Name);
                const values = data.map(item => item[stat]);

                window.myChart = new Chart(ctx, {
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
            })
            .catch(err => console.error(err));
    }

    function fetchPitchDataAndRenderChart(stat) {
        fetch('static/tigers_regular_pitching.json')
            .then(response => response.json())
            .then(data => {
                const seasonCtx = document.getElementById('seasonChart')?.getContext('2d');
                if (!seasonCtx) return;
                if (window.seasonChart) window.seasonChart.destroy();

                const labels = data.map(item => item.Name);
                const values = data.map(item => item[stat]);

                window.seasonChart = new Chart(seasonCtx, {
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
            })
            .catch(err => console.error(err));
    }

    // Initial Data Load Example
    fetchDataAndRenderChart('G');  // Example stat 'G'
    fetchPitchDataAndRenderChart('GP');  // Example stat 'GP'

    // Update Charts When Selection Changes
    const statSelect = document.getElementById('stat-select');
    if (statSelect) {
        statSelect.addEventListener('change', (event) => {
            fetchDataAndRenderChart(event.target.value);
        });
    }

    const pitchingStatSelect = document.getElementById('pitch-stat-select');
    if (pitchingStatSelect) {
        pitchingStatSelect.addEventListener('change', (event) => {
            fetchPitchDataAndRenderChart(event.target.value);
        });
    }
});