#TODO: Auth/login and signup adds

from flask import jsonify, redirect
from models import db, User

# Index (optional?)
# def get_all_users():
#     all_users = User.query.all()


# Show (will need to test where I am getting my id from)
# this will be mostly for testing purposes
def get_user(id):
    user = User.query.get(id)
    if user:
        return jsonify(user.as_dict())
    else:
       raise Exception('No User at id {}'.format(id)) 


# Create
def create_user(first_name, last_name, email, password)
    new_user = User(first_name=first_name, last_name=last_name, email=email, password=password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify(new_user.as_dict())
    #return redirect to profile page

# Update 
def update_user_zone(id, zone):
    user = User.query.get(id)
    if user:
        user.zone = zone or user.zone
        return jsonify(user.as_dict())
        #return redirect to profile page
    else:
        raise Exception('No User at id {}'.format(id))

##NOTE: while users have plants, adding plants and deleting plants that tie to a specific user is done in plant_crud.py

# Destroy (optional)
def destroy_user(id):
    user = User.query.get(id)
    if user:
        db.session.delete(user)
        db.session.commit()
        return redirect('/')
    else:
        raise Exception('No User at id {}'.format(id))
