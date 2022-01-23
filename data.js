const data = {
    categories: [
        {
            id: 1,
            name: 'Beverages',
            image: '/images/beverages.jpg',
            alt: 'Beverages',
            explain: 'Beverages',
            script: {
                details: 'Beverages',
                number: 10,
                src: '/images/beverages.jpg'
            }
        },
        {
            id: 2,
            name: 'Breakfast',
            image: '/images/breakfast.jpg',
            alt: 'Breakfast',
            explain: 'Breakfast',
            script: {
                details: 'Breakfast',
                number: 5,
                src: '/images/breakfast.jpg'
            }
        },
        {
            id: 3,
            name: 'Burgers',
            image: '/images/burgers.jpg',
            alt: 'Burgers',
            explain: 'Burgers',
            script: {
                details: 'Burgers',
                number: 25,
                src: '/images/burgers.jpg'
            }
        }
    ],
    products: [
        {
            category: 'Beverages',
            name: 'Coca-Cola',
            calorie: 120,
            price: 1,
            image: '/images/Coca-cola.jpg'
        },
        {
            category: 'Beverages',
            name: 'Pepsi',
            calorie: 120,
            price: 1,
            image: '/images/Pepsi.jpg'
        },
        {
            category: 'Beverages',
            name: 'Fanta',
            calorie: 120,
            price: 1,
            image: '/images/fanta.jpg'
        },
        {
            category: 'Beverages',
            name: 'Sprite',
            calorie: 120,
            price: 1,
            image: '/images/sprite.jpg'
        },
        {
            category: 'Beverages',
            name: 'Americano',
            calorie: 120,
            price: 1,
            image: '/images/americano.jpg'
        },
        {
            category: "Burgers",
            name: "Big-mac",
            calorie: 550,
            price: 4.5,
            image: '/images/bigmac.jpg'
        },
        {
            category: "Burgers",
            name: "Buffalo",
            calorie: 750,
            price: 5.5,
            image: '/images/buffalo-burger.jpg'
        },
        {
            category: "Burgers",
            name: "Cheese",
            calorie: 850,
            price: 5.8,
            image: '/images/cheese-burger.jpg'
        },
        {
            category: "Burgers",
            name: "Double",
            calorie: 850,
            price: 7.5,
            image: '/images/double-burger.jpg'
        },
        {
            category: "Burgers",
            name: "Black-Vegan",
            calorie: 450,
            price: 7.6,
            image: '/images/black-burger.jpg'
        }
    ]
}

module.exports = data;