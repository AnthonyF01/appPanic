export const Service: any = {

    /**
     * Url of your Laravel Project
     */
    url: 'http://192.168.43.21:3000',
    apiUrl: 'http://192.168.43.21:3000/api',

    // local
    // url: 'http://127.0.0.1:3000',
    // apiUrl: 'http://127.0.0.1:3000/api',

    // local:wifi
    // url: 'http://192.168.0.19:3000',
    // apiUrl: 'http://192.168.0.19:3000/api',

    // heroku
    // url: 'http://scpjfamilia.herokuapp.com',
    // apiUrl: 'http://scpjfamilia.herokuapp.com/api',

    // vivircondignidad.com
    // url: 'http://vivircondignidad.com',
    // apiUrl: 'http://vivircondignidad.com/api',

    // familycachicatari.info
    // url: 'http://familycachicatari.info',
    // apiUrl: 'http://familycachicatari.info/api',

    /**
     * Info of your passport client, usually second record on table "oauth_clients" in your database, name "Laravel Password Grant Client"
     */
    passport: {
        'grant_type': 'password',
        'client_id': '2',
        'client_secret': 'IQzK5AB1wvm5pznrTqRkACMcOozV4SjqFtCSpKCH',        // scpjfamilia
        //'client_secret': '4jCfzJoaeSCgD3Fs0nkBbkV2hJfy1gskKm6VUhdY',      // laravelauthpassport
        // 'client_secret': 'aVn05S7kZRsCBZobVY6PIoJDv5bOt9cn8x6foLsG',        // scpjfamilia9
        // 'client_secret': 'Hn6UXWnEIb9CsfCh8C53w1SfAo1qdxonxkPPhS85',        // scpjfamilia-master
        // 'client_secret': 'n4krVf0L88E1FcIr7FGc8jDvXq5cyP6WguZZzWFV',        // heroku
        // 'client_secret': 'gjXvZfRVt7BFYaerlFj8ADWzeuxu2AfYsJBlV1yP',        // vivircondignidad.com
        // 'client_secret': '5oszYrkxmToWTwivYH3VF4E2QXtBwhjM3wWg1m2P',        // familycachicatari.info
    }

};