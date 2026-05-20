import { supabaseService } from './database.js';
import { chartManager } from './charts.js';

class ApplicationLifecycleEngine {
    constructor() {
        this.activeRouteTabId = 'dashboard';
        this.activeExaminationTier = 'T1';
        this.timerWebWorkerThread = null;
        this.nativeAudioContextRegistry = null;
        this.liveStudyAccumulatorIntervalId = null;

        this.SUBJECTS_CORE_PALETTE = {
            "Quantitative Aptitude": "#4f46e5", "English Language": "#06b6d4",
            "Reasoning Intelligence": "#ec4899", "General Awareness": "#f59e0b",
            "Current Affairs": "#10b981", "Newspaper Analysis": "#8b5cf6",
            "Book Reading": "#3b82f6", "Calculation Practice": "#ef4444",
            "Formula Revision": "#014737", "Vocabulary Building": "#e11d48",
            "Mocks Engineering": "#64748b"
        };

        this.MASTER_SYLLABUS_DATA_DICTIONARY = {
            "QA": ["Percentage & Successive Fractions", "Profit, Loss & Discount Arrays", "Ratio, Proportion & Mixture Alligations", "Time, Speed, Distance & Relative Motion", "Geometry Triangles, Circles & Coordinate Systems", "Algebra Polynomial Identities", "Trigonometry Heights, Distances & Maxima Minima", "Data Interpretation Bar, Pie & Line Graphs", "Calculation Speed Drills & Tables Matrix"],
            "EL": ["Grammar Rules Subject-Verb Agreement", "Tenses & Conditional Clauses", "Active Passive Voices Transformation", "Direct Indirect Narration Cascades", "Error Spotting & Sentence Improvement Blocks", "Vocabulary High Frequency Synonyms/Antonyms", "One Word Substitutions & Idiom Phrases", "Reading Comprehension Strategy Check", "Cloze Test Structural Context Elimination", "Para Jumbles Logical Chain Sequencing"],
            "GI": ["Analogy & Classification Matrices", "Coding-Decoding Alpha-Numeric Shifts", "Blood Relations Tree Mapping", "Direction Sense Coordinate Operations", "Syllogism Venn Diagram Logical Sets", "Series Completion Missing Terms Check", "Dice, Cube & Paper Folding Visual Layouts", "Matrix Coding & Counting Figures Scaling", "Critical Reasoning Statement Assumptions"],
            "GA": ["Ancient, Medieval & Modern Indian History", "Indian Constitution Articles & Amendment Structures", "Physical, Economic & Political Geography Sets", "Macroeconomics & Five Year Planning Frameworks", "Physics, Chemistry & Biology Core Concepts", "Static General Knowledge Capitals, Currencies & National Parks", "Current Affairs Dynamic Monthly Capsules", "Editorial Analysis Daily Newspaper Drills"],
            "CS": ["Computer Fundamentals — Hardware, Software & OS Basics", "MS Office — Word, Excel, PowerPoint Shortcuts", "Internet Concepts — Browsers, Protocols, Email & Security", "Networking Basics — LAN, WAN, IP, DNS, HTTP", "Memory Types — RAM, ROM, Cache, Secondary Storage", "Input/Output Devices & Peripheral Units", "Number Systems — Binary, Octal, Hexadecimal Conversions", "Database Concepts — DBMS, SQL Basics", "Cybersecurity Threats — Virus, Malware, Phishing, Firewall", "Shortcut Keys & File Management Operations"]
        };

        this.scientificPomodoroRulesEngineMatrix = {
            "Quantitative Aptitude": { rec: "🧠 <b>Quant System:</b> Deep analytical logic chains require high-level cognitive stability loops. Apps recommend <b>60 Mins Hyperfocus / 15 Mins Break</b> slabs to protect formulas mapping.", time: "60" },
            "English Language": { rec: "⚡ <b>English Language:</b> Error spotting matrices and denses high-frequency vocab rules are memory dependent. Recommended balance is <b>45 Mins Focus / 10 Mins Break</b> blocks.", time: "45" },
            "Reasoning Intelligence": { rec: "🧩 <b>Reasoning Intelligence:</b> Matrix diagnostics checks and tree relations work best in deep flow states. Standard profile uses <b>45 Mins Focus / 10 Mins Break</b> intervals.", time: "45" },
            "General Awareness": { rec: "⏱️ <b>General Awareness:</b> Memory retention for Static GK Capsules and editorial logs behavior operates finest in short sprints: <b>25 Mins Focus / 5 Mins Break</b>.", time: "25" },
            "Current Affairs": { rec: "📰 <b>Current Affairs Sprints:</b> Fast dynamic text digestion blocks respond highly efficiently to quick bursts. Recommended standard is <b>25 Mins Focus / 5 Mins Break</b> cycles.", time: "25" },
            "Newspaper Analysis": { rec: "📑 <b>Newspaper Reading:</b> Editorial scanning behaves perfectly across rapid tracking cycles. Standard apps advice <b>25 Mins Sprint / 5 Mins Break</b>.", time: "25" },
            "Book Reading": { rec: "📖 <b>Textbook Slabs:</b> Constant reading cycles maintain supreme momentum inside standard focus blocks: <b>30 Mins Focus / 5 Mins Break</b>.", time: "30" },
            "Calculation Practice": { rec: "🔢 <b>Calculation Drills:</b> Daily speed mathematics table drills execute cleanly inside compact intervals: <b>25 Mins Sprint / 5 Mins Break</b>.", time: "25" },
            "Formula Revision": { rec: "📐 <b>Formula Log Frameworks:</b> Fast memory triggers revision loops work elegantly across <b>25 Mins Sprint / 5 Mins Break</b> intervals.", time: "25" },
            "Vocabulary Building": { rec: "📕 <b>Vocab Tracking Cards:</b> Repetitive memorization curves optimize flawlessly inside shorter target bursts: <b>25 Mins Sprint / 5 Mins Break</b>.", time: "25" },
            "Mocks Engineering": { rec: "🏆 <b>Assessment Deck:</b> Sectional mocks or composite multi-subject sheets require un-interrupted marathon hyperfocus blocks: <b>60 Mins Extreme focus / 15 Mins Rest</b>.", time: "60" }
        };
    }

    initializeLifecycleWiring() {
        this.restoreSystemThemeModeConfiguration();
        this.generateCompositeScoreFormsLayout();
        this.bindUserInterfaceActionTriggers();
        
        if (supabaseService.hasSavedCredentials()) {
            this.bootCloudConnectionPipeline();
        } else {
            document.getElementById('app-credentials-setup-modal-shroud').classList.remove('hidden');
        }
        this.restoreResilientTimerStateOnLifecycleReload();
    }

    bindUserInterfaceActionTriggers() {
        document.getElementById('themeToggleButton').onclick = () => this.toggleSystemThemeModeConfiguration();
        document.getElementById('btn-establish-pipeline-trigger').onclick = () => this.authenticateAppInitializationSequence();
        document.getElementById('btn-global-logout-trigger').onclick = () => this.executeManualLogOutAction();
        
        ['dashboard', 'timer', 'mocks', 'syllabus'].forEach(tabId => {
            document.getElementById(`tab-btn-${tabId}`).onclick = () => this.switchNavigationRouteTab(tabId);
        });

        document.getElementById('pomodoro-subject-dropdown').oninput = () => this.adaptScientificPomodoroRecommendation();
        document.getElementById('btn-add-custom-subject').onclick = () => this.executeAddCustomSubjectPipeline();
        document.getElementById('btn-pomodoro-primary-toggle').onclick = () => this.togglePomodoroEngineState();
        document.getElementById('btn-pomodoro-reset-kill').onclick = () => this.resetPomodoroEngineState();
        document.getElementById('btn-pomodoro-done-early').onclick = () => this.submitEarlySessionCompletion();

        document.getElementById('btn-tier-toggle-t1').onclick = () => this.setMockExaminationTier('T1');
        document.getElementById('btn-tier-toggle-t2').onclick = () => this.setMockExaminationTier('T2');
        document.getElementById('btn-tier-toggle-sec').onclick = () => this.setMockExaminationTier('SEC');
        document.getElementById('btn-commit-mock-sheet').onclick = () => this.submitCompositeMockDataToCloud();
        document.getElementById('btn-add-syllabus-topic').onclick = () => this.executeAddCustomSyllabusTopicPipeline();
    }

    async bootCloudConnectionPipeline() {
        const credentials = supabaseService.getSavedCredentials();
        document.getElementById('identity-visual-name-anchor').innerText = credentials.userName;
        document.getElementById('active-profile-identity-banner').classList.remove('hidden');
        document.getElementById('btn-global-logout-trigger').classList.remove('hidden');
        document.getElementById('identity-your-live-name').innerText = `${credentials.userName} (You)`;

        supabaseService.initializeClient();
        document.getElementById('app-credentials-setup-modal-shroud').classList.add('hidden');
        await this.populateSubjectsInterfaceDropdowns();
        this.adaptScientificPomodoroRecommendation();
        
        // Instant Boot execution sequence to populate cards and graphs immediately
        await this.triggerMasterDatabaseSynchronizationRefresh();
        await this.renderSyllabusMilestonesChecklistInterface();
        await this.fetchAndRenderLiveUsers();

        // Balanced active polling execution rates
        setInterval(() => this.triggerMasterDatabaseSynchronizationRefresh(), 15000);
        setInterval(() => this.fetchAndRenderLiveUsers(), 15000);
        setInterval(() => this.populateSubjectsInterfaceDropdowns(), 60000);
    }

    authenticateAppInitializationSequence() {
        const url = document.getElementById('setup-credentials-supabase-url').value.trim();
        const anonKey = document.getElementById('setup-credentials-supabase-anon-key').value.trim();
        const userName = document.getElementById('setup-credentials-user-profile-name').value.trim();

        if (!url || !anonKey || !userName) {
            this.triggerToastNotificationPopup("All authentication parameters are required.", "error");
            return;
        }

        supabaseService.saveCredentials(url, anonKey, userName);
        this.bootCloudConnectionPipeline();
    }

    executeManualLogOutAction() {
        if (!confirm("Bhai, kya aap sach mein tracker session end karke logging parameters clear karna chahte hain?")) return;
        supabaseService.clearCredentials();
        location.reload();
    }

    switchNavigationRouteTab(targetTabId) {
        this.activeRouteTabId = targetTabId;
        ['dashboard', 'timer', 'mocks', 'syllabus'].forEach(tab => {
            const panel = document.getElementById(`view-panel-${tab}`);
            const btn = document.getElementById(`tab-btn-${tab}`);
            if (tab === targetTabId) {
                panel.classList.remove('hidden'); panel.classList.add('block');
                btn.classList.add('border-indigo-600', 'text-indigo-600');
                btn.classList.remove('border-transparent', 'text-[var(--text-muted)]');
            } else {
                panel.classList.remove('block'); panel.classList.add('hidden');
                btn.classList.remove('border-indigo-600', 'text-indigo-600');
                btn.classList.add('border-transparent', 'text-[var(--text-muted)]');
            }
        });
        this.triggerMasterDatabaseSynchronizationRefresh();
    }

    async triggerMasterDatabaseSynchronizationRefresh() {
        if (!supabaseService.client) return;
        try {
            const activeUserNameText = supabaseService.getSavedCredentials().userName;
            const studyLogsData = await supabaseService.fetchTableRecords('sessions');
            const mockLogsData = await supabaseService.fetchTableRecords('mock_tests');

            let dailyAccumulatedMinutesYourself = 0;
            let dailyAccumulatedMinutesBuddyPeer = 0;
            let activeBuddyIdentityName = 'Study Buddy';

            const myStudyTableBody = document.getElementById('table-body-my-sessions-logs');
            const peerStudyTableBody = document.getElementById('table-body-peer-sessions-logs');
            const myMocksTableBody = document.getElementById('table-body-my-mocks-logs');
            const peerMocksTableBody = document.getElementById('table-body-peer-mocks-logs');

            if (myStudyTableBody) myStudyTableBody.innerHTML = '';
            if (peerStudyTableBody) peerStudyTableBody.innerHTML = '';
            if (myMocksTableBody) myMocksTableBody.innerHTML = '';
            if (peerMocksTableBody) peerMocksTableBody.innerHTML = '';

            studyLogsData.forEach(sessionRow => {
                const rowDurationInt = parseInt(sessionRow.duration || 0);
                const timestampLocalDate = new Date(sessionRow.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                const color = this.SUBJECTS_CORE_PALETTE[sessionRow.subject_name] || '#64748b';

                if (sessionRow.user_name === activeUserNameText) {
                    dailyAccumulatedMinutesYourself += rowDurationInt;
                    if (myStudyTableBody) {
                        myStudyTableBody.innerHTML += `
                            <tr class="border-b border-[var(--border-ui)]">
                                <td class="p-2 text-slate-400 font-mono">${timestampLocalDate}</td>
                                <td class="p-2"><span class="px-2 py-0.5 rounded text-[10px] font-black text-white" style="background-color:${color}">${sessionRow.subject_name || 'General'}</span></td>
                                <td class="p-2 font-bold tabular-nums">${rowDurationInt}m</td>
                                <td class="p-2 text-right"><button data-id="${sessionRow.id}" class="btn-del-session text-rose-500 font-bold cursor-pointer text-[13px]">🗑️</button></td>
                            </tr>`;
                    }
                } else {
                    dailyAccumulatedMinutesBuddyPeer += rowDurationInt;
                    if (sessionRow.user_name && sessionRow.user_name !== activeUserNameText) {
                        activeBuddyIdentityName = sessionRow.user_name;
                    }
                    if (peerStudyTableBody) {
                        peerStudyTableBody.innerHTML += `
                            <tr class="border-b border-[var(--border-ui)]">
                                <td class="p-2 font-black text-rose-500">${sessionRow.user_name}</td>
                                <td class="p-2"><span class="px-2 py-0.5 rounded text-[10px] font-black text-white" style="background-color:${color}">${sessionRow.subject_name || 'General'}</span></td>
                                <td class="p-2 font-bold tabular-nums">${rowDurationInt}m</td>
                            </tr>`;
                    }
                }
            });

            document.querySelectorAll('.btn-del-session').forEach(btn => {
                btn.onclick = (e) => this.executeRecordDeletionSequencePipeline('sessions', e.currentTarget.dataset.id);
            });

            document.getElementById('identity-buddy-live-name').innerText = activeBuddyIdentityName;
            document.getElementById('versus-your-time-display').innerText = `${Math.floor(dailyAccumulatedMinutesYourself/60)}h ${(dailyAccumulatedMinutesYourself%60).toString().padStart(2,'0')}m`;
            document.getElementById('versus-buddy-time-display').innerText = `${Math.floor(dailyAccumulatedMinutesBuddyPeer/60)}h ${(dailyAccumulatedMinutesBuddyPeer%60).toString().padStart(2,'0')}m`;

            const alertBox = document.getElementById('versus-battle-status-alert');
            if (dailyAccumulatedMinutesYourself > dailyAccumulatedMinutesBuddyPeer) {
                const diff = dailyAccumulatedMinutesYourself - dailyAccumulatedMinutesBuddyPeer;
                alertBox.innerText = `🔥 You are leading by ${Math.floor(diff/60)}h ${(diff%60).toString().padStart(2,'0')}m! Keep it up Warrior 💪`;
            } else if (dailyAccumulatedMinutesBuddyPeer > dailyAccumulatedMinutesYourself) {
                const diff = dailyAccumulatedMinutesBuddyPeer - dailyAccumulatedMinutesYourself;
                alertBox.innerText = `⚠️ ${activeBuddyIdentityName} leads by ${Math.floor(diff/60)}h ${(diff%60).toString().padStart(2,'0')}m. Push harder!`;
            } else {
                alertBox.innerText = "🤝 Match Tied exactly down to the baseline. Zero deviation grid lock!";
            }

            document.getElementById('stat-metrics-total-study-hours').innerText = `${Math.floor(dailyAccumulatedMinutesYourself/60)}h ${(dailyAccumulatedMinutesYourself%60).toString().padStart(2,'0')}m`;
            document.getElementById('stat-metrics-mock-count-index').innerText = mockLogsData.filter(m => m.user_name === activeUserNameText).length;

            mockLogsData.forEach(row => {
                const pct = row.total > 0 ? Math.round((row.score / row.total) * 100) : 0;
                const badgeStyle = pct >= 78 ? "bg-emerald-100 text-emerald-700 border border-emerald-200" : "bg-indigo-100 text-indigo-700 border border-indigo-200";
                const title = row.mock_name || row.name || "Assessment Test";

                if (row.user_name === activeUserNameText) {
                    if (myMocksTableBody) {
                        myMocksTableBody.innerHTML += `
                            <tr class="border-b border-[var(--border-ui)]">
                                <td class="py-2 px-2 font-bold">${title}</td>
                                <td class="py-2 px-2"><span class="px-1.5 py-0.5 bg-slate-200 rounded text-[10px] font-black">${row.subject || 'Mock'}</span></td>
                                <td class="py-2 px-2 font-mono text-[10px] text-slate-400">QA:${row.qa_score || 0}|GI:${row.gi_score || 0}|EL:${row.el_score || 0}|GA:${row.ga_score || 0}</td>
                                <td class="py-2 px-2"><span class="px-2 py-0.5 rounded-lg text-xs font-black ${badgeStyle}">${row.score}/${row.total} (${pct}%)</span></td>
                                <td class="py-2 px-2 text-right"><button data-id="${row.id}" class="btn-del-mock text-rose-500 font-bold cursor-pointer text-[13px]">🗑️</button></td>
                            </tr>`;
                    }
                } else {
                    if (peerMocksTableBody) {
                        peerMocksTableBody.innerHTML += `
                            <tr class="border-b border-[var(--border-ui)]">
                                <td class="py-2 px-2 font-bold">${title}</td>
                                <td class="py-2 px-2 font-semibold text-rose-500">${row.user_name}</td>
                                <td class="py-2 px-2"><span class="px-1.5 py-0.5 bg-slate-200 rounded text-[10px] font-black">${row.subject || 'Mock'}</span></td>
                                <td class="py-2 px-2 font-mono text-[10px] text-slate-400">QA:${row.qa_score || 0}|GI:${row.gi_score || 0}|EL:${row.el_score || 0}|GA:${row.ga_score || 0}</td>
                                <td class="py-2 px-2"><span class="px-2 py-0.5 rounded-lg text-xs font-black ${badgeStyle}">${row.score}/${row.total} (${pct}%)</span></td>
                            </tr>`;
                    }
                }
            });

            document.querySelectorAll('.btn-del-mock').forEach(btn => {
                btn.onclick = (e) => this.executeRecordDeletionSequencePipeline('mock_tests', e.currentTarget.dataset.id);
            });

            chartManager.renderDashboardCharts(
                studyLogsData.filter(s => s.user_name === activeUserNameText),
                mockLogsData,
                activeUserNameText,
                this.SUBJECTS_CORE_PALETTE
            );

        } catch (err) {
            console.error("Dashboard engine synchronization drop:", err);
        }
    }

    async fetchAndRenderLiveUsers() {
        if (!supabaseService.client) return;
        try {
            const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
            const { data, error } = await supabaseService.client
                .from('live_battlegrounds')
                .select('user_name, last_active_tick, current_subject')
                .gte('last_active_tick', fiveMinAgo);

            if (error) throw error;
            const panel = document.getElementById('live-users-panel');
            const list = document.getElementById('live-users-list');
            const myName = supabaseService.getSavedCredentials().userName;

            const seen = new Set();
            const liveUsers = [];
            (data || []).forEach(row => {
                if (!seen.has(row.user_name)) {
                    seen.add(row.user_name); liveUsers.push(row);
                }
            });

            if (liveUsers.length > 0) {
                panel.classList.remove('hidden');
                list.innerHTML = liveUsers.map(u => {
                    const isYou = u.user_name === myName;
                    return `<span class="px-2 py-1 rounded-full ${isYou ? 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400' : 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400'} font-bold">🟢 ${u.user_name} (${u.current_subject || 'Studying'})${isYou ? ' (You)' : ''}</span>`;
                }).join(' ');
            } else {
                panel.classList.add('hidden');
            }
        } catch (err) {
            console.error('Active heartbeat loops failure:', err);
        }
    }

    adaptScientificPomodoroRecommendation() {
        if (localStorage.getItem('pomodoro_engine_runtime_state') === 'RUNNING') return;
        const dropdown = document.getElementById('pomodoro-subject-dropdown');
        if (!dropdown) return;
        const key = dropdown.value;
        const rule = this.scientificPomodoroRulesEngineMatrix[key] || { rec: "🎯 Focus block initialized. Maintain target discipline.", time: "25" };

        document.getElementById('scientific-rec').innerHTML = rule.rec;
        document.getElementById('pomodoro-session-selector').value = rule.time;

        const minutes = parseInt(rule.time);
        document.getElementById('timer-display-minutes').innerText = minutes.toString().padStart(2, '0');
        document.getElementById('timer-display-seconds').innerText = "00";

        if (localStorage.getItem('pomodoro_engine_runtime_state') !== 'RUNNING') {
            localStorage.setItem('pomodoro_seconds_counter_remaining', (minutes * 60).toString());
        }
    }

    async togglePomodoroEngineState() {
        this.initializeNativeAudioPlaybackEngine();
        const btn = document.getElementById('btn-pomodoro-primary-toggle');
        const state = localStorage.getItem('pomodoro_engine_runtime_state') || 'STOPPED';

        if (state === 'RUNNING') {
            if (this.timerWebWorkerThread) this.timerWebWorkerThread.terminate();
            localStorage.setItem('pomodoro_engine_runtime_state', 'STOPPED');
            btn.innerText = "Start Block";
            document.getElementById('pomodoro-state-badge').innerText = "⏸️ POMODORO PAUSED";
            document.getElementById('btn-pomodoro-done-early').classList.add('hidden');
            this.stopLiveStudyAccumulator();
        } else {
            let remaining = parseInt(localStorage.getItem('pomodoro_seconds_counter_remaining'));
            if (isNaN(remaining) || remaining <= 0) {
                const mins = parseInt(document.getElementById('pomodoro-session-selector').value || '25');
                remaining = mins * 60;
            }
            const cutoff = Date.now() + (remaining * 1000);
            localStorage.setItem('pomodoro_target_wallclock_cutoff', cutoff.toString());
            localStorage.setItem('pomodoro_engine_runtime_state', 'RUNNING');

            btn.innerText = "Pause Block";
            const isStudy = (localStorage.getItem('pomodoro_active_session_mode') || 'STUDY') === 'STUDY';
            if (isStudy) document.getElementById('btn-pomodoro-done-early').classList.remove('hidden');
            
            // Core Instant Sync Logic: Force immediate DB write when timer starts
            if (isStudy) {
                this.startLiveStudyAccumulator();
                if (supabaseService.client) {
                    const subject = document.getElementById('pomodoro-subject-dropdown').value || 'General';
                    const userName = supabaseService.getSavedCredentials().userName;
                    await supabaseService.client.from('live_battlegrounds').upsert([{
                        user_name: userName, current_subject: subject, last_active_tick: new Date().toISOString()
                    }], { onConflict: 'user_name' });
                    this.fetchAndRenderLiveUsers(); // Re-render local display instantly
                }
            }
            this.spawnContinuousWebWorkerCountdownLoop(cutoff);
        }
    }

    spawnContinuousWebWorkerCountdownLoop(targetEndTimeEpochMs) {
        if (this.timerWebWorkerThread) this.timerWebWorkerThread.terminate();

        const blobScript = new Blob([`
            let targetCutoff = null;
            self.onmessage = function(msg) {
                if (msg.data.command === 'START_LOOP') {
                    targetCutoff = msg.data.endTime;
                    function loop() {
                        const remaining = Math.max(0, Math.round((targetCutoff - Date.now()) / 1000));
                        self.postMessage({ secondsRemaining: remaining });
                        if (remaining > 0) setTimeout(loop, 1000);
                    }
                    loop();
                }
            };
        `], { type: 'application/javascript' });

        this.timerWebWorkerThread = new Worker(URL.createObjectURL(blobScript));
        this.timerWebWorkerThread.postMessage({ command: 'START_LOOP', endTime: targetEndTimeEpochMs });

        const badge = document.getElementById('pomodoro-state-badge');
        const mode = localStorage.getItem('pomodoro_active_session_mode') || 'STUDY';
        badge.innerText = mode === 'STUDY' ? "🎯 HYPERFOCUS WORK BLOCK ACTIVE" : "🍃 REST COMPLIANCE INTERVAL ACTIVE";

        this.timerWebWorkerThread.onmessage = (e) => {
            const left = e.data.secondsRemaining;
            localStorage.setItem('pomodoro_seconds_counter_remaining', left.toString());
            this.syncChronometerDisplayDigits(left);

            if (left <= 0) {
                this.timerWebWorkerThread.terminate();
                this.executePomodoroCascadeTransitionSequence();
            }
        };
    }

    async executePomodoroCascadeTransitionSequence() {
        this.fireNativeDigitalBeepAlertAlarm();
        const mode = localStorage.getItem('pomodoro_active_session_mode') || 'STUDY';
        const userName = supabaseService.getSavedCredentials().userName;

        let nextMode = 'REST', nextMins = 5;

        if (mode === 'STUDY') {
            const subject = document.getElementById('pomodoro-subject-dropdown').value || 'Quantitative Aptitude';
            const plannedMins = parseInt(document.getElementById('pomodoro-session-selector').value || '25');

            if (supabaseService.client) {
                const { error } = await supabaseService.client.from('sessions').insert([{
                    user_name: userName, duration: plannedMins, subject: subject, subject_name: subject, note: 'Automated Pomodoro Loop Commit Script'
                }]);
                if (!error) this.triggerToastNotificationPopup(`Focus Session Saved for ${subject}!`);
            }

            let streaks = parseInt(localStorage.getItem('pomodoro_completed_streaks_index') || '0') + 1;
            localStorage.setItem('pomodoro_completed_streaks_index', streaks.toString());
            document.getElementById('pomodoro-streak-counter-value').innerText = streaks;

            const threshold = parseInt(document.getElementById('pomodoro-long-break-trigger').value || '4');
            if (threshold > 0 && streaks % threshold === 0) {
                nextMode = 'LONG_REST'; nextMins = 15;
                this.triggerToastNotificationPopup("Excellent milestone streak! 15-minute long rest initialized.");
            } else {
                nextMode = 'REST'; nextMins = 5;
                this.triggerToastNotificationPopup("Study block complete! Enjoy a 5-minute short break.");
            }
        } else {
            nextMode = 'STUDY'; nextMins = parseInt(document.getElementById('pomodoro-session-selector').value || '25');
            this.triggerToastNotificationPopup("Break over! Focus block active, configure your vectors.");
        }

        localStorage.setItem('pomodoro_active_session_mode', nextMode);
        localStorage.setItem('pomodoro_seconds_counter_remaining', (nextMins * 60).toString());
        localStorage.setItem('pomodoro_engine_runtime_state', 'STOPPED');

        this.syncChronometerDisplayDigits(nextMins * 60);
        const badge = document.getElementById('pomodoro-state-badge');
        const btn = document.getElementById('btn-pomodoro-primary-toggle');

        if (nextMode === 'STUDY') {
            badge.innerText = '🎯 BREAK DONE — Press Start to Study'; btn.innerText = 'Start Block';
            document.getElementById('btn-pomodoro-done-early').classList.add('hidden');
            this.stopLiveStudyAccumulator();
        } else {
            const nextCutoff = Date.now() + (nextMins * 60 * 1000);
            localStorage.setItem('pomodoro_target_wallclock_cutoff', nextCutoff.toString());
            setTimeout(() => this.spawnContinuousWebWorkerCountdownLoop(nextCutoff), 500);
        }
    }

    async submitEarlySessionCompletion() {
        if ((localStorage.getItem('pomodoro_active_session_mode') || 'STUDY') !== 'STUDY') return;
        const planned = parseInt(document.getElementById('pomodoro-session-selector').value || '25');
        const remaining = parseInt(localStorage.getItem('pomodoro_seconds_counter_remaining') || '0');
        const elapsed = Math.max(1, Math.round((planned * 60 - remaining) / 60));

        const subject = document.getElementById('pomodoro-subject-dropdown').value || 'Quantitative Aptitude';
        const userName = supabaseService.getSavedCredentials().userName;

        if (supabaseService.client) {
            const { error } = await supabaseService.client.from('sessions').insert([{
                user_name: userName, duration: elapsed, subject: subject, subject_name: subject, note: `Early Submission — ${elapsed}m of ${planned}m planned`
            }]);
            if (!error) this.triggerToastNotificationPopup(`Saved ${elapsed}m early block for ${subject}!`);
        }

        let streaks = parseInt(localStorage.getItem('pomodoro_completed_streaks_index') || '0') + 1;
        localStorage.setItem('pomodoro_completed_streaks_index', streaks.toString());
        document.getElementById('pomodoro-streak-counter-value').innerText = streaks;

        this.resetPomodoroEngineState();
    }

    startLiveStudyAccumulator() {
        this.stopLiveStudyAccumulator();
        this.liveStudyAccumulatorIntervalId = setInterval(async () => {
            if (localStorage.getItem('pomodoro_engine_runtime_state') !== 'RUNNING') return;
            if (!supabaseService.client) return;
            const subject = document.getElementById('pomodoro-subject-dropdown').value || 'General';
            const userName = supabaseService.getSavedCredentials().userName;
            await supabaseService.client.from('live_battlegrounds').upsert([{
                user_name: userName, current_subject: subject, last_active_tick: new Date().toISOString()
            }], { onConflict: 'user_name' });
            this.fetchAndRenderLiveUsers(); // Instantly pull updates every minute
        }, 60000);
    }

    stopLiveStudyAccumulator() {
        if (this.liveStudyAccumulatorIntervalId) {
            clearInterval(this.liveStudyAccumulatorIntervalId);
            this.liveStudyAccumulatorIntervalId = null;
        }
    }

    resetPomodoroEngineState() {
        if (this.timerWebWorkerThread) this.timerWebWorkerThread.terminate();
        localStorage.setItem('pomodoro_engine_runtime_state', 'STOPPED');
        localStorage.setItem('pomodoro_active_session_mode', 'STUDY');
        const mins = parseInt(document.getElementById('pomodoro-session-selector').value || '25');
        localStorage.setItem('pomodoro_seconds_counter_remaining', (mins * 60).toString());
        this.syncChronometerDisplayDigits(mins * 60);
        document.getElementById('btn-pomodoro-primary-toggle').innerText = "Start Block";
        document.getElementById('pomodoro-state-badge').innerText = "🎯 FOCUS ENGINE READY";
        document.getElementById('btn-pomodoro-done-early').classList.add('hidden');
        this.stopLiveStudyAccumulator();
    }

    restoreResilientTimerStateOnLifecycleReload() {
        const state = localStorage.getItem('pomodoro_engine_runtime_state') || 'STOPPED';
        if (state === 'RUNNING') {
            const cutoff = parseInt(localStorage.getItem('pomodoro_target_wallclock_cutoff') || '0');
            const remaining = Math.round((cutoff - Date.now()) / 1000);

            if (remaining > 0) {
                localStorage.setItem('pomodoro_seconds_counter_remaining', remaining.toString());
                this.syncChronometerDisplayDigits(remaining);
                document.getElementById('btn-pomodoro-primary-toggle').innerText = "Pause Block";
                this.spawnContinuousWebWorkerCountdownLoop(cutoff);
            } else {
                localStorage.setItem('pomodoro_seconds_counter_remaining', '0');
                this.syncChronometerDisplayDigits(0);
                this.executePomodoroCascadeTransitionSequence();
            }
        } else {
            const cached = localStorage.getItem('pomodoro_seconds_counter_remaining');
            this.syncChronometerDisplayDigits(cached ? parseInt(cached) : parseInt(document.getElementById('pomodoro-session-selector').value || '25') * 60);
        }
        document.getElementById('pomodoro-streak-counter-value').innerText = localStorage.getItem('pomodoro_completed_streaks_index') || '0';
    }

    syncChronometerDisplayDigits(totalSeconds) {
        document.getElementById('timer-display-minutes').innerText = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
        document.getElementById('timer-display-seconds').innerText = (totalSeconds % 60).toString().padStart(2, '0');
    }

    initializeNativeAudioPlaybackEngine() {
        if (!this.nativeAudioContextRegistry) this.nativeAudioContextRegistry = new (window.AudioContext || window.webkitAudioContext)();
    }

    fireNativeDigitalBeepAlertAlarm() {
        try {
            this.initializeNativeAudioPlaybackEngine();
            if (this.nativeAudioContextRegistry.state === 'suspended') this.nativeAudioContextRegistry.resume();
            for (let i = 0; i < 4; i++) {
                const scheduleTime = this.nativeAudioContextRegistry.currentTime + (i * 0.25);
                const osc = this.nativeAudioContextRegistry.createOscillator();
                const gain = this.nativeAudioContextRegistry.createGain();
                osc.type = 'sine'; osc.frequency.setValueAtTime(987.77, scheduleTime);
                gain.gain.setValueAtTime(0.4, scheduleTime);
                gain.gain.exponentialRampToValueAtTime(0.01, scheduleTime + 0.18);
                osc.connect(gain); gain.connect(this.nativeAudioContextRegistry.destination);
                osc.start(scheduleTime); osc.stop(scheduleTime + 0.18);
            }
        } catch (e) { console.error("Audio trigger exceptions rules handle crash:", e); }
    }

    async populateSubjectsInterfaceDropdowns() {
        const dropdown = document.getElementById('pomodoro-subject-dropdown');
        if (!dropdown) return;
        const savedVal = dropdown.value; dropdown.innerHTML = '';
        const coreKeys = Object.keys(this.SUBJECTS_CORE_PALETTE);
        let cloudCustoms = [];
        if (supabaseService.client) {
            try {
                const { data } = await supabaseService.client.from('custom_subjects').select('subject_name');
                if (data) cloudCustoms = data.map(item => item.subject_name);
            } catch (e) {}
        }
        const unified = [...new Set([...coreKeys, ...cloudCustoms])];
        unified.forEach(sub => {
            const opt = document.createElement('option'); opt.value = sub; opt.innerText = sub; dropdown.appendChild(opt);
        });
        if (savedVal && unified.includes(savedVal)) dropdown.value = savedVal;
    }

    async executeAddCustomSubjectPipeline() {
        const input = document.getElementById('input-custom-subject-name');
        const title = input.value.trim();
        if (!title) return;
        if (supabaseService.client) {
            const { error } = await supabaseService.client.from('custom_subjects').insert([{ subject_name: title }]);
            if (!error) {
                this.triggerToastNotificationPopup(`Subject [${title}] saved seamlessly.`);
                input.value = ''; await this.populateSubjectsInterfaceDropdowns();
            }
        }
    }

    setMockExaminationTier(tierCode) {
        this.activeExaminationTier = tierCode;
        ['t1', 't2', 'sec'].forEach(t => {
            document.getElementById(`btn-tier-toggle-${t}`).className = tierCode === t.toUpperCase() ? 
                'py-2 font-black text-xs rounded-lg uppercase tracking-wider border border-indigo-600 bg-indigo-600 text-white transition-all duration-150 shadow-md cursor-pointer' :
                'py-2 font-black text-xs rounded-lg uppercase tracking-wider border border-[var(--border-ui)] text-[var(--text-muted)] bg-[var(--bg-primary)] hover:text-[var(--text-main)] transition-all duration-150 shadow-md cursor-pointer';
        });
        this.generateCompositeScoreFormsLayout();
    }

    generateCompositeScoreFormsLayout() {
        const container = document.getElementById('tier-score-inputs-container');
        if (!container) return;
        container.innerHTML = '';

        const blueprints = {
            "T1": [{ id: "qa", name: "Quantitative Aptitude", max: 50 }, { id: "gi", name: "Reasoning Intelligence", max: 50 }, { id: "el", name: "English Language", max: 50 }, { id: "ga", name: "General Awareness", max: 50 }],
            "T2": [{ id: "qa", name: "Mathematical Abilities (Sec I)", max: 90 }, { id: "gi", name: "Reasoning & General Intellect", max: 90 }, { id: "el", name: "English Lang & Comprehension", max: 135 }, { id: "ga", name: "General Awareness Segment", max: 75 }],
            "SEC": [{ id: "qa", name: "Quantitative Aptitude", max: 50 }, { id: "gi", name: "Reasoning Intelligence", max: 50 }, { id: "el", name: "English Language", max: 50 }, { id: "ga", name: "General Awareness", max: 50 }]
        };

        blueprints[this.activeExaminationTier].forEach(field => {
            const row = document.createElement('div'); row.className = "flex items-center justify-between gap-4";
            row.innerHTML = `
                <label class="text-xs font-semibold text-[var(--text-main)] flex-1">${field.name}</label>
                <div class="flex items-center gap-2 w-32 justify-end">
                    <input type="number" id="mock-segment-input-${field.id}" placeholder="0" min="0" max="${field.max}" class="mock-input-node w-16 p-1.5 rounded-lg ui-input text-center text-xs font-bold focus:outline-none focus:ring-1 focus:ring-indigo-500 tabular-nums">
                    <span class="text-xs text-[var(--text-muted)] font-bold">/ ${field.max}</span>
                </div>`;
            container.appendChild(row);
        });

        document.querySelectorAll('.mock-input-node').forEach(input => {
            input.oninput = (e) => {
                let val = parseInt(e.target.value); const max = parseInt(e.target.max);
                if (!isNaN(val) && val > max) e.target.value = max;
                if (!isNaN(val) && val < 0) e.target.value = 0;
                this.recalculateCompositeTotalScoreMetrics();
            };
        });
        this.recalculateCompositeTotalScoreMetrics();
    }

    recalculateCompositeTotalScoreMetrics() {
        const nodes = document.querySelectorAll('.mock-input-node');
        let earned = 0, totalMax = 0, secActive = 0;

        nodes.forEach(node => {
            const val = parseInt(node.value);
            if (!isNaN(val) && node.value !== "") {
                earned += val; if (this.activeExaminationTier === 'SEC') secActive++;
            }
        });

        if (this.activeExaminationTier === 'T1') {
            totalMax = 200;
        } else if (this.activeExaminationTier === 'T2') {
            totalMax = 390;
        } else if (this.activeExaminationTier === 'SEC') {
            totalMax = secActive > 0 ? secActive * 50 : 50;
        }

        document.getElementById('display-mock-live-computed-total-score').innerText = `${earned} / ${totalMax}`;
        return { earned, totalMax };
    }

    async submitCompositeMockDataToCloud() {
        const titleInput = document.getElementById('input-mock-provider-display-name');
        const title = titleInput.value.trim();
        const myName = supabaseService.getSavedCredentials().userName;
        if (!title) return;

        const qa = parseInt(document.getElementById('mock-segment-input-qa')?.value) || 0;
        const gi = parseInt(document.getElementById('mock-segment-input-gi')?.value) || 0;
        const el = parseInt(document.getElementById('mock-segment-input-el')?.value) || 0;
        const ga = parseInt(document.getElementById('mock-segment-input-ga')?.value) || 0;

        const calc = this.recalculateCompositeTotalScoreMetrics();

        if (supabaseService.client) {
            const { error } = await supabaseService.client.from('mock_tests').insert([{
                user_name: myName, mock_name: title, name: title, subject: this.activeExaminationTier, score: calc.earned, total: calc.totalMax,
                qa_score: qa, gi_score: gi, el_score: el, ga_score: ga
            }]);
            if (!error) {
                this.triggerToastNotificationPopup(`Mock Mark Sheet [${title}] saved successfully!`);
                titleInput.value = ''; this.generateCompositeScoreFormsLayout();
                this.triggerMasterDatabaseSynchronizationRefresh();
            }
        }
    }

    async renderSyllabusMilestonesChecklistInterface() {
        const grid = document.getElementById('syllabus-master-category-grid-box');
        if (!grid) return; grid.innerHTML = '';
        const headers = { "QA": "📐 Quant Aptitude", "EL": "📖 English Language", "GI": "🧠 Reasoning", "GA": "🌍 General Awareness", "CS": "💻 Computer Knowledge" };

        let doneMapping = {};
        if (supabaseService.client) {
            try {
                const { data } = await supabaseService.client.from('custom_topics').select('category, topic_name').eq('user_name', supabaseService.getSavedCredentials().userName);
                data?.forEach(item => { doneMapping[`${item.category}||${item.topic_name}`] = 'DONE'; });
            } catch (e) {}
        }

        let grandTotal = 0, totalDone = 0;

        Object.keys(this.MASTER_SYLLABUS_DATA_DICTIONARY).forEach(catKey => {
            const baseList = this.MASTER_SYLLABUS_DATA_DICTIONARY[catKey];
            const extendedList = JSON.parse(localStorage.getItem(`custom_syllabus_ext_${catKey}`) || '[]');
            const aggregateList = [...baseList, ...extendedList];

            const card = document.createElement('div'); card.className = "custom-card p-5 space-y-3";
            let html = `<h4 class="font-black text-sm text-indigo-500 border-b border-[var(--border-ui)] pb-2">${headers[catKey]}</h4>`;
            html += `<div class="space-y-2 max-h-[320px] overflow-y-auto pr-1">`;

            aggregateList.forEach(topic => {
                grandTotal++; const lookup = `${catKey}||${topic}`; const isDone = doneMapping[lookup] === 'DONE';
                if (isDone) totalDone++;
                const bgStyle = isDone ? "text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50/50 dark:bg-emerald-950/20" : "";

                html += `
                    <div class="flex items-center justify-between p-2.5 rounded-xl text-xs font-medium transition-colors border border-[var(--border-ui)] ${bgStyle}">
                        <span class="flex-1 pr-2 tracking-wide">${topic}</span>
                        <button data-cat="${catKey}" data-topic="${topic}" data-state="${isDone ? 'DONE' : 'TODO'}" class="btn-toggle-topic px-2 py-1 rounded bg-[var(--bg-card)] border border-[var(--border-ui)] font-bold text-[10px] uppercase hover:border-indigo-500 cursor-pointer transition-all duration-150">${isDone ? '✅ Done' : 'Mark Done'}</button>
                    </div>`;
            });
            html += `</div>`; card.innerHTML = html; grid.appendChild(card);
        });

        document.querySelectorAll('.btn-toggle-topic').forEach(btn => {
            btn.onclick = (e) => this.toggleSyllabusTopicCheckboxState(e.target.dataset.cat, e.target.dataset.topic, e.target.dataset.state);
        });

        const progressPercent = grandTotal > 0 ? Math.round((totalDone / grandTotal) * 100) : 0;
        document.getElementById('stat-metrics-syllabus-percent-display').innerText = `${progressPercent}%`;
        document.getElementById('stat-metrics-syllabus-progress-bar').style.width = `${progressPercent}%`;
    }

    async toggleSyllabusTopicCheckboxState(cat, topic, currentState) {
        if (!supabaseService.client) return;
        const userName = supabaseService.getSavedCredentials().userName;
        try {
            if (currentState === 'DONE') {
                await supabaseService.client.from('custom_topics').delete().eq('user_name', userName).eq('category', cat).eq('topic_name', topic);
            } else {
                await supabaseService.client.from('custom_topics').insert([{ user_name: userName, category: cat, topic_name: topic }]);
            }
            this.renderSyllabusMilestonesChecklistInterface();
        } catch (e) { this.triggerToastNotificationPopup("Syllabus state mutate failure context.", "error"); }
    }

    executeAddCustomSyllabusTopicPipeline() {
        const input = document.getElementById('input-new-syllabus-custom-topic-name');
        const cat = document.getElementById('select-new-syllabus-category-target').value;
        const text = input.value.trim();
        if (!text) return;

        const localExt = JSON.parse(localStorage.getItem(`custom_syllabus_ext_${cat}`) || '[]');
        localExt.push(text); localStorage.setItem(`custom_syllabus_ext_${cat}`, JSON.stringify(localExt));
        input.value = ''; this.renderSyllabusMilestonesChecklistInterface();
    }

    async executeRecordDeletionSequencePipeline(tableName, id) {
        if (!confirm("Are you completely sure you want to permanently delete this log item record from the cloud assets?")) return;
        if (supabaseService.client) {
            const { error } = await supabaseService.client.from(tableName).delete().eq('id', id);
            if (!error) {
                this.triggerToastNotificationPopup("Record successfully deleted.");
                this.triggerMasterDatabaseSynchronizationRefresh();
            }
        }
    }

    toggleSystemThemeModeConfiguration() {
        const mode = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', mode);
        localStorage.setItem('ssc_warriors_theme_config', mode);
        document.getElementById('themeToggleButton').innerText = mode === 'dark' ? '☀️' : '🌙';
        this.triggerMasterDatabaseSynchronizationRefresh();
    }

    restoreSystemThemeModeConfiguration() {
        const cached = localStorage.getItem('ssc_warriors_theme_config') || 'light';
        document.documentElement.setAttribute('data-theme', cached);
        document.getElementById('themeToggleButton').innerText = cached === 'dark' ? '☀️' : '🌙';
    }

    triggerToastNotificationPopup(msg, type = 'info') {
        const container = document.getElementById('ui-toast-notifications-delivery-stack-deck');
        const toast = document.createElement('div');
        const borderStyle = type === 'error' ? 'border-rose-500 text-rose-600 dark:text-rose-400' : 'border-emerald-500 text-emerald-600 dark:text-emerald-400';
        toast.className = `p-4 rounded-xl shadow-xl bg-[var(--bg-card)] border-l-4 ${borderStyle} text-xs font-bold transition-all duration-300 transform translate-y-2 opacity-0 flex items-center justify-between pointer-events-auto`;
        toast.innerHTML = `<span>${msg}</span><button class="ml-4 font-black text-slate-400 hover:text-slate-600">✕</button>`;
        container.appendChild(toast);
        setTimeout(() => toast.classList.remove('translate-y-2', 'opacity-0'), 10);
        toast.querySelector('button').onclick = () => toast.remove();
        setTimeout(() => { toast.classList.add('opacity-0'); setTimeout(() => toast.remove(), 300); }, 4000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.AppEngineInstance = new ApplicationLifecycleEngine();
    window.AppEngineInstance.initializeLifecycleWiring();
});
