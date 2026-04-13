import { useEffect, useState } from "react";

type RatingProps = {
  userRating: number;
};

const emojiMap: Record<number, string> = {
  1: "😞",
  2: "🥺",
  3: "🥹",
  4: "😋",
  5: "😍",
};

export default function RatingSystem({ userRating }: RatingProps) {
  const [activeEmoji, setActiveEmoji] = useState<string | null>(null);
  const [animate, setAnimate] = useState(false);

  const playDynaSound = (score: number) => {
    const context = new (
      window.AudioContext || (window as any).webkitAudioContext
    )();

    const playNote = (
      freq: number,
      type: OscillatorType = "sine",
      duration = 0.1,
      volume = 0.2,
    ) => {
      const osc = context.createOscillator();
      const gain = context.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, context.currentTime);
      gain.gain.setValueAtTime(volume, context.currentTime);
      gain.gain.exponentialRampToValueAtTime(
        0.01,
        context.currentTime + duration,
      );
      osc.connect(gain);
      gain.connect(context.destination);
      osc.start();
      osc.stop(context.currentTime + duration);
    };

    if (score === 1) {
      const context = new (
        window.AudioContext || (window as any).webkitAudioContext
      )();

      const playVowel = (freq1: number, freq2: number) => {
        // Create two oscillators to represent vocal formants
        const osc1 = context.createOscillator();
        const osc2 = context.createOscillator();
        const gain = context.createGain();

        osc1.type = "sine";
        osc2.type = "sine";

        // "Oh" starts here
        osc1.frequency.setValueAtTime(freq1, context.currentTime);
        osc2.frequency.setValueAtTime(freq2, context.currentTime);

        // "No" drops the pitch (the disappointment slide)
        osc1.frequency.exponentialRampToValueAtTime(
          freq1 * 0.7,
          context.currentTime + 0.5,
        );
        osc2.frequency.exponentialRampToValueAtTime(
          freq2 * 0.7,
          context.currentTime + 0.5,
        );

        gain.gain.setValueAtTime(0.2, context.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.5);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(context.destination);

        osc1.start();
        osc2.start();
        osc1.stop(context.currentTime + 0.5);
        osc2.stop(context.currentTime + 0.5);
      };

      // 450Hz and 800Hz are common "O" vowel formants
      playVowel(450, 800);
    } else if (score >= 2 && score <= 4) {
      // 🤨 😋 😍 "The Progression": Getting snappier and higher
      // Score 2 = 400Hz, Score 3 = 600Hz, Score 4 = 800Hz
      const pitch = 200 + score * 200;
      playNote(pitch, "sine", 0.1, 0.3);
    } else if (score === 5) {
      // 💎 "The Jackpot": The Arpeggio
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, i) => {
        setTimeout(() => playNote(freq, "triangle", 0.3, 0.2), i * 80);
      });
    }
  };

  const triggerFeedback = (score: number) => {
    if (!score) return;
    setActiveEmoji(emojiMap[score]);
    setAnimate(true);
    playDynaSound(score);

    const timer = setTimeout(() => setAnimate(false), 600);
    return () => clearTimeout(timer);
  };

  useEffect(() => {
    triggerFeedback(userRating);
  }, [userRating]);

  return (
    <div className="text-center p-10 absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none z-[60]">
      <div className="emoji-wrapper h-24 mt-4">
        {animate && (
          <div className="pop-active text-9xl drop-shadow-lg">
            {activeEmoji}
          </div>
        )}
      </div>
    </div>
  );
}
