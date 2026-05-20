class ChartVisualizationCanvasManager {
    constructor() {
        this.studyAllocationChartInstance = null;
        this.mockTrajectoryChartInstance = null;
        this.subjectRadarChartInstance = null;
    }

    cleanSlateCanvasElementContext(id) {
        const el = document.getElementById(id); if (!el) return null;
        const ctx = el.getContext('2d'); ctx.clearRect(0, 0, el.width, el.height);
        return ctx;
    }

    renderDashboardCharts(sessionLogs, mockSheetsLogs, currentUserName, corePaletteColors) {
        const subAccumulator = {};
        sessionLogs.forEach(log => {
            const sub = log.subject_name || "Unmapped Domain";
            subAccumulator[sub] = (subAccumulator[sub] || 0) + parseInt(log.duration || 0);
        });

        const studyLabels = Object.keys(subAccumulator);
        const studyData = Object.values(subAccumulator);
        const studyColors = studyLabels.map(lbl => corePaletteColors[lbl] || "#cbd5e1");

        const studyCtx = this.cleanSlateCanvasElementContext('canvas-analytics-study-allocation-chart');
        if (this.studyAllocationChartInstance) this.studyAllocationChartInstance.destroy();

        if (studyLabels.length === 0) {
            studyLabels.push("No Sessions Logged Today"); studyData.push(1); studyColors.push("#e2e8f0");
        }

        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const labelTextColor = isDark ? '#94a3b8' : '#64748b';

        this.studyAllocationChartInstance = new Chart(studyCtx, {
            type: 'doughnut',
            data: { labels: studyLabels, datasets: [{ data: studyData, backgroundColor: studyColors, borderWidth: 0 }] },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 11 }, color: labelTextColor } } }
            }
        });

        const sortedMocks = [...mockSheetsLogs].filter(m => m.user_name === currentUserName).sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        const mockLabels = sortedMocks.map((m, idx) => m.mock_name || `Mock #${idx + 1}`);
        const mockPercentages = sortedMocks.map(m => m.total > 0 ? Math.round((parseInt(m.score || 0) / parseInt(m.total)) * 100) : 0);

        const mockCtx = this.cleanSlateCanvasElementContext('canvas-analytics-mock-trajectory-chart');
        if (this.mockTrajectoryChartInstance) this.mockTrajectoryChartInstance.destroy();

        const targetLinePlugin = {
            id: 'nativeTargetLinePlugin',
            afterDraw: (chart) => {
                const { ctx, chartArea: { left, right }, scales: { y } } = chart; const yPixel = y.getPixelForValue(78);
                if (yPixel >= chart.chartArea.top && yPixel <= chart.chartArea.bottom) {
                    ctx.save(); ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 2; ctx.setLineDash([6, 4]);
                    ctx.beginPath(); ctx.moveTo(left, yPixel); ctx.lineTo(right, yPixel); ctx.stroke();
                    ctx.fillStyle = '#ef4444'; ctx.font = 'bold 10px sans-serif'; ctx.fillText('🎯 500 RANK TARGET (78%+)', left + 10, yPixel - 6); ctx.restore();
                }
            }
        };

        this.mockTrajectoryChartInstance = new Chart(mockCtx, {
            type: 'line',
            data: {
                labels: mockLabels.length > 0 ? mockLabels : ["No Mocks Logged"],
                datasets: [{ label: 'Aggregate Efficiency (%)', data: mockPercentages.length > 0 ? mockPercentages : [0], borderColor: '#4f46e5', backgroundColor: 'rgba(79, 70, 229, 0.05)', fill: true, tension: 0.25, borderWidth: 3, pointRadius: 4, pointBackgroundColor: '#4f46e5' }]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                scales: {
                    y: { min: 0, max: 100, ticks: { color: labelTextColor }, grid: { color: isDark ? '#334155' : '#f1f5f9' } },
                    x: { grid: { display: false }, ticks: { color: labelTextColor } }
                },
                plugins: { legend: { display: false } }
            },
            plugins: [targetLinePlugin]
        });

        this.renderMultiUserRadarChart(mockSheetsLogs, currentUserName, isDark);
    }

    renderMultiUserRadarChart(mockSheetsLogs, currentUserName, isDark) {
        let datasetAggregationMap = {};
        mockSheetsLogs.forEach(mockRow => {
            const userKey = mockRow.user_name || 'Warrior';
            if (!datasetAggregationMap[userKey]) datasetAggregationMap[userKey] = { QA: [], GI: [], EL: [], GA: [] };
            const tierMode = mockRow.subject || 'T1';
            const ceilings = {
                T1: { qa: 50, gi: 50, el: 50, ga: 50 },
                T2: { qa: 90, gi: 90, el: 135, ga: 75 },
                SEC: { qa: 50, gi: 50, el: 50, ga: 50 }
            };
            const currentCeiling = ceilings[tierMode] || ceilings.T1;
            if (mockRow.qa_score !== undefined) datasetAggregationMap[userKey].QA.push((mockRow.qa_score / currentCeiling.qa) * 100);
            if (mockRow.gi_score !== undefined) datasetAggregationMap[userKey].GI.push((mockRow.gi_score / currentCeiling.gi) * 100);
            if (mockRow.el_score !== undefined) datasetAggregationMap[userKey].EL.push((mockRow.el_score / currentCeiling.el) * 100);
            if (mockRow.ga_score !== undefined) datasetAggregationMap[userKey].GA.push((mockRow.ga_score / currentCeiling.ga) * 100);
        });

        const calcAvg = (arr) => arr.length === 0 ? 0 : Math.round(arr.reduce((a, b) => a + b, 0) / arr.length);
        let datasetsAssemblyArray = [];
        let hexColors = ['#4f46e5', '#06b6d4', '#ec4899', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'];
        let loopIdx = 0;

        for (let userKey in datasetAggregationMap) {
            const qaAvg = calcAvg(datasetAggregationMap[userKey].QA); const giAvg = calcAvg(datasetAggregationMap[userKey].GI);
            const elAvg = calcAvg(datasetAggregationMap[userKey].EL); const gaAvg = calcAvg(datasetAggregationMap[userKey].GA);

            const isMe = userKey === currentUserName;
            const clr = isMe ? '#4f46e5' : hexColors[loopIdx % hexColors.length]; loopIdx++; loopIdx++;
            if (!isMe) loopIdx++;

            datasetsAssemblyArray.push({
                label: isMe ? `🥇 You (${userKey})` : `👤 Warrior: ${userKey}`,
                data: [(qaAvg / 100) * 90, (giAvg / 100) * 90, (elAvg / 100) * 90, (gaAvg / 100) * 90],
                backgroundColor: isMe ? 'rgba(79, 70, 229, 0.15)' : `${clr}22`,
                borderColor: clr, borderWidth: isMe ? 3.5 : 2, pointBackgroundColor: clr, pointBorderColor: '#ffffff', pointRadius: isMe ? 5 : 4
            });
        }

        const radarCtx = this.cleanSlateCanvasElementContext('canvas-subject-radar-chart');
        if (this.subjectRadarChartInstance) this.subjectRadarChartInstance.destroy();

        this.subjectRadarChartInstance = new Chart(radarCtx, {
            type: 'radar',
            data: { labels: ['Quant Aptitude', 'Reasoning GI', 'English Lang', 'General Awareness'], datasets: datasetsAssemblyArray },
            options: {
                responsive: true, maintainAspectRatio: false,
                scales: {
                    r: {
                        min: 0, max: 90, grid: { color: isDark ? '#334155' : '#e2e8f0' },
                        pointLabels: { font: { size: 11, weight: 'bold' }, color: isDark ? '#94a3b8' : '#64748b' }, ticks: { display: false }
                    }
                },
                plugins: { legend: { position: 'top', labels: { color: isDark ? '#f8fafc' : '#0f172a', font: { weight: '600' } } } }
            }
        });
        this.renderSubjectStatusCards(datasetAggregationMap[currentUserName] || { QA: [], GI: [], EL: [], GA: [] }, isDark);
    }

    renderSubjectStatusCards(myAveragesMap, isDark) {
        const grid = document.getElementById('subject-performance-cards-grid'); if (!grid) return;
        const cfg = {
            QA: { short: 'QA', label: 'Quantitative Aptitude', color: '#4f46e5' },
            GI: { short: 'GI', label: 'Reasoning Intelligence', color: '#ec4899' },
            EL: { short: 'EL', label: 'English Language', color: '#06b6d4' },
            GA: { short: 'GA', label: 'General Awareness', color: '#f59e0b' }
        };

        const calcAvg = (arr) => arr.length === 0 ? 0 : Math.round(arr.reduce((a, b) => a + b, 0) / arr.length);
        const hasData = Object.values(myAveragesMap).some(arr => arr.length > 0);

        if (!hasData) {
            grid.innerHTML = `<div class="col-span-2 text-xs text-[var(--text-muted)] text-center py-8">No mock data yet. Submit a mock to see performance.</div>`; return;
        }

        grid.innerHTML = Object.entries(cfg).map(([key, sub]) => {
            const scores = myAveragesMap[key]; const avg = calcAvg(scores);
            if (scores.length === 0) {
                return `<div class="rounded-xl border border-[var(--border-ui)] p-3 bg-[var(--bg-card)] opacity-50"><div class="text-xs font-black uppercase tracking-widest" style="color:${sub.color}">${sub.short}</div><div class="text-xs text-[var(--text-muted)] mt-1">No data yet</div></div>`;
            }
            const verdict = avg >= 80 ? { text: 'Excellent 🏆', color: '#10b981', bg: isDark ? 'border-emerald-800' : 'border-emerald-200', style: isDark ? 'background:#052e16' : 'background:#f0fdf4' }
                : avg >= 70 ? { text: 'Good ✅', color: '#4f46e5', bg: isDark ? 'border-indigo-800' : 'border-indigo-200', style: isDark ? 'background:#1e1b4b' : 'background:#eef2ff' }
                : avg >= 55 ? { text: 'Average ⚠️', color: '#f59e0b', bg: isDark ? 'border-amber-800' : 'border-amber-200', style: isDark ? 'background:#2d1f00' : 'background:#fffbeb' }
                : { text: 'Needs Work 🔴', color: '#ef4444', bg: isDark ? 'border-red-800' : 'border-red-200', style: isDark ? 'background:#2d0000' : 'background:#fef2f2' };

            return `
                <div class="rounded-xl border p-3 ${verdict.bg}" style="${verdict.style}">
                    <div class="flex items-center justify-between mb-1"><span class="text-xs font-black uppercase tracking-widest" style="color:${sub.color}">${sub.short}</span><span class="text-[10px] font-bold" style="color:${verdict.color}">${verdict.text}</span></div>
                    <div class="text-2xl font-black tabular-nums" style="color:${sub.color}">${avg}%</div>
                    <div class="text-[10px] text-[var(--text-muted)] mt-0.5">${sub.label}</div>
                    <div class="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden"><div class="h-full rounded-full transition-all duration-700" style="width:${avg}%;background:${sub.color}"></div></div>
                </div>`;
        }).join('');
    }
}

export const chartManager = new ChartVisualizationCanvasManager();
