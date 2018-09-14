from main import mainView

def init(app):
    print("init main")
    app = mainView.init(app)
    return app