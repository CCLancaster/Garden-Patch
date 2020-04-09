# TD: Auth/login and signup adds

from flask import jsonify, redirect
from models import db, User


# Show (will need to test where I am getting my id from)
# this will be mostly for testing purposes
def get_user(id):
    user = User.query.get(id)
    if user:
        return jsonify(user.as_dict())
    else:
       raise Exception('No User at id {}'.format(id)) 


# Create
def create_user(**form_args):
    if not form_args['first_name'] or not form_args['last_name'] or not form_args['email'] or not form_args['password']:
        raise Exception("Name, email, and password are required fields")
    if User.query.filter_by(email=form_args['email']).first() is not None:
        raise Exception('There is already a user with this email')

    new_user = User(**form_args)
    new_user.set_password(form_args['password'])
    db.session.add(new_user)
    db.session.commit()
    # authorize the user
    token = new_user.generate_token()
    return jsonify(user=new_user.as_dict(), token=token.decode('ascii'), status_code=201)
    # will not return redirect to profile page as the front end needs to do this

# Update 
def update_user_zone(id, zone):
    user = User.query.get(id)
    if user:
        user.zone = zone or user.zone
        return jsonify(user.as_dict())
        #return redirect to profile page
    else:
        raise Exception('No User at id {}'.format(id))

# Note: while users have plants, adding plants and deleting plants that tie to a specific user is done in plant_crud.py

# Destroy (optional)
def destroy_user(id):
    user = User.query.get(id)
    if user:
        db.session.delete(user)
        db.session.commit()
        return redirect('/')
    else:
        raise Exception('No User at id {}'.format(id))
