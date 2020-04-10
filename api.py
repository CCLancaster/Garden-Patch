# TD: Auth/login and signup
# TD: Routes = '/', '/profile'
# TD: Renders = '/zone', '/search', '/plants', '/plants/:id' - see crud pages

from models import app, User
from flask import jsonify, request, g
from crud.user_crud import get_user, create_user, destroy_user, update_user_zone
from crud.plant_crud import get_all_plants, get_plant, create_plant, destroy_plant
from crud.zone_crud import get_zone
from flask_httpauth import HTTPTokenAuth
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer, BadSignature, SignatureExpired

auth = HTTPTokenAuth('Bearer')

@app.errorhandler(Exception)
def unhandled_exception(e):
  app.logger.error('Unhandled Exception: %s', (e))
  message_str = e.__str__()
  return jsonify(message=message_str.split(':')[0])

@auth.verify_token
def verify_token(token):
    s = Serializer(app.config['SECRET_KEY'])
    try:
        data = s.loads(token)
        g.user = User.query.filter_by(id=data["id"]).first()
    except SignatureExpired:
        print(f'::clock:: Signature Expired')
        return False 
        # valid token, but expired
    except BadSignature:
        print(f'::bomb:: Invalid token')
        return False 
        # invalid token
    return True


@app.route('/auth/signup', methods=['POST'])
def signup():
    print(**request.json)
    return create_user(**request.json)


@app.route('/auth/login')
def authenticate():
    if request.json['email'] is None or request.json['password'] is None:
        raise KeyError('Email and Password required')

    user = User.query.filter_by(email=request.json['email']).first()

    if user is None or not user.verify_password(request.json['password']):
        raise Exception("Unauthorized")

    g.user = user
    token = user.generate_token()
    return jsonify(user=user.as_dict(), token=token.decode('ascii'), status_code=201)

# test route (for auth)
@app.route('/api/protected')
@auth.login_required
def get_resource():
    return jsonify({ 'data': 'Hello, %s!' % g.user.name})

# @app.route for gardenpatch homepage / 'GET' <-- to render only when logged out

# @app.route for /profile 'GET' <-- to render only when logged in 
# @auth.login_required

# @app.route for /zone 'GET' <-- to render page | 'POST' <-- post will trigger api call | 'PUT' <-- update user db with zone info
@app.route('/zone', methods=['GET', 'POST', 'PUT'])
def zone_get_post_put():
    if request.method == 'GET':
        return jsonify({'data': 'You made it to the zone page %s' % g.user.name})
    if request.method == 'POST':
        return get_zone(zip_code)
    if request.method == 'PUT':
        return update_user_zone(zone)


# @app.route for /search 'GET' <-- to render page | 'POST' <-- trigger api call | 'PUT' <-- add to plants db (will need to double check this as a PUT route is for updating...what if you're creating/adding a plant to the db for the first time?)
@app.route('/search', methods=['GET', 'POST', 'PUT'])
def search_get_post_put():
    if request.method == 'GET':
        return jsonify(f'You reached the search plants page')
    if request.method == 'POST':
        return get_all_plants(name)
    if request.method == 'PUT':
        return create_plant(user_id, name, s_name, t_id, p_type, style, water_min, shade_tol, drought_tol, density_max, size_max)

# QUESTION: 1) CREATE is a POST route...how do I make these two work? 2)Do I need to create a variable to hold all of the information from API call to then use to add to db?

# @app.route for /plants 'GET' <-- to show plant list(get_all_plants)
@app.route('/plants', methods=['GET'])
def plants_index():
    return get_all_plants()


# @app.route for /plants/:id 'GET' <-- to show a specific plant | 'DELETE' <-- to remove plant from plant list (and db)
@app.route('/plants/<int:id>', methods=['GET', 'DELETE'])
def plants_get_delete(id):
    if request.method == 'GET':
        return get_plant(id)
    if request.method == 'DELETE':
        return destroy_plant(id)
        # Note: redirect back to /plants after delete is writtin in plant_crud's destroy_plant function (^-')b