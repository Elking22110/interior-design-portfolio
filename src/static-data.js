// Static Data for Projects
const staticProjects = [
    {
        id: 1,
        title_ar: "تصميم شقة سكنية حديثة",
        title_en: "Modern Apartment Design",
        description_ar: "تصميم شقة سكنية بمساحة 120 متر مربع بتصميم عصري وأنيق",
        description_en: "Modern apartment design with 120 square meters area",
        category: "apartments",
        subcategory: "modern",
        images: [
            "images/new-apartment-1.webp",
            "images/new-apartment-2.jpg",
            "images/modern-apartment.jpg"
        ],
        created_at: "2024-01-15T00:00:00Z"
    },
    {
        id: 2,
        title_ar: "تصميم فيلا فاخرة",
        title_en: "Luxury Villa Design",
        description_ar: "تصميم فيلا فاخرة بمساحة 300 متر مربع مع حديقة خارجية",
        description_en: "Luxury villa design with 300 square meters area and outdoor garden",
        category: "villas",
        subcategory: "luxury",
        images: [
            "images/new-villa-1.jpg",
            "images/new-villa-2.jpg",
            "images/luxury-villa.jpg"
        ],
        created_at: "2024-02-20T00:00:00Z"
    },
    {
        id: 3,
        title_ar: "تصميم مطبخ أمريكي",
        title_en: "American Kitchen Design",
        description_ar: "تصميم مطبخ أمريكي عصري مع أحدث التقنيات والأجهزة",
        description_en: "Modern American kitchen design with latest technologies and appliances",
        category: "kitchens",
        subcategory: "american",
        images: [
            "images/new-kitchen-1.jpg",
            "images/new-kitchen-2.jpg",
            "images/american-kitchen.jpg"
        ],
        created_at: "2024-03-10T00:00:00Z"
    },
    {
        id: 4,
        title_ar: "تصميم مطبخ كلاسيكي",
        title_en: "Classic Kitchen Design",
        description_ar: "تصميم مطبخ كلاسيكي أنيق مع تفاصيل خشبية فاخرة",
        description_en: "Elegant classic kitchen design with luxurious wooden details",
        category: "kitchens",
        subcategory: "classic",
        images: [
            "images/classic-kitchen.jpg",
            "images/elegant-kitchen.jpg",
            "images/luxury-kitchen.jpg"
        ],
        created_at: "2024-04-05T00:00:00Z"
    },
    {
        id: 5,
        title_ar: "تصميم مكتب تجاري",
        title_en: "Commercial Office Design",
        description_ar: "تصميم مكتب تجاري عصري مع مساحات عمل مريحة",
        description_en: "Modern commercial office design with comfortable workspaces",
        category: "commercial",
        subcategory: "office",
        images: [
            "images/modern-office.jpg",
            "images/office-design.jpg",
            "images/villa-interior.jpg"
        ],
        created_at: "2024-05-12T00:00:00Z"
    },
    {
        id: 6,
        title_ar: "تصميم شقة سكنية كلاسيكية",
        title_en: "Classic Apartment Design",
        description_ar: "تصميم شقة سكنية بتصميم كلاسيكي أنيق مع لمسات عصرية",
        description_en: "Classic apartment design with elegant touches and modern elements",
        category: "apartments",
        subcategory: "classic",
        images: [
            "images/apartment-interior.jpg",
            "images/modern-apartment.jpg",
            "images/new-apartment-1.webp"
        ],
        created_at: "2024-06-18T00:00:00Z"
    }
];

// Static Categories
const staticCategories = [
    { id: 1, name_ar: "شقق", name_en: "Apartments", slug: "apartments" },
    { id: 2, name_ar: "فيلات", name_en: "Villas", slug: "villas" },
    { id: 3, name_ar: "مطابخ", name_en: "Kitchens", slug: "kitchens" },
    { id: 4, name_ar: "تجاري", name_en: "Commercial", slug: "commercial" }
];

// Static Stats
const staticStats = {
    projects: {
        total: 500,
        featured: 25,
        active: 12,
        completed: 487
    },
    consultations: {
        total: 450,
        new: 8
    },
    clients: {
        total: 300,
        new: 23
    }
}; 