# TD: Still need rendering of pages to happen for plant/:id, /plants and /search
import requests
import json
from flask import jsonify, redirect
from models import db, Plant
from config import access_token

headers = {
    'Authorization': f'Bearer {access_token}'
}

API_BASE_URL = 'https://trefle.io/api/'

plant_info = {}

# to better see what comes back from trefle (found here: https://www.dataquest.io/blog/python-api-tutorial/)
def jprint(obj):
    # create a formatted string of the Python JSON object
    text = json.dumps(obj, sort_keys=True, indent=4)
    print(text)

# Index - API Call
def get_all_plants(name):
    full_api_url = f'{API_BASE_URL}?q={name}'
    result = requests.request('GET', full_api_url, headers=headers).json()
    jprint(result.json())

# Index - DB call
def get_all_fav_plants(user_id):
    all_plants = Plant.query.filter_by(user_id=user_id).all()
    if len(all_plants) > 0:
        results = [plant.as_dict() for plant in all_plants]
    else:
        print(f'No plants saved for the user at {user_id}')

# Show
def get_plant(id):
    global plant_info
    full_api_url = f'{API_BASE_URL}plants/{id}'
    result = requests.request('GET', full_api_url, headers=headers).json()
    jprint(result.json())
    return plant_info.update(result)

# Create (this will add it to the plant db for the specific user)
def create_plant(user_id):
    name = plant_info['common_name']
    s_name = plant_info['scientific_name']
    t_id = plant_info['id']
    p_type = plant_info.get('main_species', {}).get('duration')
    style = plant_info.get('main_species', {}).get('specifications', {}).get('growth_habit')
    water_min = plant_info.get('main_species' {}).get('growth', {}).get('precipitation_minimum', {}).get('inches')
    shade_tol = plant_info.get('main_species', {}).get('growth', {}).get('shade_tolerance')
    drought_tol = plant_info.get('main_species', {}).get('growth', {}).get('drought_tolerance')
    density_max = plant_info.get('main_species', {}).get('growth', {}).get('planting_density_maximum', {}).get('sqm')
    
    new_plant = Plant(user_id=user_id, name=name or None, s_name=s_name or None, t_id=t_id or None, p_type=p_type or None, style=style or None, water_min=water_min or None, shade_tol=shade_tol or None, drought_tol=drought_tol or None, density_max=density_max or None, size_max=size_max or None)
    db.session.add(new_plant)
    db.session.commit()
    return jsonify(new_plant.as_dict())

# Update...realizing this may not be needed, as info is coming from API call and there is no edit plant option, just delete or add(create) to db
# def update_plant(id):
#     # may want to update id here to t_id (which is the global id for the plant in question vs the id created in my db)
#     plant = Plant.query.get(id)
#     if plant:
#         plant.name = name or plant.s_name
#         plant.s_name = s_name or plant.s_name
#         plant.t_id = t_id or plant.t_id
#         plant.p_type = p_type or plant.p_type
#         plant.style = style or plant.style
#         plant.water_min = water_min or plant.water_min
#         plant.shade_tol = shade_tol or plant.shade_tol
#         plant.drought_tol = drought_tol or plant.drought_tol
#         plant.density_max = density_max or plant.density_max
#         plant.size_max = size_max or plant.size_max
#         return jsonify(plant.as_dict())
#     else:
#         raise Exception('No plant at this id {}'.format(id))

# Destroy
def destroy_plant(id):
    plant = Plant.query.get(id)
    if plant:
        db.session.delete(plant)
        db.session.commit()
        return redirect('/garden/plants')
    else: 
        raise Exception('No plant at this id {}'.format(id))
