"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, AlertCircle, Loader2 } from "lucide-react";

type Step = "phone" | "otp" | "success";

const OTP_LENGTH = 6;
const RESEND_SECONDS = 30;

type Props = {
  compact?: boolean;
  onSuccess?: () => void;
};

export default function OtpLoginForm({ compact = false, onSuccess }: Props) {
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [resendIn, setResendIn] = useState(RESEND_SECONDS);

  const otpRefs = useRef<Array<HTMLInputElement | null>>([]);
  useEffect(() => {
    if (step !== "otp" || resendIn <= 0) return;
    const t = setTimeout(() => setResendIn((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [step, resendIn]);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const digits = phone.replace(/\D/g, "");
    if (digits.length !== 10) {
      setError("Enter a valid 10-digit mobile number");
      return;
    }
    setError(null);
    setSending(true);
    // TODO: wire to a real send-OTP endpoint (e.g. Firebase, MSG91, Twilio Verify)
    await new Promise((r) => setTimeout(r, 700));
    setSending(false);
    setOtp(Array(OTP_LENGTH).fill(""));
    setResendIn(RESEND_SECONDS);
    setStep("otp");
    setTimeout(() => otpRefs.current[0]?.focus(), 50);
  };

  const handleResend = async () => {
    if (resendIn > 0) return;
    setError(null);
    setSending(true);
    // TODO: re-trigger the real send-OTP endpoint
    await new Promise((r) => setTimeout(r, 500));
    setSending(false);
    setResendIn(RESEND_SECONDS);
    setOtp(Array(OTP_LENGTH).fill(""));
    otpRefs.current[0]?.focus();
  };

  const updateOtpDigit = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    setOtp((prev) => {
      const next = [...prev];
      next[index] = digit;
      return next;
    });
    if (error) setError(null);
    if (digit && index < OTP_LENGTH - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "");
    if (!pasted) return;
    e.preventDefault();
    const digits = pasted.slice(0, OTP_LENGTH).split("");
    setOtp((prev) => {
      const next = [...prev];
      digits.forEach((d, i) => (next[i] = d));
      return next;
    });
    otpRefs.current[Math.min(digits.length, OTP_LENGTH - 1)]?.focus();
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length !== OTP_LENGTH) {
      setError("Enter the complete 6-digit code");
      return;
    }
    setError(null);
    setVerifying(true);
    // TODO: wire to a real verify-OTP endpoint, then set session/auth token
    await new Promise((r) => setTimeout(r, 700));
    setVerifying(false);
    setStep("success");
    setTimeout(() => onSuccess?.(), 1200);
  };

  const gap = compact ? "space-y-4" : "space-y-5";

  if (step === "success") {
    return (
      <div className="flex flex-col items-center justify-center text-center py-10 px-4">
        <span className="w-14 h-14 rounded-full bg-[#AD8A3B]/10 flex items-center justify-center mb-5">
          <Check size={24} className="text-[#AD8A3B]" />
        </span>
        <h3 className="font-serif text-[20px] font-bold text-maroon mb-2">
          Logged In
        </h3>
        <p className="font-sans text-[13.5px] text-gray-500 leading-relaxed max-w-xs">
          Welcome back! You&apos;re now signed in to your Kasibunkari
          account.
        </p>
      </div>
    );
  }

  return (
    <div className={gap}>
      {error && (
        <div className="flex items-start gap-2.5 rounded-lg bg-[#FBEAEA] border border-[#E7B8B8] px-4 py-3">
          <AlertCircle size={16} className="text-[#B3261E] shrink-0 mt-0.5" />
          <p className="font-sans text-[12.5px] font-medium text-[#B3261E]">
            {error}
          </p>
        </div>
      )}

      {step === "phone" && (
        <form onSubmit={handleSendOtp} className={gap} noValidate>
          <div>
            <label className="block font-sans text-[12px] font-semibold text-gray-600 mb-2">
              Mobile Number
            </label>
            <div className="flex items-stretch rounded-lg border border-gray-300 bg-white overflow-hidden focus-within:border-maroon focus-within:ring-2 focus-within:ring-maroon/10 transition-all">
              <span className="flex items-center px-4 border-r border-gray-300 font-sans text-[13.5px] text-gray-600 bg-gray-50">
                +91
              </span>
              <input
                type="tel"
                inputMode="numeric"
                maxLength={10}
                placeholder="98765 43210"
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
                }
                className="flex-1 min-w-0 px-4 py-3.5 font-sans text-[13.5px] text-gray-800 placeholder:text-gray-400 outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={sending}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-maroon text-white font-sans text-[12.5px] font-bold uppercase tracking-[0.12em] px-7 py-3.5 hover:opacity-90 transition-opacity duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {sending ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <>
                Send OTP
                <ArrowRight size={15} />
              </>
            )}
          </button>

          <p className="font-sans text-[11.5px] text-gray-400 leading-relaxed text-center">
            By continuing, you agree to Kasibunkari&apos;s Terms of Service
            and Privacy Policy.
          </p>
        </form>
      )}

      {step === "otp" && (
        <form onSubmit={handleVerify} className={gap} noValidate>
          <div>
            <label className="block font-sans text-[12px] font-semibold text-gray-600 mb-1">
              Enter OTP
            </label>
            <p className="font-sans text-[12px] text-gray-400 mb-3">
              Sent to +91 {phone}{" "}
              <button
                type="button"
                onClick={() => setStep("phone")}
                className="text-maroon font-semibold hover:underline cursor-pointer"
              >
                Change
              </button>
            </p>

            <div className="flex items-center justify-between gap-2">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => {
                    otpRefs.current[i] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => updateOtpDigit(i, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(i, e)}
                  onPaste={handleOtpPaste}
                  className="w-full aspect-square max-w-11 text-center rounded-lg border border-gray-300 bg-white font-sans text-[17px] font-bold text-gray-800 outline-none focus:border-maroon focus:ring-2 focus:ring-maroon/10 transition-all"
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={verifying}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-maroon text-white font-sans text-[12.5px] font-bold uppercase tracking-[0.12em] px-7 py-3.5 hover:opacity-90 transition-opacity duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {verifying ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <>
                Verify &amp; Login
                <ArrowRight size={15} />
              </>
            )}
          </button>

          <p className="text-center font-sans text-[12.5px] text-gray-500">
            {resendIn > 0 ? (
              <>Resend OTP in 0:{resendIn.toString().padStart(2, "0")}</>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                className="text-maroon font-semibold hover:underline cursor-pointer"
              >
                Resend OTP
              </button>
            )}
          </p>
        </form>
      )}
    </div>
  );
}
