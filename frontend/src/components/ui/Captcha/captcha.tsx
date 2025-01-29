"use client";

import ReCAPTCHA from "react-google-recaptcha";

const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

interface Props {
  className?: string;
  onChange: (token: string | null) => void;
}

export default function Captcha({ onChange, className }: Props) {
  return (
    <ReCAPTCHA
      className={className}
      sitekey={recaptchaKey}
      onChange={onChange}
    />
  );
}
