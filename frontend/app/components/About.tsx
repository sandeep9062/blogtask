"use client";

export default function About() {
  return (
    <section
      id="about"
      className="py-20 px-4"
      style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">About Us</h2>
        <p className="text-lg text-center">
          This is a blog about technology, programming, and web development. We
          are passionate about sharing our knowledge and experience with the
          community.
        </p>
      </div>
    </section>
  );
}
