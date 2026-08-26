import React, { useState } from 'react';
import { playSound } from '../../config/sounds';

const SECRETS = [
  { id: 1, label: 'CODENAME', value: 'Mirae' },
  { id: 2, label: 'OPERATING BASE', value: 'INDONESIA' },
  { id: 3, label: 'EDUCATION', value: 'UMN (GPA 3.50)' },
  { id: 4, label: 'SPECIALTY', value: 'FULL STACK' },
  { id: 5, label: 'PASSION', value: 'PRECISION COFFEE & CODE' },
  { id: 6, label: 'STATUS', value: 'AVAILABLE FOR HIRE' },
];

export default function NeuralDecryptor() {
  const [decrypted, setDecrypted] = useState<number[]>([]);
  const handleDecrypt = (id: number) => {
    if (decrypted.includes(id)) return;
    playSound('success');
    setDecrypted([...decrypted, id]);
  };

  return (
    <div className="max-w-4xl mx-auto py-20 px-6">
      <div className="mb-8 border-b border-primary/30 pb-4 flex justify-between items-end">
        <div>
          <span className="text-[10px] font-mono text-primary-glow uppercase tracking-widest block mb-1">
            // CIPHER_INTERFACE
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-text">NEURAL LINK DECRYPTOR</h2>
        </div>
        <span className="font-mono text-primary-glow text-xs font-bold bg-primary/20 border border-primary/40 px-2.5 py-1 rounded-xs">
          PROGRESS: {Math.round((decrypted.length / SECRETS.length) * 100)}%
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
              className={`relative h-32 border rounded-xs p-4 text-left transition-all duration-300 group overflow-hidden ${
                isRevealed 
                  ? 'bg-primary/25 border-primary-glow shadow-[0_0_20px_rgba(104,24,38,0.4)]' 
                  : 'bg-surface/80 backdrop-blur-md border-primary/40 hover:border-primary-glow hover:bg-surface'
              }`}
            >
              {/* Tactical Corner Accent */}
              <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-primary-glow/50" />

              {/* Scanline effect */}
              {!isRevealed && (
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-glow/10 to-transparent h-[200%] w-full animate-scan pointer-events-none" />
              )}

              <span className="font-mono text-[10px] tracking-widest text-text/50 block mb-2">
                {isRevealed ? '[DECRYPTED]' : '[ENCRYPTED_NODE]'}
              </span>

              <div className="font-mono">
                {isRevealed ? (
                  <>
                    <div className="text-xs text-primary-glow font-bold mb-1">{secret.label}</div>
                    <div className="text-base md:text-lg text-text font-bold tracking-tight">{secret.value}</div>
                  </>
                ) : (
                  <div className="flex space-x-1.5 mt-4">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="w-1.5 h-1.5 bg-primary-glow/60 rounded-xs animate-pulse" style={{ animationDelay: `${i * 120}ms` }} />
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

