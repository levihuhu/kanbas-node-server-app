
import cors from 'cors';
import express from 'express';
import HelloRoutes from './hello.js';
import Lab5 from './lab5.js';
import CourseRoutes
 from './courses/routes.js';   
 import ModuleRoutes from './modules/routes.js'; 
 import AssignmentRoutes from './assignments/routes.js';
 import "dotenv/config";



const app = express();
app.use(cors());
app.use(express.json());
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
Lab5(app);      
HelloRoutes(app);
app.listen(process.env.PORT || 4000);

