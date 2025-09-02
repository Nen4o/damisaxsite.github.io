const router = require('express').Router();


router.get('/', (req, res) => {
    const data = {
        title: 'Damisaxx - Jazz Saxophone',
        videoUrl: "/215069_small.mp4",
        musician: {
            name: 'Damisaxx',
            instrument: 'Saxophone',
            genre: 'Jazz',
            experience: '15+ years',
            location: 'Troyan'
        },
        about: {
            description: 'Аз съм Дамян Вахнянски, 18 години, и свиря на саксофон от дете. Започнах на 11-годишна възраст в Общинския духов оркестър в Троян, а през 2023 г.станах част от джаз формацията Jazztet.Музиката ме отведе от уличните сцени до първите ми солови концерти в Desizo Monni и до участия в сватби, рождени дни и културни събития. Моят стил съчетава популярни мелодии и изискан джаз – музика, която създава спокойна и елегантна атмосфера.',
            highlights: [
                'Berklee College of Music Graduate',
                'Featured at Blue Note NYC',
                'Recorded with Grammy-winning artists',
                'Regular performer at Lincoln Center',
                'Private instructor for 10+ years'
            ]
        },
        reviews: [
            {
                name: 'Sarah & David Miller',
                event: 'Wedding Reception',
                rating: 5,
                text: 'Marcus made our wedding absolutely magical. His jazz interpretations of our favorite songs had everyone mesmerized. Truly a master of his craft.',
                date: 'October 2024'
            },
            {
                name: 'Corporate Events Inc.',
                event: 'Company Gala',
                rating: 5,
                text: 'Professional, punctual, and incredibly talented. Marcus elevated our corporate event to something truly special. Our guests are still talking about his performance.',
                date: 'September 2024'
            },
            {
                name: 'The Roosevelt Hotel',
                event: 'Jazz Night Series',
                rating: 5,
                text: 'Marcus is a regular favorite at our jazz nights. His ability to read the room and adapt his performance is unmatched. A true professional.',
                date: 'August 2024'
            }
        ],
        pricing: [
            {
                title: 'Solo Performance',
                duration: '2-3 hours',
                price: '$800-1,200',
                features: [
                    'Professional sound system included',
                    'Repertoire of 100+ jazz standards',
                    'Custom song arrangements available',
                    'Professional attire'
                ]
            },
            {
                title: 'Duo Performance',
                duration: '2-3 hours',
                price: '$1,400-1,800',
                features: [
                    'Saxophone + Piano/Guitar',
                    'Enhanced musical arrangements',
                    'Professional sound system',
                    'Coordinated performance attire',
                    'Special requests accommodated'
                ]
            },
            {
                title: 'Wedding Package',
                duration: '4-5 hours',
                price: '$2,000-2,800',
                features: [
                    'Ceremony processional music',
                    'Cocktail hour performance',
                    'Reception entertainment',
                    'Microphone for announcements',
                    'Custom song learning (3 songs max)'
                ]
            }
        ]
    };

    res.render('index', data);
})



module.exports = router;