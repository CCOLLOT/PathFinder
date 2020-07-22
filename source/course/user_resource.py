from flask_restful import Resource, reqparse
from source.course.user_model import UserModel
from werkzeug.security import safe_str_cmp
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, jwt_refresh_token_required, \
    get_jwt_identity
import bcrypt
import uuid
import re

_user_parser = reqparse.RequestParser()
_user_parser.add_argument("username", type=str, required=False, help="Enter username")
_user_parser.add_argument("email", type=str, required=False, help="Enter email")
_user_parser.add_argument("identifier", type=str, required=False, help="Enter identifier")
_user_parser.add_argument("password", type=str, required=False, help="Enter password")


class User(Resource):
    @jwt_required
    def get(self, user_id):
        user = UserModel.get_by_id(user_id)
        if user:
            return user.json_repr()
        return {"message": "user not found"}, 404

    def delete(self, user_id):
        user = UserModel.get_by_id(user_id)
        if user:
            user.delete_from_db()
        return {"message": "user not found"}, 404


class UserRegister(Resource):

    def post(self):
        request_data = _user_parser.parse_args()
        user = UserModel.get_by_name(request_data["username"])
        if user:
            return {"message": "user already exists"}, 400
        new_user = UserModel(user_id=str(uuid.uuid4()),
                             username=request_data['username'],
                             email=request_data['email'],
                             password=request_data['password'].encode('utf-8'))
        new_user.password = bcrypt.hashpw(new_user.password, bcrypt.gensalt())
        print(new_user.json_repr())
        try:
            print("saving to db")
            new_user.save_to_db()
        except Exception as err:
            print(err)
            return {"message": err}, 500
        else:
            return {"message": "successfully added user to db"}, 201


class UserLogin(Resource):
    def post(self):
        request_data = _user_parser.parse_args()
        if (re.match(r".*@.*\.",request_data['identifier'])):
            print("mail")
            user = UserModel.get_by_email(request_data['identifier'])
        else:
            print("username")
            user = UserModel.get_by_name(request_data['identifier'])
        if user:
            if bcrypt.checkpw(request_data['password'].encode("utf-8"), user.password):
                access_token = create_access_token(identity=user.user_id, fresh=True)
                refresh_token = create_refresh_token(identity=user.user_id)
                return {"access_token": access_token,
                        "refresh_token": refresh_token}, 200
        return {"message": "invalid credentials"}, 400


class TokenRefresh(Resource):
    @jwt_refresh_token_required
    def get(self):
        current_user = get_jwt_identity()
        return {
                   'access_token': create_access_token(identity=current_user)
               }, 200
