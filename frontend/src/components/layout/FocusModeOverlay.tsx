import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { TimerDisplay } from '@/components/ui/TimerDisplay';
import { X, Check, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import type { MicroStep } from '@/types';

interface FocusModeOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onFinishEarly: () => void;
  onAbort: () => void;
  currentStep?: MicroStep | null;
  secondsRemaining: number;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
}

export function FocusModeOverlay({
  isOpen,
  onClose,
  onFinishEarly,
  onAbort,
  currentStep,
  secondsRemaining,
  isFullscreen = false,
  onToggleFullscreen,
}: FocusModeOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Soundscape Player States and Refs
  const [soundscape, setSoundscape] = useState<'none' | 'rain' | 'ocean' | 'wind' | 'lofi'>('none');
  const [volume, setVolume] = useState(0.4);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<AudioScheduledSourceNode | MediaElementAudioSourceNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const lofiAudioRef = useRef<HTMLAudioElement | null>(null);

  const stopSound = () => {
    if (sourceNodeRef.current) {
      try {
        sourceNodeRef.current.disconnect();
      } catch {}
      sourceNodeRef.current = null;
    }
    if (lofiAudioRef.current) {
      lofiAudioRef.current.pause();
      lofiAudioRef.current = null;
    }
  };

  const playSound = (type: 'rain' | 'ocean' | 'wind' | 'lofi') => {
    stopSound();

    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;

      // Resume context if suspended (browser security autoplays blocker)
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      if (!gainNodeRef.current) {
        gainNodeRef.current = ctx.createGain();
        gainNodeRef.current.connect(ctx.destination);
      }
      gainNodeRef.current.gain.value = volume;

      if (type === 'lofi') {
        // Synthesize cozy ambient lofi drone / pad using Web Audio oscillators
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const droneGain = ctx.createGain();
        
        osc1.type = 'triangle';
        osc1.frequency.value = 110.0; // A2
        
        osc2.type = 'sine';
        osc2.frequency.value = 165.0; // E3
        
        droneGain.gain.value = 0.15;
        
        osc1.connect(droneGain);
        osc2.connect(droneGain);
        droneGain.connect(gainNodeRef.current);
        
        osc1.start();
        osc2.start();
        
        // Slow LFO to modulate volume for a breathing effect
        const lfo = ctx.createOscillator();
        lfo.frequency.value = 0.08;
        const lfoGain = ctx.createGain();
        lfoGain.gain.value = 0.05;
        
        lfo.connect(lfoGain);
        lfoGain.connect(droneGain.gain);
        lfo.start();
        
        // Periodic high-pitched pentatonic chimes
        const chimeInterval = setInterval(() => {
          if (!audioCtxRef.current || audioCtxRef.current.state === 'suspended') return;
          try {
            const now = ctx.currentTime;
            const chimeOsc = ctx.createOscillator();
            const chimeGain = ctx.createGain();
            
            chimeOsc.type = 'sine';
            const notes = [523.25, 587.33, 659.25, 783.99, 880.0]; // C5, D5, E5, G5, A5
            const randomNote = notes[Math.floor(Math.random() * notes.length)];
            chimeOsc.frequency.value = randomNote;
            
            chimeGain.gain.setValueAtTime(0.0, now);
            chimeGain.gain.linearRampToValueAtTime(0.05, now + 0.1);
            chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + 4.0);
            
            chimeOsc.connect(chimeGain);
            chimeGain.connect(gainNodeRef.current!);
            
            chimeOsc.start(now);
            chimeOsc.stop(now + 4.1);
          } catch (e) {
            console.error(e);
          }
        }, 4000);

        sourceNodeRef.current = {
          disconnect: () => {
            clearInterval(chimeInterval);
            try {
              osc1.stop();
              osc2.stop();
              lfo.stop();
            } catch {}
            osc1.disconnect();
            osc2.disconnect();
            lfo.disconnect();
            droneGain.disconnect();
            lfoGain.disconnect();
          }
        } as any;
        return;
      }

      const bufferSize = 2 * ctx.sampleRate;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);

      if (type === 'rain') {
        // Synthesize Pink Noise for Rain
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
          output[i] *= 0.11;
          b6 = white * 0.115926;
        }
      } else if (type === 'ocean') {
        // Synthesize Brownian Noise for Ocean
        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          output[i] = (lastOut + (0.02 * white)) / 1.02;
          lastOut = output[i];
          output[i] *= 3.5;
        }
      } else if (type === 'wind') {
        // Synthesize Filtered White Noise for Wind
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }
      }

      const whiteNoiseSource = ctx.createBufferSource();
      whiteNoiseSource.buffer = noiseBuffer;
      whiteNoiseSource.loop = true;

      if (type === 'wind') {
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 400;
        filter.Q.value = 1.0;

        const lfo = ctx.createOscillator();
        lfo.frequency.value = 0.15; // 0.15 Hz slow wind gusts
        const lfoGain = ctx.createGain();
        lfoGain.gain.value = 180;
        
        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);
        whiteNoiseSource.connect(filter);
        filter.connect(gainNodeRef.current);
        
        lfo.start();
      } else {
        whiteNoiseSource.connect(gainNodeRef.current);
      }

      whiteNoiseSource.start();
      sourceNodeRef.current = whiteNoiseSource;
    } catch (e) {
      console.error('Failed to initialize audio node synthesis:', e);
    }
  };

  useEffect(() => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = volume;
    }
    if (lofiAudioRef.current) {
      lofiAudioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (!isOpen) {
      stopSound();
      setSoundscape('none');
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      stopSound();
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';
      document.body.classList.add('overscroll-none');
      overlayRef.current?.focus();

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onAbort();
        } else if (event.key === ' ' || event.key === 'Enter') {
          event.preventDefault();
          onFinishEarly();
        } else if (event.key === 'f' || event.key === 'F') {
          onToggleFullscreen?.();
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        document.body.classList.remove('overscroll-none');
        document.removeEventListener('keydown', handleKeyDown);
        previousActiveElement.current?.focus();
      };
    }
  }, [isOpen, onAbort, onFinishEarly, onToggleFullscreen]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      tabIndex={-1}
      className={cn(
        'fixed inset-0 z-[200] flex flex-col items-center justify-center',
        'bg-bg-deep/95 backdrop-blur-2xl animate-fade-in'
      )}
      role="dialog"
      aria-modal="true"
      aria-label="Focus Mode"
    >
      <div className="absolute top-4 right-4 flex items-center gap-2">
        {onToggleFullscreen && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleFullscreen}
            aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            className="text-text-secondary hover:text-text-primary"
          >
            <RotateCcw className="h-5 w-5" />
          </Button>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onAbort}
          aria-label="Abort focus session"
          className="text-text-secondary hover:text-accent-danger"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="relative z-10 w-full max-w-2xl px-6 py-12 text-center">
        <div className="mb-8">
          <span className="badge bg-accent-primary/10 text-accent-primary border-accent-primary/20 px-3 py-1 text-sm">
            FOCUS MODE
          </span>
        </div>

        {currentStep && (
          <div className="mb-10 animate-fade-in">
            <p className="text-sm text-text-muted uppercase tracking-wider mb-2">Current Sprint</p>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-text-primary leading-tight max-w-xl mx-auto">
              {currentStep.text}
            </h1>
            <div className="flex items-center justify-center gap-4 mt-4">
              <EnergyBadge energy={currentStep.energy_cost} size="md" />
              <span className="text-sm text-text-secondary font-mono">
                {currentStep.duration_min} min
              </span>
            </div>
          </div>
        )}

        <TimerDisplay
          totalSeconds={secondsRemaining}
          size="xl"
          showLabel={true}
          pulseThreshold={30}
        />

        <div className="mt-10 flex items-center justify-center gap-4">
          <Button
            variant="danger"
            size="lg"
            onClick={onAbort}
            leftIcon={<X className="h-5 w-5" aria-hidden="true" />}
            className="min-w-[140px]"
          >
            Abort
          </Button>
          <Button
            variant="success"
            size="lg"
            onClick={onFinishEarly}
            leftIcon={<Check className="h-5 w-5" aria-hidden="true" />}
            className="min-w-[160px]"
          >
            Finish Early
          </Button>
        </div>

        {/* Ambient Soundscape Control Center */}
        <div className="mt-8 p-5 glass rounded-2xl border border-border-subtle max-w-sm mx-auto shadow-glow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-text-primary text-xs font-semibold uppercase tracking-wider">
              <Volume2 className="h-4 w-4 text-accent-primary" />
              <span>Ambient Soundscape</span>
            </div>
            {soundscape !== 'none' && (
              <span className="text-[10px] text-accent-primary bg-accent-primary/10 px-2 py-0.5 rounded-full border border-accent-primary/20 animate-pulse font-medium">
                Playing
              </span>
            )}
          </div>

          <div className="grid grid-cols-5 gap-1.5 mb-3">
            {[
              { id: 'none', label: 'Mute' },
              { id: 'rain', label: 'Rain' },
              { id: 'ocean', label: 'Ocean' },
              { id: 'wind', label: 'Wind' },
              { id: 'lofi', label: 'Lofi' }
            ].map((sound) => (
              <button
                key={sound.id}
                type="button"
                onClick={() => {
                  setSoundscape(sound.id as any);
                  if (sound.id === 'none') {
                    stopSound();
                  } else {
                    playSound(sound.id as any);
                  }
                }}
                className={cn(
                  "py-1.5 rounded-lg text-xs font-medium border transition-all",
                  soundscape === sound.id
                    ? "bg-accent-primary/10 border-accent-primary text-accent-primary font-semibold shadow-glow-sm"
                    : "border-border-subtle hover:border-border-glow text-text-secondary"
                )}
              >
                {sound.label}
              </button>
            ))}
          </div>

          {soundscape !== 'none' && (
            <div className="flex items-center gap-3 animate-fade-in">
              <VolumeX className="h-3.5 w-3.5 text-text-muted" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                className="w-full h-1 bg-bg-deep rounded-lg appearance-none cursor-pointer accent-accent-primary"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                aria-label="Soundscape Volume"
              />
              <Volume2 className="h-3.5 w-3.5 text-text-muted" />
            </div>
          )}
        </div>

        <p className="mt-6 text-sm text-text-muted max-w-md mx-auto">
          Press <kbd className="px-2 py-0.5 bg-bg-card rounded text-text-primary border border-border-subtle font-mono">Space</kbd> or <kbd className="px-2 py-0.5 bg-bg-card rounded text-text-primary border border-border-subtle font-mono">Enter</kbd> to finish early · <kbd className="px-2 py-0.5 bg-bg-card rounded text-text-primary border border-border-subtle font-mono">Esc</kbd> to abort
        </p>
      </div>
    </div>
  );
}

import { EnergyBadge } from '@/components/ui/Badge';