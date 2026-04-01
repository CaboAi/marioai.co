import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getPostBySlug } from "./blogUtils";

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'DM Sans', sans-serif",
        background: "#FAFAF7"
      }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, marginBottom: 16 }}>404</h1>
        <p style={{ color: "#666", marginBottom: 24 }}>Post not found.</p>
        <Link to="/blog" style={{ color: "#1a1a1a", fontWeight: 500 }}>Back to blog</Link>
      </div>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: post.author || "Mario Polanco",
      url: "https://marioai.co"
    },
    publisher: {
      "@type": "Person",
      name: "Mario Polanco"
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://marioai.co/blog/${post.slug}`
    },
    ...(post.image && { image: `https://marioai.co${post.image}` })
  };

  return (
    <>
      <Helmet>
        <title>{post.title} | Mario Polanco</title>
        <meta name="description" content={post.description} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://marioai.co/blog/${post.slug}`} />
        {post.image && <meta property="og:image" content={`https://marioai.co${post.image}`} />}
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content={post.author || "Mario Polanco"} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.description} />
        <link rel="canonical" href={`https://marioai.co/blog/${post.slug}`} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
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
            <Link to="/blog" style={{ fontSize: 14, color: "#666", textDecoration: "none" }}>Blog</Link>
          </div>
        </nav>

        {/* Article */}
        <article style={{
          maxWidth: 720,
          margin: "0 auto",
          padding: "60px 40px 80px"
        }}>
          {/* Breadcrumb */}
          <div style={{ fontSize: 13, color: "#999", marginBottom: 32 }}>
            <Link to="/" style={{ color: "#999", textDecoration: "none" }}>Home</Link>
            {" / "}
            <Link to="/blog" style={{ color: "#999", textDecoration: "none" }}>Blog</Link>
            {" / "}
            <span style={{ color: "#666" }}>{post.title}</span>
          </div>

          {/* Header */}
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(28px, 4vw, 42px)",
            fontWeight: 600,
            letterSpacing: "-1px",
            lineHeight: 1.2,
            marginBottom: 16
          }}>
            {post.title}
          </h1>

          <div style={{ display: "flex", gap: 16, alignItems: "center", fontSize: 14, color: "#999", marginBottom: 40 }}>
            <span>{post.author || "Mario Polanco"}</span>
            <span>&middot;</span>
            <span>{new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
          </div>

          {post.image && (
            <img
              src={post.image}
              alt={post.title}
              style={{
                width: "100%",
                height: "auto",
                borderRadius: 8,
                marginBottom: 40,
                border: "1px solid #e8e6e0"
              }}
            />
          )}

          {/* Content */}
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div style={{ marginTop: 48, paddingTop: 24, borderTop: "1px solid #e8e6e0", display: "flex", gap: 8, flexWrap: "wrap" }}>
              {post.tags.map(tag => (
                <span key={tag} style={{
                  background: "#f0efeb",
                  padding: "4px 12px",
                  borderRadius: 4,
                  fontSize: 12,
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  color: "#666"
                }}>
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Back link */}
          <div style={{ marginTop: 48 }}>
            <Link to="/blog" style={{
              fontSize: 14,
              color: "#1a1a1a",
              fontWeight: 500,
              textDecoration: "none"
            }}>
              &larr; All posts
            </Link>
          </div>
        </article>

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

        <style>{`
          .blog-content h2 {
            font-family: 'Playfair Display', serif;
            font-size: 28px;
            font-weight: 600;
            letter-spacing: -0.5px;
            margin: 40px 0 16px;
            line-height: 1.3;
          }
          .blog-content h3 {
            font-family: 'Playfair Display', serif;
            font-size: 22px;
            font-weight: 600;
            margin: 32px 0 12px;
            line-height: 1.3;
          }
          .blog-content p {
            font-size: 17px;
            line-height: 1.8;
            color: #444;
            margin-bottom: 20px;
          }
          .blog-content ul, .blog-content ol {
            margin: 16px 0 20px 24px;
            color: #444;
          }
          .blog-content li {
            font-size: 17px;
            line-height: 1.7;
            margin-bottom: 8px;
          }
          .blog-content a {
            color: #1a1a1a;
            text-decoration: underline;
            text-underline-offset: 3px;
          }
          .blog-content blockquote {
            border-left: 3px solid #e8e6e0;
            margin: 24px 0;
            padding: 16px 24px;
            color: #666;
            font-style: italic;
          }
          .blog-content code {
            background: #f0efeb;
            padding: 2px 6px;
            border-radius: 3px;
            font-size: 15px;
          }
          .blog-content pre {
            background: #1a1a1a;
            color: #e8e6e0;
            padding: 20px;
            border-radius: 6px;
            overflow-x: auto;
            margin: 24px 0;
          }
          .blog-content pre code {
            background: none;
            padding: 0;
            color: inherit;
          }
          .blog-content img {
            max-width: 100%;
            height: auto;
            border-radius: 6px;
            margin: 24px 0;
          }
          .blog-content strong {
            font-weight: 600;
            color: #1a1a1a;
          }
        `}</style>
      </div>
    </>
  );
}
