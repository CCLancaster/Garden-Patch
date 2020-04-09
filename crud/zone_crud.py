#TODO: still need render results on /zone page
#TODO: add a button to /zone template that allows user to save zone
#TODO: add text to /zone template that mirrors the print(f"You are in zone: {z}")

from flask import jsonify, redirect, requests
from models import db, User

API_BASE_URL = 'https://phzmapi.org/'

# Show (API call)
def get_zone(zip_code):
    #pull zone from form data
    #make API call with zone in url
    full_api_url=f'{API_BASE_URL}{zip_code}.json'
    results = requests.request('GET', full_api_url)

    zone = []
    for zone in result:
        z = result['zone']
        zone.append(z)
    
    print(f"You are in zone: {z}")