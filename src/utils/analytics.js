export function trackPageView(path) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "page_view", { page_path: path });
  }
}
