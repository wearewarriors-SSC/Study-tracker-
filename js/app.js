// Warriors Arena - Core Application Lifecycle Engine
// Fully decoupled from ES modules to support global scope charting functions flawlessly

window.supabaseClientInstance = null;

// DOM Content Loaded - Initialization Bootstrapping Pipeline
document.addEventListener('DOMContentLoaded', () => {
    initializeApplicationWiring();
});

function initializeApplicationWiring() {
    const pipelineForm = document.getElementById('pipelineConnectionForm');
    if (pipelineForm) {
        pipelineForm.addEventListener('submit', handlePipelineEstablishment);
    }
    
    // Check if configuration parameters exist inside Local Storage
    const cachedUrl = localStorage.getItem('warriors_supabase_url');
    const cachedKey = localStorage.getItem('warriors_supabase_key');
    const cachedUser = localStorage.getItem('warriors_username');

    if (cachedUrl && cachedKey && cachedUser) {
        bootCloudConnectionPipeline(cachedUrl, cachedKey, cachedUser);
    } else {
        const modalShroud = document.getElementById('pipelineModalShroud');
        if (modalShroud) modalShroud.classList.remove('hidden');
    }

    setupLocalTimerInteractions();
}

function handlePipelineEstablishment(e) {
    e.preventDefault();
    const urlInput = document.getElementById('supabaseUrlInput').value.trim();
    const keyInput = document.getElementById('supabaseAnonKeyInput').value.trim();
    const userInput = document.getElementById('usernameInput').value.trim();

    if (!urlInput || !keyInput || !userInput) {
        alert('All connection pipeline credentials must be provided.');
        return;
    }

    localStorage.setItem('warriors_supabase_url', urlInput);
    localStorage.setItem('warriors_supabase_key', keyInput);
    localStorage.setItem('warriors_username', userInput);

    bootCloudConnectionPipeline(urlInput, keyInput, userInput);
}

function bootCloudConnectionPipeline(url, key, username) {
    try {
        if (!window.supabase || typeof window.supabase.createClient !== 'function') {
            throw new Error('Supabase integration script asset matrix not detected.');
        }

        window.supabaseClientInstance = window.supabase.createClient(url, key);
        
        const modalShroud = document.getElementById('pipelineModalShroud');
        if (modalShroud) modalShroud.classList.add('hidden');

        // Triggering Concurrent Operational Synchronizations
        fetchAndRenderLiveUsers();
        startGlobalSyncIntervals();
        
    } catch (err) {
        console.error('Pipeline Connection Exception:', err);
        alert('Failed to establish data pipeline framework. Verify parameters inside console.');
    }
}

// Focus Chronometer - Core Implementation with Instant Battlegrounds Sync Triggers
function setupLocalTimerInteractions() {
    const startBtn = document.getElementById('startTimerBtn');
    const stopBtn = document.getElementById('stopTimerBtn');
    if (!startBtn || !stopBtn) return;

    startBtn.addEventListener('click', () => {
        const durationSelect = document.getElementById('timerDurationSelect');
        const durationMinutes = durationSelect ? parseInt(durationSelect.value) : 25;
        
        localStorage.setItem('timer_running_state', 'RUNNING');
        localStorage.setItem('timer_initial_duration', durationMinutes);
        
        // Instant Real-time Broadcast Trigger for Live Synchronized Battlegrounds
        broadcastLiveActivityHeartbeat(durationMinutes + " Min Focus Block");
        
        console.log(`Focus block tracking initiated: ${durationMinutes} minutes.`);
    });

    stopBtn.addEventListener('click', () => {
        localStorage.removeItem('timer_running_state');
        broadcastLiveActivityHeartbeat("Idle / Reviewing");
    });
}

async function broadcastLiveActivityHeartbeat(statusText) {
    if (!window.supabaseClientInstance) return;
    const currentUsername = localStorage.getItem('warriors_username') || 'Anonymous';

    try {
        await window.supabaseClientInstance
            .from('live_battlegrounds')
            .upsert({ 
                username: currentUsername, 
                current_activity: statusText, 
                last_heartbeat: new Date().toISOString() 
            }, { onConflict: 'username' });
            
        // Instantly fetch backend data to clear out structural interface latency completely
        fetchAndRenderLiveUsers();
    } catch (error) {
        console.error('Activity transmission anomaly:', error);
    }
}

async function fetchAndRenderLiveUsers() {
    if (!window.supabaseClientInstance) return;
    const currentUsername = localStorage.getItem('warriors_username') || 'Anonymous';

    try {
        const { data: activeLogs, error } = await window.supabaseClientInstance
            .from('live_battlegrounds')
            .select('*');

        if (error) throw error;

        // Render logs inside dynamic grid layout cleanly
        const container = document.getElementById('liveBattlegroundsContainer');
        if (!container) return;

        container.innerHTML = '';
        activeLogs.forEach(row => {
            const card = document.createElement('div');
            card.className = "p-4 rounded-xl border border-[var(--border-ui)] bg-white shadow-sm flex flex-col gap-1";
            
            const isMe = row.username.toLowerCase() === currentUsername.toLowerCase();
            const badgeColor = isMe ? 'bg-indigo-100 text-indigo-700' : 'bg-cyan-100 text-cyan-700';

            card.innerHTML = `
                <div class="flex justify-between items-center">
                    <span class="font-bold text-gray-800">${row.username} ${isMe ? '(You)' : ''}</span>
                    <span class="px-2 py-0.5 text-xs font-semibold rounded-full ${badgeColor}">Live</span>
                </div>
                <p class="text-sm text-gray-600 mt-1">Status: <span class="font-medium text-gray-900">${row.current_activity || 'Idle'}</span></p>
            `;
            container.appendChild(card);
        });

        // Trigger radar rendering updates directly from global scope function link safely
        if (typeof renderMultiUserRadarChart === 'function') {
            const { data: sheetsData } = await window.supabaseClientInstance
                .from('mock_sheets_logs')
                .select('*');
                
            if (sheetsData) {
                renderMultiUserRadarChart(sheetsData, currentUsername);
            }
        }

    } catch (err) {
        console.error('Synchronization iteration failure:', err);
    }
}

function startGlobalSyncIntervals() {
    // Continuous polling loop matrix
    setInterval(() => {
        fetchAndRenderLiveUsers();
    }, 15000);
}
