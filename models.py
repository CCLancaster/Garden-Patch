from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from passlib.apps import custom_app_context as pwd_context
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from flask_cors import CORS


app=Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://localhost/garden_patch'
app.config['SECRET_KEY'] = 'somethinglkjelsesdfentirely'
app.config['CORS_HEADERS'] = 'Content-Type'

# '/*' this is where you tell it what routes you want to be auth locked
cors = CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

db = SQLAlchemy(app)

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)
    zone = db.Column(db.String)

    plants = db.relationship('Plant', backref='users', lazy=True)
    
    def __repr__(self):
        return f'User(id={self.id}, first_name={self.first_name}", last_name="{self.last_name}", email="{self.email}", password="{self.password}", zone="{self.zone}")'
    
    def as_dict(self):
        user_dict = {c.name: getattr(self, c.name) for c in self.__table__.columns}
        del user_dict['password']
        return user_dict
    
    def set_password(self, password):
        self.password = pwd_context.encrypt(password)
    
    def verify_password(self, typed_password):
        return pwd_context.verify(typed_password, self.password)

    # expiration time is in seconds (vs js's milliseconds)
    def generate_token(self, expiration=60*10):
        s = Serializer(app.config['SECRET_KEY'], expires_in=expiration)
        return s.dumps({'id': self.id})


class Plant(db.Model):
    __tablename__ = 'plants'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'))
    name = db.Column(db.String)
    s_name = db.Column(db.String)
    t_id = db.Column(db.Integer)
    p_type = db.Column(db.String)
    style = db.Column(db.String)
    water_min = db.Column(db.Float)
    shade_tol = db.Column(db.String)
    drought_tol = db.Column(db.String)
    density_max = db.Column(db.Float)
    size_max = db.Column(db.Float)
    img = db.Column(db.String)

    def __repr__(self):
        return f'Plant(id={self.id}, user_id={self.user_id}, name="{self.name}", s_name="{self.s_name}", t_id={self.t_id}, p_type="{self.p_type}", style="{self.style}", water_min={self.water_min}, shade_tol="{self.shade_tol}", drought_tol="{self.drought_tol}", density_max={self.density_max}, size_max={self.size_max}, img={self.img})'
    
    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

def get_or_create(model, defaults=None, **kwargs):
  instance = db.session.query(model).filter_by(**kwargs).first()
  if instance:
    return instance, False
  else:
    params = dict((k, v) for k, v in kwargs.items())
    params.update(defaults or {})
    instance = model(**params)
    db.session.add(instance)
    db.session.commit()
    return instance, True