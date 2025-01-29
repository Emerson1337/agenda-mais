class RecaptchaService {
  static async validateResponse(recaptchaResponse: string): Promise<boolean> {
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          secret: this.getRecaptchaSiteKey(),
          response: recaptchaResponse,
        }),
      },
    );
    const data = await response.json();
    return data.success;
  }

  static getRecaptchaSiteKey(): string {
    return process.env.RECAPTCHA_SITE_KEY || '';
  }
}

export default RecaptchaService;
