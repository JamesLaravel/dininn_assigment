const treasure = require('./treasures');
const users = require('./user');

const useRouter = (app) => {

    const routeDefinitions = [
        treasure,
        users,
    ];

    for(let i = 0; i < routeDefinitions.length; i += 1){
        const router = routeDefinitions[i];
        app.use('/api/', router);
    }
    
}

module.exports = useRouter;