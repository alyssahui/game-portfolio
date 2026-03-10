document.addEventListener('DOMContentLoaded', async () => {
    // Specifically ordered gallery items with matching placeholder text
    const gallery = [
        { src: 'resonance.jpg', text: "The photo that started it all! Resonance of the Ocean is a game with beautiful art and a compelling mystery. This inspired me to draft the idea for a cute mystery game." },
        { src: 'animal crossing new horizons • background.jpg', text: "After getting my friend on board, we brought together our favorite games to create the idea for a mystery visual novel. Animal Crossing and Doki Doki Literature Club were our main inspirations." },
        { src: 'character-reference.JPG', text: "Then, we pitched and recruited a team with skills ranging from music to traditional art. Our game uses two art styles. This is the first!" },
        { src: 'demon-reference.JPG', text: "This is the second. Why this? Stay tuned for the game release to find out.." },
        { src: 'marty-reference.JPG', text: "This picture created the idea for a mailmouse as the main character." },
        { src: 'other-characters.JPG', text: "Our initial designs for island residents! This went hand in hand with storywriting, which ties these characters' lives and mysteries together." },
        { src: 'dog-process.PNG', text: "After many tests with different styles, we solidifed what we like best---what we think will best fit our narrative." },
        { src: 'bag-process.PNG', text: "Designing the mailman bag!" },
        { src: 'marty-process.PNG', text: "The process of creating Marty, our main character! We hope you'll follow his story." },
    ];

    let currentIndex = 0;
    let descriptionState = 0; // 0: start, 1: first desc, 2: second desc

    const gameContainer = document.getElementById('game-container');
    const speechBubble = document.getElementById('speech-bubble');
    const portfolioImage = document.getElementById('portfolio-image');
    const dialogueText = document.getElementById('dialogue-text');
    const endOverlay = document.getElementById('end-overlay');
    const restartBtn = document.getElementById('restart-btn');
    const titleMusic = document.getElementById('title-music');

    // Make the game dynamically scale to always fit entirely on-screen
    function resizeGame() {
        const gameContainer = document.getElementById('game-container');
        // We know the container is exactly 800x600 inside our CSS. 
        const scaleX = window.innerWidth / 800;
        const scaleY = window.innerHeight / 600;
        
        // Take the smallest ratio, and shrink it by 0.95 to give a nice 5% padding around the screen!
        const scale = Math.min(scaleX, scaleY) * 0.95;
        
        // Use translate to keep it perfectly centered, and scale it!
        gameContainer.style.transform = `translate(-50%, -50%) scale(${scale})`;
    }

    window.addEventListener('resize', resizeGame);
    resizeGame();

    function advanceState() {
        if (descriptionState === 0) {
            dialogueText.innerText = "I'm one of the project leads for Honey Haven, a mystery visual novel game. I lead the storywriting and UI/UX design teams, working closely with artists and programmers to bring our story to your screen!";
            descriptionState = 1;
            return;
        } else if (descriptionState === 1) {
            dialogueText.innerText = "We started this project in late January and are still in the works for developing it. Honey Haven is the story of Marty R, a mailmouse in an anthromorphic animal utopia.";
            descriptionState = 2;
            return;
        } else if (descriptionState === 2) {
            dialogueText.innerText = "The game, a mix of story dialogue with characters and minigames, follows Marty as he discovers and investigates the island's mysteries. Continue clicking to see how the idea began and how the process is going!";
            descriptionState = 3;
            return;
        }
        
        // After all images, show closing thoughts
        if (currentIndex === gallery.length) {
            speechBubble.classList.add('hidden');
            dialogueText.innerText = "An early prototype for the UI design is what you see here. Moving forward, I'm aiming to add: a two character-shared screen, reaction animations, menu/setting buttons, notebook displaying user choices, etc.";
            currentIndex++;
            return;
        }
        
        // Additional screen before the end overlay
        if (currentIndex === gallery.length + 1) {
            dialogueText.innerText = "Thank you for taking a look at our development process! Our launch will be at the end of this semester. Stay tuned!";
            currentIndex++;
            return;
        }
        
        // If we showed concluding thoughts, show the overlay
        if (currentIndex > gallery.length + 1) {
            endOverlay.classList.remove('hidden');
            endOverlay.classList.add('visible');
            return;
        }
        
        // Show the bubble with current image
        speechBubble.classList.remove('hidden');
        portfolioImage.src = 'pictures/' + encodeURIComponent(gallery[currentIndex].src);
        
        // Update dialogue text with specific placeholder text
        dialogueText.innerText = gallery[currentIndex].text;
        
        // Advance index
        currentIndex++;
    }

    function reverseState() {
        if (endOverlay.classList.contains('visible')) {
            endOverlay.classList.remove('visible');
            endOverlay.classList.add('hidden');
            return;
        }

        if (currentIndex === gallery.length + 2) {
            currentIndex--;
            dialogueText.innerText = "An early prototype for the UI design is what you see here. Moving forward, I'm aiming to add: a two character-shared screen, reaction animations, menu/setting buttons, notebook displaying user choices, etc.";
            return;
        }
        
        if (currentIndex === gallery.length + 1) {
            currentIndex--;
            speechBubble.classList.remove('hidden');
            portfolioImage.src = 'pictures/' + encodeURIComponent(gallery[currentIndex - 1].src);
            dialogueText.innerText = gallery[currentIndex - 1].text;
            return;
        }

        if (currentIndex > 1) {
            currentIndex--;
            portfolioImage.src = 'pictures/' + encodeURIComponent(gallery[currentIndex - 1].src);
            dialogueText.innerText = gallery[currentIndex - 1].text;
            return;
        }

        if (currentIndex === 1) {
            currentIndex--;
            speechBubble.classList.add('hidden');
            dialogueText.innerText = "The game, a mix of story dialogue with characters and minigames, follows Marty as he discovers and investigates the island's mysteries. Continue clicking to see how the idea began and how the process is going!";
            descriptionState = 3;
            return;
        }

        if (descriptionState === 3) {
            dialogueText.innerText = "We started this project in late January and are still in the works for developing it. Honey Haven is the story of Marty R, a mailmouse in an anthromorphic animal utopia.";
            descriptionState = 2;
            return;
        }

        if (descriptionState === 2) {
            dialogueText.innerText = "I'm one of the project leads for Honey Haven, a mystery visual novel game. I lead the storywriting and UI/UX design teams, working closely with artists and programmers to bring our story to your screen!";
            descriptionState = 1;
            return;
        }

        if (descriptionState === 1) {
            dialogueText.innerHTML = "Honey Haven ~ Game Design Portfolio ft. Main Theme<br> <br>[Click to continue!]";
            descriptionState = 0;
            return;
        }
    }

    gameContainer.addEventListener('click', (e) => {
        // Prevent click if we are clicking the restart button
        if (e.target.id === 'restart-btn') return;
        
        // Unmute and start the music on an interaction
        titleMusic.muted = false;
        if (titleMusic.paused) {
            titleMusic.play().catch(err => console.log('Audio playback failed:', err));
        }
        
        advanceState();
    });

    document.addEventListener('keydown', (e) => {
        // Prevent default spacebar scrolling
        if (e.key === " " || e.key === "ArrowRight" || e.key === "ArrowLeft") {
            e.preventDefault();
        }

        if (e.key === " " || e.key === "ArrowRight") {
            titleMusic.muted = false;
            if (titleMusic.paused) {
                titleMusic.play().catch(err => console.log('Audio playback failed:', err));
            }
            // Don't trigger if end overlay is fully interactable and they should just use the restart button or we consider overlay as final
            // But usually we can just advance and let it do its thing
            advanceState();
        } else if (e.key === "ArrowLeft") {
            reverseState();
        }
    });

    restartBtn.addEventListener('click', () => {
        // Reset everything
        currentIndex = 0;
        descriptionState = 0;
        endOverlay.classList.remove('visible');
        endOverlay.classList.add('hidden');
        speechBubble.classList.add('hidden');
        dialogueText.innerHTML = "Honey Haven ~ Game Design Portfolio ft. Main Theme<br> <br>[Click to continue!]";
        portfolioImage.src = "";
    });
});
