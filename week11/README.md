# Other ideas...

If you're using React router, you can allow any path to load the application, with something similar to the following:

    app.get('/**', (req, res, next) => {
        if (req.path.startsWith('/api/'))
            next();
        else
            res.sendFile(
                path.join(
                    __dirname, 
                    '../withreact/build/index.html'
                )
            );
    });

Other deployment strategies:

- Reverse proxy (Nginx)
- Docker / Docker Compose / Kubernetes
- Serverless
- Heroku
