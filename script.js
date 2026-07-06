/* ==========================================================================
   JAPAN 2026 · FAMILY TRIP — script.js
   ==========================================================================

   ⭐ HOW TO CUSTOMIZE THIS WEBSITE (read me first!)

   Everything on the site is generated from the data below. You never need
   to touch the HTML to change the plan.

   ── Family live sync (recommended!) ─────────────────────────────────────
   Fill in the FIREBASE block below (10-minute one-time setup, instructions
   right above it) and every phone shares ONE live plan: checkmarks, edits,
   added/deleted activities, map links, and photos all sync instantly.
   Leave it as null and each phone keeps its own copy instead.

   ── Change the year ─────────────────────────────────────────────────────
   Edit CONFIG.year below. It updates the header and all date labels.

   ── Change an activity ──────────────────────────────────────────────────
   Find the day inside ITINERARY, then edit any field of the activity:
     { id: "d2-2", time: "10:00", icon: "🐋",
       title: "Osaka Aquarium Kaiyukan",
       note:  "Your text here...",
       tags:  ["book", "stroller"] }
   ▸ time  — free text ("10:00", "All day", "Evening"...)
   ▸ icon  — any emoji
   ▸ tags  — pick from TAG_DEFS further down (or add your own there)

   ── Add a new activity ──────────────────────────────────────────────────
   Copy an existing { ... } block, paste it where you want it in the day's
   "activities" list, and give it a NEW UNIQUE id (e.g. "d2-9").
   ⚠️ Ids are how checkmarks are saved — if you change an id, its
   checkmark resets. Never give two activities the same id.

   ── Move an activity to another day ─────────────────────────────────────
   Cut the whole { ... } block and paste it into another day's
   "activities" array. Keep the same id and the checkmark survives.

   ── Add / remove a whole day ────────────────────────────────────────────
   Copy a whole day object { date, city, title, ... } and adjust.
   ▸ city must be one of: "osaka" | "tokyo" | "travel" | "trip"

   ── Edit mode (no code needed) ──────────────────────────────────────────
   Tap "✎ Edit" in the header. Then, on any activity:
   ▸ tap the TITLE, NOTE, or TIME to retype it
   ▸ tap "＋ Add an activity" at the bottom of a day (or section) to
     insert a new one — then rename it, set its photo and map
   ▸ tap 🗑 to delete an activity from the plan
   ▸ tap 📍 Map to attach / change / hide its Google Maps link
     (paste a Maps link, type a place to search, "-" hides, empty = auto)
   ▸ tap the picture for a gallery photo, or its 🔗 badge to paste an
     image link; ✕ removes a custom photo
   All of this is stored in this browser's localStorage — per device,
   sitting ON TOP of the data below. "Restore original plan" undoes it.
   For changes you want on EVERY device, edit the data in this file.

   ── Pictures (thumbnails) ───────────────────────────────────────────────
   Every activity shows a thumbnail. By default it's a "postcard tile"
   (the activity's emoji on a colored card) — always looks good, never a
   broken image. Two ways to show a real photo instead:

   ▸ EASIEST — on the phone: tap "✎ Edit", then tap any thumbnail and pick
     a photo from your gallery (or take one!). It's resized + saved in the
     browser automatically. Tap the little ✕ on the photo to remove it.
     Great move: replace each tile with YOUR OWN photo as you travel.

   ▸ In code (shows on every device): add the activity's id to PHOTOS
     below with any image URL, e.g.
       "d3-1": "https://example.com/osaka-castle.jpg",
     Or put img: "https://..." directly on the activity itself.
     If a URL ever breaks, the postcard tile quietly comes back.

   If you move an activity to another day, its photo follows automatically
   (photos are keyed by id, not by day).

   ── Google Maps buttons ─────────────────────────────────────────────────
   Each real place gets a small "Map" button that opens Google Maps.
   The search query is built automatically from the title + that day's
   city. To fix or silence one, add its id to MAP_LINKS below:
       "d2-1": "Osakako Station",   ← custom search text
       "d1-3": false,               ← hide the button (not a place)
   Or put map: "..." / map: false directly on the activity.

   ── Custom stamps per tab ───────────────────────────────────────────────
   ▸ Alloz & Ahmed check off with a black 天 ("ten" — heaven) stamp.
   ▸ Beba & Hessa check off with a rose hair-dryer stamp.
   Change these in renderAll() at the bottom (check: "ten" | "dryer",
   or remove the option for the classic vermillion ✓).

   ========================================================================== */

// --------------------------------------------------------------------------
// 1. CONFIG
// --------------------------------------------------------------------------

const CONFIG = {
  year: 2026,            // ← change the trip year here
  startMonthDay: "11-14", // trip start (MM-DD)
  endMonthDay: "11-28",   // trip end   (MM-DD)
};

// --------------------------------------------------------------------------
// 1b. FAMILY LIVE SYNC (optional but great) — one shared plan on every phone
//
//     With this OFF (config: null), every phone keeps its own checkmarks and
//     edits. With it ON, everything — checkmarks, text edits, added/deleted
//     activities, map links, photos — syncs live to the whole family.
//
//     ONE-TIME SETUP (~10 minutes, free):
//     1. Go to console.firebase.google.com → "Create a project"
//        (any name, you can turn OFF Google Analytics).
//     2. In the left menu: Build → Realtime Database → "Create database"
//        → pick any location → start in LOCKED mode.
//     3. Open the "Rules" tab of the database and replace the rules with:
//            {
//              "rules": {
//                "trips": { "$room": { ".read": true, ".write": true } }
//              }
//            }
//        then press "Publish".
//     4. Click the ⚙️ gear (Project settings) → scroll to "Your apps" →
//        click the web icon </> → register the app (any nickname, no
//        hosting needed) → copy the firebaseConfig values it shows you.
//     5. Paste them below (replace null), give "room" a long weird name
//        nobody could guess, commit to GitHub — done. The site switches to
//        live sync automatically on every phone.
//
//     Note: the room name is effectively the key to your plan, so keep it
//     odd ("osaka-tako-2026-b7x2"), and don't put private info (passport
//     numbers etc.) in notes. Worst case someone messes up a checklist —
//     "Restore original plan" fixes it.
// --------------------------------------------------------------------------

const FIREBASE = {
  config: null,
  // config: {
  //   apiKey: "AIza....................",
  //   authDomain: "your-project.firebaseapp.com",
  //   databaseURL: "https://your-project-default-rtdb.firebaseio.com",
  //   projectId: "your-project",
  //   storageBucket: "your-project.appspot.com",
  //   messagingSenderId: "1234567890",
  //   appId: "1:1234567890:web:abcdef123456",
  // },
  room: "japan-2026-family",   // ← make this long and unguessable!
};

const STORAGE = {
  checks:  "japanTrip.v1.checks",
  edits:   "japanTrip.v1.edits",
  added:   "japanTrip.v1.added",    // activities you add in Edit mode
  removed: "japanTrip.v1.removed",  // activities you delete in Edit mode
  photos:  "japanTrip.v1.photos",   // custom pictures (gallery or links)
  tab:     "japanTrip.v1.tab",
};

// --------------------------------------------------------------------------
// 2. TAGS — small pills shown under activities. Add your own freely.
//    kind: "warn" = red, "book" = blue, default = neutral.
// --------------------------------------------------------------------------

const TAG_DEFS = {
  stroller: { label: "🚼 Stroller OK" },
  carrier:  { label: "🎒 Carrier better" },
  crowd:    { label: "⚠️ Crowded", kind: "warn" },
  book:     { label: "🎫 Book ahead", kind: "book" },
  rain:     { label: "🌧️ Rainy-day OK" },
  food:     { label: "🍜 Food" },
  rest:     { label: "😴 Rest / easy" },
  photo:    { label: "📸 Photo spot" },
  split:    { label: "🔀 Split option" },
  train:    { label: "🚆 Transit" },
  holiday:  { label: "🎌 JP holiday", kind: "warn" },
  toddler:  { label: "🧸 Toddler gold" },
};

// --------------------------------------------------------------------------
// 2b. PHOTOS — real pictures for activities (all optional).
//     Key = activity id, value = any image URL. Photos you add on the phone
//     in Edit mode are stored in the browser and take priority over these.
//     If an entry is missing (or a URL breaks) the postcard tile shows.
// --------------------------------------------------------------------------

const PHOTOS = {
  // "d3-1": "https://example.com/osaka-castle.jpg",
  // "gg-3": "https://example.com/nara-deer.jpg",
};

// --------------------------------------------------------------------------
// 2c. MAP_LINKS — fine-tune the Google-Maps buttons (all optional).
//     Default: every activity gets a Map button searching
//     "title + that day's city". Override the search text with a string,
//     or hide the button with false (naps, packing, "split" markers...).
// --------------------------------------------------------------------------

const MAP_LINKS = {
  // — travel & non-places on the itinerary —
  "d1-1": "Kansai International Airport",
  "d1-2": false, "d1-3": false, "d1-5": false,
  "d2-1": "Osakako Station", "d2-3": "Tempozan Marketplace", "d2-5": false,
  "d2-7": "okonomiyaki Dotonbori",
  "d3-2": "Umeda, Osaka", "d3-3": "Daimaru Umeda", "d3-5": false,
  "d4-1": false, "d4-3": "Higashimuki Shopping Street, Nara", "d4-4": false,
  "d4-5": false, "d4-6": "Don Quijote Dotonbori",
  "d5-1": false, "d5-2": "Shin-Osaka Station", "d5-3": false,
  "d5-4": "Tokyo Station", "d5-5": false, "d5-6": "Shinjuku Station",
  "d6-2": "Nakamise Shopping Street, Asakusa", "d6-3": false, "d6-6": "Ameyoko",
  "d6-7": false,
  "d7-5": "Shibuya PARCO",
  "d8-1": "Tokyo Character Street, Tokyo Station", "d8-2": false,
  "d8-3": "Akihabara", "d8-4": "Ginza", "d8-5": "Tokyo Station",
  "d9-3": false, "d9-4": "DiverCity Tokyo Plaza", "d9-6": false,
  "d10-1": false, "d10-6": false,
  "d11-2": "Isetan Shinjuku", "d11-3": false,
  "d12-1": false, "d12-6": "Enoshima Aquarium", "d12-7": false,
  "d13-3": "Sunshine City, Ikebukuro", "d13-4": "Nakano Broadway",
  "d13-5": "Shinjuku restaurants",
  "d14-1": false, "d14-2": false, "d14-3": false, "d14-4": false,
  "d15-1": false, "d15-2": false, "d15-3": false,

  // — guide tabs —
  "gg-3": "Nara Park", "gg-5": "Ueno Zoo",
  "gg-8": "Tokyo Character Street, Tokyo Station",
  "gg-11": false, "gg-12": false, "gg-13": "Tokyo Ramen Street",
  "gg-14": "Dotonbori, Osaka", "gg-15": false,
  "gg-18": "Omoide Yokocho, Shinjuku",
  "gg-19": "Icho Namiki Avenue, Meiji Jingu Gaien",
  "ga-1": "Super Potato, Akihabara", "ga-3": "Taito Station HEY, Akihabara",
  "ga-4": "gachapon Akihabara", "ga-5": "Mandarake Complex, Akihabara",
  "ga-7": "Daily Chiko, Nakano Broadway", "ga-9": "GiGO Shinjuku",
  "ga-8": "Round1 Sennichimae, Osaka", "ga-11": "Den Den Town, Osaka",
  "ga-12": "Daimaru Umeda",
  "gb-1": "Itoya, Ginza", "gb-3": "Hakuhinkan Toy Park, Ginza",
  "gb-4": "UNIQLO Ginza", "gb-5": "@cosme TOKYO, Harajuku",
  "gb-6": "drugstore Shinjuku", "gb-7": "Isetan Shinjuku",
  "gb-9": "Icho Namiki Avenue, Meiji Jingu Gaien", "gb-10": "Nakameguro",
  "gb-11": "purikura Takeshita Street", "gb-12": "Orange Street, Osaka",
  "gb-13": "Hankyu Umeda Main Store",
  "gm-3": false, "gm-4": "LEGOLAND Discovery Center Tokyo",
  "gm-5": "Hakuhinkan Toy Park, Ginza", "gm-6": "Shinjuku Gyoen",
  "gm-7": "Nishinomaru Garden, Osaka Castle", "gm-8": "Odaiba Marine Park",
  "gm-9": "ASOBono, Tokyo Dome City", "gm-10": "Tokyo Toy Museum",
  "gm-11": false, "gm-12": false, "gm-13": false, "gm-14": false,
  "gm-15": false, "gm-16": false,

  // — backup tab —
  "bk-1": false, "bk-2": false, "bk-3": false,
  "bk-4": "Tokyo Skytree Town", "bk-5": "Tokyo Cruise, Asakusa Pier",
  "bk-6": "National Museum of Nature and Science, Ueno",
  "bk-7": "Miyashita Park, Shibuya", "bk-8": "Tokyo Toy Museum",
  "bk-9": "KITTE Marunouchi", "bk-10": "Miraikan",
  "bk-11": "Ghibli Museum, Mitaka", "bk-12": "Tokyo Dome City",
  "bk-13": "Sunshine City, Ikebukuro", "bk-14": "Tokyo Solamachi",
  "bk-15": false, "bk-16": false, "bk-17": "Shinjuku Gyoen", "bk-18": "Tokyo Cruise, Asakusa Pier",
  "bk-19": false, "bk-20": false, "bk-21": false, "bk-22": false,
  "bk-23": false, "bk-24": false, "bk-25": false,
};

// --------------------------------------------------------------------------
// 3. THE ITINERARY — Nov 14 → Nov 28
//    (dates are built from CONFIG.year + the MM-DD you write here)
// --------------------------------------------------------------------------

const ITINERARY = [
  {
    date: "11-14", city: "osaka",
    title: "Konnichiwa, Osaka",
    subtitle: "Arrival day — keep it slow",
    activities: [
      { id: "d1-1", time: "~14:00", icon: "🛬",
        title: "Land at Kansai Airport (KIX)",
        note: "Immigration + bags takes a while with a toddler — no rush today. Grab pocket-WiFi/SIM and set up Suica/ICOCA transit cards (or add them to your phones).",
        tags: ["rest"] },
      { id: "d1-2", time: "15:30", icon: "🚌",
        title: "Airport → Namba hotel",
        note: "Easiest with stroller + luggage: Airport Limousine Bus (~50–60 min, no stairs) or the Nankai Rapi:t train (~40 min to Namba). Taxi is ¥20,000+ — skip it.",
        tags: ["train"] },
      { id: "d1-3", time: "16:45", icon: "🏨",
        title: "Check in, unpack, reset",
        note: "Let Matar nap. Suggested base: Namba / Shinsaibashi area — everything this itinerary does in Osaka starts from there.",
        tags: ["rest"] },
      { id: "d1-4", time: "18:30", icon: "🌃",
        title: "First Dotonbori stroll",
        note: "Glico running-man sign, neon canal, street-food smells. It's tight and busy — baby carrier beats the stroller here. Keep it to an hour.",
        tags: ["photo", "crowd", "carrier"] },
      { id: "d1-5", time: "19:30", icon: "🍜",
        title: "Easy first dinner",
        note: "Restaurant floors of Namba Parks or Namba City (high chairs, no queues), or quick ramen. Konbini dessert run on the way back — a trip tradition starts tonight.",
        tags: ["food"] },
    ],
    dayNote: "🚆 One transfer day total: KIX → Namba. Sunset is ~16:50 in November, so evenings start early.",
  },

  {
    date: "11-15", city: "osaka",
    title: "Whale sharks & neon",
    subtitle: "Kaiyukan aquarium + Shinsaibashi",
    activities: [
      { id: "d2-1", time: "09:15", icon: "🚇",
        title: "Metro to Osakako",
        note: "Midosuji line Namba → Hommachi, transfer to Chuo line → Osakako. ~25 min door-to-door; both stations have elevators.",
        tags: ["train", "stroller"] },
      { id: "d2-2", time: "10:00", icon: "🐋",
        title: "Osaka Aquarium Kaiyukan",
        note: "One of the world's great aquariums — whale sharks in an 8-story tank. The spiral route is fully stroller-friendly. It's Sunday: buy timed tickets online and arrive at opening. ~2.5 h.",
        tags: ["book", "crowd", "stroller", "rain", "toddler"] },
      { id: "d2-3", time: "12:30", icon: "🍱",
        title: "Lunch at Tempozan Marketplace",
        note: "Food hall right next door (Naniwa Kuishinbo Yokocho) — kid chairs, lots of choice, zero effort.",
        tags: ["food", "stroller"] },
      { id: "d2-4", time: "13:30", icon: "🎡",
        title: "Tempozan Giant Ferris Wheel (optional)",
        note: "15-minute spin over the bay, right outside the aquarium. Only if Matar is still in a good mood.",
        tags: ["photo"] },
      { id: "d2-5", time: "14:30", icon: "😴",
        title: "Back to the hotel for nap time",
        note: "Same metro route home. Quiet hotel afternoon — this is what keeps the trip fun.",
        tags: ["rest", "train"] },
      { id: "d2-6", time: "17:30", icon: "🛍️",
        title: "Shinsaibashi-suji covered arcade",
        note: "Long covered shopping street: drugstores, Uniqlo, snacks. Fully rain-proof and stroller-easy.",
        tags: ["rain", "stroller"] },
      { id: "d2-7", time: "19:00", icon: "🥞",
        title: "Okonomiyaki dinner",
        note: "Mizuno or Chibo near Dotonbori — Osaka's soul food. Queues happen; go early-ish or put your name down and stroll.",
        tags: ["food", "crowd"] },
    ],
    dayNote: "🚆 Namba ⇄ Osakako ~25 min each way. Everything this evening is a short walk from the hotel.",
  },

  {
    date: "11-16", city: "osaka",
    title: "Castle park & city lights",
    subtitle: "Osaka Castle + Umeda",
    activities: [
      { id: "d3-1", time: "09:30", icon: "🏯",
        title: "Osaka Castle Park",
        note: "Autumn colors around the moat; the Nishinomaru garden lawns are perfect for Matar to run wild. The castle keep gets packed and the view outside is the star anyway. Metro to Tanimachi 4-chome, ~15 min.",
        tags: ["photo", "stroller"] },
      { id: "d3-2", time: "12:00", icon: "🍛",
        title: "Lunch at the park or in Umeda",
        note: "Miraiza (by the castle) has casual options, or ride to Umeda and eat at Grand Front's restaurant floors.",
        tags: ["food"] },
      { id: "d3-3", time: "13:30", icon: "🎮",
        title: "Umeda: Daimaru 13F — Pokémon Center + Nintendo Osaka",
        note: "Both official stores share one floor — the rare stop where all five of you are equally happy. Baby room on the same kids' floor. Then the depachika basement for insane snacks.",
        tags: ["rain", "stroller", "toddler"] },
      { id: "d3-4", time: "16:15", icon: "🌇",
        title: "Umeda Sky Building at sunset (optional)",
        note: "Open-air rooftop ring; sunset is ~16:50, city lights right after. Skip guilt-free if the group is fading.",
        tags: ["photo"] },
      { id: "d3-5", time: "18:30", icon: "🔀",
        title: "Split evening",
        note: "Beba, Hessa & Matar: relaxed dinner + early night. Alloz & Ahmed: Round1 Sennichimae mega-arcade (open past midnight) or a Den Den Town window-shopping pass — see your tab.",
        tags: ["split"] },
    ],
    dayNote: "🚆 Namba → castle ~15 min; castle → Umeda ~15 min; Umeda → Namba ~10 min on the Midosuji line. A tidy triangle.",
  },

  {
    date: "11-17", city: "trip", place: "Nara",
    title: "Nara deer morning",
    subtitle: "Half-day trip + pack for Tokyo",
    activities: [
      { id: "d4-1", time: "08:45", icon: "🚆",
        title: "Kintetsu train to Nara",
        note: "Direct from Osaka-Namba station, ~40 min on the rapid express. Morning = calmer deer, better light, fresher toddler.",
        tags: ["train"] },
      { id: "d4-2", time: "09:45", icon: "🦌",
        title: "Nara Park & Todai-ji",
        note: "Bowing deer everywhere + the Great Buddha hall. Let adults hold the deer crackers — the deer get pushy and Matar will be happier watching. Main paths are stroller-OK with some gravel. ~2.5 h.",
        tags: ["photo", "stroller", "toddler"] },
      { id: "d4-3", time: "12:15", icon: "🍡",
        title: "Lunch on Higashimuki street",
        note: "Covered street by the station. Catch the high-speed mochi-pounding show at Nakatanidou, then any casual lunch spot.",
        tags: ["food"] },
      { id: "d4-4", time: "13:30", icon: "🚆",
        title: "Train back to Namba",
        note: "With luck, this is Matar's nap. If not, the hotel is next.",
        tags: ["train", "rest"] },
      { id: "d4-5", time: "15:00", icon: "🧳",
        title: "Rest + Tokyo prep",
        note: "Pro move: send the big suitcases to your Tokyo hotel tonight by takkyubin (hotel front desk arranges it, roughly ¥2,500/bag, arrives next day) and ride the Shinkansen hands-free tomorrow.",
        tags: ["rest"] },
      { id: "d4-6", time: "18:00", icon: "🛒",
        title: "Ebisubashi + Don Quijote farewell round",
        note: "Last Osaka snacks and omiyage. Don Quijote Dotonbori is open late and has its own canal ferris wheel. (Kuromon market is a morning place — swap it in at breakfast if you want it.)",
        tags: ["food", "crowd"] },
    ],
    dayNote: "🚆 Namba ⇄ Nara ~40 min each way, no transfers. Back in Osaka by mid-afternoon on purpose.",
  },

  {
    date: "11-18", city: "travel",
    title: "Shinkansen day",
    subtitle: "Osaka → Tokyo, then breathe",
    activities: [
      { id: "d5-1", time: "09:30", icon: "🏨",
        title: "Check out of the Osaka hotel",
        note: "If the big bags didn't go by takkyubin, reserve the Shinkansen oversized-baggage seats when you book (required for large suitcases).",
        tags: ["rest"] },
      { id: "d5-2", time: "10:15", icon: "🚇",
        title: "Namba → Shin-Osaka",
        note: "Midosuji line direct, ~15 min. Leave buffer — Shin-Osaka station is big.",
        tags: ["train"] },
      { id: "d5-3", time: "11:00", icon: "🚅",
        title: "Shinkansen Nozomi to Tokyo",
        note: "~2 h 30. Buy ekiben (train bento) + snacks on the platform — half the fun. Sit on the E-seat side (right side toward Tokyo) for a possible Mt. Fuji appearance around the 1.5 h mark.",
        tags: ["train", "food", "book"] },
      { id: "d5-4", time: "13:45", icon: "🚉",
        title: "Tokyo Station → hotel",
        note: "Suggested Tokyo base: Shinjuku — the transport superpower for this whole plan. JR Chuo rapid from Tokyo Station, ~15 min.",
        tags: ["train"] },
      { id: "d5-5", time: "14:30", icon: "🏨",
        title: "Check in + proper unpack",
        note: "You are here for 10 nights — unpack for real, nap for real.",
        tags: ["rest"] },
      { id: "d5-6", time: "17:30", icon: "🌆",
        title: "Gentle Shinjuku intro",
        note: "Southern Terrace winter lights (illuminations start mid-Nov), then dinner on Takashimaya Times Square's restaurant floors — high chairs, a great baby room, zero stress.",
        tags: ["food", "stroller"] },
    ],
    dayNote: "🚆 Total travel ≈ 3.5 h door-to-door. Nothing else is scheduled on purpose.",
  },

  {
    date: "11-19", city: "tokyo",
    title: "Old Tokyo",
    subtitle: "Asakusa + Ueno",
    activities: [
      { id: "d6-1", time: "08:30", icon: "⛩️",
        title: "Senso-ji before the crowds",
        note: "Thunder Gate, the great pagoda, the incense cauldron. By 10:00 it is shoulder-to-shoulder, so early is gold. ~25 min from Shinjuku.",
        tags: ["photo", "crowd"] },
      { id: "d6-2", time: "10:00", icon: "🍢",
        title: "Nakamise snacks + side streets",
        note: "Fresh age-manju and ningyo-yaki on the approach street; slip one street over to Denboin-dori for the photogenic, quieter version.",
        tags: ["food", "photo"] },
      { id: "d6-3", time: "11:30", icon: "🚇",
        title: "Ginza line to Ueno",
        note: "Five minutes, four stops. Easiest transfer of the trip.",
        tags: ["train"] },
      { id: "d6-4", time: "12:00", icon: "🍱",
        title: "Lunch around Ueno Station",
        note: "Ecute (inside the station) or the park-side cafes — quick and toddler-tolerant.",
        tags: ["food"] },
      { id: "d6-5", time: "13:00", icon: "🐼",
        title: "Ueno Zoo + park foliage",
        note: "Pandas! A compact, old-school zoo that is perfect at age 2. The park's ginkgo trees glow gold in late November. Last entry 16:00, closed Mondays. ~2 h.",
        tags: ["stroller", "photo", "toddler"] },
      { id: "d6-6", time: "15:30", icon: "🏮",
        title: "Ameyoko market stroll (optional)",
        note: "Loud, fun market street under the train tracks. Do the 15-minute version if energy is low.",
        tags: ["crowd"] },
      { id: "d6-7", time: "16:30", icon: "🏨",
        title: "Head back — easy evening",
        note: "Dinner near the hotel. Tomorrow is a big one.",
        tags: ["rest"] },
    ],
    dayNote: "🚆 Shinjuku → Asakusa ~25 min; Asakusa → Ueno 5 min; Ueno → Shinjuku ~25 min. One neighborhood pair, minimal backtracking.",
  },

  {
    date: "11-20", city: "tokyo",
    title: "Shrines to Shibuya",
    subtitle: "Meiji Shrine · Harajuku · Shibuya Sky",
    activities: [
      { id: "d7-1", time: "09:00", icon: "🌳",
        title: "Meiji Shrine forest walk",
        note: "A calm forest path to the shrine — gravel, so the stroller works but rattles. Weekend mornings you might catch a traditional wedding procession.",
        tags: ["photo", "stroller"] },
      { id: "d7-2", time: "10:45", icon: "🧁",
        title: "Takeshita Street, Harajuku",
        note: "Rainbow crepes and chaos. Very narrow and very crowded — carrier strongly recommended, park the stroller mindset here.",
        tags: ["crowd", "carrier", "food"] },
      { id: "d7-3", time: "12:00", icon: "🍽️",
        title: "Lunch on Omotesando",
        note: "The calm, tree-lined counterweight to Takeshita — proper cafes, wide pavements, easy strolling.",
        tags: ["food", "stroller"] },
      { id: "d7-4", time: "14:00", icon: "🐾",
        title: "Shibuya Scramble + Hachiko",
        note: "Cross the world's busiest intersection (all five of you, hold hands, it's part of the fun), then the Hachiko statue photo.",
        tags: ["photo", "crowd"] },
      { id: "d7-5", time: "14:45", icon: "🎮",
        title: "Shibuya Parco 6F",
        note: "Nintendo TOKYO + Pokémon Center Shibuya + Capcom Store + Jump Shop on a single floor. Every member of this family wins here.",
        tags: ["rain", "toddler"] },
      { id: "d7-6", time: "16:00", icon: "🌆",
        title: "Shibuya Sky at sunset",
        note: "Book a ~16:00 slot weeks ahead — sunset is ~16:30 and it sells out. Strollers must be parked below; carriers are fine. It is cold and windy up top, dress Matar warm.",
        tags: ["book", "photo"] },
      { id: "d7-7", time: "18:00", icon: "🍜",
        title: "Dinner in Shibuya",
        note: "Shibuya Stream or Hikarie restaurant floors seat groups easily. Alloz & Ahmed can stay after for a GiGO arcade round while the others head back.",
        tags: ["food", "split"] },
    ],
    dayNote: "🚆 Shinjuku → Harajuku 5 min (JR Yamanote); Harajuku → Shibuya one stop. The whole day is one straight line.",
  },

  {
    date: "11-21", city: "tokyo",
    title: "Split day: ⚡ Akihabara / 🎀 Ginza",
    subtitle: "Everyone gets their perfect Saturday",
    activities: [
      { id: "d8-1", time: "09:30", icon: "🚉",
        title: "Together first: Tokyo Station Character Street",
        note: "One underground corridor of pure joy: Pokémon, Ghibli, Sanrio, Chiikawa, TV mascots. Saturday means crowds — go at opening.",
        tags: ["rain", "stroller", "crowd", "toddler"] },
      { id: "d8-2", time: "11:00", icon: "🔀",
        title: "Split! Two teams, two vibes",
        note: "Regroup for dinner. Both destinations are ~5 min from Tokyo Station in opposite directions.",
        tags: ["split"] },
      { id: "d8-3", time: "11:15", icon: "🎮",
        title: "Alloz & Ahmed → Akihabara",
        note: "The crawl: Radio Kaikan → Super Potato (retro heaven) → gachapon halls → HEY / GiGO arcades. Full route with details in your tab.",
        tags: ["split"] },
      { id: "d8-4", time: "11:15", icon: "🎀",
        title: "Beba, Hessa & Matar → Ginza",
        note: "Itoya (12 floors of stationery), Ginza Six rooftop garden for Matar's run-around, Uniqlo flagship, and Hakuhinkan Toy Park — four floors of toys. Excellent baby rooms at Mitsukoshi.",
        tags: ["split", "stroller", "toddler"] },
      { id: "d8-5", time: "17:30", icon: "🍽️",
        title: "Regroup dinner: Tokyo Station / Ginza",
        note: "Ramen Street inside the station is the easy win; the KITTE building rooftop has a free night view of the station for dessert-time photos.",
        tags: ["food", "photo"] },
    ],
    dayNote: "🚆 Everything today orbits Tokyo Station (~15 min from Shinjuku on the Chuo rapid). Phones on, share locations, meet at a landmark.",
  },

  {
    date: "11-22", city: "tokyo",
    title: "teamLab & the bay",
    subtitle: "Toyosu + Odaiba",
    activities: [
      { id: "d9-1", time: "09:00", icon: "✨",
        title: "teamLab Planets (Toyosu)",
        note: "Book the earliest slot weeks ahead — it's Sunday. Barefoot, knee-deep water in parts: totally doable with a toddler (staff are used to it) — pack a change of clothes for Matar. ~2 h.",
        tags: ["book", "crowd", "photo", "rain", "toddler"] },
      { id: "d9-2", time: "11:30", icon: "🍣",
        title: "Lunch at Toyosu Senkyaku Banrai",
        note: "Edo-style food street next to the fish market — sushi for the adults, plain rice + tamagoyaki for the boss.",
        tags: ["food"] },
      { id: "d9-3", time: "13:00", icon: "🚝",
        title: "Yurikamome line to Odaiba",
        note: "Driverless elevated train looping over Rainbow Bridge — grab the front window seats and let Matar 'drive'.",
        tags: ["train", "photo", "toddler"] },
      { id: "d9-4", time: "13:30", icon: "🤖",
        title: "DiverCity: the life-size Gundam",
        note: "The 20-meter statue lights up / transforms at scheduled times. Mall behind it for coffee and a kids' play corner.",
        tags: ["photo", "rain"] },
      { id: "d9-5", time: "15:00", icon: "🌊",
        title: "Odaiba seaside promenade",
        note: "Boardwalk, mini Statue of Liberty, Rainbow Bridge across the water. Sunset ~16:30 here is the best free show in Tokyo.",
        tags: ["photo", "stroller"] },
      { id: "d9-6", time: "17:00", icon: "🏨",
        title: "Home via Yurikamome — rest evening",
        note: "Dinner near the hotel. Tomorrow is a day trip, sleep matters.",
        tags: ["rest", "train"] },
    ],
    dayNote: "🚆 Shinjuku → Toyosu ~30 min; Toyosu → Odaiba ~15 min on the Yurikamome; Odaiba → Shinjuku ~40 min. Book teamLab FIRST — everything else bends around it.",
  },

  {
    date: "11-23", city: "trip", place: "Yokohama",
    title: "Yokohama day trip",
    subtitle: "🎌 National holiday — expect crowds",
    activities: [
      { id: "d10-1", time: "09:00", icon: "🚆",
        title: "Train to Yokohama",
        note: "~35 min from Shinjuku (Shonan-Shinjuku line). Nov 23 is Labour Thanksgiving Day — a national holiday — so go early and book what can be booked.",
        tags: ["train", "holiday", "crowd"] },
      { id: "d10-2", time: "10:00", icon: "🍞",
        title: "Anpanman Children's Museum",
        note: "Very likely Matar's single best morning of the trip — Japan's #1 toddler character, entire museum built for his age. Timed entry: book online in advance. ~2 h.",
        tags: ["book", "stroller", "toddler"] },
      { id: "d10-3", time: "12:30", icon: "🍜",
        title: "Lunch in Minato Mirai",
        note: "MARK IS mall (connected to the station) — family restaurants and one of the best baby-room floors in Japan.",
        tags: ["food", "stroller"] },
      { id: "d10-4", time: "14:00", icon: "🍥",
        title: "Cup Noodles Museum",
        note: "Design-your-own cup noodle (~¥500) — genuinely fun for every age, and the cups make great souvenirs. Get timed workshop tickets, especially on a holiday.",
        tags: ["book", "rain"] },
      { id: "d10-5", time: "15:30", icon: "🎡",
        title: "Red Brick Warehouse + harbor stroll",
        note: "The Christmas Market here usually opens in late November — check the dates! Cosmo Clock ferris wheel for the brave; harbor lights for everyone else.",
        tags: ["photo", "stroller"] },
      { id: "d10-6", time: "17:00", icon: "🚆",
        title: "Back to Tokyo",
        note: "Home by ~18:00. Konbini dinner is fully allowed tonight.",
        tags: ["train", "rest"] },
    ],
    dayNote: "🚆 Yokohama is the easiest day trip on the list — one train each way, and everything sits within a 15-minute walk in Minato Mirai.",
  },

  {
    date: "11-24", city: "tokyo",
    title: "Slow day: gardens & depato",
    subtitle: "Shinjuku Gyoen + a soft afternoon",
    activities: [
      { id: "d11-1", time: "10:00", icon: "🍁",
        title: "Shinjuku Gyoen",
        note: "Late November is peak autumn color here — maples, ginkgo avenues, huge lawns, wide paved paths. Stroller heaven. Bring snacks and let Matar run for hours. Small entry fee; closed Mondays.",
        tags: ["photo", "stroller", "toddler"] },
      { id: "d11-2", time: "12:30", icon: "🍱",
        title: "Lunch: Isetan depachika picnic or restaurant floor",
        note: "Isetan's basement food hall is a museum you can eat. Grab a spread and picnic back at Gyoen, or take the easy restaurant-floor option upstairs.",
        tags: ["food"] },
      { id: "d11-3", time: "14:00", icon: "😴",
        title: "Nap + split afternoon",
        note: "Matar naps. Beba & Hessa: Isetan beauty hall, Lumine, NEWoMan (your tab has the route). Alloz & Ahmed: Shinjuku arcades or a daytime Golden Gai wander.",
        tags: ["split", "rest"] },
      { id: "d11-4", time: "17:30", icon: "📸",
        title: "Omoide Yokocho lantern alley",
        note: "Tiny lantern-lit yakitori lanes by the station — the most atmospheric 10 minutes in Shinjuku. Lanes are too narrow for strollers; take turns stepping in for photos.",
        tags: ["photo", "carrier"] },
      { id: "d11-5", time: "18:30", icon: "🍢",
        title: "Shinjuku dinner",
        note: "Yakitori in shifts for the adults, or book a family-friendly izakaya with table seating. Low-key night by design.",
        tags: ["food"] },
    ],
    dayNote: "🚆 Zero trains required until evening — the whole day is walkable from a Shinjuku base. This is a deliberate recovery day.",
  },

  {
    date: "11-25", city: "trip", place: "Kamakura",
    title: "Kamakura & Enoshima",
    subtitle: "Optional day trip — becomes a free day if you're tired",
    activities: [
      { id: "d12-1", time: "08:30", icon: "🚆",
        title: "Odakyu line from Shinjuku",
        note: "~70–90 min. The Romancecar (reserved-seat express) is the comfortable move with a toddler — book seats the day before.",
        tags: ["train", "book"] },
      { id: "d12-2", time: "10:00", icon: "🗿",
        title: "The Great Buddha of Kamakura",
        note: "13-meter open-air bronze Buddha, short flat walk from Hase station. The classic photo of the day.",
        tags: ["photo", "stroller"] },
      { id: "d12-3", time: "11:00", icon: "🍁",
        title: "Hase-dera temple",
        note: "Gorgeous foliage + bay views from the terrace. Lots of stairs — carrier day, stroller stays folded.",
        tags: ["photo", "carrier"] },
      { id: "d12-4", time: "12:30", icon: "🍽️",
        title: "Lunch on Komachi-dori",
        note: "Busy snack-and-lunch street by Kamakura station — croquettes, soft cream, casual sit-downs.",
        tags: ["food", "crowd"] },
      { id: "d12-5", time: "14:00", icon: "🚋",
        title: "Enoden tram to Enoshima",
        note: "A rattly retro tram hugging the coastline — one of Japan's most loved little train rides (Slam Dunk fans: the crossing is en route).",
        tags: ["train", "photo"] },
      { id: "d12-6", time: "14:45", icon: "🐠",
        title: "Enoshima Aquarium or beach sunset",
        note: "The aquarium is compact and very toddler-friendly; otherwise just watch the sun set over Sagami Bay — Mt. Fuji shows up on clear days.",
        tags: ["photo", "stroller", "toddler"] },
      { id: "d12-7", time: "16:30", icon: "🚆",
        title: "Head home",
        note: "Longer ride back — download something for Matar. Easy dinner near the hotel.",
        tags: ["train", "rest"] },
    ],
    dayNote: "🚆 This is the longest day trip in the plan — only do it if everyone slept well. Skipping it turns today into Free Day #1 (see the Backup tab).",
  },

  {
    date: "11-26", city: "tokyo",
    title: "Ikebukuro & Nakano",
    subtitle: "Penguins, Pokémon, and the Mandarake mothership",
    activities: [
      { id: "d13-1", time: "10:00", icon: "🐧",
        title: "Sunshine Aquarium, Ikebukuro",
        note: "Rooftop tank where penguins 'fly' over the city skyline — compact, indoor-ish, and perfectly sized for a 2-year-old. Inside Sunshine City complex.",
        tags: ["stroller", "rain", "toddler"] },
      { id: "d13-2", time: "11:30", icon: "🟡",
        title: "Pokémon Center Mega Tokyo",
        note: "The biggest Pokémon Center, one floor down in the same building. Set a plush-toy budget now, thank yourself later.",
        tags: ["rain", "toddler"] },
      { id: "d13-3", time: "12:30", icon: "🍽️",
        title: "Lunch inside Sunshine City",
        note: "Restaurant floors + food court + baby facilities without stepping outside.",
        tags: ["food", "rain", "stroller"] },
      { id: "d13-4", time: "14:00", icon: "🔀",
        title: "Split afternoon",
        note: "Alloz & Ahmed: Nakano Broadway, 15 min away — the Mandarake mothership (shops open from ~12:00). Beba & Hessa: Ikebukuro cafes + Seibu/Tobu department stores. Matar: nap.",
        tags: ["split", "rest"] },
      { id: "d13-5", time: "18:00", icon: "🍜",
        title: "Dinner back in Shinjuku",
        note: "Second-to-last night — book somewhere you have been eyeing all week.",
        tags: ["food"] },
    ],
    dayNote: "🚆 Shinjuku → Ikebukuro 5 min, Ikebukuro → Nakano ~15 min, Nakano → Shinjuku 5 min. The Yamanote/Chuo lines do all the work.",
  },

  {
    date: "11-27", city: "tokyo",
    title: "Free day + farewell",
    subtitle: "The missed-anything day",
    activities: [
      { id: "d14-1", time: "All day", icon: "🎯",
        title: "Deliberately empty",
        note: "This day exists to absorb whatever got missed, rained out, or loved so much it deserves a rematch. Open the Backup tab and pick.",
        tags: ["rest"] },
      { id: "d14-2", time: "10:00", icon: "🛍️",
        title: "Omiyage sweep (suggestion)",
        note: "Don Quijote + one big drugstore (tax-free with passports) + Daimaru B1 at Tokyo Station for KitKats, Tokyo Banana, and Press Butter Sand.",
        tags: ["food"] },
      { id: "d14-3", time: "14:00", icon: "🧳",
        title: "Pack + airport luggage option",
        note: "Hotels can courier big suitcases to the airport a day ahead (takkyubin, needs ~24 h) so you fly out hands-free with just the stroller and day bags.",
        tags: ["rest"] },
      { id: "d14-4", time: "18:00", icon: "🍣",
        title: "Farewell dinner",
        note: "Book something a little special with table seating — teppanyaki, a great tonkatsu-ya, or the place the group votes for. Toast the trip.",
        tags: ["food", "book"] },
    ],
    dayNote: "🚆 No fixed transit today. If it rains, the Backup tab's rainy list has you covered.",
  },

  {
    date: "11-28", city: "travel",
    title: "Sayonara, Japan",
    subtitle: "Departure day",
    activities: [
      { id: "d15-1", time: "09:30", icon: "🏨",
        title: "Check out with buffer",
        note: "Saturday morning trains are calm; airports are not. Build in slack.",
        tags: ["rest"] },
      { id: "d15-2", time: "10:00", icon: "✈️",
        title: "To the airport",
        note: "Narita: N'EX direct from Shinjuku, ~80 min. Haneda: Airport Limousine Bus from major hotels (easiest with a stroller) or Yamanote + Keikyu, ~45 min. Aim to arrive 3 h before an international flight.",
        tags: ["train"] },
      { id: "d15-3", time: "13:00", icon: "🛫",
        title: "Fly home",
        note: "One last vending-machine drink, one last gachapon at the gate. Safe travels — おつかれさま!",
        tags: ["photo"] },
    ],
    dayNote: "🚆 Match the departure time to your flight — everything above slides earlier or later with it.",
  },
];

// --------------------------------------------------------------------------
// 4. GUIDE TABS — curated lists per person/group.
//    Same editing rules: unique ids, copy a block to add an item.
//    (These checkboxes save too, but only ITINERARY items count toward
//     the Shinkansen progress bar at the top.)
// --------------------------------------------------------------------------

const GUIDES = {
  group: {
    intro: "The shortlist that works for all five of you — scenic, tasty, stroller-tolerant, and worth the train ride.",
    sections: [
      { heading: "🏆 Big wins for everyone", items: [
        { id: "gg-1", icon: "🐋", title: "Osaka Aquarium Kaiyukan", note: "Whale sharks, spiral ramp route, zero stairs. Best 2.5 hours in Osaka with a toddler.", tags: ["stroller", "rain", "book"] },
        { id: "gg-2", icon: "🏯", title: "Osaka Castle Park", note: "Moat views + Nishinomaru lawns for run-around time. The park beats the (crowded) castle interior.", tags: ["photo", "stroller"] },
        { id: "gg-3", icon: "🦌", title: "Nara deer + Todai-ji", note: "The half-day trip everyone remembers. Adults handle the deer crackers.", tags: ["photo", "toddler"] },
        { id: "gg-4", icon: "⛩️", title: "Senso-ji, Asakusa", note: "Tokyo's oldest temple — go before 09:30 or after 17:00 (lit up, quieter).", tags: ["photo", "crowd"] },
        { id: "gg-5", icon: "🐼", title: "Ueno Park & Zoo", note: "Pandas + golden ginkgo trees in late November. Compact and cheap.", tags: ["stroller", "toddler"] },
        { id: "gg-6", icon: "✨", title: "teamLab Planets, Toyosu", note: "Immersive art everyone experiences at their own level — Matar included. Book early slots.", tags: ["book", "photo", "rain"] },
        { id: "gg-7", icon: "🌆", title: "Shibuya Sky at sunset", note: "The Tokyo view. Book ~16:00 slots weeks out; carriers OK, strollers park below.", tags: ["book", "photo"] },
        { id: "gg-8", icon: "🚉", title: "Tokyo Station Character Street", note: "Every beloved character in one rain-proof corridor. Dangerous for wallets, perfect for moods.", tags: ["rain", "stroller"] },
        { id: "gg-9", icon: "🍁", title: "Shinjuku Gyoen", note: "Peak autumn color in late Nov. The single best 'let the toddler run' spot in Tokyo.", tags: ["photo", "stroller"] },
        { id: "gg-10", icon: "🎡", title: "Yokohama Minato Mirai", note: "Anpanman + Cup Noodles + harbor lights — the highest joy-per-step day trip.", tags: ["stroller", "book"] },
      ]},
      { heading: "🍜 Easy food areas (group-proof)", items: [
        { id: "gg-11", icon: "🏬", title: "Department-store restaurant floors", note: "Takashimaya, Isetan, Hikarie, Grand Front — 20+ restaurants per floor, high chairs everywhere, baby rooms one floor away. The family cheat code.", tags: ["food", "stroller", "rain"] },
        { id: "gg-12", icon: "🍱", title: "Depachika basements", note: "Department-store food halls: buy a spread, picnic in a park or the hotel. Best rainy-dinner move in Japan.", tags: ["food", "rain"] },
        { id: "gg-13", icon: "🍜", title: "Tokyo Ramen Street (Tokyo Station)", note: "Eight famous ramen shops in one basement strip. Ticket machines = no ordering stress.", tags: ["food", "crowd"] },
        { id: "gg-14", icon: "🥞", title: "Dotonbori okonomiyaki & takoyaki", note: "Osaka's street-food heart. Eat early to dodge queues.", tags: ["food", "crowd"] },
        { id: "gg-15", icon: "🏪", title: "The humble konbini", note: "7-Eleven / Lawson / FamilyMart: onigiri, fruit, baby-friendly snacks, dessert. Never fight a hungry toddler when one is 90 seconds away.", tags: ["food", "rest"] },
      ]},
      { heading: "📸 Scenic & photo moments", items: [
        { id: "gg-16", icon: "🌇", title: "Umeda Sky Building", note: "Open-air rooftop ring over Osaka — go for the ~16:50 sunset.", tags: ["photo"] },
        { id: "gg-17", icon: "🌉", title: "Odaiba promenade", note: "Rainbow Bridge + skyline across the water; best at dusk.", tags: ["photo", "stroller"] },
        { id: "gg-18", icon: "🏮", title: "Omoide Yokocho", note: "Lantern-lit alleys, 5 minutes from a Shinjuku hotel. Step in for photos in turns.", tags: ["photo", "carrier"] },
        { id: "gg-19", icon: "🍂", title: "Icho Namiki ginkgo avenue (Aoyama)", note: "Tokyo's famous golden tunnel of ginkgos — usually peaks late Nov. 15 min from Shibuya.", tags: ["photo", "stroller"] },
      ]},
    ],
  },

  guys: {
    intro: "Arcades, retro games, and anime — mapped so you can strike whenever the schedule opens up. Evening entries work after Matar's bedtime.",
    sections: [
      { heading: "⚡ Akihabara — the main event (planned Sat Nov 21)", items: [
        { id: "ga-1", icon: "🕹️", title: "Super Potato", note: "The legendary retro-game shop: Famicom to GameCube, boxed classics, a retro arcade on the top floor. Prices are collector-grade — hunt the glass cases.", tags: ["photo"] },
        { id: "ga-2", icon: "🏢", title: "Radio Kaikan", note: "10 floors of figures, cards, and hobby shops (Kaiyodo, Yellow Submarine). Start here — it opens the neighborhood.", tags: ["rain"] },
        { id: "ga-3", icon: "👾", title: "HEY (Taito Station Akihabara)", note: "The retro/shmup arcade — rows of vintage cabinets. GiGO buildings 1–3 nearby for rhythm games and claws.", tags: ["rain"] },
        { id: "ga-4", icon: "🎰", title: "Gachapon halls", note: "Hundreds of capsule machines in one place. Bring ¥100 coins. This is where souvenir money goes to die happily.", tags: [] },
        { id: "ga-5", icon: "📚", title: "Mandarake Complex Akiba", note: "8 floors of used manga, cels, figures, and doujin. The Akihabara branch of the empire.", tags: ["rain"] },
      ]},
      { heading: "🏬 Nakano Broadway (planned Thu Nov 26)", items: [
        { id: "ga-6", icon: "🛸", title: "Mandarake mothership", note: "30+ specialty stores inside one delightfully dated mall: retro toys, animation cels, vintage manga. Shops open around 12:00 — go after lunch.", tags: ["rain"] },
        { id: "ga-7", icon: "🍦", title: "Daily Chiko 8-layer soft cream", note: "Basement legend. Mandatory intermission.", tags: ["food"] },
      ]},
      { heading: "🌃 Evening options (after baby bedtime)", items: [
        { id: "ga-8", icon: "🎳", title: "Round1 Sennichimae (Osaka)", note: "Mega arcade + bowling + karaoke, open past midnight, 5 min from a Namba hotel. Your Osaka night out.", tags: ["rain"] },
        { id: "ga-9", icon: "🕹️", title: "GiGO / Taito Shinjuku & Shibuya", note: "Big multi-floor arcades open to ~23:00–24:00. Claw machines: set a budget, they are engineered against you.", tags: ["rain"] },
        { id: "ga-10", icon: "🏮", title: "Golden Gai (Shinjuku)", note: "200 tiny bars in six alleys. Cash, seat-charge culture, pick spots with visible price signs. Adults-only atmosphere.", tags: ["photo"] },
      ]},
      { heading: "🗾 Osaka side quests", items: [
        { id: "ga-11", icon: "🔌", title: "Den Den Town (Nipponbashi)", note: "Osaka's Akihabara: Super Potato Osaka branch, retro shops, hobby stores. 10 min walk from Namba — pairs with the Day 3 split evening.", tags: [] },
        { id: "ga-12", icon: "🎮", title: "Nintendo Osaka + Pokémon Center (Daimaru Umeda 13F)", note: "Already on the Day 3 plan — flagging it here so you budget time (and yen).", tags: ["rain"] },
      ]},
    ],
  },

  girls: {
    intro: "Shopping streets, beauty floors, pretty cafes, and photo spots — built around the split afternoons and any free block you claim.",
    sections: [
      { heading: "🎀 Ginza (planned Sat Nov 21)", items: [
        { id: "gb-1", icon: "✒️", title: "Itoya", note: "Twelve floors of beautiful stationery. Souvenir-grade washi tape, pens, and cards.", tags: ["rain"] },
        { id: "gb-2", icon: "🏛️", title: "Ginza Six", note: "The chicest mall in Tokyo: Tsutaya's art-book floor, a free rooftop garden (Matar-approved lawn), and a stellar depachika.", tags: ["rain", "stroller"] },
        { id: "gb-3", icon: "🧸", title: "Hakuhinkan Toy Park", note: "Four floors of toys at the south end of Ginza — your toddler-diplomacy card for the day.", tags: ["rain", "toddler"] },
        { id: "gb-4", icon: "👕", title: "Uniqlo Ginza (12 floors) + Muji flagship", note: "The world's biggest Uniqlo; Muji Ginza has a whole food-and-homeware ecosystem.", tags: ["rain"] },
      ]},
      { heading: "💄 Beauty & cosmetics", items: [
        { id: "gb-5", icon: "💋", title: "@cosme TOKYO (Harajuku)", note: "Japan's biggest beauty store — three floors ranked by real user reviews. Try-before-you-buy heaven.", tags: ["rain"] },
        { id: "gb-6", icon: "💊", title: "Drugstore haul (Matsumoto Kiyoshi / Sundrug)", note: "Sheet masks, sunscreens, hair treatments — tax-free over ¥5,000 with passports. Do one big run, not five small ones.", tags: ["rain"] },
        { id: "gb-7", icon: "🛍️", title: "Isetan Shinjuku beauty hall", note: "The most beautiful department-store beauty floor in Japan, five minutes from the hotel. Depachika downstairs for the reward snack.", tags: ["rain"] },
      ]},
      { heading: "☕ Cute cafes & photo spots", items: [
        { id: "gb-8", icon: "🌿", title: "Omotesando & Cat Street", note: "Tree-lined flagship avenue + a lane of vintage shops and coffee. The calm, photogenic side of Harajuku.", tags: ["photo", "stroller"] },
        { id: "gb-9", icon: "🍂", title: "Icho Namiki ginkgo avenue", note: "The golden ginkgo tunnel near Aoyama — late-November magic, best light mid-morning.", tags: ["photo"] },
        { id: "gb-10", icon: "🥐", title: "Nakameguro canal cafes", note: "Riverside lanes of indie coffee and bakeries (the giant Starbucks Roastery is here too). 20 min from Shibuya.", tags: ["photo", "food"] },
        { id: "gb-11", icon: "📸", title: "Purikura in Harajuku", note: "Japanese photo-sticker booths — do one as a girls' souvenir. Machines auto-beautify aggressively; embrace it.", tags: ["photo", "rain"] },
      ]},
      { heading: "🗼 Osaka picks", items: [
        { id: "gb-12", icon: "🧡", title: "Orange Street (Horie)", note: "Osaka's coolest little strip: boutiques, select shops, third-wave coffee. 10 min walk from Shinsaibashi.", tags: ["photo"] },
        { id: "gb-13", icon: "🏬", title: "Hankyu Umeda", note: "The grande-dame department store — gorgeous beauty hall, dreamlike depachika, seasonal displays.", tags: ["rain"] },
      ]},
    ],
  },

  baby: {
    intro: "Matar's Japan, age 2: places built for tiny humans, plus the logistics that keep everyone smiling.",
    sections: [
      { heading: "⭐ Star attractions (toddler-tested)", items: [
        { id: "gm-1", icon: "🍞", title: "Anpanman Children's Museum (Yokohama)", note: "The single most 2-year-old-perfect place in Japan. Soft play, character shows, gentle chaos. Timed tickets online.", tags: ["book", "stroller", "toddler"] },
        { id: "gm-2", icon: "🐼", title: "Ueno Zoo", note: "Small, cheap, pandas. Ninety perfect minutes.", tags: ["stroller", "toddler"] },
        { id: "gm-3", icon: "🐋", title: "Kaiyukan & Sunshine Aquarium", note: "Both aquariums on the plan are dark, calm, and mesmerizing at this age — reliable nap-adjacent activities.", tags: ["rain", "stroller", "toddler"] },
        { id: "gm-4", icon: "🧱", title: "Legoland Discovery Center (Odaiba)", note: "Indoor Lego playground — adults can only enter WITH a child, so Matar is your golden ticket. Good rainy backup.", tags: ["rain", "book", "toddler"] },
        { id: "gm-5", icon: "🧸", title: "Hakuhinkan Toy Park (Ginza)", note: "Four floors of toys with a whole preschool section. Built into the girls' Ginza day.", tags: ["rain", "toddler"] },
      ]},
      { heading: "🌳 Parks & run-around fuel", items: [
        { id: "gm-6", icon: "🍁", title: "Shinjuku Gyoen lawns", note: "Flat, huge, fenced-feeling, gorgeous. The reset button for an overstimulated toddler.", tags: ["stroller", "photo"] },
        { id: "gm-7", icon: "🏯", title: "Nishinomaru Garden, Osaka Castle", note: "Lawn + castle view. Bring a ball from Daiso (¥110 solves everything).", tags: ["stroller"] },
        { id: "gm-8", icon: "🌊", title: "Odaiba beach boardwalk", note: "Sand, boats, planes, trains, a bridge — a 2-year-old's complete vocabulary in one view.", tags: ["stroller", "photo"] },
      ]},
      { heading: "🌧️ Indoor play (rainy-day gold)", items: [
        { id: "gm-9", icon: "🎈", title: "ASOBono! (Tokyo Dome City)", note: "Tokyo's biggest indoor playground for ages 0–6 — ball pits, trains, pretend town. Weekday mornings are calmest. THE rainy-day answer.", tags: ["rain", "toddler"] },
        { id: "gm-10", icon: "🪀", title: "Tokyo Toy Museum (Yotsuya)", note: "A converted school full of beautiful wooden toys, with a dedicated under-2s room. Quiet, lovely, 10 min from Shinjuku.", tags: ["rain", "toddler"] },
      ]},
      { heading: "🐱 About animal cafes (honest note)", items: [
        { id: "gm-11", icon: "⚠️", title: "Most animal cafes won't work for Matar", note: "Cat and dog cafes usually ban children under 4–10 for the animals' safety, and owl/otter-type cafes raise real welfare concerns. With a 2-year-old, zoos and aquariums are genuinely the better version of the same joy. If you want a closer look, check each cafe's age policy first and prefer rescue-cat cafes.", tags: [] },
      ]},
      { heading: "🍼 Logistics cheat sheet", items: [
        { id: "gm-12", icon: "🚻", title: "Baby rooms are everywhere good", note: "Every major department store (Takashimaya, Isetan, Daimaru, MARK IS) has a proper baby lounge: nursing rooms, changing tables, hot water, sometimes toddler toilets. Plan pit stops around them.", tags: [] },
        { id: "gm-13", icon: "🧷", title: "Diapers & baby food", note: "Drugstores (not konbini) stock diapers — Merries/Moony/Pampers — plus Kewpie jar food and toddler snack aisles. One early stock-up in each city and you're set.", tags: [] },
        { id: "gm-14", icon: "🛗", title: "Stroller strategy", note: "Every metro station has an elevator — Google Maps shows which exit. Avoid rush hours (07:30–09:30, 17:30–19:30). Crowded spots flagged with 🎒 in this site = wear the carrier instead.", tags: [] },
        { id: "gm-15", icon: "😴", title: "Nap rhythm", note: "One anchor activity per half-day, nap after lunch (hotel or stroller-in-park), evenings short. The itinerary already breathes this way — protect it.", tags: ["rest"] },
        { id: "gm-16", icon: "🚕", title: "Taxis when it all melts down", note: "Taxis are legally exempt from car-seat rules in Japan — the GO app works with foreign cards. A ¥1,500 ride home beats a 40-minute meltdown, every time.", tags: [] },
      ]},
    ],
  },
};

// --------------------------------------------------------------------------
// 5. BACKUP TAB — flexible blocks, ideas by area, rainy & low-energy lists
// --------------------------------------------------------------------------

const BACKUP = {
  intro: "The safety net. Three open blocks are built into the schedule — fill them from the lists below, or use these when weather or tiredness rewrites a day.",
  sections: [
    { heading: "🗓️ Built-in flexible blocks", items: [
      { id: "bk-1", icon: "🕐", title: "Tue Nov 24 — afternoon", note: "The slow day's split afternoon absorbs any small missed item (a shop, a shrine, a cafe).", tags: ["rest"] },
      { id: "bk-2", icon: "📅", title: "Wed Nov 25 — full day", note: "Kamakura is optional. Skip it and this becomes a wide-open Tokyo day.", tags: [] },
      { id: "bk-3", icon: "📅", title: "Fri Nov 27 — full day", note: "Deliberately empty by design. Your official missed-anything day.", tags: [] },
    ]},
    { heading: "📍 Backup ideas by area", items: [
      { id: "bk-4", icon: "🗼", title: "Near Asakusa → Tokyo Skytree + Solamachi + Sumida Aquarium", note: "One complex: Japan's tallest tower, a huge mall, and a jellyfish-forward aquarium Matar will love. Pairs with a repeat Senso-ji visit.", tags: ["rain", "stroller"] },
      { id: "bk-5", icon: "⛴️", title: "Near Asakusa → Sumida River cruise", note: "Boat from Asakusa to Hamarikyu Garden or Odaiba — sitting down IS the activity. Great tired-day move.", tags: ["rest", "photo"] },
      { id: "bk-6", icon: "🖼️", title: "Near Ueno → Science Museum / Yanaka", note: "National Museum of Nature & Science has a hands-on kids floor; Yanaka Ginza is a gentle old-town shopping lane nearby.", tags: ["rain", "rest"] },
      { id: "bk-7", icon: "🏙️", title: "Near Shibuya → Miyashita Park + Daikanyama", note: "Rooftop-park mall, then bookstore-and-cafe territory in Daikanyama; Nakameguro's canal is one stop further.", tags: ["photo", "stroller"] },
      { id: "bk-8", icon: "🗿", title: "Near Shinjuku → Tokyo Toy Museum / Godzilla head", note: "Wooden-toy heaven for Matar in Yotsuya; the Kabukicho Godzilla peeking over a cinema for a 5-minute photo.", tags: ["rain", "photo"] },
      { id: "bk-9", icon: "🚉", title: "Near Tokyo Station → KITTE + Imperial Palace East Gardens", note: "Free rooftop station view, elegant mall, and calm gardens — a classy low-effort half day.", tags: ["photo", "stroller", "rest"] },
      { id: "bk-10", icon: "🔬", title: "Odaiba → Miraikan science museum", note: "Future-tech museum with robot demos — pairs with Legoland Discovery next door on a wet day.", tags: ["rain"] },
      { id: "bk-11", icon: "🎬", title: "Long shot → Ghibli Museum (Mitaka)", note: "Magical but ticket-only via lottery/advance sale (typically the 10th of the previous month, sells out instantly). If you somehow score tickets, drop everything.", tags: ["book"] },
    ]},
    { heading: "🌧️ Rainy-day plan (pick one, stay dry all day)", items: [
      { id: "bk-12", icon: "🎈", title: "ASOBono! + Tokyo Dome City", note: "Morning at the indoor mega-playground, lunch in LaQua mall, arcade round for the guys — all connected.", tags: ["rain", "toddler"] },
      { id: "bk-13", icon: "🌇", title: "Sunshine City full day", note: "Aquarium + Pokémon Mega + Namja Town + restaurant floors under one roof. Zero umbrella minutes.", tags: ["rain", "toddler"] },
      { id: "bk-14", icon: "🗼", title: "Skytree Solamachi day", note: "Aquarium, planetarium, 300+ shops, tower observation if clouds allow.", tags: ["rain"] },
      { id: "bk-15", icon: "🍱", title: "Depachika crawl + hotel picnic", note: "Isetan basement → hotel feast → movie night. Sometimes the best day is the laziest one.", tags: ["rain", "rest", "food"] },
      { id: "bk-16", icon: "🎳", title: "Round1 (any city)", note: "Arcade + bowling + karaoke chains everywhere — the whole family version of the guys' night.", tags: ["rain"] },
    ]},
    { heading: "😴 Low-energy days (when everyone hits the wall)", items: [
      { id: "bk-17", icon: "🍁", title: "Gyoen picnic morning only", note: "One park, one bench, one bakery bag. Home by nap time. Count it as a win.", tags: ["rest", "stroller"] },
      { id: "bk-18", icon: "⛴️", title: "River boat + one snack street", note: "Transport as entertainment. Asakusa boat + a slow Yanaka or Kappabashi stroll.", tags: ["rest"] },
      { id: "bk-19", icon: "🏪", title: "The Great Konbini Dinner", note: "Everyone picks whatever they want from 7-Eleven, eat in pajamas, Japanese TV on. A core memory, honestly.", tags: ["rest", "food"] },
    ]},
    { heading: "🎫 Book-ahead checklist (do these before Nov!)", items: [
      { id: "bk-20", icon: "🎟️", title: "Shibuya Sky sunset slot (Nov 20)", note: "Sells out weeks ahead for 16:00-ish times.", tags: ["book"] },
      { id: "bk-21", icon: "🎟️", title: "teamLab Planets (Nov 22)", note: "Earliest morning slot, Sunday sells fast.", tags: ["book"] },
      { id: "bk-22", icon: "🎟️", title: "Anpanman Museum + Cup Noodles workshop (Nov 23)", note: "Both timed-entry; Nov 23 is a national holiday.", tags: ["book", "holiday"] },
      { id: "bk-23", icon: "🎟️", title: "Shinkansen seats (Nov 18) + Romancecar (Nov 25)", note: "Reserve seats; add oversized-luggage seats if you skip takkyubin.", tags: ["book"] },
      { id: "bk-24", icon: "🎟️", title: "Kaiyukan timed tickets (Nov 15)", note: "Sunday visit — buy online to skip the ticket line.", tags: ["book"] },
      { id: "bk-25", icon: "🎟️", title: "Farewell dinner reservation (Nov 27)", note: "Book a table-seating spot for five + a toddler.", tags: ["book"] },
    ]},
  ],
};

/* ==========================================================================
   APP LOGIC — you shouldn't need to edit below this line
   ========================================================================== */

// ---- storage helpers -------------------------------------------------------

function loadJSON(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) || fallback; }
  catch { return fallback; }
}
function saveJSON(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* private mode etc. */ }
}

let checks  = loadJSON(STORAGE.checks, {});   // { activityId: true }
let edits   = loadJSON(STORAGE.edits, {});    // { activityId: { title, note, time, map } }
let added   = loadJSON(STORAGE.added, {});    // { bucketKey: { activityId: activity } }
let removed = loadJSON(STORAGE.removed, {});  // { activityId: true }
let photos  = loadJSON(STORAGE.photos, {});   // { activityId: dataURL or https URL }

// migrate older saves: photos used to live inside edits, added used arrays
(function migrateOldSaves() {
  let dirty = false;
  for (const id in edits) {
    if (edits[id] && edits[id].img) {
      photos[id] = edits[id].img;
      delete edits[id].img;
      if (!Object.keys(edits[id]).length) delete edits[id];
      dirty = true;
    }
  }
  for (const b in added) {
    if (Array.isArray(added[b])) {
      const o = {};
      added[b].forEach((a) => { o[a.id] = a; });
      added[b] = o;
      dirty = true;
    }
  }
  if (dirty) {
    saveJSON(STORAGE.edits, edits);
    saveJSON(STORAGE.added, added);
    try { saveJSON(STORAGE.photos, photos); } catch (e) {}
  }
})();

function savePhotos() {
  try { saveJSON(STORAGE.photos, photos); }
  catch (e) { alert("This browser's photo storage is full — remove a few custom photos (✕) and try again."); }
}

// ---- family live sync (Firebase) ------------------------------------------
// SYNC stays null when FIREBASE.config isn't filled in → pure local mode.
let SYNC = null;
function syncSet(path, val) {
  if (!SYNC) return;
  SYNC.base.child(path).set(val === undefined ? null : val)
    .catch((e) => console.warn("sync write failed:", e));
}

// effective activity list for one bucket (base list minus deleted, plus added)
function effectiveList(baseItems, bucketKey) {
  const extra = added[bucketKey];
  return baseItems.filter((a) => !removed[a.id])
    .concat(extra ? Object.values(extra) : []);
}

// ---- small utilities -------------------------------------------------------

const DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function fullDate(mmdd) {
  return new Date(`${CONFIG.year}-${mmdd}T00:00:00`);
}
function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function tagHTML(tags = []) {
  if (!tags.length) return "";
  const pills = tags.map((t) => {
    const def = TAG_DEFS[t] || { label: t };
    return `<span class="tag ${def.kind || ""}">${esc(def.label)}</span>`;
  }).join("");
  return `<div class="a-tags">${pills}</div>`;
}

// Tiny hair-dryer icon (used as Beba & Hessa's stamp — no emoji exists!)
const DRYER_SVG = `<svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true"><path d="M3.2 7.9C3.2 5.7 5 4 7.2 4c3.4 0 9 .9 13 1.8.9.2 1.6 1 1.6 2v.4c0 1-.7 1.8-1.6 2-4 .9-9.6 1.8-13 1.8-2.2 0-4-1.7-4-3.9v-.2z"/><path d="M9 12.9l1.8 6.3c.2.7.9 1.3 1.7 1.3h.9c.9 0 1.5-.8 1.3-1.6l-1.6-6.5c-1.4.2-2.8.4-4.1.5z"/><circle cx="7.2" cy="8" r="1.7" fill="#fff" opacity="0.9"/></svg>`;

// Google-Maps link for an activity (or null = no button).
// Priority: your Edit-mode link → activity's map: field → MAP_LINKS → auto.
function searchMapsURL(q) {
  return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q);
}
function mapHrefFor(a, place) {
  // Edit-mode override (saved on this device): a pasted URL, a search text,
  // "-" to hide the button, or absent.
  const custom = edits[a.id] && edits[a.id].map;
  if (custom === "-") return null;
  if (custom) return /^https?:\/\//i.test(custom) ? custom : searchMapsURL(custom);

  const override = a.map !== undefined ? a.map : MAP_LINKS[a.id];
  if (override === false) return null;
  let q;
  if (typeof override === "string") {
    q = override;
  } else {
    // strip meal prefixes so "Lunch at Tempozan..." searches the place itself
    const clean = a.title
      .replace(/^(breakfast|lunch|dinner)\s*(at|on|in|around)?\s*:?\s*/i, "")
      .trim();
    q = place ? `${clean}, ${place}` : clean;
  }
  if (!/japan/i.test(q)) q += ", Japan";
  return searchMapsURL(q);
}

// One activity row (shared by itinerary + guide tabs).
// opts: { withTime, tone, place, check }  check: "ten" | "dryer" | undefined
function activityHTML(a, opts = {}) {
  const done = checks[a.id] ? "true" : "false";
  const checkedClass = checks[a.id] ? " checked" : "";
  const editedClass = edits[a.id] ? " is-edited" : "";
  const time = opts.withTime && a.time
    ? `<span class="a-time editable" data-id="${a.id}" data-field="time">${esc(a.time)}</span>`
    : "";

  // stamp style
  const checkClass = opts.check === "ten" ? " check--ten"
                   : opts.check === "dryer" ? " check--dryer" : "";
  const glyph = opts.check === "ten" ? "天"
              : opts.check === "dryer" ? DRYER_SVG : "✓";

  // thumbnail: custom (edit-mode photo) → PHOTOS/img URL → postcard tile
  const custom = photos[a.id];
  const photo = custom || a.img || PHOTOS[a.id];
  const tone = opts.tone || "indigo";
  const thumb = `
    <div class="thumb" data-tone="${tone}" aria-hidden="true">
      ${photo ? `<img src="${esc(photo)}" alt="" loading="lazy">` : ""}
      <span class="thumb-icon" aria-hidden="true">${esc(a.icon || "📍")}</span>
      <button class="thumb-link" type="button" aria-label="Set picture from an image link">🔗</button>
      ${custom ? `<button class="thumb-x" type="button" aria-label="Remove custom photo">✕</button>` : ""}
    </div>`;

  // Google Maps button (in Edit mode a ghost button appears even when hidden,
  // so you can attach a link to any activity)
  const href = mapHrefFor(a, opts.place);
  const mapBtn = href
    ? `<a class="map-btn" target="_blank" rel="noopener" href="${esc(href)}"
          aria-label="Open '${esc(a.title)}' in Google Maps">📍 Map</a>`
    : `<button class="map-btn map-add" type="button"
          aria-label="Add a map link to '${esc(a.title)}'">📍 Map</button>`;

  return `
    <div class="activity${checkedClass}${editedClass}" data-id="${a.id}">
      <button class="check${checkClass}" type="button" aria-pressed="${done}"
              aria-label="Mark '${esc(a.title)}' as done">${glyph}</button>
      ${thumb}
      <div class="a-body">
        <div class="a-top">
          ${time}
          <span class="a-title"><span class="editable" data-id="${a.id}" data-field="title">${esc(a.title)}</span><span class="edited-dot"> ●</span></span>
          ${mapBtn}
          <button class="a-del" type="button" aria-label="Delete '${esc(a.title)}'">🗑</button>
        </div>
        <p class="a-note editable" data-id="${a.id}" data-field="note">${esc(a.note || "")}</p>
        ${tagHTML(a.tags)}
      </div>
    </div>`;
}

// ---- render: itinerary ------------------------------------------------------

function renderItinerary() {
  const el = document.getElementById("tab-itinerary");
  const first = fullDate(ITINERARY[0].date);
  const last = fullDate(ITINERARY[ITINERARY.length - 1].date);

  const chips = ITINERARY.map((d) => {
    const dt = fullDate(d.date);
    return `<button class="date-chip" type="button" data-target="day-${d.date}" data-city="${d.city}">
              ${DOW[dt.getDay()]}<b>${dt.getDate()}</b></button>`;
  }).join("");

  const days = ITINERARY.map((d) => {
    const dt = fullDate(d.date);
    const cityLabel = { osaka: "Osaka", tokyo: "Tokyo", travel: "Travel day", trip: "Day trip" }[d.city] || d.city;
    return `
      <article class="day-card" id="day-${d.date}" data-day="${d.date}">
        <header class="day-head">
          <div class="day-date">
            <span class="dow">${DOW[dt.getDay()]}</span>
            <span class="num">${dt.getDate()}</span>
          </div>
          <div class="day-titles">
            <h2>${esc(d.title)}</h2>
            <p class="day-sub">${esc(d.subtitle || "")} · ${MONTHS[dt.getMonth()]} ${dt.getDate()}, ${CONFIG.year}</p>
          </div>
          <span class="city-pill" data-city="${d.city}">${cityLabel}</span>
          <span class="stamp" aria-hidden="true">済</span>
        </header>
        ${effectiveList(d.activities, "day:" + d.date).map((a) => activityHTML(a, {
          withTime: true,
          tone: d.city,
          place: d.place || ({ osaka: "Osaka", tokyo: "Tokyo" }[d.city] || ""),
        })).join("")}
        <button class="add-activity" type="button" data-bucket="day:${d.date}">＋ Add an activity to this day</button>
        ${d.dayNote ? `<div class="day-note">${esc(d.dayNote)}</div>` : ""}
      </article>`;
  }).join("");

  el.innerHTML = `
    <h2 class="panel-title">Day by day</h2>
    <p class="panel-intro">${MONTHS[first.getMonth()]} ${first.getDate()} – ${MONTHS[last.getMonth()]} ${last.getDate()}, ${CONFIG.year}.
       Check things off as you go — fill a whole day and it earns its hanko stamp. 済 means done!</p>
    <div class="date-strip">${chips}</div>
    ${days}`;
}

// ---- render: guide & backup tabs -------------------------------------------

function renderGuide(panelId, guide, opts = {}) {
  const el = document.getElementById(panelId);
  const sections = guide.sections.map((s, i) => `
    <section class="guide-section">
      <h3>${esc(s.heading)}</h3>
      ${effectiveList(s.items, `sec:${panelId}:${i}`).map((a) => activityHTML(a, opts)).join("")}
      <button class="add-activity" type="button" data-bucket="sec:${panelId}:${i}">＋ Add an idea here</button>
    </section>`).join("");
  el.innerHTML = `<p class="panel-intro">${esc(guide.intro)}</p>${sections}`;
}

// ---- progress (itinerary items only, including ones you add) -----------------

function updateProgress() {
  const ids = ITINERARY.flatMap((d) =>
    effectiveList(d.activities, "day:" + d.date).map((a) => a.id));
  const total = ids.length;
  const done = ids.filter((id) => checks[id]).length;
  const pct = total ? Math.round((done / total) * 100) : 0;

  document.getElementById("rail-fill").style.width = pct + "%";
  document.getElementById("rail-train").style.left = pct + "%";
  document.getElementById("progress-text").textContent =
    `${done} / ${total} stops stamped · ${pct}%`;

  // hanko stamps for fully-checked days
  ITINERARY.forEach((d) => {
    const card = document.getElementById("day-" + d.date);
    if (!card) return;
    const list = effectiveList(d.activities, "day:" + d.date);
    const complete = list.length > 0 && list.every((a) => checks[a.id]);
    card.classList.toggle("complete", complete);
  });
}

// ---- edits overlay -----------------------------------------------------------

function applyEdits() {
  document.querySelectorAll(".editable").forEach((el) => {
    const saved = edits[el.dataset.id];
    if (saved && saved[el.dataset.field] != null) {
      el.textContent = saved[el.dataset.field];
      const row = el.closest(".activity");
      if (row) row.classList.add("is-edited");
    }
  });
}

// ---- events ------------------------------------------------------------------

function wireEvents() {
  // tabs
  const tabButtons = document.querySelectorAll(".tab-btn");
  tabButtons.forEach((btn) => btn.addEventListener("click", () => {
    tabButtons.forEach((b) => b.classList.toggle("active", b === btn));
    document.querySelectorAll(".tab-panel").forEach((p) =>
      p.classList.toggle("active", p.id === "tab-" + btn.dataset.tab));
    saveJSON(STORAGE.tab, btn.dataset.tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }));

  // restore last tab
  const lastTab = loadJSON(STORAGE.tab, "itinerary");
  const lastBtn = document.querySelector(`.tab-btn[data-tab="${lastTab}"]`);
  if (lastBtn && !lastBtn.classList.contains("active")) lastBtn.click();

  // delegated clicks: checkboxes + date chips
  document.getElementById("app").addEventListener("click", (e) => {
    const check = e.target.closest(".check");
    if (check) {
      const row = check.closest(".activity");
      const id = row.dataset.id;
      checks[id] = !checks[id];
      if (!checks[id]) delete checks[id];
      saveJSON(STORAGE.checks, checks);
      syncSet("checks/" + id, checks[id] ? true : null);
      check.setAttribute("aria-pressed", checks[id] ? "true" : "false");
      row.classList.toggle("checked", !!checks[id]);
      updateProgress();
      return;
    }
    // remove a custom photo (little ✕ badge, edit mode)
    const x = e.target.closest(".thumb-x");
    if (x) {
      const id = x.closest(".activity").dataset.id;
      if (confirm("Remove this custom photo and go back to the default tile?")) {
        delete photos[id];
        savePhotos();
        syncSet("photos/" + id, null);
        renderAll();
      }
      return;
    }

    // set a picture from a pasted image link (🔗 badge, Edit mode)
    const linkBtn = e.target.closest(".thumb-link");
    if (linkBtn) {
      const id = linkBtn.closest(".activity").dataset.id;
      const current = photos[id] && !String(photos[id]).startsWith("data:") ? photos[id] : "";
      const url = prompt("Paste an image link (URL) for this picture:", current);
      if (url === null) return;                    // cancelled
      const clean = url.trim();
      if (!clean) return;
      if (!/^https?:\/\//i.test(clean)) { alert("That doesn't look like a link — it should start with http:// or https://"); return; }
      photos[id] = clean;
      savePhotos();
      syncSet("photos/" + id, clean);
      renderAll();
      return;
    }

    // delete an activity (🗑, Edit mode)
    const del = e.target.closest(".a-del");
    if (del) {
      const row = del.closest(".activity");
      const id = row.dataset.id;
      const label = row.querySelector(".a-title .editable")?.textContent || "this activity";
      if (!confirm(`Delete "${label}" from the plan on this device?`)) return;
      if (id.startsWith("u-")) {
        // it was added in Edit mode — remove it from its bucket entirely
        for (const key of Object.keys(added)) {
          if (added[key] && added[key][id]) {
            delete added[key][id];
            if (!Object.keys(added[key]).length) delete added[key];
            syncSet(`added/${key}/${id}`, null);
          }
        }
        saveJSON(STORAGE.added, added);
      } else {
        removed[id] = true;
        saveJSON(STORAGE.removed, removed);
        syncSet("removed/" + id, true);
      }
      delete checks[id]; saveJSON(STORAGE.checks, checks); syncSet("checks/" + id, null);
      delete edits[id];  saveJSON(STORAGE.edits, edits);   syncSet("edits/" + id, null);
      delete photos[id]; savePhotos();                     syncSet("photos/" + id, null);
      renderAll();
      return;
    }

    // add a brand-new activity to a day / section (Edit mode)
    const addBtn = e.target.closest(".add-activity");
    if (addBtn) {
      const bucket = addBtn.dataset.bucket;
      const isDay = bucket.startsWith("day:");
      const fresh = {
        id: "u-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 5),
        icon: "✨",
        title: "New activity — tap to rename",
        note: "Tap here to describe it. Use 📍 Map to attach a place and 🔗/📷 on the picture to set a photo.",
        tags: [],
        map: false, // no Map button until you attach one via the 📍 ghost
      };
      if (isDay) fresh.time = "—";
      added[bucket] = added[bucket] || {};
      added[bucket][fresh.id] = fresh;
      saveJSON(STORAGE.added, added);
      syncSet(`added/${bucket}/${fresh.id}`, fresh);
      renderAll();
      // scroll the new row into view so it can be edited right away
      document.querySelector(`[data-id="${fresh.id}"]`)?.scrollIntoView?.({ behavior: "smooth", block: "center" });
      return;
    }

    // in Edit mode, tapping the Map button edits the link instead of opening it
    const mapBtn = e.target.closest(".map-btn");
    if (mapBtn && document.body.classList.contains("edit-mode")) {
      e.preventDefault();
      const id = mapBtn.closest(".activity").dataset.id;
      const current = (edits[id] && edits[id].map && edits[id].map !== "-") ? edits[id].map : "";
      const v = prompt(
        "Google Maps for this activity:\n" +
        "• paste a Google Maps link (Share → Copy link), or\n" +
        "• type a place name to search, or\n" +
        "• type -  to hide the Map button.\n" +
        "Leave empty to go back to the automatic link.", current);
      if (v === null) return;                      // cancelled
      const clean = v.trim();
      edits[id] = edits[id] || {};
      if (!clean) delete edits[id].map;            // back to default
      else edits[id].map = clean;                  // URL, search text, or "-"
      if (!Object.keys(edits[id]).length) delete edits[id];
      saveJSON(STORAGE.edits, edits);
      syncSet("edits/" + id + "/map", clean || null);
      renderAll();
      return;
    }

    // in Edit mode, tapping a thumbnail picks a photo from the phone/computer
    const thumb = e.target.closest(".thumb");
    if (thumb && document.body.classList.contains("edit-mode")) {
      pendingPhotoId = thumb.closest(".activity").dataset.id;
      document.getElementById("photo-input").click();
      return;
    }

    const chip = e.target.closest(".date-chip");
    if (chip) {
      document.getElementById(chip.dataset.target)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  // photo picker: resize the chosen image and save it to this browser
  let pendingPhotoId = null;
  document.getElementById("photo-input").addEventListener("change", (e) => {
    const file = e.target.files && e.target.files[0];
    e.target.value = ""; // allow re-picking the same file later
    if (!file || !pendingPhotoId) return;
    const id = pendingPhotoId;
    pendingPhotoId = null;

    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        // downscale so dozens of photos fit comfortably in localStorage
        const MAX = 480;
        const scale = Math.min(1, MAX / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
        const dataURL = canvas.toDataURL("image/jpeg", 0.72);
        photos[id] = dataURL;
        savePhotos();
        syncSet("photos/" + id, dataURL);
        renderAll();
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });

  // edit mode toggle
  const editToggle = document.getElementById("edit-toggle");
  const editBar = document.getElementById("edit-bar");
  editToggle.addEventListener("click", () => {
    const on = !document.body.classList.contains("edit-mode");
    document.body.classList.toggle("edit-mode", on);
    editToggle.setAttribute("aria-pressed", String(on));
    editToggle.textContent = on ? "✓ Done" : "✎ Edit";
    editBar.hidden = !on;
    document.querySelectorAll(".editable").forEach((el) => {
      el.contentEditable = on ? "plaintext-only" : "false";
    });
  });

  // save text edits when leaving a field
  document.getElementById("app").addEventListener("focusout", (e) => {
    const el = e.target.closest(".editable");
    if (!el || !document.body.classList.contains("edit-mode")) return;
    const { id, field } = el.dataset;
    edits[id] = edits[id] || {};
    edits[id][field] = el.textContent.trim();
    saveJSON(STORAGE.edits, edits);
    syncSet(`edits/${id}/${field}`, edits[id][field]);
    el.closest(".activity")?.classList.add("is-edited");
    // if a family update arrived while you were typing, apply it now
    if (renderQueued) { renderQueued = false; scheduleRender(); }
  });

  // reset buttons
  document.getElementById("reset-edits").addEventListener("click", () => {
    const scope = SYNC ? "for EVERYONE (all phones!)" : "on this device";
    if (!confirm(`Restore the ORIGINAL plan ${scope}? This undoes all text edits, custom photos, map-link changes, and added or deleted activities. (Checkmarks are kept.)`)) return;
    edits = {};   saveJSON(STORAGE.edits, edits);
    added = {};   saveJSON(STORAGE.added, added);
    removed = {}; saveJSON(STORAGE.removed, removed);
    photos = {};  savePhotos();
    syncSet("edits", null); syncSet("added", null);
    syncSet("removed", null); syncSet("photos", null);
    renderAll();
  });
  document.getElementById("reset-checks").addEventListener("click", () => {
    const scope = SYNC ? "for EVERYONE (all phones!)" : "on this device";
    if (!confirm(`Clear ALL checkmarks ${scope}?`)) return;
    checks = {};
    saveJSON(STORAGE.checks, checks);
    syncSet("checks", null);
    renderAll();
  });
}

// ---- boot --------------------------------------------------------------------

function renderAll() {
  renderItinerary();
  renderGuide("tab-group",  GUIDES.group, { tone: "indigo" });
  renderGuide("tab-guys",   GUIDES.guys,  { tone: "sumi",   check: "ten" });   // 天 stamp
  renderGuide("tab-girls",  GUIDES.girls, { tone: "rose",   check: "dryer" }); // hair-dryer stamp
  renderGuide("tab-baby",   GUIDES.baby,  { tone: "matcha" });
  renderGuide("tab-backup", BACKUP,       { tone: "plum" });
  applyEdits();
  updateProgress();
  // keep edit mode working after re-render
  if (document.body.classList.contains("edit-mode")) {
    document.querySelectorAll(".editable").forEach((el) => {
      el.contentEditable = "plaintext-only";
    });
  }
}

// re-render safely: never yank a text field away while someone is typing,
// and coalesce bursts of incoming sync events into one render
let renderQueued = false;
let renderTimer = null;
function scheduleRender() {
  const ae = document.activeElement;
  if (document.body.classList.contains("edit-mode") &&
      ae && ae.classList && ae.classList.contains("editable")) {
    renderQueued = true;
    return;
  }
  clearTimeout(renderTimer);
  renderTimer = setTimeout(renderAll, 60);
}

// ---- family live sync boot --------------------------------------------------

function initSync() {
  if (!FIREBASE || !FIREBASE.config || !FIREBASE.config.apiKey) return null;
  if (typeof firebase === "undefined") {
    console.warn("Firebase scripts didn't load — running in local mode.");
    return null;
  }
  try {
    firebase.initializeApp(FIREBASE.config);
    const dbase = firebase.database();
    const room = String(FIREBASE.room || "family-trip").replace(/[.#$\[\]\/\s]/g, "-");
    const base = dbase.ref("trips/" + room);

    // little status line under the progress bar
    const status = document.getElementById("sync-status");
    if (status) {
      status.hidden = false;
      status.textContent = "🟡 Connecting to family sync…";
      dbase.ref(".info/connected").on("value", (s) => {
        status.textContent = s.val()
          ? "🟢 Family sync is live — everyone sees the same plan"
          : "🔴 Offline — showing the last synced plan";
      });
    }

    // small buckets: mirror whole node; the FIRST phone to connect seeds the
    // cloud with whatever it already had (so nobody loses old checkmarks)
    const buckets = [
      ["checks",  () => checks,  (v) => { checks  = v; saveJSON(STORAGE.checks,  checks);  }],
      ["edits",   () => edits,   (v) => { edits   = v; saveJSON(STORAGE.edits,   edits);   }],
      ["added",   () => added,   (v) => { added   = v; saveJSON(STORAGE.added,   added);   }],
      ["removed", () => removed, (v) => { removed = v; saveJSON(STORAGE.removed, removed); }],
    ];
    buckets.forEach(([key, get, apply]) => {
      base.child(key).on("value", (snap) => {
        const v = snap.val();
        if (v === null && Object.keys(get()).length) { base.child(key).set(get()); return; }
        apply(v || {});
        scheduleRender();
      });
    });

    // photos: per-photo listeners so a new picture only transfers itself,
    // not the whole album, to every phone
    const quietSavePhotos = () => { try { saveJSON(STORAGE.photos, photos); } catch (e) {} };
    const pref = base.child("photos");
    pref.once("value").then((s) => {
      if (s.val() === null && Object.keys(photos).length) {
        pref.set(photos);            // seed the cloud from this phone
      } else {
        photos = {};                 // cloud is the source of truth now
      }
      pref.on("child_added",   (c) => { photos[c.key] = c.val(); quietSavePhotos(); scheduleRender(); });
      pref.on("child_changed", (c) => { photos[c.key] = c.val(); quietSavePhotos(); scheduleRender(); });
      pref.on("child_removed", (c) => { delete photos[c.key];    quietSavePhotos(); scheduleRender(); });
      scheduleRender();
    });

    return { base };
  } catch (e) {
    console.warn("Family sync failed to start — running in local mode.", e);
    return null;
  }
}

// header dates from CONFIG
(function initHeader() {
  document.getElementById("trip-year").textContent = CONFIG.year;
  const s = fullDate(CONFIG.startMonthDay);
  const e = fullDate(CONFIG.endMonthDay);
  document.getElementById("trip-dates").textContent =
    `${MONTHS[s.getMonth()]} ${s.getDate()} – ${MONTHS[e.getMonth()]} ${e.getDate()}, ${CONFIG.year} · Osaka → Tokyo`;
})();

// if any photo URL fails to load, quietly fall back to the postcard tile
document.addEventListener("error", (e) => {
  if (e.target && e.target.matches && e.target.matches(".thumb img")) e.target.remove();
}, true);

renderAll();
wireEvents();
SYNC = initSync();
