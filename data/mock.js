import {
  Armchair,
  Award,
  BookOpen,
  CalendarCheck,
  Gift,
  HardHat,
  Lamp,
  Layers,
  Leaf,
  Palette,
  Ruler,
  ShieldCheck,
  Sofa,
  Star,
  TrendingUp,
  Users,
  Wrench,
} from "lucide-react";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Whatsapp,
  Youtube,
} from "@/components/ui/SocialGlyphs";

// Home page content. Visible text is { ar, en } and goes through localize();
// ids, hrefs and image srcs stay plain strings.

// 8x6 gradient, used as the next/image blur placeholder
export const BLUR_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjYiPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iZyIgeDE9IjAiIHkxPSIwIiB4Mj0iMSIgeTI9IjEiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNkOWQyYzgiLz48c3RvcCBvZmZzZXQ9IjU1JSIgc3RvcC1jb2xvcj0iI2I5YjBhNCIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzhkODQ3OCIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjYiIGZpbGw9InVybCgjZykiLz48L3N2Zz4=";

const img = (id, w = 1200, h = 900) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

// No href yet, so SiteHeader renders these as buttons.
export const navLinks = [
  { id: "home", label: { ar: "الرئيسية", en: "Home" }, current: true },
  { id: "services", label: { ar: "الخدمات", en: "Services" } },
  { id: "pros", label: { ar: "المحترفون", en: "Professionals" } },
  { id: "ideas", label: { ar: "معرض الأفكار", en: "Idea book" } },
  { id: "projects", label: { ar: "المشاريع", en: "Projects" } },
];

export const languages = [
  { code: "ar", label: "العربية", short: "ع" },
  { code: "en", label: "English", short: "EN" },
];

export const trustBadges = [
  { id: "pros", icon: Users, label: { ar: "+500 محترف موثوق", en: "500+ trusted pros" } },
  { id: "reviews", icon: Star, label: { ar: "تقييمات حقيقية", en: "Real reviews" } },
  { id: "quality", icon: Award, label: { ar: "جودة مضمونة", en: "Quality guaranteed" } },
];


export const heroSlides = [
  {
    id: "customize",
    eyebrow: { ar: "تشطيب وتصميم متكامل", en: "End-to-end fit-out & design" },
    title: {
      ar: "اعثر على خبراء موثوقين لتحقيق",
      en: "Find trusted experts to build",
    },
    highlight: { ar: "منزل أحلامك", en: "your dream home" },
    description: {
      ar: "ابحث، قارن، وتواصل مع أفضل المحترفين في التصميم والبناء والتشطيب",
      en: "Search, compare and connect with the best design, build and finishing pros",
    },
    cta: {
      label: { ar: "ابدأ البحث الآن", en: "Start searching" },
      href: "#search",
    },
    image: img("1600585154340-be6161a56a0c", 1600, 1000),
    imageAlt: {
      ar: "غرفة معيشة بتشطيب حديث بألوان محايدة وإضاءة طبيعية واسعة",
      en: "A modern living space in neutral tones with wide natural light",
    },
    draggables: [
      { id: "lighting", icon: Lamp, label: { ar: "إضاءة", en: "Lighting" }, swatch: "#e0a83a", x: 28, y: 20 },
      { id: "greenery", icon: Leaf, label: { ar: "نباتات", en: "Greenery" }, swatch: "#2b908d", x: 11, y: 40 },
      { id: "furniture", icon: Armchair, label: { ar: "أثاث", en: "Furniture" }, swatch: "#7a5c48", x: 36, y: 48 },
      { id: "flooring", icon: Layers, label: { ar: "أرضيات", en: "Flooring" }, swatch: "#a8763e", x: 17, y: 63 },
    ],
  },
  {
    id: "turnkey",
    eyebrow: { ar: "مقاولات تسليم مفتاح", en: "Turnkey contracting" },
    title: { ar: "من أول رسم هندسي حتى", en: "From the first drawing to" },
    highlight: { ar: "استلام المفتاح", en: "handing over the keys" },
    description: {
      ar: "فرق تنفيذ معتمدة تدير مشروعك بجدول زمني وميزانية متفق عليها",
      en: "Certified crews running your project on an agreed timeline and budget",
    },
    cta: {
      label: { ar: "تعرّف على المقاولين", en: "Meet the contractors" },
      href: "#certified-professionals",
    },
    image: img("1600607687920-4e2a09cf159d", 1600, 1000),
    imageAlt: {
      ar: "وحدة سكنية مكتملة التشطيب بمساحات مفتوحة وإضاءة مدروسة",
      en: "A fully finished home with open-plan spaces and considered lighting",
    },
    highlights: [
      { id: "schedule", icon: CalendarCheck, label: { ar: "مواعيد ملتزمة", en: "On-time delivery" }, swatch: "#1f7472", x: 26, y: 22 },
      { id: "supervision", icon: HardHat, label: { ar: "إشراف هندسي", en: "Engineer on site" }, swatch: "#a8763e", x: 13, y: 45 },
      { id: "warranty", icon: ShieldCheck, label: { ar: "ضمان التنفيذ", en: "Workmanship warranty" }, swatch: "#2b908d", x: 33, y: 64 },
    ],
  },
  {
    id: "interior",
    eyebrow: { ar: "تصميم داخلي وديكور", en: "Interior design & decor" },
    title: { ar: "لمسات تصميم تُحوِّل", en: "Design details that transform" },
    highlight: { ar: "مساحتك بالكامل", en: "your whole space" },
    description: {
      ar: "مصمّمون يترجمون ذوقك إلى مخططات ومواد وألوان قابلة للتنفيذ",
      en: "Designers who turn your taste into buildable plans, materials and palettes",
    },
    cta: {
      label: { ar: "استعرض الأعمال", en: "Browse the work" },
      href: "#latest-projects",
    },
    image: img("1600566753086-00f18fb6b3ea", 1600, 1000),
    imageAlt: {
      ar: "مساحة داخلية بديكور دافئ يجمع الخشب والإضاءة الخفيفة",
      en: "A warm interior combining timber and soft lighting",
    },
    highlights: [
      { id: "moodboard", icon: Palette, label: { ar: "لوحة ألوان", en: "Colour palette" }, swatch: "#d4941a", x: 14, y: 25 },
      { id: "layout", icon: Ruler, label: { ar: "توزيع المساحات", en: "Space planning" }, swatch: "#1f7472", x: 34, y: 43 },
      { id: "furnishing", icon: Sofa, label: { ar: "اختيار الأثاث", en: "Furniture selection" }, swatch: "#7a5c48", x: 18, y: 66 },
    ],
  },
];

export const filterGroups = [
  {
    id: "type",
    label: { ar: "نوع الجهة", en: "Provider type" },
    placeholder: { ar: "كل الأنواع", en: "All types" },
    options: [
      { value: "office", label: { ar: "مكتب هندسي", en: "Engineering office" } },
      { value: "contractor", label: { ar: "مقاول", en: "Contractor" } },
      { value: "designer", label: { ar: "مصمم ديكور", en: "Interior designer" } },
      { value: "supplier", label: { ar: "موّرد مواد", en: "Material supplier" } },
      { value: "craftsman", label: { ar: "فني تشطيبات", en: "Finishing tradesman" } },
    ],
  },
  {
    id: "category",
    label: { ar: "الفئة", en: "Category" },
    placeholder: { ar: "جميع الفئات", en: "All categories" },
    options: [
      { value: "residential", label: { ar: "سكني", en: "Residential" } },
      { value: "commercial", label: { ar: "تجاري", en: "Commercial" } },
      { value: "interior", label: { ar: "ديكور وتصميم داخلي", en: "Decor & interiors" } },
      { value: "structural", label: { ar: "أعمال إنشائية", en: "Structural works" } },
      { value: "landscape", label: { ar: "لاندسكيب وحدائق", en: "Landscape & gardens" } },
    ],
  },
  {
    id: "country",
    label: { ar: "الدولة", en: "Country" },
    placeholder: { ar: "جميع الدول", en: "All countries" },
    options: [
      { value: "eg", label: { ar: "مصر", en: "Egypt" } },
      { value: "sa", label: { ar: "السعودية", en: "Saudi Arabia" } },
      { value: "ae", label: { ar: "الإمارات", en: "UAE" } },
      { value: "kw", label: { ar: "الكويت", en: "Kuwait" } },
      { value: "qa", label: { ar: "قطر", en: "Qatar" } },
    ],
  },
  {
    id: "budget",
    label: { ar: "الميزانية", en: "Budget" },
    placeholder: { ar: "كل الميزانيات", en: "Any budget" },
    options: [
      { value: "lt-250k", label: { ar: "أقل من 250 ألف", en: "Under 250K" } },
      { value: "250k-750k", label: { ar: "250 – 750 ألف", en: "250K – 750K" } },
      { value: "750k-2m", label: { ar: "750 ألف – 2 مليون", en: "750K – 2M" } },
      { value: "gt-2m", label: { ar: "أكثر من 2 مليون", en: "Over 2M" } },
    ],
  },
  {
    id: "completion",
    label: { ar: "تاريخ الإنجاز", en: "Completion" },
    placeholder: { ar: "تاريخ الإنجاز", en: "Any timeline" },
    options: [
      { value: "1-3m", label: { ar: "خلال 3 أشهر", en: "Within 3 months" } },
      { value: "3-6m", label: { ar: "3 – 6 أشهر", en: "3 – 6 months" } },
      { value: "6-12m", label: { ar: "6 – 12 شهراً", en: "6 – 12 months" } },
      { value: "gt-12m", label: { ar: "أكثر من سنة", en: "Over a year" } },
    ],
  },
];

export const popularSearches = [
  { id: "apartments", label: { ar: "تشطيب شقق", en: "Apartment fit-out" }, href: "/projects?q=apartment-fit-out" },
  { id: "turnkey", label: { ar: "مقاول تسليم مفتاح", en: "Turnkey contractor" }, href: "/professionals?q=turnkey" },
  { id: "modern", label: { ar: "تصميم داخلي مودرن", en: "Modern interiors" }, href: "/idea-book?q=modern" },
  { id: "kitchens", label: { ar: "مطابخ وخزائن", en: "Kitchens & joinery" }, href: "/services?q=kitchens" },
  { id: "facades", label: { ar: "واجهات ولاندسكيب", en: "Facades & landscape" }, href: "/services?q=facades" },
];

export const offerings = [
  {
    id: "idea-book",
    icon: BookOpen,
    title: { ar: "كتاب الأفكار", en: "Idea book" },
    description: {
      ar: "استلهم من مشاريعنا وتصفح آلاف المشاريع المكتملة للحصول على أفكار لمشروعك القادم",
      en: "Get inspired and browse thousands of completed projects for your next build",
    },
    href: "/idea-book",
  },
  {
    id: "professionals",
    icon: Users,
    title: { ar: "المحترفون", en: "Professionals" },
    description: {
      ar: "اعثر على الخبير المثالي وتواصل مع محترفين معتمدين وموثوقين لتحقيق مشروعك",
      en: "Find the right expert and connect with certified, vetted pros to deliver your project",
    },
    href: "/professionals",
  },
  {
    id: "services",
    icon: Wrench,
    title: { ar: "الخدمات", en: "Services" },
    description: {
      ar: "احصل على الخدمة المطلوبة، من التصميم إلى التنفيذ نوفر جميع الخدمات التي تحتاجها",
      en: "Get the service you need, from design to delivery, every trade in one place",
    },
    href: "/services",
  },
];

// Projects and the featured card link to these entries by id.
export const companies = [
  {
    id: "almasar-alhandasi",
    name: { ar: "المسار الهندسي", en: "Al Masar Engineering" },
    logo: "/logos/almasar-alhandasi.svg",
    tagline: {
      ar: "مكتب هندسي متكامل يقدّم التصميم والإشراف والتنفيذ للمشاريع السكنية الفاخرة",
      en: "A full-service practice covering design, supervision and delivery for premium homes",
    },
    verified: true,
    specialties: [
      { ar: "المكاتب الهندسية والتنفيذ", en: "Engineering & delivery" },
      { ar: "التشطيب والتجديد", en: "Fit-out & renovation" },
      { ar: "الأنظمة والتقنية", en: "Systems & technology" },
    ],
    projectsCount: 48,
    yearsExperience: 7,
    city: { ar: "الرياض", en: "Riyadh" },
    country: { ar: "السعودية", en: "Saudi Arabia" },
    availableNow: true,
    rating: { score: 5.0, count: 1 },
  },
  {
    id: "dar-alemara",
    name: { ar: "دار العمارة للاستشارات الهندسية", en: "Dar Al Emara Consultants" },
    logo: "/logos/dar-alemara.svg",
    tagline: {
      ar: "استشارات معمارية وإنشائية للمشاريع التجارية والإدارية مع إدارة كاملة للمشروع",
      en: "Architectural and structural consultancy for commercial and office projects, fully managed",
    },
    verified: true,
    specialties: [
      { ar: "تصميم معماري", en: "Architectural design" },
      { ar: "إدارة مشاريع", en: "Project management" },
      { ar: "أعمال تجارية وإدارية", en: "Commercial & office works" },
    ],
    projectsCount: 132,
    yearsExperience: 14,
    city: { ar: "القاهرة", en: "Cairo" },
    country: { ar: "مصر", en: "Egypt" },
    availableNow: true,
    rating: { score: 4.9, count: 37 },
  },
  {
    id: "noqta-tasmeem",
    name: { ar: "نقطة تصميم", en: "Noqta Design Studio" },
    logo: "/logos/noqta-tasmeem.svg",
    tagline: {
      ar: "استوديو تصميم داخلي يهتم بالتفاصيل الصغيرة والحلول الذكية للمساحات المحدودة",
      en: "An interior studio obsessed with fine detail and smart solutions for compact spaces",
    },
    verified: true,
    specialties: [
      { ar: "تصميم داخلي", en: "Interior design" },
      { ar: "أثاث مخصص", en: "Bespoke furniture" },
      { ar: "إضاءة", en: "Lighting" },
    ],
    projectsCount: 76,
    yearsExperience: 9,
    city: { ar: "القاهرة الجديدة", en: "New Cairo" },
    country: { ar: "مصر", en: "Egypt" },
    availableNow: true,
    rating: { score: 4.8, count: 28 },
  },
  {
    id: "beit-alhirfa",
    name: { ar: "بيت الحرفة للتشطيبات", en: "Beit Al Hirfa Finishing" },
    logo: "/logos/beit-alhirfa.svg",
    tagline: {
      ar: "تشطيبات تسليم مفتاح بجودة حرفية عالية، مع فرق تنفيذ ثابتة ومواد موثوقة",
      en: "Turnkey finishing with true craftsmanship, steady in-house crews and trusted materials",
    },
    verified: true,
    specialties: [
      { ar: "تسليم مفتاح", en: "Turnkey delivery" },
      { ar: "نجارة ودهانات", en: "Joinery & painting" },
      { ar: "ترميم وتجديد", en: "Restoration & renovation" },
    ],
    projectsCount: 95,
    yearsExperience: 11,
    city: { ar: "الإسكندرية", en: "Alexandria" },
    country: { ar: "مصر", en: "Egypt" },
    availableNow: false,
    rating: { score: 4.7, count: 17 },
  },
  {
    id: "roaya-alkhalij",
    name: { ar: "رؤية الخليج للديكور", en: "Gulf Vision Interiors" },
    logo: "/logos/roaya-alkhalij.svg",
    tagline: {
      ar: "تصميم وتنفيذ الهوية الداخلية للمطاعم والمساحات التجارية بطابع محلي معاصر",
      en: "Designing and building interior identity for restaurants and retail with a contemporary local voice",
    },
    verified: true,
    specialties: [
      { ar: "ضيافة ومطاعم", en: "Hospitality & F&B" },
      { ar: "هوية مكانية", en: "Spatial identity" },
      { ar: "تنفيذ ديكور", en: "Fit-out delivery" },
    ],
    projectsCount: 64,
    yearsExperience: 12,
    city: { ar: "دبي", en: "Dubai" },
    country: { ar: "الإمارات", en: "UAE" },
    availableNow: true,
    rating: { score: 4.9, count: 34 },
  },
  {
    id: "taqniyat-albina",
    name: { ar: "تقنيات البناء الحديثة", en: "Modern Build Technologies" },
    logo: "/logos/taqniyat-albina.svg",
    tagline: {
      ar: "مقاولات إنشائية للأبراج والمجمعات السكنية بأنظمة بناء حديثة وجداول تسليم دقيقة",
      en: "Structural contracting for towers and residential compounds using modern systems and tight schedules",
    },
    verified: true,
    specialties: [
      { ar: "أعمال إنشائية", en: "Structural works" },
      { ar: "خرسانة مسلّحة", en: "Reinforced concrete" },
      { ar: "مقاولات عامة", en: "General contracting" },
    ],
    projectsCount: 41,
    yearsExperience: 16,
    city: { ar: "الجيزة", en: "Giza" },
    country: { ar: "مصر", en: "Egypt" },
    availableNow: true,
    rating: { score: 4.8, count: 21 },
  },
];

const companyById = (id) => companies.find((company) => company.id === id);

export const featuredProfessional = {
  company: companyById("almasar-alhandasi"),
  project: {
    category: { ar: "ديكور وتصميم داخلي", en: "Decor & interiors" },
    title: {
      ar: "فيلا فاخرة في السعودية - مجلس عربي عصري",
      en: "Luxury villa in Saudi Arabia - a contemporary majlis",
    },
    description: {
      ar: "إعادة تصميم مجلس رئيسي بمساحة 120 م² يجمع بين الطابع العربي والخطوط المعاصرة: جلسات أرضية مرتفعة، مشربيات خشبية بإضاءة خلفية، وأسقف بمستويات تُبرز الارتفاع الطبيعي للمكان.",
      en: "A 120 m² main majlis reimagined where Arabian character meets contemporary lines: raised floor seating, backlit timber mashrabiya screens, and a layered ceiling that celebrates the room's natural height.",
    },
    href: "/professionals/almasar-alhandasi",
    gallery: [
      {
        src: img("1600607687939-ce8a6c25118c", 1400, 1000),
        alt: {
          ar: "مجلس عربي معاصر بجلسات منخفضة وإضاءة خلفية دافئة",
          en: "A contemporary majlis with low seating and warm backlighting",
        },
      },
      {
        src: img("1600566753086-00f18fb6b3ea", 1400, 1000),
        alt: {
          ar: "تفاصيل مشربية خشبية على جدار المجلس مع إضاءة مخفية",
          en: "Timber mashrabiya detail on the majlis wall with concealed lighting",
        },
      },
      {
        src: img("1600585154526-990dced4db0d", 1400, 1000),
        alt: {
          ar: "منظور واسع للمجلس يُظهر السقف بمستويات متعددة",
          en: "A wide view of the majlis showing the multi-level ceiling",
        },
      },
    ],
  },
};

export const projects = [
  {
    id: "villa-majlis-riyadh",
    title: { ar: "فيلا فاخرة - مجلس عربي عصري", en: "Luxury villa - contemporary majlis" },
    categoryLabel: { ar: "ديكور", en: "Decor" },
    locationLabel: { ar: "حي الملقا، الرياض", en: "Al Malqa, Riyadh" },
    country: { ar: "السعودية", en: "Saudi Arabia" },
    company: companyById("almasar-alhandasi"),
    image: {
      src: img("1600607687920-4e2a09cf159d", 900, 675),
      alt: {
        ar: "مجلس عربي عصري بإضاءة دافئة وجلسات منخفضة",
        en: "A contemporary majlis with warm lighting and low seating",
      },
    },
    href: "/projects/villa-majlis-riyadh",
  },
  {
    id: "apartment-fifth-settlement",
    title: { ar: "تشطيب شقة مودرن بالتجمع الخامس", en: "Modern apartment fit-out, Fifth Settlement" },
    categoryLabel: { ar: "سكني", en: "Residential" },
    locationLabel: { ar: "التجمع الخامس، القاهرة الجديدة", en: "Fifth Settlement, New Cairo" },
    country: { ar: "مصر", en: "Egypt" },
    company: companyById("noqta-tasmeem"),
    image: {
      src: img("1600566753190-17f0baa2a6c3", 900, 675),
      alt: {
        ar: "غرفة معيشة بشقة مودرن بألوان محايدة وأثاث بسيط",
        en: "A modern apartment living room in neutral tones with simple furniture",
      },
    },
    href: "/projects/apartment-fifth-settlement",
  },
  {
    id: "tech-office-cairo",
    title: { ar: "مقر إداري لشركة تقنية", en: "Head office for a tech company" },
    categoryLabel: { ar: "تجاري", en: "Commercial" },
    locationLabel: { ar: "جاردن سيتي، القاهرة", en: "Garden City, Cairo" },
    country: { ar: "مصر", en: "Egypt" },
    company: companyById("dar-alemara"),
    image: {
      src: img("1497366754035-f200968a6e72", 900, 675),
      alt: {
        ar: "مساحة عمل مفتوحة بمكاتب خشبية وإضاءة معلّقة",
        en: "An open-plan workspace with timber desks and pendant lighting",
      },
    },
    href: "/projects/tech-office-cairo",
  },
  {
    id: "coastal-villa-marassi",
    title: { ar: "تجديد فيلا ساحلية", en: "Coastal villa renovation" },
    categoryLabel: { ar: "سكني", en: "Residential" },
    locationLabel: { ar: "مراسي، الساحل الشمالي", en: "Marassi, North Coast" },
    country: { ar: "مصر", en: "Egypt" },
    company: companyById("beit-alhirfa"),
    image: {
      src: img("1512917774080-9991f1c4c750", 900, 675),
      alt: {
        ar: "واجهة فيلا ساحلية بيضاء بمسبح أمامي",
        en: "A white coastal villa facade with a pool in front",
      },
    },
    href: "/projects/coastal-villa-marassi",
  },
  {
    id: "heritage-restaurant-dubai",
    title: { ar: "مطعم بطابع تراثي", en: "Restaurant with a heritage character" },
    categoryLabel: { ar: "ضيافة", en: "Hospitality" },
    locationLabel: { ar: "الجميرا، دبي", en: "Jumeirah, Dubai" },
    country: { ar: "الإمارات", en: "UAE" },
    company: companyById("roaya-alkhalij"),
    image: {
      src: img("1517248135467-4c7edcad34c4", 900, 675),
      alt: {
        ar: "صالة مطعم بطابع تراثي وطاولات خشبية وإضاءة خفيفة",
        en: "A heritage-styled restaurant hall with timber tables and soft lighting",
      },
    },
    href: "/projects/heritage-restaurant-dubai",
  },
  {
    id: "residential-tower-giza",
    title: { ar: "برج سكني - تنفيذ إنشائي كامل", en: "Residential tower - full structural delivery" },
    categoryLabel: { ar: "إنشائي", en: "Structural" },
    locationLabel: { ar: "المهندسين، الجيزة", en: "Mohandessin, Giza" },
    country: { ar: "مصر", en: "Egypt" },
    company: companyById("taqniyat-albina"),
    image: {
      src: img("1503387762-592deb58ef4e", 900, 675),
      alt: {
        ar: "موقع إنشاء برج سكني في مرحلة الهيكل الخرساني",
        en: "A residential tower site at the concrete frame stage",
      },
    },
    href: "/projects/residential-tower-giza",
  },
  {
    id: "dental-clinic-alexandria",
    title: { ar: "عيادة أسنان بتصميم هادئ", en: "Dental clinic with a calm design" },
    categoryLabel: { ar: "طبي", en: "Medical" },
    locationLabel: { ar: "سموحة، الإسكندرية", en: "Smouha, Alexandria" },
    country: { ar: "مصر", en: "Egypt" },
    company: companyById("beit-alhirfa"),
    image: {
      src: img("1588776814546-1ffcf47267a5", 900, 675),
      alt: {
        ar: "غرفة عيادة أسنان بتشطيب أبيض هادئ وإضاءة موزّعة",
        en: "A dental treatment room in calm white finishes with even lighting",
      },
    },
    href: "/projects/dental-clinic-alexandria",
  },
  {
    id: "panoramic-chalet-ain-sokhna",
    title: { ar: "شاليه بإطلالة بانورامية", en: "Chalet with a panoramic view" },
    categoryLabel: { ar: "سكني", en: "Residential" },
    locationLabel: { ar: "العين السخنة، السويس", en: "Ain Sokhna, Suez" },
    country: { ar: "مصر", en: "Egypt" },
    company: companyById("dar-alemara"),
    image: {
      src: img("1520250497591-112f2f40a3f4", 900, 675),
      alt: {
        ar: "شاليه بواجهة زجاجية واسعة تطل على البحر",
        en: "A chalet with a wide glazed facade looking out to sea",
      },
    },
    href: "/projects/panoramic-chalet-ain-sokhna",
  },
];

export const joinUs = {
  eyebrow: { ar: "انضم إلينا اليوم", en: "Join us today" },
  title: { ar: "خبرتك تستحق الأفضل", en: "Your expertise deserves better" },
  description: {
    ar: "إذا كنت محترفاً، ادخل إلى عالم من الفرص - سجل الدخول للتواصل والتعاون والابتكار مع الأفضل في الصناعة!",
    en: "If you're a professional, step into a world of opportunity - sign up to connect, collaborate and build with the best in the industry.",
  },
  ctaLabel: { ar: "انضم إلينا الآن", en: "Join us now" },
  ctaHref: "/auth/sign-up",
  highlights: [
    { id: "free", icon: Gift, label: { ar: "مجاني للانضمام", en: "Free to join" } },
    { id: "network", icon: Users, label: { ar: "آلاف المحترفين", en: "Thousands of pros" } },
    { id: "leads", icon: TrendingUp, label: { ar: "فرص متاحة", en: "Live opportunities" } },
  ],
};

// TODO: replace the social handles and contact details with the real accounts.
export const footer = {
  tagline: {
    ar: "تشطيب منصة متخصصة في خدمات البناء والتشطيب، نقدم حلولًا متكاملة بأعلى جودة.",
    en: "Itashteeb is a platform dedicated to construction and finishing services, delivering complete solutions at the highest quality.",
  },
  columns: [
    {
      id: "services",
      title: { ar: "الخدمات", en: "Services" },
      links: [
        {
          id: "engineering",
          label: { ar: "المكاتب الهندسية والتنفيذ", en: "Engineering & delivery" },
          href: "/services/engineering",
        },
        {
          id: "systems",
          label: { ar: "الأنظمة والتقنية", en: "Systems & technology" },
          href: "/services/systems",
        },
        {
          id: "finishing",
          label: { ar: "التشطيب والتجديد", en: "Fit-out & renovation" },
          href: "/services/finishing",
        },
      ],
    },
    {
      id: "company",
      title: { ar: "الشركة", en: "Company" },
      links: [
        { id: "about", label: { ar: "من نحن", en: "About us" }, href: "/about" },
        { id: "contact", label: { ar: "تواصل معنا", en: "Contact us" }, href: "/contact" },
        { id: "blog", label: { ar: "المدونة", en: "Blog" }, href: "/blog" },
      ],
    },
    {
      id: "support",
      title: { ar: "الدعم", en: "Support" },
      links: [
        { id: "plans", label: { ar: "الباقات", en: "Plans" }, href: "/plans" },
        { id: "help", label: { ar: "المساعدة", en: "Help" }, href: "/help" },
        { id: "faq", label: { ar: "الأسئلة الشائعة", en: "FAQ" }, href: "/faq" },
        { id: "terms", label: { ar: "الشروط والأحكام", en: "Terms & conditions" }, href: "/terms" },
        { id: "privacy", label: { ar: "سياسة الخصوصية", en: "Privacy policy" }, href: "/privacy" },
      ],
    },
  ],
  // Rendered in the brand column, next to the logo.
  contact: {
    title: { ar: "تواصل معنا", en: "Get in touch" },
    email: "info@itashteeb.com",
    phone: "+201000000000",
  },
  social: [
    { id: "whatsapp", icon: Whatsapp, label: { ar: "واتساب", en: "WhatsApp" }, href: "https://wa.me/201000000000" },
    { id: "youtube", icon: Youtube, label: { ar: "يوتيوب", en: "YouTube" }, href: "https://www.youtube.com/@itashteeb" },
    { id: "linkedin", icon: Linkedin, label: { ar: "لينكدإن", en: "LinkedIn" }, href: "https://www.linkedin.com/company/itashteeb" },
    { id: "instagram", icon: Instagram, label: { ar: "إنستغرام", en: "Instagram" }, href: "https://www.instagram.com/itashteeb" },
    { id: "twitter", icon: Twitter, label: { ar: "تويتر", en: "Twitter" }, href: "https://twitter.com/itashteeb" },
    { id: "facebook", icon: Facebook, label: { ar: "فيسبوك", en: "Facebook" }, href: "https://www.facebook.com/itashteeb" },
  ],
};

// Used by generateMetadata() in app/page.jsx
export const siteMeta = {
  name: { ar: "أي تشطيب", en: "Itashteeb" },
  title: {
    ar: "أي تشطيب - ابحث عن محترفي البناء والتشطيبات الموثوقين في مصر",
    en: "Itashteeb - find trusted construction and finishing professionals in Egypt",
  },
  description: {
    ar: "تواصل مع أفضل المهندسين المعماريين، المقاولين، مصممي الديكور، وخبراء التشطيبات في مصر. تصفح الأعمال السابقة، قارن الأسعار، واستأجر محترفين معتمدين لمشاريعك",
    en: "Connect with the best architects, contractors, interior designers and finishing experts in Egypt. Browse past work, compare pricing and hire certified professionals for your projects.",
  },
  ogAlt: {
    ar: "أي تشطيب - منصة تربط أصحاب المشاريع بمحترفي البناء والتشطيب",
    en: "Itashteeb - connecting project owners with construction and finishing professionals",
  },
};
