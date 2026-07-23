function spareshipApp(pageConfig = {}) {
    return {
        // State
        sidebarOpen: false,
        filters: {
            vehicle: { brand: '', model: '', year: '' },
            stores: [],
            category: 'All Categories',
            vehicleType: 'All Vehicle Types',
            price: { min: 150, max: 15000 },
            city: 'Bengaluru, KA',
            headerStore: 'All Stores', // Added for consistency with header search
        },
        price: { min: 150, max: 15000 },
        megaMenuOpen: false,
        activeMegaMenu: null,
        activeParentCategory: null,
        product: null,
        buyBoxWinner: null,

        // Data
        megaMenuData: {
            '2-Wheeler Parts': {
                'Engine Parts': ['Air Filter', 'Axle', 'Bolt', 'Cam Shaft', 'Carburetor Parts', 'Chain Adjuster', 'Chain Cover', 'Chain Guide', 'Clutch Parts', 'Gear Lever', 'Kick', 'O Ring', 'Rocker Set', 'Sprocket'],
                'Braking Systems': ['Brake Cam', 'Brake Pedal', 'Brake Rod', 'Brake Shoe', 'Disk Brake Parts'],
                'Suspension & Steering': ['Centre Stand', 'Footrest', 'Fork', 'Handle Bar Parts', 'Head Dowell Kit', 'Hub Plate', 'Shocker Bush', 'Side Stand', 'Cush Rubber'],
                'Electricals & Electronics': ['Electrical Parts', 'Fan Assy', 'H.L. Bracket', 'H.L. Doom', 'Indicator Stay', 'Self Start Parts', 'Speedometer Parts'],
                'Body & Accessories': ['Accessories', 'Centre Mat', 'Clamp', 'Graphics', 'Grip', 'Mudguard', 'Number Plate', 'Seat Parts', 'Silencer Parts', 'Tool Box'],
                'Fluids & Consumables': ['Petrol Pipe', 'Spring', 'Washer']
            },
            '4-Wheeler Parts': {
                'Engine & Drivetrain': ['Air Filter', 'Clutch Parts', 'Gear Parts'],
                'Braking Systems': ['Brake Pads', 'Brake Discs', 'Brake Caliper'],
                'Suspension & Steering': ['Shock Absorber', 'Control Arm', 'Tie Rod End'],
                'Electricals & Electronics': ['Alternator', 'Starter Motor', 'ECU'],
                'Body & Lighting': ['Headlight', 'Taillight', 'Bumper', 'Fender'],
                'Fluids & Consumables': ['Engine Oil', 'Coolant', 'Brake Fluid']
            },
            'EV Parts': {
                'Powertrain & Motors': ['Electric Motor', 'Controller', 'Inverter'],
                'Battery & BMS': ['Battery Pack', 'BMS', 'Cell Modules'],
                'Charging Systems': ['On-Board Charger', 'Charging Port'],
                'EV Electricals & Controllers': ['DC-DC Converter', 'Vehicle Control Unit'],
                'Chassis & Brakes': ['Regenerative Braking System', 'EV-specific Brake Pads']
            }
        },
        vehicleTypes: ['2-Wheeler', '4-Wheeler', 'EV'],
        categoryData: {
           '2-Wheeler': [ 'Engine Parts', 'Braking Systems', 'Suspension & Steering', 'Electricals & Electronics', 'Body & Frame', 'Fluids & Consumables' ],
           '4-Wheeler': [ 'Engine & Drivetrain', 'Braking Systems', 'Suspension & Steering', 'Electricals & Electronics', 'Body & Lighting', 'Fluids & Consumables' ],
           'EV': [ 'Powertrain & Motors', 'Battery & BMS', 'Charging Systems', 'EV Electricals & Controllers', 'Chassis & Brakes' ]
        },
        vehicleData: {
            '2-Wheeler': {
                'Royal Enfield': { 'Classic 350': ['2023', '2022', '2021'], 'Himalayan': ['2023', '2022'], },
                'TVS': { 'NTORQ EV': ['2023', '2022'], 'Apache RTR 160': ['2023', '2022'], },
                'Hero': { 'Splendor': ['2023', '2022', '2021'], 'XPulse 200': ['2023', '2022'], }
            },
            '4-Wheeler': {
                'Maruti Suzuki': { 'Swift': ['2023', '2022', '2021'], 'Baleno': ['2023', '2022'], },
                'Hyundai': { 'i20': ['2023', '2022', '2021'], 'Creta': ['2023', '2022'], },
                'Tata': { 'Nexon': ['2023', '2022', '2021'], 'Tiago': ['2023', '2022'], }
            },
            'EV': {
                'Ola Electric': { 'S1 Pro': ['2023', '2022'], 'S1 Air': ['2023'], },
                'Ather': { '450X': ['2023', '2022'], '450 Plus': ['2023', '2022'], },
                'Bajaj EV': { 'Chetak': ['2023', '2022'], }
            }
        },
        cities: ['Bengaluru, KA', 'Mumbai, MH', 'Delhi, DL', 'Chennai, TN', 'Kolkata, WB'],
        stores: ["Fixwell Motors", "Supreme Spares", "Geeta Auto"],
        products: [
            { sku: 'RE-CLUTCH-350', name: 'Clutch Plate Assembly', category: 'Engine Parts', vehicleType: '2-Wheeler', compatibility: ['Royal Enfield', 'Classic 350'], image: 'https://placehold.co/600x400/e2e8f0/334155?text=Clutch+Plate', sellers: [{ name: 'Fixwell Motors', price: 1200, stock: 5 }, { name: 'Supreme Spares', price: 1250, stock: 8 }, { name: 'Geeta Auto', price: 1220, stock: 3 }] },
            { sku: 'RE-BRAKE-PAD-F', name: 'Front Brake Pads', category: 'Braking Systems', vehicleType: '2-Wheeler', compatibility: ['Royal Enfield', 'Classic 350', 'Himalayan'], image: 'https://placehold.co/600x400/e2e8f0/334155?text=Brake+Pads', sellers: [{ name: 'Fixwell Motors', price: 750, stock: 12 }, { name: 'Geeta Auto', price: 780, stock: 15 }] },
            { sku: 'TVS-BMS-NTORQ', name: 'Battery Management System (BMS)', category: 'Battery & BMS', vehicleType: 'EV', compatibility: ['TVS', 'NTORQ EV'], image: 'https://placehold.co/600x400/e2e8f0/334155?text=BMS', sellers: [{ name: 'Supreme Spares', price: 8500, stock: 4 }, { name: 'Fixwell Motors', price: 8750, stock: 2 }] },
            { sku: 'TVS-MOTOR-CTRL', name: 'Motor Controller Unit', category: 'EV Electricals & Controllers', vehicleType: 'EV', compatibility: ['TVS', 'NTORQ EV'], image: 'https://placehold.co/600x400/e2e8f0/334155?text=Motor+Controller', sellers: [{ name: 'Supreme Spares', price: 14500, stock: 3 }] },
            { sku: 'HERO-SPL-CHAIN', name: 'Chain Sprocket Kit', category: 'Engine Parts', vehicleType: '2-Wheeler', compatibility: ['Hero', 'Splendor'], image: 'https://placehold.co/600x400/e2e8f0/334155?text=Chain+Sprocket', sellers: [{ name: 'Geeta Auto', price: 950, stock: 30 }, { name: 'Fixwell Motors', price: 980, stock: 25 }, { name: 'Supreme Spares', price: 960, stock: 40 }] },
            { sku: 'HERO-HEADLIGHT-ASSY', name: 'Headlight Assembly', category: 'Body & Frame', vehicleType: '2-Wheeler', compatibility: ['Hero', 'Splendor'], image: 'https://placehold.co/600x400/e2e8f0/334155?text=Headlight', sellers: [{ name: 'Geeta Auto', price: 1100, stock: 18 }] },
            { sku: 'MS-SWIFT-FILTER', name: 'Air Filter', category: 'Engine & Drivetrain', vehicleType: '4-Wheeler', compatibility: ['Maruti Suzuki', 'Swift'], image: 'https://placehold.co/600x400/e2e8f0/334155?text=Air+Filter', sellers: [{ name: 'Supreme Spares', price: 450, stock: 20 }] },
        ],

        // Computed Properties
        get availableBrands() {
            const vt = this.filters.vehicleType;
            if (this.vehicleData && this.vehicleData[vt]) {
                return Object.keys(this.vehicleData[vt]);
            }
            return [];
        },
        get availableModels() {
            const vt = this.filters.vehicleType;
            const brand = this.filters.vehicle.brand;
            if (brand && this.vehicleData[vt] && this.vehicleData[vt][brand]) {
                return Object.keys(this.vehicleData[vt][brand]);
            }
            // If no brand is selected, show all models for the vehicle type.
            if (vt && this.vehicleData[vt]) {
                const models = new Set();
                for (const brandKey in this.vehicleData[vt]) {
                    for (const model in this.vehicleData[vt][brandKey]) {
                        models.add(model);
                    }
                }
                return Array.from(models).sort();
            }
            return [];
        },
        get availableYears() {
            const vt = this.filters.vehicleType;
            const brand = this.filters.vehicle.brand;
            const model = this.filters.vehicle.model;
            if (brand && model && this.vehicleData[vt] && this.vehicleData[vt][brand] && this.vehicleData[vt][brand][model]) {
                return this.vehicleData[vt][brand][model];
            }
            // Otherwise, show all possible years for the vehicle type.
            if (vt && this.vehicleData[vt]) {
                const years = new Set();
                for (const brandKey in this.vehicleData[vt]) {
                    for (const modelKey in this.vehicleData[vt][brandKey]) {
                        this.vehicleData[vt][brandKey][modelKey].forEach(year => years.add(year));
                    }
                }
                return Array.from(years).sort((a, b) => b - a);
            }
            return [];
        },
        get availableCategories() {
            if (this.filters.vehicleType && this.categoryData[this.filters.vehicleType]) {
                return this.categoryData[this.filters.vehicleType];
            }
            const allCategories = Object.values(this.categoryData).flat();
            return [...new Set(allCategories)].sort();
        },
        get filteredProducts() {
            return this.products
                .map(p => ({ ...p, lowestPrice: Math.min(...p.sellers.map(s => s.price)) }))
                .filter(p => {
                    const vehicleTypeMatch = this.filters.vehicleType === 'All Vehicle Types' || p.vehicleType === this.filters.vehicleType;
                    const categoryMatch = this.filters.category === 'All Categories' || p.category === this.filters.category;
                    const brandMatch = !this.filters.vehicle.brand || p.compatibility.includes(this.filters.vehicle.brand);
                    const modelMatch = !this.filters.vehicle.model || p.compatibility.includes(this.filters.vehicle.model);
                    const yearMatch = !this.filters.vehicle.year || p.compatibility.includes(this.filters.vehicle.year);
                    const priceMatch = p.lowestPrice >= this.filters.price.min && p.lowestPrice <= this.filters.price.max;
                    const storeMatch = this.filters.stores.length === 0 || p.sellers.some(s => this.filters.stores.includes(s.name));
                    
                    return vehicleTypeMatch && categoryMatch && brandMatch && modelMatch && yearMatch && priceMatch && storeMatch;
                })
                .sort((a, b) => a.lowestPrice - b.lowestPrice);
        },
        activeMegaMenuData() {
            return this.megaMenuData[this.activeMegaMenu] || {};
        },
        activeSubCategories() {
            if (this.activeParentCategory && this.activeMegaMenuData()[this.activeParentCategory]) {
                return this.activeMegaMenuData()[this.activeParentCategory];
            }
            const firstParent = Object.keys(this.activeMegaMenuData())[0];
            return firstParent ? this.activeMegaMenuData()[firstParent] : [];
        },

        // Methods
        slugify(text) {
            if (!text) return '';
            return text.toString().toLowerCase()
                .replace(/\s+/g, '-')           // Replace spaces with -
                .replace(/&/g, 'and')          // Replace & with 'and'
                .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
                .replace(/\-\-+/g, '-');        // Replace multiple - with single -
        },
        openMegaMenu(menu) {
            this.megaMenuOpen = true;
            this.activeMegaMenu = menu;
            this.activeParentCategory = Object.keys(this.activeMegaMenuData())[0];
        },
        closeMegaMenu() {
            this.megaMenuOpen = false;
        },
        setActiveParentCategory(parent) { this.activeParentCategory = parent; },

        // Initialization
        init() {
            // Load filters from session storage
            const savedFilters = sessionStorage.getItem('spareshipFilters');
            if (savedFilters) {
                const parsedFilters = JSON.parse(savedFilters);
                this.filters = {
                    ...this.filters,
                    ...parsedFilters,
                    vehicle: { ...this.filters.vehicle, ...(parsedFilters.vehicle || {}) },
                    price: { ...this.filters.price, ...(parsedFilters.price || {}) },
                    stores: Array.isArray(parsedFilters.stores) ? parsedFilters.stores : [],
                    headerStore: parsedFilters.headerStore || 'All Stores', // Load headerStore
                };
            } else {
                this.filters.stores = [];
            }

            // Apply page-specific config passed from x-data
            this.filters.vehicleType = pageConfig.vehicleType || this.filters.vehicleType || 'All Vehicle Types';
            this.filters.category = pageConfig.category || this.filters.category || 'All Categories';

            // Handle product detail page logic
            if (pageConfig.isProductPage) {
                this.initProductPage();
            }

            // Watchers
            this.$watch('JSON.stringify(filters)', (value) => {
                sessionStorage.setItem('spareshipFilters', value);
            });

            this.$watch('filters.vehicleType', (newVehicleType) => {
                // Reset category if it's not valid for the new vehicle type
                if (newVehicleType !== 'All Vehicle Types' && this.filters.category !== 'All Categories') {
                    if (!this.categoryData[newVehicleType].includes(this.filters.category)) {
                        this.filters.category = 'All Categories';
                    }
                }
                // Reset vehicle selection when vehicle type changes
                this.filters.vehicle.brand = '';
                this.filters.vehicle.model = '';
                this.filters.vehicle.year = '';
            });

            this.$watch('filters.vehicle.brand', (newBrand) => {
                // Reset model if it's not valid for the new brand
                const currentModel = this.filters.vehicle.model;
                if (currentModel && (!this.vehicleData[this.filters.vehicleType] || !this.vehicleData[this.filters.vehicleType][newBrand] || !this.vehicleData[this.filters.vehicleType][newBrand][currentModel])) {
                    this.filters.vehicle.model = '';
                }
            });

            this.$watch('filters.vehicle.model', (newModel) => {
                const brand = this.filters.vehicle.brand;
                // Reset year if it's not valid for the new model
                if (brand && newModel && this.filters.vehicle.year && (!this.vehicleData[this.filters.vehicleType][brand][newModel] || !this.vehicleData[this.filters.vehicleType][brand][newModel].includes(this.filters.vehicle.year))) {
                    this.filters.vehicle.year = '';
                }
            });
        },

        initProductPage() {
            const params = new URLSearchParams(window.location.search);
            const sku = params.get('sku');
            
            const foundProduct = this.products.find(p => p.sku === sku);
            
            if (foundProduct) {
                this.product = foundProduct;
                document.title = `Buy ${this.product.name} | Spareship`;
                
                // Mock proximity by adding a random distance property to each seller
                this.product.sellers.forEach((s, i) => {
                    s.distance = (i + 1) * Math.random() * 2.5;
                });

                // Find buy box winner (lowest price first, then closest distance)
                this.buyBoxWinner = [...this.product.sellers].sort((a, b) => {
                    if (a.price < b.price) return -1;
                    if (a.price > b.price) return 1;
                    return a.distance - b.distance;
                })[0];
            }
        }
    }
}