<script lang="ts">
    import { onMount } from 'svelte';
    import { fade, crossfade } from 'svelte/transition';

    let fill: HTMLDivElement | undefined;
    let statusText: string = "Lade Bootloader...";
    let currentStyle: string = "style-windows";
    let showBootUi: boolean = true;
    let showDebianLog: boolean = false;
    let debianLogElement: HTMLDivElement | undefined;
    
    interface LogLine {
        html: string;
    }
    let logLines: LogLine[] = [];
    
    let username: string = "";
    let password: string = "";
    let showPwRow: boolean = false;
    let userDisabled: boolean = false;
    let passDisabled: boolean = false;
    let finalMessage: string = "";
    let activeLogo: 'win' | 'mac' | 'deb' = "win";
    let showLogin: boolean = false;

    onMount(() => {
        startBoot();
    });

    async function startBoot(): Promise<void> {
        currentStyle = "style-windows";
        activeLogo = "win";
        statusText = "Systemdiagnose wird durchgeführt...";
        await progress(33, 4000);

        currentStyle = "style-mac";
        activeLogo = "mac";
        statusText = "";
        await progress(66, 4000);

        currentStyle = "style-debian";
        activeLogo = "deb";
        statusText = "Lade Debian GNU/Linux Kernel...";
        await progress(100, 3000);

        setTimeout(() => {
            showBootUi = false;
            showDebianLog = true;
            runTerminal();
        }, 800);
    }

    function progress(targetPercent: number, duration: number): Promise<void> {
        return new Promise((resolve) => {
            if (fill) {
                fill.style.transition = `width ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
                fill.style.width = targetPercent + "%";
            }
            setTimeout(resolve, duration);
        });
    }

    function runTerminal(): void {
        const subsystems = ["kernel", "pci", "usb", "acpi", "ata", "nvme", "input", "rtc", "ext4", "ipv6", "systemd"];
        const actions = ["initialized", "started", "mounted", "enabled", "detected device", "setting up irq", "loading modules"];
        
        let tempLines: LogLine[] = [];
        for (let j = 0; j < 400; j++) {
            let timestamp = (j * 0.0215).toFixed(6);
            let sub = subsystems[Math.floor(Math.random() * subsystems.length)];
            let act = actions[Math.floor(Math.random() * actions.length)];
            let hex = Math.random().toString(16).substring(2, 10).toUpperCase();
            tempLines.push({ html: `[<span class="grey">${timestamp.padStart(12)}</span>] ${sub}: ${act} (0x${hex})` });
        }

        tempLines.push({ html: "<span class='green'>[  OK  ]</span> Started LSB: Apache2 web server." });
        tempLines.push({ html: "<span class='green'>[  OK  ]</span> Reached target Multi-User System." });
        tempLines.push({ html: "<span class='green'>[  OK  ]</span> Finished Login Service." });

        let i = 0;
        const interval = setInterval(() => {
            if (i < tempLines.length) {
                logLines = [...logLines, tempLines[i]];
                i++;
                if (debianLogElement) debianLogElement.scrollTop = debianLogElement.scrollHeight;
            } else {
                clearInterval(interval);
                setTimeout(() => { 
                    logLines = []; 
                    showLogin = true; 
                }, 800);
            }
        }, 5);
    }

    function handleUserKeydown(e: KeyboardEvent): void {
        if (e.key === 'Enter' && username.trim() !== "") {
            userDisabled = true;
            showPwRow = true;
        }
    }

    function handlePassKeydown(e: KeyboardEvent): void {
        if (e.key === 'Enter') {
            passDisabled = true;
            finalMessage = `Authenticating...<br>Last login: ${new Date().toLocaleString()} on tty1<br>Welcome to Debian?, Windows? or MacOS?`;
            setTimeout(() => {
                window.location.href = "/desktop";
            }, 2000);
        }
    }

    function useAutofocus(node: HTMLInputElement) {
        node.focus();
    }
</script>

<div class="body-mock {currentStyle}">
    {#if showBootUi}
        <div class="main-container" out:fade={{ duration: 400 }}>
            <div class="logo-area">
                {#if activeLogo === 'win'}
                    <img in:fade={{ duration: 600 }} out:fade={{ duration: 400 }} class="logo" src="/logos/windows-logo.png" style="width: 180px; height: 180px" alt="Windows">
                {:else if activeLogo === 'mac'}
                    <img in:fade={{ duration: 600 }} out:fade={{ duration: 400 }} class="logo" src="/logos/apple-logo.png" style="filter: invert(1);" alt="Mac">
                {:else if activeLogo === 'deb'}
                    <img in:fade={{ duration: 600 }} out:fade={{ duration: 400 }} class="logo" src="/logos/debian-logo.png" alt="Debian">
                {/if}
            </div>
            
            <div class="boot-bar-container">
                <div bind:this={fill} class="boot-bar-fill"></div>
            </div>

            {#key statusText}
                <div id="status-text" in:fade={{ duration: 300 }}>{statusText}</div>
            {/key}
        </div>
    {/if}

    {#if showDebianLog}
        <div id="debian-log" bind:this={debianLogElement} in:fade={{ duration: 400 }}>
            {#each logLines as line}
                <div>{@html line.html}</div>
            {/each}

            {#if showLogin}
                <div in:fade>
                    <div>Debian GNU/Linux 12 debian tty1</div>
                    <div class="login-line">
                        <span>debian login:</span>
                        <input type="text" bind:value={username} disabled={userDisabled} on:keydown={handleUserKeydown} use:useAutofocus autocomplete="off">
                    </div>
                    {#if showPwRow}
                        <div class="login-line" in:fade>
                            <span>Password:</span>
                            <input type="password" bind:value={password} disabled={passDisabled} on:keydown={handlePassKeydown} use:useAutofocus autocomplete="off">
                        </div>
                    {/if}
                    {#if finalMessage}
                        <div style="margin-top: 10px;" in:fade>{@html finalMessage}</div>
                    {/if}
                </div>
            {/if}
        </div>
    {/if}
</div>

<style>
    :global(body) { margin: 0; padding: 0; background: black; overflow: hidden; }
    
    .body-mock { 
        width: 100vw; 
        height: 100vh; 
        color: #ffffff; 
        font-family: 'Consolas', 'Courier New', monospace; 
        transition: background-color 1.2s ease-in-out;
    }

    .style-windows { background-color: #0078d7; }
    .style-mac { background-color: #000; }
    .style-debian { background-color: #000; }

    .main-container { 
        position: absolute; 
        top: 50%; 
        left: 50%; 
        transform: translate(-50%, -50%); 
        width: 90%; 
        max-width: 450px; 
        display: flex; 
        flex-direction: column; 
        align-items: center; 
        text-align: center; 
        font-family: 'Segoe UI', sans-serif; 
    }

    .logo-area {
        height: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 40px;
    }

    .logo { 
        width: 90px; 
        height: auto; 
    }

    .boot-bar-container { width: 100%; height: 4px; background: rgba(255,255,255,0.1); border-radius: 2px; }
    .boot-bar-fill { width: 0%; height: 100%; background: white; }
    
    #status-text { 
        margin-top: 20px;
        min-height: 1.2em;
    }

    #debian-log { 
        position: fixed; 
        top: 0; 
        left: 0; 
        width: 100vw; 
        height: 100vh; 
        padding: 20px; 
        background: #000; 
        line-height: 1.3; 
        overflow-y: auto; 
    }

    .login-line { display: flex; gap: 10px; margin-top: 5px; }
    input { background: transparent; border: none; color: #ffffff; font-family: inherit; font-size: inherit; outline: none; flex-grow: 1; }
    :global(.green) { color: #00ff00; font-weight: bold; }
    :global(.grey) { color: #888; }
</style>