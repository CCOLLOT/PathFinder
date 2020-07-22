from source.db_sql import db


class PathModel(db.Model):
    __tablename__ = "path"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), nullable=False)
    author = db.Column(db.String(80), nullable=False)
    courses = db.relationship('CourseModel', backref='path', lazy=True)

    def __init__(self, title, author):
        self.title = title
        self.author = author

    @classmethod
    def get_all(cls):
        return cls.query.all()

    @classmethod
    def get_by_title(cls, title):
        return cls.query.filter_by(title=title).first()

    @classmethod
    def get_by_username(cls, username):
        return cls.query.filter_by(author=username)

    @classmethod
    def get_by_id(cls, _id):
        return cls.query.filter_by(id=_id).first()

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()

    def json_repr(self):
        return {"path_id": self.id, "title": self.title, "author": self.author, "courses": [course.json_repr()  for course in self.courses]}
