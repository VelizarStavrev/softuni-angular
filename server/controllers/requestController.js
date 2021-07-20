const router = require('express').Router();

const productService = require('../services/productService');

const orderService = require('../services/orderService');

const authServices = require('../services/authService');

// Home
// 
router.get('/', (req, res) => {
    res.send('Default request received!');
});

// Test
router.get('/test', (req, res) => {
    const test = {
        testname: 'Tester',
        testnumber: 123,
        testbool: true
    }

    console.log('Test request received!');
    res.send(test);
});

// 
// Products
// Create new item
router.post('/create', (req, res) => {
    // let productData = {
    //     name: '', // Adidas XYZ 420
    //     type: '', // мъжки, женски, детски
    //     sizes: '', // [20, 50, 60, 70]
    //     rating: '', // 4.47
    //     votes: '', // 62 
    //     price: '', // 59.99
    //     discount: '', // 20
    //     description: '', // С голямо удоволствие Ви представяме тези маратонки на марката Adidas, създадени специално за да Ви осигурят максимално удобство по време на тренировка или разходка.   Изработени са от специални дишащи синтетични и текстилни материали, които гарантират за здравина и перфектна циркулация на въздуха във вътрешността на обувката.   Всички тези характеристики, както и уникалния дизайн, който може да видите на снимките, гарантират за това, че тези мъжки маратонки Adidas ще бъдат най-удобните, които сте носили някога.
    //     color: '', // Сив
    //     material: '', // Външна част - текстил и други материали, Вътрешна част - текстил
    // };

    let productData = {
        name: 'Clarks City Storm HI',
        type: 'Детски обувки',
        sizes: [20, 20.5, 21, 22],
        rating: 4.68,
        votes: 19,
        price: 109.99,
        discount: 64,
        description: 'Star Wars обединява сили с Clarks, създавайки този модел за най-малките фенове на поредицата. Марката отдава почит на дългоочаквания 9-ти епизод на Междузвездни войни - Възходът на Скайуокър.   Обувките са изработени изцяло от естествена кожа.  Декорирани са с щампа на войник - щурмовак, който е популярен образ от космическата сага.   City Storm HI притежава стабилна конструкция, подходяща за градски условия. Високата яка държи глезена стабилен. Велкро лепенките позволяват бързо и лесно обуване и събуване.   Равната подметка изолира от повърхността. Звездните детайли завършват цялостната визия.',
        color: 'Черен',
        material: 'Външна част - естествена кожа, Вътрешна част - текстил',
    };

    productService.create(productData)
        .then((product) => {
            console.log('Product created!');
            console.log(product);
            res.send(product);
        })
        .catch(err => {
            console.log(err);
            res.send('An error occured!');
        });
});

// Get all items
router.get('/getAll', (req, res) => {

    productService.getAll()
        .then((products) => {
            res.send(products);
        })
        .catch(err => {
            console.log(err);
            res.send('An error occured!');
        });
});

// Get one
router.get('/getOne/:productId', (req, res) => {
    productService.getOne(req.params.productId)
        .then(product => {
            res.send(product);
        })
        .catch(err => {
            console.log(err);
            res.send('An error occured!');
        });
});

router.get('/getOneType/:productType/:productLimit', (req, res) => {
    productService.getOneType(req.params.productType, req.params.productLimit)
        .then(product => {
            res.send(product);
        })
        .catch(err => {
            console.log(err);
            res.send('An error occured!');
        });
});

// Users
// 
// Register
router.post('/register', (req, res) => {
    
    const { email, password, name, phone } = req.body;

    authServices.register(email, password, name, phone)
        .then(() => {
            console.log('User registered!');
            res.json({ ok: { message: 'User registered!' }});
        })
        .catch(err => {
            console.log(err);
            res.json({ error: { message: 'An error occured!' } });
        });
});

// Login
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    authServices.login(email, password)
        .then(array => {
            res.status(200).json({
                token: array[0],
                userid: array[1],
                message: 'OK'
            });
        })
        .catch(err => {
            console.log(err);
            res.json({ error: { message: 'An error occured!' } });
        });
});

// Get one
router.get('/getOneUser/:userId', (req, res) => {
    authServices.getOneUser(req.params.userId)
        .then(user => {
            console.log(user);
            res.send(user);
        })
        .catch(err => {
            console.log(err);
            res.send('An error occured!');
        });
});

// Orders
// 
// Create new order
router.get('/getOrders/:id', (req, res) => {
    
    // res.send('received')
    orderService.getOrders(req.params.id)
        .then(orders => {
            res.send(orders);
        })
        .catch(err => {
            console.log(err);
            res.send('An error occured!');
        });
});

router.post('/createOrder', (req, res) => {
    
    let orderData = req.body;

    orderService.create(orderData)
        .then((order) => {
            console.log('Order created!');
            console.log(order);
            res.send(order);
        })
        .catch(err => {
            console.log(err);
            res.send('An error occured!');
        });
});



module.exports = router;