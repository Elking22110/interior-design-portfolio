// New Project Loader for Real Projects
// This script dynamically loads projects from the real_projects folder structure

class ProjectLoader {
    constructor() {
        this.projectsData = {};
        this.realProjectsPath = 'real_projects/';
        this.initialized = false;
    }

    // Load all projects from the real_projects structure
    async loadAllProjects() {
        try {
            console.log('loadAllProjects called');
            
            // Load interior design projects
            await this.loadInteriorDesignProjects();
            
            // Load wooden projects
            await this.loadWoodenProjects();
            
            this.initialized = true;
            console.log('All projects loaded successfully. Total projects:', Object.keys(this.projectsData).length);
            console.log('Projects data:', this.projectsData);
            
            // Inject CSS for view button
            this.injectViewButtonCSS();
            
            return this.projectsData;
        } catch (error) {
            console.error('Error loading projects:', error);
            return {};
        }
    }

    // Load interior design projects (01-Design and 02-Site)
    async loadInteriorDesignProjects() {
        console.log('loadInteriorDesignProjects called');
        
        const interiorPath = this.realProjectsPath + 'التصميم الداخلي/';
        console.log('Interior path:', interiorPath);
        
        // Load 01-Design projects
        await this.loadDesignProjects(interiorPath + '01-Design/');
        
        // Load 02-Site projects
        await this.loadSiteProjects(interiorPath + '02-Site/');
        
        console.log('Interior design projects loaded successfully');
    }

    // Load 01-Design projects
    async loadDesignProjects(basePath) {
        const designProjects = [
                            {
                    name: '007-ID-Dr.Essam Hyde Park',
                    title: '007-ID-Dr.Essam Hyde Park - تصميم شقة راقية',
                    images: [
                        // Bedroom 1
                        'real_projects/التصميم الداخلي/01-Design/007-ID-Dr.Essam Hyde Park/01-Bedroom 1/1.jpg',
                        'real_projects/التصميم الداخلي/01-Design/007-ID-Dr.Essam Hyde Park/01-Bedroom 1/2.jpg',
                        // Bedroom 2
                        'real_projects/التصميم الداخلي/01-Design/007-ID-Dr.Essam Hyde Park/02-Bedroom 2/v1.jpg',
                        'real_projects/التصميم الداخلي/01-Design/007-ID-Dr.Essam Hyde Park/02-Bedroom 2/v2.jpg',
                        'real_projects/التصميم الداخلي/01-Design/007-ID-Dr.Essam Hyde Park/02-Bedroom 2/v3.jpg',
                        'real_projects/التصميم الداخلي/01-Design/007-ID-Dr.Essam Hyde Park/02-Bedroom 2/v4.jpg',
                        'real_projects/التصميم الداخلي/01-Design/007-ID-Dr.Essam Hyde Park/02-Bedroom 2/v5.jpg',
                        // Bedroom 3
                        'real_projects/التصميم الداخلي/01-Design/007-ID-Dr.Essam Hyde Park/03-Bedroom 3/1.jpg',
                        'real_projects/التصميم الداخلي/01-Design/007-ID-Dr.Essam Hyde Park/03-Bedroom 3/2.jpg',
                        'real_projects/التصميم الداخلي/01-Design/007-ID-Dr.Essam Hyde Park/03-Bedroom 3/3.jpg',
                        'real_projects/التصميم الداخلي/01-Design/007-ID-Dr.Essam Hyde Park/03-Bedroom 3/4.jpg',
                        'real_projects/التصميم الداخلي/01-Design/007-ID-Dr.Essam Hyde Park/03-Bedroom 3/5.jpg',
                        // Guest Toilet
                        'real_projects/التصميم الداخلي/01-Design/007-ID-Dr.Essam Hyde Park/04-Guest Toilet/1.jpg',
                        'real_projects/التصميم الداخلي/01-Design/007-ID-Dr.Essam Hyde Park/04-Guest Toilet/3.jpg',
                        // Kitchen
                        'real_projects/التصميم الداخلي/01-Design/007-ID-Dr.Essam Hyde Park/05-Kitchen/1.jpg',
                        'real_projects/التصميم الداخلي/01-Design/007-ID-Dr.Essam Hyde Park/05-Kitchen/12.jpg',
                        'real_projects/التصميم الداخلي/01-Design/007-ID-Dr.Essam Hyde Park/05-Kitchen/3.jpg',
                        'real_projects/التصميم الداخلي/01-Design/007-ID-Dr.Essam Hyde Park/05-Kitchen/4.jpg',
                        'real_projects/التصميم الداخلي/01-Design/007-ID-Dr.Essam Hyde Park/05-Kitchen/5.jpg',
                        // Landscape
                        'real_projects/التصميم الداخلي/01-Design/007-ID-Dr.Essam Hyde Park/06-Landscape/1.jpg',
                        'real_projects/التصميم الداخلي/01-Design/007-ID-Dr.Essam Hyde Park/06-Landscape/2.jpg',
                        'real_projects/التصميم الداخلي/01-Design/007-ID-Dr.Essam Hyde Park/06-Landscape/3.jpg',
                        'real_projects/التصميم الداخلي/01-Design/007-ID-Dr.Essam Hyde Park/06-Landscape/4.jpg',
                        'real_projects/التصميم الداخلي/01-Design/007-ID-Dr.Essam Hyde Park/06-Landscape/5.jpg',
                        // Laundry Room
                        'real_projects/التصميم الداخلي/01-Design/007-ID-Dr.Essam Hyde Park/07-Laundry room/1.jpg',
                        // Living Room
                        'real_projects/التصميم الداخلي/01-Design/007-ID-Dr.Essam Hyde Park/08-Living room/2.jpg',
                        'real_projects/التصميم الداخلي/01-Design/007-ID-Dr.Essam Hyde Park/08-Living room/5.jpg',
                        'real_projects/التصميم الداخلي/01-Design/007-ID-Dr.Essam Hyde Park/08-Living room/8.jpg',
                        'real_projects/التصميم الداخلي/01-Design/007-ID-Dr.Essam Hyde Park/08-Living room/9.jpg',
                        // Main Toilet
                        'real_projects/التصميم الداخلي/01-Design/007-ID-Dr.Essam Hyde Park/09-Main Toilet/3.jpg',
                        'real_projects/التصميم الداخلي/01-Design/007-ID-Dr.Essam Hyde Park/09-Main Toilet/5.jpg',
                        // Master Bedroom
                        'real_projects/التصميم الداخلي/01-Design/007-ID-Dr.Essam Hyde Park/10-Master Bedroom/g1.jpg',
                        'real_projects/التصميم الداخلي/01-Design/007-ID-Dr.Essam Hyde Park/10-Master Bedroom/g2.jpg',
                        'real_projects/التصميم الداخلي/01-Design/007-ID-Dr.Essam Hyde Park/10-Master Bedroom/g3.jpg',
                        'real_projects/التصميم الداخلي/01-Design/007-ID-Dr.Essam Hyde Park/10-Master Bedroom/g4.jpg',
                        // Master Toilet
                        'real_projects/التصميم الداخلي/01-Design/007-ID-Dr.Essam Hyde Park/11-Master Toilet/f1.jpg',
                        'real_projects/التصميم الداخلي/01-Design/007-ID-Dr.Essam Hyde Park/11-Master Toilet/f2.jpg',
                        'real_projects/التصميم الداخلي/01-Design/007-ID-Dr.Essam Hyde Park/11-Master Toilet/f3.jpg',
                        'real_projects/التصميم الداخلي/01-Design/007-ID-Dr.Essam Hyde Park/11-Master Toilet/f4.jpg',
                        // Reception
                        'real_projects/التصميم الداخلي/01-Design/007-ID-Dr.Essam Hyde Park/12-Reception/h1.jpg',
                        'real_projects/التصميم الداخلي/01-Design/007-ID-Dr.Essam Hyde Park/12-Reception/h2.jpg',
                        'real_projects/التصميم الداخلي/01-Design/007-ID-Dr.Essam Hyde Park/12-Reception/h3.jpg',
                        'real_projects/التصميم الداخلي/01-Design/007-ID-Dr.Essam Hyde Park/12-Reception/h4.jpg',
                        // Roof Landscape
                        'real_projects/التصميم الداخلي/01-Design/007-ID-Dr.Essam Hyde Park/13-Roof Landscape/40.jpg',
                        'real_projects/التصميم الداخلي/01-Design/007-ID-Dr.Essam Hyde Park/13-Roof Landscape/41.jpg',
                        'real_projects/التصميم الداخلي/01-Design/007-ID-Dr.Essam Hyde Park/13-Roof Landscape/42.jpg',
                        'real_projects/التصميم الداخلي/01-Design/007-ID-Dr.Essam Hyde Park/13-Roof Landscape/43.jpg',
                        // Roof Toilet
                        'real_projects/التصميم الداخلي/01-Design/007-ID-Dr.Essam Hyde Park/14-Roof Toilet/1.jpg',
                        'real_projects/التصميم الداخلي/01-Design/007-ID-Dr.Essam Hyde Park/14-Roof Toilet/1_01.jpg',
                        'real_projects/التصميم الداخلي/01-Design/007-ID-Dr.Essam Hyde Park/14-Roof Toilet/7.jpg'
                    ],
                    description: 'تصميم داخلي راقي لشقة الدكتور Essam في Hyde Park مع غرف نوم ومطبخ وصالة معيشة وغرفة نوم رئيسية فاخرة',
                    details: { area: '200 متر مربع', duration: '12 أسبوع', style: 'راقي', budget: 'عالي جداً' }
                },
            {
                name: '003-ID-MS.Areej Apartment',
                title: '003-ID-MS.Areej Apartment - تصميم شقة عصرية',
                images: [
                    'real_projects/التصميم الداخلي/01-Design/003-ID-MS.Areej Apartment/Kids Room/80e67ab5-c820-4573-8814-250006ddfe5e.jpg',
                    'real_projects/التصميم الداخلي/01-Design/003-ID-MS.Areej Apartment/Kids Room/e0f84b37-b816-4243-b6e6-c513c42675c9.jpg'
                ],
                description: 'تصميم داخلي عصري لشقة MS.Areej مع غرف أطفال أنيقة',
                details: { area: '120 متر مربع', duration: '8 أسابيع', style: 'عصري', budget: 'عالي' }
            },
            {
                name: '004-ID-MS.Enas-Eldyar-',
                title: '004-ID-MS.Enas-Eldyar - تصميم فيلا فاخرة',
                images: [
                    'real_projects/التصميم الداخلي/01-Design/004-ID-MS.Enas-Eldyar-/01-Reception/10.jpg',
                    'real_projects/التصميم الداخلي/01-Design/004-ID-MS.Enas-Eldyar-/01-Reception/2.jpg',
                    'real_projects/التصميم الداخلي/01-Design/004-ID-MS.Enas-Eldyar-/01-Reception/7.jpg',
                    'real_projects/التصميم الداخلي/01-Design/004-ID-MS.Enas-Eldyar-/01-Reception/8.jpg',
                    'real_projects/التصميم الداخلي/01-Design/004-ID-MS.Enas-Eldyar-/01-Reception/9.jpg'
                ],
                description: 'تصميم داخلي فاخر لفيلا MS.Enas مع استقبال فاخر وغرف نوم وغرفة سينما وصالة رياضية',
                details: { area: '280 متر مربع', duration: '12 أسبوع', style: 'فاخر', budget: 'عالي جداً' }
            },
            {
                name: '009-ID-Mr.Ahmed Sabbour',
                title: '009-ID-Mr.Ahmed Sabbour - تصميم شقة كلاسيكية',
                images: [
                    'real_projects/التصميم الداخلي/01-Design/009-ID-Mr.Ahmed Sabbour/01-Bedroom 1/u1.jpg',
                    'real_projects/التصميم الداخلي/01-Design/009-ID-Mr.Ahmed Sabbour/01-Bedroom 1/u2b.jpg',
                    'real_projects/التصميم الداخلي/01-Design/009-ID-Mr.Ahmed Sabbour/02-Bedroom 2/1.jpg',
                    'real_projects/التصميم الداخلي/01-Design/009-ID-Mr.Ahmed Sabbour/03-Dressing/1.jpg',
                    'real_projects/التصميم الداخلي/01-Design/009-ID-Mr.Ahmed Sabbour/04-Master Bathroom/1.jpg',
                    'real_projects/التصميم الداخلي/01-Design/009-ID-Mr.Ahmed Sabbour/05-Guest Toilet/1.jpg',
                    'real_projects/التصميم الداخلي/01-Design/009-ID-Mr.Ahmed Sabbour/06-Kitchen/1.jpg',
                    'real_projects/التصميم الداخلي/01-Design/009-ID-Mr.Ahmed Sabbour/07-Main Toilet/1.jpg',
                    'real_projects/التصميم الداخلي/01-Design/009-ID-Mr.Ahmed Sabbour/08-Master Bedroom/1.jpg',
                    'real_projects/التصميم الداخلي/01-Design/009-ID-Mr.Ahmed Sabbour/09-Reception/1.jpg'
                ],
                description: 'تصميم داخلي كلاسيكي أنيق لشقة Mr.Ahmed Sabbour مع غرف نوم ومطبخ وغرفة ملابس',
                details: { area: '180 متر مربع', duration: '12 أسبوع', style: 'كلاسيكي', budget: 'عالي' }
            },
            {
                name: '018-technolgy -store',
                title: '018-Technology Store - تصميم متجر تكنولوجيا',
                images: [
                    'real_projects/التصميم الداخلي/01-Design/018-technolgy -store/IMG_2010.JPG',
                    'real_projects/التصميم الداخلي/01-Design/018-technolgy -store/IMG_2012.JPG'
                ],
                description: 'تصميم داخلي عصري لمتجر تكنولوجيا مع عرض منتجات حديثة وإضاءة متطورة',
                details: { area: '80 متر مربع', duration: '6 أسابيع', style: 'عصري', budget: 'متوسط' }
            },
            {
                name: '019-ID-Dr.Abdallah Clinic-PROJECT CODE',
                title: '019-ID-Dr.Abdallah Clinic - تصميم عيادة طبية',
                images: [
                    'real_projects/التصميم الداخلي/01-Design/019-ID-Dr.Abdallah Clinic-PROJECT CODE/p1/d1.jpg',
                    'real_projects/التصميم الداخلي/01-Design/019-ID-Dr.Abdallah Clinic-PROJECT CODE/p1/d2.jpg',
                    'real_projects/التصميم الداخلي/01-Design/019-ID-Dr.Abdallah Clinic-PROJECT CODE/p1/d3.jpg',
                    'real_projects/التصميم الداخلي/01-Design/019-ID-Dr.Abdallah Clinic-PROJECT CODE/p2/1.jpg',
                    'real_projects/التصميم الداخلي/01-Design/019-ID-Dr.Abdallah Clinic-PROJECT CODE/p3/1.jpg'
                ],
                description: 'تصميم داخلي احترافي لعيادة الدكتور Abdallah مع غرف استقبال وعلاج حديثة',
                details: { area: '120 متر مربع', duration: '8 أسابيع', style: 'احترافي', budget: 'عالي' }
            },
            {
                name: 'dr rana mohamed appartement',
                title: 'Dr.Rana Mohamed Apartment - تصميم شقة دكتورة رنا',
                images: [
                    'real_projects/التصميم الداخلي/01-Design/dr rana mohamed  appartement/1.jpg',
                    'real_projects/التصميم الداخلي/01-Design/dr rana mohamed  appartement/2.jpg',
                    'real_projects/التصميم الداخلي/01-Design/dr rana mohamed  appartement/3.jpg',
                    'real_projects/التصميم الداخلي/01-Design/dr rana mohamed  appartement/4.jpg',
                    'real_projects/التصميم الداخلي/01-Design/dr rana mohamed  appartement/5.jpg'
                ],
                description: 'تصميم داخلي أنيق لشقة الدكتورة رنا محمد مع ديكورات عصرية وألوان هادئة',
                details: { area: '100 متر مربع', duration: '6 أسابيع', style: 'أنيق', budget: 'متوسط' }
            },
            {
                name: 'elsrouk cairo entrance building',
                title: 'Elsrouk Cairo Entrance Building - تصميم مبنى مدخل القاهرة',
                images: [
                    'real_projects/التصميم الداخلي/01-Design/elsrouk cairo entrance building/WhatsApp Image 2019-09-30 at 1.45.16 PM.jpeg',
                    'real_projects/التصميم الداخلي/01-Design/elsrouk cairo entrance building/WhatsApp Image 2019-09-30 at 1.45.17 PM.jpeg',
                    'real_projects/التصميم الداخلي/01-Design/elsrouk cairo entrance building/WhatsApp Image 2019-09-30 at 1.45.17 PM (1).jpeg',
                    'real_projects/التصميم الداخلي/01-Design/elsrouk cairo entrance building/WhatsApp Image 2019-09-30 at 1.45.18 PM.jpeg',
                    'real_projects/التصميم الداخلي/01-Design/elsrouk cairo entrance building/WhatsApp Image 2019-09-30 at 1.45.18 PM (1).jpeg'
                ],
                description: 'تصميم داخلي لمبنى مدخل القاهرة مع استقبال فاخر ومساحات عمل احترافية',
                details: { area: '200 متر مربع', duration: '10 أسابيع', style: 'احترافي', budget: 'عالي' }
            },
            {
                name: 'viilla hurgada',
                title: 'Villa Hurghada - تصميم فيلا الغردقة',
                images: [
                    'real_projects/التصميم الداخلي/01-Design/viilla hurgada/1.JPG',
                    'real_projects/التصميم الداخلي/01-Design/viilla hurgada/2.JPG',
                    'real_projects/التصميم الداخلي/01-Design/viilla hurgada/3.JPG',
                    'real_projects/التصميم الداخلي/01-Design/viilla hurgada/4.JPG',
                    'real_projects/التصميم الداخلي/01-Design/viilla hurgada/5.JPG',
                    'real_projects/التصميم الداخلي/01-Design/viilla hurgada/6.JPG',
                    'real_projects/التصميم الداخلي/01-Design/viilla hurgada/7.JPG'
                ],
                description: 'تصميم داخلي فاخر لفيلا في الغردقة مع إطلالات بحرية وديكورات عصرية',
                details: { area: '300 متر مربع', duration: '15 أسبوع', style: 'فاخر', budget: 'عالي جداً' }
            },
            {
                name: 'شاليهات',
                title: 'شاليهات - تصميم شاليهات عصرية',
                images: [
                    'real_projects/التصميم الداخلي/01-Design/شاليهات/006-ID-nora elgmal/01-Landscape/5.jpg',
                    'real_projects/التصميم الداخلي/01-Design/شاليهات/006-ID-nora elgmal/01-Landscape/7.jpg',
                    'real_projects/التصميم الداخلي/01-Design/شاليهات/006-ID-nora elgmal/01-Landscape/8.jpg',
                    'real_projects/التصميم الداخلي/01-Design/شاليهات/006-ID-nora elgmal/01-Landscape/10.jpg'
                ],
                description: 'تصميم داخلي لشاليهات عصرية مع مساحات مفتوحة وديكورات أنيقة',
                details: { area: '150 متر مربع', duration: '8 أسابيع', style: 'عصري', budget: 'متوسط' }
            }
        ];

        for (const project of designProjects) {
            const projectId = this.generateProjectId(project.name);
            
            this.projectsData[projectId] = {
                id: projectId,
                title: project.title,
                category: 'interior-design-design',
                subcategory: '01-Design',
                path: `${basePath}${project.name}`,
                images: project.images,
                description: project.description,
                details: project.details
            };
            
            console.log('Added design project:', projectId, this.projectsData[projectId]);
        }
        
        console.log('Total design projects loaded:', Object.keys(this.projectsData).filter(key => this.projectsData[key].category === 'interior-design-design').length);
        console.log('All projectsData after loading design projects:', this.projectsData);
    }

    // Load 02-Site projects
    async loadSiteProjects(basePath) {
        console.log('loadSiteProjects called with basePath:', basePath);
        console.log('Current projectsData before loading site projects:', this.projectsData);
        
        const siteProjects = [
            {
                name: 'شالية السخنة تلال',
                title: 'شالية السخنة تلال - تصميم شالية فاخر',
                images: [
                    'real_projects/التصميم الداخلي/02-Site/شالية السخنة تلال/FB_IMG_1683013455989.jpg',
                    'real_projects/التصميم الداخلي/02-Site/شالية السخنة تلال/FB_IMG_1683013460816.jpg',
                    'real_projects/التصميم الداخلي/02-Site/شالية السخنة تلال/FB_IMG_1683013465125.jpg',
                    'real_projects/التصميم الداخلي/02-Site/شالية السخنة تلال/FB_IMG_1683013469898.jpg',
                    'real_projects/التصميم الداخلي/02-Site/شالية السخنة تلال/FB_IMG_1683013475393.jpg',
                    'real_projects/التصميم الداخلي/02-Site/شالية السخنة تلال/FB_IMG_1683013481402.jpg',
                    'real_projects/التصميم الداخلي/02-Site/شالية السخنة تلال/FB_IMG_1683013486918.jpg',
                    'real_projects/التصميم الداخلي/02-Site/شالية السخنة تلال/FB_IMG_1683172690229.jpg',
                    'real_projects/التصميم الداخلي/02-Site/شالية السخنة تلال/FB_IMG_1683172698036.jpg',
                    'real_projects/التصميم الداخلي/02-Site/شالية السخنة تلال/FB_IMG_1683172705715.jpg',
                    'real_projects/التصميم الداخلي/02-Site/شالية السخنة تلال/FB_IMG_1683172712844.jpg',
                    'real_projects/التصميم الداخلي/02-Site/شالية السخنة تلال/FB_IMG_1683172720986.jpg',
                    'real_projects/التصميم الداخلي/02-Site/شالية السخنة تلال/FB_IMG_1683172733385.jpg',
                    'real_projects/التصميم الداخلي/02-Site/شالية السخنة تلال/FB_IMG_1683172739187.jpg',
                    'real_projects/التصميم الداخلي/02-Site/شالية السخنة تلال/FB_IMG_1683172748002.jpg',
                    'real_projects/التصميم الداخلي/02-Site/شالية السخنة تلال/FB_IMG_1683172762023.jpg'
                ],
                description: 'تصميم داخلي فاخر لشالية في السخنة تلال مع إطلالات خلابة وتصميم عصري',
                details: { area: '200 متر مربع', duration: '12 أسبوع', style: 'فاخر', budget: 'عالي جداً' }
            },
            {
                name: 'شالية ماجيك الساحل',
                title: 'شالية ماجيك الساحل - تصميم شالية ساحلي',
                images: [
                    'real_projects/التصميم الداخلي/02-Site/شالية ماجيك الساحل/FB_IMG_1694430635665.jpg',
                    'real_projects/التصميم الداخلي/02-Site/شالية ماجيك الساحل/FB_IMG_1694430643221.jpg',
                    'real_projects/التصميم الداخلي/02-Site/شالية ماجيك الساحل/FB_IMG_1695597463028.jpg'
                ],
                description: 'تصميم داخلي لشالية ماجيك الساحل مع ديكورات ساحلية عصرية',
                details: { area: '150 متر مربع', duration: '10 أسابيع', style: 'ساحلي', budget: 'عالي' }
            },
            {
                name: 'شالية مارينا 2',
                title: 'شالية مارينا 2 - تصميم شالية مارينا',
                images: [
                    'real_projects/التصميم الداخلي/02-Site/شالية مارينا 2/FB_IMG_1668404600694.jpg',
                    'real_projects/التصميم الداخلي/02-Site/شالية مارينا 2/FB_IMG_1668404610562.jpg',
                    'real_projects/التصميم الداخلي/02-Site/شالية مارينا 2/FB_IMG_1668404620776.jpg',
                    'real_projects/التصميم الداخلي/02-Site/شالية مارينا 2/FB_IMG_1668404634319.jpg',
                    'real_projects/التصميم الداخلي/02-Site/شالية مارينا 2/FB_IMG_1668404641762.jpg',
                    'real_projects/التصميم الداخلي/02-Site/شالية مارينا 2/FB_IMG_1668404654524.jpg',
                    'real_projects/التصميم الداخلي/02-Site/شالية مارينا 2/FB_IMG_1668404661595.jpg',
                    'real_projects/التصميم الداخلي/02-Site/شالية مارينا 2/FB_IMG_1668404669925.jpg',
                    'real_projects/التصميم الداخلي/02-Site/شالية مارينا 2/FB_IMG_1668411622587.jpg'
                ],
                description: 'تصميم داخلي لشالية مارينا 2 مع إطلالات بحرية فاخرة',
                details: { area: '180 متر مربع', duration: '12 أسبوع', style: 'فاخر', budget: 'عالي جداً' }
            },
            {
                name: 'شالية مارينا 3',
                title: 'شالية مارينا 3 - تصميم شالية مارينا',
                images: [
                    'real_projects/التصميم الداخلي/02-Site/شالية مارينا 3/FB_IMG_1673982930136.jpg',
                    'real_projects/التصميم الداخلي/02-Site/شالية مارينا 3/FB_IMG_1673982941014.jpg',
                    'real_projects/التصميم الداخلي/02-Site/شالية مارينا 3/FB_IMG_1683434142134.jpg',
                    'real_projects/التصميم الداخلي/02-Site/شالية مارينا 3/FB_IMG_1683434146899.jpg',
                    'real_projects/التصميم الداخلي/02-Site/شالية مارينا 3/FB_IMG_1683434280301.jpg',
                    'real_projects/التصميم الداخلي/02-Site/شالية مارينا 3/FB_IMG_1683434285417.jpg',
                    'real_projects/التصميم الداخلي/02-Site/شالية مارينا 3/FB_IMG_1683434291295.jpg',
                    'real_projects/التصميم الداخلي/02-Site/شالية مارينا 3/FB_IMG_1683434295982.jpg',
                    'real_projects/التصميم الداخلي/02-Site/شالية مارينا 3/FB_IMG_1683434301070.jpg'
                ],
                description: 'تصميم داخلي لشالية مارينا 3 مع ديكورات عصرية أنيقة',
                details: { area: '160 متر مربع', duration: '10 أسابيع', style: 'عصري', budget: 'عالي' }
            },
            {
                name: 'شالية مارينا 6',
                title: 'شالية مارينا 6 - تصميم شالية مارينا',
                images: [
                    'real_projects/التصميم الداخلي/02-Site/شالية مارينا 6/FB_IMG_1682349854929.jpg',
                    'real_projects/التصميم الداخلي/02-Site/شالية مارينا 6/FB_IMG_1688271766414.jpg',
                    'real_projects/التصميم الداخلي/02-Site/شالية مارينا 6/FB_IMG_1688271771464.jpg',
                    'real_projects/التصميم الداخلي/02-Site/شالية مارينا 6/FB_IMG_1688271777362.jpg',
                    'real_projects/التصميم الداخلي/02-Site/شالية مارينا 6/FB_IMG_1688271786837.jpg',
                    'real_projects/التصميم الداخلي/02-Site/شالية مارينا 6/FB_IMG_1688271800687.jpg',
                    'real_projects/التصميم الداخلي/02-Site/شالية مارينا 6/FB_IMG_1688271805874.jpg',
                    'real_projects/التصميم الداخلي/02-Site/شالية مارينا 6/FB_IMG_1688271809781.jpg',
                    'real_projects/التصميم الداخلي/02-Site/شالية مارينا 6/FB_IMG_1688271814376.jpg',
                    'real_projects/التصميم الداخلي/02-Site/شالية مارينا 6/FB_IMG_1688353467430.jpg',
                    'real_projects/التصميم الداخلي/02-Site/شالية مارينا 6/FB_IMG_1688353492382.jpg'
                ],
                description: 'تصميم داخلي لشالية مارينا 6 مع مساحات مفتوحة وإطلالات بحرية',
                details: { area: '200 متر مربع', duration: '12 أسبوع', style: 'عصري', budget: 'عالي جداً' }
            },
            {
                name: 'شالية مارينا 6-2',
                title: 'شالية مارينا 6-2 - تصميم شالية مارينا',
                images: [
                    'real_projects/التصميم الداخلي/02-Site/شالية مارينا 6-2/FB_IMG_1682592186586.jpg',
                    'real_projects/التصميم الداخلي/02-Site/شالية مارينا 6-2/FB_IMG_1682592194146.jpg',
                    'real_projects/التصميم الداخلي/02-Site/شالية مارينا 6-2/FB_IMG_1682592202887.jpg',
                    'real_projects/التصميم الداخلي/02-Site/شالية مارينا 6-2/FB_IMG_1682592207644.jpg',
                    'real_projects/التصميم الداخلي/02-Site/شالية مارينا 6-2/FB_IMG_1682592234326.jpg',
                    'real_projects/التصميم الداخلي/02-Site/شالية مارينا 6-2/FB_IMG_1682592238378.jpg',
                    'real_projects/التصميم الداخلي/02-Site/شالية مارينا 6-2/FB_IMG_1682592242857.jpg'
                ],
                description: 'تصميم داخلي لشالية مارينا 6-2 مع ديكورات فاخرة عصرية',
                details: { area: '180 متر مربع', duration: '10 أسابيع', style: 'فاخر', budget: 'عالي' }
            },
            {
                name: 'شالية مارينا 7-1',
                title: 'شالية مارينا 7-1 - تصميم شالية مارينا',
                images: [
                    'real_projects/التصميم الداخلي/02-Site/شالية مارينا 7-1/FB_IMG_1669583432776.jpg',
                    'real_projects/التصميم الداخلي/02-Site/شالية مارينا 7-1/FB_IMG_1669583439288.jpg',
                    'real_projects/التصميم الداخلي/02-Site/شالية مارينا 7-1/FB_IMG_1669720841153.jpg',
                    'real_projects/التصميم الداخلي/02-Site/شالية مارينا 7-1/FB_IMG_1669720861970.jpg',
                    'real_projects/التصميم الداخلي/02-Site/شالية مارينا 7-1/FB_IMG_1673236762111.jpg',
                    'real_projects/التصميم الداخلي/02-Site/شالية مارينا 7-1/FB_IMG_1673236771028.jpg',
                    'real_projects/التصميم الداخلي/02-Site/شالية مارينا 7-1/FB_IMG_1673236775791.jpg',
                    'real_projects/التصميم الداخلي/02-Site/شالية مارينا 7-1/FB_IMG_1673236783212.jpg'
                ],
                description: 'تصميم داخلي لشالية مارينا 7-1 مع إطلالات بحرية خلابة',
                details: { area: '220 متر مربع', duration: '15 أسبوع', style: 'فاخر', budget: 'عالي جداً' }
            },
            {
                name: 'شالية مراسي 1',
                title: 'شالية مراسي 1 - تصميم شالية مراسي',
                images: [
                    'real_projects/التصميم الداخلي/02-Site/شالية مراسي 1/FB_IMG_1678888749389.jpg',
                    'real_projects/التصميم الداخلي/02-Site/شالية مراسي 1/FB_IMG_1678888754042.jpg',
                    'real_projects/التصميم الداخلي/02-Site/شالية مراسي 1/FB_IMG_1678888758977.jpg',
                    'real_projects/التصميم الداخلي/02-Site/شالية مراسي 1/FB_IMG_1678888766060.jpg',
                    'real_projects/التصميم الداخلي/02-Site/شالية مراسي 1/FB_IMG_1678888770947.jpg',
                    'real_projects/التصميم الداخلي/02-Site/شالية مراسي 1/FB_IMG_1678888776593.jpg',
                    'real_projects/التصميم الداخلي/02-Site/شالية مراسي 1/FB_IMG_1694578371508.jpg'
                ],
                description: 'تصميم داخلي لشالية مراسي 1 مع ديكورات عصرية أنيقة',
                details: { area: '160 متر مربع', duration: '10 أسابيع', style: 'عصري', budget: 'عالي' }
            },
            {
                name: 'شالية مراسي 2',
                title: 'شالية مراسي 2 - تصميم شالية مراسي',
                images: [
                    'real_projects/التصميم الداخلي/02-Site/شالية مراسي 2/FB_IMG_1674180426531.jpg',
                    'real_projects/التصميم الداخلي/02-Site/شالية مراسي 2/FB_IMG_1674180430958.jpg',
                    'real_projects/التصميم الداخلي/02-Site/شالية مراسي 2/FB_IMG_1674180442743.jpg',
                    'real_projects/التصميم الداخلي/02-Site/شالية مراسي 2/FB_IMG_1674180448082.jpg',
                    'real_projects/التصميم الداخلي/02-Site/شالية مراسي 2/FB_IMG_1674180460247.jpg',
                    'real_projects/التصميم الداخلي/02-Site/شالية مراسي 2/FB_IMG_1674180465344.jpg',
                    'real_projects/التصميم الداخلي/02-Site/شالية مراسي 2/FB_IMG_1674180470304.jpg',
                    'real_projects/التصميم الداخلي/02-Site/شالية مراسي 2/FB_IMG_1674180474601.jpg'
                ],
                description: 'تصميم داخلي لشالية مراسي 2 مع مساحات مفتوحة وإطلالات بحرية',
                details: { area: '180 متر مربع', duration: '12 أسبوع', style: 'عصري', budget: 'عالي' }
            },
            {
                name: 'شالية مراسي 4',
                title: 'شالية مراسي 4 - تصميم شالية مراسي',
                images: [
                    'real_projects/التصميم الداخلي/02-Site/شالية مراسي 4/FB_IMG_1669894536157.jpg',
                    'real_projects/التصميم الداخلي/02-Site/شالية مراسي 4/FB_IMG_1669894550832.jpg',
                    'real_projects/التصميم الداخلي/02-Site/شالية مراسي 4/FB_IMG_1669894557287.jpg',
                    'real_projects/التصميم الداخلي/02-Site/شالية مراسي 4/FB_IMG_1669894563399.jpg',
                    'real_projects/التصميم الداخلي/02-Site/شالية مراسي 4/FB_IMG_1669894570165.jpg',
                    'real_projects/التصميم الداخلي/02-Site/شالية مراسي 4/FB_IMG_1669894586009.jpg',
                    'real_projects/التصميم الداخلي/02-Site/شالية مراسي 4/FB_IMG_1669894622343.jpg',
                    'real_projects/التصميم الداخلي/02-Site/شالية مراسي 4/FB_IMG_1670103556832.jpg',
                    'real_projects/التصميم الداخلي/02-Site/شالية مراسي 4/FB_IMG_1670103560892.jpg',
                    'real_projects/التصميم الداخلي/02-Site/شالية مراسي 4/FB_IMG_1670103564109.jpg'
                ],
                description: 'تصميم داخلي لشالية مراسي 4 مع ديكورات فاخرة عصرية',
                details: { area: '200 متر مربع', duration: '12 أسبوع', style: 'فاخر', budget: 'عالي جداً' }
            }
        ];

        for (const project of siteProjects) {
            const projectId = this.generateProjectId(project.name);
            
            this.projectsData[projectId] = {
                id: projectId,
                title: project.title,
                category: 'interior-design-site',
                subcategory: '02-Site',
                path: `${basePath}${project.name}`,
                images: project.images,
                description: project.description,
                details: project.details
            };
            
            console.log('Added site project:', projectId, this.projectsData[projectId]);
        }
        
        console.log('Total site projects loaded:', Object.keys(this.projectsData).filter(key => this.projectsData[key].category === 'interior-design-site').length);
        console.log('All projectsData after loading site projects:', this.projectsData);
    }

    // Load wooden projects
    async loadWoodenProjects() {
        console.log('loadWoodenProjects called');
        
        const woodenPath = this.realProjectsPath + 'التصاميم الخشبيه/';
        console.log('Wooden path:', woodenPath);
        
        // Load wooden kitchen projects
        await this.loadKitchenProjects(woodenPath + '01-Kitchens/');
        
        // Load wooden dressing projects
        await this.loadDressingProjects(woodenPath + '02-Dressing/');
        
        // Load wooden toilet units projects
        await this.loadToiletUnitsProjects(woodenPath + '03-Toilet Units/');
        
        // Load wooden laundry projects
        await this.loadLaundryProjects(woodenPath + '04-Laundry/');
        
        // Load wooden kitchenette projects
        await this.loadKitchenetteProjects(woodenPath + '05-Kitchenette/');
        
        // Load wooden others projects
        await this.loadOthersProjects(woodenPath + '06-Others/');
        
        console.log('Wooden projects loaded successfully');
    }
    
    // Load wooden dressing projects
    async loadDressingProjects(basePath) {
        console.log('loadDressingProjects called with basePath:', basePath);
        
        const dressingProjects = [
            {
                name: '046-Ms.Amal-Dressing',
                title: 'غرفة ملابس الآنسة أمل - تصميم غرفة ملابس خشبية فاخرة',
                images: [
                    'real_projects/التصاميم الخشبيه/02-Dressing/046-Ms.Amal-Dressing/0665.effe00ctsResult.jpg',
                    'real_projects/التصاميم الخشبيه/02-Dressing/046-Ms.Amal-Dressing/0333.effec00tsResult.jpg',
                    'real_projects/التصاميم الخشبيه/02-Dressing/046-Ms.Amal-Dressing/066.effect00sResult.jpg'
                ],
                description: 'تصميم غرفة ملابس خشبية فاخرة للآنسة أمل مع أثاث عالي الجودة وتصميم عصري',
                details: { area: '20 متر مربع', duration: '6 أسابيع', style: 'فاخر', budget: 'عالي' }
            },
            {
                name: '047-Mr.Kareem Magdy-Dressing',
                title: 'غرفة ملابس السيد كريم مجدي - تصميم غرفة ملابس خشبية أنيقة',
                images: [
                    'real_projects/التصاميم الخشبيه/02-Dressing/047-Mr.Kareem Magdy-Dressing/01.effectsResult.jpg',
                    'real_projects/التصاميم الخشبيه/02-Dressing/047-Mr.Kareem Magdy-Dressing/02.effectsResult.jpg',
                    'real_projects/التصاميم الخشبيه/02-Dressing/047-Mr.Kareem Magdy-Dressing/3.effectsResult.jpg'
                ],
                description: 'تصميم غرفة ملابس خشبية أنيقة للسيد كريم مجدي مع ديكورات فاخرة وألوان متناسقة',
                details: { area: '18 متر مربع', duration: '5 أسابيع', style: 'أنيق', budget: 'عالي' }
            },
            {
                name: '048-Mr.Hamdy-Dressing',
                title: 'غرفة ملابس السيد حمدي - تصميم غرفة ملابس خشبية كلاسيكية',
                images: [
                    'real_projects/التصاميم الخشبيه/02-Dressing/048-Mr.Hamdy-Dressing/01.effectsResult.jpg',
                    'real_projects/التصاميم الخشبيه/02-Dressing/048-Mr.Hamdy-Dressing/05.effectsResult.jpg'
                ],
                description: 'تصميم غرفة ملابس خشبية كلاسيكية للسيد حمدي مع تفاصيل دقيقة وألوان دافئة',
                details: { area: '22 متر مربع', duration: '7 أسابيع', style: 'كلاسيكي', budget: 'عالي' }
            },
            {
                name: '049-Mr.Sherif Adel-Dressing',
                title: 'غرفة ملابس السيد شريف عادل - تصميم غرفة ملابس خشبية معاصرة',
                images: [
                    'real_projects/التصاميم الخشبيه/02-Dressing/049-Mr.Sherif Adel-Dressing/0111.effectsResult.jpg',
                    'real_projects/التصاميم الخشبيه/02-Dressing/049-Mr.Sherif Adel-Dressing/033.effectsResult.jpg',
                    'real_projects/التصاميم الخشبيه/02-Dressing/049-Mr.Sherif Adel-Dressing/0555.effectsResult.jpg',
                    'real_projects/التصاميم الخشبيه/02-Dressing/049-Mr.Sherif Adel-Dressing/04556.effectsResult.jpg'
                ],
                description: 'تصميم غرفة ملابس خشبية معاصرة للسيد شريف عادل مع مساحات مفتوحة وتصميم عملي',
                details: { area: '19 متر مربع', duration: '6 أسابيع', style: 'معاصر', budget: 'عالي' }
            },
            {
                name: '088-Mr.Shady El Kordy-El Shorouk-Dressing',
                title: 'غرفة ملابس السيد شادي الكردي - الشروق - تصميم غرفة ملابس خشبية فاخرة',
                images: [
                    'real_projects/التصاميم الخشبيه/02-Dressing/088-Mr.Shady El Kordy-El Shorouk-Dressing/z1.jpg',
                    'real_projects/التصاميم الخشبيه/02-Dressing/088-Mr.Shady El Kordy-El Shorouk-Dressing/z2.jpg',
                    'real_projects/التصاميم الخشبيه/02-Dressing/088-Mr.Shady El Kordy-El Shorouk-Dressing/z3.jpg',
                    'real_projects/التصاميم الخشبيه/02-Dressing/088-Mr.Shady El Kordy-El Shorouk-Dressing/z4.jpg'
                ],
                description: 'تصميم غرفة ملابس خشبية فاخرة للسيد شادي الكردي في الشروق مع أثاث عالي الجودة',
                details: { area: '25 متر مربع', duration: '8 أسابيع', style: 'فاخر', budget: 'عالي جداً' }
            },
            {
                name: '012-MS.Amal Elsayed-Dressing',
                title: 'غرفة ملابس الآنسة أمل السيد - تصميم غرفة ملابس خشبية أنيقة',
                images: [
                    'real_projects/التصاميم الخشبيه/02-Dressing/012-MS.Amal Elsayed-Dressing/1.jpg'
                ],
                description: 'تصميم غرفة ملابس خشبية أنيقة للآنسة أمل السيد مع ديكورات فاخرة وألوان متناسقة',
                details: { area: '21 متر مربع', duration: '7 أسابيع', style: 'أنيق', budget: 'عالي' }
            },
            {
                name: '020-MS.Eman Youssif-Dressing',
                title: 'غرفة ملابس الآنسة إيمان يوسف - تصميم غرفة ملابس خشبية كلاسيكية',
                images: [
                    'real_projects/التصاميم الخشبيه/02-Dressing/020-MS.Eman Youssif-Dressing/01 (1).jpg',
                    'real_projects/التصاميم الخشبيه/02-Dressing/020-MS.Eman Youssif-Dressing/01 (2).jpg',
                    'real_projects/التصاميم الخشبيه/02-Dressing/020-MS.Eman Youssif-Dressing/01 (3).jpg'
                ],
                description: 'تصميم غرفة ملابس خشبية كلاسيكية للآنسة إيمان يوسف مع تفاصيل دقيقة وألوان دافئة',
                details: { area: '24 متر مربع', duration: '8 أسابيع', style: 'كلاسيكي', budget: 'عالي' }
            },
            {
                name: '023-MS.Jihan-Dressing',
                title: 'غرفة ملابس الآنسة جيهان - تصميم غرفة ملابس خشبية معاصرة',
                images: [
                    'real_projects/التصاميم الخشبيه/02-Dressing/023-MS.Jihan-Dressing/1.jpg',
                    'real_projects/التصاميم الخشبيه/02-Dressing/023-MS.Jihan-Dressing/2.jpg'
                ],
                description: 'تصميم غرفة ملابس خشبية معاصرة للآنسة جيهان مع مساحات مفتوحة وتصميم عملي',
                details: { area: '20 متر مربع', duration: '6 أسابيع', style: 'معاصر', budget: 'عالي' }
            },
            {
                name: '05-Dr.Maha Hussein-Dressing',
                title: 'غرفة ملابس الدكتورة مها حسين - تصميم غرفة ملابس خشبية فاخرة',
                images: [
                    'real_projects/التصاميم الخشبيه/02-Dressing/05-Dr.Maha Hussein-Dressing/2.jpg'
                ],
                description: 'تصميم غرفة ملابس خشبية فاخرة للدكتورة مها حسين مع أثاث عالي الجودة وتصميم عصري',
                details: { area: '23 متر مربع', duration: '7 أسابيع', style: 'فاخر', budget: 'عالي' }
            },
            {
                name: '07-MR.Sayed M.Eldeeb-Dressing',
                title: 'غرفة ملابس السيد سيد محمد الديب - تصميم غرفة ملابس خشبية أنيقة',
                images: [
                    'real_projects/التصاميم الخشبيه/02-Dressing/07-MR.Sayed M.Eldeeb-Dressing/1.jpg',
                    'real_projects/التصاميم الخشبيه/02-Dressing/07-MR.Sayed M.Eldeeb-Dressing/2.jpg'
                ],
                description: 'تصميم غرفة ملابس خشبية أنيقة للسيد سيد محمد الديب مع ديكورات فاخرة وألوان متناسقة',
                details: { area: '19 متر مربع', duration: '6 أسابيع', style: 'أنيق', budget: 'عالي' }
            }
        ];

        // Add dressing projects to projectsData
        dressingProjects.forEach(project => {
                const projectId = this.generateProjectId(project.name);
                this.projectsData[projectId] = {
                ...project,
                    id: projectId,
                category: 'wooden-dressing',
                subcategory: '02-Dressing',
                path: basePath + project.name
            };
            console.log('Added dressing project:', projectId, project);
        });

        console.log('Total dressing projects loaded:', dressingProjects.length);
        console.log('All projectsData after loading dressing projects:', this.projectsData);
    }
    
    // Load wooden toilet units projects
    async loadToiletUnitsProjects(basePath) {
        console.log('loadToiletUnitsProjects called with basePath:', basePath);
        
        const toiletUnitsProjects = [
            {
                name: '0171-Mr.Mohamed Mansy-Toilet Unit',
                title: 'وحدة حمام السيد محمد منسي - تصميم وحدة حمام خشبية عملية',
                images: [
                    'real_projects/التصاميم الخشبيه/03-Toilet Units/0171-Mr.Mohamed Mansy-Toilet Unit/11.jpg'
                ],
                description: 'تصميم وحدة حمام خشبية عملية للسيد محمد منسي مع أثاث عالي الجودة وتصميم عصري',
                details: { area: '8 متر مربع', duration: '4 أسابيع', style: 'عملي', budget: 'متوسط' }
            },
            {
                name: '04-Dr.Khaled Nagaty-Toilet Unit',
                title: 'وحدة حمام الدكتور خالد نجاتي - تصميم وحدة حمام خشبية أنيقة',
                images: [
                    'real_projects/التصاميم الخشبيه/03-Toilet Units/04-Dr.Khaled Nagaty-Toilet Unit/1.jpg'
                ],
                description: 'تصميم وحدة حمام خشبية أنيقة للدكتور خالد نجاتي مع ديكورات فاخرة وألوان متناسقة',
                details: { area: '10 متر مربع', duration: '5 أسابيع', style: 'أنيق', budget: 'عالي' }
            },
            {
                name: '17',
                title: 'وحدة حمام 17 - تصميم وحدة حمام خشبية كلاسيكية',
                images: [
                    'real_projects/التصاميم الخشبيه/03-Toilet Units/17/IMG-20171015-WA0109.jpg',
                    'real_projects/التصاميم الخشبيه/03-Toilet Units/17/IMG-20171015-WA0108.jpg',
                    'real_projects/التصاميم الخشبيه/03-Toilet Units/17/IMG-20171015-WA0032.jpg'
                ],
                description: 'تصميم وحدة حمام خشبية كلاسيكية مع تفاصيل دقيقة وألوان دافئة',
                details: { area: '9 متر مربع', duration: '4 أسابيع', style: 'كلاسيكي', budget: 'متوسط' }
            },
            {
                name: 'وحدة حمام',
                title: 'وحدة حمام عامة - تصميم وحدة حمام خشبية معاصرة',
                images: [
                    'real_projects/التصاميم الخشبيه/03-Toilet Units/وحدة حمام/WhatsApp Image 2024-11-09 at 9.12.03 AM (4).jpeg',
                    'real_projects/التصاميم الخشبيه/03-Toilet Units/وحدة حمام/WhatsApp Image 2024-11-09 at 9.12.03 AM (3).jpeg'
                ],
                description: 'تصميم وحدة حمام خشبية معاصرة مع مساحات مفتوحة وتصميم عملي',
                details: { area: '7 متر مربع', duration: '3 أسابيع', style: 'معاصر', budget: 'متوسط' }
            }
        ];

        // Add toilet units projects to projectsData
        toiletUnitsProjects.forEach(project => {
            const projectId = this.generateProjectId(project.name);
            this.projectsData[projectId] = {
                ...project,
                id: projectId,
                category: 'wooden-toilet-units',
                subcategory: '03-Toilet Units',
                path: basePath + project.name
            };
            console.log('Added toilet unit project:', projectId, project);
        });

        console.log('Total toilet units projects loaded:', toiletUnitsProjects.length);
        console.log('All projectsData after loading toilet units projects:', this.projectsData);
    }
    
    // Load wooden laundry projects
    async loadLaundryProjects(basePath) {
        console.log('loadLaundryProjects called with basePath:', basePath);
        
        const laundryProjects = [
            {
                name: '0107-Dr.Essam-Laundry',
                title: 'غرفة غسيل الدكتور عصام - تصميم غرفة غسيل خشبية منظمة',
                images: [
                    'real_projects/التصاميم الخشبيه/04-Laundry/0107-Dr.Essam-Laundry/1.jpg'
                ],
                description: 'تصميم غرفة غسيل خشبية منظمة للدكتور عصام مع أثاث عالي الجودة وتصميم عصري',
                details: { area: '12 متر مربع', duration: '6 أسابيع', style: 'منظم', budget: 'عالي' }
            },
            {
                name: '02-Mr.Mostafa Nasr-Laundry',
                title: 'غرفة غسيل السيد مصطفى نصر - تصميم غرفة غسيل خشبية عملية',
                images: [
                    'real_projects/التصاميم الخشبيه/04-Laundry/02-Mr.Mostafa Nasr-Laundry/laundry 3d.jpg'
                ],
                description: 'تصميم غرفة غسيل خشبية عملية للسيد مصطفى نصر مع ديكورات فاخرة وألوان متناسقة',
                details: { area: '15 متر مربع', duration: '7 أسابيع', style: 'عملي', budget: 'عالي' }
            }
        ];

        // Add laundry projects to projectsData
        laundryProjects.forEach(project => {
            const projectId = this.generateProjectId(project.name);
            this.projectsData[projectId] = {
                ...project,
                id: projectId,
                category: 'wooden-laundry',
                subcategory: '04-Laundry',
                path: basePath + project.name
            };
            console.log('Added laundry project:', projectId, project);
        });

        console.log('Total laundry projects loaded:', laundryProjects.length);
        console.log('All projectsData after loading laundry projects:', this.projectsData);
    }
    
    // Load wooden kitchenette projects
    async loadKitchenetteProjects(basePath) {
        console.log('loadKitchenetteProjects called with basePath:', basePath);
        
        const kitchenetteProjects = [
            {
                name: '020-MS.Eman Youssif-Kitchenette',
                title: 'مطبخ صغير الآنسة إيمان يوسف - تصميم مطبخ صغير خشبي أنيق',
                images: [
                    'real_projects/التصاميم الخشبيه/05-Kitchenette/020-MS.Eman Youssif-Kitchenette/kitchenette.jpg',
                    'real_projects/التصاميم الخشبيه/05-Kitchenette/020-MS.Eman Youssif-Kitchenette/41.jpg',
                    'real_projects/التصاميم الخشبيه/05-Kitchenette/020-MS.Eman Youssif-Kitchenette/51.jpg'
                ],
                description: 'تصميم مطبخ صغير خشبي أنيق للآنسة إيمان يوسف مع ديكورات فاخرة وألوان متناسقة',
                details: { area: '15 متر مربع', duration: '5 أسابيع', style: 'أنيق', budget: 'عالي' }
            },
            {
                name: '0140-Clinic-Kitchenette',
                title: 'مطبخ صغير عيادة - تصميم مطبخ صغير خشبي عملي',
                images: [
                    'real_projects/التصاميم الخشبيه/05-Kitchenette/0140-Clinic-Kitchenette/1.jpg'
                ],
                description: 'تصميم مطبخ صغير خشبي عملي للعيادة مع أثاث عالي الجودة وتصميم عصري',
                details: { area: '12 متر مربع', duration: '4 أسابيع', style: 'عملي', budget: 'متوسط' }
            },
            {
                name: '0142-Dr.Emad Sadek-Kitchenette',
                title: 'مطبخ صغير الدكتور عماد صادق - تصميم مطبخ صغير خشبي فاخر',
                images: [
                    'real_projects/التصاميم الخشبيه/05-Kitchenette/0142-Dr.Emad Sadek-Kitchenette/OF 1.jpg'
                ],
                description: 'تصميم مطبخ صغير خشبي فاخر للدكتور عماد صادق مع أثاث عالي الجودة وتصميم كلاسيكي',
                details: { area: '18 متر مربع', duration: '6 أسابيع', style: 'فاخر', budget: 'عالي جداً' }
            },
            {
                name: '0148-Mrs.Enas El Shaikh-Kitchenette',
                title: 'مطبخ صغير السيدة إيناس الشيخ - تصميم مطبخ صغير خشبي معاصر',
                images: [
                    'real_projects/التصاميم الخشبيه/05-Kitchenette/0148-Mrs.Enas El Shaikh-Kitchenette/1.jpg',
                    'real_projects/التصاميم الخشبيه/05-Kitchenette/0148-Mrs.Enas El Shaikh-Kitchenette/2.jpg',
                    'real_projects/التصاميم الخشبيه/05-Kitchenette/0148-Mrs.Enas El Shaikh-Kitchenette/3.jpg'
                ],
                description: 'تصميم مطبخ صغير خشبي معاصر للسيدة إيناس الشيخ مع مساحات مفتوحة وتصميم عملي',
                details: { area: '16 متر مربع', duration: '5 أسابيع', style: 'معاصر', budget: 'عالي' }
            },
            {
                name: '0169-Mr.Mohamed El Alfy-Kitchenette',
                title: 'مطبخ صغير السيد محمد الألفي - تصميم مطبخ صغير خشبي أنيق',
                images: [
                    'real_projects/التصاميم الخشبيه/05-Kitchenette/0169-Mr.Mohamed El Alfy-Kitchenette/12.jpg'
                ],
                description: 'تصميم مطبخ صغير خشبي أنيق للسيد محمد الألفي مع ديكورات فاخرة وألوان متناسقة',
                details: { area: '14 متر مربع', duration: '5 أسابيع', style: 'أنيق', budget: 'عالي' }
            },
            {
                name: '0191-Mrs.Safaa Abbas-Kitchenette',
                title: 'مطبخ صغير السيدة صفاء عباس - تصميم مطبخ صغير خشبي كلاسيكي',
                images: [
                    'real_projects/التصاميم الخشبيه/05-Kitchenette/0191-Mrs.Safaa Abbas-Kitchenette/2.jpg'
                ],
                description: 'تصميم مطبخ صغير خشبي كلاسيكي للسيدة صفاء عباس مع تفاصيل دقيقة وألوان دافئة',
                details: { area: '17 متر مربع', duration: '6 أسابيع', style: 'كلاسيكي', budget: 'عالي' }
            },
            {
                name: '0195-Mrs.Sawsan Sayed-Kitchenette',
                title: 'مطبخ صغير السيدة سوسن سيد - تصميم مطبخ صغير خشبي عصري',
                images: [
                    'real_projects/التصاميم الخشبيه/05-Kitchenette/0195-Mrs.Sawsan Sayed-Kitchenette/1.jpg',
                    'real_projects/التصاميم الخشبيه/05-Kitchenette/0195-Mrs.Sawsan Sayed-Kitchenette/2.jpg'
                ],
                description: 'تصميم مطبخ صغير خشبي عصري للسيدة سوسن سيد مع خطوط بسيطة وألوان هادئة',
                details: { area: '15 متر مربع', duration: '5 أسابيع', style: 'عصري', budget: 'عالي' }
            },
            {
                name: '0220-Mr.Sherif-Kitchenette',
                title: 'مطبخ صغير السيد شريف - تصميم مطبخ صغير خشبي فاخر',
                images: [
                    'real_projects/التصاميم الخشبيه/05-Kitchenette/0220-Mr.Sherif-Kitchenette/1.jpg'
                ],
                description: 'تصميم مطبخ صغير خشبي فاخر للسيد شريف مع أثاث عالي الجودة وتصميم عصري',
                details: { area: '19 متر مربع', duration: '7 أسابيع', style: 'فاخر', budget: 'عالي جداً' }
            },
            {
                name: '038-MR.Shaaban Ayaad-coffee corner',
                title: 'زاوية قهوة السيد شعبان عياد - تصميم زاوية قهوة خشبية أنيقة',
                images: [
                    'real_projects/التصاميم الخشبيه/05-Kitchenette/038-MR.Shaaban Ayaad-coffee corner/1.jpg',
                    'real_projects/التصاميم الخشبيه/05-Kitchenette/038-MR.Shaaban Ayaad-coffee corner/3.jpg'
                ],
                description: 'تصميم زاوية قهوة خشبية أنيقة للسيد شعبان عياد مع ديكورات فاخرة وألوان متناسقة',
                details: { area: '8 متر مربع', duration: '3 أسابيع', style: 'أنيق', budget: 'متوسط' }
            },
            {
                name: '06-Mrs.Sahar Hamdy-Kitchenette',
                title: 'مطبخ صغير السيدة سحر حمدي - تصميم مطبخ صغير خشبي معاصر',
                images: [
                    'real_projects/التصاميم الخشبيه/05-Kitchenette/06-Mrs.Sahar Hamdy-Kitchenette/1.jpg',
                    'real_projects/التصاميم الخشبيه/05-Kitchenette/06-Mrs.Sahar Hamdy-Kitchenette/2.jpg'
                ],
                description: 'تصميم مطبخ صغير خشبي معاصر للسيدة سحر حمدي مع مساحات مفتوحة وتصميم عملي',
                details: { area: '13 متر مربع', duration: '4 أسابيع', style: 'معاصر', budget: 'متوسط' }
            }
        ];

        // Add kitchenette projects to projectsData
        kitchenetteProjects.forEach(project => {
            const projectId = this.generateProjectId(project.name);
            this.projectsData[projectId] = {
                ...project,
                id: projectId,
                category: 'wooden-kitchenette',
                subcategory: '05-Kitchenette',
                path: basePath + project.name
            };
            console.log('Added kitchenette project:', projectId, project);
        });

        console.log('Total kitchenette projects loaded:', kitchenetteProjects.length);
        console.log('All projectsData after loading kitchenette projects:', this.projectsData);
    }
    
    // Load wooden others projects
    async loadOthersProjects(basePath) {
        console.log('loadOthersProjects called with basePath:', basePath);
        
        const othersProjects = [
            {
                name: '06-Others-General',
                title: 'تصميمات خشبية متنوعة - تصميمات حسب الطلب',
                images: [
                    'real_projects/التصاميم الخشبيه/06-Others/22.jpg'
                ],
                description: 'تصميمات خشبية متنوعة ومتعددة حسب طلب العميل مع التركيز على الجودة العالية',
                details: { area: 'متغير', duration: 'متغير', style: 'متنوع', budget: 'متغير' }
            }
        ];

        // Add others projects to projectsData
        othersProjects.forEach(project => {
            const projectId = this.generateProjectId(project.name);
            this.projectsData[projectId] = {
                ...project,
                id: projectId,
                category: 'wooden-others',
                subcategory: '06-Others',
                path: basePath + project.name
            };
            console.log('Added others project:', projectId, project);
        });

        console.log('Total others projects loaded:', othersProjects.length);
        console.log('All projectsData after loading others projects:', this.projectsData);
    }
    
    // Load wooden kitchen projects
    async loadKitchenProjects(basePath) {
        console.log('loadKitchenProjects called with basePath:', basePath);
        
        const kitchenProjects = [
            {
                name: '1-Mr.Mostafa Nasr-Kitchen',
                title: 'مطبخ السيد مصطفى نصر - تصميم مطبخ خشبي فاخر',
                images: [
                    'real_projects/التصاميم الخشبيه/01-Kitchens/1-Mr.Mostafa Nasr-Kitchen/111.jpg',
                    'real_projects/التصاميم الخشبيه/01-Kitchens/1-Mr.Mostafa Nasr-Kitchen/333.jpg',
                    'real_projects/التصاميم الخشبيه/01-Kitchens/1-Mr.Mostafa Nasr-Kitchen/44.jpg'
                ],
                description: 'تصميم مطبخ خشبي فاخر للسيد مصطفى نصر مع أثاث عالي الجودة وتصميم عصري',
                details: { area: '25 متر مربع', duration: '8 أسابيع', style: 'فاخر', budget: 'عالي جداً' }
            },
            {
                name: '03-Mr.Khaled Mostafa-Kitchen',
                title: 'مطبخ السيد خالد مصطفى - تصميم مطبخ خشبي كلاسيكي',
                images: [
                    'real_projects/التصاميم الخشبيه/01-Kitchens/03-Mr.Khaled Mostafa-Kitchen/1.jpg',
                    'real_projects/التصاميم الخشبيه/01-Kitchens/03-Mr.Khaled Mostafa-Kitchen/2.jpg',
                    'real_projects/التصاميم الخشبيه/01-Kitchens/03-Mr.Khaled Mostafa-Kitchen/3.jpg'
                ],
                description: 'تصميم مطبخ خشبي كلاسيكي للسيد خالد مصطفى مع تفاصيل دقيقة وألوان دافئة',
                details: { area: '30 متر مربع', duration: '10 أسابيع', style: 'كلاسيكي', budget: 'عالي' }
            },
            {
                name: '04-Dr.Khaled Nagaty-Kitchen',
                title: 'مطبخ الدكتور خالد نجاتي - تصميم مطبخ خشبي عصري',
                images: [
                    'real_projects/التصاميم الخشبيه/01-Kitchens/04-Dr.Khaled Nagaty-Kitchen/1.jpg',
                    'real_projects/التصاميم الخشبيه/01-Kitchens/04-Dr.Khaled Nagaty-Kitchen/2.jpg',
                    'real_projects/التصاميم الخشبيه/01-Kitchens/04-Dr.Khaled Nagaty-Kitchen/3.jpg'
                ],
                description: 'تصميم مطبخ خشبي عصري للدكتور خالد نجاتي مع خطوط بسيطة وألوان هادئة',
                details: { area: '28 متر مربع', duration: '9 أسابيع', style: 'عصري', budget: 'عالي' }
            },
            {
                name: '05-Dr.Maha Hussein-Kitchen',
                title: 'مطبخ الدكتورة مها حسين - تصميم مطبخ خشبي أنيق',
                images: [
                    'real_projects/التصاميم الخشبيه/01-Kitchens/05-Dr.Maha Hussein-Kitchen/1.jpg',
                    'real_projects/التصاميم الخشبيه/01-Kitchens/05-Dr.Maha Hussein-Kitchen/2.jpg',
                    'real_projects/التصاميم الخشبيه/01-Kitchens/05-Dr.Maha Hussein-Kitchen/3.jpg'
                ],
                description: 'تصميم مطبخ خشبي أنيق للدكتورة مها حسين مع ديكورات فاخرة وألوان متناسقة',
                details: { area: '32 متر مربع', duration: '11 أسبوع', style: 'أنيق', budget: 'عالي جداً' }
            },
            {
                name: '08-Ms.Shaimaa Salaheldin-Kitchen',
                title: 'مطبخ الآنسة شيماء صلاح الدين - تصميم مطبخ خشبي معاصر',
                images: [
                    'real_projects/التصاميم الخشبيه/01-Kitchens/08-Ms.Shaimaa Salaheldin-Kitchen/1.jpg',
                    'real_projects/التصاميم الخشبيه/01-Kitchens/08-Ms.Shaimaa Salaheldin-Kitchen/2.jpg',
                    'real_projects/التصاميم الخشبيه/01-Kitchens/08-Ms.Shaimaa Salaheldin-Kitchen/3.jpg'
                ],
                description: 'تصميم مطبخ خشبي معاصر للآنسة شيماء صلاح الدين مع مساحات مفتوحة وتصميم عملي',
                details: { area: '26 متر مربع', duration: '8 أسابيع', style: 'معاصر', budget: 'عالي' }
            },
            {
                name: '009-MS.Yasmine Elnagar-Kitchen',
                title: 'مطبخ الآنسة ياسمين النجار - تصميم مطبخ خشبي فاخر',
                images: [
                    'real_projects/التصاميم الخشبيه/01-Kitchens/009-MS.Yasmine Elnagar-Kitchen/1.jpg',
                    'real_projects/التصاميم الخشبيه/01-Kitchens/009-MS.Yasmine Elnagar-Kitchen/2.jpg',
                    'real_projects/التصاميم الخشبيه/01-Kitchens/009-MS.Yasmine Elnagar-Kitchen/3.jpg'
                ],
                description: 'تصميم مطبخ خشبي فاخر للآنسة ياسمين النجار مع أثاث عالي الجودة وتصميم كلاسيكي',
                details: { area: '35 متر مربع', duration: '12 أسبوع', style: 'فاخر', budget: 'عالي جداً' }
            },
            {
                name: '010-MR.Zakaria-Kitchen',
                title: 'مطبخ السيد زكريا - تصميم مطبخ خشبي عصري',
                images: [
                    'real_projects/التصاميم الخشبيه/01-Kitchens/010-MR.Zakaria-Kitchen/1111.jpg',
                    'real_projects/التصاميم الخشبيه/01-Kitchens/010-MR.Zakaria-Kitchen/222.jpg'
                ],
                description: 'تصميم مطبخ خشبي عصري للسيد زكريا مع خطوط بسيطة وألوان عصرية',
                details: { area: '27 متر مربع', duration: '9 أسابيع', style: 'عصري', budget: 'عالي' }
            },
            {
                name: '011-MR.Ahmed Ismael-Kitchen',
                title: 'مطبخ السيد أحمد إسماعيل - تصميم مطبخ خشبي كلاسيكي',
                images: [
                    'real_projects/التصاميم الخشبيه/01-Kitchens/011-MR.Ahmed Ismael-Kitchen/1.jpg',
                    'real_projects/التصاميم الخشبيه/01-Kitchens/011-MR.Ahmed Ismael-Kitchen/2.jpg',
                    'real_projects/التصاميم الخشبيه/01-Kitchens/011-MR.Ahmed Ismael-Kitchen/3.jpg'
                ],
                description: 'تصميم مطبخ خشبي كلاسيكي للسيد أحمد إسماعيل مع تفاصيل دقيقة وألوان دافئة',
                details: { area: '29 متر مربع', duration: '10 أسابيع', style: 'كلاسيكي', budget: 'عالي' }
            },
            {
                name: '012-MS.Amal Elsayed-Kitchen',
                title: 'مطبخ الآنسة أمل السيد - تصميم مطبخ خشبي أنيق',
                images: [
                    'real_projects/التصاميم الخشبيه/01-Kitchens/012-MS.Amal Elsayed-Kitchen/5.jpg',
                    'real_projects/التصاميم الخشبيه/01-Kitchens/012-MS.Amal Elsayed-Kitchen/6.jpg',
                    'real_projects/التصاميم الخشبيه/01-Kitchens/012-MS.Amal Elsayed-Kitchen/7.jpg',
                    'real_projects/التصاميم الخشبيه/01-Kitchens/012-MS.Amal Elsayed-Kitchen/8.jpg'
                ],
                description: 'تصميم مطبخ خشبي أنيق للآنسة أمل السيد مع ديكورات فاخرة وألوان متناسقة',
                details: { area: '31 متر مربع', duration: '11 أسبوع', style: 'أنيق', budget: 'عالي جداً' }
            },
            {
                name: '013-MR.Atef Rahmy-Kitchen',
                title: 'مطبخ السيد عاطف رحمي - تصميم مطبخ خشبي معاصر',
                images: [
                    'real_projects/التصاميم الخشبيه/01-Kitchens/013-MR.Atef Rahmy-Kitchen/1.jpg',
                    'real_projects/التصاميم الخشبيه/01-Kitchens/013-MR.Atef Rahmy-Kitchen/2.jpg',
                    'real_projects/التصاميم الخشبيه/01-Kitchens/013-MR.Atef Rahmy-Kitchen/3.jpg'
                ],
                description: 'تصميم مطبخ خشبي معاصر للسيد عاطف رحمي مع مساحات مفتوحة وتصميم عملي',
                details: { area: '28 متر مربع', duration: '9 أسابيع', style: 'معاصر', budget: 'عالي' }
            }
        ];

        for (const project of kitchenProjects) {
            const projectId = this.generateProjectId(project.name);
            
            this.projectsData[projectId] = {
                id: projectId,
                title: project.title,
                category: 'wooden-kitchens',
                subcategory: '01-Kitchens',
                path: `${basePath}${project.name}`,
                images: project.images,
                description: project.description,
                details: project.details
            };
            
            console.log('Added kitchen project:', projectId, this.projectsData[projectId]);
        }
        
        console.log('Total kitchen projects loaded:', Object.keys(this.projectsData).filter(key => this.projectsData[key].category === 'wooden-kitchens').length);
        console.log('All projectsData after loading kitchen projects:', this.projectsData);
    }
    
    // Load wooden others projects
    async loadOthersProjects(basePath) {
        console.log('loadOthersProjects called with basePath:', basePath);
        
        const othersProjects = [
            {
                name: '06-Others-General',
                title: 'تصميمات خشبية متنوعة - تصميمات حسب الطلب',
                images: [
                    'real_projects/التصاميم الخشبيه/06-Others/22.jpg'
                ],
                description: 'تصميمات خشبية متنوعة ومتعددة حسب طلب العميل مع التركيز على الجودة العالية',
                details: { area: 'متغير', duration: 'متغير', style: 'متنوع', budget: 'متغير' }
            }
        ];

        // Add others projects to projectsData
        othersProjects.forEach(project => {
            const projectId = this.generateProjectId(project.name);
            this.projectsData[projectId] = {
                ...project,
                id: projectId,
                category: 'wooden-others',
                subcategory: '06-Others',
                path: basePath + project.name
            };
            console.log('Added others project:', projectId, project);
        });

        console.log('Total others projects loaded:', othersProjects.length);
        console.log('All projectsData after loading others projects:', this.projectsData);
    }

    // Generate project ID
    generateProjectId(name) {
        // Convert Arabic and special characters to English
        let id = name
            .replace(/[ء-ي]/g, '') // Remove Arabic characters
            .replace(/[^a-zA-Z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
            .replace(/\s+/g, '-') // Replace spaces with hyphens
            .replace(/-+/g, '-') // Replace multiple hyphens with single
            .replace(/^-|-$/g, '') // Remove leading/trailing hyphens
            .toLowerCase();
        
        // If the ID is empty or only contains hyphens, create a fallback ID
        if (!id || id === '-' || id === '--') {
            id = 'project-' + Math.random().toString(36).substr(2, 9);
        }
        
        return id;
    }

    // Generate project description
    generateProjectDescription(name) {
        return `مشروع ${name} - تصميم وتنفيذ احترافي`;
    }

    // Generate project details
    generateProjectDetails(name, imageCount) {
        return {
            area: `${Math.floor(Math.random() * 20) + 5} متر مربع`,
            duration: `${Math.floor(Math.random() * 4) + 1} أسابيع`,
            style: ['عصري', 'كلاسيكي', 'حديث', 'معاصر', 'فاخر'][Math.floor(Math.random() * 5)],
            budget: ['منخفض', 'متوسط', 'عالي', 'عالي جداً'][Math.floor(Math.random() * 3)],
            images: imageCount
        };
    }

    // Get projects by category
    getProjectsByCategory(category) {
        console.log('getProjectsByCategory called with category:', category);
        console.log('Available projectsData keys:', Object.keys(this.projectsData));
        console.log('Available categories:', [...new Set(Object.values(this.projectsData).map(p => p.category))]);
        
        const filteredProjects = Object.values(this.projectsData).filter(project => 
            project.category === category
        );
        
        console.log('Filtered projects for category:', category, filteredProjects);
        return filteredProjects;
    }

    // Get project by ID
    getProjectById(id) {
        return this.projectsData[id];
    }

    // Render projects to HTML
    renderProjects(containerId, category) {
        console.log('renderProjects called with containerId:', containerId, 'category:', category);
        
        const container = document.getElementById(containerId);
        if (!container) {
            console.error('Container not found:', containerId);
            return;
        }

        const projects = this.getProjectsByCategory(category);
        console.log('Projects found for category:', category, projects.length);
        
        if (projects.length === 0) {
            container.innerHTML = '<p>لا توجد مشاريع في هذا القسم</p>';
            return;
        }

        // Show loading indicator
        container.innerHTML = '<div class="loading-projects">جاري تحميل المشاريع...</div>';
        
        // Use requestAnimationFrame for smooth rendering
        requestAnimationFrame(() => {
            const projectCardsHTML = projects.map(project => this.createProjectCard(project)).join('');
            container.innerHTML = projectCardsHTML;
            
            // Initialize AOS after rendering
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }
        });
    }

    // Create project card HTML
    createProjectCard(project) {
        const firstImage = project.images[0] || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
        const delay = Math.floor(Math.random() * 200); // Reduced delay for faster animation

        return `
            <div class="project-card" data-aos="fade-up" data-aos-delay="${delay}">
                <div class="project-image">
                    <img src="${firstImage}" alt="${project.title}" loading="lazy" decoding="async" 
                         onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg=='">
                    <div class="project-overlay">
                        <button class="view-project-btn" onclick="openProjectModal('${project.id}')" title="عرض صور المشروع">
                            <i class="fas fa-images"></i>
                            </button>
                    </div>
                </div>
                <div class="project-info">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-details">
                        <span class="detail-item">
                            <i class="fas fa-palette"></i>
                            ${project.details.style}
                        </span>
                    </div>
                </div>
            </div>
        `;
    }

    // Inject CSS for view project button
    injectViewButtonCSS() {
        if (document.getElementById('view-button-css')) return;
        
        const style = document.createElement('style');
        style.id = 'view-button-css';
        style.textContent = `
            .view-project-btn {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border: none;
                border-radius: 50%;
                width: 60px;
                height: 60px;
                cursor: pointer;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 20px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            }
            
            .view-project-btn:hover {
                transform: scale(1.1);
                box-shadow: 0 6px 20px rgba(0,0,0,0.4);
            }
            
            .view-project-btn i {
                color: white;
                font-size: 20px;
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize project loader
const projectLoader = new ProjectLoader();

// Load projects when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    console.log('project_loader.js: DOMContentLoaded fired');
    
    try {
        await projectLoader.loadAllProjects();
        console.log('project_loader.js: All projects loaded successfully');
        
        // Auto-render based on current page
        const currentPage = window.location.pathname.split('/').pop().replace('.html', '');
        console.log('project_loader.js: Current page:', currentPage);
        
        if (currentPage.includes('wooden-kitchens') || currentPage === 'wooden-kitchens') {
            console.log('project_loader.js: Rendering wooden-kitchens projects');
            projectLoader.renderProjects('projects-grid', 'wooden-kitchens');
        } else if (currentPage.includes('wooden-dressing') || currentPage === 'wooden-dressing') {
            console.log('project_loader.js: Rendering wooden-dressing projects');
            projectLoader.renderProjects('projects-grid', 'wooden-dressing');
        } else if (currentPage.includes('wooden-toilet-units') || currentPage === 'wooden-toilet-units') {
            console.log('project_loader.js: Rendering wooden-toilet-units projects');
            projectLoader.renderProjects('projects-grid', 'wooden-toilet-units');
        } else if (currentPage.includes('wooden-laundry') || currentPage === 'wooden-laundry') {
            console.log('project_loader.js: Rendering wooden-laundry projects');
            projectLoader.renderProjects('projects-grid', 'wooden-laundry');
        } else if (currentPage.includes('wooden-kitchenette') || currentPage === 'wooden-kitchenette') {
            console.log('project_loader.js: Rendering wooden-kitchenette projects');
            projectLoader.renderProjects('projects-grid', 'wooden-kitchenette');
        } else if (currentPage.includes('wooden-others') || currentPage === 'wooden-others') {
            console.log('project_loader.js: Rendering wooden-others projects');
            projectLoader.renderProjects('projects-grid', 'wooden-others');
        } else if (currentPage.includes('interior-design') || currentPage === 'interior-design') {
            console.log('project_loader.js: Rendering interior-design-design projects');
            projectLoader.renderProjects('projects-grid', 'interior-design-design');
        } else if (currentPage.includes('site-projects') || currentPage === 'site-projects') {
            console.log('project_loader.js: Rendering interior-design-site projects');
            projectLoader.renderProjects('projects-grid', 'interior-design-site');
        } else if (currentPage.includes('wooden-kitchens') || currentPage === 'wooden-kitchens') {
            console.log('project_loader.js: Rendering wooden-kitchens projects');
            projectLoader.renderProjects('projects-grid', 'wooden-kitchens');
        } else if (currentPage.includes('wooden-dressing') || currentPage === 'wooden-dressing') {
            console.log('project_loader.js: Rendering wooden-dressing projects');
            projectLoader.renderProjects('projects-grid', 'wooden-dressing');
        }
    } catch (error) {
        console.error('project_loader.js: Error loading projects:', error);
    }
});

// Export for global use
window.projectLoader = projectLoader;
