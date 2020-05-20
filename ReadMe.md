
# Garden Patch
## Welcome to your digital gardening hub!

Check out the live site [here](https://github.com/CCLancaster/Garden-Patch).(coming soon)

### MVP
The purpose of this web app is to allow the user to do the following:
1. Create an account
	- SQL 
2. Find their USDA Hardiness Zone via their zip code
	- API call 
3. Look up plants by their common name and find more information about them, including care
	- Double API call (1st for common name that provides the plant ID; then, utilizing the ID, a second call brings up the plant information
4. Save favorite plants and their Hardiness Zone to their account
	- SQL 

### Stretch Goal:
5. (And Eventually) Create a 4x4 grid plan of their ideal garden, utilizing their favorited plants.
	- I would do this by utilizing Canvas and HTML Drag and Drop actions 

### Tech Used
- SQLAlchemy
- Postgres
- Flask
- Python
- JWT
- React


Note: After getting through items 1-4, I found out that the Farmer's Almanac has already created the ideal form of what I wanted out of this web app - check out the possibilities [here](https://gardenplanner.almanac.com/). It is crazy amazing and I hope to figure out how they coded it!
