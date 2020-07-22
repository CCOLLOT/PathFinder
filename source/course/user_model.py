import uuid
from source.db_sql import db


class UserModel(db.Model):
    user_id = db.Column(db.String(80), primary_key=True)
    username = db.Column(db.String(25), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(300))

    # paths = db.relationship('PathModel', backref='path', lazy=True)

    def init(self, user_id, username, email, password):
        self.user_id = user_id
        self.username = username
        self.email = email
        self.password = password

    @classmethod
    def get_by_id(cls, user_id):
        return cls.query.filter_by(user_id=user_id).first()

    @classmethod
    def get_by_name(cls, username):
        return cls.query.filter_by(username=username).first()

    @classmethod
    def get_by_email(cls, email):
        return cls.query.filter_by(email=email).first()

    def json_repr(self):
        return {"user_id": self.user_id,
                "username": self.username,
                "email": self.email}

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.remove(self)
        db.session.commit()
