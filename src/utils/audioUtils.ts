// Create emergency siren sound using Web Audio API
export const playEmergencySiren = () => {
  const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
  const audioContext = new AudioContext();
  
  const oscillator1 = audioContext.createOscillator();
  const oscillator2 = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator1.connect(gainNode);
  oscillator2.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  // Create siren effect
  oscillator1.frequency.value = 800;
  oscillator2.frequency.value = 400;
  oscillator1.type = 'sine';
  oscillator2.type = 'sine';
  
  gainNode.gain.value = 0.5;
  
  // Modulate frequency for siren effect
  const lfo = audioContext.createOscillator();
  const lfoGain = audioContext.createGain();
  lfoGain.gain.value = 200;
  lfo.frequency.value = 2;
  lfo.connect(lfoGain);
  lfoGain.connect(oscillator1.frequency);
  lfoGain.connect(oscillator2.frequency);
  
  oscillator1.start();
  oscillator2.start();
  lfo.start();
  
  // Stop after 3 seconds
  setTimeout(() => {
    oscillator1.stop();
    oscillator2.stop();
    lfo.stop();
    audioContext.close();
  }, 3000);
};

// Create voice alert
export const playVoiceAlert = (message: string = "Emergency! Help needed!") => {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.rate = 1.2;
    utterance.pitch = 1.5;
    utterance.volume = 1;
    window.speechSynthesis.speak(utterance);
  }
};

// Create loud alarm sound
export const playAlarmSound = () => {
  const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
  const audioContext = new AudioContext();
  
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.frequency.value = 1000;
  oscillator.type = 'square';
  gainNode.gain.value = 0.7;
  
  oscillator.start();
  
  // Pulse effect
  let isHigh = true;
  const interval = setInterval(() => {
    oscillator.frequency.value = isHigh ? 1000 : 800;
    isHigh = !isHigh;
  }, 200);
  
  setTimeout(() => {
    clearInterval(interval);
    oscillator.stop();
    audioContext.close();
  }, 5000);
};
