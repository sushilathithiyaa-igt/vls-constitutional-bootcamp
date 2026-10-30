// Source of truth: docs/VLS_BOOTCAMP_CONTENT.md. Keep copy in sync with that file.

export const COURSE_ID = "constitutional-law-bootcamp";

export const contact = {
  coursePhone: "+91 95000 25216",
  courseTel: "tel:+919500025216",
  academyPhone: "+91 95002 07811",
  academyTel: "tel:+919500207811",
  whatsappNumber: "919500025216",
  website: "https://www.vlslawacademy.com",
  privacy: "https://www.vlslawacademy.com/privacy-policy",
  terms: "https://www.vlslawacademy.com/terms-and-conditions",
  address:
    "No. 1910, 2nd Floor, H Block, 5th Street, 12th Main Road, Anna Nagar West, Chennai, Tamil Nadu – 600040.",
} as const;

export const whatsappLink = (message: string) =>
  `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`;


/** Confirmed by the project owner (see docs/APPROVALS.md). Every place that shows these facts reads from here. */
export const course = {
  name: "Constitutional Law & Practice Boot Camp",
  academy: "VLS Law Academy",
  dateISO: "2026-11-13",
  dateLong: "Friday, 13 November 2026",
  dateShort: "13 November 2026",
  time: "6:00 PM – 9:00 PM IST",
  duration: "3 Hours",
  fee: "₹499",
  feeInr: 499,
} as const;

export const WHATSAPP_DEFAULT_MESSAGE = `Hello VLS Law Academy, I would like to register for the ${course.name} on ${course.dateShort} (${course.fee}). Please share the payment and confirmation details.`;

export const hero = {
  eyebrow: "VLS Law Academy · Practical Legal Training",
  titleLead: "Constitutional Law",
  titleAccent: "& Practice Boot Camp",
  tagline: "Understand the Constitution. Learn the Remedies. Explore Court Practice.",
  body: "Explore the constitutional remedies, petitions, jurisdictional principles, and judicial procedures relevant to practice before the Supreme Court and High Courts.",
  primaryCta: `Register for ${course.fee}`,
  primaryNote: "Starts your registration enquiry. The academy shares payment and confirmation details.",
  secondaryCta: "Explore What You'll Learn",
  facts: [
    { label: "Date", value: course.dateLong },
    { label: "Time", value: course.time },
    { label: "Duration", value: course.duration },
    { label: "Fee", value: course.fee },
  ],
} as const;

export const matters = {
  heading: "Why Constitutional Practice Matters",
  intro:
    "Knowing a constitutional provision is the beginning. Practice depends on knowing which remedy fits, which court has jurisdiction and how the proceeding moves.",
  points: [
    { title: "Choosing the remedy", body: "A writ, an appeal, a review or a curative petition each has its own purpose and limits." },
    { title: "Knowing the forum", body: "The Supreme Court and the High Courts exercise different jurisdictions." },
    { title: "Following the procedure", body: "Petitions move through filing, categorisation and hearing under defined rules." },
  ],
} as const;

export const problem = {
  heading: "From Constitutional Theory to Courtroom Understanding.",
  intro:
    "Studying Fundamental Rights, constitutional provisions and landmark principles is essential. But understanding how they operate through legal proceedings requires another level of clarity.",
  questions: [
    "When is a writ petition appropriate?",
    "How does a Special Leave Petition differ from an ordinary appeal?",
    "What is the purpose of a review petition?",
    "How do the jurisdiction and powers of the Supreme Court and High Courts differ?",
  ],
  closing:
    "Knowing the provision is the beginning. Understanding its practical application is the next step.",
} as const;

// The 13 key topics, in the poster's order and with its terminology. Group ids only organise the display.
export const topics = {
  heading: "All 13 Key Topics Covered",
  intro:
    "The boot camp explores these constitutional remedies and petition categories: their purpose, relevant jurisdiction and role in legal proceedings.",
  note: "A three-hour session offers a structured overview of each topic. It is not a full course on every petition.",
  clusters: [
    {
      id: "writs",
      title: "Writs & Original Remedies",
      items: [
        { n: "01", name: "Writ Petitions / Writ Appeals", desc: "Constitutional writ remedies and related appellate procedures" },
        { n: "02", name: "Public Interest Litigations (PILs)", desc: "Proceedings concerning public-interest matters" },
        { n: "05", name: "Original Petition – Supreme Court & High Court", desc: "Original-jurisdiction matters before the appropriate forum" },
        { n: "12", name: "Supervisory Petition (Article 227)", desc: "High Court supervisory jurisdiction" },
      ],
    },
    {
      id: "appeals",
      title: "Appeals & Corrective Remedies",
      items: [
        { n: "03", name: "Special Leave Petitions", desc: "Discretionary special leave jurisdiction of the Supreme Court" },
        { n: "04", name: "Constitutional Appeals", desc: "Appeals involving constitutional questions and appellate remedies" },
        { n: "06", name: "Review Petitions", desc: "Applications seeking review of judicial decisions under applicable law and rules" },
        { n: "07", name: "Curative Petition", desc: "The exceptional curative jurisdiction of the Supreme Court" },
        { n: "13", name: "Certificate Petition (Article 134A)", desc: "Constitutional certification relating to appeals" },
      ],
    },
    {
      id: "special",
      title: "Special Constitutional Proceedings",
      items: [
        { n: "08", name: "Transfer Petitions", desc: "Procedures for transferring cases between appropriate courts" },
        { n: "09", name: "Contempt Petitions", desc: "Proceedings relating to contempt of court" },
        { n: "10", name: "Election Petitions", desc: "Statutory challenges involving election disputes, from Panchayat and Municipal to MLA, MLC, Lok Sabha and Rajya Sabha elections" },
        { n: "11", name: "Advisory Reference", desc: "The Supreme Court's advisory jurisdiction" },
      ],
    },
  ],
} as const;

// Concise supporting context from the brochure's Constitutional Laws and Practice module.
export const jurisdiction = {
  heading: "Constitutional Remedies and Jurisdiction",
  intro:
    "The topics sit within the constitutional framework: Fundamental Rights, Directive Principles, Fundamental Duties, Centre–State relations, emergency provisions and amendments. These are the forums and provisions the session works through.",
  courts: [
    {
      name: "Supreme Court",
      items: [
        "Original jurisdiction in disputes between the Union and States, or between States",
        "Special leave jurisdiction: Article 136",
        "Civil and criminal appeals; constitutional appeals",
        "Advisory jurisdiction: Article 143",
        "Certificate relating to appeals: Article 134A",
        "Review and curative jurisdiction",
      ],
    },
    {
      name: "High Courts",
      items: [
        "Writ jurisdiction: Article 226",
        "Madras High Court Writ Rules, 2021: writ miscellaneous petitions, filing procedures, categorisation of proceedings",
        "Public interest litigation",
        "Supervisory jurisdiction: Article 227",
        "Writ appeals and appellate remedies",
      ],
    },
  ],
} as const;

export const takeaways = {
  heading: "What Participants Will Learn",
  items: [
    "Understand the constitutional foundations relevant to legal practice.",
    "Distinguish between important petitions and judicial remedies.",
    "Identify the broad jurisdictional differences between the Supreme Court and High Courts.",
    "Become familiar with writ proceedings and the Madras High Court procedural framework.",
    "Recognise the role of appellate and special constitutional jurisdictions.",
    "Connect legal theory with a more structured understanding of proceedings.",
  ],
  support:
    "A stronger conceptual and procedural foundation can help law learners approach constitutional matters with greater clarity.",
} as const;

export const audience = {
  heading: "Who Should Attend",
  items: [
    { title: "Law Students", body: "Build early familiarity with constitutional remedies and court proceedings." },
    { title: "Law Graduates", body: "Bridge the gap between academic study and procedural understanding." },
    { title: "Junior Advocates", body: "Strengthen familiarity with writ, appellate and petition practice." },
    { title: "Practising Advocates", body: "Refresh and organise constitutional-law concepts and remedies." },
  ],
} as const;

export const whyVls = {
  heading: "Learn From an Academy That Connects Law With Practice.",
  intro:
    "VLS Law Academy emphasises both conceptual understanding and the application of legal principles in professional contexts.",
  points: [
    { title: "Conceptual clarity", body: "Understand the legal foundations before exploring their practical application." },
    { title: "Practice-oriented perspective", body: "Connect constitutional principles to real judicial remedies and procedures." },
    { title: "Classroom learning", body: "Faculty-led teaching in an academy built around legal practice." },
  ],
  galleryCaption: "Photographs from VLS Law Academy classes and premises.",
} as const;

export const registration = {
  heading: `Register for the Boot Camp`,
  eyebrow: `Registration · ${course.fee}`,
  body: `${course.dateLong}, ${course.time}.`,
  note: `Submitting starts your registration enquiry. No payment is taken on this page: the academy will contact you with payment and confirmation details.`,
  submit: "Submit Registration Enquiry",
  secondaryCta: "Enquire on WhatsApp",
  statuses: ["Law student", "Graduate", "Junior advocate", "Practising advocate", "Other"],
} as const;

export const howItWorks = {
  heading: "How Registration Works",
  steps: [
    { title: "Submit your enquiry", body: "Use the form, WhatsApp or phone. It takes a minute." },
    { title: "Get payment and confirmation details", body: `The academy contacts you with how to pay the ${course.fee} fee and confirm your place.` },
    { title: "Join the session", body: `${course.dateLong}, ${course.time}.` },
  ],
} as const;

export const faqs = [
  { q: "When is the boot camp?", a: `${course.dateLong}, ${course.time} (${course.duration.toLowerCase()}).` },
  {
    q: "What is the registration fee?",
    a: `${course.fee}. After you submit your registration enquiry, the academy will share the payment and confirmation details.`,
  },
  {
    q: "How do I register?",
    a: "Submit the registration form on this page, or message the academy on WhatsApp or call +91 95000 25216. Your place is confirmed by the academy, not by submitting the form.",
  },
  {
    q: "What does the boot camp cover?",
    a: "The 13 key topics listed on this page, from writ petitions and PILs to special leave, review, curative and other petitions before the Supreme Court and High Courts.",
  },
  {
    q: "Will I master all 13 topics in three hours?",
    a: "No. The session gives a structured overview of the remedies, jurisdictions and procedures. It is not a full course on each petition.",
  },
  {
    q: "Is this useful for law students?",
    a: "Yes. The subject matter is relevant to students seeking greater familiarity with constitutional remedies and judicial proceedings.",
  },
  {
    q: "Does it include writ petitions?",
    a: "Yes. Writ petitions and writ appeals are topic 01, and the Madras High Court Writ Rules, 2021, are part of the writ jurisdiction material.",
  },
  {
    q: "Is it online or in person?",
    a: "Please confirm the teaching mode with the academy when you enquire: +91 95000 25216.",
  },
  {
    q: "Will there be recordings, materials or certificates?",
    a: "Please confirm these inclusions with the academy before registering.",
  },
] as const;

export const finalCta = {
  heading: "Strengthen Your Constitutional Law Foundation.",
  body: "Move beyond memorising provisions. Build a clearer understanding of constitutional remedies, petitions and judicial procedure.",
  cta: `Register for ${course.fee}`,
} as const;

// Academy-owned photographs reused with the project owner's authorisation (docs/ASSET_MANIFEST.md).
// They are general classroom/premises photographs, not pictures of this boot camp, and are never captioned as such.
export const photos = {
  hero: {
    src: "/assets/vls/classroom/classroom-wide-session.jpg",
    alt: "Faculty teaching a classroom of learners at VLS Law Academy",
    width: 1500,
    height: 1125,
  },
  teaching: {
    src: "/assets/vls/classroom/classroom-faculty-teaching.jpg",
    alt: "Faculty member addressing learners during a class at VLS Law Academy",
    width: 2568,
    height: 1444,
  },
  learners: {
    src: "/assets/vls/classroom/classroom-students-notes.jpg",
    alt: "Learners taking notes during a session at VLS Law Academy",
    width: 2568,
    height: 1444,
  },
  academy: {
    src: "/assets/vls/classroom/academy-interior.jpg",
    alt: "VLS Law Academy reception wall with the VLS Law Academy sign",
    width: 1500,
    height: 1125,
  },
  logo: { src: "/assets/vls/brand/vls-logo.png", alt: "VLS Law Academy", width: 234, height: 234 },
} as const;
