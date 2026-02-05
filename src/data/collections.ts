export interface Product {
    brand: string;
    series: string;
    name: string;
    description: string;
    image: string;
}

export interface Collection {
    id: number;
    name: string;
    slug: string;
    tagline: string;
    subtitle: string;
    description: string;
    heroImage?: string;
    image: string; // Grid image
    link: string;
    brands: string[];
    appliances: string[];
    products: Product[];
}

export const collections: Collection[] = [
    {
        id: 1,
        name: "Rose Gold Collection",
        slug: "rose-gold",
        tagline: "Exquisite Metalwork",
        subtitle: "Metallic Warmth & Elegance",
        description: "קולקציית Rose Gold מאגדת את פסגת העיצוב האיטלקי והגרמני תחת גוון הנחושת והזהב הוורוד. מהתנורים האיקוניים של Bertazzoni ועד לפרזול המדויק של Gessi.",
        heroImage: "https://images.unsplash.com/photo-1520981825232-ece5fae45120?q=80&w=1470&auto=format&fit=crop",
        image: "/oven.png",
        link: "/collections/rose-gold",
        brands: ["Bertazzoni", "Smeg", "Gessi"],
        appliances: ["תנור בנוי", "קומקום מעוצב", "ברז מטבח", "ידיות זהב"],
        products: [
            {
                brand: "Smeg",
                series: "Dolce Stil Novo",
                name: "תנור בנוי Dolce Stil Novo",
                description: "תנור מפואר מבית SMEG המשלב זכוכית שחורה מבריקה עם פסי נחושת עדינים. עיצוב המייצג את האיזון המושלם בין אסתטיקה אומנותית לטכנולוגיה פונקציונלית מתקדמת.",
                image: "/oven.png"
            },
            {
                brand: "Gessi",
                series: "Officina Series",
                name: "ברז מטבח מעוצב בזהב ורוד",
                description: "ברז המטבח של Gessi הוא פסל מים על השיש שלכם. גימור Rose Gold מוברש המעניק מגע חם ויוקרתי, עם הנדסת אנוש מדויקת וניקיון עיצובי יוצא דופן.",
                image: "/faucet.png"
            },
            {
                brand: "Bertazzoni",
                series: "Professional",
                name: "ידיות וכפתורי Bertazzoni",
                description: "הדיוק האיטלקי של מותג Bertazzoni מתבטא בפרטים הקטנים. כפתורי שליטה מפלדת אל-חלד בציפוי זהב ורוד המעניקים תחושה של מטבח מקצועי עם אסתטיקה של גלריה.",
                image: "/details.png"
            }
        ]
    },
    {
        id: 2,
        name: "Retro Classic",
        slug: "retro-classic",
        tagline: "Heritage & Soul",
        subtitle: "Timeless Mid-Century Soul",
        description: "אוצרות של מכשירי מטבח המביאים את הקסם של שנות ה-50 למאה ה-21. עיצוב מעוגל וצבעוניות רכה שיוצרים חמימות נוסטלגית.",
        heroImage: "/retro_classic_hero.png",
        image: "/retro_group.png",
        link: "/collections/retro-classic",
        brands: ["Smeg", "La Pavoni", "Haden"],
        appliances: ["מכונת אספרסו רטרו", "מצנם מעוצב", "קומקום קלאסי"],
        products: [
            {
                brand: "Smeg",
                series: "50s Style",
                name: "מקרר Smeg Cream",
                description: "המקרר האיקוני של Smeg בצבע שמנת (Cream) המעניק מראה רך ויוקרתי לכל מטבח. שמה דגש על עיצוב רטרו מעוגל עם טכנולוגיית קירור מודרנית.",
                image: "/fridge.png"
            },
            {
                brand: "La Pavoni",
                series: "Heritage Collection",
                name: "מכונת אספרסו La Pavoni",
                description: "פסגת הקפה האיטלקי. מכונת אספרסו ידנית (Lever) בגימור כרום מלוטש, המשלבת היסטוריה של ייצור קפה עם עיצוב שמעורר השראה בכל בוקר.",
                image: "/espresso.png"
            },
            {
                brand: "Smeg",
                series: "Breakfast Suite",
                name: "סט ארוחת בוקר רטרו",
                description: "השלמת המראה עם קומקום ומצנם מבית Smeg באותו גוון שמנת הרמוני. הפרטים הקטנים שעושים את ההבדל הגדול בעיצוב החלל.",
                image: "/retro_detail.png"
            }
        ]
    },
    {
        id: 3,
        name: "Matte Black Collection",
        slug: "matte-black",
        tagline: "Minimalist Authority",
        subtitle: "Modern Architectural Depth",
        description: "חיבור בין אדריכלות מודרנית לחומרים כהים. מכשירי מטבח בגימור שחור מט עמוק שנטמעים בתוך חללים מינימליסטיים.",
        heroImage: "/matte_black_hero.png",
        image: "/matte_black_group.png",
        link: "/collections/matte-black",
        brands: ["Gaggenau", "Miele", "Wolf"],
        appliances: ["כיריים אינדוקציה", "מכונת קפה בנויה", "מקרר יינות"],
        products: [
            {
                brand: "Gaggenau",
                series: "400 Series",
                name: "תנור Gaggenau Matte Black",
                description: "תנור בנוי בסדרת 400 היוקרתית בגימור Onyx. ללא ידיות, נפתח בנגיעה, ומשתלב בקו אפס עם ארונות המטבח למראה אדריכלי נקי.",
                image: "/matte_black_oven.png"
            },
            {
                brand: "Miele",
                series: "ArtLine",
                name: "כיריים אינדוקציה Miele",
                description: "משטח אינפיניטי שחור מט לחלוטין. הכיריים של מילה מציעות טכנולוגיית זיהוי סירים חכמה בעיצוב שנטמע לחלוטין בתוך השיש.",
                image: "/matte_black_hob.png"
            },
            {
                brand: "Wolf",
                series: "Professional Matte",
                name: "מערכת קפה Wolf בנויה",
                description: "מכונת קפה מקצועית המשולבת בתוך קיר הארונות. גימור שחור מט חולי המעניק טקסטורה ייחודית ועומק ויזואלי למטבח המודרני.",
                image: "/matte_black_detail.png"
            }
        ]
    }
];
