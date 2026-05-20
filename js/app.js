/**
 * Warriors Arena - Advanced Core Lifecycle Synchronization Engine
 * Clean Production Build - Real-Time Zero Latency Pipeline Mappings
 */

const CONFIG = {
    URL: "https://covwtpfbrafexmiidluo.supabase.co",
    STORAGE_KEYS: {
        URL: "supabase_url",
        KEY: "supabase_anon_key",
        USER: "identity_username"
    }
};

class ApplicationLifecycleEngine {
    constructor() {
        this.supabase = null;
        this.syncInterval = null;
        this.accumulatorInterval = null;
        this.totalStudySeconds = 0;
    }

    async initializeLifecycleWiring() {
        console.log("Initializing tracking pipeline tracking layers...");
        
        // Auto-load matching parameters directly from local browser storage
        const savedUrl = localStorage.getItem(CONFIG.STORAGE_KEYS.URL) || CONFIG.URL;
        const savedKey = localStorage.getItem(CONFIG.STORAGE_KEYS.KEY);
        const savedUser = localStorage.getItem(CONFIG.STORAGE_KEYS.USER);

        if (savedUrl && savedKey && savedUser) {
            const connected = await this.bootCloudConnectionPipeline(savedUrl, savedKey, savedUser);
            if (connected) {
                this.bypassModalShroud();
                return;
            }
        }
        
        this.setupEventBindings();
    }

    setupEventBindings() {
        const establishBtn = document.getElementById("establish-pipeline-btn");
        if (!establishBtn) {
            console.error("Critical Error: Core action node 'establish-pipeline-btn' missing in DOM context.");
            return;
        }

        // Fresh event loop registration mapping matrix
        establishBtn.addEventListener("click", async (e) => {
            e.preventDefault();
            
            const urlInput = document.getElementById("supabase-url-input")?.value.trim() || CONFIG.URL;
            const keyInput = document.getElementById("supabase-key-input")?.value.trim();
            const userInput = document.getElementById("username-input")?.value.trim();

            if (!keyInput || !userInput) {
                alert("Validation Mismatch: Please enter all authorization metrics sequences properly.");
                return;
            }

            if (keyInput.startsWith("sb_publishable_")) {
                alert("Validation Fault: Stripe authorization keys detected! Use your genuine Supabase JWT token.");
                return;
            }

            establishBtn.innerText = "Connecting Framework...";
            establishBtn.disabled = true;

            const success = await this.bootCloudConnectionPipeline(urlInput, keyInput, userInput);
            if (success) {
                localStorage.setItem(CONFIG.STORAGE_KEYS.URL, urlInput);
                localStorage.setItem(CONFIG.STORAGE_KEYS.KEY, keyInput);
                localStorage.setItem(CONFIG.STORAGE_KEYS.USER, userInput);
                this.bypassModalShroud();
            } else {
                establishBtn.innerText = "ESTABLISH PIPELINE";
                establishBtn.disabled = false;
                alert("Pipeline Connection Refused. Verify your network token payload credentials.");
            }
        });

        // Intercept Study Accumulator Action Button Trigger Loops
        const startTimerBtn = document.getElementById("start-timer-trigger");
        if (startTimerBtn) {
            startTimerBtn.addEventListener("click", () => {
                this.triggerImmediateStudyAccumulatorTracking();
            });
        }
    }

    async bootCloudConnectionPipeline(url, key, user) {
        try {
            if (!window.supabase) {
                console.error("Supabase Client Core engine library missing from global header injections.");
                return false;
            }
            this.supabase = window.supabase.createClient(url, key);
            
            // Handshake test verification check query
            const { data, error } = await this.supabase.from("live_battlegrounds").select("username").limit(1);
            if (error) throw error;

            window.currentSupabaseClient = this.supabase;
            window.currentIdentityUser = user;

            this.startInstantHeartbeatSyncLoop();
            return true;
        } catch (err) {
            console.error("Connection Engine Handshake Fault Trace: ", err);
            return false;
        }
    }

    bypassModalShroud() {
        const shroud = document.getElementById("modal-shroud-container");
        if (shroud) {
            shroud.style.display = "none";
            console.log("Pipeline Secured. Overlay Shroud completely dismissed.");
            if (typeof window.triggerDashboardChartsRefresh === "function") {
                window.triggerDashboardChartsRefresh();
            }
        }
    }

    startInstantHeartbeatSyncLoop() {
        if (this.syncInterval) clearInterval(this.syncInterval);
        
        // Instant trigger invocation to bypass the 15-second delay latency loop
        this.executeSynchronizationTask();
        this.syncInterval = setInterval(() => this.executeSynchronizationTask(), 15000);
    }

    async executeSynchronizationTask() {
        if (!this.supabase || !window.currentIdentityUser) return;
        try {
            // Heartbeat check update trace with relational values mappings
            await this.supabase.from("live_battlegrounds").upsert({
                username: window.currentIdentityUser,
                last_heartbeat: new Date().toISOString()
            }, { onConflict: 'username' });

            this.fetchAndRenderLiveUsers();
        } catch (e) {
            console.warn("Heartbeat synchronization missed framework boundary: ", e);
        }
    }

    triggerImmediateStudyAccumulatorTracking() {
        if (this.accumulatorInterval) clearInterval(this.accumulatorInterval);
        
        console.log("Accumulator tracking layer initializing real-time synchronization updates...");
        
        // Push instant updates frame to break the silent latency blocks
        this.pushStudySessionPulseToCloud();
        
        this.accumulatorInterval = setInterval(() => {
            this.totalStudySeconds += 60;
            this.pushStudySessionPulseToCloud();
        }, 60000);
    }

    async pushStudySessionPulseToCloud() {
        if (!this.supabase || !window.currentIdentityUser) return;
        try {
            const totalMinutesComputed = Math.floor(this.totalStudySeconds / 60) || 1;
            
            await this.supabase.from("live_battlegrounds").upsert({
                username: window.currentIdentityUser,
                study_minutes: totalMinutesComputed,
                last_heartbeat: new Date().toISOString()
            }, { onConflict: 'username' });

            this.fetchAndRenderLiveUsers();
        } catch (err) {
            console.warn("Real-time study pulse transmission dropped: ", err);
        }
    }

    async fetchAndRenderLiveUsers() {
        const container = document.getElementById("live-battleground-users");
        if (!this.supabase || !container) return;

        try {
            const { data: activeUsers, error } = await this.supabase
                .from("live_battlegrounds")
                .select("*");

            if (error) throw error;

            container.innerHTML = "";
            if (!activeUsers || activeUsers.length === 0) {
                container.innerHTML = `<p class="text-gray-500 italic">No active trackers synced.</p>`;
                return;
            }

            activeUsers.forEach(user => {
                const isMe = (user.username === window.currentIdentityUser);
                const dotColorClass = isMe ? "bg-indigo-500" : "bg-cyan-400";
                const studyMinutesDisplay = user.study_minutes !== undefined && user.study_minutes !== null ? `${user.study_minutes} mins` : "0 mins";

                container.innerHTML += `
                    <div class="flex items-center justify-between p-3 bg-slate-950/50 rounded-xl border border-slate-800/40 shadow-inner">
                        <div class="flex items-center space-x-2.5">
                            <span class="w-2.5 h-2.5 rounded-full ${dotColorClass} animate-pulse"></span>
                            <span class="font-semibold text-gray-200">${user.username} ${isMe ? '(You)' : ''}</span>
                        </div>
                        <div class="flex items-center space-x-2">
                            <span class="bg-slate-900 px-2.5 py-1 rounded-md text-xs font-bold border border-slate-800/80 text-indigo-300 tracking-wider">${studyMinutesDisplay}</span>
                            <span class="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Live</span>
                        </div>
                    </div>`;
            });

            if (typeof window.triggerDashboardChartsRefresh === "function") {
                window.triggerDashboardChartsRefresh();
            }
        } catch (e) {
            console.error("UI user list drawing process crashed: ", e);
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    window.AppLifecycleEngine = new ApplicationLifecycleEngine();
    window.AppLifecycleEngine.initializeLifecycleWiring();
});
