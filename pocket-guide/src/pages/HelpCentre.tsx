import { useState } from 'react';

const helpData = {
  hospital: ['City Hospital', 'General Hospital'],
  police: ['Central Police Station', 'Sector Police Booth'],
  atm: ['SBI ATM', 'HDFC ATM'],
  medical: ['HealthPlus Pharmacy', 'MediCare Store'],
  help: ['Tourist Help Centre'],
};

function getResponse(q: string): string {
  const lq = q.toLowerCase();
  if (lq.includes('hospital')) return `Nearby hospitals: ${helpData.hospital.join(', ')}`;
  if (lq.includes('police')) return `Nearby police stations: ${helpData.police.join(', ')}`;
  if (lq.includes('atm')) return `Nearby ATMs: ${helpData.atm.join(', ')}`;
  if (lq.includes('medical') || lq.includes('pharmacy')) return `Nearby medical stores: ${helpData.medical.join(', ')}`;
  if (lq.includes('help') || lq.includes('centre')) return `Help centres: ${helpData.help.join(', ')}`;
  if (lq.includes('admin') || lq.includes('emergency')) return 'Connecting you to admin... Please wait.';
  return 'I can help find hospitals, police, ATMs, medical stores, help centres, or connect to admin.';
}

export default function HelpCentre() {
  const [messages, setMessages] = useState<Array<{ from: 'user' | 'bot'; text: string }>>([
    { from: 'bot', text: 'Hi! How can I help you today?' },
  ]);
  const [input, setInput] = useState('');

  const send = () => {
    if (!input.trim()) return;
    const q = input.trim();
    setMessages((m) => [...m, { from: 'user', text: q }]);
    setInput('');
    const resp = getResponse(q);
    setTimeout(() => setMessages((m) => [...m, { from: 'bot', text: resp }]), 400);
  };

  return (
    <div className="help-centre">
      <h2>Help Centre</h2>
      <div className="chat">
        {messages.map((m, i) => (
          <div key={i} className={`msg ${m.from}`}>{m.text}</div>
        ))}
      </div>
      <div className="chat-input">
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask for hospitals, police, ATMs..." />
        <button className="primary" onClick={send}>Send</button>
      </div>
    </div>
  );
}