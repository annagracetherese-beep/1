import React, { useState } from 'react';
import { sound } from '../../audio/soundManager';
import { WashiTape, ScrabbleTiles, StickerSmiley, StickerFlower } from '../ui/ScrapbookElements';
import { Map, Mail, Send, CheckCircle, Sparkles, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ContactStationSectionProps {
  onBackToMap: () => void;
}

/**
 * LOCATION 06 — CONTACT STATION
 * Cozy Postal Station with handwritten letter desk, editable contact placeholders,
 * and working interactive postcard dispatcher!
 */
export const ContactStationSection: React.FC<ContactStationSectionProps> = ({
  onBackToMap,
}) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  // Copy helper
  const handleCopy = (text: string, field: string) => {
    sound.playClick();
    navigator.clipboard?.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    sound.playSelect();
    setIsSent(true);

    // Launch celebratory confetti
    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#f4a6b2', '#ffe066', '#74c0fc', '#cbb2fe'],
      });
    } catch {
      // safe
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-6 p-4 sm:p-6 animate-fadeIn">
      <div className="relative bg-white border-4 border-ink rounded-3xl shadow-brutal-xl overflow-hidden p-6 sm:p-8 paper-grid">
        {/* Top Tape */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-20">
          <WashiTape color="rgba(255, 190, 118, 0.85)" width="130px" rotation={1} />
        </div>

        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-dashed border-ink/30 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="font-pixel text-xs bg-pastel-peach text-ink px-3 py-1 rounded-full border-2 border-ink shadow-brutal-sm font-bold">
              LOCATION 06
            </span>
            <span className="font-pixel text-xs text-ink/70">CONTACT STATION &bull; POST OFFICE</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sound.playClick();
                onBackToMap();
              }}
              className="btn-neo bg-cream-200 hover:bg-cream-300 px-3 py-1.5 rounded-xl text-xs font-pixel text-ink flex items-center gap-1.5"
            >
              <Map size={14} />
              <span>RETURN TO MAP</span>
            </button>
          </div>
        </div>

        {/* Section Heading */}
        <div className="mb-6 text-left">
          <ScrabbleTiles text="CONNECT" size="sm" className="mb-2" />
          <h2 className="font-pixel text-xl sm:text-3xl text-ink tracking-tight mt-2 flex items-center gap-2">
            &ldquo;LET&apos;S CONNECT!&rdquo;
            <Mail size={26} className="text-orange-600" />
          </h2>
          <p className="text-base text-ink/80 font-medium mt-1">
            &ldquo;Have an interesting idea, want to connect or simply talk about design and technology? I&apos;d love to hear from you!&rdquo;
          </p>
        </div>

        {/* Handwritten Note Callout (as specified) */}
        <div className="relative bg-pastel-yellowLight border-2 border-ink p-4 rounded-2xl shadow-brutal-sm text-left mb-6 max-w-lg">
          <div className="absolute -top-3 left-4">
            <WashiTape color="rgba(244, 166, 178, 0.85)" width="50px" rotation={-3} />
          </div>
          <div className="flex items-center gap-2">
            <StickerSmiley size={24} />
            <span className="font-handwriting text-2xl text-ink font-bold">
              &ldquo;Good things start with a hello!&rdquo;
            </span>
          </div>
          <p className="text-xs text-ink/75 font-semibold mt-1">
            Always open to chats, design discussions, and friendly guidance from mentors and peers.
          </p>
        </div>

        {/* Grid: Postcard Form & Social Connect Links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Left: Interactive Postcard Letter Desk */}
          <div className="md:col-span-7 text-left">
            <div className="relative bg-[#fcf9f2] border-3 border-ink rounded-2xl p-5 shadow-brutal paper-dots">
              {/* Postage Stamp Top Right */}
              <div className="absolute top-4 right-4 w-12 h-14 bg-white border-2 border-dashed border-ink p-1 flex flex-col items-center justify-between shadow-xs">
                <span className="text-xs">📮</span>
                <span className="font-pixel text-[7px] text-ink">AIRMAIL</span>
                <div className="w-full h-1 bg-pastel-pink rounded-xs" />
              </div>

              <h4 className="font-pixel text-xs text-ink font-bold mb-3 flex items-center gap-1.5">
                <Sparkles size={14} className="text-amber-600" />
                <span>WRITE A POSTCARD MESSAGE</span>
              </h4>

              {isSent ? (
                <div className="bg-emerald-50 border-2 border-ink rounded-xl p-6 text-center space-y-3">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-700 border-2 border-ink">
                    <CheckCircle size={28} />
                  </div>
                  <h5 className="font-pixel text-sm text-ink font-bold">POSTCARD DISPATCHED!</h5>
                  <p className="text-xs text-ink/80 leading-relaxed font-medium">
                    Thank you, {senderName || 'friend'}! Your note has been stamped and placed in the postbox.
                  </p>
                  <button
                    onClick={() => {
                      setIsSent(false);
                      setMessage('');
                    }}
                    className="btn-neo bg-pastel-yellow px-4 py-1.5 rounded-lg text-xs font-pixel text-ink mt-2"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSendMessage} className="space-y-3">
                  <div>
                    <label className="block font-pixel text-[10px] text-ink mb-1">
                      YOUR NAME:
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex, fellow explorer"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      className="w-full bg-white border-2 border-ink rounded-lg px-3 py-2 text-xs text-ink font-medium focus:outline-none focus:ring-2 focus:ring-pastel-yellow"
                    />
                  </div>

                  <div>
                    <label className="block font-pixel text-[10px] text-ink mb-1">
                      YOUR EMAIL:
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. alex@example.com"
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      className="w-full bg-white border-2 border-ink rounded-lg px-3 py-2 text-xs text-ink font-medium focus:outline-none focus:ring-2 focus:ring-pastel-yellow"
                    />
                  </div>

                  <div>
                    <label className="block font-pixel text-[10px] text-ink mb-1">
                      MESSAGE:
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Say hello, share advice, or ask about projects..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-white border-2 border-ink rounded-lg px-3 py-2 text-xs text-ink font-medium focus:outline-none focus:ring-2 focus:ring-pastel-yellow resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full btn-neo bg-pastel-yellow hover:bg-[#ffeb85] py-2.5 rounded-xl font-pixel text-xs text-ink font-bold flex items-center justify-center gap-2 mt-2"
                  >
                    <Send size={14} />
                    <span>[ DISPATCH POSTCARD ]</span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right: Contact Information & Editable Placeholders */}
          <div className="md:col-span-5 text-left space-y-3">
            <div className="bg-cream-100 border-2 border-ink rounded-2xl p-4 shadow-brutal-sm">
              <span className="font-pixel text-[10px] text-ink/70 block mb-2">
                CONFIGURED ADDRESSES (PLACEHOLDERS):
              </span>

              {/* Email */}
              <div className="bg-white p-2.5 rounded-lg border border-ink/40 mb-2 flex items-center justify-between">
                <div className="overflow-hidden">
                  <span className="font-pixel text-[9px] text-ink/60 block">EMAIL:</span>
                  <span className="text-xs font-bold text-ink truncate block">
                    anna.anoop@amaljyothi.ac.in
                  </span>
                </div>
                <button
                  onClick={() => handleCopy('anna.anoop@amaljyothi.ac.in', 'email')}
                  className="p-1.5 hover:bg-cream-200 rounded border border-ink/30 text-ink shrink-0 ml-1"
                  title="Copy placeholder email"
                >
                  {copiedField === 'email' ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                </button>
              </div>

              {/* LinkedIn */}
              <div className="bg-white p-2.5 rounded-lg border border-ink/40 mb-2 flex items-center justify-between">
                <div className="overflow-hidden">
                  <span className="font-pixel text-[9px] text-ink/60 flex items-center gap-1">
                    <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.88a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24"/></svg> LINKEDIN:
                  </span>
                  <span className="text-xs font-bold text-ink truncate block">
                    linkedin.com/in/anna-anoop
                  </span>
                </div>
                <button
                  onClick={() => handleCopy('linkedin.com/in/anna-anoop', 'linkedin')}
                  className="p-1.5 hover:bg-cream-200 rounded border border-ink/30 text-ink shrink-0 ml-1"
                  title="Copy placeholder LinkedIn"
                >
                  {copiedField === 'linkedin' ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                </button>
              </div>

              {/* GitHub */}
              <div className="bg-white p-2.5 rounded-lg border border-ink/40 mb-2 flex items-center justify-between">
                <div className="overflow-hidden">
                  <span className="font-pixel text-[9px] text-ink/60 flex items-center gap-1">
                    <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"/></svg> GITHUB:
                  </span>
                  <span className="text-xs font-bold text-ink truncate block">
                    github.com/anna-anoop
                  </span>
                </div>
                <button
                  onClick={() => handleCopy('github.com/anna-anoop', 'github')}
                  className="p-1.5 hover:bg-cream-200 rounded border border-ink/30 text-ink shrink-0 ml-1"
                  title="Copy placeholder GitHub"
                >
                  {copiedField === 'github' ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                </button>
              </div>

              {/* Instagram */}
              <div className="bg-white p-2.5 rounded-lg border border-ink/40 flex items-center justify-between">
                <div className="overflow-hidden">
                  <span className="font-pixel text-[9px] text-ink/60 flex items-center gap-1">
                    <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg> INSTAGRAM:
                  </span>
                  <span className="text-xs font-bold text-ink truncate block">
                    @annaanoop
                  </span>
                </div>
                <button
                  onClick={() => handleCopy('@annaanoop', 'instagram')}
                  className="p-1.5 hover:bg-cream-200 rounded border border-ink/30 text-ink shrink-0 ml-1"
                  title="Copy placeholder Instagram"
                >
                  {copiedField === 'instagram' ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                </button>
              </div>
            </div>

            {/* Note about placeholders */}
            <p className="text-[11px] text-ink/60 italic leading-snug">
              * Placeholders used per project guidelines because personal social links have not been linked yet.
            </p>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="mt-8 pt-4 border-t border-ink/20 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => {
              sound.playClick();
              onBackToMap();
            }}
            className="btn-neo bg-cream-200 hover:bg-cream-300 px-4 py-2 rounded-xl text-xs font-pixel text-ink flex items-center gap-2"
          >
            <Map size={14} />
            <span>&lt; BACK TO MAP</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-pixel text-emerald-800">
            <StickerFlower size={20} color="#f4a6b2" />
            <span>ADVENTURE COMPLETED!</span>
          </div>
        </div>
      </div>
    </div>
  );
};
