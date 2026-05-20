// Warriors Arena - Charting Engine
// Decouples true percentages for UI cards from radar spatial mapping constraints

function renderMultiUserRadarChart(mockSheetsLogs, currentUsername) {
    const ctx = document.getElementById('userRadarChart');
    if (!ctx) return;

    // Standard Tier Ceiling Configuration Bounding Matrix
    const ceilings = {
        'Tier 1': { qa: 50, lr: 50, eng: 50, ga: 50 },
        'Tier 2': { qa: 90, lr: 90, eng: 135, ga: 75 },
        'Sectional': { qa: 50, lr: 50, eng: 50, ga: 50 }
    };

    // Grouping records by user profiles
    const userGroups = {};
    mockSheetsLogs.forEach(mockRow => {
        const user = mockRow.username || 'Anonymous';
        if (!userGroups[user]) {
            userGroups[user] = { qa: [], lr: [], eng: [], ga: [] };
        }
        
        const tier = mockRow.tier_type || 'Tier 1';
        const ceiling = ceilings[tier] || ceilings['Tier 1'];

        // Map directly to true percentage efficiencies (0-100%)
        if (mockRow.qa_score !== undefined) userGroups[user].qa.push((mockRow.qa_score / ceiling.qa) * 100);
        if (mockRow.lr_score !== undefined) userGroups[user].lr.push((mockRow.lr_score / ceiling.lr) * 100);
        if (mockRow.eng_score !== undefined) userGroups[user].eng.push((mockRow.eng_score / ceiling.eng) * 100);
        if (mockRow.ga_score !== undefined) userGroups[user].ga.push((mockRow.ga_score / ceiling.ga) * 100);
    });

    const datasetsAssemblyArray = [];
    const hexColors = ['#00f0ff', '#ec4899', '#10b981', '#f59e0b'];
    let loopIdx = 0;

    const subjectsList = ['qa', 'lr', 'eng', 'ga'];
    
    // Process averages and scale securely for Radar Canvas Matrix bounds (0-90)
    for (const [user, dataObj] of Object.entries(userGroups)) {
        const trueAverages = [];
        subjectsList.forEach(sub => {
            const arr = dataObj[sub];
            const avg = arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;
            trueAverages.push(avg);
        });

        const isMe = user.toLowerCase() === currentUsername.toLowerCase();
        
        // Decouple color palette loop maps
        const clr = isMe ? '#4f46e5' : hexColors[loopIdx % hexColors.length];
        if (!isMe) loopIdx++;

        // Scale 0-100% true values down onto the 0-90 physical Radar display matrix bounds
        const spatialRadarData = trueAverages.map(val => (val * 90) / 100);

        datasetsAssemblyArray.push({
            label: isMe ? `You (${user})` : `Warrior: ${user}`,
            data: spatialRadarData,
            fill: isMe,
            backgroundColor: isMe ? 'rgba(79, 70, 229, 0.2)' : 'transparent',
            borderColor: clr,
            pointBackgroundColor: clr,
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: clr,
            borderWidth: isMe ? 3 : 2.5
        });
    }

    // Destroy existing chart instance to handle hot reloads perfectly
    if (window.radarChartInstance) {
        window.radarChartInstance.destroy();
    }

    window.radarChartInstance = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Quantitative Aptitude', 'Logical Reasoning', 'English Language', 'General Awareness'],
            datasets: datasetsAssemblyArray
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: { color: 'rgba(156, 163, 175, 0.2)' },
                    grid: { color: 'rgba(156, 163, 175, 0.2)' },
                    pointLabels: { font: { size: 11 }, color: '#6b7280' },
                    ticks: { display: false },
                    min: 0,
                    max: 90
                }
            },
            plugins: {
                legend: { position: 'top', labels: { color: '#374151', font: { weight: '600' } } }
            }
        }
    });
}
