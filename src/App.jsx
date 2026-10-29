import { useMemo, useRef, useState } from "react";
import { LayoutGroup, motion, useMotionValue, useSpring } from "motion/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Cursor from "./Cursor.jsx";
import useSmoothScroll from "./useSmoothScroll.js";
import { sectionsFrom } from "./board.js";
import { plates } from "./plates.js";
import { reviewPlaces, reviews } from "./reviews.js";
import menu from "./menu.json";
import { press, spring } from "./tokens.js";
import "lenis/dist/lenis.css";

const phone = "tel:+19043819022";
const order = "https://starscaribbeanrestaurant.com/";

const pickup = [
  ["Monday – Thursday", "11:00 AM – 8:00 PM"],
  ["Friday – Saturday", "11:00 AM – 8:30 PM"],
  ["Sunday", "Closed"],
];

function reduceMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function Pull({ children }) {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, spring);
  const y = useSpring(my, spring);
  return (
    <motion.span
      ref={ref}
      style={{ x, y, display: "inline-flex" }}
      onPointerMove={(event) => {
        if (!window.matchMedia("(pointer: fine)").matches || reduceMotion()) return;
        const rect = ref.current.getBoundingClientRect();
        mx.set((event.clientX - (rect.left + rect.width / 2)) * 0.28);
        my.set((event.clientY - (rect.top + rect.height / 2)) * 0.28);
      }}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}

function CallButton({ className = "btn btn-lg btn-primary" }) {
  return (
    <Pull>
      <motion.a
        className={className}
        href={phone}
        whileTap={{ scale: 0.97 }}
        transition={press}
        data-cursor="text"
      >
        Call (904) 381-9022
      </motion.a>
    </Pull>
  );
}

export default function App() {
  useSmoothScroll();
  const root = useRef(null);

  useGSAP(
    () => {
      if (reduceMotion()) return;
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-line", { y: 28, stagger: 0.08, duration: 0.9, clearProps: "transform" }, 0.05)
        .from(".hero-photo img", { scale: 1.06, duration: 1.1, clearProps: "transform" }, 0)
        .from(".hero-rest", { y: 16, duration: 0.8, clearProps: "transform" }, 0.3);

      gsap.utils.toArray("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          y: 24,
          duration: 0.85,
          ease: "power3.out",
          immediateRender: false,
          clearProps: "transform",
          scrollTrigger: { trigger: el, start: "top 82%", once: true },
        });
      });

    },
    { scope: root },
  );

  return (
    <>
      <Cursor />
      <a className="skip" href="#plates">
        Skip to the plates
      </a>
      <div ref={root}>
        <div className="sheet page-end">
          <header className="nav-bar navbar">
            <a className="display" href="#top" data-cursor="text" style={{ fontSize: "1.6rem", minHeight: 44, display: "inline-flex", alignItems: "center" }}>
              Star’s
            </a>
            <nav className="nav-links" aria-label="Sections">
              <a href="#plates" data-cursor="text">Plates</a>
              <a href="#menu" data-cursor="text">Menu</a>
              <a href="#reviews" data-cursor="text">Guests</a>
              <a href="#visit" data-cursor="text">Visit</a>
              <CallButton />
            </nav>
          </header>

          <Hero />
          <Counter />
          <MenuSheet />
          <Guests />
          <Visit />
        </div>
        <nav className="dock" aria-label="Actions">
          <a href="#plates">Plates</a>
          <a href="#menu">Menu</a>
          <a href={phone}>Call</a>
          <a href={order}>Order</a>
        </nav>
        <footer className="back">
          <h2 className="display">Star’s</h2>
          <div className="back-meta">
            <a href={phone} data-cursor="text">
              (904) 381-9022
            </a>
            <a href={order} data-cursor="text">
              Order online
            </a>
            <a href="https://www.instagram.com/starscaribbeanb/" data-cursor="text">
              Instagram
            </a>
            <a href="https://www.facebook.com/StarsCaribbeanRestaurant" data-cursor="text">
              Facebook
            </a>
            <span>1901 Blanding Blvd, Jacksonville, FL 32210</span>
          </div>
        </footer>
      </div>
    </>
  );
}

function Hero() {
  return (
    <section className="hero" id="top" aria-label="Star’s Caribbean">
      <div className="hero-layout">
        <div className="hero-copy">
          <h1 className="display">
            <span className="hero-line" style={{ display: "block" }}>
              Star’s
            </span>
            <span className="hero-line" style={{ display: "block" }}>
              Caribbean
            </span>
          </h1>
          <div className="hero-rest">
            <p>Jacksonville’s Caribbean kitchen on Blanding Blvd. Call and walk in.</p>
            <CallButton />
          </div>
        </div>
        <figure className="hero-photo" data-cursor="media">
          <img
            src="/photos/menu/1000840514.jpg"
            width="800"
            height="800"
            alt="Beef combo plate with oxtails, curry, ribs, rice and peas, cabbage, dumplings, and banana."
          />
        </figure>
      </div>
    </section>
  );
}

function Counter() {
  const [picked, setPicked] = useState(null);
  const plate = plates.find((item) => item.id === picked);

  return (
    <section className="counter" id="plates">
      <div className="frame">
        <h2 className="display" data-reveal>
          Plates
        </h2>
        <p data-reveal>Swipe the counter. The name orders that dish.</p>
        <LayoutGroup>
          {plate ? (
            <motion.figure className="dish" layout transition={spring}>
              <motion.img
                layoutId={plate.id}
                src={plate.src}
                width={plate.width}
                height={plate.height}
                alt={plate.alt}
                transition={spring}
                data-cursor="media"
              />
              <figcaption className="dish-copy">
                <h3>
                  <a href={plate.href} data-cursor="text">
                    {plate.title}
                  </a>
                </h3>
                <p>
                  {plate.price}. {plate.caption}
                </p>
                <div className="dish-actions">
                  <a className="btn btn-lg btn-primary" href={plate.href} data-cursor="text">
                    Order {plate.title}
                  </a>
                  <button className="btn btn-lg" type="button" onClick={() => setPicked(null)}>
                    Back to the counter
                  </button>
                </div>
              </figcaption>
            </motion.figure>
          ) : null}
          <div className="plate-grid">
            {plates.map((item) => (
              <div key={item.id} className="plate-card">
                <motion.button
                  type="button"
                  className="plate-hit"
                  onClick={() => setPicked(item.id)}
                  data-cursor="media"
                  aria-label={`Open ${item.title}`}
                  whileTap={{ scale: 0.98 }}
                  transition={press}
                >
                  {picked === item.id ? (
                    <span className="plate-gap" />
                  ) : (
                    <motion.img
                      layoutId={item.id}
                      src={item.src}
                      width={item.width}
                      height={item.height}
                      alt=""
                      transition={spring}
                    />
                  )}
                </motion.button>
                <a className="plate-order" href={item.href} data-cursor="text">
                  <span>{item.title}</span>
                  <em>{item.price}</em>
                </a>
              </div>
            ))}
          </div>
        </LayoutGroup>
      </div>
    </section>
  );
}

function MenuSheet() {
  const sections = useMemo(() => sectionsFrom(menu), []);
  const [active, setActive] = useState(sections[0].title);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(null);
  const [choice, setChoice] = useState(0);
  const needle = query.trim().toLowerCase();
  const searching = needle.length > 0;
  const current = sections.find((section) => section.title === active) ?? sections[0];
  const visible = searching
    ? sections.flatMap((section) =>
        section.dishes
          .filter((dish) =>
            `${dish.title} ${section.short} ${dish.options.map((option) => `${option.name} ${option.description}`).join(" ")}`
              .toLowerCase()
              .includes(needle),
          )
          .map((dish) => ({ section, dish })),
      )
    : current.dishes.map((dish) => ({ section: current, dish }));

  function toggle(id, dish) {
    if (open === id) {
      setOpen(null);
      return;
    }
    const large = dish.options.findIndex((option) => option.label === "Large");
    setChoice(large === -1 ? 0 : large);
    setOpen(id);
  }

  return (
    <section className="menu-block" id="menu">
      <div className="frame">
        <div className="menu-sheet">
          <h2 className="display">Menu</h2>
          <p className="menu-note">Prices from the order page. Open a dish, then send the order.</p>
          <label className="finder-label" htmlFor="menu-find">
            Find a dish
          </label>
          <input
            id="menu-find"
            className="input input-lg finder"
            type="search"
            value={query}
            placeholder="Oxtail, goat, punch"
            onChange={(event) => {
              setQuery(event.target.value);
              setOpen(null);
            }}
          />
          {searching ? null : (
            <div className="menu-tabs" role="tablist" aria-label="Menu sections">
              {sections.map((item) => (
                <motion.button
                  key={item.title}
                  type="button"
                  role="tab"
                  className="btn"
                  aria-selected={item.title === current.title}
                  onClick={() => {
                    setActive(item.title);
                    setOpen(null);
                  }}
                  whileTap={{ scale: 0.97 }}
                  transition={press}
                >
                  {item.short}
                </motion.button>
              ))}
            </div>
          )}
          <div className="menu-group" role="tabpanel">
            <h3>{searching ? "Matches" : current.title}</h3>
            {!searching && current.title === "Soups" ? (
              <p className="group-note">
                Tuesday–Thursday: red peas soup. Wednesday: chicken soup. Friday: goat soup. Saturday: chef special.
              </p>
            ) : null}
            {visible.length === 0 ? <p className="group-note">Nothing under that name. Call the counter.</p> : null}
            <div className="menu-list">
              {visible.map(({ section, dish }) => {
                const id = `${section.title}-${dish.key}`;
                const opened = open === id;
                const option = dish.options[Math.min(choice, dish.options.length - 1)];
                return (
                  <div className="menu-item" key={id}>
                    <button
                      type="button"
                      className="menu-row"
                      aria-expanded={opened}
                      data-cursor="text"
                      onClick={() => toggle(id, dish)}
                    >
                      <img src={opened ? option.image : dish.image} width="800" height="800" alt="" />
                      <span>
                        <strong>{searching ? `${dish.title}, ${section.short}` : dish.title}</strong>
                      </span>
                      <em>{dish.price}</em>
                    </button>
                    {opened ? (
                      <div className="menu-open">
                        {dish.options.length > 1 ? (
                          <div className="size-row" role="group" aria-label={`${dish.title} size`}>
                            {dish.options.map((item, index) => (
                              <button
                                key={item.href}
                                type="button"
                                className="btn btn-sign"
                                aria-pressed={index === Math.min(choice, dish.options.length - 1)}
                                onClick={() => setChoice(index)}
                              >
                                {item.label} {item.price}
                              </button>
                            ))}
                          </div>
                        ) : null}
                        {option.description ? <p>{option.description}</p> : null}
                        <a className="btn btn-lg btn-sign" href={option.href} data-cursor="text">
                          Order {option.name}
                        </a>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Guests() {
  return (
    <section className="guests" id="reviews">
      <div className="frame">
        <h2 className="display" data-reveal>
          From guests
        </h2>
        <p className="guest-scores" data-reveal>
          {reviewPlaces.map((place) => (
            <a key={place.name} href={place.href} data-cursor="text">
              {place.name} {place.score}
              {place.detail ? ` from ${place.detail}` : ""}
            </a>
          ))}
        </p>
        <div className="guest-list">
          {reviews.map((review) => (
            <blockquote key={`${review.name}-${review.when}`}>
              <p>{review.line}</p>
              <footer>
                {review.name}, {review.when}. {review.source}.
              </footer>
            </blockquote>
          ))}
        </div>
        <PrivateNote />
      </div>
    </section>
  );
}

function PrivateNote() {
  const [sent, setSent] = useState(false);

  function onSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const dish = String(data.get("dish") || "").trim();
    const note = String(data.get("note") || "").trim();
    if (!note) return;
    const lines = ["Note for Star’s Caribbean"];
    if (name) lines.push(`Name: ${name}`);
    if (dish) lines.push(`Ordered: ${dish}`);
    lines.push(note);
    setSent(true);
    window.location.href = `sms:+19043819022?body=${encodeURIComponent(lines.join("\n"))}`;
  }

  if (sent) {
    return (
      <div className="note-sheet" id="note">
        <h3>Not posted</h3>
        <p>Your note stays off this page. Your messages app has it ready for (904) 381-9022.</p>
        <a className="btn btn-lg btn-sign" href={phone} data-cursor="text">
          Call the counter
        </a>
      </div>
    );
  }

  return (
    <form className="note-sheet" id="note" onSubmit={onSubmit}>
      <h3>A note to the counter</h3>
      <p>This is not a review. It is not shown on the site. It texts the restaurant.</p>
      <label htmlFor="note-name">Name</label>
      <input className="input input-lg" id="note-name" name="name" type="text" autoComplete="name" />
      <label htmlFor="note-dish">What you ordered</label>
      <input className="input input-lg" id="note-dish" name="dish" type="text" />
      <label htmlFor="note-body">Note</label>
      <textarea className="textarea textarea-lg" id="note-body" name="note" required rows={4} />
      <motion.button className="btn btn-lg btn-sign" type="submit" whileTap={{ scale: 0.97 }} transition={press}>
        Text the counter
      </motion.button>
    </form>
  );
}

function Visit() {
  return (
    <section className="visit" id="visit">
      <div className="frame">
        <div className="coupon" data-reveal>
          <div className="coupon-side">
            <h2 className="display">Come in</h2>
            <p>1901 Blanding Blvd, Jacksonville, FL 32210.</p>
            <CallButton className="btn btn-lg btn-sign" />
            <div className="coupon-actions" style={{ marginTop: "0.75rem" }}>
              <a className="btn btn-lg btn-sign" href={order} data-cursor="text">
                Order online
              </a>
            </div>
          </div>
          <div className="perf" aria-hidden="true" />
          <div className="coupon-side">
            <h3 className="display" style={{ fontSize: "var(--step-headline)", marginTop: 0 }}>
              Hours
            </h3>
            <div className="hours-list">
              {pickup.map(([day, time]) => (
                <div key={day}>
                  <span>{day}</span>
                  <span>{time}</span>
                </div>
              ))}
            </div>
            <p>Delivery closes at 7:30 PM Monday–Thursday and 8:00 PM Friday–Saturday.</p>
            <div className="map-frame">
              <iframe
                title="Map of Star’s Caribbean at 1901 Blanding Blvd, Jacksonville"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-81.732%2C30.279%2C-81.718%2C30.289&layer=mapnik&marker=30.2837848%2C-81.7250027"
                loading="lazy"
              />
            </div>
            <p style={{ marginTop: "0.75rem" }}>
              <a
                href="https://maps.google.com/?q=1901+Blanding+Blvd+Jacksonville+FL+32210"
                data-cursor="text"
              >
                Open the map
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
