app_env = 'prod'

if __name__ == '__main__':
    if app_env == 'prod':
        from server import create_app
        app = create_app()
        # serve(app, host='0.0.0.0', port=5000)
        app.run( host='0.0.0.0', port=5000, debug=True)


    else:
        from server import create_app_dev
        app = create_app_dev()
        app.run( host='0.0.0.0', port=5000, debug=True)