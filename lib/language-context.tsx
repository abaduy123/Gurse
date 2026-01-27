"use client"

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react"


export type Language = "so" | "en" | "ar"

interface Translations {
  nav: {
    home: string
    about: string
    vision: string
    contact: string
    order_your_property: string
  }

  hero: {
    headline: string
    subheadline: string
    cta: string
    ctaSecondary: string
    badge: string
    feature1Title: string
    feature1Desc: string
    feature2Title: string
    feature2Desc: string
    feature3Title: string
    feature3Desc: string
    highlightProperties: string
    highlightClients: string
    highlightYears: string
  }

  about: {
    title: string
    subtitle: string
    description: string
    mission: string
    missionDesc: string
    values: string
    valuesDesc: string
    trust: string
    trustDesc: string
    whyChooseUs: string
    whyChooseUsDesc: string
    trustPoint1: string
    trustPoint2: string
    trustPoint3: string
    trustPoint4: string
    yearsExperience: string
    statsYears: string
    statsClients: string
    statsProperties: string
    statsSatisfaction: string
  }


  vision: {
    title: string
    subtitle: string
    description: string
    longTermVision: string
    longTermVisionDesc: string
    philosophy: string
    philosophyDesc: string
    futureGoals: string
    futureGoalsDesc: string

    learnMore: string
    ctaTitle: string
    ctaDesc: string
    ctaButton: string
  }

  contact: {
    title: string
    subtitle: string
    nameLabel: string
    namePlaceholder: string
    emailLabel: string
    emailPlaceholder: string
    messageLabel: string
    messagePlaceholder: string
    submit: string
    phone: string
    whatsapp: string
    address: string,
    email: string,
  }

  order_your_property: {
    title: string
    subtitle: string

    firstNameLabel: string
    firstNamePlaceholder: string
    lastNameLabel: string
    lastNamePlaceholder: string

    phone: string
    emailLabel: string
    emailPlaceholder: string

    regionPlaceholder: string
    cityPlaceholder: string
    cityPlaceholderDisabled: string
    propertyTypePlaceholder: string

    messageLabel: string
    messagePlaceholder: string

    submit: string
  }

  footer: {
    rights: string
  }
}

const translations: Record<Language, Translations> = {
  so: {
    nav: {
      home: "Guriga",
      about: "Yaan Nahay",
      vision: "Himiladeenna",
      contact: "Nala Xiriir",
      order_your_property: "Dalbo Hanti",
    },

    hero: {
      headline: "Lahaansho Guri oo Fudud oo Sacuudi Carabiya",
      subheadline: "Shirkad lagu kalsoon yahay oo ka caawisa ajaanibta lahaanshaha guryaha Sacuudi Carabiya si fudud oo ammaan ah.",
      cta: "Dalbo Hantidaada",
      ctaSecondary: "Wax Badan Ka Ogow",
      badge: "Lammaanahaaga Maalgelinta",
      feature1Title: "Lahaansho Ammaan iyo Fudud",
      feature1Desc: "Fursado lagu kalsoon yahay oo fudud oo loogu talagalay ajaanibta lahaanshaha guryaha",
      feature2Title: "Khibrad Baaxad Leh oo Suuqa ah",
      feature2Desc: "Sanado Khibrad Dheer oo Lagu Kalsoon yahay",
      feature3Title: "Taageero Joogto ah",
      feature3Desc: "Hagitaan shaqsiyeed",
      highlightProperties: "Hanti",
      highlightClients: "Macaamiil",
      highlightYears: "Sanado",
    },

    about: {
      title: "Yaan Nahay",
      subtitle: "Ku Saabsan Shirkadda",
      description: `Waxaan nahay shirkad guryaha iyo hantida maguurtada ah oo u shaqeysa hab dhammaystiran oo mustaqbalka dhow iyo kan figba insha allaah oo lagu fududeynayo ama tusaaleynaayo sidii aad u noqon laheyd lahaade hanti ma guurto ah wadanka Sacuudi Carabiya. Waxaan ku gaarnaa annagoo bixinna adeegyo gaar ah oo daboolaya baahiyaha macaamiisheenna, iyo himilooyinkooda iyada oo loo marayo xulashooyinka ugu wanaagsan ee la heli karo.
Macaamiishayadu waa hantideenna koowaad; waxaan u aragnaa inay yihiin udub-dhexaadka dhiirrigelinteenna iyo aasaaska guusheenna.
`,
      mission: "Halkudheggeenna",
      missionDesc: "Annaga kali kuma nihin shaqooyinkan (suuqa kala iibsiga guryaha & dhulalka) laakiin waxaan fileynaa inaanu ugu fiicnaano .",
      values: "Hadafkayaga",
      valuesDesc: "Bixinta adeegyo hanti ma-guurto ah oo heer sare ah iyada oo la adeegsanayo tignoolajiyada casriga ah si loo xaqiijiyo qanacsanaanta macaamiisha wakhti kasta iyo meel kasta.",
      trust: "Kalsooni",
      trustDesc: "Waxaan ku faaneynaa rikoodh guul leh oo muddo dheer ah oo aan ku bixinnay adeegyo hanti ma-guurto ah oo lagu kalsoon yahay, annagoo hubinayna qanacsanaanta macaamiisha iyada oo loo marayo hufnaan iyo xirfad kasta talaabo kasta.",
      whyChooseUs: "Hawlaha Aan Qabannay",
      whyChooseUsDesc: "Mid ka mid ah mashaariicda ay hirgelisay shirkada Panorama ee gacan saarka shaqo lee nahay.",
      trustPoint1: "Shirkad la oggolaaday",
      trustPoint2: "Hufnaan buuxda",
      trustPoint3: "Taageero 24/7",
      trustPoint4: "Nidaam ammaan ah",
      yearsExperience: "Khibrad",
      statsYears: "Sanado",
      statsClients: "Macaamiil",
      statsProperties: "Hanti",
      statsSatisfaction: "Qanacsanaan",
    },



    vision: {
      title: "Himiladeenna",
      subtitle: "Mustaqbalka Maalgelinta",
      description: `In aan noqono saaxiibka ugu horreeya ee bixiya talooyinka ugu fiican, buuxiyana baahiyaha macaamiisheenna si kalsooni sare leh .`,
      longTermVision: "Himilo",
      longTermVisionDesc: "Bixinta waayo-aragnimo lahaansho guri oo fudud oo ammaan ah dhammaan macaamiisha",
      philosophy: "Falsafadda Shirkadda",
      philosophyDesc: "U hogaansanaanta hufnaan iyo daacadnimo talaabo kasta oo habka lahaanshaha ah",
      futureGoals: "Hadafyo",
      futureGoalsDesc: "Dhisida sumcad lagu kalsoon yahay iyo adeegyo waara oo suuqyada hantida ma-guurto ah ee ajaanibta",

      learnMore: "Wax Badan Ka Ogow",
      ctaTitle: "Fariinta Maamulaha Guud",
      ctaDesc: `Magaca Alle, yaan ku bilaabayaa iyo Nabigeena suuban SCW Nabadgelyo iyo Naxariis korkiisa ha ahaato .
     Ma ku riyootay inaad guri ku yeelato Sacuudi Carabiya? Ilaa dhawaan, riyadani waxay u muuqatay mid aan la gaari karin, laakiin marka la eego Aragtida Sacuudi Carabiya ee 2030 iyo horumarka baaxada leh ee laga arkay suuqa hantida ma-guurtada ah ee wadankan uu ku tilaabsanayo sanadba sanadka ka danbeeyo, iyadoona la filayo isbeddello sharciyeed oo la xiriiro habka loo marayo gadashada guryaha kolka la gaaro 2026, uuna markaas muuqaalku si buuxda ayuu isu beddelayo. Sacuudi Carabiya waxay albaabada u furaysaa in ay ajaanibku awood u helaan lahaanshaha hantida ma-guurtada ah, qof walbana wuxuu u diyaar garoobayaa si waafaqsan shuruucda loo dajiyay arrinkan, Soomaalidana waxa ay ka mid tahay muslimiinta badan eek u nool daafaha adduunka ee kufekerayay arrinkan in badan 
     Annaga oo ah Guraase Properties Ltd. waxaan si dadaal iyo dar dar leh uga shaqeyneynaa sidii aan u dabooli lahayn baahiyaha macaamiisheenna kala duwan annagoo bixinayna fursadaha iyo talooyin aad ku iibsan kartaan hantida ma-guurtada ah ee ugu fiican, iyo goobaha ay ku yaalaan, annagoo ka faa'iideysanayna dhammaan qibradaheena shaqao iyo annagoo la kaashanayna   la-hawlgalayaashayada, ku shaqada leh iibsa shada Hantida Ma-guurtada ah sida shirkada Panorama iyo Xafiiska Al-Seyrafi ee Dalaalinta hantida ma-guurtada ah. Kuwaas oo leh qibarado sando badan oo shaqadan la xarriirto haddi ay noqon lahyd xaga dhisida, iibinta, la wadeegida iyo kala wareejinta dhulalka iyo guryaha, iyo qawaaninta la xirriirta arrimahan … iwm. 
     Waxaan u adeegnaa milkiilayaasha iyo hantiilayaasha guryaha iyo dhulalka, shirkadaha iyo shakhsiyaadka labadaba, waxaanan bixinnaa adeegyo saacad kasta ah oo daboolaya dhammaan baahiyaha macaamiisha. Waxaa adeegyadan bixiyo kooxo dhalin yar oo xirfadlayaal ah oo u carbuisan u adeegida macaamiisheenna oo khibrad gaar ah u leh shaqadan, uguna adeegaya habka ugu gaaban ee addeeg bixin iyo qiimaha ugu hooseeya .
Madaxa Fulinta
Abdo Mohammed
`,
      ctaButton: "Bilow",
    },

    contact: {
      title: "Nala Xiriir",
      subtitle: "La soo xiriir",
      nameLabel: "Magac",
      namePlaceholder: "Geli magacaaga",
      emailLabel: "Iimayl",
      emailPlaceholder: "Geli iimaylkaaga",
      messageLabel: "Fariin",
      messagePlaceholder: "Qor fariinta...",
      submit: "Dir",
      phone: "Telefoon",
      whatsapp: "WhatsApp",
      address: "Cinwaan",
      email: "Iimayl",
    },

    order_your_property: {
      title: "Dalbo Hantidaada",
      subtitle: "Buuxi foomkan",

      firstNameLabel: "Magaca Hore",
      firstNamePlaceholder: "Geli magaca hore",
      lastNameLabel: "Magaca Dambe",
      lastNamePlaceholder: "Geli magaca dambe",

      phone: "Telefoon",
      emailLabel: "Iimayl",
      emailPlaceholder: "Geli iimaylkaaga",

      regionPlaceholder: "Dooro gobolka",
      cityPlaceholder: "Dooro magaalada",
      cityPlaceholderDisabled: "Marka hore dooro gobolka",
      propertyTypePlaceholder: "Dooro nooca hantida",

      messageLabel: "Fiirooyin Kale",
      messagePlaceholder: "Faahfaahin dheeraad ah...",

      submit: "Dir Codsiga",
    },

    footer: {
      rights: "Dhammaan xuquuqaha way dhowran yihiin.",
    },
  },

  en: {
    nav: {
      home: "Home",
      about: "About",
      vision: "Vision",
      contact: "Contact",
      order_your_property: "Order Property",
    },

    hero: {
      headline: "Own Your Property in Saudi Arabia Easily",
      subheadline: "A trusted company that helps foreigners own real estate in Saudi Arabia with complete ease and security",
      cta: "Order Your Property",
      ctaSecondary: "Learn More",
      badge: "Your Trusted Partner",
      feature1Title: "Safe and Easy Ownership",
      feature1Desc: "Reliable and smooth opportunities for foreigners to own property",
      feature2Title: "Extensive Market Expertise",
      feature2Desc: "Long and trusted years of experience",
      feature3Title: "Dedicated Support",
      feature3Desc: "Personal guidance",
      highlightProperties: "Properties",
      highlightClients: "Clients",
      highlightYears: "Years",
    },

    about: {
      title: "About Us",
      subtitle: "Company Overview",
      description: `We are a real estate company operating with a comprehensive, forward-looking approach to facilitating foreign property ownership in Saudi Arabia. We achieve this by providing exclusive services that meet our clients' needs, aspirations, and ambitions through the best available options.
Our clients are our primary asset; we consider them the core of our inspiration and the foundation of our success .
`,
      mission: "Our Motto",
      missionDesc: "We are not the only ones, but we are the best.",
      values: "Our Mission",
      valuesDesc: "Providing outstanding real estate services with modern technology to ensure customer satisfaction anytime, anywhere.",
      trust: "Trust",
      trustDesc: "We take pride in our long-standing successful record in providing reliable real estate services, ensuring customer satisfaction through transparency and professionalism at every step.",
      whyChooseUs: "Our Work",
      whyChooseUsDesc: "One of the projects implemented for our partner, Panorama Real Estate Development Company .",
      trustPoint1: "Licensed firm",
      trustPoint2: "Transparent fees",
      trustPoint3: "24/7 support",
      trustPoint4: "Secure process",
      yearsExperience: "Experience",
      statsYears: "Years",
      statsClients: "Clients",
      statsProperties: "Properties",
      statsSatisfaction: "Satisfaction",
    },





    vision: {
      title: "Our Vision",
      subtitle: "The Future",
      description: `To be the premier partner in providing the best properties that meet our clients' needs with high credibility.`,
      longTermVision: "Ambition",
      longTermVisionDesc: "Providing a smooth and secure property ownership experience for all clients",
      philosophy: "Philosophy",
      philosophyDesc: "Commitment to transparency and integrity at every step of the ownership process",
      futureGoals: "Goals",
      futureGoalsDesc: "Building a trusted reputation and sustainable services in the foreign property market",

      learnMore: "Learn More",
      ctaTitle: "CEO's Message",
      ctaDesc: `In the name of Allah, and peace and blessings be upon the Messenger of Allah .
     Have you ever dreamed of owning a home in Saudi Arabia? Until recently, this dream seemed Unattainable, but in light of Saudi Arabia's Vision 2030 and the significant  development witnessed in the Kingdom's real estate market, with anticipated regulatory changes and the approach of 2026, the landscape has completely changed. Saudi Arabia is opening its doors to foreign property ownership, and everyone is preparing accordingly .
     We at Gurasse Properties Ltd. are working diligently to meet our clients' needs by providing the best real estate options, leveraging all our resources in cooperation with our partners, Panorama Real Estate Company and Al-Serafi Real Estate Office . We serve property owners, both companies and individuals, and we provide round-the-clock services that meet all customer needs. We offer these services through a professional team that aims to provide a unique experience for our clients, in the shortest way and at the lowest cost .
CEO
Abdo Mohammed
`,
      ctaButton: "Get Started",
    },

    contact: {
      title: "Contact Us",
      subtitle: "Reach out to us",
      nameLabel: "Name",
      namePlaceholder: "Enter your name",
      emailLabel: "Email",
      emailPlaceholder: "Enter your email",
      messageLabel: "Message",
      messagePlaceholder: "Write your message...",
      submit: "Send",
      phone: "Phone",
      whatsapp: "WhatsApp",
      address: "Address",
      email: "Email",
    },

    order_your_property: {
      title: "Order Your Property",
      subtitle: "Fill the form below",

      firstNameLabel: "First Name",
      firstNamePlaceholder: "Enter first name",
      lastNameLabel: "Last Name",
      lastNamePlaceholder: "Enter last name",

      phone: "Phone",
      emailLabel: "Email",
      emailPlaceholder: "Enter your email",

      regionPlaceholder: "Select region",
      cityPlaceholder: "Select city",
      cityPlaceholderDisabled: "Select region first",
      propertyTypePlaceholder: "Select property type",

      messageLabel: "Additional Notes",
      messagePlaceholder: "Any extra details...",

      submit: "Submit Request",
    },

    footer: {
      rights: "All rights reserved.",
    },
  },

  ar: {
    nav: {
      home: "الرئيسية",
      about: "من نحن",
      vision: "رؤيتنا",
      contact: "اتصل بنا",
      order_your_property: "طلب عقار",
    },

    hero: {
      headline: "تملك عقارك في السعودية بسهولة",
      subheadline: "شركة موثوقة تساعد الأجانب على امتلاك العقارات في السعودية بكل سهولة وأمان",
      cta: "اطلب عقارك الآن",
      ctaSecondary: "اعرف المزيد",
      badge: "شريكك الموثوق",
      feature1Title: "تملك آمن وسهل",
      feature1Desc: "فرص موثوقة وسلسة للأجانب لامتلاك العقارات",
      feature2Title: "خبرة واسعة في السوق",
      feature2Desc: "سنوات خبرة طويلة وموثوقة",
      feature3Title: "دعم مخصص",
      feature3Desc: "إرشاد شخصي",
      highlightProperties: "عقارات",
      highlightClients: "عملاء",
      highlightYears: "سنوات",
    },

    about: {
      title: "من نحن",
      subtitle: "نبذة عن الشركة",
      description: `نحن شركة عقارية تعمل في مجال العقارات بمفهوم مستقبلي شامل يساهم في تملك الاجانب للعقارات في السعودية من خلال تقديم خدمات حصرية تلبي متطلبات عملائنا، ولتلبية تطلعات وطلباتهم وطموحات من خلال توفير أفضل الخيارات .
ومكسب الرئيسي لشركتنا هم عملائنا، الذين نعدهم جوهر إلهامنا وأساس نجاحنا .
` ,
      mission: "شعارنا",
      missionDesc: "لسنا الوحيدين ولكننا الأفضل",
      values: "رسالتنا",
      valuesDesc: "تقديم خدمات عقارية متميزة باستخدام أحدث التقنيات لضمان رضا عملائنا في الوقت والمكان المناسب.",
      trust: "الثقة",
      trustDesc: "نفتخر بسجل ناجح وممتد في تقديم الخدمات العقارية الموثوقة، حيث يضمن خبراؤنا رضا العملاء والتعامل بشفافية ومصداقية في كل خطوة.",
      whyChooseUs: "أعمالنا",
      whyChooseUsDesc: "أحد الأعمال المنفذة لشريكنا شركة بانوراما للتطوير العقاري.",
      trustPoint1: "شركة مرخصة",
      trustPoint2: "رسوم شفافة",
      trustPoint3: "دعم 24/7",
      trustPoint4: "إجراءات آمنة",
      yearsExperience: "الخبرة",
      statsYears: "سنوات",
      statsClients: "عملاء",
      statsProperties: "عقارات",
      statsSatisfaction: "الرضا",
    },

    vision: {
      title: "رؤيتنا",
      subtitle: "المستقبل",
      description: `ان نكون الشريك الأول في تقديم افضل العقارات التي تلبي احتياجات عملاءنا بمصداقية عالية .`,
      longTermVision: "الطموح",
      longTermVisionDesc: "تقديم تجربة تملك عقاري سلسة وآمنة لجميع العملاء",
      philosophy: "فلسفة الشركة",
      philosophyDesc: "التزام بالشفافية والمصداقية في كل خطوة من عملية التملك",
      futureGoals: "الأهداف",
      futureGoalsDesc: "بناء سمعة موثوقة وخدمة مستدامة في سوق العقارات للأجانب",

      learnMore: "اعرف المزيد",
      ctaTitle: "كلمة الرئيس التنفيذي",
      ctaDesc: `
      الحمدلله وحده والصلاة على من لانبي بعده وبعد:

      هل فكرت يومًا في امتلاك منزل في السعودية ؟ حتى وقت قريب كان هذا الحلم يبدو بعيدًا، ولكن وفقًا لرؤية المملكة العربية السعودية 2030 وفي ظل التطور الكبير الذي يشهده السوق العقاري في المملكة، مع التغييرات التنظيمية المرتقبة ودخول عام 2026، المشهد تغيّر تمامًا. السعودية تفتح أبواب التملك العقاري للأجانب، وكلَ يستعد بقوة .

      ونحن شركة جوراسه للعقارات المحدودة (GURASSE PROPERTIES LTD) نعمل جاهدين على تلبية متطلبات عملائنا، من خلال توفير أفضل الخيارات العقارية ، وكافة إمكانياتنا بالتعاون مع شركائنا (شركة بانوراما العقارية) و(مكتب الصيرفي للعقار) ومُلّاك العقارات من شركات وأفراد، كما نعمل على توفير خدمات على مدار الساعة تلبي جميع احتياجات العملاء، نقدّمها لكم عبر فريق عمل محترف يهدف لتقديم تجربة فريدة لعملائنا، بأقصر الطرق وأقل التكاليف .

      والله ولي التوفيق ،،،

      الرئيس التنفيذي
      عبده محمد
      `,
      ctaButton: "ابدأ",
    },

    contact: {
      title: "اتصل بنا",
      subtitle: "تواصل معنا",
      nameLabel: "الاسم",
      namePlaceholder: "أدخل اسمك",
      emailLabel: "البريد الإلكتروني",
      emailPlaceholder: "أدخل بريدك الإلكتروني",
      messageLabel: "الرسالة",
      messagePlaceholder: "اكتب رسالتك...",
      submit: "إرسال",
      phone: "الهاتف",
      whatsapp: "واتساب",
      address: "العنوان",
      email: "البريد الإلكتروني",
    },

    order_your_property: {
      title: "اطلب عقارك الآن",
      subtitle: "قم بتعبئة النموذج",

      firstNameLabel: "الاسم الأول",
      firstNamePlaceholder: "أدخل اسمك الأول",
      lastNameLabel: "اسم العائلة",
      lastNamePlaceholder: "أدخل اسم العائلة",

      phone: "رقم الجوال",
      emailLabel: "البريد الإلكتروني",
      emailPlaceholder: "أدخل بريدك الإلكتروني",

      regionPlaceholder: "اختر المنطقة",
      cityPlaceholder: "اختر المدينة",
      cityPlaceholderDisabled: "اختر المنطقة أولاً",
      propertyTypePlaceholder: "اختر نوع العقار",

      messageLabel: "ملاحظات أخرى",
      messagePlaceholder: "أي تفاصيل إضافية...",

      submit: "إرسال الطلب",
    },

    footer: {
      rights: "جميع الحقوق محفوظة.",
    },
  },
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
  isRTL: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("so")

  useEffect(() => {
    const savedLang = localStorage.getItem("language") as Language | null
    if (savedLang) {
      setLanguageState(savedLang)
    }
  }, [])

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("language", lang)

    document.documentElement.lang = lang
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr"
  }, [])

  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr"
  }, [language])

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: translations[language],
        isRTL: language === "ar",
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}


export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
