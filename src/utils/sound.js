export const NEW_PLAYER_SOUND = 'assets/sounds/pop.mp3';
export const SCARY_TUNE = 'assets/sounds/salt_fish.mp3';

export function playSound(src) {
    console.log('about to playSound')
    const audio = new Audio(src);
    audio.play();
}
