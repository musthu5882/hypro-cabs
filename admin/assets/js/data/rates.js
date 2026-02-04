/**
 * TARIFF RATES CONFIGURATION (FINAL UPDATED)
 * Path: admin/assets/js/data/rates.js
 */

const TARIFF_RATES = {
    "sedan": {
        name: "Sedan (Dzire/Etios)",
        intercity: { perKm: 36 },
        outstation: { perKm: 20 },
        local: {
            base: { price: 410, kms: 12.8, mins: 60 },
            tier1: { pricePerMin: 4.5, kmPerMin: 0.16 }, // Up to 8 hrs
            tier2: { pricePerMin: 4.0, kmPerMin: 0.22 }, // After 8 hrs
            extraKmRate: 18 // Per KM
        },
        multiday: {
            dailyRent: 2400,
            freeKmPerDay: 80,
            extraKmRate: 18,
            nightBata: 250
        }
    },
    "muv": {
        name: "MUV (Ertiga)",
        intercity: { perKm: 40 },
        outstation: { perKm: 22 },
        local: {
            base: { price: 490, kms: 12.8, mins: 60 },
            tier1: { pricePerMin: 5.5, kmPerMin: 0.16 },
            tier2: { pricePerMin: 5.0, kmPerMin: 0.25 },
            extraKmRate: 20 // Per KM
        },
        multiday: {
            dailyRent: 2800,
            freeKmPerDay: 80,
            extraKmRate: 20,
            nightBata: 300
        }
    }
};

console.log("✅ Rates Updated for Sedan & MUV (Ertiga)");
