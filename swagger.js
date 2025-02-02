import swaggerAutogen from 'swagger-autogen';
const swagger=swaggerAutogen();

const doc = {
    info: {
      title: 'cms API',
      description: 'API documentation for the claim management system',
    },
    host: 'localhost:5000',
    tags:[
        {
            name:"User",
            description:"User routes"
        },
        {
            name:"Policy",
            description:"Policy routes"
        },
        {
            name:"Claim",
            description:"Claim routes"
        },
        {
            name:"Admin",
            description:"Admin routes"
        }
    ],
  };
  
  const outputFile = './swagger-output.json';
  const routes = ['./server.js'];
  
  /* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
  root file where the route starts, such as index.js, app.js, routes.js, etc ... */
  
  swagger(outputFile, routes, doc);