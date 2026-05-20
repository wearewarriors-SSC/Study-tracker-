/**
 * Warriors Arena - Core Application Lifecycle Engine
 * Clean Production Build - 100% Verified Syntax Framework
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
    }

    async initializeLifecycleWiring() {
        console.log("Initializing tracking pipeline...");
        
        // Auto-load credentials if already stored in local contexts
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
            console.error("Critical Error: Core action node 'establish-pipeline-btn' missing in DOM.");
            return;
        }

        // Fresh un-duplicated event registration wrapper
        establishBtn.addEventListener("click", async (e) => {
            e.preventDefault();
            
            const urlInput = document.getElementById("supabase-url-input")?.value.trim() || CONFIG.URL;
            const keyInput = document.getElementById("supabase-key-input")?.value.trim();
            const userInput = document.getElementById("username-input")?.value.trim();

            if (!keyInput || !userInput) {
                alert("Please input your valid credentials sequence properly.");
                return;
            }

            // Key check guard context verification
            if (keyInput.startsWith("sb_publishable_")) {
                alert("Validation Fault: Stripe keys detected! Use your real Supabase JWT Token.");
                return;
            }

            establishBtn.innerText = "Connecting...";
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
                alert("Pipeline Connection Refused. Please verify your token payload.");
            }
        });
    }

    async bootCloudConnectionPipeline(url, key, user) {
        try {
            if (!window.supabase) {
                console.error("Supabase Client Engine library missing.");
                return false;
            }
            this.supabase = window.supabase.createClient(url, key);
            
            // Core handshake test loop verification
            const { data, error } = await this.supabase.from("live_battlegrounds").select("count").limit(1);
            if (error) throw error;

            window.currentSupabaseClient = this.supabase;
            window.currentIdentityUser = user;

            this.startInstantHeartbeatSyncLoop();
            return true;
        } catch (err) {
            console.error("Connection Pipeline Error Matrix: ", err);
            return false;
        }
    }

    bypassModalShroud() {
        const shroud = document.getElementById("modal-shroud-container");
        if (shroud) {
            shroud.style.display = "none";
            console.log("Pipeline Secured. Shroud container dismissed.");
            if (typeof window.triggerDashboardChartsRefresh === "function") {
                window.triggerDashboardChartsRefresh();
            }
        }
    }

    startInstantHeartbeatSyncLoop() {
        if (this.syncInterval) clearInterval(this.syncInterval);
        
        // Instant trigger to bypass latency injection
        this.executeSynchronizationTask();
        this.syncInterval = setInterval(() => this.executeSynchronizationTask(), 15000);
    }

    async executeSynchronizationTask() {
        if (!this.supabase || !window.currentIdentityUser) return;
        try {
            // Heartbeat update execution metrics link
            await this.supabase.from("live_battlegrounds").upsert({
                username: window.currentIdentityUser,
                last_heartbeat: new Date().toISOString()
            });

            if (typeof window.fetchAndRenderLiveUsers === "function") {
                window.fetchAndRenderLiveUsers();
            }
        } catch (e) {
            console.warn("Heartbeat sync boundary temporary missed: ", e);
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    window.AppLifecycleEngine = new ApplicationLifecycleEngine();
    window.AppLifecycleEngine.initializeLifecycleWiring();
});

// Automated Real-Time Hot Bootstrapping Sync Script
if (typeof window.fetchAndRenderLiveUsers !== 'function') {
    window.fetchAndRenderLiveUsers = async function() {
        const client = window.currentSupabaseClient;
        const container = document.getElementById("live-battleground-users");
        if (!client || !container) return;
        try {
            const { data, error } = await client.from("live_battlegrounds").select("*");
            if (error) throw error;
            container.innerHTML = "";
            if (data.length === 0) {
                container.innerHTML = `<p class="text-gray-500 italic">No warriors active right now.</p>`;
                return;
            }
            data.forEach(user => {
                const isMe = user.username === window.currentIdentityUser;
                const dotColor = isMe ? "bg-indigo-500" : "bg-cyan-400";
                container.innerHTML += `
                    <div class="flex items-center justify-between p-2 bg-slate-950/40 rounded-lg border border-slate-800/60">
                        <div class="flex items-center space-x-2">
                            <span class="w-2 h-2 rounded-full ${dotColor} animate-pulse"></span>
                            <span class="font-medium text-gray-200">${user.username} ${isMe ? '(You)' : ''}</span>
                        </div>
                        <span class="text-xs text-gray-400">Active Now</span>
                    </div>`;
            });
        } catch (e) { console.warn("Live rendering missed: ", e); }
    };
}
