window.onload = () => {
    const originalMusic = [
        {
            title: "Night Sky",
            artist: "Kid2Will",
            src: "/music/Night-Sky_Kid2Will.mp3"
        },
        {
            title: "Azarian Fire",
            artist: "Kid2Will",
            src: "/music/Azarian-Fire_Kid2Will.mp3"
        },
        {
            title: "Kid2Will",
            artist: "Kid2Will",
            src: "/music/Kid2Will_Kid2Will.mp3"
        },
    ];
    const file = document.querySelector('.muspla > input[type="file"]');
    const audio = document.querySelector(".muspla > audio");
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
    let audioContext, audioSource, audioAnalyser;
    let music = JSON.parse(JSON.stringify(originalMusic));
    let musicIndex = 0;
    let isPlaying = false;
    let duration = 0;
    let playtime = 0;
    let timer;
    let isShuffleActive = false;
    let isRepeatActive = false;
    
    loadAudio(music[musicIndex]);
    
    function shuffle(array) {
        var tmp, current, top = array.length;
    
        if(top) while(--top) {
            current = Math.floor(Math.random() * (top + 1));
            tmp = array[current];
            array[current] = array[top];
            array[top] = tmp;
        }
    
        return array;
    }
    
    function songFinish() {
        pause();
        resetPlaytime();
        if (!isRepeatActive) {
            next();
        }
        setTimeout(play, 1150);
    }
    
    function play() {
        audio.play();
        isPlaying = true;
        timer = setInterval(() => {
            playtime++;
            const percent = 100 * playtime / duration;
            if (percent >= 100) {
                songFinish();
            }
            progressBar.style.width = percent + "%";
            playtimeLabel.innerHTML = getTimeLabel(playtime);
        }, 1000);
        playBtn.setAttribute("hidden", "");
        pauseBtn.removeAttribute("hidden");
    }
    
    function pause() {
        audio.pause();
        isPlaying = false;
        clearInterval(timer);
        pauseBtn.setAttribute("hidden", "");
        playBtn.removeAttribute("hidden");
    }
    
    function previous() {
        if (musicIndex === 1) {
            musicIndex = music.length - 1;
        } else {
            musicIndex--;
        }
        loadAudio(music[musicIndex]);
    }
    
    function next() {
        if (musicIndex === music.length - 1) {
            musicIndex = 0;
        } else {
            musicIndex++;
        }
        loadAudio(music[musicIndex]);
    }
    
    function shuffleBtnHandler() {
        isShuffleActive = !isShuffleActive;
        shuffleBtn.classList.toggle("muspla-btn-inactive");
        if (isShuffleActive) {
            music = shuffle(originalMusic);
        } else {
            music = JSON.parse(JSON.stringify(originalMusic));
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
    
    function loadAudio(options) {
        audio.src = options.src;
        audio.load();
        audio.onloadedmetadata = () => {
            resetPlaytime();
            duration = audio.duration;
            durationLabel.innerHTML = getTimeLabel(duration);
            if (options.title) title.innerHTML = options.title;
            if (options.artist) artist.innerHTML = options.artist;
            if (isPlaying) {
                pause();
                resetPlaytime();
                setTimeout(play, 1150);
            }
        };
        
        if (!audioSource) {
            audioContext = new AudioContext();
            audioSource = audioContext.createMediaElementSource(audio);
            audioAnalyser = audioContext.createAnalyser();
            audioSource.connect(audioAnalyser);
            audioAnalyser.connect(audioContext.destination);
        }
    
        const ctx = canvas.getContext("2d");
        
        audioAnalyser.fftSize = 256;
        
        const bufferLength = audioAnalyser.frequencyBinCount;
        console.log(bufferLength);
        
        const dataArray = new Uint8Array(bufferLength);
        
        const { width: WIDTH, height: HEIGHT } = canvas.getBoundingClientRect();
        
        const barWidth = (WIDTH / bufferLength) * 2.5;
        let barHeight;
        let x = 0;
        
        function renderFrame() {
            requestAnimationFrame(renderFrame);
            
            x = 0;
            
            audioAnalyser.getByteFrequencyData(dataArray);
            
            ctx.clearRect(0, 0, WIDTH, HEIGHT);
            
            for (let i = 0; i < bufferLength; i++) {
                barHeight = dataArray[i] * 0.33;
                ctx.fillStyle = "rgba(255, 153, 0, 0.5)";
                ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
                x += barWidth + 1;
            }
        };
        
        renderFrame();
    }
    
    file.onchange = () => {
        const files = file.files;
        loadAudio({ src: URL.createObjectURL(files[0]) });
    };
    
    backward.addEventListener("click", previous);
    forward.addEventListener("click", next);
    playBtn.addEventListener("click", play);
    pauseBtn.addEventListener("click", pause);
    shuffleBtn.addEventListener("click", shuffleBtnHandler);
    repeatBtn.addEventListener("click", repeatBtnHandler);
    progress.addEventListener("click", progressClickHandler);
};    