import { useEffect, useMemo, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { z } from 'zod';
import { useAppStore } from '../store/userStore';
import Lottie from 'lottie-react';
import PermissionToggles from '../components/PermissionToggles';

const schema = z.object({
  mode: z.enum(['login', 'register']),
  username: z.string().min(3),
  fullName: z.string().min(3),
  email: z.string().email().optional(),
  phone: z.string().regex(/^\+?\d{10,14}$/).optional(),
  password: z.string().min(6),
  nationalId: z.string().min(6).optional(),
  passport: z.string().min(6).optional(),
  acceptTerms: z.literal(true),
});

// Simple inline Lottie json (placeholder elegant wave)
const sareeAnim = {
  v: "5.7.4",
  fr: 30,
  ip: 0,
  op: 120,
  w: 400,
  h: 400,
  nm: "saree",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "wave",
      sr: 1,
      ks: { o: { a: 0, k: 100 }, r: { a: 0, k: 0 }, p: { a: 0, k: [200, 200, 0] }, a: { a: 0, k: [0, 0, 0] }, s: { a: 0, k: [100, 100, 100] } },
      shapes: [
        { ty: 'rc', d: 1, s: { a: 0, k: [360, 200] }, p: { a: 0, k: [0, 0] }, r: { a: 0, k: 30 } },
        { ty: 'fl', c: { a: 0, k: [0.96, 0.4, 0.24, 1] }, o: { a: 0, k: 100 } },
      ],
      ao: 0,
    },
  ],
  markers: [],
} as const;

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export default function Auth() {
  const navigate = useNavigate();
  const { setUser, authenticate, loadFromStorage } = useAppStore();
  useEffect(() => loadFromStorage(), [loadFromStorage]);

  const [form, setForm] = useState({
    mode: 'register' as 'login' | 'register',
    username: '',
    fullName: '',
    email: '',
    phone: '',
    password: '',
    nationalId: '',
    passport: '',
    acceptTerms: false,
  });
  const [otpSentTo, setOtpSentTo] = useState<'email' | 'phone' | null>(null);
  const [otpCode, setOtpCode] = useState('');
  const [serverOtp, setServerOtp] = useState('');
  const [error, setError] = useState('');

  const canSendOtp = useMemo(() => {
    return (form.email && /@/.test(form.email)) || (form.phone && form.phone.length >= 10);
  }, [form.email, form.phone]);

  const sendOtp = (to: 'email' | 'phone') => {
    if (!canSendOtp) return;
    const code = generateOtp();
    setServerOtp(code);
    setOtpSentTo(to);
    alert(`Your OTP is ${code}`);
  };

  const onSubmit = () => {
    setError('');
    const parsed = schema.safeParse({ ...form, acceptTerms: form.acceptTerms });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message || 'Invalid form');
      return;
    }
    if (!otpSentTo || otpCode !== serverOtp) {
      setError('Please verify OTP');
      return;
    }
    setUser({
      username: form.username,
      fullName: form.fullName,
      email: form.email || undefined,
      phone: form.phone || undefined,
      nationalId: form.nationalId || undefined,
      passport: form.passport || undefined,
    });
    authenticate(true);
    navigate('/home');
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="cultural-bg" />
        <div className="auth-left">
          <Lottie animationData={sareeAnim as any} loop autoplay style={{ width: 260, height: 260 }} />
          <h2>Namaste!</h2>
          <p>Experience India with AI-guided tours, travel, food, and more.</p>
        </div>
        <div className="auth-right">
          <div className="mode-toggle">
            <button className={form.mode === 'login' ? 'active' : ''} onClick={() => setForm({ ...form, mode: 'login' })}>
              Login
            </button>
            <button
              className={form.mode === 'register' ? 'active' : ''}
              onClick={() => setForm({ ...form, mode: 'register' })}
            >
              Register
            </button>
          </div>

          <div className="form-grid">
            <label>
              <span>Username</span>
              <input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
            </label>
            <label>
              <span>Full Name</span>
              <input value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
            </label>
            <label>
              <span>Email</span>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </label>
            <label>
              <span>Phone</span>
              <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91..." />
            </label>
            <label>
              <span>Password</span>
              <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
            </label>
            <label>
              <span>National ID</span>
              <input value={form.nationalId} onChange={(e) => setForm({ ...form, nationalId: e.target.value })} />
            </label>
            <label>
              <span>Passport</span>
              <input value={form.passport} onChange={(e) => setForm({ ...form, passport: e.target.value })} />
            </label>
          </div>

          <div className="otp-row">
            <button disabled={!canSendOtp} onClick={() => sendOtp(form.phone ? 'phone' : 'email')}>
              Send OTP
            </button>
            <input placeholder="Enter OTP" value={otpCode} onChange={(e) => setOtpCode(e.target.value)} />
            <button onClick={() => alert('Password reset link sent!')}>Forgot Password</button>
          </div>

          <label className="terms">
            <input type="checkbox" checked={form.acceptTerms} onChange={(e) => setForm({ ...form, acceptTerms: e.target.checked })} />
            <span>
              I accept the <Link to="/terms">Terms & Conditions</Link>
            </span>
          </label>

          <div className="actions">
            <button className="primary" onClick={onSubmit}>
              {form.mode === 'login' ? 'Login' : 'Create Account'}
            </button>
          </div>
        </div>
      </div>

      <section className="permissions">
        <h3>Allow Permissions</h3>
        <p>Enable location, call log (mobile), and notifications for best experience.</p>
        <div>
          <PermissionToggles />
        </div>
      </section>
    </div>
  );
}