const register = (app, serviceLocator) => {

  app.get("/hello", (req, res) => {
    res.send("hello")
  })

  app.get("/api/templates", async (req, res, next) => {
    serviceLocator.get('issueTemplateController').index(req, res, next)
  });

  app.get("/api/templates/:template_id", async (req, res, next) => {
    serviceLocator.get('issueTemplateController').show(req, res, next)
  });
  
  app.post("/api/templates", async (req, res, next) => {
    serviceLocator.get('issueTemplateController').create(req, res, next)
  });
  
  app.delete("/api/templates/:template_id", async (req, res, next) => {
    serviceLocator.get('issueTemplateController').delete(req, res, next)
  })
  
  app.get("/api/issues", async (req, res, next) => {
    serviceLocator.get('issueController').index(req, res, next)
  });
  
  app.post("/api/issues", async (req, res, next) => {
    serviceLocator.get('issueController').create(req, res, next)
  });
};

export default { register }