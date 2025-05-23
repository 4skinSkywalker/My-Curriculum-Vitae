window.onload = () => {
    const originalMusic = [
        {
            title: "Night Sky",
            artist: "Kid2Will",
            src: "/music/Kid2Will/Night-Sky_Kid2Will.mp3"
        },
        {
            title: "Azarian Fire",
            artist: "Kid2Will",
            src: "/music/Kid2Will/Azarian-Fire_Kid2Will.mp3"
        },
        {
            title: "Kid2Will",
            artist: "Kid2Will",
            src: "/music/Kid2Will/Kid2Will_Kid2Will.mp3"
        },
        {
            title: "The Highest Horizon",
            artist: "Kid2Will",
            src: "/music/Kid2Will/Highest-Horizon_Kid2Will.mp3"
        },
        {
            title: "Fire Aura",
            artist: "Kid2Will",
            src: "/music/Kid2Will/Fire-Aura_Kid2Will.mp3"
        },
        {
            title: "Frozen Fog",
            artist: "Kid2Will",
            src: "/music/Kid2Will/Frozen-Fog_Kid2Will.mp3"
        },
        {
            title: "The Power Within",
            artist: "Kid2Will",
            src: "/music/Kid2Will/Power-Within_Kid2Will.mp3"
        },
        {
            title: "Blue Sky",
            artist: "ParagonX9",
            src: "/music/ParagonX9/Blue-Sky_ParagonX9.mp3"
        },
        {
            title: "Chaoz Fantasy",
            artist: "ParagonX9",
            src: "/music/ParagonX9/Chaoz-Fantasy_ParagonX9.mp3"
        },
        {
            title: "No 5 NG Edit",
            artist: "ParagonX9",
            src: "/music/ParagonX9/No-5-NG-Edit_ParagonX9.mp3"
        },
        {
            title: "Red 13",
            artist: "ParagonX9",
            src: "/music/ParagonX9/Red-13_ParagonX9.mp3"
        },
        {
            title: "Milky Ways",
            artist: "Bossfight",
            src: "/music/Bossfight/Milky-Ways_Bossfight.mp3"
        },
        {
            title: "Dark Star Dance",
            artist: "MidiGuyDP",
            src: "/music/MidiGuyDP/Dark-Star-Dance_MidiGuyDP.mp3"
        },
        {
            title: "Not dead YET",
            artist: "NeXsard",
            src: "/music/NeXsard/Not-dead-YET_NeXsard.mp3"
        },
    ];
    const canvas = document.querySelector(".muspla > canvas");
    const title = document.querySelector(".muspla-title");
    const artist = document.querySelector(".muspla-artist");
    const backward = document.querySelector(".muspla-backward");
    const forward = document.querySelector(".muspla-forward");
    const playtimeLabel = document.querySelector(".muspla-playtime");
    const progress = document.querySelector(".muspla-progress");
    const progressBar = document.querySelector(".muspla-progress > .progress-bar");
    const durationLabel = document.querySelector(".muspla-duration");
    const playBtn = document.querySelector(".muspla-play");
    const pauseBtn = document.querySelector(".muspla-pause");
    const shuffleBtn = document.querySelector(".muspla-shuffle");
    const repeatBtn = document.querySelector(".muspla-repeat");
    let firstTime = true;
    let timer, audio, unsubscribeAnimationFrame;
    let music = deepCopy(originalMusic);
    let musicIndex = 0;
    let isPlaying = false;
    let duration = 0;
    let playtime = 0;
    let isShuffleActive = false;
    let isRepeatActive = false;

    loadAudio(music[musicIndex]);

    function deepCopy(obj) {
        return JSON.parse(JSON.stringify(obj));
    }
    
    function shuffle(array) {
        let tmp, current, top = array.length;
    
        if(top) while(--top) {
            current = Math.floor(Math.random() * (top + 1));
            tmp = array[current];
            array[current] = array[top];
            array[top] = tmp;
        }
    
        return array;
    }

    function addEventListenerOnce(el, evt, cb) {
        const cbWrap = () => {
            cb();
            el.removeEventListener(evt, cbWrap);
        }
        el.addEventListener(evt, cbWrap);
    };
    
    function songFinish() {
        pause();
        resetPlaytime();
        if (!isRepeatActive) {
            nextTrack();
        }
        setTimeout(play, 1000);
    }
    
    function play() {
        addEventListenerOnce(audio, "play", () => {
            isPlaying = true;
            timer = setInterval(() => {
                playtime += 0.5;
                const percent = 100 * playtime / duration;
                if (percent >= 100) {
                    songFinish();
                }
                progressBar.style.width = percent + "%";
                playtimeLabel.innerHTML = getTimeLabel(playtime);
            }, 500);
        });
        audio.play();
        playBtn.setAttribute("hidden", "");
        pauseBtn.removeAttribute("hidden");
    }

    function playBtnHandler() {
        if (firstTime) {
            loadAudio(music[musicIndex]);
        }
        firstTime = false;
        play();
    }
    
    function pause() {
        audio.pause();
        isPlaying = false;
        clearInterval(timer);
        pauseBtn.setAttribute("hidden", "");
        playBtn.removeAttribute("hidden");
    }

    function previousTrack() {
        if (musicIndex === 0) {
            musicIndex = music.length - 1;
        } else {
            musicIndex--;
        }
        pause();
        loadAudio(music[musicIndex]);
        play();
    }

    function nextTrack() {
        if (musicIndex === music.length - 1) {
            musicIndex = 0;
        } else {
            musicIndex++;
        }
        pause();
        loadAudio(music[musicIndex]);
        play();
    }
    
    function shuffleBtnHandler() {
        isShuffleActive = !isShuffleActive;
        shuffleBtn.classList.toggle("muspla-btn-inactive");
        if (isShuffleActive) {
            music = shuffle(originalMusic);
        } else {
            music = deepCopy(originalMusic);
        }
    }
    
    function repeatBtnHandler() {
        isRepeatActive = !isRepeatActive;
        repeatBtn.classList.toggle("muspla-btn-inactive");
    }
    
    function progressClickHandler(evt) {
        const mouseX = evt.clientX;
        const { x, width } = progress.getBoundingClientRect();
        const dx = mouseX - x;
        const percent = dx / width;
        progressBar.style.width = (100 * percent) + "%";
        playtime = percent * duration;
        playtimeLabel.innerHTML = getTimeLabel(playtime);
        audio.currentTime = percent * duration;
    }
    
    function getTimeLabel(time) {
        const mm = Math.floor(time / 60);
        const ss = Math.floor(time - (mm * 60));
        return  mm + ":" + ss.toString().padStart(2, "0");
    }

    function resetPlaytime() {
        audio.currentTime = 0;
        playtime = 0;
        playtimeLabel.innerHTML = getTimeLabel(playtime);
        progressBar.style.width = "0%";
    }

    function initAudioAnalyzer(audio) {
        const audioContext = new AudioContext();

        const audioSource = audioContext.createMediaElementSource(audio);
        const audioAnalyser = audioContext.createAnalyser();

        audioSource.connect(audioAnalyser);
        audioAnalyser.connect(audioContext.destination);

        window.lastAudioContext = audioContext;
        window.lastAudioSource = audioSource;
        window.lastAudioAnalyser = audioAnalyser;

        return { audioContext, audioSource, audioAnalyser };
    }
    
    function loadAudio(options) {
        if (unsubscribeAnimationFrame) {
            unsubscribeAnimationFrame();
            unsubscribeAnimationFrame = null;
        }
        
        audio = new Audio(options.src);
        audio.src = options.src;
        audio.load();
        audio.onloadedmetadata = () => {
            resetPlaytime();
            duration = audio.duration;
            durationLabel.innerHTML = getTimeLabel(duration);
            if (options.title) {
                title.innerHTML = options.title;
            }
            if (options.artist) {
                artist.innerHTML = options.artist;
            }
        };
        
        const { audioAnalyser } = initAudioAnalyzer(audio);
    
        const ctx = canvas.getContext("2d");
        const { width: WIDTH, height: HEIGHT } = canvas.getBoundingClientRect();
        
        audioAnalyser.fftSize = 256;
        const bufferLength = audioAnalyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        const barWidth = (WIDTH / bufferLength) * 2.5;
        let barHeight;
        let x = 0;
        let doNotRenewAnimationFrame = false;
        
        function renderFrame() {
            ctx.clearRect(0, 0, WIDTH, HEIGHT);
            x = 0;
            audioAnalyser.getByteFrequencyData(dataArray);
            
            for (let i = 0; i < bufferLength; i++) {
                barHeight = dataArray[i] * 0.33;
                ctx.fillStyle = "rgba(255, 153, 0, 0.5)";
                ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
                x += barWidth + 1;
            }

            if (doNotRenewAnimationFrame) {
                console.log("Animation frame not renewed.");
                return
            }

            requestAnimationFrame(renderFrame);
        };
        
        renderFrame();

        unsubscribeAnimationFrame = () => {
            doNotRenewAnimationFrame = true;
        };
    }
    
    backward.addEventListener("click", previousTrack);
    forward.addEventListener("click", nextTrack);
    playBtn.addEventListener("click", playBtnHandler);
    pauseBtn.addEventListener("click", pause);
    shuffleBtn.addEventListener("click", shuffleBtnHandler);
    repeatBtn.addEventListener("click", repeatBtnHandler);
    progress.addEventListener("click", progressClickHandler);
};