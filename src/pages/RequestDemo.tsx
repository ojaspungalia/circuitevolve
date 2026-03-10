import { useState, FormEvent } from "react";
import { Link } from "react-router-dom";

const RequestDemo = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    jobTitle: "",
    purpose: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "387cddfd-17a1-43b1-a09b-44f545256388", // Replace with your Web3Forms access key
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          company: formData.company,
          job_title: formData.jobTitle,
          purpose: formData.purpose,
          message: formData.message,
          subject: `Demo Request from ${formData.firstName} ${formData.lastName} - ${formData.company}`,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
      } else {
        setError("Something went wrong. Please email us directly at hello@circuitevolve.com");
      }
    } catch (err) {
      setError("Something went wrong. Please email us directly at hello@circuitevolve.com");
      console.error("Form submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background px-6 py-10 md:px-16 md:py-16 text-foreground flex items-center justify-center">
        <div className="mx-auto max-w-2xl text-center space-y-6">
          <div className="text-6xl">✓</div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Thank You!
          </h1>
          <p className="text-lg text-foreground/80">
            We've received your demo request. Our team will reach out to you shortly at <strong>{formData.email}</strong>.
          </p>
          <div className="pt-6">
            <Link
              to="/"
              className="inline-block rounded-full bg-foreground px-8 py-3 text-base font-medium text-background transition-opacity hover:opacity-85"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-6 py-10 md:px-16 md:py-16 text-foreground">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <Link
            to="/"
            className="text-foreground/60 hover:text-foreground transition-colors"
          >
            ← Back to Home
          </Link>
        </div>

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-8">
          Request a Demo
        </h1>

        <p className="text-lg text-foreground/80 mb-8">
          See how circuitEvolve can accelerate your analog circuit design workflow. Fill out the form below and our team will get in touch.
        </p>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                required
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-foreground/20 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/50"
              />
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-foreground/20 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/50"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-foreground/20 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/50"
            />
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-medium mb-2">
              Company <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="company"
              name="company"
              required
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-foreground/20 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/50"
            />
          </div>

          <div>
            <label htmlFor="jobTitle" className="block text-sm font-medium mb-2">
              Job Title
            </label>
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-foreground/20 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/50"
            />
          </div>

          <div>
            <label htmlFor="purpose" className="block text-sm font-medium mb-2">
              Purpose
            </label>
            <select
              id="purpose"
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-foreground/20 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/50"
            >
              <option value="">Select...</option>
              <option value="Research">Research</option>
              <option value="Production">Production</option>
              <option value="Evaluation">Evaluation</option>
              <option value="Partnership">Partnership</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              Additional Information
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-foreground/20 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/50 resize-none"
              placeholder="Tell us about your use case or any specific requirements..."
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-foreground px-8 py-4 text-base font-medium text-background transition-opacity hover:opacity-85 disabled:opacity-50 disabled:cursor-not-allowed sm:text-lg"
          >
            {isSubmitting ? "Sending..." : "Request Demo"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-foreground/60">
          You can also reach us directly at{" "}
          <a href="mailto:hello@circuitevolve.com" className="underline hover:text-foreground">
            hello@circuitevolve.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default RequestDemo;
