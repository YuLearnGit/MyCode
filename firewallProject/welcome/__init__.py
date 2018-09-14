from welcome import welcomeView

def init(app):
    print("init welcome")
    app = welcomeView.init(app)
    return app