import app from './app';
const API_PORT = process.env.API_PORT || 3000;


app.listen(API_PORT, ()=> {
    console.log(`API Iniciada na porta ${API_PORT}`);
});