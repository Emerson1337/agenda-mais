"use client";

import ReCAPTCHA from "react-google-recaptcha";
import { useEffect, useRef } from "react";

const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

interface Props {
  className?: string;
  onChange: (token: string | null) => void;
  reload?: boolean;
}

export default function Captcha({ onChange, className, reload }: Props) {
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  useEffect(() => {
    if (reload && recaptchaRef.current) {
      recaptchaRef.current.reset();
    }
  }, [reload]);

  return (
    <div className="min-h-20">
      <ReCAPTCHA
        ref={recaptchaRef}
        defaultValue={""}
        className={className}
        sitekey={recaptchaKey}
        onChange={onChange}
      />
    </div>
  );
}
