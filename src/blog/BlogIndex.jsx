import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getAllPosts } from "./blogUtils";

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <>
      <Helmet>
        <title>Blog | Mario Polanco - AI Integrations</title>
        <meta name="description" content="Insights on AI automation, workflow optimization, and digital strategy for businesses in Los Cabos and beyond." />
        <meta property="og:title" content="Blog | Mario Polanco" />
        <meta property="og:description" content="Insights on AI automation, workflow optimization, and digital strategy." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://marioai.co/blog" />
        <link rel="canonical" href="https://marioai.co/blog" />
      </Helmet>

      <div style={{
        minHeight: "100vh",
        background: "#FAFAF7",
        fontFamily: "'DM Sans', sans-serif",
        color: "#1a1a1a"
      }}>
        {/* Nav */}
        <nav style={{
          padding: "22px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #e8e6e0"
        }}>
          <Link to="/" style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 20,
            fontWeight: 600,
            letterSpacing: "-0.5px",
            textDecoration: "none",
            color: "#1a1a1a"
          }}>
            MP
          </Link>
          <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
            <Link to="/" style={{ fontSize: 14, color: "#666", textDecoration: "none" }}>Home</Link>
            <Link to="/blog" style={{ fontSize: 14, color: "#1a1a1a", textDecoration: "none", fontWeight: 500 }}>Blog</Link>
          </div>
        </nav>

        {/* Header */}
        <div style={{
          maxWidth: 800,
          margin: "0 auto",
          padding: "80px 40px 40px"
        }}>
          <p style={{
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: "#999",
            marginBottom: 12
          }}>Blog</p>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(32px, 4vw, 48px)",
            fontWeight: 600,
            letterSpacing: "-1px",
            marginBottom: 16
          }}>
            Insights & Ideas
          </h1>
          <p style={{ fontSize: 18, color: "#666", lineHeight: 1.6, maxWidth: 560 }}>
            Practical takes on AI automation, workflow optimization, and building smarter businesses.
          </p>
        </div>

        {/* Posts */}
        <div style={{
          maxWidth: 800,
          margin: "0 auto",
          padding: "20px 40px 80px"
        }}>
          {posts.length === 0 && (
            <p style={{ color: "#999", fontSize: 16 }}>Coming soon.</p>
          )}
          {posts.map(post => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              style={{
                display: "block",
                textDecoration: "none",
                color: "inherit",
                padding: "32px 0",
                borderBottom: "1px solid #e8e6e0"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 20 }}>
                <div style={{ flex: 1 }}>
                  <h2 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 22,
                    fontWeight: 600,
                    letterSpacing: "-0.5px",
                    marginBottom: 8,
                    lineHeight: 1.3
                  }}>
                    {post.title}
                  </h2>
                  <p style={{ fontSize: 15, color: "#666", lineHeight: 1.6, marginBottom: 12 }}>
                    {post.description}
                  </p>
                  <div style={{ display: "flex", gap: 16, alignItems: "center", fontSize: 13, color: "#999" }}>
                    <span>{new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
                    {post.tags && post.tags.length > 0 && (
                      <span style={{ display: "flex", gap: 6 }}>
                        {post.tags.slice(0, 3).map(tag => (
                          <span key={tag} style={{
                            background: "#f0efeb",
                            padding: "2px 8px",
                            borderRadius: 3,
                            fontSize: 11,
                            letterSpacing: "0.5px",
                            textTransform: "uppercase"
                          }}>
                            {tag}
                          </span>
                        ))}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <footer style={{
          padding: "40px",
          borderTop: "1px solid #e8e6e0",
          textAlign: "center",
          fontSize: 13,
          color: "#999"
        }}>
          Mario Polanco &middot; AI Integrations Consultant &middot; Los Cabos
        </footer>
      </div>
    </>
  );
}
