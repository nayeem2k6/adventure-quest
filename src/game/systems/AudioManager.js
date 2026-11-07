export default class AudioManager {
  static enabled = true;
  static context = null;
  static musicTimer = null;
  static musicIndex = 0;
  static melody = [392, 523.25, 587.33, 659.25, 523.25, 440, 392, 329.63];

  static unlock() {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    if (!this.context) this.context = new AudioContextClass();
    if (this.context.state === 'suspended') this.context.resume();
  }

  static setEnabled(enabled) {
    this.enabled = enabled;
    if (!enabled) this.stopMusic();
  }

  static tone(frequency, duration = 0.12, type = 'sine', volume = 0.06) {
    if (!this.enabled) return;
    this.unlock();
    if (!this.context) return;
    const oscillator = this.context.createOscillator();
    const gain = this.context.createGain();
    oscillator.type = type;
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(volume, this.context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + duration);
    oscillator.connect(gain);
    gain.connect(this.context.destination);
    oscillator.start();
    oscillator.stop(this.context.currentTime + duration);
  }

  static play(name) {
    const sounds = {
      jump: [440, 0.1, 'square', 0.035],
      coin: [880, 0.15, 'sine', 0.055],
      hurt: [145, 0.25, 'sawtooth', 0.045],
      stomp: [245, 0.11, 'square', 0.04],
      victory: [660, 0.5, 'triangle', 0.06],
      gameover: [180, 0.55, 'triangle', 0.05],
      click: [520, 0.06, 'sine', 0.025]
    };
    const sound = sounds[name];
    if (sound) this.tone(...sound);
    if (name === 'coin') this.tone(1174.66, 0.1, 'sine', 0.035);
  }

  static startMusic() {
    if (!this.enabled || this.musicTimer) return;
    this.unlock();
    this.musicIndex = 0;
    this.musicTimer = window.setInterval(() => {
      const note = this.melody[this.musicIndex % this.melody.length];
      this.tone(note, 0.28, 'triangle', 0.012);
      this.musicIndex += 1;
    }, 360);
  }

  static stopMusic() {
    if (this.musicTimer) window.clearInterval(this.musicTimer);
    this.musicTimer = null;
  }
}
