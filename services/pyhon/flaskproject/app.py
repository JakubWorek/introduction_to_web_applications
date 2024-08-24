from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from flask import Flask, jsonify, request
from flask_marshmallow import Marshmallow

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///demo.sqlite"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
ma = Marshmallow(app)
db = SQLAlchemy(app)

class Base(DeclarativeBase):
    pass

class Person(db.Model):
    id: Mapped[int] = mapped_column(db.Integer, primary_key=True)
    name: Mapped[str] = mapped_column(db.String)
    surname: Mapped[str] = mapped_column(db.String)
    job: Mapped[str] = mapped_column(db.String)

class PersonSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Person

with app.app_context():
    db.drop_all()
    db.create_all()
    db.session.add(Person(name="ser", surname="serowy", job='it'))
    db.session.commit()

@app.route('/')
def hello_world():  # put application's code here
    return 'Hello World!'

@app.route('/hello/<name>')
def hello_name(name):
    return jsonify({'message' : 'Hello ' + name + '!'})

@app.route('/person/<int:id>')
def get_person_by_id(id):
    person = Person.query.get(id)
    return PersonSchema().dump(person)

@app.route('/person')
def get_persons():
    persons = Person.query.all()
    return PersonSchema(many=True).dump(persons)

@app.route('/person/<string:surname>')
def get_person_by_surname(surname):
    persons = Person.query.filter_by(surname=surname).all()
    return PersonSchema(many=True).dump(persons)

@app.route('/create', methods=['POST'])
def create_person():
    name = request.form.get('name')
    surname = request.form.get('surname')
    job = request.form.get('job')

    if name and surname and job:
        person = Person(name=name, surname=surname, job=job)
        db.session.add(person)
        db.session.commit()
        return PersonSchema().dump(person)
    else:
        return jsonify({'error': 'Invalid data. Please provide name, surname, and job.'}), 400

@app.route('/update/<int:id>', methods=['PUT'])
def update_person(id):
    person = Person.query.get(id)

    if not person:
        return jsonify({'error': 'Person not found'}), 404

    name = request.form.get('name')
    surname = request.form.get('surname')
    job = request.form.get('job')

    if name:
        person.name = name
    if surname:
        person.surname = surname
    if job:
        person.job = job

    db.session.commit()
    return PersonSchema().dump(person)

@app.route('/delete/<int:id>', methods=['DELETE'])
def delete_person(id):
    person = Person.query.get(id)

    if not person:
        return jsonify({'error': 'Person not found'}), 404

    db.session.delete(person)
    db.session.commit()
    return PersonSchema().dump(person)

if __name__ == '__main__':
    app.run()