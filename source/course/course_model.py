from source.db_sql import db


class CourseModel(db.Model):
    __tablename__ = "course"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), nullable=False)
    author = db.Column(db.String(80), nullable=False)
    link = db.Column(db.String(80), nullable=False)
    category = db.Column(db.String(80))
    path_id = db.Column(db.Integer, db.ForeignKey('path.id'), nullable=False)

    def __init__(self, title, author, link, path_id):
        self.title = title
        self.author = author
        self.link = link
        self.path_id = path_id

    @classmethod
    def get_all(cls):
        return cls.query.all()

    @classmethod
    def get_by_title(cls, title):
        return cls.query.filter_by(title=title).first()

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
        return {"course_id": self.id, "title": self.title, "author": self.author, "category" : self.category, "link": self.link, "path_id": self.path_id}
