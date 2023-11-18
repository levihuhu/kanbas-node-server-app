function HelloRoutes(app)
{


app.get('/', (req, res) => {
    res.send('Hello web');
});
app.get('/hello', (req, res) => {
    res.send('Hello life!');
}   
)
}
export default HelloRoutes;
