// Real Soil Data for Karnataka Districts (Based on KSRSAC)
module.exports = {
    soilTypes: [
        {
            type: "Red Soil",
            districts: ["Bangalore Urban", "Bangalore Rural", "Kolar", "Tumakuru", "Chikkaballapur", "Ramanagara", "Mandya", "Mysore"],
            characteristics: "Well-drained, rich in iron, low in nitrogen and phosphorus",
            suitableCrops: ["Ragi", "Groundnut", "Cotton", "Maize", "Red Gram"]
        },
        {
            type: "Black Soil",
            districts: ["Belagavi", "Dharwad", "Gadag", "Bagalkot", "Vijayapura", "Kalaburagi", "Bidar", "Raichur", "Koppal", "Yadgir"],
            characteristics: "Clayey, moisture retentive, rich in calcium and magnesium",
            suitableCrops: ["Cotton", "Sugarcane", "Wheat", "Jowar", "Sunflower", "Chilli"]
        },
        {
            type: "Laterite Soil",
            districts: ["Dakshina Kannada", "Udupi", "Uttara Kannada", "Shivamogga", "Chikmagalur", "Kodagu"],
            characteristics: "Acidic, rich in iron and aluminum, well-drained",
            suitableCrops: ["Cashew", "Rubber", "Coffee", "Tea", "Coconut", "Areca nut"]
        },
        {
            type: "Alluvial Soil",
            districts: ["Raichur", "Kalaburagi", "Yadgir", "Vijayapura", "Bagalkot"],
            characteristics: "Fertile, rich in potash and lime, good for irrigation",
            suitableCrops: ["Paddy", "Sugarcane", "Wheat", "Tobacco", "Banana"]
        }
    ]
};