from flask_restful import Resource, reqparse
from source.course.path_model import PathModel


class Paths(Resource):
    def get(self):
        return {"paths": [course.json_repr() for course in PathModel.get_all()]}


class Path(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("author", type=str, required=False, help="Enter author")
    parser.add_argument("path_id", type=str, required=False, help="Enter path_id")

    def get(self, title):
        """retrieve a course by name"""
        course_found = PathModel.get_by_title(title)
        if course_found:
            return course_found.json_repr()
        return {"message:", "course not found"}

    def post(self, title):
        """posts a course by name if not exists"""
        item = PathModel.get_by_title(title)
        if item:
            return {"message": "a path with this title already exists"}, 400
        try:
            request_data = Path.parser.parse_args()
            del request_data['path_id']
            new_path = PathModel(title, **request_data)
            print(new_path)
            new_path.save_to_db()
        except Exception as err:
            return {"message": "error creating the path, {}".format(err)}, 500

        return new_path.json_repr(), 201

    def put(self, title):
        """update a course by title"""
        pass

    def delete(self, title):
        """delete a course by title"""
        request_data = Path.parser.parse_args()
        path_found = PathModel.get_by_id(request_data['path_id'])
        if path_found:
            for course in path_found.courses:
                course.delete_from_db()
            path_found.delete_from_db()
            return {"message": "deleted the path"}, 200

        return {"message": "path not found"}, 404