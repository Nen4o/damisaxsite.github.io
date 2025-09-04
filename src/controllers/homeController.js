const router = require('express').Router();

const { createReview, getAllReviews } = require('../services/reviewServices');

router.get('/', async (req, res) => {
    const data = {
        title: 'Damisaxx - Джаз Саксофонист',
        videoUrl: "/215069_small.mp4",
        musician: {
            name: 'DAMISAXX',
            instrument: 'Саксофон',
            genre: 'pop & jazz',
            experience: '2+ години',
            location: 'Троян'
        },
        about: {
            description: 'Аз съм Дамян Вахнянски, 18 години, и свиря на саксофон от дете. Започнах на 11-годишна възраст в Общинския духов оркестър в Троян, а през 2023 г. станах част от джаз формацията Jazztet. Музиката ме отведе от уличните сцени до първите ми солови концерти в ресторант "Desizo Monni" и до участия в сватби, рождени дни и културни събития. Моят стил съчетава популярни мелодии и изискан джаз – музика, която създава спокойна и елегантна атмосфера.',
            // highlights: [
            //     'Berklee College of Music Graduate',
            //     'Featured at Blue Note NYC',
            //     'Recorded with Grammy-winning artists',
            //     'Regular performer at Lincoln Center',
            //     'Private instructor for 10+ years'
            // ]
        },
        // reviews: [
        //     {
        //         name: 'Sarah & David Miller',
        //         event: 'Wedding Reception',
        //         rating: 5,
        //         text: 'Marcus made our wedding absolutely magical. His jazz interpretations of our favorite songs had everyone mesmerized. Truly a master of his craft.',
        //         date: 'October 2024'
        //     },
        //     {
        //         name: 'Corporate Events Inc.',
        //         event: 'Company Gala',
        //         rating: 5,
        //         text: 'Professional, punctual, and incredibly talented. Marcus elevated our corporate event to something truly special. Our guests are still talking about his performance.',
        //         date: 'September 2024'
        //     },
        //     {
        //         name: 'The Roosevelt Hotel',
        //         event: 'Jazz Night Series',
        //         rating: 5,
        //         text: 'Marcus is a regular favorite at our jazz nights. His ability to read the room and adapt his performance is unmatched. A true professional.',
        //         date: 'August 2024'
        //     }
        // ],
        pricing: [
            {
                title: '✨ Пакет "Музикален акцент"',
                duration: 'От 3 парчета до 45 минути музика',
                price: '100 лв. + транспорт',
                features: [
                    'Частни събития',
                    'Домашни партита',
                    'Романтични вечери',
                    'Изненади'
                ]
            },
            {
                title: '🥂 Пакет „Welcome Drink“',
                duration: '45 мин. до 1 ч. 30 мин.',
                price: '200 лв. + транспорт',
                features: [
                    'Сватби',
                    'Кръщенета',
                    'Корпоративни събития',
                    'Стилни поводи',
                    // 'Special requests accommodated'
                ],
                popular: true,
            },
            {
                title: '🌙 Пакет „Дълга вечер“',
                duration: '50 лв. за всеки следващ час',
                price: '150 лв. за първия час',
                features: [
                    'Фонова музика за ресторанти и барове',
                    // 'Cocktail hour performance',
                    // 'Reception entertainment',
                    // 'Microphone for announcements',
                    // 'Custom song learning (3 songs max)'
                ],
                conditions: "Осигурена храна и напитки от заведението + транспорт"
            },

        ]
    };

    const reviews = await getAllReviews().lean();
    res.render('index', { reviews, data });
})


router.post('/add-review', async (req, res) => {
    console.log(req.body);
    const data = req.body;
    const dateStr = data.date;
    const date = new Date(dateStr);

    const isDate = req.body.date != 'NaN-NaN-NaN'
    console.log(date);
    console.log(isDate);

    let formattedDate = '';
    if (date != 'Invalid Date') {

        const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is 0-based
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();

        formattedDate = `${month}-${day}-${year}`;

    }


    const reviewData = {
        name: data.name,
        event: data.event,
        rating: data.rating,
        text: data.review,
        date: isDate ? formattedDate : '',
    }

    console.log(reviewData);

    await createReview(reviewData);

    res.redirect('/#reviews')
})

module.exports = router;