
export const ui = {
  ar: {
    header: {
      signIn: "تسجيل الدخول",
      lang: "تغيير اللغة",
      openMenu: "فتح القائمة",
      closeMenu: "إغلاق القائمة",
      nav: "التنقّل الرئيسي",
      home: "أي تشطيب - الصفحة الرئيسية",
    },
    loading: "جاري تحميل الصفحة الرئيسية",
    hero: {
      section: "مقدّمة أي تشطيب",
      slider: "عروض خدمات أي تشطيب",
      sliderRole: "سلايدر",
      announce: (n, total) => `الشريحة ${n} من ${total}`,
      goTo: (n, name) => `الانتقال إلى الشريحة ${n}: ${name}`,
      prev: "الشريحة السابقة",
      next: "الشريحة التالية",
      dragHint: "اسحب العناصر لتخصيص المشهد",
      dragItem: (name) => `${name}، اسحب أو استخدم الأسهم لتحريك العنصر`,
      secondaryCta: "تعرّف على خدماتنا",
    },
    search: {
      heading: "البحث عن محترفين ومشاريع",
      submit: "بحث",
      popular: "الأكثر بحثاً",
    },
    offer: {
      title: "رحلة مشروعك تبدأ هنا",
      description: "من الفكرة إلى التنفيذ، نوفر لك كل ما تحتاجه لتحقيق مشروعك",
      explore: "استكشف",
    },
    featured: {
      title: "نخبة المحترفين",
      description:
        "تعرف على أفضل المحترفين في مجال البناء والتشييد، حيث يجتمع الخبرة والإبداع لتحقيق رؤيتك",
      projects: "المشاريع",
      experience: "الخبرة",
      years: (n) => `${n} سنوات`,
      location: "الموقع",
      availability: "التوفّر",
      availableNow: "متاح الآن",
      waitlist: "قائمة انتظار",
      viewProfile: "عرض الملف الكامل",
    },
    portfolio: {
      title: "أحدث أعمالنا",
      description:
        "اكتشف مشاريعنا الحديثة التي تجمع بين الإبداع والجودة لتحويل رؤيتك إلى واقع ملموس",
      viewAll: "استكشف جميع المشاريع",
    },
    certified: {
      title: "محترفونا المعتمدون",
      description:
        "تعرف على المحترفين المعتمدين والموثوقين الذين يجلبون الخبرة والجودة إلى كل مشروع",
      yearsExperience: (n) => `${n} سنوات خبرة`,
      viewAll: "عرض جميع المحترفين",
    },
    card: {
      enter: "دخول",
      toProfile: (name) => `إلى ملف ${name}`,
    },
    gallery: {
      prev: "الصورة السابقة",
      next: "الصورة التالية",
      goTo: (n) => `الانتقال إلى الصورة ${n}`,
      dragHint: "اسحب للتصفح",
    },
    footer: {
      section: "تذييل الصفحة",
      home: "أي تشطيب - الصفحة الرئيسية",
      social: "تابعنا على",
      email: "البريد الإلكتروني",
      phone: "الهاتف",
      rights: (year) => `© ${year} أي تشطيب. جميع الحقوق محفوظة.`,
    },
    backToTop: "العودة إلى أعلى الصفحة",
    verified: "موثّق",
    rating: (score, count) => `تقييم ${score} من 5 بناءً على ${count} مراجعة`,
  },

  en: {
    header: {
      signIn: "Sign in",
      lang: "Change language",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      nav: "Main navigation",
      home: "Itashteeb - Home",
    },
    loading: "Loading the home page",
    hero: {
      section: "Itashteeb introduction",
      slider: "Itashteeb service highlights",
      sliderRole: "carousel",
      announce: (n, total) => `Slide ${n} of ${total}`,
      goTo: (n, name) => `Go to slide ${n}: ${name}`,
      prev: "Previous slide",
      next: "Next slide",
      dragHint: "Drag the tags to customise the scene",
      dragItem: (name) => `${name}, drag or use the arrow keys to move it`,
      secondaryCta: "Explore our services",
    },
    search: {
      heading: "Search professionals and projects",
      submit: "Search",
      popular: "Trending",
    },
    offer: {
      title: "Your project journey starts here",
      description:
        "From concept to handover, everything you need to bring your project to life",
      explore: "Explore",
    },
    featured: {
      title: "Featured professionals",
      description:
        "Meet the best in construction and design, where experience and creativity come together to realise your vision",
      projects: "Projects",
      experience: "Experience",
      years: (n) => `${n} years`,
      location: "Location",
      availability: "Availability",
      availableNow: "Available now",
      waitlist: "Waitlist",
      viewProfile: "View full profile",
    },
    portfolio: {
      title: "Our latest work",
      description:
        "Discover recent projects that pair creativity with quality to turn your vision into something real",
      viewAll: "Browse all projects",
    },
    certified: {
      title: "Our certified professionals",
      description:
        "Meet the verified, trusted professionals who bring experience and quality to every project",
      yearsExperience: (n) => `${n} years experience`,
      viewAll: "View all professionals",
    },
    card: {
      enter: "Visit",
      toProfile: (name) => `to ${name}'s profile`,
    },
    gallery: {
      prev: "Previous image",
      next: "Next image",
      goTo: (n) => `Go to image ${n}`,
      dragHint: "Drag to browse",
    },
    footer: {
      section: "Site footer",
      home: "Itashteeb - Home",
      social: "Follow us",
      email: "Email",
      phone: "Phone",
      rights: (year) => `© ${year} Itashteeb. All rights reserved.`,
    },
    backToTop: "Back to top",
    verified: "Verified",
    rating: (score, count) => `Rated ${score} out of 5 based on ${count} reviews`,
  },
};
