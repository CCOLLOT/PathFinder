import os
from flask import Flask,jsonify, render_template
from flask_restful import Api
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)
from source.db_sql import db
from source.course.course_resource import Course, Courses
from source.course.path_resource import Path, Paths
from source.course.user_resource import User, UserRegister, UserLogin, TokenRefresh

app = Flask(__name__, static_folder="./react_app/build", static_url_path="/")
api = Api(app)

app.config['PROPAGATE_EXCEPTIONS'] = True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get("DATABASE_URL", 'sqlite:///data.db')
app.config['JWT_SECRET_KEY'] = os.environ.get("JWT_SK", "mysecret")  # Change this!
#app.config['JWT_REFRESH_TOKEN_EXPIRES'] ??
jwt = JWTManager(app)

@app.before_first_request
def create_tables():
    db.create_all()

db.init_app(app)

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/aloha')
def testfunction():
    return {'hello':'haha'}

api.add_resource(Course, '/api/course/<title>')
api.add_resource(Courses, '/api/course')
api.add_resource(Path, '/api/path/<title>')
api.add_resource(Paths, '/api/path')
api.add_resource(User, '/api/user/<user_id>')
api.add_resource(UserRegister, '/api/register')
api.add_resource(UserLogin, '/api/login')
api.add_resource(TokenRefresh, '/api/refresh')

app.route('/test')
def testroute():
    return jsonify({"test":"aaa"})

if __name__ == "__main__":

    app.run(debug=True, port=5000)