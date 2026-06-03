import { useEffect, useRef, useState } from "react";
import { asset, page } from "../components/SiteShell";
import { isPlaceholderLink, links } from "../data/links";

export { asset, page };

export const avatarAsset = (src: string) => src.startsWith("http://") || src.startsWith("https://") ? src : asset(src);
const CATEGORY_SCROLL_DURATION_MS = 1100;
export const ARTICLE_WORDS_PER_MINUTE = 225;
export const BOTTOM_GLOW_VARIANT = "v2";
let categoryScrollAnimationFrame: number | null = null;

export function getPageScrollY() {
  return window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
}

export function getScrollMarginTop(element: HTMLElement) {
  return Number.parseFloat(window.getComputedStyle(element).scrollMarginTop) || 0;
}

function setPageScrollY(top: number) {
  window.scrollTo({ top });
}

function cancelCategoryScrollAnimation() {
  if (categoryScrollAnimationFrame === null) return;
  window.cancelAnimationFrame(categoryScrollAnimationFrame);
  categoryScrollAnimationFrame = null;
}

export function animatePageScrollTo(targetTop: number, onComplete?: () => void) {
  cancelCategoryScrollAnimation();

  const startTop = getPageScrollY();
  const distance = targetTop - startTop;
  const startTime = performance.now();

  const step = (timestamp: number) => {
    const progress = Math.min((timestamp - startTime) / CATEGORY_SCROLL_DURATION_MS, 1);
    const eased = progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;
    setPageScrollY(startTop + distance * eased);

    if (progress < 1) {
      categoryScrollAnimationFrame = requestAnimationFrame(step);
      return;
    }

    categoryScrollAnimationFrame = null;
    onComplete?.();
  };

  categoryScrollAnimationFrame = requestAnimationFrame(step);
}

export function LinkButton({ href, children, dark = false }: { href: string; children: string; dark?: boolean }) {
  const safeHref = isPlaceholderLink(href) ? "#" : href;
  return (
    <a className={`pill-button tc-type-link-big ${dark ? "pill-button--dark" : ""}`} href={safeHref} target={safeHref.startsWith("http") ? "_blank" : undefined} rel={safeHref.startsWith("http") ? "noopener noreferrer" : undefined}>
      <span>{children}</span>
      <span className="button-arrow-icon" aria-hidden="true">
        <img className="button-arrow-icon__default" src={asset(dark ? "button-arrow-white.svg" : "button-arrow-light.svg")} alt="" />
        <img className="button-arrow-icon__hover" src={asset(dark ? "button-arrow-black.svg" : "button-arrow-white.svg")} alt="" />
      </span>
    </a>
  );
}

export function DisabledLinkButton({ children, dark = false }: { children: string; dark?: boolean }) {
  return (
    <span className={`pill-button pill-button--disabled tc-type-link-big ${dark ? "pill-button--dark" : ""}`} aria-disabled="true">
      <span>{children}</span>
      <span className="button-arrow-icon" aria-hidden="true">
        <img className="button-arrow-icon__default" src={asset(dark ? "button-arrow-white.svg" : "button-arrow-light.svg")} alt="" />
        <img className="button-arrow-icon__hover" src={asset(dark ? "button-arrow-black.svg" : "button-arrow-white.svg")} alt="" />
      </span>
    </span>
  );
}

export function ActionButton({ children, dark = false, onClick }: { children: string; dark?: boolean; onClick: () => void }) {
  return (
    <button className={`pill-button tc-type-link-big ${dark ? "pill-button--dark" : ""}`} type="button" onClick={onClick}>
      <span>{children}</span>
      <span className="button-arrow-icon" aria-hidden="true">
        <img className="button-arrow-icon__default" src={asset(dark ? "button-arrow-white.svg" : "button-arrow-light.svg")} alt="" />
        <img className="button-arrow-icon__hover" src={asset(dark ? "button-arrow-black.svg" : "button-arrow-white.svg")} alt="" />
      </span>
    </button>
  );
}

export function ShareOnXButton({ href }: { href: string }) {
  const safeHref = isPlaceholderLink(href) ? "#" : href;
  const xIconMask = `url("${asset("article-x-default.svg")}")`;
  return (
    <a className="share-on-x-button pill-button tc-type-link-big" href={safeHref} target={safeHref.startsWith("http") ? "_blank" : undefined} rel={safeHref.startsWith("http") ? "noopener noreferrer" : undefined}>
      <span>Share on</span>
      <span className="article-action-icon article-share-icon" style={{ WebkitMaskImage: xIconMask, maskImage: xIconMask }} aria-hidden="true" />
    </a>
  );
}

export function DotArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={`dot-arrow-icon ${className}`} viewBox="0 0 10 9" aria-hidden="true" focusable="false">
      <circle cx="2" cy="2" r="2" />
      <circle cx="5" cy="7" r="2" />
      <circle cx="8" cy="2" r="2" />
    </svg>
  );
}

const donationAddresses = [
  {
    label: "LUNC",
    value: "terra1yerplv7hshr5w2mpa2em0knlx3dm6aln9fwj2m",
  },
  {
    label: "BTC (Native SegWit)",
    value: "bc1q4vevf342hszd367c5n5qf24f7heek04w5zmsv4",
  },
  {
    label: "BNB",
    value: "0x44Db62D8c5507952c2cFBD2F232A975950789E26",
  },
] as const;

export function DonationModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const dialog = ref.current;
    dialog?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "Tab" && dialog) {
        const focusable = dialog.querySelectorAll<HTMLElement>("button,a");
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { last.focus(); event.preventDefault(); }
        if (!event.shiftKey && document.activeElement === last) { first.focus(); event.preventDefault(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("keydown", onKey); previous?.focus(); };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) setCopied(null);
  }, [open]);

  async function copyAddress(label: string, value: string) {
    const markCopied = () => {
      setCopied(label);
      window.setTimeout(() => setCopied((current) => current === label ? null : current), 1800);
    };

    try {
      await navigator.clipboard.writeText(value);
      markCopied();
    } catch (error) {
      const fallback = document.createElement("textarea");
      fallback.value = value;
      fallback.setAttribute("readonly", "");
      fallback.style.position = "fixed";
      fallback.style.left = "-9999px";
      document.body.appendChild(fallback);
      fallback.select();
      const copiedWithFallback = document.execCommand("copy");
      fallback.remove();
      if (copiedWithFallback) {
        markCopied();
      } else {
        console.warn("DONATION_ADDRESS_COPY_FAILED", error);
      }
    }
  }

  if (!open) return null;

  return (
    <div className="modal-backdrop donation-modal-backdrop" onMouseDown={onClose}>
      <div className="modal donation-modal" role="dialog" aria-modal="true" aria-labelledby="donation-modal-title" ref={ref} tabIndex={-1} onMouseDown={(event) => event.stopPropagation()}>
        <button className="modal-close donation-modal__close x-control" aria-label="Close donation addresses" onClick={onClose}>
          <span /><span /><span /><span /><span />
        </button>
        <div className="donation-modal__copy">
          <h2 className="tc-type-h3" id="donation-modal-title">Donation addresses</h2>
          <div className="donation-addresses" aria-label="Donation addresses">
            {donationAddresses.map(({ label, value }) => (
              <article className="donation-address" key={label}>
                <div className="donation-address__copy">
                  <h3 className="tc-type-link-big">{label}</h3>
                  <code>{value}</code>
                </div>
                <button className="donation-copy-button tc-type-link-small" type="button" onClick={() => void copyAddress(label, value)}>
                  {copied === label ? "Copied" : "Copy"}
                </button>
              </article>
            ))}
          </div>
          <div className="donation-attribution">
            <h3 className="tc-type-h5">Attribution (optional)</h3>
            <p className="tc-type-body-small">If you want to be credited on the "About Terra-Classic.money" page:</p>
            <ul className="tc-type-body-small">
              <li>include your handle/name in the memo/message where your wallet supports it, or</li>
              <li>reply in this thread with: "Donated + your handle" (you can DM me instead if you prefer privacy).</li>
            </ul>
            <p className="tc-type-body-small">If you prefer to stay anonymous, donate with no memo and do not comment.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-links"><a className="tc-type-link-normal" href={isPlaceholderLink(links.privacy) ? "#" : page(links.privacy)}>Privacy Policy</a><a className="tc-type-link-normal" href={isPlaceholderLink(links.brandAssets) ? "#" : page(links.brandAssets)}>Terra Classic brand assets</a><a className="tc-type-link-normal" href={links.networkStatus} target="_blank" rel="noopener noreferrer">Network status</a></div>
      <p className="footer-credit tc-type-body-very-small">
        <span>Terra-Classic.money designed and developed with</span>
        <img src={asset("footer-heart.svg")} alt="love" width="20" height="19" />
        <span>by <a href={links.dawidSkinder} target="_blank" rel="noopener noreferrer">DawidSkinder.pl</a>, with help from various community members.</span>
      </p>
      <a className="back-top" href="#top">
        <span className="tc-type-link-big">Back to the top</span>
        <img src={asset("footer-back-top-arrow.svg")} alt="" aria-hidden="true" />
      </a>
    </footer>
  );
}
