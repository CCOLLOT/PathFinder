from flask_restful import Resource, reqparse
from source.course.course_model import CourseModel


class Courses(Resource):
    def get(self):
        return {"courses": [course.json_repr() for course in CourseModel.get_all()]}


class Course(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("link", type=str, required=False, help="Enter link please")
    parser.add_argument("author", type=str, required=False, help="Enter author")
    parser.add_argument("course_id", type=str, required=False, help="Enter course_id")
    parser.add_argument("path_id", type=str, required=False, help="Enter path_id")

    def get(self, title):
        """retrieve a course by name"""
        course_found = CourseModel.get_by_title(title)
        if course_found:
            return course_found.json_repr()
        return {"message:", "course not found"}

    def post(self, title):
        """posts a course by name if not exists"""
        item = CourseModel.get_by_title(title)
        if item:
            return {"message": "a course with this title already exists"}, 400
        try:
            request_data = Course.parser.parse_args()
            del request_data['course_id']
            new_course = CourseModel(title, **request_data)
            new_course.save_to_db()
        except Exception as err:
            return {"message": "error creating the course {}".format(err)}, 500

        return new_course.json_repr(), 201

        pass

    def put(self, title):
        """retrieve a course by id"""
        pass

    def delete(self, title):
        """retrieve a course by id"""
        request_data = Course.parser.parse_args()
        course_found = CourseModel.get_by_id(request_data["course_id"])
        if course_found:
            course_found.delete_from_db()
            return {"message": "deleted the course"}, 200

        return {"message": "course not found"}, 404

