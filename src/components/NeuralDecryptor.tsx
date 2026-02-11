import React, { useState } from 'react';
import { playSound } from '../utils/sounds';

const SECRETS = [
  { id: 1, label: 'CODENAME', value: 'Mirae' },
  { id: 2, label: 'OPERATING BASE', value: 'INDONESIA' },
  { id: 3, label: 'EDUCATION', value: 'UMN (GPA 3.52)' },
  { id: 4, label: 'SPECIALTY', value: 'FULL STACK' },
  { id: 5, label: 'PASSION', value: 'SLEEP' }, // Personalized!
  { id: 6, label: 'STATUS', value: 'AVAILABLE FOR HIRE' },
];

export default function NeuralDecryptor() {
  const [decrypted, setDecrypted] = useState<number[]>([]);
  const [gameState, setGameState] = useState('locked');

  const handleDecrypt = (id: number) => {
    if (decrypted.includes(id)) return;
    playSound('success'); // Play sound!
    setDecrypted([...decrypted, id]);
  };

  return (
    <div className="max-w-4xl mx-auto py-20 px-6">
      <div className="mb-8 border-b border-white/10 pb-4 flex justify-between items-end">
        <h2 className="text-2xl font-bold text-text">NEURAL LINK</h2>
        <span className="font-mono text-primary text-xs">
          DECRYPTION PROGRESS: {Math.round((decrypted.length / SECRETS.length) * 100)}%
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {SECRETS.map((secret) => {
          const isRevealed = decrypted.includes(secret.id);
          
          return (
            <button
              key={secret.id}
              onClick={() => handleDecrypt(secret.id)}
              onMouseEnter={() => playSound('hover')}
              className={`relative h-32 border border-white/10 rounded-sm p-4 text-left transition-all duration-300 group overflow-hidden ${
                isRevealed ? 'bg-primary/20 border-primary' : 'bg-surface hover:border-white/30'
              }`}
            >
              {/* Scanline effect */}
              {!isRevealed && (
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-[200%] w-full animate-scan" />
              )}

              <span className="font-mono text-[10px] tracking-widest text-neutral/50 block mb-2">
                {isRevealed ? 'Decrypted' : 'Encrypted Data'}
              </span>

              <div className="font-mono">
                {isRevealed ? (
                  <>
                    <div className="text-xs text-primary mb-1">{secret.label}</div>
                    <div className="text-lg text-text font-bold">{secret.value}</div>
                  </>
                ) : (
                  <div className="flex space-x-1 mt-4">
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className="w-1 h-1 bg-background/20 animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
                    ))}
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}