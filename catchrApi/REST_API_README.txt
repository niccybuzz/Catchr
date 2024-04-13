A basic REST Api used for querying users, cards, and card collections for CATCHR, a Trading Card Game (TCG) collection manager.

All endpoints follow the local server suffix (localhost://4000)

Endpoints
	/api/collections
		GET /					get a list of all collections
		POST /					create a new collection
									body { collection_name, user_id }
		GET /:collecid			get single collection
		PUT /:collecid			update collection name		
									body { collection_name }
		DELETE /:collecid		delete a collection 
		
	/api/users															
		GET /					get a list of all users					(Admin only) 
		POST /register			create a new user						(Admin only unless own account) 
									body { username, email, password }
		POST /register			Attempt login							
									body { username, password }									
		GET /:userid			get single user
		PUT /:userid			update user								(Admin only unless own account) 			
									body { username OR email OR password }
		DELETE /:userid			delete a user 							(Admin Only) 	
	
	
	/api/cards

		GET /					get a list of all cards
		POST /					create a new card 						(Admin Only)
									body { XXXXXXXXXX}
		GET /:card_id			get single card
		PUT /:card_id			update card 					`		(Admin Only)	
									body { card XXXXXXXXXX }	
		DELETE /:card_id		delete a collection						(Admin Only)
		